


// import { useState, useEffect } from "react";


// const Home = () => {
//   const [count, setCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // 🔥 FETCH COUNT ON PAGE LOAD
//   useEffect(() => {
//     fetch("http://localhost:8081/student/count")
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to fetch count");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setCount(data);
//       })
//       .catch((err) => {
//         console.error("Count fetch error:", err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);
//   return (
//     // <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[#181818] text-white ">
//     <section className="min-h-[calc(100vh-64px)]  flex flex-col items-center  justify-center text-center px-6 bg-[#181818] text-white pt-8">


//       {/* Welcome pill */}
//          {/* <div className="mb-4 px-5 py-2 rounded-full
//                 border border-[#F4A261]/40
//                 bg-[#F4A261]/10
//                 text-sm text-[#F4A261]
//                 shadow-[0_0_18px_rgba(244,162,97,0.35)]
//                 backdrop-blur-sm"
//                 >
//   ✨ Your Complete Campus Platform
// </div>
//     */}

//             {/* Main heading */}
//           <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
//         Sharing{" "}
//         <span className="text-[#457B9D]">Resources</span>.
//         <br />
//         Building{" "}
//         <span className="text-[#F4A261]">Community</span>.
//       </h1>
//       {/* Description */}
//       <p className="text-gray-400 max-w-2xl mb-12 text-base md:text-lg">
//         Access resources from above and connect with fellow students to share ideas and build a strong campus community.
//       </p>

//       {/* Stats */}
//       {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl w-full">

//         <div className="bg-[#232323] rounded-xl p-6 text-center">
//           <h2 className="text-2xl font-bold">1,200+</h2>
//           <p className="text-gray-400 text-sm mt-1">Active Members</p>
//         </div>

//         <div className="bg-[#232323] rounded-xl p-6 text-center">
//           <h2 className="text-2xl font-bold">150+</h2>
//           <p className="text-gray-400 text-sm mt-1">Ideas Shared</p>
//         </div> */}


//         <div className="flex justify-center">
//         <div className="grid grid-cols-2 gap-6 max-w-xl w-full">
//           <div className="bg-[#232323] rounded-xl p-6 text-center border border-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
//             <h2 className="text-2xl font-bold"> {loading ? "—" : count}+</h2>
//             <p className="text-gray-400 text-sm mt-1">Active Members</p>
//           </div>
//           <div className="bg-[#232323] rounded-xl p-6 text-center  border border-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
//             <h2 className="text-2xl font-bold">15+</h2>
//             <p className="text-gray-400 text-sm mt-1">Ideas Shared</p>
//           </div>
//         </div>

// {/* 
//         <div className="bg-[#232323] rounded-xl p-6 text-center">
//           <h2 className="text-2xl font-bold">12</h2>
//           <p className="text-gray-400 text-sm mt-1">Events This Month</p>
//         </div>

//         <div className="bg-[#232323] rounded-xl p-6 text-center">
//           <h2 className="text-2xl font-bold">80+</h2>
//           <p className="text-gray-400 text-sm mt-1">Discussions</p>
//         </div>
//          */}

//       </div>
      
//     </section>
  
//   );
// };


// export default Home;



//mallu new


// import { useState, useEffect } from "react";

// const Home = () => {
//   const [count, setCount] = useState(0);
//   const [ideasCount, setIdeasCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // 🔥 FETCH STUDENT COUNT
//     fetch("http://localhost:8081/student/count")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch count");
//         return res.json();
//       })
//       .then((data) => setCount(data))
//       .catch((err) => console.error("Count fetch error:", err))
//       .finally(() => setLoading(false));

//     // 🔥 FETCH IDEAS COUNT
//     fetch("http://localhost:8081/api/ideas")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch ideas");
//         return res.json();
//       })
//       .then((data) => setIdeasCount(Array.isArray(data) ? data.length : 0))
//       .catch((err) => console.error("Ideas fetch error:", err));
//   }, []);

//   return (
//     <section className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-6 bg-[#181818] text-white pt-8">

//       {/* Main heading */}
//       <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
//         Sharing{" "}
//         <span className="text-[#457B9D]">Resources</span>.
//         <br />
//         Building{" "}
//         <span className="text-[#F4A261]">Community</span>.
//       </h1>

//       {/* Description */}
//       <p className="text-gray-400 max-w-2xl mb-12 text-base md:text-lg">
//         Access resources from above and connect with fellow students to share ideas and build a strong campus community.
//       </p>

//       {/* Stats */}
//       <div className="flex justify-center">
//         <div className="grid grid-cols-2 gap-6 max-w-xl w-full">
//           <div className="bg-[#232323] rounded-xl p-6 text-center border border-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
//             <h2 className="text-2xl font-bold">
//               {loading ? "—" : `${count}+`}
//             </h2>
//             <p className="text-gray-400 text-sm mt-1">Active Members</p>
//           </div>

//           <div className="bg-[#232323] rounded-xl p-6 text-center border border-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
//             <h2 className="text-2xl font-bold">
//               {/* ✅ Real ideas count from backend */}
//               {ideasCount > 0 ? `${ideasCount}+` : "—"}
//             </h2>
//             <p className="text-gray-400 text-sm mt-1">Ideas Shared</p>
//           </div>
//         </div>
//       </div>

//     </section>
//   );
// };

// export default Home;



// import { useState, useEffect } from "react";
// import { Trophy, ExternalLink, Trash2 } from "lucide-react";

// const CATEGORY_ICONS = {
//   Tech: "/techh.png",
//   Academic: "/academic.png",
//   "Campus Pulse": "/campuspulse.png",
//   Cultural: "/cultural.png",
// };

// const CATEGORY_COLORS = {
//   Tech: "from-blue-500/20 to-blue-400/5 border-blue-400/20",
//   Academic: "from-green-500/20 to-green-400/5 border-green-400/20",
//   "Campus Pulse": "from-red-500/20 to-red-400/5 border-red-400/20",
//   Cultural: "from-yellow-500/20 to-yellow-400/5 border-yellow-400/20",
// };

// const getLinkLabel = (url) => {
//   if (!url) return "View";
//   if (url.includes("youtube") || url.includes("youtu.be")) return "▶ YouTube";
//   if (url.includes("instagram")) return "📸 Instagram";
//   if (url.includes("drive.google")) return "📁 Drive";
//   if (url.includes("linkedin")) return "💼 LinkedIn";
//   return "🔗 View";
// };

// const ShowcaseDeleteButton = ({ ideaId, token, onDeleted }) => {
//   const [confirm, setConfirm] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleDelete = async (e) => {
//     e.stopPropagation();
//     setDeleting(true);
//     setErrorMsg("");
//     try {
//       const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (res.ok) {
//         onDeleted(ideaId);
//       } else if (res.status === 403) {
//         setConfirm(false);
//         setErrorMsg("Seems you are not the one who implemented this idea.");
//         setTimeout(() => setErrorMsg(""), 3000);
//       }
//     } catch (err) {
//       console.error("Delete failed:", err);
//     } finally {
//       setDeleting(false);
//     }
//   };

//   if (confirm) {
//     return (
//       <div className="relative">
//         <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
//           <span className="text-xs text-gray-400">Remove?</span>
//           <button onClick={handleDelete} disabled={deleting}
//             className="text-xs text-red-400 font-semibold px-2 py-0.5
//                        bg-red-400/10 rounded-full hover:bg-red-400/20 transition
//                        disabled:opacity-50">
//             {deleting ? "..." : "Yes"}
//           </button>
//           <button onClick={(e) => { e.stopPropagation(); setConfirm(false); }}
//             className="text-xs text-gray-500 hover:text-white px-2 py-0.5
//                        bg-white/5 rounded-full transition">
//             No
//           </button>
//         </div>
//         {errorMsg && (
//           <div className="absolute top-8 right-0 w-52 bg-[#1a1a1a] border border-red-500/30
//                           text-red-400 text-xs rounded-xl px-3 py-2 shadow-lg z-20">
//             {errorMsg}
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="relative">
//       <button onClick={(e) => { e.stopPropagation(); setConfirm(true); }}
//         className="p-1.5 rounded-lg text-gray-600 hover:text-red-400
//                    hover:bg-red-400/10 transition-all"
//         title="Remove from showcase">
//         <Trash2 size={13} />
//       </button>
//       {errorMsg && (
//         <div className="absolute top-8 right-0 w-52 bg-[#1a1a1a] border border-red-500/30
//                         text-red-400 text-xs rounded-xl px-3 py-2 shadow-lg z-20">
//           {errorMsg}
//         </div>
//       )}
//     </div>
//   );
// };

// const Home = () => {
//   const [count, setCount] = useState(0);
//   const [ideasCount, setIdeasCount] = useState(0);
//   const [showcase, setShowcase] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = sessionStorage.getItem("token");
//   const role = sessionStorage.getItem("role");
//   const isModerator = role === "MODERATOR" || role === "ADMIN";

//   useEffect(() => {
//     fetch("http://localhost:8081/student/count")
//       .then(res => res.ok ? res.json() : 0)
//       .then(data => setCount(data))
//       .catch(err => console.error("Count fetch error:", err))
//       .finally(() => setLoading(false));

//     fetch("http://localhost:8081/api/ideas")
//       .then(res => res.ok ? res.json() : [])
//       .then(data => setIdeasCount(Array.isArray(data) ? data.length : 0))
//       .catch(err => console.error("Ideas fetch error:", err));

//     fetch("http://localhost:8081/api/ideas/showcase")
//       .then(res => res.ok ? res.json() : [])
//       .then(data => setShowcase(Array.isArray(data) ? data : []))
//       .catch(err => console.error("Showcase fetch error:", err));
//   }, []);

//   const formatDate = (dt) => {
//     if (!dt) return "";
//     return new Date(dt).toLocaleDateString("en-IN", {
//       month: "short", year: "numeric"
//     });
//   };

//   return (
//     <section className="min-h-[calc(100vh-64px)] flex flex-col items-center text-center
//                         px-6 bg-[#181818] text-white pt-16 pb-20">

//       <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
//         Sharing{" "}
//         <span className="text-[#457B9D]">Resources</span>.
//         <br />
//         Building{" "}
//         <span className="text-[#F4A261]">Community</span>.
//       </h1>

//       <p className="text-gray-400 max-w-2xl mb-12 text-base md:text-lg">
//         Access resources from above and connect with fellow students to share ideas
//         and build a strong campus community.
//       </p>

//       {/* Stats */}
//       <div className="flex justify-center mb-16 w-full">
//         <div className="grid grid-cols-2 gap-6 max-w-xl w-full">
//           <div className="bg-[#232323] rounded-xl p-6 text-center border border-white/10
//                           shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
//             <h2 className="text-2xl font-bold">{loading ? "—" : `${count}+`}</h2>
//             <p className="text-gray-400 text-sm mt-1">Active Members</p>
//           </div>
//           <div className="bg-[#232323] rounded-xl p-6 text-center border border-white/10
//                           shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
//             <h2 className="text-2xl font-bold">{ideasCount > 0 ? `${ideasCount}+` : "—"}</h2>
//             <p className="text-gray-400 text-sm mt-1">Ideas Shared</p>
//           </div>
//         </div>
//       </div>

//       {/* Showcase */}
//       {showcase.length > 0 && (
//         <div className="w-full max-w-5xl">
//           <div className="flex items-center gap-3 mb-6 justify-center">
//             <Trophy size={20} className="text-yellow-400" />
//             <h2 className="text-xl font-bold text-white">Ideas That Made It Happen</h2>
//             <Trophy size={20} className="text-yellow-400" />
//           </div>
//           <p className="text-gray-500 text-sm mb-8 -mt-3">
//             Student ideas that were reviewed and implemented by the campus team
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
//             {showcase.map(idea => {
//               const gradientClass = CATEGORY_COLORS[idea.category]
//                 || "from-gray-500/20 to-gray-400/5 border-gray-400/20";

//               // ✅ show class name for class proposals, student name otherwise
//               const proposedBy = idea.classProposal
//                 ? `🏛️ ${idea.proposalClass}`
//                 : `💡 ${idea.createdByName}`;

//               const proposedBySubtext = idea.classProposal
//                 ? `Class Proposal · ${idea.category}`
//                 : `${idea.createdByBranch} · ${idea.createdByYear}`;

//               return (
//                 <div key={idea.id}
//                   className={`relative bg-gradient-to-br ${gradientClass} border rounded-2xl
//                               overflow-hidden transition-all duration-300
//                               hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(38,242,208,0.1)]`}>

//                   {/* ✅ moderator delete — top right */}
//                   {isModerator && (
//                     <div className="absolute top-2 right-2 z-10">
//                       <ShowcaseDeleteButton
//                         ideaId={idea.id}
//                         token={token}
//                         onDeleted={(id) => setShowcase(prev => prev.filter(i => i.id !== id))}
//                       />
//                     </div>
//                   )}

//                   {/* Image or icon */}
//                   {idea.showcaseImageUrl ? (
//                     <div className="relative h-44 overflow-hidden">
//                       <img src={idea.showcaseImageUrl} alt={idea.title}
//                         className="w-full h-full object-cover" />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                       <span className="absolute bottom-3 left-3 text-xs px-2 py-0.5
//                                        bg-green-500/80 text-white rounded-full font-medium">
//                         ✅ Implemented
//                       </span>
//                     </div>
//                   ) : (
//                     <div className="h-32 flex items-center justify-center bg-white/[0.03]
//                                     border-b border-white/5">
//                       <img src={CATEGORY_ICONS[idea.category] || "/others.png"}
//                         className="w-16 h-16 object-contain opacity-60" alt="" />
//                     </div>
//                   )}

//                   {/* Card content */}
//                   <div className="p-4">
//                     <div className="flex items-start justify-between gap-2 mb-1">
//                       <p className="text-white font-bold text-sm leading-snug flex-1">
//                         {idea.title}
//                       </p>
//                       {idea.showcaseLink && (
//                         <a href={idea.showcaseLink} target="_blank"
//                           rel="noopener noreferrer"
//                           onClick={e => e.stopPropagation()}
//                           className="shrink-0 flex items-center gap-1 px-2 py-1
//                                      bg-white/10 hover:bg-[#26F2D0]/20 text-gray-400
//                                      hover:text-[#26F2D0] rounded-lg text-xs transition-all
//                                      border border-white/10 hover:border-[#26F2D0]/30
//                                      whitespace-nowrap"
//                           title={idea.showcaseLink}>
//                           {getLinkLabel(idea.showcaseLink)}
//                           <ExternalLink size={10} />
//                         </a>
//                       )}
//                     </div>

//                     <p className="text-gray-400 text-xs line-clamp-2 mb-3">
//                       {idea.description}
//                     </p>

//                     <div className="flex items-center justify-between">
//                       <div>
//                         {/* ✅ class proposal shows class name, regular shows student name */}
//                         <p className="text-xs text-gray-300 font-medium">{proposedBy}</p>
//                         <p className="text-xs text-gray-500">{proposedBySubtext}</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-xs text-[#26F2D0] font-bold">
//                           👍 {idea.likes || 0} likes
//                         </p>
//                         {idea.reviewedAt && (
//                           <p className="text-xs text-gray-600">{formatDate(idea.reviewedAt)}</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Home;





//old...

// import { useState, useEffect } from "react";
// import { Trophy } from "lucide-react";
// import HomeIdeaCard from "./HomeIdeaCard";
// import HomeAIAdvisor from "./HomeAIAdvisor";

// const Home = () => {

//   const [count, setCount] = useState(0);
//   const [ideasCount, setIdeasCount] = useState(0);
//   const [showcase, setShowcase] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = sessionStorage.getItem("token");
//   const role = sessionStorage.getItem("role");

//   const isModerator = role === "MODERATOR" || role === "ADMIN";

//   useEffect(() => {

//     fetch("http://localhost:8081/student/count")
//       .then(res => res.json())
//       .then(data => setCount(data))
//       .finally(() => setLoading(false));

//     fetch("http://localhost:8081/api/ideas")
//       .then(res => res.json())
//       .then(data => setIdeasCount(data.length));

//     fetch("http://localhost:8081/api/ideas/showcase")
//       .then(res => res.json())
//       .then(data => setShowcase(data));

//   }, []);

//   const formatDate = (dt) => {
//     return new Date(dt).toLocaleDateString("en-IN", {
//       month: "short",
//       year: "numeric",
//     });
//   };

//   return (
//     <section className="min-h-screen flex flex-col items-center text-center px-6 bg-[#181818] text-white pt-16 pb-20">

//       <h1 className="text-4xl md:text-6xl font-bold mb-8">
//         Sharing <span className="text-[#457B9D]">Resources</span>.
//         <br />
//         Building <span className="text-[#F4A261]">Community</span>.
//       </h1>

//       {/* Stats */}

//       <div className="grid grid-cols-2 gap-6 max-w-xl w-full mb-16">

//         <div className="bg-[#232323] rounded-xl p-6">
//           <h2 className="text-2xl font-bold">
//             {loading ? "—" : `${count}+`}
//           </h2>

//           <p className="text-gray-400 text-sm">
//             Active Members
//           </p>
//         </div>

//         <div className="bg-[#232323] rounded-xl p-6">
//           <h2 className="text-2xl font-bold">
//             {ideasCount}+
//           </h2>

//           <p className="text-gray-400 text-sm">
//             Ideas Shared
//           </p>
//         </div>

//       </div>

//       {showcase.length > 0 && (

//         <div className="w-full max-w-5xl">

//           <div className="flex items-center gap-3 mb-6 justify-center">
//             <Trophy size={20} className="text-yellow-400" />
//             <h2 className="text-xl font-bold">
//               Ideas That Made It Happen
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

//          {showcase.map(idea => (
//   <HomeIdeaCard
//     key={idea.id}
//     idea={idea}
//     token={token}
//     isModerator={isModerator}
//     formatDate={formatDate}
//     onDeleted={(id) =>
//       setShowcase(prev => prev.filter(i => i.id !== id))
//     }
//   />
  
// ))}
//           </div>

//         </div>

//       )}
// <HomeAIAdvisor token={token} />

//     </section>
    
//   );
// };
// export default Home;



// import { useState, useEffect } from "react";
// import { Trophy } from "lucide-react";
// import HomeIdeaCard from "./HomeIdeaCard";
// import HomeAIAdvisor from "./HomeAIAdvisor";
// import HomeClub from "./HomeClub";

// const Home = () => {

//   const [count, setCount] = useState(0);
//   const [ideasCount, setIdeasCount] = useState(0);
//   const [showcase, setShowcase] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = sessionStorage.getItem("token");
//   const role = sessionStorage.getItem("role");

//   const isModerator = role === "MODERATOR" || role === "ADMIN";
//   const [animatedCount, setAnimatedCount] = useState(0);
//   const [animatedIdeas, setAnimatedIdeas] = useState(0);
//   const [animatedClubs, setAnimatedClubs] = useState(0);


//   // 🔥 Animate Numbers
// useEffect(() => {
//   const animate = (target, setter) => {
//     let start = 0;
//     const duration = 800;
//     const stepTime = 20;
//     const increment = Math.ceil(target / (duration / stepTime));

//     const counter = setInterval(() => {
//       start += increment;
//       if (start >= target) {
//         setter(target);
//         clearInterval(counter);
//       } else {
//         setter(start);
//       }
//     }, stepTime);
//   };

//   if (!loading) {
//     animate(count, setAnimatedCount);
//     animate(ideasCount, setAnimatedIdeas);
//     animate(clubsCount || 0, setAnimatedClubs);
//   }
// }, [loading, count, ideasCount, clubsCount]);

//   useEffect(() => {

//     fetch("http://localhost:8081/student/count")
//       .then(res => res.json())
//       .then(data => setCount(data))
//       .finally(() => setLoading(false));

//     fetch("http://localhost:8081/api/ideas")
//       .then(res => res.json())
//       .then(data => setIdeasCount(data.length));

//     fetch("http://localhost:8081/api/ideas/showcase")
//       .then(res => res.json())
//       .then(data => setShowcase(data));

//   }, []);

//   const formatDate = (dt) => {
//     return new Date(dt).toLocaleDateString("en-IN", {
//       month: "short",
//       year: "numeric",
//     });
//   };

// return (
//   <section className="min-h-screen flex flex-col items-center text-center px-6 bg-[#181818] text-white pt-16 pb-24">

// <div className="mb-14 text-center">

//       <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
//         <span className="bg-gradient-to-r from-[#26F2D0] to-[#5DADE2] text-transparent bg-clip-text">
//           Welcome
//         </span>{" "}
//         {sessionStorage.getItem("name") || "Student"} 👋
//       </h1>

//       <p className="text-xl md:text-3xl text-gray-300 font-medium">
//         Sharing <span className="text-[#26F2D0]">Resources</span>.
//       </p>

//       <p className="text-xl md:text-3xl text-gray-300 font-medium mt-1">
//         Building <span className="text-[#F4A261]">Community</span>.
//       </p>

//     </div>

//     {/* 🔥 AI BUTTON */}
//     <div className="flex justify-center mb-16">
//       <HomeAIAdvisor token={token} />
//     </div>

//     {/* 🔥 PREMIUM STATS */}
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-24">

//       {/* MEMBERS */}
//       <div className="group bg-gradient-to-br from-[#1f1f1f] to-[#141414]
//         rounded-2xl p-6 border border-white/10
//         hover:scale-[1.03] transition-all duration-300
//         shadow-lg hover:shadow-[0_0_25px_rgba(38,242,208,0.15)]">

//         <div className="flex items-center gap-3 mb-3">
//           <Users className="text-[#26F2D0]" size={20} />
//           <p className="text-gray-400 text-sm">Active Members</p>
//         </div>

//         <h2 className="text-3xl font-bold">
//           {loading ? "—" : `${animatedCount}+`}
//         </h2>
//       </div>

//       {/* IDEAS */}
//       <div className="group bg-gradient-to-br from-[#1f1f1f] to-[#141414]
//         rounded-2xl p-6 border border-white/10
//         hover:scale-[1.03] transition-all duration-300
//         shadow-lg hover:shadow-[0_0_25px_rgba(244,162,97,0.2)]">

//         <div className="flex items-center gap-3 mb-3">
//           <Lightbulb className="text-[#F4A261]" size={20} />
//           <p className="text-gray-400 text-sm">Ideas Shared</p>
//         </div>

//         <h2 className="text-3xl font-bold">
//           {animatedIdeas}+
//         </h2>
//       </div>

//       {/* CLUBS */}
//       <div className="group bg-gradient-to-br from-[#1f1f1f] to-[#141414]
//         rounded-2xl p-6 border border-white/10
//         hover:scale-[1.03] transition-all duration-300
//         shadow-lg hover:shadow-[0_0_25px_rgba(93,173,226,0.2)]">

//         <div className="flex items-center gap-3 mb-3">
//           <Layers className="text-[#5DADE2]" size={20} />
//           <p className="text-gray-400 text-sm">Active Clubs</p>
//         </div>

//         <h2 className="text-3xl font-bold">
//           {animatedClubs}+
//         </h2>
//       </div>

//     </div>

    

//     {/* 🔥 CLUBS SECTION */}
//     <div className="w-full max-w-6xl mt-10">
//       <HomeClub isModerator={isModerator} />
//     </div>

//   </section>
// );
// };

// export default Home;





import { useState, useEffect, useCallback } from "react";
import { Trophy, Users, Lightbulb, Layers } from "lucide-react";
import HomeIdeaCard from "./HomeIdeaCard";
import HomeAIAdvisor from "./HomeAIAdvisor";
import HomeClub from "./HomeClub";


const Home = () => {
  const [count, setCount] = useState(0);
  const [ideasCount, setIdeasCount] = useState(0);
  const [clubsCount, setClubsCount] = useState(0);
  const [showcase, setShowcase] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  const userName = sessionStorage.getItem("name") || "Student";

  const isModerator = role === "MODERATOR" || role === "ADMIN";
  const [animatedCount, setAnimatedCount] = useState(0);
  const [animatedIdeas, setAnimatedIdeas] = useState(0);
  const [animatedClubs, setAnimatedClubs] = useState(0);

  // 🔥 Animate Numbers

// 🔥 Perfect Speed Animation (1.5s)
useEffect(() => {
  const animate = (target, setter) => {
    let start = 0;
    const duration = 1500;  // 1.5s – just right ✨
    const stepTime = 25;    // Balanced smoothness
    const steps = duration / stepTime;
    const increment = target / steps;

    const counter = setInterval(() => {
      start += increment * 1.03;  // Gentle easing
      if (start >= target) {
        setter(target);
        clearInterval(counter);
      } else {
        setter(Math.floor(start));
      }
    }, stepTime);
  };

  if (!loading) {
    animate(count, setAnimatedCount);
    animate(ideasCount, setAnimatedIdeas);
    animate(clubsCount, setAnimatedClubs);
  }
}, [loading, count, ideasCount, clubsCount]);


  // 🔥 Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [countRes, ideasRes, showcaseRes, clubsRes] = await Promise.all([
          fetch("http://localhost:8081/student/count"),
          fetch("http://localhost:8081/api/ideas"),
          fetch("http://localhost:8081/api/ideas/showcase"),
          fetch("http://localhost:8081/api/clubs/count")  // Add your clubs endpoint
        ]);

        const countData = await countRes.json();
        setCount(countData);

        const ideasData = await ideasRes.json();
        setIdeasCount(ideasData.length);

        const showcaseData = await showcaseRes.json();
        setShowcase(showcaseData);

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
      year: "numeric",
    });
  }, []);

  const handleIdeaDelete = useCallback((id) => {
    setShowcase(prev => prev.filter(i => i.id !== id));
  }, []);

  return (
 <section className="min-h-screen flex flex-col items-center text-center px-6 bg-[#181818] text-white pt-16 pb-24 relative overflow-hidden z-10">
    
    {/* 🔥 PREMIUM 3D ANIMATED BACKGROUND - Same as About */}
<style>{`
  @import url('https://fonts.googleapis.com/css2?family=New+Rocker&display=swap');

  .font-rocker {
    font-family: 'New Rocker', system-ui;
    letter-spacing: 0.5px; /* keep tight */
  }

  @keyframes float-slow {
    0% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -50px) rotate(10deg); }
    66% { transform: translate(-20px, 20px) rotate(-10deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
  }

  @keyframes pulse-glow {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.2); }
  }

  .animate-float { animation: float-slow 15s infinite ease-in-out; }
  .animate-pulse-slow { animation: pulse-glow 8s infinite ease-in-out; }

  @media (max-width: 640px) {
    .mobile-safe-bg > * { 
      transform: scale(0.6) !important; 
      opacity: 0.1 !important; 
    }
    .mobile-safe-bg svg { width: 60px !important; height: 60px !important; }
  }
`}</style>


    {/* ===== 3D DYNAMIC BACKGROUND ===== */}
    <div className="fixed inset-0 pointer-events-none z-0 mobile-safe-bg">
      {/* Floating Glass Orb 1 */}
      <div className="absolute top-[10%] left-[15%] w-64 h-64 bg-[#26F2D0]/20 rounded-full blur-[100px] animate-pulse-slow" />
      
      {/* Floating Triangle - Your brand color */}
      <div className="absolute top-[20%] right-[10%] animate-float" style={{ animationDelay: '0s' }}>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="opacity-30">
          <path d="M50 10L90 80H10L50 10Z" stroke="#26F2D0" strokeWidth="1" fill="url(#grad1)" />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#26F2D0', stopOpacity:0.5}} />
              <stop offset="100%" style={{stopColor:'transparent', stopOpacity:0}} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating Orb 2 */}
      <div className="absolute bottom-[20%] right-[20%] w-80 h-80 bg-[#F4A261]/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* 3D Wireframe Cube */}
      <div className="absolute bottom-[10%] left-[10%] animate-float" style={{ animationDuration: '20s', animationDelay: '4s' }}>
         <div className="w-20 h-20 border border-[#5DADE2]/40 rotate-45 backdrop-blur-sm bg-white/5 rounded-lg" />
      </div>

      {/* Floating Rings */}
      <div className="absolute top-[50%] left-[5%] animate-float opacity-20" style={{ animationDuration: '12s' }}>
         <div className="w-32 h-32 border-2 border-[#26F2D0] rounded-full border-dashed" />
      </div>
    </div>

    {/* 🔥 Your existing Hero Section continues here */}





      {/* 🔥 Hero Section */}
      <div className="mb-14 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
          <span className="bg-gradient-to-r from-[#26F2D0] to-[#5DADE2] text-transparent bg-clip-text">
            Welcome
          </span>{" "}
          {userName}!
        </h1>

<p className="text-xl md:text-2xl text-gray-300 font-rocker leading-snug">
  Sharing <span className="text-[#26F2D0]">Resources</span>.
</p>

<p className="text-xl md:text-2xl text-gray-300 font-rocker leading-snug mt-2">
  Building <span className="text-[#F4A261]">Community</span>.
</p>

      </div>

      {/* 🔥 AI BUTTON */}
      <div className="flex justify-center mb-16">
        <HomeAIAdvisor token={token} />
      </div>

      {/* 🔥 PREMIUM STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-24">
        {/* MEMBERS */}
        <div className="group bg-gradient-to-br from-[#1f1f1f] to-[#141414]
          rounded-2xl p-6 border border-white/10
          hover:scale-[1.03] transition-all duration-300
          shadow-lg hover:shadow-[0_0_25px_rgba(38,242,208,0.15)]">
          <div className="flex items-center gap-3 mb-3">
            <Users className="text-[#26F2D0]" size={20} />
            <p className="text-gray-400 text-sm">Active Members</p>
          </div>
          <h2 className="text-3xl font-bold">
            {loading ? "—" : `${animatedCount.toLocaleString()}+`}
          </h2>
        </div>

        {/* IDEAS */}
        <div className="group bg-gradient-to-br from-[#1f1f1f] to-[#141414]
          rounded-2xl p-6 border border-white/10
          hover:scale-[1.03] transition-all duration-300
          shadow-lg hover:shadow-[0_0_25px_rgba(244,162,97,0.2)]">
          <div className="flex items-center gap-3 mb-3">
            <Lightbulb className="text-[#F4A261]" size={20} />
            <p className="text-gray-400 text-sm">Ideas Shared</p>
          </div>
          <h2 className="text-3xl font-bold">
            {loading ? "—" : `${animatedIdeas.toLocaleString()}+`}
          </h2>
        </div>

        {/* CLUBS */}
        <div className="group bg-gradient-to-br from-[#1f1f1f] to-[#141414]
          rounded-2xl p-6 border border-white/10
          hover:scale-[1.03] transition-all duration-300
          shadow-lg hover:shadow-[0_0_25px_rgba(93,173,226,0.2)]">
          <div className="flex items-center gap-3 mb-3">
            <Layers className="text-[#5DADE2]" size={20} />
            <p className="text-gray-400 text-sm">Active Clubs</p>
          </div>
          <h2 className="text-3xl font-bold">
            {loading ? "—" : `${animatedClubs.toLocaleString()}+`}
          </h2>
        </div>
      </div>

      {/* 🔥 IDEAS SHOWCASE */}
{/* 🔥 IDEAS SHOWCASE - FIXED */}
{showcase.length > 0 && (
  <div className="w-full max-w-6xl mb-16">
    <div className="flex flex-col items-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#26F2D0] to-[#5DADE2] bg-clip-text text-transparent mb-4">
        Featured Ideas
      </h2>
      <p className="text-xl text-gray-400 max-w-2xl">
        Discover innovative projects and resources shared by our community
      </p>
    </div>
    
    {/* ✅ ONE SINGLE STACK */}
    {/* <div className="flex justify-center mb-24">
      <HomeIdeaCard
        ideas={showcase.slice(0, 5)}  // Use up to 5 cards
        token={token}
        isModerator={isModerator}
        formatDate={formatDate}
        onDeleted={(id) =>
          setShowcase(prev => prev.filter(i => i.id !== id))
        }
      />
    </div> */}

<div className="w-full flex justify-center mb-24">
  <HomeIdeaCard
    ideas={showcase}
    token={token}
    isModerator={isModerator}
    formatDate={formatDate}
    onDeleted={(id) =>
      setShowcase(prev => prev.filter(i => i.id !== id))
    }
  />
</div>
  </div>
)}


      {/* 🔥 CLUBS SECTION */}
      <div className="w-full max-w-6xl mt-10">
        <HomeClub isModerator={isModerator} />
      </div>
    </section>
  );
};

export default Home;
