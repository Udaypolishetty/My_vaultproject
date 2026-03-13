import { useState } from "react";

export default function AdminClubs({ clubs, loading, onDelete }) {
  const [confirmId, setConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const token = sessionStorage.getItem("token");

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        onDelete(id);
        setConfirmId(null);
      }
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Clubs ({clubs.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {clubs.map(club => (
          <div key={club.id}
            className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl p-4
                       overflow-hidden hover:border-white/20 transition">

            {/* ✅ confirm delete overlay */}
            {confirmId === club.id && (
              <div className="absolute inset-0 bg-[#1a1a1a]/95 rounded-2xl z-20
                              flex flex-col items-center justify-center gap-3 p-4">
                <p className="text-2xl">🗑️</p>
                <p className="text-white font-semibold text-sm text-center">
                  Delete "{club.name}"?
                </p>
                <p className="text-gray-400 text-xs text-center">
                  All members will lose access to this club.
                </p>
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => setConfirmId(null)}
                    className="px-4 py-2 bg-white/10 text-gray-300 rounded-xl
                               text-xs hover:bg-white/20 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(club.id)}
                    disabled={deleting}
                    className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs
                               font-semibold hover:bg-red-700 transition disabled:opacity-50"
                  >
                    {deleting ? "Deleting..." : "Yes, Delete"}
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-white">{club.name}</h3>
              <button
                onClick={() => setConfirmId(club.id)}
                className="shrink-0 ml-2 px-2 py-1 bg-red-600/20 hover:bg-red-600
                           text-red-400 hover:text-white rounded-lg text-xs
                           border border-red-600/30 transition font-medium"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-400 text-sm mb-2 line-clamp-2">{club.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>👥 {club.members?.length || 0} members</span>
              <span>by {club.createdBy}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}