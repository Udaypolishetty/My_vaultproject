
import React, { useState, useEffect } from "react";
import UsefulResources from "./UsefulResources";
import {
  FileText, BookOpen, Upload, Search, Download, Eye,
  Send, ChevronRight, CheckCircle2, AlertCircle,
  Loader2, X, Clock, Lock, Instagram, Mail,
  Sparkles, ShieldAlert,ExternalLink
} from "lucide-react";

/* ─────────────────────────────────────────────
   Rate limit helpers — stored in localStorage
   so they survive page refresh
───────────────────────────────────────────── */
const RL_KEY      = "contribute_submissions";   // array of ISO timestamps
const COOLDOWN_MS = 5 * 60 * 60 * 1000;        // 5 hours in ms
const MAX_PER_DAY = 2;

function getSubmissions() {
  try {
    return JSON.parse(localStorage.getItem(RL_KEY) || "[]");
  } catch { return []; }
}

function saveSubmission() {
  const prev = getSubmissions();
  prev.push(new Date().toISOString());
  localStorage.setItem(RL_KEY, JSON.stringify(prev));
}

/* submissions in last 24h */
function submissionsToday() {
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  return getSubmissions().filter(t => new Date(t).getTime() > cutoff);
}

/* ms until the 5-hour cooldown from LAST submission expires */
function cooldownRemaining() {
  const subs = getSubmissions();
  if (subs.length === 0) return 0;
  const last = new Date(subs[subs.length - 1]).getTime();
  const remaining = last + COOLDOWN_MS - Date.now();
  return Math.max(0, remaining);
}

function formatCountdown(ms) {
  if (ms <= 0) return "";
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

/* ─────────────────────────────────────────────
   Highlight helper — unchanged from original
───────────────────────────────────────────── */
const highlightText = (text, query) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} style={{
        background: "rgba(38,242,208,0.25)", color: "#26F2D0",
        padding: "0 3px", borderRadius: 4,
      }}>{part}</span>
    ) : part
  );
};

/* ─────────────────────────────────────────────
   Validation helpers
───────────────────────────────────────────── */
function validateContact(val) {
  if (!val.trim()) return null; // optional
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const igRe    = /^@?[\w.]{1,30}$/;
  if (emailRe.test(val.trim()) || igRe.test(val.trim())) return null;
  return "Enter a valid email or Instagram handle (e.g. @username)";
}

function validateSubject(val) {
  const v = val.trim();
  if (!v) return "Subject is required";
  if (v.length < 3) return "At least 3 characters";
  if (v.length > 120) return "Max 120 characters";
  if (/[<>{}]/.test(v)) return "No special characters like < > { }";
  return null;
}

/* ─────────────────────────────────────────────
   CONTRIBUTE FORM
───────────────────────────────────────────── */
function ContributeForm({ token }) {
  const [type,      setType]      = useState("");
  const [subject,   setSubject]   = useState("");
  const [details,   setDetails]   = useState("");
  const [contact,   setContact]   = useState("");
  const [status,    setStatus]    = useState("idle");
  const [errMsg,    setErrMsg]    = useState("");
  const [errors,    setErrors]    = useState({});
  const [countdown, setCountdown] = useState(cooldownRemaining());
  const [todayCount,setTodayCount]= useState(submissionsToday().length);

  const name       = sessionStorage.getItem("name")       || "Unknown";
  const rollNumber = sessionStorage.getItem("rollNumber") || "Unknown";
  const year       = sessionStorage.getItem("year")       || "";
  const branch     = sessionStorage.getItem("branch")     || "";

  /* live countdown ticker */
  useEffect(() => {
    if (countdown <= 0) return;
    const id = setInterval(() => {
      const rem = cooldownRemaining();
      setCountdown(rem);
      if (rem <= 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [countdown]);

  const isLocked   = countdown > 0;
  const isMaxedOut = todayCount >= MAX_PER_DAY;
  const blocked    = isLocked || isMaxedOut;

  /* live field validation */
  const validateAll = () => {
    const e = {};
    if (!type) e.type = "Please choose what you're contributing";
    const se = validateSubject(subject);
    if (se) e.subject = se;
    const ce = validateContact(contact);
    if (ce) e.contact = ce;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (blocked || status === "sending") return;
    if (!validateAll()) return;

    setStatus("sending");
    setErrMsg("");

    const contactNorm = contact.trim()
      ? (contact.trim().startsWith("@") ? contact.trim() : contact.trim())
      : null;

    /* ── Admin message (full detail including contact) ── */
    const adminMessage =
      `📚 Contribute · ${type === "papers" ? "Papers" : "Notes"}` +
      ` | Subject: "${subject.trim()}"` +
      (details.trim() ? ` | Note: "${details.trim()}"` : "") +
      ` | From: ${name} (${rollNumber}${year ? `, Y${year}` : ""}${branch ? `, ${branch}` : ""})` +
      (contactNorm
        ? ` | Contact: ${contactNorm.includes("@") && contactNorm.includes(".")
            ? `✉ ${contactNorm}` : `📸 ${contactNorm}`}`
        : "");

    /* ── Moderator message (name + roll only, no contact) ── */
    const modMessage =
      `📚 Contribute · ${type === "papers" ? "Papers" : "Notes"}` +
      ` | Subject: "${subject.trim()}"` +
      ` | From: ${name} (${rollNumber})`;

    try {
      /* Send two separate broadcasts — admin gets full, mod gets limited */
      const [adminRes, modRes] = await Promise.all([
        fetch("http://localhost:8081/api/notifications/broadcast-admin", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ message: adminMessage, type: "CONTRIBUTE_REQUEST" }),
        }),
        fetch("http://localhost:8081/api/notifications/broadcast-mod", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ message: modMessage, type: "CONTRIBUTE_REQUEST" }),
        }),
      ]);

      if (adminRes.ok || modRes.ok) {
        saveSubmission();
        setCountdown(COOLDOWN_MS);
        setTodayCount(prev => prev + 1);
        setStatus("success");
      } else {
        const txt = await adminRes.text().catch(() => "");
        setErrMsg(txt || "Server error. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrMsg("Could not reach server. Check your connection.");
      setStatus("error");
    }
  };

  /* ── SUCCESS screen ── */
  if (status === "success") {
    return (
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        minHeight: 360, gap: 20, textAlign: "center", padding: "40px 24px",
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "rgba(34,197,94,0.1)",
          border: "2px solid rgba(34,197,94,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 32px rgba(34,197,94,0.15)",
        }}>
          <CheckCircle2 size={38} style={{ color: "#22c55e" }} />
        </div>
        <div>
          <p style={{ color: "white", fontWeight: 800, fontSize: 20, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
            Request Sent!
          </p>
          <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.6, maxWidth: 320, margin: "0 auto" }}>
            Admin and moderators have been notified. You can submit again in 5 hours.
          </p>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "10px 18px", borderRadius: 12,
          background: "rgba(38,242,208,0.06)",
          border: "1px solid rgba(38,242,208,0.15)",
        }}>
          <Clock size={13} style={{ color: "#26F2D0" }} />
          <span style={{ fontSize: 12, color: "#26F2D0", fontWeight: 600 }}>
            Cooldown: {formatCountdown(countdown)}
          </span>
        </div>
      </div>
    );
  }

  /* ── BLOCKED screen (cooldown or daily max) ── */
  if (blocked) {
    return (
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        minHeight: 300, gap: 18, textAlign: "center", padding: "40px 24px",
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "rgba(245,158,11,0.08)",
          border: "1px solid rgba(245,158,11,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Lock size={30} style={{ color: "#f59e0b" }} />
        </div>
        <div>
          <p style={{ color: "white", fontWeight: 700, fontSize: 17, margin: "0 0 6px" }}>
            {isMaxedOut && !isLocked ? "Daily Limit Reached" : "Cooldown Active"}
          </p>
          <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.6, maxWidth: 300, margin: "0 auto" }}>
            {isMaxedOut && !isLocked
              ? "You've used both contributions for today. Come back tomorrow."
              : `You can contribute again in ${formatCountdown(countdown)}.`}
          </p>
        </div>
        <div style={{
          padding: "8px 20px", borderRadius: 10,
          background: "rgba(245,158,11,0.08)",
          border: "1px solid rgba(245,158,11,0.2)",
        }}>
          <span style={{ fontSize: 12, color: "#f59e0b", fontWeight: 600 }}>
            {todayCount}/{MAX_PER_DAY} submissions used today
          </span>
        </div>
      </div>
    );
  }

  /* ── FORM ── */
  return (
    <div style={{ width: "100%", maxWidth: 540, padding: "4px 0" }}>

      {/* usage indicator */}
      {todayCount > 0 && (
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "8px 14px", borderRadius: 10, marginBottom: 20,
          background: "rgba(38,242,208,0.05)",
          border: "1px solid rgba(38,242,208,0.12)",
        }}>
          <Sparkles size={12} style={{ color: "#26F2D0" }} />
          <span style={{ fontSize: 12, color: "#26F2D0" }}>
            {todayCount}/{MAX_PER_DAY} contributions used today
          </span>
        </div>
      )}

      {/* ── Type selector ── */}
      <div style={{ marginBottom: 18 }}>
        <p style={{ fontSize: 11, color: "#6b7280", fontWeight: 600,
          letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 10 }}>
          What are you contributing?
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          {[
            { key: "papers", emoji: "📄", label: "Question Papers", sub: "Previous year exams" },
            { key: "notes",  emoji: "📝", label: "Study Notes",     sub: "Notes or handouts"  },
          ].map(opt => {
            const active = type === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => { setType(opt.key); setErrors(e => ({ ...e, type: undefined })); }}
                style={{
                  flex: 1, padding: "14px 12px", borderRadius: 14,
                  cursor: "pointer", textAlign: "left",
                  border: `1.5px solid ${active ? "rgba(38,242,208,0.45)" : "rgba(255,255,255,0.08)"}`,
                  background: active ? "rgba(38,242,208,0.07)" : "rgba(255,255,255,0.02)",
                  transition: "all 0.2s",
                  boxShadow: active ? "0 0 18px rgba(38,242,208,0.1)" : "none",
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 6 }}>{opt.emoji}</div>
                <p style={{ color: active ? "#26F2D0" : "white",
                  fontWeight: 700, fontSize: 13, margin: "0 0 3px", transition: "color 0.2s" }}>
                  {opt.label}
                </p>
                <p style={{ color: "#4b5563", fontSize: 11, margin: 0 }}>{opt.sub}</p>
              </button>
            );
          })}
        </div>
        {errors.type && (
          <p style={{ fontSize: 11, color: "#f87171", marginTop: 6,
            display: "flex", alignItems: "center", gap: 4 }}>
            <AlertCircle size={10} /> {errors.type}
          </p>
        )}
      </div>

      {/* ── Subject ── */}
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontSize: 11, color: "#6b7280", fontWeight: 600,
          letterSpacing: "0.07em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
          Subject / Topic Name <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input
          value={subject}
          onChange={e => {
            setSubject(e.target.value);
            if (errors.subject) setErrors(er => ({ ...er, subject: validateSubject(e.target.value) }));
          }}
          onBlur={() => setErrors(er => ({ ...er, subject: validateSubject(subject) }))}
          placeholder="e.g. Data Structures, Maths 2..."
          maxLength={120}
          style={{
            width: "100%", padding: "12px 16px", borderRadius: 12, fontSize: 14,
            background: "rgba(255,255,255,0.04)",
            border: `1.5px solid ${errors.subject ? "rgba(239,68,68,0.5)" : subject.trim().length >= 3 ? "rgba(38,242,208,0.3)" : "rgba(255,255,255,0.09)"}`,
            color: "white", outline: "none", boxSizing: "border-box",
            transition: "border-color 0.2s",
          }}
          onFocus={e => e.target.style.borderColor = errors.subject ? "rgba(239,68,68,0.7)" : "rgba(38,242,208,0.5)"}
          onBlurCapture={e => e.target.style.borderColor = errors.subject ? "rgba(239,68,68,0.5)" : subject.trim().length >= 3 ? "rgba(38,242,208,0.3)" : "rgba(255,255,255,0.09)"}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          {errors.subject
            ? <p style={{ fontSize: 11, color: "#f87171", margin: 0, display: "flex", alignItems: "center", gap: 3 }}>
                <AlertCircle size={10} /> {errors.subject}
              </p>
            : <span />
          }
          <span style={{ fontSize: 10, color: "#374151" }}>{subject.length}/120</span>
        </div>
      </div>

      {/* ── Contact (email or Instagram) ── */}
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontSize: 11, color: "#6b7280", fontWeight: 600,
          letterSpacing: "0.07em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
          Your Contact
          <span style={{ color: "#374151", fontWeight: 400, textTransform: "none",
            letterSpacing: 0, marginLeft: 6, fontSize: 10 }}>(optional)</span>
        </label>
        <p style={{ fontSize: 11, color: "#4b5563", marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
          <ShieldAlert size={10} style={{ color: "#f59e0b" }} />
          Only admin sees this — moderators receive your name and roll number only
        </p>
        <div style={{ position: "relative" }}>
          {contact.includes("@") && contact.includes(".")
            ? <Mail     size={14} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#6b7280" }} />
            : <Instagram size={14} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#6b7280" }} />
          }
          <input
            value={contact}
            onChange={e => {
              setContact(e.target.value);
              if (errors.contact) setErrors(er => ({ ...er, contact: validateContact(e.target.value) }));
            }}
            onBlur={() => setErrors(er => ({ ...er, contact: validateContact(contact) }))}
            placeholder="email@college.in or @instagram_handle"
            maxLength={80}
            style={{
              width: "100%", padding: "12px 16px 12px 36px", borderRadius: 12, fontSize: 13,
              background: "rgba(255,255,255,0.04)",
              border: `1.5px solid ${errors.contact ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.09)"}`,
              color: "white", outline: "none", boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = errors.contact ? "rgba(239,68,68,0.7)" : "rgba(38,242,208,0.4)"}
            onBlurCapture={e => e.target.style.borderColor = errors.contact ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.09)"}
          />
        </div>
        {errors.contact && (
          <p style={{ fontSize: 11, color: "#f87171", marginTop: 4, display: "flex", alignItems: "center", gap: 3 }}>
            <AlertCircle size={10} /> {errors.contact}
          </p>
        )}
      </div>

      {/* ── Additional details ── */}
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontSize: 11, color: "#6b7280", fontWeight: 600,
          letterSpacing: "0.07em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
          Additional Details
          <span style={{ color: "#374151", fontWeight: 400, textTransform: "none",
            letterSpacing: 0, marginLeft: 6, fontSize: 10 }}>(optional)</span>
        </label>
        <textarea
          value={details}
          onChange={e => setDetails(e.target.value)}
          placeholder="Regulation, semester, how you'll share files..."
          rows={3}
          maxLength={300}
          style={{
            width: "100%", padding: "12px 16px", borderRadius: 12, fontSize: 13,
            background: "rgba(255,255,255,0.04)",
            border: "1.5px solid rgba(255,255,255,0.09)",
            color: "white", outline: "none", resize: "none",
            boxSizing: "border-box", lineHeight: 1.6, transition: "border-color 0.2s",
          }}
          onFocus={e => e.target.style.borderColor = "rgba(38,242,208,0.4)"}
          onBlurCapture={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
        />
        <p style={{ fontSize: 10, color: "#374151", margin: "3px 0 0", textAlign: "right" }}>
          {details.length}/300
        </p>
      </div>

      {/* ── Sender preview ── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "11px 14px", borderRadius: 12, marginBottom: 18,
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
          background: "rgba(38,242,208,0.12)", border: "1px solid rgba(38,242,208,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 700, color: "#26F2D0",
        }}>
          {name.charAt(0).toUpperCase()}
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ color: "white", fontWeight: 600, fontSize: 13, margin: 0,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {name}
          </p>
          <p style={{ color: "#4b5563", fontSize: 11, margin: "1px 0 0" }}>
            {rollNumber}{year ? ` · Y${year}` : ""}{branch ? ` · ${branch}` : ""}
            <span style={{ color: "#2d3748", marginLeft: 5 }}>— sent with request</span>
          </p>
        </div>
      </div>

      {/* ── Error ── */}
      {status === "error" && (
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "11px 14px", borderRadius: 12, marginBottom: 16,
          background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)",
        }}>
          <AlertCircle size={14} style={{ color: "#ef4444", flexShrink: 0 }} />
          <p style={{ color: "#f87171", fontSize: 12, margin: 0, flex: 1 }}>{errMsg}</p>
          <button onClick={() => setStatus("idle")} style={{
            background: "none", border: "none", color: "#6b7280", cursor: "pointer", padding: 0,
          }}><X size={14} /></button>
        </div>
      )}

      {/* ── Submit ── */}
      <button
        onClick={handleSubmit}
        disabled={status === "sending"}
        style={{
          width: "100%", padding: "13px", borderRadius: 14,
          fontWeight: 700, fontSize: 14, cursor: status === "sending" ? "not-allowed" : "pointer",
          background: "linear-gradient(135deg, rgba(38,242,208,0.18), rgba(38,242,208,0.08))",
          border: "1.5px solid rgba(38,242,208,0.38)",
          color: "#26F2D0", display: "flex", alignItems: "center",
          justifyContent: "center", gap: 8,
          transition: "all 0.2s",
          boxShadow: "0 0 20px rgba(38,242,208,0.1)",
          opacity: status === "sending" ? 0.7 : 1,
        }}
        onMouseEnter={e => { if (status !== "sending") { e.currentTarget.style.background = "rgba(38,242,208,0.2)"; e.currentTarget.style.boxShadow = "0 0 28px rgba(38,242,208,0.2)"; }}}
        onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg,rgba(38,242,208,0.18),rgba(38,242,208,0.08))"; e.currentTarget.style.boxShadow = "0 0 20px rgba(38,242,208,0.1)"; }}
      >
        {status === "sending"
          ? <><Loader2 size={16} style={{ animation: "cv-spin 1s linear infinite" }} /> Sending...</>
          : <><Send size={15} /> Send Contribution Request</>
        }
      </button>

      <p style={{ fontSize: 11, color: "#2d3748", textAlign: "center", marginTop: 10 }}>
        Max 2 requests per day · 5-hour cooldown between requests
      </p>

      <style>{`@keyframes cv-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT — all original logic unchanged
───────────────────────────────────────────── */
const Resources = () => {
  const [domain,    setDomain]    = useState("");
  const [papers,    setPapers]    = useState([]);
  const [search,    setSearch]    = useState("");
  const [activeTab, setActiveTab] = useState("papers");
  const [fetching,  setFetching]  = useState(false);

  const token = sessionStorage.getItem("token");

  const showPapers = async (selectedDomain) => {
    setDomain(selectedDomain);
    setPapers([]);
    if (!selectedDomain) return;
    setFetching(true);
    try {
      const res = await fetch(
        `http://localhost:8081/api/files?domain=${selectedDomain}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPapers(await res.json());
    } catch (err) {
      console.error("Error fetching papers:", err);
    } finally {
      setFetching(false);
    }
  };

  const handleDownload = (id, filename) => {
    const link = document.createElement("a");
    link.href = `http://localhost:8081/api/files/download/${id}`;
    link.download = filename;
    link.click();
  };

  const filteredPapers = papers
    .map(file => ({
      ...file,
      matchIndex: file.filename.toLowerCase().indexOf(search.toLowerCase()),
    }))
    .filter(file => search === "" || file.matchIndex !== -1)
    .sort((a, b) => {
      if (a.matchIndex === -1) return 1;
      if (b.matchIndex === -1) return -1;
      return a.matchIndex - b.matchIndex;
    });

  const TABS = [
    { key: "papers",     label: "Papers",     icon: <FileText  size={14} /> },
    { key: "notes",      label: "Notes",      icon: <BookOpen  size={14} /> },
    { key: "contribute", label: "Contribute", icon: <Upload    size={14} /> },
    { key: "useful", label: "Useful Links", icon: <ExternalLink size={14} /> },

  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .res-wrap * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        .res-file-row:hover { background: rgba(38,242,208,0.04) !important; border-color: rgba(38,242,208,0.18) !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }

        @media (max-width: 768px) {
          .res-layout { flex-direction: column !important; height: auto !important; }
          .res-sidebar { width: 100% !important; height: auto !important;
            position: static !important; border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.07) !important; padding: 20px 16px !important; }
          .res-main { height: auto !important; min-height: 60vh; }
          .res-content-pad { padding: 20px 16px !important; }
          .res-header-pad { padding: 20px 16px 0 !important; }
        }
      `}</style>

      <div className="res-wrap res-layout" style={{
        display: "flex", flexDirection: "row",
        height: "calc(100vh - 80px)",
        background: "#0b0b0b", color: "white", overflow: "hidden",
      }}>

        {/* ── SIDEBAR ── */}
        <aside className="res-sidebar" style={{
          width: 260, flexShrink: 0,
          background: "linear-gradient(180deg,#111 0%,#0d0d0d 100%)",
          borderRight: "1px solid rgba(255,255,255,0.07)",
          padding: "28px 20px",
          display: "flex", flexDirection: "column", gap: 20,
          overflowY: "auto",
        }}>
          {/* brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 3, height: 22, borderRadius: 2,
              background: "linear-gradient(180deg,#26F2D0,#7c3aed)" }} />
            <div>
              <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 17,
                color: "white", margin: 0, letterSpacing: "-0.03em" }}>Resources</h3>
              <p style={{ color: "#4b5563", fontSize: 11, margin: "1px 0 0" }}>Academic Library</p>
            </div>
          </div>

          {/* domain select */}
          <div>
            <label style={{ fontSize: 11, color: "#6b7280", fontWeight: 600,
              letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
              Domain
            </label>
            <div style={{ position: "relative" }}>
              <select
                onChange={e => showPapers(e.target.value)}
                style={{
                  width: "100%", padding: "10px 34px 10px 14px",
                  borderRadius: 12, fontSize: 13, fontWeight: 500,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white", outline: "none", cursor: "pointer",
                  appearance: "none", WebkitAppearance: "none",
                }}
                onFocus={e  => e.target.style.borderColor = "rgba(38,242,208,0.5)"}
                onBlur={e   => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              >
                <option value="" style={{ background: "#111" }}>Select Domain</option>
                <option value="B.Tech"  style={{ background: "#111" }}>B.Tech</option>
                <option value="Diploma" style={{ background: "#111" }}>Diploma</option>
                <option value="MBA"     style={{ background: "#111" }}>M.B.A</option>
                <option value="M.Tech"  style={{ background: "#111" }}>M.Tech</option>
              </select>
              <ChevronRight size={13} style={{
                position: "absolute", right: 11, top: "50%",
                transform: "translateY(-50%) rotate(90deg)",
                color: "#6b7280", pointerEvents: "none",
              }} />
            </div>
          </div>

          {/* domain badge */}
          {domain && (
            <div style={{
              padding: "10px 14px", borderRadius: 12,
              background: "rgba(38,242,208,0.05)",
              border: "1px solid rgba(38,242,208,0.15)",
            }}>
              <p style={{ fontSize: 10, color: "#26F2D0", fontWeight: 600,
                textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 2px" }}>
                Active Domain
              </p>
              <p style={{ color: "white", fontWeight: 700, fontSize: 14, margin: 0 }}>{domain}</p>
              <p style={{ color: "#4b5563", fontSize: 11, margin: "2px 0 0" }}>
                {papers.length} file{papers.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}

          {/* disclaimer */}
          <div style={{ marginTop: "auto", padding: "10px 12px", borderRadius: 10,
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <p style={{ fontSize: 10, color: "#2d3748", lineHeight: 1.6, margin: 0 }}>
              Materials shared for academic purposes only. Report incorrect files to admin.
            </p>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <section className="res-main" style={{
          flex: 1, display: "flex", flexDirection: "column",
          overflow: "hidden", background: "#0f0f0f",
        }}>

          {/* page header + tabs */}
          <div className="res-header-pad" style={{
            padding: "24px 28px 0",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800,
              fontSize: 22, color: "white", margin: "0 0 18px", letterSpacing: "-0.03em" }}>
              Academic Resources
            </h2>

            {/* <div style={{ display: "flex", gap: 2 }}> */}
            <div style={{ display: "flex", gap: 2, overflowX: "auto" }}>
              {TABS.map(tab => {
                const active = activeTab === tab.key;
                const isCon  = tab.key === "contribute";
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "9px 16px", borderRadius: "10px 10px 0 0",
                      fontSize: 13, fontWeight: 600, cursor: "pointer",
                      border: `1px solid ${active ? "rgba(255,255,255,0.08)" : "transparent"}`,
                      borderBottom: "none",
                      background: active
                        ? isCon ? "rgba(38,242,208,0.07)" : "rgba(255,255,255,0.05)"
                        : "transparent",
                      color: active ? (isCon ? "#26F2D0" : "white") : "#6b7280",
                      position: "relative", transition: "all 0.2s",
                    }}
                  >
                    {tab.icon} {tab.label}
                    {active && (
                      <div style={{
                        position: "absolute", bottom: -1, left: 0, right: 0, height: 2,
                        background: isCon ? "linear-gradient(90deg,#26F2D0,#7c3aed)" : "#26F2D0",
                        borderRadius: "2px 2px 0 0",
                      }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── PAPERS ── */}
          {activeTab === "papers" && (
            <div className="res-content-pad" style={{
              flex: 1, overflow: "hidden", display: "flex",
              flexDirection: "column", padding: "24px 28px",
            }}>
              <div style={{ position: "relative", marginBottom: 18 }}>
                <Search size={13} style={{ position: "absolute", left: 13, top: "50%",
                  transform: "translateY(-50%)", color: "#4b5563" }} />
                <input
                  type="text"
                  placeholder="Search by Subject, Year, or Regulation..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    width: "100%", padding: "10px 14px 10px 36px",
                    borderRadius: 12, fontSize: 13,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    color: "white", outline: "none", boxSizing: "border-box",
                  }}
                  onFocus={e  => e.target.style.borderColor = "rgba(38,242,208,0.4)"}
                  onBlur={e   => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
                />
              </div>

              {!domain && (
                <p style={{ color: "#4b5563", fontSize: 13 }}>
                  ← Select a domain to view papers
                </p>
              )}
              {fetching && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#6b7280", fontSize: 13 }}>
                  <Loader2 size={15} style={{ animation: "cv-spin 1s linear infinite", color: "#26F2D0" }} />
                  Loading files...
                </div>
              )}
              {domain && !fetching && filteredPapers.length === 0 && (
                <p style={{ color: "#4b5563", fontSize: 13 }}>No papers found.</p>
              )}
              {!fetching && filteredPapers.length > 0 && (
                <div style={{ flex: 1, overflowY: "auto" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {filteredPapers.map(file => (
                      <div key={file.id} className="res-file-row" style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        gap: 12, padding: "11px 14px", borderRadius: 12,
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)", transition: "all 0.2s",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                          <div style={{
                            width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                            background: "rgba(38,242,208,0.07)",
                            border: "1px solid rgba(38,242,208,0.14)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <FileText size={14} style={{ color: "#26F2D0" }} />
                          </div>
                          <span
                            onClick={() => window.open(`http://localhost:8081/api/files/view/${file.id}`, "_blank")}
                            style={{ color: "white", fontSize: 13, fontWeight: 500,
                              cursor: "pointer", overflow: "hidden",
                              textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                            onMouseEnter={e => e.currentTarget.style.color = "#26F2D0"}
                            onMouseLeave={e => e.currentTarget.style.color = "white"}
                          >
                            {highlightText(file.filename, search)}
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                          <button
                            onClick={() => window.open(`http://localhost:8081/api/files/view/${file.id}`, "_blank")}
                            style={{
                              display: "flex", alignItems: "center", gap: 4,
                              padding: "6px 12px", borderRadius: 8, fontSize: 12,
                              fontWeight: 600, cursor: "pointer",
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.1)", color: "#9ca3af",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.color = "white"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                          >
                            <Eye size={11} /> View
                          </button>
                          <button
                            onClick={() => handleDownload(file.id, file.filename)}
                            style={{
                              display: "flex", alignItems: "center", gap: 4,
                              padding: "6px 12px", borderRadius: 8, fontSize: 12,
                              fontWeight: 600, cursor: "pointer",
                              background: "rgba(38,242,208,0.09)",
                              border: "1px solid rgba(38,242,208,0.2)", color: "#26F2D0",
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(38,242,208,0.18)"}
                            onMouseLeave={e => e.currentTarget.style.background = "rgba(38,242,208,0.09)"}
                          >
                            <Download size={11} /> Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── NOTES ── */}
          {activeTab === "notes" && (
            <div className="res-content-pad" style={{
              flex: 1, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: 16, padding: "32px 28px",
            }}>
              <div style={{
                maxWidth: 440, width: "100%",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20, padding: "28px 28px", textAlign: "center",
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: "rgba(38,242,208,0.08)",
                  border: "1px solid rgba(38,242,208,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 14px",
                }}>
                  <BookOpen size={22} style={{ color: "#26F2D0" }} />
                </div>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800,
                  fontSize: 18, color: "white", margin: "0 0 8px" }}>
                  Notes Section
                </h3>
                <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.6, margin: "0 0 14px" }}>
                  Curated notes for each subject coming soon.
                </p>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: "3px 12px", borderRadius: 999,
                  background: "rgba(38,242,208,0.08)",
                  border: "1px solid rgba(38,242,208,0.2)", color: "#26F2D0",
                }}> Coming Soon 𓂃🖊</span>
              </div>
              <div style={{
                maxWidth: 440, width: "100%",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16, padding: "18px 24px", textAlign: "center",
              }}>
                <p style={{ color: "#6b7280", fontSize: 12, margin: "0 0 10px" }}>
                  Access notes temporarily from the link below:
                </p>
                <button
                  onClick={() => window.open(
                    "https://www.forum.universityupdates.in/threads/jntuh-study-materials-notes-important-questions.33519/",
                    "_blank"
                  )}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "8px 20px", borderRadius: 10,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#26F2D0"; e.currentTarget.style.borderColor = "rgba(38,242,208,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; }}
                >
                  Open Notes ↗
                </button>
              </div>
            </div>
          )}

          {/* ── CONTRIBUTE ── */}
          {activeTab === "contribute" && (
            <div className="res-content-pad" style={{
              flex: 1, overflowY: "auto", padding: "28px 28px",
              display: "flex", justifyContent: "flex-start",
            }}>
              <ContributeForm token={token} />
            </div>
          )}

          {activeTab === "useful" && (
  <div style={{ flex: 1, overflowY: "auto" }}>
    <UsefulResources />
  </div>
)}

        </section>
      </div>
    </>
  );
};

export default Resources;