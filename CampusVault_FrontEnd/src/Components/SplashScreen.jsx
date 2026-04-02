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





// import { useEffect, useState } from "react";

// export default function SplashScreen({ onDone }) {
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     const t1 = setTimeout(() => setVisible(false), 5200);
//     const t2 = setTimeout(() => onDone?.(), 6200);
//     return () => { clearTimeout(t1); clearTimeout(t2); };
//   }, [onDone]);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;700;800&display=swap');

//         .cv-splash {
//           position: fixed;
//           inset: 0;
//           background: #060606;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 99999;
//           overflow: hidden;
//           transition: opacity 1s ease;
//         }
//         .cv-splash.hide { opacity: 0; pointer-events: none; }

//         /* ── ambient orbs ── */
//         .cv-orb {
//           position: absolute;
//           border-radius: 50%;
//           pointer-events: none;
//           filter: blur(70px);
//         }
//         .cv-orb1 {
//           width: 260px; height: 260px;
//           background: #26F2D0; opacity: 0.06;
//           top: 5%; left: 3%;
//           animation: orbDrift 8s ease-in-out infinite;
//         }
//         .cv-orb2 {
//           width: 200px; height: 200px;
//           background: #7c3aed; opacity: 0.08;
//           bottom: 10%; right: 5%;
//           animation: orbDrift 11s ease-in-out infinite reverse;
//         }
//         @keyframes orbDrift {
//           0%,100% { transform: translate(0,0); }
//           50%      { transform: translate(24px,-24px); }
//         }

//         /* ── dot grid ── */
//         .cv-grid {
//           position: absolute; inset: 0; opacity: 0.04;
//           background-image: radial-gradient(circle, #fff 1px, transparent 1px);
//           background-size: 32px 32px;
//         }

//         /* ── center stack ── */
//         .cv-center {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 0;
//           position: relative;
//           z-index: 2;
//         }

//         /* ── C·V monogram ── */
//         .cv-logo {
//           animation: logoIn 1.2s cubic-bezier(.22,1,.36,1) both;
//         }
//         @keyframes logoIn {
//           from { opacity:0; transform: scale(.55) rotate(-25deg); }
//           to   { opacity:1; transform: scale(1)  rotate(0deg); }
//         }

//         .cv-arc-c {
//           stroke: #26F2D0;
//           stroke-width: 7;
//           fill: none;
//           stroke-linecap: round;
//           stroke-dasharray: 230;
//           stroke-dashoffset: 230;
//           animation: drawPath 1s ease forwards 0.3s;
//         }
//         .cv-arc-v {
//           stroke: #7c3aed;
//           stroke-width: 7;
//           fill: none;
//           stroke-linecap: round;
//           stroke-dasharray: 185;
//           stroke-dashoffset: 185;
//           animation: drawPath 0.9s ease forwards 1s;
//         }
//         @keyframes drawPath { to { stroke-dashoffset: 0; } }

//         .cv-dot {
//           animation: dotPop 0.4s ease forwards;
//           r: 0;
//         }
//         @keyframes dotPop {
//           0%  { opacity:0; r:0; }
//           60% { r:7; }
//           100%{ opacity:1; r:4.5; }
//         }

//         /* ── brand text ── */
//         .cv-brand {
//           display: flex;
//           align-items: baseline;
//           margin-top: 22px;
//           opacity: 0;
//           transform: translateY(16px);
//           animation: textUp 0.8s cubic-bezier(.22,1,.36,1) forwards 1.5s;
//         }
//         @keyframes textUp { to { opacity:1; transform:translateY(0); } }

//         .cv-plain {
//           font-family: 'Sora', sans-serif;
//           font-weight: 800;
//           font-size: clamp(34px, 6vw, 44px);
//           color: #e8e8e8;
//           letter-spacing: -0.03em;
//         }
//         .cv-m {
//           font-family: 'Sora', sans-serif;
//           font-weight: 800;
//           font-size: clamp(34px, 6vw, 44px);
//           color: #26F2D0;
//           letter-spacing: -0.03em;
//           position: relative;
//           display: inline-block;
//         }
//         .cv-u {
//           font-family: 'Sora', sans-serif;
//           font-weight: 800;
//           font-size: clamp(34px, 6vw, 44px);
//           color: #7c3aed;
//           letter-spacing: -0.03em;
//           position: relative;
//           display: inline-block;
//         }

//         /* ── graduation caps ── */
//         .cv-cap {
//           position: absolute;
//           left: 50%;
//           font-size: 20px;
//           line-height: 1;
//           opacity: 0;
//           top: -60px;
//           transform: translateX(-50%) rotate(-15deg);
//           pointer-events: none;
//           user-select: none;
//         }
//         .cv-cap-m { animation: capFall 0.75s cubic-bezier(.22,1,.36,1) forwards 2.3s; }
//         .cv-cap-u { animation: capFall 0.75s cubic-bezier(.22,1,.36,1) forwards 2.7s; }
//         @keyframes capFall {
//           0%   { opacity:0; top:-60px; transform:translateX(-50%) rotate(-20deg); }
//           45%  { opacity:1; top:-24px; transform:translateX(-50%) rotate(10deg); }
//           68%  { top:-28px; transform:translateX(-50%) rotate(-5deg); }
//           85%  { top:-24px; transform:translateX(-50%) rotate(3deg); }
//           100% { opacity:1; top:-24px; transform:translateX(-50%) rotate(0deg); }
//         }

//         /* ── tagline ── */
//         .cv-tagline {
//           font-family: 'Sora', sans-serif;
//           font-weight: 300;
//           font-size: 11px;
//           letter-spacing: 0.3em;
//           text-transform: uppercase;
//           color: rgba(255,255,255,0.28);
//           margin-top: 18px;
//           opacity: 0;
//           animation: fadeIn 0.8s ease forwards 3.1s;
//         }
//         @keyframes fadeIn { to { opacity: 1; } }

//         .cv-tag-dot {
//           display: inline-block;
//           width: 3px; height: 3px;
//           border-radius: 50%;
//           background: #26F2D0;
//           margin: 0 6px 1px;
//           vertical-align: middle;
//           opacity: 0;
//           animation: fadeIn 0.5s ease forwards 3.3s;
//         }

//         /* ── progress bar ── */
//         .cv-track {
//           width: 180px;
//           height: 1.5px;
//           background: rgba(255,255,255,0.07);
//           border-radius: 2px;
//           margin-top: 32px;
//           overflow: hidden;
//           opacity: 0;
//           animation: fadeIn 0.4s ease forwards 1.9s;
//         }
//         .cv-fill {
//           height: 100%;
//           width: 0%;
//           background: linear-gradient(90deg, #26F2D0, #7c3aed);
//           border-radius: 2px;
//           animation: fillProgress 3.3s cubic-bezier(0.4,0,0.2,1) forwards 1.9s;
//         }
//         @keyframes fillProgress { to { width: 100%; } }

//         /* ── ring spin ── */
//         .cv-spin { animation: spinSlow 12s linear infinite; transform-origin: 60px 60px; }
//         @keyframes spinSlow { to { transform: rotate(360deg); } }
//       `}</style>

//       <div className={`cv-splash${!visible ? " hide" : ""}`}>

//         {/* Ambient */}
//         <div className="cv-orb cv-orb1" />
//         <div className="cv-orb cv-orb2" />
//         <div className="cv-grid" />

//         <div className="cv-center">

//           {/* ── C·V monogram ── */}
//           <svg className="cv-logo" width="130" height="130" viewBox="0 0 120 120">
//             <defs>
//               <linearGradient id="cvRing" x1="0" y1="0" x2="1" y2="1">
//                 <stop offset="0%" stopColor="#26F2D0" />
//                 <stop offset="100%" stopColor="#7c3aed" />
//               </linearGradient>
//               <filter id="cvGlow">
//                 <feGaussianBlur stdDeviation="2.5" result="b"/>
//                 <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
//               </filter>
//             </defs>

//             {/* outer static ring */}
//             <circle cx="60" cy="60" r="55"
//               stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none"/>

//             {/* spinning dashed ring */}
//             <g className="cv-spin">
//               <circle cx="60" cy="60" r="55"
//                 stroke="url(#cvRing)" strokeWidth="1" fill="none"
//                 strokeDasharray="7 9" opacity="0.35"/>
//             </g>

//             {/* C arc — open right */}
//             <path className="cv-arc-c"
//               d="M78 22 A42 42 0 1 0 78 98"
//               filter="url(#cvGlow)"/>

//             {/* C endpoint dots */}
//             <circle fill="#26F2D0" cx="78" cy="22" style={{ animation: "dotPop 0.4s ease forwards 1.35s", r: 0 }} />
//             <circle fill="#26F2D0" cx="78" cy="98" style={{ animation: "dotPop 0.4s ease forwards 1.45s", r: 0 }} />

//             {/* V shape — sits inside right half */}
//             <path className="cv-arc-v"
//               d="M46 28 L62 84 L78 28"
//               filter="url(#cvGlow)"/>

//             {/* V bottom dot */}
//             <circle fill="#7c3aed" cx="62" cy="84" style={{ animation: "dotPop 0.4s ease forwards 1.95s", r: 0 }} />
//           </svg>

//           {/* ── Brand name ── */}
//           <div className="cv-brand">
//             <span className="cv-plain">Ca</span>

//             {/* M — teal highlight with falling cap */}
//             <span className="cv-m">
//               m
//               <span className="cv-cap cv-cap-m">🎓</span>
//             </span>

//             <span className="cv-plain">pus&nbsp;Va</span>

//             {/* U — purple highlight with falling cap */}
//             <span className="cv-u">
//               u
//               <span className="cv-cap cv-cap-u">🎓</span>
//             </span>

//             <span className="cv-plain">lt</span>
//           </div>

//           {/* ── Tagline ── */}
//           <div className="cv-tagline">
//             Smart campus platform
//             <span className="cv-tag-dot" />
//             built for students
//           </div>

//           {/* ── Progress bar ── */}
//           <div className="cv-track">
//             <div className="cv-fill" />
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }









// import { useEffect, useState } from "react";

// export default function SplashScreen({ onDone }) {
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     const t1 = setTimeout(() => setVisible(false), 5400);
//     const t2 = setTimeout(() => onDone?.(), 6400);
//     return () => { clearTimeout(t1); clearTimeout(t2); };
//   }, [onDone]);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;700;800;900&display=swap');

//         /* ── Base ── */
//         .cv-splash {
//           position: fixed; inset: 0;
//           background: #060608;
//           display: flex; align-items: center; justify-content: center;
//           z-index: 99999; overflow: hidden;
//           transition: opacity 1.0s cubic-bezier(0.4,0,1,1);
//         }
//         .cv-splash.hide { opacity: 0; pointer-events: none; }

//         /* ── Background ── */
//         .cv-bg-ring {
//           position: absolute;
//           border-radius: 50%;
//           border: 1px solid rgba(38,242,208,0.06);
//           pointer-events: none;
//           animation: ringPulse 6s ease-in-out infinite;
//         }
//         .cv-bg-ring:nth-child(1) { width:320px; height:320px; }
//         .cv-bg-ring:nth-child(2) { width:500px; height:500px; animation-delay:1.2s; border-color:rgba(112,40,220,0.05); }
//         .cv-bg-ring:nth-child(3) { width:700px; height:700px; animation-delay:2.4s; border-color:rgba(38,242,208,0.03); }
//         @keyframes ringPulse {
//           0%,100% { transform:scale(1); opacity:0.6; }
//           50%      { transform:scale(1.04); opacity:1; }
//         }

//         .cv-grid {
//           position:absolute; inset:0; opacity:0.028;
//           background-image: radial-gradient(circle,#fff 1px,transparent 1px);
//           background-size:36px 36px;
//         }

//         .cv-orb {
//           position:absolute; border-radius:50%;
//           pointer-events:none; filter:blur(90px);
//         }
//         .cv-orb1 { width:280px; height:280px; background:#26F2D0; opacity:0.055; top:0; left:5%; animation:orbDrift 10s ease-in-out infinite; }
//         .cv-orb2 { width:220px; height:220px; background:#7028dc; opacity:0.07; bottom:5%; right:5%; animation:orbDrift 14s ease-in-out infinite reverse; }
//         @keyframes orbDrift {
//           0%,100% { transform:translate(0,0); }
//           50%      { transform:translate(28px,-32px); }
//         }

//         /* ── Center ── */
//         .cv-center {
//           display:flex; flex-direction:column; align-items:center;
//           gap:0; position:relative; z-index:2;
//         }

//         /* ── Logo SVG ── */
//         .cv-logo-wrap {
//           opacity:0;
//           animation: logoReveal 0.8s cubic-bezier(0.22,1,0.36,1) forwards 0.2s;
//           filter: drop-shadow(0 0 28px rgba(38,242,208,0.25)) drop-shadow(0 0 60px rgba(38,242,208,0.1));
//         }
//         @keyframes logoReveal {
//           from { opacity:0; transform:scale(0.6) translateY(10px); }
//           to   { opacity:1; transform:scale(1) translateY(0); }
//         }

//         /* C stroke draw */
//         .cv-c-stroke {
//           stroke-dasharray: 340;
//           stroke-dashoffset: 340;
//           animation: drawStroke 1.1s cubic-bezier(0.4,0,0.2,1) forwards 0.6s;
//         }
//         /* C shadow layer (3D offset) */
//         .cv-c-shadow {
//           stroke-dasharray: 340;
//           stroke-dashoffset: 340;
//           animation: drawStroke 1.1s cubic-bezier(0.4,0,0.2,1) forwards 0.5s;
//         }

//         /* V stroke draw */
//         .cv-v-stroke {
//           stroke-dasharray: 260;
//           stroke-dashoffset: 260;
//           animation: drawStroke 0.9s cubic-bezier(0.4,0,0.2,1) forwards 1.5s;
//         }
//         .cv-v-shadow {
//           stroke-dasharray: 260;
//           stroke-dashoffset: 260;
//           animation: drawStroke 0.9s cubic-bezier(0.4,0,0.2,1) forwards 1.4s;
//         }

//         @keyframes drawStroke { to { stroke-dashoffset: 0; } }

//         /* Glow flash when stroke finishes */
//         .cv-glow-c {
//           opacity:0;
//           animation: glowFlash 0.6s ease forwards 1.7s;
//         }
//         .cv-glow-v {
//           opacity:0;
//           animation: glowFlash 0.6s ease forwards 2.4s;
//         }
//         @keyframes glowFlash {
//           0%   { opacity:0; }
//           40%  { opacity:1; }
//           100% { opacity:0; }
//         }

//         /* ── Brand name ── */
//         .cv-brand {
//           display:flex; align-items:flex-end;
//           margin-top:20px; gap:0;
//           opacity:0; transform:translateY(18px);
//           animation: slideUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards 1.8s;
//         }
//         @keyframes slideUp { to { opacity:1; transform:translateY(0); } }

//         .cv-word {
//           font-family:'Sora',sans-serif;
//           font-weight:800;
//           font-size:clamp(32px,5.5vw,42px);
//           color:#ececec;
//           letter-spacing:-0.04em;
//           line-height:1;
//         }

//         /* Highlighted letters */
//         .cv-hl-m, .cv-hl-u {
//           font-family:'Sora',sans-serif;
//           font-weight:900;
//           font-size:clamp(32px,5.5vw,42px);
//           letter-spacing:-0.04em;
//           line-height:1;
//           position:relative;
//           display:inline-block;
//         }
//         .cv-hl-m {
//           color:#26F2D0;
//           text-shadow: 0 0 20px rgba(38,242,208,0.5), 0 0 40px rgba(38,242,208,0.2);
//         }
//         .cv-hl-u {
//           color:#9b5cf6;
//           text-shadow: 0 0 20px rgba(155,92,246,0.5), 0 0 40px rgba(155,92,246,0.2);
//         }

//         /* Graduation caps */
//         .cv-cap {
//           position:absolute;
//           top:-44px; left:50%;
//           transform:translateX(-50%) rotate(-10deg) scale(0);
//           transform-origin:bottom center;
//           font-size:22px;
//           line-height:1;
//           pointer-events:none; user-select:none;
//           filter:drop-shadow(0 2px 8px rgba(0,0,0,0.5));
//         }
//         .cv-cap-m { animation: capLand 0.65s cubic-bezier(0.22,1,0.36,1) forwards 2.7s; }
//         .cv-cap-u { animation: capLand 0.65s cubic-bezier(0.22,1,0.36,1) forwards 3.1s; }
//         @keyframes capLand {
//           0%   { transform:translateX(-50%) translateY(-30px) rotate(-15deg) scale(0); opacity:0; }
//           50%  { transform:translateX(-50%) translateY(4px)  rotate(6deg)   scale(1.15); opacity:1; }
//           75%  { transform:translateX(-50%) translateY(-3px) rotate(-3deg)  scale(0.96); opacity:1; }
//           100% { transform:translateX(-50%) translateY(0)    rotate(0deg)   scale(1);    opacity:1; }
//         }

//         /* Lucide cap icons injected via SVG */
//         .cv-svgcap {
//           position:absolute;
//           top:-46px; left:50%;
//           transform:translateX(-50%) scale(0);
//           transform-origin:bottom center;
//           pointer-events:none;
//           filter:drop-shadow(0 2px 8px rgba(0,0,0,0.5));
//         }
//         .cv-svgcap-m { animation: capLand 0.65s cubic-bezier(0.22,1,0.36,1) forwards 2.7s; }
//         .cv-svgcap-u { animation: capLand 0.65s cubic-bezier(0.22,1,0.36,1) forwards 3.1s; }

//         /* ── Tagline ── */
//         .cv-tagline {
//           font-family:'Sora',sans-serif; font-weight:300;
//           font-size:10.5px; letter-spacing:0.32em;
//           text-transform:uppercase; color:rgba(255,255,255,0.25);
//           margin-top:16px;
//           opacity:0;
//           animation: fadeUp 0.8s ease forwards 3.5s;
//         }
//         .cv-dot-sep {
//           display:inline-block; width:3px; height:3px; border-radius:50%;
//           background:#26F2D0; margin:0 7px 1.5px; vertical-align:middle;
//           opacity:0; animation:fadeUp 0.5s ease forwards 3.7s;
//         }

//         /* ── Progress bar ── */
//         .cv-bar-wrap {
//           width:200px; height:1.5px;
//           background:rgba(255,255,255,0.07);
//           border-radius:2px; margin-top:28px;
//           overflow:hidden;
//           opacity:0; animation:fadeUp 0.4s ease forwards 2.1s;
//         }
//         .cv-bar-fill {
//           height:100%; width:0%;
//           background: linear-gradient(90deg,#26F2D0 0%,#9b5cf6 60%,#26F2D0 100%);
//           background-size:200% 100%;
//           border-radius:2px;
//           animation:
//             fillBar 3.4s cubic-bezier(0.4,0,0.2,1) forwards 2.1s,
//             shineBar 1.8s linear infinite 2.5s;
//         }
//         @keyframes fillBar { to { width:100%; } }
//         @keyframes shineBar { to { background-position:-200% 0; } }

//         @keyframes fadeUp {
//           from { opacity:0; transform:translateY(8px); }
//           to   { opacity:1; transform:translateY(0); }
//         }

//         /* ── Spinning outer ring ── */
//         .cv-spinner { animation:spinRing 18s linear infinite; transform-origin:80px 80px; }
//         @keyframes spinRing { to { transform:rotate(360deg); } }
//         .cv-spinner-rev { animation:spinRing 24s linear infinite reverse; transform-origin:80px 80px; }
//       `}</style>

//       <div className={`cv-splash${!visible ? " hide" : ""}`}>

//         {/* Ambient layers */}
//         <div className="cv-orb cv-orb1" />
//         <div className="cv-orb cv-orb2" />
//         <div className="cv-grid" />
//         <div className="cv-bg-ring" style={{ position:"absolute" }} />
//         <div className="cv-bg-ring" style={{ position:"absolute" }} />
//         <div className="cv-bg-ring" style={{ position:"absolute" }} />

//         <div className="cv-center">

//           {/* ════════════════════════════════════════
//               CV MONOGRAM — matches the image style:
//               thick C arc open on the right,
//               sharp V whose left leg slashes through
//               the C's gap, creating a linked monogram.
//               3D achieved via offset shadow strokes.
//           ════════════════════════════════════════ */}
//           <div className="cv-logo-wrap">
//             <svg width="160" height="160" viewBox="0 0 160 160" fill="none"
//               xmlns="http://www.w3.org/2000/svg">

//               <defs>
//                 {/* Teal gradient for C */}
//                 <linearGradient id="cvGradC" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="0%"   stopColor="#26F2D0" />
//                   <stop offset="100%" stopColor="#0eb89a" />
//                 </linearGradient>
//                 {/* Purple gradient for V */}
//                 <linearGradient id="cvGradV" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="0%"   stopColor="#b47aff" />
//                   <stop offset="100%" stopColor="#7028dc" />
//                 </linearGradient>
//                 {/* Outer ring gradient */}
//                 <linearGradient id="cvRingGrad" x1="0" y1="0" x2="1" y2="1">
//                   <stop offset="0%"   stopColor="#26F2D0" stopOpacity="0.5" />
//                   <stop offset="50%"  stopColor="#9b5cf6" stopOpacity="0.3" />
//                   <stop offset="100%" stopColor="#26F2D0" stopOpacity="0.1" />
//                 </linearGradient>
//                 {/* Glow filter */}
//                 <filter id="cvGlowC" x="-40%" y="-40%" width="180%" height="180%">
//                   <feGaussianBlur stdDeviation="4" result="b"/>
//                   <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
//                 </filter>
//                 <filter id="cvGlowV" x="-40%" y="-40%" width="180%" height="180%">
//                   <feGaussianBlur stdDeviation="4" result="b"/>
//                   <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
//                 </filter>
//               </defs>

//               {/* Static outer rings */}
//               <circle cx="80" cy="80" r="74"
//                 stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
//               {/* Spinning dashed outer ring */}
//               <g className="cv-spinner">
//                 <circle cx="80" cy="80" r="74"
//                   stroke="url(#cvRingGrad)" strokeWidth="1"
//                   strokeDasharray="8 11" />
//               </g>
//               {/* Counter-spinning inner dashes */}
//               <g className="cv-spinner-rev">
//                 <circle cx="80" cy="80" r="64"
//                   stroke="rgba(155,92,246,0.15)" strokeWidth="0.5"
//                   strokeDasharray="4 14" />
//               </g>

//               {/* ── C arc — 3D shadow layer (offset + darker) ── */}
//               {/*
//                 C: A wide open-right arc.
//                 Starts top-right, sweeps left (counter-clockwise), ends bottom-right.
//                 Thick strokes to match the bold logo in the image.
//                 The C is slightly larger, the V's left leg pierces its opening.
//               */}
//               <path
//                 className="cv-c-shadow"
//                 d="M 100 24 A 52 52 0 1 0 100 136"
//                 stroke="rgba(10,100,80,0.6)"
//                 strokeWidth="11"
//                 strokeLinecap="round"
//                 transform="translate(3,3)"
//               />
//               {/* C main stroke */}
//               <path
//                 className="cv-c-stroke"
//                 d="M 100 24 A 52 52 0 1 0 100 136"
//                 stroke="url(#cvGradC)"
//                 strokeWidth="10"
//                 strokeLinecap="round"
//                 filter="url(#cvGlowC)"
//               />
//               {/* C glow flash */}
//               <path
//                 className="cv-glow-c"
//                 d="M 100 24 A 52 52 0 1 0 100 136"
//                 stroke="rgba(38,242,208,0.4)"
//                 strokeWidth="20"
//                 strokeLinecap="round"
//               />

//               {/* ── V shape — 3D shadow layer ── */}
//               {/*
//                 V: left leg starts at same x as C opening (~100),
//                 cuts diagonally down to bottom point (~80, 126),
//                 then rises back up to right (132, 24).
//                 Left leg intentionally starts inside C's gap for the linked feel.
//               */}
//               <path
//                 className="cv-v-shadow"
//                 d="M 98 26 L 80 118 L 133 26"
//                 stroke="rgba(60,10,100,0.55)"
//                 strokeWidth="11"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 transform="translate(3,3)"
//               />
//               {/* V main stroke */}
//               <path
//                 className="cv-v-stroke"
//                 d="M 98 26 L 80 118 L 133 26"
//                 stroke="url(#cvGradV)"
//                 strokeWidth="10"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 filter="url(#cvGlowV)"
//               />
//               {/* V glow flash */}
//               <path
//                 className="cv-glow-v"
//                 d="M 98 26 L 80 118 L 133 26"
//                 stroke="rgba(155,92,246,0.4)"
//                 strokeWidth="20"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />

//               {/* Endpoint accent dots */}
//               <circle cx="100" cy="24"  r="4.5" fill="#26F2D0"
//                 style={{ opacity:0, animation:"dotPop 0.35s ease forwards 1.7s" }} />
//               <circle cx="100" cy="136" r="4.5" fill="#26F2D0"
//                 style={{ opacity:0, animation:"dotPop 0.35s ease forwards 1.75s" }} />
//               <circle cx="80"  cy="118" r="4.5" fill="#9b5cf6"
//                 style={{ opacity:0, animation:"dotPop 0.35s ease forwards 2.4s" }} />

//               <style>{`
//                 @keyframes dotPop {
//                   0%  { opacity:0; r:0; }
//                   60% { r:6; }
//                   100%{ opacity:1; r:4.5; }
//                 }
//               `}</style>
//             </svg>
//           </div>

//           {/* ════════════════════════════════════
//               BRAND — "Campus Vault"
//               M in teal, U in purple, caps land on them
//           ════════════════════════════════════ */}
//           <div className="cv-brand">
//             <span className="cv-word">Ca</span>

//             <span className="cv-hl-m">
//               {/* Lucide graduation-cap SVG icon — teal */}
//               <svg
//                 className="cv-svgcap cv-svgcap-m"
//                 width="26" height="26"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="#26F2D0"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
//                 <path d="M6 12v5c3 3 9 3 12 0v-5"/>
//               </svg>
//               m
//             </span>

//             <span className="cv-word">pus&nbsp;Va</span>

//             <span className="cv-hl-u">
//               {/* Lucide graduation-cap SVG icon — purple */}
//               <svg
//                 className="cv-svgcap cv-svgcap-u"
//                 width="26" height="26"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="#9b5cf6"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
//                 <path d="M6 12v5c3 3 9 3 12 0v-5"/>
//               </svg>
//               u
//             </span>

//             <span className="cv-word">lt</span>
//           </div>

//           {/* Tagline */}
//           <div className="cv-tagline">
//             Smart campus platform
//             <span className="cv-dot-sep" />
//             built for students
//           </div>

//           {/* Progress bar */}
//           <div className="cv-bar-wrap">
//             <div className="cv-bar-fill" />
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }


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
            <span className="spl-tag-word" style={{ color: "rgba(255,255,255,0.3)" }}>Collaborate</span>
          </div>

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