// import React, { useEffect, useState } from "react";

// const MAX_MEMBERS = 6;

// function JoinClub() {
//   const [clubs, setClubs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionId, setActionId] = useState(null);
//   const [message, setMessage] = useState("");

//   const token = localStorage.getItem("token");
//   const rollNumber = localStorage.getItem("rollNumber");

//   useEffect(() => {
//     fetchAllClubs();
//      window.addEventListener("clubDeleted", fetchAllClubs);
//   return () => window.removeEventListener("clubDeleted", fetchAllClubs);
//   }, []);

//   const fetchAllClubs = async () => {
//     try {
//       const res = await fetch("http://localhost:8081/api/clubs/all");
//       if (!res.ok) return;
//       const data = await res.json();

//       // ✅ Sort: current student's own club appears first
//       const sorted = [...data].sort((a, b) => {
//         if (a.createdBy === rollNumber) return -1;
//         if (b.createdBy === rollNumber) return 1;
//         return 0;
//       });

//       setClubs(sorted);
//     } catch (err) {
//       console.error("Failed to fetch clubs:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleJoin = async (clubId) => {
//     if (!token) { setMessage("Please login to join a club"); return; }
//     setActionId(clubId);
//     setMessage("");
//     try {
//       const res = await fetch(`http://localhost:8081/api/clubs/${clubId}/join`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) { const text = await res.text(); setMessage(text || "Failed to join"); return; }
//       setMessage("Successfully joined the club! 🎉");
//       fetchAllClubs();
//     } catch { setMessage("Backend not reachable"); }
//     finally { setActionId(null); }
//   };

//   const handleLeave = async (clubId) => {
//     if (!token) return;
//     setActionId(clubId);
//     setMessage("");
//     try {
//       const res = await fetch(`http://localhost:8081/api/clubs/${clubId}/leave`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) { const text = await res.text(); setMessage(text || "Failed to leave"); return; }
//       setMessage("You left the club.");
//       fetchAllClubs();
//     } catch { setMessage("Backend not reachable"); }
//     finally { setActionId(null); }
//   };

//   return (
//     <div className="flex flex-col">
//       <h1 className="text-center font-bold mb-4">Join The Club</h1>

//       {message && (
//         <p className={`text-sm text-center mb-3 font-semibold ${
//           message.includes("Successfully") ? "text-green-400" : "text-red-400"
//         }`}>
//           {message}
//         </p>
//       )}

//       {loading && <p className="text-center text-gray-500 text-sm">Loading clubs...</p>}

//       {!loading && clubs.length === 0 && (
//         <p className="text-center text-gray-500 text-sm">No clubs yet. Be the first to create one!</p>
//       )}

//       <div className="flex flex-col gap-3 overflow-y-auto max-h-[60vh] no-scrollbar">
//         {clubs.map((club) => {
//           const myClub = club.createdBy === rollNumber;
//           const joined = club.members?.includes(rollNumber);
//           const full = club.full;
//           const inProgress = actionId === club.id;

//           return (
//             <div key={club.id}
//               className={`flex w-full items-center gap-4
//                          bg-gradient-to-br from-[#0b0b0b] to-[#121212]
//                          border p-5 rounded-xl transition
//                          ${myClub
//                            ? "border-[#26F2D0]/50"        
//                            : "border-white/10 hover:border-[#26F2D0]/40"
//                          }`}
//             >
//               {/* Club info */}
//               <div className="flex-1">
//                 <div className="flex items-center gap-2">
//                   <h3 className="font-semibold text-white">{club.title}</h3>

//                   {/* ✅ Your club badge */}
//                   {myClub && (
//                     <span className="text-xs bg-[#26F2D0]/20 text-[#26F2D0] px-2 py-0.5 rounded-full">
//                       Your Club ★
//                     </span>
//                   )}
//                   {full && !myClub && (
//                     <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
//                       Full
//                     </span>
//                   )}
//                   {joined && (
//                     <span className="text-xs bg-[#26F2D0]/20 text-[#26F2D0] px-2 py-0.5 rounded-full">
//                       Joined ✓
//                     </span>
//                   )}
//                 </div>

//                 <p className="text-gray-400 text-sm mt-1 line-clamp-2">{club.description}</p>

//                 <div className="flex items-center gap-3 mt-2">
//                   <span className="text-xs text-gray-500">
//                     By {club.createdByName} · {club.createdBy}
//                   </span>
//                   <a href={club.linkedinUrl} target="_blank" rel="noopener noreferrer"
//                     className="text-blue-400 text-xs hover:underline">
//                     LinkedIn →
//                   </a>
//                 </div>

//                 {/* Member count progress bar */}
//                 <div className="mt-2">
//                   <div className="flex justify-between text-xs text-gray-500 mb-1">
//                     <span>Members</span>
//                     <span>{club.memberCount}/{MAX_MEMBERS}</span>
//                   </div>
//                   <div className="w-full bg-white/10 rounded-full h-1.5">
//                     <div
//                       className={`h-1.5 rounded-full transition-all ${full ? "bg-red-400" : "bg-[#26F2D0]"}`}
//                       style={{ width: `${(club.memberCount / MAX_MEMBERS) * 100}%` }}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Action button */}
//               <div className="shrink-0">
//                 {myClub ? (
//                   <span className="text-xs text-[#26F2D0] px-3">Your club</span>
//                 ) : joined ? (
//                   <button onClick={() => handleLeave(club.id)} disabled={inProgress}
//                     className={`px-4 py-2 rounded-xl text-sm font-semibold transition
//                       border border-red-400 text-red-400 hover:bg-red-400 hover:text-black
//                       ${inProgress ? "opacity-50 cursor-not-allowed" : ""}`}>
//                     {inProgress ? "Leaving..." : "Leave"}
//                   </button>
//                 ) : full ? (
//                   <span className="text-xs text-gray-500 px-3">Club Full</span>
//                 ) : (
//                   <button onClick={() => handleJoin(club.id)} disabled={inProgress}
//                     className={`px-4 py-2 rounded-xl text-sm font-semibold text-black transition
//                       ${inProgress ? "bg-[#26F2D0]/40 cursor-not-allowed" : "bg-[#26F2D0] hover:scale-105"}`}>
//                     {inProgress ? "Joining..." : "Join"}
//                   </button>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default JoinClub;


//new mallu......


import React, { useEffect, useState } from "react";

const MAX_MEMBERS = 20;

function JoinClub() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedClub, setSelectedClub] = useState(null); // ✅ controls panel swap

  const token = localStorage.getItem("token");
  const rollNumber = localStorage.getItem("rollNumber");

  useEffect(() => {
    fetchAllClubs();
    window.addEventListener("clubDeleted", fetchAllClubs);
    return () => window.removeEventListener("clubDeleted", fetchAllClubs);
  }, []);

  const fetchAllClubs = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/clubs/all");
      if (!res.ok) return;
      const data = await res.json();
      const sorted = [...data].sort((a, b) => {
        if (a.createdBy === rollNumber) return -1;
        if (b.createdBy === rollNumber) return 1;
        return 0;
      });
      setClubs(sorted);
    } catch (err) {
      console.error("Failed to fetch clubs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (e, clubId) => {
    e?.stopPropagation();
    if (!token) { setMessage("Please login to join a club"); return; }
    setActionId(clubId);
    setMessage("");
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${clubId}/join`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) { const text = await res.text(); setMessage(text || "Failed to join"); return; }
      setMessage("Successfully joined the club! 🎉");
      await fetchAllClubs();
      // ✅ refresh selectedClub with updated data
      setSelectedClub(prev => prev ? { ...prev, members: [...(prev.members || []), rollNumber] } : null);
    } catch { setMessage("Backend not reachable"); }
    finally { setActionId(null); }
  };

  const handleLeave = async (e, clubId) => {
    e?.stopPropagation();
    if (!token) return;
    setActionId(clubId);
    setMessage("");
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${clubId}/leave`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) { const text = await res.text(); setMessage(text || "Failed to leave"); return; }
      setMessage("You left the club.");
      await fetchAllClubs();
      setSelectedClub(prev => prev ? { ...prev, members: (prev.members || []).filter(r => r !== rollNumber) } : null);
    } catch { setMessage("Backend not reachable"); }
    finally { setActionId(null); }
  };

  // ─── CLUB DETAIL VIEW ───────────────────────────────────────────────────────
  if (selectedClub) {
    const myClub = selectedClub.createdBy === rollNumber;
    const joined = selectedClub.members?.includes(rollNumber);
    const full = selectedClub.full;
    const inProgress = actionId === selectedClub.id;

    return (
      <div className="flex flex-col h-full">

        {/* Back button */}
        <button
          onClick={() => { setSelectedClub(null); setMessage(""); }}
          className="flex items-center gap-2 text-[#26F2D0] hover:text-white
                     text-sm font-medium mb-5 transition-colors w-fit"
        >
          ← Back to Clubs
        </button>

        {/* Club header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#26F2D0]/10 flex items-center
                            justify-center text-[#26F2D0] text-xl shrink-0">
              🏛
            </div>
            <div>
              <h2 className="font-bold text-white text-lg leading-tight">{selectedClub.title}</h2>
              {myClub && <span className="text-xs text-[#26F2D0]">Your Club ★</span>}
            </div>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            {full && !myClub && (
              <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">Full</span>
            )}
            {joined && !myClub && (
              <span className="text-xs bg-[#26F2D0]/20 text-[#26F2D0] px-2 py-0.5 rounded-full">Joined ✓</span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-2">{selectedClub.description}</p>

        {/* Creator card */}
        <div className="flex items-center justify-between bg-white/5 rounded-xl px-2 py-2 mb-2">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Created by</p>
            <p className="text-white text-sm font-medium">{selectedClub.createdByName}</p>
            <p className="text-gray-500 text-xs font-mono">{selectedClub.createdBy}</p>
          </div>
          <a
            href={selectedClub.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-xs
                       bg-blue-400/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        </div>

        {/* Members header + progress */}
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-sm font-semibold text-white">Members</h3>
          <span className="text-xs text-gray-500 ">
            {selectedClub.memberCount ?? selectedClub.members?.length ?? 0} / {MAX_MEMBERS}
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-1.5 mb-2">
          <div
            className={`h-1.5 rounded-full transition-all ${full ? "bg-red-400" : "bg-[#26F2D0]"}`}
            style={{ width: `${((selectedClub.memberCount ?? selectedClub.members?.length ?? 0) / MAX_MEMBERS) * 100}%` }}
          />
        </div>

        {/* Member list */}
        <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar flex-1 pr-1" style={{ maxHeight: "132px" }}>
          {selectedClub.memberDetails && selectedClub.memberDetails.length > 0 ? (
            selectedClub.memberDetails.map((member, index) => (
              <div
                key={`${member.rollNumber}-${index}`}
                className="flex items-center gap-3 bg-white/5 border border-white/10
                           rounded-xl px-4 py-3 hover:border-[#26F2D0]/30 transition-colors shrink-0"
              >
                <div className="w-8 h-8 rounded-full bg-[#26F2D0]/15 text-[#26F2D0]
                                flex items-center justify-center text-xs font-bold shrink-0">
                  {index + 1}
                </div>
                <div className="flex items-center gap-2 flex-wrap min-w-0 text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white text-sm font-medium">{member.name}</span>
                    <span className="text-gray-600 text-xs">·</span>
                    <span className="text-[#26F2D0] text-xs font-mono">{member.rollNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap mt-0.5">
                    <span className="text-gray-400 text-xs">{member.year} year</span>
                    <span className="text-gray-600 text-xs">·</span>
                    <span className="text-gray-400 text-xs">{member.branch}</span>
                    {member.linkedinUrl && (
                      <>
                        <span className="text-gray-600 text-xs">·</span>
                        <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-xs transition-colors">
                          LinkedIn →
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500 text-sm">
              <p className="text-2xl mb-2">👥</p>
              <p>No members yet. Be the first to join!</p>
            </div>
          )}
        </div>

        {/* Message */}
        {message && (
          <p className={`text-xs text-center mt-3 font-semibold ${
            message.includes("Successfully") ? "text-green-400" : "text-red-400"
          }`}>
            {message}
          </p>
        )}

        {/* Action button */}
        {!myClub && (
          <div className="mt-4 pt-4 border-t border-white/10">
            {joined ? (
              <button onClick={(e) => handleLeave(e, selectedClub.id)} disabled={inProgress}
                className={`w-full py-2 rounded-xl text-sm font-semibold transition
                  border border-red-400 text-red-400 hover:bg-red-400 hover:text-black
                  ${inProgress ? "opacity-50 cursor-not-allowed" : ""}`}>
                {inProgress ? "Leaving..." : "Leave Club"}
              </button>
            ) : full ? (
              <div className="w-full py-3 rounded-xl text-sm font-semibold text-center bg-white/5 text-gray-500">
                Club is Full
              </div>
            ) : (
              <button onClick={(e) => handleJoin(e, selectedClub.id)} disabled={inProgress}
                className={`w-full py-3 rounded-xl text-sm font-semibold text-black transition
                  ${inProgress ? "bg-[#26F2D0]/40 cursor-not-allowed" : "bg-[#26F2D0] hover:brightness-110"}`}>
                {inProgress ? "Joining..." : "Join Club"}
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // ─── CLUB LIST VIEW ─────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col">
      <h1 className="text-center font-bold mb-4">Join The Club</h1>

      {message && (
        <p className={`text-sm text-center mb-3 font-semibold ${
          message.includes("Successfully") ? "text-green-400" : "text-red-400"
        }`}>
          {message}
        </p>
      )}

      {loading && <p className="text-center text-gray-500 text-sm">Loading clubs...</p>}
      {!loading && clubs.length === 0 && (
        <p className="text-center text-gray-500 text-sm">No clubs yet. Be the first to create one!</p>
      )}

      <div className="flex flex-col gap-3 overflow-y-auto max-h-[60vh] no-scrollbar">
        {clubs.map((club) => {
          const myClub = club.createdBy === rollNumber;
          const joined = club.members?.includes(rollNumber);
          const full = club.full;
          const inProgress = actionId === club.id;

          return (
            <div
              key={club.id}
              onClick={() => { setSelectedClub(club); setMessage(""); }}
              className={`flex w-full items-center gap-4 cursor-pointer
                         bg-gradient-to-br from-[#0b0b0b] to-[#121212]
                         border p-5 rounded-xl transition
                         ${myClub ? "border-[#26F2D0]/50" : "border-white/10 hover:border-[#26F2D0]/40"}`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white">{club.title}</h3>
                  {myClub && (
                    <span className="text-xs bg-[#26F2D0]/20 text-[#26F2D0] px-2 py-0.5 rounded-full">Your Club ★</span>
                  )}
                  {full && !myClub && (
                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">Full</span>
                  )}
                  {joined && (
                    <span className="text-xs bg-[#26F2D0]/20 text-[#26F2D0] px-2 py-0.5 rounded-full">Joined ✓</span>
                  )}
                </div>

                <p className="text-gray-400 text-sm mt-1 line-clamp-2">{club.description}</p>

                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-gray-500">By {club.createdByName} · {club.createdBy}</span>
                  <a href={club.linkedinUrl} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="text-blue-400 text-xs hover:underline">
                    LinkedIn →
                  </a>
                </div>

                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Members</span>
                    <span>{club.memberCount}/{MAX_MEMBERS}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${full ? "bg-red-400" : "bg-[#26F2D0]"}`}
                      style={{ width: `${(club.memberCount / MAX_MEMBERS) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="shrink-0" onClick={e => e.stopPropagation()}>
                {myClub ? (
                  <span className="text-xs text-[#26F2D0] px-3">Your club</span>
                ) : joined ? (
                  <button onClick={(e) => handleLeave(e, club.id)} disabled={inProgress}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition
                      border border-red-400 text-red-400 hover:bg-red-400 hover:text-black
                      ${inProgress ? "opacity-50 cursor-not-allowed" : ""}`}>
                    {inProgress ? "Leaving..." : "Leave"}
                  </button>
                ) : full ? (
                  <span className="text-xs text-gray-500 px-3">Club Full</span>
                ) : (
                  <button onClick={(e) => handleJoin(e, club.id)} disabled={inProgress}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold text-black transition
                      ${inProgress ? "bg-[#26F2D0]/40 cursor-not-allowed" : "bg-[#26F2D0] hover:scale-105"}`}>
                    {inProgress ? "Joining..." : "Join"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default JoinClub;