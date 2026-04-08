

import { useEffect, useState } from "react";
import { GraduationCap } from "lucide-react";

const LOGO_SRC = "/cv-logo.png";

/* ─── timing (ms) ─── */
const T = {
  logoIn:    150,
  logoRise:  1700,
  textIn:    2100,
  capsIn:    3000,
  tagline:   3700,
  hideShell: 5600,
  done:      6600,
};

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState("idle");
  const [hide,  setHide]  = useState(false);

  useEffect(() => {
    const ids = [
      setTimeout(() => setPhase("logoIn"),   T.logoIn),
      setTimeout(() => setPhase("logoRise"), T.logoRise),
      setTimeout(() => setPhase("textIn"),   T.textIn),
      setTimeout(() => setPhase("capsIn"),   T.capsIn),
      setTimeout(() => setPhase("tagIn"),    T.tagline),
      setTimeout(() => setHide(true),        T.hideShell),
      setTimeout(() => onDone?.(),           T.done),
    ];
    return () => ids.forEach(clearTimeout);
  }, [onDone]);

  const logoActive  = phase !== "idle";
  const logoRisen   = ["logoRise","textIn","capsIn","tagIn"].includes(phase);
  const textVisible = ["textIn","capsIn","tagIn"].includes(phase);
  const capsVisible = ["capsIn","tagIn"].includes(phase);
  const tagVisible  = phase === "tagIn";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Eagle+Lake&family=Sora:wght@400;600&display=swap');

        /* ── shell ── */
        .spl {
          position: fixed; inset: 0;
          background: #040406;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          z-index: 99999; overflow: hidden;
          opacity: 1;
          transition: opacity 1.1s cubic-bezier(0.4,0,1,1);
        }
        .spl.out { opacity: 0; pointer-events: none; }

        /* ── ambient ── */
        .spl-orb {
          position: absolute; border-radius: 50%;
          pointer-events: none; filter: blur(130px);
        }
        .spl-orb1 {
          width: 440px; height: 440px;
          background: #26F2D0; opacity: 0.04;
          top: -110px; left: 4%;
          animation: orbD 14s ease-in-out infinite;
        }
        .spl-orb2 {
          width: 340px; height: 340px;
          background: #7028dc; opacity: 0.05;
          bottom: -90px; right: 4%;
          animation: orbD 18s ease-in-out infinite reverse;
        }
        @keyframes orbD {
          0%,100% { transform: translate(0,0); }
          50%     { transform: translate(20px,-24px); }
        }
        .spl-grid {
          position: absolute; inset: 0; opacity: 0.014;
          background-image: radial-gradient(circle,#fff 1px,transparent 1px);
          background-size: 38px 38px; pointer-events: none;
        }

        /* ── logo — longer, smoother transition ── */
        .spl-logo {
          position: relative; z-index: 4;
          width: clamp(160px, 36vw, 240px);
          height: auto;
          opacity: 0;
          transform: translateY(-160px) scale(0.72);
          filter:
            drop-shadow(0 0 32px rgba(38,242,208,0.32))
            drop-shadow(0 0 80px rgba(38,242,208,0.12));
          transition:
            opacity   1.4s cubic-bezier(0.22,1,0.36,1),
            transform 1.6s cubic-bezier(0.22,1,0.36,1);
        }
        .spl-logo.in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .spl-logo.risen {
          opacity: 1;
          transform: translateY(-22px) scale(1);
          transition:
            transform 1.1s cubic-bezier(0.4,0,0.2,1);
        }

        /* ── name row ── */
        .spl-row {
          display: flex; align-items: flex-end;
          gap: 0; line-height: 1;
          /* Eagle Lake is a display serif — use it for the whole name */
          font-family: 'Eagle Lake', serif;
          font-size: clamp(46px, 10.5vw, 80px);
          letter-spacing: -0.01em;
          line-height: 1;
        }

        /* plain letters — off-white */
        .spl-plain {
          color: rgba(255,255,255,0.82);
          display: inline-block;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .spl-plain.show { opacity: 1; transform: translateY(0); }

        /* ── M highlight (teal) ── */
        .spl-M {
          position: relative;
          display: inline-block;
          color: #26F2D0;
          text-shadow:
            0 0 18px rgba(38,242,208,0.55),
            0 0 48px rgba(38,242,208,0.18);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.65s ease 0.05s, transform 0.65s ease 0.05s;
        }
        .spl-M.show { opacity: 1; transform: translateY(0); }

        /* ── U highlight (purple) ── */
        .spl-U {
          position: relative;
          display: inline-block;
          color: #a06aff;
          text-shadow:
            0 0 18px rgba(160,106,255,0.55),
            0 0 48px rgba(160,106,255,0.18);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.65s ease 0.18s, transform 0.65s ease 0.18s;
        }
        .spl-U.show { opacity: 1; transform: translateY(0); }

        /* word gap */
        .spl-space {
          display: inline-block;
          width: 0.28em;
        }

        /* ── grad cap — sits right on the letter, nearly touching ── */
        .spl-cap {
          position: absolute;
          /* bottom of cap touches top of letter with ~2px gap */
          bottom: 102%;
          left: 50%;
          transform: translateX(-50%) translateY(-18px) scale(0.4) rotate(-14deg);
          transform-origin: 50% 100%;
          opacity: 0;
          filter: drop-shadow(0 3px 10px rgba(0,0,0,0.9));
          transition:
            transform 0.75s cubic-bezier(0.22,1,0.36,1),
            opacity   0.38s ease;
          pointer-events: none;
        }
        .spl-cap.on {
          opacity: 1;
          transform: translateX(-50%) translateY(0) scale(1) rotate(0deg);
        }
        /* cap for U — delayed slightly */
        .spl-cap.u-delay {
          transition-delay: 0.32s;
        }
        /* gentle float after landing */
        .spl-cap.bob {
          animation: capBob 3.2s ease-in-out infinite;
        }
        .spl-cap.bob.u-delay {
          animation-delay: 0.32s;
        }
        @keyframes capBob {
          0%,100% { transform: translateX(-50%) translateY(0)   rotate(0deg); }
          40%     { transform: translateX(-50%) translateY(-5px) rotate(1.8deg); }
          70%     { transform: translateX(-50%) translateY(-1px) rotate(-1.2deg); }
        }

        /* ── underline ── */
        .spl-line {
          height: 1.5px; width: 0%;
          background: linear-gradient(90deg,
            transparent,
            rgba(38,242,208,0.45),
            rgba(160,106,255,0.35),
            transparent);
          border-radius: 2px;
          margin-top: 10px;
          transition: width 1.0s cubic-bezier(0.4,0,0.2,1) 0.15s;
        }
        .spl-line.show { width: 100%; }

        /* ── tagline — plain text, no box ── */
        .spl-tagline {
          margin-top: 24px;
          display: flex; align-items: center; gap: 10px;
          opacity: 0; transform: translateY(8px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .spl-tagline.show { opacity: 1; transform: translateY(0); }

        .spl-tag-word {
          font-family: 'Sora', sans-serif;
          font-weight: 600;
          font-size: clamp(10px, 1.6vw, 12px);
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .spl-tag-teal   { color: rgba(38,242,208,0.7); }
        .spl-tag-purple { color: rgba(160,106,255,0.7); }
        .spl-tag-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: rgba(255,255,255,0.15); flex-shrink: 0;
        }

        /* ── progress bar ── */
        .spl-bar-wrap {
          width: clamp(160px, 40vw, 220px);
          height: 2px;
          background: rgba(255,255,255,0.07);
          border-radius: 2px;
          margin-top: 28px;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }
        .spl-bar-wrap.show { opacity: 1; }
        .spl-bar-fill {
          height: 100%; width: 0%;
          background: linear-gradient(90deg,
            #26F2D0 0%, #a06aff 55%, #26F2D0 100%);
          background-size: 200% 100%;
          border-radius: 2px;
          animation: barGrow 4.0s cubic-bezier(0.4,0,0.2,1) forwards,
                     barShine 1.8s linear infinite 0.6s;
        }
        @keyframes barGrow  { to { width: 100%; } }
        @keyframes barShine { to { background-position: -200% 0; } }

        @media (max-width: 480px) {
          .spl-logo { width: 52vw !important; }
          .spl-row  { font-size: clamp(38px, 11vw, 58px) !important; }
        }
      `}</style>

      <div className={`spl${hide ? " out" : ""}`}>
        <div className="spl-orb spl-orb1" />
        <div className="spl-orb spl-orb2" />
        <div className="spl-grid" />

        {/* ══ LOGO ══ */}
        <img
          className={`spl-logo${logoRisen ? " risen" : logoActive ? " in" : ""}`}
          src={LOGO_SRC}
          alt="Campus Vault"
          draggable={false}
        />

        {/* ══ BRAND BLOCK ══ */}
        <div style={{ position: "relative", zIndex: 4, display: "flex",
          flexDirection: "column", alignItems: "center", marginTop: 20 }}>

          {/* "Campus Vault" in Eagle Lake */}
          <div className="spl-row">

            {/* Ca */}
            <span className={`spl-plain${textVisible ? " show" : ""}`}
              style={{ transitionDelay: textVisible ? "0s" : "0s" }}>
              Ca
            </span>

            {/* M — teal highlight + cap */}
            <span className={`spl-M${textVisible ? " show" : ""}`}>
              {/* Teal graduation cap on M */}
              <span className={`spl-cap${capsVisible ? " on bob" : ""}`}>
                <GraduationCap
                  size={clamp(28, 32)}
                  strokeWidth={2}
                  color="#26F2D0"
                  style={{ display: "block" }}
                />
              </span>
              m
            </span>

            {/* pus */}
            <span className={`spl-plain${textVisible ? " show" : ""}`}
              style={{ transitionDelay: textVisible ? "0.08s" : "0s" }}>
              pus
            </span>

            {/* space */}
            <span className="spl-space" />

            {/* Va */}
            <span className={`spl-plain${textVisible ? " show" : ""}`}
              style={{ transitionDelay: textVisible ? "0.14s" : "0s" }}>
              Va
            </span>

            {/* U — purple highlight + cap */}
            <span className={`spl-U${textVisible ? " show" : ""}`}>
              {/* Purple graduation cap on U */}
              <span className={`spl-cap u-delay${capsVisible ? " on bob" : ""}`}>
                <GraduationCap
                  size={clamp(28, 32)}
                  strokeWidth={2}
                  color="#a06aff"
                  style={{ display: "block" }}
                />
              </span>
              u
            </span>

            {/* lt */}
            <span className={`spl-plain${textVisible ? " show" : ""}`}
              style={{ transitionDelay: textVisible ? "0.2s" : "0s" }}>
              lt
            </span>
          </div>

          {/* underline */}
          <div className={`spl-line${textVisible ? " show" : ""}`} />

          {/* tagline — no boxes, just plain coloured text */}
          <div className={`spl-tagline${tagVisible ? " show" : ""}`}>
            <span className="spl-tag-word spl-tag-teal">Share</span>
            <span className="spl-tag-dot" />
            <span className="spl-tag-word spl-tag-purple">Connect</span>
            <span className="spl-tag-dot" />
<span className="spl-tag-word" style={{ color: "#F5F527" }}>
  Collaborate
</span>          </div>

          {/* progress bar */}
          <div className={`spl-bar-wrap${logoActive ? " show" : ""}`}>
            <div className="spl-bar-fill" />
          </div>
        </div>
      </div>
    </>
  );
}

/* tiny helper so JSX doesn't error on clamp() in size prop */
function clamp(a, b) { return b; }