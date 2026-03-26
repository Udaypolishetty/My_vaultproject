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


import { useState } from "react";
import { Sparkles, X } from "lucide-react";

const HomeAIAdvisor = ({ token }) => {

  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [open, setOpen] = useState(false);

  const handleAIAdvisor = async () => {
    setAiLoading(true);
    setAiResult(null);

    try {
      const res = await fetch("http://localhost:8081/api/ai/advisor", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.text();
      setAiResult(data);

    } catch (err) {
      setAiResult("⚠️ Unable to fetch AI insights. Try again.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <>
      {/* 🔥 BUTTON (ON HOME) */}
<button
  onClick={() => setOpen(true)}
  className="px-8 py-3 rounded-full
  bg-gradient-to-r from-[#26F2D0]/20 to-[#26F2D0]/5
  border border-[#26F2D0]/30
  text-[#26F2D0]
  hover:scale-105 hover:shadow-[0_0_20px_rgba(38,242,208,0.2)]
  transition-all font-medium"
>
  ✨ Get AI Insights
</button>
      {/* 🔥 MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          {/* MODAL BOX */}
          <div className="relative z-10 w-[90%] max-w-xl
            bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]
            border border-white/10 rounded-2xl p-6
            shadow-[0_0_40px_rgba(38,242,208,0.15)]
            animate-[scaleIn_0.2s_ease]">

            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>

            {/* HEADER */}
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} className="text-[#26F2D0]" />
              <h3 className="font-semibold text-white text-lg">AI Advisor</h3>
            </div>

            <p className="text-gray-400 text-sm mb-4">
              Personalized insights based on your activity
            </p>

            {/* BUTTON */}
            <button
              onClick={handleAIAdvisor}
              disabled={aiLoading}
              className="px-4 py-2 rounded-lg
              bg-[#26F2D0]/20 hover:bg-[#26F2D0]/30
              text-[#26F2D0] transition"
            >
              {aiLoading ? "Analyzing..." : "Get Insights"}
            </button>

            {/* RESULT */}
            {aiResult && (
              <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/10 text-sm text-gray-300 whitespace-pre-line">
                {aiResult}
              </div>
            )}

          </div>
        </div>
      )}

      {/* ANIMATION */}
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default HomeAIAdvisor;