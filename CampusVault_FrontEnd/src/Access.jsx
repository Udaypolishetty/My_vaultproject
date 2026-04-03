
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Access() {
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRollChange = (e) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
    setRoll(val);
    if (error) setError(""); // Clear error on input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rollUp = roll.trim().toUpperCase();

    if (!rollUp || !password.trim()) {
      setError("Enter roll number and password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNumber: rollUp, password }),
      });

      // if (!res.ok) {
      //   const txt = await res.text();
      //   // Backend handles all validation - show generic error
      //   if (txt.toLowerCase().includes("not found") || txt.toLowerCase().includes("no student")) {
      //     setError("No account found. Please register first.");
      //   } else if (txt.toLowerCase().includes("bad credentials") || txt.toLowerCase().includes("password")) {
      //     setError("Incorrect password. Try again.");
      //   } else if (txt.toLowerCase().includes("invalid admin")) {
      //     setError("Invalid admin credentials.");
      //   } else {
      //     setError("Invalid roll number or password");
      //   }
      //   setLoading(false);
      //   return;
      // }

          if (!res.ok) {
      setError("Invalid roll number or password"); // ← ALWAYS this message
      setLoading(false);
      return;
    }

      const d = await res.json();

      sessionStorage.setItem("token", d.token);
      sessionStorage.setItem("role", d.role);
      sessionStorage.setItem("rollNumber", d.rollNumber);
      sessionStorage.setItem("name", d.name);
      sessionStorage.setItem("id", d.id);
      sessionStorage.setItem("Email", d.email || "");

      window.dispatchEvent(new Event("userLoggedIn"));

      if (d.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate(`/profile/${d.id}/home`);
      }
    } catch {
      setError("Server not reachable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", width: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "#000", position: "relative", overflow: "hidden",
      padding: "24px 16px", boxSizing: "border-box",
      fontFamily: "sans-serif",
    }}>

      {/* Background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/vault-bg.jpeg')",
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.3, pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 360 }}>
        <div style={{
          background: "#0f0f0f", border: "1px solid #222",
          borderRadius: 32, padding: "40px 32px",
          boxShadow: "0 20px 60px rgba(0,0,0,1)",
        }}>

          {/* Title */}
          <p style={{
            color: "white", textAlign: "center", fontSize: 11,
            fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase",
            margin: "0 0 32px",
          }}>
            CAMPUS VAULT
          </p>

          {/* Error */}
          {error && (
            <div style={{
              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: 10, padding: "10px 14px", marginBottom: 20, textAlign: "center",
            }}>
              <p style={{ color: "#f87171", fontSize: 11, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            {/* Roll number - NO HINTS */}
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="ROLL NUMBER"
                value={roll}
                onChange={handleRollChange}
                maxLength={10}
                autoFocus
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  background: "#1a1a1a",
                  border: "1px solid #333",
                  color: "white",
                  textAlign: "center",
                  padding: "14px 14px",
                  borderRadius: 12,
                  outline: "none",
                  fontSize: 13,
                  letterSpacing: "0.2em",
                  fontFamily: "monospace",
                }}
                onFocus={e => e.target.style.borderColor = "#555"}
                onBlur={e => e.target.style.borderColor = "#333"}
              />
            </div>

            {/* Password */}
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="PASSWORD"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: "100%", boxSizing: "border-box",
                  background: "#1a1a1a", border: "1px solid #333",
                  color: "white", textAlign: "center",
                  padding: "14px 44px 14px 14px",
                  borderRadius: 12, outline: "none",
                  fontSize: 13, letterSpacing: "0.15em",
                  fontFamily: "monospace",
                }}
                onFocus={e => e.target.style.borderColor = "#555"}
                onBlur={e => e.target.style.borderColor = "#333"}
              />
              <button 
                type="button" 
                tabIndex={-1} 
                onClick={() => setShowPass(s => !s)}
                style={{
                  position: "absolute", right: 12, top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none",
                  cursor: "pointer", color: "#555", 
                  padding: 0, display: "flex", alignItems: "center",
                  width: 20, height: 20,
                }}
              >
                {showPass ? <EyeOff size={16} strokeWidth={2.5} /> : <Eye size={16} strokeWidth={2.5} />}
              </button>
            </div>

            {/* Submit */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
              <button type="submit"
                disabled={loading || !roll.trim() || !password.trim()}
                style={{
                  width: 56, height: 56, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "none",
                  cursor: loading || !roll.trim() || !password.trim() ? "not-allowed" : "pointer",
                  background: loading || !roll.trim() || !password.trim() ? "#222" : "white",
                  color: loading || !roll.trim() || !password.trim() ? "#444" : "black",
                  fontSize: 22, transition: "all 0.2s",
                  boxShadow: !loading && roll.trim() && password.trim()
                    ? "0 0 20px rgba(255,255,255,0.2)" : "none",
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "scale(1.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                {loading
                  ? <div style={{ width: 20, height: 20, border: "2px solid #666",
                      borderTopColor: "transparent", borderRadius: "50%",
                      animation: "spin 0.8s linear infinite" }} />
                  : "→"
                }
              </button>
            </div>
          </form>

          {/* New user link */}
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <span style={{ color: "#444", fontSize: 12 }}>New to Campus Vault? </span>
            <Link to="/profile"
              style={{ color: "#26F2D0", fontSize: 12, fontWeight: 700, textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
              onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}>
              Register here →
            </Link>
          </div>

          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 6, marginTop: 28, opacity: 0.15,
          }}>
            <div style={{ height: 1, width: 32, background: "white" }} />
            <p style={{ color: "white", fontSize: 9, fontWeight: 900,
              letterSpacing: "0.4em", textTransform: "uppercase", margin: 0 }}>
              Secure
            </p>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}