import { useState } from "react";
import { ShieldAlert, Search, Send, Trash2, CheckCircle, Clock } from "lucide-react";

const SEVERITY_OPTIONS = [
  { value: "LOW",    label: "LOW",    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  { value: "MEDIUM", label: "MEDIUM", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  { value: "HIGH",   label: "HIGH",   color: "bg-red-500/20 text-red-400 border-red-500/30" },
];

export default function AdminWarnings({ token, students }) {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);
  const [severity, setSeverity] = useState("LOW");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [activeTab, setActiveTab] = useState("issue"); // "issue" | "suggestions"

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  const searchStudent = async () => {
    if (!search.trim()) return;
    setSearching(true);
    try {
      const res = await fetch("http://localhost:8081/api/admin/students", { headers });
      const all = await res.json();
      const found = all.find(s =>
        s.rollNumber.toLowerCase() === search.toLowerCase() ||
        s.name.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResult(found || "notfound");
    } finally {
      setSearching(false);
    }
  };

  const issueWarning = async () => {
    if (!searchResult || searchResult === "notfound" || !message.trim()) return;
    setSending(true);
    try {
      const res = await fetch("http://localhost:8081/api/warnings/issue", {
        method: "POST",
        headers,
        body: JSON.stringify({
          recipientRollNumber: searchResult.rollNumber,
          message: message.trim(),
          severity,
          isSuggestion: false
        })
      });
      if (res.ok) {
        setSent(true);
        setMessage("");
        setSearchResult(null);
        setSearch("");
        setTimeout(() => setSent(false), 3000);
      }
    } finally {
      setSending(false);
    }
  };

  const fetchSuggestions = async () => {
    setLoadingSuggestions(true);
    try {
      const res = await fetch("http://localhost:8081/api/warnings/suggestions", { headers });
      if (res.ok) setSuggestions(await res.json());
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const approveSuggestion = async (id) => {
    const res = await fetch(`http://localhost:8081/api/warnings/${id}/approve`, {
      method: "POST", headers
    });
    if (res.ok) setSuggestions(prev => prev.filter(s => s.id !== id));
  };

  const deleteSuggestion = async (id) => {
    const res = await fetch(`http://localhost:8081/api/warnings/${id}`, {
      method: "DELETE", headers
    });
    if (res.ok) {
      setSuggestions(prev => prev.filter(s => s.id !== id));
      setConfirmDelete(null);
    }
  };

  const severityConfig = {
    HIGH:   { color: "text-red-400",    bg: "bg-red-500/20",    border: "border-red-500/30" },
    MEDIUM: { color: "text-orange-400", bg: "bg-orange-500/20", border: "border-orange-500/30" },
    LOW:    { color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500/30" },
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 mb-2">
        <ShieldAlert size={20} className="text-red-400" />
        <h2 className="text-xl font-bold">Student Warnings</h2>
      </div>
      <p className="text-gray-400 text-sm mb-6">
        Issue warnings to students for misuse or bad behaviour. Students will be notified immediately.
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("issue")}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition
            ${activeTab === "issue"
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
            }`}
        >
          <span className="flex items-center gap-1.5">
            <ShieldAlert size={13} /> Issue Warning
          </span>
        </button>
        <button
          onClick={() => { setActiveTab("suggestions"); fetchSuggestions(); }}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition
            ${activeTab === "suggestions"
              ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
              : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
            }`}
        >
          <span className="flex items-center gap-1.5">
            <Clock size={13} /> Moderator Suggestions
          </span>
        </button>
      </div>

      {/* Success banner */}
      {sent && (
        <div className="mb-4 flex items-center gap-2 bg-green-500/10 border border-green-500/20
                        rounded-xl px-4 py-3 text-sm text-green-400">
          <CheckCircle size={16} /> Warning issued and student notified successfully!
        </div>
      )}

      {/* ===== ISSUE WARNING TAB ===== */}
      {activeTab === "issue" && (
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 space-y-4">

          {/* Search student */}
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Search Student</label>
            <div className="flex gap-2">
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setSearchResult(null); }}
                onKeyDown={e => e.key === "Enter" && searchStudent()}
                placeholder="Roll number or name..."
                className="flex-1 bg-[#111] border border-white/10 rounded-xl px-4 py-2.5
                           text-sm text-white placeholder-gray-500 outline-none
                           focus:border-red-500/50 transition"
              />
              <button
                onClick={searchStudent}
                disabled={searching}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-500/20 text-red-400
                           border border-red-500/30 rounded-xl text-sm font-medium
                           hover:bg-red-500/30 transition disabled:opacity-50"
              >
                <Search size={14} />
                {searching ? "..." : "Find"}
              </button>
            </div>

            {/* Search result */}
            {searchResult && searchResult !== "notfound" && (
              <div className="mt-3 flex items-center gap-3 bg-white/5 border border-white/10
                              rounded-xl px-4 py-3">
                <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20
                                flex items-center justify-center text-red-400 font-bold text-sm">
                  {searchResult.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{searchResult.name}</p>
                  <p className="text-gray-500 text-xs">
                    {searchResult.rollNumber} · {searchResult.branch} · {searchResult.year}
                  </p>
                </div>
                <button
                  onClick={() => { setSearchResult(null); setSearch(""); }}
                  className="ml-auto text-gray-500 hover:text-white transition"
                >
                  ✕
                </button>
              </div>
            )}
            {searchResult === "notfound" && (
              <p className="text-xs text-gray-500 mt-2">No student found for "{search}"</p>
            )}
          </div>

          {/* Severity */}
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Severity Level</label>
            <div className="flex gap-2">
              {SEVERITY_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSeverity(opt.value)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition
                    ${severity === opt.value
                      ? opt.color + " scale-[1.02]"
                      : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Warning Message</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Describe the reason for this warning clearly..."
              rows={3}
              className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5
                         text-sm text-white placeholder-gray-500 outline-none resize-none
                         focus:border-red-500/50 transition"
            />
          </div>

          <button
            onClick={issueWarning}
            disabled={!searchResult || searchResult === "notfound" || !message.trim() || sending}
            className="flex items-center justify-center gap-2 w-full py-3 bg-red-500/20
                       text-red-400 border border-red-500/30 rounded-xl font-semibold
                       text-sm hover:bg-red-500/30 transition
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={14} />
            {sending ? "Sending..." : "Issue Warning"}
          </button>
        </div>
      )}

      {/* ===== SUGGESTIONS TAB ===== */}
      {activeTab === "suggestions" && (
        <div className="space-y-3">
          {loadingSuggestions ? (
            <div className="text-center py-10 text-gray-500 text-sm">Loading...</div>
          ) : suggestions.length === 0 ? (
            <div className="text-center py-10 bg-[#1a1a1a] border border-white/10 rounded-2xl">
              <Clock size={32} className="mx-auto text-gray-600 mb-2" />
              <p className="text-gray-400 text-sm">No pending moderator suggestions</p>
            </div>
          ) : (
            suggestions.map(s => {
              const sev = severityConfig[s.severity] || severityConfig.LOW;
              return (
                <div key={s.id}
                  className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full
                                          border ${sev.bg} ${sev.color} ${sev.border}`}>
                          {s.severity}
                        </span>
                        <span className="text-xs text-gray-400">
                          for <span className="text-white">{s.recipientName}</span>
                        </span>
                        <span className="text-xs text-purple-400">
                          suggested by {s.suggestedBy}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{s.message}</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {/* Approve */}
                      <button
                        onClick={() => approveSuggestion(s.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-green-500/20
                                   text-green-400 border border-green-500/30 rounded-xl
                                   text-xs font-semibold hover:bg-green-500/30 transition"
                      >
                        <CheckCircle size={12} /> Approve
                      </button>

                      {/* Delete with confirmation */}
                      {confirmDelete === s.id ? (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-400">Sure?</span>
                          <button
                            onClick={() => deleteSuggestion(s.id)}
                            className="text-xs text-red-400 px-2 py-0.5 rounded-full
                                       bg-red-400/10 font-semibold transition"
                          >Yes</button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            className="text-xs text-gray-500 px-2 py-0.5 rounded-full
                                       bg-white/5 transition"
                          >No</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDelete(s.id)}
                          className="p-1.5 rounded-xl bg-red-500/10 text-red-400
                                     hover:bg-red-500/20 border border-red-400/20 transition"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}