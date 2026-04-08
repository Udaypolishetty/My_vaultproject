import { API_BASE } from "../config/api";
import { useState, useEffect, useCallback } from "react";
import { Trophy, Users, Lightbulb, Layers } from "lucide-react";
import HomeIdeaCard from "./HomeIdeaCard";
import HomeAIAdvisor from "./HomeAIAdvisor";
import HomeClub from "./HomeClub";
import Footer from "./FooterFiles/Footer";

/* ─────────────────────────────────────────────
   30-DAY FILTER — frontend only, no DB change.
   An idea is hidden from Home once:
     today - reviewedAt  >  30 days
   Ideas page and DB are completely unaffected.
───────────────────────────────────────────── */
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

function isWithin30Days(reviewedAt) {
  if (!reviewedAt) return true; // if no date, always show
  return Date.now() - new Date(reviewedAt).getTime() < THIRTY_DAYS_MS;
}

const Home = () => {
  const [count, setCount] = useState(0);
  const [ideasCount, setIdeasCount] = useState(0);
  const [clubsCount, setClubsCount] = useState(0);
  const [showcase, setShowcase] = useState([]);
  const [loading, setLoading] = useState(true);

  const token    = sessionStorage.getItem("token");
  const role     = sessionStorage.getItem("role");
  const userName = sessionStorage.getItem("name") || "Student";

  // ── isModerator still exists for other uses in this file,
  //    but we intentionally do NOT pass it to HomeIdeaCard
  //    so no one on Home can delete showcase cards.
  const isModerator = role === "MODERATOR" || role === "ADMIN";

  const [animatedCount, setAnimatedCount] = useState(0);
  const [animatedIdeas, setAnimatedIdeas] = useState(0);
  const [animatedClubs, setAnimatedClubs] = useState(0);

  // ── Animate numbers (unchanged) ──
  useEffect(() => {
    const animate = (target, setter) => {
      let start = 0;
      const duration  = 1500;
      const stepTime  = 25;
      const steps     = duration / stepTime;
      const increment = target / steps;

      const counter = setInterval(() => {
        start += increment * 1.03;
        if (start >= target) {
          setter(target);
          clearInterval(counter);
        } else {
          setter(Math.floor(start));
        }
      }, stepTime);
    };

    if (!loading) {
      animate(count,      setAnimatedCount);
      animate(ideasCount, setAnimatedIdeas);
      animate(clubsCount, setAnimatedClubs);
    }
  }, [loading, count, ideasCount, clubsCount]);

  // ── Fetch data ──
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [countRes, ideasRes, showcaseRes, clubsRes] = await Promise.all([
          fetch(`${API_BASE}/student/count`),
          fetch(`${API_BASE}/api/ideas`),
          fetch(`${API_BASE}/api/ideas/showcase`),
          fetch(`${API_BASE}/api/clubs/count`),
        ]);

        const countData = await countRes.json();
        setCount(countData);

        const ideasData = await ideasRes.json();
        setIdeasCount(ideasData.length);

        const showcaseData = await showcaseRes.json();

        // ── 30-DAY FILTER ──
        // Filter happens here, right after the API response.
        // Only ideas implemented within the last 30 days appear on Home.
        // The DB, Ideas page, and Admin panel are completely unaffected.
        const recentShowcase = showcaseData.filter(idea =>
          isWithin30Days(idea.reviewedAt)
        );
        setShowcase(recentShowcase);

        const clubsData = await clubsRes.json();
        setClubsCount(clubsData);
      } catch (error) {
        console.error("Home data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = useCallback((dt) => {
    return new Date(dt).toLocaleDateString("en-IN", {
      month: "short",
      year:  "numeric",
    });
  }, []);

  // ── Local removal (e.g. if admin deletes from elsewhere and
  //    we want the UI to reflect it without a refetch) ──
  const handleIdeaDelete = useCallback((id) => {
    setShowcase(prev => prev.filter(i => i.id !== id));
  }, []);

  // ── Typewriter (unchanged) ──
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");

  useEffect(() => {
    const text1 = "Sharing   Resources.";
    const text2 = "Building   Community.";
    let i = 0, j = 0;

    const typeLine1 = setInterval(() => {
      if (i < text1.length) {
        setLine1(text1.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typeLine1);
        const typeLine2 = setInterval(() => {
          if (j < text2.length) {
            setLine2(text2.substring(0, j + 1));
            j++;
          } else {
            clearInterval(typeLine2);
          }
        }, Math.random() * 30 + 30);
      }
    }, Math.random() * 30 + 30);

    return () => clearInterval(typeLine1);
  }, []);

  return (
    <>
      <section className="min-h-screen flex flex-col items-center text-center
                          px-6 bg-[#181818] text-white pt-16 pb-6
                          relative overflow-hidden z-10">

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap');
          .hero-text {
            font-family: 'Abril Fatface', serif;
            color: #e6e6e6;
            text-shadow:
              1px 1px 0 #000, 2px 2px 0 #000, 3px 3px 0 #000,
              4px 4px 0 #000, 5px 5px 0 #000, 6px 6px 0 #000;
            letter-spacing: 0.5px;
          }
          @keyframes float-slow {
            0%   { transform: translate(0,0) rotate(0deg); }
            33%  { transform: translate(30px,-50px) rotate(10deg); }
            66%  { transform: translate(-20px,20px) rotate(-10deg); }
            100% { transform: translate(0,0) rotate(0deg); }
          }
          @keyframes pulse-glow {
            0%,100% { opacity:0.3; transform:scale(1); }
            50%     { opacity:0.6; transform:scale(1.2); }
          }
          .animate-float      { animation: float-slow 15s infinite ease-in-out; }
          .animate-pulse-slow { animation: pulse-glow 8s infinite ease-in-out; }
          @media (max-width:640px) {
            .mobile-safe-bg > * { transform:scale(0.6)!important; opacity:0.1!important; }
            .mobile-safe-bg svg { width:60px!important; height:60px!important; }
          }
        `}</style>

        {/* Background */}
        <div className="fixed inset-0 pointer-events-none z-0 mobile-safe-bg">
          <div className="absolute top-[10%] left-[15%] w-64 h-64 bg-[#26F2D0]/20 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute top-[20%] right-[10%] animate-float" style={{ animationDelay:"0s" }}>
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="opacity-30">
              <path d="M50 10L90 80H10L50 10Z" stroke="#26F2D0" strokeWidth="1" fill="url(#grad1)" />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   style={{stopColor:"#26F2D0",stopOpacity:0.5}} />
                  <stop offset="100%" style={{stopColor:"transparent",stopOpacity:0}} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute bottom-[20%] right-[20%] w-80 h-80 bg-[#F4A261]/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay:"2s" }} />
          <div className="absolute bottom-[10%] left-[10%] animate-float" style={{ animationDuration:"20s", animationDelay:"4s" }}>
            <div className="w-20 h-20 border border-[#5DADE2]/40 rotate-45 backdrop-blur-sm bg-white/5 rounded-lg" />
          </div>
          <div className="absolute top-[50%] left-[5%] animate-float opacity-20" style={{ animationDuration:"12s" }}>
            <div className="w-32 h-32 border-2 border-[#26F2D0] rounded-full border-dashed" />
          </div>
        </div>

        {/* Hero */}
        <div className="mb-14 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-[#26F2D0] to-[#5DADE2] text-transparent bg-clip-text">
              Welcome
            </span>{" "}
            {userName}!
          </h1>
          <p className="text-xl md:text-3xl hero-text leading-tight">
            {line1.split("Resources")[0]}
            <span className="text-[#26F2D0] ml-2">
              {line1.includes("Resources") ? "Resources" : ""}
            </span>
            {line1.includes("Resources") && "."}
          </p>
          <p className="text-xl md:text-3xl hero-text leading-tight mt-2">
            {line2.split("Community")[0]}
            <span className="text-[#F4A261] ml-2">
              {line2.includes("Community") ? "Community" : ""}
            </span>
            {line2.includes("Community") && "."}
          </p>
        </div>

        {/* AI Button */}
        <div className="flex justify-center mb-16">
          <HomeAIAdvisor token={token} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-24">
          <div className="group bg-gradient-to-br from-[#1f1f1f] to-[#141414] rounded-2xl p-6 border border-white/10 hover:scale-[1.03] transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(38,242,208,0.15)]">
            <div className="flex items-center gap-3 mb-3">
              <Users className="text-[#26F2D0]" size={20} />
              <p className="text-gray-400 text-sm">Active Members</p>
            </div>
            <h2 className="text-3xl font-bold">{loading ? "—" : `${animatedCount.toLocaleString()}+`}</h2>
          </div>
          <div className="group bg-gradient-to-br from-[#1f1f1f] to-[#141414] rounded-2xl p-6 border border-white/10 hover:scale-[1.03] transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(244,162,97,0.2)]">
            <div className="flex items-center gap-3 mb-3">
              <Lightbulb className="text-[#F4A261]" size={20} />
              <p className="text-gray-400 text-sm">Ideas Shared</p>
            </div>
            <h2 className="text-3xl font-bold">{loading ? "—" : `${animatedIdeas.toLocaleString()}+`}</h2>
          </div>
          <div className="group bg-gradient-to-br from-[#1f1f1f] to-[#141414] rounded-2xl p-6 border border-white/10 hover:scale-[1.03] transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(93,173,226,0.2)]">
            <div className="flex items-center gap-3 mb-3">
              <Layers className="text-[#5DADE2]" size={20} />
              <p className="text-gray-400 text-sm">Active Clubs</p>
            </div>
            <h2 className="text-3xl font-bold">{loading ? "—" : `${animatedClubs.toLocaleString()}+`}</h2>
          </div>
        </div>

        {/* Ideas Showcase */}
        {showcase.length > 0 && (
          <div className="w-full max-w-6xl mb-16">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold font-serif tracking-wide bg-gradient-to-r from-[#26F2D0] to-[#5DADE2] bg-clip-text text-transparent mb-4">
                Featured Ideas
              </h2>
              <div className="flex justify-center mb-4">
                <div className="h-[3px] w-14 rounded-full bg-gradient-to-r from-transparent via-[#26F2D0] to-[#5DADE2]" />
              </div>
              <p className="text-xl text-gray-400 max-w-2xl">
                Discover innovative ideas and resources shared by our community
              </p>
            </div>

            <div className="w-full flex justify-center mb-10">
              {/*
                ── NO isModerator prop passed here ──
                Delete button is disabled for ALL users on Home page.
                Admin manages deletions separately from AdminDashboard.
              */}
              <HomeIdeaCard
                ideas={showcase}
                token={token}
                formatDate={formatDate}
                onDeleted={handleIdeaDelete}
              />
            </div>
          </div>
        )}

        {/* Clubs */}
        <div className="w-full max-w-6xl mt-10">
          <HomeClub isModerator={isModerator} />
        </div>

      </section>

      <Footer />
    </>
  );
};

export default Home;