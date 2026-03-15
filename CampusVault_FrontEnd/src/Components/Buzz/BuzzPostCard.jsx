// import { useState } from "react";
// import { Trash2, ThumbsUp, MessageCircle, CheckCircle2 } from "lucide-react";

// const TAG_CONFIG = {
//   STUDY_GROUP: { label: "Study Group", emoji: "📚", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
//   LOST_FOUND:  { label: "Lost & Found", emoji: "🔍", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
//   OPPORTUNITY: { label: "Opportunity",  emoji: "💼", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
//   EVENT:       { label: "Event",        emoji: "🎉", color: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
//   GENERAL:     { label: "General",      emoji: "💬", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
// };

// const formatTime = (dt) => {
//   const diff = Date.now() - new Date(dt).getTime();
//   const mins = Math.floor(diff / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins}m ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs}h ago`;
//   return `${Math.floor(hrs / 24)}d ago`;
// };

// const getVisibilityLabel = (post) => {
//   if (!post.visibility || post.visibility === "EVERYONE") return null;
//   if (post.visibility === "MY_YEAR") return `🎓 ${post.createdByYear} only`;
//   if (post.visibility === "MY_BRANCH") return `🏛️ ${post.createdByBranch} only`;
//   if (post.visibility === "MY_YEAR_BRANCH") return `🎯 ${post.createdByYear} · ${post.createdByBranch} only`;
//   return null;
// };

// export default function BuzzPostCard({ post, token, myRoll, role, isHot, onUpdate, onDelete }) {
//   const [replyText, setReplyText] = useState("");
//   const [expanded, setExpanded] = useState(false);

//   const tagCfg = TAG_CONFIG[post.tag] || TAG_CONFIG.GENERAL;
//   const isMyPost = post.createdByRollNumber === myRoll;
//   const isAdmin = role === "ADMIN";
//   const hasLiked = (post.likedBy || []).includes(myRoll);
//   const visLabel = getVisibilityLabel(post);
//   const daysLeft = Math.max(0, Math.ceil((new Date(post.expiresAt) - Date.now()) / 86400000));
//   const expiringSoon = !post.resolved && daysLeft <= 1;
//   const canResolve = (isMyPost || isAdmin) && !post.resolved;

//   const handleLike = async () => {
//     const res = await fetch(`http://localhost:8081/api/buzz/${post.id}/like`, {
//       method: "POST", headers: { Authorization: `Bearer ${token}` },
//     });
//     if (res.ok) onUpdate(await res.json());
//   };

//   const handleReply = async () => {
//     if (!replyText.trim()) return;
//     const res = await fetch(`http://localhost:8081/api/buzz/${post.id}/reply`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//       body: JSON.stringify({ content: replyText }),
//     });
//     if (res.ok) { onUpdate(await res.json()); setReplyText(""); }
//   };

//   const handleDeleteReply = async (replyId) => {
//     const res = await fetch(`http://localhost:8081/api/buzz/${post.id}/reply/${replyId}`, {
//       method: "DELETE", headers: { Authorization: `Bearer ${token}` },
//     });
//     if (res.ok) onUpdate(await res.json());
//   };

//   const handleDeletePost = async () => {
//     if (!window.confirm("Delete this post?")) return;
//     const res = await fetch(`http://localhost:8081/api/buzz/${post.id}`, {
//       method: "DELETE", headers: { Authorization: `Bearer ${token}` },
//     });
//     if (res.ok) onDelete(post.id);
//   };

//   const handleResolve = async () => {
//     const res = await fetch(`http://localhost:8081/api/buzz/${post.id}/resolve`, {
//       method: "PATCH", headers: { Authorization: `Bearer ${token}` },
//     });
//     if (res.ok) onUpdate(await res.json());
//   };

//   return (
//     <div className={`border rounded-2xl p-5 transition-all duration-200
//       ${post.resolved
//         ? "bg-green-500/5 border-green-500/20 opacity-80"
//         : isHot
//           ? "bg-gradient-to-br from-orange-500/5 to-[#111] border-orange-400/20 hover:border-orange-400/40"
//           : expiringSoon
//             ? "bg-red-500/5 border-red-500/20 hover:border-red-500/40"
//             : "bg-[#111] border-white/10 hover:border-white/20"
//       }`}>

//       {/* Resolved banner */}
//       {post.resolved && (
//         <div className="flex items-center gap-2 mb-3 bg-green-500/10 border border-green-500/20
//                         rounded-xl px-3 py-2">
//           <CheckCircle2 size={14} className="text-green-400 shrink-0" />
//           <span className="text-xs text-green-400 font-medium">Marked as Resolved</span>
//         </div>
//       )}

//       {/* Header */}
//       <div className="flex items-start justify-between gap-3 mb-3">
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10
//                           flex items-center justify-center text-sm font-bold text-[#26F2D0]">
//             {post.createdByName?.[0]?.toUpperCase()}
//           </div>
//           <div>
//             <p className="text-sm font-semibold text-white">
//               {isMyPost ? "You" : post.createdByName}
//             </p>
//             <p className="text-xs text-gray-500">
//               {post.createdByBranch} · {post.createdByYear} · {formatTime(post.createdAt)}
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2 flex-wrap justify-end">
//           <span className={`text-xs px-3 py-1 rounded-full border ${tagCfg.color}`}>
//             {tagCfg.emoji} {tagCfg.label}
//           </span>
//           {visLabel && (
//             <span className="text-xs px-2 py-0.5 rounded-full border border-white/10
//                              text-gray-500 whitespace-nowrap">
//               {visLabel}
//             </span>
//           )}
//           {isMyPost && (
//             <button onClick={handleDeletePost}
//               className="w-7 h-7 rounded-full flex items-center justify-center
//                          text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-all">
//               <Trash2 size={14} />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Content */}
//       <p className={`text-sm leading-relaxed mb-4 whitespace-pre-wrap
//         ${post.resolved ? "text-gray-400" : "text-gray-200"}`}>
//         {post.content}
//       </p>

//       {/* Actions */}
//       <div className="flex items-center gap-4 text-sm flex-wrap">
//         <button onClick={handleLike}
//           className={`flex items-center gap-1.5 transition-all
//             ${hasLiked ? "text-[#26F2D0]" : "text-gray-500 hover:text-[#26F2D0]"}`}>
//           <ThumbsUp size={15} fill={hasLiked ? "#26F2D0" : "none"} />
//           <span>{post.likes || 0}</span>
//         </button>

//         <button onClick={() => { setExpanded(!expanded); setReplyText(""); }}
//           className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-all">
//           <MessageCircle size={15} />
//           <span>{post.replies?.length || 0}</span>
//         </button>

//         {canResolve && (
//           <button onClick={handleResolve}
//             className="flex items-center gap-1.5 text-gray-500 hover:text-green-400
//                        hover:bg-green-400/10 px-3 py-1 rounded-full transition-all
//                        text-xs border border-white/10 hover:border-green-400/30">
//             <CheckCircle2 size={13} />
//             Mark Resolved
//           </button>
//         )}

//         <span className={`ml-auto text-xs ${expiringSoon ? "text-red-400 font-medium" : "text-gray-600"}`}>
//           {post.resolved ? "✅ resolved" : expiringSoon ? "⚠️ expires soon" : `expires in ${daysLeft}d`}
//         </span>
//       </div>

//       {/* Replies */}
//       {expanded && (
//         <div className="mt-4 border-t border-white/10 pt-4 space-y-3">
//           {(post.replies || []).length === 0 ? (
//             <p className="text-xs text-gray-600 text-center py-2">No replies yet</p>
//           ) : (
//             post.replies.map(reply => (
//               <div key={reply.id}
//                 className="flex items-start gap-3 bg-white/[0.03] rounded-xl p-3">
//                 <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10
//                                 flex items-center justify-center text-xs font-bold text-[#26F2D0]">
//                   {reply.createdByName?.[0]?.toUpperCase()}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center justify-between">
//                     <p className="text-xs font-semibold text-white">
//                       {reply.createdByRollNumber === myRoll ? "You" : reply.createdByName}
//                       <span className="text-gray-500 font-normal ml-2">
//                         · {reply.createdByBranch} · {formatTime(reply.createdAt)}
//                       </span>
//                     </p>
//                     {reply.createdByRollNumber === myRoll && (
//                       <button onClick={() => handleDeleteReply(reply.id)}
//                         className="text-gray-600 hover:text-red-400 transition text-xs ml-2">✕</button>
//                     )}
//                   </div>
//                   <p className="text-xs text-gray-300 mt-1 leading-relaxed">{reply.content}</p>
//                 </div>
//               </div>
//             ))
//           )}
//           {!post.resolved && !(post.replies || []).some(r => r.createdByRollNumber === myRoll) && (
//             <div className="flex items-center gap-2 mt-2">
//               <input value={replyText} onChange={e => setReplyText(e.target.value)}
//                 onKeyDown={e => e.key === "Enter" && handleReply()}
//                 placeholder="Write a reply..." maxLength={200}
//                 className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2
//                            text-xs text-white placeholder-gray-500 outline-none
//                            focus:border-[#26F2D0]/50 transition" />
//               <button onClick={handleReply} disabled={!replyText.trim()}
//                 className="px-4 py-2 rounded-full text-xs font-semibold bg-[#26F2D0]/20
//                            text-[#26F2D0] hover:bg-[#26F2D0]/30 disabled:opacity-40 transition">
//                 Reply
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }




import { useState } from "react";
import { Trash2, ThumbsUp, MessageCircle, CheckCircle2 } from "lucide-react";
import { validateShortText } from "../../utils/validate"; // ✅ IMPORTED

const TAG_CONFIG = {
  STUDY_GROUP: { label: "Study Group", emoji: "📚", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  LOST_FOUND:  { label: "Lost & Found", emoji: "🔍", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  OPPORTUNITY: { label: "Opportunity",  emoji: "💼", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  EVENT:       { label: "Event",        emoji: "🎉", color: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
  GENERAL:     { label: "General",      emoji: "💬", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
};

const formatTime = (dt) => {
  const diff = Date.now() - new Date(dt).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

const getVisibilityLabel = (post) => {
  if (!post.visibility || post.visibility === "EVERYONE") return null;
  if (post.visibility === "MY_YEAR") return `🎓 ${post.createdByYear} only`;
  if (post.visibility === "MY_BRANCH") return `🏛️ ${post.createdByBranch} only`;
  if (post.visibility === "MY_YEAR_BRANCH") return `🎯 ${post.createdByYear} · ${post.createdByBranch} only`;
  return null;
};

export default function BuzzPostCard({ post, token, myRoll, role, isHot, onUpdate, onDelete }) {
  const [replyText, setReplyText] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [replyError, setReplyError] = useState(""); // ✅ ADDED

  const tagCfg = TAG_CONFIG[post.tag] || TAG_CONFIG.GENERAL;
  const isMyPost = post.createdByRollNumber === myRoll;
  const isAdmin = role === "ADMIN";
  const hasLiked = (post.likedBy || []).includes(myRoll);
  const visLabel = getVisibilityLabel(post);
  const daysLeft = Math.max(0, Math.ceil((new Date(post.expiresAt) - Date.now()) / 86400000));
  const expiringSoon = !post.resolved && daysLeft <= 1;
  const canResolve = (isMyPost || isAdmin) && !post.resolved;

  const handleLike = async () => {
    const res = await fetch(`http://localhost:8081/api/buzz/${post.id}/like`, {
      method: "POST", headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) onUpdate(await res.json());
  };

  const handleReply = async () => {
    if (!replyText.trim()) return;

    // ✅ INTEGRATED VALIDATION
    const result = validateShortText(replyText, 200, "Reply");
    if (!result.valid) {
      setReplyError(result.error);
      return;
    }

    setReplyError(""); // ✅ clear previous errors
    const res = await fetch(`http://localhost:8081/api/buzz/${post.id}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ content: replyText }),
    });
    if (res.ok) { 
      onUpdate(await res.json()); 
      setReplyText(""); 
    }
  };

  const handleDeleteReply = async (replyId) => {
    const res = await fetch(`http://localhost:8081/api/buzz/${post.id}/reply/${replyId}`, {
      method: "DELETE", headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) onUpdate(await res.json());
  };

  const handleDeletePost = async () => {
    if (!window.confirm("Delete this post?")) return;
    const res = await fetch(`http://localhost:8081/api/buzz/${post.id}`, {
      method: "DELETE", headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) onDelete(post.id);
  };

  const handleResolve = async () => {
    const res = await fetch(`http://localhost:8081/api/buzz/${post.id}/resolve`, {
      method: "PATCH", headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) onUpdate(await res.json());
  };

  return (
    <div className={`border rounded-2xl p-5 transition-all duration-200
      ${post.resolved
        ? "bg-green-500/5 border-green-500/20 opacity-80"
        : isHot
          ? "bg-gradient-to-br from-orange-500/5 to-[#111] border-orange-400/20 hover:border-orange-400/40"
          : expiringSoon
            ? "bg-red-500/5 border-red-500/20 hover:border-red-500/40"
            : "bg-[#111] border-white/10 hover:border-white/20"
      }`}>

      {/* Resolved banner */}
      {post.resolved && (
        <div className="flex items-center gap-2 mb-3 bg-green-500/10 border border-green-500/20
                        rounded-xl px-3 py-2">
          <CheckCircle2 size={14} className="text-green-400 shrink-0" />
          <span className="text-xs text-green-400 font-medium">Marked as Resolved</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10
                          flex items-center justify-center text-sm font-bold text-[#26F2D0]">
            {post.createdByName?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              {isMyPost ? "You" : post.createdByName}
            </p>
            <p className="text-xs text-gray-500">
              {post.createdByBranch} · {post.createdByYear} · {formatTime(post.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <span className={`text-xs px-3 py-1 rounded-full border ${tagCfg.color}`}>
            {tagCfg.emoji} {tagCfg.label}
          </span>
          {visLabel && (
            <span className="text-xs px-2 py-0.5 rounded-full border border-white/10
                             text-gray-500 whitespace-nowrap">
              {visLabel}
            </span>
          )}
          {isMyPost && (
            <button onClick={handleDeletePost}
              className="w-7 h-7 rounded-full flex items-center justify-center
                         text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-all">
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <p className={`text-sm leading-relaxed mb-4 whitespace-pre-wrap
        ${post.resolved ? "text-gray-400" : "text-gray-200"}`}>
        {post.content}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-4 text-sm flex-wrap">
        <button onClick={handleLike}
          className={`flex items-center gap-1.5 transition-all
            ${hasLiked ? "text-[#26F2D0]" : "text-gray-500 hover:text-[#26F2D0]"}`}>
          <ThumbsUp size={15} fill={hasLiked ? "#26F2D0" : "none"} />
          <span>{post.likes || 0}</span>
        </button>

        <button onClick={() => { setExpanded(!expanded); setReplyText(""); setReplyError(""); }}
          className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-all">
          <MessageCircle size={15} />
          <span>{post.replies?.length || 0}</span>
        </button>

        {canResolve && (
          <button onClick={handleResolve}
            className="flex items-center gap-1.5 text-gray-500 hover:text-green-400
                       hover:bg-green-400/10 px-3 py-1 rounded-full transition-all
                       text-xs border border-white/10 hover:border-green-400/30">
            <CheckCircle2 size={13} />
            Mark Resolved
          </button>
        )}

        <span className={`ml-auto text-xs ${expiringSoon ? "text-red-400 font-medium" : "text-gray-600"}`}>
          {post.resolved ? "✅ resolved" : expiringSoon ? "⚠️ expires soon" : `expires in ${daysLeft}d`}
        </span>
      </div>

      {/* Replies */}
      {expanded && (
        <div className="mt-4 border-t border-white/10 pt-4 space-y-3">
          {(post.replies || []).length === 0 ? (
            <p className="text-xs text-gray-600 text-center py-2">No replies yet</p>
          ) : (
            post.replies.map(reply => (
              <div key={reply.id}
                className="flex items-start gap-3 bg-white/[0.03] rounded-xl p-3">
                <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10
                                flex items-center justify-center text-xs font-bold text-[#26F2D0]">
                  {reply.createdByName?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-white">
                      {reply.createdByRollNumber === myRoll ? "You" : reply.createdByName}
                      <span className="text-gray-500 font-normal ml-2">
                        · {reply.createdByBranch} · {formatTime(reply.createdAt)}
                      </span>
                    </p>
                    {reply.createdByRollNumber === myRoll && (
                      <button onClick={() => handleDeleteReply(reply.id)}
                        className="text-gray-600 hover:text-red-400 transition text-xs ml-2">✕</button>
                    )}
                  </div>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">{reply.content}</p>
                </div>
              </div>
            ))
          )}
          {!post.resolved && !(post.replies || []).some(r => r.createdByRollNumber === myRoll) && (
            <div className="space-y-1">
              {/* ✅ ADDED: Reply error message */}
              {replyError && (
                <p className="text-xs text-red-400 flex items-center gap-1 pl-3">
                  ⚠️ {replyError}
                </p>
              )}
              
              <div className="flex items-center gap-2 mt-2">
                <input 
                  value={replyText} 
                  onChange={e => {
                    setReplyText(e.target.value);
                    if (replyError) setReplyError("");
                  }}
                  onKeyDown={e => e.key === "Enter" && handleReply()}
                  placeholder="Write a reply..." 
                  maxLength={200}
                  className={`flex-1 bg-white/5 border rounded-full px-4 py-2
                             text-xs text-white placeholder-gray-500 outline-none transition
                             ${replyError ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#26F2D0]/50"}`} 
                />
                <button 
                  onClick={handleReply} 
                  disabled={!replyText.trim()}
                  className="px-4 py-2 rounded-full text-xs font-semibold bg-[#26F2D0]/20
                             text-[#26F2D0] hover:bg-[#26F2D0]/30 disabled:opacity-40 transition">
                  Reply
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
