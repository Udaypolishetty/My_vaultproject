import { useState } from "react";
import {
  Trash2, Plus, Crown, X, Check, Pencil, RotateCcw,
  AlertTriangle, Users, ChevronLeft, ClipboardList,
  MessageSquare, Search, Eye, RefreshCw, Megaphone,Handshake
} from "lucide-react";
import { PREDEFINED_CLUBS, STATUS_COLORS, ClubIcon, call } from "./AdminClubShared";
import AdminClubActivities from "./AdminClubActivities";
import AdminClubMembers from "./AdminClubMembers";
import { AdminClubAnnouncements, AdminClubChat } from "./AdminClubAnnouncementsChat";

// ─── ROLE MODAL ───────────────────────────────────────────────────────────────
function RoleModal({ club, token, onClose, onRefresh }) {
  const [roleForm, setRoleForm] = useState({ rollNumber: "", role: "PRESIDENT" });
  const [assigning, setAssigning] = useState(false);
  const A = call(token);

  const handleAssign = async () => {
    if (!roleForm.rollNumber.trim()) return;
    setAssigning(true);
    try {
      const r = await A.patch(`/api/clubs/${club.id}/assign-role`);
      // assign-role needs body — use direct fetch
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/assign-role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(roleForm),
      });
      if (res.ok) { onClose(); onRefresh(); }
      else alert(await res.text());
    } finally { setAssigning(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-sm">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <Crown size={16} className="text-purple-400" /> Assign Role
        </h3>
        <div className="space-y-3">
          <input value={roleForm.rollNumber}
            onChange={e => setRoleForm(p => ({ ...p, rollNumber: e.target.value }))}
            placeholder="Student roll number..."
            className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#26F2D0]/50" />
          {club.memberDetails?.length > 0 && (
            <div className="bg-white/5 rounded-xl p-3 max-h-36 overflow-y-auto">
              <p className="text-xs text-gray-500 mb-2">Click to select:</p>
              {club.memberDetails.map(m => (
                <div key={m.rollNumber} onClick={() => setRoleForm(p => ({ ...p, rollNumber: m.rollNumber }))}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer text-xs transition
                    ${roleForm.rollNumber === m.rollNumber ? "bg-purple-500/20 text-purple-400" : "hover:bg-white/5 text-gray-300"}`}>
                  <span>{m.name}</span>
                  <span className="font-mono text-gray-500">{m.rollNumber}</span>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            {["PRESIDENT", "VP"].map(r => (
              <button key={r} onClick={() => setRoleForm(p => ({ ...p, role: r }))}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition border
                  ${roleForm.role === r
                    ? r === "PRESIDENT" ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                      : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                    : "bg-white/5 text-gray-400 border-white/10"}`}>
                {r === "PRESIDENT" ? "👑 President" : "🤝 VP"}
              </button>
            ))}
          </div>
          {club.roleRequests?.filter(r => r.status === "PENDING").length > 0 && (
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-2">Pending requests:</p>
              {club.roleRequests.filter(r => r.status === "PENDING").map(r => (
                <div key={r.id} className="flex items-center justify-between text-xs py-1">
                  <span className="text-white">{r.requestedByName}</span>
                  <span className="text-gray-500">{r.role}</span>
                  <button onClick={() => setRoleForm({ rollNumber: r.requestedBy, role: r.role })}
                    className="text-[#26F2D0] hover:underline">Use</button>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 py-2 bg-white/10 text-gray-300 rounded-xl text-sm hover:bg-white/20 transition">Cancel</button>
            <button onClick={handleAssign} disabled={!roleForm.rollNumber.trim() || assigning}
              className="flex-1 py-2 bg-[#26F2D0] text-black rounded-xl text-sm font-semibold hover:brightness-110 transition disabled:opacity-40">
              {assigning ? "Assigning..." : "Assign"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DETAIL VIEW ─────────────────────────────────────────────────────────────
function ClubDetailView({ club, token, onBack, onRefresh }) {
  const [activeTab, setActiveTab]   = useState("activities");
  const [showRoleModal, setRole]    = useState(false);
  const [confirmingAll, setConfAll] = useState(false);
  const A = call(token);

  const handleConfirmAll = async () => {
    setConfAll(true);
    try { const r = await A.post(`/api/clubs/${club.id}/admin-confirm-all`); if (r.ok) onRefresh(); }
    finally { setConfAll(false); }
  };

  const done  = club.activities?.filter(a => a.completed).length || 0;
  const total = club.activities?.length || 0;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  const TABS = [
    { key: "activities",    label: "Activities",   icon: <ClipboardList size={13} />, count: `${done}/${total}` },
    { key: "members",       label: "Members",       icon: <Users size={13} />,         count: club.memberCount },
    { key: "announcements", label: "Announcements", icon: <Megaphone size={13} />,     count: club.announcements?.length || 0 },
    { key: "chat",          label: "Chat",          icon: <MessageSquare size={13} />, count: club.messages?.length || 0 },
  ];

  return (
    <div>
      {showRoleModal && <RoleModal club={club} token={token} onClose={() => setRole(false)} onRefresh={onRefresh} />}

      {/* Back */}
      <button onClick={onBack} className="flex items-center gap-2 text-[#26F2D0] hover:text-white text-sm font-medium mb-5 transition w-fit">
        <ChevronLeft size={16} /> Back to Clubs
      </button>

      {/* Club header */}
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 mb-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <ClubIcon category={club.category} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-white font-bold text-lg">{club.title}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[club.status] || "bg-gray-500/20 text-gray-400"}`}>
                  {club.status}
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-1">{club.description}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 flex-wrap">
                <span className="flex items-center gap-1"><Users size={11} /> {club.memberCount}/{club.maxMembers}</span>
                <span>📋 {pct}% done</span>
                {club.presidentName && <span className="flex items-center gap-1 text-purple-400"><Crown size={10} /> {club.presidentName}</span>}
                {club.vpName && <span className="text-blue-400">🤝 {club.vpName}</span>}
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setRole(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-xl hover:bg-purple-500/20 transition font-medium">
              <Crown size={12} /> Assign Role
            </button>
            <button onClick={handleConfirmAll} disabled={confirmingAll || !club.pendingMembers?.length}
              className="flex items-center gap-1.5 px-3 py-2 text-xs bg-green-500/10 text-green-400 border border-green-500/20 rounded-xl hover:bg-green-500/20 transition font-medium disabled:opacity-40">
              <RefreshCw size={12} className={confirmingAll ? "animate-spin" : ""} />
              Confirm All ({club.pendingMembers?.length || 0})
            </button>
          </div>
        </div>

        {total > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Activity Progress</span><span>{done}/{total} completed</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="h-2 rounded-full bg-gradient-to-r from-[#26F2D0] to-purple-400 transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/10 mb-4 overflow-x-auto">
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium whitespace-nowrap rounded-t-lg transition
              ${activeTab === tab.key ? "bg-[#26F2D0]/10 text-[#26F2D0] border-b-2 border-[#26F2D0]" : "text-gray-400 hover:text-white"}`}>
            {tab.icon} {tab.label}
            <span className={`px-1.5 py-0.5 rounded-full text-xs ${activeTab === tab.key ? "bg-[#26F2D0]/20 text-[#26F2D0]" : "bg-white/10 text-gray-500"}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {activeTab === "activities"    && <AdminClubActivities    club={club} token={token} onRefresh={onRefresh} />}
      {activeTab === "members"       && <AdminClubMembers       club={club} token={token} onRefresh={onRefresh} />}
      {activeTab === "announcements" && <AdminClubAnnouncements club={club} token={token} onRefresh={onRefresh} />}
      {activeTab === "chat"          && <AdminClubChat          club={club} token={token} onRefresh={onRefresh} />}
    </div>
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export default function AdminClubs({ clubs, loading, onDelete, onRefresh }) {
  const [selectedClub, setSelectedClub] = useState(null);
  const [showCreate,   setShowCreate]   = useState(false);
  const [creating,     setCreating]     = useState(false);
  const [form, setForm]   = useState({ title: "", description: "", category: "AI", linkedinUrl: "", maxMembers: 15 });
  const [confirmId,    setConfirmId]    = useState(null);
  const [deleting,     setDeleting]     = useState(false);
  const [editClub,     setEditClub]     = useState(null);
  const [editForm,     setEditForm]     = useState({ description: "", maxMembers: 15, linkedinUrl: "" });
  const [editing,      setEditing]      = useState(false);
  const [dissolving,   setDissolving]   = useState(null);
  const [renewing,     setRenewing]     = useState(null);
  const [extending,    setExtending]    = useState(null);
  const [extendMax,    setExtendMax]    = useState(20);
  const [search,       setSearch]       = useState("");

  const token = sessionStorage.getItem("token");
  const A = call(token);

  const filtered = clubs.filter(c =>
    !search.trim() ||
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category?.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async () => {
    if (!form.title.trim() || !form.description.trim()) return;
    setCreating(true);
    try {
      const res = await fetch("http://localhost:8081/api/clubs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      if (res.ok) { setShowCreate(false); setForm({ title: "", description: "", category: "AI", linkedinUrl: "", maxMembers: 15 }); onRefresh?.(); }
    } finally { setCreating(false); }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      const r = await A.del(`/api/clubs/${id}`);
      if (r.ok) { onDelete(id); setConfirmId(null); if (selectedClub?.id === id) setSelectedClub(null); }
    } finally { setDeleting(false); }
  };

  const handleEdit = async () => {
    if (!editClub) return;
    setEditing(true);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${editClub.id}/admin-edit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editForm),
      });
      if (res.ok) { setEditClub(null); onRefresh?.(); }
    } finally { setEditing(false); }
  };

  const runLifecycle = async (url, setLoading, id) => {
    setLoading(id);
    try { const r = await A.patch(url); if (r.ok) onRefresh?.(); }
    finally { setLoading(null); }
  };

  if (loading) return null;

  if (selectedClub) {
    const fresh = clubs.find(c => c.id === selectedClub.id) || selectedClub;
    return <ClubDetailView club={fresh} token={token} onBack={() => setSelectedClub(null)} onRefresh={onRefresh} />;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="text-xl font-bold">Clubs ({clubs.length})</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clubs..."
              className="bg-[#111] border border-white/10 rounded-xl pl-8 pr-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#26F2D0]/50 transition w-44" />
          </div>
          <button onClick={() => setShowCreate(!showCreate)}
            className="flex items-center gap-2 px-4 py-2 bg-[#26F2D0] text-black rounded-xl text-sm font-semibold hover:brightness-110 transition">
            <Plus size={14} /> Create Club
          </button>
        </div>
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="bg-[#1a1a1a] border border-[#26F2D0]/20 rounded-2xl p-5 mb-6 space-y-4">
          <h3 className="text-sm font-semibold text-[#26F2D0]">Create New Club</h3>
          <div className="flex gap-2 flex-wrap">
            {PREDEFINED_CLUBS.map(c => (
              <button key={c.title} onClick={() => setForm(p => ({ ...p, title: c.title, category: c.category }))}
                className={`text-xs px-3 py-1 rounded-full border transition ${form.title === c.title ? "bg-[#26F2D0]/20 text-[#26F2D0] border-[#26F2D0]/30" : "border-white/10 text-gray-500 hover:border-white/20"}`}>
                {c.emoji} {c.title}
              </button>
            ))}
          </div>
          <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Club title..."
            className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#26F2D0]/50 transition" />
          <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Club description..." rows={3}
            className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none resize-none focus:border-[#26F2D0]/50 transition" />
          <div className="flex gap-3 flex-wrap">
            <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
              className="flex-1 bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#26F2D0]/50 transition">
{PREDEFINED_CLUBS.map(c => <option key={c.title} value={c.category}>{c.emoji} {c.title}</option>)}
            </select>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Max:</span>
              <input type="number" value={form.maxMembers} min={5} max={50}
                onChange={e => setForm(p => ({ ...p, maxMembers: parseInt(e.target.value) }))}
                className="w-16 bg-[#111] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none" />
            </div>
          </div>
          <input value={form.linkedinUrl} onChange={e => setForm(p => ({ ...p, linkedinUrl: e.target.value }))} placeholder="LinkedIn URL (optional)"
            className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#26F2D0]/50 transition" />
          <div className="flex gap-2 justify-end">
            <button onClick={() => setShowCreate(false)} className="px-4 py-2 bg-white/10 text-gray-300 rounded-xl text-sm hover:bg-white/20 transition">Cancel</button>
            <button onClick={handleCreate} disabled={!form.title.trim() || !form.description.trim() || creating}
              className="px-4 py-2 bg-[#26F2D0] text-black rounded-xl text-sm font-semibold hover:brightness-110 transition disabled:opacity-40">
              {creating ? "Creating..." : "Create Club"}
            </button>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {editClub && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Pencil size={16} className="text-[#26F2D0]" /> Edit — {editClub.title}
            </h3>
            <div className="space-y-3">
              <textarea value={editForm.description} onChange={e => setEditForm(p => ({ ...p, description: e.target.value }))}
                placeholder="Description..." rows={3}
                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none resize-none focus:border-[#26F2D0]/50" />
              <div className="flex items-center gap-3">
                <label className="text-xs text-gray-500 whitespace-nowrap">Max members:</label>
                <input type="number" value={editForm.maxMembers} min={5} max={100}
                  onChange={e => setEditForm(p => ({ ...p, maxMembers: parseInt(e.target.value) }))}
                  className="w-20 bg-[#111] border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none" />
              </div>
              <input value={editForm.linkedinUrl} onChange={e => setEditForm(p => ({ ...p, linkedinUrl: e.target.value }))}
                placeholder="LinkedIn URL..."
                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#26F2D0]/50" />
              <div className="flex gap-2">
                <button onClick={() => setEditClub(null)} className="flex-1 py-2 bg-white/10 text-gray-300 rounded-xl text-sm hover:bg-white/20 transition">Cancel</button>
                <button onClick={handleEdit} disabled={editing}
                  className="flex-1 py-2 bg-[#26F2D0] text-black rounded-xl text-sm font-semibold hover:brightness-110 transition disabled:opacity-40">
                  {editing ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
          <p className="text-3xl mb-3">🏛️</p>
          <p className="text-gray-400 text-sm">{clubs.length === 0 ? "No clubs yet. Create the first one!" : "No clubs match your search."}</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(club => (
          <div key={club.id} className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 overflow-hidden hover:border-white/20 transition">

            {/* Delete confirm overlay */}
            {confirmId === club.id && (
              <div className="absolute inset-0 bg-[#1a1a1a]/95 rounded-2xl z-20 flex flex-col items-center justify-center gap-3 p-4">
                <Trash2 size={24} className="text-red-400" />
                <p className="text-white font-semibold text-sm text-center">Delete "{club.title}"?</p>
                <p className="text-gray-400 text-xs text-center">All data permanently lost.</p>
                <div className="flex gap-2">
                  <button onClick={() => setConfirmId(null)} className="px-4 py-2 bg-white/10 text-gray-300 rounded-xl text-xs hover:bg-white/20 transition">Cancel</button>
                  <button onClick={() => handleDelete(club.id)} disabled={deleting}
                    className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold hover:bg-red-700 transition disabled:opacity-50">
                    {deleting ? "..." : "Yes, Delete"}
                  </button>
                </div>
              </div>
            )}

            {/* Card header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <ClubIcon category={club.category} />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{club.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[club.status] || "bg-gray-500/20 text-gray-400"}`}>
                    {club.status}
                  </span>
                </div>
              </div>
              <button onClick={() => setConfirmId(club.id)} className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition">
                <Trash2 size={14} />
              </button>
            </div>

            <p className="text-gray-400 text-xs mb-3 line-clamp-2">{club.description}</p>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span className="flex items-center gap-1"><Users size={11} /> {club.memberCount}/{club.maxMembers}</span>
              <span className="flex items-center gap-1"><ClipboardList size={11} /> {club.completedActivities}/{club.totalActivities}</span>
            </div>

            {(club.presidentName || club.vpName) && (
              <div className="flex gap-3 mb-3 text-xs flex-wrap">
                {club.presidentName && <span className="text-purple-400 flex items-center gap-1"><Crown size={10} /> {club.presidentName}</span>}
                {club.vpName && (
  <span className="text-blue-400 flex items-center gap-1">
    <Handshake size={10} /> {club.vpName}
  </span>
)}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-1.5 flex-wrap">
              <button onClick={() => setSelectedClub(club)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-[#26F2D0]/10 text-[#26F2D0] border border-[#26F2D0]/20 rounded-lg hover:bg-[#26F2D0]/20 transition font-medium">
                <Eye size={11} /> Manage
              </button>
              <button onClick={() => { setEditClub(club); setEditForm({ description: club.description, maxMembers: club.maxMembers, linkedinUrl: club.linkedinUrl || "" }); }}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-white/5 text-gray-400 border border-white/10 rounded-lg hover:border-white/20 transition">
                <Pencil size={11} /> Edit
              </button>
              {club.status === "ACTIVE" ? (
                <button onClick={() => { if (window.confirm(`Dissolve "${club.title}"?`)) runLifecycle(`/api/clubs/${club.id}/dissolve`, setDissolving, club.id); }}
                  disabled={dissolving === club.id}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-lg hover:bg-orange-500/20 transition disabled:opacity-50">
                  <AlertTriangle size={11} /> {dissolving === club.id ? "..." : "Dissolve"}
                </button>
              ) : (
                <button onClick={() => { if (window.confirm(`Renew "${club.title}"?`)) runLifecycle(`/api/clubs/${club.id}/renew`, setRenewing, club.id); }}
                  disabled={renewing === club.id}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition disabled:opacity-50">
                  <RotateCcw size={11} /> {renewing === club.id ? "..." : "Renew"}
                </button>
              )}
              {extending === club.id ? (
                <div className="flex items-center gap-1">
                  <input type="number" value={extendMax} min={club.maxMembers + 1} max={100}
                    onChange={e => setExtendMax(parseInt(e.target.value))}
                    className="w-14 bg-[#111] border border-white/20 rounded-lg px-2 py-1 text-xs text-white outline-none" />
                  <button onClick={async () => { const r = await fetch(`http://localhost:8081/api/clubs/${club.id}/extend-members`, { method:"PATCH", headers:{"Content-Type":"application/json", Authorization:`Bearer ${token}`}, body:JSON.stringify({maxMembers:extendMax}) }); if (r.ok) { setExtending(null); onRefresh?.(); } }}
                    className="p-1.5 bg-[#26F2D0] text-black rounded-lg"><Check size={11} /></button>
                  <button onClick={() => setExtending(null)} className="p-1.5 bg-white/10 text-gray-400 rounded-lg"><X size={11} /></button>
                </div>
              ) : (
                <button onClick={() => { setExtending(club.id); setExtendMax(club.maxMembers + 5); }}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-white/5 text-gray-400 border border-white/10 rounded-lg hover:border-white/20 transition">
                  <Users size={11} /> Extend
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}