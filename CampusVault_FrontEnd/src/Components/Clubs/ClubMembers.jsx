// import { useState } from "react";
// import { UserMinus, Clock, Users, Pencil, Check, X, Crown, Shield } from "lucide-react";

// const BADGE_CONFIG = {
//   EARLY_MEMBER:       { label: "Early Member",      emoji: "🌱", color: "bg-green-500/20 text-green-400" },
//   ACTIVE_CONTRIBUTOR: { label: "Active Contributor", emoji: "⚡", color: "bg-yellow-500/20 text-yellow-400" },
//   CLUB_LEADER:        { label: "Club Leader",         emoji: "👑", color: "bg-purple-500/20 text-purple-400" },
//   ALL_STAR:           { label: "All-Star",            emoji: "🏆", color: "bg-orange-500/20 text-orange-400" },
//   TEAM_PLAYER:        { label: "Team Player",         emoji: "🤝", color: "bg-blue-500/20 text-blue-400" },
// };

// export default function ClubMembers({ club, myRoll, token, onUpdate }) {
//   const [removing, setRemoving] = useState(null);
//   const [confirmRemove, setConfirmRemove] = useState(null);
//   const [editingNick, setEditingNick] = useState(null);
//   const [nickValue, setNickValue] = useState("");
//   const [savingNick, setSavingNick] = useState(false);
//   const [nickError, setNickError] = useState("");

//   const isPresident = myRoll === club.presidentRoll;
//   const isVp = myRoll === club.vpRoll;
//   const role = sessionStorage.getItem("role");
//   const isAdmin = role === "ADMIN" || role === "MODERATOR";

//   const getGraceHoursLeft = (joinedAt) => {
//     const elapsed = (Date.now() - new Date(joinedAt).getTime()) / 3600000;
//     return Math.max(0, 48 - elapsed).toFixed(0);
//   };

//   const handlePresidentRemove = async (rollNumber) => {
//     setRemoving(rollNumber);
//     try {
//       const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/president-remove-member`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ rollNumber })
//       });
//       if (res.ok) { onUpdate(await res.json()); setConfirmRemove(null); }
//       else { const t = await res.text(); alert(t); }
//     } finally { setRemoving(null); }
//   };

//   const handleAdminRemove = async (rollNumber) => {
//     setRemoving(rollNumber);
//     try {
//       const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/admin-remove-member`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ rollNumber })
//       });
//       if (res.ok) { onUpdate(await res.json()); setConfirmRemove(null); }
//       else { const t = await res.text(); alert(t); }
//     } finally { setRemoving(null); }
//   };

//   const handleSaveNick = async (rollNumber) => {
//     if (!nickValue.trim() && nickValue !== "") { setNickError("Nickname cannot be empty"); return; }
//     if (nickValue.length > 20) { setNickError("Max 20 characters"); return; }
//     if (nickValue && !/^[a-zA-Z0-9 _-]+$/.test(nickValue)) {
//       setNickError("Only letters, numbers, spaces, hyphens and underscores");
//       return;
//     }
//     setNickError("");
//     setSavingNick(true);
//     try {
//       const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/set-nickname`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ rollNumber, nickname: nickValue.trim() })
//       });
//       if (res.ok) { onUpdate(await res.json()); setEditingNick(null); }
//     } finally { setSavingNick(false); }
//   };

//   const getMemberBadges = (roll) => club.badges?.filter(b => b.rollNumber === roll) || [];
//   const getNickname = (roll) => club.memberNicknames?.[roll] || null;

//   const ConfirmButtons = ({ onYes, onNo, label = "Remove?" }) => (
//     <div className="flex items-center gap-1.5">
//       <span className="text-xs text-gray-400">{label}</span>
//       <button onClick={onYes} disabled={!!removing}
//         className="text-xs text-red-400 font-semibold px-2 py-0.5
//                    bg-red-400/10 rounded-full transition disabled:opacity-50">
//         {removing ? "..." : "Yes"}
//       </button>
//       <button onClick={onNo}
//         className="text-xs text-gray-500 px-2 py-0.5 bg-white/5 rounded-full transition">
//         No
//       </button>
//     </div>
//   );

//   return (
//     <div className="space-y-5">

//       {/* Pending members — grace period */}
//       {club.pendingMembers?.length > 0 && (
//         <div>
//           <div className="flex items-center gap-2 mb-3">
//             <Clock size={13} className="text-yellow-400" />
//             <h4 className="text-sm font-semibold text-yellow-400">
//               Grace Period ({club.pendingMembers.length})
//             </h4>
//             <span className="text-xs text-gray-600">2-day window</span>
//           </div>
//           <div className="space-y-2">
//             {club.pendingMembers.map(p => {
//               const hoursLeft = getGraceHoursLeft(p.joinedAt);
//               const isExpiring = parseFloat(hoursLeft) < 6;
//               return (
//                 <div key={p.rollNumber}
//                   className={`flex items-center gap-3 rounded-xl px-4 py-3 border
//                     ${isExpiring
//                       ? "bg-red-500/5 border-red-500/20"
//                       : "bg-yellow-500/5 border-yellow-500/20"}`}>
//                   <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400
//                                   flex items-center justify-center text-xs font-bold shrink-0">
//                     {p.name?.[0]?.toUpperCase()}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-white text-sm font-medium">{p.name}</p>
//                     <p className={`text-xs ${isExpiring ? "text-red-400" : "text-yellow-500/70"}`}>
//                       <Clock size={10} className="inline mr-1" />
//                       {hoursLeft}h left in grace period
//                     </p>
//                   </div>
//                   {/* President remove during grace */}
//                   {isPresident && (
//                     confirmRemove === p.rollNumber ? (
//                       <ConfirmButtons
//                         onYes={() => handlePresidentRemove(p.rollNumber)}
//                         onNo={() => setConfirmRemove(null)}
//                       />
//                     ) : (
//                       <button onClick={() => setConfirmRemove(p.rollNumber)}
//                         className="p-1.5 rounded-lg text-gray-600 hover:text-red-400
//                                    hover:bg-red-400/10 transition">
//                         <UserMinus size={13} />
//                       </button>
//                     )
//                   )}
//                   {/* Admin remove anytime */}
//                   {isAdmin && !isPresident && (
//                     confirmRemove === p.rollNumber ? (
//                       <ConfirmButtons
//                         onYes={() => handleAdminRemove(p.rollNumber)}
//                         onNo={() => setConfirmRemove(null)}
//                       />
//                     ) : (
//                       <button onClick={() => setConfirmRemove(p.rollNumber)}
//                         className="p-1.5 rounded-lg text-gray-600 hover:text-red-400
//                                    hover:bg-red-400/10 transition">
//                         <Shield size={13} />
//                       </button>
//                     )
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Confirmed members */}
//       <div>
//         <div className="flex items-center gap-2 mb-3">
//           <Users size={13} className="text-[#26F2D0]" />
//           <h4 className="text-sm font-semibold text-white">
//             Members ({club.memberDetails?.filter(m =>
//               !club.pendingMembers?.some(p => p.rollNumber === m.rollNumber)
//             ).length || 0}/{club.maxMembers})
//           </h4>
//         </div>

//         {/* Progress bar */}
//         <div className="w-full bg-white/10 rounded-full h-1.5 mb-4">
//           <div
//             className={`h-1.5 rounded-full transition-all ${club.full ? "bg-red-400" : "bg-[#26F2D0]"}`}
//             style={{ width: `${Math.min(((club.memberCount || 0) / club.maxMembers) * 100, 100)}%` }}
//           />
//         </div>

//         {club.memberDetails?.filter(m =>
//           !club.pendingMembers?.some(p => p.rollNumber === m.rollNumber)
//         ).length === 0 ? (
//           <div className="text-center py-8 text-gray-500 text-sm">
//             <Users size={24} className="mx-auto mb-2 opacity-30" />
//             <p>No confirmed members yet.</p>
//           </div>
//         ) : (
//           <div className="space-y-2">
//             {club.memberDetails?.filter(m =>
//               !club.pendingMembers?.some(p => p.rollNumber === m.rollNumber)
//             ).map((m, i) => {
//               const badges = getMemberBadges(m.rollNumber);
//               const nickname = getNickname(m.rollNumber);
//               const isPres = m.rollNumber === club.presidentRoll;
//               const isVpMember = m.rollNumber === club.vpRoll;
//               const isMe = m.rollNumber === myRoll;

//               return (
//                 <div key={m.rollNumber}
//                   className={`border rounded-xl px-4 py-3 transition-all
//                     ${isPres ? "bg-purple-500/5 border-purple-500/20"
//                       : isVpMember ? "bg-blue-500/5 border-blue-500/20"
//                       : "bg-white/[0.02] border-white/8 hover:border-white/15"
//                     }`}>
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 rounded-full bg-[#26F2D0]/15 text-[#26F2D0]
//                                     flex items-center justify-center text-xs font-bold shrink-0">
//                       {i + 1}
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       {/* Name + nickname edit */}
//                       {editingNick === m.rollNumber ? (
//                         <div className="flex items-center gap-2">
//                           <input value={nickValue}
//                             onChange={e => { setNickValue(e.target.value); setNickError(""); }}
//                             placeholder="Nickname (max 20 chars)..."
//                             maxLength={20}
//                             className="flex-1 bg-[#111] border border-white/20 rounded-lg px-2 py-1
//                                        text-xs text-white outline-none focus:border-[#26F2D0]/50" />
//                           <button onClick={() => handleSaveNick(m.rollNumber)} disabled={savingNick}
//                             className="p-1 text-green-400 hover:text-green-300 transition">
//                             <Check size={13} />
//                           </button>
//                           <button onClick={() => { setEditingNick(null); setNickError(""); }}
//                             className="p-1 text-gray-500 hover:text-white transition">
//                             <X size={13} />
//                           </button>
//                         </div>
//                       ) : (
//                         <div className="flex items-center gap-2 flex-wrap">
//                           <p className="text-white text-sm font-medium">
//                             {nickname ? (
//                               <span>{nickname} <span className="text-gray-600 text-xs">({m.name})</span></span>
//                             ) : m.name}
//                             {isMe && <span className="text-gray-500 text-xs ml-1">(you)</span>}
//                           </p>
//                           {isPres && (
//                             <span className="flex items-center gap-1 text-xs bg-purple-500/20 text-purple-400
//                                              border border-purple-500/30 px-1.5 py-0.5 rounded-full">
//                               <Crown size={9} /> President
//                             </span>
//                           )}
//                           {isVpMember && (
//                             <span className="text-xs bg-blue-500/20 text-blue-400
//                                              border border-blue-500/30 px-1.5 py-0.5 rounded-full">
//                               🤝 VP
//                             </span>
//                           )}
//                           {badges.map(b => {
//                             const cfg = BADGE_CONFIG[b.badgeType];
//                             return cfg ? (
//                               <span key={b.badgeType} title={cfg.label}
//                                 className={`text-xs px-1.5 py-0.5 rounded-full ${cfg.color}`}>
//                                 {cfg.emoji}
//                               </span>
//                             ) : null;
//                           })}
//                         </div>
//                       )}
//                       {nickError && editingNick === m.rollNumber && (
//                         <p className="text-xs text-red-400 mt-0.5">⚠️ {nickError}</p>
//                       )}
//                       <p className="text-gray-500 text-xs mt-0.5">
//                         {m.rollNumber} · {m.year} · {m.branch}
//                       </p>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex items-center gap-1 shrink-0">
//                       {/* Nickname edit — president only */}
//                       {isPresident && !isMe && (
//                         <button onClick={() => {
//                             setEditingNick(m.rollNumber);
//                             setNickValue(nickname || "");
//                             setNickError("");
//                           }}
//                           className="p-1.5 rounded-lg text-gray-600 hover:text-[#26F2D0]
//                                      hover:bg-[#26F2D0]/10 transition">
//                           <Pencil size={12} />
//                         </button>
//                       )}

//                       {/* Admin remove */}
//                       {isAdmin && !isMe && (
//                         confirmRemove === m.rollNumber ? (
//                           <ConfirmButtons
//                             onYes={() => handleAdminRemove(m.rollNumber)}
//                             onNo={() => setConfirmRemove(null)}
//                           />
//                         ) : (
//                           <button onClick={() => setConfirmRemove(m.rollNumber)}
//                             className="p-1.5 rounded-lg text-gray-600 hover:text-red-400
//                                        hover:bg-red-400/10 transition">
//                             <Shield size={13} />
//                           </button>
//                         )
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import {
  UserMinus, Clock, Users, Pencil, Check, X,
  Crown, Shield, Leaf, Zap, Trophy, Star, HandshakeIcon,
  UserCheck,GraduationCap
} from "lucide-react";

// ✅ Lucide badge icons — real app style
const BADGE_CONFIG = {
  EARLY_MEMBER:       { label: "Early Member",      Icon: GraduationCap,    color: "text-green-400 bg-green-500/20 border-green-500/30" },
  ACTIVE_CONTRIBUTOR: { label: "Active Contributor", Icon: Zap,     color: "text-yellow-400 bg-yellow-500/20 border-yellow-500/30" },
  CLUB_LEADER:        { label: "Club Leader",         Icon: Crown,   color: "text-purple-400 bg-purple-500/20 border-purple-500/30" },
  ALL_STAR:           { label: "All-Star",            Icon: Trophy,  color: "text-orange-400 bg-orange-500/20 border-orange-500/30" },
  TEAM_PLAYER:        { label: "Team Player",         Icon: Star,    color: "text-blue-400 bg-blue-500/20 border-blue-500/30" },
};

export default function ClubMembers({ club, myRoll, token, onUpdate }) {
  const [removing, setRemoving] = useState(null);
  const [confirmRemove, setConfirmRemove] = useState(null);
  const [editingNick, setEditingNick] = useState(null);
  const [nickValue, setNickValue] = useState("");
  const [savingNick, setSavingNick] = useState(false);
  const [nickError, setNickError] = useState("");

  const isPresident = myRoll === club.presidentRoll;
  const role = sessionStorage.getItem("role");
  const isAdmin = role === "ADMIN" || role === "MODERATOR";
  const canRequestPres = !club.presidentRoll;
const canRequestVp = !club.vpRoll;

  const getGraceHoursLeft = (joinedAt) => {
    const elapsed = (Date.now() - new Date(joinedAt).getTime()) / 3600000;
    return Math.max(0, 48 - elapsed).toFixed(0);
  };

  const handlePresidentRemove = async (rollNumber) => {
    setRemoving(rollNumber);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/president-remove-member`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ rollNumber })
      });
      if (res.ok) { onUpdate(await res.json()); setConfirmRemove(null); }
      else alert(await res.text());
    } finally { setRemoving(null); }
  };

  const handleAdminRemove = async (rollNumber) => {
    setRemoving(rollNumber);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/admin-remove-member`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ rollNumber })
      });
      if (res.ok) { onUpdate(await res.json()); setConfirmRemove(null); }
      else alert(await res.text());
    } finally { setRemoving(null); }
  };
  const handleRequest = async (roleType) => {
  try {
    const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/request-role`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ role: roleType })
    });

    if (res.ok) {
      onUpdate(await res.json());
      alert(`✅ Request sent for ${roleType}`);
    } else {
      alert(await res.text());
    }
  } catch (err) {
    alert("Something went wrong");
  }
};

  const handleSaveNick = async (rollNumber) => {
    if (nickValue.length > 20) { setNickError("Max 20 characters"); return; }
    if (nickValue && !/^[a-zA-Z0-9 _-]+$/.test(nickValue)) {
      setNickError("Only letters, numbers, spaces, hyphens and underscores");
      return;
    }
    setNickError("");
    setSavingNick(true);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/set-nickname`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ rollNumber, nickname: nickValue.trim() })
      });
      if (res.ok) { onUpdate(await res.json()); setEditingNick(null); }
    } finally { setSavingNick(false); }
  };

  const getMemberBadges = (roll) => club.badges?.filter(b => b.rollNumber === roll) || [];
  const getNickname = (roll) => club.memberNicknames?.[roll] || null;

  // ✅ Sort confirmed members: self first, then president, then VP, then rest
  const confirmedMembers = (club.memberDetails || [])
    .filter(m => !club.pendingMembers?.some(p => p.rollNumber === m.rollNumber))
    .sort((a, b) => {
      const rankA = a.rollNumber === myRoll ? 0
        : a.rollNumber === club.presidentRoll ? 1
        : a.rollNumber === club.vpRoll ? 2 : 3;
      const rankB = b.rollNumber === myRoll ? 0
        : b.rollNumber === club.presidentRoll ? 1
        : b.rollNumber === club.vpRoll ? 2 : 3;
      return rankA - rankB;
    });

  const ConfirmButtons = ({ onYes, onNo }) => (
    <div className="flex items-center gap-1.5">
      <button onClick={onYes} disabled={!!removing}
        className="text-xs text-red-400 font-semibold px-2 py-0.5
                   bg-red-400/10 rounded-full transition disabled:opacity-50">
        {removing ? "..." : "Yes"}
      </button>
      <button onClick={onNo}
        className="text-xs text-gray-500 px-2 py-0.5 bg-white/5 rounded-full">
        No
      </button>
    </div>
  );

  return (
    <div className="space-y-5">

      {/* Pending members */}
      {club.pendingMembers?.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock size={13} className="text-yellow-400" />
            <h4 className="text-sm font-semibold text-yellow-400">
              Grace Period ({club.pendingMembers.length})
            </h4>
            <span className="text-xs text-gray-600">2-day window</span>
          </div>
          <div className="space-y-2">
            {club.pendingMembers.map(p => {
              const hoursLeft = getGraceHoursLeft(p.joinedAt);
              const isExpiring = parseFloat(hoursLeft) < 6;
              return (
                <div key={p.rollNumber}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 border
                    ${isExpiring ? "bg-red-500/5 border-red-500/20" : "bg-yellow-500/5 border-yellow-500/20"}`}>
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400
                                  flex items-center justify-center text-xs font-bold shrink-0">
                    {p.name?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">
                      {p.name}
                      {p.rollNumber === myRoll && <span className="text-gray-500 text-xs ml-1">(you)</span>}
                    </p>
                    <p className={`text-xs flex items-center gap-1 ${isExpiring ? "text-red-400" : "text-yellow-500/70"}`}>
                      <Clock size={10} /> {hoursLeft}h left in grace period
                    </p>
                  </div>
                  {isPresident && (
                    confirmRemove === p.rollNumber ? (
                      <ConfirmButtons
                        onYes={() => handlePresidentRemove(p.rollNumber)}
                        onNo={() => setConfirmRemove(null)} />
                    ) : (
                      <button onClick={() => setConfirmRemove(p.rollNumber)}
                        className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition">
                        <UserMinus size={13} />
                      </button>
                    )
                  )}
                  {isAdmin && !isPresident && (
                    confirmRemove === p.rollNumber ? (
                      <ConfirmButtons
                        onYes={() => handleAdminRemove(p.rollNumber)}
                        onNo={() => setConfirmRemove(null)} />
                    ) : (
                      <button onClick={() => setConfirmRemove(p.rollNumber)}
                        className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition">
                        <Shield size={13} />
                      </button>
                    )
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ✅ Role Request Buttons (ONLY if roles are empty) */}
{/* {(canRequestPres || canRequestVp) && (
  <div className="flex gap-2 mb-4">
    {canRequestPres && (
      <button
        onClick={() => handleRequest("PRESIDENT")}
        className="px-3 py-1.5 text-xs font-semibold rounded-lg
                   bg-purple-500/20 text-purple-400 border border-purple-500/30
                   hover:bg-purple-500/30 transition">
        👑 Request President
      </button>
    )}
    {canRequestVp && (
      <button
        onClick={() => handleRequest("VP")}
        className="px-3 py-1.5 text-xs font-semibold rounded-lg
                   bg-blue-500/20 text-blue-400 border border-blue-500/30
                   hover:bg-blue-500/30 transition">
        🤝 Request VP
      </button>
    )}
  </div>
)} */}

      {/* Confirmed members */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users size={13} className="text-[#26F2D0]" />
          <h4 className="text-sm font-semibold text-white">
            Members ({confirmedMembers.length}/{club.maxMembers})
          </h4>
        </div>

        <div className="w-full bg-white/10 rounded-full h-1.5 mb-4">
          <div
            className={`h-1.5 rounded-full transition-all ${club.full ? "bg-red-400" : "bg-[#26F2D0]"}`}
            style={{ width: `${Math.min(((club.memberCount || 0) / club.maxMembers) * 100, 100)}%` }}
          />
        </div>

        {confirmedMembers.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            <Users size={24} className="mx-auto mb-2 opacity-30" />
            <p>No confirmed members yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {confirmedMembers.map((m, i) => {
              const badges = getMemberBadges(m.rollNumber);
              const nickname = getNickname(m.rollNumber);
              const isPres = m.rollNumber === club.presidentRoll;
              const isVpMember = m.rollNumber === club.vpRoll;
              const isMe = m.rollNumber === myRoll;

              return (
                <div key={m.rollNumber}
                  className={`border rounded-xl px-4 py-3 transition-all
                    ${isMe ? "bg-[#26F2D0]/5 border-[#26F2D0]/20"
                      : isPres ? "bg-purple-500/5 border-purple-500/20"
                      : isVpMember ? "bg-blue-500/5 border-blue-500/20"
                      : "bg-white/[0.02] border-white/8 hover:border-white/15"
                    }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                      ${isMe ? "bg-[#26F2D0]/20 text-[#26F2D0]"
                        : isPres ? "bg-purple-500/20 text-purple-400"
                        : isVpMember ? "bg-blue-500/20 text-blue-400"
                        : "bg-white/10 text-gray-300"}`}>
                      {i + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      {editingNick === m.rollNumber ? (
                        <div className="flex items-center gap-2">
                          <input value={nickValue}
                            onChange={e => { setNickValue(e.target.value); setNickError(""); }}
                            placeholder="Nickname (max 20 chars)..."
                            maxLength={20}
                            className="flex-1 bg-[#111] border border-white/20 rounded-lg px-2 py-1
                                       text-xs text-white outline-none focus:border-[#26F2D0]/50" />
                          <button onClick={() => handleSaveNick(m.rollNumber)} disabled={savingNick}
                            className="p-1 text-green-400 hover:text-green-300 transition">
                            <Check size={13} />
                          </button>
                          <button onClick={() => { setEditingNick(null); setNickError(""); }}
                            className="p-1 text-gray-500 hover:text-white transition">
                            <X size={13} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-white text-sm font-medium">
                            {nickname
                              ? <span>{nickname} <span className="text-gray-600 text-xs">({m.name})</span></span>
                              : m.name}
                            {isMe && <span className="text-[#26F2D0] text-xs ml-1 font-normal">(you)</span>}
                          </p>
                          {isPres && (
                            <span className="flex items-center gap-1 text-xs bg-purple-500/20 text-purple-400
                                             border border-purple-500/30 px-1.5 py-0.5 rounded-full">
                              <Crown size={9} /> President
                            </span>
                          )}
                          {isVpMember && (
                            <span className="flex items-center gap-1 text-xs bg-blue-500/20 text-blue-400
                                             border border-blue-500/30 px-1.5 py-0.5 rounded-full">
                              <UserCheck size={9} /> VP
                            </span>
                          )}
                          {/* ✅ Lucide badge icons */}
                          {badges.map(b => {
                            const cfg = BADGE_CONFIG[b.badgeType];
                            if (!cfg) return null;
                            const { Icon, color, label } = cfg;
                            return (
                              <span key={b.badgeType} title={label}
                                className={`flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full border ${color}`}>
                                <Icon size={10} />
                              </span>
                            );
                          })}
                        </div>
                      )}
                      {nickError && editingNick === m.rollNumber && (
                        <p className="text-xs text-red-400 mt-0.5">⚠️ {nickError}</p>
                      )}
                      <p className="text-gray-500 text-xs mt-0.5">
                        {m.rollNumber} · {m.year} · {m.branch}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      {isPresident && !isMe && (
                        <button onClick={() => {
                            setEditingNick(m.rollNumber);
                            setNickValue(nickname || "");
                            setNickError("");
                          }}
                          className="p-1.5 rounded-lg text-gray-600 hover:text-[#26F2D0]
                                     hover:bg-[#26F2D0]/10 transition">
                          <Pencil size={12} />
                        </button>
                      )}
                      {isAdmin && !isMe && (
                        confirmRemove === m.rollNumber ? (
                          <ConfirmButtons
                            onYes={() => handleAdminRemove(m.rollNumber)}
                            onNo={() => setConfirmRemove(null)} />
                        ) : (
                          <button onClick={() => setConfirmRemove(m.rollNumber)}
                            className="p-1.5 rounded-lg text-gray-600 hover:text-red-400
                                       hover:bg-red-400/10 transition">
                            <Shield size={13} />
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}