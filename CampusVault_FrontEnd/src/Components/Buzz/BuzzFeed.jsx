import { useState } from "react";
import { Search } from "lucide-react";
import BuzzPostCard from "./BuzzPostCard";

const TAG_CONFIG = {
  STUDY_GROUP: { label: "Study Group", emoji: "📚", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  LOST_FOUND:  { label: "Lost & Found", emoji: "🔍", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  OPPORTUNITY: { label: "Opportunity",  emoji: "💼", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  EVENT:       { label: "Event",        emoji: "🎉", color: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
  GENERAL:     { label: "General",      emoji: "💬", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
};

const getScore = (post) => {
  const ageHours = (Date.now() - new Date(post.createdAt).getTime()) / 3600000;
  const recency = Math.max(0, 72 - ageHours) / 72;
  return (post.likes || 0) + ((post.replies?.length || 0) * 2) + (recency * 3);
};

export default function BuzzFeed({ posts, token, myRoll, role, onUpdate, onDelete }) {
  const [filterTag, setFilterTag] = useState("ALL");
  const [search, setSearch] = useState("");

  const filtered = posts
    .filter(p => filterTag === "ALL" || p.tag === filterTag)
    .filter(p => {
      if (!search.trim()) return true;
      return p.content.toLowerCase().includes(search.toLowerCase()) ||
             p.createdByName.toLowerCase().includes(search.toLowerCase());
    });

  const hotPosts = [...posts]
    .filter(p => {
      const ageHours = (Date.now() - new Date(p.createdAt).getTime()) / 3600000;
      return ageHours < 24 && ((p.likes || 0) + (p.replies?.length || 0)) > 0 && !p.resolved;
    })
    .sort((a, b) => getScore(b) - getScore(a))
    .slice(0, 2);

  const sorted = [...filtered].sort((a, b) => {
    if (a.resolved && !b.resolved) return 1;
    if (!a.resolved && b.resolved) return -1;
    return getScore(b) - getScore(a);
  });

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search posts..."
          className="w-full bg-[#111] border border-white/10 rounded-full pl-10 pr-4
                     py-2.5 text-sm text-white placeholder-gray-500 outline-none
                     focus:border-[#26F2D0]/50 transition" />
        {search && (
          <button onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">✕</button>
        )}
      </div>

      {/* Filter Tags */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        <button onClick={() => setFilterTag("ALL")}
          className={`text-xs px-4 py-1.5 rounded-full border whitespace-nowrap transition-all
            ${filterTag === "ALL"
              ? "bg-[#26F2D0]/20 text-[#26F2D0] border-[#26F2D0]/30"
              : "border-white/10 text-gray-500 hover:border-white/30"}`}>
          🌐 All
        </button>
        {Object.entries(TAG_CONFIG).map(([key, val]) => (
          <button key={key} onClick={() => setFilterTag(key)}
            className={`text-xs px-4 py-1.5 rounded-full border whitespace-nowrap transition-all
              ${filterTag === key ? val.color : "border-white/10 text-gray-500 hover:border-white/30"}`}>
            {val.emoji} {val.label}
          </button>
        ))}
      </div>

      {/* Hot Right Now */}
      {hotPosts.length > 0 && filterTag === "ALL" && !search && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-semibold text-orange-400">🔥 Hot Right Now</span>
            <div className="flex-1 h-px bg-orange-400/20" />
          </div>
          <div className="space-y-3">
            {hotPosts.map(post => (
              <BuzzPostCard key={post.id} post={post} token={token}
                myRoll={myRoll} role={role} isHot={true}
                onUpdate={onUpdate} onDelete={onDelete} />
            ))}
          </div>
        </div>
      )}

      {/* All Posts */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-semibold text-gray-400">
          {search ? `🔎 Results for "${search}"`
            : filterTag === "ALL" ? "✨ All Buzz"
            : `${TAG_CONFIG[filterTag]?.emoji} ${TAG_CONFIG[filterTag]?.label}`}
        </span>
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-gray-600">{sorted.length} posts</span>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-sm">
            {search ? `No posts found for "${search}"` : "No posts in this category yet"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map(post => (
            <BuzzPostCard key={post.id} post={post} token={token}
              myRoll={myRoll} role={role} isHot={false}
              onUpdate={onUpdate} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}