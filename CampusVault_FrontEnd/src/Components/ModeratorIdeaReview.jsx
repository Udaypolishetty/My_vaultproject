import { useState, useEffect } from "react";
import IdeaReviewCard from "./IdeaReviewCard";

// ✅ needed for filter tabs only
const STATUS_OPTIONS = [
  { value: "UNDER_REVIEW", label: "Under Review", icon: "🔍" },
  { value: "IMPLEMENTED",  label: "Implemented",  icon: "✅" },
  { value: "ON_HOLD",      label: "On Hold",      icon: "⏸" },
  { value: "REJECTED",     label: "Rejected",     icon: "❌" },
  { value: "OPEN",         label: "Open",         icon: "💡" },
];

export default function ModeratorIdeaReview({ token, isAdmin = false }) {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState("ALL");

  // ✅ audit log — admin only
  const [showAudit, setShowAudit] = useState(false);
  const auditIdeas = ideas.filter(i => i.reviewedBy && i.reviewedAt);

  useEffect(() => {
    fetch("http://localhost:8081/api/ideas")
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        setIdeas(sorted);
      })
      .catch(err => console.error("Failed to fetch ideas:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredIdeas = activeStatus === "ALL"
    ? ideas
    : ideas.filter(i => (i.status || "OPEN") === activeStatus);

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-[#26F2D0] border-t-transparent
                      rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#26F2D0]/10 border border-[#26F2D0]/20
                          flex items-center justify-center text-xl">💡</div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {isAdmin ? "Admin Ideas Control" : "Ideas Review Panel"}
            </h3>
            <p className="text-xs text-gray-400">
              {isAdmin
                ? "Full control — review, override, delete · "
                : "Review and manage student ideas · "}
              {ideas.length} total
            </p>
          </div>
        </div>

        {/* ✅ audit log toggle — admin only */}
        {isAdmin && (
          <button
            onClick={() => setShowAudit(prev => !prev)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm
                       font-medium border transition-all
                       ${showAudit
                         ? "bg-purple-500/20 text-purple-400 border-purple-400/30"
                         : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
                       }`}
          >
            📋 {showAudit ? "Hide Audit Log" : "View Audit Log"}
            <span className="bg-white/10 px-1.5 py-0.5 rounded-full text-xs">
              {auditIdeas.length}
            </span>
          </button>
        )}
      </div>

      {/* ✅ Audit log panel — admin only */}
      {isAdmin && showAudit && (
        <div className="bg-[#111] border border-purple-400/20 rounded-2xl p-5">
          <h4 className="text-sm font-semibold text-purple-400 mb-4">
            📋 Audit Log — All Reviewed Ideas
          </h4>
          {auditIdeas.length === 0 ? (
            <p className="text-gray-500 text-sm">No ideas reviewed yet.</p>
          ) : (
            <div className="space-y-2">
              {auditIdeas.map(idea => {
                const statusOpt = STATUS_OPTIONS.find(s => s.value === idea.status) || STATUS_OPTIONS[4];
                return (
                  <div key={idea.id}
                    className="flex items-center justify-between gap-3
                               bg-white/5 rounded-xl px-4 py-3 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{idea.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        by {idea.createdByName} · {idea.createdByBranch}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 flex-wrap">
                      <span className="text-xs px-2 py-0.5 rounded-full border font-medium
                                       bg-white/5 text-gray-300 border-white/10">
                        {statusOpt.icon} {statusOpt.label}
                      </span>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">
                          by <span className="text-white">{idea.reviewedBy}</span>
                        </p>
                        <p className="text-xs text-gray-600">
                          {new Date(idea.reviewedAt).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric"
                          })}
                        </p>
                      </div>
                      {idea.moderatorNote && (
                        <p className="text-xs text-gray-500 italic max-w-[200px] truncate">
                          "{idea.moderatorNote}"
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {["ALL", "OPEN", "UNDER_REVIEW", "ON_HOLD", "IMPLEMENTED", "REJECTED"].map(s => {
          const opt = STATUS_OPTIONS.find(o => o.value === s);
          const count = s === "ALL"
            ? ideas.length
            : ideas.filter(i => (i.status || "OPEN") === s).length;
          return (
            <button
              key={s}
              onClick={() => setActiveStatus(s)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs
                         font-medium border transition-all
                         ${activeStatus === s
                           ? "bg-[#26F2D0] text-black border-[#26F2D0]"
                           : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
                         }`}
            >
              {opt?.icon || "📋"} {s === "ALL" ? "All" : opt?.label}
              <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold
                ${activeStatus === s ? "bg-black/20" : "bg-white/10"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Ideas list */}
      {filteredIdeas.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">💡</p>
          <p className="text-gray-400">No ideas in this category</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredIdeas.map(idea => (
            <IdeaReviewCard
              key={idea.id}
              idea={idea}
              token={token}
              isAdmin={isAdmin}
              onUpdated={(updated) =>
                setIdeas(prev => prev.map(i => i.id === updated.id
                  ? { ...i, ...updated } : i))
              }
              onDeleted={(id) =>
                setIdeas(prev => prev.filter(i => i.id !== id))
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}