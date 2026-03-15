// import { Trash2 } from "lucide-react";

// export default function CommentItem({ comment, student, onDelete }) {

//   const timeAgo = (ts) => {
//     if (!ts) return "Just now";
//     const past = new Date(ts).getTime();
//     const seconds = Math.floor((Date.now() - past) / 1000);
//     if (seconds < 60) return "Just now";
//     if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
//     if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
//     return `${Math.floor(seconds / 86400)}d ago`;
//   };

//   const isOwner = comment.ownerRoll === student?.rollNumber;

//   // ✅ Debug — remove after fixing
//   console.log("comment object:", comment);

//   return (
//     <div className="flex items-start gap-3">
//       <div className="w-8 h-8 rounded-full bg-[#1f2937]
//                       text-[#26F2D0] flex items-center justify-center
//                       text-xs font-bold flex-shrink-0">
//         {comment.commentedBy?.charAt(0)}
//       </div>

//       <div className="bg-[#1b1b1b] px-4 py-3 rounded-xl w-full text-left">
//         <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
//           <span>
//             <b className="text-white">{comment.commentedBy}</b>
//             {" · "}{comment.commentedBranch}
//             {" · "}{comment.commentedYear}
//           </span>

//           <div className="flex items-center gap-3">
//             <span>{timeAgo(comment.commentedAt)}</span>
//             {isOwner && (
//               <button
//                 onClick={onDelete}
//                 className="text-red-400 hover:text-red-500 transition"
//               >
//                 <Trash2 className="w-3 h-4" />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* ✅ This is the comment text */}
//         <p className="text-gray-200 text-sm leading-relaxed">
//           {comment.comment}
//         </p>
//       </div>
//     </div>
//   );
// }



import { Trash2 } from "lucide-react";

export default function CommentItem({ comment, student, onDelete }) {

  const timeAgo = (ts) => {
    if (!ts) return "Just now";
    const past = new Date(ts).getTime();
    const seconds = Math.floor((Date.now() - past) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const isOwner = comment.ownerRoll === student?.rollNumber;

  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-[#1f2937]
                      text-[#26F2D0] flex items-center justify-center
                      text-xs font-bold flex-shrink-0">
        {comment.commentedBy?.charAt(0)}
      </div>

      <div className="bg-[#1b1b1b] px-4 py-3 rounded-xl w-full text-left">
        <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
          <span>
            <b className="text-white">{comment.commentedBy}</b>
            {" · "}{comment.commentedBranch}
            {" · "}{comment.commentedYear}
          </span>

          <div className="flex items-center gap-3">
            <span>{timeAgo(comment.commentedAt)}</span>
            {isOwner && (
              <button
                onClick={onDelete}
                className="text-red-400 hover:text-red-500 transition"
              >
                <Trash2 className="w-3 h-4" />
              </button>
            )}
          </div>
        </div>

        <p className="text-gray-200 text-sm leading-relaxed">
          {comment.comment}
        </p>
      </div>
    </div>
  );
}