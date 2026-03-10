import { useState } from "react";

const getStampConfig = (status) => {
  switch (status) {
    case "IMPLEMENTED":
      return { label: "✅ Done", border: "border-green-400", text: "text-green-400" };
    case "ON_HOLD":
      return { label: "⏸ Hold", border: "border-yellow-400", text: "text-yellow-400" };
    case "REJECTED":
      return { label: "❌ Rejected", border: "border-red-400", text: "text-red-400" };
    case "UNDER_REVIEW":
      return { label: "🔍 Review", border: "border-blue-400", text: "text-blue-400" };
    default:
      return null;
  }
};

const categoryStyles = {
  Tech: "bg-blue-500/20 text-blue-400",
  Academic: "bg-green-500/20 text-green-400",
  "Campus Pulse": "bg-red-500/20 text-red-400",
  Cultural: "bg-yellow-300/20 text-yellow-400",
  Others: "bg-gray-500/20 text-gray-400",
};

export default function IdeaAdminCard({ idea, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const stamp = getStampConfig(idea.status);
  const token = sessionStorage.getItem("token");

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:8081/api/ideas/${idea.id || idea._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) onDelete(idea.id || idea._id);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl p-4
                    overflow-hidden transition-all hover:border-white/20">

      {/* ✅ stamp overlay */}
      {stamp && !confirmDelete && (
        <div className="absolute inset-0 flex items-center justify-center
                        pointer-events-none z-10">
          <div className={`rotate-[-20deg] border-4 rounded-2xl px-5 py-2
                          opacity-20 ${stamp.border}`}>
            <p className={`text-3xl font-black tracking-widest uppercase
                          ${stamp.text}`}>
              {stamp.label}
            </p>
          </div>
        </div>
      )}

      {/* ✅ confirm delete overlay */}
      {confirmDelete && (
        <div className="absolute inset-0 bg-[#1a1a1a]/95 rounded-2xl z-20
                        flex flex-col items-center justify-center gap-3 p-4">
          <p className="text-2xl">🗑️</p>
          <p className="text-white font-semibold text-sm text-center">
            Delete "{idea.title}"?
          </p>
          <p className="text-gray-400 text-xs text-center">
            This cannot be undone. Student will lose this idea permanently.
          </p>
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => setConfirmDelete(false)}
              className="px-4 py-2 bg-white/10 text-gray-300 rounded-xl
                         text-xs hover:bg-white/20 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-2 bg-red-600 text-white rounded-xl
                         text-xs font-semibold hover:bg-red-700 transition
                         disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Yes, Delete"}
            </button>
          </div>
        </div>
      )}

      {/* Card content */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium
            ${categoryStyles[idea.category] || "bg-gray-500/20 text-gray-400"}`}>
            {idea.category}
          </span>
          {idea.status && idea.status !== "OPEN" && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium
              ${stamp?.text || "text-gray-400"} bg-white/5`}>
              {stamp?.label}
            </span>
          )}
        </div>
        <button
          onClick={() => setConfirmDelete(true)}
          className="shrink-0 ml-2 px-2 py-1 bg-red-600/20 hover:bg-red-600
                     text-red-400 hover:text-white rounded-lg text-xs
                     border border-red-600/30 transition-all font-medium"
        >
          Delete
        </button>
      </div>

      <h3 className="font-semibold text-white text-sm mb-1">{idea.title}</h3>
      <p className="text-gray-400 text-xs mb-3 line-clamp-2">{idea.description}</p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>by {idea.createdByName || "—"} · {idea.createdByBranch || ""}</span>
        <div className="flex gap-3">
          <span>👍 {idea.likes || 0}</span>
          <span>💬 {idea.comments?.length || 0}</span>
        </div>
      </div>

      {idea.reviewedBy && (
        <p className="text-xs text-purple-400 mt-2">
          Reviewed by {idea.reviewedBy}
        </p>
      )}
    </div>
  );
}