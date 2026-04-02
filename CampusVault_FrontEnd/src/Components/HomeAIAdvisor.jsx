// import { useState } from "react";
// import { Sparkles } from "lucide-react";
// const HomeAIAdvisor = ({ token }) => {

//   const [aiLoading, setAiLoading] = useState(false);
//   const [aiResult, setAiResult] = useState(null);

//   const handleAIAdvisor = async () => {
//     setAiLoading(true);
//     setAiResult(null);

//     try {
//       const res = await fetch("http://localhost:8081/api/ai/advisor", {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       const data = await res.text();
//       setAiResult(data);

//     } catch (err) {
//       setAiResult("⚠️ Unable to fetch AI insights. Try again.");
//     } finally {
//       setAiLoading(false);
//     }
//   };

// return (
//   <div className="w-full">

//     <div className="relative rounded-2xl p-6 text-left
//       bg-gradient-to-br from-[#1f1f1f] to-[#111]
//       border border-white/10
//       shadow-[0_0_30px_rgba(38,242,208,0.08)]
//       backdrop-blur-xl transition hover:scale-[1.02]">

//       {/* Glow */}
//       <div className="absolute inset-0 rounded-2xl bg-[#26F2D0]/5 blur-2xl opacity-20"></div>

//       <div className="relative z-10">

//         <div className="flex items-center gap-2 mb-3">
//           <Sparkles size={18} className="text-[#26F2D0]" />
//           <h3 className="font-semibold text-white">AI Advisor</h3>
//         </div>

//         <p className="text-gray-400 text-sm mb-4">
//           Smart insights based on your activity
//         </p>

//         <button
//           onClick={handleAIAdvisor}
//           disabled={aiLoading}
//           className="px-4 py-2 rounded-lg
//           bg-gradient-to-r from-[#26F2D0]/30 to-[#26F2D0]/10
//           hover:from-[#26F2D0]/40 hover:to-[#26F2D0]/20
//           text-[#26F2D0] transition-all shadow-md"
//         >
//           {aiLoading ? "Analyzing..." : "Get Insights ✨"}
//         </button>

//         {aiResult && (
//           <div className="mt-5 p-4 rounded-xl bg-black/40 border border-white/10 text-sm text-gray-300 whitespace-pre-line leading-relaxed">
//             {aiResult}
//           </div>
//         )}

//       </div>
//     </div>

//   </div>
// );
// };

// export default HomeAIAdvisor;


// import { useState } from "react";
// import { Sparkles, X } from "lucide-react";

// const HomeAIAdvisor = ({ token }) => {

//   const [aiLoading, setAiLoading] = useState(false);
//   const [aiResult, setAiResult] = useState(null);
//   const [open, setOpen] = useState(false);

//   const handleAIAdvisor = async () => {
//     setAiLoading(true);
//     setAiResult(null);

//     try {
//       const res = await fetch("http://localhost:8081/api/ai/advisor", {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       const data = await res.text();
//       setAiResult(data);

//     } catch (err) {
//       setAiResult("⚠️ Unable to fetch AI insights. Try again.");
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* 🔥 BUTTON (ON HOME) */}
// <button
//   onClick={() => setOpen(true)}
//   className="px-8 py-3 rounded-full
//   bg-gradient-to-r from-[#26F2D0]/20 to-[#26F2D0]/5
//   border border-[#26F2D0]/30
//   text-[#26F2D0]
//   hover:scale-105 hover:shadow-[0_0_20px_rgba(38,242,208,0.2)]
//   transition-all font-medium"
// >
//   ✨ Get AI Insights
// </button>
//       {/* 🔥 MODAL */}
//       {open && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">

//           {/* BACKDROP */}
//           <div
//             className="absolute inset-0 bg-black/60 backdrop-blur-md"
//             onClick={() => setOpen(false)}
//           />

//           {/* MODAL BOX */}
//           <div className="relative z-10 w-[90%] max-w-xl
//             bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]
//             border border-white/10 rounded-2xl p-6
//             shadow-[0_0_40px_rgba(38,242,208,0.15)]
//             animate-[scaleIn_0.2s_ease]">

//             {/* CLOSE */}
//             <button
//               onClick={() => setOpen(false)}
//               className="absolute top-3 right-3 text-gray-400 hover:text-white"
//             >
//               <X size={18} />
//             </button>

//             {/* HEADER */}
//             <div className="flex items-center gap-2 mb-4">
//               <Sparkles size={18} className="text-[#26F2D0]" />
//               <h3 className="font-semibold text-white text-lg">AI Advisor</h3>
//             </div>

//             <p className="text-gray-400 text-sm mb-4">
//               Personalized insights based on your activity
//             </p>

//             {/* BUTTON */}
//             <button
//               onClick={handleAIAdvisor}
//               disabled={aiLoading}
//               className="px-4 py-2 rounded-lg
//               bg-[#26F2D0]/20 hover:bg-[#26F2D0]/30
//               text-[#26F2D0] transition"
//             >
//               {aiLoading ? "Analyzing..." : "Get Insights"}
//             </button>

//             {/* RESULT */}
//             {aiResult && (
//               <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/10 text-sm text-gray-300 whitespace-pre-line">
//                 {aiResult}
//               </div>
//             )}

//           </div>
//         </div>
//       )}

//       {/* ANIMATION */}
//       <style>{`
//         @keyframes scaleIn {
//           from { transform: scale(0.9); opacity: 0; }
//           to { transform: scale(1); opacity: 1; }
//         }
//       `}</style>
//     </>
//   );
// };

// export default HomeAIAdvisor;




// import { useEffect, useMemo, useState } from "react";
// import {
//   Sparkles,
//   X,
//   BrainCircuit,
//   ShieldCheck,
//   TrendingUp,
//   Target,
//   Rocket,
//   CheckCircle2,
//   AlertTriangle,
//   Clock3,
//   Hourglass
// } from "lucide-react";

// const HomeAIAdvisor = ({ token }) => {
//   const [aiLoading, setAiLoading] = useState(false);
//   const [aiResult, setAiResult] = useState(null);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [open, setOpen] = useState(false);

//   const handleAIAdvisor = async () => {
//     if (!token) {
//       setAiResult(null);
//       setErrorMsg("⚠️ Please log in first to view AI insights.");
//       return;
//     }

//     setAiLoading(true);
//     setAiResult(null);
//     setErrorMsg("");

//     try {
//       const res = await fetch("http://localhost:8081/api/ai/advisor", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await res.text();

//       if (!res.ok) {
//         setAiResult(null);
//         setErrorMsg(data || "⚠️ Unable to generate advice right now.");
//         return;
//       }

//       setAiResult(data);
//     } catch (err) {
//       setAiResult(null);
//       setErrorMsg("⚠️ Unable to fetch AI insights. Try again.");
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   useEffect(() => {
//     const closeOnEsc = (e) => {
//       if (e.key === "Escape") setOpen(false);
//     };

//     if (open) {
//       document.addEventListener("keydown", closeOnEsc);
//       document.body.style.overflow = "hidden";
//     }

//     return () => {
//       document.removeEventListener("keydown", closeOnEsc);
//       document.body.style.overflow = "auto";
//     };
//   }, [open]);

//   const parsedResult = useMemo(() => {
//     if (!aiResult) return null;

//     const lines = aiResult
//       .split("\n")
//       .map((line) => line.trim())
//       .filter(Boolean);

//     let greeting = "";
//     let strengths = [];
//     let improvements = [];
//     let nextActions = [];
//     let currentSection = "";

//     for (const line of lines) {
//       const lower = line.toLowerCase();

//       if (lower.startsWith("hi ")) {
//         greeting = line;
//         continue;
//       }

//       if (lower.includes("strengths")) {
//         currentSection = "strengths";
//         continue;
//       }

//       if (lower.includes("improvements")) {
//         currentSection = "improvements";
//         continue;
//       }

//       if (lower.includes("next actions")) {
//         currentSection = "nextActions";
//         continue;
//       }

//       const cleanLine = line.replace(/^[-•]\s*/, "").trim();
//       if (!cleanLine) continue;

//       if (currentSection === "strengths") strengths.push(cleanLine);
//       if (currentSection === "improvements") improvements.push(cleanLine);
//       if (currentSection === "nextActions") nextActions.push(cleanLine);
//     }

//     return {
//       greeting,
//       strengths,
//       improvements,
//       nextActions,
//       raw: aiResult,
//     };
//   }, [aiResult]);

//   const SectionCard = ({ icon, title, items, glow, iconBg, tickColor }) => (
//     <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
//       <div
//         className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl ${glow}`}
//       />
//       <div className="relative">
//         <div className="mb-4 flex items-center gap-3">
//           <div
//             className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 ${iconBg}`}
//           >
//             {icon}
//           </div>
//           <div>
//             <h4 className="text-sm sm:text-base font-semibold text-white">
//               {title}
//             </h4>
//             <p className="text-xs text-gray-400">AI generated summary</p>
//           </div>
//         </div>

//         <div className="space-y-3">
//           {items?.length > 0 ? (
//             items.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-start gap-3 rounded-2xl border border-white/6 bg-black/20 px-3 py-3"
//               >
//                 <CheckCircle2
//                   size={16}
//                   className={`mt-0.5 shrink-0 ${tickColor}`}
//                 />
//                 <p className="text-sm sm:text-[15px] leading-6 text-gray-200">
//                   {item}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 px-3 py-4 text-sm text-gray-500">
//               No insights available yet.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <button
//         onClick={() => setOpen(true)}
//         className="group relative overflow-hidden rounded-full border border-[#26F2D0]/30 bg-white/[0.04] px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-[#26F2D0]/50 hover:bg-[#26F2D0]/10 hover:shadow-[0_0_30px_rgba(38,242,208,0.18)] active:scale-[0.98] min-h-[44px]"
//       >
//         <span className="absolute inset-0 bg-gradient-to-r from-[#26F2D0]/10 via-transparent to-[#5DADE2]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//         <span className="relative flex items-center gap-2">
//           <Sparkles size={16} className="text-[#26F2D0]" />
//           Get AI Insights
//         </span>
//       </button>

//       {open && (
//         <div className="fixed inset-0 z-50">
//           <div
//             className="absolute inset-0 bg-black/70 backdrop-blur-md"
//             onClick={() => setOpen(false)}
//           />

//           <div className="absolute inset-0 flex items-end sm:items-center justify-center sm:p-4">
//             <div
//               role="dialog"
//               aria-modal="true"
//               aria-labelledby="ai-advisor-title"
//               className="relative z-10 flex h-[90vh] w-full flex-col overflow-hidden rounded-t-[28px] border border-white/10 bg-[#111315]/95 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:h-auto sm:max-h-[88vh] sm:max-w-3xl sm:rounded-[28px]"
//             >
//               <div className="pointer-events-none absolute inset-0">
//                 <div className="absolute -top-16 left-4 sm:left-8 h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-[#26F2D0]/10 blur-3xl" />
//                 <div className="absolute top-10 right-6 sm:right-10 h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-[#5DADE2]/10 blur-3xl" />
//               </div>

//               <div className="relative pt-3 sm:hidden flex justify-center">
//                 <div className="h-1.5 w-14 rounded-full bg-white/15" />
//               </div>

//               <div className="relative shrink-0 border-b border-white/10 px-4 sm:px-6 pt-3 sm:pt-5 pb-4">
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="min-w-0 flex-1">
//                     <div className="mb-3 flex flex-wrap items-center gap-2">
//                       <span className="inline-flex items-center gap-1 rounded-full border border-[#26F2D0]/20 bg-[#26F2D0]/10 px-3 py-1 text-[10px] sm:text-xs font-medium text-[#89f8e7]">
//                         <BrainCircuit size={13} />
//                         Personalized Advisor
//                       </span>

//                       <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] sm:text-xs text-gray-300">
//                         <ShieldCheck size={12} />
//                         Private Insights
//                       </span>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#26F2D0]/20 to-[#5DADE2]/20 shrink-0">
//                         <Sparkles size={18} className="text-[#26F2D0]" />
//                       </div>

//                       <div className="min-w-0">
//                         <h3
//                           id="ai-advisor-title"
//                           className="text-base sm:text-2xl font-semibold tracking-tight text-white"
//                         >
//                           AI Advisor
//                         </h3>
//                         <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
//                           Smart insights based on your campus activity
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => setOpen(false)}
//                     aria-label="Close AI advisor"
//                     className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-400 transition hover:bg-white/[0.08] hover:text-white shrink-0"
//                   >
//                     <X size={18} />
//                   </button>
//                 </div>
//               </div>

//               <div className="relative flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5">
//                 {!aiResult && !errorMsg && !aiLoading && (
//                   <div className="rounded-3xl border border-[#26F2D0]/15 bg-gradient-to-br from-[#26F2D0]/[0.06] to-transparent p-5 sm:p-6">
//                     <p className="text-sm sm:text-[15px] leading-7 text-gray-200">
//                       Generate your AI advisor report to view
//                       <span className="text-[#26F2D0] font-medium"> strengths</span>,
//                       <span className="text-[#5DADE2] font-medium"> improvements</span>, and
//                       <span className="text-[#F4A261] font-medium"> next actions</span>
//                       in a structured app-style layout.
//                     </p>
//                   </div>
//                 )}

//                 {aiLoading && (
//                   <div className="space-y-4">
//                     <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
//                       <div className="mb-5 flex items-center gap-3">
//                         <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#26F2D0]/20 bg-[#26F2D0]/10">
//                           <Sparkles className="animate-pulse text-[#26F2D0]" size={18} />
//                         </div>
//                         <div>
//                           <p className="text-sm sm:text-base font-medium text-white">
//                             Building your advisor report...
//                           </p>
//                           <p className="text-xs sm:text-sm text-gray-400">
//                             Converting activity into actionable insights
//                           </p>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//                         {[1, 2, 3].map((item) => (
//                           <div
//                             key={item}
//                             className="rounded-3xl border border-white/10 bg-black/20 p-4"
//                           >
//                             <div className="mb-4 h-10 w-10 rounded-2xl bg-white/10 animate-pulse" />
//                             <div className="space-y-3">
//                               <div className="h-4 w-24 rounded-full bg-white/10 animate-pulse" />
//                               <div className="h-4 w-full rounded-full bg-white/10 animate-pulse" />
//                               <div className="h-4 w-4/5 rounded-full bg-white/10 animate-pulse" />
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {errorMsg && !aiLoading && (
//                   <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-500/10 to-red-500/5 p-4 sm:p-5">
//                     <div className="flex items-start gap-3">
//                       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10">
//                         {errorMsg.toLowerCase().includes("wait") ? (
//                           <Clock3 size={18} className="text-amber-300" />
//                         ) : (
//                           <AlertTriangle size={18} className="text-amber-300" />
//                         )}
//                       </div>

//                       <div className="min-w-0">
//                         <h4 className="text-sm sm:text-base font-semibold text-white">
//                           Unable to generate right now
//                         </h4>
//                         <p className="mt-1 text-sm sm:text-[15px] leading-6 text-amber-100/90 break-words">
//                           {errorMsg}
//                         </p>

//                         {errorMsg.toLowerCase().includes("wait") && (
//                           <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-black/20 px-3 py-1 text-xs sm:text-sm text-amber-200">
//                             <Hourglass size={14} />
//                             Please try again after 5 minutes
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {parsedResult && !aiLoading && !errorMsg && (
//                   <div className="space-y-4">
//                     {parsedResult.greeting && (
//                       <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#26F2D0]/10 via-white/[0.04] to-[#5DADE2]/10 p-4 sm:p-5">
//                         <p className="text-base sm:text-lg font-semibold text-white">
//                           {parsedResult.greeting}
//                         </p>
//                         <p className="mt-1 text-sm text-gray-400">
//                           Here is your personalized campus snapshot.
//                         </p>
//                       </div>
//                     )}

//                     <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
//                       <SectionCard
//                         title="Strengths"
//                         items={parsedResult.strengths}
//                         glow="bg-[#26F2D0]/10"
//                         iconBg="bg-[#26F2D0]/10"
//                         tickColor="text-[#26F2D0]"
//                         icon={<TrendingUp size={18} className="text-[#26F2D0]" />}
//                       />

//                       <SectionCard
//                         title="Improvements"
//                         items={parsedResult.improvements}
//                         glow="bg-[#5DADE2]/10"
//                         iconBg="bg-[#5DADE2]/10"
//                         tickColor="text-[#5DADE2]"
//                         icon={<Target size={18} className="text-[#5DADE2]" />}
//                       />

//                       <SectionCard
//                         title="Next Actions"
//                         items={parsedResult.nextActions}
//                         glow="bg-[#F4A261]/10"
//                         iconBg="bg-[#F4A261]/10"
//                         tickColor="text-[#F4A261]"
//                         icon={<Rocket size={18} className="text-[#F4A261]" />}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="relative shrink-0 border-t border-white/10 bg-white/[0.02] px-4 sm:px-6 py-4">
//                 <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                   <p className="text-xs sm:text-sm text-gray-400 leading-6">
//                     Advice is generated from your current ideas and clubs only.
//                   </p>

//                   <button
//                     onClick={handleAIAdvisor}
//                     disabled={aiLoading}
//                     className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#26F2D0] to-[#5DD6E2] px-5 py-3 text-sm font-semibold text-[#041310] shadow-[0_10px_30px_rgba(38,242,208,0.25)] transition-all duration-300 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
//                   >
//                     <Sparkles size={16} />
//                     {aiLoading
//                       ? "Analyzing..."
//                       : parsedResult || errorMsg
//                       ? "Generate Again"
//                       : "Get Insights"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default HomeAIAdvisor;

import ai from "/Public/ai.png";
import { useEffect, useMemo, useState, useRef } from "react";
import {
  Sparkles, X, BrainCircuit, ShieldCheck,
  Zap, Target, Flame, AlertTriangle, Clock3,
  Hourglass, RefreshCw, Star
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   Parse the backend response into sections
───────────────────────────────────────────────────────── */
function parseResponse(raw) {
  if (!raw) return null;

  const lines = raw.split("\n").map(l => l.trim()).filter(Boolean);

  let greeting      = "";
  let vibeText      = "";
  let vibeScore     = null;
  let crushing      = [];
  let levelUp       = [];
  let nextMoves     = [];
  let section       = "";

  for (const line of lines) {
    const low = line.toLowerCase();

    // greeting
    if (low.startsWith("hey ") || low.startsWith("hi ")) {
      greeting = line; continue;
    }
    // sections
    if (low.includes("vibe check"))    { section = "vibe";    continue; }
    if (low.includes("crushing"))      { section = "crush";   continue; }
    if (low.includes("level up"))      { section = "level";   continue; }
    if (low.includes("next moves"))    { section = "next";    continue; }

    // vibe score line e.g. "Score: 7/10"
    if (section === "vibe" && low.startsWith("score:")) {
      const match = line.match(/(\d+)\s*\/\s*10/);
      if (match) vibeScore = parseInt(match[1]);
      continue;
    }

    const clean = line.replace(/^[-•*]\s*/, "").trim();
    if (!clean) continue;

    if (section === "vibe")  { vibeText += (vibeText ? " " : "") + clean; continue; }
    if (section === "crush") { crushing.push(clean);  continue; }
    if (section === "level") { levelUp.push(clean);   continue; }
    if (section === "next")  { nextMoves.push(clean); continue; }
  }

  return { greeting, vibeText, vibeScore, crushing, levelUp, nextMoves, raw };
}

/* ─────────────────────────────────────────────────────────
   Vibe Score Ring (SVG circle progress)
───────────────────────────────────────────────────────── */
function VibeRing({ score }) {
  const r   = 34;
  const circ = 2 * Math.PI * r;
  const pct  = score != null ? score / 10 : 0;
  const dash = pct * circ;

  const color = score >= 8 ? "#26F2D0"
              : score >= 5 ? "#F4A261"
              : "#ef4444";

  const label = score >= 8 ? "Goated 🔥"
              : score >= 6 ? "Solid 💪"
              : score >= 4 ? "Mid (fix it) 😅"
              : "Gotta start somewhere 🫡";

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
      <svg width="88" height="88" viewBox="0 0 88 88">
        {/* track */}
        <circle cx="44" cy="44" r={r}
          fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7"/>
        {/* progress */}
        <circle cx="44" cy="44" r={r}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          strokeDashoffset={circ / 4}   /* start at top */
          style={{ transition: "stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1)" }}
        />
        {/* score text */}
        <text x="44" y="44" textAnchor="middle" dominantBaseline="central"
          fill={color} fontSize="18" fontWeight="800" fontFamily="inherit">
          {score ?? "—"}
        </text>
        <text x="44" y="59" textAnchor="middle" dominantBaseline="central"
          fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="inherit">
          /10
        </text>
      </svg>
      <span style={{ fontSize:11, color, fontWeight:700, letterSpacing:"0.04em" }}>
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Section card
───────────────────────────────────────────────────────── */
function SectionCard({ emoji, title, items, accent, delay = 0 }) {
  return (
    <div style={{
      background:   `linear-gradient(135deg, ${accent}10 0%, rgba(255,255,255,0.02) 100%)`,
      border:       `1px solid ${accent}25`,
      borderRadius: 20,
      padding:      "18px 16px",
      animation:    `cardIn 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms both`,
    }}>
      {/* header */}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
        <div style={{
          width:38, height:38, borderRadius:12, flexShrink:0,
          background:   `${accent}18`,
          border:       `1px solid ${accent}30`,
          display:      "flex", alignItems:"center", justifyContent:"center",
          fontSize:18,
        }}>
          {emoji}
        </div>
        <div>
          <p style={{ margin:0, fontSize:13, fontWeight:800, color:"#f9fafb", letterSpacing:"0.01em" }}>
            {title}
          </p>
          <p style={{ margin:0, fontSize:10, color:"rgba(255,255,255,0.3)" }}>AI generated</p>
        </div>
      </div>

      {/* items */}
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {items?.length > 0 ? items.map((item, i) => (
          <div key={i} style={{
            display:      "flex",
            alignItems:   "flex-start",
            gap:          10,
            background:   "rgba(0,0,0,0.25)",
            borderRadius: 12,
            padding:      "10px 12px",
            border:       "1px solid rgba(255,255,255,0.05)",
            animation:    `itemIn 0.4s ease ${delay + i * 80}ms both`,
          }}>
            <span style={{
              flexShrink:0, marginTop:1,
              width:16, height:16, borderRadius:"50%",
              background:`${accent}20`, border:`1px solid ${accent}40`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:8, color:accent, fontWeight:900,
            }}>✓</span>
            <p style={{ margin:0, fontSize:12.5, color:"#d1d5db", lineHeight:1.65 }}>
              {item}
            </p>
          </div>
        )) : (
          <div style={{
            borderRadius:12, border:"1px dashed rgba(255,255,255,0.1)",
            padding:"12px", fontSize:12, color:"rgba(255,255,255,0.3)", textAlign:"center",
          }}>
            Nothing here yet — get active!
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Countdown timer for rate limit
───────────────────────────────────────────────────────── */
function useCountdown(targetMs) {
  const [remaining, setRemaining] = useState(0);
  useEffect(() => {
    if (!targetMs) return;
    const tick = () => setRemaining(Math.max(0, targetMs - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetMs]);
  const m = Math.floor(remaining / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  return remaining > 0 ? `${m}m ${s}s` : null;
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
const HomeAIAdvisor = ({ token }) => {
  const [loading,    setLoading]    = useState(false);
  const [result,     setResult]     = useState(null);
  const [errorMsg,   setErrorMsg]   = useState("");
  const [open,       setOpen]       = useState(false);
  const [rateLimitAt, setRateLimitAt] = useState(null);  // timestamp when limit expires

  const countdown = useCountdown(rateLimitAt);

  const fetch5Min = async () => {
    if (!token) {
      setErrorMsg("Log in first to unlock your AI insights 🔐");
      return;
    }
    setLoading(true);
    setResult(null);
    setErrorMsg("");

    try {
      const res  = await fetch("http://localhost:8081/api/ai/advisor", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.text();

      if (!res.ok) {
        // backend sends "RATE_LIMIT:4m 32s"
        if (data.startsWith("RATE_LIMIT:")) {
          setRateLimitAt(Date.now() + 300_000); // reset 5-min countdown on frontend too
          setErrorMsg("RATE_LIMIT");
        } else {
          setErrorMsg(data || "Something went wrong. Try again.");
        }
        return;
      }
      setResult(parseResponse(data));
    } catch {
      setErrorMsg("Can't reach the server rn. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // ESC + body scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const isRateLimit = errorMsg === "RATE_LIMIT";

  return (
    <>
      <style>{`
        @keyframes cardIn {
          from { opacity:0; transform:translateY(18px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes itemIn {
          from { opacity:0; transform:translateX(-8px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes pulseRing {
          0%,100% { box-shadow: 0 0 0 0 rgba(38,242,208,0.4); }
          50%     { box-shadow: 0 0 0 8px rgba(38,242,208,0); }
        }
        @keyframes shimmer {
          from { background-position: -200% 0; }
          to   { background-position:  200% 0; }
        }
        .ai-btn-pulse { animation: pulseRing 2.5s ease-in-out infinite; }
        .skeleton {
          background: linear-gradient(90deg,
            rgba(255,255,255,0.05) 25%,
            rgba(255,255,255,0.12) 50%,
            rgba(255,255,255,0.05) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s ease-in-out infinite;
          border-radius: 10px;
        }
      `}</style>

      {/* ── Trigger button ── */}
      <button
        onClick={() => setOpen(true)}
        className="ai-btn-pulse"
        style={{
          position:     "relative",
          overflow:     "hidden",
          borderRadius: 999,
          border:       "1px solid rgba(38,242,208,0.35)",
          background:   "rgba(38,242,208,0.06)",
          backdropFilter: "blur(12px)",
          padding:      "12px 24px",
          fontSize:     14,
          fontWeight:   700,
          color:        "#fff",
          cursor:       "pointer",
          display:      "flex",
          alignItems:   "center",
          gap:          8,
          transition:   "all 0.25s ease",
          minHeight:    48,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background   = "rgba(38,242,208,0.14)";
          e.currentTarget.style.borderColor  = "rgba(38,242,208,0.6)";
          e.currentTarget.style.transform    = "scale(1.03)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background   = "rgba(38,242,208,0.06)";
          e.currentTarget.style.borderColor  = "rgba(38,242,208,0.35)";
          e.currentTarget.style.transform    = "scale(1)";
        }}
      >
        AI Insights   <img
    src="/ai.png"
    alt="sparkle"
    style={{
      width: 18,
      height: 18,
      objectFit: "contain",
    }}
  />
        <span style={{
          position:     "absolute", inset:0,
          background:   "linear-gradient(90deg,transparent,rgba(38,242,208,0.08),transparent)",
          pointerEvents:"none",
        }}/>
      </button>

      {/* ── Modal ── */}
      {open && (
        <div style={{
          position:"fixed", inset:0, zIndex:9999,
          display:"flex", alignItems:"center",justifyContent:"center",padding:  "80px 16px 16px",
        }}>
          {/* backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position:"absolute", inset:0,
              background:"rgba(0,0,0,0.75)",
              backdropFilter:"blur(10px)",
            }}
          />

          {/* sheet */}
          <div
            role="dialog" aria-modal="true"
            style={{
              position:     "relative",
              zIndex:       1,
              width:        "min(100vw - 40px, 740px)", 
              maxWidth:     "90vw",
              margin:       "0 auto",
              maxHeight:    "88vh",
              display:      "flex",
              flexDirection:"column",
              borderRadius: 24,
              background:   "#0e0f11",
              border:       "1px solid rgba(255,255,255,0.1)",
            //   borderBottom: "none",
              overflow:     "hidden",
              animation:    "cardIn 0.4s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* ambient glows */}
            <div style={{
              position:"absolute", top:-60, left:20,
              width:180, height:180, borderRadius:"50%",
              background:"rgba(38,242,208,0.08)", filter:"blur(50px)",
              pointerEvents:"none",
            }}/>
            <div style={{
              position:"absolute", top:30, right:20,
              width:140, height:140, borderRadius:"50%",
              background:"rgba(93,173,226,0.08)", filter:"blur(50px)",
              pointerEvents:"none",
            }}/>

            {/* drag handle */}
            <div style={{
              display:"flex", justifyContent:"center",
              paddingTop:10, paddingBottom:4, flexShrink:0,
            }}>
              <div style={{
                width:40, height:4, borderRadius:999,
                background:"rgba(255,255,255,0.15)",
              }}/>
            </div>

            {/* ── HEADER ── */}
            <div style={{
              padding:       "12px 20px 16px",
              borderBottom:  "1px solid rgba(255,255,255,0.08)",
              flexShrink:    0,
              display:       "flex",
              alignItems:    "flex-start",
              justifyContent:"space-between",
              gap:           12,
            }}>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {/* pills */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  <span style={{
                    display:"flex", alignItems:"center", gap:4,
                    fontSize:10, fontWeight:700,
                    padding:"3px 10px", borderRadius:999,
                    background:"rgba(38,242,208,0.1)",
                    border:"1px solid rgba(38,242,208,0.2)",
                    color:"#89f8e7",
                  }}>
                    <BrainCircuit size={11}/> Personalized
                  </span>
                  <span style={{
                    display:"flex", alignItems:"center", gap:4,
                    fontSize:10, fontWeight:700,
                    padding:"3px 10px", borderRadius:999,
                    background:"rgba(255,255,255,0.05)",
                    border:"1px solid rgba(255,255,255,0.1)",
                    color:"rgba(255,255,255,0.5)",
                  }}>
                    <ShieldCheck size={11}/> Private
                  </span>
                  <span style={{
                    display:"flex", alignItems:"center", gap:4,
                    fontSize:10, fontWeight:700,
                    padding:"3px 10px", borderRadius:999,
                    background:"rgba(244,162,97,0.1)",
                    border:"1px solid rgba(244,162,97,0.25)",
                    color:"#f4a261",
                  }}>
                    <Clock3 size={11}/> 5 min cooldown
                  </span>
                </div>

                {/* title */}
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{
                    width:42, height:42, borderRadius:14, flexShrink:0,
                    background:"linear-gradient(135deg,rgba(38,242,208,0.2),rgba(93,173,226,0.2))",
                    border:"1px solid rgba(255,255,255,0.1)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}>
                    <Sparkles size={20} style={{ color:"#26F2D0" }}/>
                  </div>
                  <div>
                    <p style={{ margin:0, fontSize:18, fontWeight:900, color:"#f9fafb" }}>
                      Campus AI ✨
                    </p>
                    <p style={{ margin:0, fontSize:11, color:"rgba(255,255,255,0.35)" }}>
                      real talk · campus-only insights
                    </p>
                  </div>
                </div>
              </div>

              {/* close */}
              <button
                onClick={() => setOpen(false)}
                style={{
                  width:36, height:36, borderRadius:"50%", flexShrink:0,
                  background:"rgba(255,255,255,0.05)",
                  border:"1px solid rgba(255,255,255,0.1)",
                  color:"rgba(255,255,255,0.5)",
                  cursor:"pointer", display:"flex",
                  alignItems:"center", justifyContent:"center",
                  transition:"all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.1)"; e.currentTarget.style.color="#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.color="rgba(255,255,255,0.5)"; }}
              >
                <X size={16}/>
              </button>
            </div>

            {/* ── BODY ── */}
            <div style={{
              flex:1, overflowY:"auto", overflowX:"hidden",
              padding:"16px 16px",
              display:"flex", flexDirection:"column", gap:14,
            }}>

              {/* idle state */}
              {!result && !errorMsg && !loading && (
                <div style={{
                  borderRadius:20,
                  background:"linear-gradient(135deg,rgba(38,242,208,0.06),rgba(93,173,226,0.04))",
                  border:"1px solid rgba(38,242,208,0.15)",
                  padding:"20px 18px",
                }}>
                  <p style={{ margin:"0 0 6px", fontSize:15, fontWeight:800, color:"#f9fafb" }}>
                    Get your campus vibe check 🎯
                  </p>
                  <p style={{ margin:0, fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.7 }}>
                    AI will analyse your{" "}
                    <span style={{ color:"#26F2D0", fontWeight:700 }}>ideas</span>,{" "}
                    <span style={{ color:"#5DADE2", fontWeight:700 }}>clubs</span>, and{" "}
                    <span style={{ color:"#F4A261", fontWeight:700 }}>activity</span>{" "}
                    to drop a personalised report. Hits different every time.
                  </p>
                  <div style={{
                    marginTop:14, display:"flex", flexWrap:"wrap", gap:8,
                  }}>
                    {["🔥 Vibe Score", "💡 What you're crushing", "⚡ Next moves"].map(t => (
                      <span key={t} style={{
                        fontSize:11, fontWeight:600,
                        padding:"4px 10px", borderRadius:999,
                        background:"rgba(255,255,255,0.05)",
                        border:"1px solid rgba(255,255,255,0.1)",
                        color:"rgba(255,255,255,0.5)",
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* loading skeletons */}
              {loading && (
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10,
                    padding:"14px 16px", borderRadius:16,
                    background:"rgba(38,242,208,0.05)",
                    border:"1px solid rgba(38,242,208,0.12)" }}>
                    <Sparkles size={18} style={{ color:"#26F2D0", animation:"spin 1s linear infinite" }}/>
                    <div>
                      <p style={{ margin:"0 0 2px", fontSize:13, fontWeight:700, color:"#f9fafb" }}>
                        Cooking your vibe check...
                      </p>
                      <p style={{ margin:0, fontSize:11, color:"rgba(255,255,255,0.35)" }}>
                        AI is reading your campus energy
                      </p>
                    </div>
                  </div>
                  {[0,1,2].map(i => (
                    <div key={i} style={{
                      borderRadius:20, padding:16,
                      background:"rgba(255,255,255,0.02)",
                      border:"1px solid rgba(255,255,255,0.07)",
                    }}>
                      <div style={{ display:"flex", gap:10, marginBottom:12 }}>
                        <div className="skeleton" style={{ width:38, height:38, borderRadius:12, flexShrink:0 }}/>
                        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:6 }}>
                          <div className="skeleton" style={{ height:12, width:"50%" }}/>
                          <div className="skeleton" style={{ height:10, width:"30%" }}/>
                        </div>
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                        {[1,2].map(j => <div key={j} className="skeleton" style={{ height:36 }}/>)}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* rate limit error */}
              {isRateLimit && !loading && (
                <div style={{
                  borderRadius:20, padding:"20px 18px",
                  background:"linear-gradient(135deg,rgba(244,162,97,0.08),rgba(239,68,68,0.05))",
                  border:"1px solid rgba(244,162,97,0.2)",
                  display:"flex", alignItems:"flex-start", gap:14,
                }}>
                  <div style={{
                    width:44, height:44, borderRadius:14, flexShrink:0,
                    background:"rgba(244,162,97,0.12)",
                    border:"1px solid rgba(244,162,97,0.25)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}>
                    <Hourglass size={20} style={{ color:"#f4a261" }}/>
                  </div>
                  <div>
                    <p style={{ margin:"0 0 4px", fontSize:14, fontWeight:800, color:"#f9fafb" }}>
                      Chill for a sec ⏳
                    </p>
                    <p style={{ margin:"0 0 10px", fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.6 }}>
                      AI advice is capped to once every 5 minutes — keeps it meaningful, not spammy.
                    </p>
                    {countdown && (
                      <span style={{
                        display:"inline-flex", alignItems:"center", gap:6,
                        fontSize:12, fontWeight:700,
                        padding:"5px 12px", borderRadius:999,
                        background:"rgba(244,162,97,0.1)",
                        border:"1px solid rgba(244,162,97,0.25)",
                        color:"#f4a261",
                      }}>
                        <Clock3 size={12}/> Try again in {countdown}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* generic error */}
              {errorMsg && !isRateLimit && !loading && (
                <div style={{
                  borderRadius:20, padding:"18px 16px",
                  background:"rgba(239,68,68,0.07)",
                  border:"1px solid rgba(239,68,68,0.2)",
                  display:"flex", alignItems:"flex-start", gap:12,
                }}>
                  <AlertTriangle size={18} style={{ color:"#f87171", flexShrink:0, marginTop:2 }}/>
                  <p style={{ margin:0, fontSize:13, color:"#fca5a5", lineHeight:1.6 }}>{errorMsg}</p>
                </div>
              )}

              {/* ── RESULT ── */}
              {result && !loading && (
                <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

                  {/* greeting + vibe ring row */}
                  <div style={{
                    display:"flex", alignItems:"center",
                    gap:16, flexWrap:"wrap",
                    borderRadius:20, padding:"18px 16px",
                    background:"linear-gradient(135deg,rgba(38,242,208,0.08),rgba(93,173,226,0.05))",
                    border:"1px solid rgba(38,242,208,0.18)",
                    animation:"cardIn 0.4s cubic-bezier(0.22,1,0.36,1)",
                  }}>
                    <VibeRing score={result.vibeScore}/>
                    <div style={{ flex:1, minWidth:180 }}>
                      <p style={{ margin:"0 0 4px", fontSize:17, fontWeight:900, color:"#f9fafb" }}>
                        {result.greeting || "Hey there 👋"}
                      </p>
                      {result.vibeText && (
                        <p style={{ margin:0, fontSize:13, color:"rgba(255,255,255,0.55)", lineHeight:1.65 }}>
                          {result.vibeText}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* three section cards */}
                  <SectionCard
                    emoji="🔥"
                    title="What You're Crushing"
                    items={result.crushing}
                    accent="#26F2D0"
                    delay={0}
                  />
                  <SectionCard
                    emoji="💡"
                    title="Room to Level Up"
                    items={result.levelUp}
                    accent="#5DADE2"
                    delay={80}
                  />
                  <SectionCard
                    emoji="⚡"
                    title="Your Next Moves"
                    items={result.nextMoves}
                    accent="#F4A261"
                    delay={160}
                  />

                  {/* disclaimer */}
                  <p style={{
                    textAlign:"center", fontSize:10,
                    color:"rgba(255,255,255,0.2)", lineHeight:1.6,
                  }}>
                    Based only on your campus ideas & clubs · Not stored anywhere 🔒
                  </p>
                </div>
              )}
            </div>

            {/* ── FOOTER ── */}
            <div style={{
              padding:       "14px 16px",
              borderTop:     "1px solid rgba(255,255,255,0.08)",
              background:    "rgba(255,255,255,0.01)",
              flexShrink:    0,
              display:       "flex",
              alignItems:    "center",
              justifyContent:"space-between",
              gap:           10,
              flexWrap:      "wrap",
            }}>
              <p style={{ margin:0, fontSize:11, color:"rgba(255,255,255,0.28)" }}>
                {countdown
                  ? `Next insight in ${countdown}`
                  : "AI reads your ideas + clubs only"}
              </p>

              <button
                onClick={fetch5Min}
                disabled={loading || !!countdown}
                style={{
                  display:      "flex",
                  alignItems:   "center",
                  gap:          7,
                  padding:      "11px 22px",
                  borderRadius: 14,
                  fontSize:     13,
                  fontWeight:   800,
                  cursor:       loading || countdown ? "not-allowed" : "pointer",
                  opacity:      loading || countdown ? 0.45 : 1,
                  background:   "linear-gradient(135deg,#26F2D0,#5DADE2)",
                  color:        "#041310",
                  border:       "none",
                  transition:   "all 0.2s",
                  boxShadow:    "0 8px 24px rgba(38,242,208,0.25)",
                  minHeight:    46,
                  whiteSpace:   "nowrap",
                }}
                onMouseEnter={e => { if (!loading && !countdown) e.currentTarget.style.filter="brightness(1.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.filter="none"; }}
              >
                {loading
                  ? <><RefreshCw size={14} style={{ animation:"spin 1s linear infinite" }}/> Analyzing...</>
                  : result
                  ? <><RefreshCw size={14}/> Refresh</>
                  : <><Sparkles size={14}/> Get My Vibe Check</>
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeAIAdvisor;