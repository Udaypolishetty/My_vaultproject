// import { useState } from "react";

// const STATUS_OPTIONS = [
//   { value: "UNDER_REVIEW", label: "Under Review", icon: "🔍", color: "bg-blue-500/20 text-blue-400 border-blue-400/30" },
//   { value: "IMPLEMENTED",  label: "Implemented",  icon: "✅", color: "bg-green-500/20 text-green-400 border-green-400/30" },
//   { value: "ON_HOLD",      label: "On Hold",      icon: "⏸", color: "bg-yellow-500/20 text-yellow-400 border-yellow-400/30" },
//   { value: "REJECTED",     label: "Rejected",     icon: "❌", color: "bg-red-500/20 text-red-400 border-red-400/30" },
//   { value: "OPEN",         label: "Open",         icon: "💡", color: "bg-gray-500/20 text-gray-400 border-gray-400/30" },
// ];

// const categoryStyles = {
//   Tech: "bg-blue-500/20 text-blue-400",
//   Academic: "bg-green-500/20 text-green-400",
//   "Campus Pulse": "bg-red-500/20 text-red-400",
//   Cultural: "bg-yellow-300/20 text-yellow-400",
// };

// export default function IdeaReviewCard({ idea, token, isAdmin, onUpdated, onDeleted }) {
//   const [isReviewing, setIsReviewing] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState(idea.status || "OPEN");
//   const [note, setNote] = useState(idea.moderatorNote || "");
//   const [saving, setSaving] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [saved, setSaved] = useState(false);

//   const statusOpt = STATUS_OPTIONS.find(s => s.value === (idea.status || "OPEN")) || STATUS_OPTIONS[4];
//   const availableStatuses = isAdmin ? STATUS_OPTIONS : STATUS_OPTIONS.filter(s => s.value !== "OPEN");

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       const res = await fetch(`http://localhost:8081/api/ideas/${idea.id}/status`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ status: selectedStatus, moderatorNote: note })
//       });
//       if (res.ok) {
//         const updated = await res.json();
//         onUpdated(updated);
//         setIsReviewing(false);
//         setSaved(true);
//         setTimeout(() => setSaved(false), 2500);
//       }
//     } catch (err) {
//       console.error("Save failed:", err);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Permanently delete this idea?")) return;
//     setDeleting(true);
//     try {
//       const res = await fetch(`http://localhost:8081/api/ideas/${idea.id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (res.ok) onDeleted(idea.id);
//     } catch (err) {
//       console.error("Delete failed:", err);
//     } finally {
//       setDeleting(false);
//     }
//   };

//   return (
//     <div className={`bg-[#111] border rounded-2xl p-5 transition-all duration-200
//       ${isReviewing
//         ? "border-[#26F2D0]/40 shadow-[0_0_20px_rgba(38,242,208,0.08)]"
//         : "border-white/10 hover:border-white/20"
//       }`}>





//       {/* Top row */}
//       <div className="flex items-start justify-between gap-3 flex-wrap">
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2 flex-wrap mb-1">
//             <span className={`text-xs px-2 py-0.5 rounded-full font-medium
//               ${categoryStyles[idea.category] || "bg-gray-500/20 text-gray-400"}`}>
//               {idea.category}
//             </span>
//             <span className={`text-xs px-2 py-0.5 rounded-full font-medium border
//               ${statusOpt.color}`}>
//               {statusOpt.icon} {statusOpt.label}
//             </span>
//             {saved && (
//               <span className="text-xs text-green-400 bg-green-400/10
//                                px-2 py-0.5 rounded-full animate-pulse">
//                 ✅ Saved!
//               </span>
//             )}
//           </div>
//           <h4 className="font-bold text-white">{idea.title}</h4>
//           <p className="text-gray-400 text-sm mt-1 line-clamp-2">{idea.description}</p>
//         </div>

//         {/* Stats + admin delete */}
//         <div className="flex items-center gap-4 shrink-0">
//           <div className="text-center">
//             <p className="font-bold text-[#26F2D0]">{idea.likes || 0}</p>
//             <p className="text-xs text-gray-500">likes</p>
//           </div>
//           <div className="text-center">
//             <p className="font-bold text-gray-300">{idea.comments?.length || 0}</p>
//             <p className="text-xs text-gray-500">comments</p>
//           </div>
//         {isAdmin && (
//   <button
//     onClick={handleDelete}
//     disabled={deleting}
//     className="w-8 h-8 rounded-xl flex items-center justify-center
//                bg-red-500/10 text-red-400 hover:bg-red-500/20
//                border border-red-400/20 transition-all disabled:opacity-40
//                relative z-20"
//     title="Delete idea"
//   >
//               {deleting ? (
//                 <div className="w-3 h-3 border border-red-400 border-t-transparent
//                                 rounded-full animate-spin" />
//               ) : "🗑️"}
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Author */}
//       <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 flex-wrap">
//         <span>by {idea.createdByName}</span>
//         <span>·</span>
//         <span>{idea.createdByBranch} · {idea.createdByYear}</span>
//         <span>·</span>
//         <span>{new Date(idea.createdAt).toLocaleDateString("en-IN", {
//           day: "numeric", month: "short", year: "numeric"
//         })}</span>
//         {idea.reviewedBy && (
//           <>
//             <span>·</span>
//             <span className="text-purple-400">Last reviewed by {idea.reviewedBy}</span>
//           </>
//         )}
//       </div>

//       {/* Existing note */}
//       {idea.moderatorNote && !isReviewing && (
//         <div className="mt-3 flex items-start gap-2 bg-white/5 rounded-xl px-3 py-2 text-xs text-gray-400">
//           <span>📝</span>
//           <span>{idea.moderatorNote}</span>
//           {idea.reviewedBy && (
//             <span className="ml-auto text-gray-600 shrink-0">— {idea.reviewedBy}</span>
//           )}
//         </div>
//       )}

//       {/* Review panel */}
//       {isReviewing ? (
//         <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//             {availableStatuses.map(opt => (
//               <button
//                 key={opt.value}
//                 onClick={() => setSelectedStatus(opt.value)}
//                 className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs
//                            font-medium border transition-all
//                            ${selectedStatus === opt.value
//                              ? opt.color + " scale-[1.02]"
//                              : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
//                            }`}
//               >
//                 {opt.icon} {opt.label}
//                 {opt.value === "OPEN" && isAdmin && (
//                   <span className="text-xs opacity-60">(reset)</span>
//                 )}
//               </button>
//             ))}
//           </div>

//           <textarea
//             value={note}
//             onChange={e => setNote(e.target.value)}
//             placeholder={isAdmin
//               ? "Add admin note or override reason (optional)"
//               : "Add a note for the student (optional for Under Review, required for Rejected/On Hold)"
//             }
//             rows={2}
//             className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl
//                        px-4 py-2.5 text-sm text-white placeholder-gray-500
//                        outline-none resize-none focus:border-[#26F2D0]/50 transition"
//           />

//           <div className="flex gap-2 justify-end">
//             <button
//               onClick={() => {
//                 setIsReviewing(false);
//                 setSelectedStatus(idea.status || "OPEN");
//                 setNote(idea.moderatorNote || "");
//               }}
//               className="px-4 py-2 bg-white/10 text-gray-300 rounded-xl text-sm
//                          hover:bg-white/20 transition"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               disabled={saving}
//               className="px-4 py-2 bg-[#26F2D0] text-black rounded-xl text-sm
//                          font-semibold hover:bg-[#1dd4b8] transition
//                          disabled:opacity-40 disabled:cursor-not-allowed"
//             >
//               {saving ? "Saving..." : isAdmin ? "Override & Save" : "Save Decision"}
//             </button>
//           </div>
//         </div>
//       ) : (
//         <button
//           onClick={() => setIsReviewing(true)}
//           className="mt-3 flex items-center gap-1.5 text-xs text-[#26F2D0]
//                      hover:text-white transition font-medium"
//         >
//           {isAdmin ? "⚙️ Admin Review →" : "✏️ Review this idea →"}
//         </button>
//       )}
//     </div>
//   );
// }



// import { useState } from "react";
// import { Trash2, Save, X, Pencil, Settings } from "lucide-react";

// const STATUS_OPTIONS = [
//   { value: "UNDER_REVIEW", label: "Under Review", icon: "🔍", color: "bg-blue-500/20 text-blue-400 border-blue-400/30" },
//   { value: "IMPLEMENTED",  label: "Implemented",  icon: "✅", color: "bg-green-500/20 text-green-400 border-green-400/30" },
//   { value: "ON_HOLD",      label: "On Hold",      icon: "⏸", color: "bg-yellow-500/20 text-yellow-400 border-yellow-400/30" },
//   { value: "REJECTED",     label: "Rejected",     icon: "❌", color: "bg-red-500/20 text-red-400 border-red-400/30" },
//   { value: "OPEN",         label: "Open",         icon: "💡", color: "bg-gray-500/20 text-gray-400 border-gray-400/30" },
// ];

// const categoryStyles = {
//   Tech: "bg-blue-500/20 text-blue-400",
//   Academic: "bg-green-500/20 text-green-400",
//   "Campus Pulse": "bg-red-500/20 text-red-400",
//   Cultural: "bg-yellow-300/20 text-yellow-400",
// };

// export default function IdeaReviewCard({ idea, token, isAdmin, onUpdated, onDeleted }) {
//   const [isReviewing, setIsReviewing] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState(idea.status || "OPEN");
//   const [note, setNote] = useState(idea.moderatorNote || "");
//   const [saving, setSaving] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [saved, setSaved] = useState(false);
//   const [confirmDelete, setConfirmDelete] = useState(false);

//   const statusOpt = STATUS_OPTIONS.find(s => s.value === (idea.status || "OPEN")) || STATUS_OPTIONS[4];
//   const availableStatuses = isAdmin ? STATUS_OPTIONS : STATUS_OPTIONS.filter(s => s.value !== "OPEN");

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       const res = await fetch(`http://localhost:8081/api/ideas/${idea.id}/status`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ status: selectedStatus, moderatorNote: note })
//       });
//       if (res.ok) {
//         const updated = await res.json();
//         onUpdated(updated);
//         setIsReviewing(false);
//         setSaved(true);
//         setTimeout(() => setSaved(false), 2500);
//       }
//     } catch (err) {
//       console.error("Save failed:", err);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDelete = async () => {
//     setDeleting(true);
//     try {
//       const res = await fetch(`http://localhost:8081/api/ideas/${idea.id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (res.ok) onDeleted(idea.id);
//     } catch (err) {
//       console.error("Delete failed:", err);
//     } finally {
//       setDeleting(false);
//       setConfirmDelete(false);
//     }
//   };

//   return (
//     <div className={`bg-[#111] border rounded-2xl p-5 transition-all duration-200
//       ${isReviewing
//         ? "border-[#26F2D0]/40 shadow-[0_0_20px_rgba(38,242,208,0.08)]"
//         : "border-white/10 hover:border-white/20"
//       }`}>

//       {/* Top row */}
//       <div className="flex items-start justify-between gap-3 flex-wrap">
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2 flex-wrap mb-1">
//             <span className={`text-xs px-2 py-0.5 rounded-full font-medium
//               ${categoryStyles[idea.category] || "bg-gray-500/20 text-gray-400"}`}>
//               {idea.category}
//             </span>
//             <span className={`text-xs px-2 py-0.5 rounded-full font-medium border
//               ${statusOpt.color}`}>
//               {statusOpt.icon} {statusOpt.label}
//             </span>
//             {saved && (
//               <span className="text-xs text-green-400 bg-green-400/10
//                                px-2 py-0.5 rounded-full animate-pulse">
//                 ✅ Saved!
//               </span>
//             )}
//           </div>
//           <h4 className="font-bold text-white">{idea.title}</h4>
//           <p className="text-gray-400 text-sm mt-1 line-clamp-2">{idea.description}</p>
//         </div>

//         {/* Stats + admin delete */}
//         <div className="flex items-center gap-4 shrink-0">
//           <div className="text-center">
//             <p className="font-bold text-[#26F2D0]">{idea.likes || 0}</p>
//             <p className="text-xs text-gray-500">likes</p>
//           </div>
//           <div className="text-center">
//             <p className="font-bold text-gray-300">{idea.comments?.length || 0}</p>
//             <p className="text-xs text-gray-500">comments</p>
//           </div>

//           {/* ✅ inline delete confirmation */}
//           {isAdmin && (
//             confirmDelete ? (
//               <div className="flex items-center gap-1">
//                 <span className="text-xs text-gray-400">Sure?</span>
//                 <button
//                   onClick={handleDelete}
//                   disabled={deleting}
//                   className="text-xs text-red-400 hover:text-red-300 font-semibold
//                              px-2 py-0.5 rounded-full bg-red-400/10 transition
//                              disabled:opacity-50"
//                 >
//                   {deleting ? "..." : "Yes"}
//                 </button>
//                 <button
//                   onClick={() => setConfirmDelete(false)}
//                   className="text-xs text-gray-500 hover:text-white px-2 py-0.5
//                              rounded-full bg-white/5 transition"
//                 >
//                   No
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={() => setConfirmDelete(true)}
//                 className="w-8 h-8 rounded-xl flex items-center justify-center
//                            bg-red-500/10 text-red-400 hover:bg-red-500/20
//                            border border-red-400/20 transition-all"
//                 title="Delete idea"
//               >
//                 <Trash2 size={14} />
//               </button>
//             )
//           )}
//         </div>
//       </div>

//       {/* Author */}
//       <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 flex-wrap">
//         <span>by {idea.createdByName}</span>
//         <span>·</span>
//         <span>{idea.createdByBranch} · {idea.createdByYear}</span>
//         <span>·</span>
//         <span>{new Date(idea.createdAt).toLocaleDateString("en-IN", {
//           day: "numeric", month: "short", year: "numeric"
//         })}</span>
//         {idea.reviewedBy && (
//           <>
//             <span>·</span>
//             <span className="text-purple-400">Last reviewed by {idea.reviewedBy}</span>
//           </>
//         )}
//       </div>

//       {/* Existing note */}
//       {idea.moderatorNote && !isReviewing && (
//         <div className="mt-3 flex items-start gap-2 bg-white/5 rounded-xl
//                         px-3 py-2 text-xs text-gray-400">
//           <span>📝</span>
//           <span>{idea.moderatorNote}</span>
//           {idea.reviewedBy && (
//             <span className="ml-auto text-gray-600 shrink-0">— {idea.reviewedBy}</span>
//           )}
//         </div>
//       )}

//       {/* Review panel */}
//       {isReviewing ? (
//         <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//             {availableStatuses.map(opt => (
//               <button
//                 key={opt.value}
//                 onClick={() => setSelectedStatus(opt.value)}
//                 className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs
//                            font-medium border transition-all
//                            ${selectedStatus === opt.value
//                              ? opt.color + " scale-[1.02]"
//                              : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
//                            }`}
//               >
//                 {opt.icon} {opt.label}
//                 {opt.value === "OPEN" && isAdmin && (
//                   <span className="text-xs opacity-60">(reset)</span>
//                 )}
//               </button>
//             ))}
//           </div>

//           <textarea
//             value={note}
//             onChange={e => setNote(e.target.value)}
//             placeholder={isAdmin
//               ? "Add admin note or override reason (optional)"
//               : "Add a note for the student (optional for Under Review, required for Rejected/On Hold)"
//             }
//             rows={2}
//             className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl
//                        px-4 py-2.5 text-sm text-white placeholder-gray-500
//                        outline-none resize-none focus:border-[#26F2D0]/50 transition"
//           />

//           <div className="flex gap-2 justify-end">
//             <button
//               onClick={() => {
//                 setIsReviewing(false);
//                 setSelectedStatus(idea.status || "OPEN");
//                 setNote(idea.moderatorNote || "");
//               }}
//               className="flex items-center gap-1.5 px-4 py-2 bg-white/10
//                          text-gray-300 rounded-xl text-sm hover:bg-white/20 transition"
//             >
//               <X size={14} /> Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               disabled={saving}
//               className="flex items-center gap-1.5 px-4 py-2 bg-[#26F2D0] text-black
//                          rounded-xl text-sm font-semibold hover:bg-[#1dd4b8] transition
//                          disabled:opacity-40 disabled:cursor-not-allowed"
//             >
//               <Save size={14} />
//               {saving ? "Saving..." : isAdmin ? "Override & Save" : "Save Decision"}
//             </button>
//           </div>
//         </div>
//       ) : (
//         <button
//           onClick={() => setIsReviewing(true)}
//           className="mt-3 flex items-center gap-1.5 text-xs text-[#26F2D0]
//                      hover:text-white transition font-medium"
//         >
//           {isAdmin
//             ? <><Settings size={12} /> Admin Review →</>
//             : <><Pencil size={12} /> Review this idea →</>
//           }
//         </button>
//       )}
//     </div>
//   );
// }


// import { useState, useRef } from "react";
// import { Trash2, Save, X, Pencil, Settings, Upload, Image } from "lucide-react";

// const STATUS_OPTIONS = [
//   { value: "UNDER_REVIEW", label: "Under Review", icon: "🔍", color: "bg-blue-500/20 text-blue-400 border-blue-400/30" },
//   { value: "IMPLEMENTED",  label: "Implemented",  icon: "✅", color: "bg-green-500/20 text-green-400 border-green-400/30" },
//   { value: "ON_HOLD",      label: "On Hold",      icon: "⏸", color: "bg-yellow-500/20 text-yellow-400 border-yellow-400/30" },
//   { value: "REJECTED",     label: "Rejected",     icon: "❌", color: "bg-red-500/20 text-red-400 border-red-400/30" },
//   { value: "OPEN",         label: "Open",         icon: "💡", color: "bg-gray-500/20 text-gray-400 border-gray-400/30" },
// ];

// const categoryStyles = {
//   Tech: "bg-blue-500/20 text-blue-400",
//   Academic: "bg-green-500/20 text-green-400",
//   "Campus Pulse": "bg-red-500/20 text-red-400",
//   Cultural: "bg-yellow-300/20 text-yellow-400",
// };

// // ✅ your existing Cloudinary config — same as CampusNews
// const CLOUDINARY_UPLOAD_PRESET = "campus_vault";
// const CLOUDINARY_CLOUD_NAME = "dn6ot9flx"; // ← replace with yours

// export default function IdeaReviewCard({ idea, token, isAdmin, onUpdated, onDeleted }) {
//   const [isReviewing, setIsReviewing] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState(idea.status || "OPEN");
//   const [note, setNote] = useState(idea.moderatorNote || "");
//   const [saving, setSaving] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [saved, setSaved] = useState(false);
//   const [confirmDelete, setConfirmDelete] = useState(false);

//   // ✅ showcase image state
//   const [showcaseImageUrl, setShowcaseImageUrl] = useState(idea.showcaseImageUrl || "");
//   const [uploading, setUploading] = useState(false);
//   const fileRef = useRef(null);

//   const statusOpt = STATUS_OPTIONS.find(s => s.value === (idea.status || "OPEN")) || STATUS_OPTIONS[4];
//   const availableStatuses = isAdmin ? STATUS_OPTIONS : STATUS_OPTIONS.filter(s => s.value !== "OPEN");

//   // ✅ upload to Cloudinary
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setUploading(true);
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/dn6ot9flx/image/upload`,
//         { method: "POST", body: formData }
//       );
//       const data = await res.json();
//       if (data.secure_url) setShowcaseImageUrl(data.secure_url);
//     } catch (err) {
//       console.error("Image upload failed:", err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       const res = await fetch(`http://localhost:8081/api/ideas/${idea.id}/status`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           status: selectedStatus,
//           moderatorNote: note,
//           showcaseImageUrl: selectedStatus === "IMPLEMENTED" ? showcaseImageUrl : null
//         })
//       });
//       if (res.ok) {
//         const updated = await res.json();
//         onUpdated(updated);
//         setIsReviewing(false);
//         setSaved(true);
//         setTimeout(() => setSaved(false), 2500);
//       }
//     } catch (err) {
//       console.error("Save failed:", err);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDelete = async () => {
//     setDeleting(true);
//     try {
//       const res = await fetch(`http://localhost:8081/api/ideas/${idea.id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (res.ok) onDeleted(idea.id);
//     } catch (err) {
//       console.error("Delete failed:", err);
//     } finally {
//       setDeleting(false);
//       setConfirmDelete(false);
//     }
//   };

//   return (
//     <div className={`bg-[#111] border rounded-2xl p-5 transition-all duration-200
//       ${isReviewing
//         ? "border-[#26F2D0]/40 shadow-[0_0_20px_rgba(38,242,208,0.08)]"
//         : "border-white/10 hover:border-white/20"
//       }`}>

//       {/* Top row */}
//       <div className="flex items-start justify-between gap-3 flex-wrap">
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2 flex-wrap mb-1">
//             <span className={`text-xs px-2 py-0.5 rounded-full font-medium
//               ${categoryStyles[idea.category] || "bg-gray-500/20 text-gray-400"}`}>
//               {idea.category}
//             </span>
//             <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${statusOpt.color}`}>
//               {statusOpt.icon} {statusOpt.label}
//             </span>
//             {saved && (
//               <span className="text-xs text-green-400 bg-green-400/10
//                                px-2 py-0.5 rounded-full animate-pulse">
//                 ✅ Saved!
//               </span>
//             )}
//           </div>
//           <h4 className="font-bold text-white">{idea.title}</h4>
//           <p className="text-gray-400 text-sm mt-1 line-clamp-2">{idea.description}</p>
//         </div>

//         <div className="flex items-center gap-4 shrink-0">
//           <div className="text-center">
//             <p className="font-bold text-[#26F2D0]">{idea.likes || 0}</p>
//             <p className="text-xs text-gray-500">likes</p>
//           </div>
//           <div className="text-center">
//             <p className="font-bold text-gray-300">{idea.comments?.length || 0}</p>
//             <p className="text-xs text-gray-500">comments</p>
//           </div>

//           {isAdmin && (
//             confirmDelete ? (
//               <div className="flex items-center gap-1">
//                 <span className="text-xs text-gray-400">Sure?</span>
//                 <button onClick={handleDelete} disabled={deleting}
//                   className="text-xs text-red-400 hover:text-red-300 font-semibold
//                              px-2 py-0.5 rounded-full bg-red-400/10 transition disabled:opacity-50">
//                   {deleting ? "..." : "Yes"}
//                 </button>
//                 <button onClick={() => setConfirmDelete(false)}
//                   className="text-xs text-gray-500 hover:text-white px-2 py-0.5
//                              rounded-full bg-white/5 transition">
//                   No
//                 </button>
//               </div>
//             ) : (
//               <button onClick={() => setConfirmDelete(true)}
//                 className="w-8 h-8 rounded-xl flex items-center justify-center
//                            bg-red-500/10 text-red-400 hover:bg-red-500/20
//                            border border-red-400/20 transition-all">
//                 <Trash2 size={14} />
//               </button>
//             )
//           )}
//         </div>
//       </div>

//       {/* Author */}
//       <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 flex-wrap">
//         <span>by {idea.createdByName}</span>
//         <span>·</span>
//         <span>{idea.createdByBranch} · {idea.createdByYear}</span>
//         <span>·</span>
//         <span>{new Date(idea.createdAt).toLocaleDateString("en-IN", {
//           day: "numeric", month: "short", year: "numeric"
//         })}</span>
//         {idea.reviewedBy && (
//           <>
//             <span>·</span>
//             <span className="text-purple-400">Last reviewed by {idea.reviewedBy}</span>
//           </>
//         )}
//       </div>

//       {/* Existing note */}
//       {idea.moderatorNote && !isReviewing && (
//         <div className="mt-3 flex items-start gap-2 bg-white/5 rounded-xl px-3 py-2 text-xs text-gray-400">
//           <span>📝</span>
//           <span>{idea.moderatorNote}</span>
//           {idea.reviewedBy && (
//             <span className="ml-auto text-gray-600 shrink-0">— {idea.reviewedBy}</span>
//           )}
//         </div>
//       )}

//       {/* Existing showcase image preview */}
//       {idea.showcaseImageUrl && !isReviewing && (
//         <div className="mt-3">
//           <img src={idea.showcaseImageUrl} alt="Showcase"
//             className="w-full h-32 object-cover rounded-xl border border-green-500/20" />
//           <p className="text-xs text-green-400 mt-1">🖼️ Showcase image attached</p>
//         </div>
//       )}

//       {/* Review panel */}
//       {isReviewing ? (
//         <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//             {availableStatuses.map(opt => (
//               <button key={opt.value} onClick={() => setSelectedStatus(opt.value)}
//                 className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs
//                            font-medium border transition-all
//                            ${selectedStatus === opt.value
//                              ? opt.color + " scale-[1.02]"
//                              : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
//                            }`}>
//                 {opt.icon} {opt.label}
//                 {opt.value === "OPEN" && isAdmin && (
//                   <span className="text-xs opacity-60">(reset)</span>
//                 )}
//               </button>
//             ))}
//           </div>

//           <textarea
//             value={note}
//             onChange={e => setNote(e.target.value)}
//             placeholder={isAdmin
//               ? "Add admin note or override reason (optional)"
//               : "Add a note for the student (optional for Under Review, required for Rejected/On Hold)"
//             }
//             rows={2}
//             className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl
//                        px-4 py-2.5 text-sm text-white placeholder-gray-500
//                        outline-none resize-none focus:border-[#26F2D0]/50 transition"
//           />

//           {/* ✅ Showcase image upload — only shown when IMPLEMENTED selected */}
//           {selectedStatus === "IMPLEMENTED" && (
//             <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4 space-y-3">
//               <p className="text-xs text-green-400 font-medium flex items-center gap-1.5">
//                 <Image size={13} /> Showcase Image
//                 <span className="text-gray-500 font-normal">(optional — shown on Home page)</span>
//               </p>

//               {showcaseImageUrl ? (
//                 <div className="relative">
//                   <img src={showcaseImageUrl} alt="Preview"
//                     className="w-full h-36 object-cover rounded-xl border border-green-500/20" />
//                   <button
//                     onClick={() => setShowcaseImageUrl("")}
//                     className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60
//                                text-white flex items-center justify-center text-xs hover:bg-red-500 transition">
//                     ✕
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => fileRef.current?.click()}
//                   disabled={uploading}
//                   className="w-full flex items-center justify-center gap-2 py-3
//                              border border-dashed border-green-500/30 rounded-xl
//                              text-xs text-green-400 hover:bg-green-500/10 transition
//                              disabled:opacity-50">
//                   {uploading
//                     ? <><div className="w-3 h-3 border border-green-400 border-t-transparent rounded-full animate-spin" /> Uploading...</>
//                     : <><Upload size={13} /> Upload showcase image</>
//                   }
//                 </button>
//               )}
//               <input
//                 ref={fileRef}
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleImageUpload}
//               />
//             </div>
//           )}

//           <div className="flex gap-2 justify-end">
//             <button
//               onClick={() => {
//                 setIsReviewing(false);
//                 setSelectedStatus(idea.status || "OPEN");
//                 setNote(idea.moderatorNote || "");
//                 setShowcaseImageUrl(idea.showcaseImageUrl || "");
//               }}
//               className="flex items-center gap-1.5 px-4 py-2 bg-white/10
//                          text-gray-300 rounded-xl text-sm hover:bg-white/20 transition">
//               <X size={14} /> Cancel
//             </button>
//             <button onClick={handleSave} disabled={saving}
//               className="flex items-center gap-1.5 px-4 py-2 bg-[#26F2D0] text-black
//                          rounded-xl text-sm font-semibold hover:bg-[#1dd4b8] transition
//                          disabled:opacity-40 disabled:cursor-not-allowed">
//               <Save size={14} />
//               {saving ? "Saving..." : isAdmin ? "Override & Save" : "Save Decision"}
//             </button>
//           </div>
//         </div>
//       ) : (
//         <button onClick={() => setIsReviewing(true)}
//           className="mt-3 flex items-center gap-1.5 text-xs text-[#26F2D0]
//                      hover:text-white transition font-medium">
//           {isAdmin
//             ? <><Settings size={12} /> Admin Review →</>
//             : <><Pencil size={12} /> Review this idea →</>
//           }
//         </button>
//       )}
//     </div>
//   );
// }

import { useState, useRef } from "react";
import { Trash2, Save, X, Pencil, Settings, Upload, Image, Link } from "lucide-react";
import { validateShortText, validateUrl } from "../../utils/validate";



const STATUS_OPTIONS = [
  { value: "UNDER_REVIEW", label: "Under Review", icon: "🔍", color: "bg-blue-500/20 text-blue-400 border-blue-400/30" },
  { value: "IMPLEMENTED",  label: "Implemented",  icon: "✅", color: "bg-green-500/20 text-green-400 border-green-400/30" },
  { value: "ON_HOLD",      label: "On Hold",      icon: "⏸", color: "bg-yellow-500/20 text-yellow-400 border-yellow-400/30" },
  { value: "REJECTED",     label: "Rejected",     icon: "❌", color: "bg-red-500/20 text-red-400 border-red-400/30" },
  { value: "OPEN",         label: "Open",         icon: "💡", color: "bg-gray-500/20 text-gray-400 border-gray-400/30" },
];

const categoryStyles = {
  Tech: "bg-blue-500/20 text-blue-400",
  Academic: "bg-green-500/20 text-green-400",
  "Campus Pulse": "bg-red-500/20 text-red-400",
  Cultural: "bg-yellow-300/20 text-yellow-400",
};

const CLOUDINARY_UPLOAD_PRESET = "campus_vault";
const CLOUDINARY_CLOUD_NAME = "dn6ot9flx";

const canUploadShowcase = (idea) => {
  if (idea.status !== "IMPLEMENTED") return false;
  if (!idea.reviewedAt) return true;
  const hoursSince = (Date.now() - new Date(idea.reviewedAt).getTime()) / 3600000;
  return hoursSince <= 48;
};

export default function IdeaReviewCard({ idea, token, isAdmin, onUpdated, onDeleted }) {
  const [isReviewing, setIsReviewing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(idea.status || "OPEN");
  const [note, setNote] = useState(idea.moderatorNote || "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showcaseImageUrl, setShowcaseImageUrl] = useState(idea.showcaseImageUrl || "");
  const [showcaseLink, setShowcaseLink] = useState(idea.showcaseLink || "");
  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [linkError, setLinkError] = useState("");
  const [noteError, setNoteError] = useState("");
  const fileRef = useRef(null);

  const statusOpt = STATUS_OPTIONS.find(s => s.value === (idea.status || "OPEN")) || STATUS_OPTIONS[4];
  const availableStatuses = isAdmin ? STATUS_OPTIONS : STATUS_OPTIONS.filter(s => s.value !== "OPEN");
  const uploadAllowed = selectedStatus === "IMPLEMENTED" && (
    idea.status !== "IMPLEMENTED" || canUploadShowcase(idea)
  );

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageError("");
    // ✅ 2MB limit
    if (file.size > 2 * 1024 * 1024) {
      setImageError("Image must be under 2MB. Please compress and try again.");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (data.secure_url) setShowcaseImageUrl(data.secure_url);
    } catch (err) {
      setImageError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    // ✅ validate note if filled
    if (note.trim()) {
      const noteCheck = validateShortText(note, 300, "Note");
      if (!noteCheck.valid) { setNoteError(noteCheck.error); return; }
    }
    // ✅ validate showcase link if filled
    if (showcaseLink.trim()) {
      const linkCheck = validateUrl(showcaseLink);
      if (!linkCheck.valid) { setLinkError(linkCheck.error); return; }
    }
    setNoteError("");
    setLinkError("");
    setSaving(true);
    try {
      const res = await fetch(`http://localhost:8081/api/ideas/${idea.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          status: selectedStatus,
          moderatorNote: note,
          showcaseImageUrl: selectedStatus === "IMPLEMENTED" ? showcaseImageUrl : null,
          showcaseLink: selectedStatus === "IMPLEMENTED" ? showcaseLink : null,
        })
      });
      if (res.ok) {
        const updated = await res.json();
        onUpdated(updated);
        setIsReviewing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:8081/api/ideas/${idea.id}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) onDeleted(idea.id);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  return (
    <div className={`bg-[#111] border rounded-2xl p-5 transition-all duration-200
      ${isReviewing
        ? "border-[#26F2D0]/40 shadow-[0_0_20px_rgba(38,242,208,0.08)]"
        : "border-white/10 hover:border-white/20"}`}>

      {/* Top row */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium
              ${categoryStyles[idea.category] || "bg-gray-500/20 text-gray-400"}`}>
              {idea.category}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${statusOpt.color}`}>
              {statusOpt.icon} {statusOpt.label}
            </span>
            {saved && (
              <span className="text-xs text-green-400 bg-green-400/10
                               px-2 py-0.5 rounded-full animate-pulse">✅ Saved!</span>
            )}
          </div>
          <h4 className="font-bold text-white">{idea.title}</h4>
          <p className="text-gray-400 text-sm mt-1 line-clamp-2">{idea.description}</p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="text-center">
            <p className="font-bold text-[#26F2D0]">{idea.likes || 0}</p>
            <p className="text-xs text-gray-500">likes</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-gray-300">{idea.comments?.length || 0}</p>
            <p className="text-xs text-gray-500">comments</p>
          </div>
          {isAdmin && (
            confirmDelete ? (
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-400">Sure?</span>
                <button onClick={handleDelete} disabled={deleting}
                  className="text-xs text-red-400 font-semibold px-2 py-0.5
                             rounded-full bg-red-400/10 transition disabled:opacity-50">
                  {deleting ? "..." : "Yes"}
                </button>
                <button onClick={() => setConfirmDelete(false)}
                  className="text-xs text-gray-500 hover:text-white px-2 py-0.5
                             rounded-full bg-white/5 transition">No</button>
              </div>
            ) : (
              <button onClick={() => setConfirmDelete(true)}
                className="w-8 h-8 rounded-xl flex items-center justify-center
                           bg-red-500/10 text-red-400 hover:bg-red-500/20
                           border border-red-400/20 transition-all">
                <Trash2 size={14} />
              </button>
            )
          )}
        </div>
      </div>

      {/* Author */}
      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 flex-wrap">
        <span>by {idea.createdByName}</span>
        <span>·</span>
        <span>{idea.createdByBranch} · {idea.createdByYear}</span>
        <span>·</span>
        <span>{new Date(idea.createdAt).toLocaleDateString("en-IN", {
          day: "numeric", month: "short", year: "numeric"
        })}</span>
        {idea.reviewedBy && (
          <><span>·</span>
          <span className="text-purple-400">Last reviewed by {idea.reviewedBy}</span></>
        )}
      </div>

      {/* Existing note */}
      {idea.moderatorNote && !isReviewing && (
        <div className="mt-3 flex items-start gap-2 bg-white/5 rounded-xl px-3 py-2
                        text-xs text-gray-400">
          <span>📝</span>
          <span>{idea.moderatorNote}</span>
          {idea.reviewedBy && (
            <span className="ml-auto text-gray-600 shrink-0">— {idea.reviewedBy}</span>
          )}
        </div>
      )}

      {/* Existing showcase preview */}
      {idea.showcaseImageUrl && !isReviewing && (
        <div className="mt-3">
          <img src={idea.showcaseImageUrl} alt="Showcase"
            className="w-full h-32 object-cover rounded-xl border border-green-500/20" />
          <p className="text-xs text-green-400 mt-1">🖼️ Showcase image attached</p>
        </div>
      )}
      {idea.showcaseLink && !isReviewing && (
        <a href={idea.showcaseLink} target="_blank" rel="noopener noreferrer"
          className="mt-1 flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition">
          <Link size={11} /> {idea.showcaseLink}
        </a>
      )}

      {/* Review panel */}
      {isReviewing ? (
        <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {availableStatuses.map(opt => (
              <button key={opt.value} onClick={() => setSelectedStatus(opt.value)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs
                           font-medium border transition-all
                           ${selectedStatus === opt.value
                             ? opt.color + " scale-[1.02]"
                             : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"}`}>
                {opt.icon} {opt.label}
                {opt.value === "OPEN" && isAdmin && (
                  <span className="text-xs opacity-60">(reset)</span>
                )}
              </button>
            ))}
          </div>

          {/* Note with validation */}
          <div>
            <textarea value={note}
              onChange={e => { setNote(e.target.value); setNoteError(""); }}
              placeholder={isAdmin
                ? "Add admin note or override reason (optional)"
                : "Add a note for the student (optional for Under Review, required for Rejected/On Hold)"}
              rows={2}
              className={`w-full bg-[#1a1a1a] border rounded-xl px-4 py-2.5 text-sm text-white
                         placeholder-gray-500 outline-none resize-none transition
                         ${noteError ? "border-red-500/50" : "border-white/10 focus:border-[#26F2D0]/50"}`} />
            {noteError && <p className="text-xs text-red-400 mt-1">⚠️ {noteError}</p>}
          </div>

          {/* Showcase section */}
          {selectedStatus === "IMPLEMENTED" && (
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-green-400 font-medium flex items-center gap-1.5">
                  <Image size={13} /> Showcase Details
                  <span className="text-gray-500 font-normal">(shown on Home page)</span>
                </p>
                {!uploadAllowed && (
                  <span className="text-xs text-yellow-500/70">⏰ Upload window closed (48h)</span>
                )}
              </div>

              {uploadAllowed ? (
                <>
                  {showcaseImageUrl ? (
                    <div className="relative">
                      <img src={showcaseImageUrl} alt="Preview"
                        className="w-full h-36 object-cover rounded-xl border border-green-500/20" />
                      <button onClick={() => setShowcaseImageUrl("")}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60
                                   text-white flex items-center justify-center text-xs
                                   hover:bg-red-500 transition">✕</button>
                    </div>
                  ) : (
                    <button onClick={() => fileRef.current?.click()} disabled={uploading}
                      className="w-full flex items-center justify-center gap-2 py-3
                                 border border-dashed border-green-500/30 rounded-xl
                                 text-xs text-green-400 hover:bg-green-500/10 transition
                                 disabled:opacity-50">
                      {uploading
                        ? <><div className="w-3 h-3 border border-green-400
                                            border-t-transparent rounded-full animate-spin" />
                            Uploading...</>
                        : <><Upload size={13} /> Upload showcase image</>}
                    </button>
                  )}
                  {imageError && <p className="text-xs text-red-400">⚠️ {imageError}</p>}
                  <input ref={fileRef} type="file" accept="image/*"
                    className="hidden" onChange={handleImageUpload} />

                  {/* Link with validation */}
                  <div>
                    <p className="text-xs text-gray-500 mb-1.5 flex items-center gap-1">
                      <Link size={11} /> Implementation link
                      <span className="text-gray-600 ml-1">(YouTube, Instagram, Drive, etc.)</span>
                    </p>
                    <input value={showcaseLink}
                      onChange={e => { setShowcaseLink(e.target.value); setLinkError(""); }}
                      placeholder="https://youtube.com/... or any link"
                      className={`w-full bg-[#1a1a1a] border rounded-xl px-3 py-2 text-xs text-white
                                 placeholder-gray-600 outline-none transition
                                 ${linkError ? "border-red-500/50" : "border-white/10 focus:border-green-500/50"}`} />
                    {linkError && <p className="text-xs text-red-400 mt-1">⚠️ {linkError}</p>}
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  {showcaseImageUrl && (
                    <img src={showcaseImageUrl} alt="Showcase"
                      className="w-full h-28 object-cover rounded-xl opacity-60
                                 border border-green-500/10" />
                  )}
                  {showcaseLink && (
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Link size={10} /> {showcaseLink}
                    </p>
                  )}
                  {!showcaseImageUrl && !showcaseLink && (
                    <p className="text-xs text-gray-600 text-center py-2">No showcase media added</p>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <button onClick={() => {
                setIsReviewing(false);
                setSelectedStatus(idea.status || "OPEN");
                setNote(idea.moderatorNote || "");
                setShowcaseImageUrl(idea.showcaseImageUrl || "");
                setShowcaseLink(idea.showcaseLink || "");
                setNoteError(""); setLinkError(""); setImageError("");
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-white/10
                         text-gray-300 rounded-xl text-sm hover:bg-white/20 transition">
              <X size={14} /> Cancel
            </button>
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#26F2D0] text-black
                         rounded-xl text-sm font-semibold hover:bg-[#1dd4b8] transition
                         disabled:opacity-40 disabled:cursor-not-allowed">
              <Save size={14} />
              {saving ? "Saving..." : isAdmin ? "Override & Save" : "Save Decision"}
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsReviewing(true)}
          className="mt-3 flex items-center gap-1.5 text-xs text-[#26F2D0]
                     hover:text-white transition font-medium">
          {isAdmin
            ? <><Settings size={12} /> Admin Review →</>
            : <><Pencil size={12} /> Review this idea →</>}
        </button>
      )}
    </div>
  );
}