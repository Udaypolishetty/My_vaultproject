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




import { useEffect, useMemo, useState } from "react";
import {
  Sparkles,
  X,
  BrainCircuit,
  ShieldCheck,
  TrendingUp,
  Target,
  Rocket,
  CheckCircle2,
  AlertTriangle,
  Clock3,
  Hourglass
} from "lucide-react";

const HomeAIAdvisor = ({ token }) => {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);

  const handleAIAdvisor = async () => {
    if (!token) {
      setAiResult(null);
      setErrorMsg("⚠️ Please log in first to view AI insights.");
      return;
    }

    setAiLoading(true);
    setAiResult(null);
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:8081/api/ai/advisor", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.text();

      if (!res.ok) {
        setAiResult(null);
        setErrorMsg(data || "⚠️ Unable to generate advice right now.");
        return;
      }

      setAiResult(data);
    } catch (err) {
      setAiResult(null);
      setErrorMsg("⚠️ Unable to fetch AI insights. Try again.");
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    const closeOnEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) {
      document.addEventListener("keydown", closeOnEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", closeOnEsc);
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const parsedResult = useMemo(() => {
    if (!aiResult) return null;

    const lines = aiResult
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    let greeting = "";
    let strengths = [];
    let improvements = [];
    let nextActions = [];
    let currentSection = "";

    for (const line of lines) {
      const lower = line.toLowerCase();

      if (lower.startsWith("hi ")) {
        greeting = line;
        continue;
      }

      if (lower.includes("strengths")) {
        currentSection = "strengths";
        continue;
      }

      if (lower.includes("improvements")) {
        currentSection = "improvements";
        continue;
      }

      if (lower.includes("next actions")) {
        currentSection = "nextActions";
        continue;
      }

      const cleanLine = line.replace(/^[-•]\s*/, "").trim();
      if (!cleanLine) continue;

      if (currentSection === "strengths") strengths.push(cleanLine);
      if (currentSection === "improvements") improvements.push(cleanLine);
      if (currentSection === "nextActions") nextActions.push(cleanLine);
    }

    return {
      greeting,
      strengths,
      improvements,
      nextActions,
      raw: aiResult,
    };
  }, [aiResult]);

  const SectionCard = ({ icon, title, items, glow, iconBg, tickColor }) => (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
      <div
        className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl ${glow}`}
      />
      <div className="relative">
        <div className="mb-4 flex items-center gap-3">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 ${iconBg}`}
          >
            {icon}
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-white">
              {title}
            </h4>
            <p className="text-xs text-gray-400">AI generated summary</p>
          </div>
        </div>

        <div className="space-y-3">
          {items?.length > 0 ? (
            items.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-2xl border border-white/6 bg-black/20 px-3 py-3"
              >
                <CheckCircle2
                  size={16}
                  className={`mt-0.5 shrink-0 ${tickColor}`}
                />
                <p className="text-sm sm:text-[15px] leading-6 text-gray-200">
                  {item}
                </p>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 px-3 py-4 text-sm text-gray-500">
              No insights available yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative overflow-hidden rounded-full border border-[#26F2D0]/30 bg-white/[0.04] px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-[#26F2D0]/50 hover:bg-[#26F2D0]/10 hover:shadow-[0_0_30px_rgba(38,242,208,0.18)] active:scale-[0.98] min-h-[44px]"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-[#26F2D0]/10 via-transparent to-[#5DADE2]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="relative flex items-center gap-2">
          <Sparkles size={16} className="text-[#26F2D0]" />
          Get AI Insights
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          <div className="absolute inset-0 flex items-end sm:items-center justify-center sm:p-4">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="ai-advisor-title"
              className="relative z-10 flex h-[90vh] w-full flex-col overflow-hidden rounded-t-[28px] border border-white/10 bg-[#111315]/95 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:h-auto sm:max-h-[88vh] sm:max-w-3xl sm:rounded-[28px]"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-16 left-4 sm:left-8 h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-[#26F2D0]/10 blur-3xl" />
                <div className="absolute top-10 right-6 sm:right-10 h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-[#5DADE2]/10 blur-3xl" />
              </div>

              <div className="relative pt-3 sm:hidden flex justify-center">
                <div className="h-1.5 w-14 rounded-full bg-white/15" />
              </div>

              <div className="relative shrink-0 border-b border-white/10 px-4 sm:px-6 pt-3 sm:pt-5 pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#26F2D0]/20 bg-[#26F2D0]/10 px-3 py-1 text-[10px] sm:text-xs font-medium text-[#89f8e7]">
                        <BrainCircuit size={13} />
                        Personalized Advisor
                      </span>

                      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] sm:text-xs text-gray-300">
                        <ShieldCheck size={12} />
                        Private Insights
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#26F2D0]/20 to-[#5DADE2]/20 shrink-0">
                        <Sparkles size={18} className="text-[#26F2D0]" />
                      </div>

                      <div className="min-w-0">
                        <h3
                          id="ai-advisor-title"
                          className="text-base sm:text-2xl font-semibold tracking-tight text-white"
                        >
                          AI Advisor
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                          Smart insights based on your campus activity
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close AI advisor"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-400 transition hover:bg-white/[0.08] hover:text-white shrink-0"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="relative flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5">
                {!aiResult && !errorMsg && !aiLoading && (
                  <div className="rounded-3xl border border-[#26F2D0]/15 bg-gradient-to-br from-[#26F2D0]/[0.06] to-transparent p-5 sm:p-6">
                    <p className="text-sm sm:text-[15px] leading-7 text-gray-200">
                      Generate your AI advisor report to view
                      <span className="text-[#26F2D0] font-medium"> strengths</span>,
                      <span className="text-[#5DADE2] font-medium"> improvements</span>, and
                      <span className="text-[#F4A261] font-medium"> next actions</span>
                      in a structured app-style layout.
                    </p>
                  </div>
                )}

                {aiLoading && (
                  <div className="space-y-4">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
                      <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#26F2D0]/20 bg-[#26F2D0]/10">
                          <Sparkles className="animate-pulse text-[#26F2D0]" size={18} />
                        </div>
                        <div>
                          <p className="text-sm sm:text-base font-medium text-white">
                            Building your advisor report...
                          </p>
                          <p className="text-xs sm:text-sm text-gray-400">
                            Converting activity into actionable insights
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                          <div
                            key={item}
                            className="rounded-3xl border border-white/10 bg-black/20 p-4"
                          >
                            <div className="mb-4 h-10 w-10 rounded-2xl bg-white/10 animate-pulse" />
                            <div className="space-y-3">
                              <div className="h-4 w-24 rounded-full bg-white/10 animate-pulse" />
                              <div className="h-4 w-full rounded-full bg-white/10 animate-pulse" />
                              <div className="h-4 w-4/5 rounded-full bg-white/10 animate-pulse" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {errorMsg && !aiLoading && (
                  <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-500/10 to-red-500/5 p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10">
                        {errorMsg.toLowerCase().includes("wait") ? (
                          <Clock3 size={18} className="text-amber-300" />
                        ) : (
                          <AlertTriangle size={18} className="text-amber-300" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-sm sm:text-base font-semibold text-white">
                          Unable to generate right now
                        </h4>
                        <p className="mt-1 text-sm sm:text-[15px] leading-6 text-amber-100/90 break-words">
                          {errorMsg}
                        </p>

                        {errorMsg.toLowerCase().includes("wait") && (
                          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-black/20 px-3 py-1 text-xs sm:text-sm text-amber-200">
                            <Hourglass size={14} />
                            Please try again after 5 minutes
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {parsedResult && !aiLoading && !errorMsg && (
                  <div className="space-y-4">
                    {parsedResult.greeting && (
                      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#26F2D0]/10 via-white/[0.04] to-[#5DADE2]/10 p-4 sm:p-5">
                        <p className="text-base sm:text-lg font-semibold text-white">
                          {parsedResult.greeting}
                        </p>
                        <p className="mt-1 text-sm text-gray-400">
                          Here is your personalized campus snapshot.
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                      <SectionCard
                        title="Strengths"
                        items={parsedResult.strengths}
                        glow="bg-[#26F2D0]/10"
                        iconBg="bg-[#26F2D0]/10"
                        tickColor="text-[#26F2D0]"
                        icon={<TrendingUp size={18} className="text-[#26F2D0]" />}
                      />

                      <SectionCard
                        title="Improvements"
                        items={parsedResult.improvements}
                        glow="bg-[#5DADE2]/10"
                        iconBg="bg-[#5DADE2]/10"
                        tickColor="text-[#5DADE2]"
                        icon={<Target size={18} className="text-[#5DADE2]" />}
                      />

                      <SectionCard
                        title="Next Actions"
                        items={parsedResult.nextActions}
                        glow="bg-[#F4A261]/10"
                        iconBg="bg-[#F4A261]/10"
                        tickColor="text-[#F4A261]"
                        icon={<Rocket size={18} className="text-[#F4A261]" />}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="relative shrink-0 border-t border-white/10 bg-white/[0.02] px-4 sm:px-6 py-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs sm:text-sm text-gray-400 leading-6">
                    Advice is generated from your current ideas and clubs only.
                  </p>

                  <button
                    onClick={handleAIAdvisor}
                    disabled={aiLoading}
                    className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#26F2D0] to-[#5DD6E2] px-5 py-3 text-sm font-semibold text-[#041310] shadow-[0_10px_30px_rgba(38,242,208,0.25)] transition-all duration-300 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Sparkles size={16} />
                    {aiLoading
                      ? "Analyzing..."
                      : parsedResult || errorMsg
                      ? "Generate Again"
                      : "Get Insights"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeAIAdvisor;