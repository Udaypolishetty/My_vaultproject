import { useState } from "react";
import { Pin, Plus, X, Megaphone, AlertCircle } from "lucide-react";
import { validateNewsTitle, validateNewsContent } from "../../utils/validate";

const MAX_DAILY = 2;

export default function ClubAnnouncements({ club, myRoll, token, onUpdate }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });
  const [adding, setAdding] = useState(false);
  const [pinning, setPinning] = useState(null);
  const [errors, setErrors] = useState({});

  const isPresident = myRoll === club.presidentRoll;
  const isVp = myRoll === club.vpRoll;
  const canPost = isPresident || isVp;

  const announcementsToday = isPresident
    ? (club.presidentAnnouncementsToday || 0)
    : (club.vpAnnouncementsToday || 0);
  const remaining = MAX_DAILY - announcementsToday;
  const limitReached = remaining <= 0;

  const handleAdd = async () => {
    const titleCheck = validateNewsTitle(form.title);
    const contentCheck = validateNewsContent(form.content);
    if (!titleCheck.valid || !contentCheck.valid) {
      setErrors({ title: titleCheck.error, content: contentCheck.error });
      return;
    }
    setErrors({});
    setAdding(true);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/announcements`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        onUpdate(await res.json());
        setForm({ title: "", content: "" });
        setShowAdd(false);
      } else {
        const t = await res.text();
        setErrors({ api: t });
      }
    } finally { setAdding(false); }
  };

  const handlePin = async (annId) => {
    setPinning(annId);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/announcements/${annId}/pin`, {
        method: "PATCH", headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) onUpdate(await res.json());
    } finally { setPinning(null); }
  };

  const formatTime = (dt) => {
    if (!dt) return "";
    const diff = Date.now() - new Date(dt).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const sorted = [...(club.announcements || [])].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Megaphone size={14} className="text-[#26F2D0]" />
          <h4 className="text-sm font-semibold text-white">
            Announcements {sorted.length > 0 && `(${sorted.length})`}
          </h4>
        </div>
        {canPost && !limitReached && (
          <button onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-1.5 text-xs text-[#26F2D0] hover:text-white
                       bg-[#26F2D0]/10 border border-[#26F2D0]/20 px-3 py-1.5
                       rounded-full transition">
            <Plus size={11} />
            Post
            <span className="text-gray-500">({remaining} left today)</span>
          </button>
        )}
        {canPost && limitReached && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <AlertCircle size={11} />
            Daily limit reached
          </div>
        )}
      </div>

      {/* Add form */}
      {showAdd && canPost && !limitReached && (
        <div className="bg-[#1a1a1a] border border-[#26F2D0]/20 rounded-xl p-4 space-y-3">
          <p className="text-xs text-[#26F2D0] font-medium flex items-center gap-1">
            <Megaphone size={11} /> New Announcement
            <span className="text-gray-500 ml-1">({remaining} remaining today)</span>
          </p>
          <div>
            <input value={form.title}
              onChange={e => { setForm(p => ({ ...p, title: e.target.value })); setErrors({}); }}
              placeholder="Announcement title..."
              className={`w-full bg-[#111] border rounded-xl px-3 py-2 text-sm text-white
                         placeholder-gray-500 outline-none transition
                         ${errors.title ? "border-red-500/50" : "border-white/10 focus:border-[#26F2D0]/50"}`} />
            {errors.title && <p className="text-xs text-red-400 mt-1">⚠️ {errors.title}</p>}
          </div>
          <div>
            <textarea value={form.content}
              onChange={e => { setForm(p => ({ ...p, content: e.target.value })); setErrors({}); }}
              placeholder="Write the announcement..."
              rows={3}
              className={`w-full bg-[#111] border rounded-xl px-3 py-2 text-sm text-white
                         placeholder-gray-500 outline-none resize-none transition
                         ${errors.content ? "border-red-500/50" : "border-white/10 focus:border-[#26F2D0]/50"}`} />
            {errors.content && <p className="text-xs text-red-400 mt-1">⚠️ {errors.content}</p>}
          </div>
          {errors.api && <p className="text-xs text-red-400">⚠️ {errors.api}</p>}
          <div className="flex gap-2 justify-end">
            <button onClick={() => { setShowAdd(false); setErrors({}); }}
              className="flex items-center gap-1 px-3 py-1.5 bg-white/10 text-gray-300
                         rounded-lg text-xs hover:bg-white/20 transition">
              <X size={11} /> Cancel
            </button>
            <button onClick={handleAdd}
              disabled={!form.title.trim() || !form.content.trim() || adding}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#26F2D0] text-black
                         rounded-lg text-xs font-semibold hover:brightness-110 transition
                         disabled:opacity-40">
              {adding ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {sorted.length === 0 ? (
        <div className="text-center py-8 text-gray-500 text-sm">
          <Megaphone size={24} className="mx-auto mb-2 opacity-30" />
          <p>No announcements yet.</p>
          {canPost && <p className="text-xs mt-1">Post one to keep members updated!</p>}
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map(ann => (
            <div key={ann.id}
              className={`border rounded-xl p-4 transition-all
                ${ann.pinned
                  ? "bg-yellow-500/5 border-yellow-500/20"
                  : "bg-white/[0.02] border-white/10"
                }`}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {ann.pinned && <Pin size={11} className="text-yellow-400 shrink-0" />}
                  <p className="text-white text-sm font-semibold">{ann.title}</p>
                </div>
                {isPresident && (
                  <button onClick={() => handlePin(ann.id)} disabled={pinning === ann.id}
                    title={ann.pinned ? "Unpin" : "Pin"}
                    className={`p-1 rounded transition shrink-0
                      ${ann.pinned ? "text-yellow-400" : "text-gray-600 hover:text-yellow-400"}`}>
                    <Pin size={13} />
                  </button>
                )}
              </div>
              <p className="text-gray-300 text-xs leading-relaxed">{ann.content}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                <span>by {ann.postedByName}</span>
                <span>·</span>
                <span>{formatTime(ann.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}