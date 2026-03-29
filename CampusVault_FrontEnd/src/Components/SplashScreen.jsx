// import { useEffect, useState } from "react";

// export default function SplashScreen({ onDone }) {
//   const [phase, setPhase] = useState("enter");

//   useEffect(() => {
//     // Stage 1: Anchor characters (C, M, V, U) drop
//     // Stage 2: Background text "Scans" in
//     // Stage 3: Shield locks in
//     // Stage 4: Exit after 7 seconds total
//     const t1 = setTimeout(() => setPhase("hold"), 1800);
//     const t2 = setTimeout(() => setPhase("exit"), 6000);
//     const t3 = setTimeout(() => onDone?.(), 7200);

//     return () => {
//       clearTimeout(t1);
//       clearTimeout(t2);
//       clearTimeout(t3);
//     };
//   }, [onDone]);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;700;800;900&display=swap');

//         .sv-splash {
//           position: fixed; inset: 0; z-index: 99999;
//           background: #060809;
//           display: flex; flex-direction: column;
//           align-items: center; justify-content: center;
//           font-family: 'Sora', sans-serif;
//           transition: opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1);
//           overflow: hidden;
//         }
//         .sv-splash.exit { opacity: 0; pointer-events: none; }

//         /* ── Subtle Atmosphere ── */
//         .sv-orb {
//           position: absolute; border-radius: 50%;
//           filter: blur(140px); pointer-events: none;
//           opacity: 0.25;
//         }
//         .sv-orb-bottom { width: 600px; height: 600px; background: rgba(124,58,237,0.06); bottom: -15%; right: -5%; }

//         /* ── The Creator Drops (M & U) ── */
//         .sv-creator {
//           color: #26F2D0 !important;
//           text-shadow: 0 0 20px rgba(38,242,208,0.5);
//           display: inline-block;
//           opacity: 0;
//           transform: translateY(-200px);
//           animation: sv-drop 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.2) forwards;
//         }

//         /* ── The Basic Drops (C & V) ── */
//         .sv-anchor {
//           display: inline-block;
//           opacity: 0;
//           transform: translateY(-200px);
//           animation: sv-drop 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.2) forwards;
//         }

//         @keyframes sv-drop {
//           0% { opacity: 0; transform: translateY(-200px); }
//           100% { opacity: 1; transform: translateY(0); }
//         }

//         /* ── Wordmark Styling ── */
//         .sv-name {
//           font-size: 44px; font-weight: 900;
//           letter-spacing: -0.04em; color: #fff;
//           margin-top: 35px;
//           display: flex; gap: 12px;
//         }
//         .sv-letter {
//           display: inline-block;
//           opacity: 0;
//           filter: blur(10px);
//           animation: sv-type 0.6s ease forwards;
//         }
//         @keyframes sv-type {
//           to { opacity: 1; filter: blur(0); }
//         }

//         /* ── The Architectural Shield SVG ── */
//         .sv-logo-svg {
//           width: 90px; height: 90px;
//           overflow: visible;
//         }
//         .sv-shield-stroke {
//           stroke-dasharray: 450; stroke-dashoffset: 450;
//           animation: sv-draw 2.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards;
//         }
//         .sv-vault-v {
//           stroke-dasharray: 120; stroke-dashoffset: 120;
//           animation: sv-draw 1.6s ease 1.8s forwards;
//         }
//         @keyframes sv-draw { to { stroke-dashoffset: 0; } }

//         /* ── Tagline & Meta ── */
//         .sv-tagline {
//           margin-top: 20px;
//           font-size: 10px; font-weight: 700;
//           letter-spacing: 0.5em; text-transform: uppercase;
//           color: rgba(255,255,255,0.25);
//           opacity: 0;
//           animation: sv-fade 1.2s ease 3.8s forwards;
//         }
//         @keyframes sv-fade { to { opacity: 1; } }

//         .sv-progress-track {
//           position: absolute; bottom: 80px;
//           width: 220px; height: 1px;
//           background: rgba(255,255,255,0.04);
//         }
//         .sv-progress-fill {
//           height: 100%; width: 0%;
//           background: linear-gradient(90deg, transparent, #26F2D0, transparent);
//           animation: sv-prog-run 4.8s cubic-bezier(0.65, 0, 0.35, 1) 1s forwards;
//         }
//         @keyframes sv-prog-run { to { width: 100%; } }

//         @media (max-width: 480px) {
//           .sv-name { font-size: 32px; gap: 8px; }
//           .sv-tagline { font-size: 8px; letter-spacing: 0.3em; }
//         }
//       `}</style>

//       <div className={`sv-splash${phase === "exit" ? " exit" : ""}`}>
//         {/* Deep Field Ambient Orb */}
//         <div className="sv-orb sv-orb-bottom" />

//         {/* ── Geometric Shield Logo ── */}
//         <div className="sv-logo-wrap">
//           <svg className="sv-logo-svg" viewBox="0 0 100 100">
//             {/* Minimalist Shield Outline */}
//             <path 
//               d="M50 8 L18 22 V48 C18 72 50 90 50 90 C50 90 82 72 82 48 V22 L50 8Z" 
//               fill="none" stroke="#26F2D0" strokeWidth="2" 
//               className="sv-shield-stroke"
//             />
//             {/* Precision Vault Core */}
//             <path 
//               d="M38 42 L50 64 L62 42" 
//               fill="none" stroke="#26F2D0" strokeWidth="6" 
//               strokeLinecap="round" strokeLinejoin="round"
//               className="sv-vault-v"
//             />
//           </svg>
//         </div>

//         {/* ── The Orchestrated Wordmark ── */}
//         <div className="sv-name">
//           {/* CAMPUS */}
//           <div className="sv-word">
//             <span className="sv-anchor" style={{animationDelay: '0.2s'}}>C</span>
//             <span className="sv-letter" style={{animationDelay: '1.2s'}}>a</span>
//             <span className="sv-creator" style={{animationDelay: '0.4s'}}>m</span>
//             <span className="sv-letter" style={{animationDelay: '1.4s'}}>p</span>
//             <span className="sv-letter" style={{animationDelay: '1.5s'}}>u</span>
//             <span className="sv-letter" style={{animationDelay: '1.6s'}}>s</span>
//           </div>

//           {/* VAULT */}
//           <div className="sv-word">
//             <span className="sv-anchor" style={{animationDelay: '0.3s'}}>V</span>
//             <span className="sv-letter" style={{animationDelay: '1.8s'}}>a</span>
//             <span className="sv-creator" style={{animationDelay: '0.5s'}}>u</span>
//             <span className="sv-letter" style={{animationDelay: '2.0s'}}>l</span>
//             <span className="sv-letter" style={{animationDelay: '2.1s'}}>t</span>
//           </div>
//         </div>

//         {/* ── Subtitle ── */}
//         <div className="sv-tagline">
//           Secure · Access · Share
//         </div>

//         {/* ── Performance Loader ── */}
//         <div className="sv-progress-track">
//           <div className="sv-progress-fill" />
//         </div>
//       </div>
//     </>
//   );
// }






import { useEffect, useState } from "react";

export default function SplashScreen({ onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(false), 5500);
    const t2 = setTimeout(() => onDone?.(), 6500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;800&display=swap');

        .cv-splash {
          position: fixed;
          inset: 0;
          background: radial-gradient(circle at center, #0a0a0a 0%, #050505 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          overflow: hidden;
          transition: opacity 1s ease;
        }

        .cv-splash.hide {
          opacity: 0;
          pointer-events: none;
        }

        .center {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        /* 🔥 NEW LOGO */
        .logo {
          width: 90px;
          height: 90px;
        }

        .outer-ring {
          stroke: rgba(38,242,208,0.3);
          stroke-width: 1;
          fill: none;
          animation: rotate 6s linear infinite;
          transform-origin: center;
        }

        .shield {
          stroke: #26F2D0;
          stroke-width: 2.5;
          fill: none;
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: draw 2s ease forwards;
        }

        .check {
          stroke: #26F2D0;
          stroke-width: 5;
          fill: none;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: draw 0.6s ease forwards 1.6s;
        }

        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* 🔥 TEXT */
        .brand {
          font-family: 'Sora', sans-serif;
          font-weight: 800;
          font-size: clamp(34px, 7vw, 48px);
          letter-spacing: -0.04em;
          display: flex;
          align-items: center;
          gap: 2px;
          opacity: 0;
          transform: translateY(20px);
          animation: textIn 1s ease forwards 1.5s;
        }

        @keyframes textIn {
          to { opacity: 1; transform: translateY(0); }
        }

        .highlight {
          color: #26F2D0;
          text-shadow: 0 0 25px rgba(38,242,208,0.6);
          position: relative;
        }

        /* 🎓 CAP */
        .cap {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%) rotate(-10deg);
          width: 18px;
          height: 10px;
          background: #26F2D0;
          clip-path: polygon(0 50%, 50% 0, 100% 50%, 50% 100%);
        }

        .cap::after {
          content: "";
          position: absolute;
          top: 8px;
          left: 50%;
          width: 2px;
          height: 10px;
          background: #26F2D0;
        }

        /* 🔥 TAGLINE */
        .tag {
          font-size: 12px;
          color: #6b7280;
          letter-spacing: 2px;
          opacity: 0;
          animation: fadeIn 1s ease forwards 2.5s;
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        /* 🔥 PROGRESS */
        .line {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 0%;
          background: linear-gradient(90deg,#26F2D0,#7c3aed);
          animation: load 5.5s linear forwards;
        }

        @keyframes load {
          to { width: 100%; }
        }
      `}</style>

      <div className={`cv-splash ${!visible ? "hide" : ""}`}>

        <div className="center">

          {/* 🔥 NEW LOGO */}
          <svg className="logo" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" className="outer-ring" />
            <path
              className="shield"
              d="M50 12 L22 28 V52 C22 72 50 90 50 90 C50 90 78 72 78 52 V28 L50 12Z"
            />
            <path
              className="check"
              d="M38 52 L48 65 L65 42"
            />
          </svg>

          {/* 🔥 BRAND */}
          <div className="brand">
            Ca
            <span className="highlight" style={{ position: "relative" }}>
              m
              <span className="cap"></span>
            </span>
            pus Va
            <span className="highlight" style={{ position: "relative" }}>
              u
              <span className="cap"></span>
            </span>
            lt
          </div>

          {/* 🔥 TAG */}
          <div className="tag">SMART CAMPUS PLATFORM</div>

        </div>

        <div className="line"></div>
      </div>
    </>
  );
}