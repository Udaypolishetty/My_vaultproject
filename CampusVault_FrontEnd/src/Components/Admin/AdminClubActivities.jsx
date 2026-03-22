import { useState } from "react";
import {
  CheckCircle2, Circle, Lock, ShieldCheck, RotateCcw,
  Trash2, Pencil, X, Check, AlertCircle, Clock,
  BarChart2, List, CalendarDays, ChevronRight,
  TrendingUp, TrendingDown, Minus
} from "lucide-react";
import { RISK_CONFIG, call } from "./AdminClubShared";

// ─── PACE INDICATOR ──────────────────────────────────────────────────────────
function PaceIndicator({ club }) {
  const start  = new Date(club.semesterStartDate || Date.now());
  const end    = new Date(club.semesterEndDate   || Date.now() + 180 * 86400000);
  const now    = new Date();
  const semPct = Math.min(Math.max((now - start) / (end - start), 0), 1);
  const acts   = club.activities?.length || 0;
  const done   = club.activities?.filter(a => a.completed).length || 0;
  const diff   = acts > 0 ? done / acts - semPct : 0;

  const { label, color, Icon } = diff > 0.05
    ? { label: "Ahead",    color: "#22c55e", Icon: TrendingUp }
    : diff < -0.1
      ? { label: "Behind",   color: "#ef4444", Icon: TrendingDown }
      : { label: "On track", color: "#26F2D0", Icon: Minus };

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>
      <Icon size={9} /> {label} · {done}/{acts}
    </span>
  );
}

// ─── GANTT CHART ─────────────────────────────────────────────────────────────
function GanttView({ club }) {
  const start   = new Date(club.semesterStartDate || Date.now());
  const end     = new Date(club.semesterEndDate   || Date.now() + 180 * 86400000);
  const totalMs = end - start;
  const now     = new Date();
  const nowPct  = Math.min(Math.max((now - start) / totalMs, 0), 1);

  const months = [];
  const d = new Date(start); d.setDate(1);
  while (d <= end) {
    const pct = (d - start) / totalMs;
    if (pct >= 0 && pct <= 1) months.push({ label: d.toLocaleDateString("en-IN", { month: "short" }), pct });
    d.setMonth(d.getMonth() + 1);
  }

  let cursor = new Date(start);

  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: "460px" }}>
        {/* Month labels */}
        <div className="relative h-5 mb-1" style={{ paddingLeft: "96px" }}>
          {months.map((m, i) => (
            <span key={i} className="absolute text-gray-600" style={{
              left: `calc(96px + ${m.pct * 100}%)`, fontSize: "9px", transform: "translateX(-50%)"
            }}>{m.label}</span>
          ))}
        </div>

        {(club.activities || []).map((act, i) => {
          const risk     = RISK_CONFIG[act.riskLevel] || RISK_CONFIG.MEDIUM;
          const minDays  = act.minDaysToComplete || 7;
          const maxDays  = act.maxDaysExpected   || 20;
          const s        = act.availableFrom ? new Date(act.availableFrom) : new Date(cursor);
          const minEnd   = new Date(s.getTime() + minDays * 86400000);
          const maxEnd   = new Date(s.getTime() + maxDays * 86400000);
          const sPct     = Math.min(Math.max((s - start) / totalMs, 0), 0.95);
          const minPct   = Math.min((minEnd - start) / totalMs, 1);
          const maxPct   = Math.min((maxEnd - start) / totalMs, 1);
          const donePct  = act.completedAt ? Math.min((new Date(act.completedAt) - start) / totalMs, 1) : null;
          const overdue  = !act.completed && now > maxEnd && act.availableFrom;
          const current  = club.currentActivityId === act.id;
          cursor = act.completedAt ? new Date(act.completedAt) : maxEnd;

          return (
            <div key={act.id} className="flex items-center gap-1.5 mb-1" style={{ height: "26px" }}>
              <div className="text-right pr-2 shrink-0" style={{
                width: "88px", fontSize: "9px",
                color: act.completed ? "#374151" : current ? "white" : "#6b7280",
                fontWeight: current ? 700 : 400,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>{i + 1}. {act.title}</div>

              <div className="flex-1 relative" style={{ height: "20px" }}>
                {/* Today line */}
                <div className="absolute top-0 bottom-0" style={{
                  left: `${nowPct * 100}%`, width: "1.5px",
                  background: "rgba(38,242,208,0.45)", zIndex: 5,
                }} />
                {/* Max range */}
                {act.availableFrom && (
                  <div className="absolute rounded" style={{
                    left: `${sPct * 100}%`, width: `${Math.max((maxPct - sPct) * 100, 0.5)}%`,
                    top: "6px", height: "8px",
                    background: overdue ? "rgba(245,158,11,0.12)" : `${risk.color}12`,
                    border: `1px solid ${overdue ? "rgba(245,158,11,0.25)" : `${risk.color}22`}`,
                  }} />
                )}
                {/* Min range */}
                {act.availableFrom && (
                  <div className="absolute rounded" style={{
                    left: `${sPct * 100}%`, width: `${Math.max((minPct - sPct) * 100, 0.5)}%`,
                    top: "6px", height: "8px",
                    background: act.completed
                      ? "linear-gradient(90deg,#22c55e,#16a34a)"
                      : overdue ? "#f59e0b"
                      : current ? `linear-gradient(90deg,${risk.color},${risk.color}99)`
                      : `${risk.color}50`,
                    boxShadow: current ? `0 0 5px ${risk.color}40` : "none",
                  }} />
                )}
                {/* Done dot */}
                {donePct !== null && (
                  <div className="absolute rounded-full" style={{
                    left: `${donePct * 100}%`, top: "4px",
                    width: "12px", height: "12px",
                    background: "#22c55e", border: "2px solid #111",
                    transform: "translateX(-50%)", boxShadow: "0 0 5px rgba(34,197,94,0.5)",
                  }} />
                )}
                {/* Locked bar */}
                {!act.availableFrom && !act.completed && (
                  <div className="absolute inset-y-1 rounded" style={{
                    left: 0, right: 0,
                    background: "rgba(255,255,255,0.02)",
                    border: "1px dashed rgba(255,255,255,0.06)",
                  }} />
                )}
                {overdue && (
                  <span className="absolute font-bold" style={{
                    left: `calc(${maxPct * 100}% + 2px)`, top: "3px",
                    fontSize: "9px", color: "#f59e0b",
                  }}>!</span>
                )}
              </div>
              <span className="shrink-0 text-gray-700" style={{ fontSize: "9px", width: "32px" }}>
                {minDays}-{maxDays}d
              </span>
            </div>
          );
        })}

        {/* Legend */}
        <div className="flex gap-3 mt-2 flex-wrap" style={{ paddingLeft: "96px" }}>
          {[["#22c55e","Done"],["#26F2D0","Current"],["#374151","Locked"],["#f59e0b","Overdue"]].map(([c,l]) => (
            <div key={l} className="flex items-center gap-1">
              <div className="rounded" style={{ width: "8px", height: "3px", background: c }} />
              <span className="text-gray-600" style={{ fontSize: "9px" }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export default function AdminClubActivities({ club, token, onRefresh }) {
  const [view, setView]         = useState("list");
  const [completing, setC]      = useState(null);
  const [deleting, setD]        = useState(null);
  const [editId, setEditId]     = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });
  const A = call(token);

  const run = async (fn, setLoading, id) => {
    setLoading(id);
    try { const r = await fn(); if (r.ok) onRefresh(); else alert(await r.text()); }
    finally { setLoading(null); }
  };

  const done  = club.activities?.filter(a => a.completed).length || 0;
  const total = club.activities?.length || 0;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="space-y-3">

      {/* Header row */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-white">{done}/{total} completed</span>
          <PaceIndicator club={club} />
        </div>
        {/* View toggle */}
        <div className="flex border border-white/10 rounded-lg overflow-hidden">
          {[["list", <List size={12} />], ["gantt", <BarChart2 size={12} />]].map(([k, icon]) => (
            <button key={k} onClick={() => setView(k)}
              className={`px-3 py-1.5 transition ${view === k
                ? "bg-[#26F2D0]/15 text-[#26F2D0]" : "text-gray-500 hover:text-white"}`}>
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* Overall progress */}
      <div className="w-full bg-white/10 rounded-full h-1.5">
        <div className="h-1.5 rounded-full bg-gradient-to-r from-[#26F2D0] to-purple-400 transition-all"
          style={{ width: `${pct}%` }} />
      </div>

      {!club.activityUnlocked && (
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl px-3 py-2 text-xs text-yellow-400">
          ⚠️ Locked for members (need {Math.ceil(club.maxMembers * 0.5)} members) · Admin manages freely
        </div>
      )}

      {/* GANTT */}
      {view === "gantt" && (
        <div className="bg-[#111] border border-white/8 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <CalendarDays size={12} className="text-[#26F2D0]" />
            <span className="text-xs text-[#26F2D0] font-semibold">Semester Timeline</span>
          </div>
          {total === 0
            ? <p className="text-gray-600 text-xs text-center py-4">No activities yet.</p>
            : <GanttView club={club} />
          }
        </div>
      )}

      {/* LIST */}
      {view === "list" && total === 0 && (
        <p className="text-gray-600 text-sm text-center py-10">No activities. Recreate club to seed 15.</p>
      )}

      {view === "list" && club.activities?.map((act, idx) => {
        const risk     = RISK_CONFIG[act.riskLevel] || RISK_CONFIG.MEDIUM;
        const isCurr   = club.currentActivityId === act.id;
        const isLocked = !act.availableFrom && !act.completed;

        const daysLeft = (() => {
          if (!act.availableFrom || act.completed) return null;
          const elapsed = (Date.now() - new Date(act.availableFrom).getTime()) / 86400000;
          return Math.max(0, (act.minDaysToComplete || 7) - elapsed);
        })();

        const daysOverdue = (() => {
          if (!act.availableFrom || act.completed) return 0;
          const elapsed = (Date.now() - new Date(act.availableFrom).getTime()) / 86400000;
          return Math.max(0, elapsed - (act.maxDaysExpected || 20));
        })();

        return (
          <div key={act.id} className="border rounded-xl p-3.5 transition-all"
            style={{
              borderColor: act.completed ? "rgba(34,197,94,0.2)"
                : isCurr ? `${risk.color}35`
                : daysOverdue > 0 ? "rgba(245,158,11,0.2)"
                : "rgba(255,255,255,0.07)",
              background: act.completed ? "rgba(34,197,94,0.04)"
                : isCurr ? risk.bg
                : daysOverdue > 0 ? "rgba(245,158,11,0.04)"
                : isLocked ? "rgba(255,255,255,0.01)"
                : "rgba(255,255,255,0.02)",
              opacity: isLocked ? 0.6 : 1,
              boxShadow: isCurr && !act.completed ? `inset 3px 0 0 ${risk.color}` : "none",
            }}>

            {/* Edit mode */}
            {editId === act.id ? (
              <div className="space-y-2">
                <input value={editForm.title} onChange={e => setEditForm(p => ({ ...p, title: e.target.value }))}
                  className="w-full bg-[#111] border border-[#26F2D0]/30 rounded-lg px-3 py-1.5 text-sm text-white outline-none" />
                <textarea value={editForm.description} rows={2}
                  onChange={e => setEditForm(p => ({ ...p, description: e.target.value }))}
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none resize-none" />
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setEditId(null)}
                    className="flex items-center gap-1 px-3 py-1 bg-white/10 text-gray-300 rounded-lg text-xs">
                    <X size={10} /> Cancel
                  </button>
                  <button onClick={() => setEditId(null)}
                    className="flex items-center gap-1 px-3 py-1 bg-[#26F2D0] text-black rounded-lg text-xs font-semibold">
                    <Check size={10} /> Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                {/* State icon */}
                <div className="shrink-0 mt-0.5">
                  {act.completed
                    ? <CheckCircle2 size={15} className="text-green-400" />
                    : isLocked
                      ? <Lock size={15} className="text-gray-700" />
                      : <Circle size={15} style={{ color: isCurr ? risk.color : "#374151" }} />
                  }
                </div>

                <div className="flex-1 min-w-0">
                  {/* Title + badges */}
                  <div className="flex items-center gap-1.5 flex-wrap mb-1">
                    <span className={`text-sm font-medium ${act.completed ? "text-gray-500 line-through" : isLocked ? "text-gray-600" : "text-white"}`}>
                      {idx + 1}. {act.title}
                    </span>

                    {/* Risk badge */}
                    {!isLocked && (
                      <span className="text-xs font-bold px-1.5 py-0.5 rounded-full" style={{
                        background: risk.bg, color: risk.color, border: `1px solid ${risk.border}`, fontSize: "9px",
                      }}>{risk.label}</span>
                    )}

                    {act.extra && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/20"
                        style={{ fontSize: "9px" }}>Extra</span>
                    )}

                    {isCurr && !act.completed && (
                      <span className="inline-flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded-full"
                        style={{ background: `${risk.color}20`, color: risk.color, border: `1px solid ${risk.color}35`, fontSize: "9px" }}>
                        <ChevronRight size={8} /> Active
                      </span>
                    )}

                    {act.completed && act.completedAt && (
                      <span className="text-green-400" style={{ fontSize: "10px" }}>
                        ✓ {new Date(act.completedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </span>
                    )}
                  </div>

                  {act.description && <p className="text-xs text-gray-500 mb-1">{act.description}</p>}

                  {/* Timeline info */}
                  {!isLocked && !act.completed && (
                    <div className="flex items-center gap-3 flex-wrap">
                      {daysLeft !== null && daysLeft > 0 && (
                        <span className="flex items-center gap-1 text-yellow-500" style={{ fontSize: "10px" }}>
                          <Clock size={9} /> {Math.ceil(daysLeft)}d until ready
                        </span>
                      )}
                      {daysLeft !== null && daysLeft <= 0 && (
                        <span className="text-green-500" style={{ fontSize: "10px" }}>✓ Ready (President can complete)</span>
                      )}
                      {daysOverdue > 0 && (
                        <span className="flex items-center gap-1 font-bold text-yellow-400" style={{ fontSize: "10px" }}>
                          <AlertCircle size={9} /> {Math.ceil(daysOverdue)}d overdue
                        </span>
                      )}
                      <span className="text-gray-700" style={{ fontSize: "10px" }}>
                        {act.minDaysToComplete || 7}–{act.maxDaysExpected || 20}d window
                      </span>
                    </div>
                  )}

                  {isLocked && (
                    <p className="flex items-center gap-1 text-gray-700" style={{ fontSize: "10px" }}>
                      <Lock size={8} /> Complete previous activity to unlock
                    </p>
                  )}

                  <p className="text-gray-700 mt-1" style={{ fontSize: "10px" }}>
                    {act.votes?.length || 0} votes · by {act.addedByName || "Admin"}
                  </p>
                </div>

                {/* Admin actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {!act.completed ? (
                    <button onClick={() => run(() => A.patch(`/api/clubs/${club.id}/activities/${act.id}/admin-complete`), setC, act.id)}
                      disabled={completing === act.id}
                      className="flex items-center gap-1 px-2 py-1 text-xs bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition">
                      {completing === act.id
                        ? <div className="w-3 h-3 border border-green-400 border-t-transparent rounded-full animate-spin" />
                        : <><ShieldCheck size={10} /> Done</>}
                    </button>
                  ) : (
                    <button onClick={() => run(() => A.patch(`/api/clubs/${club.id}/activities/${act.id}/admin-undo`), setC, act.id)}
                      disabled={completing === act.id}
                      className="flex items-center gap-1 px-2 py-1 text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-lg hover:bg-yellow-500/20 transition">
                      {completing === act.id
                        ? <div className="w-3 h-3 border border-yellow-400 border-t-transparent rounded-full animate-spin" />
                        : <><RotateCcw size={10} /> Undo</>}
                    </button>
                  )}
                  <button onClick={() => { setEditId(act.id); setEditForm({ title: act.title, description: act.description || "" }); }}
                    className="p-1.5 text-gray-600 hover:text-[#26F2D0] hover:bg-[#26F2D0]/10 rounded-lg transition">
                    <Pencil size={12} />
                  </button>
                  <button onClick={() => run(() => A.del(`/api/clubs/${club.id}/activities/${act.id}`), setD, act.id)}
                    disabled={deleting === act.id}
                    className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition">
                    {deleting === act.id
                      ? <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin" />
                      : <Trash2 size={12} />}
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}