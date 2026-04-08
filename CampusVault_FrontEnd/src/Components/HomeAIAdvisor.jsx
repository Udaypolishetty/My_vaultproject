import { API_BASE } from "../config/api";
import { useEffect, useState } from "react";
import {
  Sparkles, X, BrainCircuit, ShieldCheck,
  Clock3, Hourglass, RefreshCw, AlertTriangle,
  GraduationCap, Flame, Zap, ChevronRight,
  TrendingUp, CheckCircle2, Lock, Star,
  Lightbulb, Users, Activity, Target,
  ThumbsUp, Award, Rocket, BookOpen,
} from "lucide-react";

/* ─── Parse backend response ─────────────────────────── */
function parseResponse(raw) {
  if (!raw) return null;
  const lines = raw.split("\n").map(l => l.trim()).filter(Boolean);
  let greeting = "", vibeText = "", vibeScore = null;
  let crushing = [], levelUp = [], nextMoves = [], section = "";

  for (const line of lines) {
    const low = line.toLowerCase();
    if (low.startsWith("hey ") || low.startsWith("hi ")) { greeting = line; continue; }
    if (low.includes("vibe check"))  { section = "vibe";  continue; }
    if (low.includes("crushing"))    { section = "crush"; continue; }
    if (low.includes("level up"))    { section = "level"; continue; }
    if (low.includes("next moves"))  { section = "next";  continue; }
    if (section === "vibe" && low.startsWith("score:")) {
      const match = line.match(/(\d+)\s*\/\s*10/);
      if (match) vibeScore = parseInt(match[1]);
      continue;
    }
    const clean = line.replace(/^[-•*]\s*/, "").trim();
    if (!clean) continue;
    if (section === "vibe")  { vibeText += (vibeText ? " " : "") + clean; continue; }
    if (section === "crush") { crushing.push(clean);  continue; }
    if (section === "level") { levelUp.push(clean);   continue; }
    if (section === "next")  { nextMoves.push(clean); continue; }
  }
  return { greeting, vibeText, vibeScore, crushing, levelUp, nextMoves, raw };
}

/* ─── Vibe Score Ring ────────────────────────────────── */
function VibeRing({ score }) {
  const r    = 34;
  const circ = 2 * Math.PI * r;
  const pct  = score != null ? score / 10 : 0;
  const dash = pct * circ;
  const color = score >= 8 ? "#26F2D0" : score >= 5 ? "#F4A261" : "#ef4444";

  // ✅ Lucide icons instead of emoji labels
  const LabelIcon = score >= 8 ? Flame : score >= 6 ? ThumbsUp : score >= 4 ? Target : Rocket;
  const labelText = score >= 8 ? "Goated" : score >= 6 ? "Solid" : score >= 4 ? "Mid — fix it" : "Just getting started";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={r}
          fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7" />
        <circle cx="44" cy="44" r={r}
          fill="none" stroke={color} strokeWidth="7" strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          strokeDashoffset={circ / 4}
          style={{ transition: "stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1)" }}
        />
        <text x="44" y="44" textAnchor="middle" dominantBaseline="central"
          fill={color} fontSize="18" fontWeight="800" fontFamily="inherit">
          {score ?? "—"}
        </text>
        <text x="44" y="59" textAnchor="middle" dominantBaseline="central"
          fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="inherit">
          /10
        </text>
      </svg>
      <span style={{ display: "flex", alignItems: "center", gap: 4,
        fontSize: 11, color, fontWeight: 700, letterSpacing: "0.04em" }}>
        <LabelIcon size={11} />
        {labelText}
      </span>
    </div>
  );
}

/* ─── Section Card ───────────────────────────────────── */
function SectionCard({ Icon, title, items, accent, delay = 0 }) {
  return (
    <div style={{
      background:   `linear-gradient(135deg, ${accent}10 0%, rgba(255,255,255,0.02) 100%)`,
      border:       `1px solid ${accent}25`,
      borderRadius: 20,
      padding:      "18px 16px",
      animation:    `cardIn 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms both`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 12, flexShrink: 0,
          background: `${accent}18`, border: `1px solid ${accent}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={18} style={{ color: accent }} />
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "#f9fafb", letterSpacing: "0.01em" }}>
            {title}
          </p>
          <p style={{ margin: 0, fontSize: 10, color: "rgba(255,255,255,0.3)" }}>AI generated</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items?.length > 0 ? items.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 10,
            background: "rgba(0,0,0,0.25)", borderRadius: 12,
            padding: "10px 12px", border: "1px solid rgba(255,255,255,0.05)",
            animation: `itemIn 0.4s ease ${delay + i * 80}ms both`,
          }}>
            <CheckCircle2 size={14} style={{
              flexShrink: 0, marginTop: 2, color: accent,
            }} />
            <p style={{ margin: 0, fontSize: 12.5, color: "#d1d5db", lineHeight: 1.65 }}>
              {item}
            </p>
          </div>
        )) : (
          <div style={{
            borderRadius: 12, border: "1px dashed rgba(255,255,255,0.1)",
            padding: "12px", fontSize: 12, color: "rgba(255,255,255,0.3)", textAlign: "center",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}>
            <Activity size={13} style={{ color: "rgba(255,255,255,0.2)" }} />
            Nothing here yet — get active!
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Countdown ──────────────────────────────────────── */
function useCountdown(targetMs) {
  const [remaining, setRemaining] = useState(0);
  useEffect(() => {
    if (!targetMs) return;
    const tick = () => setRemaining(Math.max(0, targetMs - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetMs]);
  const m = Math.floor(remaining / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  return remaining > 0 ? `${m}m ${s}s` : null;
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
const HomeAIAdvisor = ({ token }) => {
  const [loading,      setLoading]      = useState(false);
  const [result,       setResult]       = useState(null);
  const [errorMsg,     setErrorMsg]     = useState("");
  const [open,         setOpen]         = useState(false);
  const [rateLimitAt,  setRateLimitAt]  = useState(null);

  const countdown = useCountdown(rateLimitAt);

  const fetch5Min = async () => {
    if (!token) {
      setErrorMsg("Log in first to unlock your AI insights");
      return;
    }
    setLoading(true);
    setResult(null);
    setErrorMsg("");
    try {
      const res  = await fetch(`${API_BASE}/api/ai/advisor`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.text();
      if (!res.ok) {
        if (data.startsWith("RATE_LIMIT:")) {
          setRateLimitAt(Date.now() + 300_000);
          setErrorMsg("RATE_LIMIT");
        } else {
          setErrorMsg(data || "Something went wrong. Try again.");
        }
        return;
      }
      setResult(parseResponse(data));
    } catch {
      setErrorMsg("Can't reach the server right now. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const isRateLimit = errorMsg === "RATE_LIMIT";

  return (
    <>
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes itemIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulseRing {
          0%,100% { box-shadow: 0 0 0 0   rgba(38,242,208,0.4); }
          50%     { box-shadow: 0 0 0 8px rgba(38,242,208,0); }
        }
        @keyframes shimmer {
          from { background-position: -200% 0; }
          to   { background-position:  200% 0; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .ai-btn-pulse { animation: pulseRing 2.5s ease-in-out infinite; }
        .skeleton {
          background: linear-gradient(90deg,
            rgba(255,255,255,0.05) 25%,
            rgba(255,255,255,0.12) 50%,
            rgba(255,255,255,0.05) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s ease-in-out infinite;
          border-radius: 10px;
        }
      `}</style>

      {/* ── Trigger button ── */}
      <button
        onClick={() => setOpen(true)}
        className="ai-btn-pulse"
        style={{
          position: "relative", overflow: "hidden", borderRadius: 999,
          border: "1px solid rgba(38,242,208,0.35)",
          background: "rgba(38,242,208,0.06)", backdropFilter: "blur(12px)",
          padding: "12px 24px", fontSize: 14, fontWeight: 700,
          color: "#fff", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 8,
          transition: "all 0.25s ease", minHeight: 48,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background  = "rgba(38,242,208,0.14)";
          e.currentTarget.style.borderColor = "rgba(38,242,208,0.6)";
          e.currentTarget.style.transform   = "scale(1.03)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background  = "rgba(38,242,208,0.06)";
          e.currentTarget.style.borderColor = "rgba(38,242,208,0.35)";
          e.currentTarget.style.transform   = "scale(1)";
        }}
      >
        <Sparkles size={16} style={{ color: "#26F2D0" }} />
        AI Insights
        <span style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg,transparent,rgba(38,242,208,0.08),transparent)",
          pointerEvents: "none",
        }} />
      </button>

      {/* ── Modal ── */}
      {open && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "80px 16px 16px",
        }}>
          {/* backdrop */}
          <div onClick={() => setOpen(false)} style={{
            position: "absolute", inset: 0,
            background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)",
          }} />

          {/* sheet */}
          <div role="dialog" aria-modal="true" style={{
            position: "relative", zIndex: 1,
            width: "min(100vw - 40px, 740px)", maxWidth: "90vw",
            margin: "0 auto", maxHeight: "88vh",
            display: "flex", flexDirection: "column",
            borderRadius: 24, background: "#0e0f11",
            border: "1px solid rgba(255,255,255,0.1)",
            overflow: "hidden",
            animation: "cardIn 0.4s cubic-bezier(0.22,1,0.36,1)",
          }}>
            {/* ambient glows */}
            <div style={{
              position: "absolute", top: -60, left: 20,
              width: 180, height: 180, borderRadius: "50%",
              background: "rgba(38,242,208,0.08)", filter: "blur(50px)",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", top: 30, right: 20,
              width: 140, height: 140, borderRadius: "50%",
              background: "rgba(93,173,226,0.08)", filter: "blur(50px)",
              pointerEvents: "none",
            }} />

            {/* drag handle */}
            <div style={{
              display: "flex", justifyContent: "center",
              paddingTop: 10, paddingBottom: 4, flexShrink: 0,
            }}>
              <div style={{
                width: 40, height: 4, borderRadius: 999,
                background: "rgba(255,255,255,0.15)",
              }} />
            </div>

            {/* ── HEADER ── */}
            <div style={{
              padding: "12px 20px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              flexShrink: 0,
              display: "flex", alignItems: "flex-start",
              justifyContent: "space-between", gap: 12,
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {/* pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  <span style={{
                    display: "flex", alignItems: "center", gap: 4,
                    fontSize: 10, fontWeight: 700,
                    padding: "3px 10px", borderRadius: 999,
                    background: "rgba(38,242,208,0.1)",
                    border: "1px solid rgba(38,242,208,0.2)", color: "#89f8e7",
                  }}>
                    <BrainCircuit size={11} /> Personalized
                  </span>
                  <span style={{
                    display: "flex", alignItems: "center", gap: 4,
                    fontSize: 10, fontWeight: 700,
                    padding: "3px 10px", borderRadius: 999,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)",
                  }}>
                    <ShieldCheck size={11} /> Private
                  </span>
                  <span style={{
                    display: "flex", alignItems: "center", gap: 4,
                    fontSize: 10, fontWeight: 700,
                    padding: "3px 10px", borderRadius: 999,
                    background: "rgba(244,162,97,0.1)",
                    border: "1px solid rgba(244,162,97,0.25)", color: "#f4a261",
                  }}>
                    <Clock3 size={11} /> 5 min cooldown
                  </span>
                </div>

                {/* title */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 14, flexShrink: 0,
                    background: "linear-gradient(135deg,rgba(38,242,208,0.2),rgba(93,173,226,0.2))",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Sparkles size={20} style={{ color: "#26F2D0" }} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#f9fafb",
                      display: "flex", alignItems: "center", gap: 8 }}>
                      Campus AI
                      <Star size={16} style={{ color: "#F4A261" }} />
                    </p>
                    <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                      real talk · campus-only insights
                    </p>
                  </div>
                </div>
              </div>

              {/* close */}
              <button onClick={() => setOpen(false)} style={{
                width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.5)", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
              >
                <X size={16} />
              </button>
            </div>

            {/* ── BODY ── */}
            <div style={{
              flex: 1, overflowY: "auto", overflowX: "hidden",
              padding: "16px 16px",
              display: "flex", flexDirection: "column", gap: 14,
            }}>

              {/* idle state */}
              {!result && !errorMsg && !loading && (
                <div style={{
                  borderRadius: 20,
                  background: "linear-gradient(135deg,rgba(38,242,208,0.06),rgba(93,173,226,0.04))",
                  border: "1px solid rgba(38,242,208,0.15)",
                  padding: "20px 18px",
                }}>
                  <p style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 800, color: "#f9fafb",
                    display: "flex", alignItems: "center", gap: 8 }}>
                    <Target size={18} style={{ color: "#26F2D0" }} />
                    Get your campus vibe check
                  </p>
                  <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                    AI will analyse your{" "}
                    <span style={{ color: "#26F2D0", fontWeight: 700 }}>ideas</span>,{" "}
                    <span style={{ color: "#5DADE2", fontWeight: 700 }}>clubs</span>, and{" "}
                    <span style={{ color: "#F4A261", fontWeight: 700 }}>activity</span>{" "}
                    to drop a personalised report. Hits different every time.
                  </p>
                  <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {[
                      { Icon: Flame,   label: "Vibe Score",         color: "#26F2D0" },
                      { Icon: Lightbulb, label: "What you're crushing", color: "#5DADE2" },
                      { Icon: Zap,     label: "Next moves",          color: "#F4A261" },
                    ].map(({ Icon: I, label, color }) => (
                      <span key={label} style={{
                        display: "flex", alignItems: "center", gap: 5,
                        fontSize: 11, fontWeight: 600,
                        padding: "4px 10px", borderRadius: 999,
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.5)",
                      }}>
                        <I size={11} style={{ color }} />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* loading skeletons */}
              {loading && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "14px 16px", borderRadius: 16,
                    background: "rgba(38,242,208,0.05)",
                    border: "1px solid rgba(38,242,208,0.12)",
                  }}>
                    <RefreshCw size={18} style={{ color: "#26F2D0", animation: "spin 1s linear infinite" }} />
                    <div>
                      <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 700, color: "#f9fafb" }}>
                        Cooking your vibe check...
                      </p>
                      <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                        AI is reading your campus energy
                      </p>
                    </div>
                  </div>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      borderRadius: 20, padding: 16,
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}>
                      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                        <div className="skeleton" style={{ width: 38, height: 38, borderRadius: 12, flexShrink: 0 }} />
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                          <div className="skeleton" style={{ height: 12, width: "50%" }} />
                          <div className="skeleton" style={{ height: 10, width: "30%" }} />
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                        {[1, 2].map(j => <div key={j} className="skeleton" style={{ height: 36 }} />)}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* rate limit */}
              {isRateLimit && !loading && (
                <div style={{
                  borderRadius: 20, padding: "20px 18px",
                  background: "linear-gradient(135deg,rgba(244,162,97,0.08),rgba(239,68,68,0.05))",
                  border: "1px solid rgba(244,162,97,0.2)",
                  display: "flex", alignItems: "flex-start", gap: 14,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                    background: "rgba(244,162,97,0.12)",
                    border: "1px solid rgba(244,162,97,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Hourglass size={20} style={{ color: "#f4a261" }} />
                  </div>
                  <div>
                    <p style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 800, color: "#f9fafb",
                      display: "flex", alignItems: "center", gap: 7 }}>
                      <Clock3 size={15} style={{ color: "#f4a261" }} />
                      Chill for a sec
                    </p>
                    <p style={{ margin: "0 0 10px", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                      AI advice is capped to once every 5 minutes — keeps it meaningful, not spammy.
                    </p>
                    {countdown && (
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        fontSize: 12, fontWeight: 700,
                        padding: "5px 12px", borderRadius: 999,
                        background: "rgba(244,162,97,0.1)",
                        border: "1px solid rgba(244,162,97,0.25)",
                        color: "#f4a261",
                      }}>
                        <Clock3 size={12} /> Try again in {countdown}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* generic error */}
              {errorMsg && !isRateLimit && !loading && (
                <div style={{
                  borderRadius: 20, padding: "18px 16px",
                  background: "rgba(239,68,68,0.07)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  display: "flex", alignItems: "flex-start", gap: 12,
                }}>
                  <AlertTriangle size={18} style={{ color: "#f87171", flexShrink: 0, marginTop: 2 }} />
                  <p style={{ margin: 0, fontSize: 13, color: "#fca5a5", lineHeight: 1.6 }}>{errorMsg}</p>
                </div>
              )}

              {/* ── RESULT ── */}
              {result && !loading && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                  {/* greeting + vibe ring */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
                    borderRadius: 20, padding: "18px 16px",
                    background: "linear-gradient(135deg,rgba(38,242,208,0.08),rgba(93,173,226,0.05))",
                    border: "1px solid rgba(38,242,208,0.18)",
                    animation: "cardIn 0.4s cubic-bezier(0.22,1,0.36,1)",
                  }}>
                    <VibeRing score={result.vibeScore} />
                    <div style={{ flex: 1, minWidth: 180 }}>
                      <p style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 900, color: "#f9fafb",
                        display: "flex", alignItems: "center", gap: 8 }}>
                        <GraduationCap size={18} style={{ color: "#26F2D0" }} />
                        {result.greeting || "Hey there"}
                      </p>
                      {result.vibeText && (
                        <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>
                          {result.vibeText}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* three section cards */}
                  <SectionCard
                    Icon={Flame}
                    title="What You're Crushing"
                    items={result.crushing}
                    accent="#26F2D0"
                    delay={0}
                  />
                  <SectionCard
                    Icon={TrendingUp}
                    title="Room to Level Up"
                    items={result.levelUp}
                    accent="#5DADE2"
                    delay={80}
                  />
                  <SectionCard
                    Icon={Zap}
                    title="Your Next Moves"
                    items={result.nextMoves}
                    accent="#F4A261"
                    delay={160}
                  />

                  {/* disclaimer */}
                  <p style={{
                    textAlign: "center", fontSize: 10,
                    color: "rgba(255,255,255,0.2)", lineHeight: 1.6,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                  }}>
                    <Lock size={10} style={{ color: "rgba(255,255,255,0.2)" }} />
                    Based only on your campus ideas & clubs · Not stored anywhere
                  </p>
                </div>
              )}
            </div>

            {/* ── FOOTER ── */}
            <div style={{
              padding: "14px 16px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.01)",
              flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: 10, flexWrap: "wrap",
            }}>
              <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.28)",
                display: "flex", alignItems: "center", gap: 5 }}>
                {countdown
                  ? <><Clock3 size={11} /> Next insight in {countdown}</>
                  : <><BookOpen size={11} /> AI reads your ideas + clubs only</>
                }
              </p>

              <button
                onClick={fetch5Min}
                disabled={loading || !!countdown}
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "11px 22px", borderRadius: 14,
                  fontSize: 13, fontWeight: 800,
                  cursor: loading || countdown ? "not-allowed" : "pointer",
                  opacity: loading || countdown ? 0.45 : 1,
                  background: "linear-gradient(135deg,#26F2D0,#5DADE2)",
                  color: "#041310", border: "none", transition: "all 0.2s",
                  boxShadow: "0 8px 24px rgba(38,242,208,0.25)",
                  minHeight: 46, whiteSpace: "nowrap",
                }}
                onMouseEnter={e => { if (!loading && !countdown) e.currentTarget.style.filter = "brightness(1.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.filter = "none"; }}
              >
                {loading
                  ? <><RefreshCw size={14} style={{ animation: "spin 1s linear infinite" }} /> Analyzing...</>
                  : result
                    ? <><RefreshCw size={14} /> Refresh</>
                    : <><Sparkles size={14} /> Get My Vibe Check</>
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeAIAdvisor;