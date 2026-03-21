// import { useState } from "react";
// import TaskForm from "../ClubForm";
// import AddClub from "./AddClub";
// import JoinClub from "./JoinClub";

// export default function Club() {
//   const student = JSON.parse(localStorage.getItem("studentProfile")) || {};

//   const [showForm, setShowForm] = useState(false);
//   const [tasks, setTasks] = useState([]);

//   const pinned = tasks.filter(t => t.pinned);
//   const normal = tasks.filter(t => !t.pinned);

//   return (
//     <div className="space-y-6">

//       {/* Header */}
//       {/* <div
//         className="flex items-center justify-between
//                    bg-gradient-to-r from-[#0b0b0b] to-[#141414]
//                    border border-white/10 p-6 rounded-2xl shadow-lg"
//       >
//         <div>
//           <h2 className="text-xl font-bold">Tasks</h2>
//           <p className="text-gray-400 text-sm">
//             Work on tasks and share knowledge
//           </p>
//         </div>

//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-[#26F2D0] text-black px-5 py-2 rounded-xl
//                      font-semibold hover:bg-[#20d6b8]"
//         >
//           + Add Task
//         </button>
//       </div> */}

//   <div className = "flex flex-col md:flex-row gap-4">
//     <div className = {`w-full md:w-[50vw] min-h-[60vh] rounded-2xl border border-white/10 mb-10
//                bg-gradient-to-r from-[#0b0b0b]/80 to-[#141414]/80
//                backdrop-blur-xl p-6 shadow-lg relative
//                shadow-[0_0_25px_rgba(38,242,208,0.12)]
//                transition-all duration-300
//                hover:-translate-y-1
//                hover:shadow-[0_0_40px_rgba(38,242,208,0.25)]
//                hover:border-[#26F2D0]/40`}>
//         <AddClub />
//     </div>

//     <div className = {`w-full md:w-[50vw] min-h-[60vh] mb-10 rounded-2xl border border-white/10
//                bg-gradient-to-r from-[#0b0b0b]/80 to-[#141414]/80
//                backdrop-blur-xl p-6 shadow-lg relative
//                shadow-[0_0_25px_rgba(38,242,208,0.12)]
//                transition-all duration-300
//                hover:-translate-y-1
//                hover:shadow-[0_0_40px_rgba(38,242,208,0.25)]
//                hover:border-[#26F2D0]/40`}>
//           <JoinClub />
//     </div>
//   </div>

//       {/* Pinned Tasks */}
//       {pinned.map(task => (
//         <TaskRow key={task.id} task={task} pinned />
//       ))}

//       {/* Normal Tasks */}
//       {normal.map(task => (
//         <TaskRow key={task.id} task={task} />
//       ))}

//       {/* Task Form Popup */}
//       {showForm && (
//         <TaskForm
//           onClose={() => setShowForm(false)}
//           onSubmit={(newTask) => {
//             const tempTask = {
//               id: Date.now(),              // fake id (React key)
//               title: newTask.title,
//               description: newTask.description,
//               tags: newTask.tags || [],
//               pinned: newTask.pinned || false,
//               replies: [],
//               createdAt: Date.now(),
//               name: student.name || "Test User",
//               branch: student.branch || "CSE",
//               year: student.year || "3rd Year"
//             };

//             setTasks(prev => [tempTask, ...prev]);
//             setShowForm(false);
//           }}
//         />
//       )}
//     </div>
//   );
// }
// // Time formate
// function formatTime(timestamp) {
//   const diff = Date.now() - timestamp;

//   const seconds = Math.floor(diff / 1000);
//   const minutes = Math.floor(seconds / 60);
//   const hours = Math.floor(minutes / 60);

//   if (seconds < 60) return "just now";
//   if (minutes < 60) return `${minutes} min ago`;
//   if (hours < 24) return `${hours} hr ago`;

//   return new Date(timestamp).toLocaleDateString();
// }


// /* ---------- TASK ROW ---------- */

// function TaskRow({ task, pinned }) {
//   return (
//     <div
//       className="flex items-center gap-4
//                  bg-gradient-to-br from-[#0b0b0b] to-[#121212]
//                  border border-white/10 p-5 rounded-xl
//                  hover:border-[#26F2D0]/40 transition cursor-pointer"
//     >
//       {/* Avatar */}
//       <div className="w-10 h-10 rounded-full bg-[#222]
//                       flex items-center justify-center text-gray-400">
//         👤
//       </div>

//       {/* Content */}
//       <div className="flex-1">
//         <div className="flex items-center gap-2">
//           {pinned && (
//             <span
//               className="text-xs bg-yellow-500/20 text-yellow-400
//                          px-2 py-0.5 rounded-full"
//             >
//               Pinned
//             </span>
//           )}
//           <h3 className="font-semibold">{task.title}</h3>
//         </div>

//         <p className="text-gray-400 text-sm">{task.description}</p>

//         <div
//           className="flex flex-wrap items-center gap-4
//                      text-xs text-gray-500 mt-2"
//         >
//           <span>
//             {task.name} · {task.branch} · {task.year}
//           </span>

//           <span>💬 {task.replies.length} replies</span>
//           <span>⏱ {formatTime(task.createdAt)}</span>

//           {task.tags.map(tag => (
//             <span
//               key={tag}
//               className="bg-[#222] px-2 py-1 rounded-full text-gray-300"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Arrow */}
//       <div className="text-gray-500 text-xl">›</div>
//     </div>
//   );
// }


//new mallu..

// import AddClub from "./AddClub";
// import JoinClub from "./JoinClub";

// export default function Club() {
//   return (
//     <div className="flex flex-col md:flex-row gap-4">
//       <div className="w-full md:w-[50vw] min-h-[60vh] rounded-2xl border border-white/10 mb-10
//                      bg-gradient-to-r from-[#0b0b0b]/80 to-[#141414]/80
//                      backdrop-blur-xl p-6 shadow-lg relative
//                      shadow-[0_0_25px_rgba(38,242,208,0.12)]
//                      transition-all duration-300
//                      hover:-translate-y-1
//                      hover:shadow-[0_0_40px_rgba(38,242,208,0.25)]
//                      hover:border-[#26F2D0]/40">
//         <AddClub />
//       </div>

//       <div className="w-full md:w-[50vw] min-h-[60vh] mb-10 rounded-2xl border border-white/10
//                      bg-gradient-to-r from-[#0b0b0b]/80 to-[#141414]/80
//                      backdrop-blur-xl p-6 shadow-lg relative
//                      shadow-[0_0_25px_rgba(38,242,208,0.12)]
//                      transition-all duration-300
//                      hover:-translate-y-1
//                      hover:shadow-[0_0_40px_rgba(38,242,208,0.25)]
//                      hover:border-[#26F2D0]/40">
//         <JoinClub />
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import ClubCard from "./ClubCard";
import MyClubPanel from "./MyClubPanel";
import { Search } from "lucide-react";

const CATEGORIES = [
  { key: "ALL",             label: "All" },
  { key: "AI",              label: "AI" },
  { key: "3D_PRINTING",    label: "3D Printing" },
  { key: "WEB_DEV",        label: "Web Dev" },
  { key: "ROBOTICS",       label: "Robotics" },
  { key: "ENTREPRENEURSHIP", label: "Entrepreneurship" },
  { key: "TECH_FEST",      label: "Tech Fest" },
  { key: "SPORTS",         label: "Sports" },
  { key: "CULTURAL",       label: "Cultural" },
  { key: "TOASTMASTERS",   label: "Toastmasters" },
  { key: "PHOTOGRAPHY",    label: "Photography" },
];

export default function Club() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(null);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("ALL");

  const token = sessionStorage.getItem("token");
  const myRoll = sessionStorage.getItem("rollNumber");
  const myName = sessionStorage.getItem("name");

  useEffect(() => { fetchClubs(); }, []);

  const fetchClubs = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/clubs/all");
      if (!res.ok) return;
      setClubs(await res.json());
    } catch (err) {
      console.error("Failed to fetch clubs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (clubId) => {
    if (!token) { setMessage("Please login to join a club"); return; }
    setJoining(clubId);
    setMessage("");
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${clubId}/join`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        const text = await res.text();
        setMessage(text || "Failed to join");
        setTimeout(() => setMessage(""), 4000);
        return;
      }
      const updated = await res.json();
      setClubs(prev => prev.map(c => c.id === clubId ? updated : c));
      setMessage("🎉 Joined! You're in a 2-day grace period.");
      setTimeout(() => setMessage(""), 4000);
    } catch {
      setMessage("Backend not reachable");
    } finally {
      setJoining(null);
    }
  };

  const handleClubUpdate = (updated) => {
    setClubs(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  // ✅ fetch fresh club data for detail view
  const handleCardClick = async (club) => {
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}`);
      if (res.ok) {
        const fresh = await res.json();
        setClubs(prev => prev.map(c => c.id === fresh.id ? fresh : c));
      }
    } catch {}
  };

  const myClubs = clubs.filter(c =>
    c.members?.includes(myRoll) || c.pendingMembers?.some(p => p.rollNumber === myRoll)
  );

  const otherClubs = clubs
    .filter(c => !c.members?.includes(myRoll) && !c.pendingMembers?.some(p => p.rollNumber === myRoll))
    .filter(c => filterCat === "ALL" || c.category === filterCat)
    .filter(c => !search.trim() ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="w-full pb-16">

      {/* ✅ My Clubs — full panel side by side */}
      {myClubs.length > 0 && (
        <MyClubPanel
          myClubs={myClubs}
          myRoll={myRoll}
          myName={myName}
          token={token}
          onUpdate={handleClubUpdate}
        />
      )}

      {/* ✅ Other clubs section */}
      <div>
        {/* Section header */}
        <div style={{
          display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px",
        }}>
          <div style={{
            height: "1px", flex: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1))",
          }} />
          <span style={{
            fontSize: "12px", fontWeight: 700, color: "#6b7280",
            letterSpacing: "0.1em", textTransform: "uppercase",
          }}>
            {myClubs.length > 0 ? "Other Clubs" : "All Clubs"}
            {otherClubs.length > 0 && ` (${otherClubs.length})`}
          </span>
          <div style={{
            height: "1px", flex: 1,
            background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)",
          }} />
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium
            ${message.includes("🎉")
              ? "bg-green-500/10 border border-green-500/20 text-green-400"
              : "bg-red-500/10 border border-red-500/20 text-red-400"}`}>
            {message}
          </div>
        )}

        {/* Search + filter */}
        <div className="flex flex-col gap-3 mb-5">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search clubs..."
              className="w-full bg-[#111] border border-white/10 rounded-full pl-9 pr-4 py-2.5
                         text-sm text-white placeholder-gray-500 outline-none
                         focus:border-[#26F2D0]/50 transition" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map(cat => (
              <button key={cat.key} onClick={() => setFilterCat(cat.key)}
                className={`text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition-all
                  ${filterCat === cat.key
                    ? "bg-[#26F2D0]/20 text-[#26F2D0] border-[#26F2D0]/30"
                    : "border-white/10 text-gray-500 hover:border-white/20"}`}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-[#26F2D0] border-t-transparent
                            rounded-full animate-spin" />
          </div>
        )}

        {/* No clubs created yet */}
        {!loading && clubs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🏛️</p>
            <p className="text-gray-400">No clubs created yet.</p>
            <p className="text-gray-600 text-sm mt-1">Admin will create clubs soon.</p>
          </div>
        )}

        {/* Max clubs reached */}
        {myClubs.length >= 2 && otherClubs.length > 0 && (
          <div className="mb-4 px-4 py-3 rounded-xl text-xs text-gray-500
                          bg-white/5 border border-white/10">
            You've reached the maximum of 2 clubs. Leave a club to join another.
          </div>
        )}

        {/* Club grid */}
        {!loading && otherClubs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {otherClubs.map(club => (
              <ClubCard
                key={club.id}
                club={club}
                myRoll={myRoll}
                onJoin={myClubs.length < 2 ? handleJoin : () => setMessage("You can only join 2 clubs maximum.")}
                joining={joining}
                onClick={handleCardClick}
              />
            ))}
          </div>
        )}

        {/* No results from search */}
        {!loading && clubs.length > 0 && otherClubs.length === 0 && myClubs.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">
            No clubs match your search.
          </div>
        )}

        {/* All joined */}
        {!loading && otherClubs.length === 0 && myClubs.length > 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            {myClubs.length >= 2
              ? "You've joined all available clubs you can."
              : "No other clubs available right now."}
          </div>
        )}
      </div>
    </div>
  );
}