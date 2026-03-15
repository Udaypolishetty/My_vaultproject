import { useEffect, useState } from "react";
import { Trophy, Flame } from "lucide-react";

const CATEGORY_ICONS = {
  Tech: "/techh.png",
  Academic: "/academic.png",
  "Campus Pulse": "/campuspulse.png",
  Cultural: "/cultural.png",
};

const RANK_STYLES = [
  "bg-gradient-to-r from-yellow-500/20 to-yellow-400/5 border-yellow-400/30",
  "bg-gradient-to-r from-gray-400/20 to-gray-300/5 border-gray-400/30",
  "bg-gradient-to-r from-orange-600/20 to-orange-500/5 border-orange-500/30",
];
const RANK_EMOJIS = ["🥇", "🥈", "🥉"];

const getIdeaStage = (likes) => {
  if (likes >= 30) return { label: "Community Favorite", icon: "⭐" };
  if (likes >= 15) return { label: "Gaining Traction",  icon: "🚀" };
  if (likes >= 5)  return { label: "Growing",           icon: "📈" };
  return { label: "Proposed", icon: "💡" };
};

const STATUS_BADGE = {
  IMPLEMENTED: { label: "Implemented", class: "bg-green-500/20 text-green-400 border-green-500/30" },
  UNDER_REVIEW: { label: "Under Review", class: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  REJECTED: { label: "Rejected", class: "bg-red-500/20 text-red-400 border-red-500/30" },
  PENDING: { label: "Pending", class: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
};

export default function IdeasLeaderboard({ myId }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:8081/api/ideas/leaderboard", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setLeaderboard(data))
      .catch(err => console.error("Leaderboard fetch failed:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="text-center py-16 text-gray-500">Loading leaderboard...</div>
  );

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-5">
        <Trophy size={18} className="text-yellow-400" />
        <h3 className="text-lg font-bold text-white">Top Ideas Leaderboard</h3>
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-gray-500">{leaderboard.length} ideas ranked</span>
      </div>

      {/* ✅ Hall of Fame note */}
      <div className="mb-4 flex items-center gap-2 bg-green-500/5 border border-green-500/20
                      rounded-xl px-4 py-2.5">
        <span className="text-green-400 text-sm">🏛️</span>
        <p className="text-xs text-green-400">
          Implemented ideas with 5+ likes are permanently preserved in the leaderboard.
        </p>
      </div>

      {leaderboard.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🏆</p>
          <p className="text-gray-400">No ideas yet. Be the first!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {leaderboard.map((idea, index) => {
            const isMe = String(idea.createdById) === String(myId);
            const stage = getIdeaStage(idea.likes || 0);
            const isTrending = (idea.likes || 0) >= 10 &&
              (Date.now() - new Date(idea.createdAt).getTime()) / 3600000 < 24;
            const isImplemented = idea.status === "IMPLEMENTED";
            const isRejected = idea.status === "REJECTED";
            const statusBadge = STATUS_BADGE[idea.status] || STATUS_BADGE.PENDING;

            return (
              <div key={idea.id}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl border
                  transition-all duration-200 hover:scale-[1.01]
                  ${isImplemented
                    ? "bg-gradient-to-r from-green-500/10 to-[#111] border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.08)]"
                    : isRejected
                      ? "bg-[#0f0f0f] border-white/5 opacity-50"
                      : index < 3
                        ? RANK_STYLES[index]
                        : "bg-[#111] border-white/10 hover:border-white/20"
                  }`}>

                {/* Rank */}
                <div className="w-10 text-center shrink-0">
                  {isImplemented
                    ? <span className="text-xl">✯</span>
                    : isRejected
                      ? <span className="text-xl">❌</span>
                      : index < 3
                        ? <span className="text-2xl">{RANK_EMOJIS[index]}</span>
                        : <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
                  }
                </div>

                {/* Category icon */}
                <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10
                                flex items-center justify-center shrink-0
                                ${isRejected ? "opacity-40" : ""}`}>
                  <img
                    src={CATEGORY_ICONS[idea.category] || "/others.png"}
                    className="w-6 h-6 object-contain" alt=""
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`font-semibold text-sm truncate
                      ${isRejected ? "text-gray-500" : "text-white"}`}>
                      {idea.title}
                    </p>

                    {/* ✅ Status badge */}
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${statusBadge.class}`}>
                      {statusBadge.label}
                    </span>

                    {isTrending && !isRejected && (
                      <span className="flex items-center gap-0.5 text-xs px-2 py-0.5
                                       bg-orange-500/20 text-orange-400 rounded-full
                                       border border-orange-400/30">
                        <Flame size={10} /> Trending
                      </span>
                    )}
                    {isMe && (
                      <span className="text-xs text-[#26F2D0] border border-[#26F2D0]/30
                                       px-2 py-0.5 rounded-full">
                        Yours
                      </span>
                    )}
                    {/* ✅ Hall of fame tag */}
                    {isImplemented && idea.likes > 5 && Boolean(idea.archived) && (
                      <span className="text-xs px-2 py-0.5 rounded-full
                                       bg-yellow-500/20 text-yellow-400 border border-yellow-400/30">
                        🏛️ Hall of Fame
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    by {isMe ? "You" : idea.createdByName} · {idea.createdByBranch} ·
                    <span className={`ml-1 ${
                      idea.likes >= 30 ? "text-yellow-400" :
                      idea.likes >= 15 ? "text-purple-400" :
                      idea.likes >= 5  ? "text-green-400" : "text-gray-500"
                    }`}>{stage.icon} {stage.label}</span>
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-center">
                    <p className={`text-lg font-bold ${
                      isImplemented ? "text-green-400" :
                      isRejected    ? "text-gray-600" :
                      index === 0   ? "text-yellow-400" :
                      index === 1   ? "text-gray-300" :
                      index === 2   ? "text-orange-400" : "text-[#26F2D0]"
                    }`}>{idea.likes || 0}</p>
                    <p className="text-xs text-gray-500">likes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-400">
                      {idea.comments?.length || 0}
                    </p>
                    <p className="text-xs text-gray-500">replies</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}