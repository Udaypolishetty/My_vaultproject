import { useState } from "react";
import { Users, RefreshCw, UserCheck, UserMinus, Crown } from "lucide-react";
import { call } from "./AdminClubShared";

export default function AdminClubMembers({ club, token, onRefresh }) {
  const [confirmingAll, setConfirmingAll] = useState(false);
  const [confirmingOne, setConfirmingOne] = useState(null);
  const [removingMember, setRemovingMember] = useState(null);
  const [confirmRemove, setConfirmRemove] = useState(null);
  const A = call(token);

  const handleConfirmAll = async () => {
    setConfirmingAll(true);
    try { const r = await A.post(`/api/clubs/${club.id}/admin-confirm-all`); if (r.ok) onRefresh(); }
    finally { setConfirmingAll(false); }
  };

  const handleConfirmOne = async (rollNumber) => {
    setConfirmingOne(rollNumber);
    try { const r = await A.post(`/api/clubs/${club.id}/admin-confirm-one`, { rollNumber }); if (r.ok) onRefresh(); }
    finally { setConfirmingOne(null); }
  };

  const handleRemove = async (rollNumber) => {
    setRemovingMember(rollNumber);
    try {
      const r = await A.post(`/api/clubs/${club.id}/admin-remove-member`, { rollNumber });
      if (r.ok) { setConfirmRemove(null); onRefresh(); }
    } finally { setRemovingMember(null); }
  };

  const confirmed = (club.memberDetails || [])
    .filter(m => !club.pendingMembers?.some(p => p.rollNumber === m.rollNumber));

  return (
    <div className="space-y-4">
      {/* Pending */}
      {club.pendingMembers?.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-yellow-400 flex items-center gap-1">
              <Users size={12} /> Grace Period ({club.pendingMembers.length})
            </p>
            <button onClick={handleConfirmAll} disabled={confirmingAll}
              className="flex items-center gap-1 px-3 py-1 text-xs bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition">
              <RefreshCw size={10} className={confirmingAll ? "animate-spin" : ""} /> Confirm All
            </button>
          </div>
          <div className="space-y-2">
            {club.pendingMembers.map(p => {
              const hoursLeft = Math.max(0, 48 - (Date.now() - new Date(p.joinedAt).getTime()) / 3600000).toFixed(0);
              return (
                <div key={p.rollNumber} className="flex items-center gap-3 bg-yellow-500/5 border border-yellow-500/20 rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-xs font-bold shrink-0">
                    {p.name?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{p.name}</p>
                    <p className="text-yellow-500/70 text-xs">{hoursLeft}h left in grace</p>
                  </div>
                  {confirmRemove === p.rollNumber ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleRemove(p.rollNumber)} disabled={removingMember === p.rollNumber}
                        className="text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
                        {removingMember === p.rollNumber ? "..." : "Yes"}
                      </button>
                      <button onClick={() => setConfirmRemove(null)} className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">No</button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleConfirmOne(p.rollNumber)} disabled={confirmingOne === p.rollNumber}
                        title="Confirm" className="p-1.5 text-gray-600 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition">
                        {confirmingOne === p.rollNumber
                          ? <div className="w-3 h-3 border border-green-400 border-t-transparent rounded-full animate-spin" />
                          : <UserCheck size={13} />}
                      </button>
                      <button onClick={() => setConfirmRemove(p.rollNumber)} className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition">
                        <UserMinus size={13} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Confirmed */}
      <div>
        <p className="text-xs font-semibold text-white mb-2 flex items-center gap-1">
          <Users size={12} className="text-[#26F2D0]" /> Confirmed ({confirmed.length})
        </p>
        <div className="space-y-2">
          {confirmed.map((m, i) => (
            <div key={m.rollNumber} className="flex items-center gap-3 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3">
              <div className="w-8 h-8 rounded-full bg-[#26F2D0]/15 text-[#26F2D0] flex items-center justify-center text-xs font-bold shrink-0">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-white text-sm font-medium">{m.name}</p>
                  {m.rollNumber === club.presidentRoll && (
                    <span className="text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                      <Crown size={9} /> President
                    </span>
                  )}
                  {m.rollNumber === club.vpRoll && (
                    <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded-full">🤝 VP</span>
                  )}
                </div>
                <p className="text-gray-500 text-xs">{m.rollNumber} · {m.year} · {m.branch}</p>
              </div>
              {confirmRemove === m.rollNumber ? (
                <div className="flex items-center gap-1">
                  <button onClick={() => handleRemove(m.rollNumber)} disabled={removingMember === m.rollNumber}
                    className="text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
                    {removingMember === m.rollNumber ? "..." : "Yes"}
                  </button>
                  <button onClick={() => setConfirmRemove(null)} className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">No</button>
                </div>
              ) : (
                <button onClick={() => setConfirmRemove(m.rollNumber)} className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition">
                  <UserMinus size={13} />
                </button>
              )}
            </div>
          ))}
          {confirmed.length === 0 && <p className="text-center text-gray-600 text-sm py-6">No confirmed members yet.</p>}
        </div>
      </div>
    </div>
  );
}