// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

// export default function StudentDashboard() {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [ideas, setIdeas] = useState([]);
//   const [myClub, setMyClub] = useState(null);
//   const [joinedClubs, setJoinedClubs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [unread, setUnread] = useState(0);
//   const [notifications, setNotifications] = useState([]);

//   const token = localStorage.getItem("token");
//   const myId = localStorage.getItem("id");
//   const name = localStorage.getItem("name");
//   const rollNumber = localStorage.getItem("rollNumber");
//   const email = localStorage.getItem("Email");

//   const location = useLocation();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (location.state?.tab === "activity") {
//       setActiveTab("activity");
//       markAllRead();
//     }
//   }, [location.state]);

//   // ✅ listen for notificationsRead event from navbar
// //   useEffect(() => {
// //     window.addEventListener("notificationsRead", markAllRead);
// //     return () => window.removeEventListener("notificationsRead", markAllRead);
// //   }, []);

//   const fetchData = async () => {
//     try {
//       // fetch ideas
//       const ideasRes = await fetch("http://localhost:8081/api/ideas");
//       const allIdeas = await ideasRes.json();
//       setIdeas(allIdeas.filter(i => String(i.createdById) === String(myId)));

//       // fetch my club
//       const myClubRes = await fetch("http://localhost:8081/api/clubs/my", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (myClubRes.ok) {
//         const data = await myClubRes.json();
//         if (data.length > 0) setMyClub(data[0]);
//       }

//       // fetch joined clubs
//       const allClubsRes = await fetch("http://localhost:8081/api/clubs/all");
//       const allClubs = await allClubsRes.json();
//       setJoinedClubs(allClubs.filter(c =>
//         c.members?.includes(rollNumber) && c.createdBy !== rollNumber
//       ));

//       // ✅ fetch DB notifications
//       const notifRes = await fetch("http://localhost:8081/api/notifications/my", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (notifRes.ok) {
//         const notifData = await notifRes.json();
//         setNotifications(notifData);
//         setUnread(notifData.filter(n => !n.read).length);
//       }

//     } catch (err) {
//       console.error("Dashboard fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const markAllRead = async () => {
//     try {
//       await fetch("http://localhost:8081/api/notifications/mark-read", {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setNotifications(prev => prev.map(n => ({ ...n, read: true })));
//       setUnread(0);
//     //   window.dispatchEvent(new Event("notificationsRead"));
//     } catch (err) {
//       console.error("Mark read failed:", err);
//     }
//   };

//   const totalLikes = ideas.reduce((sum, i) => sum + (i.likes || 0), 0);
//   const totalComments = ideas.reduce((sum, i) => sum + (i.comments?.length || 0), 0);

//   const iconMap = {
//     CLUB_JOIN: "🤝",
//     IDEA_LIKE: "👍",
//     IDEA_COMMENT: "💬",
//     ADMIN_WARNING: "⚠️",
//     CLUB_CREATED: "🏛",
//     IDEA_POSTED: "💡",
//     CLUB_JOINED: "🤝",
//   };

//   const tabClass = (tab) =>
//     `px-6 py-3 font-medium transition-all duration-200 border-b-2 -mb-[2px] ${
//       activeTab === tab
//         ? "border-[#26F2D0] text-[#26F2D0]"
//         : "border-transparent text-gray-400 hover:text-[#26F2D0]"
//     }`;

//   return (
//     <div className="min-h-screen bg-[#0f0f0f] text-white px-4 md:px-10 pt-4">

//       {/* Header */}
//       <div className="max-w-4xl mx-auto mb-6">
//         <div className="bg-gradient-to-r from-[#0b0b0b] to-[#141414]
//                         border border-white/10 rounded-2xl p-6
//                         shadow-[0_0_25px_rgba(38,242,208,0.08)]">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 rounded-2xl bg-[#26F2D0]/10 border border-[#26F2D0]/20
//                               flex items-center justify-center text-2xl font-bold text-[#26F2D0]">
//                 {name?.charAt(0).toUpperCase()}
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold">{name}</h2>
//                 <p className="text-gray-400 text-sm">{rollNumber}</p>
//               </div>
//             </div>
//             <img
//               src="/elen.png"
//               alt="ECET"
//               className="w-16 h-16 object-contain opacity-90"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="max-w-4xl mx-auto">
//         <div className="flex gap-6 border-b border-white/10 mb-8">
//           <button className={tabClass("profile")} onClick={() => setActiveTab("profile")}>
//             Profile
//           </button>
//           <button
//             className={tabClass("activity")}
//             onClick={() => {
//               setActiveTab("activity");
//               markAllRead();
//             }}
//           >
//             Activity
//             {unread > 0 && (
//               <span className="ml-2 bg-[#26F2D0] text-black text-xs px-2 py-0.5 rounded-full font-bold">
//                 {unread > 9 ? "9+" : unread}
//               </span>
//             )}
//           </button>
//         </div>

//         {/* ===== PROFILE TAB ===== */}
//         {activeTab === "profile" && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//             <div className="bg-[#111] border border-white/10 rounded-2xl p-6 space-y-4">
//               <h3 className="font-semibold text-[#26F2D0] mb-4">Personal Info</h3>
//               {[
//                 { label: "Full Name", value: name, icon: "👤" },
//                 { label: "Roll Number", value: rollNumber, icon: "🎓" },
//                 { label: "Email", value: email, icon: "📧" },
//               ].map(({ label, value, icon }) => (
//                 <div key={label} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
//                   <span className="text-lg">{icon}</span>
//                   <div>
//                     <p className="text-xs text-gray-500">{label}</p>
//                     <p className="text-white text-sm font-medium">{value || "—"}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
//               <h3 className="font-semibold text-[#26F2D0] mb-4">Your Stats</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 {[
//                   { label: "Ideas Posted", value: ideas.length, icon: "💡" },
//                   { label: "Total Likes", value: totalLikes, icon: "👍" },
//                   { label: "Total Responses", value: totalComments, icon: "💬" },
//                   { label: "Clubs", value: (myClub ? 1 : 0) + joinedClubs.length, icon: "🏛" },
//                 ].map(({ label, value, icon }) => (
//                   <div key={label} className="bg-white/5 rounded-xl p-4 text-center">
//                     <p className="text-2xl mb-1">{icon}</p>
//                     <p className="text-2xl font-bold text-white">{loading ? "—" : value}</p>
//                     <p className="text-xs text-gray-400 mt-1">{label}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {ideas.length > 0 && (
//               <div className="md:col-span-2 bg-[#111] border border-white/10 rounded-2xl p-6">
//                 <h3 className="font-semibold text-[#26F2D0] mb-4">My Ideas</h3>
//                 <div className="space-y-3">
//                   {ideas.map(idea => (
//                     <div key={idea.id} className="flex items-center justify-between
//                                                    bg-white/5 rounded-xl px-4 py-3">
//                       <div>
//                         <p className="text-white font-medium text-sm">{idea.title}</p>
//                         <p className="text-gray-500 text-xs">{idea.category}</p>
//                       </div>
//                       <div className="flex gap-4 text-xs text-gray-400">
//                         <span>👍 {idea.likes || 0}</span>
//                         <span>💬 {idea.comments?.length || 0}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* ===== ACTIVITY TAB ===== */}
//         {activeTab === "activity" && (
//           <div className="space-y-3 pb-10">
//             {notifications.length === 0 ? (
//               <div className="text-center py-16">
//                 <p className="text-4xl mb-4">📭</p>
//                 <p className="text-gray-400">No notifications yet. Post an idea or join a club!</p>
//               </div>
//             ) : (
//               notifications.map((notif) => {
//                 const isWarning = notif.type === "ADMIN_WARNING";
//                 return (
//                   <div
//                     key={notif.id}
//                     className={`flex items-start gap-4 p-4 rounded-xl border transition-all
//                       ${isWarning
//                         ? "bg-red-500/5 border-red-500/20"
//                         : !notif.read
//                           ? "bg-[#26F2D0]/5 border-[#26F2D0]/20"
//                           : "bg-white/5 border-white/10 opacity-60"
//                       }`}
//                   >
//                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0
//                       ${isWarning
//                         ? "bg-red-500/10"
//                         : !notif.read ? "bg-[#26F2D0]/10" : "bg-white/5"
//                       }`}>
//                       {iconMap[notif.type] || "🔔"}
//                     </div>
//                     <div className="flex-1">
//                       <p className={`text-sm font-medium
//                         ${isWarning ? "text-red-300" : !notif.read ? "text-white" : "text-gray-400"}`}>
//                         {notif.message}
//                       </p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         {new Date(notif.createdAt).toLocaleDateString("en-IN", {
//                           year: "numeric", month: "long", day: "numeric"
//                         })}
//                       </p>
//                     </div>
//                     {!notif.read && (
//                       <span className={`w-2 h-2 rounded-full shrink-0 mt-2
//                         ${isWarning ? "bg-red-400" : "bg-[#26F2D0]"}`}
//                       />
//                     )}
//                     {isWarning && (
//                       <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full shrink-0">
//                         ⚠️ Warning
//                       </span>
//                     )}
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [ideas, setIdeas] = useState([]);
  const [myClub, setMyClub] = useState(null);
  const [joinedClubs, setJoinedClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unread, setUnread] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const hasMarkedRead = useRef(false); // ✅ prevents loop

const token = sessionStorage.getItem("token");
const myId = sessionStorage.getItem("id");
const name = sessionStorage.getItem("name");
const rollNumber = sessionStorage.getItem("rollNumber");
const email = sessionStorage.getItem("Email");

  const location = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ only runs once when navigated from bell click
  useEffect(() => {
    if (location.state?.tab === "activity" && !hasMarkedRead.current) {
      hasMarkedRead.current = true;
      setActiveTab("activity");
      markAllRead();
    }
  }, [location.state]);

  const fetchData = async () => {
    try {
      const ideasRes = await fetch("http://localhost:8081/api/ideas");
      const allIdeas = await ideasRes.json();
      setIdeas(allIdeas.filter(i => String(i.createdById) === String(myId)));

      const myClubRes = await fetch("http://localhost:8081/api/clubs/my", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (myClubRes.ok) {
        const data = await myClubRes.json();
        if (data.length > 0) setMyClub(data[0]);
      }

      const allClubsRes = await fetch("http://localhost:8081/api/clubs/all");
      const allClubs = await allClubsRes.json();
      setJoinedClubs(allClubs.filter(c =>
        c.members?.includes(rollNumber) && c.createdBy !== rollNumber
      ));

      const notifRes = await fetch("http://localhost:8081/api/notifications/my", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (notifRes.ok) {
        const notifData = await notifRes.json();
        setNotifications(notifData);
        setUnread(notifData.filter(n => !n.read).length);
      }

    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ guard — only calls API if there are unreads
  const markAllRead = async () => {
    if (unread === 0) return;
    try {
      await fetch("http://localhost:8081/api/notifications/mark-read", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnread(0);
        window.dispatchEvent(new Event("notificationsRead"));
    } catch (err) {
      console.error("Mark read failed:", err);
    }
  };

  const totalLikes = ideas.reduce((sum, i) => sum + (i.likes || 0), 0);
  const totalComments = ideas.reduce((sum, i) => sum + (i.comments?.length || 0), 0);

  const iconMap = {
    CLUB_JOIN: "🤝",
    IDEA_LIKE: "👍",
    IDEA_COMMENT: "💬",
    ADMIN_WARNING: "⚠️",
    CLUB_CREATED: "🏛",
    IDEA_POSTED: "💡",
    CLUB_JOINED: "🤝",
  };

  const tabClass = (tab) =>
    `px-6 py-3 font-medium transition-all duration-200 border-b-2 -mb-[2px] ${
      activeTab === tab
        ? "border-[#26F2D0] text-[#26F2D0]"
        : "border-transparent text-gray-400 hover:text-[#26F2D0]"
    }`;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 md:px-10 pt-4">

      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="bg-gradient-to-r from-[#0b0b0b] to-[#141414]
                        border border-white/10 rounded-2xl p-6
                        shadow-[0_0_25px_rgba(38,242,208,0.08)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#26F2D0]/10 border border-[#26F2D0]/20
                              flex items-center justify-center text-2xl font-bold text-[#26F2D0]">
                {name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold">{name}</h2>
                <p className="text-gray-400 text-sm">{rollNumber}</p>
              </div>
            </div>
            <img
              src="/elen.png"
              alt="ECET"
              className="w-16 h-16 object-contain opacity-90"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-6 border-b border-white/10 mb-8">
          <button className={tabClass("profile")} onClick={() => setActiveTab("profile")}>
            Profile
          </button>
          <button
            className={tabClass("activity")}
            onClick={() => {
              setActiveTab("activity");
              if (unread > 0) markAllRead(); // ✅ only if unreads exist
            }}
          >
            Activity
            {unread > 0 && (
              <span className="ml-2 bg-[#26F2D0] text-black text-xs px-2 py-0.5 rounded-full font-bold">
                {unread > 9 ? "9+" : unread}
              </span>
            )}
          </button>
        </div>

        {/* ===== PROFILE TAB ===== */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-[#111] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="font-semibold text-[#26F2D0] mb-4">Personal Info</h3>
              {[
                { label: "Full Name", value: name, icon: "👤" },
                { label: "Roll Number", value: rollNumber, icon: "🎓" },
                { label: "Email", value: email, icon: "📧" },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                  <span className="text-lg">{icon}</span>
                  <div>
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="text-white text-sm font-medium">{value || "—"}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
              <h3 className="font-semibold text-[#26F2D0] mb-4">Your Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Ideas Posted", value: ideas.length, icon: "💡" },
                  { label: "Total Likes", value: totalLikes, icon: "👍" },
                  { label: "Total Responses", value: totalComments, icon: "💬" },
                  { label: "Clubs", value: (myClub ? 1 : 0) + joinedClubs.length, icon: "🏛" },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="bg-white/5 rounded-xl p-4 text-center">
                    <p className="text-2xl mb-1">{icon}</p>
                    <p className="text-2xl font-bold text-white">{loading ? "—" : value}</p>
                    <p className="text-xs text-gray-400 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {ideas.length > 0 && (
              <div className="md:col-span-2 bg-[#111] border border-white/10 rounded-2xl p-6">
                <h3 className="font-semibold text-[#26F2D0] mb-4">My Ideas</h3>
                <div className="space-y-3">
                  {ideas.map(idea => (
                    <div key={idea.id} className="flex items-center justify-between
                                                   bg-white/5 rounded-xl px-4 py-3">
                      <div>
                        <p className="text-white font-medium text-sm">{idea.title}</p>
                        <p className="text-gray-500 text-xs">{idea.category}</p>
                      </div>
                      <div className="flex gap-4 text-xs text-gray-400">
                        <span>👍 {idea.likes || 0}</span>
                        <span>💬 {idea.comments?.length || 0}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== ACTIVITY TAB ===== */}
        {activeTab === "activity" && (
          <div className="space-y-3 pb-10">
            {notifications.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-4xl mb-4">📭</p>
                <p className="text-gray-400">No notifications yet. Post an idea or join a club!</p>
              </div>
            ) : (
              notifications.map((notif) => {
                const isWarning = notif.type === "ADMIN_WARNING";
                return (
                  <div
                    key={notif.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-all
                      ${isWarning
                        ? "bg-red-500/5 border-red-500/20"
                        : !notif.read
                          ? "bg-[#26F2D0]/5 border-[#26F2D0]/20"
                          : "bg-white/5 border-white/10 opacity-60"
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0
                      ${isWarning ? "bg-red-500/10" : !notif.read ? "bg-[#26F2D0]/10" : "bg-white/5"}`}>
                      {iconMap[notif.type] || "🔔"}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium
                        ${isWarning ? "text-red-300" : !notif.read ? "text-white" : "text-gray-400"}`}>
                        {notif.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notif.createdAt).toLocaleDateString("en-IN", {
                          year: "numeric", month: "long", day: "numeric"
                        })}
                      </p>
                    </div>
                    {!notif.read && (
                      <span className={`w-2 h-2 rounded-full shrink-0 mt-2
                        ${isWarning ? "bg-red-400" : "bg-[#26F2D0]"}`}
                      />
                    )}
                    {isWarning && (
                      <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full shrink-0">
                        ⚠️ Warning
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}