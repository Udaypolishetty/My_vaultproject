// import { useState } from "react";
// import { ShieldAlert, Search, Send, Trash2, CheckCircle, Clock } from "lucide-react";

// const SEVERITY_OPTIONS = [
//   { value: "LOW",    label: "LOW",    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
//   { value: "MEDIUM", label: "MEDIUM", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
//   { value: "HIGH",   label: "HIGH",   color: "bg-red-500/20 text-red-400 border-red-500/30" },
// ];

// export default function AdminWarnings({ token, students }) {
//   const [search, setSearch] = useState("");
//   const [searchResult, setSearchResult] = useState(null);
//   const [searching, setSearching] = useState(false);
//   const [severity, setSeverity] = useState("LOW");
//   const [message, setMessage] = useState("");
//   const [sending, setSending] = useState(false);
//   const [sent, setSent] = useState(false);
//   const [suggestions, setSuggestions] = useState([]);
//   const [loadingSuggestions, setLoadingSuggestions] = useState(false);
//   const [confirmDelete, setConfirmDelete] = useState(null);
//   const [activeTab, setActiveTab] = useState("issue"); // "issue" | "suggestions"

//   const headers = {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json"
//   };

//   const searchStudent = async () => {
//     if (!search.trim()) return;
//     setSearching(true);
//     try {
//       const res = await fetch("http://localhost:8081/api/admin/students", { headers });
//       const all = await res.json();
//       const found = all.find(s =>
//         s.rollNumber.toLowerCase() === search.toLowerCase() ||
//         s.name.toLowerCase().includes(search.toLowerCase())
//       );
//       setSearchResult(found || "notfound");
//     } finally {
//       setSearching(false);
//     }
//   };

//   const issueWarning = async () => {
//     if (!searchResult || searchResult === "notfound" || !message.trim()) return;
//     setSending(true);
//     try {
//       const res = await fetch("http://localhost:8081/api/warnings/issue", {
//         method: "POST",
//         headers,
//         body: JSON.stringify({
//           recipientRollNumber: searchResult.rollNumber,
//           message: message.trim(),
//           severity,
//           isSuggestion: false
//         })
//       });
//       if (res.ok) {
//         setSent(true);
//         setMessage("");
//         setSearchResult(null);
//         setSearch("");
//         setTimeout(() => setSent(false), 3000);
//       }
//     } finally {
//       setSending(false);
//     }
//   };

//   const fetchSuggestions = async () => {
//     setLoadingSuggestions(true);
//     try {
//       const res = await fetch("http://localhost:8081/api/warnings/suggestions", { headers });
//       if (res.ok) setSuggestions(await res.json());
//     } finally {
//       setLoadingSuggestions(false);
//     }
//   };

//   const approveSuggestion = async (id) => {
//     const res = await fetch(`http://localhost:8081/api/warnings/${id}/approve`, {
//       method: "POST", headers
//     });
//     if (res.ok) setSuggestions(prev => prev.filter(s => s.id !== id));
//   };

//   const deleteSuggestion = async (id) => {
//     const res = await fetch(`http://localhost:8081/api/warnings/${id}`, {
//       method: "DELETE", headers
//     });
//     if (res.ok) {
//       setSuggestions(prev => prev.filter(s => s.id !== id));
//       setConfirmDelete(null);
//     }
//   };

//   const severityConfig = {
//     HIGH:   { color: "text-red-400",    bg: "bg-red-500/20",    border: "border-red-500/30" },
//     MEDIUM: { color: "text-orange-400", bg: "bg-orange-500/20", border: "border-orange-500/30" },
//     LOW:    { color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500/30" },
//   };

//   return (
//     <div className="max-w-2xl">
//       <div className="flex items-center gap-2 mb-2">
//         <ShieldAlert size={20} className="text-red-400" />
//         <h2 className="text-xl font-bold">Student Warnings</h2>
//       </div>
//       <p className="text-gray-400 text-sm mb-6">
//         Issue warnings to students for misuse or bad behaviour. Students will be notified immediately.
//       </p>

//       {/* Tabs */}
//       <div className="flex gap-2 mb-6">
//         <button
//           onClick={() => setActiveTab("issue")}
//           className={`px-4 py-2 rounded-xl text-sm font-medium transition
//             ${activeTab === "issue"
//               ? "bg-red-500/20 text-red-400 border border-red-500/30"
//               : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
//             }`}
//         >
//           <span className="flex items-center gap-1.5">
//             <ShieldAlert size={13} /> Issue Warning
//           </span>
//         </button>
//         <button
//           onClick={() => { setActiveTab("suggestions"); fetchSuggestions(); }}
//           className={`px-4 py-2 rounded-xl text-sm font-medium transition
//             ${activeTab === "suggestions"
//               ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
//               : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
//             }`}
//         >
//           <span className="flex items-center gap-1.5">
//             <Clock size={13} /> Moderator Suggestions
//           </span>
//         </button>
//       </div>

//       {/* Success banner */}
//       {sent && (
//         <div className="mb-4 flex items-center gap-2 bg-green-500/10 border border-green-500/20
//                         rounded-xl px-4 py-3 text-sm text-green-400">
//           <CheckCircle size={16} /> Warning issued and student notified successfully!
//         </div>
//       )}

//       {/* ===== ISSUE WARNING TAB ===== */}
//       {activeTab === "issue" && (
//         <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 space-y-4">

//           {/* Search student */}
//           <div>
//             <label className="text-xs text-gray-500 mb-1.5 block">Search Student</label>
//             <div className="flex gap-2">
//               <input
//                 value={search}
//                 onChange={e => { setSearch(e.target.value); setSearchResult(null); }}
//                 onKeyDown={e => e.key === "Enter" && searchStudent()}
//                 placeholder="Roll number or name..."
//                 className="flex-1 bg-[#111] border border-white/10 rounded-xl px-4 py-2.5
//                            text-sm text-white placeholder-gray-500 outline-none
//                            focus:border-red-500/50 transition"
//               />
//               <button
//                 onClick={searchStudent}
//                 disabled={searching}
//                 className="flex items-center gap-2 px-4 py-2.5 bg-red-500/20 text-red-400
//                            border border-red-500/30 rounded-xl text-sm font-medium
//                            hover:bg-red-500/30 transition disabled:opacity-50"
//               >
//                 <Search size={14} />
//                 {searching ? "..." : "Find"}
//               </button>
//             </div>

//             {/* Search result */}
//             {searchResult && searchResult !== "notfound" && (
//               <div className="mt-3 flex items-center gap-3 bg-white/5 border border-white/10
//                               rounded-xl px-4 py-3">
//                 <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20
//                                 flex items-center justify-center text-red-400 font-bold text-sm">
//                   {searchResult.name?.[0]?.toUpperCase()}
//                 </div>
//                 <div>
//                   <p className="text-white font-medium text-sm">{searchResult.name}</p>
//                   <p className="text-gray-500 text-xs">
//                     {searchResult.rollNumber} · {searchResult.branch} · {searchResult.year}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => { setSearchResult(null); setSearch(""); }}
//                   className="ml-auto text-gray-500 hover:text-white transition"
//                 >
//                   ✕
//                 </button>
//               </div>
//             )}
//             {searchResult === "notfound" && (
//               <p className="text-xs text-gray-500 mt-2">No student found for "{search}"</p>
//             )}
//           </div>

//           {/* Severity */}
//           <div>
//             <label className="text-xs text-gray-500 mb-1.5 block">Severity Level</label>
//             <div className="flex gap-2">
//               {SEVERITY_OPTIONS.map(opt => (
//                 <button
//                   key={opt.value}
//                   onClick={() => setSeverity(opt.value)}
//                   className={`flex-1 py-2 rounded-xl text-xs font-bold border transition
//                     ${severity === opt.value
//                       ? opt.color + " scale-[1.02]"
//                       : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
//                     }`}
//                 >
//                   {opt.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Message */}
//           <div>
//             <label className="text-xs text-gray-500 mb-1.5 block">Warning Message</label>
//             <textarea
//               value={message}
//               onChange={e => setMessage(e.target.value)}
//               placeholder="Describe the reason for this warning clearly..."
//               rows={3}
//               className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5
//                          text-sm text-white placeholder-gray-500 outline-none resize-none
//                          focus:border-red-500/50 transition"
//             />
//           </div>

//           <button
//             onClick={issueWarning}
//             disabled={!searchResult || searchResult === "notfound" || !message.trim() || sending}
//             className="flex items-center justify-center gap-2 w-full py-3 bg-red-500/20
//                        text-red-400 border border-red-500/30 rounded-xl font-semibold
//                        text-sm hover:bg-red-500/30 transition
//                        disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             <Send size={14} />
//             {sending ? "Sending..." : "Issue Warning"}
//           </button>
//         </div>
//       )}

//       {/* ===== SUGGESTIONS TAB ===== */}
//       {activeTab === "suggestions" && (
//         <div className="space-y-3">
//           {loadingSuggestions ? (
//             <div className="text-center py-10 text-gray-500 text-sm">Loading...</div>
//           ) : suggestions.length === 0 ? (
//             <div className="text-center py-10 bg-[#1a1a1a] border border-white/10 rounded-2xl">
//               <Clock size={32} className="mx-auto text-gray-600 mb-2" />
//               <p className="text-gray-400 text-sm">No pending moderator suggestions</p>
//             </div>
//           ) : (
//             suggestions.map(s => {
//               const sev = severityConfig[s.severity] || severityConfig.LOW;
//               return (
//                 <div key={s.id}
//                   className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-4">
//                   <div className="flex items-start justify-between gap-3">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 flex-wrap mb-2">
//                         <span className={`text-xs font-bold px-2 py-0.5 rounded-full
//                                           border ${sev.bg} ${sev.color} ${sev.border}`}>
//                           {s.severity}
//                         </span>
//                         <span className="text-xs text-gray-400">
//                           for <span className="text-white">{s.recipientName}</span>
//                         </span>
//                         <span className="text-xs text-purple-400">
//                           suggested by {s.suggestedBy}
//                         </span>
//                       </div>
//                       <p className="text-gray-300 text-sm">{s.message}</p>
//                     </div>

//                     <div className="flex items-center gap-1 shrink-0">
//                       {/* Approve */}
//                       <button
//                         onClick={() => approveSuggestion(s.id)}
//                         className="flex items-center gap-1 px-3 py-1.5 bg-green-500/20
//                                    text-green-400 border border-green-500/30 rounded-xl
//                                    text-xs font-semibold hover:bg-green-500/30 transition"
//                       >
//                         <CheckCircle size={12} /> Approve
//                       </button>

//                       {/* Delete with confirmation */}
//                       {confirmDelete === s.id ? (
//                         <div className="flex items-center gap-1">
//                           <span className="text-xs text-gray-400">Sure?</span>
//                           <button
//                             onClick={() => deleteSuggestion(s.id)}
//                             className="text-xs text-red-400 px-2 py-0.5 rounded-full
//                                        bg-red-400/10 font-semibold transition"
//                           >Yes</button>
//                           <button
//                             onClick={() => setConfirmDelete(null)}
//                             className="text-xs text-gray-500 px-2 py-0.5 rounded-full
//                                        bg-white/5 transition"
//                           >No</button>
//                         </div>
//                       ) : (
//                         <button
//                           onClick={() => setConfirmDelete(s.id)}
//                           className="p-1.5 rounded-xl bg-red-500/10 text-red-400
//                                      hover:bg-red-500/20 border border-red-400/20 transition"
//                         >
//                           <Trash2 size={13} />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       )}
//     </div>
//   );
// }



import { useState } from "react";
import { ShieldAlert, Search, Send, Trash2, CheckCircle, Clock, BellRing, MessageSquare } from "lucide-react";

const SEVERITY_OPTIONS = [
  { value: "LOW",    label: "LOW",    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  { value: "MEDIUM", label: "MEDIUM", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  { value: "HIGH",   label: "HIGH",   color: "bg-red-500/20 text-red-400 border-red-500/30" },
];

/* ── Preset quick-message templates for notifications ── */
const NOTIFY_TEMPLATES = [
  { label: "Wrong name",  text: "Your registered name appears to be incorrect. Please contact admin to update it." },
  { label: "Wrong email", text: "The email address on your account seems invalid. Please verify and update." },
  { label: "Missing info",text: "Some profile information is missing or incomplete. Please update your profile." },
  { label: "Account issue", text: "There is an issue with your account that requires your attention. Please contact admin." },
];

export default function AdminWarnings({ token, students }) {
  /* ── existing state ── */
  const [search,             setSearch]             = useState("");
  const [searchResult,       setSearchResult]       = useState(null);
  const [searching,          setSearching]          = useState(false);
  const [severity,           setSeverity]           = useState("LOW");
  const [message,            setMessage]            = useState("");
  const [sending,            setSending]            = useState(false);
  const [sent,               setSent]               = useState(false);
  const [suggestions,        setSuggestions]        = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [confirmDelete,      setConfirmDelete]      = useState(null);
  const [activeTab,          setActiveTab]          = useState("issue");

  /* ── notify-student state ── */
  const [notifySearch,       setNotifySearch]       = useState("");
  const [notifyResult,       setNotifyResult]       = useState(null);
  const [notifySearching,    setNotifySearching]    = useState(false);
  const [notifyMessage,      setNotifyMessage]      = useState("");
  const [notifySending,      setNotifySending]      = useState(false);
  const [notifySent,         setNotifySent]         = useState(false);
  const [notifyError,        setNotifyError]        = useState("");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  /* ── existing handlers (unchanged) ── */
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
        method: "POST", headers,
        body: JSON.stringify({
          recipientRollNumber: searchResult.rollNumber,
          message: message.trim(),
          severity,
          isSuggestion: false,
        }),
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
      method: "POST", headers,
    });
    if (res.ok) setSuggestions(prev => prev.filter(s => s.id !== id));
  };

  const deleteSuggestion = async (id) => {
    const res = await fetch(`http://localhost:8081/api/warnings/${id}`, {
      method: "DELETE", headers,
    });
    if (res.ok) {
      setSuggestions(prev => prev.filter(s => s.id !== id));
      setConfirmDelete(null);
    }
  };

  /* ── notify handlers ── */
  const searchNotifyStudent = async () => {
    if (!notifySearch.trim()) return;
    setNotifySearching(true);
    setNotifyResult(null);
    try {
      const res = await fetch("http://localhost:8081/api/admin/students", { headers });
      const all = await res.json();
      const found = all.find(s =>
        s.rollNumber.toLowerCase() === notifySearch.toLowerCase() ||
        s.name.toLowerCase().includes(notifySearch.toLowerCase())
      );
      setNotifyResult(found || "notfound");
    } finally {
      setNotifySearching(false);
    }
  };

  const sendNotification = async () => {
    if (!notifyResult || notifyResult === "notfound" || !notifyMessage.trim()) return;
    setNotifySending(true);
    setNotifyError("");
    try {
      /*
        Reuses the same warnings/issue endpoint with a special
        "INFO" severity so it shows as a plain notification
        (not a penalty warning) in the student's dashboard.
        If you want a separate endpoint, swap the URL below.
      */
      const res = await fetch("http://localhost:8081/api/warnings/issue", {
        method: "POST", headers,
        body: JSON.stringify({
          recipientRollNumber: notifyResult.rollNumber,
          message: notifyMessage.trim(),
          severity: "INFO",          // treat INFO as a notification, not a warning
          isSuggestion: false,
          isNotification: true,      // flag so backend can differentiate if needed
        }),
      });
      if (res.ok) {
        setNotifySent(true);
        setNotifyMessage("");
        setNotifyResult(null);
        setNotifySearch("");
        setTimeout(() => setNotifySent(false), 3500);
      } else {
        setNotifyError("Failed to send notification. Please try again.");
      }
    } catch {
      setNotifyError("Network error. Check your connection.");
    } finally {
      setNotifySending(false);
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
        Issue warnings, send notifications, or review moderator suggestions.
      </p>

      {/* ── TABS ── */}
      <div className="flex gap-2 mb-6 flex-wrap">
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

        {/* ── NEW TAB ── */}
        <button
          onClick={() => setActiveTab("notify")}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition
            ${activeTab === "notify"
              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
            }`}
        >
          <span className="flex items-center gap-1.5">
            <BellRing size={13} /> Notify Student
          </span>
        </button>
      </div>

      {/* ── global success banner (warnings) ── */}
      {sent && (
        <div className="mb-4 flex items-center gap-2 bg-green-500/10 border border-green-500/20
                        rounded-xl px-4 py-3 text-sm text-green-400">
          <CheckCircle size={16} /> Warning issued and student notified successfully!
        </div>
      )}

      {/* ═══════════════════════════════════════
          ISSUE WARNING TAB  (unchanged)
      ═══════════════════════════════════════ */}
      {activeTab === "issue" && (
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 space-y-4">
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
                >✕</button>
              </div>
            )}
            {searchResult === "notfound" && (
              <p className="text-xs text-gray-500 mt-2">No student found for "{search}"</p>
            )}
          </div>

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

      {/* ═══════════════════════════════════════
          SUGGESTIONS TAB  (unchanged)
      ═══════════════════════════════════════ */}
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
                <div key={s.id} className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-4">
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
                      <button
                        onClick={() => approveSuggestion(s.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-green-500/20
                                   text-green-400 border border-green-500/30 rounded-xl
                                   text-xs font-semibold hover:bg-green-500/30 transition"
                      >
                        <CheckCircle size={12} /> Approve
                      </button>
                      {confirmDelete === s.id ? (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-400">Sure?</span>
                          <button onClick={() => deleteSuggestion(s.id)}
                            className="text-xs text-red-400 px-2 py-0.5 rounded-full bg-red-400/10 font-semibold">
                            Yes
                          </button>
                          <button onClick={() => setConfirmDelete(null)}
                            className="text-xs text-gray-500 px-2 py-0.5 rounded-full bg-white/5">
                            No
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirmDelete(s.id)}
                          className="p-1.5 rounded-xl bg-red-500/10 text-red-400
                                     hover:bg-red-500/20 border border-red-400/20 transition">
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

      {/* ═══════════════════════════════════════
          NOTIFY STUDENT TAB  ← NEW
      ═══════════════════════════════════════ */}
      {activeTab === "notify" && (
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 space-y-4">

          {/* success banner */}
          {notifySent && (
            <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20
                            rounded-xl px-4 py-3 text-sm text-blue-400">
              <CheckCircle size={16} /> Notification sent to student successfully!
            </div>
          )}

          {/* error banner */}
          {notifyError && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20
                            rounded-xl px-4 py-3 text-sm text-red-400">
              {notifyError}
            </div>
          )}

          {/* search */}
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Search Student</label>
            <div className="flex gap-2">
              <input
                value={notifySearch}
                onChange={e => { setNotifySearch(e.target.value); setNotifyResult(null); setNotifyError(""); }}
                onKeyDown={e => e.key === "Enter" && searchNotifyStudent()}
                placeholder="Roll number or name..."
                className="flex-1 bg-[#111] border border-white/10 rounded-xl px-4 py-2.5
                           text-sm text-white placeholder-gray-500 outline-none
                           focus:border-blue-500/50 transition"
              />
              <button
                onClick={searchNotifyStudent}
                disabled={notifySearching}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-500/20 text-blue-400
                           border border-blue-500/30 rounded-xl text-sm font-medium
                           hover:bg-blue-500/30 transition disabled:opacity-50"
              >
                <Search size={14} />
                {notifySearching ? "..." : "Find"}
              </button>
            </div>

            {/* found student card */}
            {notifyResult && notifyResult !== "notfound" && (
              <div className="mt-3 flex items-center gap-3 bg-white/5 border border-white/10
                              rounded-xl px-4 py-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20
                                flex items-center justify-center text-blue-400 font-bold text-sm">
                  {notifyResult.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{notifyResult.name}</p>
                  <p className="text-gray-500 text-xs">
                    {notifyResult.rollNumber} · {notifyResult.branch} · {notifyResult.year}
                  </p>
                </div>
                <button
                  onClick={() => { setNotifyResult(null); setNotifySearch(""); }}
                  className="ml-auto text-gray-500 hover:text-white transition"
                >✕</button>
              </div>
            )}
            {notifyResult === "notfound" && (
              <p className="text-xs text-gray-500 mt-2">No student found for "{notifySearch}"</p>
            )}
          </div>

          {/* quick-fill templates */}
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">
              Quick Templates
              <span className="ml-1 text-gray-600">(click to fill)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {NOTIFY_TEMPLATES.map(t => (
                <button
                  key={t.label}
                  onClick={() => setNotifyMessage(t.text)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition
                    ${notifyMessage === t.text
                      ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                      : "bg-white/5 text-gray-400 border-white/10 hover:border-blue-500/30 hover:text-blue-400"
                    }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* message textarea */}
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">
              Message
              <span className="ml-1 text-gray-600">— visible in student's dashboard</span>
            </label>
            <textarea
              value={notifyMessage}
              onChange={e => setNotifyMessage(e.target.value)}
              placeholder="Type your message to the student..."
              rows={4}
              className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-2.5
                         text-sm text-white placeholder-gray-500 outline-none resize-none
                         focus:border-blue-500/50 transition"
            />
            <p className="text-xs text-gray-600 mt-1 text-right">
              {notifyMessage.length} chars
            </p>
          </div>

          {/* send button */}
          <button
            onClick={sendNotification}
            disabled={
              !notifyResult ||
              notifyResult === "notfound" ||
              !notifyMessage.trim() ||
              notifySending
            }
            className="flex items-center justify-center gap-2 w-full py-3
                       bg-blue-500/20 text-blue-400 border border-blue-500/30
                       rounded-xl font-semibold text-sm
                       hover:bg-blue-500/30 transition
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <MessageSquare size={14} />
            {notifySending ? "Sending..." : "Send Notification"}
          </button>

          <p className="text-xs text-gray-600 text-center">
            This sends a direct notification message — not a penalty warning.
            The student will see it in their dashboard under notifications.
          </p>
        </div>
      )}
    </div>
  );
}