import { useState } from "react";
import { Trash2, Shield, User } from "lucide-react";

export default function AdminStudents({ students, loading, onDelete }) {
  const [confirmId, setConfirmId] = useState(null);

  if (loading) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black bg-gradient-to-r from-[#26F2D0] to-[#00d4ff] bg-clip-text text-transparent drop-shadow-lg">
        👥 All Students ({students.length})
      </h2>
      
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0f0f0f]/50 backdrop-blur-sm shadow-2xl">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] backdrop-blur-sm sticky top-0 border-b border-white/20">
            <tr>
              <th className="p-4 font-semibold text-gray-300 tracking-wide">Name</th>
              <th className="p-4 font-semibold text-gray-300 tracking-wide">Roll Number</th>
              <th className="p-4 font-semibold text-gray-300 tracking-wide">Branch</th>
              <th className="p-4 font-semibold text-gray-300 tracking-wide">Year</th>
              <th className="p-4 font-semibold text-gray-300 tracking-wide">Degree</th>
              <th className="p-4 font-semibold text-gray-300 tracking-wide text-center">Role</th>
              <th className="p-4 font-semibold text-gray-300 tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} className="border-b border-white/5 hover:bg-white/10 hover:shadow-lg hover:shadow-[#26F2D0]/10 transition-all duration-300 backdrop-blur-sm group">
                <td className="p-4 font-medium text-white group-hover:text-[#26F2D0]">{s.name}</td>
                <td className="p-4 font-mono text-gray-300 bg-white/5 rounded-lg px-3 py-1">{s.rollNumber}</td>
                <td className="p-4 text-gray-400 capitalize">{s.branch}</td>
                <td className="p-4 text-gray-400">{s.year}</td>
                <td className="p-4 text-gray-400 capitalize">{s.degree}</td>
                <td className="p-4 flex justify-center">
                  {s.role === "MODERATOR" ? (
                    <span className="group flex items-center gap-1.5 text-sm bg-gradient-to-r from-[#26F2D0]/20 to-[#00d4ff]/20 text-[#26F2D0] px-3 py-1.5 rounded-full font-medium border border-[#26F2D0]/30 shadow-md hover:shadow-[#26F2D0]/50 transition-all">
                      <Shield size={14} /> Moderator
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-sm text-gray-500 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                      <User size={14} /> Student
                    </span>
                  )}
                </td>
                <td className="p-4">
                  {confirmId === s.id ? (
                    <div className="flex items-center gap-2 p-2 bg-red-500/10 backdrop-blur-sm rounded-xl border border-red-500/30 shadow-lg">
                      <span className="text-xs font-medium text-red-300">Confirm Delete?</span>
                      <button
                        onClick={() => { onDelete(s.id); setConfirmId(null); }}
                        className="group relative text-xs font-semibold text-red-400 bg-red-500/20 hover:bg-red-500/40 px-3 py-1.5 rounded-lg border border-red-400/50 shadow-md hover:shadow-red-500/25 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-1"
                      >
                        <Trash2 size={12} className="group-hover:-translate-x-px transition-transform" />
                        Yes
                      </button>
                      <button
                        onClick={() => setConfirmId(null)}
                        className="text-xs font-semibold text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-sm hover:shadow-md hover:scale-105 transition-all duration-200"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmId(s.id)}
                      className="group relative flex items-center gap-1.5 text-sm font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/25 hover:shadow-red-500/25 hover:shadow-lg px-3 py-2 rounded-xl border border-red-400/30 shadow-md hover:scale-105 active:scale-95 focus:ring-2 focus:ring-red-500/50 transition-all duration-300 backdrop-blur-sm"
                    >
                      <Trash2 size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
