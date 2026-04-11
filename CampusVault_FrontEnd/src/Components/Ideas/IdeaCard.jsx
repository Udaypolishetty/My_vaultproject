import { API_BASE } from "../../config/api";
import { useState, useEffect } from "react";
import Comment from "./Comment";
import SharePopup from "./SharePopUp";
import { IdeaStatusBadge, IdeaStatusBanner, getStatusConfig } from "./IdeaStatusBadge";
import { ThumbsUp, MessageCircle, Trash2, Mail, Flame, Lightbulb, Target, Wrench, Users, Pencil, X, Check } from "lucide-react";

// ===== HELPERS =====
const getIdeaStage = (likes) => {
  if (likes >= 30) return { label: "Community Favorite", icon: "⭐" };
  if (likes >= 15) return { label: "Gaining Traction", icon: "🚀" };
  if (likes >= 5)  return { label: "Growing", icon: "📈" };
  return null;
};

const isTrending = (idea) => {
  if ((idea.likes || 0) < 10) return false;
  const ageHours = (Date.now() - new Date(idea.createdAt).getTime()) / 3600000;
  return ageHours < 24;
};

const formatYear = (y) => {
  if (!y) return "";
  const num = parseInt(y);
  if (num === 1) return "1st Year";
  if (num === 2) return "2nd Year";
  if (num === 3) return "3rd Year";
  return num + "th Year";
};

const isWithinEditWindow = (createdAt) => {
  if (!createdAt) return false;
  return Date.now() - new Date(createdAt).getTime() < 60 * 60 * 1000;
};

const getEditTimeLeft = (createdAt) => {
  if (!createdAt) return "";
  const msLeft = (new Date(createdAt).getTime() + 60 * 60 * 1000) - Date.now();
  if (msLeft <= 0) return "";
  const mins = Math.floor(msLeft / 60000);
  return mins > 0 ? `${mins}m left` : "< 1m left";
};

const categoryStyles = {
  Tech: "bg-blue-500/20 text-blue-400",
  Academic: "bg-green-500/20 text-green-400",
  "Campus Pulse": "bg-red-500/20 text-red-400",
  Cultural: "bg-yellow-300/20 text-yellow-400",
};

const categoryIcons = {
  Tech: "/techh.png",
  Academic: "/academic.png",
  "Campus Pulse": "/campuspulse.png",
  Cultural: "/cultural.png",
  Others: "/others.png",
};

const StageBadge = ({ stage, trending, size = "sm" }) => {
  const pad = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-xs";
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {stage && (
        <span className={`${pad} rounded-full font-medium shrink-0
          ${stage.label === "Community Favorite" ? "bg-yellow-400/15 text-yellow-400" :
            stage.label === "Gaining Traction"   ? "bg-purple-400/15 text-purple-400" :
                                                   "bg-green-400/15 text-green-400"}`}>
          {stage.icon} {stage.label}
        </span>
      )}
      {trending && (
        <span className={`${pad} rounded-full font-medium shrink-0
                          flex items-center gap-1 bg-orange-500/15 text-orange-400`}>
          <Flame size={10} /> Trending
        </span>
      )}
    </div>
  );
};

const ClassProposalBadge = ({ proposalClass }) => (
  <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium
                   bg-purple-500/20 text-purple-400 border border-purple-500/30 shrink-0">
    <Users size={10} /> {proposalClass || "Class Proposal"}
  </span>
);

const EditForm = ({ idea, token, setIdeas, onClose }) => {
  const [title, setTitle] = useState(idea.title);
  const [description, setDescription] = useState(idea.description);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async (e) => {
    e.stopPropagation();
    if (!title.trim() || !description.trim()) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/ideas/${idea.id}/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({ title: title.trim(), description: description.trim() })
      });
      if (res.ok) {
        const updated = await res.json();
        setIdeas(prev => prev.map(i => i.id === updated.id ? updated : i));
        onClose();
      } else {
        const txt = await res.text();
        setError(txt || "Failed to save");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div onClick={e => e.stopPropagation()}
      className="mt-3 bg-[#1a1a1a] border border-[#26F2D0]/30 rounded-xl p-4 space-y-3">
      <p className="text-xs text-[#26F2D0] font-medium flex items-center gap-1">
        <Pencil size={11} /> Edit Idea
        <span className="text-gray-500 font-normal ml-1">({getEditTimeLeft(idea.createdAt)})</span>
      </p>
      <input value={title} onChange={e => setTitle(e.target.value)} maxLength={100}
        className="w-full bg-[#111] border border-white/10 rounded-xl px-3 py-2
                   text-sm text-white outline-none focus:border-[#26F2D0]/50 transition" />
      <textarea value={description} onChange={e => setDescription(e.target.value)}
        rows={4} maxLength={500}
        className="w-full bg-[#111] border border-white/10 rounded-xl px-3 py-2
                   text-sm text-white outline-none resize-none
                   focus:border-[#26F2D0]/50 transition" />
      {error && <p className="text-xs text-red-400">{error}</p>}
      <div className="flex gap-2 justify-end">
        <button onClick={onClose}
          className="flex items-center gap-1 px-3 py-1.5 bg-white/10 text-gray-300
                     rounded-lg text-xs hover:bg-white/20 transition">
          <X size={12} /> Cancel
        </button>
        <button onClick={handleSave} disabled={saving || !title.trim() || !description.trim()}
          className="flex items-center gap-1 px-3 py-1.5 bg-[#26F2D0] text-black
                     rounded-lg text-xs font-semibold hover:bg-[#1dd4b8] transition
                     disabled:opacity-40">
          <Check size={12} /> {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

const LikeButton = ({ idea, rollNumber, token, setIdeas, size = "sm" }) => {
  const [loading, setLoading] = useState(false);
  const hasLiked = (idea.likedBy || []).includes(rollNumber);
  const count = idea.likes || 0;

  const handleLike = async (e) => {
    e.stopPropagation();
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/ideas/${idea.id}/like`, {
        method: "POST", headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const updated = await res.json();
      setIdeas(prev => prev.map(i => i.id === updated.id ? updated : i));
    } finally { setLoading(false); }
  };

  if (size === "lg") {
    return (
      <button onClick={handleLike} disabled={loading}
        className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all
          ${hasLiked
            ? "bg-[#26F2D0]/10 text-[#26F2D0] hover:bg-red-500/10 hover:text-red-400"
            : "bg-[#26F2D0]/20 hover:bg-[#26F2D0]/30 text-[#26F2D0]"
          } disabled:opacity-50`}>
        <ThumbsUp size={16} fill={hasLiked ? "#26F2D0" : "none"} />
        {loading ? "..." : hasLiked ? "Unlike" : "Like"} ({count})
      </button>
    );
  }

  return (
    <button onClick={handleLike} disabled={loading}
      className={`flex items-center gap-1 transition-all disabled:opacity-50
        ${hasLiked ? "text-[#26F2D0] hover:text-red-400"
                   : "text-gray-500 hover:text-[#26F2D0] hover:scale-110"}`}
      title={hasLiked ? "Unlike" : "Like"}>
      <ThumbsUp size={14} fill={hasLiked ? "#26F2D0" : "none"} />
      {count}
    </button>
  );
};

const DeleteButton = ({ idea, token, setIdeas }) => {
  const [confirm, setConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    setDeleting(true);
    try {
      const res = await fetch(`${API_BASE}/api/ideas/${idea.id}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setIdeas(prev => prev.filter(i => i.id !== idea.id));
    } finally { setDeleting(false); setConfirm(false); }
  };

  if (confirm) {
    return (
      <div onClick={e => e.stopPropagation()} className="flex items-center gap-1">
        <span className="text-xs text-gray-400">Sure?</span>
        <button onClick={handleDelete} disabled={deleting}
          className="text-xs text-red-400 hover:text-red-300 font-semibold
                     px-2 py-0.5 rounded-full bg-red-400/10 transition disabled:opacity-50">
          {deleting ? "..." : "Yes"}
        </button>
        <button onClick={(e) => { e.stopPropagation(); setConfirm(false); }}
          className="text-xs text-gray-500 hover:text-white px-2 py-0.5 rounded-full bg-white/5 transition">
          No
        </button>
      </div>
    );
  }

  return (
    <button onClick={(e) => { e.stopPropagation(); setConfirm(true); }}
      className="flex items-center gap-1 text-gray-600 hover:text-red-400
                 hover:bg-red-400/10 rounded-full p-1 transition-all" title="Delete idea">
      <Trash2 size={14} />
    </button>
  );
};

const EmailButton = ({ idea, size = "sm" }) => {
  const handleEmail = (e) => {
    e.stopPropagation();
    const subject = encodeURIComponent(`Regarding your idea: ${idea.title}`);
    const body = encodeURIComponent(
      `Hi ${idea.createdByName},\n\nI came across your idea "${idea.title}" and wanted to connect.\n\nBest regards`
    );
    const url = idea.createdByEmail
      ? `https://mail.google.com/mail/?view=cm&fs=1&to=${idea.createdByEmail}&su=${subject}&body=${body}`
      : `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`;
    window.open(url, "_blank");
  };

  if (size === "lg") {
    return (
      <button onClick={handleEmail}
        className="flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all
                   bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400">
        <Mail size={16} /> Email {idea.createdByName}
      </button>
    );
  }

  return (
    <button onClick={handleEmail}
      className="w-7 h-7 rounded-full flex items-center justify-center
                 bg-[#1f2937] text-[#26F2D0] hover:bg-indigo-500/30
                 hover:text-indigo-300 transition-all"
      title={`Email ${idea.createdByName}`}>
      <Mail size={13} />
    </button>
  );
};

// ===== MAIN COMPONENT =====
export default function IdeaCard({ idea, student, ideas, setIdeas, myId }) {
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [canEdit, setCanEdit] = useState(isWithinEditWindow(idea.createdAt));

  const token = sessionStorage.getItem("token");
  const resolvedMyId = sessionStorage.getItem("id");

  const rollNumber = student?.rollNumber;
  const isMyIdea = String(idea.createdById) === String(resolvedMyId);

  const stage = getIdeaStage(idea.likes || 0);
  const trending = isTrending(idea);
  const statusConfig = getStatusConfig(idea.status);

  const formattedDate = idea.createdAt
    ? new Date(idea.createdAt).toLocaleDateString("en-IN", {
        year: "numeric", month: "long", day: "numeric",
      })
    : "";

  useEffect(() => {
    if (!isMyIdea) return;
    const interval = setInterval(() => {
      setCanEdit(isWithinEditWindow(idea.createdAt));
    }, 60000);
    return () => clearInterval(interval);
  }, [idea.createdAt, isMyIdea]);

  // ===== COMPACT CARD =====
  const renderCompactCard = () => (
    <div onClick={() => setShowModal(true)}
      className={`relative bg-[#111] p-6 rounded-2xl border cursor-pointer
                  transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
                  ${idea.classProposal
                    ? "border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.08)] hover:border-purple-500/60"
                    : statusConfig ? statusConfig.cardBorder
                    : trending
                      ? "border-orange-400/40 shadow-[0_0_20px_rgba(251,146,60,0.1)] hover:border-orange-400/60"
                      : stage?.label === "Community Favorite"
                        ? "border-yellow-400/30 hover:border-yellow-400/50"
                        : "border-white/10 hover:border-[#26F2D0]/50 hover:shadow-[0_0_20px_rgba(38,242,208,0.1)]"
                  }`}>

      {idea.classProposal && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2  flex items-center gap-1
                        bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          <Users size={11} /> Class Proposal
        </div>
      )}
      {trending && !idea.classProposal && (
        <div className="absolute -top-3 left-4 flex items-center gap-1
                        bg-orange-500 text-white text-xs font-bold
                        px-3 py-1 rounded-full shadow-lg animate-pulse">
          <Flame size={11} /> Trending
        </div>
      )}

      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className={`text-xs font-semibold px-3 py-1 rounded-full
          ${categoryStyles[idea.category] || "bg-gray-500/20 text-gray-400"}`}>
          {idea.category}
        </div>
        {isMyIdea && (
          <div className="text-xs font-bold px-2 py-1 rounded-full
                          text-[#26F2D0] border border-[#26F2D0]/30">📌</div>
        )}
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div className="text-xs bg-[#1f2937] text-[#26F2D0] px-3 py-1 rounded-full">
          {idea.createdByBranch} · {formatYear(idea.createdByYear)}
        </div>
        <EmailButton idea={idea} size="sm" />
      </div>

      {/* ✅ COMPACT: title + badges all inline (original behavior) */}
      <div className="flex items-start gap-3 mt-8">
        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10
                        flex items-center justify-center shrink-0 mt-0.5">
          <img src={categoryIcons[idea.category] || "/others.png"}
               className="w-6 h-6 object-contain" alt="" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-white leading-snug">{idea.title}</h3>
            <IdeaStatusBadge status={idea.status} />
            {idea.classProposal && <ClassProposalBadge proposalClass={idea.proposalClass} />}
            <StageBadge stage={stage} trending={trending} size="sm" />
          </div>
        </div>
      </div>

      <div className="text-gray-400 text-left w-full mt-2 min-h-[4rem]">
        {(idea.description || "").length > 80 ? (
          <div className="w-full">
            <p className="line-clamp-3 overflow-hidden leading-relaxed mb-2 w-full">
              {idea.description}
            </p>
            <span className="text-[#26F2D0] text-sm font-medium cursor-pointer
                             hover:text-white transition-colors block"
              onClick={(e) => { e.stopPropagation(); setShowModal(true); }}>
              read more →
            </span>
          </div>
        ) : (
          <p className="leading-relaxed w-full">{idea.description}</p>
        )}
      </div>

      {idea.status && idea.status !== "OPEN" && (
        <div className="mt-3">
          <IdeaStatusBanner status={idea.status} moderatorNote={idea.moderatorNote}
            reviewedBy={idea.reviewedBy} />
        </div>
      )}

      {showEdit && isMyIdea && (
        <EditForm idea={idea} token={token} setIdeas={setIdeas}
          onClose={() => setShowEdit(false)} />
      )}

      <div className="border-t border-white/10 my-4" />

      <div className="flex justify-between text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <span>{isMyIdea ? "✮ Your Idea" : `by ${idea.createdByName}`}</span>
          <span className="text-xs text-gray-500">• {formattedDate}</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="flex items-center gap-1 text-gray-500">
            <MessageCircle size={14} /> {idea.comments?.length || 0}
          </span>
          <LikeButton idea={idea} rollNumber={rollNumber} token={token} setIdeas={setIdeas} size="sm" />
          {isMyIdea && canEdit && (
            <button onClick={(e) => { e.stopPropagation(); setShowEdit(!showEdit); }}
              className="flex items-center gap-1 text-gray-500 hover:text-[#26F2D0]
                         hover:bg-[#26F2D0]/10 rounded-full p-1 transition-all"
              title={`Edit (${getEditTimeLeft(idea.createdAt)})`}>
              <Pencil size={14} />
            </button>
          )}
          {isMyIdea && <DeleteButton idea={idea} token={token} setIdeas={setIdeas} />}
          <SharePopup idea={idea} />
        </div>
      </div>
    </div>
  );

  // ===== MODAL =====
  const renderModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShowModal(false)} />
      <div className="relative bg-[#111] w-full max-w-2xl max-h-[90vh] overflow-y-auto
              rounded-2xl border-2 border-[#26F2D0]/50 shadow-2xl p-8 z-10 min-w-0">

        <button onClick={() => setShowModal(false)}
          className="absolute top-6 right-6 text-[#26F2D0] hover:text-red-400
                     text-xl font-bold transition">×</button>

        <div className={`absolute top-6 left-6 text-sm font-semibold px-4 py-2 rounded-full
          ${categoryStyles[idea.category] || "bg-gray-500/20 text-gray-400"}`}>
          {idea.category}
        </div>

        <div className="absolute top-6 right-20 text-sm bg-[#1f2937]
                        text-[#26F2D0] px-4 py-2 rounded-full">
          {idea.createdByBranch} · {formatYear(idea.createdByYear)}
        </div>

        {/* ✅ MODAL: title centered alone, badges on separate line below */}
        <div className="flex flex-col items-center mt-12 mb-2">
          <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10
                          flex items-center justify-center shadow-inner mb-4">
            <img src={categoryIcons[idea.category] || "/others.png"}
                 className="w-12 h-12 object-contain" alt="" />
          </div>
          <h2 className="font-bold text-2xl text-center px-4 mb-3">{idea.title}</h2>
          <div className="flex items-center justify-center gap-2 flex-wrap px-4">
            <IdeaStatusBadge status={idea.status} />
            {idea.classProposal && <ClassProposalBadge proposalClass={idea.proposalClass} />}
            <StageBadge stage={stage} trending={trending} size="md" />
          </div>
        </div>

        {idea.status && idea.status !== "OPEN" && (
          <div className="mb-6 mt-4">
            <IdeaStatusBanner status={idea.status} moderatorNote={idea.moderatorNote}
              reviewedBy={idea.reviewedBy} size="lg" />
          </div>
        )}

        {(() => {
          const desc = idea.description || "";
          const sectionMap = {
            "What:": { icon: <Lightbulb size={14} className="text-yellow-400 shrink-0 mt-0.5" />, label: "What" },
            "Why:":  { icon: <Target    size={14} className="text-red-400 shrink-0 mt-0.5" />,    label: "Why"  },
            "How:":  { icon: <Wrench    size={14} className="text-blue-400 shrink-0 mt-0.5" />,   label: "How"  },
            "Who:":  { icon: <Users     size={14} className="text-green-400 shrink-0 mt-0.5" />,  label: "Who"  },
          };
          const isStructured = desc.includes("What:") || desc.includes("Why:");
          if (!isStructured) {
            return (
              <p className="text-gray-300 text-base leading-relaxed mb-8 mt-6
                            whitespace-pre-wrap break-words max-w-full">{desc}</p>
            );
          }
          const sections = desc.split("\n\n").filter(Boolean);
          return (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 mt-6 space-y-4">
              {sections.map((section, i) => {
                const matchedKey = Object.keys(sectionMap).find(k => section.startsWith(k));
                if (matchedKey) {
                  const { icon, label } = sectionMap[matchedKey];
                  const text = section.slice(matchedKey.length).trim();
                  return (
                    <div key={i} className="flex items-start gap-3">
                      {icon}
                      <div>
                        <span className="text-xs font-bold text-white uppercase tracking-widest">{label} :</span>
                        <p className="text-gray-300 text-sm leading-relaxed mt-1">{text}</p>
                      </div>
                    </div>
                  );
                }
                return (
                  <p key={i} className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{section}</p>
                );
              })}
            </div>
          );
        })()}

        <div className="border-t border-white/20 my-6" />

        <div className="flex justify-between text-lg text-gray-400 mb-8">
          <div>
            <span className="font-medium">{isMyIdea ? "✮ Your Idea" : `by ${idea.createdByName}`}</span>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
          <span className="flex items-center gap-2">
            <MessageCircle size={18} /> {idea.comments?.length || 0} comments
          </span>
        </div>

        <div className="border-t border-white/10 pt-6">
          <Comment idea={idea} student={student} ideas={ideas} setIdeas={setIdeas} />
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex gap-4 flex-wrap items-center">
          <LikeButton idea={idea} rollNumber={rollNumber} token={token} setIdeas={setIdeas} size="lg" />
          {!isMyIdea && <EmailButton idea={idea} size="lg" />}
          {isMyIdea && canEdit && (
            <button onClick={() => setShowEdit(!showEdit)}
              className="flex items-center gap-2 px-6 py-2 rounded-full font-medium
                         bg-white/10 text-gray-300 hover:bg-[#26F2D0]/20
                         hover:text-[#26F2D0] transition-all">
              <Pencil size={16} /> Edit ({getEditTimeLeft(idea.createdAt)})
            </button>
          )}
          {isMyIdea && <DeleteButton idea={idea} token={token} setIdeas={setIdeas} />}
        </div>

        {showEdit && isMyIdea && (
          <EditForm idea={idea} token={token} setIdeas={setIdeas}
            onClose={() => setShowEdit(false)} />
        )}
      </div>
    </div>
  );

  return showModal ? renderModal() : renderCompactCard();
}