
// import { useState } from "react";
// import IdeasBoard from "./IdeasBoard";
// import Club from "./Clubs/Club";

// export default function Connect() {
//   const [activeTab, setActiveTab] = useState("ideas");

//   return (
//     <div className="min-h-screen bg-[#0f0f0f] text-white pt-4 px-10">


//     <div className="mt-10 mb-10 px-6">
//    <div
//     className="max-w-4xl mx-auto rounded-2xl border border-white/10 
//                bg-gradient-to-r from-[#0b0b0b]/80 to-[#141414]/80
//                backdrop-blur-xl p-6 shadow-lg relative
//                shadow-[0_0_25px_rgba(38,242,208,0.12)]
//                transition-all duration-300
//                hover:-translate-y-1
//                hover:shadow-[0_0_40px_rgba(38,242,208,0.25)]
//                hover:border-[#26F2D0]/40"
//   >

//     <div className="flex flex-col items-center text-center">
//       <h2 className="text-xl font-semibold text-white">
//         Connect with our campus
//       </h2>

//       <p className="text-gray-400 text-sm max-w-2xl mt-1">
//         Share ideas, discuss college topics, and collaborate with fellow students —
//         all in one place.
//       </p>
//     </div>

//   </div>
// </div>


//       <div className="flex gap-4 mb-8">
//         <button
//           onClick={() => setActiveTab("ideas")}
//           className={activeTab === "ideas" ? "bg-[#26F2D0] text-black px-6 py-2 rounded" : "bg-[#222] px-6 py-2 rounded"}
//         >
//           Ideas Board
//         </button>

//         <button
//           onClick={() => setActiveTab("club")}
//           className={activeTab === "club" ? "bg-[#26F2D0] text-black px-6 py-2 rounded" : "bg-[#222] px-6 py-2 rounded"}
//         >
//           Clubs
//         </button>
//       </div>

//       {activeTab === "ideas" ? <IdeasBoard /> : <Club />}
//     </div>
//   );
// }


// import { useState } from "react";
// import IdeasBoard from "./IdeasBoard";
// // import Discussions from "./Discussions";

// export default function Connect() {
//   const [activeTab, setActiveTab] = useState("ideas");

//   return (
//     <div className="min-h-screen bg-[#0f0f0f] text-white pt-4 px-10">


//     <div className="mt-10 mb-10 px-6">
//    <div
//     className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-white/[0.02]

//                bg-gradient-to-r from-[#0b0b0b]/80 to-[#141414]/80
//                backdrop-blur-xl p-6 shadow-lg relative
//                shadow-[0_20px_40px_rgba(0,212,170,0.08)]
//                transition-all duration-300
//                hover:-translate-y-1
//                hover:shadow-[0_0_40px_rgba(38,242,208,0.25)]
//                hover:border-[#26F2D0]/40"
//   >

//     <div className="flex flex-col items-center text-center ">
//       <h2 className="text-xl font-semibold text-white">
//         Connect with our campus
//       </h2>

//       <p className="text-gray-400 text-sm max-w-2xl mt-1">
//         Share ideas, discuss college topics, and collaborate with fellow students —
//         all in one place.
//       </p>
//     </div>

//   </div>
// </div>


//       {/* <div className="flex gap-4 mb-8">
//         <button
//           onClick={() => setActiveTab("ideas")}
//           className={activeTab === "ideas" ? "bg-[#26F2D0] text-black px-6 py-2 rounded" : "bg-[#222] px-6 py-2 rounded"}
//         >
//           Ideas Board
//         </button>

//         <button
//           onClick={() => setActiveTab("discussions")}
//           className={activeTab === "discussions" ? "bg-[#26F2D0] text-black px-6 py-2 rounded" : "bg-[#222] px-6 py-2 rounded"}
//         >
//           Discussions
//         </button>
//       </div> */}

// <div className="flex gap-6 mb-8 border-b border-white/20 pb-3">
//   <button
//     onClick={() => setActiveTab("ideas")}
//     className={`px-6 py-2 font-medium transition-all duration-200 border-b-2 -mb-px ${
//       activeTab === "ideas"
//         ? "border-[#26F2D0] text-[#26F2D0]"
//         : "border-transparent text-gray-400 hover:text-[#26F2D0] hover:border-[#26F2D0]/50"
//     }`}
//   >
//     Ideas 
//   </button>

//   <button
//     onClick={() => setActiveTab("discussions")}
//     className={`px-6 py-2 font-medium transition-all duration-200 border-b-2 -mb-px ${
//       activeTab === "discussions"
//         ? "border-[#26F2D0] text-[#26F2D0]"
//         : "border-transparent text-gray-400 hover:text-[#26F2D0] hover:border-[#26F2D0]/50"
//     }`}
//   >
//     Clubs
//   </button>
// </div>


//       {activeTab === "ideas" ? <IdeasBoard /> : <Discussions />}
//     </div>
//   );
// }


// import { useState } from "react";
// import IdeasBoard from "./IdeasBoard";
// import Club from "./Clubs/Club";
// import CampusNews from "./CampusNews";


// export default function Connect() {
//   const [activeTab, setActiveTab] = useState("ideas");

//   return (
//     <div className="min-h-screen bg-[#0f0f0f] text-white pt-4 px-4 md:px-10 overflow-x-hidden">


//     <div className="mt-6 mb-6 px-2 md:px-6 ">
//    <div
//     className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-white/[0.02]

//                bg-gradient-to-r from-[#0b0b0b]/80 to-[#141414]/80
//                backdrop-blur-xl p-6 shadow-lg relative
//                shadow-[0_20px_40px_rgba(0,212,170,0.08)]
//                transition-all duration-300
//                hover:-translate-y-1
//                hover:shadow-[0_0_40px_rgba(38,242,208,0.25)]
//                hover:border-[#26F2D0]/40"
//   >

//     <div className="flex flex-col items-center text-center  ">
//       <h2 className="text-xl font-semibold text-white">
//         Connect with our campus
//       </h2>

//       <p className="text-gray-400 text-sm max-w-2xl mt-1">
//        Share ideas, join clubs, discuss college topics, and collaborate — all in one place.
//       </p>
//     </div>

//   </div>
// </div>


//       {/* <div className="flex gap-4 mb-8">
//         <button
//           onClick={() => setActiveTab("ideas")}
//           className={activeTab === "ideas" ? "bg-[#26F2D0] text-black px-6 py-2 rounded" : "bg-[#222] px-6 py-2 rounded"}
//         >
//           Ideas Board
//         </button>

//         <button
//           onClick={() => setActiveTab("discussions")}
//           className={activeTab === "discussions" ? "bg-[#26F2D0] text-black px-6 py-2 rounded" : "bg-[#222] px-6 py-2 rounded"}
//         >
//           Discussions
//         </button>
//       </div> */}

// <div className="flex gap-6 mb-8 border-b border-white/20 pb-3  overflow-x-auto">
//   <button
//     onClick={() => setActiveTab("ideas")}
//     className={`px-6 py-2 font-medium transition-all duration-200 border-b-2  -mb-[2px] ${
//       activeTab === "ideas"
//         ? "border-[#26F2D0] text-[#26F2D0]"
//         : "border-transparent text-gray-400 hover:text-[#26F2D0] hover:border-[#26F2D0]/50"
//     }`}
//   >
//     Ideas 
//   </button>

//   <button
//     onClick={() => setActiveTab("clubs")}
//     className={`px-6 py-2 font-medium transition-all duration-200 border-b-2  -mb-[2px] ${
//       activeTab === "clubs"
//         ? "border-[#26F2D0] text-[#26F2D0]"
//         : "border-transparent text-gray-400 hover:text-[#26F2D0] hover:border-[#26F2D0]/50"
//     }`}
//   >
//     Clubs
//   </button>
//   <button
//           onClick={() => setActiveTab("news")}
//           className={`px-6 py-2 font-medium transition-all duration-200 border-b-2  -mb-[2px] whitespace-nowrap ${
//             activeTab === "news"
//               ? "border-[#26F2D0] text-[#26F2D0]"
//               : "border-transparent text-gray-400 hover:text-[#26F2D0] hover:border-[#26F2D0]/50"
//           }`}
//         >
//           Campus News
//         </button>
//       </div>

//       {activeTab === "ideas" && <IdeasBoard />}
//       {activeTab === "clubs" && <Club />}
//       {activeTab === "news" && <CampusNews />}
//     </div>
//   );
// }

//new with buzz


// import { useState } from "react";
// import IdeasBoard from "./IdeasBoard";
// import Club from "./Clubs/Club";
// import CampusNews from "./CampusNews";
// import CampusBuzz from "./CampusBuzz"; // ✅ new

// export default function Connect() {
//   const [activeTab, setActiveTab] = useState("ideas");

//   return (
//     <div className="min-h-screen bg-[#0f0f0f] text-white pt-4 px-4 md:px-10 overflow-x-hidden">

//       <div className="mt-6 mb-6 px-2 md:px-6">
//         <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-white/[0.02]
//                         bg-gradient-to-r from-[#0b0b0b]/80 to-[#141414]/80
//                         backdrop-blur-xl p-6 shadow-lg relative
//                         shadow-[0_20px_40px_rgba(0,212,170,0.08)]
//                         transition-all duration-300
//                         hover:-translate-y-1
//                         hover:shadow-[0_0_40px_rgba(38,242,208,0.25)]
//                         hover:border-[#26F2D0]/40">
//           <div className="flex flex-col items-center text-center">
//             <h2 className="text-xl font-semibold text-white">
//               Connect with our campus
//             </h2>
//             <p className="text-gray-400 text-sm max-w-2xl mt-1">
//               Share ideas, join clubs, discuss college topics, and collaborate — all in one place.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-6 mb-8 border-b border-white/20 pb-3 overflow-x-auto">
//         <button
//           onClick={() => setActiveTab("ideas")}
//           className={`px-6 py-2 font-medium transition-all duration-200 border-b-2 -mb-[2px] whitespace-nowrap ${
//             activeTab === "ideas"
//               ? "border-[#26F2D0] text-[#26F2D0]"
//               : "border-transparent text-gray-400 hover:text-[#26F2D0] hover:border-[#26F2D0]/50"
//           }`}
//         >
//           Ideas
//         </button>

//         <button
//           onClick={() => setActiveTab("clubs")}
//           className={`px-6 py-2 font-medium transition-all duration-200 border-b-2 -mb-[2px] whitespace-nowrap ${
//             activeTab === "clubs"
//               ? "border-[#26F2D0] text-[#26F2D0]"
//               : "border-transparent text-gray-400 hover:text-[#26F2D0] hover:border-[#26F2D0]/50"
//           }`}
//         >
//           Clubs
//         </button>

//         <button
//           onClick={() => setActiveTab("news")}
//           className={`px-6 py-2 font-medium transition-all duration-200 border-b-2 -mb-[2px] whitespace-nowrap ${
//             activeTab === "news"
//               ? "border-[#26F2D0] text-[#26F2D0]"
//               : "border-transparent text-gray-400 hover:text-[#26F2D0] hover:border-[#26F2D0]/50"
//           }`}
//         >
//           Campus News
//         </button>

//         {/* ✅ new tab */}
//         <button
//           onClick={() => setActiveTab("buzz")}
//           className={`px-6 py-2 font-medium transition-all duration-200 border-b-2 -mb-[2px] whitespace-nowrap ${
//             activeTab === "buzz"
//               ? "border-[#26F2D0] text-[#26F2D0]"
//               : "border-transparent text-gray-400 hover:text-[#26F2D0] hover:border-[#26F2D0]/50"
//           }`}
//         >
//           📢 Campus Buzz
//         </button>
//       </div>

//       {activeTab === "ideas" && <IdeasBoard />}
//       {activeTab === "clubs" && <Club />}
//       {activeTab === "news" && <CampusNews />}
//       {activeTab === "buzz" && <CampusBuzz />} {/* ✅ */}
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import IdeasBoard from "./Ideas/IdeasBoard";
// import Club from "./Clubs/Club";
// import CampusNews from "./CampusNews";
// import CampusBuzz from "./CampusBuzz";

// export default function Connect() {
//   const [activeTab, setActiveTab] = useState("ideas");
//   const [buzzDot, setBuzzDot] = useState(false);

//   const token = sessionStorage.getItem("token");

//   // ✅ check if there are new buzz posts since last visit
//   useEffect(() => {
//     const checkNewBuzz = async () => {
//       const lastVisit = localStorage.getItem("lastBuzzVisit");
//       if (!lastVisit) { setBuzzDot(true); return; }
//       try {
//         const res = await fetch("http://localhost:8081/api/buzz", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         if (!res.ok) return;
//         const posts = await res.json();
//         const hasNew = posts.some(p =>
//           new Date(p.createdAt).getTime() > parseInt(lastVisit)
//         );
//         setBuzzDot(hasNew);
//         // ✅ also tell Navbar about new buzz
//         if (hasNew) window.dispatchEvent(new Event("newBuzz"));
//       } catch (err) {
//         console.error("Buzz check failed:", err);
//       }
//     };
//     checkNewBuzz();
//   }, []);

//   const handleBuzzTabClick = () => {
//     setActiveTab("buzz");
//     setBuzzDot(false); // ✅ clear dot when tab opened
//     window.dispatchEvent(new Event("buzzRead")); // ✅ clear navbar dot
//   };

//   const tabClass = (tab) =>
//     `px-6 py-2 font-medium transition-all duration-200 border-b-2 -mb-[2px] whitespace-nowrap
//     ${activeTab === tab
//       ? "border-[#26F2D0] text-[#26F2D0]"
//       : "border-transparent text-gray-400 hover:text-[#26F2D0] hover:border-[#26F2D0]/50"
//     }`;

//   return (
//     <div className="min-h-screen bg-[#0f0f0f] text-white pt-4 px-4 md:px-10 overflow-x-hidden">

//       <div className="mt-6 mb-6 px-2 md:px-6">
//         <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-white/[0.02]
//                         bg-gradient-to-r from-[#0b0b0b]/80 to-[#141414]/80
//                         backdrop-blur-xl p-6 shadow-lg
//                         shadow-[0_20px_40px_rgba(0,212,170,0.08)]
//                         transition-all duration-300 hover:-translate-y-1
//                         hover:shadow-[0_0_40px_rgba(38,242,208,0.25)]
//                         hover:border-[#26F2D0]/40">
//           <div className="flex flex-col items-center text-center">
//             <h2 className="text-xl font-semibold text-white">Connect with our campus</h2>
//             <p className="text-gray-400 text-sm max-w-2xl mt-1">
//               Share ideas, join clubs, discuss college topics, and collaborate — all in one place.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-6 mb-8 border-b border-white/20 pb-3 overflow-x-auto">
//         <button className={tabClass("ideas")} onClick={() => setActiveTab("ideas")}>
//           Ideas
//         </button>
//         <button className={tabClass("clubs")} onClick={() => setActiveTab("clubs")}>
//           Clubs
//         </button>
        
//         {/* ✅ Buzz tab with red dot */}
//           <button className={tabClass("buzz")} onClick={handleBuzzTabClick}>
//           <span className="relative inline-flex items-center gap-1">
//             📢 Campus Buzz
//             {buzzDot && (
//               <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
//             )}
//           </span>
//         </button>
//         <button className={tabClass("news")} onClick={() => setActiveTab("news")}>
//           Campus News
//         </button>

      
//       </div>

//       {activeTab === "ideas" && <IdeasBoard />}
//       {activeTab === "clubs" && <Club />}
//       {activeTab === "news" && <CampusNews />}
//       {activeTab === "buzz" && <CampusBuzz />}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import IdeasBoard from "./Ideas/IdeasBoard";
import Club from "./Clubs/Club";
import CampusNews from "./CampusNews";
import CampusBuzz from "./CampusBuzz";
import FirstUserSuggestion from "./FirstUserSuggestion";

export default function Connect() {
  const [activeTab, setActiveTab] = useState("ideas");
  const [buzzDot, setBuzzDot] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const token = sessionStorage.getItem("token");
  const rollNumber = sessionStorage.getItem("rollNumber");

  useEffect(() => {
    const key = `onboarded_${rollNumber}`;
    if (!localStorage.getItem(key)) {
      setTimeout(() => setShowOnboarding(true), 600);
    }

    const checkNewBuzz = async () => {
      const lastVisit = localStorage.getItem("lastBuzzVisit");
      if (!lastVisit) { setBuzzDot(true); return; }
      try {
        const res = await fetch("http://localhost:8081/api/buzz", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) return;
        const posts = await res.json();
        const hasNew = posts.some(p =>
          new Date(p.createdAt).getTime() > parseInt(lastVisit)
        );
        setBuzzDot(hasNew);
        if (hasNew) window.dispatchEvent(new Event("newBuzz"));
      } catch (err) {
        console.error("Buzz check failed:", err);
      }
    };
    checkNewBuzz();
  }, []);

  const handleDismissOnboarding = () => {
    localStorage.setItem(`onboarded_${rollNumber}`, "true");
    setShowOnboarding(false);
  };

  const handleBuzzTabClick = () => {
    setActiveTab("buzz");
    setBuzzDot(false);
    window.dispatchEvent(new Event("buzzRead"));
  };

  const tabClass = (tab) =>
    `px-6 py-2 font-medium transition-all duration-200 border-b-2 -mb-[2px] whitespace-nowrap
    ${activeTab === tab
      ? "border-[#26F2D0] text-[#26F2D0]"
      : "border-transparent text-gray-400 hover:text-[#26F2D0] hover:border-[#26F2D0]/50"
    }`;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pt-4 px-4 md:px-10 overflow-x-hidden">

      {/* ✅ Onboarding — only for new users, portal-based */}
      {showOnboarding && (
        <FirstUserSuggestion
          onDismiss={handleDismissOnboarding}
          onTabSelect={(tab) => {
            if (tab === "buzz") handleBuzzTabClick();
            else setActiveTab(tab);
          }}
        />
      )}





<div className="mt-6 mb-6 px-2 md:px-6">
  <div className="max-w-4xl mx-auto rounded-2xl border border-[#26F2D0]/30 
                  bg-gradient-to-br from-[#0b0b0b]/80 to-[#141414]/80
                  backdrop-blur-xl p-6 shadow-lg shadow-[#26F2D0]/20 
                  relative overflow-hidden shine-card">
    
    <div className="relative z-10 flex flex-col items-center text-center">
      <h2 className="text-xl font-semibold bg-gradient-to-r from-[#26F2D0] 
                     to-cyan-400 bg-clip-text text-transparent 
                     drop-shadow-lg animate-pulse">
        Connect with our campus
      </h2>
      
      <p className="text-gray-400 text-sm max-w-2xl mt-3 px-4 leading-relaxed 
                    animate-pulse [animation-delay:0.5s]">
        Share ideas, join clubs, discuss college topics, and collaborate — all in one place.
      </p>
    </div>
  </div>

  <style>{`
    .shine-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transform: skewX(-20deg);
      animation: shine 2.5s infinite;
      z-index: 1;
    }
    @keyframes shine {
      0% { left: -100%; opacity: 0; }
      25% { opacity: 0.6; }
      75% { opacity: 0.6; }
      100% { left: 100%; opacity: 0; }
    }
  `}</style>
</div>








      {/* Tabs */}
      <div className="flex gap-6 mb-8 border-b border-white/20 pb-3 overflow-x-auto">
        <button className={tabClass("ideas")} onClick={() => setActiveTab("ideas")}>
          Ideas
        </button>
        <button className={tabClass("clubs")} onClick={() => setActiveTab("clubs")}>
          Clubs
        </button>
        <button className={tabClass("news")} onClick={() => setActiveTab("news")}>
          Campus News
        </button>
        <button className={tabClass("buzz")} onClick={handleBuzzTabClick}>
          <span className="relative inline-flex items-center gap-1">
            📢 Campus Buzz
            {buzzDot && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </span>
        </button>
      </div>

      {activeTab === "ideas" && <IdeasBoard />}
      {activeTab === "clubs" && <Club />}
      {activeTab === "news" && <CampusNews />}
      {activeTab === "buzz" && <CampusBuzz />}
    </div>
  );
}