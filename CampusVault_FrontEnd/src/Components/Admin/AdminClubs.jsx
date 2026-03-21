// import { useState } from "react";
// import {
//   Trash2, Plus, Crown, UserMinus, X, Check, Pencil,
//   RotateCcw, AlertTriangle, Users, ChevronLeft,
//   CheckCircle2, Circle, MessageSquare, ClipboardList,
//   ShieldCheck, UserCheck, Search, Eye, RefreshCw
// } from "lucide-react";

// const PREDEFINED_CLUBS = [
//   { title: "Artificial Intelligence Club", category: "AI", emoji: "🤖" },
//   { title: "3D Printing Club", category: "3D_PRINTING", emoji: "🖨️" },
//   { title: "Web Development Club", category: "WEB_DEV", emoji: "💻" },
//   { title: "Robotics Club", category: "ROBOTICS", emoji: "🦾" },
//   { title: "Entrepreneurship Club", category: "ENTREPRENEURSHIP", emoji: "🚀" },
//   { title: "Technical Fest", category: "TECH_FEST", emoji: "🎉" },
//   { title: "Sports Club", category: "SPORTS", emoji: "⚽" },
//   { title: "Cultural Club", category: "CULTURAL", emoji: "🎭" },
//   { title: "Toastmasters Club", category: "TOASTMASTERS", emoji: "🎤" },
//   { title: "Photography Club", category: "PHOTOGRAPHY", emoji: "📷" },
//   { title: "Social Welfare Club", category: "CULTURAL", emoji: "🤝" },
// ];

// const STATUS_COLORS = {
//   ACTIVE:    "bg-green-500/20 text-green-400",
//   DISSOLVED: "bg-red-500/20 text-red-400",
//   COMPLETED: "bg-yellow-500/20 text-yellow-400",
// };

// // ─── DETAIL VIEW ──────────────────────────────────────────────────────────────
// function ClubDetailView({ club, token, onBack, onRefresh }) {
// const [activeTab, setActiveTab] = useState(() => {
//   return sessionStorage.getItem("clubTab") || "activities";
// });
// useEffect(() => {
//   sessionStorage.setItem("clubTab", activeTab);
// }, [activeTab]);

//   const [completing, setCompleting] = useState(null);
//   const [deletingActivity, setDeletingActivity] = useState(null);
//   const [deletingMsg, setDeletingMsg] = useState(null);
//   const [confirmingAll, setConfirmingAll] = useState(false);
//   const [editActivity, setEditActivity] = useState(null);
//   const [editActivityForm, setEditActivityForm] = useState({ title: "", description: "" });
//   const [savingActivity, setSavingActivity] = useState(false);
//   const [removingMember, setRemovingMember] = useState(null);
//   const [confirmRemove, setConfirmRemove] = useState(null);
//   const [roleForm, setRoleForm] = useState({ rollNumber: "", role: "PRESIDENT" });
//   const [assigning, setAssigning] = useState(false);
//   const [showRoleModal, setShowRoleModal] = useState(false);
//   const [confirmingOne, setConfirmingOne] = useState(null);
//   const [confirmDeleteMsg, setConfirmDeleteMsg] = useState(null);


//   const t = () => token;

//   const handleCompleteActivity = async (activityId) => {
//     setCompleting(activityId);
//     try {
//       const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/activities/${activityId}/admin-complete`, {
//         method: "PATCH", headers: { Authorization: `Bearer ${t()}` }
//       });
//       if (res.ok) onRefresh();
//     } finally { setCompleting(null); }
//   };

//   const handleDeleteActivity = async (activityId) => {
//     setDeletingActivity(activityId);
//     try {
//       const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/activities/${activityId}`, {
//         method: "DELETE", headers: { Authorization: `Bearer ${t()}` }
//       });
//       if (res.ok) onRefresh();
//     } finally { setDeletingActivity(null); }
//   };

// const handleDeleteMessage = async (msgId) => {
//   setDeletingMsg(msgId);
//   try {
//     const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/messages/${msgId}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${t()}` }
//     });
//     if (res.ok) {
//       setConfirmDeleteMsg(null); // ✅ reset confirm state
//       onRefresh();
//     }
//   } finally {
//     setDeletingMsg(null);
//   }
// };

//   const handleConfirmAll = async () => {
//     setConfirmingAll(true);
//     try {
//       const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/admin-confirm-all`, {
//         method: "POST", headers: { Authorization: `Bearer ${t()}` }
//       });
//       if (res.ok) onRefresh();
//     } finally { setConfirmingAll(false); }
//   };

//   const handleRemoveMember = async (rollNumber) => {
//     setRemovingMember(rollNumber);
//     try {
//       const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/admin-remove-member`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${t()}` },
//         body: JSON.stringify({ rollNumber })
//       });
//       if (res.ok) { setConfirmRemove(null); onRefresh(); }
//     } finally { setRemovingMember(null); }
//   };

//   const handleAssignRole = async () => {
//     if (!roleForm.rollNumber.trim()) return;
//     setAssigning(true);
//     try {
//       const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/assign-role`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${t()}` },
//         body: JSON.stringify(roleForm)
//       });
//       if (res.ok) { setShowRoleModal(false); onRefresh(); }
//       else alert(await res.text());
//     } finally { setAssigning(false); }
//   };


//   const handleConfirmOne = async (rollNumber) => {
//     setConfirmingOne(rollNumber);
//     try {
//         const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/admin-confirm-one`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json", Authorization: `Bearer ${t()}` },
//             body: JSON.stringify({ rollNumber })
//         });
//         if (res.ok) onRefresh();
//     } finally { setConfirmingOne(null); }
// };

// const handleUndoActivity = async (activityId) => {
//   setCompleting(activityId);
//   try {
//     const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/activities/${activityId}/admin-undo`, {
//       method: "PATCH",
//       headers: { Authorization: `Bearer ${t()}` }
//     });
//     if (res.ok) onRefresh();
//   } finally {
//     setCompleting(null);
//   }
// };

//   const completedCount = club.activities?.filter(a => a.completed).length || 0;
//   const totalCount = club.activities?.length || 0;
//   const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

//   const TABS = [
//     { key: "activities", label: "Activities", icon: <ClipboardList size={13} />, count: `${completedCount}/${totalCount}` },
//     { key: "members",    label: "Members",    icon: <Users size={13} />,          count: club.memberCount },
//     { key: "chat",       label: "Chat",       icon: <MessageSquare size={13} />,  count: club.messages?.length || 0 },
//   ];

//   return (
//     <div>
//       {/* Back button */}
//       <button onClick={onBack}
//         className="flex items-center gap-2 text-[#26F2D0] hover:text-white text-sm font-medium mb-5 transition w-fit">
//         <ChevronLeft size={16} /> Back to Clubs
//       </button>

//       {/* Club header */}
//       <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 mb-4">
//         <div className="flex items-start justify-between gap-4 flex-wrap">
//           <div className="flex items-center gap-3">
//             <span className="text-3xl">{club.logoEmoji || "🏛️"}</span>
//             <div>
//               <div className="flex items-center gap-2 flex-wrap">
//                 <h2 className="text-white font-bold text-lg">{club.title}</h2>
//                 <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[club.status] || "bg-gray-500/20 text-gray-400"}`}>
//                   {club.status}
//                 </span>
//               </div>
//               <p className="text-gray-400 text-sm mt-1">{club.description}</p>
//               <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 flex-wrap">
//                 <span className="flex items-center gap-1"><Users size={11} /> {club.memberCount}/{club.maxMembers} members</span>
//                 <span>📋 {progressPct}% activities done</span>
//                 {club.presidentName && <span className="flex items-center gap-1"><Crown size={10} className="text-purple-400" /> {club.presidentName}</span>}
//                 {club.vpName && <span>🤝 {club.vpName}</span>}
//               </div>
//             </div>
//           </div>

//           {/* Quick actions */}
//           <div className="flex gap-2 flex-wrap">
//             <button onClick={() => setShowRoleModal(true)}
//               className="flex items-center gap-1.5 px-3 py-2 text-xs bg-purple-500/10 text-purple-400
//                          border border-purple-500/20 rounded-xl hover:bg-purple-500/20 transition font-medium">
//               <Crown size={12} /> Assign Role
//             </button>
//             <button onClick={handleConfirmAll} disabled={confirmingAll || !club.pendingMembers?.length}
//               className="flex items-center gap-1.5 px-3 py-2 text-xs bg-green-500/10 text-green-400
//                          border border-green-500/20 rounded-xl hover:bg-green-500/20 transition font-medium
//                          disabled:opacity-40">
//               <RefreshCw size={12} className={confirmingAll ? "animate-spin" : ""} />
//               Confirm All Pending ({club.pendingMembers?.length || 0})
//             </button>
//           </div>
//         </div>

//         {/* Activity progress bar */}
//         {totalCount > 0 && (
//           <div className="mt-4">
//             <div className="flex justify-between text-xs text-gray-500 mb-1">
//               <span>Activity Progress</span>
//               <span>{completedCount}/{totalCount} completed</span>
//             </div>
//             <div className="w-full bg-white/10 rounded-full h-2">
//               <div className="h-2 rounded-full bg-gradient-to-r from-[#26F2D0] to-purple-400 transition-all"
//                 style={{ width: `${progressPct}%` }} />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Role assignment modal */}
//       {showRoleModal && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-sm">
//             <h3 className="text-white font-bold mb-4 flex items-center gap-2">
//               <Crown size={16} className="text-purple-400" /> Assign Role
//             </h3>
//             <div className="space-y-3">
//               <input value={roleForm.rollNumber}
//                 onChange={e => setRoleForm(p => ({ ...p, rollNumber: e.target.value }))}
//                 placeholder="Student roll number..."
//                 className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#26F2D0]/50" />

//               {/* Clickable member list */}
//               {club.memberDetails?.length > 0 && (
//                 <div className="bg-white/5 rounded-xl p-3 max-h-36 overflow-y-auto">
//                   <p className="text-xs text-gray-500 mb-2">Click to select:</p>
//                   {club.memberDetails.map(m => (
//                     <div key={m.rollNumber} onClick={() => setRoleForm(p => ({ ...p, rollNumber: m.rollNumber }))}
//                       className={`flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer text-xs transition
//                         ${roleForm.rollNumber === m.rollNumber ? "bg-purple-500/20 text-purple-400" : "hover:bg-white/5 text-gray-300"}`}>
//                       <span>{m.name}</span>
//                       <span className="font-mono text-gray-500">{m.rollNumber}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <div className="flex gap-2">
//                 {["PRESIDENT", "VP"].map(r => (
//                   <button key={r} onClick={() => setRoleForm(p => ({ ...p, role: r }))}
//                     className={`flex-1 py-2 rounded-xl text-xs font-semibold transition border
//                       ${roleForm.role === r
//                         ? r === "PRESIDENT" ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
//                           : "bg-blue-500/20 text-blue-400 border-blue-500/30"
//                         : "bg-white/5 text-gray-400 border-white/10"}`}>
//                     {r === "PRESIDENT" ? "👑 President" : "🤝 VP"}
//                   </button>
//                 ))}
//               </div>

//               {/* Pending role requests */}
//               {club.roleRequests?.filter(r => r.status === "PENDING").length > 0 && (
//                 <div className="bg-white/5 rounded-xl p-3">
//                   <p className="text-xs text-gray-500 mb-2">Pending requests:</p>
//                   {club.roleRequests.filter(r => r.status === "PENDING").map(r => (
//                     <div key={r.id} className="flex items-center justify-between text-xs py-1">
//                       <span className="text-white">{r.requestedByName}</span>
//                       <span className="text-gray-500">{r.role}</span>
//                       <button onClick={() => setRoleForm({ rollNumber: r.requestedBy, role: r.role })}
//                         className="text-[#26F2D0] hover:underline">Use</button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <div className="flex gap-2">
//                 <button onClick={() => setShowRoleModal(false)}
//                   className="flex-1 py-2 bg-white/10 text-gray-300 rounded-xl text-sm hover:bg-white/20 transition">Cancel</button>
//                 <button onClick={handleAssignRole} disabled={!roleForm.rollNumber.trim() || assigning}
//                   className="flex-1 py-2 bg-[#26F2D0] text-black rounded-xl text-sm font-semibold hover:brightness-110 transition disabled:opacity-40">
//                   {assigning ? "Assigning..." : "Assign"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Tabs */}
//       <div className="flex gap-1 border-b border-white/10 mb-4">
//         {TABS.map(tab => (
//           <button key={tab.key} onClick={() => setActiveTab(tab.key)}
//             className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium rounded-t-lg transition
//               ${activeTab === tab.key
//                 ? "bg-[#26F2D0]/10 text-[#26F2D0] border-b-2 border-[#26F2D0]"
//                 : "text-gray-400 hover:text-white"}`}>
//             {tab.icon} {tab.label}
//             <span className={`px-1.5 py-0.5 rounded-full text-xs
//               ${activeTab === tab.key ? "bg-[#26F2D0]/20 text-[#26F2D0]" : "bg-white/10 text-gray-500"}`}>
//               {tab.count}
//             </span>
//           </button>
//         ))}
//       </div>

//       {/* ── ACTIVITIES TAB ─────────────────────────────────────────── */}
//       {activeTab === "activities" && (
//         <div className="space-y-2">
//           {!club.activityUnlocked && (
//             <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl px-4 py-3 text-xs text-yellow-400 mb-3">
//               ⚠️ Activities locked for members (need {Math.ceil(club.maxMembers * 0.5)} members).
//               Admin can still manage activities below.
//             </div>
//           )}

//           {club.activities?.length === 0 ? (
//             <div className="text-center py-12 text-gray-500 text-sm">
//               <ClipboardList size={24} className="mx-auto mb-2 opacity-30" />
//               <p>No activities. Recreate this club to seed activities.</p>
//             </div>
//           ) : (
//             club.activities?.map((activity, idx) => (
//               <div key={activity.id}
//                 className={`border rounded-xl p-4 transition-all
//                   ${activity.completed
//                     ? "bg-green-500/5 border-green-500/20"
//                     : activity.extra
//                       ? "bg-purple-500/5 border-purple-500/15"
//                       : "bg-[#1a1a1a] border-white/10"
//                   }`}>

//                 {editActivity === activity.id ? (
//                   // ✅ Inline edit form
//                   <div className="space-y-2">
//                     <input value={editActivityForm.title}
//                       onChange={e => setEditActivityForm(p => ({ ...p, title: e.target.value }))}
//                       className="w-full bg-[#111] border border-[#26F2D0]/30 rounded-lg px-3 py-1.5
//                                  text-sm text-white outline-none" />
//                     <textarea value={editActivityForm.description} rows={2}
//                       onChange={e => setEditActivityForm(p => ({ ...p, description: e.target.value }))}
//                       className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-1.5
//                                  text-xs text-white outline-none resize-none" />
//                     <div className="flex gap-2 justify-end">
//                       <button onClick={() => setEditActivity(null)}
//                         className="flex items-center gap-1 px-3 py-1 bg-white/10 text-gray-300 rounded-lg text-xs hover:bg-white/20 transition">
//                         <X size={10} /> Cancel
//                       </button>
//                       <button disabled={savingActivity}
//                         onClick={async () => {
//                           // Note: backend edit activity endpoint not yet added
//                           // For now just close — you can add PATCH /activities/:id later
//                           setEditActivity(null);
//                         }}
//                         className="flex items-center gap-1 px-3 py-1 bg-[#26F2D0] text-black rounded-lg text-xs font-semibold">
//                         <Check size={10} /> Save
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex items-start gap-3">
//                     {/* Status icon */}
//                     {activity.completed
//                       ? <CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" />
//                       : <Circle size={16} className="text-gray-600 shrink-0 mt-0.5" />
//                     }

//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center gap-2 flex-wrap">
//                         <span className={`text-sm font-medium ${activity.completed ? "text-gray-400 line-through" : "text-white"}`}>
//                           {idx + 1}. {activity.title}
//                         </span>
//                         {activity.extra && (
//                           <span className="text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30 px-1.5 py-0.5 rounded-full">
//                             Extra
//                           </span>
//                         )}
//                         {activity.completed && activity.completedAt && (
//                           <span className="text-xs text-green-400">
//                             ✓ {new Date(activity.completedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
//                           </span>
//                         )}
//                       </div>
//                       {activity.description && (
//                         <p className="text-xs text-gray-500 mt-0.5">{activity.description}</p>
//                       )}
//                       <p className="text-xs text-gray-700 mt-0.5">
//                         {activity.votes?.length || 0} votes · added by {activity.addedByName || "Admin"}
//                       </p>
//                     </div>

//                     {/* Admin action buttons */}
//                     <div className="flex items-center gap-1 shrink-0">
//                       {!activity.completed ? (
//   <button
//     onClick={() => handleCompleteActivity(activity.id)}
//     disabled={completing === activity.id}
//     title="Mark complete"
//     className="flex items-center gap-1 px-2 py-1 text-xs bg-green-500/10 text-green-400
//                border border-green-500/20 rounded-lg hover:bg-green-500/20 transition"
//   >
//     {completing === activity.id
//       ? <div className="w-3 h-3 border border-green-400 border-t-transparent rounded-full animate-spin" />
//       : <><ShieldCheck size={11} /> Complete</>
//     }
//   </button>
// ) : (
//   <button
//     onClick={() => handleUndoActivity(activity.id)}
//     title="Undo complete"
//     className="flex items-center gap-1 px-2 py-1 text-xs bg-yellow-500/10 text-yellow-400
//                border border-yellow-500/20 rounded-lg hover:bg-yellow-500/20 transition"
//   >
//     <RotateCcw size={11} /> Undo
//   </button>
// )}
//                       <button onClick={() => {
//                           setEditActivity(activity.id);
//                           setEditActivityForm({ title: activity.title, description: activity.description || "" });
//                         }}
//                         title="Edit activity"
//                         className="p-1.5 text-gray-600 hover:text-[#26F2D0] hover:bg-[#26F2D0]/10 rounded-lg transition">
//                         <Pencil size={12} />
//                       </button>
//                       <button onClick={() => handleDeleteActivity(activity.id)}
//                         disabled={deletingActivity === activity.id}
//                         title="Delete activity"
//                         className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition">
//                         {deletingActivity === activity.id
//                           ? <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin" />
//                           : <Trash2 size={12} />
//                         }
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       )}



//       {activeTab === "members" && (
//         <div className="space-y-4">
//           {/* Pending members */}
//           {club.pendingMembers?.length > 0 && (
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <p className="text-xs font-semibold text-yellow-400 flex items-center gap-1">
//                   <Users size={12} /> Pending Grace Period ({club.pendingMembers.length})
//                 </p>
//                 <button onClick={handleConfirmAll} disabled={confirmingAll}
//                   className="flex items-center gap-1 px-3 py-1 text-xs bg-green-500/10 text-green-400
//                              border border-green-500/20 rounded-lg hover:bg-green-500/20 transition">
//                   <RefreshCw size={10} className={confirmingAll ? "animate-spin" : ""} />
//                   Confirm All
//                 </button>
//               </div>
//               <div className="space-y-2">
//                 {club.pendingMembers.map(p => {
//                   const hoursLeft = Math.max(0,
//                     48 - (Date.now() - new Date(p.joinedAt).getTime()) / 3600000
//                   ).toFixed(0);
//                   return (
//                     <div key={p.rollNumber}
//                       className="flex items-center gap-3 bg-yellow-500/5 border border-yellow-500/20 rounded-xl px-4 py-3">
//                       <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400
//                                       flex items-center justify-center text-xs font-bold shrink-0">
//                         {p.name?.[0]?.toUpperCase()}
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-white text-sm font-medium">{p.name}</p>
//                         <p className="text-yellow-500/70 text-xs">{hoursLeft}h left in grace</p>
//                       </div>
//                       {confirmRemove === p.rollNumber ? (
//                         <div className="flex items-center gap-1">
//                           <button onClick={() => handleRemoveMember(p.rollNumber)} disabled={removingMember === p.rollNumber}
//                             className="text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
//                             {removingMember === p.rollNumber ? "..." : "Yes"}
//                           </button>
//                           <button onClick={() => setConfirmRemove(null)}
//                             className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">No</button>
//                         </div>
//                    ) : (
//   <div className="flex items-center gap-1">
//     {/* ✅ Confirm button */}
//     <button
//       onClick={() => handleConfirmOne(p.rollNumber)}
//       disabled={confirmingOne === p.rollNumber}
//       className="p-1.5 text-gray-600 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition"
//       title="Confirm member"
//     >
//       {confirmingOne === p.rollNumber
//         ? <div className="w-3 h-3 border border-green-400 border-t-transparent rounded-full animate-spin" />
//         : <UserCheck size={13} />
//       }
//     </button>

//     {/* ❌ Remove button */}
//     <button
//       onClick={() => setConfirmRemove(p.rollNumber)}
//       className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition"
//     >
//       <UserMinus size={13} />
//     </button>
//   </div>
// )
//                       }
//                     </div>
                    
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* Confirmed members */}
//           <div>
//             <p className="text-xs font-semibold text-white mb-2 flex items-center gap-1">
//               <Users size={12} className="text-[#26F2D0]" />
//               Confirmed Members ({club.memberDetails?.filter(m =>
//                 !club.pendingMembers?.some(p => p.rollNumber === m.rollNumber)
//               ).length || 0})
//             </p>
//             <div className="space-y-2">
//               {club.memberDetails?.filter(m =>
//                 !club.pendingMembers?.some(p => p.rollNumber === m.rollNumber)
//               ).map((m, i) => (
//                 <div key={m.rollNumber}
//                   className="flex items-center gap-3 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3">
//                   <div className="w-8 h-8 rounded-full bg-[#26F2D0]/15 text-[#26F2D0]
//                                   flex items-center justify-center text-xs font-bold shrink-0">
//                     {i + 1}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 flex-wrap">
//                       <p className="text-white text-sm font-medium">{m.name}</p>
//                       {m.rollNumber === club.presidentRoll && (
//                         <span className="text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30 px-1.5 py-0.5 rounded-full flex items-center gap-1">
//                           <Crown size={9} /> President
//                         </span>
//                       )}
//                       {m.rollNumber === club.vpRoll && (
//                         <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded-full">
//                           🤝 VP
//                         </span>
//                       )}
//                     </div>
//                     <p className="text-gray-500 text-xs">{m.rollNumber} · {m.year} · {m.branch}</p>
//                   </div>
//                   {confirmRemove === m.rollNumber ? (
//                     <div className="flex items-center gap-1">
//                       <button onClick={() => handleRemoveMember(m.rollNumber)} disabled={removingMember === m.rollNumber}
//                         className="text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
//                         {removingMember === m.rollNumber ? "..." : "Yes"}
//                       </button>
//                       <button onClick={() => setConfirmRemove(null)}
//                         className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">No</button>
//                     </div>
//                   ) : (
//                     <button onClick={() => setConfirmRemove(m.rollNumber)}
//                       className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition">
//                       <UserMinus size={13} />
//                     </button>
//                   )}
//                 </div>
//               ))}
//               {club.memberDetails?.filter(m =>
//                 !club.pendingMembers?.some(p => p.rollNumber === m.rollNumber)
//               ).length === 0 && (
//                 <p className="text-center text-gray-600 text-sm py-6">No confirmed members yet.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── CHAT TAB ───────────────────────────────────────────────── */}

//      {activeTab === "chat" && (
//   <div>
//     <div className="flex items-center justify-between mb-3">
//       <p className="text-xs text-gray-500">Read-only admin view · Admin can delete any message</p>
//       <span className="text-xs text-gray-600">{club.messages?.length || 0}/100 messages</span>
//     </div>

//     {(!club.messages || club.messages.length === 0) ? (
//       <div className="text-center py-12 text-gray-500 text-sm">
//         <MessageSquare size={24} className="mx-auto mb-2 opacity-30" />
//         <p>No messages yet.</p>
//       </div>
//     ) : (
//       <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
//         {club.messages.map(msg => {
//           const isDeleted = msg.deleted || msg.content === "🚫 Message deleted";
//           const isPres = msg.senderRoll === club.presidentRoll;

//           return (
//             <div key={msg.id}
//               className={`flex items-start gap-3 rounded-xl px-4 py-3 border group
//                 ${isDeleted ? "bg-white/[0.01] border-white/5 opacity-60"
//                   : isPres ? "bg-purple-500/5 border-purple-500/15"
//                   : "bg-[#1a1a1a] border-white/10"}`}>

//               <div className={`w-8 h-8 rounded-full flex items-center justify-center
//                               text-xs font-bold shrink-0
//                               ${isPres ? "bg-purple-500/30 text-purple-300" : "bg-white/10 text-gray-300"}`}>
//                 {msg.senderName?.[0]?.toUpperCase()}
//               </div>

//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center gap-2 mb-0.5">
//                   <span className={`text-xs font-medium ${isPres ? "text-purple-400" : "text-white"}`}>
//                     {msg.senderName}{isPres ? " 👑" : ""}
//                   </span>
//                   <span className="text-xs text-gray-600">
//                     {msg.createdAt ? new Date(msg.createdAt).toLocaleString("en-IN", {
//                       day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
//                     }) : ""}
//                   </span>
//                 </div>

//                 <p className={`text-sm ${isDeleted ? "text-gray-600 italic text-xs" : "text-gray-200"}`}>
//                   {msg.content}
//                 </p>
//               </div>

//               {!isDeleted && (
//                 confirmDeleteMsg === msg.id ? (
//                   <div className="flex items-center gap-1 shrink-0">
//                     <button
//                       onClick={() => handleDeleteMessage(msg.id)}
//                       className="text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full"
//                     >
//                       Yes
//                     </button>
//                     <button
//                       onClick={() => setConfirmDeleteMsg(null)}
//                       className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full"
//                     >
//                       No
//                     </button>
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() => setConfirmDeleteMsg(msg.id)}
//                     disabled={deletingMsg === msg.id}
//                     className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-600
//                                hover:text-red-400 hover:bg-red-400/10 rounded-lg transition shrink-0">
//                     {deletingMsg === msg.id
//                       ? <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin" />
//                       : <Trash2 size={12} />
//                     }
//                   </button>
//                 )
//               )}
//             </div>
//           );
//         })}
//       </div>
//     )}
//   </div>
// )}
//     </div>
//   );
// }






// // ─── MAIN ADMIN CLUBS ──────────────────────────────────────────────────────────
// export default function AdminClubs({ clubs, loading, onDelete, onRefresh }) {
//   const [selectedClub, setSelectedClub] = useState(null);
//   const [showCreate, setShowCreate] = useState(false);
//   const [creating, setCreating] = useState(false);
//   const [form, setForm] = useState({ title: "", description: "", category: "AI", linkedinUrl: "", maxMembers: 15 });
//   const [confirmId, setConfirmId] = useState(null);
//   const [deleting, setDeleting] = useState(false);
//   const [editClub, setEditClub] = useState(null);
//   const [editForm, setEditForm] = useState({ description: "", maxMembers: 15, linkedinUrl: "" });
//   const [editing, setEditing] = useState(false);
//   const [dissolving, setDissolving] = useState(null);
//   const [renewing, setRenewing] = useState(null);
//   const [extending, setExtending] = useState(null);
//   const [extendMax, setExtendMax] = useState(20);
//   const [search, setSearch] = useState("");

//   const token = sessionStorage.getItem("token");
//   const t = () => token;

//   const filtered = clubs.filter(c =>
//     !search.trim() ||
//     c.title.toLowerCase().includes(search.toLowerCase()) ||
//     c.category?.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleCreate = async () => {
//     if (!form.title.trim() || !form.description.trim()) return;
//     setCreating(true);
//     try {
//       const res = await fetch("http://localhost:8081/api/clubs/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${t()}` },
//         body: JSON.stringify(form)
//       });
//       if (res.ok) {
//         setShowCreate(false);
//         setForm({ title: "", description: "", category: "AI", linkedinUrl: "", maxMembers: 15 });
//         onRefresh?.();
//       }
//     } finally { setCreating(false); }
//   };

//   const handleDelete = async (id) => {
//     setDeleting(true);
//     try {
//       const res = await fetch(`http://localhost:8081/api/clubs/${id}`, {
//         method: "DELETE", headers: { Authorization: `Bearer ${t()}` }
//       });
//       if (res.ok) { onDelete(id); setConfirmId(null); if (selectedClub?.id === id) setSelectedClub(null); }
//     } finally { setDeleting(false); }
//   };

//   const handleEdit = async () => {
//     if (!editClub) return;
//     setEditing(true);
//     try {
//       const res = await fetch(`http://localhost:8081/api/clubs/${editClub.id}/admin-edit`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${t()}` },
//         body: JSON.stringify(editForm)
//       });
//       if (res.ok) { setEditClub(null); onRefresh?.(); }
//     } finally { setEditing(false); }
//   };

//   const handleDissolve = async (id) => {
//     setDissolving(id);
//     try {
//       const res = await fetch(`http://localhost:8081/api/clubs/${id}/dissolve`, {
//         method: "PATCH", headers: { Authorization: `Bearer ${t()}` }
//       });
//       if (res.ok) onRefresh?.();
//     } finally { setDissolving(null); }
//   };

//   const handleRenew = async (id) => {
//     setRenewing(id);
//     try {
//       const res = await fetch(`http://localhost:8081/api/clubs/${id}/renew`, {
//         method: "PATCH", headers: { Authorization: `Bearer ${t()}` }
//       });
//       if (res.ok) onRefresh?.();
//     } finally { setRenewing(null); }
//   };

//   const handleExtend = async (id) => {
//     const res = await fetch(`http://localhost:8081/api/clubs/${id}/extend-members`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json", Authorization: `Bearer ${t()}` },
//       body: JSON.stringify({ maxMembers: extendMax })
//     });
//     if (res.ok) { setExtending(null); onRefresh?.(); }
//   };

//   if (loading) return null;

//   // ─── DETAIL VIEW ──────────────────────────────────────────────────
//   if (selectedClub) {
//     const fresh = clubs.find(c => c.id === selectedClub.id) || selectedClub;
//     return (
//       <ClubDetailView
//         club={fresh}
//         token={token}
//         onBack={() => setSelectedClub(null)}
//         onRefresh={() => { onRefresh?.(); }}
//       />
//     );
//   }

//   // ─── LIST VIEW ────────────────────────────────────────────────────
//   return (
//     <div>
//       {/* Header */}
//       <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
//         <h2 className="text-xl font-bold">Clubs ({clubs.length})</h2>
//         <div className="flex items-center gap-2">
//           <div className="relative">
//             <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
//             <input value={search} onChange={e => setSearch(e.target.value)}
//               placeholder="Search clubs..."
//               className="bg-[#111] border border-white/10 rounded-xl pl-8 pr-3 py-2
//                          text-sm text-white placeholder-gray-500 outline-none
//                          focus:border-[#26F2D0]/50 transition w-44" />
//           </div>
//           <button onClick={() => setShowCreate(!showCreate)}
//             className="flex items-center gap-2 px-4 py-2 bg-[#26F2D0] text-black
//                        rounded-xl text-sm font-semibold hover:brightness-110 transition">
//             <Plus size={14} /> Create Club
//           </button>
//         </div>
//       </div>

//       {/* Create form */}
//       {showCreate && (
//         <div className="bg-[#1a1a1a] border border-[#26F2D0]/20 rounded-2xl p-5 mb-6 space-y-4">
//           <h3 className="text-sm font-semibold text-[#26F2D0]">Create New Club</h3>
//           <div>
//             <p className="text-xs text-gray-500 mb-2">Quick pick:</p>
//             <div className="flex gap-2 flex-wrap">
//               {PREDEFINED_CLUBS.map(c => (
//                 <button key={c.title}
//                   onClick={() => setForm(p => ({ ...p, title: c.title, category: c.category }))}
//                   className={`text-xs px-3 py-1 rounded-full border transition
//                     ${form.title === c.title
//                       ? "bg-[#26F2D0]/20 text-[#26F2D0] border-[#26F2D0]/30"
//                       : "border-white/10 text-gray-500 hover:border-white/20"}`}>
//                   {c.emoji} {c.title}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
//             placeholder="Club title..."
//             className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#26F2D0]/50 transition" />
//           <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
//             placeholder="Club description..." rows={3}
//             className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none resize-none focus:border-[#26F2D0]/50 transition" />
//           <div className="flex gap-3 flex-wrap">
//             <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
//               className="flex-1 bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#26F2D0]/50 transition">
//               {PREDEFINED_CLUBS.map(c => <option key={c.category} value={c.category}>{c.emoji} {c.title}</option>)}
//             </select>
//             <div className="flex items-center gap-2">
//               <span className="text-xs text-gray-500 whitespace-nowrap">Max:</span>
//               <input type="number" value={form.maxMembers} min={5} max={50}
//                 onChange={e => setForm(p => ({ ...p, maxMembers: parseInt(e.target.value) }))}
//                 className="w-16 bg-[#111] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none" />
//             </div>
//           </div>
//           <input value={form.linkedinUrl} onChange={e => setForm(p => ({ ...p, linkedinUrl: e.target.value }))}
//             placeholder="LinkedIn URL (optional)"
//             className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#26F2D0]/50 transition" />
//           <div className="flex gap-2 justify-end">
//             <button onClick={() => setShowCreate(false)}
//               className="px-4 py-2 bg-white/10 text-gray-300 rounded-xl text-sm hover:bg-white/20 transition">Cancel</button>
//             <button onClick={handleCreate} disabled={!form.title.trim() || !form.description.trim() || creating}
//               className="px-4 py-2 bg-[#26F2D0] text-black rounded-xl text-sm font-semibold hover:brightness-110 transition disabled:opacity-40">
//               {creating ? "Creating..." : "Create Club"}
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Edit modal */}
//       {editClub && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-sm">
//             <h3 className="text-white font-bold mb-4 flex items-center gap-2">
//               <Pencil size={16} className="text-[#26F2D0]" /> Edit — {editClub.title}
//             </h3>
//             <div className="space-y-3">
//               <textarea value={editForm.description}
//                 onChange={e => setEditForm(p => ({ ...p, description: e.target.value }))}
//                 placeholder="Description..." rows={3}
//                 className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none resize-none focus:border-[#26F2D0]/50" />
//               <div className="flex items-center gap-3">
//                 <label className="text-xs text-gray-500 whitespace-nowrap">Max members:</label>
//                 <input type="number" value={editForm.maxMembers} min={5} max={100}
//                   onChange={e => setEditForm(p => ({ ...p, maxMembers: parseInt(e.target.value) }))}
//                   className="w-20 bg-[#111] border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none" />
//               </div>
//               <input value={editForm.linkedinUrl}
//                 onChange={e => setEditForm(p => ({ ...p, linkedinUrl: e.target.value }))}
//                 placeholder="LinkedIn URL..."
//                 className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#26F2D0]/50" />
//               <div className="flex gap-2">
//                 <button onClick={() => setEditClub(null)}
//                   className="flex-1 py-2 bg-white/10 text-gray-300 rounded-xl text-sm hover:bg-white/20 transition">Cancel</button>
//                 <button onClick={handleEdit} disabled={editing}
//                   className="flex-1 py-2 bg-[#26F2D0] text-black rounded-xl text-sm font-semibold hover:brightness-110 transition disabled:opacity-40">
//                   {editing ? "Saving..." : "Save"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Clubs grid */}
//       {filtered.length === 0 && (
//         <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
//           <p className="text-3xl mb-3">🏛️</p>
//           <p className="text-gray-400 text-sm">{clubs.length === 0 ? "No clubs yet. Create the first one!" : "No clubs match your search."}</p>
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//         {filtered.map(club => (
//           <div key={club.id}
//             className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 overflow-hidden hover:border-white/20 transition">

//             {/* Delete confirm overlay */}
//             {confirmId === club.id && (
//               <div className="absolute inset-0 bg-[#1a1a1a]/95 rounded-2xl z-20 flex flex-col items-center justify-center gap-3 p-4">
//                 <Trash2 size={24} className="text-red-400" />
//                 <p className="text-white font-semibold text-sm text-center">Delete "{club.title}"?</p>
//                 <p className="text-gray-400 text-xs text-center">All member data and activities will be lost.</p>
//                 <div className="flex gap-2">
//                   <button onClick={() => setConfirmId(null)}
//                     className="px-4 py-2 bg-white/10 text-gray-300 rounded-xl text-xs hover:bg-white/20 transition">Cancel</button>
//                   <button onClick={() => handleDelete(club.id)} disabled={deleting}
//                     className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold hover:bg-red-700 transition disabled:opacity-50">
//                     {deleting ? "..." : "Yes, Delete"}
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Card top */}
//             <div className="flex items-start justify-between mb-2">
//               <div className="flex items-center gap-2">
//                 <span className="text-xl">{club.logoEmoji || "🏛️"}</span>
//                 <div>
//                   <h3 className="font-semibold text-white text-sm">{club.title}</h3>
//                   <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[club.status] || "bg-gray-500/20 text-gray-400"}`}>
//                     {club.status}
//                   </span>
//                 </div>
//               </div>
//               <button onClick={() => setConfirmId(club.id)}
//                 className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition">
//                 <Trash2 size={14} />
//               </button>
//             </div>

//             <p className="text-gray-400 text-xs mb-3 line-clamp-2">{club.description}</p>

//             <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
//               <span className="flex items-center gap-1"><Users size={11} /> {club.memberCount}/{club.maxMembers}</span>
//               <span className="flex items-center gap-1"><ClipboardList size={11} /> {club.completedActivities}/{club.totalActivities}</span>
//             </div>

//             {(club.presidentName || club.vpName) && (
//               <div className="flex gap-3 mb-3 text-xs flex-wrap">
//                 {club.presidentName && (
//                   <span className="text-purple-400 flex items-center gap-1"><Crown size={10} /> {club.presidentName}</span>
//                 )}
//                 {club.vpName && <span className="text-blue-400">🤝 {club.vpName}</span>}
//               </div>
//             )}

//             {/* Actions */}
//             <div className="flex gap-1.5 flex-wrap">
//               {/* View detail */}
//               <button onClick={() => setSelectedClub(club)}
//                 className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-[#26F2D0]/10 text-[#26F2D0]
//                            border border-[#26F2D0]/20 rounded-lg hover:bg-[#26F2D0]/20 transition font-medium">
//                 <Eye size={11} /> Manage
//               </button>

//               <button onClick={() => { setEditClub(club); setEditForm({ description: club.description, maxMembers: club.maxMembers, linkedinUrl: club.linkedinUrl || "" }); }}
//                 className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-white/5 text-gray-400
//                            border border-white/10 rounded-lg hover:border-white/20 transition">
//                 <Pencil size={11} /> Edit
//               </button>

//               {club.status === "ACTIVE" ? (
//                 <button onClick={() => { if (window.confirm(`Dissolve "${club.title}"?`)) handleDissolve(club.id); }}
//                   disabled={dissolving === club.id}
//                   className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-orange-500/10 text-orange-400
//                              border border-orange-500/20 rounded-lg hover:bg-orange-500/20 transition disabled:opacity-50">
//                   <AlertTriangle size={11} /> {dissolving === club.id ? "..." : "Dissolve"}
//                 </button>
//               ) : (
//                 <button onClick={() => { if (window.confirm(`Renew "${club.title}"?`)) handleRenew(club.id); }}
//                   disabled={renewing === club.id}
//                   className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-green-500/10 text-green-400
//                              border border-green-500/20 rounded-lg hover:bg-green-500/20 transition disabled:opacity-50">
//                   <RotateCcw size={11} /> {renewing === club.id ? "..." : "Renew"}
//                 </button>
//               )}

//               {extending === club.id ? (
//                 <div className="flex items-center gap-1">
//                   <input type="number" value={extendMax} min={club.maxMembers + 1} max={100}
//                     onChange={e => setExtendMax(parseInt(e.target.value))}
//                     className="w-14 bg-[#111] border border-white/20 rounded-lg px-2 py-1 text-xs text-white outline-none" />
//                   <button onClick={() => handleExtend(club.id)}
//                     className="p-1.5 bg-[#26F2D0] text-black rounded-lg">
//                     <Check size={11} />
//                   </button>
//                   <button onClick={() => setExtending(null)}
//                     className="p-1.5 bg-white/10 text-gray-400 rounded-lg">
//                     <X size={11} />
//                   </button>
//                 </div>
//               ) : (
//                 <button onClick={() => { setExtending(club.id); setExtendMax(club.maxMembers + 5); }}
//                   className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-white/5 text-gray-400
//                              border border-white/10 rounded-lg hover:border-white/20 transition">
//                   <Users size={11} /> Extend
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }







import { useState, useEffect } from "react";
import {
  Trash2, Plus, Crown, UserMinus, X, Check, Pencil,
  RotateCcw, AlertTriangle, Users, ChevronLeft,
  CheckCircle2, Circle, MessageSquare, ClipboardList,
  ShieldCheck, UserCheck, Search, Eye, RefreshCw,
  Megaphone, Pin, Bot, Printer, Code2, Cog, Rocket,
  Star, Trophy, Music2, Mic2, Camera, Heart
} from "lucide-react";

const PREDEFINED_CLUBS = [
  { title: "Artificial Intelligence Club", category: "AI", emoji: "🤖" },
  { title: "3D Printing Club", category: "3D_PRINTING", emoji: "🖨️" },
  { title: "Web Development Club", category: "WEB_DEV", emoji: "💻" },
  { title: "Robotics Club", category: "ROBOTICS", emoji: "🦾" },
  { title: "Entrepreneurship Club", category: "ENTREPRENEURSHIP", emoji: "🚀" },
  { title: "Technical Fest", category: "TECH_FEST", emoji: "🎉" },
  { title: "Sports Club", category: "SPORTS", emoji: "⚽" },
  { title: "Cultural Club", category: "CULTURAL", emoji: "🎭" },
  { title: "Toastmasters Club", category: "TOASTMASTERS", emoji: "🎤" },
  { title: "Photography Club", category: "PHOTOGRAPHY", emoji: "📷" },
  { title: "Social Welfare Club", category: "CULTURAL", emoji: "🤝" },
];

const STATUS_COLORS = {
  ACTIVE:    "bg-green-500/20 text-green-400",
  DISSOLVED: "bg-red-500/20 text-red-400",
  COMPLETED: "bg-yellow-500/20 text-yellow-400",
};

// ✅ Lucide icon map per category
const CLUB_ICONS = {
  AI:               <Bot size={20} className="text-purple-400" />,
  "3D_PRINTING":    <Printer size={20} className="text-orange-400" />,
  WEB_DEV:          <Code2 size={20} className="text-blue-400" />,
  ROBOTICS:         <Cog size={20} className="text-cyan-400" />,
  ENTREPRENEURSHIP: <Rocket size={20} className="text-green-400" />,
  TECH_FEST:        <Star size={20} className="text-yellow-400" />,
  SPORTS:           <Trophy size={20} className="text-red-400" />,
  CULTURAL:         <Music2 size={20} className="text-pink-400" />,
  TOASTMASTERS:     <Mic2 size={20} className="text-indigo-400" />,
  PHOTOGRAPHY:      <Camera size={20} className="text-amber-400" />,
};

const ClubIcon = ({ category, size = 20 }) => {
  const icon = CLUB_ICONS[category];
  return icon ? <span className="flex items-center justify-center">{icon}</span>
    : <span className="text-xl">🏛️</span>;
};

// ─── DETAIL VIEW ──────────────────────────────────────────────────────────────
function ClubDetailView({ club, token, onBack, onRefresh }) {
  const [activeTab, setActiveTab] = useState("activities");
  const [completing, setCompleting] = useState(null);
  const [deletingActivity, setDeletingActivity] = useState(null);
  const [deletingMsg, setDeletingMsg] = useState(null);
  const [confirmingAll, setConfirmingAll] = useState(false);
  const [confirmingOne, setConfirmingOne] = useState(null);
  const [editActivity, setEditActivity] = useState(null);
  const [editActivityForm, setEditActivityForm] = useState({ title: "", description: "" });
  const [removingMember, setRemovingMember] = useState(null);
  const [confirmRemove, setConfirmRemove] = useState(null);
  const [confirmDeleteMsg, setConfirmDeleteMsg] = useState(null);
  const [roleForm, setRoleForm] = useState({ rollNumber: "", role: "PRESIDENT" });
  const [assigning, setAssigning] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [deletingAnn, setDeletingAnn] = useState(null);
  const [pinningAnn, setPinningAnn] = useState(null);

  const t = () => token;

  const completedCount = club.activities?.filter(a => a.completed).length || 0;
  const totalCount = club.activities?.length || 0;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // ─── HANDLERS ─────────────────────────────────────────────────────

  const handleCompleteActivity = async (activityId) => {
    setCompleting(activityId);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/activities/${activityId}/admin-complete`, {
        method: "PATCH", headers: { Authorization: `Bearer ${t()}` }
      });
      if (res.ok) onRefresh();
    } finally { setCompleting(null); }
  };

  const handleUndoActivity = async (activityId) => {
    setCompleting(activityId);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/activities/${activityId}/admin-undo`, {
        method: "PATCH", headers: { Authorization: `Bearer ${t()}` }
      });
      if (res.ok) onRefresh();
    } finally { setCompleting(null); }
  };

  const handleDeleteActivity = async (activityId) => {
    setDeletingActivity(activityId);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/activities/${activityId}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${t()}` }
      });
      if (res.ok) onRefresh();
    } finally { setDeletingActivity(null); }
  };

  // ✅ actually deletes message from DB
  const handleDeleteMessage = async (msgId) => {
    setDeletingMsg(msgId);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/messages/${msgId}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${t()}` }
      });
      if (res.ok) { setConfirmDeleteMsg(null); onRefresh(); }
      else alert(await res.text());
    } finally { setDeletingMsg(null); }
  };

  const handleConfirmAll = async () => {
    setConfirmingAll(true);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/admin-confirm-all`, {
        method: "POST", headers: { Authorization: `Bearer ${t()}` }
      });
      if (res.ok) onRefresh();
    } finally { setConfirmingAll(false); }
  };

  const handleConfirmOne = async (rollNumber) => {
    setConfirmingOne(rollNumber);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/admin-confirm-one`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${t()}` },
        body: JSON.stringify({ rollNumber })
      });
      if (res.ok) onRefresh();
    } finally { setConfirmingOne(null); }
  };

  const handleRemoveMember = async (rollNumber) => {
    setRemovingMember(rollNumber);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/admin-remove-member`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${t()}` },
        body: JSON.stringify({ rollNumber })
      });
      if (res.ok) { setConfirmRemove(null); onRefresh(); }
    } finally { setRemovingMember(null); }
  };

  const handleAssignRole = async () => {
    if (!roleForm.rollNumber.trim()) return;
    setAssigning(true);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/assign-role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${t()}` },
        body: JSON.stringify(roleForm)
      });
      if (res.ok) { setShowRoleModal(false); onRefresh(); }
      else alert(await res.text());
    } finally { setAssigning(false); }
  };

  const handleDeleteAnnouncement = async (annId) => {
    setDeletingAnn(annId);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/announcements/${annId}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${t()}` }
      });
      if (res.ok) onRefresh();
    } finally { setDeletingAnn(null); }
  };

  const handlePinAnnouncement = async (annId) => {
    setPinningAnn(annId);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/announcements/${annId}/pin`, {
        method: "PATCH", headers: { Authorization: `Bearer ${t()}` }
      });
      if (res.ok) onRefresh();
    } finally { setPinningAnn(null); }
  };

  const TABS = [
    { key: "activities",    label: "Activities",    icon: <ClipboardList size={13} />, count: `${completedCount}/${totalCount}` },
    { key: "members",       label: "Members",        icon: <Users size={13} />,         count: club.memberCount },
    { key: "announcements", label: "Announcements",  icon: <Megaphone size={13} />,     count: club.announcements?.length || 0 },
    { key: "chat",          label: "Chat",           icon: <MessageSquare size={13} />, count: club.messages?.length || 0 },
  ];

  return (
    <div>
      {/* Back */}
      <button onClick={onBack}
        className="flex items-center gap-2 text-[#26F2D0] hover:text-white text-sm font-medium mb-5 transition w-fit">
        <ChevronLeft size={16} /> Back to Clubs
      </button>

      {/* Club header */}
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 mb-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10
                            flex items-center justify-center shrink-0">
              <ClubIcon category={club.category} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-white font-bold text-lg">{club.title}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[club.status] || "bg-gray-500/20 text-gray-400"}`}>
                  {club.status}
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-1">{club.description}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 flex-wrap">
                <span className="flex items-center gap-1"><Users size={11} /> {club.memberCount}/{club.maxMembers}</span>
                <span>📋 {progressPct}% done</span>
                {club.presidentName && (
                  <span className="flex items-center gap-1 text-purple-400">
                    <Crown size={10} /> {club.presidentName}
                  </span>
                )}
                {club.vpName && <span className="text-blue-400">🤝 {club.vpName}</span>}
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setShowRoleModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs bg-purple-500/10 text-purple-400
                         border border-purple-500/20 rounded-xl hover:bg-purple-500/20 transition font-medium">
              <Crown size={12} /> Assign Role
            </button>
            <button onClick={handleConfirmAll}
              disabled={confirmingAll || !club.pendingMembers?.length}
              className="flex items-center gap-1.5 px-3 py-2 text-xs bg-green-500/10 text-green-400
                         border border-green-500/20 rounded-xl hover:bg-green-500/20 transition font-medium
                         disabled:opacity-40">
              <RefreshCw size={12} className={confirmingAll ? "animate-spin" : ""} />
              Confirm All ({club.pendingMembers?.length || 0})
            </button>
          </div>
        </div>

        {totalCount > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Activity Progress</span>
              <span>{completedCount}/{totalCount} completed</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="h-2 rounded-full bg-gradient-to-r from-[#26F2D0] to-purple-400 transition-all"
                style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Role modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Crown size={16} className="text-purple-400" /> Assign Role
            </h3>
            <div className="space-y-3">
              <input value={roleForm.rollNumber}
                onChange={e => setRoleForm(p => ({ ...p, rollNumber: e.target.value }))}
                placeholder="Student roll number..."
                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#26F2D0]/50" />
              {club.memberDetails?.length > 0 && (
                <div className="bg-white/5 rounded-xl p-3 max-h-36 overflow-y-auto">
                  <p className="text-xs text-gray-500 mb-2">Click to select:</p>
                  {club.memberDetails.map(m => (
                    <div key={m.rollNumber} onClick={() => setRoleForm(p => ({ ...p, rollNumber: m.rollNumber }))}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer text-xs transition
                        ${roleForm.rollNumber === m.rollNumber ? "bg-purple-500/20 text-purple-400" : "hover:bg-white/5 text-gray-300"}`}>
                      <span>{m.name}</span>
                      <span className="font-mono text-gray-500">{m.rollNumber}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                {["PRESIDENT", "VP"].map(r => (
                  <button key={r} onClick={() => setRoleForm(p => ({ ...p, role: r }))}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition border
                      ${roleForm.role === r
                        ? r === "PRESIDENT" ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                          : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                        : "bg-white/5 text-gray-400 border-white/10"}`}>
                    {r === "PRESIDENT" ? "👑 President" : "🤝 VP"}
                  </button>
                ))}
              </div>
              {club.roleRequests?.filter(r => r.status === "PENDING").length > 0 && (
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-2">Pending requests:</p>
                  {club.roleRequests.filter(r => r.status === "PENDING").map(r => (
                    <div key={r.id} className="flex items-center justify-between text-xs py-1">
                      <span className="text-white">{r.requestedByName}</span>
                      <span className="text-gray-500">{r.role}</span>
                      <button onClick={() => setRoleForm({ rollNumber: r.requestedBy, role: r.role })}
                        className="text-[#26F2D0] hover:underline">Use</button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <button onClick={() => setShowRoleModal(false)}
                  className="flex-1 py-2 bg-white/10 text-gray-300 rounded-xl text-sm hover:bg-white/20 transition">Cancel</button>
                <button onClick={handleAssignRole} disabled={!roleForm.rollNumber.trim() || assigning}
                  className="flex-1 py-2 bg-[#26F2D0] text-black rounded-xl text-sm font-semibold hover:brightness-110 transition disabled:opacity-40">
                  {assigning ? "Assigning..." : "Assign"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/10 mb-4 overflow-x-auto">
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium whitespace-nowrap rounded-t-lg transition
              ${activeTab === tab.key
                ? "bg-[#26F2D0]/10 text-[#26F2D0] border-b-2 border-[#26F2D0]"
                : "text-gray-400 hover:text-white"}`}>
            {tab.icon} {tab.label}
            <span className={`px-1.5 py-0.5 rounded-full text-xs
              ${activeTab === tab.key ? "bg-[#26F2D0]/20 text-[#26F2D0]" : "bg-white/10 text-gray-500"}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* ── ACTIVITIES ─────────────────────────────────────────────── */}
      {activeTab === "activities" && (
        <div className="space-y-2">
          {!club.activityUnlocked && (
            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl px-4 py-3 text-xs text-yellow-400 mb-3">
              ⚠️ Locked for members (need {Math.ceil(club.maxMembers * 0.5)} members). Admin can manage freely.
            </div>
          )}
          {totalCount === 0 ? (
            <div className="text-center py-12 text-gray-500 text-sm">
              <ClipboardList size={24} className="mx-auto mb-2 opacity-30" />
              <p>No activities. Recreate this club to seed 15 activities.</p>
            </div>
          ) : (
            club.activities?.map((activity, idx) => (
              <div key={activity.id}
                className={`border rounded-xl p-4 transition-all
                  ${activity.completed ? "bg-green-500/5 border-green-500/20"
                    : activity.extra ? "bg-purple-500/5 border-purple-500/15"
                    : "bg-[#1a1a1a] border-white/10"}`}>

                {editActivity === activity.id ? (
                  <div className="space-y-2">
                    <input value={editActivityForm.title}
                      onChange={e => setEditActivityForm(p => ({ ...p, title: e.target.value }))}
                      className="w-full bg-[#111] border border-[#26F2D0]/30 rounded-lg px-3 py-1.5 text-sm text-white outline-none" />
                    <textarea value={editActivityForm.description} rows={2}
                      onChange={e => setEditActivityForm(p => ({ ...p, description: e.target.value }))}
                      className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none resize-none" />
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => setEditActivity(null)}
                        className="flex items-center gap-1 px-3 py-1 bg-white/10 text-gray-300 rounded-lg text-xs hover:bg-white/20 transition">
                        <X size={10} /> Cancel
                      </button>
                      <button onClick={() => setEditActivity(null)}
                        className="flex items-center gap-1 px-3 py-1 bg-[#26F2D0] text-black rounded-lg text-xs font-semibold">
                        <Check size={10} /> Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    {activity.completed
                      ? <CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" />
                      : <Circle size={16} className="text-gray-600 shrink-0 mt-0.5" />
                    }
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-sm font-medium ${activity.completed ? "text-gray-400 line-through" : "text-white"}`}>
                          {idx + 1}. {activity.title}
                        </span>
                        {activity.extra && (
                          <span className="text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30 px-1.5 py-0.5 rounded-full">
                            Extra
                          </span>
                        )}
                        {activity.completed && activity.completedAt && (
                          <span className="text-xs text-green-400">
                            ✓ {new Date(activity.completedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          </span>
                        )}
                      </div>
                      {activity.description && (
                        <p className="text-xs text-gray-500 mt-0.5">{activity.description}</p>
                      )}
                      <p className="text-xs text-gray-700 mt-0.5">
                        {activity.votes?.length || 0} votes · by {activity.addedByName || "Admin"}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {!activity.completed ? (
                        <button onClick={() => handleCompleteActivity(activity.id)}
                          disabled={completing === activity.id}
                          className="flex items-center gap-1 px-2 py-1 text-xs bg-green-500/10 text-green-400
                                     border border-green-500/20 rounded-lg hover:bg-green-500/20 transition">
                          {completing === activity.id
                            ? <div className="w-3 h-3 border border-green-400 border-t-transparent rounded-full animate-spin" />
                            : <><ShieldCheck size={11} /> Complete</>
                          }
                        </button>
                      ) : (
                        <button onClick={() => handleUndoActivity(activity.id)}
                          disabled={completing === activity.id}
                          className="flex items-center gap-1 px-2 py-1 text-xs bg-yellow-500/10 text-yellow-400
                                     border border-yellow-500/20 rounded-lg hover:bg-yellow-500/20 transition">
                          {completing === activity.id
                            ? <div className="w-3 h-3 border border-yellow-400 border-t-transparent rounded-full animate-spin" />
                            : <><RotateCcw size={11} /> Undo</>
                          }
                        </button>
                      )}
                      <button onClick={() => { setEditActivity(activity.id); setEditActivityForm({ title: activity.title, description: activity.description || "" }); }}
                        className="p-1.5 text-gray-600 hover:text-[#26F2D0] hover:bg-[#26F2D0]/10 rounded-lg transition">
                        <Pencil size={12} />
                      </button>
                      <button onClick={() => handleDeleteActivity(activity.id)}
                        disabled={deletingActivity === activity.id}
                        className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition">
                        {deletingActivity === activity.id
                          ? <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin" />
                          : <Trash2 size={12} />
                        }
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* ── MEMBERS ────────────────────────────────────────────────── */}
      {activeTab === "members" && (
        <div className="space-y-4">
          {club.pendingMembers?.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-yellow-400 flex items-center gap-1">
                  <Users size={12} /> Grace Period ({club.pendingMembers.length})
                </p>
                <button onClick={handleConfirmAll} disabled={confirmingAll}
                  className="flex items-center gap-1 px-3 py-1 text-xs bg-green-500/10 text-green-400
                             border border-green-500/20 rounded-lg hover:bg-green-500/20 transition">
                  <RefreshCw size={10} className={confirmingAll ? "animate-spin" : ""} /> Confirm All
                </button>
              </div>
              <div className="space-y-2">
                {club.pendingMembers.map(p => {
                  const hoursLeft = Math.max(0,
                    48 - (Date.now() - new Date(p.joinedAt).getTime()) / 3600000
                  ).toFixed(0);
                  return (
                    <div key={p.rollNumber}
                      className="flex items-center gap-3 bg-yellow-500/5 border border-yellow-500/20 rounded-xl px-4 py-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400
                                      flex items-center justify-center text-xs font-bold shrink-0">
                        {p.name?.[0]?.toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{p.name}</p>
                        <p className="text-yellow-500/70 text-xs">{hoursLeft}h left</p>
                      </div>
                      {confirmRemove === p.rollNumber ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleRemoveMember(p.rollNumber)} disabled={removingMember === p.rollNumber}
                            className="text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
                            {removingMember === p.rollNumber ? "..." : "Yes"}
                          </button>
                          <button onClick={() => setConfirmRemove(null)}
                            className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">No</button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleConfirmOne(p.rollNumber)}
                            disabled={confirmingOne === p.rollNumber}
                            title="Confirm this member"
                            className="p-1.5 text-gray-600 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition">
                            {confirmingOne === p.rollNumber
                              ? <div className="w-3 h-3 border border-green-400 border-t-transparent rounded-full animate-spin" />
                              : <UserCheck size={13} />
                            }
                          </button>
                          <button onClick={() => setConfirmRemove(p.rollNumber)}
                            className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition">
                            <UserMinus size={13} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold text-white mb-2 flex items-center gap-1">
              <Users size={12} className="text-[#26F2D0]" />
              Confirmed ({club.memberDetails?.filter(m =>
                !club.pendingMembers?.some(p => p.rollNumber === m.rollNumber)
              ).length || 0})
            </p>
            <div className="space-y-2">
              {club.memberDetails?.filter(m =>
                !club.pendingMembers?.some(p => p.rollNumber === m.rollNumber)
              ).map((m, i) => (
                <div key={m.rollNumber}
                  className="flex items-center gap-3 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-[#26F2D0]/15 text-[#26F2D0]
                                  flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-white text-sm font-medium">{m.name}</p>
                      {m.rollNumber === club.presidentRoll && (
                        <span className="text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                          <Crown size={9} /> President
                        </span>
                      )}
                      {m.rollNumber === club.vpRoll && (
                        <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded-full">
                          🤝 VP
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs">{m.rollNumber} · {m.year} · {m.branch}</p>
                  </div>
                  {confirmRemove === m.rollNumber ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleRemoveMember(m.rollNumber)} disabled={removingMember === m.rollNumber}
                        className="text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
                        {removingMember === m.rollNumber ? "..." : "Yes"}
                      </button>
                      <button onClick={() => setConfirmRemove(null)}
                        className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">No</button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmRemove(m.rollNumber)}
                      className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition">
                      <UserMinus size={13} />
                    </button>
                  )}
                </div>
              ))}
              {club.memberDetails?.filter(m =>
                !club.pendingMembers?.some(p => p.rollNumber === m.rollNumber)
              ).length === 0 && (
                <p className="text-center text-gray-600 text-sm py-6">No confirmed members yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── ANNOUNCEMENTS ──────────────────────────────────────────── */}
      {activeTab === "announcements" && (
        <div className="space-y-3">
          {(!club.announcements || club.announcements.length === 0) ? (
            <div className="text-center py-12 text-gray-500 text-sm">
              <Megaphone size={24} className="mx-auto mb-2 opacity-30" />
              <p>No announcements yet.</p>
            </div>
          ) : (
            [...club.announcements].sort((a, b) => {
              if (a.pinned && !b.pinned) return -1;
              if (!a.pinned && b.pinned) return 1;
              return new Date(b.createdAt) - new Date(a.createdAt);
            }).map(ann => (
              <div key={ann.id}
                className={`flex items-start gap-3 border rounded-xl p-4
                  ${ann.pinned ? "bg-yellow-500/5 border-yellow-500/20" : "bg-[#1a1a1a] border-white/10"}`}>
                {ann.pinned && <Pin size={13} className="text-yellow-400 shrink-0 mt-0.5" />}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold">{ann.title}</p>
                  <p className="text-gray-400 text-xs mt-1 leading-relaxed">{ann.content}</p>
                  <p className="text-gray-600 text-xs mt-2">
                    by {ann.postedByName} · {ann.createdAt
                      ? new Date(ann.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                      : ""}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => handlePinAnnouncement(ann.id)}
                    disabled={pinningAnn === ann.id}
                    title={ann.pinned ? "Unpin" : "Pin"}
                    className={`p-1.5 rounded-lg transition ${ann.pinned ? "text-yellow-400" : "text-gray-600 hover:text-yellow-400 hover:bg-yellow-400/10"}`}>
                    <Pin size={13} />
                  </button>
                  <button onClick={() => handleDeleteAnnouncement(ann.id)}
                    disabled={deletingAnn === ann.id}
                    className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition">
                    {deletingAnn === ann.id
                      ? <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin" />
                      : <Trash2 size={13} />
                    }
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ── CHAT ───────────────────────────────────────────────────── */}
      {activeTab === "chat" && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-gray-500">Admin can delete any message · deleted permanently from DB</p>
            <span className="text-xs text-gray-600">{club.messages?.length || 0}/100</span>
          </div>
          {(!club.messages || club.messages.length === 0) ? (
            <div className="text-center py-12 text-gray-500 text-sm">
              <MessageSquare size={24} className="mx-auto mb-2 opacity-30" />
              <p>No messages yet.</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {club.messages.map(msg => {
                const isPres = msg.senderRoll === club.presidentRoll;
                return (
                  <div key={msg.id}
                    className={`flex items-start gap-3 rounded-xl px-4 py-3 border group
                      ${isPres ? "bg-purple-500/5 border-purple-500/15" : "bg-[#1a1a1a] border-white/10"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center
                                    text-xs font-bold shrink-0
                                    ${isPres ? "bg-purple-500/30 text-purple-300" : "bg-white/10 text-gray-300"}`}>
                      {msg.senderName?.[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-xs font-medium ${isPres ? "text-purple-400" : "text-white"}`}>
                          {msg.senderName}{isPres ? " 👑" : ""}
                        </span>
                        <span className="text-xs text-gray-600">
                          {msg.createdAt ? new Date(msg.createdAt).toLocaleString("en-IN", {
                            day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
                          }) : ""}
                        </span>
                      </div>
                      <p className="text-sm text-gray-200">{msg.content}</p>
                    </div>
                    {confirmDeleteMsg === msg.id ? (
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={() => handleDeleteMessage(msg.id)} disabled={deletingMsg === msg.id}
                          className="text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full font-semibold">
                          {deletingMsg === msg.id ? "..." : "Delete"}
                        </button>
                        <button onClick={() => setConfirmDeleteMsg(null)}
                          className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirmDeleteMsg(msg.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-600
                                   hover:text-red-400 hover:bg-red-400/10 rounded-lg transition shrink-0">
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── MAIN ADMIN CLUBS LIST ────────────────────────────────────────────────────
export default function AdminClubs({ clubs, loading, onDelete, onRefresh }) {
  const [selectedClub, setSelectedClub] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", category: "AI", linkedinUrl: "", maxMembers: 15 });
  const [confirmId, setConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [editClub, setEditClub] = useState(null);
  const [editForm, setEditForm] = useState({ description: "", maxMembers: 15, linkedinUrl: "" });
  const [editing, setEditing] = useState(false);
  const [dissolving, setDissolving] = useState(null);
  const [renewing, setRenewing] = useState(null);
  const [extending, setExtending] = useState(null);
  const [extendMax, setExtendMax] = useState(20);
  const [search, setSearch] = useState("");

  const token = sessionStorage.getItem("token");
  const t = () => token;

  const filtered = clubs.filter(c =>
    !search.trim() ||
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category?.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async () => {
    if (!form.title.trim() || !form.description.trim()) return;
    setCreating(true);
    try {
      const res = await fetch("http://localhost:8081/api/clubs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${t()}` },
        body: JSON.stringify(form)
      });
      if (res.ok) { setShowCreate(false); setForm({ title: "", description: "", category: "AI", linkedinUrl: "", maxMembers: 15 }); onRefresh?.(); }
    } finally { setCreating(false); }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${id}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${t()}` }
      });
      if (res.ok) { onDelete(id); setConfirmId(null); if (selectedClub?.id === id) setSelectedClub(null); }
    } finally { setDeleting(false); }
  };

  const handleEdit = async () => {
    if (!editClub) return;
    setEditing(true);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${editClub.id}/admin-edit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${t()}` },
        body: JSON.stringify(editForm)
      });
      if (res.ok) { setEditClub(null); onRefresh?.(); }
    } finally { setEditing(false); }
  };

  const handleDissolve = async (id) => {
    setDissolving(id);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${id}/dissolve`, {
        method: "PATCH", headers: { Authorization: `Bearer ${t()}` }
      });
      if (res.ok) onRefresh?.();
    } finally { setDissolving(null); }
  };

  const handleRenew = async (id) => {
    setRenewing(id);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${id}/renew`, {
        method: "PATCH", headers: { Authorization: `Bearer ${t()}` }
      });
      if (res.ok) onRefresh?.();
    } finally { setRenewing(null); }
  };

  const handleExtend = async (id) => {
    const res = await fetch(`http://localhost:8081/api/clubs/${id}/extend-members`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${t()}` },
      body: JSON.stringify({ maxMembers: extendMax })
    });
    if (res.ok) { setExtending(null); onRefresh?.(); }
  };

  if (loading) return null;

  if (selectedClub) {
    const fresh = clubs.find(c => c.id === selectedClub.id) || selectedClub;
    return (
      <ClubDetailView
        club={fresh}
        token={token}
        onBack={() => setSelectedClub(null)}
        onRefresh={onRefresh}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="text-xl font-bold">Clubs ({clubs.length})</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search clubs..."
              className="bg-[#111] border border-white/10 rounded-xl pl-8 pr-3 py-2
                         text-sm text-white placeholder-gray-500 outline-none focus:border-[#26F2D0]/50 transition w-44" />
          </div>
          <button onClick={() => setShowCreate(!showCreate)}
            className="flex items-center gap-2 px-4 py-2 bg-[#26F2D0] text-black
                       rounded-xl text-sm font-semibold hover:brightness-110 transition">
            <Plus size={14} /> Create Club
          </button>
        </div>
      </div>

      {showCreate && (
        <div className="bg-[#1a1a1a] border border-[#26F2D0]/20 rounded-2xl p-5 mb-6 space-y-4">
          <h3 className="text-sm font-semibold text-[#26F2D0]">Create New Club</h3>
          <div className="flex gap-2 flex-wrap">
            {PREDEFINED_CLUBS.map(c => (
              <button key={c.title} onClick={() => setForm(p => ({ ...p, title: c.title, category: c.category }))}
                className={`text-xs px-3 py-1 rounded-full border transition
                  ${form.title === c.title ? "bg-[#26F2D0]/20 text-[#26F2D0] border-[#26F2D0]/30" : "border-white/10 text-gray-500 hover:border-white/20"}`}>
                {c.emoji} {c.title}
              </button>
            ))}
          </div>
          <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
            placeholder="Club title..."
            className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#26F2D0]/50 transition" />
          <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            placeholder="Club description..." rows={3}
            className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none resize-none focus:border-[#26F2D0]/50 transition" />
          <div className="flex gap-3 flex-wrap">
            <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
              className="flex-1 bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#26F2D0]/50 transition">
              {PREDEFINED_CLUBS.map(c => <option key={c.category} value={c.category}>{c.emoji} {c.title}</option>)}
            </select>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Max:</span>
              <input type="number" value={form.maxMembers} min={5} max={50}
                onChange={e => setForm(p => ({ ...p, maxMembers: parseInt(e.target.value) }))}
                className="w-16 bg-[#111] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none" />
            </div>
          </div>
          <input value={form.linkedinUrl} onChange={e => setForm(p => ({ ...p, linkedinUrl: e.target.value }))}
            placeholder="LinkedIn URL (optional)"
            className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#26F2D0]/50 transition" />
          <div className="flex gap-2 justify-end">
            <button onClick={() => setShowCreate(false)}
              className="px-4 py-2 bg-white/10 text-gray-300 rounded-xl text-sm hover:bg-white/20 transition">Cancel</button>
            <button onClick={handleCreate} disabled={!form.title.trim() || !form.description.trim() || creating}
              className="px-4 py-2 bg-[#26F2D0] text-black rounded-xl text-sm font-semibold hover:brightness-110 transition disabled:opacity-40">
              {creating ? "Creating..." : "Create Club"}
            </button>
          </div>
        </div>
      )}

      {editClub && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Pencil size={16} className="text-[#26F2D0]" /> Edit — {editClub.title}
            </h3>
            <div className="space-y-3">
              <textarea value={editForm.description} onChange={e => setEditForm(p => ({ ...p, description: e.target.value }))}
                placeholder="Description..." rows={3}
                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none resize-none focus:border-[#26F2D0]/50" />
              <div className="flex items-center gap-3">
                <label className="text-xs text-gray-500 whitespace-nowrap">Max members:</label>
                <input type="number" value={editForm.maxMembers} min={5} max={100}
                  onChange={e => setEditForm(p => ({ ...p, maxMembers: parseInt(e.target.value) }))}
                  className="w-20 bg-[#111] border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none" />
              </div>
              <input value={editForm.linkedinUrl} onChange={e => setEditForm(p => ({ ...p, linkedinUrl: e.target.value }))}
                placeholder="LinkedIn URL..."
                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#26F2D0]/50" />
              <div className="flex gap-2">
                <button onClick={() => setEditClub(null)}
                  className="flex-1 py-2 bg-white/10 text-gray-300 rounded-xl text-sm hover:bg-white/20 transition">Cancel</button>
                <button onClick={handleEdit} disabled={editing}
                  className="flex-1 py-2 bg-[#26F2D0] text-black rounded-xl text-sm font-semibold hover:brightness-110 transition disabled:opacity-40">
                  {editing ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
          <Bot size={32} className="mx-auto mb-3 text-gray-600" />
          <p className="text-gray-400 text-sm">{clubs.length === 0 ? "No clubs yet. Create the first one!" : "No clubs match your search."}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(club => (
          <div key={club.id}
            className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 overflow-hidden hover:border-white/20 transition">

            {confirmId === club.id && (
              <div className="absolute inset-0 bg-[#1a1a1a]/95 rounded-2xl z-20 flex flex-col items-center justify-center gap-3 p-4">
                <Trash2 size={24} className="text-red-400" />
                <p className="text-white font-semibold text-sm text-center">Delete "{club.title}"?</p>
                <p className="text-gray-400 text-xs text-center">All data permanently lost.</p>
                <div className="flex gap-2">
                  <button onClick={() => setConfirmId(null)}
                    className="px-4 py-2 bg-white/10 text-gray-300 rounded-xl text-xs hover:bg-white/20 transition">Cancel</button>
                  <button onClick={() => handleDelete(club.id)} disabled={deleting}
                    className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold hover:bg-red-700 transition disabled:opacity-50">
                    {deleting ? "..." : "Yes, Delete"}
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10
                                flex items-center justify-center shrink-0">
                  <ClubIcon category={club.category} />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{club.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[club.status] || "bg-gray-500/20 text-gray-400"}`}>
                    {club.status}
                  </span>
                </div>
              </div>
              <button onClick={() => setConfirmId(club.id)}
                className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition">
                <Trash2 size={14} />
              </button>
            </div>

            <p className="text-gray-400 text-xs mb-3 line-clamp-2">{club.description}</p>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span className="flex items-center gap-1"><Users size={11} /> {club.memberCount}/{club.maxMembers}</span>
              <span className="flex items-center gap-1"><ClipboardList size={11} /> {club.completedActivities}/{club.totalActivities}</span>
            </div>

            {(club.presidentName || club.vpName) && (
              <div className="flex gap-3 mb-3 text-xs flex-wrap">
                {club.presidentName && <span className="text-purple-400 flex items-center gap-1"><Crown size={10} /> {club.presidentName}</span>}
                {club.vpName && <span className="text-blue-400">🤝 {club.vpName}</span>}
              </div>
            )}

            <div className="flex gap-1.5 flex-wrap">
              <button onClick={() => setSelectedClub(club)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-[#26F2D0]/10 text-[#26F2D0]
                           border border-[#26F2D0]/20 rounded-lg hover:bg-[#26F2D0]/20 transition font-medium">
                <Eye size={11} /> Manage
              </button>
              <button onClick={() => { setEditClub(club); setEditForm({ description: club.description, maxMembers: club.maxMembers, linkedinUrl: club.linkedinUrl || "" }); }}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-white/5 text-gray-400
                           border border-white/10 rounded-lg hover:border-white/20 transition">
                <Pencil size={11} /> Edit
              </button>
              {club.status === "ACTIVE" ? (
                <button onClick={() => { if (window.confirm(`Dissolve "${club.title}"?`)) handleDissolve(club.id); }}
                  disabled={dissolving === club.id}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-orange-500/10 text-orange-400
                             border border-orange-500/20 rounded-lg hover:bg-orange-500/20 transition disabled:opacity-50">
                  <AlertTriangle size={11} /> {dissolving === club.id ? "..." : "Dissolve"}
                </button>
              ) : (
                <button onClick={() => { if (window.confirm(`Renew "${club.title}"?`)) handleRenew(club.id); }}
                  disabled={renewing === club.id}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-green-500/10 text-green-400
                             border border-green-500/20 rounded-lg hover:bg-green-500/20 transition disabled:opacity-50">
                  <RotateCcw size={11} /> {renewing === club.id ? "..." : "Renew"}
                </button>
              )}
              {extending === club.id ? (
                <div className="flex items-center gap-1">
                  <input type="number" value={extendMax} min={club.maxMembers + 1} max={100}
                    onChange={e => setExtendMax(parseInt(e.target.value))}
                    className="w-14 bg-[#111] border border-white/20 rounded-lg px-2 py-1 text-xs text-white outline-none" />
                  <button onClick={() => handleExtend(club.id)} className="p-1.5 bg-[#26F2D0] text-black rounded-lg"><Check size={11} /></button>
                  <button onClick={() => setExtending(null)} className="p-1.5 bg-white/10 text-gray-400 rounded-lg"><X size={11} /></button>
                </div>
              ) : (
                <button onClick={() => { setExtending(club.id); setExtendMax(club.maxMembers + 5); }}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-white/5 text-gray-400
                             border border-white/10 rounded-lg hover:border-white/20 transition">
                  <Users size={11} /> Extend
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}