import { useState, useCallback } from "react";
import {
  CheckCircle2, Circle, Lock, Plus, ThumbsUp, X, Sparkles,
  AlertCircle, ShieldCheck, Trash2, RotateCcw, Clock,
  Flame, Zap, BarChart2, List, CalendarDays, ChevronRight,
  TrendingUp, TrendingDown, Minus
} from "lucide-react";
import { validateShortText } from "../../utils/validate";

const RISK_CONFIG = {
  LOW:    { label: "Easy",   color: "#22c55e", bg: "rgba(34,197,94,0.12)",  border: "rgba(34,197,94,0.25)",  Icon: Zap   },
  MEDIUM: { label: "Medium", color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.25)", Icon: Flame },
  HIGH:   { label: "Hard",   color: "#ef4444", bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.25)",  Icon: Flame },
};

const MAX_EXTRA = 3;

// ─── PACE INDICATOR ──────────────────────────────────────────────────────────
function PaceIndicator({ club }) {
  const start  = new Date(club.semesterStartDate || Date.now());
  const end    = new Date(club.semesterEndDate   || Date.now() + 180 * 86400000);
  const now    = new Date();
  const semPct = Math.min(Math.max((now - start) / (end - start), 0), 1);
  const acts   = club.activities?.length || 0;
  const done   = club.activities?.filter(a => a.completed).length || 0;
  const diff   = acts > 0 ? (done / acts) - semPct : 0;

  const { label, color, Icon } = diff > 0.05
    ? { label: "Ahead",    color: "#22c55e", Icon: TrendingUp }
    : diff < -0.1
      ? { label: "Behind",   color: "#ef4444", Icon: TrendingDown }
      : { label: "On track", color: "#26F2D0", Icon: Minus };

  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      padding: "4px 10px", borderRadius: "20px",
      background: `${color}15`, border: `1px solid ${color}30`,
    }}>
      <Icon size={11} style={{ color }} />
      <span style={{ fontSize: "10px", color, fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: "10px", color: "#6b7280" }}>
        {done}/{acts} · {Math.round(semPct * 100)}% elapsed
      </span>
    </div>
  );
}

// ─── GANTT VIEW ───────────────────────────────────────────────────────────────
function GanttView({ club }) {
  const semStart = new Date(club.semesterStartDate || Date.now());
  const semEnd   = new Date(club.semesterEndDate   || Date.now() + 180 * 86400000);
  const totalMs  = semEnd - semStart;
  const now      = new Date();
  const nowPct   = Math.min(Math.max((now - semStart) / totalMs, 0), 1);

  const months = [];
  const d = new Date(semStart); d.setDate(1);
  while (d <= semEnd) {
    const pct = (d - semStart) / totalMs;
    if (pct >= 0 && pct <= 1)
      months.push({ label: d.toLocaleDateString("en-IN", { month: "short" }), pct });
    d.setMonth(d.getMonth() + 1);
  }

  let cursor = new Date(semStart);

  return (
    <div style={{ overflowX: "auto", paddingBottom: "4px" }}>
      <div style={{ minWidth: "520px" }}>
        <div style={{ position: "relative", height: "20px", marginBottom: "8px", paddingLeft: "120px" }}>
          {months.map((m, i) => (
            <div key={i} style={{
              position: "absolute", left: `calc(120px + ${m.pct * 100}%)`,
              transform: "translateX(-50%)", fontSize: "10px", color: "#4b5563", fontWeight: 500,
            }}>{m.label}</div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {(club.activities || []).map((act, i) => {
            const risk    = RISK_CONFIG[act.riskLevel] || RISK_CONFIG.MEDIUM;
            const minDays = act.minDaysToComplete || 7;
            const maxDays = act.maxDaysExpected   || 20;
            const startD  = act.availableFrom ? new Date(act.availableFrom) : new Date(cursor);
            const minEnd  = new Date(startD.getTime() + minDays * 86400000);
            const maxEnd  = new Date(startD.getTime() + maxDays * 86400000);
            const doneEnd = act.completedAt ? new Date(act.completedAt) : null;
            const sPct    = Math.min(Math.max((startD - semStart) / totalMs, 0), 0.95);
            const minPct  = Math.min((minEnd - semStart) / totalMs, 1);
            const maxPct  = Math.min((maxEnd - semStart) / totalMs, 1);
            const donePct = doneEnd ? Math.min((doneEnd - semStart) / totalMs, 1) : null;
            const overdue = !act.completed && now > maxEnd && act.availableFrom;
            const isCurr  = club.currentActivityId === act.id;
            cursor = act.completedAt ? new Date(act.completedAt) : maxEnd;

            return (
              <div key={act.id} style={{ display: "flex", alignItems: "center", gap: "8px", height: "32px" }}>
                <div style={{
                  width: "112px", flexShrink: 0, fontSize: "10px",
                  color: act.completed ? "#4b5563" : isCurr ? "white" : "#9ca3af",
                  fontWeight: isCurr ? 600 : 400,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  textAlign: "right", paddingRight: "8px",
                }}>{i + 1}. {act.title}</div>

                <div style={{ flex: 1, position: "relative", height: "24px" }}>
                  {/* Today line */}
                  <div style={{ position: "absolute", left: `${nowPct * 100}%`, top: 0, bottom: 0, width: "1.5px", background: "rgba(38,242,208,0.5)", zIndex: 10 }} />
                  {/* Max range */}
                  {act.availableFrom && (
                    <div style={{
                      position: "absolute", left: `${sPct * 100}%`,
                      width: `${Math.max((maxPct - sPct) * 100, 1)}%`,
                      top: "8px", height: "8px", borderRadius: "4px",
                      background: act.completed ? "rgba(34,197,94,0.15)" : overdue ? "rgba(245,158,11,0.2)" : `${risk.color}18`,
                      border: `1px solid ${act.completed ? "rgba(34,197,94,0.3)" : overdue ? "rgba(245,158,11,0.4)" : `${risk.color}30`}`,
                    }} />
                  )}
                  {/* Min range */}
                  {act.availableFrom && (
                    <div style={{
                      position: "absolute", left: `${sPct * 100}%`,
                      width: `${Math.max((minPct - sPct) * 100, 1)}%`,
                      top: "8px", height: "8px", borderRadius: "4px",
                      background: act.completed
                        ? "linear-gradient(90deg,#22c55e,#16a34a)"
                        : overdue ? "linear-gradient(90deg,#f59e0b,#d97706)"
                        : isCurr ? `linear-gradient(90deg,${risk.color},${risk.color}cc)`
                        : `${risk.color}60`,
                      boxShadow: isCurr && !act.completed ? `0 0 8px ${risk.color}60` : "none",
                    }} />
                  )}
                  {/* Completion dot */}
                  {donePct !== null && (
                    <div style={{
                      position: "absolute", left: `${donePct * 100}%`, top: "6px",
                      width: "12px", height: "12px", background: "#22c55e", borderRadius: "50%",
                      border: "2px solid #111", transform: "translateX(-50%)",
                      boxShadow: "0 0 6px rgba(34,197,94,0.6)",
                    }} />
                  )}
                  {/* Locked */}
                  {!act.availableFrom && !act.completed && (
                    <div style={{
                      position: "absolute", inset: "4px 0", borderRadius: "4px",
                      background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.08)",
                    }}>
                      <Lock size={8} style={{ color: "#374151", marginLeft: "8px", marginTop: "2px" }} />
                    </div>
                  )}
                  {overdue && (
                    <div style={{ position: "absolute", left: `${maxPct * 100}%`, top: "4px", fontSize: "10px", color: "#f59e0b", fontWeight: 700 }}>!</div>
                  )}
                </div>
                <div style={{ width: "40px", flexShrink: 0, fontSize: "9px", color: "#374151" }}>
                  {minDays}-{maxDays}d
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "12px", paddingLeft: "120px", flexWrap: "wrap" }}>
          {[["#22c55e","Done"],["#26F2D0","Current"],["#374151","Locked"],["#f59e0b","Overdue"]].map(([c,l]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div style={{ width: "10px", height: "4px", borderRadius: "2px", background: c }} />
              <span style={{ fontSize: "9px", color: "#4b5563" }}>{l}</span>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "1.5px", height: "10px", background: "rgba(38,242,208,0.5)" }} />
            <span style={{ fontSize: "9px", color: "#4b5563" }}>Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ClubActivities({ club, myRoll, token, onUpdate }) {
  const [view, setView]             = useState("list");
  const [showAdd, setShowAdd]       = useState(false);
  const [form, setForm]             = useState({ title: "", description: "" });
  const [adding, setAdding]         = useState(false);
  const [completing, setCompleting] = useState(null);
  const [voting, setVoting]         = useState(null);
  const [errors, setErrors]         = useState({});
  const [confirmComplete, setConfirmComplete] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // ✅ BUG 3 FIX: read role correctly from sessionStorage
  const role      = sessionStorage.getItem("role") || "";
  const isAdmin   = role === "ADMIN" || role === "MODERATOR";
  const isPresident = myRoll === club.presidentRoll;
  

  // ✅ BUG 1 FIX: only CONFIRMED members count toward unlock
  // club.members is the confirmed list, club.pendingMembers is the grace period list
  const confirmedCount = club.members?.length || 0;
  const halfMembers    = Math.ceil(club.maxMembers * 0.5);
  // ✅ isUnlocked uses confirmed count only
const isUnlocked = confirmedCount >= halfMembers && !!club.presidentRoll;

  const isMember    = club.members?.includes(myRoll);
  const isPending   = club.pendingMembers?.some(p => p.rollNumber === myRoll);
  const extraLeft   = MAX_EXTRA - (club.extraActivities || 0);
  const isConfirmedMember = isMember; 

  const completedCount = club.activities?.filter(a => a.completed).length || 0;
  const totalCount     = club.activities?.length || 0;
  const progressPct    = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const playClickSound = () => {
  const audio = new Audio("/sounds/notify.mp3"); // put file in public/sounds/
  audio.volume = 0.5;
  audio.play().catch(() => {});
};

  // ✅ BUG 4 FIX: getDaysLeft uses availableFrom correctly
  // Returns null if no availableFrom (locked), or days remaining as number
  const getDaysLeft = (activity) => {
    if (!activity.availableFrom) return null;
    const minDays = activity.minDaysToComplete > 0 ? activity.minDaysToComplete : 7;
    const elapsed = (Date.now() - new Date(activity.availableFrom).getTime()) / 86400000;
    return Math.max(0, minDays - elapsed);
  };

  const getDaysOverdue = (activity) => {
    if (!activity.availableFrom || activity.completed) return 0;
    const maxDays = activity.maxDaysExpected > 0 ? activity.maxDaysExpected : 20;
    const elapsed = (Date.now() - new Date(activity.availableFrom).getTime()) / 86400000;
    return Math.max(0, elapsed - maxDays);
  };

  // ✅ BUG 3 FIX: getActivityState — determines what each user sees
  const getActivityState = (activity) => {
    if (activity.completed) return "completed";
    if (activity.id === club.currentActivityId) return "current";
    if (!activity.availableFrom) return "locked";
    return "available";
  };

  // ✅ BUG 3 + 4 FIX: handleCompleteClick — ONLY president can call this
  // daysLeft check enforced here too (double safety on top of backend)
 const handleCompleteClick = (activity) => {
  if (!isPresident) return;

  // 🔒 BLOCK if NOT unlocked
  if (!activity.availableFrom) {
playClickSound();
setConfirmComplete({
  ...activity,
  warning: "LOCKED" // or "TIME"
});
return;    return;
  }

    const daysLeft = getDaysLeft(activity);
    if (daysLeft !== null && daysLeft > 0) {
      // Show blocked message — don't open confirm popup
playClickSound();
requestAnimationFrame(() => {
  setConfirmComplete({
    ...activity,
    warning: "LOCKED" // or TIME
  });
});
return;      return;
    }
    setConfirmComplete(activity);
  };

  const handleCompleteConfirm = async () => {
    if (!confirmComplete || !isPresident) return;
    setCompleting(confirmComplete.id);
    setConfirmComplete(null);
    try {
      const res = await fetch(
        `http://localhost:8081/api/clubs/${club.id}/activities/${confirmComplete.id}/complete`,
        { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) onUpdate(await res.json());
      else alert(await res.text());
    } finally { setCompleting(null); }
  };

  // Admin-only complete — bypasses time rules
  const handleAdminComplete = async (activityId) => {
    if (!isAdmin) return;
    setCompleting(activityId);
    try {
      const res = await fetch(
        `http://localhost:8081/api/clubs/${club.id}/activities/${activityId}/admin-complete`,
        { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) onUpdate(await res.json());
      else alert(await res.text());
    } finally { setCompleting(null); }
  };

  const handleAdminUndo = async (activityId) => {
    if (!isAdmin) return;
    setCompleting(activityId);
    try {
      const res = await fetch(
        `http://localhost:8081/api/clubs/${club.id}/activities/${activityId}/admin-undo`,
        { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) onUpdate(await res.json());
      else alert(await res.text());
    } finally { setCompleting(null); }
  };

  const handleAdminDelete = async (activityId) => {
    if (!isAdmin) return;
    setDeletingId(activityId);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/activities/${activityId}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) onUpdate(await res.json());
    } finally { setDeletingId(null); }
  };

  const handleVote = useCallback(async (activityId) => {
    if (voting) return;
    setVoting(activityId);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/activities/${activityId}/vote`, {
        method: "POST", headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) onUpdate(await res.json());
    } finally { setTimeout(() => setVoting(null), 500); }
  }, [voting]);

  const handleAdd = async () => {
    const check = validateShortText(form.title, 80, "Title");
    if (!check.valid) { setErrors({ title: check.error }); return; }
    setErrors({});
    setAdding(true);
    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}/activities`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      if (res.ok) { onUpdate(await res.json()); setForm({ title: "", description: "" }); setShowAdd(false); }
      else setErrors({ api: await res.text() });
    } finally { setAdding(false); }
  };

  // ─── LOCKED STATE (not enough confirmed members) ─────────────────
  // ✅ BUG 1 FIX: show locked state based on confirmed count only
  if (!isUnlocked && !isAdmin) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{
          width: "64px", height: "64px", borderRadius: "20px",
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
        }}>
          <Lock size={28} style={{ color: "#374151" }} />
        </div>
        <h4 style={{ color: "white", fontWeight: 700, marginBottom: "8px" }}>Activities Locked</h4>
        <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "4px" }}>
          Unlocks when {halfMembers} confirmed members join
        </p>
        <p style={{ color: "#4b5563", fontSize: "11px", marginBottom: "20px" }}>
          ({confirmedCount} confirmed · {club.pendingMembers?.length || 0} pending grace period)
        </p>
        <div style={{ maxWidth: "240px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#4b5563", marginBottom: "6px" }}>
            <span>{confirmedCount} confirmed</span><span>{halfMembers} needed</span>
          </div>
          <div style={{ height: "8px", borderRadius: "4px", background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: "4px",
              width: `${Math.min((confirmedCount / halfMembers) * 100, 100)}%`,
              background: "linear-gradient(90deg, #26F2D0, #7c3aed)",
              transition: "width 0.5s ease", boxShadow: "0 0 8px rgba(38,242,208,0.4)",
            }} />
          </div>
          <p style={{ fontSize: "11px", color: "#374151", marginTop: "6px" }}>
            {Math.max(0, halfMembers - confirmedCount)} more needed
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* ✅ Confirm complete popup — only shown for president */}
      {confirmComplete && isPresident && (
<div style={{
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  backdropFilter: "blur(6px)",
  zIndex: 50,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
  animation: "fadeIn 0.2s ease",
}}>
      <div style={{
        background: "#1a1a1a",
        border: "1px solid rgba(38,242,208,0.2)",
        borderRadius: "20px",
        padding: "20px",
        width: "100%",
        maxWidth: "380px",
        animation: "popupBounce 0.35s ease",
      }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "14px",
                background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <CheckCircle2 size={20} style={{ color: "#22c55e" }} />
              </div>
              <div>
                <p style={{ color: "white", fontWeight: 700, fontSize: "14px" }}>Mark as Complete?</p>
                <p style={{ color: "#6b7280", fontSize: "11px" }}>This action is permanent</p>
              </div>
            </div>

            <div style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px", padding: "12px", marginBottom: "12px",
            }}>
              <p style={{ color: "white", fontSize: "13px", fontWeight: 600 }}>{confirmComplete.title}</p>
              {confirmComplete.description && (
                <p style={{ color: "#6b7280", fontSize: "11px", marginTop: "4px" }}>{confirmComplete.description}</p>
              )}
            </div>

            <div style={{
              background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)",
              borderRadius: "12px", padding: "12px", marginBottom: "16px",
              display: "flex", gap: "8px", alignItems: "flex-start",
            }}>
              <AlertCircle size={13} style={{ color: "#f59e0b", flexShrink: 0, marginTop: "1px" }} />
<p style={{ fontSize: "11px", color: "#fcd34d", lineHeight: 1.6 }}>
{confirmComplete.warning === "LOCKED" && "🔒 This activity is not unlocked yet."}  {confirmComplete.warning === "TIME" && 
    `⏳ Requires ${confirmComplete.minDaysToComplete} days before completion.`}
  {!confirmComplete.warning && 
    `Designed to take ${confirmComplete.minDaysToComplete}–${confirmComplete.maxDaysExpected} days.`}
</p>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setConfirmComplete(null)} style={{
                flex: 1, padding: "14px", borderRadius: "12px",
                background: "rgba(255,255,255,0.08)", color: "#9ca3af",
                border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600,
              }}>Cancel</button>
<button
  onClick={handleCompleteConfirm}
  disabled={!!confirmComplete.warning}
  style={{
    flex: 1,
    padding: "14px",
    borderRadius: "12px",
    background: confirmComplete.warning ? "rgba(255,255,255,0.1)" : "rgba(34,197,94,0.2)",
    color: confirmComplete.warning ? "#6b7280" : "#22c55e",
    border: "1px solid rgba(34,197,94,0.3)",
    cursor: confirmComplete.warning ? "not-allowed" : "pointer",
    fontSize: "13px",
    fontWeight: 700,
  }}
>
  {confirmComplete.warning ? "Blocked" : "Yes, Complete ✓"}
</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
            <span style={{ color: "white", fontSize: "14px", fontWeight: 700 }}>
              Activities ({completedCount}/{totalCount})
            </span>
            <PaceIndicator club={club} />
          </div>
          <div style={{ width: "180px" }}>
            <div style={{ height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: "2px", width: `${progressPct}%`,
                background: "linear-gradient(90deg, #26F2D0, #7c3aed)", transition: "width 0.6s ease",
              }} />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ display: "flex", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", overflow: "hidden" }}>
            {[["list", List], ["gantt", BarChart2]].map(([k, I]) => (
              <button key={k} onClick={() => setView(k)} style={{
                padding: "6px 10px", border: "none", cursor: "pointer",
                background: view === k ? "rgba(38,242,208,0.15)" : "transparent",
                color: view === k ? "#26F2D0" : "#6b7280", transition: "all 0.2s",
              }}>
                <I size={13} />
              </button>
            ))}
          </div>

          {/* ✅ Only president sees Add button */}
          {isPresident && extraLeft > 0 && isUnlocked && (
            <button onClick={() => setShowAdd(!showAdd)} style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "6px 12px", borderRadius: "20px",
              background: "rgba(38,242,208,0.1)", border: "1px solid rgba(38,242,208,0.2)",
              color: "#26F2D0", fontSize: "12px", fontWeight: 600, cursor: "pointer",
            }}>
              <Plus size={11} /> Add ({extraLeft} left)
            </button>
          )}
        </div>
      </div>

      {/* Add form */}
      {showAdd && isPresident && (
        <div style={{
          background: "#1a1a1a", border: "1px solid rgba(38,242,208,0.2)",
          borderRadius: "16px", padding: "16px", marginBottom: "16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
            <Sparkles size={12} style={{ color: "#26F2D0" }} />
            <span style={{ fontSize: "12px", color: "#26F2D0", fontWeight: 600 }}>
              Add Extra Activity ({extraLeft} remaining)
            </span>
          </div>
          <input value={form.title}
            onChange={e => { setForm(p => ({ ...p, title: e.target.value })); setErrors({}); }}
            placeholder="Activity title..." maxLength={80}
            style={{
              width: "100%", background: "#111",
              border: `1px solid ${errors.title ? "#ef4444" : "rgba(255,255,255,0.1)"}`,
              borderRadius: "10px", padding: "8px 12px", fontSize: "13px",
              color: "white", outline: "none", boxSizing: "border-box", marginBottom: "8px",
            }} />
          {errors.title && <p style={{ fontSize: "11px", color: "#ef4444", marginBottom: "8px" }}>⚠️ {errors.title}</p>}
          <textarea value={form.description}
            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            placeholder="Description (optional)..." rows={2} maxLength={200}
            style={{
              width: "100%", background: "#111", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px", padding: "8px 12px", fontSize: "12px",
              color: "white", outline: "none", resize: "none", boxSizing: "border-box", marginBottom: "8px",
            }} />
          {errors.api && <p style={{ fontSize: "11px", color: "#ef4444", marginBottom: "8px" }}>⚠️ {errors.api}</p>}
          <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
            <button onClick={() => { setShowAdd(false); setErrors({}); }} style={{
              display: "flex", alignItems: "center", gap: "4px", padding: "6px 12px",
              background: "rgba(255,255,255,0.08)", color: "#9ca3af",
              border: "none", borderRadius: "8px", fontSize: "12px", cursor: "pointer",
            }}><X size={10} /> Cancel</button>
            <button onClick={handleAdd} disabled={!form.title.trim() || adding} style={{
              padding: "6px 14px", background: "#26F2D0", color: "black",
              border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: 700,
              cursor: "pointer", opacity: !form.title.trim() || adding ? 0.4 : 1,
            }}>
              {adding ? "Adding..." : "Add Activity"}
            </button>
          </div>
        </div>
      )}

      {/* GANTT */}
      {view === "gantt" && (
        <div style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
            <CalendarDays size={13} style={{ color: "#26F2D0" }} />
            <span style={{ fontSize: "12px", color: "#26F2D0", fontWeight: 600 }}>Semester Timeline</span>
          </div>
          {totalCount === 0
            ? <p style={{ color: "#4b5563", fontSize: "13px", textAlign: "center", padding: "24px" }}>No activities yet.</p>
            : <GanttView club={club} />
          }
        </div>
      )}

      {/* LIST */}
      {view === "list" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {totalCount === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 20px", color: "#4b5563" }}>
              <BarChart2 size={28} style={{ margin: "0 auto 8px", opacity: 0.3 }} />
              <p style={{ fontSize: "13px" }}>No activities. Recreate this club to seed 15 activities.</p>
            </div>
          ) : (
            club.activities?.map((activity, idx) => {
              const state     = getActivityState(activity);
              const risk      = RISK_CONFIG[activity.riskLevel] || RISK_CONFIG.MEDIUM;
              const daysLeft  = getDaysLeft(activity);
              const daysOver  = getDaysOverdue(activity);
              const isOver    = daysOver > 0;
              const hasVoted  = activity.votes?.includes(myRoll);
              const isCurrent = state === "current";
              const isLocked  = state === "locked";
              const isCompleted = state === "completed";

              // ✅ BUG 3 + 4 FIX: complete button ONLY for president on current activity with time met
              const presidentCanComplete = isPresident && isCurrent && daysLeft !== null && daysLeft <= 0;
              // President sees the circle but it's grayed if time not met
              const presidentSeeCircle   = isPresident && isCurrent && !isCompleted;

              return (
                <div key={activity.id} style={{
                  border: `1px solid ${
                    isCompleted ? "rgba(34,197,94,0.2)"
                    : isCurrent ? `${risk.color}40`
                    : isOver    ? "rgba(245,158,11,0.25)"
                    : "rgba(255,255,255,0.06)"
                  }`,
                  borderRadius: "14px",
                  background: isCompleted ? "rgba(34,197,94,0.04)"
                    : isCurrent ? risk.bg
                    : isOver    ? "rgba(245,158,11,0.05)"
                    : isLocked  ? "rgba(255,255,255,0.01)"
                    : "rgba(255,255,255,0.02)",
                  padding: "14px",
                  opacity: isLocked ? 0.55 : 1,
                  transition: "all 0.2s",
                  boxShadow: isCurrent && !isCompleted
                    ? `inset 3px 0 0 ${risk.color}, 0 2px 12px ${risk.color}15`
                    : "none",
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>

                    {/* Status icon — BUG 3 FIX: only president gets clickable circle */}
                    <div style={{ flexShrink: 0, marginTop: "1px" }}>
                      {isCompleted ? (
                        <CheckCircle2 size={18} style={{ color: "#22c55e" }} />
                      ) : isLocked ? (
                        <Lock size={18} style={{ color: "#374151" }} />
                      ) : presidentSeeCircle ? (
                        // President sees circle — clickable only if time met
                          <button
                            onClick={() => {
                              playClickSound(); // 🔊 sound

                              // 🔒 not unlocked
                              if (!activity.availableFrom) {
                                setConfirmComplete({
                                  ...activity,
                                  warning: "LOCKED"
                                });
                                return;
                              }

                              // ⏳ time not completed
                              if (!presidentCanComplete) {
                                setConfirmComplete({
                                  ...activity,
                                  warning: "TIME"
                                });
                                return;
                              }

                              // ✅ valid → normal flow
                              handleCompleteClick(activity);
                            }}
                            disabled={completing === activity.id}
                            title={presidentCanComplete ? "Mark complete" : `${Math.ceil(daysLeft)}d remaining`}
                            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                          >
                            {completing === activity.id ? (
                              <div style={{
                                width: "18px", height: "18px", borderRadius: "50%",
                                border: `2px solid ${risk.color}`, borderTopColor: "transparent",
                                animation: "spin 0.8s linear infinite",
                              }} />
                            ) : (
                              <Circle size={18} style={{ color: presidentCanComplete ? risk.color : "#4b5563" }} />
                            )}
                          </button>
                      ) : (
                        // Regular member / other — just show gray circle, no click
                        <Circle size={18} style={{ color: "#374151" }} />
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", marginBottom: "4px" }}>
                        <span style={{
                          fontSize: "13px", fontWeight: isCurrent ? 700 : 500,
                          color: isCompleted ? "#4b5563" : isLocked ? "#374151" : "white",
                          textDecoration: isCompleted ? "line-through" : "none",
                        }}>
                          {idx + 1}. {activity.title}
                        </span>

                        {!isLocked && (
                          <span style={{
                            display: "inline-flex", alignItems: "center", gap: "3px",
                            fontSize: "9px", fontWeight: 700, padding: "2px 6px", borderRadius: "20px",
                            background: risk.bg, color: risk.color, border: `1px solid ${risk.border}`,
                          }}>
                            <risk.Icon size={8} /> {risk.label}
                          </span>
                        )}

                        {activity.extra && (
                          <span style={{
                            fontSize: "9px", padding: "2px 6px", borderRadius: "20px",
                            background: "rgba(168,85,247,0.15)", color: "#c084fc",
                            border: "1px solid rgba(168,85,247,0.25)",
                          }}>Extra</span>
                        )}

                        {isCurrent && !isCompleted && (
                          <span style={{
                            fontSize: "9px", fontWeight: 700, padding: "2px 6px", borderRadius: "20px",
                            background: `${risk.color}20`, color: risk.color,
                            border: `1px solid ${risk.color}40`,
                            display: "inline-flex", alignItems: "center", gap: "3px",
                          }}>
                            <ChevronRight size={8} /> Current
                          </span>
                        )}

                        {isCompleted && activity.completedAt && (
                          <span style={{ fontSize: "10px", color: "#22c55e" }}>
                            ✓ {new Date(activity.completedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          </span>
                        )}
                      </div>

                      {activity.description && (
                        <p style={{ fontSize: "11px", color: "#6b7280", marginBottom: "4px", lineHeight: 1.5 }}>
                          {activity.description}
                        </p>
                      )}

{/* Timeline row — only for non-locked non-completed */}
{!isLocked && !isCompleted && (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginTop: "4px" }}>
    {daysLeft !== null && daysLeft > 0 && (
      <span style={{ fontSize: "10px", color: "#f59e0b", display: "flex", alignItems: "center", gap: "3px" }}>
        <Clock size={9} /> {Math.ceil(daysLeft)}d until ready
        {isPresident && <span style={{ color: "#6b7280" }}> (president only)</span>}
      </span>
    )}
    {daysLeft !== null && daysLeft <= 0 && isPresident && (
      <span style={{ fontSize: "10px", color: "#22c55e", display: "flex", alignItems: "center", gap: "3px" }}>
        <CheckCircle2 size={9} /> Ready to complete
      </span>
    )}
    {isOver && (
      <span style={{ fontSize: "10px", color: "#f59e0b", fontWeight: 700, display: "flex", alignItems: "center", gap: "3px" }}>
        <AlertCircle size={9} /> {Math.ceil(daysOver)}d overdue
      </span>
    )}
    <span style={{ fontSize: "10px", color: "#374151" }}>
      {activity.minDaysToComplete || 7}–{activity.maxDaysExpected || 20}d window
    </span>
  </div>
)}

{/* ✅ ADDED: President-only complete button with time warning */}
{isPresident && isCurrent && !isCompleted && (
    <div style={{ marginTop: "8px" }}>
    <button
onClick={() => {
  // 🔒 BLOCK if not unlocked
  if (!activity.availableFrom) {
playClickSound();
setConfirmComplete({
  ...activity,
  warning: "LOCKED" // or "TIME"
});
return;    return;
  }

  const availableDate = new Date(activity.availableFrom);
  const daysPassed = Math.floor(
    (new Date() - availableDate) / (1000 * 60 * 60 * 24)
  );
  const minDays = activity.minDaysToComplete || 7;

  if (daysPassed < minDays) {
playClickSound();
setConfirmComplete({
  ...activity,
  warning: "LOCKED" // or "TIME"
});
return;
    return;
  }

  handleCompleteClick(activity);
}}
      disabled={completing === activity.id}
      style={{
        width: "100%",
        marginTop: "6px",
        padding: "8px",
        borderRadius: "10px",
        background: "rgba(34,197,94,0.2)",
        color: "#22c55e",
        border: "1px solid rgba(34,197,94,0.3)",
        fontSize: "12px",
        fontWeight: 600,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        opacity: completing === activity.id ? 0.6 : 1,
      }}
    >
      <CheckCircle2 size={14} /> Mark as Completed
    </button>

    {/* Time Warning Label */}
    <p
      style={{
        fontSize: "9px",
        textAlign: "center",
        marginTop: "4px",
        color: "#6b7280",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
      }}
    >
      Backend locks this for {activity.minDaysToComplete || 7} days
    </p>
  </div>
)}

                      {isLocked && (
                        <p style={{ fontSize: "10px", color: "#374151", marginTop: "2px", display: "flex", alignItems: "center", gap: "4px" }}>
                          <Lock size={8} /> Unlocks after previous activity is completed
                        </p>
                      )}

                      {/* Vote row — members only */}
{!isLocked && isConfirmedMember && (
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px" }}>
                          <button onClick={() => handleVote(activity.id)} disabled={voting === activity.id}
                            style={{
                              display: "flex", alignItems: "center", gap: "4px",
                              padding: "3px 8px", borderRadius: "20px",
                              background: hasVoted ? "rgba(38,242,208,0.12)" : "rgba(255,255,255,0.04)",
                              border: `1px solid ${hasVoted ? "rgba(38,242,208,0.3)" : "rgba(255,255,255,0.08)"}`,
                              color: hasVoted ? "#26F2D0" : "#6b7280", fontSize: "10px", cursor: "pointer",
                            }}>
                            <ThumbsUp size={9} fill={hasVoted ? "#26F2D0" : "none"} />
                            {activity.votes?.length || 0}
                          </button>
                          <span style={{ fontSize: "10px", color: "#374151" }}>by {activity.addedByName || "Admin"}</span>
                        </div>
                      )}
                    </div>

                    {/* ✅ Admin-only right actions */}
                    {isAdmin && (
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
                        {!isCompleted ? (
                          <button onClick={() => handleAdminComplete(activity.id)}
                            disabled={completing === activity.id}
                            title="Admin: complete (bypass time)"
                            style={{
                              display: "flex", alignItems: "center", gap: "3px",
                              padding: "4px 8px", borderRadius: "8px",
                              background: "rgba(34,197,94,0.1)", color: "#22c55e",
                              border: "1px solid rgba(34,197,94,0.2)", fontSize: "10px", cursor: "pointer",
                            }}>
                            {completing === activity.id
                              ? <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "1.5px solid #22c55e", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
                              : <><ShieldCheck size={10} /> Done</>
                            }
                          </button>
                        ) : (
                          <button onClick={() => handleAdminUndo(activity.id)}
                            disabled={completing === activity.id}
                            title="Admin: undo"
                            style={{
                              display: "flex", alignItems: "center", gap: "3px",
                              padding: "4px 8px", borderRadius: "8px",
                              background: "rgba(245,158,11,0.1)", color: "#f59e0b",
                              border: "1px solid rgba(245,158,11,0.2)", fontSize: "10px", cursor: "pointer",
                            }}>
                            <RotateCcw size={10} /> Undo
                          </button>
                        )}
                        <button onClick={() => handleAdminDelete(activity.id)}
                          disabled={deletingId === activity.id}
                          title="Delete activity"
                          style={{ padding: "4px 6px", borderRadius: "8px", background: "transparent", color: "#374151", border: "none", cursor: "pointer" }}
                          onMouseEnter={e => e.currentTarget.style.color = "#ef4444"}
                          onMouseLeave={e => e.currentTarget.style.color = "#374151"}>
                          {deletingId === activity.id
                            ? <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "1.5px solid #ef4444", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
                            : <Trash2 size={12} />
                          }
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {totalCount > 0 && view === "list" && (
        <p style={{ fontSize: "10px", color: "#374151", textAlign: "center", marginTop: "12px" }}>
          Sequential · Only president can mark complete · Min {club.activities?.[0]?.minDaysToComplete || 7}d per activity
        </p>
      )}

<style>{`
@keyframes spin { to { transform: rotate(360deg); } }

@keyframes popupBounce {
  0% {
    transform: scale(0.9) translateY(30px);
    opacity: 0;
  }
  60% {
    transform: scale(1.05) translateY(-6px);
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
`}</style>    </div>
  );
}