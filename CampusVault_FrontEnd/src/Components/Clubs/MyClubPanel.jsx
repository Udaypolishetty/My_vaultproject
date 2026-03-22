import { useState, useEffect } from "react";
import ClubMembers from "./ClubMembers";
import ClubActivities from "./ClubActivities";
import ClubAnnouncements from "./ClubAnnouncements";
import ClubChat from "./ClubChat";
import { Crown, UserCheck, Pencil, Check, X, Users, ClipboardList, Hourglass, Handshake, Leaf, Zap, Trophy,Bot,Printer,Code2,Cog,Rocket,Star,Music2,Mic2,Camera,Megaphone,MessageSquare } from "lucide-react";

const CLUB_ICONS = {
    AI:               <Bot size={22} className="text-purple-400" />,
    "3D_PRINTING":    <Printer size={22} className="text-orange-400" />,
    WEB_DEV:          <Code2 size={22} className="text-blue-400" />,
    ROBOTICS:         <Cog size={22} className="text-cyan-400" />,
    ENTREPRENEURSHIP: <Rocket size={22} className="text-green-400" />,
    TECH_FEST:        <Star size={22} className="text-yellow-400" />,
    SPORTS:           <Trophy size={22} className="text-red-400" />,
    CULTURAL:         <Music2 size={22} className="text-pink-400" />,
    TOASTMASTERS:     <Mic2 size={22} className="text-indigo-400" />,
    PHOTOGRAPHY:      <Camera size={22} className="text-amber-400" />,
};

const CATEGORY_ACCENT = {
  AI:               { from: "#7c3aed", to: "#4f46e5", glow: "rgba(124,58,237,0.2)" },
  "3D_PRINTING":    { from: "#ea580c", to: "#dc2626", glow: "rgba(234,88,12,0.2)" },
  WEB_DEV:          { from: "#0284c7", to: "#0891b2", glow: "rgba(2,132,199,0.2)" },
  ROBOTICS:         { from: "#0d9488", to: "#0891b2", glow: "rgba(13,148,136,0.2)" },
  ENTREPRENEURSHIP: { from: "#16a34a", to: "#059669", glow: "rgba(22,163,74,0.2)" },
  TECH_FEST:        { from: "#ca8a04", to: "#d97706", glow: "rgba(202,138,4,0.2)" },
  SPORTS:           { from: "#dc2626", to: "#be185d", glow: "rgba(220,38,38,0.2)" },
  CULTURAL:         { from: "#db2777", to: "#9333ea", glow: "rgba(219,39,119,0.2)" },
  TOASTMASTERS:     { from: "#4f46e5", to: "#7c3aed", glow: "rgba(79,70,229,0.2)" },
  PHOTOGRAPHY:      { from: "#b45309", to: "#92400e", glow: "rgba(180,83,9,0.2)" },
};

const TABS = [
  { key: "members", label: "Members", icon: <Users size={14} /> },
  { key: "activities", label: "Activities", icon: <ClipboardList size={14} /> },
  { key: "announcements", label: "Board", icon: <Megaphone size={14} /> },
  { key: "chat", label: "Chat", icon: <MessageSquare size={14} /> },
];

const BADGE_CONFIG = {
  EARLY_MEMBER: { icon: <Leaf size={13} />, label: "Early Member" },
  ACTIVE_CONTRIBUTOR: { icon: <Zap size={13} />, label: "Active Contributor" },
  CLUB_LEADER: { icon: <Crown size={13} />, label: "Club Leader" },
  ALL_STAR: { icon: <Trophy size={13} />, label: "All-Star" },
  TEAM_PLAYER: { icon: <Handshake size={13} />, label: "Team Player" },
};

const MAX_EDITS = 3;

function SingleClubPanel({ club, myRoll, myName, token, onUpdate }) {
  const [activeTab, setActiveTab] = useState("members");
  const [requestingRole, setRequestingRole] = useState(false);
  const [roleRequested, setRoleRequested] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [descValue, setDescValue] = useState(club.description || "");
  const [savingDesc, setSavingDesc] = useState(false);
  const [descError, setDescError] = useState("");

  const accent = CATEGORY_ACCENT[club.category] || { from: "#26F2D0", to: "#0891b2", glow: "rgba(38,242,208,0.2)" };
  const isPresident = myRoll === club.presidentRoll;
  const isVp = myRoll === club.vpRoll;
  const hasRole = isPresident || isVp;
  const hasPendingRequest = club.roleRequests?.some(
    r => r.requestedBy === myRoll && r.status === "PENDING"
  );
  const myBadges = (club.badges || []).filter(b => b.rollNumber === myRoll);
  const completedPct = club.totalActivities > 0
    ? Math.round((club.completedActivities / club.totalActivities) * 100) : 0;
  const daysLeft = club.semesterEndDate
    ? Math.max(0, Math.ceil((new Date(club.semesterEndDate) - Date.now()) / 86400000))
    : null;
  const editsLeft = MAX_EDITS - (club.editCount || 0);

  const handleRequestRole = async (role) => {
    setRequestingRole(true);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/request-role`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role })
      });
      if (res.ok) { onUpdate(await res.json()); setRoleRequested(true); }
      else { const t = await res.text(); alert(t); }
    } finally { setRequestingRole(false); }
  };

  const handleSaveDesc = async () => {
    if (!descValue.trim()) { setDescError("Description cannot be empty"); return; }
    if (descValue.length > 500) { setDescError("Max 500 characters"); return; }
    setDescError("");
    setSavingDesc(true);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/president-edit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ description: descValue.trim() })
      });
      if (res.ok) { onUpdate(await res.json()); setEditingDesc(false); }
      else { const t = await res.text(); setDescError(t); }
    } finally { setSavingDesc(false); }
  };

  return (
    <div style={{
      flex: 1, minWidth: 0,
      background: "linear-gradient(145deg, #141414 0%, #0f0f0f 100%)",
      border: `1px solid ${accent.from}30`,
      borderRadius: "24px",
      overflow: "hidden",
      boxShadow: `0 0 40px ${accent.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`,
      display: "flex", flexDirection: "column",
    }}>

      {/* Top accent line */}
      <div style={{
        height: "3px",
        background: `linear-gradient(90deg, transparent, ${accent.from}, ${accent.to}, transparent)`,
      }} />

      {/* Club header */}
      <div style={{
        padding: "18px 20px 14px",
        background: `linear-gradient(180deg, ${accent.from}10 0%, transparent 100%)`,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          {/* Seal */}
          <div style={{
            width: "52px", height: "52px", borderRadius: "50%", flexShrink: 0,
            background: `radial-gradient(circle at 35% 35%, ${accent.from}50, ${accent.to}25)`,
            border: `2px solid ${accent.from}50`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "24px",
            boxShadow: `inset 0 2px 6px rgba(0,0,0,0.6), 0 0 16px ${accent.glow}`,
          }}>
           {CLUB_ICONS[club.category] || <span className="text-2xl"><Building2 size={20} /></span>}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
              <h3 style={{ color: "white", fontWeight: 800, fontSize: "15px", margin: 0 }}>
                {club.title}
              </h3>
              {isPresident && (
                <span style={{ fontSize: "10px", padding: "2px 7px", borderRadius: "20px",
                  background: "rgba(168,85,247,0.15)", color: "#c084fc",
                  border: "1px solid rgba(168,85,247,0.3)", fontWeight: 600 }}>
                  <Crown size={10} /> 
                </span>
              )}
              {isVp && (
                <span style={{ fontSize: "10px", padding: "2px 7px", borderRadius: "20px",
                  background: "rgba(59,130,246,0.15)", color: "#93c5fd",
                  border: "1px solid rgba(59,130,246,0.3)", fontWeight: 600 }}>
                  <Handshake size={10} />
                </span>
              )}
            </div>

            {/* Description with president edit */}
            {editingDesc ? (
              <div style={{ marginBottom: "6px" }}>
                <textarea value={descValue} rows={2} maxLength={500}
                  onChange={e => { setDescValue(e.target.value); setDescError(""); }}
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(38,242,208,0.3)", borderRadius: "8px",
                    padding: "6px 8px", fontSize: "12px", color: "white",
                    outline: "none", resize: "none", boxSizing: "border-box"
                  }} />
                {descError && <p style={{ fontSize: "11px", color: "#f87171", margin: "2px 0 0" }}><AlertTriangle size={11} /> {descError}</p>}
                <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                  <button onClick={handleSaveDesc} disabled={savingDesc}
                    style={{ display: "flex", alignItems: "center", gap: "3px", padding: "3px 8px",
                      fontSize: "11px", background: "rgba(38,242,208,0.15)", color: "#26F2D0",
                      border: "1px solid rgba(38,242,208,0.3)", borderRadius: "6px", cursor: "pointer" }}>
                    <Check size={10} /> {savingDesc ? "Saving..." : "Save"}
                  </button>
                  <button onClick={() => { setEditingDesc(false); setDescValue(club.description || ""); }}
                    style={{ display: "flex", alignItems: "center", gap: "3px", padding: "3px 8px",
                      fontSize: "11px", background: "rgba(255,255,255,0.05)", color: "#9ca3af",
                      border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", cursor: "pointer" }}>
                    <X size={10} /> Cancel
                  </button>
                  <span style={{ fontSize: "10px", color: "#4b5563", alignSelf: "center" }}>
                    {editsLeft} edits left
                  </span>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                <p style={{ color: "#9ca3af", fontSize: "12px", margin: 0, flex: 1 }}>
                  {club.description}
                </p>
                {isPresident && editsLeft > 0 && (
                  <button onClick={() => setEditingDesc(true)}
                    title={`Edit description (${editsLeft} edits remaining)`}
                    style={{ background: "none", border: "none", cursor: "pointer",
                      color: "#4b5563", padding: "2px", flexShrink: 0 }}>
                    <Pencil size={11} />
                  </button>
                )}
              </div>
            )}

            {/* Stats */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "6px" }}>
              <span style={{ fontSize: "11px", color: "#6b7280" }}>
                <Users size={11} /> {club.memberCount}/{club.maxMembers}
              </span>
              <span style={{ fontSize: "11px", color: "#6b7280" }}>
               <ClipboardList size={11} /> {completedPct}% done
              </span>
              {daysLeft !== null && (
                <span style={{ fontSize: "11px", color: daysLeft < 30 ? "#f87171" : "#6b7280" }}>
                 <Hourglass size={11} /> {daysLeft}d left
                </span>
              )}
            </div>

            {/* My badges */}
            {myBadges.length > 0 && (
              <div style={{ display: "flex", gap: "4px", marginTop: "6px", flexWrap: "wrap" }}>
                {myBadges.map(b => {
                  const cfg = BADGE_CONFIG[b.badgeType];
                  return cfg ? (
                    <span key={b.badgeType} title={cfg.label} style={{
                      fontSize: "13px", padding: "2px 5px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px",
                    }}>{cfg.icon}</span>
                  ) : null;
                })}
              </div>
            )}
          </div>
        </div>

        {/* Role request */}
        {!hasRole && !hasPendingRequest && !roleRequested && (
          <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            <button onClick={() => handleRequestRole("PRESIDENT")} disabled={requestingRole}
              style={{ display: "flex", alignItems: "center", gap: "4px", padding: "4px 10px",
                fontSize: "11px", fontWeight: 600, background: "rgba(168,85,247,0.1)",
                color: "#c084fc", border: "1px solid rgba(168,85,247,0.2)",
                borderRadius: "8px", cursor: "pointer" }}>
              <Crown size={10} /> Request President
            </button>
            <button onClick={() => handleRequestRole("VP")} disabled={requestingRole}
              style={{ display: "flex", alignItems: "center", gap: "4px", padding: "4px 10px",
                fontSize: "11px", fontWeight: 600, background: "rgba(59,130,246,0.1)",
                color: "#93c5fd", border: "1px solid rgba(59,130,246,0.2)",
                borderRadius: "8px", cursor: "pointer" }}>
              <UserCheck size={10} /> Request VP
            </button>
          </div>
        )}
        {(hasPendingRequest || roleRequested) && !hasRole && (
          <p style={{ fontSize: "11px", color: "#eab308", marginTop: "8px" }}>
            <Hourglass size={11} /> Role request pending — awaiting admin approval
          </p>
        )}
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 12px", overflowX: "auto",
      }}>
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            style={{
              display: "flex", alignItems: "center", gap: "4px",
              padding: "10px 10px", fontSize: "12px", fontWeight: 500,
              color: activeTab === tab.key ? accent.from : "#6b7280",
              borderBottom: activeTab === tab.key ? `2px solid ${accent.from}` : "2px solid transparent",
              background: "transparent", border: "none",
              borderBottom: activeTab === tab.key ? `2px solid ${accent.from}` : "2px solid transparent",
              cursor: "pointer", whiteSpace: "nowrap", transition: "color 0.2s",
            }}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "auto", padding: "16px", minHeight: 0 }}>
        {activeTab === "members"       && <ClubMembers       club={club} myRoll={myRoll} token={token} onUpdate={onUpdate} />}
        {activeTab === "activities"    && <ClubActivities    club={club} myRoll={myRoll} token={token} onUpdate={onUpdate} />}
        {activeTab === "announcements" && <ClubAnnouncements club={club} myRoll={myRoll} token={token} onUpdate={onUpdate} />}
        {activeTab === "chat"          && <ClubChat          club={club} myRoll={myRoll} myName={myName} token={token} onUpdate={onUpdate} />}
      </div>
    </div>
  );
}

export default function MyClubPanel({ myClubs, myRoll, myName, token, onUpdate }) {
  const [activeClubIdx, setActiveClubIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (myClubs.length === 0) return null;

  return (
    <div style={{ marginBottom: "32px" }}>
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, transparent, rgba(38,242,208,0.3))" }} />
        <span style={{ fontSize: "11px", fontWeight: 700, color: "#26F2D0", letterSpacing: "0.1em" }}>
          MY CLUBS ({myClubs.length}/2)
        </span>
        <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, rgba(38,242,208,0.3), transparent)" }} />
      </div>

      {/* ✅ Mobile pill switcher */}
      {isMobile && myClubs.length > 1 && (
        <div style={{
          display: "flex", gap: "8px", marginBottom: "12px",
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "50px", padding: "4px",
        }}>
          {myClubs.map((club, idx) => {
            const accent = CATEGORY_ACCENT[club.category] || { from: "#26F2D0", to: "#0891b2" };
            const isActive = activeClubIdx === idx;
            return (
              <button key={club.id} onClick={() => setActiveClubIdx(idx)}
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                  gap: "6px", padding: "8px 12px", borderRadius: "50px", fontSize: "13px",
                  fontWeight: 600, cursor: "pointer", border: "none", transition: "all 0.3s",
                  background: isActive
                    ? `linear-gradient(135deg, ${accent.from}30, ${accent.to}20)`
                    : "transparent",
                  color: isActive ? accent.from : "#6b7280",
                  boxShadow: isActive ? `0 0 12px ${accent.from}30` : "none",
                }}>
                <span style={{ fontSize: "16px" }}>{CLUB_ICONS[club.category] || <span className="text-2xl">🏛️</span>}</span>
                <span style={{ fontSize: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100px" }}>
                  {club.title}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Panels */}
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: "16px",
        minHeight: "520px",
      }}>
        {isMobile ? (
          // ✅ Mobile — show only active club
          <SingleClubPanel
            key={myClubs[activeClubIdx].id}
            club={myClubs[activeClubIdx]}
            myRoll={myRoll} myName={myName} token={token} onUpdate={onUpdate}
          />
        ) : (
          // ✅ Desktop — side by side
          myClubs.map(club => (
            <SingleClubPanel
              key={club.id}
              club={club}
              myRoll={myRoll} myName={myName} token={token} onUpdate={onUpdate}
            />
          ))
        )}
      </div>
    </div>
  );
}