// import { useState, useEffect } from "react";
// import { Trash2, ThumbsUp, MessageCircle } from "lucide-react";


// const TAG_CONFIG = {
//   STUDY_GROUP: { label: "Study Group", emoji: "📚", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
//   LOST_FOUND:  { label: "Lost & Found", emoji: "🔍", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
//   OPPORTUNITY: { label: "Opportunity", emoji: "💼", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
//   EVENT:       { label: "Event", emoji: "🎉", color: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
//   GENERAL:     { label: "General", emoji: "💬", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
// };

// export default function CampusBuzz() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [content, setContent] = useState("");
//   const [tag, setTag] = useState("GENERAL");
//   const [posting, setPosting] = useState(false);
//   const [filterTag, setFilterTag] = useState("ALL");
//   const [expandedPost, setExpandedPost] = useState(null);
//   const [replyText, setReplyText] = useState("");
//   const [replyingTo, setReplyingTo] = useState(null);
//   const [visibility, setVisibility] = useState("EVERYONE");

//   const token = sessionStorage.getItem("token");
//   const myRoll = sessionStorage.getItem("rollNumber");

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//  const fetchPosts = async () => {
//   try {
//     const res = await fetch("http://localhost:8081/api/buzz", {
//       headers: { Authorization: `Bearer ${token}` } // ✅ add this
//     });
//     if (!res.ok) return;
//     const data = await res.json();
//     setPosts(data);
//   } catch (err) {
//     console.error("Failed to fetch buzz posts:", err);
//   } finally {
//     setLoading(false);
//   }
// };

//   const handlePost = async () => {
//     if (!content.trim() || posting) return;
//     setPosting(true);
//     try {
//       const res = await fetch("http://localhost:8081/api/buzz/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ content, tag, visibility}),
//       });
//       if (!res.ok) return;
//       const newPost = await res.json();
//       setPosts(prev => [newPost, ...prev]);
//       setContent("");
//     } finally {
//       setPosting(false);
//     }
//   };

//   const handleLike = async (postId) => {
//     const res = await fetch(`http://localhost:8081/api/buzz/${postId}/like`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (!res.ok) return;
//     const updated = await res.json();
//     setPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
//     if (expandedPost?.id === updated.id) setExpandedPost(updated);
//   };

//   const handleReply = async (postId) => {
//     if (!replyText.trim()) return;
//     const res = await fetch(`http://localhost:8081/api/buzz/${postId}/reply`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ content: replyText }),
//     });
//     if (!res.ok) return;
//     const updated = await res.json();
//     setPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
//     setExpandedPost(updated);
//     setReplyText("");
//     setReplyingTo(null);
//   };

//   const handleDeleteReply = async (postId, replyId) => {
//     const res = await fetch(`http://localhost:8081/api/buzz/${postId}/reply/${replyId}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (!res.ok) return;
//     const updated = await res.json();
//     setPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
//     setExpandedPost(updated);
//   };

//   const handleDeletePost = async (postId) => {
//     if (!window.confirm("Delete this post?")) return;
//     const res = await fetch(`http://localhost:8081/api/buzz/${postId}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (!res.ok) return;
//     setPosts(prev => prev.filter(p => p.id !== postId));
//     if (expandedPost?.id === postId) setExpandedPost(null);
//   };

//   const filteredPosts = filterTag === "ALL"
//     ? posts
//     : posts.filter(p => p.tag === filterTag);

//   const formatTime = (dt) => {
//     const diff = Date.now() - new Date(dt).getTime();
//     const mins = Math.floor(diff / 60000);
//     if (mins < 1) return "just now";
//     if (mins < 60) return `${mins}m ago`;
//     const hrs = Math.floor(mins / 60);
//     if (hrs < 24) return `${hrs}h ago`;
//     return `${Math.floor(hrs / 24)}d ago`;
//   };

//   return (
//     <div className="max-w-2xl mx-auto pb-20">

//       {/* ✅ Post Composer */}
//       <div className="bg-gradient-to-br from-[#111] to-[#0d0d0d] border border-white/10
//                       rounded-2xl p-5 mb-6 shadow-lg">
//         <div className="flex items-start gap-3">
//           <div className="w-10 h-10 rounded-full bg-[#26F2D0]/20 border border-[#26F2D0]/30
//                           flex items-center justify-center text-[#26F2D0] font-bold text-sm shrink-0">
//             {sessionStorage.getItem("name")?.[0]?.toUpperCase() || "?"}
//           </div>
//           <div className="flex-1">
//                         <textarea
//             value={content}
//             onChange={e => setContent(e.target.value)}
//             placeholder="What's on your mind? Share with campus..."
//             maxLength={280}
//             rows={3}
//             className="w-full bg-[#1a1a1a] text-white placeholder-gray-500
//                         text-sm resize-none outline-none leading-relaxed
//                         rounded-xl p-3 border border-white/10
//                         focus:border-[#26F2D0]/50 transition"
//             />
//             <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
//               {/* Tag selector */}
//               <div className="flex gap-2 flex-wrap">
//                 {Object.entries(TAG_CONFIG).map(([key, val]) => (
//                   <button
//                     key={key}
//                     onClick={() => setTag(key)}
//                     className={`text-xs px-3 py-1 rounded-full border transition-all
//                       ${tag === key
//                         ? val.color + " font-semibold"
//                         : "border-white/10 text-gray-500 hover:border-white/30"
//                       }`}
//                   >
//                     {val.emoji} {val.label}
//                   </button>
//                 ))}
//               </div>
//               <div className="flex items-center gap-3">
//                 <span className={`text-xs ${content.length > 250 ? "text-red-400" : "text-gray-500"}`}>
//                   {content.length}/280
//                 </span>
//                 <button
//                   onClick={handlePost}
//                   disabled={!content.trim() || posting}
//                   className="px-5 py-2 rounded-full text-sm font-semibold transition-all
//                              bg-[#26F2D0] text-black hover:bg-[#1dd4b8]
//                              disabled:opacity-40 disabled:cursor-not-allowed"
//                 >
//                   {posting ? "Posting..." : "Post"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* ✅ Visibility selector */}
// <div className="flex items-center gap-2 mt-3 flex-wrap">
//   <span className="text-xs text-gray-500">Visible to:</span>
//   {[
//     { value: "EVERYONE", label: "🌐 Everyone" },
//     { value: "MY_YEAR", label: "🎓 My Year" },
//     { value: "MY_BRANCH", label: "🏛️ My Branch" },
//     { value: "MY_YEAR_BRANCH", label: "🎯 My Year & Branch" },
//   ].map(opt => (
//     <button
//       key={opt.value}
//       onClick={() => setVisibility(opt.value)}
//       className={`text-xs px-3 py-1 rounded-full border transition-all
//         ${visibility === opt.value
//           ? "bg-[#26F2D0]/20 text-[#26F2D0] border-[#26F2D0]/30"
//           : "border-white/10 text-gray-500 hover:border-white/30"
//         }`}
//     >
//       {opt.label}
//     </button>
//   ))}
// </div>

//       {/* ✅ Filter Tags */}
//       <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
//         <button
//           onClick={() => setFilterTag("ALL")}
//           className={`text-xs px-4 py-1.5 rounded-full border whitespace-nowrap transition-all
//             ${filterTag === "ALL"
//               ? "bg-[#26F2D0]/20 text-[#26F2D0] border-[#26F2D0]/30"
//               : "border-white/10 text-gray-500 hover:border-white/30"
//             }`}
//         >
//           🌐 All
//         </button>
//         {Object.entries(TAG_CONFIG).map(([key, val]) => (
//           <button
//             key={key}
//             onClick={() => setFilterTag(key)}
//             className={`text-xs px-4 py-1.5 rounded-full border whitespace-nowrap transition-all
//               ${filterTag === key
//                 ? val.color
//                 : "border-white/10 text-gray-500 hover:border-white/30"
//               }`}
//           >
//             {val.emoji} {val.label}
//           </button>
//         ))}
//       </div>

//       {/* ✅ Posts Feed */}
//       {loading ? (
//         <div className="text-center py-20 text-gray-500">Loading buzz...</div>
//       ) : filteredPosts.length === 0 ? (
//         <div className="text-center py-20">
//           <p className="text-4xl mb-3">📢</p>
//           <p className="text-gray-400">No posts yet. Be the first to buzz!</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {filteredPosts.map(post => {
//             const tagCfg = TAG_CONFIG[post.tag] || TAG_CONFIG.GENERAL;
//             const isMyPost = post.createdByRollNumber === myRoll;
//             const hasLiked = (post.likedBy || []).includes(myRoll);
//             const isExpanded = expandedPost?.id === post.id;

//             return (
//               <div key={post.id}
//                 className="bg-[#111] border border-white/10 rounded-2xl p-5
//                            hover:border-white/20 transition-all duration-200">

//                 {/* Header */}
//                 <div className="flex items-start justify-between gap-3 mb-3">
//                   <div className="flex items-center gap-3">
//                     <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10
//                                     flex items-center justify-center text-sm font-bold text-[#26F2D0]">
//                       {post.createdByName?.[0]?.toUpperCase()}
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-white">
//                         {isMyPost ? "You" : post.createdByName}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         {post.createdByBranch} · {post.createdByYear} · {formatTime(post.createdAt)}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className={`text-xs px-3 py-1 rounded-full border ${tagCfg.color}`}>
//                       {tagCfg.emoji} {tagCfg.label}
//                     </span>
//                       {isMyPost && (
//                         <button
//                             onClick={() => handleDeletePost(post.id)}
//                             className="w-7 h-7 rounded-full flex items-center justify-center
//                                     text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-all"
//                         >
//                             <Trash2 size={14} />
//                         </button>
//                         )}
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <p className="text-gray-200 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
//                   {post.content}
//                 </p>

//                 {/* Actions */}
//                 <div className="flex items-center gap-5 text-sm">
//                             <button
//             onClick={() => handleLike(post.id)}
//             className={`flex items-center gap-1.5 transition-all
//                 ${hasLiked ? "text-[#26F2D0]" : "text-gray-500 hover:text-[#26F2D0]"}`}
//             >
//             <ThumbsUp size={15} fill={hasLiked ? "#26F2D0" : "none"} />
//             <span>{post.likes || 0}</span>
//             </button>

//         <button
//             onClick={() => {
//                 setExpandedPost(isExpanded ? null : post);
//                 setReplyingTo(null);
//                 setReplyText("");
//             }}
//             className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-all"
//             >
//             <MessageCircle size={15} />
//             <span>{post.replies?.length || 0}</span>
//             </button>

//                   <span className="ml-auto text-xs text-gray-600">
//                     expires in {Math.max(0, Math.ceil((new Date(post.expiresAt) - Date.now()) / 86400000))}d
//                   </span>
//                 </div>

//                 {/* ✅ Replies section */}
//                 {isExpanded && (
//                   <div className="mt-4 border-t border-white/10 pt-4 space-y-3">
//                     {(post.replies || []).length === 0 ? (
//                       <p className="text-xs text-gray-600 text-center py-2">No replies yet</p>
//                     ) : (
//                       post.replies.map(reply => (
//                         <div key={reply.id}
//                           className="flex items-start gap-3 bg-white/[0.03] rounded-xl p-3">
//                           <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10
//                                           flex items-center justify-center text-xs font-bold text-[#26F2D0]">
//                             {reply.createdByName?.[0]?.toUpperCase()}
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center justify-between">
//                               <p className="text-xs font-semibold text-white">
//                                 {reply.createdByRollNumber === myRoll ? "You" : reply.createdByName}
//                                 <span className="text-gray-500 font-normal ml-2">
//                                   · {reply.createdByBranch} · {formatTime(reply.createdAt)}
//                                 </span>
//                               </p>
//                               {reply.createdByRollNumber === myRoll && (
//                                 <button
//                                   onClick={() => handleDeleteReply(post.id, reply.id)}
//                                   className="text-gray-600 hover:text-red-400 transition text-xs ml-2"
//                                 >
//                                   ✕
//                                 </button>
//                               )}
//                             </div>
//                             <p className="text-xs text-gray-300 mt-1 leading-relaxed">
//                               {reply.content}
//                             </p>
//                           </div>
//                         </div>
//                       ))
//                     )}

//                     {/* Reply input */}
//                     {!(post.replies || []).some(r => r.createdByRollNumber === myRoll) && (
//                       <div className="flex items-center gap-2 mt-2">
//                         <input
//                           value={replyText}
//                           onChange={e => setReplyText(e.target.value)}
//                           onKeyDown={e => e.key === "Enter" && handleReply(post.id)}
//                           placeholder="Write a reply..."
//                           maxLength={200}
//                           className="flex-1 bg-white/5 border border-white/10 rounded-full
//                                      px-4 py-2 text-xs text-white placeholder-gray-500
//                                      outline-none focus:border-[#26F2D0]/50 transition"
//                         />
//                         <button
//                           onClick={() => handleReply(post.id)}
//                           disabled={!replyText.trim()}
//                           className="px-4 py-2 rounded-full text-xs font-semibold
//                                      bg-[#26F2D0]/20 text-[#26F2D0] hover:bg-[#26F2D0]/30
//                                      disabled:opacity-40 transition"
//                         >
//                           Reply
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }



























// import { useState, useEffect } from "react";
// import { Trash2, ThumbsUp, MessageCircle } from "lucide-react";

// const TAG_CONFIG = {
//   STUDY_GROUP: { label: "Study Group", emoji: "📚", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
//   LOST_FOUND:  { label: "Lost & Found", emoji: "🔍", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
//   OPPORTUNITY: { label: "Opportunity", emoji: "💼", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
//   EVENT:       { label: "Event", emoji: "🎉", color: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
//   GENERAL:     { label: "General", emoji: "💬", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
// };

// const VISIBILITY_CONFIG = [
//   { value: "EVERYONE",       label: "🌐 Everyone" },
//   { value: "MY_YEAR",        label: "🎓 My Year" },
//   { value: "MY_BRANCH",      label: "🏛️ My Branch" },
//   { value: "MY_YEAR_BRANCH", label: "🎯 My Year & Branch" },
// ];

// export default function CampusBuzz() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [content, setContent] = useState("");
//   const [tag, setTag] = useState("GENERAL");
//   const [visibility, setVisibility] = useState("EVERYONE");
//   const [posting, setPosting] = useState(false);
//   const [filterTag, setFilterTag] = useState("ALL");
//   const [expandedPost, setExpandedPost] = useState(null);
//   const [replyText, setReplyText] = useState("");

//   const token = sessionStorage.getItem("token");
//   const myRoll = sessionStorage.getItem("rollNumber");

//   useEffect(() => { fetchPosts(); }, []);

//   const fetchPosts = async () => {
//     try {
//       const res = await fetch("http://localhost:8081/api/buzz", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (!res.ok) return;
//       const data = await res.json();
//       setPosts(data);
//     } catch (err) {
//       console.error("Failed to fetch buzz posts:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePost = async () => {
//     if (!content.trim() || posting) return;
//     setPosting(true);
//     try {
//       const res = await fetch("http://localhost:8081/api/buzz/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ content, tag, visibility }),
//       });
//       if (!res.ok) return;
//       const newPost = await res.json();
//       setPosts(prev => [newPost, ...prev]);
//       setContent("");
//       setVisibility("EVERYONE");
//       setTag("GENERAL");
//     } finally {
//       setPosting(false);
//     }
//   };

//   const handleLike = async (postId) => {
//     const res = await fetch(`http://localhost:8081/api/buzz/${postId}/like`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (!res.ok) return;
//     const updated = await res.json();
//     setPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
//     if (expandedPost?.id === updated.id) setExpandedPost(updated);
//   };

//   const handleReply = async (postId) => {
//     if (!replyText.trim()) return;
//     const res = await fetch(`http://localhost:8081/api/buzz/${postId}/reply`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//       body: JSON.stringify({ content: replyText }),
//     });
//     if (!res.ok) return;
//     const updated = await res.json();
//     setPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
//     setExpandedPost(updated);
//     setReplyText("");
//   };

//   const handleDeleteReply = async (postId, replyId) => {
//     const res = await fetch(`http://localhost:8081/api/buzz/${postId}/reply/${replyId}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (!res.ok) return;
//     const updated = await res.json();
//     setPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
//     setExpandedPost(updated);
//   };

//   const handleDeletePost = async (postId) => {
//     if (!window.confirm("Delete this post?")) return;
//     const res = await fetch(`http://localhost:8081/api/buzz/${postId}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (!res.ok) return;
//     setPosts(prev => prev.filter(p => p.id !== postId));
//     if (expandedPost?.id === postId) setExpandedPost(null);
//   };
//    const getScore = (post) => {
//   const ageHours = (Date.now() - new Date(post.createdAt).getTime()) / 3600000;
//   const recency = Math.max(0, 72 - ageHours) / 72; // decays over 3 days
//   return (post.likes || 0) + ((post.replies?.length || 0) * 2) + (recency * 3);
// };


//   const filteredPosts = filterTag === "ALL"
//     ? posts
//     : posts.filter(p => p.tag === filterTag);
//     // ✅ hot posts — top 2 most engaged today
// const hotPosts = [...posts]
//   .filter(p => {
//     const ageHours = (Date.now() - new Date(p.createdAt).getTime()) / 3600000;
//     return ageHours < 24 && ((p.likes || 0) + (p.replies?.length || 0)) > 0;
//   })
//   .sort((a, b) => getScore(b) - getScore(a))
//   .slice(0, 2);

// // ✅ smart sorted feed
// const sortedPosts = [...filteredPosts].sort((a, b) => getScore(b) - getScore(a));




//   const formatTime = (dt) => {
//     const diff = Date.now() - new Date(dt).getTime();
//     const mins = Math.floor(diff / 60000);
//     if (mins < 1) return "just now";
//     if (mins < 60) return `${mins}m ago`;
//     const hrs = Math.floor(mins / 60);
//     if (hrs < 24) return `${hrs}h ago`;
//     return `${Math.floor(hrs / 24)}d ago`;
//   };

//   const getVisibilityLabel = (post) => {
//     if (!post.visibility || post.visibility === "EVERYONE") return null;
//     if (post.visibility === "MY_YEAR") return `🎓 ${post.createdByYear} only`;
//     if (post.visibility === "MY_BRANCH") return `🏛️ ${post.createdByBranch} only`;
//     if (post.visibility === "MY_YEAR_BRANCH") return `🎯 ${post.createdByYear} · ${post.createdByBranch} only`;
//     return null;
//   };
 
//   return (
//     <div className="max-w-2xl mx-auto pb-20">

//       {/* ✅ Post Composer */}
//       <div className="bg-gradient-to-br from-[#111] to-[#0d0d0d] border border-white/10
//                       rounded-2xl p-5 mb-6 shadow-lg">
//         <div className="flex items-start gap-3">
//           <div className="w-10 h-10 rounded-full bg-[#26F2D0]/20 border border-[#26F2D0]/30
//                           flex items-center justify-center text-[#26F2D0] font-bold text-sm shrink-0">
//             {sessionStorage.getItem("name")?.[0]?.toUpperCase() || "?"}
//           </div>
//           <div className="flex-1">
//             <textarea
//               value={content}
//               onChange={e => setContent(e.target.value)}
//               placeholder="What's on your mind? Share with campus..."
//               maxLength={280}
//               rows={3}
//               className="w-full bg-[#1a1a1a] text-white placeholder-gray-500
//                          text-sm resize-none outline-none leading-relaxed
//                          rounded-xl p-3 border border-white/10
//                          focus:border-[#26F2D0]/50 transition"
//             />

//             {/* Tag selector */}
//             <div className="flex gap-2 flex-wrap mt-3">
//               {Object.entries(TAG_CONFIG).map(([key, val]) => (
//                 <button
//                   key={key}
//                   onClick={() => setTag(key)}
//                   className={`text-xs px-3 py-1 rounded-full border transition-all
//                     ${tag === key
//                       ? val.color + " font-semibold"
//                       : "border-white/10 text-gray-500 hover:border-white/30"
//                     }`}
//                 >
//                   {val.emoji} {val.label}
//                 </button>
//               ))}
//             </div>

//             {/* ✅ Visibility selector — inside composer */}
//             <div className="flex items-center gap-2 mt-3 flex-wrap">
//               <span className="text-xs text-gray-500">Visible to:</span>
//               {VISIBILITY_CONFIG.map(opt => (
//                 <button
//                   key={opt.value}
//                   onClick={() => setVisibility(opt.value)}
//                   className={`text-xs px-3 py-1 rounded-full border transition-all
//                     ${visibility === opt.value
//                       ? "bg-[#26F2D0]/20 text-[#26F2D0] border-[#26F2D0]/30"
//                       : "border-white/10 text-gray-500 hover:border-white/30"
//                     }`}
//                 >
//                   {opt.label}
//                 </button>
//               ))}
//             </div>

//             {/* Post button + char count */}
//             <div className="flex items-center justify-end gap-3 mt-3">
//               <span className={`text-xs ${content.length > 250 ? "text-red-400" : "text-gray-500"}`}>
//                 {content.length}/280
//               </span>
//               <button
//                 onClick={handlePost}
//                 disabled={!content.trim() || posting}
//                 className="px-5 py-2 rounded-full text-sm font-semibold transition-all
//                            bg-[#26F2D0] text-black hover:bg-[#1dd4b8]
//                            disabled:opacity-40 disabled:cursor-not-allowed"
//               >
//                 {posting ? "Posting..." : "Post"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Filter Tags */}
//       <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
//         <button
//           onClick={() => setFilterTag("ALL")}
//           className={`text-xs px-4 py-1.5 rounded-full border whitespace-nowrap transition-all
//             ${filterTag === "ALL"
//               ? "bg-[#26F2D0]/20 text-[#26F2D0] border-[#26F2D0]/30"
//               : "border-white/10 text-gray-500 hover:border-white/30"
//             }`}
//         >
//           🌐 All
//         </button>
//         {Object.entries(TAG_CONFIG).map(([key, val]) => (
//           <button
//             key={key}
//             onClick={() => setFilterTag(key)}
//             className={`text-xs px-4 py-1.5 rounded-full border whitespace-nowrap transition-all
//               ${filterTag === key
//                 ? val.color
//                 : "border-white/10 text-gray-500 hover:border-white/30"
//               }`}
//           >
//             {val.emoji} {val.label}
//           </button>
//         ))}
//       </div>
      

// {/* ✅ Posts Feed */}
//       {loading ? (
//         <div className="text-center py-20 text-gray-500">Loading buzz...</div>
//       ) : posts.length === 0 ? (
//         <div className="text-center py-20">
//           <p className="text-4xl mb-3">📢</p>
//           <p className="text-gray-400">No posts yet. Be the first to buzz!</p>
//         </div>
//       ) : (
//         <>
//           {/* ✅ Hot Right Now */}
//           {hotPosts.length > 0 && filterTag === "ALL" && (
//             <div className="mb-6">
//               <div className="flex items-center gap-2 mb-3">
//                 <span className="text-sm font-semibold text-orange-400">🔥 Hot Right Now</span>
//                 <div className="flex-1 h-px bg-orange-400/20" />
//               </div>
//               <div className="space-y-3">
//                 {hotPosts.map(post => {
//                   const tagCfg = TAG_CONFIG[post.tag] || TAG_CONFIG.GENERAL;
//                   const isMyPost = post.createdByRollNumber === myRoll;
//                   const hasLiked = (post.likedBy || []).includes(myRoll);
//                   const isExpanded = expandedPost?.id === post.id;
//                   const visLabel = getVisibilityLabel(post);
//                   return (
//                     <div key={post.id}
//                       className="bg-gradient-to-br from-orange-500/5 to-[#111]
//                                  border border-orange-400/20 rounded-2xl p-5
//                                  hover:border-orange-400/40 transition-all duration-200">
//                       <div className="flex items-start justify-between gap-3 mb-3">
//                         <div className="flex items-center gap-3">
//                           <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10
//                                           flex items-center justify-center text-sm font-bold text-[#26F2D0]">
//                             {post.createdByName?.[0]?.toUpperCase()}
//                           </div>
//                           <div>
//                             <p className="text-sm font-semibold text-white">
//                               {isMyPost ? "You" : post.createdByName}
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               {post.createdByBranch} · {post.createdByYear} · {formatTime(post.createdAt)}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-2 flex-wrap justify-end">
//                           <span className={`text-xs px-3 py-1 rounded-full border ${tagCfg.color}`}>
//                             {tagCfg.emoji} {tagCfg.label}
//                           </span>
//                           {visLabel && (
//                             <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-gray-500 whitespace-nowrap">
//                               {visLabel}
//                             </span>
//                           )}
//                           {isMyPost && (
//                             <button
//                               onClick={() => handleDeletePost(post.id)}
//                               className="w-7 h-7 rounded-full flex items-center justify-center
//                                          text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-all"
//                             >
//                               <Trash2 size={14} />
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                       <p className="text-gray-200 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
//                         {post.content}
//                       </p>
//                       <div className="flex items-center gap-5 text-sm">
//                         <button
//                           onClick={() => handleLike(post.id)}
//                           className={`flex items-center gap-1.5 transition-all
//                             ${hasLiked ? "text-[#26F2D0]" : "text-gray-500 hover:text-[#26F2D0]"}`}
//                         >
//                           <ThumbsUp size={15} fill={hasLiked ? "#26F2D0" : "none"} />
//                           <span>{post.likes || 0}</span>
//                         </button>
//                         <button
//                           onClick={() => { setExpandedPost(isExpanded ? null : post); setReplyText(""); }}
//                           className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-all"
//                         >
//                           <MessageCircle size={15} />
//                           <span>{post.replies?.length || 0}</span>
//                         </button>
//                         <span className="ml-auto text-xs text-gray-600">
//                           expires in {Math.max(0, Math.ceil((new Date(post.expiresAt) - Date.now()) / 86400000))}d
//                         </span>
//                       </div>
//                       {isExpanded && (
//                         <div className="mt-4 border-t border-white/10 pt-4 space-y-3">
//                           {(post.replies || []).length === 0 ? (
//                             <p className="text-xs text-gray-600 text-center py-2">No replies yet</p>
//                           ) : (
//                             post.replies.map(reply => (
//                               <div key={reply.id}
//                                 className="flex items-start gap-3 bg-white/[0.03] rounded-xl p-3">
//                                 <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10
//                                                 flex items-center justify-center text-xs font-bold text-[#26F2D0]">
//                                   {reply.createdByName?.[0]?.toUpperCase()}
//                                 </div>
//                                 <div className="flex-1 min-w-0">
//                                   <div className="flex items-center justify-between">
//                                     <p className="text-xs font-semibold text-white">
//                                       {reply.createdByRollNumber === myRoll ? "You" : reply.createdByName}
//                                       <span className="text-gray-500 font-normal ml-2">
//                                         · {reply.createdByBranch} · {formatTime(reply.createdAt)}
//                                       </span>
//                                     </p>
//                                     {reply.createdByRollNumber === myRoll && (
//                                       <button
//                                         onClick={() => handleDeleteReply(post.id, reply.id)}
//                                         className="text-gray-600 hover:text-red-400 transition text-xs ml-2"
//                                       >✕</button>
//                                     )}
//                                   </div>
//                                   <p className="text-xs text-gray-300 mt-1 leading-relaxed">{reply.content}</p>
//                                 </div>
//                               </div>
//                             ))
//                           )}
//                           {!(post.replies || []).some(r => r.createdByRollNumber === myRoll) && (
//                             <div className="flex items-center gap-2 mt-2">
//                               <input
//                                 value={replyText}
//                                 onChange={e => setReplyText(e.target.value)}
//                                 onKeyDown={e => e.key === "Enter" && handleReply(post.id)}
//                                 placeholder="Write a reply..."
//                                 maxLength={200}
//                                 className="flex-1 bg-white/5 border border-white/10 rounded-full
//                                            px-4 py-2 text-xs text-white placeholder-gray-500
//                                            outline-none focus:border-[#26F2D0]/50 transition"
//                               />
//                               <button
//                                 onClick={() => handleReply(post.id)}
//                                 disabled={!replyText.trim()}
//                                 className="px-4 py-2 rounded-full text-xs font-semibold
//                                            bg-[#26F2D0]/20 text-[#26F2D0] hover:bg-[#26F2D0]/30
//                                            disabled:opacity-40 transition"
//                               >Reply</button>
//                             </div>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* ✅ All Posts — smart sorted */}
//           <div className="flex items-center gap-2 mb-3">
//             <span className="text-sm font-semibold text-gray-400">
//               {filterTag === "ALL" ? "✨ All Buzz" : `${TAG_CONFIG[filterTag]?.emoji} ${TAG_CONFIG[filterTag]?.label}`}
//             </span>
//             <div className="flex-1 h-px bg-white/10" />
//             <span className="text-xs text-gray-600">{sortedPosts.length} posts</span>
//           </div>

//           {sortedPosts.length === 0 ? (
//             <div className="text-center py-10">
//               <p className="text-gray-500 text-sm">No posts in this category yet</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {sortedPosts.map(post => {
//                 const tagCfg = TAG_CONFIG[post.tag] || TAG_CONFIG.GENERAL;
//                 const isMyPost = post.createdByRollNumber === myRoll;
//                 const hasLiked = (post.likedBy || []).includes(myRoll);
//                 const isExpanded = expandedPost?.id === post.id;
//                 const visLabel = getVisibilityLabel(post);
//                 const expiringSoon = Math.ceil((new Date(post.expiresAt) - Date.now()) / 86400000) <= 1;

//                 return (
//                   <div key={post.id}
//                     className={`border rounded-2xl p-5 transition-all duration-200
//                       ${expiringSoon
//                         ? "bg-red-500/5 border-red-500/20 hover:border-red-500/40"
//                         : "bg-[#111] border-white/10 hover:border-white/20"
//                       }`}>
//                     <div className="flex items-start justify-between gap-3 mb-3">
//                       <div className="flex items-center gap-3">
//                         <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10
//                                         flex items-center justify-center text-sm font-bold text-[#26F2D0]">
//                           {post.createdByName?.[0]?.toUpperCase()}
//                         </div>
//                         <div>
//                           <p className="text-sm font-semibold text-white">
//                             {isMyPost ? "You" : post.createdByName}
//                           </p>
//                           <p className="text-xs text-gray-500">
//                             {post.createdByBranch} · {post.createdByYear} · {formatTime(post.createdAt)}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2 flex-wrap justify-end">
//                         <span className={`text-xs px-3 py-1 rounded-full border ${tagCfg.color}`}>
//                           {tagCfg.emoji} {tagCfg.label}
//                         </span>
//                         {visLabel && (
//                           <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-gray-500 whitespace-nowrap">
//                             {visLabel}
//                           </span>
//                         )}
//                         {isMyPost && (
//                           <button
//                             onClick={() => handleDeletePost(post.id)}
//                             className="w-7 h-7 rounded-full flex items-center justify-center
//                                        text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-all"
//                           >
//                             <Trash2 size={14} />
//                           </button>
//                         )}
//                       </div>
//                     </div>

//                     <p className="text-gray-200 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
//                       {post.content}
//                     </p>

//                     <div className="flex items-center gap-5 text-sm">
//                       <button
//                         onClick={() => handleLike(post.id)}
//                         className={`flex items-center gap-1.5 transition-all
//                           ${hasLiked ? "text-[#26F2D0]" : "text-gray-500 hover:text-[#26F2D0]"}`}
//                       >
//                         <ThumbsUp size={15} fill={hasLiked ? "#26F2D0" : "none"} />
//                         <span>{post.likes || 0}</span>
//                       </button>
//                       <button
//                         onClick={() => { setExpandedPost(isExpanded ? null : post); setReplyText(""); }}
//                         className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-all"
//                       >
//                         <MessageCircle size={15} />
//                         <span>{post.replies?.length || 0}</span>
//                       </button>
//                       <span className={`ml-auto text-xs ${expiringSoon ? "text-red-400 font-medium" : "text-gray-600"}`}>
//                         {expiringSoon
//                           ? "⚠️ expires soon"
//                           : `expires in ${Math.max(0, Math.ceil((new Date(post.expiresAt) - Date.now()) / 86400000))}d`}
//                       </span>
//                     </div>

//                     {isExpanded && (
//                       <div className="mt-4 border-t border-white/10 pt-4 space-y-3">
//                         {(post.replies || []).length === 0 ? (
//                           <p className="text-xs text-gray-600 text-center py-2">No replies yet</p>
//                         ) : (
//                           post.replies.map(reply => (
//                             <div key={reply.id}
//                               className="flex items-start gap-3 bg-white/[0.03] rounded-xl p-3">
//                               <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10
//                                               flex items-center justify-center text-xs font-bold text-[#26F2D0]">
//                                 {reply.createdByName?.[0]?.toUpperCase()}
//                               </div>
//                               <div className="flex-1 min-w-0">
//                                 <div className="flex items-center justify-between">
//                                   <p className="text-xs font-semibold text-white">
//                                     {reply.createdByRollNumber === myRoll ? "You" : reply.createdByName}
//                                     <span className="text-gray-500 font-normal ml-2">
//                                       · {reply.createdByBranch} · {formatTime(reply.createdAt)}
//                                     </span>
//                                   </p>
//                                   {reply.createdByRollNumber === myRoll && (
//                                     <button
//                                       onClick={() => handleDeleteReply(post.id, reply.id)}
//                                       className="text-gray-600 hover:text-red-400 transition text-xs ml-2"
//                                     >✕</button>
//                                   )}
//                                 </div>
//                                 <p className="text-xs text-gray-300 mt-1 leading-relaxed">{reply.content}</p>
//                               </div>
//                             </div>
//                           ))
//                         )}
//                         {!(post.replies || []).some(r => r.createdByRollNumber === myRoll) && (
//                           <div className="flex items-center gap-2 mt-2">
//                             <input
//                               value={replyText}
//                               onChange={e => setReplyText(e.target.value)}
//                               onKeyDown={e => e.key === "Enter" && handleReply(post.id)}
//                               placeholder="Write a reply..."
//                               maxLength={200}
//                               className="flex-1 bg-white/5 border border-white/10 rounded-full
//                                          px-4 py-2 text-xs text-white placeholder-gray-500
//                                          outline-none focus:border-[#26F2D0]/50 transition"
//                             />
//                             <button
//                               onClick={() => handleReply(post.id)}
//                               disabled={!replyText.trim()}
//                               className="px-4 py-2 rounded-full text-xs font-semibold
//                                          bg-[#26F2D0]/20 text-[#26F2D0] hover:bg-[#26F2D0]/30
//                                          disabled:opacity-40 transition"
//                             >Reply</button>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import { Trash2, ThumbsUp, MessageCircle, Search, CheckCircle2 } from "lucide-react";

// const TAG_CONFIG = {
//   STUDY_GROUP: { label: "Study Group", emoji: "📚", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
//   LOST_FOUND:  { label: "Lost & Found", emoji: "🔍", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
//   OPPORTUNITY: { label: "Opportunity", emoji: "💼", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
//   EVENT:       { label: "Event", emoji: "🎉", color: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
//   GENERAL:     { label: "General", emoji: "💬", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
// };

// const VISIBILITY_CONFIG = [
//   { value: "EVERYONE",       label: "🌐 Everyone" },
//   { value: "MY_YEAR",        label: "🎓 My Year" },
//   { value: "MY_BRANCH",      label: "🏛️ My Branch" },
//   { value: "MY_YEAR_BRANCH", label: "🎯 My Year & Branch" },
// ];

// export default function CampusBuzz() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [content, setContent] = useState("");
//   const [tag, setTag] = useState("GENERAL");
//   const [visibility, setVisibility] = useState("EVERYONE");
//   const [posting, setPosting] = useState(false);
//   const [filterTag, setFilterTag] = useState("ALL");
//   const [expandedPost, setExpandedPost] = useState(null);
//   const [replyText, setReplyText] = useState("");
//   const [search, setSearch] = useState("");

//   const token = sessionStorage.getItem("token");
//   const myRoll = sessionStorage.getItem("rollNumber");
//   const role = sessionStorage.getItem("role");

//   useEffect(() => { fetchPosts(); }, []);

//   const fetchPosts = async () => {
//     try {
//       const res = await fetch("http://localhost:8081/api/buzz", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (!res.ok) return;
//       const data = await res.json();
//       setPosts(data);
//     } catch (err) {
//       console.error("Failed to fetch buzz posts:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePost = async () => {
//     if (!content.trim() || posting) return;
//     setPosting(true);
//     try {
//       const res = await fetch("http://localhost:8081/api/buzz/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ content, tag, visibility }),
//       });
//       if (!res.ok) return;
//       const newPost = await res.json();
//       setPosts(prev => [newPost, ...prev]);
//       setContent("");
//       setVisibility("EVERYONE");
//       setTag("GENERAL");
//     } finally {
//       setPosting(false);
//     }
//   };

//   const handleLike = async (postId) => {
//     const res = await fetch(`http://localhost:8081/api/buzz/${postId}/like`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (!res.ok) return;
//     const updated = await res.json();
//     setPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
//     if (expandedPost?.id === updated.id) setExpandedPost(updated);
//   };

//   const handleReply = async (postId) => {
//     if (!replyText.trim()) return;
//     const res = await fetch(`http://localhost:8081/api/buzz/${postId}/reply`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//       body: JSON.stringify({ content: replyText }),
//     });
//     if (!res.ok) return;
//     const updated = await res.json();
//     setPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
//     setExpandedPost(updated);
//     setReplyText("");
//   };

//   const handleDeleteReply = async (postId, replyId) => {
//     const res = await fetch(`http://localhost:8081/api/buzz/${postId}/reply/${replyId}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (!res.ok) return;
//     const updated = await res.json();
//     setPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
//     setExpandedPost(updated);
//   };

//   const handleDeletePost = async (postId) => {
//     if (!window.confirm("Delete this post?")) return;
//     const res = await fetch(`http://localhost:8081/api/buzz/${postId}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (!res.ok) return;
//     setPosts(prev => prev.filter(p => p.id !== postId));
//     if (expandedPost?.id === postId) setExpandedPost(null);
//   };

//   const handleResolve = async (postId) => {
//     const res = await fetch(`http://localhost:8081/api/buzz/${postId}/resolve`, {
//       method: "PATCH",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (!res.ok) return;
//     const updated = await res.json();
//     setPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
//     if (expandedPost?.id === updated.id) setExpandedPost(updated);
//   };

//   const getScore = (post) => {
//     const ageHours = (Date.now() - new Date(post.createdAt).getTime()) / 3600000;
//     const recency = Math.max(0, 72 - ageHours) / 72;
//     return (post.likes || 0) + ((post.replies?.length || 0) * 2) + (recency * 3);
//   };

//   const filteredPosts = posts
//     .filter(p => filterTag === "ALL" || p.tag === filterTag)
//     .filter(p => {
//       if (!search.trim()) return true;
//       return p.content.toLowerCase().includes(search.toLowerCase()) ||
//              p.createdByName.toLowerCase().includes(search.toLowerCase());
//     });

//   const hotPosts = [...posts]
//     .filter(p => {
//       const ageHours = (Date.now() - new Date(p.createdAt).getTime()) / 3600000;
//       return ageHours < 24 && ((p.likes || 0) + (p.replies?.length || 0)) > 0 && !p.resolved;
//     })
//     .sort((a, b) => getScore(b) - getScore(a))
//     .slice(0, 2);

//   const sortedPosts = [...filteredPosts].sort((a, b) => {
//     if (a.resolved && !b.resolved) return 1;
//     if (!a.resolved && b.resolved) return -1;
//     return getScore(b) - getScore(a);
//   });

//   const formatTime = (dt) => {
//     const diff = Date.now() - new Date(dt).getTime();
//     const mins = Math.floor(diff / 60000);
//     if (mins < 1) return "just now";
//     if (mins < 60) return `${mins}m ago`;
//     const hrs = Math.floor(mins / 60);
//     if (hrs < 24) return `${hrs}h ago`;
//     return `${Math.floor(hrs / 24)}d ago`;
//   };

//   const getVisibilityLabel = (post) => {
//     if (!post.visibility || post.visibility === "EVERYONE") return null;
//     if (post.visibility === "MY_YEAR") return `🎓 ${post.createdByYear} only`;
//     if (post.visibility === "MY_BRANCH") return `🏛️ ${post.createdByBranch} only`;
//     if (post.visibility === "MY_YEAR_BRANCH") return `🎯 ${post.createdByYear} · ${post.createdByBranch} only`;
//     return null;
//   };

//   // ✅ reusable post card renderer
//   const renderPost = (post, isHot = false) => {
//     const tagCfg = TAG_CONFIG[post.tag] || TAG_CONFIG.GENERAL;
//     const isMyPost = post.createdByRollNumber === myRoll;
//     const isAdmin = role === "ADMIN";
//     const hasLiked = (post.likedBy || []).includes(myRoll);
//     const isExpanded = expandedPost?.id === post.id;
//     const visLabel = getVisibilityLabel(post);
//     const expiringSoon = !post.resolved &&
//       Math.ceil((new Date(post.expiresAt) - Date.now()) / 86400000) <= 1;
//     const canResolve = (isMyPost || isAdmin) && !post.resolved;

//     return (
//       <div key={post.id}
//         className={`border rounded-2xl p-5 transition-all duration-200 relative
//           ${post.resolved
//             ? "bg-green-500/5 border-green-500/20 opacity-80"
//             : isHot
//               ? "bg-gradient-to-br from-orange-500/5 to-[#111] border-orange-400/20 hover:border-orange-400/40"
//               : expiringSoon
//                 ? "bg-red-500/5 border-red-500/20 hover:border-red-500/40"
//                 : "bg-[#111] border-white/10 hover:border-white/20"
//           }`}>

//         {/* ✅ Resolved banner */}
//         {post.resolved && (
//           <div className="flex items-center gap-2 mb-3 bg-green-500/10 border border-green-500/20
//                           rounded-xl px-3 py-2">
//             <CheckCircle2 size={14} className="text-green-400 shrink-0" />
//             <span className="text-xs text-green-400 font-medium">Marked as Resolved</span>
//           </div>
//         )}

//         {/* Header */}
//         <div className="flex items-start justify-between gap-3 mb-3">
//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10
//                             flex items-center justify-center text-sm font-bold text-[#26F2D0]">
//               {post.createdByName?.[0]?.toUpperCase()}
//             </div>
//             <div>
//               <p className="text-sm font-semibold text-white">
//                 {isMyPost ? "You" : post.createdByName}
//               </p>
//               <p className="text-xs text-gray-500">
//                 {post.createdByBranch} · {post.createdByYear} · {formatTime(post.createdAt)}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 flex-wrap justify-end">
//             <span className={`text-xs px-3 py-1 rounded-full border ${tagCfg.color}`}>
//               {tagCfg.emoji} {tagCfg.label}
//             </span>
//             {visLabel && (
//               <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-gray-500 whitespace-nowrap">
//                 {visLabel}
//               </span>
//             )}
//             {isMyPost && (
//               <button
//                 onClick={() => handleDeletePost(post.id)}
//                 className="w-7 h-7 rounded-full flex items-center justify-center
//                            text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-all"
//               >
//                 <Trash2 size={14} />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Content */}
//         <p className={`text-sm leading-relaxed mb-4 whitespace-pre-wrap
//           ${post.resolved ? "text-gray-400" : "text-gray-200"}`}>
//           {post.content}
//         </p>

//         {/* Actions */}
//         <div className="flex items-center gap-4 text-sm flex-wrap">
//           <button
//             onClick={() => handleLike(post.id)}
//             className={`flex items-center gap-1.5 transition-all
//               ${hasLiked ? "text-[#26F2D0]" : "text-gray-500 hover:text-[#26F2D0]"}`}
//           >
//             <ThumbsUp size={15} fill={hasLiked ? "#26F2D0" : "none"} />
//             <span>{post.likes || 0}</span>
//           </button>

//           <button
//             onClick={() => { setExpandedPost(isExpanded ? null : post); setReplyText(""); }}
//             className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-all"
//           >
//             <MessageCircle size={15} />
//             <span>{post.replies?.length || 0}</span>
//           </button>

//           {/* ✅ Resolve button */}
//           {canResolve && (
//             <button
//               onClick={() => handleResolve(post.id)}
//               className="flex items-center gap-1.5 text-gray-500 hover:text-green-400
//                          hover:bg-green-400/10 px-3 py-1 rounded-full transition-all text-xs border
//                          border-white/10 hover:border-green-400/30"
//             >
//               <CheckCircle2 size={13} />
//               Mark Resolved
//             </button>
//           )}

//           <span className={`ml-auto text-xs ${expiringSoon ? "text-red-400 font-medium" : "text-gray-600"}`}>
//             {post.resolved
//               ? "✅ resolved"
//               : expiringSoon
//                 ? "⚠️ expires soon"
//                 : `expires in ${Math.max(0, Math.ceil((new Date(post.expiresAt) - Date.now()) / 86400000))}d`}
//           </span>
//         </div>

//         {/* Replies */}
//         {isExpanded && (
//           <div className="mt-4 border-t border-white/10 pt-4 space-y-3">
//             {(post.replies || []).length === 0 ? (
//               <p className="text-xs text-gray-600 text-center py-2">No replies yet</p>
//             ) : (
//               post.replies.map(reply => (
//                 <div key={reply.id}
//                   className="flex items-start gap-3 bg-white/[0.03] rounded-xl p-3">
//                   <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10
//                                   flex items-center justify-center text-xs font-bold text-[#26F2D0]">
//                     {reply.createdByName?.[0]?.toUpperCase()}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center justify-between">
//                       <p className="text-xs font-semibold text-white">
//                         {reply.createdByRollNumber === myRoll ? "You" : reply.createdByName}
//                         <span className="text-gray-500 font-normal ml-2">
//                           · {reply.createdByBranch} · {formatTime(reply.createdAt)}
//                         </span>
//                       </p>
//                       {reply.createdByRollNumber === myRoll && (
//                         <button
//                           onClick={() => handleDeleteReply(post.id, reply.id)}
//                           className="text-gray-600 hover:text-red-400 transition text-xs ml-2"
//                         >✕</button>
//                       )}
//                     </div>
//                     <p className="text-xs text-gray-300 mt-1 leading-relaxed">{reply.content}</p>
//                   </div>
//                 </div>
//               ))
//             )}
//             {!post.resolved && !(post.replies || []).some(r => r.createdByRollNumber === myRoll) && (
//               <div className="flex items-center gap-2 mt-2">
//                 <input
//                   value={replyText}
//                   onChange={e => setReplyText(e.target.value)}
//                   onKeyDown={e => e.key === "Enter" && handleReply(post.id)}
//                   placeholder="Write a reply..."
//                   maxLength={200}
//                   className="flex-1 bg-white/5 border border-white/10 rounded-full
//                              px-4 py-2 text-xs text-white placeholder-gray-500
//                              outline-none focus:border-[#26F2D0]/50 transition"
//                 />
//                 <button
//                   onClick={() => handleReply(post.id)}
//                   disabled={!replyText.trim()}
//                   className="px-4 py-2 rounded-full text-xs font-semibold
//                              bg-[#26F2D0]/20 text-[#26F2D0] hover:bg-[#26F2D0]/30
//                              disabled:opacity-40 transition"
//                 >Reply</button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-2xl mx-auto pb-20">

//       {/* ✅ Post Composer */}
//       <div className="bg-gradient-to-br from-[#111] to-[#0d0d0d] border border-white/10
//                       rounded-2xl p-5 mb-4 shadow-lg">
//         <div className="flex items-start gap-3">
//           <div className="w-10 h-10 rounded-full bg-[#26F2D0]/20 border border-[#26F2D0]/30
//                           flex items-center justify-center text-[#26F2D0] font-bold text-sm shrink-0">
//             {sessionStorage.getItem("name")?.[0]?.toUpperCase() || "?"}
//           </div>
//           <div className="flex-1">
//             <textarea
//               value={content}
//               onChange={e => setContent(e.target.value)}
//               placeholder="What's on your mind? Share with campus..."
//               maxLength={280}
//               rows={3}
//               className="w-full bg-[#1a1a1a] text-white placeholder-gray-500
//                          text-sm resize-none outline-none leading-relaxed
//                          rounded-xl p-3 border border-white/10
//                          focus:border-[#26F2D0]/50 transition"
//             />
//           {/* Tag selector */}
// <div className="mt-3">
//   <p className="text-xs text-gray-500 mb-2">Category</p>
//   <div className="flex gap-2 flex-wrap">
//     {Object.entries(TAG_CONFIG).map(([key, val]) => (
//       <button key={key} onClick={() => setTag(key)}
//         className={`text-xs px-3 py-1 rounded-full border transition-all
//           ${tag === key ? val.color + " font-semibold" : "border-white/10 text-gray-500 hover:border-white/30"}`}>
//         {val.emoji} {val.label}
//       </button>
//     ))}
//   </div>
// </div>

// {/* ✅ Divider */}
// <div className="border-t border-white/10 my-3" />

// {/* Visibility selector */}
// <div>
//   <p className="text-xs text-gray-500 mb-2">👁️ Who can see this?</p>
//   <div className="flex gap-2 flex-wrap">
//     {VISIBILITY_CONFIG.map(opt => (
//       <button key={opt.value} onClick={() => setVisibility(opt.value)}
//         className={`text-xs px-3 py-1 rounded-full border transition-all
//           ${visibility === opt.value
//             ? "bg-[#26F2D0]/20 text-[#26F2D0] border-[#26F2D0]/30"
//             : "border-white/10 text-gray-500 hover:border-white/30"}`}>
//         {opt.label}
//       </button>
//     ))}
//   </div>
// </div>
//             {/* Post button */}
//             <div className="flex items-center justify-end gap-3 mt-3">
//               <span className={`text-xs ${content.length > 250 ? "text-red-400" : "text-gray-500"}`}>
//                 {content.length}/280
//               </span>
//               <button onClick={handlePost} disabled={!content.trim() || posting}
//                 className="px-5 py-2 rounded-full text-sm font-semibold transition-all
//                            bg-[#26F2D0] text-black hover:bg-[#1dd4b8]
//                            disabled:opacity-40 disabled:cursor-not-allowed">
//                 {posting ? "Posting..." : "Post"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Search bar */}
//       <div className="relative mb-4">
//         <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
//         <input
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           placeholder="Search posts..."
//           className="w-full bg-[#111] border border-white/10 rounded-full
//                      pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500
//                      outline-none focus:border-[#26F2D0]/50 transition"
//         />
//         {search && (
//           <button onClick={() => setSearch("")}
//             className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
//             ✕
//           </button>
//         )}
//       </div>

//       {/* ✅ Filter Tags */}
//       <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
//         <button onClick={() => setFilterTag("ALL")}
//           className={`text-xs px-4 py-1.5 rounded-full border whitespace-nowrap transition-all
//             ${filterTag === "ALL"
//               ? "bg-[#26F2D0]/20 text-[#26F2D0] border-[#26F2D0]/30"
//               : "border-white/10 text-gray-500 hover:border-white/30"}`}>
//           🌐 All
//         </button>
//         {Object.entries(TAG_CONFIG).map(([key, val]) => (
//           <button key={key} onClick={() => setFilterTag(key)}
//             className={`text-xs px-4 py-1.5 rounded-full border whitespace-nowrap transition-all
//               ${filterTag === key ? val.color : "border-white/10 text-gray-500 hover:border-white/30"}`}>
//             {val.emoji} {val.label}
//           </button>
//         ))}
//       </div>

//       {/* ✅ Posts Feed */}
//       {loading ? (
//         <div className="text-center py-20 text-gray-500">Loading buzz...</div>
//       ) : posts.length === 0 ? (
//         <div className="text-center py-20">
//           <p className="text-4xl mb-3">📢</p>
//           <p className="text-gray-400">No posts yet. Be the first to buzz!</p>
//         </div>
//       ) : (
//         <>
//           {/* Hot Right Now — hide when searching */}
//           {hotPosts.length > 0 && filterTag === "ALL" && !search && (
//             <div className="mb-6">
//               <div className="flex items-center gap-2 mb-3">
//                 <span className="text-sm font-semibold text-orange-400">🔥 Hot Right Now</span>
//                 <div className="flex-1 h-px bg-orange-400/20" />
//               </div>
//               <div className="space-y-3">
//                 {hotPosts.map(post => renderPost(post, true))}
//               </div>
//             </div>
//           )}

//           {/* All Posts */}
//           <div className="flex items-center gap-2 mb-3">
//             <span className="text-sm font-semibold text-gray-400">
//               {search
//                 ? `🔎 Results for "${search}"`
//                 : filterTag === "ALL"
//                   ? "✨ All Buzz"
//                   : `${TAG_CONFIG[filterTag]?.emoji} ${TAG_CONFIG[filterTag]?.label}`}
//             </span>
//             <div className="flex-1 h-px bg-white/10" />
//             <span className="text-xs text-gray-600">{sortedPosts.length} posts</span>
//           </div>

//           {sortedPosts.length === 0 ? (
//             <div className="text-center py-10">
//               <p className="text-gray-500 text-sm">
//                 {search ? `No posts found for "${search}"` : "No posts in this category yet"}
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {sortedPosts.map(post => renderPost(post, false))}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import BuzzComposer from "./Buzz/BuzzComposer";
import BuzzFeed from "./Buzz/BuzzFeed";
import { ArrowUp } from "lucide-react";

export default function CampusBuzz({ onNewPost }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCount, setNewCount] = useState(0);
  const [pendingPosts, setPendingPosts] = useState([]);
  const latestPostTime = useRef(null);

  const token = sessionStorage.getItem("token");
  const myRoll = sessionStorage.getItem("rollNumber");
  const role = sessionStorage.getItem("role");

  useEffect(() => {
    fetchPosts();
    localStorage.setItem("lastBuzzVisit", Date.now().toString());
  }, []);

  // ✅ poll every 30 seconds for new posts from others
  useEffect(() => {
    if (loading) return;
    const interval = setInterval(pollNewPosts, 30000);
    return () => clearInterval(interval);
  }, [loading, posts]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/buzz", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) return;
      const data = await res.json();
      setPosts(data);
      if (data.length > 0) {
        latestPostTime.current = Math.max(...data.map(p => new Date(p.createdAt).getTime()));
      } else {
        latestPostTime.current = Date.now();
      }
    } catch (err) {
      console.error("Failed to fetch buzz posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const pollNewPosts = async () => {
    if (!latestPostTime.current) return;
    try {
      const res = await fetch("http://localhost:8081/api/buzz", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) return;
      const data = await res.json();

      // ✅ only posts newer than current feed AND not by me
      const newer = data.filter(p =>
        new Date(p.createdAt).getTime() > latestPostTime.current &&
        p.createdByRollNumber !== myRoll
      );

      if (newer.length > 0) {
        setPendingPosts(newer);
        setNewCount(newer.length);
      }
    } catch (err) {
      console.error("Poll failed:", err);
    }
  };

  // ✅ load buffered posts into feed when banner clicked
  const loadNewPosts = () => {
    setPosts(prev => {
      const merged = [...pendingPosts, ...prev];
      latestPostTime.current = Math.max(...merged.map(p => new Date(p.createdAt).getTime()));
      return merged;
    });
    setPendingPosts([]);
    setNewCount(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePost = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
    latestPostTime.current = new Date(newPost.createdAt).getTime();
    if (onNewPost) onNewPost(newPost);
  };

  const handleUpdate = (updated) => {
    setPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleDelete = (id) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  if (loading) return (
    <div className="text-center py-20 text-gray-500">Loading buzz...</div>
  );

  return (
    <div className="max-w-2xl mx-auto pb-20">

      {/* ✅ Sticky new posts banner — slides in when new posts arrive */}
      <div className={`sticky top-16 z-40 flex justify-center transition-all duration-500
                       ${newCount > 0
                         ? "opacity-100 translate-y-0 mb-3"
                         : "opacity-0 -translate-y-4 pointer-events-none h-0 mb-0"}`}>
        <button
          onClick={loadNewPosts}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full
                     bg-[#26F2D0] text-black text-sm font-semibold shadow-lg
                     hover:bg-[#1dd4b8] transition-all active:scale-95
                     shadow-[0_0_20px_rgba(38,242,208,0.4)]">
          <ArrowUp size={15} />
          {newCount} new post{newCount > 1 ? "s" : ""} — tap to load
        </button>
      </div>

      <BuzzComposer token={token} onPost={handlePost} />

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">📢</p>
          <p className="text-gray-400">No posts yet. Be the first to buzz!</p>
        </div>
      ) : (
        <BuzzFeed
          posts={posts}
          token={token}
          myRoll={myRoll}
          role={role}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}