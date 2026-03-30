
import { useState, useEffect, useRef } from "react";
import { useLocation,useParams,useNavigate } from "react-router-dom";
import { Shield, Settings } from "lucide-react";
import ModeratorIdeaReview from "./Ideas/ModeratorIdeaReview";
import StudentProfile from "./Dashboard/StudentProfiles";
import StudentActivity from "./Dashboard/StudentActivity";
import ModeratorUploadPanel from "./Dashboard/ModeratorUploadPanel";
import Footer from "./FooterFiles/Footer";

export default function StudentDashboard() {
  const {tab} = useParams();
  const navigate = useNavigate();
  const activeTab = tab || "profile";
  const id = sessionStorage.getItem("id");
  
  // const [activeTab, setActiveTab] = useState("profile");
  const [ideas, setIdeas] = useState([]);
  const [myClub, setMyClub] = useState(null);
  const [joinedClubs, setJoinedClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unread, setUnread] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const hasMarkedRead = useRef(false);

  const token = sessionStorage.getItem("token");
  const myId = sessionStorage.getItem("id");
  const name = sessionStorage.getItem("name");
  const rollNumber = sessionStorage.getItem("rollNumber");
  const email = sessionStorage.getItem("Email");
  const role = sessionStorage.getItem("role");
  const isModerator = role === "MODERATOR" || role === "ADMIN";

  const location = useLocation();

  useEffect(() => { fetchData(); }, []);

  // useEffect(() => {
  //   if (location.state?.tab === "activity" && !hasMarkedRead.current) {
  //     hasMarkedRead.current = true;
  //     setActiveTab("activity");
  //     markAllRead();
  //   }
  // }, [location.state]);

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

      // ✅ fetch warnings
      const warnRes = await fetch("http://localhost:8081/api/warnings/my", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (warnRes.ok) {
        setWarnings(await warnRes.json());
      }

    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

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

  const tabClass = (tab) =>
    `px-6 py-3 font-medium transition-all duration-200 border-b-2 -mb-[2px] ${
      activeTab === tab
        ? "border-[#26F2D0] text-[#26F2D0]"
        : "border-transparent text-gray-400 hover:text-[#26F2D0]"
    }`;

  // ✅ unread warnings = warnings not yet seen (read=false)
  const unreadWarnings = warnings.filter(w => !w.read).length;

  return (
    <>
    {/* <div className="min-h-screen bg-[#0f0f0f] text-white px-4 md:px-10 pt-4"> */}
     <div className="flex flex-col min-h-screen bg-[#0f0f0f] text-white">
   <div className="flex-1 px-4 md:px-10 pt-4">
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
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl font-bold">{name}</h2>
                  {role === "MODERATOR" && (
                    <span className="flex items-center gap-1 text-xs bg-[#26F2D0]/10
                                     text-[#26F2D0] border border-[#26F2D0]/20 px-2 py-0.5 rounded-full">
                      <Shield size={10} /> Moderator
                    </span>
                  )}
                  {role === "ADMIN" && (
                    <span className="flex items-center gap-1 text-xs bg-purple-500/10
                                     text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full">
                      <Settings size={10} /> Admin
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm">{rollNumber}</p>
              </div>
            </div>
            <img src="/elen.png" alt="ECET" className="w-16 h-16 object-contain opacity-90" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-2 border-b border-white/10 mb-8 overflow-x-auto">
          <button className={tabClass("profile")} onClick={() => navigate(`/profile/${id}/dashboard/profile`)}>
            Profile
          </button>
          <button
            className={tabClass("activity")}
            onClick={() => {
              navigate(`/profile/${id}/dashboard/activity`);
              if (unread > 0) markAllRead();
            }}
          >
            Activity
            {/* ✅ teal badge for notifications */}
            {unread > 0 && (
              <span className="ml-2 bg-[#26F2D0] text-black text-xs px-2 py-0.5 rounded-full font-bold">
                {unread > 9 ? "9+" : unread}
              </span>
            )}
            {/* ✅ red badge for unread warnings — disappears once Activity tab opened */}
            {unreadWarnings > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {unreadWarnings}⚠
              </span>
            )}
          </button>
          <button className={tabClass("upload")} onClick={() => navigate(`/profile/${id}/dashboard/upload`)}>
            Upload
          </button>
          {isModerator && (
            <button className={tabClass("review")} onClick={() => navigate(`/profile/${id}/dashboard/review`)}>
              Review Ideas
            </button>
          )}
        </div>

        {activeTab === "profile" && (
          <StudentProfile
            name={name} rollNumber={rollNumber} email={email} 
            ideas={ideas} myClub={myClub} joinedClubs={joinedClubs} loading={loading}
          />
        )}

        {/* ✅ pass setWarnings so StudentActivity can mark them read */}
        {activeTab === "activity" && (
          <StudentActivity
            notifications={notifications}
            warnings={warnings}
            setNotifications={setNotifications}
            setWarnings={setWarnings}
            token={token}
          />
        )}

        {activeTab === "upload" && (
          <div className="pb-10">
            {!isModerator ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10
                                flex items-center justify-center text-4xl mb-5">🔒</div>
                <h3 className="text-xl font-bold text-white mb-2">Moderator Access Only</h3>
                <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                  This section is reserved for CR, GR, and authorized moderators.
                  Contact your admin to request moderator access.
                </p>
                <div className="mt-6 flex items-center gap-2 bg-white/5 border border-white/10
                                rounded-xl px-4 py-3 text-xs text-gray-500">
                  <Shield size={12} />
                  <span>Only admin-assigned moderators can post news and upload resources</span>
                </div>
              </div>
            ) : (
              <ModeratorUploadPanel token={token} />
            )}
          </div>
        )}

        {activeTab === "review" && isModerator && (
          <div className="pb-10">
            <ModeratorIdeaReview token={token} isAdmin={false} />
          </div>
        )}
      </div>
             </div>
                   <Footer/>

    </div>
   </>
  );
}



