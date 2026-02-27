//import { Trash2 } from "lucide-react";

export default function CommentItem({
  comment,
  student,
  onDelete
}) {
  const timeAgo = (ts) => {
    if (!ts) return "Just now";
    const seconds = Math.floor((Date.now() - ts) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const isOwner = comment.name === student.name;

  return (
    <div className="flex items-start gap-3">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-[#1f2937]
                      text-[#26F2D0] flex items-center justify-center
                      text-xs font-bold">
        {comment.name?.charAt(0)}
      </div>

      {/* Comment Bubble */}
      <div className="bg-[#1b1b1b] px-4 py-2 rounded-xl w-full text-left">
        {/* Header */}
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>
            <b className="text-white">{comment.name}</b>
            {" · "}
            {comment.branch}
            {" · "}
            {comment.year}
          </span>

          <div className="flex items-center gap-3">
            <span>{timeAgo(comment.createdAt)}</span>

            {/* 🗑️ DELETE ICON */}
            {isOwner && (
              <button
                onClick={onDelete}
                className="text-red-400 hover:text-red-500 transition"
                title="Delete comment"
              >
                <Trash2 className="w-3 h-6"/>
              </button>
            )}
          </div>
        </div>

        {/* Text */}
        <p className="text-gray-200 text-sm mt-1">
          {comment.text}
        </p>
      </div>
    </div>
  );
}