// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("students");
//   const [students, setStudents] = useState([]);
//   const [ideas, setIdeas] = useState([]);
//   const [clubs, setClubs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const headers = {
//     "Authorization": `Bearer ${token}`,
//     "Content-Type": "application/json"
//   };

//   // ✅ Logout
//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   // ✅ Fetch Students
//   const fetchStudents = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/admin/students", { headers });
//     const data = await res.json();
//     setStudents(data);
//     setLoading(false);
//   };

//   // ✅ Fetch Ideas
//   const fetchIdeas = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/ideas", { headers });
//     const data = await res.json();
//     setIdeas(data);
//     setLoading(false);
//   };

//   // ✅ Fetch Clubs
//   const fetchClubs = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/clubs/all", { headers });
//     const data = await res.json();
//     setClubs(data);
//     setLoading(false);
//   };

//   // ✅ Delete Student
//   const deleteStudent = async (id) => {
//     if (!window.confirm("Delete this student?")) return;
//     await fetch(`http://localhost:8081/api/admin/students/${id}`, {
//       method: "DELETE", headers
//     });
//     setStudents(students.filter(s => s.id !== id));
//   };

//   // ✅ Delete Idea
//   const deleteIdea = async (id) => {
//     if (!window.confirm("Delete this idea?")) return;
//     await fetch(`http://localhost:8081/api/ideas/${id}`, {
//       method: "DELETE", headers
//     });
//     setIdeas(ideas.filter(i => i._id !== id));
//   };

//   // ✅ Delete Club
//   const deleteClub = async (id) => {
//     if (!window.confirm("Delete this club?")) return;
//     await fetch(`http://localhost:8081/api/clubs/${id}`, {
//       method: "DELETE", headers
//     });
//     setClubs(clubs.filter(c => c.id !== id));
//   };

//   useEffect(() => {
//     if (activeTab === "students") fetchStudents();
//     if (activeTab === "ideas") fetchIdeas();
//     if (activeTab === "clubs") fetchClubs();
//   }, [activeTab]);

//   const tabs = ["students", "ideas", "clubs"];

//   return (
//     <div className="min-h-screen bg-[#0f0f0f] text-white">

//       {/* Header */}
//       <div className="bg-[#0b0b0b] border-b border-white/10 px-8 py-4 flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-[#26F2D0]">⚙️ Admin Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-2 px-8 pt-6 border-b border-white/10 pb-0">
//         {tabs.map(tab => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-6 py-2 rounded-t-lg font-medium capitalize transition ${
//               activeTab === tab
//                 ? "bg-[#26F2D0] text-black"
//                 : "bg-[#1a1a1a] text-gray-400 hover:text-white"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="p-8">

//         {loading && (
//           <div className="flex justify-center mt-20">
//             <p className="text-gray-400 text-lg">Loading...</p>
//           </div>
//         )}

//         {/* ===== STUDENTS ===== */}
//         {activeTab === "students" && !loading && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">All Students ({students.length})</h2>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm text-left">
//                 <thead className="bg-[#1a1a1a] text-gray-400">
//                   <tr>
//                     <th className="p-3">Name</th>
//                     <th className="p-3">Roll Number</th>
//                     <th className="p-3">Branch</th>
//                     <th className="p-3">Year</th>
//                     <th className="p-3">Degree</th>
//                     <th className="p-3">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map(s => (
//                     <tr key={s.id} className="border-b border-white/5 hover:bg-white/5">
//                       <td className="p-3">{s.name}</td>
//                       <td className="p-3">{s.rollNumber}</td>
//                       <td className="p-3">{s.branch}</td>
//                       <td className="p-3">{s.year}</td>
//                       <td className="p-3">{s.degree}</td>
//                       <td className="p-3">
//                         <button
//                           onClick={() => deleteStudent(s.id)}
//                           className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* ===== IDEAS ===== */}
//         {activeTab === "ideas" && !loading && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">All Ideas ({ideas.length})</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//               {ideas.map(idea => (
//                 <div key={idea._id} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="font-semibold text-white">{idea.title}</h3>
//                     <button
//                       onClick={() => deleteIdea(idea._id)}
//                       className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs ml-2"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                   <p className="text-gray-400 text-sm mb-2">{idea.description}</p>
//                   <p className="text-gray-500 text-xs">by {idea.name} • {idea.branch}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* ===== CLUBS ===== */}
//         {activeTab === "clubs" && !loading && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">All Clubs ({clubs.length})</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//               {clubs.map(club => (
//                 <div key={club.id} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="font-semibold text-white">{club.name}</h3>
//                     <button
//                       onClick={() => deleteClub(club.id)}
//                       className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs ml-2"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                   <p className="text-gray-400 text-sm mb-2">{club.description}</p>
//                   <p className="text-gray-500 text-xs">{club.members?.length || 0} members</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("students");
//   const [students, setStudents] = useState([]);
//   const [ideas, setIdeas] = useState([]);
//   const [clubs, setClubs] = useState([]);
//   const [announcements, setAnnouncements] = useState([]);
//   const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "", category: "General", imageUrl: "" });
//   const [imageUploading, setImageUploading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
  

//   const token = sessionStorage.getItem("token");
//   const headers = {
//     "Authorization": `Bearer ${token}`,
//     "Content-Type": "application/json"
//   };

//   const handleLogout = () => {
//     sessionStorage.clear();
//     navigate("/");
//   };

//   const fetchStudents = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/admin/students", { headers });
//     const data = await res.json();
//     setStudents(data);
//     setLoading(false);
//   };

//   const fetchIdeas = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/ideas", { headers });
//     const data = await res.json();
//     setIdeas(data);
//     setLoading(false);
//   };

//   const fetchClubs = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/clubs/all", { headers });
//     const data = await res.json();
//     setClubs(data);
//     setLoading(false);
//   };

//   const fetchAnnouncements = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/announcements", { headers });
//     const data = await res.json();
//     setAnnouncements(data);
//     setLoading(false);
//   };

//   const deleteStudent = async (id) => {
//     if (!window.confirm("Delete this student?")) return;
//     const res = await fetch(`http://localhost:8081/api/admin/students/${id}`, {
//       method: "DELETE", headers
//     });
//     if (res.ok) setStudents(prev => prev.filter(s => s.id !== id));
//   };

//   const deleteIdea = async (id) => {
//     if (!window.confirm("Delete this idea?")) return;
//     const res = await fetch(`http://localhost:8081/api/ideas/${id}`, {
//       method: "DELETE", headers
//     });
//     if (res.ok) setIdeas(prev => prev.filter(i => i._id !== id));
//   };

//   const deleteClub = async (id) => {
//     if (!window.confirm("Delete this club?")) return;
//     const res = await fetch(`http://localhost:8081/api/clubs/${id}`, {
//       method: "DELETE", headers
//     });
//     if (res.ok) setClubs(prev => prev.filter(c => c.id !== id));
//   };

//   const deleteAnnouncement = async (id) => {
//     if (!window.confirm("Delete this announcement?")) return;
//     const res = await fetch(`http://localhost:8081/api/announcements/${id}`, {
//       method: "DELETE", headers
//     });
//     if (res.ok) setAnnouncements(prev => prev.filter(a => a.id !== id));
//   };

//   const uploadImage = async (file) => {
//     setImageUploading(true);
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "xk6yja12");
//     const res = await fetch("https://api.cloudinary.com/v1_1/dn6ot9flx/image/upload", {
//       method: "POST",
//       body: formData
//     });
//     const data = await res.json();
//     setNewAnnouncement(prev => ({ ...prev, imageUrl: data.secure_url }));
//     setImageUploading(false);
//   };

//   const postAnnouncement = async () => {
//     if (!newAnnouncement.title || !newAnnouncement.content) return;
//     const res = await fetch("http://localhost:8081/api/announcements", {
//       method: "POST",
//       headers,
//       body: JSON.stringify(newAnnouncement)
//     });
//     const saved = await res.json();
//     setAnnouncements(prev => [saved, ...prev]);
//     setNewAnnouncement({ title: "", content: "", category: "General", imageUrl: "" });
//   };

//   useEffect(() => {
//     if (activeTab === "students") fetchStudents();
//     if (activeTab === "ideas") fetchIdeas();
//     if (activeTab === "clubs") fetchClubs();
//     if (activeTab === "announcements") fetchAnnouncements();
//   }, [activeTab]);

//   const tabs = ["students", "ideas", "clubs", "announcements"];

//   return (
//     <div className="min-h-screen bg-[#0f0f0f] text-white">

//       {/* Header */}
//       <div className="bg-[#0b0b0b] border-b border-white/10 px-8 py-4 flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-[#26F2D0]">⚙️ Admin Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-2 px-8 pt-6 border-b border-white/10 pb-0 overflow-x-auto">
//         {tabs.map(tab => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-6 py-2 rounded-t-lg font-medium capitalize transition whitespace-nowrap ${
//               activeTab === tab
//                 ? "bg-[#26F2D0] text-black"
//                 : "bg-[#1a1a1a] text-gray-400 hover:text-white"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="p-8">

//         {loading && (
//           <div className="flex justify-center mt-20">
//             <p className="text-gray-400 text-lg">Loading...</p>
//           </div>
//         )}

//         {/* ===== STUDENTS ===== */}
//         {activeTab === "students" && !loading && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">All Students ({students.length})</h2>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm text-left">
//                 <thead className="bg-[#1a1a1a] text-gray-400">
//                   <tr>
//                     <th className="p-3">Name</th>
//                     <th className="p-3">Roll Number</th>
//                     <th className="p-3">Branch</th>
//                     <th className="p-3">Year</th>
//                     <th className="p-3">Degree</th>
//                     <th className="p-3">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map(s => (
//                     <tr key={s.id} className="border-b border-white/5 hover:bg-white/5">
//                       <td className="p-3">{s.name}</td>
//                       <td className="p-3">{s.rollNumber}</td>
//                       <td className="p-3">{s.branch}</td>
//                       <td className="p-3">{s.year}</td>
//                       <td className="p-3">{s.degree}</td>
//                       <td className="p-3">
//                         <button
//                           onClick={() => deleteStudent(s.id)}
//                           className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* ===== IDEAS ===== */}
//         {activeTab === "ideas" && !loading && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">All Ideas ({ideas.length})</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//               {ideas.map(idea => (
//                 <div key={idea._id} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="font-semibold text-white">{idea.title}</h3>
//                     <button
//                       onClick={() => deleteIdea(idea._id)}
//                       className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs ml-2"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                   <p className="text-gray-400 text-sm mb-2">{idea.description}</p>
//                   <p className="text-gray-500 text-xs">by {idea.name} • {idea.branch}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* ===== CLUBS ===== */}
//         {activeTab === "clubs" && !loading && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">All Clubs ({clubs.length})</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//               {clubs.map(club => (
//                 <div key={club.id} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="font-semibold text-white">{club.name}</h3>
//                     <button
//                       onClick={() => deleteClub(club.id)}
//                       className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs ml-2"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                   <p className="text-gray-400 text-sm mb-2">{club.description}</p>
//                   <p className="text-gray-500 text-xs">{club.members?.length || 0} members</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* ===== ANNOUNCEMENTS ===== */}
//         {activeTab === "announcements" && !loading && (
//           <div>
//             <h2 className="text-xl font-bold mb-6">Campus Announcements</h2>

//             {/* Post form */}
//             <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 mb-8">
//               <h3 className="font-semibold mb-4 text-[#26F2D0]">Post New Announcement</h3>
//               <div className="space-y-3">
//                 <select
//                   value={newAnnouncement.category}
//                   onChange={(e) => setNewAnnouncement({ ...newAnnouncement, category: e.target.value })}
//                   className="w-full p-3 bg-[#111] border border-white/10 rounded-lg text-white outline-none"
//                 >
//                   <option>General</option>
//                   <option>Event</option>
//                   <option>Academic</option>
//                   <option>Notice</option>
//                 </select>

//                 <input
//                   placeholder="Announcement title"
//                   value={newAnnouncement.title}
//                   onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
//                   className="w-full p-3 bg-[#111] border border-white/10 rounded-lg text-white outline-none focus:border-[#26F2D0]"
//                 />

//                 <textarea
//                   placeholder="Announcement content"
//                   rows="3"
//                   value={newAnnouncement.content}
//                   onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
//                   className="w-full p-3 bg-[#111] border border-white/10 rounded-lg text-white outline-none focus:border-[#26F2D0]"
//                 />

//                 {/* Image upload */}
//                 <div className="border border-dashed border-white/20 rounded-lg p-4">
//                   <label className="cursor-pointer flex flex-col items-center gap-2 text-gray-400 hover:text-white transition">
//                     <span className="text-2xl">📷</span>
//                     <span className="text-sm">{imageUploading ? "Uploading..." : "Click to upload image"}</span>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={(e) => e.target.files[0] && uploadImage(e.target.files[0])}
//                     />
//                   </label>
//                   {newAnnouncement.imageUrl && (
//                     <div className="mt-3 relative">
//                       <img src={newAnnouncement.imageUrl} className="w-full h-40 object-cover rounded-lg" />
//                       <button
//                         onClick={() => setNewAnnouncement(prev => ({ ...prev, imageUrl: "" }))}
//                         className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
//                       >×</button>
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   onClick={postAnnouncement}
//                   disabled={imageUploading}
//                   className="bg-[#26F2D0] text-black px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
//                 >
//                   Post Announcement
//                 </button>
//               </div>
//             </div>

//             {/* Announcements list */}
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//               {announcements.map(a => (
//                 <div key={a.id} className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
//                   {a.imageUrl && (
//                     <img src={a.imageUrl} className="w-full h-40 object-cover" />
//                   )}
//                   <div className="p-4">
//                     <div className="flex justify-between items-start mb-2">
//                       <span className="text-xs bg-[#26F2D0]/10 text-[#26F2D0] px-2 py-1 rounded-full">{a.category}</span>
//                       <button
//                         onClick={() => deleteAnnouncement(a.id)}
//                         className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
//                       >Delete</button>
//                     </div>
//                     <h3 className="font-semibold text-white mt-2">{a.title}</h3>
//                     <p className="text-gray-400 text-sm mt-1">{a.content}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("students");
//   const [students, setStudents] = useState([]);
//   const [moderators, setModerators] = useState([]);
//   const [modSearch, setModSearch] = useState("");
//   const [modSearchResult, setModSearchResult] = useState(null);
//   const [modSearching, setModSearching] = useState(false);
//   const [ideas, setIdeas] = useState([]);
//   const [clubs, setClubs] = useState([]);
//   const [announcements, setAnnouncements] = useState([]);
//   const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "", category: "General", imageUrl: "" });
//   const [imageUploading, setImageUploading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
 

//   const token = sessionStorage.getItem("token");
//   const headers = {
//     "Authorization": `Bearer ${token}`,
//     "Content-Type": "application/json"
//   };

//   const handleLogout = () => {
//     sessionStorage.clear();
//     navigate("/");
//   };

//   const fetchStudents = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/admin/students", { headers });
//     const data = await res.json();
//     setStudents(data);
//     setLoading(false);
//   };

//   const fetchModerators = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/admin/moderators", { headers });
//     const data = await res.json();
//     setModerators(data);
//     setLoading(false);
//   };

//   const fetchIdeas = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/ideas", { headers });
//     const data = await res.json();
//     setIdeas(data);
//     setLoading(false);
//   };

//   const fetchClubs = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/clubs/all", { headers });
//     const data = await res.json();
//     setClubs(data);
//     setLoading(false);
//   };

//   const fetchAnnouncements = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/announcements", { headers });
//     const data = await res.json();
//     setAnnouncements(data);
//     setLoading(false);
//   };

//   const searchStudent = async () => {
//     if (!modSearch.trim()) return;
//     setModSearching(true);
//     try {
//       const res = await fetch("http://localhost:8081/api/admin/students", { headers });
//       const all = await res.json();
//       const found = all.find(s =>
//         s.rollNumber.toLowerCase() === modSearch.toLowerCase() ||
//         s.name.toLowerCase().includes(modSearch.toLowerCase())
//       );
//       setModSearchResult(found || null);
//     } finally {
//       setModSearching(false);
//     }
//   };

//   const assignModerator = async (rollNumber) => {
//     const res = await fetch(
//       `http://localhost:8081/api/admin/students/${rollNumber}/assign-moderator`,
//       { method: "PATCH", headers }
//     );
//     if (res.ok) {
//       setModSearchResult(null);
//       setModSearch("");
//       fetchModerators();
//     }
//   };

//   const revokeModerator = async (rollNumber) => {
//     if (!window.confirm("Revoke moderator access?")) return;
//     const res = await fetch(
//       `http://localhost:8081/api/admin/students/${rollNumber}/revoke-moderator`,
//       { method: "PATCH", headers }
//     );
//     if (res.ok) fetchModerators();
//   };

//   const deleteStudent = async (id) => {
//     if (!window.confirm("Delete this student?")) return;
//     const res = await fetch(`http://localhost:8081/api/admin/students/${id}`, {
//       method: "DELETE", headers
//     });
//     if (res.ok) setStudents(prev => prev.filter(s => s.id !== id));
//   };

//   const deleteIdea = async (id) => {
//     if (!window.confirm("Delete this idea?")) return;
//     const res = await fetch(`http://localhost:8081/api/ideas/${id}`, {
//       method: "DELETE", headers
//     });
//     if (res.ok) setIdeas(prev => prev.filter(i => i._id !== id));
//   };

//   const deleteClub = async (id) => {
//     if (!window.confirm("Delete this club?")) return;
//     const res = await fetch(`http://localhost:8081/api/clubs/${id}`, {
//       method: "DELETE", headers
//     });
//     if (res.ok) setClubs(prev => prev.filter(c => c.id !== id));
//   };

//   const deleteAnnouncement = async (id) => {
//     if (!window.confirm("Delete this announcement?")) return;
//     const res = await fetch(`http://localhost:8081/api/announcements/${id}`, {
//       method: "DELETE", headers
//     });
//     if (res.ok) setAnnouncements(prev => prev.filter(a => a.id !== id));
//   };

//   const uploadImage = async (file) => {
//     setImageUploading(true);
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "xk6yja12");
//     const res = await fetch("https://api.cloudinary.com/v1_1/dn6ot9flx/image/upload", {
//       method: "POST",
//       body: formData
//     });
//     const data = await res.json();
//     setNewAnnouncement(prev => ({ ...prev, imageUrl: data.secure_url }));
//     setImageUploading(false);
//   };

//   const postAnnouncement = async () => {
//     if (!newAnnouncement.title || !newAnnouncement.content) return;
//     const res = await fetch("http://localhost:8081/api/announcements", {
//       method: "POST",
//       headers,
//       body: JSON.stringify(newAnnouncement)
//     });
//     const saved = await res.json();
//     setAnnouncements(prev => [saved, ...prev]);
//     setNewAnnouncement({ title: "", content: "", category: "General", imageUrl: "" });
//   };

//   useEffect(() => {
//     if (activeTab === "students") fetchStudents();
//     if (activeTab === "moderators") fetchModerators();
//     if (activeTab === "ideas") fetchIdeas();
//     if (activeTab === "clubs") fetchClubs();
//     if (activeTab === "announcements") fetchAnnouncements();
//   }, [activeTab]);

//   const tabs = ["students", "moderators", "ideas", "clubs", "announcements"];

//   return (
//     <div className="min-h-screen bg-[#0f0f0f] text-white">

//       {/* Header */}
//       <div className="bg-[#0b0b0b] border-b border-white/10 px-8 py-4 flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-[#26F2D0]">⚙️ Admin Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-2 px-8 pt-6 border-b border-white/10 pb-0 overflow-x-auto">
//         {tabs.map(tab => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-6 py-2 rounded-t-lg font-medium capitalize transition whitespace-nowrap ${
//               activeTab === tab
//                 ? "bg-[#26F2D0] text-black"
//                 : "bg-[#1a1a1a] text-gray-400 hover:text-white"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="p-8">

//         {loading && (
//           <div className="flex justify-center mt-20">
//             <p className="text-gray-400 text-lg">Loading...</p>
//           </div>
//         )}

//         {/* ===== MODERATORS ===== */}
//         {activeTab === "moderators" && !loading && (
//           <div className="max-w-2xl">
//             <h2 className="text-xl font-bold mb-2">Moderator Management</h2>
//             <p className="text-gray-400 text-sm mb-6">
//               Assign CR/GR or Teachers as moderators. They can post news and upload resources.
//             </p>

//             {/* Search + Assign */}
//             <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 mb-6">
//               <h3 className="text-sm font-semibold text-[#26F2D0] mb-3">🔍 Assign New Moderator</h3>
//               <div className="flex gap-2">
//                 <input
//                   value={modSearch}
//                   onChange={e => setModSearch(e.target.value)}
//                   onKeyDown={e => e.key === "Enter" && searchStudent()}
//                   placeholder="Search by roll number or name..."
//                   className="flex-1 bg-[#111] border border-white/10 rounded-xl px-4 py-2.5
//                              text-sm text-white placeholder-gray-500 outline-none
//                              focus:border-[#26F2D0]/50 transition"
//                 />
//                 <button
//                   onClick={searchStudent}
//                   disabled={modSearching}
//                   className="px-5 py-2.5 bg-[#26F2D0] text-black rounded-xl text-sm
//                              font-semibold hover:bg-[#1dd4b8] transition disabled:opacity-50"
//                 >
//                   {modSearching ? "..." : "Search"}
//                 </button>
//               </div>

//               {/* Search result */}
//               {modSearchResult && (
//                 <div className="mt-4 flex items-center justify-between bg-white/5
//                                 border border-white/10 rounded-xl px-4 py-3">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-[#26F2D0]/10 border border-[#26F2D0]/20
//                                     flex items-center justify-center text-[#26F2D0] font-bold">
//                       {modSearchResult.name?.[0]?.toUpperCase()}
//                     </div>
//                     <div>
//                       <p className="text-white font-medium text-sm">{modSearchResult.name}</p>
//                       <p className="text-gray-500 text-xs">
//                         {modSearchResult.rollNumber} · {modSearchResult.branch} · {modSearchResult.year}
//                       </p>
//                     </div>
//                   </div>
//                   {modSearchResult.role === "MODERATOR" ? (
//                     <span className="text-xs text-[#26F2D0] bg-[#26F2D0]/10 px-3 py-1 rounded-full">
//                       Already Moderator
//                     </span>
//                   ) : (
//                     <button
//                       onClick={() => assignModerator(modSearchResult.rollNumber)}
//                       className="px-4 py-2 bg-[#26F2D0]/20 text-[#26F2D0] border border-[#26F2D0]/30
//                                  rounded-xl text-xs font-semibold hover:bg-[#26F2D0]/30 transition"
//                     >
//                       🛡️ Assign Moderator
//                     </button>
//                   )}
//                 </div>
//               )}

//               {modSearchResult === null && modSearch && !modSearching && (
//                 <p className="text-xs text-gray-500 mt-3">No student found for "{modSearch}"</p>
//               )}
//             </div>

//             {/* Current moderators */}
//             <div>
//               <h3 className="text-sm font-semibold text-gray-400 mb-3">
//                 🛡️ Current Moderators ({moderators.length})
//               </h3>
//               {moderators.length === 0 ? (
//                 <div className="text-center py-10 bg-[#1a1a1a] border border-white/10 rounded-2xl">
//                   <p className="text-3xl mb-2">🛡️</p>
//                   <p className="text-gray-400 text-sm">No moderators assigned yet</p>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {moderators.map(mod => (
//                     <div key={mod.id}
//                       className="flex items-center justify-between bg-[#1a1a1a]
//                                  border border-[#26F2D0]/20 rounded-2xl px-4 py-3">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-xl bg-[#26F2D0]/10 border border-[#26F2D0]/20
//                                         flex items-center justify-center text-[#26F2D0] font-bold">
//                           {mod.name?.[0]?.toUpperCase()}
//                         </div>
//                         <div>
//                           <div className="flex items-center gap-2">
//                             <p className="text-white font-medium text-sm">{mod.name}</p>
//                             <span className="text-xs bg-[#26F2D0]/10 text-[#26F2D0]
//                                              px-2 py-0.5 rounded-full">🛡️ Moderator</span>
//                           </div>
//                           <p className="text-gray-500 text-xs">
//                             {mod.rollNumber} · {mod.branch} · {mod.year}
//                           </p>
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => revokeModerator(mod.rollNumber)}
//                         className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20
//                                    rounded-xl text-xs font-semibold hover:bg-red-500/20 transition"
//                       >
//                         Revoke
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* ===== STUDENTS ===== */}
//         {activeTab === "students" && !loading && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">All Students ({students.length})</h2>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm text-left">
//                 <thead className="bg-[#1a1a1a] text-gray-400">
//                   <tr>
//                     <th className="p-3">Name</th>
//                     <th className="p-3">Roll Number</th>
//                     <th className="p-3">Branch</th>
//                     <th className="p-3">Year</th>
//                     <th className="p-3">Degree</th>
//                     <th className="p-3">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map(s => (
//                     <tr key={s.id} className="border-b border-white/5 hover:bg-white/5">
//                       <td className="p-3">{s.name}</td>
//                       <td className="p-3">{s.rollNumber}</td>
//                       <td className="p-3">{s.branch}</td>
//                       <td className="p-3">{s.year}</td>
//                       <td className="p-3">{s.degree}</td>
//                       <td className="p-3">
//                         <button
//                           onClick={() => deleteStudent(s.id)}
//                           className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* ===== IDEAS ===== */}
//         {activeTab === "ideas" && !loading && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">All Ideas ({ideas.length})</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//               {ideas.map(idea => (
//                 <div key={idea._id} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="font-semibold text-white">{idea.title}</h3>
//                     <button
//                       onClick={() => deleteIdea(idea._id)}
//                       className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs ml-2"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                   <p className="text-gray-400 text-sm mb-2">{idea.description}</p>
//                   <p className="text-gray-500 text-xs">by {idea.name} • {idea.branch}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* ===== CLUBS ===== */}
//         {activeTab === "clubs" && !loading && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">All Clubs ({clubs.length})</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//               {clubs.map(club => (
//                 <div key={club.id} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="font-semibold text-white">{club.name}</h3>
//                     <button
//                       onClick={() => deleteClub(club.id)}
//                       className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs ml-2"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                   <p className="text-gray-400 text-sm mb-2">{club.description}</p>
//                   <p className="text-gray-500 text-xs">{club.members?.length || 0} members</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* ===== ANNOUNCEMENTS ===== */}
//         {activeTab === "announcements" && !loading && (
//           <div>
//             <h2 className="text-xl font-bold mb-6">Campus Announcements</h2>

//             {/* Post form */}
//             <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 mb-8">
//               <h3 className="font-semibold mb-4 text-[#26F2D0]">Post New Announcement</h3>
//               <div className="space-y-3">
//                 <select
//                   value={newAnnouncement.category}
//                   onChange={(e) => setNewAnnouncement({ ...newAnnouncement, category: e.target.value })}
//                   className="w-full p-3 bg-[#111] border border-white/10 rounded-lg text-white outline-none"
//                 >
//                   <option>General</option>
//                   <option>Event</option>
//                   <option>Academic</option>
//                   <option>Notice</option>
//                 </select>

//                 <input
//                   placeholder="Announcement title"
//                   value={newAnnouncement.title}
//                   onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
//                   className="w-full p-3 bg-[#111] border border-white/10 rounded-lg text-white outline-none focus:border-[#26F2D0]"
//                 />

//                 <textarea
//                   placeholder="Announcement content"
//                   rows="3"
//                   value={newAnnouncement.content}
//                   onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
//                   className="w-full p-3 bg-[#111] border border-white/10 rounded-lg text-white outline-none focus:border-[#26F2D0]"
//                 />

//                 {/* Image upload */}
//                 <div className="border border-dashed border-white/20 rounded-lg p-4">
//                   <label className="cursor-pointer flex flex-col items-center gap-2 text-gray-400 hover:text-white transition">
//                     <span className="text-2xl">📷</span>
//                     <span className="text-sm">{imageUploading ? "Uploading..." : "Click to upload image"}</span>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={(e) => e.target.files[0] && uploadImage(e.target.files[0])}
//                     />
//                   </label>
//                   {newAnnouncement.imageUrl && (
//                     <div className="mt-3 relative">
//                       <img src={newAnnouncement.imageUrl} className="w-full h-40 object-cover rounded-lg" />
//                       <button
//                         onClick={() => setNewAnnouncement(prev => ({ ...prev, imageUrl: "" }))}
//                         className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
//                       >×</button>
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   onClick={postAnnouncement}
//                   disabled={imageUploading}
//                   className="bg-[#26F2D0] text-black px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
//                 >
//                   Post Announcement
//                 </button>
//               </div>
//             </div>

//             {/* Announcements list */}
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//               {announcements.map(a => (
//                 <div key={a.id} className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
//                   {a.imageUrl && (
//                     <img src={a.imageUrl} className="w-full h-40 object-cover" />
//                   )}
//                   <div className="p-4">
//                     <div className="flex justify-between items-start mb-2">
//                       <span className="text-xs bg-[#26F2D0]/10 text-[#26F2D0] px-2 py-1 rounded-full">{a.category}</span>
//                       <button
//                         onClick={() => deleteAnnouncement(a.id)}
//                         className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
//                       >Delete</button>
//                     </div>
//                     <h3 className="font-semibold text-white mt-2">{a.title}</h3>
//                     <p className="text-gray-400 text-sm mt-1">{a.content}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ModeratorIdeaReview from "./ModeratorIdeaReview";
// import IdeaAdminCard from "./IdeaAdminCard";

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("students");
//   const [students, setStudents] = useState([]);
//   const [moderators, setModerators] = useState([]);
//   const [modSearch, setModSearch] = useState("");
//   const [modSearchResult, setModSearchResult] = useState(null);
//   const [modSearching, setModSearching] = useState(false);
//   const [ideas, setIdeas] = useState([]);
//   const [clubs, setClubs] = useState([]);
//   const [announcements, setAnnouncements] = useState([]);
//   const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "", category: "General", imageUrl: "" });
//   const [imageUploading, setImageUploading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [editingAnnouncementId, setEditingAnnouncementId] = useState(null);
//   const [editAnnouncementForm, setEditAnnouncementForm] = useState({ title: "", content: "", category: "" });
//   const [announcementSaving, setAnnouncementSaving] = useState(false);
//   const navigate = useNavigate();

//   const token = sessionStorage.getItem("token");
//   const headers = {
//     "Authorization": `Bearer ${token}`,
//     "Content-Type": "application/json"
//   };

//   const handleLogout = () => {
//     sessionStorage.clear();
//     navigate("/");
//   };

//   const fetchStudents = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/admin/students", { headers });
//     const data = await res.json();
//     setStudents(data);
//     setLoading(false);
//   };

//   const fetchModerators = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/admin/moderators", { headers });
//     const data = await res.json();
//     setModerators(data);
//     setLoading(false);
//   };

//   const fetchIdeas = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/ideas", { headers });
//     const data = await res.json();
//     setIdeas(data);
//     setLoading(false);
//   };

//   const fetchClubs = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/clubs/all", { headers });
//     const data = await res.json();
//     setClubs(data);
//     setLoading(false);
//   };

//   const fetchAnnouncements = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/announcements", { headers });
//     const data = await res.json();
//     setAnnouncements(data);
//     setLoading(false);
//   };

//   const searchStudent = async () => {
//     if (!modSearch.trim()) return;
//     setModSearching(true);
//     try {
//       const res = await fetch("http://localhost:8081/api/admin/students", { headers });
//       const all = await res.json();
//       const found = all.find(s =>
//         s.rollNumber.toLowerCase() === modSearch.toLowerCase() ||
//         s.name.toLowerCase().includes(modSearch.toLowerCase())
//       );
//       setModSearchResult(found || null);
//     } finally {
//       setModSearching(false);
//     }
//   };

//   const assignModerator = async (rollNumber) => {
//     const res = await fetch(
//       `http://localhost:8081/api/admin/students/${rollNumber}/assign-moderator`,
//       { method: "PATCH", headers }
//     );
//     if (res.ok) {
//       setModSearchResult(null);
//       setModSearch("");
//       fetchModerators();
//     }
//   };

//   const revokeModerator = async (rollNumber) => {
//     if (!window.confirm("Revoke moderator access?")) return;
//     const res = await fetch(
//       `http://localhost:8081/api/admin/students/${rollNumber}/revoke-moderator`,
//       { method: "PATCH", headers }
//     );
//     if (res.ok) fetchModerators();
//   };

//   const deleteStudent = async (id) => {
//     if (!window.confirm("Delete this student?")) return;
//     const res = await fetch(`http://localhost:8081/api/admin/students/${id}`, {
//       method: "DELETE", headers
//     });
//     if (res.ok) setStudents(prev => prev.filter(s => s.id !== id));
//   };

//   const deleteIdea = (id) => {
//   setIdeas(prev => prev.filter(i => (i.id || i._id) !== id));
// };

//   const deleteClub = async (id) => {
//     if (!window.confirm("Delete this club?")) return;
//     const res = await fetch(`http://localhost:8081/api/clubs/${id}`, {
//       method: "DELETE", headers
//     });
//     if (res.ok) setClubs(prev => prev.filter(c => c.id !== id));
//   };

//   const deleteAnnouncement = async (id) => {
//     if (!window.confirm("Delete this announcement?")) return;
//     const res = await fetch(`http://localhost:8081/api/announcements/${id}`, {
//       method: "DELETE", headers
//     });
//     if (res.ok) setAnnouncements(prev => prev.filter(a => a.id !== id));
//   };

//   const pinAnnouncement = async (id) => {
//     const res = await fetch(`http://localhost:8081/api/announcements/${id}/pin`, {
//       method: "PATCH", headers
//     });
//     if (res.ok) {
//       const updated = await res.json();
//       setAnnouncements(prev => {
//         const newList = prev.map(a => a.id === updated.id ? updated : a);
//         return newList.sort((a, b) => {
//           if (a.pinned && !b.pinned) return -1;
//           if (!a.pinned && b.pinned) return 1;
//           return b.timestamp - a.timestamp;
//         });
//       });
//     }
//   };

//   const saveAnnouncementEdit = async (id) => {
//     setAnnouncementSaving(true);
//     try {
//       const res = await fetch(`http://localhost:8081/api/announcements/${id}`, {
//         method: "PUT",
//         headers,
//         body: JSON.stringify(editAnnouncementForm)
//       });
//       if (res.ok) {
//         const updated = await res.json();
//         setAnnouncements(prev => prev.map(a => a.id === updated.id ? updated : a));
//         setEditingAnnouncementId(null);
//       }
//     } finally {
//       setAnnouncementSaving(false);
//     }
//   };

//   const uploadImage = async (file) => {
//     setImageUploading(true);
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "xk6yja12");
//     const res = await fetch("https://api.cloudinary.com/v1_1/dn6ot9flx/image/upload", {
//       method: "POST",
//       body: formData
//     });
//     const data = await res.json();
//     setNewAnnouncement(prev => ({ ...prev, imageUrl: data.secure_url }));
//     setImageUploading(false);
//   };

//   const postAnnouncement = async () => {
//     if (!newAnnouncement.title || !newAnnouncement.content) return;
//     const res = await fetch("http://localhost:8081/api/announcements", {
//       method: "POST",
//       headers,
//       body: JSON.stringify(newAnnouncement)
//     });
//     const saved = await res.json();
//     setAnnouncements(prev => [saved, ...prev]);
//     setNewAnnouncement({ title: "", content: "", category: "General", imageUrl: "" });
//   };

//   useEffect(() => {
//     if (activeTab === "students") fetchStudents();
//     if (activeTab === "moderators") fetchModerators();
//     if (activeTab === "ideas") fetchIdeas();
//     if (activeTab === "clubs") fetchClubs();
//     if (activeTab === "announcements") fetchAnnouncements();
    
//   }, [activeTab]);

//   const tabs = ["students", "moderators", "ideas", "clubs", "announcements","review"];

//   return (
//     <div className="min-h-screen bg-[#0f0f0f] text-white">

//       {/* Header */}
//       <div className="bg-[#0b0b0b] border-b border-white/10 px-8 py-4 flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-[#26F2D0]">⚙️ Admin Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-2 px-8 pt-6 border-b border-white/10 pb-0 overflow-x-auto">
//         {tabs.map(tab => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-6 py-2 rounded-t-lg font-medium capitalize transition whitespace-nowrap ${
//               activeTab === tab
//                 ? "bg-[#26F2D0] text-black"
//                 : "bg-[#1a1a1a] text-gray-400 hover:text-white"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="p-8">

//         {loading && (
//           <div className="flex justify-center mt-20">
//             <p className="text-gray-400 text-lg">Loading...</p>
//           </div>
//         )}

//         {/* ===== MODERATORS ===== */}
//         {activeTab === "moderators" && !loading && (
//           <div className="max-w-2xl">
//             <h2 className="text-xl font-bold mb-2">Moderator Management</h2>
//             <p className="text-gray-400 text-sm mb-6">
//               Assign CR/GR or Teachers as moderators. They can post news and upload resources.
//             </p>

//             <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 mb-6">
//               <h3 className="text-sm font-semibold text-[#26F2D0] mb-3">🔍 Assign New Moderator</h3>
//               <div className="flex gap-2">
//                 <input
//                   value={modSearch}
//                   onChange={e => setModSearch(e.target.value)}
//                   onKeyDown={e => e.key === "Enter" && searchStudent()}
//                   placeholder="Search by roll number or name..."
//                   className="flex-1 bg-[#111] border border-white/10 rounded-xl px-4 py-2.5
//                              text-sm text-white placeholder-gray-500 outline-none
//                              focus:border-[#26F2D0]/50 transition"
//                 />
//                 <button
//                   onClick={searchStudent}
//                   disabled={modSearching}
//                   className="px-5 py-2.5 bg-[#26F2D0] text-black rounded-xl text-sm
//                              font-semibold hover:bg-[#1dd4b8] transition disabled:opacity-50"
//                 >
//                   {modSearching ? "..." : "Search"}
//                 </button>
//               </div>

//               {modSearchResult && (
//                 <div className="mt-4 flex items-center justify-between bg-white/5
//                                 border border-white/10 rounded-xl px-4 py-3">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-[#26F2D0]/10 border border-[#26F2D0]/20
//                                     flex items-center justify-center text-[#26F2D0] font-bold">
//                       {modSearchResult.name?.[0]?.toUpperCase()}
//                     </div>
//                     <div>
//                       <p className="text-white font-medium text-sm">{modSearchResult.name}</p>
//                       <p className="text-gray-500 text-xs">
//                         {modSearchResult.rollNumber} · {modSearchResult.branch} · {modSearchResult.year}
//                       </p>
//                     </div>
//                   </div>
//                   {modSearchResult.role === "MODERATOR" ? (
//                     <span className="text-xs text-[#26F2D0] bg-[#26F2D0]/10 px-3 py-1 rounded-full">
//                       Already Moderator
//                     </span>
//                   ) : (
//                     <button
//                       onClick={() => assignModerator(modSearchResult.rollNumber)}
//                       className="px-4 py-2 bg-[#26F2D0]/20 text-[#26F2D0] border border-[#26F2D0]/30
//                                  rounded-xl text-xs font-semibold hover:bg-[#26F2D0]/30 transition"
//                     >
//                       🛡️ Assign Moderator
//                     </button>
//                   )}
//                 </div>
//               )}

//               {modSearchResult === null && modSearch && !modSearching && (
//                 <p className="text-xs text-gray-500 mt-3">No student found for "{modSearch}"</p>
//               )}
//             </div>

//             <div>
//               <h3 className="text-sm font-semibold text-gray-400 mb-3">
//                 🛡️ Current Moderators ({moderators.length})
//               </h3>
//               {moderators.length === 0 ? (
//                 <div className="text-center py-10 bg-[#1a1a1a] border border-white/10 rounded-2xl">
//                   <p className="text-3xl mb-2">🛡️</p>
//                   <p className="text-gray-400 text-sm">No moderators assigned yet</p>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {moderators.map(mod => (
//                     <div key={mod.id}
//                       className="flex items-center justify-between bg-[#1a1a1a]
//                                  border border-[#26F2D0]/20 rounded-2xl px-4 py-3">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-xl bg-[#26F2D0]/10 border border-[#26F2D0]/20
//                                         flex items-center justify-center text-[#26F2D0] font-bold">
//                           {mod.name?.[0]?.toUpperCase()}
//                         </div>
//                         <div>
//                           <div className="flex items-center gap-2">
//                             <p className="text-white font-medium text-sm">{mod.name}</p>
//                             <span className="text-xs bg-[#26F2D0]/10 text-[#26F2D0] px-2 py-0.5 rounded-full">
//                               🛡️ Moderator
//                             </span>
//                           </div>
//                           <p className="text-gray-500 text-xs">
//                             {mod.rollNumber} · {mod.branch} · {mod.year}
//                           </p>
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => revokeModerator(mod.rollNumber)}
//                         className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20
//                                    rounded-xl text-xs font-semibold hover:bg-red-500/20 transition"
//                       >
//                         Revoke
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* ===== STUDENTS ===== */}
//         {activeTab === "students" && !loading && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">All Students ({students.length})</h2>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm text-left">
//                 <thead className="bg-[#1a1a1a] text-gray-400">
//                   <tr>
//                     <th className="p-3">Name</th>
//                     <th className="p-3">Roll Number</th>
//                     <th className="p-3">Branch</th>
//                     <th className="p-3">Year</th>
//                     <th className="p-3">Degree</th>
//                     <th className="p-3">Role</th>
//                     <th className="p-3">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map(s => (
//                     <tr key={s.id} className="border-b border-white/5 hover:bg-white/5">
//                       <td className="p-3">{s.name}</td>
//                       <td className="p-3">{s.rollNumber}</td>
//                       <td className="p-3">{s.branch}</td>
//                       <td className="p-3">{s.year}</td>
//                       <td className="p-3">{s.degree}</td>
//                       <td className="p-3">
//                         {s.role === "MODERATOR" ? (
//                           <span className="text-xs bg-[#26F2D0]/10 text-[#26F2D0] px-2 py-0.5 rounded-full">
//                             🛡️ Mod
//                           </span>
//                         ) : (
//                           <span className="text-xs text-gray-500">Student</span>
//                         )}
//                       </td>
//                       <td className="p-3">
//                         <button
//                           onClick={() => deleteStudent(s.id)}
//                           className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//     {/* ===== IDEAS ===== */}
// {activeTab === "ideas" && !loading && (
//   <div>
//     <h2 className="text-xl font-bold mb-4">All Ideas ({ideas.length})</h2>
//     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//       {ideas.map(idea => (
//         <IdeaAdminCard
//           key={idea.id || idea._id}
//           idea={idea}
//           onDelete={deleteIdea}
//         />
//       ))}
//     </div>
//   </div>
// )}

//         {/* ===== CLUBS ===== */}
//         {activeTab === "clubs" && !loading && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">All Clubs ({clubs.length})</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//               {clubs.map(club => (
//                 <div key={club.id} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="font-semibold text-white">{club.name}</h3>
//                     <button
//                       onClick={() => deleteClub(club.id)}
//                       className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs ml-2"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                   <p className="text-gray-400 text-sm mb-2">{club.description}</p>
//                   <p className="text-gray-500 text-xs">{club.members?.length || 0} members</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* ===== ANNOUNCEMENTS ===== */}
//         {activeTab === "announcements" && !loading && (
//           <div>
//             <h2 className="text-xl font-bold mb-6">Campus Announcements</h2>

//             {/* Post form */}
//             <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 mb-8">
//               <h3 className="font-semibold mb-4 text-[#26F2D0]">Post New Announcement</h3>
//               <div className="space-y-3">
//                 <select
//                   value={newAnnouncement.category}
//                   onChange={(e) => setNewAnnouncement({ ...newAnnouncement, category: e.target.value })}
//                   className="w-full p-3 bg-[#111] border border-white/10 rounded-lg text-white outline-none"
//                 >
//                   <option>General</option>
//                   <option>Event</option>
//                   <option>Academic</option>
//                   <option>Notice</option>
//                 </select>
//                 <input
//                   placeholder="Announcement title"
//                   value={newAnnouncement.title}
//                   onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
//                   className="w-full p-3 bg-[#111] border border-white/10 rounded-lg text-white outline-none focus:border-[#26F2D0]"
//                 />
//                 <textarea
//                   placeholder="Announcement content"
//                   rows="3"
//                   value={newAnnouncement.content}
//                   onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
//                   className="w-full p-3 bg-[#111] border border-white/10 rounded-lg text-white outline-none focus:border-[#26F2D0]"
//                 />
//                 <div className="border border-dashed border-white/20 rounded-lg p-4">
//                   <label className="cursor-pointer flex flex-col items-center gap-2 text-gray-400 hover:text-white transition">
//                     <span className="text-2xl">📷</span>
//                     <span className="text-sm">{imageUploading ? "Uploading..." : "Click to upload image"}</span>
//                     <input
//                       type="file" accept="image/*" className="hidden"
//                       onChange={(e) => e.target.files[0] && uploadImage(e.target.files[0])}
//                     />
//                   </label>
//                   {newAnnouncement.imageUrl && (
//                     <div className="mt-3 relative">
//                       <img src={newAnnouncement.imageUrl} className="w-full h-40 object-cover rounded-lg" />
//                       <button
//                         onClick={() => setNewAnnouncement(prev => ({ ...prev, imageUrl: "" }))}
//                         className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
//                       >×</button>
//                     </div>
//                   )}
//                 </div>
//                 <button
//                   onClick={postAnnouncement}
//                   disabled={imageUploading}
//                   className="bg-[#26F2D0] text-black px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
//                 >
//                   Post Announcement
//                 </button>
//               </div>
//             </div>

//             {/* ✅ Announcements list with pin + edit */}
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//               {announcements.map(a => (
//                 <div key={a.id}
//                   className={`border rounded-xl overflow-hidden relative
//                     ${a.pinned
//                       ? "bg-[#1a1a1a] border-yellow-400/30"
//                       : "bg-[#1a1a1a] border-white/10"
//                     }`}>

//                   {/* ✅ pin badge */}
//                   {a.pinned && (
//                     <div className="absolute top-2 left-2 z-10 flex items-center gap-1
//                                     bg-yellow-400/20 border border-yellow-400/30 rounded-full px-2 py-0.5">
//                       <span className="text-xs text-yellow-400">📌 Pinned</span>
//                     </div>
//                   )}

//                   {a.imageUrl && <img src={a.imageUrl} className="w-full h-40 object-cover" />}

//                   <div className="p-4">
//                     <div className="flex justify-between items-start mb-2 gap-2 flex-wrap">
//                       <span className="text-xs bg-[#26F2D0]/10 text-[#26F2D0] px-2 py-1 rounded-full shrink-0">
//                         {a.category}
//                       </span>
//                       {/* ✅ action buttons */}
//                       <div className="flex gap-1">
//                         <button
//                           onClick={() => pinAnnouncement(a.id)}
//                           title={a.pinned ? "Unpin" : "Pin"}
//                           className={`px-2 py-1 rounded text-xs transition
//                             ${a.pinned
//                               ? "bg-yellow-400/20 text-yellow-400"
//                               : "bg-white/5 text-gray-400 hover:text-yellow-400"}`}
//                         >
//                           📌
//                         </button>
//                         <button
//                           onClick={() => {
//                             setEditingAnnouncementId(a.id);
//                             setEditAnnouncementForm({ title: a.title, content: a.content, category: a.category });
//                           }}
//                           className="bg-white/5 hover:bg-[#26F2D0]/20 text-gray-400
//                                      hover:text-[#26F2D0] px-2 py-1 rounded text-xs transition"
//                         >
//                           ✏️
//                         </button>
//                         <button
//                           onClick={() => deleteAnnouncement(a.id)}
//                           className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
//                         >
//                           🗑️
//                         </button>
//                       </div>
//                     </div>

//                     {/* ✅ inline edit form */}
//                     {editingAnnouncementId === a.id ? (
//                       <div className="space-y-2 mt-2">
//                         <select
//                           value={editAnnouncementForm.category}
//                           onChange={e => setEditAnnouncementForm(p => ({ ...p, category: e.target.value }))}
//                           className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-1.5
//                                      text-xs text-white outline-none"
//                         >
//                           <option>General</option>
//                           <option>Event</option>
//                           <option>Academic</option>
//                           <option>Notice</option>
//                         </select>
//                         <input
//                           value={editAnnouncementForm.title}
//                           onChange={e => setEditAnnouncementForm(p => ({ ...p, title: e.target.value }))}
//                           className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-1.5
//                                      text-xs text-white outline-none"
//                           placeholder="Title"
//                         />
//                         <textarea
//                           value={editAnnouncementForm.content}
//                           onChange={e => setEditAnnouncementForm(p => ({ ...p, content: e.target.value }))}
//                           rows={3}
//                           className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-1.5
//                                      text-xs text-white outline-none resize-none"
//                           placeholder="Content"
//                         />
//                         <div className="flex gap-2 justify-end">
//                           <button
//                             onClick={() => setEditingAnnouncementId(null)}
//                             className="px-3 py-1 rounded-lg text-xs bg-white/5 text-gray-400 hover:text-white transition"
//                           >
//                             Cancel
//                           </button>
//                           <button
//                             onClick={() => saveAnnouncementEdit(a.id)}
//                             disabled={announcementSaving}
//                             className="px-3 py-1 rounded-lg text-xs bg-[#26F2D0]/20 text-[#26F2D0]
//                                        hover:bg-[#26F2D0]/30 disabled:opacity-40 transition"
//                           >
//                             {announcementSaving ? "Saving..." : "Save"}
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <>
//                         <h3 className="font-semibold text-white mt-2">{a.title}</h3>
//                         <p className="text-gray-400 text-sm mt-1 line-clamp-2">{a.content}</p>
//                         <p className="text-gray-600 text-xs mt-2">by {a.postedBy}</p>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//         {activeTab === "review" && (
//   <div className="p-8">
//     <ModeratorIdeaReview token={token} />
//   </div>
// )}

//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AdminStudents from "./Admin/AdminStudents";
// import AdminModerators from "./Admin/AdminModerators";
// import AdminClubs from "./Admin/AdminClubs";
// import AdminAnnouncements from "./Admin/AdminAnnouncements";
// import AdminIdeas from "./Admin/AdminIdeas";
// import ModeratorIdeaReview from "./ModeratorIdeaReview";

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("students");
//   const [students, setStudents] = useState([]);
//   const [moderators, setModerators] = useState([]);
//   const [ideas, setIdeas] = useState([]);
//   const [clubs, setClubs] = useState([]);
//   const [announcements, setAnnouncements] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const token = sessionStorage.getItem("token");
//   const headers = {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json"
//   };

//   const handleLogout = () => { sessionStorage.clear(); navigate("/"); };

//   const fetchStudents = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/admin/students", { headers });
//     setStudents(await res.json());
//     setLoading(false);
//   };

//   const fetchModerators = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/admin/moderators", { headers });
//     setModerators(await res.json());
//     setLoading(false);
//   };

//   const fetchIdeas = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/ideas", { headers });
//     setIdeas(await res.json());
//     setLoading(false);
//   };

//   const fetchClubs = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/clubs/all", { headers });
//     setClubs(await res.json());
//     setLoading(false);
//   };

//   const fetchAnnouncements = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/announcements", { headers });
//     setAnnouncements(await res.json());
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (activeTab === "students")      fetchStudents();
//     if (activeTab === "moderators")    fetchModerators();
//     if (activeTab === "ideas")         fetchIdeas();
//     if (activeTab === "clubs")         fetchClubs();
//     if (activeTab === "announcements") fetchAnnouncements();
//   }, [activeTab]);

//   const tabs = ["students", "moderators", "ideas", "clubs", "announcements", "review"];

//   // ===== handlers =====
//   const deleteStudent = async (id) => {
//     if (!window.confirm("Delete this student?")) return;
//     const res = await fetch(`http://localhost:8081/api/admin/students/${id}`, {
//       method: "DELETE", headers
//     });
//     if (res.ok) setStudents(prev => prev.filter(s => s.id !== id));
//   };

//   const assignModerator = async (rollNumber) => {
//     await fetch(`http://localhost:8081/api/admin/students/${rollNumber}/assign-moderator`, {
//       method: "PATCH", headers
//     });
//     fetchModerators();
//   };

//   const revokeModerator = async (rollNumber) => {
//     if (!window.confirm("Revoke moderator access?")) return;
//     await fetch(`http://localhost:8081/api/admin/students/${rollNumber}/revoke-moderator`, {
//       method: "PATCH", headers
//     });
//     fetchModerators();
//   };

//   const deleteAnnouncement = async (id) => {
//     if (!window.confirm("Delete this announcement?")) return;
//     const res = await fetch(`http://localhost:8081/api/announcements/${id}`, {
//       method: "DELETE", headers
//     });
//     if (res.ok) setAnnouncements(prev => prev.filter(a => a.id !== id));
//   };

//   const pinAnnouncement = async (id) => {
//     const res = await fetch(`http://localhost:8081/api/announcements/${id}/pin`, {
//       method: "PATCH", headers
//     });
//     if (res.ok) {
//       const updated = await res.json();
//       setAnnouncements(prev =>
//         prev.map(a => a.id === updated.id ? updated : a)
//             .sort((a, b) => {
//               if (a.pinned && !b.pinned) return -1;
//               if (!a.pinned && b.pinned) return 1;
//               return b.timestamp - a.timestamp;
//             })
//       );
//     }
//   };

//   const saveAnnouncementEdit = async (id, form) => {
//     const res = await fetch(`http://localhost:8081/api/announcements/${id}`, {
//       method: "PUT", headers, body: JSON.stringify(form)
//     });
//     if (res.ok) {
//       const updated = await res.json();
//       setAnnouncements(prev => prev.map(a => a.id === updated.id ? updated : a));
//     }
//   };

//   const postAnnouncement = async (form) => {
//     const res = await fetch("http://localhost:8081/api/announcements", {
//       method: "POST", headers, body: JSON.stringify(form)
//     });
//     const saved = await res.json();
//     setAnnouncements(prev => [saved, ...prev]);
//   };

//   return (
//     <div className="min-h-screen bg-[#0f0f0f] text-white">

//       {/* Header */}
//       <div className="bg-[#0b0b0b] border-b border-white/10 px-8 py-4
//                       flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-[#26F2D0]">⚙️ Admin Dashboard</h1>


//        <button
//   onClick={handleLogout}
//   className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-900 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-2xl hover:shadow-red-500/25 hover:scale-105 active:scale-95 focus:ring-4 focus:ring-red-500/50 transition-all duration-300 flex items-center gap-2"
// >
//   <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//   </svg>
//   Logout
// </button>



//       </div>

//       {/* Tabs */}
//       <div className="flex gap-2 px-8 pt-6 border-b border-white/10 pb-0 overflow-x-auto">
//         {tabs.map(tab => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-6 py-2 rounded-t-lg font-medium capitalize transition whitespace-nowrap
//               ${activeTab === tab
//                 ? "bg-[#26F2D0] text-black"
//                 : "bg-[#1a1a1a] text-gray-400 hover:text-white"
//               }`}
//           >
//             {tab === "review" ? "🔍 Review" : tab}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="p-8">
//         {loading && (
//           <div className="flex justify-center mt-20">
//             <div className="w-8 h-8 border-2 border-[#26F2D0] border-t-transparent
//                             rounded-full animate-spin" />
//           </div>
//         )}

//         {activeTab === "students" && (
//           <AdminStudents
//             students={students}
//             loading={loading}
//             onDelete={deleteStudent}
//           />
//         )}

//         {activeTab === "moderators" && (
//           <AdminModerators
//             moderators={moderators}
//             loading={loading}
//             onAssign={assignModerator}
//             onRevoke={revokeModerator}
//           />
//         )}

// {activeTab === "ideas" && (
//   <AdminIdeas
//     ideas={ideas}
//     loading={loading}
//     onDelete={(id) => setIdeas(prev => prev.filter(i => (i.id || i._id) !== id))}
//   />
// )}

//         {activeTab === "clubs" && (
//           <AdminClubs
//             clubs={clubs}
//             loading={loading}
//             onDelete={(id) => setClubs(prev => prev.filter(c => c.id !== id))}
//           />
//         )}

//         {activeTab === "announcements" && (
//           <AdminAnnouncements
//             announcements={announcements}
//             loading={loading}
//             onDelete={deleteAnnouncement}
//             onPin={pinAnnouncement}
//             onSaveEdit={saveAnnouncementEdit}
//             onPost={postAnnouncement}
//           />
//         )}

//         {activeTab === "review" && (
//           <ModeratorIdeaReview token={token} isAdmin={true} />
//         )}
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AdminStudents from "./Admin/AdminStudents";
// import AdminModerators from "./Admin/AdminModerators";
// import AdminClubs from "./Admin/AdminClubs";
// import AdminAnnouncements from "./Admin/AdminAnnouncements";
// import AdminIdeas from "./Admin/AdminIdeas";
// import ModeratorIdeaReview from "./ModeratorIdeaReview";

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("students");
//   const [students, setStudents] = useState([]);
//   const [moderators, setModerators] = useState([]);
//   const [ideas, setIdeas] = useState([]);
//   const [clubs, setClubs] = useState([]);
//   const [announcements, setAnnouncements] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const token = sessionStorage.getItem("token");
//   const headers = {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json"
//   };

//   const handleLogout = () => { sessionStorage.clear(); navigate("/"); };

//   const fetchStudents = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/admin/students", { headers });
//     setStudents(await res.json());
//     setLoading(false);
//   };

//   const fetchModerators = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/admin/moderators", { headers });
//     setModerators(await res.json());
//     setLoading(false);
//   };

//   const fetchIdeas = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/ideas", { headers });
//     setIdeas(await res.json());
//     setLoading(false);
//   };

//   const fetchClubs = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/clubs/all", { headers });
//     setClubs(await res.json());
//     setLoading(false);
//   };

//   const fetchAnnouncements = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/announcements", { headers });
//     setAnnouncements(await res.json());
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (activeTab === "students")      fetchStudents();
//     if (activeTab === "moderators")    fetchModerators();
//     if (activeTab === "ideas")         fetchIdeas();
//     if (activeTab === "clubs")         fetchClubs();
//     if (activeTab === "announcements") fetchAnnouncements();
//   }, [activeTab]);

//   const tabs = ["students", "moderators", "ideas", "clubs", "announcements", "review"];

//   // ===== handlers =====
//   const deleteStudent = async (id) => {
//     if (!window.confirm("Delete this student?")) return;
//     const res = await fetch(`http://localhost:8081/api/admin/students/${id}`, {
//       method: "DELETE", headers
//     });
//     if (res.ok) setStudents(prev => prev.filter(s => s.id !== id));
//   };

//   const assignModerator = async (rollNumber) => {
//     await fetch(`http://localhost:8081/api/admin/students/${rollNumber}/assign-moderator`, {
//       method: "PATCH", headers
//     });
//     fetchModerators();
//   };

//   const revokeModerator = async (rollNumber) => {
//     if (!window.confirm("Revoke moderator access?")) return;
//     await fetch(`http://localhost:8081/api/admin/students/${rollNumber}/revoke-moderator`, {
//       method: "PATCH", headers
//     });
//     fetchModerators();
//   };

//   const deleteAnnouncement = async (id) => {
//     if (!window.confirm("Delete this announcement?")) return;
//     const res = await fetch(`http://localhost:8081/api/announcements/${id}`, {
//       method: "DELETE", headers
//     });
//     if (res.ok) setAnnouncements(prev => prev.filter(a => a.id !== id));
//   };

//   const pinAnnouncement = async (id) => {
//     const res = await fetch(`http://localhost:8081/api/announcements/${id}/pin`, {
//       method: "PATCH", headers
//     });
//     if (res.ok) {
//       const updated = await res.json();
//       setAnnouncements(prev =>
//         prev.map(a => a.id === updated.id ? updated : a)
//             .sort((a, b) => {
//               if (a.pinned && !b.pinned) return -1;
//               if (!a.pinned && b.pinned) return 1;
//               return b.timestamp - a.timestamp;
//             })
//       );
//     }
//   };

//   const saveAnnouncementEdit = async (id, form) => {
//     const res = await fetch(`http://localhost:8081/api/announcements/${id}`, {
//       method: "PUT", headers, body: JSON.stringify(form)
//     });
//     if (res.ok) {
//       const updated = await res.json();
//       setAnnouncements(prev => prev.map(a => a.id === updated.id ? updated : a));
//     }
//   };

//   const postAnnouncement = async (form) => {
//     const res = await fetch("http://localhost:8081/api/announcements", {
//       method: "POST", headers, body: JSON.stringify(form)
//     });
//     const saved = await res.json();
//     setAnnouncements(prev => [saved, ...prev]);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white">
      
//       {/* Header */}
//       <div className="bg-[#0b0b0b]/90 backdrop-blur-sm border-b border-white/10 px-8 py-6 shadow-2xl flex items-center justify-between">
//         <h1 className="text-3xl font-black bg-gradient-to-r from-[#26F2D0] to-[#00d4ff] bg-clip-text text-transparent drop-shadow-lg">
//           ⚙️ Admin Dashboard
//         </h1>

//         <button
//           onClick={handleLogout}
//           className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-900 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-2xl hover:shadow-red-500/25 hover:scale-105 active:scale-95 focus:ring-4 focus:ring-red-500/50 transition-all duration-300 flex items-center gap-2"
//         >
//           <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//           </svg>
//           Logout
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-1 px-8 pt-8 pb-4 border-b border-white/10 overflow-x-auto bg-[#0f0f0f]/50 backdrop-blur-sm rounded-2xl mx-4 -mt-4 shadow-xl">
//         {tabs.map(tab => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`group relative px-6 py-3 rounded-2xl font-semibold capitalize whitespace-nowrap transition-all duration-300 flex items-center gap-2 shadow-lg
//               ${activeTab === tab
//                 ? "bg-gradient-to-r from-[#26F2D0] to-[#00d4ff] text-black shadow-[#26F2D0]/50 hover:scale-105"
//                 : "bg-[#1a1a1a]/80 text-gray-300 hover:bg-white/10 hover:text-white hover:shadow-[#26F2D0]/20 hover:scale-[1.02]"
//               }`}
//           >
//             {tab === "review" ? "🔍 Review" : tab}
//             {activeTab === tab && (
//               <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[#26F2D0] to-[#00d4ff] rounded-full shadow-lg" />
//             )}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="p-8">
//         {loading && (
//           <div className="flex justify-center mt-20">
//             <div className="w-10 h-10 border-3 border-[#26F2D0] border-t-transparent rounded-full animate-spin shadow-xl" />
//           </div>
//         )}

//         {activeTab === "students" && (
//           <AdminStudents
//             students={students}
//             loading={loading}
//             onDelete={deleteStudent}
//           />
//         )}

//         {activeTab === "moderators" && (
//           <AdminModerators
//             moderators={moderators}
//             loading={loading}
//             onAssign={assignModerator}
//             onRevoke={revokeModerator}
//           />
//         )}

//         {activeTab === "ideas" && (
//           <AdminIdeas
//             ideas={ideas}
//             loading={loading}
//             onDelete={(id) => setIdeas(prev => prev.filter(i => (i.id || i._id) !== id))}
//           />
//         )}

//         {activeTab === "clubs" && (
//           <AdminClubs
//             clubs={clubs}
//             loading={loading}
//             onDelete={(id) => setClubs(prev => prev.filter(c => c.id !== id))}
//           />
//         )}

//         {activeTab === "announcements" && (
//           <AdminAnnouncements
//             announcements={announcements}
//             loading={loading}
//             onDelete={deleteAnnouncement}
//             onPin={pinAnnouncement}
//             onSaveEdit={saveAnnouncementEdit}
//             onPost={postAnnouncement}
//           />
//         )}

//         {activeTab === "review" && (
//           <ModeratorIdeaReview token={token} isAdmin={true} />
//         )}
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { LogOut, Users, Shield, Lightbulb, Building, Megaphone, Search, ShieldAlert } from "lucide-react";
// import AdminStudents from "./Admin/AdminStudents";
// import AdminModerators from "./Admin/AdminModerators";
// import AdminClubs from "./Admin/AdminClubs";
// import AdminAnnouncements from "./Admin/AdminAnnouncements";
// import AdminIdeas from "./Admin/AdminIdeas";
// import AdminWarnings from "./Admin/AdminWarnings";
// import ModeratorIdeaReview from "./Ideas/ModeratorIdeaReview";

// const TAB_CONFIG = [
//   { key: "students",      label: "Students",      icon: <Users size={14} /> },
//   { key: "moderators",    label: "Moderators",     icon: <Shield size={14} /> },
//   { key: "ideas",         label: "Ideas",          icon: <Lightbulb size={14} /> },
//   { key: "clubs",         label: "Clubs",          icon: <Building size={14} /> },
//   { key: "announcements", label: "Announcements",  icon: <Megaphone size={14} /> },
//   { key: "review",        label: "Review",         icon: <Search size={14} /> },
//   { key: "warnings",      label: "Warnings",       icon: <ShieldAlert size={14} /> },
// ];

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("students");
//   const [students, setStudents] = useState([]);
//   const [moderators, setModerators] = useState([]);
//   const [ideas, setIdeas] = useState([]);
//   const [clubs, setClubs] = useState([]);
//   const [announcements, setAnnouncements] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const token = sessionStorage.getItem("token");
//   const headers = {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json"
//   };

//   const handleLogout = () => { sessionStorage.clear(); navigate("/"); };

//   const fetchStudents = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/admin/students", { headers });
//     setStudents(await res.json());
//     setLoading(false);
//   };

//   const fetchModerators = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/admin/moderators", { headers });
//     setModerators(await res.json());
//     setLoading(false);
//   };

//   const fetchIdeas = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/ideas", { headers });
//     setIdeas(await res.json());
//     setLoading(false);
//   };

//   const fetchClubs = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/clubs/all", { headers });
//     setClubs(await res.json());
//     setLoading(false);
//   };

//   const fetchAnnouncements = async () => {
//     setLoading(true);
//     const res = await fetch("http://localhost:8081/api/announcements", { headers });
//     setAnnouncements(await res.json());
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (activeTab === "students")      fetchStudents();
//     if (activeTab === "moderators")    fetchModerators();
//     if (activeTab === "ideas")         fetchIdeas();
//     if (activeTab === "clubs")         fetchClubs();
//     if (activeTab === "announcements") fetchAnnouncements();
//   }, [activeTab]);

//   // ===== handlers =====
//   const deleteStudent = async (id) => {
//     const res = await fetch(`http://localhost:8081/api/admin/students/${id}`, {
//       method: "DELETE", headers
//     });
//     if (res.ok) setStudents(prev => prev.filter(s => s.id !== id));
//   };

//   const assignModerator = async (rollNumber) => {
//     await fetch(`http://localhost:8081/api/admin/students/${rollNumber}/assign-moderator`, {
//       method: "PATCH", headers
//     });
//     fetchModerators();
//   };

//   const revokeModerator = async (rollNumber) => {
//     await fetch(`http://localhost:8081/api/admin/students/${rollNumber}/revoke-moderator`, {
//       method: "PATCH", headers
//     });
//     fetchModerators();
//   };

//   const deleteAnnouncement = async (id) => {
//     const res = await fetch(`http://localhost:8081/api/announcements/${id}`, {
//       method: "DELETE", headers
//     });
//     if (res.ok) setAnnouncements(prev => prev.filter(a => a.id !== id));
//   };

//   const pinAnnouncement = async (id) => {
//     const res = await fetch(`http://localhost:8081/api/announcements/${id}/pin`, {
//       method: "PATCH", headers
//     });
//     if (res.ok) {
//       const updated = await res.json();
//       setAnnouncements(prev =>
//         prev.map(a => a.id === updated.id ? updated : a)
//             .sort((a, b) => {
//               if (a.pinned && !b.pinned) return -1;
//               if (!a.pinned && b.pinned) return 1;
//               return b.timestamp - a.timestamp;
//             })
//       );
//     }
//   };

//   const saveAnnouncementEdit = async (id, form) => {
//     const res = await fetch(`http://localhost:8081/api/announcements/${id}`, {
//       method: "PUT", headers, body: JSON.stringify(form)
//     });
//     if (res.ok) {
//       const updated = await res.json();
//       setAnnouncements(prev => prev.map(a => a.id === updated.id ? updated : a));
//     }
//   };

//   const postAnnouncement = async (form) => {
//     const res = await fetch("http://localhost:8081/api/announcements", {
//       method: "POST", headers, body: JSON.stringify(form)
//     });
//     const saved = await res.json();
//     setAnnouncements(prev => [saved, ...prev]);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white">

//       {/* Header */}
//       <div className="bg-[#0b0b0b]/90 backdrop-blur-sm border-b border-white/10
//                       px-8 py-6 shadow-2xl flex items-center justify-between">
//         <h1 className="text-3xl font-black bg-gradient-to-r from-[#26F2D0] to-[#00d4ff]
//                        bg-clip-text text-transparent drop-shadow-lg">
//           ⚙️ Admin Dashboard
//         </h1>
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700
//                      hover:from-red-700 hover:to-red-900 text-white px-6 py-3 rounded-xl
//                      font-medium shadow-lg hover:scale-105 active:scale-95 transition-all"
//         >
//           <LogOut size={16} /> Logout
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-1 px-8 pt-8 pb-4 border-b border-white/10 overflow-x-auto
//                       bg-[#0f0f0f]/50 backdrop-blur-sm rounded-2xl mx-4 -mt-4 shadow-xl">
//         {TAB_CONFIG.map(({ key, label, icon }) => (
//           <button
//             key={key}
//             onClick={() => setActiveTab(key)}
//             className={`relative flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold
//                         whitespace-nowrap transition-all duration-300 shadow-lg
//               ${activeTab === key
//                 ? key === "warnings"
//                   ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-500/30 hover:scale-105"
//                   : "bg-gradient-to-r from-[#26F2D0] to-[#00d4ff] text-black shadow-[#26F2D0]/50 hover:scale-105"
//                 : "bg-[#1a1a1a]/80 text-gray-300 hover:bg-white/10 hover:text-white hover:scale-[1.02]"
//               }`}
//           >
//             {icon}
//             {label}
//             {activeTab === key && (
//               <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full shadow-lg
//                 ${key === "warnings"
//                   ? "bg-gradient-to-r from-red-400 to-red-600"
//                   : "bg-gradient-to-r from-[#26F2D0] to-[#00d4ff]"
//                 }`} />
//             )}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="p-8">
//         {loading && (
//           <div className="flex justify-center mt-20">
//             <div className="w-10 h-10 border-3 border-[#26F2D0] border-t-transparent
//                             rounded-full animate-spin" />
//           </div>
//         )}

//         {activeTab === "students" && (
//           <AdminStudents students={students} loading={loading} onDelete={deleteStudent} />
//         )}

//         {activeTab === "moderators" && (
//           <AdminModerators
//             moderators={moderators}
//             loading={loading}
//             onAssign={assignModerator}
//             onRevoke={revokeModerator}
//           />
//         )}

//         {activeTab === "ideas" && (
//           <AdminIdeas
//             ideas={ideas}
//             loading={loading}
//             onDelete={(id) => setIdeas(prev => prev.filter(i => (i.id || i._id) !== id))}
//           />
//         )}

//         {activeTab === "clubs" && (
//           <AdminClubs
//             clubs={clubs}
//             loading={loading}
//             onDelete={(id) => setClubs(prev => prev.filter(c => c.id !== id))}
//           />
//         )}

//         {activeTab === "announcements" && (
//           <AdminAnnouncements
//             announcements={announcements}
//             loading={loading}
//             onDelete={deleteAnnouncement}
//             onPin={pinAnnouncement}
//             onSaveEdit={saveAnnouncementEdit}
//             onPost={postAnnouncement}
//           />
//         )}

//         {activeTab === "review" && (
//           <ModeratorIdeaReview token={token} isAdmin={true} />
//         )}

//         {/* ✅ NEW — Warnings tab */}
//         {activeTab === "warnings" && (
//           <AdminWarnings token={token} students={students} />
//         )}
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Users, Shield, Lightbulb, Building, Megaphone, Search, ShieldAlert } from "lucide-react";
import AdminStudents from "./Admin/AdminStudents";
import AdminModerators from "./Admin/AdminModerators";
import AdminClubs from "./Admin/AdminClubs";
import AdminAnnouncements from "./Admin/AdminAnnouncements";
import AdminIdeas from "./Admin/AdminIdeas";
import AdminWarnings from "./Admin/AdminWarnings";
import ModeratorIdeaReview from "./Ideas/ModeratorIdeaReview";
import AdminNotificationDropdown from "./Admin/AdminNotificationDropdown";

const TAB_CONFIG = [
  { key: "students",      label: "Students",      icon: <Users size={14} /> },
  { key: "moderators",    label: "Moderators",     icon: <Shield size={14} /> },
  { key: "ideas",         label: "Ideas",          icon: <Lightbulb size={14} /> },
  { key: "clubs",         label: "Clubs",          icon: <Building size={14} /> },
  { key: "announcements", label: "Announcements",  icon: <Megaphone size={14} /> },
  { key: "review",        label: "Review",         icon: <Search size={14} /> },
  { key: "warnings",      label: "Warnings",       icon: <ShieldAlert size={14} /> },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("students");
  const [students, setStudents] = useState([]);
  const [moderators, setModerators] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  const handleLogout = () => { sessionStorage.clear(); navigate("/"); };

  const fetchStudents = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8081/api/admin/students", { headers });
    setStudents(await res.json());
    setLoading(false);
  };

  const fetchModerators = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8081/api/admin/moderators", { headers });
    setModerators(await res.json());
    setLoading(false);
  };

  const fetchIdeas = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8081/api/ideas", { headers });
    setIdeas(await res.json());
    setLoading(false);
  };

  const fetchClubs = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8081/api/clubs/all", { headers });
    setClubs(await res.json());
    setLoading(false);
  };

  const fetchAnnouncements = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8081/api/announcements", { headers });
    setAnnouncements(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === "students")      fetchStudents();
    if (activeTab === "moderators")    fetchModerators();
    if (activeTab === "ideas")         fetchIdeas();
    if (activeTab === "clubs")         fetchClubs();
    if (activeTab === "announcements") fetchAnnouncements();
  }, [activeTab]);

  const deleteStudent = async (id) => {
    const res = await fetch(`http://localhost:8081/api/admin/students/${id}`, {
      method: "DELETE", headers
    });
    if (res.ok) setStudents(prev => prev.filter(s => s.id !== id));
  };

  const assignModerator = async (rollNumber) => {
    await fetch(`http://localhost:8081/api/admin/students/${rollNumber}/assign-moderator`, {
      method: "PATCH", headers
    });
    fetchModerators();
  };

  const revokeModerator = async (rollNumber) => {
    await fetch(`http://localhost:8081/api/admin/students/${rollNumber}/revoke-moderator`, {
      method: "PATCH", headers
    });
    fetchModerators();
  };

  const deleteAnnouncement = async (id) => {
    const res = await fetch(`http://localhost:8081/api/announcements/${id}`, {
      method: "DELETE", headers
    });
    if (res.ok) setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const pinAnnouncement = async (id) => {
    const res = await fetch(`http://localhost:8081/api/announcements/${id}/pin`, {
      method: "PATCH", headers
    });
    if (res.ok) {
      const updated = await res.json();
      setAnnouncements(prev =>
        prev.map(a => a.id === updated.id ? updated : a)
            .sort((a, b) => {
              if (a.pinned && !b.pinned) return -1;
              if (!a.pinned && b.pinned) return 1;
              return b.timestamp - a.timestamp;
            })
      );
    }
  };

  const saveAnnouncementEdit = async (id, form) => {
    const res = await fetch(`http://localhost:8081/api/announcements/${id}`, {
      method: "PUT", headers, body: JSON.stringify(form)
    });
    if (res.ok) {
      const updated = await res.json();
      setAnnouncements(prev => prev.map(a => a.id === updated.id ? updated : a));
    }
  };

  const postAnnouncement = async (form) => {
    const res = await fetch("http://localhost:8081/api/announcements", {
      method: "POST", headers, body: JSON.stringify(form)
    });
    const saved = await res.json();
    setAnnouncements(prev => [saved, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white">


      {/* Header — add pt-16 to clear navbar height */}
      <div className="bg-[#0b0b0b]/90 backdrop-blur-sm border-b border-white/10
                      px-8 py-6 shadow-2xl flex items-center justify-between py-6">
        <h1 className="text-3xl font-black bg-gradient-to-r from-[#26F2D0] to-[#00d4ff]
                       bg-clip-text text-transparent drop-shadow-lg">
          ⚙️ Admin Dashboard
        </h1>
       <div className="flex items-center gap-3">
  <AdminNotificationDropdown token={token} />
  <button
    onClick={handleLogout}
    className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700
               hover:from-red-700 hover:to-red-900 text-white px-6 py-3 rounded-xl
               font-medium shadow-lg hover:scale-105 active:scale-95 transition-all"
  >
    <LogOut size={16} /> Logout
  </button>
</div>
        
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-8 pt-8 pb-4 border-b border-white/10 overflow-x-auto
                      bg-[#0f0f0f]/50 backdrop-blur-sm rounded-2xl mx-4 -mt-4 shadow-xl">
        {TAB_CONFIG.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`relative flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold
                        whitespace-nowrap transition-all duration-300 shadow-lg
              ${activeTab === key
                ? key === "warnings"
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-500/30 hover:scale-105"
                  : "bg-gradient-to-r from-[#26F2D0] to-[#00d4ff] text-black shadow-[#26F2D0]/50 hover:scale-105"
                : "bg-[#1a1a1a]/80 text-gray-300 hover:bg-white/10 hover:text-white hover:scale-[1.02]"
              }`}
          >
            {icon}
            {label}
            {activeTab === key && (
              <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full shadow-lg
                ${key === "warnings"
                  ? "bg-gradient-to-r from-red-400 to-red-600"
                  : "bg-gradient-to-r from-[#26F2D0] to-[#00d4ff]"
                }`} />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-8">
        {loading && (
          <div className="flex justify-center mt-20">
            <div className="w-10 h-10 border-3 border-[#26F2D0] border-t-transparent
                            rounded-full animate-spin" />
          </div>
        )}

        {activeTab === "students" && (
          <AdminStudents students={students} loading={loading} onDelete={deleteStudent} />
        )}
        {activeTab === "moderators" && (
          <AdminModerators moderators={moderators} loading={loading}
            onAssign={assignModerator} onRevoke={revokeModerator} />
        )}
        {activeTab === "ideas" && (
          <AdminIdeas ideas={ideas} loading={loading}
            onDelete={(id) => setIdeas(prev => prev.filter(i => (i.id || i._id) !== id))} />
        )}
        {activeTab === "clubs" && (
          <AdminClubs clubs={clubs} loading={loading}
            onDelete={(id) => setClubs(prev => prev.filter(c => c.id !== id))}  onRefresh={fetchClubs} />
        )}
        {activeTab === "announcements" && (
          <AdminAnnouncements announcements={announcements} loading={loading}
            onDelete={deleteAnnouncement} onPin={pinAnnouncement}
            onSaveEdit={saveAnnouncementEdit} onPost={postAnnouncement} />
        )}
        {activeTab === "review" && (
          <ModeratorIdeaReview token={token} isAdmin={true} />
        )}
        {activeTab === "warnings" && (
          <AdminWarnings token={token} students={students} />
        )}
      </div>
    </div>
  );
}