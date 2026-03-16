import { ExternalLink, Trash2 } from "lucide-react";
import { useState } from "react";

const CATEGORY_ICONS = {
  Tech: "/techh.png",
  Academic: "/academic.png",
  "Campus Pulse": "/campuspulse.png",
  Cultural: "/cultural.png",
};

const CATEGORY_COLORS = {
  Tech: "from-blue-500/20 to-blue-400/5 border-blue-400/20",
  Academic: "from-green-500/20 to-green-400/5 border-green-400/20",
  "Campus Pulse": "from-red-500/20 to-red-400/5 border-red-400/20",
  Cultural: "from-yellow-500/20 to-yellow-400/5 border-yellow-400/20",
};

const getLinkLabel = (url) => {
  if (!url) return "View";
  if (url.includes("youtube") || url.includes("youtu.be")) return "▶ YouTube";
  if (url.includes("instagram")) return "📸 Instagram";
  if (url.includes("drive.google")) return "📁 Drive";
  if (url.includes("linkedin")) return "💼 LinkedIn";
  return "🔗 View";
};

const ShowcaseDeleteButton = ({ ideaId, token, onDeleted }) => {
  const [confirm, setConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleDelete = async (e) => {
    e.stopPropagation();
    setDeleting(true);
    setErrorMsg("");

    try {
      const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        onDeleted(ideaId);
      } else if (res.status === 403) {
        setConfirm(false);
        setErrorMsg("Seems you are not the one who implemented this idea.");
        setTimeout(() => setErrorMsg(""), 3000);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
    }
  };

  if (confirm) {
    return (
      <div className="relative">
        <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
          <span className="text-xs text-gray-400">Remove?</span>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-xs text-red-400 font-semibold px-2 py-0.5
            bg-red-400/10 rounded-full hover:bg-red-400/20 transition
            disabled:opacity-50"
          >
            {deleting ? "..." : "Yes"}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setConfirm(false);
            }}
            className="text-xs text-gray-500 hover:text-white px-2 py-0.5
            bg-white/5 rounded-full transition"
          >
            No
          </button>
        </div>

        {errorMsg && (
          <div className="absolute top-8 right-0 w-52 bg-[#1a1a1a]
          border border-red-500/30 text-red-400 text-xs rounded-xl
          px-3 py-2 shadow-lg z-20">
            {errorMsg}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setConfirm(true);
        }}
        className="p-1.5 rounded-lg text-gray-600 hover:text-red-400
        hover:bg-red-400/10 transition-all"
        title="Remove from showcase"
      >
        <Trash2 size={13} />
      </button>

      {errorMsg && (
        <div className="absolute top-8 right-0 w-52 bg-[#1a1a1a]
        border border-red-500/30 text-red-400 text-xs rounded-xl
        px-3 py-2 shadow-lg z-20">
          {errorMsg}
        </div>
      )}
    </div>
  );
};

const HomeIdeaCard = ({ idea, isModerator, token, onDeleted, formatDate }) => {

  const gradientClass = CATEGORY_COLORS[idea.category]
    || "from-gray-500/20 to-gray-400/5 border-gray-400/20";

  const proposedBy = idea.classProposal
    ? `🏛️ ${idea.proposalClass}`
    : `💡 ${idea.createdByName}`;

  const proposedBySubtext = idea.classProposal
    ? `Class Proposal · ${idea.category}`
    : `${idea.createdByBranch} · ${idea.createdByYear}`;

  return (
    <div
      className={`relative bg-gradient-to-br ${gradientClass} border rounded-2xl
      overflow-hidden transition-all duration-300
      hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(38,242,208,0.1)]`}
    >

      {isModerator && (
        <div className="absolute top-2 right-2 z-10">
          <ShowcaseDeleteButton
            ideaId={idea.id}
            token={token}
            onDeleted={onDeleted}
          />
        </div>
      )}

      {idea.showcaseImageUrl ? (
        <div className="relative h-44 overflow-hidden">
          <img
            src={idea.showcaseImageUrl}
            alt={idea.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <span className="absolute bottom-3 left-3 text-xs px-2 py-0.5
          bg-green-500/80 text-white rounded-full font-medium">
            ✅ Implemented
          </span>
        </div>
      ) : (
        <div className="h-32 flex items-center justify-center bg-white/[0.03]
        border-b border-white/5">
          <img
            src={CATEGORY_ICONS[idea.category] || "/others.png"}
            className="w-16 h-16 object-contain opacity-60"
            alt=""
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">

          <p className="text-white font-bold text-sm leading-snug flex-1">
            {idea.title}
          </p>

          {idea.showcaseLink && (
            <a
              href={idea.showcaseLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="shrink-0 flex items-center gap-1 px-2 py-1
              bg-white/10 hover:bg-[#26F2D0]/20 text-gray-400
              hover:text-[#26F2D0] rounded-lg text-xs transition-all
              border border-white/10 hover:border-[#26F2D0]/30
              whitespace-nowrap"
              title={idea.showcaseLink}
            >
              {getLinkLabel(idea.showcaseLink)}
              <ExternalLink size={10} />
            </a>
          )}
        </div>

        <p className="text-gray-400 text-xs line-clamp-2 mb-3">
          {idea.description}
        </p>

        <div className="flex items-center justify-between">

          <div>
            <p className="text-xs text-gray-300 font-medium">
              {proposedBy}
            </p>

            <p className="text-xs text-gray-500">
              {proposedBySubtext}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-[#26F2D0] font-bold">
              👍 {idea.likes || 0} likes
            </p>

            {idea.reviewedAt && (
              <p className="text-xs text-gray-600">
                {formatDate(idea.reviewedAt)}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomeIdeaCard;