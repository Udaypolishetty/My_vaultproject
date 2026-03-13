import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThumbsUp, MessageCircle, Flame } from "lucide-react";

const getIdeaStage = (likes) => {
  if (likes >= 30) return { label: "Community Favorite", icon: "⭐", color: "bg-yellow-400/15 text-yellow-400" };
  if (likes >= 15) return { label: "Gaining Traction", icon: "🚀", color: "bg-purple-400/15 text-purple-400" };
  if (likes >= 5)  return { label: "Growing", icon: "📈", color: "bg-green-400/15 text-green-400" };
  return null;
};

const isTrending = (idea) => {
  if ((idea.likes || 0) < 10) return false;
  return (Date.now() - new Date(idea.createdAt).getTime()) / 3600000 < 24;
};

const categoryIcons = {
  Tech: "/techh.png",
  Academic: "/academic.png",
  "Campus Pulse": "/campuspulse.png",
  Cultural: "/cultural.png",
  Others: "/others.png",
};

const categoryStyles = {
  Tech: "bg-blue-500/20 text-blue-400",
  Academic: "bg-green-500/20 text-green-400",
  "Campus Pulse": "bg-red-500/20 text-red-400",
  Cultural: "bg-yellow-300/20 text-yellow-400",
};

export default function PublicIdeaPage() {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8081/api/ideas/${id}`)
      .then(res => {
        if (!res.ok) { setNotFound(true); return null; }
        return res.json();
      })
      .then(data => {
        if (data) setIdea(data);
        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [id]);

  const formatYear = (y) => {
    if (!y) return "";
    const n = parseInt(y);
    if (n === 1) return "1st Year";
    if (n === 2) return "2nd Year";
    if (n === 3) return "3rd Year";
    return n + "th Year";
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-[#26F2D0] border-t-transparent
                        rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading idea...</p>
      </div>
    </div>
  );

  if (notFound) return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
      <p className="text-6xl">💡</p>
      <p className="text-white text-xl font-bold">Idea not found</p>
      <p className="text-gray-400 text-sm">This idea may have been deleted or the link is invalid.</p>
      <a href="/"
         className="mt-4 px-6 py-2 bg-[#26F2D0] text-black rounded-xl font-semibold
                    hover:bg-[#1fd4b8] transition">
        Go to Campus Vault
      </a>
    </div>
  );

  const stage = getIdeaStage(idea.likes || 0);
  const trending = isTrending(idea);
  const formattedDate = idea.createdAt
    ? new Date(idea.createdAt).toLocaleDateString("en-IN", {
        year: "numeric", month: "long", day: "numeric"
      })
    : "";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Top bar */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[#26F2D0] font-bold text-lg">Campus Vault</span>
          <span className="text-gray-600 text-sm">/ Ideas Board</span>
        </div>
        <a href="/"
           className="px-4 py-1.5 bg-[#26F2D0] text-black rounded-lg text-sm font-semibold
                      hover:bg-[#1fd4b8] transition">
          Open App →
        </a>
      </div>

      {/* Main card */}
      <div className="max-w-2xl mx-auto px-4 py-12">

        {/* Trending banner */}
        {trending && (
          <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-400/20
                          rounded-xl px-4 py-2 mb-6 w-fit">
            <Flame size={14} className="text-orange-400 animate-pulse" />
            <span className="text-orange-400 text-sm font-semibold">Trending Right Now</span>
          </div>
        )}

        <div className="bg-[#111] rounded-2xl border border-white/10 p-8
                        shadow-[0_0_40px_rgba(38,242,208,0.05)]">

          {/* Category + branch */}
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
            <span className={`text-sm font-semibold px-3 py-1 rounded-full
              ${categoryStyles[idea.category] || "bg-gray-500/20 text-gray-400"}`}>
              {idea.category}
            </span>
            <span className="text-xs bg-[#1f2937] text-[#26F2D0] px-3 py-1 rounded-full">
              {idea.createdByBranch} · {formatYear(idea.createdByYear)}
            </span>
          </div>

          {/* Icon + Title */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10
                            flex items-center justify-center shrink-0">
              <img src={categoryIcons[idea.category] || "/others.png"}
                   className="w-8 h-8 object-contain" alt="" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold">{idea.title}</h1>
                {stage && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${stage.color}`}>
                    {stage.icon} {stage.label}
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm mt-1">
                by {idea.createdByName} · {formattedDate}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 leading-relaxed text-base mt-6 mb-8">
            {idea.description}
          </p>

          <div className="border-t border-white/10 pt-6 flex items-center gap-6">
            <div className="flex items-center gap-2 text-[#26F2D0]">
              <ThumbsUp size={16} fill="#26F2D0" />
              <span className="font-semibold">{idea.likes || 0}</span>
              <span className="text-gray-500 text-sm">likes</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <MessageCircle size={16} />
              <span className="font-semibold">{idea.comments?.length || 0}</span>
              <span className="text-gray-500 text-sm">comments</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-gray-400 text-sm mb-3">
              Want to like or comment on this idea?
            </p>
            <a href="/"
               className="inline-block px-6 py-2.5 bg-[#26F2D0] text-black rounded-xl
                          font-semibold hover:bg-[#1fd4b8] transition text-sm">
              Join Campus Vault →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}