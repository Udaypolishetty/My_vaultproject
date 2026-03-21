import { Users } from "lucide-react";
import { Bot, Printer, Code2, Cog, Rocket, Star, Trophy, Music2, Mic2, Camera, Heart } from "lucide-react";

const CATEGORY_ACCENT = {
  AI:               { from: "#7c3aed", to: "#4f46e5", glow: "rgba(124,58,237,0.3)" },
  "3D_PRINTING":    { from: "#ea580c", to: "#dc2626", glow: "rgba(234,88,12,0.3)" },
  WEB_DEV:          { from: "#0284c7", to: "#0891b2", glow: "rgba(2,132,199,0.3)" },
  ROBOTICS:         { from: "#0d9488", to: "#0891b2", glow: "rgba(13,148,136,0.3)" },
  ENTREPRENEURSHIP: { from: "#16a34a", to: "#059669", glow: "rgba(22,163,74,0.3)" },
  TECH_FEST:        { from: "#ca8a04", to: "#d97706", glow: "rgba(202,138,4,0.3)" },
  SPORTS:           { from: "#dc2626", to: "#be185d", glow: "rgba(220,38,38,0.3)" },
  CULTURAL:         { from: "#db2777", to: "#9333ea", glow: "rgba(219,39,119,0.3)" },
  TOASTMASTERS:     { from: "#4f46e5", to: "#7c3aed", glow: "rgba(79,70,229,0.3)" },
  PHOTOGRAPHY:      { from: "#b45309", to: "#92400e", glow: "rgba(180,83,9,0.3)" },
};

const BADGE_EMOJI = {
  EARLY_MEMBER: "🌱", ACTIVE_CONTRIBUTOR: "⚡",
  CLUB_LEADER: "👑", ALL_STAR: "🏆", TEAM_PLAYER: "🤝",
};

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
export default function ClubCard({ club, myRoll, onJoin, joining, onClick }) {
  const accent = CATEGORY_ACCENT[club.category] || { from: "#26F2D0", to: "#0891b2", glow: "rgba(38,242,208,0.3)" };
  const isMember = club.members?.includes(myRoll);
  const isPending = club.pendingMembers?.some(p => p.rollNumber === myRoll);
  const isFull = club.full;
  const progress = Math.min(((club.memberCount || 0) / club.maxMembers) * 100, 100);

  // recent unique badges
  const recentBadges = [...new Set((club.badges || []).map(b => b.badgeType))].slice(0, 4);

  return (
    <div
      onClick={() => onClick(club)}
      style={{
        background: `linear-gradient(145deg, #1a1a1a 0%, #111 50%, #0d0d0d 100%)`,
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: `0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px) scale(1.01)";
        e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.5), 0 0 30px ${accent.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`;
        e.currentTarget.style.borderColor = `${accent.from}60`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = `0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)`;
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      }}
    >
      {/* Metallic top accent bar */}
      <div style={{
        height: "3px",
        background: `linear-gradient(90deg, ${accent.from}, ${accent.to}, ${accent.from})`,
        backgroundSize: "200% 100%",
      }} />

      {/* Inner emboss highlight */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "60%",
        background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />

      <div style={{ padding: "20px" }}>

        {/* Badge seal + title */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "14px" }}>
          {/* Club seal */}
          <div style={{
            width: "52px", height: "52px", borderRadius: "50%", flexShrink: 0,
            background: `radial-gradient(circle at 35% 35%, ${accent.from}40, ${accent.to}20)`,
            border: `2px solid ${accent.from}50`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "24px",
            boxShadow: `inset 0 2px 4px rgba(0,0,0,0.5), 0 0 12px ${accent.glow}`,
          }}>
            {CLUB_ICONS[club.category] || <span className="text-2xl">🏛️</span>}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", marginBottom: "4px" }}>
              <h3 style={{ color: "white", fontWeight: 700, fontSize: "14px", lineHeight: 1.2, margin: 0 }}>
                {club.title}
              </h3>
              {(isMember || isPending) && (
                <span style={{
                  fontSize: "10px", padding: "2px 8px", borderRadius: "20px",
                  background: isMember ? "rgba(38,242,208,0.15)" : "rgba(234,179,8,0.15)",
                  color: isMember ? "#26F2D0" : "#eab308",
                  border: `1px solid ${isMember ? "rgba(38,242,208,0.3)" : "rgba(234,179,8,0.3)"}`,
                  fontWeight: 600,
                }}>
                  {isMember ? "Joined ✓" : "Pending ⏳"}
                </span>
              )}
            </div>
            <span style={{
              fontSize: "10px", padding: "2px 8px", borderRadius: "20px",
              background: `${accent.from}20`,
              color: accent.from,
              border: `1px solid ${accent.from}40`,
              fontWeight: 500,
            }}>
              {club.category?.replace(/_/g, " ")}
            </span>
          </div>
        </div>

        {/* Description */}
        <p style={{
          color: "#9ca3af", fontSize: "12px", lineHeight: 1.6,
          marginBottom: "14px",
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {club.description}
        </p>

        {/* Leadership */}
        {(club.presidentName || club.vpName) && (
          <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
            {club.presidentName && (
              <div style={{
                display: "flex", alignItems: "center", gap: "4px",
                background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)",
                borderRadius: "8px", padding: "4px 8px",
              }}>
                <span style={{ fontSize: "11px" }}>👑</span>
                <span style={{ fontSize: "11px", color: "#c084fc" }}>{club.presidentName}</span>
              </div>
            )}
            {club.vpName && (
              <div style={{
                display: "flex", alignItems: "center", gap: "4px",
                background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)",
                borderRadius: "8px", padding: "4px 8px",
              }}>
                <span style={{ fontSize: "11px" }}>🤝</span>
                <span style={{ fontSize: "11px", color: "#93c5fd" }}>{club.vpName}</span>
              </div>
            )}
          </div>
        )}

        {/* Member progress — thermometer style */}
        <div style={{ marginBottom: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
            <span style={{ fontSize: "11px", color: "#6b7280", display: "flex", alignItems: "center", gap: "3px" }}>
              <Users size={10} /> Members
            </span>
            <span style={{ fontSize: "11px", color: isFull ? "#f87171" : "#6b7280" }}>
              {club.memberCount}/{club.maxMembers}
            </span>
          </div>
          {/* Track */}
          <div style={{
            height: "6px", borderRadius: "3px",
            background: "rgba(255,255,255,0.06)",
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
            overflow: "hidden",
          }}>
            <div style={{
              height: "100%", borderRadius: "3px",
              width: `${progress}%`,
              background: isFull
                ? "linear-gradient(90deg, #f87171, #ef4444)"
                : `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
              boxShadow: `0 0 6px ${accent.glow}`,
              transition: "width 0.5s ease",
            }} />
          </div>
        </div>

        {/* Achievement badges earned by club */}
        {recentBadges.length > 0 && (
          <div style={{
            display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px",
            padding: "8px 10px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "10px",
          }}>
            <span style={{ fontSize: "10px", color: "#4b5563" }}>Badges:</span>
            {recentBadges.map(b => (
              <span key={b} style={{ fontSize: "14px" }} title={b.replace(/_/g, " ")}>
                {BADGE_EMOJI[b] || "🏅"}
              </span>
            ))}
          </div>
        )}

        {/* Join button */}
        {!isMember && !isPending && (
          <button
            onClick={(e) => { e.stopPropagation(); !isFull && onJoin(club.id); }}
            disabled={isFull || joining === club.id || club.status !== "ACTIVE"}
            style={{
              width: "100%", padding: "10px",
              borderRadius: "12px", fontWeight: 700, fontSize: "13px",
              cursor: isFull ? "not-allowed" : "pointer",
              border: "none",
              background: isFull || club.status !== "ACTIVE"
                ? "rgba(255,255,255,0.05)"
                : `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
              color: isFull || club.status !== "ACTIVE" ? "#4b5563" : "white",
              boxShadow: !isFull && club.status === "ACTIVE"
                ? `0 4px 15px ${accent.glow}, inset 0 1px 0 rgba(255,255,255,0.2)`
                : "none",
              transition: "all 0.2s",
            }}
          >
            {joining === club.id ? "Joining..." : isFull ? "Club Full" : club.status !== "ACTIVE" ? "Closed" : "Join Club"}
          </button>
        )}
      </div>
    </div>
  );
}