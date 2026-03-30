// import {FunnelPlus} from "lucide-react"
// const CATEGORIES = ["All", "Tech", "Academic", "Campus Pulse", "Cultural", "Others"];

// export default function IdeasFilters({ activeFilter, setActiveFilter }) {
//   return (
//     <div className="mt-6 flex flex-wrap items-center gap-2">
//       {CATEGORIES.map(cat => (
        
//         <button
        
//           key={cat}
//           onClick={() => setActiveFilter(cat)}
//           className={`px-4 py-2 rounded-full text-sm transition-all ${
//             activeFilter === cat
//               ? "bg-[#26F2D0] text-black"
//               : "bg-[#232323] text-gray-300 hover:bg-white/10"
//           }`}
//         >
//           {cat}
//         </button>
//       ))}
//     </div>
//   );
// }



// import { FunnelPlus } from "lucide-react";

// const CATEGORIES = ["All", "Tech", "Academic", "Campus Pulse", "Cultural", "Others"];

// export default function IdeasFilters({ activeFilter, setActiveFilter }) {
//   return (
//     <div className="mt-6 flex flex-wrap items-center gap-2">
      
//       {/* Funnel icon — leftmost element */}
//       <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#232323] text-gray-300">
//         <FunnelPlus size={16} />
//       </div>

//       {/* Optional divider */}
//       <div className="w-px h-5 bg-white/10" />

//       {CATEGORIES.map(cat => (
//         <button
//           key={cat}
//           onClick={() => setActiveFilter(cat)}
//           className={`px-4 py-2 rounded-full text-sm transition-all ${
//             activeFilter === cat
//               ? "bg-[#26F2D0] text-black"
//               : "bg-[#232323] text-gray-300 hover:bg-white/10"
//           }`}
//         >
//           {cat}
//         </button>
//       ))}
//     </div>
//   );
// }


import { FunnelPlus, Cpu, GraduationCap, Radio, Palette, Shapes } from "lucide-react";

const CATEGORIES = ["All", "Tech", "Academic", "Campus Pulse", "Cultural", "Others"];

const CATEGORY_META = {
  All: { active: "text-[#F5C15D]", glow: "from-[#F5C15D]/18 via-[#F5C15D]/10 to-transparent" },
  Tech: { icon: Cpu, active: "text-[#4DE2C5]", glow: "from-[#4DE2C5]/18 via-[#4DE2C5]/10 to-transparent" },
  Academic: { icon: GraduationCap, active: "text-[#7C9BFF]", glow: "from-[#7C9BFF]/18 via-[#7C9BFF]/10 to-transparent" },
  "Campus Pulse": { icon: Radio, active: "text-[#FF7A59]", glow: "from-[#FF7A59]/18 via-[#FF7A59]/10 to-transparent" },
  Cultural: { icon: Palette, active: "text-[#F58AD0]", glow: "from-[#F58AD0]/18 via-[#F58AD0]/10 to-transparent" },
  Others: { icon: Shapes, active: "text-[#B8C0CC]", glow: "from-[#B8C0CC]/16 via-[#B8C0CC]/8 to-transparent" },
};

export default function IdeasFilters({ activeFilter, setActiveFilter }) {
  return (
    <div className="mt-6">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="inline-flex min-w-max items-center gap-2 rounded-[26px]   bg-[#141414] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.28)]">
          
          <button
            type="button"
            aria-label="Open filters"
            className="group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px]  bg-[#1A1A1A] text-gray-400 transition-all duration-300 hover:text-white hover:border-white/15 active:scale-[0.97]"
          >
            {/* <span className="absolute inset-[1px] rounded-[17px] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]" /> */}
            <FunnelPlus size={16} className="relative z-10" />
          </button>

          <div className="flex items-center gap-1 rounded-[22px] bg-[#101010] p-1.5 border border-white/[0.06]">
            {CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat;
              const Icon = CATEGORY_META[cat]?.icon || Shapes;
              

              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`relative flex h-11 shrink-0 items-center gap-2 overflow-hidden rounded-[18px] px-4 text-sm font-medium whitespace-nowrap transition-all duration-300 active:scale-[0.98] ${
                    isActive
                      ? "text-white"
                      : "text-gray-500 hover:text-gray-200"
                  }`}
                >
                  {isActive && (
                    <>
                      <span
                        className={`absolute inset-0 rounded-[18px] bg-gradient-to-r ${CATEGORY_META[cat]?.glow}`}
                      />
                      <span className="absolute inset-0 rounded-[18px] bg-[#1B1B1B]" />
                      <span className="absolute inset-x-2 bottom-0 h-px bg-white/10" />
                      <span className="absolute inset-[1px] rounded-[17px] border border-white/8" />
                    </>
                  )}

                  <Icon
                    size={16}
                    className={`relative z-10 ${
                      isActive ? CATEGORY_META[cat]?.active : "text-gray-500"
                    }`}
                  />

                  <span
                    className={`relative z-10 ${
                      isActive ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}