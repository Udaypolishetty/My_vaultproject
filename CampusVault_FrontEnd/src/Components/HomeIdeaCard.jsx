// // import { ExternalLink, Trash2 } from "lucide-react";
// // import { useState } from "react";

// // const CATEGORY_ICONS = {
// //   Tech: "/techh.png",
// //   Academic: "/academic.png",
// //   "Campus Pulse": "/campuspulse.png",
// //   Cultural: "/cultural.png",
// // };

// // const CATEGORY_COLORS = {
// //   Tech: "from-blue-500/20 to-blue-400/5 border-blue-400/20",
// //   Academic: "from-green-500/20 to-green-400/5 border-green-400/20",
// //   "Campus Pulse": "from-red-500/20 to-red-400/5 border-red-400/20",
// //   Cultural: "from-yellow-500/20 to-yellow-400/5 border-yellow-400/20",
// // };

// // const getLinkLabel = (url) => {
// //   if (!url) return "View";
// //   if (url.includes("youtube") || url.includes("youtu.be")) return "▶ YouTube";
// //   if (url.includes("instagram")) return "📸 Instagram";
// //   if (url.includes("drive.google")) return "📁 Drive";
// //   if (url.includes("linkedin")) return "💼 LinkedIn";
// //   return "🔗 View";
// // };

// // const ShowcaseDeleteButton = ({ ideaId, token, onDeleted }) => {
// //   const [confirm, setConfirm] = useState(false);
// //   const [deleting, setDeleting] = useState(false);
// //   const [errorMsg, setErrorMsg] = useState("");

// //   const handleDelete = async (e) => {
// //     e.stopPropagation();
// //     setDeleting(true);
// //     setErrorMsg("");

// //     try {
// //       const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}`, {
// //         method: "DELETE",
// //         headers: { Authorization: `Bearer ${token}` }
// //       });

// //       if (res.ok) {
// //         onDeleted(ideaId);
// //       } else if (res.status === 403) {
// //         setConfirm(false);
// //         setErrorMsg("Seems you are not the one who implemented this idea.");
// //         setTimeout(() => setErrorMsg(""), 3000);
// //       }
// //     } catch (err) {
// //       console.error("Delete failed:", err);
// //     } finally {
// //       setDeleting(false);
// //     }
// //   };

// //   if (confirm) {
// //     return (
// //       <div className="relative">
// //         <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
// //           <span className="text-xs text-gray-400">Remove?</span>

// //           <button
// //             onClick={handleDelete}
// //             disabled={deleting}
// //             className="text-xs text-red-400 font-semibold px-2 py-0.5
// //             bg-red-400/10 rounded-full hover:bg-red-400/20 transition
// //             disabled:opacity-50"
// //           >
// //             {deleting ? "..." : "Yes"}
// //           </button>

// //           <button
// //             onClick={(e) => {
// //               e.stopPropagation();
// //               setConfirm(false);
// //             }}
// //             className="text-xs text-gray-500 hover:text-white px-2 py-0.5
// //             bg-white/5 rounded-full transition"
// //           >
// //             No
// //           </button>
// //         </div>

// //         {errorMsg && (
// //           <div className="absolute top-8 right-0 w-52 bg-[#1a1a1a]
// //           border border-red-500/30 text-red-400 text-xs rounded-xl
// //           px-3 py-2 shadow-lg z-20">
// //             {errorMsg}
// //           </div>
// //         )}
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="relative">
// //       <button
// //         onClick={(e) => {
// //           e.stopPropagation();
// //           setConfirm(true);
// //         }}
// //         className="p-1.5 rounded-lg text-gray-600 hover:text-red-400
// //         hover:bg-red-400/10 transition-all"
// //         title="Remove from showcase"
// //       >
// //         <Trash2 size={13} />
// //       </button>

// //       {errorMsg && (
// //         <div className="absolute top-8 right-0 w-52 bg-[#1a1a1a]
// //         border border-red-500/30 text-red-400 text-xs rounded-xl
// //         px-3 py-2 shadow-lg z-20">
// //           {errorMsg}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // const HomeIdeaCard = ({ idea, isModerator, token, onDeleted, formatDate }) => {

// //   const gradientClass = CATEGORY_COLORS[idea.category]
// //     || "from-gray-500/20 to-gray-400/5 border-gray-400/20";

// //   const proposedBy = idea.classProposal
// //     ? `🏛️ ${idea.proposalClass}`
// //     : `💡 ${idea.createdByName}`;

// //   const proposedBySubtext = idea.classProposal
// //     ? `Class Proposal · ${idea.category}`
// //     : `${idea.createdByBranch} · ${idea.createdByYear}`;

// //   return (
// //     <div
// //       className={`relative bg-gradient-to-br ${gradientClass} border rounded-2xl
// //       overflow-hidden transition-all duration-300
// //       hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(38,242,208,0.1)]`}
// //     >

// //       {isModerator && (
// //         <div className="absolute top-2 right-2 z-10">
// //           <ShowcaseDeleteButton
// //             ideaId={idea.id}
// //             token={token}
// //             onDeleted={onDeleted}
// //           />
// //         </div>
// //       )}

// //       {idea.showcaseImageUrl ? (
// //         <div className="relative h-44 overflow-hidden">
// //           <img
// //             src={idea.showcaseImageUrl}
// //             alt={idea.title}
// //             className="w-full h-full object-cover"
// //           />

// //           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

// //           <span className="absolute bottom-3 left-3 text-xs px-2 py-0.5
// //           bg-green-500/80 text-white rounded-full font-medium">
// //             ✅ Implemented
// //           </span>
// //         </div>
// //       ) : (
// //         <div className="h-32 flex items-center justify-center bg-white/[0.03]
// //         border-b border-white/5">
// //           <img
// //             src={CATEGORY_ICONS[idea.category] || "/others.png"}
// //             className="w-16 h-16 object-contain opacity-60"
// //             alt=""
// //           />
// //         </div>
// //       )}

// //       <div className="p-4">
// //         <div className="flex items-start justify-between gap-2 mb-1">

// //           <p className="text-white font-bold text-sm leading-snug flex-1">
// //             {idea.title}
// //           </p>

// //           {idea.showcaseLink && (
// //             <a
// //               href={idea.showcaseLink}
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               onClick={e => e.stopPropagation()}
// //               className="shrink-0 flex items-center gap-1 px-2 py-1
// //               bg-white/10 hover:bg-[#26F2D0]/20 text-gray-400
// //               hover:text-[#26F2D0] rounded-lg text-xs transition-all
// //               border border-white/10 hover:border-[#26F2D0]/30
// //               whitespace-nowrap"
// //               title={idea.showcaseLink}
// //             >
// //               {getLinkLabel(idea.showcaseLink)}
// //               <ExternalLink size={10} />
// //             </a>
// //           )}
// //         </div>

// //         <p className="text-gray-400 text-xs line-clamp-2 mb-3">
// //           {idea.description}
// //         </p>

// //         <div className="flex items-center justify-between">

// //           <div>
// //             <p className="text-xs text-gray-300 font-medium">
// //               {proposedBy}
// //             </p>

// //             <p className="text-xs text-gray-500">
// //               {proposedBySubtext}
// //             </p>
// //           </div>

// //           <div className="text-right">
// //             <p className="text-xs text-[#26F2D0] font-bold">
// //               👍 {idea.likes || 0} likes
// //             </p>

// //             {idea.reviewedAt && (
// //               <p className="text-xs text-gray-600">
// //                 {formatDate(idea.reviewedAt)}
// //               </p>
// //             )}
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HomeIdeaCard;









// import { ExternalLink, Trash2, ThumbsUp, Calendar } from "lucide-react";
// import { useState } from "react";

// /* ── Category config ── */
// const CATEGORY_ICONS = {
//   Tech:           "/techh.png",
//   Academic:       "/academic.png",
//   "Campus Pulse": "/campuspulse.png",
//   Cultural:       "/cultural.png",
// };

// const CATEGORY_ACCENT = {
//   Tech:           { from: "#3b82f6", to: "#06b6d4", glow: "rgba(59,130,246,0.5)"  },
//   Academic:       { from: "#22c55e", to: "#10b981", glow: "rgba(34,197,94,0.5)"   },
//   "Campus Pulse": { from: "#ef4444", to: "#f97316", glow: "rgba(239,68,68,0.5)"   },
//   Cultural:       { from: "#eab308", to: "#f59e0b", glow: "rgba(234,179,8,0.5)"   },
// };

// const getLinkLabel = (url) => {
//   if (!url) return "View";
//   if (url.includes("youtube") || url.includes("youtu.be")) return "▶ YouTube";
//   if (url.includes("instagram")) return "📸 Instagram";
//   if (url.includes("drive.google")) return "📁 Drive";
//   if (url.includes("linkedin")) return "💼 LinkedIn";
//   return "🔗 View";
// };

// /* ── Delete button — exact same logic as before ── */
// const ShowcaseDeleteButton = ({ ideaId, token, onDeleted }) => {
//   const [confirm,  setConfirm]  = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleDelete = async (e) => {
//     e.stopPropagation();
//     setDeleting(true);
//     setErrorMsg("");
//     try {
//       const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) {
//         onDeleted(ideaId);
//       } else if (res.status === 403) {
//         setConfirm(false);
//         setErrorMsg("Seems you are not the one who implemented this idea.");
//         setTimeout(() => setErrorMsg(""), 3000);
//       }
//     } catch (err) {
//       console.error("Delete failed:", err);
//     } finally {
//       setDeleting(false);
//     }
//   };

//   if (confirm) {
//     return (
//       <div style={{ position: "relative" }}>
//         <div
//           style={{ display: "flex", alignItems: "center", gap: 4 }}
//           onClick={e => e.stopPropagation()}
//         >
//           <span style={{ fontSize: 11, color: "#9ca3af" }}>Remove?</span>
//           <button
//             onClick={handleDelete}
//             disabled={deleting}
//             style={{
//               fontSize: 11, color: "#f87171", fontWeight: 600,
//               padding: "2px 8px", borderRadius: 999,
//               background: "rgba(239,68,68,0.12)",
//               border: "1px solid rgba(239,68,68,0.25)",
//               cursor: "pointer", opacity: deleting ? 0.5 : 1,
//             }}
//           >
//             {deleting ? "..." : "Yes"}
//           </button>
//           <button
//             onClick={e => { e.stopPropagation(); setConfirm(false); }}
//             style={{
//               fontSize: 11, color: "#6b7280", padding: "2px 8px",
//               borderRadius: 999, background: "rgba(255,255,255,0.06)",
//               border: "none", cursor: "pointer",
//             }}
//           >
//             No
//           </button>
//         </div>
//         {errorMsg && (
//           <div style={{
//             position: "absolute", top: 28, right: 0, width: 200,
//             background: "#1a1a1a", border: "1px solid rgba(239,68,68,0.3)",
//             color: "#f87171", fontSize: 11, borderRadius: 10,
//             padding: "8px 12px", zIndex: 20,
//             boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
//           }}>
//             {errorMsg}
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div style={{ position: "relative" }}>
//       <button
//         onClick={e => { e.stopPropagation(); setConfirm(true); }}
//         title="Remove from showcase"
//         style={{
//           padding: 6, borderRadius: 8,
//           background: "rgba(239,68,68,0.08)",
//           border: "1px solid rgba(239,68,68,0.18)",
//           color: "#ef4444", cursor: "pointer",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           transition: "all 0.2s",
//         }}
//         onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; }}
//         onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
//       >
//         <Trash2 size={13} />
//       </button>
//       {errorMsg && (
//         <div style={{
//           position: "absolute", top: 28, right: 0, width: 200,
//           background: "#1a1a1a", border: "1px solid rgba(239,68,68,0.3)",
//           color: "#f87171", fontSize: 11, borderRadius: 10,
//           padding: "8px 12px", zIndex: 20,
//         }}>
//           {errorMsg}
//         </div>
//       )}
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════
//    SHOWCASE GROUP — wraps a group of ideas into
//    the fanned card stack. Pass all ideas for one
//    "slot" here; each card fans out on hover.
//    ─────────────────────────────────────────────
//    Used inside Home.jsx showcase loop like:
//      <ShowcaseCardGroup ideas={showcase} ... />
// ═══════════════════════════════════════════════ */

// /* ── Single glass card (one idea) ── */
// function GlassIdeaCard({
//   idea, rotation, zIndex, isModerator, token, onDeleted, formatDate, isHovered,
// }) {
//   const accent = CATEGORY_ACCENT[idea.category] || {
//     from: "#26F2D0", to: "#0891b2", glow: "rgba(38,242,208,0.5)",
//   };

//   const proposedBy = idea.classProposal
//     ? `🏛️ ${idea.proposalClass}`
//     : `💡 ${idea.createdByName}`;

//   const proposedBySubtext = idea.classProposal
//     ? `Class Proposal · ${idea.category}`
//     : `${idea.createdByBranch} · ${idea.createdByYear}`;

//   return (
//     <div
//       style={{
//         position: "absolute",
//         width: 200,
//         height: 240,
//         borderRadius: 16,
//         background: "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 60%, rgba(0,0,0,0.15) 100%)",
//         border: "1px solid rgba(255,255,255,0.13)",
//         boxShadow: `0 20px 40px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(255,255,255,0.06) inset`,
//         backdropFilter: "blur(14px)",
//         WebkitBackdropFilter: "blur(14px)",
//         overflow: "hidden",
//         transform: `rotate(${rotation}deg)`,
//         transition: "transform 0.5s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.4s ease",
//         zIndex,
//         cursor: "default",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* category colour top bar */}
//       <div style={{
//         height: 3, flexShrink: 0,
//         background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
//         boxShadow: `0 0 10px ${accent.glow}`,
//       }} />

//       {/* image or icon */}
//       {idea.showcaseImageUrl ? (
//         <div style={{ height: 96, flexShrink: 0, position: "relative", overflow: "hidden" }}>
//           <img
//             src={idea.showcaseImageUrl}
//             alt={idea.title}
//             style={{ width: "100%", height: "100%", objectFit: "cover" }}
//           />
//           <div style={{
//             position: "absolute", inset: 0,
//             background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
//           }} />
//           <span style={{
//             position: "absolute", bottom: 6, left: 8,
//             fontSize: 9, padding: "2px 7px", borderRadius: 999,
//             background: "rgba(34,197,94,0.8)", color: "white", fontWeight: 600,
//           }}>
//             ✅ Implemented
//           </span>
//         </div>
//       ) : (
//         <div style={{
//           height: 80, flexShrink: 0,
//           display: "flex", alignItems: "center", justifyContent: "center",
//           background: `linear-gradient(135deg, ${accent.from}18, ${accent.to}0a)`,
//           borderBottom: "1px solid rgba(255,255,255,0.06)",
//         }}>
//           <img
//             src={CATEGORY_ICONS[idea.category] || "/others.png"}
//             style={{ width: 40, height: 40, objectFit: "contain", opacity: 0.7 }}
//             alt=""
//           />
//         </div>
//       )}

//       {/* body */}
//       <div style={{ padding: "10px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
//         {/* title + link */}
//         <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6 }}>
//           <p style={{
//             color: "white", fontWeight: 700, fontSize: 12, lineHeight: 1.3,
//             margin: 0, flex: 1,
//             display: "-webkit-box", WebkitLineClamp: 2,
//             WebkitBoxOrient: "vertical", overflow: "hidden",
//           }}>
//             {idea.title}
//           </p>
//           {idea.showcaseLink && (
//             <a
//               href={idea.showcaseLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={e => e.stopPropagation()}
//               style={{
//                 flexShrink: 0, display: "flex", alignItems: "center", gap: 3,
//                 padding: "3px 7px", borderRadius: 8,
//                 background: "rgba(255,255,255,0.08)",
//                 border: "1px solid rgba(255,255,255,0.12)",
//                 color: "#9ca3af", fontSize: 10, textDecoration: "none",
//                 whiteSpace: "nowrap", transition: "all 0.2s",
//               }}
//               onMouseEnter={e => { e.currentTarget.style.color = "#26F2D0"; e.currentTarget.style.background = "rgba(38,242,208,0.12)"; }}
//               onMouseLeave={e => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
//             >
//               {getLinkLabel(idea.showcaseLink)}
//               <ExternalLink size={8} />
//             </a>
//           )}
//         </div>

//         {/* proposed by */}
//         <div style={{ marginTop: "auto" }}>
//           <p style={{ fontSize: 10, color: "#e5e7eb", fontWeight: 500, margin: 0 }}>
//             {proposedBy}
//           </p>
//           <p style={{ fontSize: 9, color: "#6b7280", margin: "1px 0 0" }}>
//             {proposedBySubtext}
//           </p>
//         </div>

//         {/* likes + date row */}
//         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <span style={{
//             fontSize: 10, color: "#26F2D0", fontWeight: 700,
//             display: "flex", alignItems: "center", gap: 3,
//           }}>
//             <ThumbsUp size={9} /> {idea.likes || 0}
//           </span>
//           {idea.reviewedAt && (
//             <span style={{ fontSize: 9, color: "#4b5563", display: "flex", alignItems: "center", gap: 3 }}>
//               <Calendar size={8} />
//               {formatDate(idea.reviewedAt)}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* bottom label bar — mirrors the CSS ::before */}
//       <div style={{
//         height: 36, flexShrink: 0,
//         background: "rgba(255,255,255,0.05)",
//         borderTop: "1px solid rgba(255,255,255,0.07)",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         gap: 6,
//       }}>
//         <span style={{
//           fontSize: 10, color: "#d1d5db", fontWeight: 500,
//           letterSpacing: "0.06em", textTransform: "uppercase",
//         }}>
//           {idea.category || "Idea"}
//         </span>
//         {isModerator && (
//           <ShowcaseDeleteButton ideaId={idea.id} token={token} onDeleted={onDeleted} />
//         )}
//       </div>
//     </div>
//   );
// }

// /* ── Fan group — takes ONE idea, renders it as a stacked visual ──
//    We show 3 ghost cards behind it to create the fan illusion,
//    then the real card on top. All fan out on hover.             */
// const HomeIdeaCard = ({ idea, isModerator, token, onDeleted, formatDate }) => {
//   const [hovered, setHovered] = useState(false);

//   /* fan rotations: back-most → front */
//   const ROTATIONS     = [-14, -5, 5];
//   const FAN_ROTATIONS = [-22, -8, 8];

//   return (
//     <div
//       style={{
//         position: "relative",
//         width: 200,
//         height: 240,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* ghost cards (decorative depth layers) */}
//       {[0, 1, 2].map((i) => (
//         <div
//           key={i}
//           style={{
//             position: "absolute",
//             width: 200,
//             height: 240,
//             borderRadius: 16,
//             background: `linear-gradient(160deg, rgba(255,255,255,${0.06 - i * 0.015}) 0%, rgba(255,255,255,0.02) 100%)`,
//             border: "1px solid rgba(255,255,255,0.08)",
//             boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
//             backdropFilter: "blur(8px)",
//             WebkitBackdropFilter: "blur(8px)",
//             borderRadius: 16,
//             transform: `rotate(${hovered ? FAN_ROTATIONS[i] : ROTATIONS[i]}deg)`,
//             transition: "transform 0.5s cubic-bezier(0.34,1.2,0.64,1)",
//             zIndex: i + 1,
//           }}
//         />
//       ))}

//       {/* real card — always on top, no rotation */}
//       <GlassIdeaCard
//         idea={idea}
//         rotation={0}
//         zIndex={10}
//         isModerator={isModerator}
//         token={token}
//         onDeleted={onDeleted}
//         formatDate={formatDate}
//         isHovered={hovered}
//       />
//     </div>
//   );
// };

// export default HomeIdeaCard;





// import { ExternalLink, Trash2, ThumbsUp, Calendar } from "lucide-react";
// import { useState } from "react";

// /* ── Category config ── */
// const CATEGORY_ICONS = {
//   Tech:           "/techh.png",
//   Academic:       "/academic.png",
//   "Campus Pulse": "/campuspulse.png",
//   Cultural:       "/cultural.png",
// };

// const CATEGORY_ACCENT = {
//   Tech:           { from: "#3b82f6", to: "#06b6d4", glow: "rgba(59,130,246,0.5)"  },
//   Academic:       { from: "#22c55e", to: "#10b981", glow: "rgba(34,197,94,0.5)"   },
//   "Campus Pulse": { from: "#ef4444", to: "#f97316", glow: "rgba(239,68,68,0.5)"   },
//   Cultural:       { from: "#eab308", to: "#f59e0b", glow: "rgba(234,179,8,0.5)"   },
// };

// const getLinkLabel = (url) => {
//   if (!url) return "View";
//   if (url.includes("youtube") || url.includes("youtu.be")) return "▶ YouTube";
//   if (url.includes("instagram")) return "📸 Instagram";
//   if (url.includes("drive.google")) return "📁 Drive";
//   if (url.includes("linkedin")) return "💼 LinkedIn";
//   return "🔗 View";
// };

// /* ── Delete button ── */
// const ShowcaseDeleteButton = ({ ideaId, token, onDeleted }) => {
//   const [confirm,  setConfirm]  = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleDelete = async (e) => {
//     e.stopPropagation();
//     setDeleting(true);
//     setErrorMsg("");
//     try {
//       const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) {
//         onDeleted(ideaId);
//       } else if (res.status === 403) {
//         setConfirm(false);
//         setErrorMsg("Seems you are not the one who implemented this idea.");
//         setTimeout(() => setErrorMsg(""), 3000);
//       }
//     } catch (err) {
//       console.error("Delete failed:", err);
//     } finally {
//       setDeleting(false);
//     }
//   };

//   if (confirm) {
//     return (
//       <div style={{ position: "relative" }}>
//         <div
//           style={{ display: "flex", alignItems: "center", gap: 4 }}
//           onClick={e => e.stopPropagation()}
//         >
//           <span style={{ fontSize: 11, color: "#9ca3af" }}>Remove?</span>
//           <button
//             onClick={handleDelete}
//             disabled={deleting}
//             style={{
//               fontSize: 11, color: "#f87171", fontWeight: 600,
//               padding: "2px 8px", borderRadius: 999,
//               background: "rgba(239,68,68,0.12)",
//               border: "1px solid rgba(239,68,68,0.25)",
//               cursor: "pointer", opacity: deleting ? 0.5 : 1,
//             }}
//           >
//             {deleting ? "..." : "Yes"}
//           </button>
//           <button
//             onClick={e => { e.stopPropagation(); setConfirm(false); }}
//             style={{
//               fontSize: 11, color: "#6b7280", padding: "2px 8px",
//               borderRadius: 999, background: "rgba(255,255,255,0.06)",
//               border: "none", cursor: "pointer",
//             }}
//           >
//             No
//           </button>
//         </div>
//         {errorMsg && (
//           <div style={{
//             position: "absolute", top: 28, right: 0, width: 200,
//             background: "#1a1a1a", border: "1px solid rgba(239,68,68,0.3)",
//             color: "#f87171", fontSize: 11, borderRadius: 10,
//             padding: "8px 12px", zIndex: 20,
//             boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
//           }}>
//             {errorMsg}
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div style={{ position: "relative" }}>
//       <button
//         onClick={e => { e.stopPropagation(); setConfirm(true); }}
//         title="Remove from showcase"
//         style={{
//           padding: 6, borderRadius: 8,
//           background: "rgba(239,68,68,0.08)",
//           border: "1px solid rgba(239,68,68,0.18)",
//           color: "#ef4444", cursor: "pointer",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           transition: "all 0.2s",
//         }}
//         onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; }}
//         onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
//       >
//         <Trash2 size={13} />
//       </button>
//       {errorMsg && (
//         <div style={{
//           position: "absolute", top: 28, right: 0, width: 200,
//           background: "#1a1a1a", border: "1px solid rgba(239,68,68,0.3)",
//           color: "#f87171", fontSize: 11, borderRadius: 10,
//           padding: "8px 12px", zIndex: 20,
//         }}>
//           {errorMsg}
//         </div>
//       )}
//     </div>
//   );
// };

// /* ── Single glass card (one idea) ── */
// function GlassIdeaCard({
//   idea, rotation, zIndex, isModerator, token, onDeleted, formatDate,
//   translateX = 0, translateY = 0,
// }) {
//   const accent = CATEGORY_ACCENT[idea.category] || {
//     from: "#26F2D0", to: "#0891b2", glow: "rgba(38,242,208,0.5)",
//   };

//   const proposedBy = idea.classProposal
//     ? `🏛️ ${idea.proposalClass}`
//     : `💡 ${idea.createdByName}`;

//   const proposedBySubtext = idea.classProposal
//     ? `Class Proposal · ${idea.category}`
//     : `${idea.createdByBranch} · ${idea.createdByYear}`;

//   return (
//     <div
//       style={{
//         position: "absolute",
//         width: 200,
//         height: 240,
//         borderRadius: 16,
//         background: "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 60%, rgba(0,0,0,0.15) 100%)",
//         border: "1px solid rgba(255,255,255,0.13)",
//         boxShadow: `0 20px 40px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(255,255,255,0.06) inset`,
//         backdropFilter: "blur(14px)",
//         WebkitBackdropFilter: "blur(14px)",
//         overflow: "hidden",
//         transform: `rotate(${rotation}deg) translateX(${translateX}px) translateY(${translateY}px)`,
//         transition: "transform 0.5s cubic-bezier(0.34,1.2,0.64,1)",
//         zIndex,
//         cursor: "default",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* category colour top bar */}
//       <div style={{
//         height: 3, flexShrink: 0,
//         background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
//         boxShadow: `0 0 10px ${accent.glow}`,
//       }} />

//       {/* image or icon */}
//       {idea.showcaseImageUrl ? (
//         <div style={{ height: 96, flexShrink: 0, position: "relative", overflow: "hidden" }}>
//           <img
//             src={idea.showcaseImageUrl}
//             alt={idea.title}
//             style={{ width: "100%", height: "100%", objectFit: "cover" }}
//           />
//           <div style={{
//             position: "absolute", inset: 0,
//             background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
//           }} />
//           <span style={{
//             position: "absolute", bottom: 6, left: 8,
//             fontSize: 9, padding: "2px 7px", borderRadius: 999,
//             background: "rgba(34,197,94,0.8)", color: "white", fontWeight: 600,
//           }}>
//             ✅ Implemented
//           </span>
//         </div>
//       ) : (
//         <div style={{
//           height: 80, flexShrink: 0,
//           display: "flex", alignItems: "center", justifyContent: "center",
//           background: `linear-gradient(135deg, ${accent.from}18, ${accent.to}0a)`,
//           borderBottom: "1px solid rgba(255,255,255,0.06)",
//         }}>
//           <img
//             src={CATEGORY_ICONS[idea.category] || "/others.png"}
//             style={{ width: 40, height: 40, objectFit: "contain", opacity: 0.7 }}
//             alt=""
//           />
//         </div>
//       )}

//       {/* body */}
//       <div style={{ padding: "10px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
//         <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6 }}>
//           <p style={{
//             color: "white", fontWeight: 700, fontSize: 12, lineHeight: 1.3,
//             margin: 0, flex: 1,
//             display: "-webkit-box", WebkitLineClamp: 2,
//             WebkitBoxOrient: "vertical", overflow: "hidden",
//           }}>
//             {idea.title}
//           </p>
//           {idea.showcaseLink && (
//             <a
//               href={idea.showcaseLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={e => e.stopPropagation()}
//               style={{
//                 flexShrink: 0, display: "flex", alignItems: "center", gap: 3,
//                 padding: "3px 7px", borderRadius: 8,
//                 background: "rgba(255,255,255,0.08)",
//                 border: "1px solid rgba(255,255,255,0.12)",
//                 color: "#9ca3af", fontSize: 10, textDecoration: "none",
//                 whiteSpace: "nowrap", transition: "all 0.2s",
//               }}
//               onMouseEnter={e => { e.currentTarget.style.color = "#26F2D0"; e.currentTarget.style.background = "rgba(38,242,208,0.12)"; }}
//               onMouseLeave={e => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
//             >
//               {getLinkLabel(idea.showcaseLink)}
//               <ExternalLink size={8} />
//             </a>
//           )}
//         </div>

//         <div style={{ marginTop: "auto" }}>
//           <p style={{ fontSize: 10, color: "#e5e7eb", fontWeight: 500, margin: 0 }}>
//             {proposedBy}
//           </p>
//           <p style={{ fontSize: 9, color: "#6b7280", margin: "1px 0 0" }}>
//             {proposedBySubtext}
//           </p>
//         </div>

//         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <span style={{
//             fontSize: 10, color: "#26F2D0", fontWeight: 700,
//             display: "flex", alignItems: "center", gap: 3,
//           }}>
//             <ThumbsUp size={9} /> {idea.likes || 0}
//           </span>
//           {idea.reviewedAt && (
//             <span style={{ fontSize: 9, color: "#4b5563", display: "flex", alignItems: "center", gap: 3 }}>
//               <Calendar size={8} />
//               {formatDate(idea.reviewedAt)}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* bottom label bar */}
//       <div style={{
//         height: 36, flexShrink: 0,
//         background: "rgba(255,255,255,0.05)",
//         borderTop: "1px solid rgba(255,255,255,0.07)",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         gap: 6,
//       }}>
//         <span style={{
//           fontSize: 10, color: "#d1d5db", fontWeight: 500,
//           letterSpacing: "0.06em", textTransform: "uppercase",
//         }}>
//           {idea.category || "Idea"}
//         </span>
//         {isModerator && (
//           <ShowcaseDeleteButton ideaId={idea.id} token={token} onDeleted={onDeleted} />
//         )}
//       </div>
//     </div>
//   );
// }

// /* ── Ghost card — same dark glass shell, no content ── */
// function GhostCard({ rotation, translateX, translateY, zIndex }) {
//   return (
//     <div
//       style={{
//         position: "absolute",
//         width: 200,
//         height: 240,
//         borderRadius: 16,
//         /* same dark glass look as real card */
//         background: "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 60%, rgba(0,0,0,0.18) 100%)",
//         border: "1px solid rgba(255,255,255,0.10)",
//         boxShadow: "0 16px 36px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.04) inset",
//         backdropFilter: "blur(12px)",
//         WebkitBackdropFilter: "blur(12px)",
//         transform: `rotate(${rotation}deg) translateX(${translateX}px) translateY(${translateY}px)`,
//         transition: "transform 0.5s cubic-bezier(0.34,1.2,0.64,1)",
//         zIndex,
//         overflow: "hidden",
//       }}
//     >
//       {/* top shine */}
//       <div style={{
//         position: "absolute", top: 0, left: 0, right: 0, height: "45%",
//         background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
//         borderRadius: "16px 16px 0 0",
//         pointerEvents: "none",
//       }} />
//       {/* bottom label bar to visually match real card */}
//       <div style={{
//         position: "absolute", bottom: 0, left: 0, right: 0, height: 36,
//         background: "rgba(255,255,255,0.04)",
//         borderTop: "1px solid rgba(255,255,255,0.06)",
//       }} />
//     </div>
//   );
// }

// /* ════════════════════════════════════════════
//    HomeIdeaCard
//    — Default: all cards perfectly stacked → looks like ONE card
//    — Hover:   ghost cards fan out left & right
//    ════════════════════════════════════════════ */
// const HomeIdeaCard = ({ idea, isModerator, token, onDeleted, formatDate }) => {
//   const [hovered, setHovered] = useState(false);

//   const ghosts = [
//     /* left ghost */
//     { stackRot: -2, stackX: 0,   stackY: 0, fanRot: -18, fanX: -65, fanY: 12, zIndex: 1 },
//     /* right ghost */
//     { stackRot:  2, stackX: 0,   stackY: 0, fanRot:  15, fanX:  60, fanY: 12, zIndex: 2 },
//   ];

//   return (
//     <div
//       style={{
//         position: "relative",
//         width: 200,
//         height: 240,
//         /* extra horizontal breathing room so fanned cards don't clip in grids */
//         margin: "0 70px",
//       }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* ghost cards — same glass style, no content, sit below real card */}
//       {ghosts.map((g, i) => (
//         <GhostCard
//           key={i}
//           rotation={hovered ? g.fanRot : g.stackRot}
//           translateX={hovered ? g.fanX  : g.stackX}
//           translateY={hovered ? g.fanY  : g.stackY}
//           zIndex={g.zIndex}
//         />
//       ))}

//       {/* real card — always on top, zero rotation */}
//       <GlassIdeaCard
//         idea={idea}
//         rotation={0}
//         translateX={0}
//         translateY={0}
//         zIndex={10}
//         isModerator={isModerator}
//         token={token}
//         onDeleted={onDeleted}
//         formatDate={formatDate}
//       />
//     </div>
//   );
// };

// export default HomeIdeaCard;




import { ExternalLink, Trash2, ThumbsUp, Calendar,GraduationCap,Lightbulb,Building2,Zap,Flame } from "lucide-react";
import { useState } from "react";

/* ── Category config ── */
const CATEGORY_ICONS = {
  Tech:           "/techh.png",
  Academic:       "/academic.png",
  "Campus Pulse": "/campuspulse.png",
  Cultural:       "/cultural.png",
};

const CATEGORY_ACCENT = {
  Tech:           { from: "#3b82f6", to: "#06b6d4", glow: "rgba(59,130,246,0.5)"  },
  Academic:       { from: "#22c55e", to: "#10b981", glow: "rgba(34,197,94,0.5)"   },
  "Campus Pulse": { from: "#ef4444", to: "#f97316", glow: "rgba(239,68,68,0.5)"   },
  Cultural:       { from: "#eab308", to: "#f59e0b", glow: "rgba(234,179,8,0.5)"   },
};

const getLinkLabel = (url) => {
  if (!url) return "View";
  if (url.includes("youtube") || url.includes("youtu.be")) return "▶ YouTube";
  if (url.includes("instagram")) return "📸 Instagram";
  if (url.includes("drive.google")) return "📁 Drive";
  if (url.includes("linkedin")) return "💼 LinkedIn";
  return "🔗 View";
};

/* ── Delete button ── */
const ShowcaseDeleteButton = ({ ideaId, token, onDeleted }) => {
  const [confirm,  setConfirm]  = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleDelete = async (e) => {
    e.stopPropagation();
    setDeleting(true);
    setErrorMsg("");
    try {
      const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
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
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }} onClick={e => e.stopPropagation()}>
          <span style={{ fontSize: 11, color: "#9ca3af" }}>Remove?</span>
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={{
              fontSize: 11, color: "#f87171", fontWeight: 600,
              padding: "2px 8px", borderRadius: 999,
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.25)",
              cursor: "pointer", opacity: deleting ? 0.5 : 1,
            }}
          >
            {deleting ? "..." : "Yes"}
          </button>
          <button
            onClick={e => { e.stopPropagation(); setConfirm(false); }}
            style={{
              fontSize: 11, color: "#6b7280", padding: "2px 8px",
              borderRadius: 999, background: "rgba(255,255,255,0.06)",
              border: "none", cursor: "pointer",
            }}
          >
            No
          </button>
        </div>
        {errorMsg && (
          <div style={{
            position: "absolute", top: 28, right: 0, width: 200,
            background: "#1a1a1a", border: "1px solid rgba(239,68,68,0.3)",
            color: "#f87171", fontSize: 11, borderRadius: 10,
            padding: "8px 12px", zIndex: 20,
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          }}>
            {errorMsg}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={e => { e.stopPropagation(); setConfirm(true); }}
        title="Remove from showcase"
        style={{
          padding: 6, borderRadius: 0,
          // background: "rgba(239,68,68,0.08)",
          // border: "1px solid rgba(239,68,68,0.18)",
          color: "#ef4444", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
      >
        <Trash2 size={8} />
      </button>
      {errorMsg && (
        <div style={{
          position: "absolute", top: 28, right: 0, width: 200,
          background: "#1a1a1a", border: "1px solid rgba(239,68,68,0.3)",
          color: "#f87171", fontSize: 11, borderRadius: 10,
          padding: "8px 12px", zIndex: 20,
        }}>
          {errorMsg}
        </div>
      )}
    </div>
  );
};

/* ────────────────────────────────────────────────
   GlassIdeaCard — a single full card (icon + label)
   accepts transform props so the parent can
   position/rotate it for both stack & spread states
──────────────────────────────────────────────── */
function GlassIdeaCard({ idea, style, isModerator, token, onDeleted, formatDate }) {
  const accent = CATEGORY_ACCENT[idea.category] || {
    from: "#26F2D0", to: "#0891b2", glow: "rgba(38,242,208,0.5)",
  };




const proposedBy = idea.classProposal ? (
  <span className="flex items-center gap-2">
    <Building2 size={16} />
    {idea.proposalClass}
  </span>
) : (
  <span className="flex items-center gap-2">
    <GraduationCap size={16} />

    {idea.createdByName}
  </span>
);





  const proposedBySubtext = idea.classProposal
    ? `Class Proposal · ${idea.category}`
    : `${idea.createdByBranch} · ${idea.createdByYear}`;

  return (
    <div
      style={{
        position: "absolute",
        width: 200,
        height: 250,
        borderRadius: 16,
        background: "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 60%, rgba(0,0,0,0.15) 100%)",
        border: "1px solid rgba(255,255,255,0.13)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(255,255,255,0.06) inset",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        overflow: "hidden",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        /* transition handles both stack→spread and spread→stack */
        transition: "transform 0.55s cubic-bezier(0.34,1.1,0.64,1)",
        ...style,
      }}
    >
      {/* category colour top bar */}
      <div style={{
        height: 3, flexShrink: 0,
        background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
        boxShadow: `0 0 10px ${accent.glow}`,
      }} />

      {/* image or icon */}
      {idea.showcaseImageUrl ? (
        <div style={{ height: 96, flexShrink: 0, position: "relative", overflow: "hidden" }}>
          <img
            src={idea.showcaseImageUrl}
            alt={idea.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
          }} />
          <span style={{
            position: "absolute", bottom: 6, left: 8,
            fontSize: 9, padding: "2px 7px", borderRadius: 999,
            background: "rgba(34,197,94,0.8)", color: "white", fontWeight: 600,
          }}>
            ✅ Implemented
          </span>
        </div>
      ) : (
        <div style={{
          height: 80, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: `linear-gradient(135deg, ${accent.from}18, ${accent.to}0a)`,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <img
            src={CATEGORY_ICONS[idea.category] || "/others.png"}
            style={{ width: 40, height: 40, objectFit: "contain", opacity: 0.7 }}
            alt=""
          />
        </div>
      )}

      {/* body */}
      <div style={{ padding: "10px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6 }}>
          <p style={{
            color: "white", fontWeight: 700, fontSize: 12, lineHeight: 1.3,
            margin: 0, flex: 1,
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {idea.title}
          </p>
          {idea.showcaseLink && (
            <a
              href={idea.showcaseLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                flexShrink: 0, display: "flex", alignItems: "center", gap: 3,
                padding: "3px 7px", borderRadius: 8,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#9ca3af", fontSize: 10, textDecoration: "none",
                whiteSpace: "nowrap", transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#26F2D0"; e.currentTarget.style.background = "rgba(38,242,208,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            >
              {getLinkLabel(idea.showcaseLink)}
              <ExternalLink size={8} />
            </a>
          )}
        </div>

        <div style={{ marginTop: "auto" }}>
          <p style={{ fontSize: 10, color: "#e5e7eb", fontWeight: 500, margin: 0 }}>{proposedBy}</p>
          <p style={{ fontSize: 9, color: "#6b7280", margin: "1px 0 0" }}>{proposedBySubtext}</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 10, color: "#26F2D0", fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>
            <ThumbsUp size={9} /> {idea.likes || 0}
          </span>
          {idea.reviewedAt && (
            <span style={{ fontSize: 9, color: "#4b5563", display: "flex", alignItems: "center", gap: 3 }}>
              <Calendar size={8} />
              {formatDate(idea.reviewedAt)}
            </span>
          )}
        </div>
      </div>

      {/* bottom label bar */}
      <div style={{
        height: 36, flexShrink: 0,
        background: "rgba(255,255,255,0.05)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 6,
      }}>
        <span style={{
          fontSize: 10, color: "#d1d5db", fontWeight: 500,
          letterSpacing: "0.06em", textTransform: "uppercase",
        }}>
          {idea.category || "Idea"}
        </span>
        {isModerator && (
          <ShowcaseDeleteButton ideaId={idea.id} token={token} onDeleted={onDeleted} />
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   HomeIdeaCard
   --------------------------------------------------------
   Props:
     ideas       — array of idea objects (the whole group)
     isModerator — bool
     token       — auth token
     onDeleted   — callback
     formatDate  — date formatter fn

   Default  → cards stacked as a fanned deck (image 1)
   On hover → all cards spread flat side-by-side (image 2)
   No individual card hover effects — group only.
════════════════════════════════════════════════════════ */

const CARD_W   = 200;   // card width
const CARD_GAP = 20;    // gap between cards when spread

/*
  Stack transforms per index (for up to 5 cards):
  The last card (highest index) is on top with no rotation.
  Earlier cards peek behind with slight rotation & offset.
*/
const STACK_TRANSFORMS = [
  { rotate: -15, x: -30, y: 20, z: 1 },   // furthest back / left
  { rotate: -8,  x: -14, y: 10, z: 2 },
  { rotate:  0,  x:   0, y:  0, z: 3 },   // top card — front face
  { rotate:  8,  x:  14, y: 10, z: 2 },
  { rotate:  15, x:  30, y: 20, z: 1 },
];

const HomeIdeaCard = ({ ideas = [], isModerator, token, onDeleted, formatDate }) => {
  const [hovered, setHovered] = useState(false);

  const count   = ideas.length;
  // total width when spread: N cards + (N-1) gaps
  const spreadW = count * CARD_W + (count - 1) * CARD_GAP;

return (
  <div
    style={{
      position: "relative",
      width: hovered ? spreadW : CARD_W + 40,
      height: 260,
      // ✅ MOBILE SCROLL ONLY (inline media query alternative)
      maxWidth: window.innerWidth < 768 ? "100vw" : spreadW,
      overflowX: window.innerWidth < 768 && hovered ? "auto" : "visible",
      WebkitOverflowScrolling: "touch",
      scrollbarWidth: "thin",
      msOverflowStyle: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      margin: "0 auto",
      transition: "width 0.4s ease"
    }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
  >

      {ideas.map((idea, i) => {
        /* ── SPREAD position (hover) ── */
        const spreadX = i * (CARD_W + CARD_GAP) - (spreadW - CARD_W) / 2;
        const spreadTransform = `translateX(${spreadX}px) rotate(0deg)`;

        /* ── STACK position (default) ── */
        // Pick a stack slot; centre the top card
        const slotIndex = Math.min(i, STACK_TRANSFORMS.length - 1);
        const slot = STACK_TRANSFORMS[slotIndex];
        // bring the "top" card (last in array) to index 2 slot (front)
        const adjustedSlot = STACK_TRANSFORMS[
          Math.round((i / Math.max(count - 1, 1)) * (STACK_TRANSFORMS.length - 1))
        ] || slot;

        const stackTransform = `translateX(${adjustedSlot.x}px) translateY(${adjustedSlot.y}px) rotate(${adjustedSlot.rotate}deg)`;

        return (
          <GlassIdeaCard
            key={idea.id}
            idea={idea}
            isModerator={isModerator}
            token={token}
            onDeleted={onDeleted}
            formatDate={formatDate}
            style={{
              transform: hovered ? spreadTransform : stackTransform,
              zIndex: hovered ? i + 1 : adjustedSlot.z,
            }}
          />
        );
      })}
    </div>
  );
};

export default HomeIdeaCard;