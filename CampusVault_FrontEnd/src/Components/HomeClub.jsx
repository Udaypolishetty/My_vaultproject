import { useState, useEffect } from "react";
import { Building2, Trophy, Users, Lightbulb, Bot, Printer, Code2, Cog, Rocket, Star, Music2, Mic2, Camera } from "lucide-react";
import { Crown, UserCheck } from "lucide-react";

/* ─────────────────────────────────────────────
   Category config
───────────────────────────────────────────── */
const CATEGORY_ACCENT = {
  AI:               { from: "#7c3aed", to: "#4f46e5", glow: "rgba(124,58,237,0.3)" },
  "3D_PRINTING":    { from: "#ea580c", to: "#dc2626", glow: "rgba(234,88,12,0.3)"  },
  WEB_DEV:          { from: "#0284c7", to: "#0891b2", glow: "rgba(2,132,199,0.3)"  },
  ROBOTICS:         { from: "#0d9488", to: "#0891b2", glow: "rgba(13,148,136,0.3)" },
  ENTREPRENEURSHIP: { from: "#16a34a", to: "#059669", glow: "rgba(22,163,74,0.3)"  },
  TECH_FEST:        { from: "#ca8a04", to: "#d97706", glow: "rgba(202,138,4,0.3)"  },
  SPORTS:           { from: "#dc2626", to: "#be185d", glow: "rgba(220,38,38,0.3)"  },
  CULTURAL:         { from: "#db2777", to: "#9333ea", glow: "rgba(219,39,119,0.3)" },
  TOASTMASTERS:     { from: "#4f46e5", to: "#7c3aed", glow: "rgba(79,70,229,0.3)"  },
  PHOTOGRAPHY:      { from: "#b45309", to: "#92400e", glow: "rgba(180,83,9,0.3)"   },
};

const CLUB_ICONS = {
  AI:               <Bot size={22} style={{ color: "#a78bfa" }} />,
  "3D_PRINTING":    <Printer size={22} style={{ color: "#fb923c" }} />,
  WEB_DEV:          <Code2 size={22} style={{ color: "#60a5fa" }} />,
  ROBOTICS:         <Cog size={22} style={{ color: "#22d3ee" }} />,
  ENTREPRENEURSHIP: <Rocket size={22} style={{ color: "#4ade80" }} />,
  TECH_FEST:        <Star size={22} style={{ color: "#facc15" }} />,
  SPORTS:           <Trophy size={22} style={{ color: "#f87171" }} />,
  CULTURAL:         <Music2 size={22} style={{ color: "#f472b6" }} />,
  TOASTMASTERS:     <Mic2 size={22} style={{ color: "#818cf8" }} />,
  PHOTOGRAPHY:      <Camera size={22} style={{ color: "#fbbf24" }} />,
};

/* ─────────────────────────────────────────────
   Club Card
───────────────────────────────────────────── */
function FeaturedClubCard({ club, onClick }) {
  const accent = CATEGORY_ACCENT[club.category] || { from: "#26F2D0", to: "#0891b2", glow: "rgba(38,242,208,0.3)" };

  return (
    <div onClick={onClick} className="bg-[#111] border border-white/10 rounded-xl p-4 cursor-pointer hover:scale-[1.02] transition">

      <div className="flex items-center gap-3 mb-2">
        {CLUB_ICONS[club.category] || <Building2 size={20} />}
        <h3 className="font-bold text-sm">{club.title}</h3>
      </div>

      <p className="text-gray-400 text-xs mb-2 line-clamp-2">
        {club.description}
      </p>

      {(club.presidentName || club.vpName) && (
        <div className="flex gap-2 text-xs mb-2">
          {club.presidentName && (
            <span className="text-purple-400 flex items-center gap-1">
              <Crown size={10} /> {club.presidentName}
            </span>
          )}
          {club.vpName && (
            <span className="text-blue-400 flex items-center gap-1">
              <UserCheck size={10} /> {club.vpName}
            </span>
          )}
        </div>
      )}

      <div className="text-xs text-gray-500">
        {club.memberCount}/{club.maxMembers} members
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const HomeClub = () => {

  const [clubCount, setClubCount] = useState(0);
  const [featuredClubs, setFeaturedClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8081/api/clubs/all")
      .then(res => res.json())
      .then(data => {
        setClubCount(data.length);

        const active = data
          .filter(c => c.status === "ACTIVE")
          .sort((a, b) => (b.memberCount || 0) - (a.memberCount || 0))
          .slice(0, 4);

        setFeaturedClubs(active);
      })
      .finally(() => setLoading(false));
  }, []);

  const goToClubs = () => {
    window.location.href = "/Connect";
  };

  if (loading) return null;

  return (
    <div className="w-full max-w-5xl">

      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 justify-center">
        <Building2 size={18} /> Featured Clubs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {featuredClubs.map(club => (
          <FeaturedClubCard key={club.id} club={club} onClick={goToClubs} />
        ))}
      </div>

      <button
        onClick={goToClubs}
        className="px-6 py-2 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition"
      >
        Explore All {clubCount} Clubs
      </button>

    </div>
  );
};

export default HomeClub;