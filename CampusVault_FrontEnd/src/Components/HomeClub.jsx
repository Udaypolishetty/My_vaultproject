import { useNavigate,useParams  } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Building2, Bot, Printer, Code2, Cog, Rocket,
  Star, Music2, Mic2, Camera, Trophy,
  Crown, Users, ChevronLeft, ChevronRight, Trash2, X
} from "lucide-react";

const FONT_INJECT = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');`;

const CAT = {
  AI:               { from: "#7c3aed", to: "#4f46e5", glow: "rgba(124,58,237,0.45)", label: "Artificial Intelligence" },
  "3D_PRINTING":    { from: "#ea580c", to: "#dc2626", glow: "rgba(234,88,12,0.45)",  label: "3D Printing"            },
  WEB_DEV:          { from: "#0284c7", to: "#06b6d4", glow: "rgba(2,132,199,0.45)",  label: "Web Development"        },
  ROBOTICS:         { from: "#0d9488", to: "#0891b2", glow: "rgba(13,148,136,0.45)", label: "Robotics"               },
  ENTREPRENEURSHIP: { from: "#16a34a", to: "#059669", glow: "rgba(22,163,74,0.45)",  label: "Entrepreneurship"       },
  TECH_FEST:        { from: "#ca8a04", to: "#d97706", glow: "rgba(202,138,4,0.45)",  label: "Tech Fest"              },
  SPORTS:           { from: "#dc2626", to: "#be185d", glow: "rgba(220,38,38,0.45)",  label: "Sports"                 },
  CULTURAL:         { from: "#db2777", to: "#9333ea", glow: "rgba(219,39,119,0.45)", label: "Cultural"               },
  TOASTMASTERS:     { from: "#4f46e5", to: "#7c3aed", glow: "rgba(79,70,229,0.45)",  label: "Toastmasters"           },
  PHOTOGRAPHY:      { from: "#b45309", to: "#92400e", glow: "rgba(180,83,9,0.45)",   label: "Photography"            },
};

const ICONS = {
  AI:               <Bot     size={20} />,
  "3D_PRINTING":    <Printer size={20} />,
  WEB_DEV:          <Code2   size={20} />,
  ROBOTICS:         <Cog     size={20} />,
  ENTREPRENEURSHIP: <Rocket  size={20} />,
  TECH_FEST:        <Star    size={20} />,
  SPORTS:           <Trophy  size={20} />,
  CULTURAL:         <Music2  size={20} />,
  TOASTMASTERS:     <Mic2    size={20} />,
  PHOTOGRAPHY:      <Camera  size={20} />,
};

/* ── Delete Modal ── */
function DeleteModal({ club, onConfirm, onCancel, deleting }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
    }}>
      <div style={{
        background: "#141414", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 20, padding: 24, width: "100%", maxWidth: 360,
        fontFamily: "'DM Sans', sans-serif",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Trash2 size={16} style={{ color: "#ef4444" }} />
          </div>
          <div>
            <p style={{ color: "white", fontWeight: 600, fontSize: 14, margin: 0 }}>
              Remove from home?
            </p>
            <p style={{ color: "#6b7280", fontSize: 12, margin: "2px 0 0" }}>
              This only hides it here — club stays intact
            </p>
          </div>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.04)", borderRadius: 12,
          padding: "10px 14px", marginBottom: 16,
          border: "1px solid rgba(255,255,255,0.07)",
        }}>
          <p style={{ color: "white", fontSize: 13, fontWeight: 600, margin: 0 }}>{club.title}</p>
          <p style={{ color: "#6b7280", fontSize: 11, margin: "2px 0 0" }}>
            {CAT[club.category]?.label || club.category}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onCancel} style={{
            flex: 1, padding: "10px 0", borderRadius: 12,
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#9ca3af", fontSize: 13, fontWeight: 500, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}>Cancel</button>
          <button onClick={onConfirm} disabled={deleting} style={{
            flex: 1, padding: "10px 0", borderRadius: 12,
            background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)",
            color: "#f87171", fontSize: 13, fontWeight: 600, cursor: "pointer",
            opacity: deleting ? 0.5 : 1,
            fontFamily: "'DM Sans', sans-serif",
          }}>{deleting ? "Removing..." : "Remove"}</button>
        </div>
      </div>
    </div>
  );
}

/* ── Club Card ── */
function ClubCard({ club, isModerator, onDelete }) {
  const cat   = CAT[club.category] || { from: "#26F2D0", to: "#0891b2", glow: "rgba(38,242,208,0.4)", label: club.category };
  const icon  = ICONS[club.category] || <Building2 size={20} />;
  const pct   = club.maxMembers > 0 ? Math.min(Math.round((club.memberCount / club.maxMembers) * 100), 100) : 0;
  const done  = club.completedActivities || 0;
  const total = club.totalActivities || 0;
  const actPct = total > 0 ? Math.min(Math.round((done / total) * 100), 100) : 0;

  return (
    <div
      style={{
        width: 220, flexShrink: 0,
        background: "linear-gradient(160deg,#1c1c1c 0%,#141414 60%,#0f0f0f 100%)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: 20, overflow: "hidden", position: "relative",
        fontFamily: "'DM Sans', sans-serif",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.6),0 0 24px ${cat.glow},inset 0 1px 0 rgba(255,255,255,0.08)`;
        e.currentTarget.style.borderColor = `${cat.from}55`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.06)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
      }}
    >
      {/* colour top bar */}
      <div style={{ height: 3, background: `linear-gradient(90deg,${cat.from},${cat.to})`, boxShadow: `0 0 10px ${cat.glow}` }} />

      {/* sheen */}
      <div style={{
        position: "absolute", top: 3, left: 0, right: 0, height: 50,
        background: "linear-gradient(180deg,rgba(255,255,255,0.03) 0%,transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* moderator delete */}
      {/* {isModerator && (
        <button
          onClick={e => { e.stopPropagation(); onDelete(club); }}
          style={{
            position: "absolute", top: 10, right: 10, zIndex: 10,
            width: 26, height: 26, borderRadius: 8,
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
            color: "#ef4444", display: "flex", alignItems: "center",
            justifyContent: "center", cursor: "pointer", transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.25)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.5)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)";  e.currentTarget.style.borderColor = "rgba(239,68,68,0.2)"; }}
        >
          <X size={12} />
        </button>
      )} */}

      <div style={{ padding: "14px 14px 16px" }}>
        {/* icon + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
            background: `radial-gradient(circle at 35% 35%,${cat.from}45,${cat.to}20)`,
            border: `1.5px solid ${cat.from}55`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: cat.from,
            boxShadow: `inset 0 2px 4px rgba(0,0,0,0.5),0 0 10px ${cat.glow}`,
          }}>{icon}</div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              color: "white", fontWeight: 700, fontSize: 13,
              fontFamily: "'Sora',sans-serif", margin: 0, lineHeight: 1.25,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>{club.title}</p>
            {/* <p style={{
              fontSize: 10, color: cat.from, fontWeight: 500,
              margin: "2px 0 0", letterSpacing: "0.04em", textTransform: "uppercase",
            }}>{CAT[club.category]?.label || club.category?.replace(/_/g, " ")}</p> */}
          </div>
        </div>

        {/* description */}
        <p style={{
          color: "#6b7280", fontSize: 11.5, lineHeight: 1.55, marginBottom: 12,
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{club.description}</p>

        {/* president */}
        {club.presidentName && (
          <div style={{
            display: "flex", alignItems: "center", gap: 5, marginBottom: 11,
            padding: "5px 8px", background: "rgba(168,85,247,0.08)",
            border: "1px solid rgba(168,85,247,0.18)", borderRadius: 8,
          }}>
            <Crown size={10} style={{ color: "#c084fc", flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: "#c084fc", fontWeight: 500,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {club.presidentName}
            </span>
          </div>
        )}

        {/* member bar */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: "#4b5563", display: "flex", alignItems: "center", gap: 3 }}>
              <Users size={9} /> Members
            </span>
            <span style={{ fontSize: 10, color: club.full ? "#f87171" : "#4b5563" }}>
              {club.memberCount}/{club.maxMembers}
            </span>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 2, width: `${pct}%`,
              background: club.full ? "linear-gradient(90deg,#f87171,#ef4444)" : `linear-gradient(90deg,${cat.from},${cat.to})`,
              boxShadow: `0 0 6px ${cat.glow}`, transition: "width 0.6s ease",
            }} />
          </div>
        </div>

        {/* activity bar */}
        {total > 0 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: "#4b5563" }}>Progress</span>
              <span style={{ fontSize: 10, color: "#4b5563" }}>{done}/{total}</span>
            </div>
            <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 2, width: `${actPct}%`,
                background: "linear-gradient(90deg,#26F2D0,#7c3aed)", transition: "width 0.6s ease",
              }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main ── */
const HomeClub = ({ isModerator }) => {
  const [clubs,        setClubs]        = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [activeIndex,  setActiveIndex]  = useState(0);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting,     setDeleting]     = useState(false);
    const { id } = useParams();
  const navigate = useNavigate();

  /* ── pause refs — no re-renders ── */
  const pausedRef     = useRef(false);   // true when user is hovering OR dragging
  const resumeTimer   = useRef(null);
  const dragStartX    = useRef(0);
  const isDragging    = useRef(false);

  /* ── fetch ── */
  useEffect(() => {
    fetch("http://localhost:8081/api/clubs/all")
      .then(r => r.json())
      .then(data => {
        const active = data
          .filter(c => c.status === "ACTIVE")
          .sort((a, b) => (b.memberCount || 0) - (a.memberCount || 0));
        setClubs(active);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  /* ── auto-scroll — advances every 3.5s unless paused ── */
  useEffect(() => {
    if (clubs.length < 2) return;
    const id = setInterval(() => {
      if (!pausedRef.current) {
        setActiveIndex(prev => (prev + 1) % clubs.length);
      }
    }, 3500);
    return () => clearInterval(id);
  }, [clubs.length]);

  /* ── pause helpers ── */
  const pause = useCallback(() => {
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  /* resumes after `delay` ms of inactivity */
  const scheduleResume = useCallback((delay = 2500) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false;
    }, delay);
  }, []);

  /* immediate resume (mouse left the whole widget) */
  const resumeNow = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    pausedRef.current = false;
  }, []);

  /* ── manual navigation ── */
  const goTo = useCallback((dir) => {
    pause();
    setActiveIndex(prev => (prev + dir + clubs.length) % clubs.length);
    scheduleResume(2500);
  }, [clubs.length, pause, scheduleResume]);

  /* ── drag / swipe ── */
  const onDragStart = useCallback((x) => {
    pause();
    dragStartX.current = x;
    isDragging.current = true;
  }, [pause]);

  const onDragMove = useCallback((x) => {
    if (!isDragging.current) return;
    const diff = x - dragStartX.current;
    if (Math.abs(diff) > 45) {
      setActiveIndex(prev => (prev + (diff < 0 ? 1 : -1) + clubs.length) % clubs.length);
      dragStartX.current = x; // reset so continuous drag keeps working
    }
  }, [clubs.length]);

  const onDragEnd = useCallback(() => {
    isDragging.current = false;
    scheduleResume(2500);
  }, [scheduleResume]);

  /* ── delete ── */
  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setTimeout(() => {
      setClubs(prev => {
        const next = prev.filter(c => c.id !== deleteTarget.id);
        setActiveIndex(i => Math.min(i, Math.max(next.length - 1, 0)));
        return next;
      });
      setDeleteTarget(null);
      setDeleting(false);
    }, 350);
  };

//   const goToClubs = () => { window.location.href = `/Profile/${id}/Connect/Clubs`; };


 const goToClubs = () => {
  navigate(`/profile/${id}/connect/clubs`);
};
  if (loading || clubs.length === 0) return null;

  return (
    <>
      <style>{`
        ${FONT_INJECT}
        .hc-arrow {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: white; transition: all 0.2s ease; flex-shrink: 0;
        }
        .hc-arrow:hover {
          background: rgba(38,242,208,0.12); border-color: rgba(38,242,208,0.3);
          color: #26F2D0; box-shadow: 0 0 14px rgba(38,242,208,0.2);
        }
        .hc-arrow:disabled { opacity: 0.2; cursor: default; pointer-events: none; }
        .hc-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 28px; border-radius: 999px;
          background: rgba(38,242,208,0.07); border: 1px solid rgba(38,242,208,0.22);
          color: #26F2D0; font-size: 13px; font-weight: 600;
          cursor: pointer; letter-spacing: 0.04em;
          font-family: 'Sora', sans-serif; transition: all 0.25s ease;
        }
        .hc-cta:hover {
          background: rgba(38,242,208,0.14); border-color: rgba(38,242,208,0.45);
          box-shadow: 0 0 20px rgba(38,242,208,0.18);
        }
      `}</style>

      {deleteTarget && (
        <DeleteModal
          club={deleteTarget}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
          deleting={deleting}
        />
      )}

      <div
        style={{ width: "100%", maxWidth: 960, margin: "0 auto", padding: "0 0 8px" }}
        /* ── hover on the WHOLE widget pauses auto-scroll ── */
        onMouseEnter={pause}
        onMouseLeave={resumeNow}
      >

        {/* ── Section header ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 24, gap: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 3, height: 22, borderRadius: 2,
              background: "linear-gradient(180deg,#26F2D0,#7c3aed)",
            }} />
            <h2 style={{
              fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 20,
              color: "white", margin: 0, letterSpacing: "-0.03em",
            }}>Active Clubs</h2>
            {/* <span style={{
              fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999,
              background: "rgba(38,242,208,0.1)", border: "1px solid rgba(38,242,208,0.22)",
              color: "#26F2D0", fontFamily: "'DM Sans',sans-serif",
            }}>{clubs.length}</span> */}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button className="hc-arrow" onClick={() => goTo(-1)}><ChevronLeft  size={16} /></button>
            <button className="hc-arrow" onClick={() => goTo(1)}> <ChevronRight size={16} /></button>
          </div>
        </div>

        {/* ── Carousel stage ── */}
        <div
          style={{
            position: "relative", width: "100%", height: 270,
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden", cursor: "grab", userSelect: "none",
          }}
          onMouseDown={e  => onDragStart(e.clientX)}
          onMouseMove={e  => onDragMove(e.clientX)}
          onMouseUp={onDragEnd}
          onMouseLeave={e => { onDragEnd(); }}   // drag ends if cursor leaves stage
          onTouchStart={e => onDragStart(e.touches[0].clientX)}
          onTouchMove={e  => onDragMove(e.touches[0].clientX)}
          onTouchEnd={onDragEnd}
        >
          {clubs.map((club, i) => {
            let offset = i - activeIndex;
            /* wrap so cards cycle in the shortest direction */
            if (offset >  clubs.length / 2) offset -= clubs.length;
            if (offset < -clubs.length / 2) offset += clubs.length;

            const isCenter  = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            const translateX = offset * 155;
            const scale      = isCenter ? 1 : 1 - Math.abs(offset) * 0.1;
            const rotateY    = offset * -10;
            const zIndex     = 10 - Math.abs(offset);
            const opacity    = isVisible ? 1 - Math.abs(offset) * 0.25 : 0;
            const blur       = isCenter ? 0 : Math.abs(offset) * 1.5;

            return (
              <div
                key={club.id}
                style={{
                  position: "absolute",
                  transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                  transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease, filter 0.4s ease",
                  zIndex,
                  opacity,
                  filter: blur > 0 ? `blur(${blur}px)` : "none",
                  pointerEvents: isCenter ? "auto" : "none",
                }}
              >
                <ClubCard
                  club={club}
                  isModerator={isModerator}
                  onDelete={setDeleteTarget}
                />
              </div>
            );
          })}
        </div>

        {/* ── Dot indicators — active dot tracks activeIndex ── */}
        <div style={{
          display: "flex", justifyContent: "center",
          gap: 5, marginTop: 14, marginBottom: 20,
        }}>
          {clubs.map((_, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                onClick={() => { pause(); setActiveIndex(i); scheduleResume(2500); }}
                style={{
                  width: isActive ? 22 : 6, height: 6, borderRadius: 3,
                  background: isActive ? "#26F2D0" : "rgba(255,255,255,0.15)",
                  border: "none", padding: 0, cursor: "pointer",
                  transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                  boxShadow: isActive ? "0 0 8px rgba(38,242,208,0.5)" : "none",
                }}
              />
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div style={{ textAlign: "center" }}>
          <button className="hc-cta" onClick={goToClubs}>
            <Building2 size={14} />
            Explore All Clubs
          </button>
        </div>

      </div>
    </>
  );
};

export default HomeClub;