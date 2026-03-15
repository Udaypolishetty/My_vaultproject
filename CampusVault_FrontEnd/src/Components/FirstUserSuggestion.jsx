import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const CARDS = [
  {
    emoji: "💡",
    title: "Share an Idea",
    desc: "Post ideas that improve campus life. Get likes, get noticed, get implemented.",
    cta: "Post Idea →",
    tab: "ideas",
    accent: "#26F2D0",
    glow: "rgba(38,242,208,0.35)",
    dark: "rgba(38,242,208,0.08)",
  },
  {
    emoji: "🏛️",
    title: "Join a Club",
    desc: "Find your people. Tech, culture, sports — your tribe is waiting.",
    cta: "Explore Clubs →",
    tab: "clubs",
    accent: "#a78bfa",
    glow: "rgba(167,139,250,0.35)",
    dark: "rgba(167,139,250,0.08)",
  },
  {
    emoji: "📢",
    title: "Buzz the Campus",
    desc: "Lost something? Found an opportunity? Start a conversation.",
    cta: "Start Buzzing →",
    tab: "buzz",
    accent: "#fb923c",
    glow: "rgba(251,146,60,0.35)",
    dark: "rgba(251,146,60,0.08)",
  },
];

export default function FirstUserSuggestion({ onDismiss, onTabSelect }) {
  const [phase, setPhase] = useState("enter");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeCard, setActiveCard] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const overlayRef = useRef(null);
  const cycleRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => setPhase("idle"));

    cycleRef.current = setInterval(() => {
      setActiveCard(prev => (prev + 1) % CARDS.length);
    }, 2500);

    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(cycleRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!overlayRef.current || isMobile) return;
    const rect = overlayRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  const handleAction = (tab) => {
    clearInterval(cycleRef.current);
    setPhase("exit");
    setTimeout(() => {
      onDismiss();
      onTabSelect(tab);
    }, 450);
  };

  const handleDismiss = () => {
    clearInterval(cycleRef.current);
    setPhase("exit");
    setTimeout(onDismiss, 450);
  };

  const card = CARDS[hoveredCard ?? activeCard];

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 99999,
    display: "flex",
    alignItems: isMobile ? "flex-end" : "center",
    justifyContent: "center",
    padding: isMobile ? "0" : "24px",
    transition: "opacity 0.45s cubic-bezier(0.4,0,0.2,1)",
    opacity: phase === "idle" ? 1 : 0,
    background: phase === "idle" ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0)",
    backdropFilter: phase === "idle" ? "blur(8px)" : "blur(0px)",
    WebkitBackdropFilter: phase === "idle" ? "blur(8px)" : "blur(0px)",
  };

  const panelTransition = {
    transition: "transform 0.15s ease-out, opacity 0.45s ease",
    opacity: phase === "idle" ? 1 : 0,
  };

  // mobile slides up from bottom, desktop has 3D tilt
  const panelTransform = isMobile
    ? `translateY(${phase === "idle" ? "0" : "60px"})`
    : `perspective(1200px) rotateX(${mousePos.y * -2}deg) rotateY(${mousePos.x * 2}deg) ${phase === "idle" ? "" : "scale(0.96)"}`;

  return createPortal(
    <div style={overlayStyle} onMouseMove={handleMouseMove} ref={overlayRef}
      onClick={(e) => { if (e.target === e.currentTarget) handleDismiss(); }}>

      <div style={{
        width: "100%",
        maxWidth: isMobile ? "100%" : "760px",
        position: "relative",
        ...panelTransition,
        transform: panelTransform,
      }}>
        {/* Main panel */}
        <div style={{
          background: "linear-gradient(135deg, #141414 0%, #0d0d0d 100%)",
          border: `1px solid ${card.accent}40`,
          borderRadius: isMobile ? "28px 28px 0 0" : "28px",
          overflow: "hidden",
          boxShadow: isMobile
            ? `0 -20px 60px rgba(0,0,0,0.8), 0 0 40px ${card.glow}`
            : `0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05), 0 0 60px ${card.glow}`,
          transition: "border-color 0.5s ease, box-shadow 0.5s ease",
        }}>

          {/* Accent line */}
          <div style={{
            height: "3px",
            background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
            transition: "background 0.5s ease",
          }} />

          {/* Glow blob */}
          <div style={{
            position: "absolute", top: "-40px", left: "50%",
            transform: "translateX(-50%)",
            width: "300px", height: "200px",
            background: card.dark,
            borderRadius: "50%", filter: "blur(40px)",
            transition: "background 0.5s ease", pointerEvents: "none",
          }} />

          <div style={{ padding: isMobile ? "24px 20px 32px" : "40px 40px 32px", position: "relative" }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "8px" }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  background: `${card.accent}18`, border: `1px solid ${card.accent}35`,
                  borderRadius: "20px", padding: "4px 12px", marginBottom: "12px",
                  transition: "all 0.5s ease",
                }}>
                  <div style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: card.accent, animation: "pulse 2s infinite",
                    transition: "background 0.5s ease",
                  }} />
                  <span style={{
                    fontSize: "11px", fontWeight: 600, color: card.accent,
                    letterSpacing: "0.05em", transition: "color 0.5s ease",
                  }}>NEW TO CAMPUS VAULT</span>
                </div>
                <h2 style={{
                  color: "white", fontSize: isMobile ? "20px" : "26px",
                  fontWeight: 700, margin: 0, lineHeight: 1.2,
                }}>
                  Welcome. Here's where to start 👋
                </h2>
                <p style={{ color: "#6b7280", fontSize: "13px", marginTop: "6px" }}>
                  Pick one — you can explore everything later.
                </p>
              </div>
              <button onClick={handleDismiss} style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "50%", width: "34px", height: "34px",
                color: "#6b7280", cursor: "pointer", fontSize: "15px",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s", flexShrink: 0, marginLeft: "12px",
              }}>✕</button>
            </div>

            {/* Cards — 1 col on mobile, 3 on desktop */}
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: isMobile ? "10px" : "16px",
              marginTop: isMobile ? "20px" : "28px",
            }}>
              {CARDS.map((c, i) => {
                const isActive = hoveredCard === i || (hoveredCard === null && activeCard === i);
                return (
                  <button key={i}
                    onClick={() => handleAction(c.tab)}
                    onMouseEnter={() => { setHoveredCard(i); setActiveCard(i); clearInterval(cycleRef.current); }}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${c.dark} 0%, rgba(255,255,255,0.02) 100%)`
                        : "rgba(255,255,255,0.02)",
                      border: `1px solid ${isActive ? c.accent + "60" : "rgba(255,255,255,0.08)"}`,
                      borderRadius: "16px",
                      padding: isMobile ? "16px" : "24px 20px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                      transform: isActive && !isMobile ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
                      boxShadow: isActive ? `0 20px 40px ${c.glow}, 0 0 0 1px ${c.accent}20` : "none",
                      position: "relative", overflow: "hidden",
                      // mobile: horizontal layout
                      display: isMobile ? "flex" : "block",
                      alignItems: isMobile ? "center" : "flex-start",
                      gap: isMobile ? "14px" : "0",
                    }}
                  >
                    {isActive && (
                      <div style={{
                        position: "absolute", top: 0, left: "-100%",
                        width: "60%", height: "100%",
                        background: `linear-gradient(90deg, transparent, ${c.accent}12, transparent)`,
                        animation: "shimmer 1.5s infinite", pointerEvents: "none",
                      }} />
                    )}

                    <div style={{
                      fontSize: isMobile ? "24px" : "32px",
                      marginBottom: isMobile ? "0" : "12px",
                      flexShrink: 0,
                    }}>{c.emoji}</div>

                    <div style={{ flex: isMobile ? 1 : "auto" }}>
                      <div style={{
                        fontSize: isMobile ? "14px" : "15px", fontWeight: 700,
                        color: isActive ? "white" : "#d1d5db",
                        marginBottom: isMobile ? "2px" : "8px",
                        transition: "color 0.3s",
                      }}>{c.title}</div>
                      {!isMobile && (
                        <div style={{
                          fontSize: "12px", color: "#6b7280",
                          lineHeight: 1.6, marginBottom: "16px",
                        }}>{c.desc}</div>
                      )}
                    </div>

                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: "4px",
                      fontSize: "11px", fontWeight: 600,
                      color: isActive ? c.accent : "#4b5563",
                      background: isActive ? `${c.accent}15` : "rgba(255,255,255,0.03)",
                      border: `1px solid ${isActive ? c.accent + "40" : "rgba(255,255,255,0.08)"}`,
                      borderRadius: "20px", padding: "5px 10px",
                      transition: "all 0.3s", flexShrink: 0,
                      marginTop: isMobile ? "0" : "0",
                    }}>{c.cta}</div>
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginTop: "20px", paddingTop: "16px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {CARDS.map((c, i) => (
                  <div key={i} onClick={() => setActiveCard(i)} style={{
                    height: "6px",
                    width: activeCard === i ? "20px" : "6px",
                    borderRadius: "3px",
                    background: activeCard === i ? CARDS[i].accent : "rgba(255,255,255,0.15)",
                    cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                  }} />
                ))}
              </div>
              <button onClick={handleDismiss} style={{
                background: "transparent", border: "none",
                color: "#4b5563", cursor: "pointer", fontSize: "13px",
                padding: "8px 16px", borderRadius: "10px", transition: "all 0.2s",
              }}>Skip for now ✓</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 200%; }
        }
      `}</style>
    </div>,
    document.body
  );
}