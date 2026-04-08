import { API_BASE } from "../../config/api";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Bell, X, Check } from "lucide-react";

export default function AdminNotificationDropdown({ token }) {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const bellRef = useRef(null);

  useEffect(() => {
    fetchUnreadCount();

    const evtSource = new EventSource(
      `${API_BASE}/api/notifications/stream?token=${token}`
    );
    evtSource.addEventListener("notification", () => {
      setUnread(prev => prev + 1);
    });
    evtSource.onerror = () => evtSource.close();
    return () => evtSource.close();
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/notifications/unread-count`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) return;
      const data = await res.json();
      setUnread(data.count);
    } catch (err) {
      console.error("Unread count failed:", err);
    }
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/notifications/my`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) return;
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error("Fetch notifications failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = async () => {
    setOpen(true);
    await fetchNotifications();
    await markAllRead();
  };

  const markAllRead = async () => {
    try {
      await fetch(`${API_BASE}/api/notifications/mark-read`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      setUnread(0);
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error("Mark read failed:", err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await fetch(`${API_BASE}/api/notifications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const formatTime = (dt) => {
    if (!dt) return "";
    const diff = Date.now() - new Date(dt).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  // ✅ Portal modal — renders directly on document.body, escapes all stacking contexts
  const modal = open ? createPortal(
    <div
      style={{ position: "fixed", inset: 0, zIndex: 99999 }}
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      {/* Blur backdrop */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }} onClick={() => setOpen(false)} />

      {/* Panel — top right */}
      <div style={{
        position: "absolute",
        top: "72px",
        right: "24px",
        width: "min(420px, 90vw)",
        maxWidth: "calc(100vw - 48px)",
        maxHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to bottom, #1a1a1a, #111)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "24px",
        boxShadow: "0 25px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)",
        overflow: "hidden",
      }}>

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 20px 12px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          flexShrink: 0,
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: "#26F2D0",
                boxShadow: unread > 0 ? "0 0 8px #26F2D0" : "none",
              }} />
              <p style={{ color: "white", fontWeight: 700, fontSize: "18px", margin: 0 }}>
                Notifications
              </p>
            </div>
            <p style={{ color: "#6b7280", fontSize: "12px", margin: "4px 0 0 16px" }}>
              {notifications.length} total · {unread} unread
            </p>
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {notifications.some(n => !n.read) && (
              <button onClick={markAllRead} style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "6px 12px", fontSize: "12px", fontWeight: 600,
                background: "rgba(38,242,208,0.15)", color: "#26F2D0",
                border: "1px solid rgba(38,242,208,0.3)", borderRadius: "10px",
                cursor: "pointer", transition: "all 0.2s",
              }}>
                <Check size={12} /> Mark all read
              </button>
            )}
            <button onClick={() => setOpen(false)} style={{
              padding: "8px", background: "rgba(255,255,255,0.05)",
              border: "none", borderRadius: "10px", cursor: "pointer",
              color: "#9ca3af", display: "flex", alignItems: "center",
              transition: "all 0.2s",
            }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Notifications list */}
        <div style={{ overflowY: "auto", flex: 1 }}>
          {loading ? (
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", padding: "60px 0",
            }}>
              <div style={{
                width: "32px", height: "32px",
                border: "2px solid rgba(38,242,208,0.2)",
                borderTop: "2px solid #26F2D0",
                borderRadius: "50%", animation: "spin 0.8s linear infinite",
              }} />
              <p style={{ color: "#6b7280", fontSize: "13px", marginTop: "12px" }}>
                Loading...
              </p>
            </div>
          ) : notifications.length === 0 ? (
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", padding: "60px 24px", textAlign: "center",
            }}>
              <div style={{
                width: "64px", height: "64px", background: "rgba(255,255,255,0.05)",
                borderRadius: "16px", display: "flex", alignItems: "center",
                justifyContent: "center", marginBottom: "16px",
              }}>
                <Bell size={28} color="#4b5563" />
              </div>
              <p style={{ color: "white", fontWeight: 600, margin: "0 0 4px" }}>
                All caught up!
              </p>
              <p style={{ color: "#6b7280", fontSize: "13px", margin: 0 }}>
                No notifications yet.
              </p>
            </div>
          ) : (
            notifications.map((n, i) => (
              <div key={n.id} style={{
                display: "flex", alignItems: "flex-start", gap: "14px",
                padding: "12px 16px",
                borderBottom: i < notifications.length - 1
                  ? "1px solid rgba(255,255,255,0.05)" : "none",
                background: !n.read
                  ? "linear-gradient(to right, rgba(38,242,208,0.06), transparent)"
                  : "transparent",
                transition: "background 0.2s",
              }}>
                {/* dot */}
                <div style={{
                  width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0,
                  marginTop: "6px",
                  background: !n.read ? "#26F2D0" : "#374151",
                  boxShadow: !n.read ? "0 0 6px rgba(38,242,208,0.5)" : "none",
                }} />

                {/* message */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    color: !n.read ? "white" : "#d1d5db",
                    fontSize: "13px", lineHeight: "1.5",
                    fontWeight: !n.read ? 500 : 400,
                    margin: "0 0 6px",
                  }}>
                    {n.message}
                  </p>
                  <p style={{ color: "#4b5563", fontSize: "11px", margin: 0 }}>
                    {formatTime(n.createdAt)}
                  </p>
                </div>

                {/* delete */}
                <button onClick={() => deleteNotification(n.id)} style={{
                  flexShrink: 0, padding: "6px",
                  background: "transparent", border: "none",
                  color: "#4b5563", cursor: "pointer", borderRadius: "8px",
                  display: "flex", alignItems: "center",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#f87171";
                    e.currentTarget.style.background = "rgba(248,113,113,0.1)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "#4b5563";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div style={{
            padding: "12px 24px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            flexShrink: 0,
          }}>
            <button onClick={fetchNotifications} style={{
              width: "100%", padding: "8px", background: "transparent",
              border: "none", color: "#6b7280", fontSize: "12px",
              cursor: "pointer", borderRadius: "10px", transition: "all 0.2s",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.color = "#d1d5db";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#6b7280";
              }}
            >
              Refresh notifications
            </button>
          </div>
        )}
      </div>

      {/* CSS for spinner */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>,
    document.body
  ) : null;

  return (
    <>
      {/* Bell button */}
      <button
        ref={bellRef}
        onClick={handleOpen}
        className="relative w-9 h-9 flex items-center justify-center
                   rounded-xl bg-white/5 hover:bg-white/10
                   border border-white/10 transition-all hover:scale-105"
      >
        <Bell size={18} className="text-white" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#26F2D0] text-black
                           text-xs font-bold rounded-full flex items-center justify-center">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {/* Portal renders on document.body — above everything */}
      {modal}
    </>
  );
}