
import { ExternalLink, Trash2, ThumbsUp, Calendar, GraduationCap, Building2 } from "lucide-react";
import { useState, useEffect,useRef  } from "react";

/* ── Category config ── */
const CATEGORY_ICONS = {
  Tech:           "/techh.png",
  Academic:       "/academic.png",
  "Campus Pulse": "/campuspulse.png",
  Cultural:       "/cultural.png",
};

const CATEGORY_ACCENT = {
  Tech:           { from: "#3b82f6", to: "#06b6d4", glow: "rgba(59,130,246,0.5)"  },
  Academic:       { from: "#22c55e", to: "#10b981", glow: "rgba(34,197,94,0.5)"   },
  "Campus Pulse": { from: "#ef4444", to: "#f97316", glow: "rgba(239,68,68,0.5)"   },
  Cultural:       { from: "#eab308", to: "#f59e0b", glow: "rgba(234,179,8,0.5)"   },
};

const getLinkLabel = (url) => {
  if (!url) return "View";
  if (url.includes("youtube") || url.includes("youtu.be")) return "▶ YouTube";
  if (url.includes("instagram")) return "📸 Instagram";
  if (url.includes("drive.google")) return "📁 Drive";
  if (url.includes("linkedin")) return "💼 LinkedIn";
  return "🔗 View";
};

/* ─────────────────────────────────────────────
   GlassIdeaCard
   position:absolute — used in stacked + desktop spread
   isModerator is gone — no delete button anywhere on Home
───────────────────────────────────────────── */
function GlassIdeaCard({ idea, style, formatDate }) {
  const accent = CATEGORY_ACCENT[idea.category] || {
    from: "#26F2D0", to: "#0891b2", glow: "rgba(38,242,208,0.5)",
  };

  const proposedBy = idea.classProposal ? (
    <span style={{ display:"flex", alignItems:"center", gap:4 }}>
      <Building2 size={13} /> {idea.proposalClass}
    </span>
  ) : (
    <span style={{ display:"flex", alignItems:"center", gap:4 }}>
      <GraduationCap size={13} /> {idea.createdByName}
    </span>
  );

  const proposedBySubtext = idea.classProposal
    ? `Class Proposal · ${idea.category}`
    : `${idea.createdByBranch} · ${idea.createdByYear}`;

  return (
    <div style={{
      position: "absolute",
      width: 200, height: 250,
      borderRadius: 16,
      background: "linear-gradient(160deg,rgba(255,255,255,0.10) 0%,rgba(255,255,255,0.04) 60%,rgba(0,0,0,0.15) 100%)",
      border: "1px solid rgba(255,255,255,0.13)",
      boxShadow: "0 20px 40px rgba(0,0,0,0.45),0 0 0 0.5px rgba(255,255,255,0.06) inset",
      backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
      overflow: "hidden", cursor: "default",
      display: "flex", flexDirection: "column",
      transition: "transform 0.55s cubic-bezier(0.34,1.1,0.64,1)",
      ...style,
    }}>
      <div style={{ height:3, flexShrink:0,
        background:`linear-gradient(90deg,${accent.from},${accent.to})`,
        boxShadow:`0 0 10px ${accent.glow}` }} />

      {idea.showcaseImageUrl ? (
        <div style={{ height:96, flexShrink:0, position:"relative", overflow:"hidden" }}>
          <img src={idea.showcaseImageUrl} alt={idea.title}
            style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          <div style={{ position:"absolute", inset:0,
            background:"linear-gradient(to top,rgba(0,0,0,0.6),transparent)" }} />
          <span style={{ position:"absolute", bottom:6, left:8,
            fontSize:9, padding:"2px 7px", borderRadius:999,
            background:"rgba(34,197,94,0.8)", color:"white", fontWeight:600 }}>
            ✅ Implemented
          </span>
        </div>
      ) : (
        <div style={{ height:80, flexShrink:0,
          display:"flex", alignItems:"center", justifyContent:"center",
          background:`linear-gradient(135deg,${accent.from}18,${accent.to}0a)`,
          borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <img src={CATEGORY_ICONS[idea.category] || "/others.png"}
            style={{ width:40, height:40, objectFit:"contain", opacity:0.7 }} alt="" />
        </div>
      )}

      <div style={{ padding:"10px 12px", flex:1, display:"flex", flexDirection:"column", gap:6 }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:6 }}>
          <p style={{ color:"white", fontWeight:700, fontSize:12, lineHeight:1.3,
            margin:0, flex:1,
            display:"-webkit-box", WebkitLineClamp:2,
            WebkitBoxOrient:"vertical", overflow:"hidden" }}>
            {idea.title}
          </p>
          {idea.showcaseLink && (
            <a href={idea.showcaseLink} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ flexShrink:0, display:"flex", alignItems:"center", gap:3,
                padding:"3px 7px", borderRadius:8,
                background:"rgba(255,255,255,0.08)",
                border:"1px solid rgba(255,255,255,0.12)",
                color:"#9ca3af", fontSize:10, textDecoration:"none",
                whiteSpace:"nowrap", transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.color="#26F2D0"; e.currentTarget.style.background="rgba(38,242,208,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.color="#9ca3af"; e.currentTarget.style.background="rgba(255,255,255,0.08)"; }}>
              {getLinkLabel(idea.showcaseLink)}
              <ExternalLink size={8} />
            </a>
          )}
        </div>

        <div style={{ marginTop:"auto" }}>
          <p style={{ fontSize:10, color:"#e5e7eb", fontWeight:500, margin:0 }}>{proposedBy}</p>
          <p style={{ fontSize:9, color:"#6b7280", margin:"1px 0 0" }}>{proposedBySubtext}</p>
        </div>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontSize:10, color:"#26F2D0", fontWeight:700, display:"flex", alignItems:"center", gap:3 }}>
            <ThumbsUp size={9} /> {idea.likes || 0}
          </span>
          {idea.reviewedAt && (
            <span style={{ fontSize:9, color:"#4b5563", display:"flex", alignItems:"center", gap:3 }}>
              <Calendar size={8} /> {formatDate(idea.reviewedAt)}
            </span>
          )}
        </div>
      </div>

      {/* bottom label — no delete button */}
      <div style={{ height:36, flexShrink:0,
        background:"rgba(255,255,255,0.05)",
        borderTop:"1px solid rgba(255,255,255,0.07)",
        display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontSize:10, color:"#d1d5db", fontWeight:500,
          letterSpacing:"0.06em", textTransform:"uppercase" }}>
          {idea.category || "Idea"}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MobileScrollCard
   position:relative — used inside the horizontal
   scroll row so cards take up real space
───────────────────────────────────────────── */
function MobileScrollCard({ idea, formatDate }) {
  const accent = CATEGORY_ACCENT[idea.category] || {
    from: "#26F2D0", to: "#0891b2", glow: "rgba(38,242,208,0.5)",
  };

  const proposedBy = idea.classProposal ? (
    <span style={{ display:"flex", alignItems:"center", gap:4 }}>
      <Building2 size={13} /> {idea.proposalClass}
    </span>
  ) : (
    <span style={{ display:"flex", alignItems:"center", gap:4 }}>
      <GraduationCap size={13} /> {idea.createdByName}
    </span>
  );

  const proposedBySubtext = idea.classProposal
    ? `Class Proposal · ${idea.category}`
    : `${idea.createdByBranch} · ${idea.createdByYear}`;

  return (
    <div style={{
      position: "relative",          // KEY: real space for scroll
      width: 200, minWidth: 200,
      flexShrink: 0, height: 250,
      borderRadius: 16,
      background: "linear-gradient(160deg,rgba(255,255,255,0.10) 0%,rgba(255,255,255,0.04) 60%,rgba(0,0,0,0.15) 100%)",
      border: "1px solid rgba(255,255,255,0.13)",
      boxShadow: "0 20px 40px rgba(0,0,0,0.45),0 0 0 0.5px rgba(255,255,255,0.06) inset",
      backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
      overflow: "hidden", display: "flex", flexDirection: "column",
      scrollSnapAlign: "start",
      animation: "cardSlideIn 0.4s cubic-bezier(0.34,1.1,0.64,1) both",
    }}>
      <div style={{ height:3, flexShrink:0,
        background:`linear-gradient(90deg,${accent.from},${accent.to})`,
        boxShadow:`0 0 10px ${accent.glow}` }} />

      {idea.showcaseImageUrl ? (
        <div style={{ height:96, flexShrink:0, position:"relative", overflow:"hidden" }}>
          <img src={idea.showcaseImageUrl} alt={idea.title}
            style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          <div style={{ position:"absolute", inset:0,
            background:"linear-gradient(to top,rgba(0,0,0,0.6),transparent)" }} />
          <span style={{ position:"absolute", bottom:6, left:8,
            fontSize:9, padding:"2px 7px", borderRadius:999,
            background:"rgba(34,197,94,0.8)", color:"white", fontWeight:600 }}>
            ✅ Implemented
          </span>
        </div>
      ) : (
        <div style={{ height:80, flexShrink:0,
          display:"flex", alignItems:"center", justifyContent:"center",
          background:`linear-gradient(135deg,${accent.from}18,${accent.to}0a)`,
          borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <img src={CATEGORY_ICONS[idea.category] || "/others.png"}
            style={{ width:40, height:40, objectFit:"contain", opacity:0.7 }} alt="" />
        </div>
      )}

      <div style={{ padding:"10px 12px", flex:1, display:"flex", flexDirection:"column", gap:6 }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:6 }}>
          <p style={{ color:"white", fontWeight:700, fontSize:12, lineHeight:1.3,
            margin:0, flex:1,
            display:"-webkit-box", WebkitLineClamp:2,
            WebkitBoxOrient:"vertical", overflow:"hidden" }}>
            {idea.title}
          </p>
          {idea.showcaseLink && (
            <a href={idea.showcaseLink} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ flexShrink:0, display:"flex", alignItems:"center", gap:3,
                padding:"3px 7px", borderRadius:8,
                background:"rgba(255,255,255,0.08)",
                border:"1px solid rgba(255,255,255,0.12)",
                color:"#9ca3af", fontSize:10, textDecoration:"none",
                whiteSpace:"nowrap" }}>
              {getLinkLabel(idea.showcaseLink)}
              <ExternalLink size={8} />
            </a>
          )}
        </div>

        <div style={{ marginTop:"auto" }}>
          <p style={{ fontSize:10, color:"#e5e7eb", fontWeight:500, margin:0 }}>{proposedBy}</p>
          <p style={{ fontSize:9, color:"#6b7280", margin:"1px 0 0" }}>{proposedBySubtext}</p>
        </div>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontSize:10, color:"#26F2D0", fontWeight:700, display:"flex", alignItems:"center", gap:3 }}>
            <ThumbsUp size={9} /> {idea.likes || 0}
          </span>
          {idea.reviewedAt && (
            <span style={{ fontSize:9, color:"#4b5563", display:"flex", alignItems:"center", gap:3 }}>
              <Calendar size={8} /> {formatDate(idea.reviewedAt)}
            </span>
          )}
        </div>
      </div>

      <div style={{ height:36, flexShrink:0,
        background:"rgba(255,255,255,0.05)",
        borderTop:"1px solid rgba(255,255,255,0.07)",
        display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontSize:10, color:"#d1d5db", fontWeight:500,
          letterSpacing:"0.06em", textTransform:"uppercase" }}>
          {idea.category || "Idea"}
        </span>
      </div>
    </div>
  );
}

/* ── Stack layout constants ── */
const CARD_W   = 200;
const CARD_GAP = 20;

const STACK_TRANSFORMS = [
  { rotate:-15, x:-30, y:20, z:1 },
  { rotate: -8, x:-14, y:10, z:2 },
  { rotate:  0, x:  0, y: 0, z:3 },
  { rotate:  8, x: 14, y:10, z:2 },
  { rotate: 15, x: 30, y:20, z:1 },
];

/* ══════════════════════════════════════════════════════════════
   HomeIdeaCard
   ─────────────────────────────────────────────────────────────
   Props: ideas, token, formatDate, onDeleted
   NOTE: isModerator is intentionally NOT accepted here.
         No one can delete from Home — admin uses AdminDashboard.

   MOBILE:
     default   → stacked fan, tap to expand
     expanded  → horizontal scroll row, ✕ sits ABOVE the row
                 (not inside it, so it never overlaps cards)

   DESKTOP:
     default   → stacked fan
     hover     → spread side by side
══════════════════════════════════════════════════════════════ */
const HomeIdeaCard = ({ ideas = [], token, formatDate, onDeleted }) => {
  const [hovered,  setHovered]  = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
const [scrollLeft, setScrollLeft] = useState(0);
const scrollRef = useRef(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const count   = ideas.length;
  const spreadW = count * CARD_W + (count - 1) * CARD_GAP;

  /* ── MOBILE EXPANDED ── */
  if (isMobile && expanded) {
    return (
      /*
        Outer wrapper:
        position:relative so the ✕ button anchors to THIS box,
        NOT to a card inside the scroll row. This is the overlap fix.
        The ✕ sits at top-right of the wrapper, completely outside
        the scrollable area.
      */
      <div style={{ position:"relative", width:"100%" }}>

        {/* ✕ — anchored to outer wrapper, above the scroll row */}
        <button
          onClick={() => setExpanded(false)}
          style={{
            position: "absolute",
            top: -16,               // sits just above the scroll row
            right: 12,
            zIndex: 50,
            background: "rgba(20,20,24,0.9)",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "#e5e7eb",
            borderRadius: "50%",
            width: 30, height: 30,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15, cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background="rgba(239,68,68,0.25)"; }}
          onMouseLeave={e => { e.currentTarget.style.background="rgba(20,20,24,0.9)"; }}
        >
          ✕
        </button>

        {/* Scroll row — cards are position:relative, flex children */}
        <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: CARD_GAP,
          overflowX: "auto",
          overflowY: "visible",
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x mandatory",
          padding: "18px 20px 14px",   // top padding gives room for ✕ button
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onScroll={(e) => setScrollLeft(e.target.scrollLeft)}  // ADD THIS
  ref={scrollRef}  // ADD THIS (add const scrollRef = useRef(null); at top)
   >
          {ideas.map(idea => (
            <MobileScrollCard
              key={idea.id}
              idea={idea}
              formatDate={formatDate}
            />
          ))}
        </div>

        {/* Scroll indicator dots */}
{/* Scroll indicator dots */}
{count > 1 && (
  <div style={{ display:"flex", justifyContent:"center", gap:5, marginTop:8 }}>
    {ideas.map((_, i) => {
      const activeIndex = Math.round(scrollLeft / (CARD_W + CARD_GAP));
      const active = i === activeIndex;

      return (
        <div
          key={i}
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: active ? "#26F2D0" : "rgba(255,255,255,0.2)",
            transition: "background 0.2s ease",
          }}
        />
      );
    })}
  </div>
)}
      </div>
    );
  }

  /* ── MOBILE STACKED (default) ── */
  if (isMobile) {
    return (
      <div
        onClick={() => setExpanded(true)}
        style={{
          position: "relative",
          width: CARD_W + 40, height: 260,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", margin: "0 auto",
        }}
      >
        {/* tap hint */}
        <div style={{
          position:"absolute", bottom:4, left:"50%",
          transform:"translateX(-50%)",
          fontSize:9, color:"rgba(255,255,255,0.25)",
          letterSpacing:"0.06em", textTransform:"uppercase",
          whiteSpace:"nowrap", pointerEvents:"none",
        }}>
          tap to explore
        </div>

        {ideas.map((idea, i) => {
          const slot = STACK_TRANSFORMS[
            Math.round((i / Math.max(count - 1, 1)) * (STACK_TRANSFORMS.length - 1))
          ] || STACK_TRANSFORMS[0];

          return (
            <GlassIdeaCard
              key={idea.id}
              idea={idea}
              formatDate={formatDate}
              style={{
                transform: `translateX(${slot.x}px) translateY(${slot.y}px) rotate(${slot.rotate}deg)`,
                zIndex: slot.z,
              }}
            />
          );
        })}
      </div>
    );
  }

  /* ── DESKTOP — stack → hover spread (unchanged) ── */
  return (
    <div
      style={{
        position: "relative",
        width: spreadW, height: 260,
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 60px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {ideas.map((idea, i) => {
        const spreadX      = i * (CARD_W + CARD_GAP) - (spreadW - CARD_W) / 2;
        const spreadTransform = `translateX(${spreadX}px) rotate(0deg)`;
        const slot = STACK_TRANSFORMS[
          Math.round((i / Math.max(count - 1, 1)) * (STACK_TRANSFORMS.length - 1))
        ] || STACK_TRANSFORMS[0];
        const stackTransform  = `translateX(${slot.x}px) translateY(${slot.y}px) rotate(${slot.rotate}deg)`;

        return (
          <GlassIdeaCard
            key={idea.id}
            idea={idea}
            formatDate={formatDate}
            style={{
              transform: hovered ? spreadTransform : stackTransform,
              zIndex:    hovered ? i + 1 : slot.z,
            }}
          />
        );
      })}
    </div>
  );
};

export default HomeIdeaCard;


