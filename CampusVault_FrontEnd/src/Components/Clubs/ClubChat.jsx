import { useState, useEffect, useRef, useCallback } from "react";
import { Send, Trash2, Crown, Lock } from "lucide-react";
import { validateShortText } from "../../utils/validate";

const COOLDOWN_MS  = 10000;
const SPAM_WINDOW  = 30000;
const SPAM_LIMIT   = 3;
const SPAM_BLOCK   = 300000;

export default function ClubChat({ club, myRoll, myName, token, onUpdate }) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const [spamBlocked, setSpamBlocked] = useState(false);
  const [spamBlockLeft, setSpamBlockLeft] = useState(0);

  const bottomRef = useRef(null);
  const lastSentRef = useRef(0);
  const recentMsgsRef = useRef([]);

  // ✅ confirmed vs pending
  const isConfirmedMember = club.members?.includes(myRoll);
  const isPendingMember = club.pendingMembers?.some(p => p.rollNumber === myRoll);
  const isMember = isConfirmedMember || isPendingMember;
  const isPresident = myRoll === club.presidentRoll;
  const isAdmin = ["ADMIN", "MODERATOR"].includes(sessionStorage.getItem("role"));

  // grace hours left
  const graceHoursLeft = isPendingMember ? (() => {
    const pending = club.pendingMembers?.find(p => p.rollNumber === myRoll);
    if (!pending?.joinedAt) return 0;
    const elapsed = (Date.now() - new Date(pending.joinedAt).getTime()) / 3600000;
    return Math.max(0, 48 - elapsed).toFixed(0);
  })() : 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [club.messages?.length]);

  useEffect(() => {
    if (cooldownLeft <= 0) return;
    const t = setInterval(() => setCooldownLeft(p => { if (p <= 1) { clearInterval(t); return 0; } return p - 1; }), 1000);
    return () => clearInterval(t);
  }, [cooldownLeft > 0]);

  useEffect(() => {
    if (spamBlockLeft <= 0) return;
    const t = setInterval(() => setSpamBlockLeft(p => {
      if (p <= 1) { clearInterval(t); setSpamBlocked(false); return 0; }
      return p - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [spamBlockLeft > 0]);

  const checkSpam = () => {
    const now = Date.now();
    recentMsgsRef.current = recentMsgsRef.current.filter(t => now - t < SPAM_WINDOW);
    recentMsgsRef.current.push(now);
    if (recentMsgsRef.current.length >= SPAM_LIMIT) {
      setSpamBlocked(true);
      setSpamBlockLeft(Math.ceil(SPAM_BLOCK / 1000));
      recentMsgsRef.current = [];
      return true;
    }
    return false;
  };

  const handleSend = useCallback(async () => {
    if (!text.trim() || sending || spamBlocked || !isConfirmedMember) return;
    const validation = validateShortText(text, 300, "Message");
    if (!validation.valid) { setError(validation.error); return; }
    const now = Date.now();
    const elapsed = now - lastSentRef.current;
    if (elapsed < COOLDOWN_MS) {
      const left = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
      setCooldownLeft(left); setError(`Wait ${left}s before sending again`); return;
    }
    if (checkSpam()) { setError("Too fast! Blocked for 5 minutes."); return; }
    setError(""); setSending(true); lastSentRef.current = now;
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content: text.trim() })
      });
      if (res.ok) { onUpdate(await res.json()); setText(""); }
      else { setError(await res.text()); }
    } catch { setError("Network error."); }
    finally { setSending(false); }
  }, [text, sending, spamBlocked, isConfirmedMember]);

  const handleDelete = async (messageId) => {
    const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/messages/${messageId}`, {
      method: "DELETE", headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) onUpdate(await res.json());
  };

  const formatTime = (dt) => {
    if (!dt) return "";
    const diff = Date.now() - new Date(dt).getTime();
    if (diff < 60000) return "just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    return new Date(dt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  };

  const visibleMessages = (club.messages || []).filter(m => {
    if (!m.createdAt) return true;
    return Date.now() - new Date(m.createdAt).getTime() < 48 * 3600000;
  });

  return (
    <div className="flex flex-col" style={{ height: "420px" }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">Club Chat</span>
          <span className="text-xs text-gray-600">48h history · confirmed members only</span>
        </div>
        {spamBlocked && (
          <span className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 px-2 py-0.5 rounded-full">
            Blocked {Math.floor(spamBlockLeft / 60)}:{String(spamBlockLeft % 60).padStart(2, "0")}
          </span>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-0">
        {visibleMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            <div className="text-center">
              <Send size={24} className="mx-auto mb-2 opacity-20" />
              <p>No messages yet.</p>
              {isConfirmedMember && <p className="text-xs mt-1">Say hello to your club!</p>}
            </div>
          </div>
        ) : (
          visibleMessages.map(msg => {
            const isMe = msg.senderRoll === myRoll;
            const isPres = msg.senderRoll === club.presidentRoll;
            const isDeleted = msg.deleted || msg.content === "🚫 Message deleted";
            const canDelete = (isMe || isPresident || isAdmin) && !isDeleted;

            return (
              <div key={msg.id} className={`flex gap-2 group ${isMe ? "flex-row-reverse" : ""}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center
                                text-xs font-bold shrink-0 mt-1
                                ${isPres ? "bg-purple-500/30 text-purple-300" : "bg-white/10 text-gray-300"}`}>
                  {isPres ? <Crown size={12} /> : msg.senderName?.[0]?.toUpperCase()}
                </div>
                <div className={`max-w-[75%] flex flex-col gap-0.5 ${isMe ? "items-end" : "items-start"}`}>
                  <div className="flex items-center gap-2">
                    {!isMe && (
                      <span className={`text-xs ${isPres ? "text-purple-400" : "text-gray-500"}`}>
                        {msg.senderName}{isPres ? " 👑" : ""}
                      </span>
                    )}
                    <span className="text-xs text-gray-600">{formatTime(msg.createdAt)}</span>
                    {canDelete && (
                      <button onClick={() => handleDelete(msg.id)}
                        className={`text-gray-600 hover:text-red-400 transition p-0.5
    ${isMe ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                        <Trash2 size={10} />
                      </button>
                    )}
                  </div>
                  <div className={`px-3 py-2 rounded-2xl text-sm leading-relaxed
                    ${isDeleted ? "bg-white/5 text-gray-600 italic text-xs"
                      : isMe ? "bg-[#26F2D0]/20 text-white rounded-tr-sm"
                      : "bg-white/5 text-gray-200 rounded-tl-sm"}`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      {isConfirmedMember || isAdmin ? (
        <div className="mt-3 pt-3 border-t border-white/10">
          {error && <p className="text-xs text-red-400 mb-2">⚠️ {error}</p>}
          {cooldownLeft > 0 && !error && <p className="text-xs text-yellow-600 mb-2">⏳ Wait {cooldownLeft}s...</p>}
          <div className="flex items-center gap-2">
            <input value={text}
              onChange={e => { setText(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder={spamBlocked ? "Blocked for spamming..." : "Send a message..."}
              disabled={spamBlocked || cooldownLeft > 0}
              maxLength={300}
              className={`flex-1 border rounded-full px-4 py-2 text-sm text-white
                         placeholder-gray-500 outline-none transition
                         ${spamBlocked || cooldownLeft > 0
                           ? "bg-white/5 border-white/5 cursor-not-allowed text-gray-600"
                           : "bg-white/5 border-white/10 focus:border-[#26F2D0]/50"}`} />
            <button onClick={handleSend}
              disabled={!text.trim() || sending || spamBlocked || cooldownLeft > 0}
              className="w-9 h-9 rounded-full bg-[#26F2D0] text-black flex items-center
                         justify-center hover:brightness-110 transition disabled:opacity-40">
              <Send size={14} />
            </button>
          </div>
          <div className="flex justify-between mt-1">
            <p className="text-xs text-gray-600">10s cooldown between messages</p>
            <p className={`text-xs ${text.length > 270 ? "text-red-400" : "text-gray-600"}`}>{text.length}/300</p>
          </div>
        </div>

      ) : isPendingMember ? (
        // ✅ Pending member — show grace period message
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="flex items-center gap-3 bg-yellow-500/5 border border-yellow-500/20
                          rounded-xl px-4 py-3">
            <Lock size={16} className="text-yellow-400 shrink-0" />
            <div>
              <p className="text-yellow-400 text-xs font-medium">Chat locked during grace period</p>
              <p className="text-gray-500 text-xs mt-0.5">
                You can chat after your 2-day grace period ends.
                {graceHoursLeft > 0 && ` ${graceHoursLeft}h remaining.`}
              </p>
            </div>
          </div>
        </div>

      ) : (
        <div className="mt-3 pt-3 border-t border-white/10 text-center text-xs text-gray-600">
          Join the club to participate in chat
        </div>
      )}
    </div>
  );
}