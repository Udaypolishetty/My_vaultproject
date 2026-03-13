// import { Bell, AlertTriangle, ThumbsUp, MessageCircle, Users, Lightbulb, X, ShieldAlert } from "lucide-react";

// const iconMap = {
//   CLUB_JOIN:    <Users size={16} className="text-teal-400" />,
//   IDEA_LIKE:    <ThumbsUp size={16} className="text-[#26F2D0]" />,
//   IDEA_COMMENT: <MessageCircle size={16} className="text-purple-400" />,
//   ADMIN_WARNING:<AlertTriangle size={16} className="text-red-400" />,
//   WARNING:      <ShieldAlert size={16} className="text-red-400" />,
//   CLUB_CREATED: <Users size={16} className="text-orange-400" />,
//   IDEA_POSTED:  <Lightbulb size={16} className="text-yellow-400" />,
//   CLUB_JOINED:  <Users size={16} className="text-teal-400" />,
//   LIKE_MILESTONE: <ThumbsUp size={16} className="text-[#26F2D0]" />,
//   IDEA_STATUS:  <Lightbulb size={16} className="text-blue-400" />,
// };

// const severityConfig = {
//   HIGH:   { color: "text-red-400",    bg: "bg-red-500/20",    border: "border-red-500/30",    label: "🚨 HIGH" },
//   MEDIUM: { color: "text-orange-400", bg: "bg-orange-500/20", border: "border-orange-500/30", label: "⚠️ MEDIUM" },
//   LOW:    { color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500/30", label: "📢 LOW" },
// };

// export default function StudentActivity({ notifications, warnings, setNotifications, token }) {

//   const handleDelete = async (notifId) => {
//     const res = await fetch(`http://localhost:8081/api/notifications/${notifId}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     if (res.ok) setNotifications(prev => prev.filter(n => n.id !== notifId));
//   };

//   const warningCount = warnings.length;

//   return (
//     <div className="space-y-6 pb-10">

//       {/* ===== WARNINGS SECTION ===== */}
//       {warningCount > 0 && (
//         <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
//           <div className="flex items-center gap-2 mb-4">
//             <ShieldAlert size={18} className="text-red-400" />
//             <h3 className="font-bold text-red-400">
//               Warnings ({warningCount})
//             </h3>
//             <span className="ml-auto text-xs text-red-400/60">
//               Please review and take note
//             </span>
//           </div>
//           <div className="space-y-3">
//             {warnings.map(w => {
//               const sev = severityConfig[w.severity] || severityConfig.LOW;
//               return (
//                 <div key={w.id}
//                   className={`flex items-start gap-3 p-4 rounded-xl border
//                               ${sev.bg} ${sev.border}`}>
//                   <div className="w-9 h-9 rounded-xl bg-red-500/20
//                                   flex items-center justify-center shrink-0">
//                     <ShieldAlert size={16} className="text-red-400" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 mb-1 flex-wrap">
//                       <span className={`text-xs font-bold px-2 py-0.5 rounded-full
//                                         ${sev.bg} ${sev.color} border ${sev.border}`}>
//                         {sev.label}
//                       </span>
//                       <span className="text-xs text-gray-500">
//                         by {w.issuedBy}
//                       </span>
//                     </div>
//                     <p className="text-red-300 text-sm font-medium leading-snug">
//                       {w.message}
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1">
//                       {new Date(w.issuedAt).toLocaleDateString("en-IN", {
//                         year: "numeric", month: "long", day: "numeric"
//                       })}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* ===== NOTIFICATIONS SECTION ===== */}
//       <div>
//         {notifications.length === 0 && warningCount === 0 ? (
//           <div className="text-center py-16">
//             <Bell size={40} className="mx-auto text-gray-600 mb-4" />
//             <p className="text-gray-400">No notifications yet. Post an idea or join a club!</p>
//           </div>
//         ) : notifications.length === 0 ? (
//           <div className="text-center py-8">
//             <Bell size={28} className="mx-auto text-gray-600 mb-2" />
//             <p className="text-gray-500 text-sm">No other notifications</p>
//           </div>
//         ) : (
//           <div className="space-y-3">
//             {notifications.map((notif) => {
//               const isWarning = notif.type === "ADMIN_WARNING" || notif.type === "WARNING";
//               return (
//                 <div
//                   key={notif.id}
//                   className={`flex items-start gap-3 p-4 rounded-xl border transition-all
//                     ${isWarning
//                       ? "bg-red-500/5 border-red-500/20"
//                       : !notif.read
//                         ? "bg-[#26F2D0]/5 border-[#26F2D0]/20"
//                         : "bg-white/5 border-white/10 opacity-60"
//                     }`}
//                 >
//                   <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0
//                     ${isWarning ? "bg-red-500/10" : !notif.read ? "bg-[#26F2D0]/10" : "bg-white/5"}`}>
//                     {iconMap[notif.type] || <Bell size={16} className="text-gray-400" />}
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-start justify-between gap-2">
//                       <p className={`text-sm font-medium leading-snug
//                         ${isWarning ? "text-red-300" : !notif.read ? "text-white" : "text-gray-400"}`}>
//                         {notif.message}
//                       </p>
//                       <button
//                         onClick={() => handleDelete(notif.id)}
//                         className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center
//                                    text-gray-500 hover:text-red-400 hover:bg-red-400/10
//                                    transition-all mt-0.5"
//                         title="Delete"
//                       >
//                         <X size={11} />
//                       </button>
//                     </div>
//                     <div className="flex items-center gap-2 mt-1 flex-wrap">
//                       <p className="text-xs text-gray-500">
//                         {new Date(notif.createdAt).toLocaleDateString("en-IN", {
//                           year: "numeric", month: "long", day: "numeric"
//                         })}
//                       </p>
//                       {!notif.read && (
//                         <span className={`w-2 h-2 rounded-full shrink-0
//                           ${isWarning ? "bg-red-400" : "bg-[#26F2D0]"}`} />
//                       )}
//                       {isWarning && (
//                         <span className="text-xs bg-red-500/20 text-red-400
//                                          px-2 py-0.5 rounded-full">
//                           ⚠️ Warning
//                         </span>
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


import { useEffect } from "react";
import { Bell, AlertTriangle, ThumbsUp, MessageCircle, Users, Lightbulb, X, ShieldAlert } from "lucide-react";

const iconMap = {
  CLUB_JOIN:      <Users size={16} className="text-teal-400" />,
  IDEA_LIKE:      <ThumbsUp size={16} className="text-[#26F2D0]" />,
  IDEA_COMMENT:   <MessageCircle size={16} className="text-purple-400" />,
  ADMIN_WARNING:  <AlertTriangle size={16} className="text-red-400" />,
  WARNING:        <ShieldAlert size={16} className="text-red-400" />,
  CLUB_CREATED:   <Users size={16} className="text-orange-400" />,
  IDEA_POSTED:    <Lightbulb size={16} className="text-yellow-400" />,
  CLUB_JOINED:    <Users size={16} className="text-teal-400" />,
  LIKE_MILESTONE: <ThumbsUp size={16} className="text-[#26F2D0]" />,
  IDEA_STATUS:    <Lightbulb size={16} className="text-blue-400" />,
  BUZZ_REPLY:     <MessageCircle size={16} className="text-purple-400" />,
};

const severityConfig = {
  HIGH:   { color: "text-red-400",    bg: "bg-red-500/20",    border: "border-red-500/30",    label: "🚨 HIGH" },
  MEDIUM: { color: "text-orange-400", bg: "bg-orange-500/20", border: "border-orange-500/30", label: "⚠️ MEDIUM" },
  LOW:    { color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500/30", label: "📢 LOW" },
};

export default function StudentActivity({ notifications, warnings, setNotifications, setWarnings, token }) {

  // ✅ mark warnings as read when Activity tab opens — clears red badge
  useEffect(() => {
    const unreadWarnings = warnings.filter(w => !w.read);
    if (unreadWarnings.length > 0) {
      fetch("http://localhost:8081/api/warnings/mark-read", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      }).then(() => {
        setWarnings(prev => prev.map(w => ({ ...w, read: true })));
      }).catch(err => console.error("Mark warnings read failed:", err));
    }
  }, []);

  const handleDeleteNotif = async (notifId) => {
    const res = await fetch(`http://localhost:8081/api/notifications/${notifId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) setNotifications(prev => prev.filter(n => n.id !== notifId));
  };

  const warningCount = warnings.length;

  return (
    <div className="space-y-6 pb-10">

      {/* ===== WARNINGS SECTION ===== */}
      {warningCount > 0 && (
        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert size={18} className="text-red-400" />
            <h3 className="font-bold text-red-400">Warnings ({warningCount})</h3>
            <span className="ml-auto text-xs text-red-400/60">Auto-deleted after 7 days</span>
          </div>
          <div className="space-y-3">
            {warnings.map(w => {
              const sev = severityConfig[w.severity] || severityConfig.LOW;
              return (
                <div key={w.id}
                  className={`flex items-start gap-3 p-4 rounded-xl border ${sev.bg} ${sev.border}`}>
                  <div className="w-9 h-9 rounded-xl bg-red-500/20
                                  flex items-center justify-center shrink-0">
                    <ShieldAlert size={16} className="text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full
                                        border ${sev.bg} ${sev.color} ${sev.border}`}>
                        {sev.label}
                      </span>
                      <span className="text-xs text-gray-500">by {w.issuedBy}</span>
                    </div>
                    <p className="text-red-300 text-sm font-medium leading-snug">{w.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(w.issuedAt).toLocaleDateString("en-IN", {
                        year: "numeric", month: "long", day: "numeric"
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===== NOTIFICATIONS SECTION ===== */}
      {notifications.length === 0 && warningCount === 0 ? (
        <div className="text-center py-16">
          <Bell size={40} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400">No notifications yet. Post an idea or join a club!</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-8">
          <Bell size={28} className="mx-auto text-gray-600 mb-2" />
          <p className="text-gray-500 text-sm">No other notifications</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => {
            const isWarning = notif.type === "ADMIN_WARNING" || notif.type === "WARNING";
            return (
              <div key={notif.id}
                className={`flex items-start gap-3 p-4 rounded-xl border transition-all
                  ${isWarning
                    ? "bg-red-500/5 border-red-500/20"
                    : !notif.read
                      ? "bg-[#26F2D0]/5 border-[#26F2D0]/20"
                      : "bg-white/5 border-white/10 opacity-60"
                  }`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0
                  ${isWarning ? "bg-red-500/10" : !notif.read ? "bg-[#26F2D0]/10" : "bg-white/5"}`}>
                  {iconMap[notif.type] || <Bell size={16} className="text-gray-400" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-medium leading-snug
                      ${isWarning ? "text-red-300" : !notif.read ? "text-white" : "text-gray-400"}`}>
                      {notif.message}
                    </p>
                    <button onClick={() => handleDeleteNotif(notif.id)}
                      className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center
                                 text-gray-500 hover:text-red-400 hover:bg-red-400/10
                                 transition-all mt-0.5" title="Delete">
                      <X size={11} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <p className="text-xs text-gray-500">
                      {new Date(notif.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric", month: "long", day: "numeric"
                      })}
                    </p>
                    {!notif.read && (
                      <span className={`w-2 h-2 rounded-full shrink-0
                        ${isWarning ? "bg-red-400" : "bg-[#26F2D0]"}`} />
                    )}
                    {isWarning && (
                      <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                        ⚠️ Warning
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}