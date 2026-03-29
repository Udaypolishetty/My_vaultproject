// import { Link } from "react-router-dom";
// import { Heart } from "lucide-react";

// export default function Footer() {
//   const year = new Date().getFullYear();

//   return (
//     <footer className="w-full relative mt-auto">
//       {/* Soft fade line — no hard border, fades from center outward */}
//       <div
//         className="absolute top-0 left-1/2 -translate-x-1/2"
//         style={{
//           width: "55%",
//           height: "1px",
//           background:
//             "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
//         }}
//       />

//       <div className="max-w-6xl mx-auto px-5 py-5">
//         {/* Row: brand · links · copyright */}
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

//           {/* Brand */}
//           <span
//             className="font-black text-xs tracking-widest uppercase"
//             style={{ color: "rgba(38,242,208,0.55)" }}
//           >
//             Campus Vault
//           </span>

//           {/* Nav links */}
//           <div className="flex items-center gap-4 flex-wrap justify-center">
//             {[
//               { to: "/community-guidelines", label: "Guidelines" },
//               { to: "/privacy",              label: "Privacy"    },
//               { to: "/terms",                label: "Terms"      },
//               { to: "/about",                label: "Contact"    },
//             ].map(({ to, label }) => (
//               <Link
//                 key={to}
//                 to={to}
//                 className="text-[11px] transition-colors duration-200"
//                 style={{ color: "rgba(156,163,175,0.5)" }}
//                 onMouseEnter={e => (e.target.style.color = "#26F2D0")}
//                 onMouseLeave={e => (e.target.style.color = "rgba(156,163,175,0.5)")}
//               >
//                 {label}
//               </Link>
//             ))}
//           </div>

//           {/* Right */}
//           <div
//             className="flex items-center gap-1 text-[11px]"
//             style={{ color: "rgba(107,114,128,0.5)" }}
//           >
//             <span>© {year}</span>
//             <span className="mx-1">·</span>
//             <Heart size={9} style={{ color: "rgba(239,68,68,0.5)", fill: "rgba(239,68,68,0.5)" }} />
//             <span className="ml-1">for students</span>
//           </div>

//         </div>

//         {/* College tag */}
//         <p
//           className="text-center text-[10px] tracking-widest uppercase font-mono mt-3"
//           style={{ color: "rgba(75,85,99,0.4)" }}
//         >
//           Ellenki College of Engineering · v2.0
//         </p>
//       </div>
//     </footer>
//   );
// }


import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full relative mt-auto">
      {/* Soft fade line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: "55%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-5 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Brand */}
          <span
            className="font-black text-xs tracking-widest uppercase"
            style={{ color: "rgba(38,242,208,0.55)" }}
          >
            Campus Vault
          </span>

          {/* Nav links */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {[
              { to: "/community-guidelines", label: "Guidelines" },
              { to: "/privacy",              label: "Privacy"    },
              { to: "/terms",                label: "Terms"      },
              { to: "/contact",              label: "Contact"    }, // ← was /about
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-[11px] transition-colors duration-200"
                style={{ color: "rgba(156,163,175,0.5)" }}
                onMouseEnter={e => (e.target.style.color = "#26F2D0")}
                onMouseLeave={e => (e.target.style.color = "rgba(156,163,175,0.5)")}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div
            className="flex items-center gap-1 text-[11px]"
            style={{ color: "rgba(107,114,128,0.5)" }}
          >
            <span>© {year}</span>
            <span className="mx-1">·</span>
            <Heart size={9} style={{ color: "rgba(239,68,68,0.5)", fill: "rgba(239,68,68,0.5)" }} />
            <span className="ml-1">for students</span>
          </div>

        </div>

        {/* College tag */}
        <p
          className="text-center text-[10px] tracking-widest uppercase font-mono mt-3"
          style={{ color: "rgba(75,85,99,0.4)" }}
        >
          Ellenki College of Engineering · v2.0
        </p>
      </div>
    </footer>
  );
}