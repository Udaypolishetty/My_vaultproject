// ─── ANNOUNCEMENTS ───────────────────────────────────────────────────────────
import { useState } from "react";
import { Megaphone, Pin, Trash2, MessageSquare } from "lucide-react";
import { call } from "./AdminClubShared";

export function AdminClubAnnouncements({ club, token, onRefresh }) {
  const [deletingAnn, setDeletingAnn] = useState(null);
  const [pinningAnn,  setPinningAnn]  = useState(null);
  const A = call(token);

  const sorted = [...(club.announcements || [])].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  if (!sorted.length) return (
    <div className="text-center py-12 text-gray-500 text-sm">
      <Megaphone size={24} className="mx-auto mb-2 opacity-30" />
      <p>No announcements yet.</p>
    </div>
  );

  return (
    <div className="space-y-3">
      {sorted.map(ann => (
        <div key={ann.id} className={`flex items-start gap-3 border rounded-xl p-4 ${ann.pinned ? "bg-yellow-500/5 border-yellow-500/20" : "bg-[#1a1a1a] border-white/10"}`}>
          {ann.pinned && <Pin size={13} className="text-yellow-400 shrink-0 mt-0.5" />}
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold">{ann.title}</p>
            <p className="text-gray-400 text-xs mt-1 leading-relaxed">{ann.content}</p>
            <p className="text-gray-600 text-xs mt-2">
              by {ann.postedByName} · {ann.createdAt ? new Date(ann.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" }) : ""}
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={async () => { setPinningAnn(ann.id); const r = await A.patch(`/api/clubs/${club.id}/announcements/${ann.id}/pin`); if (r.ok) onRefresh(); setPinningAnn(null); }}
              disabled={pinningAnn === ann.id} title={ann.pinned ? "Unpin" : "Pin"}
              className={`p-1.5 rounded-lg transition ${ann.pinned ? "text-yellow-400" : "text-gray-600 hover:text-yellow-400 hover:bg-yellow-400/10"}`}>
              <Pin size={13} />
            </button>
            <button onClick={async () => { setDeletingAnn(ann.id); const r = await A.del(`/api/clubs/${club.id}/announcements/${ann.id}`); if (r.ok) onRefresh(); setDeletingAnn(null); }}
              disabled={deletingAnn === ann.id}
              className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition">
              {deletingAnn === ann.id
                ? <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin" />
                : <Trash2 size={13} />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── CHAT ─────────────────────────────────────────────────────────────────────
export function AdminClubChat({ club, token, onRefresh }) {
  const [confirmDeleteMsg, setConfirmDeleteMsg] = useState(null);
  const [deletingMsg, setDeletingMsg]           = useState(null);
  const A = call(token);

  const handleDelete = async (msgId) => {
    setDeletingMsg(msgId);
    try {
      const r = await A.del(`/api/clubs/${club.id}/messages/${msgId}`);
      if (r.ok) { setConfirmDeleteMsg(null); onRefresh(); }
      else alert(await r.text());
    } finally { setDeletingMsg(null); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-500">Admin can delete any message · removed permanently from DB</p>
        <span className="text-xs text-gray-600">{club.messages?.length || 0}/100</span>
      </div>

      {(!club.messages || club.messages.length === 0) ? (
        <div className="text-center py-12 text-gray-500 text-sm">
          <MessageSquare size={24} className="mx-auto mb-2 opacity-30" />
          <p>No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
          {club.messages.map(msg => {
            const isPres = msg.senderRoll === club.presidentRoll;
            return (
              <div key={msg.id} className={`flex items-start gap-3 rounded-xl px-4 py-3 border ${isPres ? "bg-purple-500/5 border-purple-500/15" : "bg-[#1a1a1a] border-white/10"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isPres ? "bg-purple-500/30 text-purple-300" : "bg-white/10 text-gray-300"}`}>
                  {msg.senderName?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-xs font-medium ${isPres ? "text-purple-400" : "text-white"}`}>
                      {msg.senderName}{isPres ? " 👑" : ""}
                    </span>
                    <span className="text-xs text-gray-600">
                      {msg.createdAt ? new Date(msg.createdAt).toLocaleString("en-IN", { day:"numeric", month:"short", hour:"2-digit", minute:"2-digit" }) : ""}
                    </span>
                  </div>
                  <p className="text-sm text-gray-200">{msg.content}</p>
                </div>
                {confirmDeleteMsg === msg.id ? (
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => handleDelete(msg.id)} disabled={deletingMsg === msg.id}
                      className="text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full font-semibold">
                      {deletingMsg === msg.id ? "..." : "Delete"}
                    </button>
                    <button onClick={() => setConfirmDeleteMsg(null)} className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmDeleteMsg(msg.id)} className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition shrink-0">
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}