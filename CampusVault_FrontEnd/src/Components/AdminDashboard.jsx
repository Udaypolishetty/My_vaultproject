import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("students");
  const [students, setStudents] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // ✅ Fetch Students
  const fetchStudents = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8081/api/admin/students", { headers });
    const data = await res.json();
    setStudents(data);
    setLoading(false);
  };

  // ✅ Fetch Ideas
  const fetchIdeas = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8081/api/ideas", { headers });
    const data = await res.json();
    setIdeas(data);
    setLoading(false);
  };

  // ✅ Fetch Clubs
  const fetchClubs = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8081/api/clubs/all", { headers });
    const data = await res.json();
    setClubs(data);
    setLoading(false);
  };

  // ✅ Delete Student
  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    await fetch(`http://localhost:8081/api/admin/students/${id}`, {
      method: "DELETE", headers
    });
    setStudents(students.filter(s => s.id !== id));
  };

  // ✅ Delete Idea
  const deleteIdea = async (id) => {
    if (!window.confirm("Delete this idea?")) return;
    await fetch(`http://localhost:8081/api/ideas/${id}`, {
      method: "DELETE", headers
    });
    setIdeas(ideas.filter(i => i._id !== id));
  };

  // ✅ Delete Club
  const deleteClub = async (id) => {
    if (!window.confirm("Delete this club?")) return;
    await fetch(`http://localhost:8081/api/clubs/${id}`, {
      method: "DELETE", headers
    });
    setClubs(clubs.filter(c => c.id !== id));
  };

  useEffect(() => {
    if (activeTab === "students") fetchStudents();
    if (activeTab === "ideas") fetchIdeas();
    if (activeTab === "clubs") fetchClubs();
  }, [activeTab]);

  const tabs = ["students", "ideas", "clubs"];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">

      {/* Header */}
      <div className="bg-[#0b0b0b] border-b border-white/10 px-8 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#26F2D0]">⚙️ Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-8 pt-6 border-b border-white/10 pb-0">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-t-lg font-medium capitalize transition ${
              activeTab === tab
                ? "bg-[#26F2D0] text-black"
                : "bg-[#1a1a1a] text-gray-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-8">

        {loading && (
          <div className="flex justify-center mt-20">
            <p className="text-gray-400 text-lg">Loading...</p>
          </div>
        )}

        {/* ===== STUDENTS ===== */}
        {activeTab === "students" && !loading && (
          <div>
            <h2 className="text-xl font-bold mb-4">All Students ({students.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#1a1a1a] text-gray-400">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Roll Number</th>
                    <th className="p-3">Branch</th>
                    <th className="p-3">Year</th>
                    <th className="p-3">Degree</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="p-3">{s.name}</td>
                      <td className="p-3">{s.rollNumber}</td>
                      <td className="p-3">{s.branch}</td>
                      <td className="p-3">{s.year}</td>
                      <td className="p-3">{s.degree}</td>
                      <td className="p-3">
                        <button
                          onClick={() => deleteStudent(s.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== IDEAS ===== */}
        {activeTab === "ideas" && !loading && (
          <div>
            <h2 className="text-xl font-bold mb-4">All Ideas ({ideas.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {ideas.map(idea => (
                <div key={idea._id} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white">{idea.title}</h3>
                    <button
                      onClick={() => deleteIdea(idea._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs ml-2"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{idea.description}</p>
                  <p className="text-gray-500 text-xs">by {idea.name} • {idea.branch}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== CLUBS ===== */}
        {activeTab === "clubs" && !loading && (
          <div>
            <h2 className="text-xl font-bold mb-4">All Clubs ({clubs.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {clubs.map(club => (
                <div key={club.id} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white">{club.name}</h3>
                    <button
                      onClick={() => deleteClub(club.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs ml-2"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{club.description}</p>
                  <p className="text-gray-500 text-xs">{club.members?.length || 0} members</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}