import { useState, useEffect, useCallback } from "react";
import {
  Zap, Trash2, CheckCircle2, Search, RefreshCw,
  BookOpen, SearchCheck, Briefcase, CalendarDays, MessageSquare,
  ThumbsUp, MessageCircle, AlertTriangle, Filter, X,
  GraduationCap, Building2, Target, Users, Clock, ChevronDown
} from "lucide-react";

// ─── SHARED CONFIG ────────────────────────────────────────────────────────────
const TAG_CONFIG = {
  STUDY_GROUP: { label: "Study Group", Icon: BookOpen,    color: "bg-blue-500/20 text-blue-400 border-blue-500/30"    },
  LOST_FOUND:  { label: "Lost & Found", Icon: SearchCheck, color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  OPPORTUNITY: { label: "Opportunity",  Icon: Briefcase,   color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  EVENT:       { label: "Event",        Icon: CalendarDays,color: "bg-pink-500/20 text-pink-400 border-pink-500/30"   },
  GENERAL:     { label: "General",      Icon: MessageSquare,color:"bg-gray-500/20 text-gray-400 border-gray-500/30"   },
};

const VIS_CONFIG = {
  EVERYONE:        { Icon: Users,        label: "Everyone"    },
  MY_YEAR:         { Icon: GraduationCap,label: "Year only"   },
  MY_BRANCH:       { Icon: Building2,    label: "Branch only" },
  MY_YEAR_BRANCH:  { Icon: Target,       label: "Year+Branch" },
};

const formatTime = (dt) => {
  const diff = Date.now() - new Date(dt).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return new Date(dt).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

const daysLeft = (expiresAt) =>
  Math.max(0, Math.ceil((new Date(expiresAt) - Date.now()) / 86400000));

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ label, value, color }) {
  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl px-4 py-3 flex flex-col gap-1">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-2xl font-bold ${color || "text-white"}`}>{value}</p>
    </div>
  );
}

// ─── SINGLE POST CARD ─────────────────────────────────────────────────────────
function AdminBuzzCard({ post, token, onUpdate, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting,      setDeleting]      = useState(false);
  const [resolving,     setResolving]     = useState(false);
  const [expanded,      setExpanded]      = useState(false);
  const [confirmReply,  setConfirmReply]  = useState(null); // replyId to delete

  const tag    = TAG_CONFIG[post.tag] || TAG_CONFIG.GENERAL;
  const vis    = VIS_CONFIG[post.visibility] || VIS_CONFIG.EVERYONE;
  const left   = daysLeft(post.expiresAt);
  const expSoon = !post.resolved && left <= 1;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:8081/api/buzz/${post.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) onDelete(post.id);
      else alert(await res.text());
    } finally { setDeleting(false); setConfirmDelete(false); }
  };

  const handleResolve = async () => {
    setResolving(true);
    try {
      const res = await fetch(`http://localhost:8081/api/buzz/${post.id}/resolve`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) onUpdate(await res.json());
    } finally { setResolving(false); }
  };

  const handleDeleteReply = async (replyId) => {
    const res = await fetch(`http://localhost:8081/api/buzz/${post.id}/reply/${replyId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) { onUpdate(await res.json()); setConfirmReply(null); }
  };

  return (
    <div className={`border rounded-2xl p-4 transition-all
      ${post.resolved
        ? "bg-green-500/5 border-green-500/20"
        : expSoon
          ? "bg-red-500/5 border-red-500/25"
          : "bg-[#1a1a1a] border-white/10"
      }`}>

      {/* Resolved banner */}
      {post.resolved && (
        <div className="flex items-center gap-2 mb-3 bg-green-500/10 border border-green-500/20
                        rounded-xl px-3 py-2">
          <CheckCircle2 size={12} className="text-green-400 shrink-0" />
          <span className="text-xs text-green-400 font-medium">Resolved</span>
          {post.resolvedBy && (
            <span className="text-xs text-green-600 ml-auto">by {post.resolvedBy}</span>
          )}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-[#26F2D0]/10 border border-[#26F2D0]/20
                        flex items-center justify-center text-sm font-bold text-[#26F2D0] shrink-0">
          {post.createdByName?.[0]?.toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-white">{post.createdByName}</p>
            <span className="text-xs text-gray-600">·</span>
            <p className="text-xs text-gray-500">{post.createdByRollNumber}</p>
          </div>
          <p className="text-xs text-gray-600">
            {post.createdByBranch} · {post.createdByYear} · {formatTime(post.createdAt)}
          </p>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-1.5 flex-wrap justify-end shrink-0">
          <span className={`hidden sm:flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${tag.color}`}>
            <tag.Icon size={10} /> {tag.label}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-600 border border-white/8 px-2 py-0.5 rounded-full">
            <vis.Icon size={10} /> <span className="hidden sm:inline">{vis.label}</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <p className={`text-sm leading-relaxed mb-3 whitespace-pre-wrap
        ${post.resolved ? "text-gray-400" : "text-gray-200"}`}>
        {post.content}
      </p>

      {/* Stats row */}
      <div className="flex items-center gap-3 text-xs text-gray-600 mb-3 flex-wrap">
        <span className="flex items-center gap-1">
          <ThumbsUp size={11} /> {post.likes || 0}
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle size={11} /> {post.replies?.length || 0} replies
        </span>
        <span className={`ml-auto flex items-center gap-1 ${expSoon ? "text-red-400 font-medium" : ""}`}>
          {post.resolved
            ? <><CheckCircle2 size={11} /> resolved</>
            : expSoon
              ? <><AlertTriangle size={11} /> expires soon</>
              : <><Clock size={11} /> {left}d left</>
          }
        </span>
      </div>

      {/* Admin action row */}
      <div className="flex items-center gap-2 flex-wrap border-t border-white/8 pt-3">

        {/* Resolve toggle */}
        {!post.resolved && (
          <button onClick={handleResolve} disabled={resolving}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium
                       bg-green-500/10 text-green-400 border border-green-500/20
                       rounded-xl hover:bg-green-500/20 transition disabled:opacity-40">
            {resolving
              ? <div className="w-3 h-3 border border-green-400 border-t-transparent rounded-full animate-spin" />
              : <CheckCircle2 size={12} />
            }
            Resolve
          </button>
        )}

        {/* Expand replies */}
        {(post.replies?.length || 0) > 0 && (
          <button onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium
                       bg-white/5 text-gray-400 border border-white/10
                       rounded-xl hover:text-white hover:border-white/20 transition">
            <MessageCircle size={12} />
            {expanded ? "Hide" : "Replies"} ({post.replies.length})
            <ChevronDown size={10} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        )}

        {/* Delete */}
        <div className="ml-auto">
          {confirmDelete ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Delete post?</span>
              <button onClick={handleDelete} disabled={deleting}
                className="text-xs font-semibold text-red-400 bg-red-400/10 px-2.5 py-1
                           rounded-lg hover:bg-red-400/20 transition disabled:opacity-50">
                {deleting ? "..." : "Yes"}
              </button>
              <button onClick={() => setConfirmDelete(false)}
                className="text-xs text-gray-500 bg-white/5 px-2.5 py-1 rounded-lg hover:bg-white/10 transition">
                No
              </button>
            </div>
          ) : (
            <button onClick={() => setConfirmDelete(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium
                         bg-red-500/10 text-red-400 border border-red-500/20
                         rounded-xl hover:bg-red-500/20 transition">
              <Trash2 size={12} /> Delete
            </button>
          )}
        </div>
      </div>

      {/* Replies panel */}
      {expanded && post.replies?.length > 0 && (
        <div className="mt-3 border-t border-white/8 pt-3 space-y-2">
          <p className="text-xs text-gray-600 font-medium mb-2">Replies — admin can delete any</p>
          {post.replies.map(reply => (
            <div key={reply.id}
              className="flex items-start gap-2 bg-white/[0.03] rounded-xl p-3">
              <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10
                              flex items-center justify-center text-xs font-bold text-[#26F2D0] shrink-0">
                {reply.createdByName?.[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white">
                  {reply.createdByName}
                  <span className="text-gray-600 font-normal ml-1.5">
                    · {reply.createdByBranch} · {formatTime(reply.createdAt)}
                  </span>
                </p>
                <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">{reply.content}</p>
              </div>

              {/* Delete reply */}
              <div className="shrink-0">
                {confirmReply === reply.id ? (
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleDeleteReply(reply.id)}
                      className="text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full font-semibold">
                      Yes
                    </button>
                    <button onClick={() => setConfirmReply(null)}
                      className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                      No
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmReply(reply.id)}
                    className="p-1 text-gray-700 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition">
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export default function AdminBuzz({ token }) {
  const [posts,     setPosts]     = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [search,    setSearch]    = useState("");
  const [tagFilter, setTagFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL"); // ALL | ACTIVE | RESOLVED | EXPIRING
  const [refreshing, setRefreshing] = useState(false);

  const headers = { Authorization: `Bearer ${token}` };

  const fetchPosts = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const res = await fetch("http://localhost:8081/api/buzz", { headers });
      if (res.ok) setPosts(await res.json());
    } finally { setLoading(false); setRefreshing(false); }
  }, [token]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleUpdate = (updated) =>
    setPosts(prev => prev.map(p => p.id === updated.id ? updated : p));

  const handleDelete = (id) =>
    setPosts(prev => prev.filter(p => p.id !== id));

  // ── Filters ──
  const filtered = posts.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      p.content.toLowerCase().includes(q) ||
      p.createdByName.toLowerCase().includes(q) ||
      p.createdByRollNumber.toLowerCase().includes(q);

    const matchTag = tagFilter === "ALL" || p.tag === tagFilter;

    const left = daysLeft(p.expiresAt);
    const matchStatus =
      statusFilter === "ALL"      ? true :
      statusFilter === "ACTIVE"   ? !p.resolved :
      statusFilter === "RESOLVED" ? p.resolved :
      statusFilter === "EXPIRING" ? (!p.resolved && left <= 1) : true;

    return matchSearch && matchTag && matchStatus;
  });

  // ── Stats ──
  const total    = posts.length;
  const resolved = posts.filter(p => p.resolved).length;
  const active   = posts.filter(p => !p.resolved).length;
  const expiring = posts.filter(p => !p.resolved && daysLeft(p.expiresAt) <= 1).length;

  return (
    <div className="max-w-4xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-2 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Zap size={20} className="text-[#26F2D0]" />
          <h2 className="text-xl font-bold">Campus Buzz</h2>
        </div>
        <button onClick={() => fetchPosts(true)} disabled={refreshing}
          className="flex items-center gap-1.5 px-3 py-2 text-xs bg-white/5 text-gray-400
                     border border-white/10 rounded-xl hover:text-white hover:border-white/20 transition">
          <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>
      <p className="text-gray-500 text-sm mb-6">
        Admin view — delete any post or reply, resolve any buzz.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Total posts"    value={total}    />
        <StatCard label="Active"         value={active}   color="text-[#26F2D0]" />
        <StatCard label="Resolved"       value={resolved} color="text-green-400" />
        <StatCard label="Expiring soon"  value={expiring} color={expiring > 0 ? "text-red-400" : "text-gray-400"} />
      </div>

      {/* Search + Filters */}
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 mb-5 space-y-3">

        {/* Search */}
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by content, name or roll number..."
            className="w-full bg-[#111] border border-white/10 rounded-xl pl-9 pr-4 py-2.5
                       text-sm text-white placeholder-gray-500 outline-none
                       focus:border-[#26F2D0]/40 transition" />
          {search && (
            <button onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition">
              <X size={13} />
            </button>
          )}
        </div>

        {/* Tag filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={12} className="text-gray-600 shrink-0" />
          {["ALL", ...Object.keys(TAG_CONFIG)].map(t => {
            const cfg = TAG_CONFIG[t];
            return (
              <button key={t} onClick={() => setTagFilter(t)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
                            border transition
                            ${tagFilter === t
                              ? cfg ? cfg.color : "bg-[#26F2D0]/20 text-[#26F2D0] border-[#26F2D0]/30"
                              : "bg-white/5 text-gray-500 border-white/10 hover:border-white/20"
                            }`}>
                {cfg && <cfg.Icon size={10} />}
                {cfg ? cfg.label : "All Tags"}
              </button>
            );
          })}
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { key: "ALL",      label: "All",            cls: "bg-white/10 text-white border-white/20"                   },
            { key: "ACTIVE",   label: "Active",          cls: "bg-[#26F2D0]/20 text-[#26F2D0] border-[#26F2D0]/30"     },
            { key: "RESOLVED", label: "Resolved",        cls: "bg-green-500/20 text-green-400 border-green-500/30"      },
            { key: "EXPIRING", label: "Expiring soon",   cls: "bg-red-500/20 text-red-400 border-red-500/30"            },
          ].map(({ key, label, cls }) => (
            <button key={key} onClick={() => setStatusFilter(key)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition
                          ${statusFilter === key
                            ? cls
                            : "bg-white/5 text-gray-500 border-white/10 hover:border-white/20"
                          }`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      {!loading && (
        <p className="text-xs text-gray-600 mb-3">
          Showing {filtered.length} of {posts.length} posts
          {(search || tagFilter !== "ALL" || statusFilter !== "ALL") && (
            <button onClick={() => { setSearch(""); setTagFilter("ALL"); setStatusFilter("ALL"); }}
              className="ml-2 text-[#26F2D0] hover:underline">
              Clear filters
            </button>
          )}
        </p>
      )}

      {/* Posts */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-8 h-8 border-2 border-[#26F2D0] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 text-sm">Loading buzz posts...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-[#1a1a1a] border border-white/10 rounded-2xl">
          <Zap size={28} className="mx-auto text-gray-700 mb-3" />
          <p className="text-gray-400 text-sm">
            {posts.length === 0 ? "No buzz posts yet." : "No posts match your filters."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(post => (
            <AdminBuzzCard
              key={post.id}
              post={post}
              token={token}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}