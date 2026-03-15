// import { useState } from "react";

// const getStampConfig = (status) => {
//   switch (status) {
//     case "IMPLEMENTED": return { label: "✅ Done", border: "border-green-400", text: "text-green-400" };
//     case "ON_HOLD": return { label: "⏸ Hold", border: "border-yellow-400", text: "text-yellow-400" };
//     case "REJECTED": return { label: "❌ Rejected", border: "border-red-400", text: "text-red-400" };
//     case "UNDER_REVIEW": return { label: "🔍 Review", border: "border-blue-400", text: "text-blue-400" };
//     default: return null;
//   }
// };

// const categoryStyles = {
//   Tech: "bg-blue-500/20 text-blue-400",
//   Academic: "bg-green-500/20 text-green-400",
//   "Campus Pulse": "bg-red-500/20 text-red-400",
//   Cultural: "bg-yellow-300/20 text-yellow-400",
// };

// function IdeaAdminCard({ idea, onDelete }) {
//   const [confirmDelete, setConfirmDelete] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const stamp = getStampConfig(idea.status);

//   const handleDelete = async () => {
//     setDeleting(true);
//     const token = sessionStorage.getItem("token");
//     try {
//       const res = await fetch(`http://localhost:8081/api/ideas/${idea.id || idea._id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (res.ok) onDelete(idea.id || idea._id);
//       else console.error("Delete failed:", res.status);
//     } catch (err) {
//       console.error("Delete error:", err);
//     } finally {
//       setDeleting(false);
//     }
//   };

//   return (
//     <div className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl p-4
//                     overflow-hidden transition-all hover:border-white/20">

//       {/* stamp */}
//       {stamp && !confirmDelete && (
//         <div className="absolute inset-0 flex items-center justify-center
//                         pointer-events-none z-10">
//           <div className={`rotate-[-20deg] border-4 rounded-2xl px-5 py-2 opacity-20 ${stamp.border}`}>
//             <p className={`text-3xl font-black tracking-widest uppercase ${stamp.text}`}>
//               {stamp.label}
//             </p>
//           </div>
//         </div>
//       )}

//       {/* confirm delete overlay */}
//       {confirmDelete && (
//         <div className="absolute inset-0 bg-[#1a1a1a]/95 rounded-2xl z-20
//                         flex flex-col items-center justify-center gap-3 p-4">
//           <p className="text-2xl">🗑️</p>
//           <p className="text-white font-semibold text-sm text-center">
//             Delete "{idea.title}"?
//           </p>
//           <p className="text-gray-400 text-xs text-center">This cannot be undone.</p>
//           <div className="flex gap-2 mt-1">
//             <button
//               onClick={() => setConfirmDelete(false)}
//               className="px-4 py-2 bg-white/10 text-gray-300 rounded-xl
//                          text-xs hover:bg-white/20 transition"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleDelete}
//               disabled={deleting}
//               className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs
//                          font-semibold hover:bg-red-700 transition disabled:opacity-50"
//             >
//               {deleting ? "Deleting..." : "Yes, Delete"}
//             </button>
//           </div>
//         </div>
//       )}

//       {/* card content */}
//       <div className="flex justify-between items-start mb-2">
//         <div className="flex items-center gap-2 flex-wrap">
//           <span className={`text-xs px-2 py-0.5 rounded-full font-medium
//             ${categoryStyles[idea.category] || "bg-gray-500/20 text-gray-400"}`}>
//             {idea.category}
//           </span>
//           {idea.status && idea.status !== "OPEN" && stamp && (
//             <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${stamp.text} bg-white/5`}>
//               {stamp.label}
//             </span>
//           )}
//         </div>
//         <button
//           onClick={() => setConfirmDelete(true)}
//           className="shrink-0 ml-2 px-2 py-1 bg-red-600/20 hover:bg-red-600
//                      text-red-400 hover:text-white rounded-lg text-xs
//                      border border-red-600/30 transition font-medium relative z-20"
//         >
//           Delete
//         </button>
//       </div>

//       <h3 className="font-semibold text-white text-sm mb-1">{idea.title}</h3>
//       <p className="text-gray-400 text-xs mb-3 line-clamp-2">{idea.description}</p>

//       <div className="flex items-center justify-between text-xs text-gray-500">
//         <span>by {idea.createdByName || "—"} · {idea.createdByBranch || ""}</span>
//         <div className="flex gap-3">
//           <span>👍 {idea.likes || 0}</span>
//           <span>💬 {idea.comments?.length || 0}</span>
//         </div>
//       </div>

//       {idea.reviewedBy && (
//         <p className="text-xs text-purple-400 mt-2">Reviewed by {idea.reviewedBy}</p>
//       )}
//     </div>
//   );
// }

// export default function AdminIdeas({ ideas, loading, onDelete }) {
//   if (loading) return null;

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">All Ideas ({ideas.length})</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//         {ideas.map(idea => (
//           <IdeaAdminCard
//             key={idea.id || idea._id}
//             idea={idea}
//             onDelete={onDelete}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }



// import { useState } from "react";
// import { Archive } from "lucide-react";

// const getStampConfig = (status) => {
//   switch (status) {
//     case "IMPLEMENTED": return { label: "✅ Done", border: "border-green-400", text: "text-green-400" };
//     case "ON_HOLD": return { label: "⏸ Hold", border: "border-yellow-400", text: "text-yellow-400" };
//     case "REJECTED": return { label: "❌ Rejected", border: "border-red-400", text: "text-red-400" };
//     case "UNDER_REVIEW": return { label: "🔍 Review", border: "border-blue-400", text: "text-blue-400" };
//     default: return null;
//   }
// };

// const categoryStyles = {
//   Tech: "bg-blue-500/20 text-blue-400",
//   Academic: "bg-green-500/20 text-green-400",
//   "Campus Pulse": "bg-red-500/20 text-red-400",
//   Cultural: "bg-yellow-300/20 text-yellow-400",
// };

// function IdeaAdminCard({ idea, onDelete }) {
//   const [confirmDelete, setConfirmDelete] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const stamp = getStampConfig(idea.status);

//   const handleDelete = async () => {
//     setDeleting(true);
//     const token = sessionStorage.getItem("token");
//     try {
//       const res = await fetch(`http://localhost:8081/api/ideas/${idea.id || idea._id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (res.ok) onDelete(idea.id || idea._id);
//       else console.error("Delete failed:", res.status);
//     } catch (err) {
//       console.error("Delete error:", err);
//     } finally {
//       setDeleting(false);
//     }
//   };

//   return (
//     <div className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl p-4
//                     overflow-hidden transition-all hover:border-white/20">

//       {/* stamp */}
//       {stamp && !confirmDelete && (
//         <div className="absolute inset-0 flex items-center justify-center
//                         pointer-events-none z-10">
//           <div className={`rotate-[-20deg] border-4 rounded-2xl px-5 py-2 opacity-20 ${stamp.border}`}>
//             <p className={`text-3xl font-black tracking-widest uppercase ${stamp.text}`}>
//               {stamp.label}
//             </p>
//           </div>
//         </div>
//       )}

//       {/* confirm delete overlay */}
//       {confirmDelete && (
//         <div className="absolute inset-0 bg-[#1a1a1a]/95 rounded-2xl z-20
//                         flex flex-col items-center justify-center gap-3 p-4">
//           <p className="text-2xl">🗑️</p>
//           <p className="text-white font-semibold text-sm text-center">
//             Delete "{idea.title}"?
//           </p>
//           <p className="text-gray-400 text-xs text-center">This cannot be undone.</p>
//           <div className="flex gap-2 mt-1">
//             <button
//               onClick={() => setConfirmDelete(false)}
//               className="px-4 py-2 bg-white/10 text-gray-300 rounded-xl
//                          text-xs hover:bg-white/20 transition"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleDelete}
//               disabled={deleting}
//               className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs
//                          font-semibold hover:bg-red-700 transition disabled:opacity-50"
//             >
//               {deleting ? "Deleting..." : "Yes, Delete"}
//             </button>
//           </div>
//         </div>
//       )}

//       {/* card content */}
//       <div className="flex justify-between items-start mb-2">
//         <div className="flex items-center gap-2 flex-wrap">
//           <span className={`text-xs px-2 py-0.5 rounded-full font-medium
//             ${categoryStyles[idea.category] || "bg-gray-500/20 text-gray-400"}`}>
//             {idea.category}
//           </span>
//           {idea.status && idea.status !== "OPEN" && stamp && (
//             <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${stamp.text} bg-white/5`}>
//               {stamp.label}
//             </span>
//           )}
//         </div>
//         <button
//           onClick={() => setConfirmDelete(true)}
//           className="shrink-0 ml-2 px-2 py-1 bg-red-600/20 hover:bg-red-600
//                      text-red-400 hover:text-white rounded-lg text-xs
//                      border border-red-600/30 transition font-medium relative z-20"
//         >
//           Delete
//         </button>
//       </div>

//       <h3 className="font-semibold text-white text-sm mb-1">{idea.title}</h3>
//       <p className="text-gray-400 text-xs mb-3 line-clamp-2">{idea.description}</p>

//       <div className="flex items-center justify-between text-xs text-gray-500">
//         <span>by {idea.createdByName || "—"} · {idea.createdByBranch || ""}</span>
//         <div className="flex gap-3">
//           <span>👍 {idea.likes || 0}</span>
//           <span>💬 {idea.comments?.length || 0}</span>
//         </div>
//       </div>

//       {idea.reviewedBy && (
//         <p className="text-xs text-purple-400 mt-2">Reviewed by {idea.reviewedBy}</p>
//       )}
//     </div>
//   );
// }

// export default function AdminIdeas({ ideas, loading, onDelete }) {
//   const [activeTab, setActiveTab] = useState("active"); // "active" | "archived"
//   const [archivedIdeas, setArchivedIdeas] = useState([]);
//   const [loadingArchived, setLoadingArchived] = useState(false);

//   const token = sessionStorage.getItem("token");

//   const fetchArchived = async () => {
//     setLoadingArchived(true);
//     const res = await fetch("http://localhost:8081/api/ideas/archived", {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     const data = await res.json();
//     setArchivedIdeas(data);
//     setLoadingArchived(false);
//   };

//   if (loading) return null;

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-6">All Ideas</h2>
      
//       {/* Tab switcher */}
//       <div className="flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-1 mb-6 shadow-lg">
//         <button
//           onClick={() => setActiveTab("active")}
//           className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
//             ${activeTab === "active"
//               ? "bg-gradient-to-r from-[#26F2D0] to-[#00d4ff] text-black shadow-lg shadow-[#26F2D0]/25 hover:shadow-[#26F2D0]/40"
//               : "text-gray-400 hover:text-white hover:bg-white/10"
//             }`}
//         >
//           Active Ideas ({ideas.length})
//         </button>
//         <button
//           onClick={() => { setActiveTab("archived"); fetchArchived(); }}
//           className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
//             ${activeTab === "archived"
//               ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40"
//               : "text-gray-400 hover:text-white hover:bg-white/10"
//             }`}
//         >
//           <Archive size={14} /> Archived ({archivedIdeas.length})
//         </button>
//       </div>

//       {/* Content */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//         {activeTab === "active" ? (
//           ideas.map(idea => (
//             <IdeaAdminCard
//               key={idea.id || idea._id}
//               idea={idea}
//               onDelete={onDelete}
//             />
//           ))
//         ) : loadingArchived ? (
//           <div className="col-span-full flex items-center justify-center py-12">
//             <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
//           </div>
//         ) : (
//           archivedIdeas.map(idea => (
//             <IdeaAdminCard
//               key={idea.id || idea._id}
//               idea={idea}
//               onDelete={onDelete}
//             />
//           ))
//         )}
//       </div>

//       {activeTab === "archived" && archivedIdeas.length === 0 && !loadingArchived && (
//         <div className="col-span-full text-center py-16 bg-white/5 rounded-2xl border border-white/10">
//           <Archive className="w-16 h-16 text-gray-600 mx-auto mb-4 opacity-50" />
//           <p className="text-gray-400 text-sm font-medium">No archived ideas yet</p>
//         </div>
//       )}
//     </div>
//   );
// }




import { useState } from "react";
import { Archive, Trophy, Trash2 } from "lucide-react";

const getStampConfig = (status) => {
  switch (status) {
    case "IMPLEMENTED": return { label: "✅ Done", border: "border-green-400", text: "text-green-400" };
    case "ON_HOLD": return { label: "⏸ Hold", border: "border-yellow-400", text: "text-yellow-400" };
    case "REJECTED": return { label: "❌ Rejected", border: "border-red-400", text: "text-red-400" };
    case "UNDER_REVIEW": return { label: "🔍 Review", border: "border-blue-400", text: "text-blue-400" };
    default: return null;
  }
};

const categoryStyles = {
  Tech: "bg-blue-500/20 text-blue-400",
  Academic: "bg-green-500/20 text-green-400",
  "Campus Pulse": "bg-red-500/20 text-red-400",
  Cultural: "bg-yellow-300/20 text-yellow-400",
};

function IdeaAdminCard({ idea, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const stamp = getStampConfig(idea.status);

  const handleDelete = async () => {
    setDeleting(true);
    const token = sessionStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:8081/api/ideas/${idea.id || idea._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) onDelete(idea.id || idea._id);
      else console.error("Delete failed:", res.status);
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl p-4
                    overflow-hidden transition-all hover:border-white/20">
      {stamp && !confirmDelete && (
        <div className="absolute inset-0 flex items-center justify-center
                        pointer-events-none z-10">
          <div className={`rotate-[-20deg] border-4 rounded-2xl px-5 py-2 opacity-20 ${stamp.border}`}>
            <p className={`text-3xl font-black tracking-widest uppercase ${stamp.text}`}>
              {stamp.label}
            </p>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="absolute inset-0 bg-[#1a1a1a]/95 rounded-2xl z-20
                        flex flex-col items-center justify-center gap-3 p-4">
          <p className="text-2xl">🗑️</p>
          <p className="text-white font-semibold text-sm text-center">Delete "{idea.title}"?</p>
          <p className="text-gray-400 text-xs text-center">This cannot be undone.</p>
          <div className="flex gap-2 mt-1">
            <button onClick={() => setConfirmDelete(false)}
              className="px-4 py-2 bg-white/10 text-gray-300 rounded-xl text-xs hover:bg-white/20 transition">
              Cancel
            </button>
            <button onClick={handleDelete} disabled={deleting}
              className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs
                         font-semibold hover:bg-red-700 transition disabled:opacity-50">
              {deleting ? "Deleting..." : "Yes, Delete"}
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium
            ${categoryStyles[idea.category] || "bg-gray-500/20 text-gray-400"}`}>
            {idea.category}
          </span>
          {idea.status && idea.status !== "OPEN" && stamp && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${stamp.text} bg-white/5`}>
              {stamp.label}
            </span>
          )}
        </div>
        <button onClick={() => setConfirmDelete(true)}
          className="shrink-0 ml-2 px-2 py-1 bg-red-600/20 hover:bg-red-600
                     text-red-400 hover:text-white rounded-lg text-xs
                     border border-red-600/30 transition font-medium relative z-20">
          Delete
        </button>
      </div>

      <h3 className="font-semibold text-white text-sm mb-1">{idea.title}</h3>
      <p className="text-gray-400 text-xs mb-3 line-clamp-2">{idea.description}</p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>by {idea.createdByName || "—"} · {idea.createdByBranch || ""}</span>
        <div className="flex gap-3">
          <span>👍 {idea.likes || 0}</span>
          <span>💬 {idea.comments?.length || 0}</span>
        </div>
      </div>

      {idea.reviewedBy && (
        <p className="text-xs text-purple-400 mt-2">Reviewed by {idea.reviewedBy}</p>
      )}
    </div>
  );
}

// ✅ small leaderboard row with delete
function LeaderboardRow({ idea, rank, onDelete }) {
  const [confirm, setConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const token = sessionStorage.getItem("token");

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:8081/api/ideas/${idea.id || idea._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) onDelete(idea.id || idea._id);
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setDeleting(false);
      setConfirm(false);
    }
  };

  const rankEmojis = ["🥇", "🥈", "🥉"];
  const isImplemented = idea.status === "IMPLEMENTED";
  const isRejected = idea.status === "REJECTED";

  return (
    <div className={`flex items-center gap-4 px-4 py-3 rounded-xl border transition-all
      ${isImplemented
        ? "bg-green-500/5 border-green-500/20"
        : isRejected
          ? "bg-white/[0.02] border-white/5 opacity-50"
          : "bg-[#1a1a1a] border-white/10"
      }`}>

      {/* rank */}
      <div className="w-8 text-center shrink-0">
        {rank < 3
          ? <span className="text-lg">{rankEmojis[rank]}</span>
          : <span className="text-sm font-bold text-gray-500">#{rank + 1}</span>
        }
      </div>

      {/* info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{idea.title}</p>
        <p className="text-xs text-gray-500">
          {idea.createdByName} · 👍 {idea.likes || 0} · 💬 {idea.comments?.length || 0}
          {idea.archived && <span className="ml-2 text-yellow-400">🏛️ Hall of Fame</span>}
        </p>
      </div>

      {/* status badge */}
      <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0
        ${isImplemented ? "bg-green-500/20 text-green-400 border-green-500/30"
        : isRejected    ? "bg-red-500/20 text-red-400 border-red-500/30"
        : "bg-gray-500/20 text-gray-400 border-gray-500/30"}`}>
        {idea.status || "OPEN"}
      </span>

      {/* delete */}
      {!confirm ? (
        <button onClick={() => setConfirm(true)}
          className="shrink-0 p-1.5 rounded-lg text-gray-600 hover:text-red-400
                     hover:bg-red-400/10 transition">
          <Trash2 size={14} />
        </button>
      ) : (
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={() => setConfirm(false)}
            className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition">
            No
          </button>
          <button onClick={handleDelete} disabled={deleting}
            className="px-2 py-1 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50">
            {deleting ? "..." : "Yes"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function AdminIdeas({ ideas, loading, onDelete }) {
  const [activeTab, setActiveTab] = useState("active");
  const [archivedIdeas, setArchivedIdeas] = useState([]);
  const [loadingArchived, setLoadingArchived] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);

  const token = sessionStorage.getItem("token");

  const fetchArchived = async () => {
    setLoadingArchived(true);
    const res = await fetch("http://localhost:8081/api/ideas/archived", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setArchivedIdeas(await res.json());
    setLoadingArchived(false);
  };

  const fetchLeaderboard = async () => {
    setLoadingLeaderboard(true);
    const res = await fetch("http://localhost:8081/api/ideas/leaderboard", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setLeaderboard(await res.json());
    setLoadingLeaderboard(false);
  };

  const handleLeaderboardDelete = (id) => {
    setLeaderboard(prev => prev.filter(i => (i.id || i._id) !== id));
    onDelete(id);
  };

  if (loading) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">All Ideas</h2>

      {/* Tab switcher */}
      <div className="flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-1 mb-6 shadow-lg gap-1">
        <button
          onClick={() => setActiveTab("active")}
          className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
            ${activeTab === "active"
              ? "bg-gradient-to-r from-[#26F2D0] to-[#00d4ff] text-black shadow-lg"
              : "text-gray-400 hover:text-white hover:bg-white/10"}`}>
          Active ({ideas.length})
        </button>
        <button
          onClick={() => { setActiveTab("archived"); fetchArchived(); }}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
            ${activeTab === "archived"
              ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg"
              : "text-gray-400 hover:text-white hover:bg-white/10"}`}>
          <Archive size={14} /> Archived ({archivedIdeas.length})
        </button>
        <button
          onClick={() => { setActiveTab("leaderboard"); fetchLeaderboard(); }}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
            ${activeTab === "leaderboard"
              ? "bg-gradient-to-r from-yellow-500 to-orange-400 text-black shadow-lg"
              : "text-gray-400 hover:text-white hover:bg-white/10"}`}>
          <Trophy size={14} /> Leaderboard
        </button>
      </div>

      {/* Active ideas */}
      {activeTab === "active" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {ideas.map(idea => (
            <IdeaAdminCard key={idea.id || idea._id} idea={idea} onDelete={onDelete} />
          ))}
        </div>
      )}

      {/* Archived ideas */}
      {activeTab === "archived" && (
        loadingArchived ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : archivedIdeas.length === 0 ? (
          <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
            <Archive className="w-16 h-16 text-gray-600 mx-auto mb-4 opacity-50" />
            <p className="text-gray-400 text-sm">No archived ideas yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {archivedIdeas.map(idea => (
              <IdeaAdminCard key={idea.id || idea._id} idea={idea} onDelete={onDelete} />
            ))}
          </div>
        )
      )}

      {/* ✅ Leaderboard tab — simple list with delete */}
      {activeTab === "leaderboard" && (
        loadingLeaderboard ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
            <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4 opacity-50" />
            <p className="text-gray-400 text-sm">No ideas in leaderboard yet</p>
          </div>
        ) : (
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 space-y-2">
            <p className="text-xs text-gray-500 mb-3">
              Top {leaderboard.length} ideas · click 🗑️ to delete permanently
            </p>
            {leaderboard.map((idea, index) => (
              <LeaderboardRow
                key={idea.id || idea._id}
                idea={idea}
                rank={index}
                onDelete={handleLeaderboardDelete}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}