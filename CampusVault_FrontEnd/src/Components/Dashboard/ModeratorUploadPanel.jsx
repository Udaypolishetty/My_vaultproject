// // import { useState } from "react";
// // import { Upload, Send, X, Shield, Newspaper } from "lucide-react";

// // export default function ModeratorUploadPanel({ token }) {
// //   const [form, setForm] = useState({
// //     title: "", content: "", category: "General", imageUrl: ""
// //   });
// //   const [uploading, setUploading] = useState(false);
// //   const [posting, setPosting] = useState(false);
// //   const [posted, setPosted] = useState(false);

// //   const uploadImage = async (file) => {
// //     setUploading(true);
// //     const formData = new FormData();
// //     formData.append("file", file);
// //     formData.append("upload_preset", "xk6yja12");
// //     const res = await fetch("https://api.cloudinary.com/v1_1/dn6ot9flx/image/upload", {
// //       method: "POST", body: formData
// //     });
// //     const data = await res.json();
// //     setForm(prev => ({ ...prev, imageUrl: data.secure_url }));
// //     setUploading(false);
// //   };

// //   const postNews = async () => {
// //     if (!form.title || !form.content) return;
// //     setPosting(true);
// //     try {
// //       const res = await fetch("http://localhost:8081/api/announcements", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
// //         body: JSON.stringify(form)
// //       });
// //       if (res.ok) {
// //         setForm({ title: "", content: "", category: "General", imageUrl: "" });
// //         setPosted(true);
// //         setTimeout(() => setPosted(false), 3000);
// //       }
// //     } finally {
// //       setPosting(false);
// //     }
// //   };

// //   return (
// //     <div className="max-w-xl">
// //       <div className="flex items-center gap-3 mb-6">
// //         <div className="w-10 h-10 rounded-xl bg-[#26F2D0]/10 border border-[#26F2D0]/20
// //                         flex items-center justify-center">
// //           <Shield size={18} className="text-[#26F2D0]" />
// //         </div>
// //         <div>
// //           <h3 className="text-lg font-bold text-white">Moderator Panel</h3>
// //           <p className="text-xs text-gray-400">Post campus news and announcements</p>
// //         </div>
// //       </div>

// //       {posted && (
// //         <div className="mb-4 flex items-center gap-2 bg-green-500/10 border border-green-500/20
// //                         rounded-xl px-4 py-3 text-sm text-green-400">
// //           ✅ News posted successfully!
// //         </div>
// //       )}

// //       <div className="bg-[#111] border border-white/10 rounded-2xl p-5 space-y-4">
// //         <div className="flex items-center gap-2">
// //           <Newspaper size={14} className="text-[#26F2D0]" />
// //           <h4 className="text-sm font-semibold text-[#26F2D0]">Post Campus News</h4>
// //         </div>

// //         <select
// //           value={form.category}
// //           onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
// //           className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
// //                      text-sm text-white outline-none focus:border-[#26F2D0]/50 transition"
// //         >
// //           <option>General</option>
// //           <option>Event</option>
// //           <option>Academic</option>
// //           <option>Notice</option>
// //         </select>

// //         <input
// //           value={form.title}
// //           onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
// //           placeholder="News title..."
// //           className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
// //                      text-sm text-white placeholder-gray-500 outline-none
// //                      focus:border-[#26F2D0]/50 transition"
// //         />

// //         <textarea
// //           value={form.content}
// //           onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
// //           placeholder="Write the announcement content..."
// //           rows={4}
// //           className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
// //                      text-sm text-white placeholder-gray-500 outline-none resize-none
// //                      focus:border-[#26F2D0]/50 transition"
// //         />

// //         <div className="border border-dashed border-white/20 rounded-xl p-4">
// //           <label className="cursor-pointer flex flex-col items-center gap-2
// //                             text-gray-400 hover:text-white transition">
// //             <Upload size={20} className="text-gray-500" />
// //             <span className="text-xs">
// //               {uploading ? "Uploading..." : "Click to attach image (optional)"}
// //             </span>
// //             <input type="file" accept="image/*" className="hidden"
// //               onChange={e => e.target.files[0] && uploadImage(e.target.files[0])} />
// //           </label>
// //           {form.imageUrl && (
// //             <div className="mt-3 relative">
// //               <img src={form.imageUrl} className="w-full h-36 object-cover rounded-xl" />
// //               <button
// //                 onClick={() => setForm(p => ({ ...p, imageUrl: "" }))}
// //                 className="absolute top-2 right-2 bg-red-600 text-white rounded-full
// //                            w-6 h-6 flex items-center justify-center hover:bg-red-700 transition"
// //               >
// //                 <X size={12} />
// //               </button>
// //             </div>
// //           )}
// //         </div>

// //         <button
// //           onClick={postNews}
// //           disabled={!form.title || !form.content || posting || uploading}
// //           className="flex items-center justify-center gap-2 w-full py-3 bg-[#26F2D0]
// //                      text-black rounded-xl font-semibold text-sm hover:bg-[#1dd4b8]
// //                      transition disabled:opacity-40 disabled:cursor-not-allowed"
// //         >
// //           <Send size={14} />
// //           {posting ? "Posting..." : "Post Announcement"}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }



// import { useState } from "react";
// import { Upload, Send, X, Shield, Newspaper, Search, AlertTriangle } from "lucide-react";

// const SEVERITY_OPTIONS = [
//   { value: "LOW",    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
//   { value: "MEDIUM", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
//   { value: "HIGH",   color: "bg-red-500/20 text-red-400 border-red-500/30" },
// ];

// export default function ModeratorUploadPanel({ token }) {
//   const [form, setForm] = useState({ title: "", content: "", category: "General", imageUrl: "" });
//   const [uploading, setUploading] = useState(false);
//   const [posting, setPosting] = useState(false);
//   const [posted, setPosted] = useState(false);

//   const [warnSearch, setWarnSearch] = useState("");
//   const [warnStudent, setWarnStudent] = useState(null);
//   const [warnSearching, setWarnSearching] = useState(false);
//   const [warnSeverity, setWarnSeverity] = useState("LOW");
//   const [warnMessage, setWarnMessage] = useState("");
//   const [warnSending, setWarnSending] = useState(false);
//   const [warnSent, setWarnSent] = useState(false);

//   const uploadImage = async (file) => {
//     setUploading(true);
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "campus_vault");
//     const res = await fetch("https://api.cloudinary.com/v1_1/dn6ot9flx/image/upload", {
//       method: "POST", body: formData
//     });
//     const data = await res.json();
//     setForm(prev => ({ ...prev, imageUrl: data.secure_url }));
//     setUploading(false);
//   };

//   const postNews = async () => {
//     if (!form.title || !form.content) return;
//     setPosting(true);
//     try {
//       const res = await fetch("http://localhost:8081/api/announcements", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify(form)
//       });
//       if (res.ok) {
//         setForm({ title: "", content: "", category: "General", imageUrl: "" });
//         setPosted(true);
//         setTimeout(() => setPosted(false), 3000);
//       }
//     } finally {
//       setPosting(false);
//     }
//   };

//  const searchStudent = async () => {
//   if (!warnSearch.trim()) return;
//   setWarnSearching(true);
//   try {
//     // ✅ use /api/students/search instead of /api/admin/students
//     const res = await fetch(
//       `http://localhost:8081/api/students/search?q=${encodeURIComponent(warnSearch)}`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     if (!res.ok) { setWarnStudent("notfound"); return; }
//     const data = await res.json();
//     setWarnStudent(data || "notfound");
//   } finally {
//     setWarnSearching(false);
//   }
// };

//   const suggestWarning = async () => {
//     if (!warnStudent || warnStudent === "notfound" || !warnMessage.trim()) return;
//     setWarnSending(true);
//     try {
//       const res = await fetch("http://localhost:8081/api/warnings/suggest", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({
//           recipientRollNumber: warnStudent.rollNumber,
//           message: warnMessage.trim(),
//           severity: warnSeverity,
//           isSuggestion: true
//         })
//       });
//       if (res.ok) {
//         setWarnMessage("");
//         setWarnStudent(null);
//         setWarnSearch("");
//         setWarnSeverity("LOW");
//         setWarnSent(true);
//         setTimeout(() => setWarnSent(false), 3000);
//       }
//     } finally {
//       setWarnSending(false);
//     }
//   };

//   return (
//     <div className="max-w-xl space-y-6">
//       <div className="flex items-center gap-3">
//         <div className="w-10 h-10 rounded-xl bg-[#26F2D0]/10 border border-[#26F2D0]/20
//                         flex items-center justify-center">
//           <Shield size={18} className="text-[#26F2D0]" />
//         </div>
//         <div>
//           <h3 className="text-lg font-bold text-white">Moderator Panel</h3>
//           <p className="text-xs text-gray-400">Post news and suggest warnings</p>
//         </div>
//       </div>

//       {/* ===== NEWS FORM ===== */}
//       {posted && (
//         <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20
//                         rounded-xl px-4 py-3 text-sm text-green-400">
//           ✅ News posted successfully!
//         </div>
//       )}

//       <div className="bg-[#111] border border-white/10 rounded-2xl p-5 space-y-4">
//         <div className="flex items-center gap-2">
//           <Newspaper size={14} className="text-[#26F2D0]" />
//           <h4 className="text-sm font-semibold text-[#26F2D0]">Post Campus News</h4>
//         </div>

//         <select value={form.category}
//           onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
//           className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
//                      text-sm text-white outline-none focus:border-[#26F2D0]/50 transition">
//           <option>General</option>
//           <option>Event</option>
//           <option>Academic</option>
//           <option>Notice</option>
//         </select>

//         <input value={form.title}
//           onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
//           placeholder="News title..."
//           className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
//                      text-sm text-white placeholder-gray-500 outline-none
//                      focus:border-[#26F2D0]/50 transition" />

//         <textarea value={form.content}
//           onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
//           placeholder="Write the announcement content..."
//           rows={4}
//           className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
//                      text-sm text-white placeholder-gray-500 outline-none resize-none
//                      focus:border-[#26F2D0]/50 transition" />

//         <div className="border border-dashed border-white/20 rounded-xl p-4">
//           <label className="cursor-pointer flex flex-col items-center gap-2
//                             text-gray-400 hover:text-white transition">
//             <Upload size={20} className="text-gray-500" />
//             <span className="text-xs">{uploading ? "Uploading..." : "Click to attach image (optional)"}</span>
//             <input type="file" accept="image/*" className="hidden"
//               onChange={e => e.target.files[0] && uploadImage(e.target.files[0])} />
//           </label>
//           {form.imageUrl && (
//             <div className="mt-3 relative">
//               <img src={form.imageUrl} className="w-full h-36 object-cover rounded-xl" />
//               <button onClick={() => setForm(p => ({ ...p, imageUrl: "" }))}
//                 className="absolute top-2 right-2 bg-red-600 text-white rounded-full
//                            w-6 h-6 flex items-center justify-center hover:bg-red-700 transition">
//                 <X size={12} />
//               </button>
//             </div>
//           )}
//         </div>

//         <button onClick={postNews}
//           disabled={!form.title || !form.content || posting || uploading}
//           className="flex items-center justify-center gap-2 w-full py-3 bg-[#26F2D0]
//                      text-black rounded-xl font-semibold text-sm hover:bg-[#1dd4b8]
//                      transition disabled:opacity-40 disabled:cursor-not-allowed">
//           <Send size={14} />
//           {posting ? "Posting..." : "Post Announcement"}
//         </button>
//       </div>

//       {/* ===== SUGGEST WARNING ===== */}
//       {warnSent && (
//         <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20
//                         rounded-xl px-4 py-3 text-sm text-green-400">
//           ✅ Warning suggestion sent to admin for approval!
//         </div>
//       )}

//       <div className="bg-[#111] border border-orange-500/20 rounded-2xl p-5 space-y-4">
//         <div className="flex items-center gap-2">
//           <AlertTriangle size={14} className="text-orange-400" />
//           <h4 className="text-sm font-semibold text-orange-400">Suggest Warning to Admin</h4>
//           <span className="ml-auto text-xs text-gray-500 italic">Admin must approve</span>
//         </div>

//         <div>
//           <label className="text-xs text-gray-500 mb-1.5 block">Search Student</label>
//           <div className="flex gap-2">
//             <input value={warnSearch}
//               onChange={e => { setWarnSearch(e.target.value); setWarnStudent(null); }}
//               onKeyDown={e => e.key === "Enter" && searchStudent()}
//               placeholder="Roll number or name..."
//               className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
//                          text-sm text-white placeholder-gray-500 outline-none
//                          focus:border-orange-500/50 transition" />
//             <button onClick={searchStudent} disabled={warnSearching}
//               className="flex items-center gap-1 px-4 py-2.5 bg-orange-500/20 text-orange-400
//                          border border-orange-500/30 rounded-xl text-sm font-medium
//                          hover:bg-orange-500/30 transition disabled:opacity-50">
//               <Search size={14} />
//               {warnSearching ? "..." : "Find"}
//             </button>
//           </div>

//           {warnStudent && warnStudent !== "notfound" && (
//             <div className="mt-3 flex items-center gap-3 bg-white/5 border border-white/10
//                             rounded-xl px-4 py-3">
//               <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20
//                               flex items-center justify-center text-orange-400 font-bold text-sm">
//                 {warnStudent.name?.[0]?.toUpperCase()}
//               </div>
//               <div>
//                 <p className="text-white font-medium text-sm">{warnStudent.name}</p>
//                 <p className="text-gray-500 text-xs">
//                   {warnStudent.rollNumber} · {warnStudent.branch} · {warnStudent.year}
//                 </p>
//               </div>
//               <button onClick={() => { setWarnStudent(null); setWarnSearch(""); }}
//                 className="ml-auto text-gray-500 hover:text-white transition">
//                 <X size={14} />
//               </button>
//             </div>
//           )}
//           {warnStudent === "notfound" && (
//             <p className="text-xs text-gray-500 mt-2">No student found for "{warnSearch}"</p>
//           )}
//         </div>

//         <div>
//           <label className="text-xs text-gray-500 mb-1.5 block">Severity</label>
//           <div className="flex gap-2">
//             {SEVERITY_OPTIONS.map(opt => (
//               <button key={opt.value} onClick={() => setWarnSeverity(opt.value)}
//                 className={`flex-1 py-2 rounded-xl text-xs font-bold border transition
//                   ${warnSeverity === opt.value
//                     ? opt.color + " scale-[1.02]"
//                     : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"}`}>
//                 {opt.value}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div>
//           <label className="text-xs text-gray-500 mb-1.5 block">Reason</label>
//           <textarea value={warnMessage}
//             onChange={e => setWarnMessage(e.target.value)}
//             placeholder="Describe the reason for this warning..."
//             rows={3}
//             className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
//                        text-sm text-white placeholder-gray-500 outline-none resize-none
//                        focus:border-orange-500/50 transition" />
//         </div>

//         <button onClick={suggestWarning}
//           disabled={!warnStudent || warnStudent === "notfound" || !warnMessage.trim() || warnSending}
//           className="flex items-center justify-center gap-2 w-full py-3 bg-orange-500/20
//                      text-orange-400 border border-orange-500/30 rounded-xl font-semibold
//                      text-sm hover:bg-orange-500/30 transition
//                      disabled:opacity-40 disabled:cursor-not-allowed">
//           <AlertTriangle size={14} />
//           {warnSending ? "Sending..." : "Suggest Warning to Admin"}
//         </button>
//       </div>
//     </div>
//   );
// }



// import { useState } from "react";
// import { Upload, Send, X, Shield, Newspaper, Search, AlertTriangle, Users } from "lucide-react";

// const SEVERITY_OPTIONS = [
//   { value: "LOW",    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
//   { value: "MEDIUM", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
//   { value: "HIGH",   color: "bg-red-500/20 text-red-400 border-red-500/30" },
// ];

// const CATEGORIES = ["Tech", "Academic", "Campus Pulse", "Cultural", "Others"];

// export default function ModeratorUploadPanel({ token }) {
//   // news form
//   const [form, setForm] = useState({ title: "", content: "", category: "General", imageUrl: "" });
//   const [uploading, setUploading] = useState(false);
//   const [posting, setPosting] = useState(false);
//   const [posted, setPosted] = useState(false);

//   // warn form
//   const [warnSearch, setWarnSearch] = useState("");
//   const [warnStudent, setWarnStudent] = useState(null);
//   const [warnSearching, setWarnSearching] = useState(false);
//   const [warnSeverity, setWarnSeverity] = useState("LOW");
//   const [warnMessage, setWarnMessage] = useState("");
//   const [warnSending, setWarnSending] = useState(false);
//   const [warnSent, setWarnSent] = useState(false);
//   const [imageError, setImageError] = useState("");

//   // ✅ class proposal form
//   const [proposal, setProposal] = useState({ title: "", description: "", category: "Tech" });
//   const [proposalPosting, setProposalPosting] = useState(false);
//   const [proposalPosted, setProposalPosted] = useState(false);

//   const uploadImage = async (file) => {
//      if (file.size > 2 * 1024 * 1024) {
//       setImageError("Image must be under 2MB. Please compress and try again.");
//       return;
//     }
//     setUploading(true);
//     setImageError(""); // ✅ clear previous errors
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "campus_vault");
//     const res = await fetch("https://api.cloudinary.com/v1_1/dn6ot9flx/image/upload", {
//       method: "POST", body: formData
//     });
//     const data = await res.json();
//     setForm(prev => ({ ...prev, imageUrl: data.secure_url }));
//     setUploading(false);
//   };

//   const postNews = async () => {
//     if (!form.title || !form.content) return;
//     setPosting(true);
//     try {
//       const res = await fetch("http://localhost:8081/api/announcements", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify(form)
//       });
//       if (res.ok) {
//         setForm({ title: "", content: "", category: "General", imageUrl: "" });
//         setPosted(true);
//         setTimeout(() => setPosted(false), 3000);
//       }
//     } finally {
//       setPosting(false);
//     }
//   };

//   const searchStudent = async () => {
//     if (!warnSearch.trim()) return;
//     setWarnSearching(true);
//     try {
//       const res = await fetch(
//         `http://localhost:8081/api/students/search?q=${encodeURIComponent(warnSearch)}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (!res.ok) { setWarnStudent("notfound"); return; }
//       const data = await res.json();
//       setWarnStudent(data || "notfound");
//     } finally {
//       setWarnSearching(false);
//     }
//   };

//   const suggestWarning = async () => {
//     if (!warnStudent || warnStudent === "notfound" || !warnMessage.trim()) return;
//     setWarnSending(true);
//     try {
//       const res = await fetch("http://localhost:8081/api/warnings/suggest", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({
//           recipientRollNumber: warnStudent.rollNumber,
//           message: warnMessage.trim(),
//           severity: warnSeverity,
//           isSuggestion: true
//         })
//       });
//       if (res.ok) {
//         setWarnMessage(""); setWarnStudent(null);
//         setWarnSearch(""); setWarnSeverity("LOW");
//         setWarnSent(true);
//         setTimeout(() => setWarnSent(false), 3000);
//       }
//     } finally {
//       setWarnSending(false);
//     }
//   };

//   // ✅ post class proposal
//   const postProposal = async () => {
//     if (!proposal.title.trim() || !proposal.description.trim()) return;
//     setProposalPosting(true);
//     try {
//       const res = await fetch("http://localhost:8081/api/ideas/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({
//           title: proposal.title.trim(),
//           description: proposal.description.trim(),
//           category: proposal.category,
//           classProposal: true   // ✅ key flag
//         })
//       });
//       if (res.ok) {
//         setProposal({ title: "", description: "", category: "Tech" });
//         setProposalPosted(true);
//         setTimeout(() => setProposalPosted(false), 3000);
//       }
//     } finally {
//       setProposalPosting(false);
//     }
//   };

//   return (
//     <div className="max-w-xl space-y-6">
//       <div className="flex items-center gap-3">
//         <div className="w-10 h-10 rounded-xl bg-[#26F2D0]/10 border border-[#26F2D0]/20
//                         flex items-center justify-center">
//           <Shield size={18} className="text-[#26F2D0]" />
//         </div>
//         <div>
//           <h3 className="text-lg font-bold text-white">Moderator Panel</h3>
//           <p className="text-xs text-gray-400">Post news, class proposals and suggest warnings</p>
//         </div>
//       </div>

//       {/* ===== NEWS FORM ===== */}
//       {posted && (
//         <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20
//                         rounded-xl px-4 py-3 text-sm text-green-400">
//           ✅ News posted successfully!
//         </div>
//       )}

//       <div className="bg-[#111] border border-white/10 rounded-2xl p-5 space-y-4">
//         <div className="flex items-center gap-2">
//           <Newspaper size={14} className="text-[#26F2D0]" />
//           <h4 className="text-sm font-semibold text-[#26F2D0]">Post Campus News</h4>
//         </div>

//         <select value={form.category}
//           onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
//           className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
//                      text-sm text-white outline-none focus:border-[#26F2D0]/50 transition">
//           <option>General</option>
//           <option>Event</option>
//           <option>Academic</option>
//           <option>Notice</option>
//         </select>

//         <input value={form.title}
//           onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
//           placeholder="News title..."
//           className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
//                      text-sm text-white placeholder-gray-500 outline-none
//                      focus:border-[#26F2D0]/50 transition" />

//         <textarea value={form.content}
//           onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
//           placeholder="Write the announcement content..."
//           rows={4}
//           className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
//                      text-sm text-white placeholder-gray-500 outline-none resize-none
//                      focus:border-[#26F2D0]/50 transition" />

//         <div className="border border-dashed border-white/20 rounded-xl p-4">
//           <label className="cursor-pointer flex flex-col items-center gap-2
//                             text-gray-400 hover:text-white transition">
//             <Upload size={20} className="text-gray-500" />
//             <span className="text-xs">{uploading ? "Uploading..." : "Click to attach image (optional)"}</span>
//             <input type="file" accept="image/*" className="hidden"
//               onChange={e => e.target.files[0] && uploadImage(e.target.files[0])} />
//           </label>
//           {form.imageUrl && (
//             <div className="mt-3 relative">
//               <img src={form.imageUrl} className="w-full h-36 object-cover rounded-xl" />
//               <button onClick={() => setForm(p => ({ ...p, imageUrl: "" }))}
//                 className="absolute top-2 right-2 bg-red-600 text-white rounded-full
//                            w-6 h-6 flex items-center justify-center hover:bg-red-700 transition">
//                 <X size={12} />
//               </button>
//             </div>
//           )}
//           {/* ✅ ADDED: Image error message */}
//           {imageError && (
//             <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
//               ⚠️ {imageError}
//             </p>
//           )}
//         </div>

//         <button onClick={postNews}
//           disabled={!form.title || !form.content || posting || uploading}
//           className="flex items-center justify-center gap-2 w-full py-3 bg-[#26F2D0]
//                      text-black rounded-xl font-semibold text-sm hover:bg-[#1dd4b8]
//                      transition disabled:opacity-40 disabled:cursor-not-allowed">
//           <Send size={14} />
//           {posting ? "Posting..." : "Post Announcement"}
//         </button>
//       </div>

//       {/* ===== CLASS PROPOSAL ===== */}
//       {proposalPosted && (
//         <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20
//                         rounded-xl px-4 py-3 text-sm text-purple-400">
//           🏛️ Class proposal posted! Admin has been notified.
//         </div>
//       )}

//       <div className="bg-[#111] border border-purple-500/20 rounded-2xl p-5 space-y-4">
//         <div className="flex items-center gap-2">
//           <Users size={14} className="text-purple-400" />
//           <h4 className="text-sm font-semibold text-purple-400">Post Class Proposal</h4>
//           <span className="ml-auto text-xs text-gray-500 italic">Admin notified instantly</span>
//         </div>

//         <div className="bg-purple-500/5 border border-purple-500/15 rounded-xl px-4 py-3">
//           <p className="text-xs text-gray-400 leading-relaxed">
//             🏛️ Use this to officially represent your class. This proposal will be
//             tagged with your class info and admin will be notified immediately.
//           </p>
//         </div>

//         <select value={proposal.category}
//           onChange={e => setProposal(p => ({ ...p, category: e.target.value }))}
//           className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
//                      text-sm text-white outline-none focus:border-purple-500/50 transition">
//           {CATEGORIES.map(c => <option key={c}>{c}</option>)}
//         </select>

//         <input value={proposal.title}
//           onChange={e => setProposal(p => ({ ...p, title: e.target.value }))}
//           placeholder="Proposal title — what does your class want?"
//           maxLength={100}
//           className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
//                      text-sm text-white placeholder-gray-500 outline-none
//                      focus:border-purple-500/50 transition" />

//         <textarea value={proposal.description}
//           onChange={e => setProposal(p => ({ ...p, description: e.target.value }))}
//           placeholder="Describe the proposal in detail — what, why, and how it helps your class..."
//           rows={4}
//           maxLength={500}
//           className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
//                      text-sm text-white placeholder-gray-500 outline-none resize-none
//                      focus:border-purple-500/50 transition" />
//         <p className="text-xs text-gray-600 -mt-2 text-right">
//           {proposal.description.length}/500
//         </p>

//         <button onClick={postProposal}
//           disabled={!proposal.title.trim() || !proposal.description.trim() || proposalPosting}
//           className="flex items-center justify-center gap-2 w-full py-3 bg-purple-500/20
//                      text-purple-400 border border-purple-500/30 rounded-xl font-semibold
//                      text-sm hover:bg-purple-500/30 transition
//                      disabled:opacity-40 disabled:cursor-not-allowed">
//           <Users size={14} />
//           {proposalPosting ? "Posting..." : "Post Class Proposal"}
//         </button>
//       </div>

//       {/* ===== SUGGEST WARNING ===== */}
//       {warnSent && (
//         <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20
//                         rounded-xl px-4 py-3 text-sm text-green-400">
//           ✅ Warning suggestion sent to admin for approval!
//         </div>
//       )}

//       <div className="bg-[#111] border border-orange-500/20 rounded-2xl p-5 space-y-4">
//         <div className="flex items-center gap-2">
//           <AlertTriangle size={14} className="text-orange-400" />
//           <h4 className="text-sm font-semibold text-orange-400">Suggest Warning to Admin</h4>
//           <span className="ml-auto text-xs text-gray-500 italic">Admin must approve</span>
//         </div>

//         <div>
//           <label className="text-xs text-gray-500 mb-1.5 block">Search Student</label>
//           <div className="flex gap-2">
//             <input value={warnSearch}
//               onChange={e => { setWarnSearch(e.target.value); setWarnStudent(null); }}
//               onKeyDown={e => e.key === "Enter" && searchStudent()}
//               placeholder="Roll number or name..."
//               className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
//                        text-sm text-white placeholder-gray-500 outline-none
//                        focus:border-orange-500/50 transition" />
//             <button onClick={searchStudent} disabled={warnSearching}
//               className="flex items-center gap-1 px-4 py-2.5 bg-orange-500/20 text-orange-400
//                        border border-orange-500/30 rounded-xl text-sm font-medium
//                        hover:bg-orange-500/30 transition disabled:opacity-50">
//               <Search size={14} />
//               {warnSearching ? "..." : "Find"}
//             </button>
//           </div>

//           {warnStudent && warnStudent !== "notfound" && (
//             <div className="mt-3 flex items-center gap-3 bg-white/5 border border-white/10
//                             rounded-xl px-4 py-3">
//               <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20
//                               flex items-center justify-center text-orange-400 font-bold text-sm">
//                 {warnStudent.name?.[0]?.toUpperCase()}
//               </div>
//               <div>
//                 <p className="text-white font-medium text-sm">{warnStudent.name}</p>
//                 <p className="text-gray-500 text-xs">
//                   {warnStudent.rollNumber} · {warnStudent.branch} · {warnStudent.year}
//                 </p>
//               </div>
//               <button onClick={() => { setWarnStudent(null); setWarnSearch(""); }}
//                 className="ml-auto text-gray-500 hover:text-white transition">
//                 <X size={14} />
//               </button>
//             </div>
//           )}
//           {warnStudent === "notfound" && (
//             <p className="text-xs text-gray-500 mt-2">No student found for "{warnSearch}"</p>
//           )}
//         </div>

//         <div>
//           <label className="text-xs text-gray-500 mb-1.5 block">Severity</label>
//           <div className="flex gap-2">
//             {SEVERITY_OPTIONS.map(opt => (
//               <button key={opt.value} onClick={() => setWarnSeverity(opt.value)}
//                 className={`flex-1 py-2 rounded-xl text-xs font-bold border transition
//                 ${warnSeverity === opt.value
//                   ? opt.color + " scale-[1.02]"
//                   : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"}`}>
//                 {opt.value}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div>
//           <label className="text-xs text-gray-500 mb-1.5 block">Reason</label>
//           <textarea value={warnMessage}
//             onChange={e => setWarnMessage(e.target.value)}
//             placeholder="Describe the reason for this warning..."
//             rows={3}
//             className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
//                        text-sm text-white placeholder-gray-500 outline-none resize-none
//                        focus:border-orange-500/50 transition" />
//         </div>

//         <button onClick={suggestWarning}
//           disabled={!warnStudent || warnStudent === "notfound" || !warnMessage.trim() || warnSending}
//           className="flex items-center justify-center gap-2 w-full py-3 bg-orange-500/20
//                      text-orange-400 border border-orange-500/30 rounded-xl font-semibold
//                      text-sm hover:bg-orange-500/30 transition
//                      disabled:opacity-40 disabled:cursor-not-allowed">
//           <AlertTriangle size={14} />
//           {warnSending ? "Sending..." : "Suggest Warning to Admin"}
//         </button>
//       </div>
//     </div>
//   );
// }








// import { useState } from "react";
// import { Upload, Send, X, Shield, Newspaper, Search, AlertTriangle, Users } from "lucide-react";
// import { validateNewsTitle, validateNewsContent, validateWarningMessage, validateAll } from "../utils/validate"; // ✅ IMPORTED

// const SEVERITY_OPTIONS = [
//   { value: "LOW",    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
//   { value: "MEDIUM", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
//   { value: "HIGH",   color: "bg-red-500/20 text-red-400 border-red-500/30" },
// ];

// const CATEGORIES = ["Tech", "Academic", "Campus Pulse", "Cultural", "Others"];

// export default function ModeratorUploadPanel({ token }) {
//   // news form
//   const [form, setForm] = useState({ title: "", content: "", category: "General", imageUrl: "" });
//   const [uploading, setUploading] = useState(false);
//   const [posting, setPosting] = useState(false);
//   const [posted, setPosted] = useState(false);
//   const [newsError, setNewsError] = useState(""); // ✅ ADDED

//   // warn form
//   const [warnSearch, setWarnSearch] = useState("");
//   const [warnStudent, setWarnStudent] = useState(null);
//   const [warnSearching, setWarnSearching] = useState(false);
//   const [warnSeverity, setWarnSeverity] = useState("LOW");
//   const [warnMessage, setWarnMessage] = useState("");
//   const [warnSending, setWarnSending] = useState(false);
//   const [warnSent, setWarnSent] = useState(false);
//   const [warnError, setWarnError] = useState(""); // ✅ ADDED
//   const [imageError, setImageError] = useState("");

//   // ✅ class proposal form
//   const [proposal, setProposal] = useState({ title: "", description: "", category: "Tech" });
//   const [proposalPosting, setProposalPosting] = useState(false);
//   const [proposalPosted, setProposalPosted] = useState(false);

//   const uploadImage = async (file) => {
//      if (file.size > 2 * 1024 * 1024) {
//       setImageError("Image must be under 2MB. Please compress and try again.");
//       return;
//     }
//     setUploading(true);
//     setImageError(""); // ✅ clear previous errors
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "campus_vault");
//     const res = await fetch("https://api.cloudinary.com/v1_1/dn6ot9flx/image/upload", {
//       method: "POST", body: formData
//     });
//     const data = await res.json();
//     setForm(prev => ({ ...prev, imageUrl: data.secure_url }));
//     setUploading(false);
//   };

//   // ✅ UPDATED: News post with validation
//   const postNews = async () => {
//     setNewsError(""); // ✅ clear previous errors
    
//     // ✅ INTEGRATED VALIDATION
//     const { valid, errors } = validateAll({
//       title: validateNewsTitle(form.title),
//       content: validateNewsContent(form.content),
//     });
    
//     if (!valid) {
//       setNewsError(errors.title || errors.content);
//       return;
//     }

//     setPosting(true);
//     try {
//       const res = await fetch("http://localhost:8081/api/announcements", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify(form)
//       });
//       if (res.ok) {
//         setForm({ title: "", content: "", category: "General", imageUrl: "" });
//         setPosted(true);
//         setTimeout(() => setPosted(false), 3000);
//       }
//     } finally {
//       setPosting(false);
//     }
//   };

//   const searchStudent = async () => {
//     if (!warnSearch.trim()) return;
//     setWarnSearching(true);
//     try {
//       const res = await fetch(
//         `http://localhost:8081/api/students/search?q=${encodeURIComponent(warnSearch)}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (!res.ok) { setWarnStudent("notfound"); return; }
//       const data = await res.json();
//       setWarnStudent(data || "notfound");
//     } finally {
//       setWarnSearching(false);
//     }
//   };

//   // ✅ UPDATED: Warning suggestion with validation
//   const suggestWarning = async () => {
//     setWarnError(""); // ✅ clear previous errors
    
//     if (!warnStudent || warnStudent === "notfound") {
//       setWarnError("Please select a valid student first.");
//       return;
//     }

//     // ✅ INTEGRATED VALIDATION
//     const result = validateWarningMessage(warnMessage);
//     if (!result.valid) {
//       setWarnError(result.error);
//       return;
//     }

//     setWarnSending(true);
//     try {
//       const res = await fetch("http://localhost:8081/api/warnings/suggest", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({
//           recipientRollNumber: warnStudent.rollNumber,
//           message: warnMessage.trim(),
//           severity: warnSeverity,
//           isSuggestion: true
//         })
//       });
//       if (res.ok) {
//         setWarnMessage(""); setWarnStudent(null);
//         setWarnSearch(""); setWarnSeverity("LOW");
//         setWarnSent(true);
//         setTimeout(() => setWarnSent(false), 3000);
//       }
//     } finally {
//       setWarnSending(false);
//     }
//   };

//   // ✅ post class proposal
//   const postProposal = async () => {
//     if (!proposal.title.trim() || !proposal.description.trim()) return;
//     setProposalPosting(true);
//     try {
//       const res = await fetch("http://localhost:8081/api/ideas/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({
//           title: proposal.title.trim(),
//           description: proposal.description.trim(),
//           category: proposal.category,
//           classProposal: true   // ✅ key flag
//         })
//       });
//       if (res.ok) {
//         setProposal({ title: "", description: "", category: "Tech" });
//         setProposalPosted(true);
//         setTimeout(() => setProposalPosted(false), 3000);
//       }
//     } finally {
//       setProposalPosting(false);
//     }
//   };

//   return (
//     <div className="max-w-xl space-y-6">
//       <div className="flex items-center gap-3">
//         <div className="w-10 h-10 rounded-xl bg-[#26F2D0]/10 border border-[#26F2D0]/20
//                         flex items-center justify-center">
//           <Shield size={18} className="text-[#26F2D0]" />
//         </div>
//         <div>
//           <h3 className="text-lg font-bold text-white">Moderator Panel</h3>
//           <p className="text-xs text-gray-400">Post news, class proposals and suggest warnings</p>
//         </div>
//       </div>

//       {/* ===== NEWS FORM ===== */}
//       {posted && (
//         <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20
//                         rounded-xl px-4 py-3 text-sm text-green-400">
//           ✅ News posted successfully!
//         </div>
//       )}
      
//       {/* ✅ ADDED: News error display */}
//       {newsError && (
//         <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20
//                         rounded-xl px-4 py-3 text-sm text-orange-400">
//           ⚠️ {newsError}
//         </div>
//       )}

//       <div className="bg-[#111] border border-white/10 rounded-2xl p-5 space-y-4">
//         <div className="flex items-center gap-2">
//           <Newspaper size={14} className="text-[#26F2D0]" />
//           <h4 className="text-sm font-semibold text-[#26F2D0]">Post Campus News</h4>
//         </div>

//         <select value={form.category}
//           onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
//           className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
//                      text-sm text-white outline-none focus:border-[#26F2D0]/50 transition">
//           <option>General</option>
//           <option>Event</option>
//           <option>Academic</option>
//           <option>Notice</option>
//         </select>

//         <input value={form.title}
//           onChange={e => {
//             setForm(p => ({ ...p, title: e.target.value }));
//             if (newsError) setNewsError("");
//           }}
//           placeholder="News title..."
//           className={`w-full bg-[#1a1a1a] border rounded-xl px-4 py-2.5
//                      text-sm text-white placeholder-gray-500 outline-none transition
//                      ${newsError ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#26F2D0]/50"}`} />

//         <textarea value={form.content}
//           onChange={e => {
//             setForm(p => ({ ...p, content: e.target.value }));
//             if (newsError) setNewsError("");
//           }}
//           placeholder="Write the announcement content..."
//           rows={4}
//           className={`w-full bg-[#1a1a1a] border rounded-xl px-4 py-2.5
//                      text-sm text-white placeholder-gray-500 outline-none resize-none transition
//                      ${newsError ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#26F2D0]/50"}`} />

//         <div className="border border-dashed border-white/20 rounded-xl p-4">
//           <label className="cursor-pointer flex flex-col items-center gap-2
//                             text-gray-400 hover:text-white transition">
//             <Upload size={20} className="text-gray-500" />
//             <span className="text-xs">{uploading ? "Uploading..." : "Click to attach image (optional)"}</span>
//             <input type="file" accept="image/*" className="hidden"
//               onChange={e => e.target.files[0] && uploadImage(e.target.files[0])} />
//           </label>
//           {form.imageUrl && (
//             <div className="mt-3 relative">
//               <img src={form.imageUrl} className="w-full h-36 object-cover rounded-xl" />
//               <button onClick={() => setForm(p => ({ ...p, imageUrl: "" }))}
//                 className="absolute top-2 right-2 bg-red-600 text-white rounded-full
//                            w-6 h-6 flex items-center justify-center hover:bg-red-700 transition">
//                 <X size={12} />
//               </button>
//             </div>
//           )}
//           {imageError && (
//             <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
//               ⚠️ {imageError}
//             </p>
//           )}
//         </div>

//         <button onClick={postNews}
//           disabled={!form.title || !form.content || posting || uploading}
//           className="flex items-center justify-center gap-2 w-full py-3 bg-[#26F2D0]
//                      text-black rounded-xl font-semibold text-sm hover:bg-[#1dd4b8]
//                      transition disabled:opacity-40 disabled:cursor-not-allowed">
//           <Send size={14} />
//           {posting ? "Posting..." : "Post Announcement"}
//         </button>
//       </div>

//       {/* ===== CLASS PROPOSAL ===== */}
//       {proposalPosted && (
//         <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20
//                         rounded-xl px-4 py-3 text-sm text-purple-400">
//           🏛️ Class proposal posted! Admin has been notified.
//         </div>
//       )}

//       <div className="bg-[#111] border border-purple-500/20 rounded-2xl p-5 space-y-4">
//         <div className="flex items-center gap-2">
//           <Users size={14} className="text-purple-400" />
//           <h4 className="text-sm font-semibold text-purple-400">Post Class Proposal</h4>
//           <span className="ml-auto text-xs text-gray-500 italic">Admin notified instantly</span>
//         </div>

//         <div className="bg-purple-500/5 border border-purple-500/15 rounded-xl px-4 py-3">
//           <p className="text-xs text-gray-400 leading-relaxed">
//             🏛️ Use this to officially represent your class. This proposal will be
//             tagged with your class info and admin will be notified immediately.
//           </p>
//         </div>

//         <select value={proposal.category}
//           onChange={e => setProposal(p => ({ ...p, category: e.target.value }))}
//           className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
//                      text-sm text-white outline-none focus:border-purple-500/50 transition">
//           {CATEGORIES.map(c => <option key={c}>{c}</option>)}
//         </select>

//         <input value={proposal.title}
//           onChange={e => setProposal(p => ({ ...p, title: e.target.value }))}
//           placeholder="Proposal title — what does your class want?"
//           maxLength={100}
//           className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
//                      text-sm text-white placeholder-gray-500 outline-none
//                      focus:border-purple-500/50 transition" />

//         <textarea value={proposal.description}
//           onChange={e => setProposal(p => ({ ...p, description: e.target.value }))}
//           placeholder="Describe the proposal in detail — what, why, and how it helps your class..."
//           rows={4}
//           maxLength={500}
//           className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
//                      text-sm text-white placeholder-gray-500 outline-none resize-none
//                      focus:border-purple-500/50 transition" />
//         <p className="text-xs text-gray-600 -mt-2 text-right">
//           {proposal.description.length}/500
//         </p>

//         <button onClick={postProposal}
//           disabled={!proposal.title.trim() || !proposal.description.trim() || proposalPosting}
//           className="flex items-center justify-center gap-2 w-full py-3 bg-purple-500/20
//                      text-purple-400 border border-purple-500/30 rounded-xl font-semibold
//                      text-sm hover:bg-purple-500/30 transition
//                      disabled:opacity-40 disabled:cursor-not-allowed">
//           <Users size={14} />
//           {proposalPosting ? "Posting..." : "Post Class Proposal"}
//         </button>
//       </div>

//       {/* ===== SUGGEST WARNING ===== */}
//       {warnSent && (
//         <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20
//                         rounded-xl px-4 py-3 text-sm text-green-400">
//           ✅ Warning suggestion sent to admin for approval!
//         </div>
//       )}
      
//       {/* ✅ ADDED: Warning error display */}
//       {warnError && (
//         <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20
//                         rounded-xl px-4 py-3 text-sm text-orange-400">
//           ⚠️ {warnError}
//         </div>
//       )}

//       <div className="bg-[#111] border border-orange-500/20 rounded-2xl p-5 space-y-4">
//         <div className="flex items-center gap-2">
//           <AlertTriangle size={14} className="text-orange-400" />
//           <h4 className="text-sm font-semibold text-orange-400">Suggest Warning to Admin</h4>
//           <span className="ml-auto text-xs text-gray-500 italic">Admin must approve</span>
//         </div>

//         <div>
//           <label className="text-xs text-gray-500 mb-1.5 block">Search Student</label>
//           <div className="flex gap-2">
//             <input value={warnSearch}
//               onChange={e => { 
//                 setWarnSearch(e.target.value); 
//                 setWarnStudent(null);
//                 if (warnError) setWarnError("");
//               }}
//               onKeyDown={e => e.key === "Enter" && searchStudent()}
//               placeholder="Roll number or name..."
//               className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
//                        text-sm text-white placeholder-gray-500 outline-none
//                        focus:border-orange-500/50 transition" />
//             <button onClick={searchStudent} disabled={warnSearching}
//               className="flex items-center gap-1 px-4 py-2.5 bg-orange-500/20 text-orange-400
//                        border border-orange-500/30 rounded-xl text-sm font-medium
//                        hover:bg-orange-500/30 transition disabled:opacity-50">
//               <Search size={14} />
//               {warnSearching ? "..." : "Find"}
//             </button>
//           </div>

//           {warnStudent && warnStudent !== "notfound" && (
//             <div className="mt-3 flex items-center gap-3 bg-white/5 border border-white/10
//                             rounded-xl px-4 py-3">
//               <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20
//                               flex items-center justify-center text-orange-400 font-bold text-sm">
//                 {warnStudent.name?.[0]?.toUpperCase()}
//               </div>
//               <div>
//                 <p className="text-white font-medium text-sm">{warnStudent.name}</p>
//                 <p className="text-gray-500 text-xs">
//                   {warnStudent.rollNumber} · {warnStudent.branch} · {warnStudent.year}
//                 </p>
//               </div>
//               <button onClick={() => { setWarnStudent(null); setWarnSearch(""); }}
//                 className="ml-auto text-gray-500 hover:text-white transition">
//                 <X size={14} />
//               </button>
//             </div>
//           )}
//           {warnStudent === "notfound" && (
//             <p className="text-xs text-gray-500 mt-2">No student found for "{warnSearch}"</p>
//           )}
//         </div>

//         <div>
//           <label className="text-xs text-gray-500 mb-1.5 block">Severity</label>
//           <div className="flex gap-2">
//             {SEVERITY_OPTIONS.map(opt => (
//               <button key={opt.value} onClick={() => setWarnSeverity(opt.value)}
//                 className={`flex-1 py-2 rounded-xl text-xs font-bold border transition
//                 ${warnSeverity === opt.value
//                   ? opt.color + " scale-[1.02]"
//                   : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"}`}>
//                 {opt.value}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div>
//           <label className="text-xs text-gray-500 mb-1.5 block">Reason</label>
//           <textarea value={warnMessage}
//             onChange={e => {
//               setWarnMessage(e.target.value);
//               if (warnError) setWarnError("");
//             }}
//             placeholder="Describe the reason for this warning..."
//             rows={3}
//             className={`w-full bg-[#1a1a1a] border rounded-xl px-4 py-2.5
//                        text-sm text-white placeholder-gray-500 outline-none resize-none transition
//                        ${warnError ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-orange-500/50"}`} />
//         </div>

//         <button onClick={suggestWarning}
//           disabled={!warnStudent || warnStudent === "notfound" || !warnMessage.trim() || warnSending}
//           className="flex items-center justify-center gap-2 w-full py-3 bg-orange-500/20
//                      text-orange-400 border border-orange-500/30 rounded-xl font-semibold
//                      text-sm hover:bg-orange-500/30 transition
//                      disabled:opacity-40 disabled:cursor-not-allowed">
//           <AlertTriangle size={14} />
//           {warnSending ? "Sending..." : "Suggest Warning to Admin"}
//         </button>
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import { Upload, Send, X, Shield, Newspaper, Search, AlertTriangle, Users } from "lucide-react";
import {
  validateNewsTitle,
  validateNewsContent,
  validateWarningMessage,
  validateIdeaTitle,
  validateDescription,
  validateAll
} from "../../utils/validate";

const SEVERITY_OPTIONS = [
  { value: "LOW",    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  { value: "MEDIUM", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  { value: "HIGH",   color: "bg-red-500/20 text-red-400 border-red-500/30" },
];

const CATEGORIES = ["Tech", "Academic", "Campus Pulse", "Cultural", "Others"];

export default function ModeratorUploadPanel({ token }) {
  // news form
  const [form, setForm] = useState({ title: "", content: "", category: "General", imageUrl: "" });
  const [uploading, setUploading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);
  const [newsErrors, setNewsErrors] = useState({});
  const [imageError, setImageError] = useState("");

  // warn form
  const [warnSearch, setWarnSearch] = useState("");
  const [warnStudent, setWarnStudent] = useState(null);
  const [warnSearching, setWarnSearching] = useState(false);
  const [warnSeverity, setWarnSeverity] = useState("LOW");
  const [warnMessage, setWarnMessage] = useState("");
  const [warnSending, setWarnSending] = useState(false);
  const [warnSent, setWarnSent] = useState(false);
  const [warnError, setWarnError] = useState("");

  // class proposal form
  const [proposal, setProposal] = useState({ title: "", description: "", category: "Tech" });
  const [proposalPosting, setProposalPosting] = useState(false);
  const [proposalPosted, setProposalPosted] = useState(false);
  const [proposalErrors, setProposalErrors] = useState({});

  const uploadImage = async (file) => {
    setImageError("");
    // ✅ 2MB limit
    if (file.size > 2 * 1024 * 1024) {
      setImageError("Image must be under 2MB. Please compress and try again.");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "campus_vault");
    const res = await fetch("https://api.cloudinary.com/v1_1/dn6ot9flx/image/upload", {
      method: "POST", body: formData
    });
    const data = await res.json();
    setForm(prev => ({ ...prev, imageUrl: data.secure_url }));
    setUploading(false);
  };

  const postNews = async () => {
    // ✅ validate news
    const { valid, errors } = validateAll({
      title: validateNewsTitle(form.title),
      content: validateNewsContent(form.content),
    });
    if (!valid) { setNewsErrors(errors); return; }
    setNewsErrors({});
    setPosting(true);
    try {
      const res = await fetch("http://localhost:8081/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setForm({ title: "", content: "", category: "General", imageUrl: "" });
        setPosted(true);
        setTimeout(() => setPosted(false), 3000);
      }
    } finally {
      setPosting(false);
    }
  };

  const searchStudent = async () => {
    if (!warnSearch.trim()) return;
    setWarnSearching(true);
    try {
      const res = await fetch(
        `http://localhost:8081/api/students/search?q=${encodeURIComponent(warnSearch)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) { setWarnStudent("notfound"); return; }
      const data = await res.json();
      setWarnStudent(data || "notfound");
    } finally {
      setWarnSearching(false);
    }
  };

  const suggestWarning = async () => {
    // ✅ validate warning message
    const result = validateWarningMessage(warnMessage);
    if (!result.valid) { setWarnError(result.error); return; }
    if (!warnStudent || warnStudent === "notfound") return;
    setWarnError("");
    setWarnSending(true);
    try {
      const res = await fetch("http://localhost:8081/api/warnings/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          recipientRollNumber: warnStudent.rollNumber,
          message: warnMessage.trim(),
          severity: warnSeverity,
          isSuggestion: true
        })
      });
      if (res.ok) {
        setWarnMessage(""); setWarnStudent(null);
        setWarnSearch(""); setWarnSeverity("LOW");
        setWarnSent(true);
        setTimeout(() => setWarnSent(false), 3000);
      }
    } finally {
      setWarnSending(false);
    }
  };

  const postProposal = async () => {
    // ✅ validate proposal
    const { valid, errors } = validateAll({
      title: validateIdeaTitle(proposal.title),
      description: validateDescription(proposal.description),
    });
    if (!valid) { setProposalErrors(errors); return; }
    setProposalErrors({});
    setProposalPosting(true);
    try {
      const res = await fetch("http://localhost:8081/api/ideas/create", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          title: proposal.title.trim(),
          description: proposal.description.trim(),
          category: proposal.category,
          classProposal: true
        })
      });
      if (res.ok) {
        setProposal({ title: "", description: "", category: "Tech" });
        setProposalPosted(true);
        setTimeout(() => setProposalPosted(false), 3000);
      }
    } finally {
      setProposalPosting(false);
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#26F2D0]/10 border border-[#26F2D0]/20
                        flex items-center justify-center">
          <Shield size={18} className="text-[#26F2D0]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Moderator Panel</h3>
          <p className="text-xs text-gray-400">Post news, class proposals and suggest warnings</p>
        </div>
      </div>

      {/* ===== NEWS FORM ===== */}
      {posted && (
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20
                        rounded-xl px-4 py-3 text-sm text-green-400">
          ✅ News posted successfully!
        </div>
      )}

      <div className="bg-[#111] border border-white/10 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Newspaper size={14} className="text-[#26F2D0]" />
          <h4 className="text-sm font-semibold text-[#26F2D0]">Post Campus News</h4>
        </div>

        <select value={form.category}
          onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
                     text-sm text-white outline-none focus:border-[#26F2D0]/50 transition">
          <option>General</option>
          <option>Event</option>
          <option>Academic</option>
          <option>Notice</option>
        </select>

        <div>
          <input value={form.title}
            onChange={e => { setForm(p => ({ ...p, title: e.target.value })); setNewsErrors(p => ({ ...p, title: "" })); }}
            placeholder="News title..."
            className={`w-full bg-[#1a1a1a] border rounded-xl px-4 py-2.5 text-sm text-white
                       placeholder-gray-500 outline-none transition
                       ${newsErrors.title ? "border-red-500/50" : "border-white/10 focus:border-[#26F2D0]/50"}`} />
          {newsErrors.title && <p className="text-xs text-red-400 mt-1">⚠️ {newsErrors.title}</p>}
        </div>

        <div>
          <textarea value={form.content}
            onChange={e => { setForm(p => ({ ...p, content: e.target.value })); setNewsErrors(p => ({ ...p, content: "" })); }}
            placeholder="Write the announcement content..."
            rows={4}
            className={`w-full bg-[#1a1a1a] border rounded-xl px-4 py-2.5 text-sm text-white
                       placeholder-gray-500 outline-none resize-none transition
                       ${newsErrors.content ? "border-red-500/50" : "border-white/10 focus:border-[#26F2D0]/50"}`} />
          {newsErrors.content && <p className="text-xs text-red-400 mt-1">⚠️ {newsErrors.content}</p>}
        </div>

        <div className="border border-dashed border-white/20 rounded-xl p-4">
          <label className="cursor-pointer flex flex-col items-center gap-2
                            text-gray-400 hover:text-white transition">
            <Upload size={20} className="text-gray-500" />
            <span className="text-xs">{uploading ? "Uploading..." : "Click to attach image (optional)"}</span>
            <input type="file" accept="image/*" className="hidden"
              onChange={e => e.target.files[0] && uploadImage(e.target.files[0])} />
          </label>
          {imageError && <p className="text-xs text-red-400 mt-2 text-center">⚠️ {imageError}</p>}
          {form.imageUrl && (
            <div className="mt-3 relative">
              <img src={form.imageUrl} className="w-full h-36 object-cover rounded-xl" />
              <button onClick={() => setForm(p => ({ ...p, imageUrl: "" }))}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full
                           w-6 h-6 flex items-center justify-center hover:bg-red-700 transition">
                <X size={12} />
              </button>
            </div>
          )}
        </div>

        <button onClick={postNews} disabled={posting || uploading}
          className="flex items-center justify-center gap-2 w-full py-3 bg-[#26F2D0]
                     text-black rounded-xl font-semibold text-sm hover:bg-[#1dd4b8]
                     transition disabled:opacity-40 disabled:cursor-not-allowed">
          <Send size={14} />
          {posting ? "Posting..." : "Post Announcement"}
        </button>
      </div>

      {/* ===== CLASS PROPOSAL ===== */}
      {proposalPosted && (
        <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20
                        rounded-xl px-4 py-3 text-sm text-purple-400">
          🏛️ Class proposal posted! Admin has been notified.
        </div>
      )}

      <div className="bg-[#111] border border-purple-500/20 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Users size={14} className="text-purple-400" />
          <h4 className="text-sm font-semibold text-purple-400">Post Class Proposal</h4>
          <span className="ml-auto text-xs text-gray-500 italic">Admin notified instantly</span>
        </div>

        <div className="bg-purple-500/5 border border-purple-500/15 rounded-xl px-4 py-3">
          <p className="text-xs text-gray-400 leading-relaxed">
            🏛️ Use this to officially represent your class. Admin will be notified immediately.
          </p>
        </div>

        <select value={proposal.category}
          onChange={e => setProposal(p => ({ ...p, category: e.target.value }))}
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
                     text-sm text-white outline-none focus:border-purple-500/50 transition">
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>

        <div>
          <input value={proposal.title}
            onChange={e => { setProposal(p => ({ ...p, title: e.target.value })); setProposalErrors(p => ({ ...p, title: "" })); }}
            placeholder="Proposal title — what does your class want?"
            maxLength={100}
            className={`w-full bg-[#1a1a1a] border rounded-xl px-4 py-2.5 text-sm text-white
                       placeholder-gray-500 outline-none transition
                       ${proposalErrors.title ? "border-red-500/50" : "border-white/10 focus:border-purple-500/50"}`} />
          {proposalErrors.title && <p className="text-xs text-red-400 mt-1">⚠️ {proposalErrors.title}</p>}
        </div>

        <div>
          <textarea value={proposal.description}
            onChange={e => { setProposal(p => ({ ...p, description: e.target.value })); setProposalErrors(p => ({ ...p, description: "" })); }}
            placeholder="Describe the proposal — what, why, and how it helps your class..."
            rows={4} maxLength={500}
            className={`w-full bg-[#1a1a1a] border rounded-xl px-4 py-2.5 text-sm text-white
                       placeholder-gray-500 outline-none resize-none transition
                       ${proposalErrors.description ? "border-red-500/50" : "border-white/10 focus:border-purple-500/50"}`} />
          <div className="flex items-center justify-between mt-1">
            {proposalErrors.description
              ? <p className="text-xs text-red-400">⚠️ {proposalErrors.description}</p>
              : <span />}
            <p className="text-xs text-gray-600">{proposal.description.length}/500</p>
          </div>
        </div>

        <button onClick={postProposal} disabled={proposalPosting}
          className="flex items-center justify-center gap-2 w-full py-3 bg-purple-500/20
                     text-purple-400 border border-purple-500/30 rounded-xl font-semibold
                     text-sm hover:bg-purple-500/30 transition
                     disabled:opacity-40 disabled:cursor-not-allowed">
          <Users size={14} />
          {proposalPosting ? "Posting..." : "Post Class Proposal"}
        </button>
      </div>

      {/* ===== SUGGEST WARNING ===== */}
      {warnSent && (
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20
                        rounded-xl px-4 py-3 text-sm text-green-400">
          ✅ Warning suggestion sent to admin for approval!
        </div>
      )}

      <div className="bg-[#111] border border-orange-500/20 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle size={14} className="text-orange-400" />
          <h4 className="text-sm font-semibold text-orange-400">Suggest Warning to Admin</h4>
          <span className="ml-auto text-xs text-gray-500 italic">Admin must approve</span>
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Search Student</label>
          <div className="flex gap-2">
            <input value={warnSearch}
              onChange={e => { setWarnSearch(e.target.value); setWarnStudent(null); }}
              onKeyDown={e => e.key === "Enter" && searchStudent()}
              placeholder="Roll number or name..."
              className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
                         text-sm text-white placeholder-gray-500 outline-none
                         focus:border-orange-500/50 transition" />
            <button onClick={searchStudent} disabled={warnSearching}
              className="flex items-center gap-1 px-4 py-2.5 bg-orange-500/20 text-orange-400
                         border border-orange-500/30 rounded-xl text-sm font-medium
                         hover:bg-orange-500/30 transition disabled:opacity-50">
              <Search size={14} />
              {warnSearching ? "..." : "Find"}
            </button>
          </div>

          {warnStudent && warnStudent !== "notfound" && (
            <div className="mt-3 flex items-center gap-3 bg-white/5 border border-white/10
                            rounded-xl px-4 py-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20
                              flex items-center justify-center text-orange-400 font-bold text-sm">
                {warnStudent.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-white font-medium text-sm">{warnStudent.name}</p>
                <p className="text-gray-500 text-xs">
                  {warnStudent.rollNumber} · {warnStudent.branch} · {warnStudent.year}
                </p>
              </div>
              <button onClick={() => { setWarnStudent(null); setWarnSearch(""); }}
                className="ml-auto text-gray-500 hover:text-white transition">
                <X size={14} />
              </button>
            </div>
          )}
          {warnStudent === "notfound" && (
            <p className="text-xs text-gray-500 mt-2">No student found for "{warnSearch}"</p>
          )}
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Severity</label>
          <div className="flex gap-2">
            {SEVERITY_OPTIONS.map(opt => (
              <button key={opt.value} onClick={() => setWarnSeverity(opt.value)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition
                  ${warnSeverity === opt.value
                    ? opt.color + " scale-[1.02]"
                    : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"}`}>
                {opt.value}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Reason</label>
          <textarea value={warnMessage}
            onChange={e => { setWarnMessage(e.target.value); setWarnError(""); }}
            placeholder="Describe the reason for this warning..."
            rows={3}
            className={`w-full bg-[#1a1a1a] border rounded-xl px-4 py-2.5 text-sm text-white
                       placeholder-gray-500 outline-none resize-none transition
                       ${warnError ? "border-red-500/50" : "border-white/10 focus:border-orange-500/50"}`} />
          {warnError && <p className="text-xs text-red-400 mt-1">⚠️ {warnError}</p>}
        </div>

        <button onClick={suggestWarning}
          disabled={!warnStudent || warnStudent === "notfound" || warnSending}
          className="flex items-center justify-center gap-2 w-full py-3 bg-orange-500/20
                     text-orange-400 border border-orange-500/30 rounded-xl font-semibold
                     text-sm hover:bg-orange-500/30 transition
                     disabled:opacity-40 disabled:cursor-not-allowed">
          <AlertTriangle size={14} />
          {warnSending ? "Sending..." : "Suggest Warning to Admin"}
        </button>
      </div>
    </div>
  );
}