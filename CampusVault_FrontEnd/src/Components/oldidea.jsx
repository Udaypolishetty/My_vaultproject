
// import React, { useState, useEffect } from "react";
// import IdeaForm from "./IdeaForm";

// export default function IdeasBoard() {
// const student = JSON.parse(localStorage.getItem("studentProfile") || "{}");


//   const [showForm, setShowForm] = useState(false);
//   const [ideas, setIdeas] = useState([]);
//   const [activeCommentId, setActiveCommentId] = useState(null);
//   const [activeFilter, setActiveFilter] = useState("All");

//   const [commentForm, setCommentForm] = useState({   
//     text: ""
//   });

//   useEffect(() => {
//     fetch("http://localhost:8081/api/ideas")
//       .then(res => res.json())
//       .then(data => setIdeas(data));
//   }, []);

//   const handleCommentChange = (e) => {
//     setCommentForm({ text: e.target.value });
//   };
//   const submitComment = async (ideaId) => {
//     if (!commentForm.text || !student) return;

//     const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}/comment`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         text: commentForm.text,
//         name: student.name,
//         year: student.year,
//         branch: student.branch,
//         rollNo: student.rollNo
//       })
//     });

//     const updated = await res.json();
//     setIdeas(ideas.map(i => i.id === updated.id ? updated : i));

//     setCommentForm({ text: "" });
//     setActiveCommentId(null);
//   };

//   return (
//     <>
//       {/* Header */}
//       <div className="bg-gradient-to-r from-[#0b0b0b] to-[#141414]
//                       border border-white/5 rounded-2xl p-6
//                       flex flex-col md:flex-row md:items-center md:justify-between
//                       gap-6 shadow-lg">
//         <div className="flex items-start gap-4">
//           <div className="bg-[#26F2D0]/20 text-[#26F2D0] p-3 rounded-xl">💡</div>
//           <div>
//             <h2 className="text-2xl font-bold">Ideas Board</h2>
//             <p className="text-gray-400 text-sm">
//               Share and support student initiatives
//             </p>
//           </div>
//         </div>

//         <button
//           className="bg-[#26F2D0] text-black px-5 py-2 rounded-xl font-semibold hover:bg-[#e6953c]"
//           onClick={() => setShowForm(true)}
//         >
//           + Post an Idea
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="mt-6 flex items-center gap-3">
//         <span className="text-gray-500 text-sm">Filter:</span>

//         {["All", "Tech", "Academic", "Campus Pulse", "Cultural"].map(cat => (
//           <button
//             key={cat}
//             onClick={() => setActiveFilter(cat)}
//             className={`px-4 py-2 rounded-full text-sm ${
//               activeFilter === cat
//                 ? "bg-[#26F2D0] text-black"
//                 : "bg-[#232323] text-gray-300 hover:bg-[#2a2a2a]"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
//         {ideas
//           .filter(i => activeFilter === "All" || i.category === activeFilter)
//           .map((idea) => (
//             <div key={idea.id} className="bg-[#111] p-6 rounded-xl">

//               <h3 className="font-bold">{idea.title}</h3>
//               <p className="text-gray-400">{idea.description}</p>

//               <div className="flex justify-between mt-3 text-sm">
//                 <span> {idea.name} · {idea.branch} · {idea.year}</span>

//                 <button
//                   onClick={() => setActiveCommentId(idea.id)}
//                 >
//                   💬 {idea.comments.length}
//                 </button>
//               </div>

//               {activeCommentId === idea.id && (
//                 <div className="mt-3">
//                   <textarea
//                     value={commentForm.text}
//                     onChange={handleCommentChange}
//                     placeholder="Your comment..."
//                     className="w-full p-2 bg-[#222] rounded"
//                   />

//                   <button
//                     onClick={() => submitComment(idea.id)}
//                     className="bg-[#26F2D0] text-black px-4 py-1 rounded mt-2"
//                   >
//                     Post
//                   </button>
//                 </div>
//               )}

//             {idea.comments.map(c => (
//   <div key={c._id || c.text} className="text-sm text-gray-300">
//     <b>{c.name}</b> ({c.branch} · {c.year})  
//     <div>{c.text}</div>
//   </div>
// ))}

//             </div>
//           ))}
//       </div>
//       {showForm && (
//         <IdeaForm
//   onClose={() => setShowForm(false)}
//   onSubmit={async (newIdea) => {
//     const student = JSON.parse(localStorage.getItem("studentProfile"));

//     const finalIdea = {
//       ...newIdea,
//       name: student.name,
//       year: student.year,
//       branch: student.branch,
//       roll: student.roll
//     };

//     const res = await fetch("http://localhost:8081/api/ideas", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(finalIdea)
//     });

//     const saved = await res.json();
//     setIdeas([saved, ...ideas]);
//     setShowForm(false);
//   }}
// />

//       )}
//     </>
//   );
// }


// import React, { useEffect, useState } from "react";
// import IdeaForm from "./IdeaForm";
// import IdeaCard from "./IdeaCard";

// export default function IdeasBoard() {
//    const timeAgo = (timestamp) => {
//   if (!timestamp) return "Just now";

//   const seconds = Math.floor((Date.now() - timestamp) / 1000);

//   if (seconds < 60) return "Just now";
//   if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
//   if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;

//   return `${Math.floor(seconds / 86400)}d ago`;
// };


//   const student = JSON.parse(localStorage.getItem("studentProfile") || "{}");

//   const [showForm, setShowForm] = useState(false);
//   const [ideas, setIdeas] = useState([]);
//   const [activeFilter, setActiveFilter] = useState("All");

//   useEffect(() => {
//     fetch("http://localhost:8081/api/ideas")
//       .then(res => res.json())
//       .then(data => setIdeas(data));
//   }, []);
// const [activeIdeaId, setActiveIdeaId] = useState(null);
//   return (
//     <>
//       {/* Header */}
//       <div className="bg-gradient-to-r from-[#0b0b0b] to-[#141414]
//                       border border-white/5 rounded-2xl p-6
//                       flex flex-col md:flex-row md:items-center md:justify-between
//                       gap-6 shadow-lg">
//         <div className="flex items-start gap-4">
//           <div className="bg-[#26F2D0]/10 text-[#26F2D0] p-3 rounded-xl">💡</div>
//           <div>
//             <h2 className="text-2xl font-bold">Ideas Board</h2>
//             <p className="text-gray-400 text-sm">
//               Share and support student initiatives
//             </p>
//           </div>
//         </div>

//         <button
//           className="bg-[#26F2D0] text-black px-5 py-2 rounded-xl font-semibold"
//           onClick={() => setShowForm(true)}
//         >
//           + Post an Idea
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="mt-6 flex items-center gap-3">
//         {["All", "Tech", "Academic", "Campus Pulse", "Cultural","Others"].map(cat => (
//           <button
//             key={cat}
//             onClick={() => setActiveFilter(cat)}
//             className={`px-4 py-2 rounded-full text-sm ${
//               activeFilter === cat
//                 ? "bg-[#26F2D0] text-black"
//                 : "bg-[#232323] text-gray-300"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Grid */}
//       {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8"> */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 items-start">

//         {ideas
//           .filter(i => activeFilter === "All" || i.category === activeFilter)
//           .map(idea => (
//             <IdeaCard
//               key={idea._id}
//               idea={idea}
//               student={student}
//               ideas={ideas}
//               setIdeas={setIdeas}
//             />
//           ))}
//       </div>

//       {showForm && (
//         <IdeaForm
//           onClose={() => setShowForm(false)}
//           onSubmit={async (newIdea) => {
//             const finalIdea = {
//               ...newIdea,
//               name: student.name,
//               year: student.year,
//               branch: student.branch
//             };

//             const res = await fetch("http://localhost:8081/api/ideas", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify(finalIdea)
//             });

//             const saved = await res.json();
//             setIdeas([saved, ...ideas]);
//             setShowForm(false);
//           }}
//         />
//       )}
//     </>
//   );
// }


//CLAUDE

// import React, { useEffect, useState } from "react";
// import IdeaForm from "./IdeaForm";
// import IdeaCard from "./IdeaCard";

// export default function IdeasBoard() {
//   const timeAgo = (timestamp) => {
//     if (!timestamp) return "Just now";
//     const seconds = Math.floor((Date.now() - timestamp) / 1000);
//     if (seconds < 60) return "Just now";
//     if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
//     if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
//     return `${Math.floor(seconds / 86400)}d ago`;
//   };

//   const student = JSON.parse(localStorage.getItem("studentProfile") || "{}");
//   const token = localStorage.getItem("token");

//   const [showForm, setShowForm] = useState(false);
//   const [ideas, setIdeas] = useState([]);
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [activeIdeaId, setActiveIdeaId] = useState(null);
//   const [loading, setLoading] = useState(true); // ✅ already there
//   const [showRules, setShowRules] = useState(false);

//   useEffect(() => {
//     fetch("http://localhost:8081/api/ideas", {
//       method: "GET",
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "Content-Type": "application/json"
//       }
//     })
    





//       .then(res => {
//         if (!res.ok) {
//           console.error("Failed to fetch ideas:", res.status);
//           return [];
//         }
//         return res.json();
//       })
//       .then(data => {
//         setIdeas(data);
//         setLoading(false); // ✅ added
//       })
//       .catch(err => {
//         console.error("Error fetching ideas:", err);
//         setLoading(false); // ✅ added
//       });
//   }, []);

//   return (
//     <div className="w-full bg-[#0f0f0f] text-white">

//       {/* Header */}
//       <div className="bg-gradient-to-r from-[#0b0b0b] to-[#141414]
//                       border border-white/5 rounded-2xl p-4 md:p-6
//                       flex flex-col md:flex-row md:items-center md:justify-between
//                       gap-4 shadow-lg">
//         <div className="flex items-start gap-4">
//           <div className="bg-[#26F2D0]/10 text-[#26F2D0] p-3 rounded-xl">💡</div>
//           <div className="text-left">
//             {/* <h2 className="text-xl md:text-2xl font-bold">Ideas Board </h2> */}
//             <div className="flex items-center gap-2">
//             <h2 className="text-xl md:text-2xl font-bold">Ideas Board</h2>

//             <button
//               onClick={() => setShowRules(true)}
//               className="w-6 h-6 flex items-center justify-center rounded-full 
//                         bg-white/10 text-gray-400 text-xs
//                         hover:bg-[#26F2D0]/20 hover:text-[#26F2D0]
//                         transition"
//             >
//               ⓘ
//             </button>
//           </div>

//             <p className="text-gray-400 text-sm">
//               Share and support student initiatives
//             </p>
//           </div>
//         </div>

//         <button
//           className="bg-[#26F2D0] text-black px-5 py-2 rounded-xl font-semibold w-full md:w-auto"
//           onClick={() => setShowForm(true)}
//         >
//           + Post an Idea
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="mt-6 flex flex-wrap items-center gap-2">
//         {["All", "Tech", "Academic", "Campus Pulse", "Cultural", "Others"].map(cat => (
//           <button
//             key={cat}
//             onClick={() => setActiveFilter(cat)}
//             className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
//               activeFilter === cat
//                 ? "bg-[#26F2D0] text-black"
//                 : "bg-[#232323] text-gray-300"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Grid — ✅ loading state added */}
//       {loading ? (
//         <div className="flex items-center justify-center h-64">
//           <p className="text-gray-400 text-lg">Loading ideas...</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 items-start pb-10">
//           {ideas
//             .filter(i => activeFilter === "All" || i.category === activeFilter)
//             .map(idea => (
//               <IdeaCard
//                 key={idea._id}
//                 idea={idea}
//                 student={student}
//                 ideas={ideas}
//                 setIdeas={setIdeas}
//               />
//             ))}
//         </div>
//       )}

//       {showForm && (
//         <IdeaForm
//           onClose={() => setShowForm(false)}
//           onSubmit={async (newIdea) => {
//             const finalIdea = {
//               ...newIdea,
//               name: student.name,
//               year: student.year,
//               branch: student.branch
//             };

//             const res = await fetch("http://localhost:8081/api/ideas", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//               },
//               body: JSON.stringify(finalIdea)
//             });

//             if (!res.ok) {
//               console.error("Failed to post idea:", res.status);
//               return;
//             }

//             const saved = await res.json();
//             setIdeas([saved, ...ideas]);
//             setShowForm(false);
//           }}
//         />
//       )}
//     </div>
//   );
// }

//chat...


// import React, { useEffect, useState } from "react";
// import IdeaForm from "./IdeaForm";
// import IdeaCard from "./IdeaCard";

// export default function IdeasBoard() {

//   const student = JSON.parse(localStorage.getItem("studentProfile") || "{}");
//   const token = localStorage.getItem("token");

//   const [showForm, setShowForm] = useState(false);
//   const [ideas, setIdeas] = useState([]);
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [activeIdeaId, setActiveIdeaId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showRules, setShowRules] = useState(false); // ✅ NEW

//   // ===== FETCH IDEAS =====
//   useEffect(() => {
//     fetch("http://localhost:8081/api/ideas", {
//       method: "GET",
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "Content-Type": "application/json"
//       }
//     })
//       .then(res => {
//         if (!res.ok) {
//           console.error("Failed to fetch ideas:", res.status);
//           return [];
//         }
//         return res.json();
//       })
//       .then(data => {
//         setIdeas(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Error fetching ideas:", err);
//         setLoading(false);
//       });
//   }, []);

//   // ===== AUTO SHOW RULES ONCE PER USER =====
//   useEffect(() => {
//     if (!student?.email) return;

//     const key = `ideasRulesSeen_${student.email}`;
//     const hasSeenRules = localStorage.getItem(key);

//     if (!hasSeenRules) {
//       setShowRules(true);
//       localStorage.setItem(key, "true");
//     }
//   }, [student]);

//   return (
//     <div className="w-full bg-[#0f0f0f] text-white">

//       {/* ================= HEADER ================= */}
//       <div className="bg-gradient-to-r from-[#0b0b0b] to-[#141414]
//                       border border-white/5 rounded-2xl p-4 md:p-6
//                       flex flex-col md:flex-row md:items-center md:justify-between
//                       gap-4 shadow-lg">

//         <div className="flex items-start gap-4">
//           <div className="bg-[#26F2D0]/10 text-[#26F2D0] p-3 rounded-xl">💡</div>

//           <div className="text-left">
//             <div className="flex items-center gap-2">
//               <h2 className="text-xl md:text-2xl font-bold">
//                 Ideas Board
//               </h2>

//               {/* ⓘ Info Button */}
//               <button
//                 onClick={() => setShowRules(true)}
//                 className="w-6 h-6 flex items-center justify-center rounded-full 
//                            bg-white/10 text-gray-400 text-xs
//                            hover:bg-[#26F2D0]/20 hover:text-[#26F2D0]
//                            transition"
//               >
//                 ⓘ
//               </button>
//             </div>

//             <p className="text-gray-400 text-sm">
//               Share and support student initiatives
//             </p>
//           </div>
//         </div>

//         <button
//           className="bg-[#26F2D0] text-black px-5 py-2 rounded-xl font-semibold w-full md:w-auto"
//           onClick={() => setShowForm(true)}
//         >
//           + Post an Idea
//         </button>
//       </div>

//       {/* ================= FILTERS ================= */}
//       <div className="mt-6 flex flex-wrap items-center gap-2">
//         {["All", "Tech", "Academic", "Campus Pulse", "Cultural", "Others"].map(cat => (
//           <button
//             key={cat}
//             onClick={() => setActiveFilter(cat)}
//             className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
//               activeFilter === cat
//                 ? "bg-[#26F2D0] text-black"
//                 : "bg-[#232323] text-gray-300"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>
// {/* ================= IDEAS GRID ================= */}
// {loading ? (
//   <div className="flex items-center justify-center h-64">
//     <p className="text-gray-400 text-lg">Loading ideas...</p>
//   </div>
// ) : (
//   <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 items-start pb-10">
//     {ideas.filter(i => activeFilter === "All" || i.category === activeFilter).length === 0 ? (
//       <div className="col-span-3 flex flex-col items-center justify-center h-64 text-center">
//         <p className="text-4xl mb-4">💡</p>
//         <p className="text-gray-400 text-lg">No ideas yet.</p>
//         <p className="text-gray-500 text-sm mt-1">Be the first to post an idea!</p>
//       </div>
//     ) : (
//       ideas
//         .filter(i => activeFilter === "All" || i.category === activeFilter)
//         .map(idea => (
//           <IdeaCard
//             key={idea._id}
//             idea={idea}
//             student={student}
//             ideas={ideas}
//             setIdeas={setIdeas}
//           />
//         ))
//     )}
//   </div>
// )}

//       {/* ================= IDEA FORM ================= */}
//       {showForm && (
//         <IdeaForm
//           onClose={() => setShowForm(false)}
//           onSubmit={async (newIdea) => {
//             // ✅ to this
//         const finalIdea = { ...newIdea };

//             const res = await fetch("http://localhost:8081/api/ideas/create", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//               },
//               body: JSON.stringify(finalIdea)
//             });

//             if (!res.ok) {
//               console.error("Failed to post idea:", res.status);
//               return;
//             }

//             const saved = await res.json();
//             setIdeas([saved, ...ideas]);
//             setShowForm(false);
//           }}
//         />
//       )}

//       {/* ================= RULES MODAL ================= */}
//      {showRules && (
//   <div
//     className="fixed inset-0 bg-black/60 backdrop-blur-sm 
//                flex items-center justify-center z-50 px-4"
//     onClick={() => setShowRules(false)}
//   >
//     <div
//       className="bg-[#161616] border border-white/10
//                  rounded-2xl p-8 max-w-md w-full"
//       onClick={(e) => e.stopPropagation()}
//     >
//       <h3 className="text-xl font-semibold mb-6 text-white">
//         Ideas Board Guidelines
//       </h3>

//       <ol className="space-y-4 text-gray-300 text-sm leading-relaxed list-decimal list-inside">
//         <li>
//           Ideas must be relevant to campus activities or student development.
//         </li>
//         <li>
//           Only one idea submission is allowed per day.
//         </li>
//         <li>
//           Avoid spamming through excessive comments or likes. System limits are enforced.
//         </li>
//         <li>
//           Misuse of the platform may result in restrictions or profile removal.
//         </li>
//         <li>
//           Encourage constructive discussions and support meaningful initiatives.
//         </li>
//       </ol>

//       <button
//         onClick={() => setShowRules(false)}
//         className="mt-8 w-full bg-[#26F2D0] text-black py-2 rounded-xl font-medium
//                    hover:bg-[#1edbbd] transition"
//       >
//         Understood
//       </button>
//     </div>
//   </div>
// )}

//     </div>
//   );
// }

//new mallu..

// import React, { useEffect, useState } from "react";
// import IdeaForm from "./IdeaForm";
// import IdeaCard from "./IdeaCard";
// import IdeaRulesModal from "./IdeaRulesModal";

// export default function IdeasBoard() {
// const token = sessionStorage.getItem("token");
// const student = {
//   name: sessionStorage.getItem("name"),
//   rollNumber: sessionStorage.getItem("rollNumber"),
//   id: sessionStorage.getItem("id"),
//   email: sessionStorage.getItem("Email"),
// };
// const myId = sessionStorage.getItem("id");

//   // ✅ Key cooldown by student id so each student has their own cooldown
//   const cooldownKey = `lastIdeaPostedAt_${myId}`;

//   const [showForm, setShowForm] = useState(false);
//   const [ideas, setIdeas] = useState([]);
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [postError, setPostError] = useState("");
//   const [showRules, setShowRules] = useState(false);

//   useEffect(() => {
//     if (!token || !myId) {
//       window.location.href = "/";
//       return;
//     }

//     fetch("http://localhost:8081/api/ideas")
//       .then(res => res.json())
//       .then(data => setIdeas(data))
//       .catch(err => console.error("Failed to fetch ideas:", err));
//   }, []);

//   // ✅ Restore cooldown message on refresh — scoped to this student
//   useEffect(() => {
//     if (!myId) return;
//     const lastPostedAt = localStorage.getItem(cooldownKey);
//     if (!lastPostedAt) return;

//     const diff = new Date() - new Date(lastPostedAt);
//     const ms48 = 48 * 60 * 60 * 1000;

//     if (diff < ms48) {
//       const remaining = getTimeRemaining(lastPostedAt);
//       setPostError(
//         `You can post another idea after 48 hours.${remaining ? ` Try again in ${remaining}.` : ""}`
//       );
//     } else {
//       localStorage.removeItem(cooldownKey); // expired — clean up
//     }
//   }, []);

//   //new useefect...
// useEffect(() => {
//   if (!myId || !token) return;

//   fetch("http://localhost:8081/api/ideas")
//     .then(res => res.json())
//     .then(data => {
//       const myRecentIdea = data.find(idea => {
//         const isMe = String(idea.createdById) === String(myId);
//         if (!isMe) return false;
//         const diff = new Date() - new Date(idea.createdAt);
//         return diff < 48 * 60 * 60 * 1000;
//       });

//       if (myRecentIdea) {
//         localStorage.setItem(cooldownKey, myRecentIdea.createdAt);
//         const remaining = getTimeRemaining(myRecentIdea.createdAt);
//         setPostError(`You can post another idea after 48 hours.${remaining ? ` Try again in ${remaining}.` : ""}`);
//       } else {
//         localStorage.removeItem(cooldownKey); // ✅ clear if no recent idea found
//         setPostError(""); // ✅ clear error message too
//       }
//     })
//     .catch(err => console.error("Cooldown check failed:", err));
// }, [myId]);


//   const isWithin48Hours = (dateStr) => {
//     if (!dateStr) return false;
//     return new Date() - new Date(dateStr) < 48 * 60 * 60 * 1000;
//   };

//   const getTimeRemaining = (fromDate) => {
//     if (!fromDate) return "";
//     const unlock = new Date(new Date(fromDate).getTime() + 48 * 60 * 60 * 1000);
//     const diff = unlock - new Date();
//     if (diff <= 0) return "";
//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     return `${hours}h ${minutes}m`;
//   };

//   // ✅ canPost scoped to this student's cooldown key
//   const lastPostedAt = localStorage.getItem(cooldownKey);
//   const canPost = !lastPostedAt || !isWithin48Hours(lastPostedAt);

//   // ✅ fix — show rules first
// const handlePostClick = () => {
//   if (!canPost) {
//     const remaining = getTimeRemaining(lastPostedAt);
//     setPostError(`You can post another idea after 48 hours.${remaining ? ` Try again in ${remaining}.` : ""}`);
//     return;
//   }
//   setPostError("");
//   setShowRules(true); // ✅ show rules first
// };

//   const filteredIdeas = ideas
//     .filter(i => activeFilter === "All" || i.category === activeFilter)
//     .sort((a, b) => {
//       const isMyA = String(a.createdById) === String(myId);
//       const isMyB = String(b.createdById) === String(myId);
//       if (isMyA && !isMyB) return -1;
//       if (!isMyA && isMyB) return 1;
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     });

//   return (
//     <>
//       {/* Header */}
//       <div className="bg-gradient-to-r from-[#0b0b0b] to-[#141414]
//                       border border-white/5 rounded-2xl p-6
//                       flex flex-col md:flex-row md:items-center md:justify-between
//                       gap-6 shadow-lg">
//         <div className="flex items-start gap-4">
//           <div className="bg-[#26F2D0]/10 text-[#26F2D0] p-3 rounded-xl">💡</div>
//           <div>
//             <h2 className="text-2xl font-bold">Ideas Board</h2>
//             <p className="text-gray-400 text-sm">Share and support student initiatives</p>

//             {postError && (
//               <p className={`text-xs mt-1 flex items-center gap-1 ${
//                 postError.startsWith("Idea posted")
//                   ? "text-[#26F2D0]"
//                   : "text-red-400"
//               }`}>
//                 {postError.startsWith("Idea posted") ? "✅" : "⚠️"} {postError}
//               </p>
//             )}
//           </div>
//         </div>

//         <button
//           onClick={handlePostClick}
//           className={`px-5 py-2 rounded-xl font-semibold transition-all ${
//             canPost
//               ? "bg-[#26F2D0] text-black hover:bg-[#1fd4b8]"
//               : "bg-[#26F2D0]/30 text-gray-500 cursor-not-allowed"
//           }`}
//         >
//           + Post an Idea
//         </button>
//       </div>

//       {/* Filters */}
// <div className="mt-6 flex flex-wrap items-center gap-2">
//         {["All", "Tech", "Academic", "Campus Pulse", "Cultural", "Others"].map(cat => (
//           <button
//             key={cat}
//             onClick={() => setActiveFilter(cat)}
//             className={`px-4 py-2 rounded-full text-sm ${
//               activeFilter === cat ? "bg-[#26F2D0] text-black" : "bg-[#232323] text-gray-300"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//      {/* Ideas Grid */}
// <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 items-start">
//   {filteredIdeas.length === 0 ? (
//     <div className="col-span-3 flex flex-col items-center justify-center h-64 text-center">
//       <p className="text-4xl mb-4">💡</p>
//       <p className="text-white text-lg font-semibold">No ideas yet.</p>
//       <p className="text-gray-400 text-sm mt-2 max-w-sm">
//         Be the first to share an idea for campus wellbeing and student growth. Your idea could spark something great!
//       </p>
//     </div>
//   ) : (
//     filteredIdeas.map(idea => (
//       <IdeaCard
//         key={idea.id}
//         idea={idea}
//         student={student}
//         ideas={ideas}
//         setIdeas={setIdeas}
//       />
//     ))
//   )}
// </div>
// {showRules && (
//   <IdeaRulesModal
//     onClose={() => setShowRules(false)}
//     onContinue={() => {
//       setShowRules(false);
//       setShowForm(true);
//     }}
//   />
// )}

//       {showForm && (
//         <IdeaForm
//           student={student}
//           onClose={() => setShowForm(false)}
//           onSubmit={async (newIdea) => {
//             const res = await fetch("http://localhost:8081/api/ideas/create", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//               body: JSON.stringify(newIdea)
//             });

           
//   if (!res.ok) {
//   // ✅ read as text first, not json
//   const errText = await res.text();
//   throw new Error(errText || "Failed to post idea");
// }

//             const saved = await res.json();

//             // ✅ Save cooldown under this student's unique key
//             const postedAt = saved.createdAt || new Date().toISOString();
//             localStorage.setItem(cooldownKey, postedAt);

//             setIdeas(prev => [{
//               ...saved,
//               createdByName: student?.name || saved.createdByName,
//               createdById: myId || saved.createdById,
//             }, ...prev]);

//             setShowForm(false);

//             const remaining = getTimeRemaining(postedAt);
//             setPostError(
//               `Idea posted! You can post another after 48 hours.${remaining ? ` Next post available in ${remaining}.` : ""}`
//             );
//           }}
//         />
//       )}
//     </>
//   );
// }


//bettter ui-10-03-26


// import React, { useEffect, useState } from "react";
// import IdeaForm from "./IdeaForm";
// import IdeaCard from "./IdeaCard";
// import IdeaRulesModal from "./IdeaRulesModal";
// import { Trophy, Flame, LayoutGrid } from "lucide-react";

// export default function IdeasBoard() {
//   const token = sessionStorage.getItem("token");
//   const student = {
//     name: sessionStorage.getItem("name"),
//     rollNumber: sessionStorage.getItem("rollNumber"),
//     id: sessionStorage.getItem("id"),
//     email: sessionStorage.getItem("Email"),
//   };
//   const myId = sessionStorage.getItem("id");
//   const cooldownKey = `lastIdeaPostedAt_${myId}`;

//   const [showForm, setShowForm] = useState(false);
//   const [ideas, setIdeas] = useState([]);
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [activeView, setActiveView] = useState("board"); // "board" | "leaderboard"
//   const [postError, setPostError] = useState("");
//   const [showRules, setShowRules] = useState(false);

//   useEffect(() => {
//     if (!token || !myId) { window.location.href = "/"; return; }
//     fetch("http://localhost:8081/api/ideas")
//       .then(res => res.json())
//       .then(data => setIdeas(data))
//       .catch(err => console.error("Failed to fetch ideas:", err));
//   }, []);

//   useEffect(() => {
//     if (!myId) return;
//     const lastPostedAt = localStorage.getItem(cooldownKey);
//     if (!lastPostedAt) return;
//     const diff = new Date() - new Date(lastPostedAt);
//     const ms48 = 48 * 60 * 60 * 1000;
//     if (diff < ms48) {
//       const remaining = getTimeRemaining(lastPostedAt);
//       setPostError(`You can post another idea after 48 hours.${remaining ? ` Try again in ${remaining}.` : ""}`);
//     } else {
//       localStorage.removeItem(cooldownKey);
//     }
//   }, []);

//   useEffect(() => {
//     if (!myId || !token) return;
//     fetch("http://localhost:8081/api/ideas")
//       .then(res => res.json())
//       .then(data => {
//         const myRecentIdea = data.find(idea => {
//           const isMe = String(idea.createdById) === String(myId);
//           if (!isMe) return false;
//           const diff = new Date() - new Date(idea.createdAt);
//           return diff < 48 * 60 * 60 * 1000;
//         });
//         if (myRecentIdea) {
//           localStorage.setItem(cooldownKey, myRecentIdea.createdAt);
//           const remaining = getTimeRemaining(myRecentIdea.createdAt);
//           setPostError(`You can post another idea after 48 hours.${remaining ? ` Try again in ${remaining}.` : ""}`);
//         } else {
//           localStorage.removeItem(cooldownKey);
//           setPostError("");
//         }
//       })
//       .catch(err => console.error("Cooldown check failed:", err));
//   }, [myId]);

//   const isWithin48Hours = (dateStr) => {
//     if (!dateStr) return false;
//     return new Date() - new Date(dateStr) < 48 * 60 * 60 * 1000;
//   };

//   const getTimeRemaining = (fromDate) => {
//     if (!fromDate) return "";
//     const unlock = new Date(new Date(fromDate).getTime() + 48 * 60 * 60 * 1000);
//     const diff = unlock - new Date();
//     if (diff <= 0) return "";
//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     return `${hours}h ${minutes}m`;
//   };

//   const lastPostedAt = localStorage.getItem(cooldownKey);
//   const canPost = !lastPostedAt || !isWithin48Hours(lastPostedAt);

//   const handlePostClick = () => {
//     if (!canPost) {
//       const remaining = getTimeRemaining(lastPostedAt);
//       setPostError(`You can post another idea after 48 hours.${remaining ? ` Try again in ${remaining}.` : ""}`);
//       return;
//     }
//     setPostError("");
//     setShowRules(true);
//   };

//  const filteredIdeas = ideas
//   .filter(i => activeFilter === "All" || i.category === activeFilter)
//   .sort((a, b) => {
//     const isMyA = String(a.createdById) === String(myId);
//     const isMyB = String(b.createdById) === String(myId);

//     // ✅ own ideas always first
//     if (isMyA && !isMyB) return -1;
//     if (!isMyA && isMyB) return 1;

//     // ✅ among own ideas — sort by likes desc
//     if (isMyA && isMyB) return (b.likes || 0) - (a.likes || 0);

//     // ✅ among others — growing cards first (by likes desc), then by date
//     const likesDiff = (b.likes || 0) - (a.likes || 0);
//     if (likesDiff !== 0) return likesDiff;
//     return new Date(b.createdAt) - new Date(a.createdAt);
//   });

//   // ✅ leaderboard — top 10 by likes
//   const leaderboard = [...ideas]
//   .sort((a, b) => {
//     const likesDiff = (b.likes || 0) - (a.likes || 0);
//     if (likesDiff !== 0) return likesDiff;
//     // ✅ tie-break 1: more comments wins
//     const commentsDiff = (b.comments?.length || 0) - (a.comments?.length || 0);
//     if (commentsDiff !== 0) return commentsDiff;
//     // ✅ tie-break 2: newer post wins
//     return new Date(b.createdAt) - new Date(a.createdAt);
//   })
//   .slice(0, 10);

//   const getIdeaStage = (likes) => {
//     if (likes >= 30) return { label: "Community Favorite", icon: "⭐" };
//     if (likes >= 15) return { label: "Gaining Traction", icon: "🚀" };
//     if (likes >= 5)  return { label: "Growing", icon: "📈" };
//     return { label: "Proposed", icon: "💡" };
//   };

//   const rankStyles = [
//     "bg-gradient-to-r from-yellow-500/20 to-yellow-400/5 border-yellow-400/30",
//     "bg-gradient-to-r from-gray-400/20 to-gray-300/5 border-gray-400/30",
//     "bg-gradient-to-r from-orange-600/20 to-orange-500/5 border-orange-500/30",
//   ];

//   const rankEmojis = ["🥇", "🥈", "🥉"];

//   return (
//     <>
//       {/* ✅ Header */}
//       <div className="bg-gradient-to-r from-[#0b0b0b] to-[#141414]
//                       border border-white/5 rounded-2xl p-6
//                       flex flex-col md:flex-row md:items-center md:justify-between
//                       gap-6 shadow-lg">
//         <div className="flex items-start gap-4">
//           <div className="bg-[#26F2D0]/10 text-[#26F2D0] p-3 rounded-xl">💡</div>
//           <div>
//             <h2 className="text-2xl font-bold">Ideas Board</h2>
//             <p className="text-gray-400 text-sm">Share and support student initiatives</p>
//             {postError && (
//               <p className={`text-xs mt-1 flex items-center gap-1 ${
//                 postError.startsWith("Idea posted") ? "text-[#26F2D0]" : "text-red-400"
//               }`}>
//                 {postError.startsWith("Idea posted") ? "✅" : "⚠️"} {postError}
//               </p>
//             )}
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           {/* ✅ View toggle */}
//           <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 gap-1">
//             <button
//               onClick={() => setActiveView("board")}
//               className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
//                 ${activeView === "board"
//                   ? "bg-[#26F2D0] text-black"
//                   : "text-gray-400 hover:text-white"}`}
//             >
//               <LayoutGrid size={13} /> Board
//             </button>
//             <button
//               onClick={() => setActiveView("leaderboard")}
//               className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
//                 ${activeView === "leaderboard"
//                   ? "bg-[#26F2D0] text-black"
//                   : "text-gray-400 hover:text-white"}`}
//             >
//               <Trophy size={13} /> Leaderboard
//             </button>
//           </div>

//           <button
//             onClick={handlePostClick}
//             className={`px-5 py-2 rounded-xl font-semibold transition-all ${
//               canPost
//                 ? "bg-[#26F2D0] text-black hover:bg-[#1fd4b8]"
//                 : "bg-[#26F2D0]/30 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             + Post an Idea
//           </button>
//         </div>
//       </div>

//       {/* ✅ LEADERBOARD VIEW */}
//       {activeView === "leaderboard" && (
//         <div className="mt-6">
//           <div className="flex items-center gap-2 mb-5">
//             <Trophy size={18} className="text-yellow-400" />
//             <h3 className="text-lg font-bold text-white">Top Ideas Leaderboard</h3>
//             <div className="flex-1 h-px bg-white/10" />
//             <span className="text-xs text-gray-500">{leaderboard.length} ideas ranked</span>
//           </div>

//           {leaderboard.length === 0 ? (
//             <div className="text-center py-16">
//               <p className="text-4xl mb-3">🏆</p>
//               <p className="text-gray-400">No ideas yet. Be the first!</p>
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {leaderboard.map((idea, index) => {
//                 const isMe = String(idea.createdById) === String(myId);
//                 const stage = getIdeaStage(idea.likes || 0);
//                 const isTrendingIdea = (idea.likes || 0) >= 10 &&
//                   (Date.now() - new Date(idea.createdAt).getTime()) / 3600000 < 24;

//                 return (
//                   <div key={idea.id}
//                     className={`flex items-center gap-4 px-5 py-4 rounded-2xl border
//                       transition-all duration-200 hover:scale-[1.01]
//                       ${index < 3 ? rankStyles[index] : "bg-[#111] border-white/10 hover:border-white/20"}`}>

//                     {/* Rank */}
//                     <div className="w-10 text-center shrink-0">
//                       {index < 3 ? (
//                         <span className="text-2xl">{rankEmojis[index]}</span>
//                       ) : (
//                         <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
//                       )}
//                     </div>

//                     {/* Category icon */}
//                     <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10
//                                     flex items-center justify-center shrink-0">
//                       <img src={{
//                         Tech: "/techh.png", Academic: "/academic.png",
//                         "Campus Pulse": "/campuspulse.png", Cultural: "/cultural.png"
//                       }[idea.category] || "/others.png"}
//                         className="w-6 h-6 object-contain" alt="" />
//                     </div>

//                     {/* Info */}
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center gap-2 flex-wrap">
//                         <p className="font-semibold text-white text-sm truncate">{idea.title}</p>
//                         {isTrendingIdea && (
//                           <span className="flex items-center gap-0.5 text-xs px-2 py-0.5
//                                            bg-orange-500/20 text-orange-400 rounded-full border border-orange-400/30">
//                             <Flame size={10} /> Trending
//                           </span>
//                         )}
//                         {isMe && (
//                           <span className="text-xs text-[#26F2D0] border border-[#26F2D0]/30 px-2 py-0.5 rounded-full">
//                             Yours
//                           </span>
//                         )}
//                       </div>
//                       <p className="text-xs text-gray-500 mt-0.5">
//                         by {isMe ? "You" : idea.createdByName} · {idea.createdByBranch} ·
//                         <span className={`ml-1 ${
//                           idea.likes >= 30 ? "text-yellow-400" :
//                           idea.likes >= 15 ? "text-purple-400" :
//                           idea.likes >= 5  ? "text-green-400" : "text-gray-500"
//                         }`}>{stage.icon} {stage.label}</span>
//                       </p>
//                     </div>

//                     {/* Likes + Comments */}
//                     <div className="flex items-center gap-4 shrink-0">
//                       <div className="text-center">
//                         <p className={`text-lg font-bold ${
//                           index === 0 ? "text-yellow-400" :
//                           index === 1 ? "text-gray-300" :
//                           index === 2 ? "text-orange-400" : "text-[#26F2D0]"
//                         }`}>{idea.likes || 0}</p>
//                         <p className="text-xs text-gray-500">likes</p>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-lg font-bold text-gray-400">{idea.comments?.length || 0}</p>
//                         <p className="text-xs text-gray-500">replies</p>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       )}

//       {/* ✅ BOARD VIEW */}
//       {activeView === "board" && (
//         <>
//           <div className="mt-6 flex flex-wrap items-center gap-2">
//             {["All", "Tech", "Academic", "Campus Pulse", "Cultural", "Others"].map(cat => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveFilter(cat)}
//                 className={`px-4 py-2 rounded-full text-sm ${
//                   activeFilter === cat ? "bg-[#26F2D0] text-black" : "bg-[#232323] text-gray-300"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 items-start">
//             {filteredIdeas.length === 0 ? (
//               <div className="col-span-3 flex flex-col items-center justify-center h-64 text-center">
//                 <p className="text-4xl mb-4">💡</p>
//                 <p className="text-white text-lg font-semibold">No ideas yet.</p>
//                 <p className="text-gray-400 text-sm mt-2 max-w-sm">
//                   Be the first to share an idea for campus wellbeing and student growth.
//                 </p>
//               </div>
//             ) : (
//               filteredIdeas.map(idea => (
//                 <IdeaCard
//                   key={idea.id}
//                   idea={idea}
//                   student={student}
//                   ideas={ideas}
//                   setIdeas={setIdeas}
//                   myId={myId}
//                 />
//               ))
//             )}
//           </div>
//         </>
//       )}

//       {showRules && (
//         <IdeaRulesModal
//           onClose={() => setShowRules(false)}
//           onContinue={() => { setShowRules(false); setShowForm(true); }}
//         />
//       )}

//       {showForm && (
//         <IdeaForm
//           student={student}
//           onClose={() => setShowForm(false)}
//           onSubmit={async (newIdea) => {
//             const res = await fetch("http://localhost:8081/api/ideas/create", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//               body: JSON.stringify(newIdea)
//             });

//             if (!res.ok) {
//               const errText = await res.text();
//               throw new Error(errText || "Failed to post idea");
//             }

//             const saved = await res.json();
//             const postedAt = saved.createdAt || new Date().toISOString();
//             localStorage.setItem(cooldownKey, postedAt);

//             setIdeas(prev => [{
//               ...saved,
//               createdByName: student?.name || saved.createdByName,
//               createdById: myId || saved.createdById,
//             }, ...prev]);

//             setShowForm(false);

//             const remaining = getTimeRemaining(postedAt);
//             setPostError(
//               `Idea posted! You can post another after 48 hours.${remaining ? ` Next post available in ${remaining}.` : ""}`
//             );
//           }}
//         />
//       )}
//     </>
//   );
// }


import React, { useEffect, useState } from "react";
import IdeaForm from "./Dashboard/Ideas/IdeaForm";
import IdeaCard from "./Dashboard/Ideas/IdeaCard";
import IdeaRulesModal from "./Dashboard/Ideas/IdeaRulesModal";
import { Trophy, Flame, LayoutGrid } from "lucide-react";

export default function IdeasBoard() {
  const token = sessionStorage.getItem("token");
  const myId = sessionStorage.getItem("id");
  const student = {
    name: sessionStorage.getItem("name"),
    rollNumber: sessionStorage.getItem("rollNumber"),
    id: myId,
    email: sessionStorage.getItem("Email"),
  };
  const cooldownKey = `lastIdeaPostedAt_${myId}`;

  const [showForm, setShowForm] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeView, setActiveView] = useState("board");
  const [postError, setPostError] = useState("");
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    if (!token || !myId) { window.location.href = "/"; return; }
    fetch("http://localhost:8081/api/ideas")
      .then(res => res.json())
      .then(data => setIdeas(data))
      .catch(err => console.error("Failed to fetch ideas:", err));
  }, []);

  useEffect(() => {
    if (!myId) return;
    const lastPostedAt = localStorage.getItem(cooldownKey);
    if (!lastPostedAt) return;
    const diff = new Date() - new Date(lastPostedAt);
    const ms48 = 48 * 60 * 60 * 1000;
    if (diff < ms48) {
      const remaining = getTimeRemaining(lastPostedAt);
      setPostError(`You can post another idea after 48 hours.${remaining ? ` Try again in ${remaining}.` : ""}`);
    } else {
      localStorage.removeItem(cooldownKey);
    }
  }, []);

  useEffect(() => {
    if (!myId || !token) return;
    fetch("http://localhost:8081/api/ideas")
      .then(res => res.json())
      .then(data => {
        const myRecentIdea = data.find(idea => {
          const isMe = String(idea.createdById) === String(myId);
          if (!isMe) return false;
          const diff = new Date() - new Date(idea.createdAt);
          return diff < 48 * 60 * 60 * 1000;
        });
        if (myRecentIdea) {
          localStorage.setItem(cooldownKey, myRecentIdea.createdAt);
          const remaining = getTimeRemaining(myRecentIdea.createdAt);
          setPostError(`You can post another idea after 48 hours.${remaining ? ` Try again in ${remaining}.` : ""}`);
        } else {
          localStorage.removeItem(cooldownKey);
          setPostError("");
        }
      })
      .catch(err => console.error("Cooldown check failed:", err));
  }, [myId]);

  const isWithin48Hours = (dateStr) => {
    if (!dateStr) return false;
    return new Date() - new Date(dateStr) < 48 * 60 * 60 * 1000;
  };

  const getTimeRemaining = (fromDate) => {
    if (!fromDate) return "";
    const unlock = new Date(new Date(fromDate).getTime() + 48 * 60 * 60 * 1000);
    const diff = unlock - new Date();
    if (diff <= 0) return "";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const lastPostedAt = localStorage.getItem(cooldownKey);
  const canPost = !lastPostedAt || !isWithin48Hours(lastPostedAt);

  const handlePostClick = () => {
    if (!canPost) {
      const remaining = getTimeRemaining(lastPostedAt);
      setPostError(`You can post another idea after 48 hours.${remaining ? ` Try again in ${remaining}.` : ""}`);
      return;
    }
    setPostError("");
    setShowRules(true);
  };

  // ✅ own ideas pinned first → then by likes desc → then by date
  const filteredIdeas = ideas
    .filter(i => activeFilter === "All" || i.category === activeFilter)
    .sort((a, b) => {
      const isMyA = String(a.createdById) === String(myId);
      const isMyB = String(b.createdById) === String(myId);
      if (isMyA && !isMyB) return -1;
      if (!isMyA && isMyB) return 1;
      if (isMyA && isMyB) return (b.likes || 0) - (a.likes || 0);
      const likesDiff = (b.likes || 0) - (a.likes || 0);
      if (likesDiff !== 0) return likesDiff;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  // ✅ leaderboard — top 10 by likes
  const leaderboard = [...ideas]
    .sort((a, b) => {
      const likesDiff = (b.likes || 0) - (a.likes || 0);
      if (likesDiff !== 0) return likesDiff;
      const commentsDiff = (b.comments?.length || 0) - (a.comments?.length || 0);
      if (commentsDiff !== 0) return commentsDiff;
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    .slice(0, 10);

  const getIdeaStage = (likes) => {
    if (likes >= 30) return { label: "Community Favorite", icon: "⭐" };
    if (likes >= 15) return { label: "Gaining Traction", icon: "🚀" };
    if (likes >= 5)  return { label: "Growing", icon: "📈" };
    return { label: "Proposed", icon: "💡" };
  };

  const rankStyles = [
    "bg-gradient-to-r from-yellow-500/20 to-yellow-400/5 border-yellow-400/30",
    "bg-gradient-to-r from-gray-400/20 to-gray-300/5 border-gray-400/30",
    "bg-gradient-to-r from-orange-600/20 to-orange-500/5 border-orange-500/30",
  ];
  const rankEmojis = ["🥇", "🥈", "🥉"];

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0b0b0b] to-[#141414]
                      border border-white/5 rounded-2xl p-6
                      flex flex-col md:flex-row md:items-center md:justify-between
                      gap-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="bg-[#26F2D0]/10 text-[#26F2D0] p-3 rounded-xl">💡</div>
          <div>
            <h2 className="text-2xl font-bold">Ideas Board</h2>
            <p className="text-gray-400 text-sm">Share and support student initiatives</p>
            {postError && (
              <p className={`text-xs mt-1 flex items-center gap-1 ${
                postError.startsWith("Idea posted") ? "text-[#26F2D0]" : "text-red-400"
              }`}>
                {postError.startsWith("Idea posted") ? "✅" : "⚠️"} {postError}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 gap-1">
            <button
              onClick={() => setActiveView("board")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${activeView === "board"
                  ? "bg-[#26F2D0] text-black"
                  : "text-gray-400 hover:text-white"}`}
            >
              <LayoutGrid size={13} /> Board
            </button>
            <button
              onClick={() => setActiveView("leaderboard")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${activeView === "leaderboard"
                  ? "bg-[#26F2D0] text-black"
                  : "text-gray-400 hover:text-white"}`}
            >
              <Trophy size={13} /> Leaderboard
            </button>
          </div>

          <button
            onClick={handlePostClick}
            className={`px-5 py-2 rounded-xl font-semibold transition-all ${
              canPost
                ? "bg-[#26F2D0] text-black hover:bg-[#1fd4b8]"
                : "bg-[#26F2D0]/30 text-gray-500 cursor-not-allowed"
            }`}
          >
            + Post an Idea
          </button>
        </div>
      </div>

      {/* LEADERBOARD VIEW */}
      {activeView === "leaderboard" && (
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-5">
            <Trophy size={18} className="text-yellow-400" />
            <h3 className="text-lg font-bold text-white">Top Ideas Leaderboard</h3>
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-500">{leaderboard.length} ideas ranked</span>
          </div>

          {leaderboard.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">🏆</p>
              <p className="text-gray-400">No ideas yet. Be the first!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboard.map((idea, index) => {
                const isMe = String(idea.createdById) === String(myId);
                const stage = getIdeaStage(idea.likes || 0);
                const isTrendingIdea = (idea.likes || 0) >= 10 &&
                  (Date.now() - new Date(idea.createdAt).getTime()) / 3600000 < 24;

                return (
                  <div key={idea.id}
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl border
                      transition-all duration-200 hover:scale-[1.01]
                      ${index < 3
                        ? rankStyles[index]
                        : "bg-[#111] border-white/10 hover:border-white/20"
                      }`}>

                    <div className="w-10 text-center shrink-0">
                      {index < 3
                        ? <span className="text-2xl">{rankEmojis[index]}</span>
                        : <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
                      }
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10
                                    flex items-center justify-center shrink-0">
                      <img
                        src={{
                          Tech: "/techh.png", Academic: "/academic.png",
                          "Campus Pulse": "/campuspulse.png", Cultural: "/cultural.png"
                        }[idea.category] || "/others.png"}
                        className="w-6 h-6 object-contain" alt=""
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-white text-sm truncate">{idea.title}</p>
                        {isTrendingIdea && (
                          <span className="flex items-center gap-0.5 text-xs px-2 py-0.5
                                           bg-orange-500/20 text-orange-400 rounded-full
                                           border border-orange-400/30">
                            <Flame size={10} /> Trending
                          </span>
                        )}
                        {isMe && (
                          <span className="text-xs text-[#26F2D0] border border-[#26F2D0]/30
                                           px-2 py-0.5 rounded-full">
                            Yours
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        by {isMe ? "You" : idea.createdByName} · {idea.createdByBranch} ·
                        <span className={`ml-1 ${
                          idea.likes >= 30 ? "text-yellow-400" :
                          idea.likes >= 15 ? "text-purple-400" :
                          idea.likes >= 5  ? "text-green-400" : "text-gray-500"
                        }`}>{stage.icon} {stage.label}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-center">
                        <p className={`text-lg font-bold ${
                          index === 0 ? "text-yellow-400" :
                          index === 1 ? "text-gray-300" :
                          index === 2 ? "text-orange-400" : "text-[#26F2D0]"
                        }`}>{idea.likes || 0}</p>
                        <p className="text-xs text-gray-500">likes</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-400">
                          {idea.comments?.length || 0}
                        </p>
                        <p className="text-xs text-gray-500">replies</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* BOARD VIEW */}
      {activeView === "board" && (
        <>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {["All", "Tech", "Academic", "Campus Pulse", "Cultural", "Others"].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeFilter === cat
                    ? "bg-[#26F2D0] text-black"
                    : "bg-[#232323] text-gray-300 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 items-start">
            {filteredIdeas.length === 0 ? (
              <div className="col-span-3 flex flex-col items-center justify-center h-64 text-center">
                <p className="text-4xl mb-4">💡</p>
                <p className="text-white text-lg font-semibold">No ideas yet.</p>
                <p className="text-gray-400 text-sm mt-2 max-w-sm">
                  Be the first to share an idea for campus wellbeing and student growth.
                </p>
              </div>
            ) : (
              filteredIdeas.map(idea => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  student={student}
                  ideas={ideas}
                  setIdeas={setIdeas}
                  myId={myId}
                />
              ))
            )}
          </div>
        </>
      )}

      {showRules && (
        <IdeaRulesModal
          onClose={() => setShowRules(false)}
          onContinue={() => { setShowRules(false); setShowForm(true); }}
        />
      )}

      {showForm && (
        <IdeaForm
          student={student}
          onClose={() => setShowForm(false)}
          onSubmit={async (newIdea) => {
            const res = await fetch("http://localhost:8081/api/ideas/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(newIdea)
            });

            if (!res.ok) {
              const errText = await res.text();
              throw new Error(errText || "Failed to post idea");
            }

            const saved = await res.json();
            const postedAt = saved.createdAt || new Date().toISOString();
            localStorage.setItem(cooldownKey, postedAt);

            setIdeas(prev => [{
              ...saved,
              createdByName: student?.name || saved.createdByName,
              createdById: myId || saved.createdById,
            }, ...prev]);

            setShowForm(false);

            const remaining = getTimeRemaining(postedAt);
            setPostError(
              `Idea posted! You can post another after 48 hours.${remaining ? ` Next post available in ${remaining}.` : ""}`
            );
          }}
        />
      )}
    </>
  );
}