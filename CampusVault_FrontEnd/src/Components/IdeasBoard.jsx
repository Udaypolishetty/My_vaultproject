
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


import React, { useEffect, useState } from "react";
import IdeaForm from "./IdeaForm";
import IdeaCard from "./IdeaCard";

export default function IdeasBoard() {

  const student = JSON.parse(localStorage.getItem("studentProfile") || "{}");
  const token = localStorage.getItem("token");

  const [showForm, setShowForm] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeIdeaId, setActiveIdeaId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRules, setShowRules] = useState(false); // ✅ NEW

  // ===== FETCH IDEAS =====
  useEffect(() => {
    fetch("http://localhost:8081/api/ideas", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          console.error("Failed to fetch ideas:", res.status);
          return [];
        }
        return res.json();
      })
      .then(data => {
        setIdeas(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching ideas:", err);
        setLoading(false);
      });
  }, []);

  // ===== AUTO SHOW RULES ONCE PER USER =====
  useEffect(() => {
    if (!student?.email) return;

    const key = `ideasRulesSeen_${student.email}`;
    const hasSeenRules = localStorage.getItem(key);

    if (!hasSeenRules) {
      setShowRules(true);
      localStorage.setItem(key, "true");
    }
  }, [student]);

  return (
    <div className="w-full bg-[#0f0f0f] text-white">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-[#0b0b0b] to-[#141414]
                      border border-white/5 rounded-2xl p-4 md:p-6
                      flex flex-col md:flex-row md:items-center md:justify-between
                      gap-4 shadow-lg">

        <div className="flex items-start gap-4">
          <div className="bg-[#26F2D0]/10 text-[#26F2D0] p-3 rounded-xl">💡</div>

          <div className="text-left">
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-bold">
                Ideas Board
              </h2>

              {/* ⓘ Info Button */}
              <button
                onClick={() => setShowRules(true)}
                className="w-6 h-6 flex items-center justify-center rounded-full 
                           bg-white/10 text-gray-400 text-xs
                           hover:bg-[#26F2D0]/20 hover:text-[#26F2D0]
                           transition"
              >
                ⓘ
              </button>
            </div>

            <p className="text-gray-400 text-sm">
              Share and support student initiatives
            </p>
          </div>
        </div>

        <button
          className="bg-[#26F2D0] text-black px-5 py-2 rounded-xl font-semibold w-full md:w-auto"
          onClick={() => setShowForm(true)}
        >
          + Post an Idea
        </button>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {["All", "Tech", "Academic", "Campus Pulse", "Cultural", "Others"].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              activeFilter === cat
                ? "bg-[#26F2D0] text-black"
                : "bg-[#232323] text-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
{/* ================= IDEAS GRID ================= */}
{loading ? (
  <div className="flex items-center justify-center h-64">
    <p className="text-gray-400 text-lg">Loading ideas...</p>
  </div>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 items-start pb-10">
    {ideas.filter(i => activeFilter === "All" || i.category === activeFilter).length === 0 ? (
      <div className="col-span-3 flex flex-col items-center justify-center h-64 text-center">
        <p className="text-4xl mb-4">💡</p>
        <p className="text-gray-400 text-lg">No ideas yet.</p>
        <p className="text-gray-500 text-sm mt-1">Be the first to post an idea!</p>
      </div>
    ) : (
      ideas
        .filter(i => activeFilter === "All" || i.category === activeFilter)
        .map(idea => (
          <IdeaCard
            key={idea._id}
            idea={idea}
            student={student}
            ideas={ideas}
            setIdeas={setIdeas}
          />
        ))
    )}
  </div>
)}

      {/* ================= IDEA FORM ================= */}
      {showForm && (
        <IdeaForm
          onClose={() => setShowForm(false)}
          onSubmit={async (newIdea) => {
            // ✅ to this
        const finalIdea = { ...newIdea };

            const res = await fetch("http://localhost:8081/api/ideas/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify(finalIdea)
            });

            if (!res.ok) {
              console.error("Failed to post idea:", res.status);
              return;
            }

            const saved = await res.json();
            setIdeas([saved, ...ideas]);
            setShowForm(false);
          }}
        />
      )}

      {/* ================= RULES MODAL ================= */}
     {showRules && (
  <div
    className="fixed inset-0 bg-black/60 backdrop-blur-sm 
               flex items-center justify-center z-50 px-4"
    onClick={() => setShowRules(false)}
  >
    <div
      className="bg-[#161616] border border-white/10
                 rounded-2xl p-8 max-w-md w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-xl font-semibold mb-6 text-white">
        Ideas Board Guidelines
      </h3>

      <ol className="space-y-4 text-gray-300 text-sm leading-relaxed list-decimal list-inside">
        <li>
          Ideas must be relevant to campus activities or student development.
        </li>
        <li>
          Only one idea submission is allowed per day.
        </li>
        <li>
          Avoid spamming through excessive comments or likes. System limits are enforced.
        </li>
        <li>
          Misuse of the platform may result in restrictions or profile removal.
        </li>
        <li>
          Encourage constructive discussions and support meaningful initiatives.
        </li>
      </ol>

      <button
        onClick={() => setShowRules(false)}
        className="mt-8 w-full bg-[#26F2D0] text-black py-2 rounded-xl font-medium
                   hover:bg-[#1edbbd] transition"
      >
        Understood
      </button>
    </div>
  </div>
)}

    </div>
  );
}