import { useState, useCallback } from "react";
import { CheckCircle2, Circle, Plus, ThumbsUp, Lock, X, Sparkles, Trash2, ShieldCheck, AlertCircle } from "lucide-react";
import { validateShortText } from "../../utils/validate";

const MAX_EXTRA = 3;
const PRESIDENT_MIN_DAYS = 10;

export default function ClubActivities({ club, myRoll, token, onUpdate }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });
  const [adding, setAdding] = useState(false);
  const [completing, setCompleting] = useState(null);
  const [voting, setVoting] = useState(null);
  const [errors, setErrors] = useState({});
  const [confirmComplete, setConfirmComplete] = useState(null); // activity to confirm
  const [deletingId, setDeletingId] = useState(null);

  const isPresident = myRoll === club.presidentRoll;
  const role = sessionStorage.getItem("role");
  const isAdmin = role === "ADMIN" || role === "MODERATOR";
  const isMember = club.members?.includes(myRoll) ||
    club.pendingMembers?.some(p => p.rollNumber === myRoll);
  const isUnlocked = club.activityUnlocked;
  const extraLeft = MAX_EXTRA - (club.extraActivities || 0);

  const totalMembers = club.memberCount || 0;
  const halfMembers = Math.ceil(club.maxMembers * 0.5);
  const unlockProgress = Math.min((totalMembers / halfMembers) * 100, 100);
  const completedCount = club.activities?.filter(a => a.completed).length || 0;
  const totalCount = club.activities?.length || 0;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const getDaysOld = (createdAt) => {
    if (!createdAt) return 999;
    return Math.floor((Date.now() - new Date(createdAt).getTime()) / 86400000);
  };

  const getDaysLeft = (createdAt) => {
    const daysOld = getDaysOld(createdAt);
    return Math.max(0, PRESIDENT_MIN_DAYS - daysOld);
  };

  const handleAdd = async () => {
    const titleCheck = validateShortText(form.title, 80, "Title");
    if (!titleCheck.valid) { setErrors({ title: titleCheck.error }); return; }
    setErrors({});
    setAdding(true);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/activities`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      if (res.ok) { onUpdate(await res.json()); setForm({ title: "", description: "" }); setShowAdd(false); }
      else { setErrors({ api: await res.text() }); }
    } finally { setAdding(false); }
  };

  const handleVote = useCallback(async (activityId) => {
    if (voting) return;
    setVoting(activityId);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/activities/${activityId}/vote`, {
        method: "POST", headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) onUpdate(await res.json());
    } finally { setTimeout(() => setVoting(null), 500); }
  }, [voting]);

  // ✅ President clicks complete → show popup first
  const handleCompleteClick = (activity) => {
    const daysLeft = getDaysLeft(activity.createdAt);
    if (daysLeft > 0 && !isAdmin) {
      alert(`This activity needs ${daysLeft} more day(s) before it can be marked complete.`);
      return;
    }
    setConfirmComplete(activity);
  };

  // ✅ President confirms in popup
  const handleCompleteConfirm = async () => {
    if (!confirmComplete) return;
    setCompleting(confirmComplete.id);
    setConfirmComplete(null);
    try {
      const res = await fetch(
        `http://localhost:8081/api/clubs/${club.id}/activities/${confirmComplete.id}/complete`,
        { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) onUpdate(await res.json());
      else alert(await res.text());
    } finally { setCompleting(null); }
  };

  // ✅ Admin override complete
  const handleAdminComplete = async (activityId) => {
    setCompleting(activityId);
    try {
      const res = await fetch(
        `http://localhost:8081/api/clubs/${club.id}/activities/${activityId}/admin-complete`,
        { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) onUpdate(await res.json());
      else alert(await res.text());
    } finally { setCompleting(null); }
  };

  // ✅ Admin delete activity
  const handleAdminDelete = async (activityId) => {
    setDeletingId(activityId);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/activities/${activityId}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) onUpdate(await res.json());
    } finally { setDeletingId(null); }
  };

  // ─── LOCKED STATE ────────────────────────────────────────────────────────
  if (!isUnlocked && !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10
                        flex items-center justify-center mb-4">
          <Lock size={28} className="text-gray-500" />
        </div>
        <h4 className="text-white font-semibold mb-1">Activities Locked</h4>
        <p className="text-gray-500 text-sm mb-5">
          Unlocks when {halfMembers} members join ({totalMembers}/{halfMembers} so far)
        </p>
        <div className="w-full max-w-xs">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>Members joined</span>
            <span>{totalMembers}/{halfMembers} needed</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="h-2 rounded-full bg-gradient-to-r from-[#26F2D0] to-purple-400 transition-all"
              style={{ width: `${unlockProgress}%` }} />
          </div>
          <p className="text-xs text-gray-600 mt-2">
            {Math.max(0, halfMembers - totalMembers)} more members needed
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* ✅ President completion confirmation popup */}
      {confirmComplete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-[#26F2D0]/20 rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-500/15 border border-green-500/20
                              flex items-center justify-center">
                <CheckCircle2 size={20} className="text-green-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Mark as Complete?</h3>
                <p className="text-gray-500 text-xs">This cannot be undone</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-4">
              <p className="text-white text-sm font-medium mb-1">{confirmComplete.title}</p>
              {confirmComplete.description && (
                <p className="text-gray-400 text-xs">{confirmComplete.description}</p>
              )}
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 mb-4">
              <div className="flex items-start gap-2">
                <AlertCircle size={14} className="text-yellow-400 shrink-0 mt-0.5" />
                <p className="text-yellow-300 text-xs leading-relaxed">
                  Activities are designed to take around <strong>10 days</strong> of real work.
                  Only mark complete if your team has genuinely finished this activity.
                  This action is permanent and will be visible to all club members.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setConfirmComplete(null)}
                className="flex-1 py-2.5 bg-white/10 text-gray-300 rounded-xl text-sm
                           hover:bg-white/20 transition font-medium">
                Cancel
              </button>
              <button onClick={handleCompleteConfirm}
                className="flex-1 py-2.5 bg-green-500/20 text-green-400 border border-green-500/30
                           rounded-xl text-sm font-semibold hover:bg-green-500/30 transition">
                Yes, Mark Complete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-white">
            Activities ({completedCount}/{totalCount})
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">{progressPct}% complete</p>
        </div>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <span className="flex items-center gap-1 text-xs text-purple-400
                             bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded-full">
              <ShieldCheck size={10} /> Admin View
            </span>
          )}
          {isPresident && extraLeft > 0 && (
            <button onClick={() => setShowAdd(!showAdd)}
              className="flex items-center gap-1.5 text-xs text-[#26F2D0] hover:text-white
                         bg-[#26F2D0]/10 border border-[#26F2D0]/20 px-3 py-1.5
                         rounded-full transition">
              <Plus size={11} /> Add ({extraLeft} left)
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {totalCount > 0 && (
        <div className="w-full bg-white/10 rounded-full h-2">
          <div className="h-2 rounded-full bg-gradient-to-r from-[#26F2D0] to-purple-400 transition-all duration-500"
            style={{ width: `${progressPct}%` }} />
        </div>
      )}

      {/* Add form */}
      {showAdd && isPresident && (
        <div className="bg-[#1a1a1a] border border-[#26F2D0]/20 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles size={13} className="text-[#26F2D0]" />
            <p className="text-xs text-[#26F2D0] font-medium">
              Add Extra Activity ({extraLeft} remaining)
            </p>
          </div>
          <input value={form.title}
            onChange={e => { setForm(p => ({ ...p, title: e.target.value })); setErrors({}); }}
            placeholder="Activity title (max 80 chars)..."
            maxLength={80}
            className={`w-full bg-[#111] border rounded-xl px-3 py-2 text-sm text-white
                       placeholder-gray-500 outline-none transition
                       ${errors.title ? "border-red-500/50" : "border-white/10 focus:border-[#26F2D0]/50"}`} />
          {errors.title && <p className="text-xs text-red-400">⚠️ {errors.title}</p>}
          <textarea value={form.description}
            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            placeholder="Description (optional)..."
            rows={2} maxLength={200}
            className="w-full bg-[#111] border border-white/10 rounded-xl px-3 py-2 text-sm
                       text-white placeholder-gray-500 outline-none resize-none focus:border-[#26F2D0]/50 transition" />
          {errors.api && <p className="text-xs text-red-400">⚠️ {errors.api}</p>}
          <div className="flex gap-2 justify-end">
            <button onClick={() => { setShowAdd(false); setErrors({}); }}
              className="flex items-center gap-1 px-3 py-1.5 bg-white/10 text-gray-300
                         rounded-lg text-xs hover:bg-white/20 transition">
              <X size={11} /> Cancel
            </button>
            <button onClick={handleAdd} disabled={!form.title.trim() || adding}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#26F2D0] text-black
                         rounded-lg text-xs font-semibold hover:brightness-110 transition disabled:opacity-40">
              {adding ? "Adding..." : "Add Activity"}
            </button>
          </div>
        </div>
      )}

      {/* Activity list */}
      {totalCount === 0 ? (
        <div className="text-center py-8 text-gray-500 text-sm">
          <CheckCircle2 size={24} className="mx-auto mb-2 opacity-30" />
          <p>No activities yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {club.activities?.map((activity, idx) => {
            const daysOld = getDaysOld(activity.createdAt);
            const daysLeft = getDaysLeft(activity.createdAt);
            const canPresidentComplete = isPresident && !activity.completed && daysLeft === 0;
            const hasVoted = activity.votes?.includes(myRoll);
            const voteCount = activity.votes?.length || 0;

            return (
              <div key={activity.id}
                className={`border rounded-xl p-3.5 transition-all
                  ${activity.completed
                    ? "bg-green-500/5 border-green-500/20"
                    : activity.extra
                      ? "bg-purple-500/5 border-purple-500/15"
                      : "bg-white/[0.02] border-white/8 hover:border-white/15"
                  }`}>
                <div className="flex items-start gap-3">

                  {/* Complete button — president */}
                  {isPresident && !activity.completed && (
                    <button
                      onClick={() => handleCompleteClick(activity)}
                      disabled={completing === activity.id}
                      className={`shrink-0 mt-0.5 transition-all
                        ${daysLeft === 0
                          ? "text-gray-500 hover:text-[#26F2D0] cursor-pointer"
                          : "text-gray-700 cursor-not-allowed"
                        }`}
                      title={daysLeft > 0 ? `${daysLeft} more days needed` : "Click to mark complete"}
                    >
                      {completing === activity.id
                        ? <div className="w-4 h-4 border border-[#26F2D0] border-t-transparent rounded-full animate-spin mt-1" />
                        : <Circle size={18} />
                      }
                    </button>
                  )}

                  {/* Completed checkmark */}
                  {activity.completed && (
                    <CheckCircle2 size={18} className="text-green-400 shrink-0 mt-0.5" />
                  )}

                  {/* Not president, not completed */}
                  {!isPresident && !activity.completed && (
                    <Circle size={18} className="text-gray-700 shrink-0 mt-0.5" />
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-medium
                        ${activity.completed ? "text-gray-400 line-through" : "text-white"}`}>
                        {idx + 1}. {activity.title}
                      </span>
                      {activity.extra && (
                        <span className="text-xs bg-purple-500/20 text-purple-400
                                         border border-purple-500/30 px-1.5 py-0.5 rounded-full">
                          Extra
                        </span>
                      )}
                      {activity.completed && (
                        <span className="text-xs text-green-400">
                          ✓ {activity.completedAt
                            ? new Date(activity.completedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
                            : ""}
                        </span>
                      )}
                    </div>

                    {activity.description && (
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{activity.description}</p>
                    )}

                    {/* Days countdown for president */}
                    {!activity.completed && isPresident && daysLeft > 0 && (
                      <p className="text-xs text-yellow-600/80 mt-1 flex items-center gap-1">
                        <AlertCircle size={10} />
                        {daysLeft} day{daysLeft !== 1 ? "s" : ""} remaining before you can mark complete
                      </p>
                    )}
                    {!activity.completed && isPresident && daysLeft === 0 && (
                      <p className="text-xs text-green-600/80 mt-1">
                        ✓ Ready to mark complete
                      </p>
                    )}
                  </div>

                  {/* Right side actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Vote */}
                    {!activity.completed && isMember && (
                      <button onClick={() => handleVote(activity.id)} disabled={voting === activity.id}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border transition-all
                          ${hasVoted
                            ? "bg-[#26F2D0]/15 text-[#26F2D0] border-[#26F2D0]/30"
                            : "bg-white/5 text-gray-500 border-white/10 hover:border-white/20"
                          }`}>
                        <ThumbsUp size={10} fill={hasVoted ? "#26F2D0" : "none"} />
                        {voteCount}
                      </button>
                    )}

                    {/* Admin controls */}
                    {isAdmin && (
                      <div className="flex items-center gap-1">
                        {!activity.completed && (
                          <button
                            onClick={() => handleAdminComplete(activity.id)}
                            disabled={completing === activity.id}
                            title="Admin: mark complete (bypass 10-day rule)"
                            className="p-1.5 rounded-lg text-gray-600 hover:text-green-400
                                       hover:bg-green-400/10 transition">
                            {completing === activity.id
                              ? <div className="w-3 h-3 border border-green-400 border-t-transparent rounded-full animate-spin" />
                              : <ShieldCheck size={13} />
                            }
                          </button>
                        )}
                        <button
                          onClick={() => handleAdminDelete(activity.id)}
                          disabled={deletingId === activity.id}
                          title="Admin: delete activity"
                          className="p-1.5 rounded-lg text-gray-600 hover:text-red-400
                                     hover:bg-red-400/10 transition">
                          {deletingId === activity.id
                            ? <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin" />
                            : <Trash2 size={13} />
                          }
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isPresident && totalCount > 0 && (
        <p className="text-xs text-gray-600 text-center pt-1">
          Activities need 10 days before President can mark complete · Admin can override anytime
        </p>
      )}
    </div>
  );
}