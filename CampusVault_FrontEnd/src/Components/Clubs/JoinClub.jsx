import React, { useEffect, useState } from "react";

const MAX_MEMBERS = 6;

function JoinClub() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const rollNumber = localStorage.getItem("rollNumber");

  useEffect(() => {
    fetchAllClubs();
     window.addEventListener("clubDeleted", fetchAllClubs);
  return () => window.removeEventListener("clubDeleted", fetchAllClubs);
  }, []);

  const fetchAllClubs = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/clubs/all");
      if (!res.ok) return;
      const data = await res.json();

      // ✅ Sort: current student's own club appears first
      const sorted = [...data].sort((a, b) => {
        if (a.createdBy === rollNumber) return -1;
        if (b.createdBy === rollNumber) return 1;
        return 0;
      });

      setClubs(sorted);
    } catch (err) {
      console.error("Failed to fetch clubs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (clubId) => {
    if (!token) { setMessage("Please login to join a club"); return; }
    setActionId(clubId);
    setMessage("");
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${clubId}/join`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) { const text = await res.text(); setMessage(text || "Failed to join"); return; }
      setMessage("Successfully joined the club! 🎉");
      fetchAllClubs();
    } catch { setMessage("Backend not reachable"); }
    finally { setActionId(null); }
  };

  const handleLeave = async (clubId) => {
    if (!token) return;
    setActionId(clubId);
    setMessage("");
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${clubId}/leave`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) { const text = await res.text(); setMessage(text || "Failed to leave"); return; }
      setMessage("You left the club.");
      fetchAllClubs();
    } catch { setMessage("Backend not reachable"); }
    finally { setActionId(null); }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center font-bold mb-4">Join The Club</h1>

      {message && (
        <p className={`text-sm text-center mb-3 font-semibold ${
          message.includes("Successfully") ? "text-green-400" : "text-red-400"
        }`}>
          {message}
        </p>
      )}

      {loading && <p className="text-center text-gray-500 text-sm">Loading clubs...</p>}

      {!loading && clubs.length === 0 && (
        <p className="text-center text-gray-500 text-sm">No clubs yet. Be the first to create one!</p>
      )}

      <div className="flex flex-col gap-3 overflow-y-auto max-h-[60vh] no-scrollbar">
        {clubs.map((club) => {
          const myClub = club.createdBy === rollNumber;
          const joined = club.members?.includes(rollNumber);
          const full = club.full;
          const inProgress = actionId === club.id;

          return (
            <div key={club.id}
              className={`flex w-full items-center gap-4
                         bg-gradient-to-br from-[#0b0b0b] to-[#121212]
                         border p-5 rounded-xl transition
                         ${myClub
                           ? "border-[#26F2D0]/50"        
                           : "border-white/10 hover:border-[#26F2D0]/40"
                         }`}
            >
              {/* Club info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white">{club.title}</h3>

                  {/* ✅ Your club badge */}
                  {myClub && (
                    <span className="text-xs bg-[#26F2D0]/20 text-[#26F2D0] px-2 py-0.5 rounded-full">
                      Your Club ★
                    </span>
                  )}
                  {full && !myClub && (
                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                      Full
                    </span>
                  )}
                  {joined && (
                    <span className="text-xs bg-[#26F2D0]/20 text-[#26F2D0] px-2 py-0.5 rounded-full">
                      Joined ✓
                    </span>
                  )}
                </div>

                <p className="text-gray-400 text-sm mt-1 line-clamp-2">{club.description}</p>

                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-gray-500">
                    By {club.createdByName} · {club.createdBy}
                  </span>
                  <a href={club.linkedinUrl} target="_blank" rel="noopener noreferrer"
                    className="text-blue-400 text-xs hover:underline">
                    LinkedIn →
                  </a>
                </div>

                {/* Member count progress bar */}
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Members</span>
                    <span>{club.memberCount}/{MAX_MEMBERS}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${full ? "bg-red-400" : "bg-[#26F2D0]"}`}
                      style={{ width: `${(club.memberCount / MAX_MEMBERS) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action button */}
              <div className="shrink-0">
                {myClub ? (
                  <span className="text-xs text-[#26F2D0] px-3">Your club</span>
                ) : joined ? (
                  <button onClick={() => handleLeave(club.id)} disabled={inProgress}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition
                      border border-red-400 text-red-400 hover:bg-red-400 hover:text-black
                      ${inProgress ? "opacity-50 cursor-not-allowed" : ""}`}>
                    {inProgress ? "Leaving..." : "Leave"}
                  </button>
                ) : full ? (
                  <span className="text-xs text-gray-500 px-3">Club Full</span>
                ) : (
                  <button onClick={() => handleJoin(club.id)} disabled={inProgress}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold text-black transition
                      ${inProgress ? "bg-[#26F2D0]/40 cursor-not-allowed" : "bg-[#26F2D0] hover:scale-105"}`}>
                    {inProgress ? "Joining..." : "Join"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default JoinClub;