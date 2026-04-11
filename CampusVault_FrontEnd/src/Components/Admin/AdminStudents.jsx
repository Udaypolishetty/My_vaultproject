import { useState } from "react";
import { Trash2, Shield, User, Sparkles } from "lucide-react";

// ✅ extract timestamp from MongoDB ObjectId
const getJoinedAt = (id) => {
  try {
    const timestamp = parseInt(id.substring(0, 8), 16) * 1000;
    return new Date(timestamp);
  } catch { return new Date(0); }
};

const formatJoinDate = (id) => {
  const date = getJoinedAt(id);
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

export default function AdminStudents({ students, loading, onDelete }) {
  const [confirmId, setConfirmId] = useState(null);
  const [search, setSearch] = useState("");

  if (loading) return null;

  // ✅ joined in last 7 days
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentStudents = [...students]
    .filter(s => getJoinedAt(s.id).getTime() > sevenDaysAgo)
    .sort((a, b) => getJoinedAt(b.id) - getJoinedAt(a.id));

  const filteredStudents = students
    .filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      String(s.rollNumber).toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black bg-gradient-to-r from-[#26F2D0] to-[#00d4ff] bg-clip-text text-transparent drop-shadow-lg">
        👥 All Students ({students.length})
      </h2>

      {/* ✅ Recently Joined section */}
      {recentStudents.length > 0 && (
        <div className="bg-[#26F2D0]/5 border border-[#26F2D0]/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-[#26F2D0]" />
            <h3 className="font-bold text-[#26F2D0]">Recently Joined — Last 7 Days ({recentStudents.length})</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {recentStudents.map(s => (
              <div key={s.id}
                className="flex items-center gap-2 bg-white/5 border border-white/10
                           rounded-xl px-3 py-2">
                <div className="w-7 h-7 rounded-full bg-[#26F2D0]/20 border border-[#26F2D0]/30
                                flex items-center justify-center text-xs font-bold text-[#26F2D0]">
                  {s.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">{s.name}</p>
                  <p className="text-gray-500 text-xs">{s.rollNumber} · {formatJoinDate(s.id)}</p>
                </div>
                {s.role === "MODERATOR" && (
                  <Shield size={12} className="text-[#26F2D0] ml-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or roll number..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-80 px-4 py-2 rounded-xl bg-white/10 border border-white/20
                   text-white placeholder-gray-400 focus:outline-none
                   focus:ring-2 focus:ring-[#26F2D0]/50 backdrop-blur-sm"
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0f0f0f]/50 backdrop-blur-sm shadow-2xl">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] backdrop-blur-sm sticky top-0 border-b border-white/20">
            <tr>
              <th className="p-4 font-semibold text-gray-300 tracking-wide">Name</th>
              <th className="p-4 font-semibold text-gray-300 tracking-wide">Roll Number</th>
              <th className="p-4 font-semibold text-gray-300 tracking-wide">Branch</th>
              <th className="p-4 font-semibold text-gray-300 tracking-wide">Year</th>
              <th className="p-4 font-semibold text-gray-300 tracking-wide">Degree</th>
              <th className="p-4 font-semibold text-gray-300 tracking-wide">Joined</th>
              <th className="p-4 font-semibold text-gray-300 tracking-wide text-center">Role</th>
              <th className="p-4 font-semibold text-gray-300 tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => {
              const isNew = getJoinedAt(s.id).getTime() > sevenDaysAgo;
              return (
                <tr key={s.id}
                  className="border-b border-white/5 hover:bg-white/10 hover:shadow-lg
                             hover:shadow-[#26F2D0]/10 transition-all duration-300
                             backdrop-blur-sm group">
                  <td className="p-4 font-medium text-white group-hover:text-[#26F2D0]">
                    <div className="flex items-center gap-2">
                      {s.name}
                      {isNew && (
                        <span className="text-xs bg-[#26F2D0]/20 text-[#26F2D0]
                                         px-2 py-0.5 rounded-full border border-[#26F2D0]/30">
                          new
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-mono text-gray-300 bg-white/5 rounded-lg px-3 py-1">{s.rollNumber}</td>
                  <td className="p-4 text-gray-400 capitalize">{s.branch}</td>
                  <td className="p-4 text-gray-400">{s.year}</td>
                  <td className="p-4 text-gray-400 capitalize">{s.degree}</td>
                  <td className="p-4 text-gray-500 text-xs">{formatJoinDate(s.id)}</td>
                  <td className="p-4 flex justify-center">
                    {s.role === "MODERATOR" ? (
                      <span className="flex items-center gap-1.5 text-sm bg-gradient-to-r
                                       from-[#26F2D0]/20 to-[#00d4ff]/20 text-[#26F2D0]
                                       px-3 py-1.5 rounded-full font-medium border
                                       border-[#26F2D0]/30 shadow-md hover:shadow-[#26F2D0]/50 transition-all">
                        <Shield size={14} /> Moderator
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-sm text-gray-500
                                       bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                        <User size={14} /> Student
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    {confirmId === s.id ? (
                      <div className="flex items-center gap-2 p-2 bg-red-500/10 backdrop-blur-sm
                                      rounded-xl border border-red-500/30 shadow-lg">
                        <span className="text-xs font-medium text-red-300">Confirm Delete?</span>
                        <button
                          onClick={() => { onDelete(s.id); setConfirmId(null); }}
                          className="text-xs font-semibold text-red-400 bg-red-500/20
                                     hover:bg-red-500/40 px-3 py-1.5 rounded-lg border
                                     border-red-400/50 transition-all flex items-center gap-1">
                          <Trash2 size={12} /> Yes
                        </button>
                        <button
                          onClick={() => setConfirmId(null)}
                          className="text-xs font-semibold text-gray-400 hover:text-white
                                     bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-all">
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmId(s.id)}
                        className="flex items-center gap-1.5 text-sm font-semibold text-red-400
                                   bg-red-500/10 hover:bg-red-500/25 px-3 py-2 rounded-xl
                                   border border-red-400/30 hover:scale-105 transition-all">
                        <Trash2 size={14} /> Delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}