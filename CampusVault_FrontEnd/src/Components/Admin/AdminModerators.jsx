// import { useState } from "react";

// export default function AdminModerators({ moderators, loading, onAssign, onRevoke }) {
//   const [modSearch, setModSearch] = useState("");
//   const [modSearchResult, setModSearchResult] = useState(null);
//   const [modSearching, setModSearching] = useState(false);

//   const token = sessionStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

//   const searchStudent = async () => {
//     if (!modSearch.trim()) return;
//     setModSearching(true);
//     try {
//       const res = await fetch("http://localhost:8081/api/admin/students", { headers });
//       const all = await res.json();
//       const found = all.find(s =>
//         s.rollNumber.toLowerCase() === modSearch.toLowerCase() ||
//         s.name.toLowerCase().includes(modSearch.toLowerCase())
//       );
//       setModSearchResult(found || null);
//     } finally {
//       setModSearching(false);
//     }
//   };

//   if (loading) return null;

//   return (
//     <div className="max-w-2xl">
//       <h2 className="text-xl font-bold mb-2">Moderator Management</h2>
//       <p className="text-gray-400 text-sm mb-6">
//         Assign CR/GR or Teachers as moderators. They can post news and upload resources.
//       </p>

//       {/* Search */}
//       <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 mb-6">
//         <h3 className="text-sm font-semibold text-[#26F2D0] mb-3">🔍 Assign New Moderator</h3>
//         <div className="flex gap-2">
//           <input
//             value={modSearch}
//             onChange={e => setModSearch(e.target.value)}
//             onKeyDown={e => e.key === "Enter" && searchStudent()}
//             placeholder="Search by roll number or name..."
//             className="flex-1 bg-[#111] border border-white/10 rounded-xl px-4 py-2.5
//                        text-sm text-white placeholder-gray-500 outline-none
//                        focus:border-[#26F2D0]/50 transition"
//           />
//           <button
//             onClick={searchStudent}
//             disabled={modSearching}
//             className="px-5 py-2.5 bg-[#26F2D0] text-black rounded-xl text-sm
//                        font-semibold hover:bg-[#1dd4b8] transition disabled:opacity-50"
//           >
//             {modSearching ? "..." : "Search"}
//           </button>
//         </div>

//         {modSearchResult && (
//           <div className="mt-4 flex items-center justify-between bg-white/5
//                           border border-white/10 rounded-xl px-4 py-3">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-xl bg-[#26F2D0]/10 border border-[#26F2D0]/20
//                               flex items-center justify-center text-[#26F2D0] font-bold">
//                 {modSearchResult.name?.[0]?.toUpperCase()}
//               </div>
//               <div>
//                 <p className="text-white font-medium text-sm">{modSearchResult.name}</p>
//                 <p className="text-gray-500 text-xs">
//                   {modSearchResult.rollNumber} · {modSearchResult.branch} · {modSearchResult.year}
//                 </p>
//               </div>
//             </div>
//             {modSearchResult.role === "MODERATOR" ? (
//               <span className="text-xs text-[#26F2D0] bg-[#26F2D0]/10 px-3 py-1 rounded-full">
//                 Already Moderator
//               </span>
//             ) : (
//               <button
//                 onClick={() => {
//                   onAssign(modSearchResult.rollNumber);
//                   setModSearchResult(null);
//                   setModSearch("");
//                 }}
//                 className="px-4 py-2 bg-[#26F2D0]/20 text-[#26F2D0] border border-[#26F2D0]/30
//                            rounded-xl text-xs font-semibold hover:bg-[#26F2D0]/30 transition"
//               >
//                 🛡️ Assign Moderator
//               </button>
//             )}
//           </div>
//         )}

//         {modSearchResult === null && modSearch && !modSearching && (
//           <p className="text-xs text-gray-500 mt-3">No student found for "{modSearch}"</p>
//         )}
//       </div>

//       {/* Moderators list */}
//       <div>
//         <h3 className="text-sm font-semibold text-gray-400 mb-3">
//           🛡️ Current Moderators ({moderators.length})
//         </h3>
//         {moderators.length === 0 ? (
//           <div className="text-center py-10 bg-[#1a1a1a] border border-white/10 rounded-2xl">
//             <p className="text-3xl mb-2">🛡️</p>
//             <p className="text-gray-400 text-sm">No moderators assigned yet</p>
//           </div>
//         ) : (
//           <div className="space-y-3">
//             {moderators.map(mod => (
//               <div key={mod.id}
//                 className="flex items-center justify-between bg-[#1a1a1a]
//                            border border-[#26F2D0]/20 rounded-2xl px-4 py-3">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-xl bg-[#26F2D0]/10 border border-[#26F2D0]/20
//                                   flex items-center justify-center text-[#26F2D0] font-bold">
//                     {mod.name?.[0]?.toUpperCase()}
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <p className="text-white font-medium text-sm">{mod.name}</p>
//                       <span className="text-xs bg-[#26F2D0]/10 text-[#26F2D0] px-2 py-0.5 rounded-full">
//                         🛡️ Moderator
//                       </span>
//                     </div>
//                     <p className="text-gray-500 text-xs">
//                       {mod.rollNumber} · {mod.branch} · {mod.year}
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => onRevoke(mod.rollNumber)}
//                   className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20
//                              rounded-xl text-xs font-semibold hover:bg-red-500/20 transition"
//                 >
//                   Revoke
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// import { useState } from "react";
// import { Search, Shield, UserMinus } from "lucide-react";

// export default function AdminModerators({ moderators, loading, onAssign, onRevoke }) {
//   const [modSearch, setModSearch] = useState("");
//   const [modSearchResult, setModSearchResult] = useState(null);
//   const [modSearching, setModSearching] = useState(false);
//   const [confirmRevoke, setConfirmRevoke] = useState(null);

//   const token = sessionStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

//   const searchStudent = async () => {
//     if (!modSearch.trim()) return;
//     setModSearching(true);
//     try {
//       const res = await fetch("http://localhost:8081/api/admin/students", { headers });
//       const all = await res.json();
//       const found = all.find(s =>
//         s.rollNumber.toLowerCase() === modSearch.toLowerCase() ||
//         s.name.toLowerCase().includes(modSearch.toLowerCase())
//       );
//       setModSearchResult(found || null);
//     } finally {
//       setModSearching(false);
//     }
//   };

//   if (loading) return null;

//   return (
//     <div className="max-w-2xl">
//       <h2 className="text-xl font-bold mb-2">Moderator Management</h2>
//       <p className="text-gray-400 text-sm mb-6">
//         Assign CR/GR or Teachers as moderators. They can post news and upload resources.
//       </p>

//       {/* Search */}
//       <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 mb-6">
//         <h3 className="flex items-center gap-2 text-sm font-semibold text-[#26F2D0] mb-3">
//           <Search size={14} /> Assign New Moderator
//         </h3>
//         <div className="flex gap-2">
//           <input
//             value={modSearch}
//             onChange={e => setModSearch(e.target.value)}
//             onKeyDown={e => e.key === "Enter" && searchStudent()}
//             placeholder="Search by roll number or name..."
//             className="flex-1 bg-[#111] border border-white/10 rounded-xl px-4 py-2.5
//                        text-sm text-white placeholder-gray-500 outline-none
//                        focus:border-[#26F2D0]/50 transition"
//           />
//           <button
//             onClick={searchStudent}
//             disabled={modSearching}
//             className="flex items-center gap-2 px-5 py-2.5 bg-[#26F2D0] text-black
//                        rounded-xl text-sm font-semibold hover:bg-[#1dd4b8]
//                        transition disabled:opacity-50"
//           >
//             <Search size={14} />
//             {modSearching ? "..." : "Search"}
//           </button>
//         </div>

//         {modSearchResult && (
//           <div className="mt-4 flex items-center justify-between bg-white/5
//                           border border-white/10 rounded-xl px-4 py-3">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-xl bg-[#26F2D0]/10 border border-[#26F2D0]/20
//                               flex items-center justify-center text-[#26F2D0] font-bold">
//                 {modSearchResult.name?.[0]?.toUpperCase()}
//               </div>
//               <div>
//                 <p className="text-white font-medium text-sm">{modSearchResult.name}</p>
//                 <p className="text-gray-500 text-xs">
//                   {modSearchResult.rollNumber} · {modSearchResult.branch} · {modSearchResult.year}
//                 </p>
//               </div>
//             </div>
//             {modSearchResult.role === "MODERATOR" ? (
//               <span className="flex items-center gap-1 text-xs text-[#26F2D0]
//                                bg-[#26F2D0]/10 px-3 py-1 rounded-full">
//                 <Shield size={10} /> Already Moderator
//               </span>
//             ) : (
//               <button
//                 onClick={() => {
//                   onAssign(modSearchResult.rollNumber);
//                   setModSearchResult(null);
//                   setModSearch("");
//                 }}
//                 className="flex items-center gap-1.5 px-4 py-2 bg-[#26F2D0]/20
//                            text-[#26F2D0] border border-[#26F2D0]/30 rounded-xl
//                            text-xs font-semibold hover:bg-[#26F2D0]/30 transition"
//               >
//                 <Shield size={12} /> Assign Moderator
//               </button>
//             )}
//           </div>
//         )}

//         {modSearchResult === null && modSearch && !modSearching && (
//           <p className="text-xs text-gray-500 mt-3">No student found for "{modSearch}"</p>
//         )}
//       </div>

//       {/* Moderators list */}
//       <div>
//         <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-3">
//           <Shield size={14} /> Current Moderators ({moderators.length})
//         </h3>
//         {moderators.length === 0 ? (
//           <div className="text-center py-10 bg-[#1a1a1a] border border-white/10 rounded-2xl">
//             <Shield size={32} className="mx-auto text-gray-600 mb-2" />
//             <p className="text-gray-400 text-sm">No moderators assigned yet</p>
//           </div>
//         ) : (
//           <div className="space-y-3">
//             {moderators.map(mod => (
//               <div key={mod.id}
//                 className="flex items-center justify-between bg-[#1a1a1a]
//                            border border-[#26F2D0]/20 rounded-2xl px-4 py-3">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-xl bg-[#26F2D0]/10 border border-[#26F2D0]/20
//                                   flex items-center justify-center text-[#26F2D0] font-bold">
//                     {mod.name?.[0]?.toUpperCase()}
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <p className="text-white font-medium text-sm">{mod.name}</p>
//                       <span className="flex items-center gap-1 text-xs bg-[#26F2D0]/10
//                                        text-[#26F2D0] px-2 py-0.5 rounded-full">
//                         <Shield size={10} /> Moderator
//                       </span>
//                     </div>
//                     <p className="text-gray-500 text-xs">
//                       {mod.rollNumber} · {mod.branch} · {mod.year}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Inline revoke confirmation */}
//                 {confirmRevoke === mod.rollNumber ? (
//                   <div className="flex items-center gap-1">
//                     <span className="text-xs text-gray-400">Sure?</span>
//                     <button
//                       onClick={() => { onRevoke(mod.rollNumber); setConfirmRevoke(null); }}
//                       className="text-xs text-red-400 hover:text-red-300 font-semibold
//                                  px-2 py-0.5 rounded-full bg-red-400/10 transition"
//                     >
//                       Yes
//                     </button>
//                     <button
//                       onClick={() => setConfirmRevoke(null)}
//                       className="text-xs text-gray-500 hover:text-white px-2 py-0.5
//                                  rounded-full bg-white/5 transition"
//                     >
//                       No
//                     </button>
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() => setConfirmRevoke(mod.rollNumber)}
//                     className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10
//                                text-red-400 border border-red-500/20 rounded-xl
//                                text-xs font-semibold hover:bg-red-500/20 transition"
//                   >
//                     <UserMinus size={12} /> Revoke
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { Search, Shield, UserMinus } from "lucide-react";

export default function AdminModerators({ moderators, loading, onAssign, onRevoke }) {
  const [modSearch, setModSearch] = useState("");
  const [modSearchResult, setModSearchResult] = useState(null);
  const [modSearching, setModSearching] = useState(false);
  const [confirmRevoke, setConfirmRevoke] = useState(null);

  const token = sessionStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  const searchStudent = async () => {
    if (!modSearch.trim()) return;
    setModSearching(true);
    try {
      const res = await fetch("http://localhost:8081/api/admin/students", { headers });
      const all = await res.json();
      const found = all.find(s =>
        s.rollNumber.toLowerCase() === modSearch.toLowerCase() ||
        s.name.toLowerCase().includes(modSearch.toLowerCase())
      );
      setModSearchResult(found || null);
    } finally {
      setModSearching(false);
    }
  };

  if (loading) return null;

  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="text-xl font-bold bg-gradient-to-r from-[#26F2D0] to-[#00d4ff] bg-clip-text text-transparent">
        🛡️ Moderator Management
      </h2>
      <p className="text-gray-400 text-sm leading-relaxed">
        Assign CR/GR or Teachers as moderators. They can post news and upload resources.
      </p>

      {/* Search */}
      <div className="bg-[#0f0f0f]/70 backdrop-blur-sm border border-white/10 rounded-xl p-5 shadow-lg">
        <h3 className="flex items-center gap-1.5 text-sm font-semibold text-[#26F2D0] mb-3">
          <Search size={14} /> Assign New Moderator
        </h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={modSearch}
            onChange={e => setModSearch(e.target.value)}
            onKeyDown={e => e.key === "Enter" && searchStudent()}
            placeholder="Search by roll number or name..."
            className="flex-1 bg-[#111]/80 border border-white/20 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-500 backdrop-blur-sm focus:border-[#26F2D0]/50 focus:ring-1 focus:ring-[#26F2D0]/30 transition-all"
          />
          <button
            onClick={searchStudent}
            disabled={modSearching}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#26F2D0] to-[#00d4ff] text-black rounded-xl text-sm font-semibold shadow-md hover:shadow-[#26F2D0]/30 hover:scale-[1.02] active:scale-95 focus:ring-2 focus:ring-[#26F2D0]/40 transition-all disabled:opacity-50 min-w-[80px]"
          >
            <Search size={14} className="w-4 h-4" />
            {modSearching ? "..." : "Search"}
          </button>
        </div>

        {modSearchResult && (
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 shadow-md">
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#26F2D0]/20 to-[#00d4ff]/20 border border-[#26F2D0]/30 flex items-center justify-center text-[#26F2D0] font-bold text-sm shadow-md">
                {modSearchResult.name?.[0]?.toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white font-medium text-sm truncate">{modSearchResult.name}</p>
                <p className="text-gray-500 text-xs truncate">
                  {modSearchResult.rollNumber} · {modSearchResult.branch} · {modSearchResult.year}
                </p>
              </div>
            </div>
            {modSearchResult.role === "MODERATOR" ? (
              <span className="flex items-center gap-1 text-xs bg-gradient-to-r from-[#26F2D0]/20 to-[#00d4ff]/20 text-[#26F2D0] px-3 py-1.5 rounded-full font-semibold border border-[#26F2D0]/30 shadow-sm whitespace-nowrap">
                <Shield size={11} /> Already Moderator
              </span>
            ) : (
              <button
                onClick={() => {
                  onAssign(modSearchResult.rollNumber);
                  setModSearchResult(null);
                  setModSearch("");
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#26F2D0]/20 to-[#00d4ff]/20 text-[#26F2D0] border border-[#26F2D0]/30 rounded-xl text-xs font-semibold hover:from-[#26F2D0]/40 hover:shadow-[#26F2D0]/30 hover:scale-[1.02] focus:ring-2 focus:ring-[#26F2D0]/40 transition-all shadow-sm"
              >
                <Shield size={12} /> Assign
              </button>
            )}
          </div>
        )}

        {modSearchResult === null && modSearch && !modSearching && (
          <p className="text-xs text-gray-500 mt-3 px-1">No student found for "{modSearch}"</p>
        )}
      </div>

      {/* Moderators list */}
      <div>
        <h3 className="flex items-center gap-1.5 text-sm font-semibold text-gray-300 mb-4">
          <Shield size={14} /> Current Moderators ({moderators.length})
        </h3>
        {moderators.length === 0 ? (
          <div className="text-center py-8 bg-[#0f0f0f]/50 border border-white/10 rounded-xl shadow-md">
            <Shield size={28} className="mx-auto text-gray-600 mb-3 opacity-75" />
            <p className="text-gray-400 text-sm">No moderators assigned yet</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {moderators.map(mod => (
              <div key={mod.id}
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#0f0f0f]/60 backdrop-blur-sm border border-[#26F2D0]/15 rounded-xl px-4 py-3 shadow-md hover:shadow-[#26F2D0]/20 hover:-translate-y-px transition-all duration-200">
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#26F2D0]/20 to-[#00d4ff]/20 border border-[#26F2D0]/30 flex items-center justify-center text-[#26F2D0] font-bold text-sm shadow-md">
                    {mod.name?.[0]?.toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <p className="text-white font-medium text-sm truncate">{mod.name}</p>
                      <span className="flex items-center gap-1 text-xs bg-gradient-to-r from-[#26F2D0]/15 to-[#00d4ff]/15 text-[#26F2D0] px-2 py-0.5 rounded-full font-semibold border border-[#26F2D0]/20 shadow-sm">
                        <Shield size={10} /> Moderator
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs truncate">
                      {mod.rollNumber} · {mod.branch} · {mod.year}
                    </p>
                  </div>
                </div>

                {confirmRevoke === mod.rollNumber ? (
                  <div className="flex items-center gap-1.5 p-1.5 bg-red-500/10 backdrop-blur-sm rounded-xl border border-red-500/30 shadow-sm flex-shrink-0">
                    <span className="text-xs font-semibold text-red-300">Revoke?</span>
                    <button
                      onClick={() => { onRevoke(mod.rollNumber); setConfirmRevoke(null); }}
                      className="text-xs font-semibold text-red-400 bg-red-500/20 hover:bg-red-500/40 px-2.5 py-1 rounded-lg border border-red-400/40 shadow-sm hover:scale-[1.02] transition-all flex-shrink-0"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setConfirmRevoke(null)}
                      className="text-xs font-semibold text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg shadow-sm hover:scale-[1.02] transition-all flex-shrink-0"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmRevoke(mod.rollNumber)}
                    className="group flex items-center gap-1.5 px-3 py-2 bg-red-500/10 hover:bg-red-500/25 text-red-400 border border-red-500/30 rounded-xl text-xs font-semibold shadow-md hover:shadow-red-500/25 hover:scale-[1.02] focus:ring-2 focus:ring-red-500/40 transition-all duration-200 flex-shrink-0"
                  >
                    <UserMinus size={12} className="group-hover:-translate-x-px transition-transform" />
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
