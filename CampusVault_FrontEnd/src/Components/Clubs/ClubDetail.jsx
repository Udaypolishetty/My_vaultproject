import { useState } from "react";
import { ArrowLeft, Crown, UserCheck, Users, ClipboardList, Megaphone, MessageSquare, Handshake, Hourglass,Building2 } from "lucide-react";
import ClubMembers from "./ClubMembers";
import ClubActivities from "./ClubActivities";
import ClubAnnouncements from "./ClubAnnouncements";
import ClubChat from "./ClubChat";

const TABS = [
  { key: "members", label: "Members", icon: <Users size={14} /> },
  { key: "activities", label: "Activities", icon: <ClipboardList size={14} /> },
  { key: "announcements", label: "Announcements", icon: <Megaphone size={14} /> },
  { key: "chat", label: "Chat", icon: <MessageSquare size={14} /> },
];

export default function ClubDetail({ club, myRoll, myName, token, onBack, onUpdate }) {
  const [activeTab, setActiveTab] = useState("members");
  const [requestingRole, setRequestingRole] = useState(false);
  const [roleRequested, setRoleRequested] = useState(false);

  const isMember = club.members?.includes(myRoll);
  const isPending = club.pendingMembers?.some(p => p.rollNumber === myRoll);
  const isPresident = myRoll === club.presidentRoll;
  const isVp = myRoll === club.vpRoll;
  const isAdmin = sessionStorage.getItem("role") === "ADMIN";

  const hasRoleAlready = isPresident || isVp;
  const hasPendingRequest = club.roleRequests?.some(
    r => r.requestedBy === myRoll && r.status === "PENDING"
  );

  const handleRequestRole = async (role) => {
    setRequestingRole(true);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/request-role`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role })
      });
      if (res.ok) { onUpdate(await res.json()); setRoleRequested(true); }
    } catch (err) {
      console.error("Role request failed:", err);
    } finally { setRequestingRole(false); }
  };

  const semesterDaysLeft = () => {
    if (!club.semesterEndDate) return null;
    const days = Math.ceil((new Date(club.semesterEndDate) - Date.now()) / 86400000);
    return days > 0 ? days : 0;
  };

  const daysLeft = semesterDaysLeft();
  const completedPct = club.totalActivities > 0
    ? Math.round((club.completedActivities / club.totalActivities) * 100) : 0;

  return (
    <div className="flex flex-col h-full">

      {/* Back */}
      <button onClick={onBack}
        className="flex items-center gap-2 text-[#26F2D0] hover:text-white
                   text-sm font-medium mb-5 transition w-fit">
        ← Back to Clubs
      </button>

      {/* Club header */}
      <div className="bg-gradient-to-br from-[#111] to-[#0d0d0d] border border-white/10
                      rounded-2xl p-5 mb-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10
                          flex items-center justify-center text-3xl shrink-0">
{club.logoEmoji || <Building2 size={24} />}     
     </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h2 className="font-bold text-white text-lg">{club.title}</h2>
              {isMember && !isPending && (
                <span className="text-xs bg-[#26F2D0]/20 text-[#26F2D0]
                                 border border-[#26F2D0]/30 px-2 py-0.5 rounded-full">
                  Member ✓
                </span>
              )}
              {isPending && (
                <span className="text-xs bg-yellow-500/20 text-yellow-400
                                 border border-yellow-500/30 px-2 py-0.5 rounded-full">
                 Pending <Hourglass size={12} />
                </span>
              )}
              {isPresident && (
                <span className="text-xs bg-purple-500/20 text-purple-400
                                 border border-purple-500/30 px-2 py-0.5 rounded-full">
                <Crown size={12} /> President
                </span>
              )}
              {isVp && (
                <span className="text-xs bg-blue-500/20 text-blue-400
                                 border border-blue-500/30 px-2 py-0.5 rounded-full">
                  <Handshake size={12} /> VP
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{club.description}</p>

            {/* Stats row */}
            <div className="flex items-center gap-4 mt-3 flex-wrap">
              <span className="text-xs text-gray-500">
               <Users size={12} /> {club.memberCount}/{club.maxMembers} members
              </span>
              <span className="text-xs text-gray-500">
                <ClipboardList size={12} /> {completedPct}% activities done
              </span>
              {daysLeft !== null && (
                <span className={`text-xs ${daysLeft < 30 ? "text-red-400" : "text-gray-500"}`}>
                  <Hourglass size={12} /> {daysLeft} days left
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Role request — only confirmed members without a role */}
        {isMember && !hasRoleAlready && !hasPendingRequest && !roleRequested && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs text-gray-500 mb-2">
              Request a leadership role — admin/moderator will assign if approved
            </p>
            <div className="flex gap-2">
              <button onClick={() => handleRequestRole("PRESIDENT")} disabled={requestingRole}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium
                           bg-purple-500/10 text-purple-400 border border-purple-500/20
                           rounded-xl hover:bg-purple-500/20 transition disabled:opacity-50">
                <Crown size={11} /> Request President
              </button>
              <button onClick={() => handleRequestRole("VP")} disabled={requestingRole}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium
                           bg-blue-500/10 text-blue-400 border border-blue-500/20
                           rounded-xl hover:bg-blue-500/20 transition disabled:opacity-50">
                <UserCheck size={11} /> Request VP
              </button>
            </div>
          </div>
        )}

        {(hasPendingRequest || roleRequested) && !hasRoleAlready && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs text-yellow-400">
              <Hourglass size={12} /> Role request pending — waiting for admin/moderator approval
            </p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/10 mb-4 overflow-x-auto pb-1">
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-t-xl text-xs font-medium
                       whitespace-nowrap transition-all
                       ${activeTab === tab.key
                         ? "bg-[#26F2D0]/10 text-[#26F2D0] border-b-2 border-[#26F2D0]"
                         : "text-gray-400 hover:text-white"}`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {activeTab === "members" && (
          <ClubMembers club={club} myRoll={myRoll} token={token} onUpdate={onUpdate} />
        )}
        {activeTab === "activities" && (
          <ClubActivities club={club} myRoll={myRoll} token={token} onUpdate={onUpdate} />
        )}
        {activeTab === "announcements" && (
          <ClubAnnouncements club={club} myRoll={myRoll} token={token} onUpdate={onUpdate} />
        )}
        {activeTab === "chat" && (
          <ClubChat club={club} myRoll={myRoll} myName={myName} token={token} onUpdate={onUpdate} />
        )}
      </div>
    </div>
  );
}