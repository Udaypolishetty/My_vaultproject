
import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { LogOut, Users, Shield, Lightbulb, Building, Megaphone, Search, ShieldAlert } from "lucide-react";
import AdminStudents from "./Admin/AdminStudents";
import AdminModerators from "./Admin/AdminModerators";
import AdminClubs from "./Admin/AdminClubs";
import AdminAnnouncements from "./Admin/AdminAnnouncements";
import AdminIdeas from "./Admin/AdminIdeas";
import AdminWarnings from "./Admin/AdminWarnings";
import ModeratorIdeaReview from "./Ideas/ModeratorIdeaReview";
import AdminNotificationDropdown from "./Admin/AdminNotificationDropdown";

const TAB_CONFIG = [
  { key: "students",      label: "Students",      icon: <Users size={14} /> },
  { key: "moderators",    label: "Moderators",     icon: <Shield size={14} /> },
  { key: "ideas",         label: "Ideas",          icon: <Lightbulb size={14} /> },
  { key: "clubs",         label: "Clubs",          icon: <Building size={14} /> },
  { key: "announcements", label: "Announcements",  icon: <Megaphone size={14} /> },
  { key: "review",        label: "Review",         icon: <Search size={14} /> },
  { key: "warnings",      label: "Warnings",       icon: <ShieldAlert size={14} /> },
];

export default function AdminDashboard() {
  // const [activeTab, setActiveTab] = useState("students");
  const [students, setStudents] = useState([]);
  const [moderators, setModerators] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const {tab} = useParams();
  const activeTab = tab || "students"

  const token = sessionStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  const handleLogout = () => { sessionStorage.clear(); navigate("/"); };

  const fetchStudents = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8081/api/admin/students", { headers });
    setStudents(await res.json());
    setLoading(false);
  };

  const fetchModerators = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8081/api/admin/moderators", { headers });
    setModerators(await res.json());
    setLoading(false);
  };

  const fetchIdeas = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8081/api/ideas", { headers });
    setIdeas(await res.json());
    setLoading(false);
  };

  const fetchClubs = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8081/api/clubs/all", { headers });
    setClubs(await res.json());
    setLoading(false);
  };

  const fetchAnnouncements = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8081/api/announcements", { headers });
    setAnnouncements(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === "students")      fetchStudents();
    if (activeTab === "moderators")    fetchModerators();
    if (activeTab === "ideas")         fetchIdeas();
    if (activeTab === "clubs")         fetchClubs();
    if (activeTab === "announcements") fetchAnnouncements();
  }, [activeTab]);

  const deleteStudent = async (id) => {
    const res = await fetch(`http://localhost:8081/api/admin/students/${id}`, {
      method: "DELETE", headers
    });
    if (res.ok) setStudents(prev => prev.filter(s => s.id !== id));
  };

  const assignModerator = async (rollNumber) => {
    await fetch(`http://localhost:8081/api/admin/students/${rollNumber}/assign-moderator`, {
      method: "PATCH", headers
    });
    fetchModerators();
  };

  const revokeModerator = async (rollNumber) => {
    await fetch(`http://localhost:8081/api/admin/students/${rollNumber}/revoke-moderator`, {
      method: "PATCH", headers
    });
    fetchModerators();
  };

  const deleteAnnouncement = async (id) => {
    const res = await fetch(`http://localhost:8081/api/announcements/${id}`, {
      method: "DELETE", headers
    });
    if (res.ok) setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const pinAnnouncement = async (id) => {
    const res = await fetch(`http://localhost:8081/api/announcements/${id}/pin`, {
      method: "PATCH", headers
    });
    if (res.ok) {
      const updated = await res.json();
      setAnnouncements(prev =>
        prev.map(a => a.id === updated.id ? updated : a)
            .sort((a, b) => {
              if (a.pinned && !b.pinned) return -1;
              if (!a.pinned && b.pinned) return 1;
              return b.timestamp - a.timestamp;
            })
      );
    }
  };

  const saveAnnouncementEdit = async (id, form) => {
    const res = await fetch(`http://localhost:8081/api/announcements/${id}`, {
      method: "PUT", headers, body: JSON.stringify(form)
    });
    if (res.ok) {
      const updated = await res.json();
      setAnnouncements(prev => prev.map(a => a.id === updated.id ? updated : a));
    }
  };

  const postAnnouncement = async (form) => {
    const res = await fetch("http://localhost:8081/api/announcements", {
      method: "POST", headers, body: JSON.stringify(form)
    });
    const saved = await res.json();
    setAnnouncements(prev => [saved, ...prev]);
  };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white">


//       {/* Header — add pt-16 to clear navbar height */}
//       <div className="bg-[#0b0b0b]/90 backdrop-blur-sm border-b border-white/10
//                       px-8 py-6 shadow-2xl flex items-center justify-between py-6">
//         <h1 className="text-3xl font-black bg-gradient-to-r from-[#26F2D0] to-[#00d4ff]
//                        bg-clip-text text-transparent drop-shadow-lg">
//           ⚙️ Admin Dashboard
//         </h1>
//        <div className="flex items-center gap-3">
//   <AdminNotificationDropdown token={token} />
//   <button
//     onClick={handleLogout}
//     className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700
//                hover:from-red-700 hover:to-red-900 text-white px-6 py-3 rounded-xl
//                font-medium shadow-lg hover:scale-105 active:scale-95 transition-all"
//   >
//     <LogOut size={16} /> Logout
//   </button>
// </div>
        
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-1 px-8 pt-8 pb-4 border-b border-white/10 overflow-x-auto
//                       bg-[#0f0f0f]/50 backdrop-blur-sm rounded-2xl mx-4 -mt-4 shadow-xl">
//         {TAB_CONFIG.map(({ key, label, icon }) => (
//           <button
//             key={key}
//             onClick={() => navigate(`/admin/dashboard/${key}`)}
//             className={`relative flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold
//                         whitespace-nowrap transition-all duration-300 shadow-lg
//               ${activeTab === key
//                 ? key === "warnings"
//                   ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-500/30 hover:scale-105"
//                   : "bg-gradient-to-r from-[#26F2D0] to-[#00d4ff] text-black shadow-[#26F2D0]/50 hover:scale-105"
//                 : "bg-[#1a1a1a]/80 text-gray-300 hover:bg-white/10 hover:text-white hover:scale-[1.02]"
//               }`}
//           >
//             {icon}
//             {label}
//             {activeTab === key && (
//               <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full shadow-lg
//                 ${key === "warnings"
//                   ? "bg-gradient-to-r from-red-400 to-red-600"
//                   : "bg-gradient-to-r from-[#26F2D0] to-[#00d4ff]"
//                 }`} />
//             )}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="p-8">
//         {loading && (
//           <div className="flex justify-center mt-20">
//             <div className="w-10 h-10 border-3 border-[#26F2D0] border-t-transparent
//                             rounded-full animate-spin" />
//           </div>
//         )}

//         {activeTab === "students" && (
//           <AdminStudents students={students} loading={loading} onDelete={deleteStudent} />
//         )}
//         {activeTab === "moderators" && (
//           <AdminModerators moderators={moderators} loading={loading}
//             onAssign={assignModerator} onRevoke={revokeModerator} />
//         )}
//         {activeTab === "ideas" && (
//           <AdminIdeas ideas={ideas} loading={loading}
//             onDelete={(id) => setIdeas(prev => prev.filter(i => (i.id || i._id) !== id))} />
//         )}
//         {activeTab === "clubs" && (
//           <AdminClubs clubs={clubs} loading={loading}
//             onDelete={(id) => setClubs(prev => prev.filter(c => c.id !== id))}  onRefresh={fetchClubs} />
//         )}
//         {activeTab === "announcements" && (
//           <AdminAnnouncements announcements={announcements} loading={loading}
//             onDelete={deleteAnnouncement} onPin={pinAnnouncement}
//             onSaveEdit={saveAnnouncementEdit} onPost={postAnnouncement} />
//         )}
//         {activeTab === "review" && (
//           <ModeratorIdeaReview token={token} isAdmin={true} />
//         )}
//         {activeTab === "warnings" && (
//           <AdminWarnings token={token} students={students} />
//         )}
//       </div>
//     </div>
//   );
// }


return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white">
      
      {/* Header - Responsive */}
      <div className="sticky top-0 z-50 bg-[#0b0b0b]/95 backdrop-blur-md border-b border-white/10 
                      px-4 sm:px-6 lg:px-8 py-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-[#26F2D0] to-[#00d4ff]
                         bg-clip-text text-transparent drop-shadow-lg">
            ⚙️ Admin Dashboard
          </h1>
          <div className="flex items-center gap-2">
            <AdminNotificationDropdown token={token} />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700
                        hover:from-red-700 hover:to-red-900 text-white px-3 py-2 sm:px-4 sm:py-2.5 
                        rounded-xl font-medium shadow-lg hover:scale-105 active:scale-95 transition-all
                        text-sm sm:text-base"
            >
              <LogOut size={14} className="sm:w-4 sm:h-4" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile-First Scrollable Top Tabs */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-4 lg:pt-8 lg:pb-6 border-b border-white/10 
                      bg-[#0f0f0f]/70 backdrop-blur-sm rounded-2xl mx-2 lg:mx-4 -mt-2 lg:-mt-4 shadow-xl">
        <div className="flex gap-1.5 lg:gap-1 overflow-x-auto pb-2 lg:pb-0 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent
                       -mb-1 lg:-mb-0 snap-x snap-mandatory">
          {TAB_CONFIG.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => navigate(`/admin/dashboard/${key}`)}
              className={`relative flex items-center gap-1.5 lg:gap-2 px-3 py-2.5 lg:px-4 lg:py-3 
                         rounded-2xl font-semibold whitespace-nowrap transition-all duration-300 
                         shadow-md flex-shrink-0 hover:scale-[1.02] min-w-[88px] lg:min-w-0
                         text-xs lg:text-sm ${
                           activeTab === key
                             ? key === "warnings"
                               ? "bg-gradient-to-r from-red-500/90 to-red-600/90 text-white shadow-red-500/40"
                               : "bg-gradient-to-r from-[#26F2D0] to-[#00d4ff] text-black shadow-[#26F2D0]/50"
                             : "bg-[#1a1a1a]/70 text-gray-300 hover:bg-white/20"
                         }`}
            >
              <div className="w-4 h-4 lg:w-3.5 lg:h-3.5 flex-shrink-0">{icon}</div>
              <span className="lg:leading-tight">{label}</span>
              {activeTab === key && (
                <div className={`absolute -bottom-1.5 lg:-bottom-2 left-1/2 -translate-x-1/2 
                               w-12 lg:w-16 h-1 rounded-full shadow-lg ${
                                 key === "warnings"
                                   ? "bg-gradient-to-r from-red-400 to-red-600"
                                   : "bg-gradient-to-r from-[#26F2D0] to-[#00d4ff]"
                               }`} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content - Responsive padding */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-7xl mx-auto">
        {loading && (
          <div className="flex justify-center mt-12 lg:mt-20">
            <div className="w-8 h-8 sm:w-10 sm:h-10 border-3 border-[#26F2D0] border-t-transparent
                           rounded-full animate-spin" />
          </div>
        )}

        {/* Your existing tab content unchanged */}
        {activeTab === "students" && (
          <AdminStudents students={students} loading={loading} onDelete={deleteStudent} />
        )}
        {activeTab === "moderators" && (
          <AdminModerators moderators={moderators} loading={loading}
            onAssign={assignModerator} onRevoke={revokeModerator} />
        )}
        {activeTab === "ideas" && (
          <AdminIdeas ideas={ideas} loading={loading}
            onDelete={(id) => setIdeas(prev => prev.filter(i => (i.id || i._id) !== id))} />
        )}
        {activeTab === "clubs" && (
          <AdminClubs clubs={clubs} loading={loading}
            onDelete={(id) => setClubs(prev => prev.filter(c => c.id !== id))} onRefresh={fetchClubs} />
        )}
        {activeTab === "announcements" && (
          <AdminAnnouncements announcements={announcements} loading={loading}
            onDelete={deleteAnnouncement} onPin={pinAnnouncement}
            onSaveEdit={saveAnnouncementEdit} onPost={postAnnouncement} />
        )}
        {activeTab === "review" && (
          <ModeratorIdeaReview token={token} isAdmin={true} />
        )}
        {activeTab === "warnings" && (
          <AdminWarnings token={token} students={students} />
        )}
      </div>
    </div>
  );
}