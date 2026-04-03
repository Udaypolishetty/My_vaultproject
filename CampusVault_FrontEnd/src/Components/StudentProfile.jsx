
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, FileText,Eye,EyeOff } from "lucide-react";

/* ─── Validators ───────────────────────────── */
function getRollError(roll) {
  if (!roll) return "";
  if (!/^[A-Z0-9]*$/.test(roll))          return "Capital letters and numbers only";
  if (roll.length >= 3 && roll[2] !== "C") return "3rd character must be 'C'  (e.g. 22C71A0577)";
  if (roll.length >= 4 && roll[3] !== "7") return "4th character must be '7'  (e.g. 22C71A0577)";
  return "";
}
function isValidRoll(roll) {
  return roll.length === 10 && /^[A-Z0-9]+$/.test(roll) && roll[2] === "C" && roll[3] === "7";
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}
function isValidLinkedIn(url) {
  return /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9\-_%]+\/?$/.test(url.trim());
}

const inputBase = (hasError, hasValue) => ({
  width: "100%", boxSizing: "border-box",
  padding: "12px 14px", borderRadius: 12, fontSize: 13,
  background: "rgba(255,255,255,0.04)", color: "white",
  outline: "none", fontFamily: "inherit",
  border: `1px solid ${hasError ? "rgba(239,68,68,0.5)" : hasValue ? "rgba(38,242,208,0.3)" : "rgba(255,255,255,0.09)"}`,
  transition: "border-color 0.2s",
});

function Field({ label, required, error, hint, children }) {
  return (
    <div>
      {label && (
        <p style={{ fontSize: 11, color: "#6b7280", fontWeight: 600,
          textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 6px" }}>
          {label}{required && <span style={{ color: "#f87171", marginLeft: 3 }}>✱</span>}
        </p>
      )}
      {children}
      {error ? (
        <p style={{ fontSize: 11, color: "#f87171", margin: "4px 0 0" }}>⚠ {error}</p>
      ) : hint ? (
        <p style={{ fontSize: 10, color: "#4b5563", margin: "3px 0 0" }}>{hint}</p>
      ) : null}
    </div>
  );
}

export default function StudentProfile() {
  const navigate = useNavigate();

  const [step,   setStep]   = useState(1);
  const [agreed, setAgreed] = useState(false);

  const [form, setForm] = useState({
    name: "", degree: "", roll: "", email: "",
    year: "", branch: "", password: "", confirm: "", linkedin: "",
  });
  const [errors,     setErrors]     = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPass,   setShowPass]   = useState(false);
  const [showConf,   setShowConf]   = useState(false);
  const [success,    setSuccess]    = useState(false);

  const is4thYear = form.year === "4th Year";

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: "" }));
  };

  const handleRoll = (e) => {
    const v = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
    setForm(f => ({ ...f, roll: v }));
    // setErrors(e => ({ ...e, roll: getRollError(v) }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())       e.name     = "Full name is required";
    if (!form.degree)            e.degree   = "Select your degree";
if (!form.roll)              e.roll     = "Roll number is required";
else if (!isValidRoll(form.roll)) e.roll = "Invalid roll number/college ID";
    if (!form.email)             e.email    = "Email is required";
    else if (!isValidEmail(form.email)) e.email = "Enter a valid email address";
    if (!form.year)              e.year     = "Select your year";
    if (!form.branch)            e.branch   = "Select your branch";
if (!form.password)          e.password = "Password is required";
else if (!isStrongPassword(form.password)) e.password = "Use 8+ chars, uppercase, lowercase, number, special char, no repeated chars";
    if (!form.confirm)           e.confirm  = "Please confirm your password";
    else if (form.confirm !== form.password) e.confirm = "Passwords do not match";
    if (is4thYear) {
      if (!form.linkedin.trim()) e.linkedin = "LinkedIn URL is required for 4th year students";
      else if (!isValidLinkedIn(form.linkedin)) e.linkedin = "Enter a valid URL: linkedin.com/in/yourname";
    } else if (form.linkedin.trim() && !isValidLinkedIn(form.linkedin)) {
      e.linkedin = "Enter a valid LinkedIn URL or leave it empty";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const isStrongPassword = (password) => {
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]/;'+=]/.test(password)) return false;
  if (/(.)\1/.test(password)) return false; // blocks aa, 11, @@
  return true;
};

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);

    try {
      // ✅ FIXED: correct URL /api/auth/register (was /auth/register before)
      const res = await fetch("http://localhost:8081/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:        form.name.trim(),
          degree:      form.degree,
          rollNumber:  form.roll,
          email:       form.email.trim(),
          year:        form.year,
          branch:      form.branch,
          password:    form.password,
          linkedinUrl: form.linkedin.trim() || "",
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        setErrors({
          api: msg.includes("already registered")
            ? "This roll number is already registered. Please login instead."
            : msg || "Registration failed. Please try again."
        });
        setSubmitting(false);
        return;
      }

      // ✅ FIXED: show success then redirect to LOGIN page (/)
      // Registration does NOT log you in — user must login with their new password
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);

    } catch {
      setErrors({ api: "Server not reachable. Please try again." });
      setSubmitting(false);
    }
  };

  /* ════ SUCCESS SCREEN ════ */
  if (success) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", background: "#000", padding: "24px 16px",
        fontFamily: "sans-serif",
      }}>
        <div style={{
          background: "#0f0f0f", border: "1px solid rgba(38,242,208,0.2)",
          borderRadius: 28, padding: "40px 32px", maxWidth: 360, width: "100%",
          textAlign: "center", boxShadow: "0 0 60px rgba(38,242,208,0.15)",
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%", margin: "0 auto 20px",
            background: "rgba(38,242,208,0.1)", border: "1px solid rgba(38,242,208,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28,
          }}>✓</div>
          <p style={{ color: "#26F2D0", fontWeight: 800, fontSize: 18, margin: "0 0 8px" }}>
            Registration Successful!
          </p>
          <p style={{ color: "#6b7280", fontSize: 13, margin: "0 0 4px" }}>
            Your account is ready.
          </p>
          {/* ✅ Remind user to login with their chosen password */}
          <p style={{ color: "#4b5563", fontSize: 11, margin: "8px 0 0",
            background: "rgba(255,255,255,0.04)", borderRadius: 8,
            padding: "8px 12px" }}>
            Use roll number + the password you just set to log in.
          </p>
          <p style={{ color: "#374151", fontSize: 11, margin: "12px 0 0" }}>
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  /* ════ STEP 1 — TERMS ════ */
  if (step === 1) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", padding: "24px 16px",
        background: "#000",
        backgroundImage: "linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.9)),url('/vault-bg.jpeg')",
        backgroundSize: "cover", backgroundPosition: "center",
        fontFamily: "sans-serif",
      }}>
        <div style={{
          background: "rgba(15,15,15,0.95)", border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 24, padding: "32px 28px", maxWidth: 440, width: "100%",
          boxShadow: "0 0 60px rgba(38,242,208,0.1)",
        }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>


<img
  src="/cv-logo.png"
  alt="Campus Vault logo"
  style={{
    width: 56,
    height: 56,
    objectFit: "contain",
    display: "block",
    margin: "0 auto 14px",
  }}
/>



            <h2 style={{ color: "white", fontWeight: 800, fontSize: 20, margin: "0 0 8px" }}>
              Welcome to Campus Vault
            </h2>
            <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>
              Read and agree before creating your profile
            </p>
          </div>





<div
  style={{
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 14,
    padding: "16px 18px",
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  }}
>
  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
    <span
      style={{
        flexShrink: 0,
        width: 18,
        height: 18,
        marginTop: 2,
        color: "#93c5fd",
      }}
    >
      <ShieldCheck size={18} />
    </span>
<p
  style={{
    margin: 0,
    fontSize: 13,
    lineHeight: 1.7,
    color: "#d1d5db",
  }}
>
  By creating an account, you agree to our{" "}
  <a
    href="/terms"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: "#93c5fd",
      textDecoration: "underline",
      textUnderlineOffset: "3px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "color 0.2s ease, text-decoration-color 0.2s ease",
    }}
    onMouseEnter={(e) => {
      e.target.style.color = "#bfdbfe";
    }}
    onMouseLeave={(e) => {
      e.target.style.color = "#93c5fd";
    }}
  >
    Terms of Service
  </a>{" "}
  and{" "}
  <a
    href="/privacy"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: "#93c5fd",
      textDecoration: "underline",
      textUnderlineOffset: "3px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "color 0.2s ease, text-decoration-color 0.2s ease",
    }}
    onMouseEnter={(e) => {
      e.target.style.color = "#bfdbfe";
    }}
    onMouseLeave={(e) => {
      e.target.style.color = "#93c5fd";
    }}
  >
    Privacy Policy
  </a>
  .
</p>
  </div>

  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
    <span
      style={{
        flexShrink: 0,
        width: 18,
        height: 18,
        marginTop: 2,
        color: "#fca5a5",
      }}
    >
      <FileText size={18} />
    </span>

    <p
      style={{
        margin: 0,
        fontSize: 12.5,
        lineHeight: 1.6,
        color: "#9ca3af",
      }}
    >
      Please read them carefully before registering.
    </p>
  </div>
</div>






          <label style={{ display: "flex", gap: 12, cursor: "pointer", marginBottom: 20 }}>
            <div onClick={() => setAgreed(a => !a)} style={{
              marginTop: 2, width: 20, height: 20, borderRadius: 6, flexShrink: 0,
              border: `2px solid ${agreed ? "#26F2D0" : "rgba(255,255,255,0.2)"}`,
              background: agreed ? "#26F2D0" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
            }}>
              {agreed && <span style={{ color: "black", fontSize: 11, fontWeight: 900 }}>✓</span>}
            </div>
<span
  style={{
    color: "#e5e7eb",
    fontSize: 13.5,
    lineHeight: 1.7,
    fontWeight: 500,
    letterSpacing: "0.01em",
    display: "block",
    maxWidth: 420,
  }}
>
  I have read and agree to the Campus Vault community guidelines and terms of use.
</span>
          </label>

          <button onClick={() => agreed && setStep(2)} disabled={!agreed}
            style={{
              width: "100%", padding: "13px", borderRadius: 14, border: "none",
              background: agreed ? "#26F2D0" : "rgba(38,242,208,0.1)",
              color: agreed ? "black" : "#4b5563",
              fontWeight: 800, fontSize: 14, cursor: agreed ? "pointer" : "not-allowed",
              transition: "all 0.2s",
              boxShadow: agreed ? "0 0 24px rgba(38,242,208,0.25)" : "none",
            }}>
            Continue to Registration →
          </button>

          <p style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "#444" }}>
            Already have an account?{" "}
            <Link to="/" style={{ color: "#26F2D0", textDecoration: "none", fontWeight: 700 }}>
              Log in →
            </Link>
          </p>
        </div>
      </div>
    );
  }

  /* ════ STEP 2 — FORM ════ */
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "flex-start",
      justifyContent: "center", padding: "24px 16px 48px",
      background: "#000",
      backgroundImage: "linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.9)),url('/vault-bg.jpeg')",
      backgroundSize: "cover", backgroundPosition: "center",
      fontFamily: "sans-serif",
    }}>
      <div style={{
        background: "rgba(15,15,15,0.95)", border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: 24, padding: "32px 28px", maxWidth: 440, width: "100%",
        marginTop: 12, boxShadow: "0 0 60px rgba(38,242,208,0.08)",
      }}>

        <button onClick={() => { setStep(1); setErrors({}); }}
          style={{ background: "none", border: "none", color: "#6b7280",
            fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 20,
            display: "flex", alignItems: "center", gap: 4 }}
          onMouseEnter={e => e.currentTarget.style.color = "white"}
          onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}>
          ← Back
        </button>

        <h2 style={{ color: "white", fontWeight: 800, fontSize: 20,
          textAlign: "center", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
          Create your Profile
        </h2>
        <p style={{ color: "#6b7280", fontSize: 12, textAlign: "center", margin: "0 0 24px" }}>
          These details appear when you post ideas or join clubs
        </p>

        {errors.api && (
          <div style={{
            background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: 10, padding: "10px 14px", marginBottom: 16,
            fontSize: 12, color: "#f87171",
          }}>
            ⚠ {errors.api}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Name */}
          <Field label="Full Name" required error={errors.name}>
            <input placeholder="Your full name" value={form.name}
              onChange={e => set("name", e.target.value)}
              style={inputBase(errors.name, form.name)}
              onFocus={e => e.target.style.borderColor = "rgba(38,242,208,0.5)"}
              onBlur={e  => e.target.style.borderColor = errors.name ? "rgba(239,68,68,0.5)" : form.name ? "rgba(38,242,208,0.3)" : "rgba(255,255,255,0.09)"} />
          </Field>

          {/* Degree */}
          <Field label="Degree" required error={errors.degree}>
            <select value={form.degree} onChange={e => set("degree", e.target.value)}
              style={{ ...inputBase(errors.degree, form.degree), cursor: "pointer",backgroundColor: "#0f0f0f", color: "#e5e7eb" }}>
              <option value="">Select Degree</option>
              <option value="B.Tech">B.Tech</option>
              <option value="Diploma">Diploma</option>
              <option value="MBA">MBA</option>
              <option value="M.Tech">M.Tech</option>
            </select>
          </Field>

          {/* Roll number */}
          {/* <Field label="Roll Number" required error={errors.roll}
            hint={!errors.roll && form.roll.length > 0 && form.roll.length < 10
              ? `${10 - form.roll.length} more character${10 - form.roll.length !== 1 ? "s" : ""} needed`
              : !errors.roll && form.roll.length === 10 ? "✓ Valid roll number" : ""}> */}
              <Field label="Roll Number" required error={errors.roll}>
            <div style={{ position: "relative" }}>
              <input placeholder="Enter valid rollno." value={form.roll}
                onChange={handleRoll} maxLength={10}
                style={{ ...inputBase(errors.roll, isValidRoll(form.roll)), paddingRight: 44, fontFamily: "monospace" }}
                onFocus={e => e.target.style.borderColor = "rgba(38,242,208,0.5)"}
                onBlur={e  => e.target.style.borderColor = errors.roll ? "rgba(239,68,68,0.5)" : isValidRoll(form.roll) ? "rgba(38,242,208,0.3)" : "rgba(255,255,255,0.09)"} />
              <span style={{
                position: "absolute", right: 12, top: "50%",
                transform: "translateY(-50%)", fontSize: 10, fontFamily: "monospace",
                color: isValidRoll(form.roll) ? "#26F2D0" : "#4b5563",
              }}>{form.roll.length}/10</span>
            </div>
          </Field>

          {/* Email */}
          <Field label="College Email" required error={errors.email}>
            <input type="email" placeholder="you@email.com" value={form.email}
              onChange={e => set("email", e.target.value)}
              onBlur={() => { if (form.email && !isValidEmail(form.email)) setErrors(e => ({ ...e, email: "Enter a valid email address" })); }}
              style={inputBase(errors.email, form.email)}
              onFocus={e => e.target.style.borderColor = "rgba(38,242,208,0.5)"} />
          </Field>

          {/* Year + Branch */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Year" required error={errors.year}>
              <select value={form.year} onChange={e => set("year", e.target.value)}
                style={{ ...inputBase(errors.year, form.year), cursor: "pointer",    backgroundColor: "#0f0f0f", color: "#e5e7eb" }}>
                <option value="">Year</option>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>
            </Field>
            <Field label="Branch" required error={errors.branch}>
              <select value={form.branch} onChange={e => set("branch", e.target.value)}
                style={{ ...inputBase(errors.branch, form.branch), cursor: "pointer",backgroundColor: "#0f0f0f", color: "#e5e7eb" }}>
                <option value="">Branch</option>
                <option value="CSE">CSE</option>
                <option value="CSE-AI">CSE (AI)</option>
                <option value="CSE-DS">CSE (DS)</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">Mechanical</option>
                <option value="CIVIL">Civil</option>
              </select>
            </Field>
          </div>

          {/* Password */}
<Field
  label="Password"
  required
  error={errors.password}
  hint={
    !errors.password
      ? "8+ chars, uppercase, lowercase, number, special character"
      : ""
  }
>
  <div style={{ position: "relative" }}>
    <input
      type={showPass ? "text" : "password"}
      placeholder="Create a strong password"
      value={form.password}
      onChange={e => set("password", e.target.value)}
      style={{
        ...inputBase(errors.password, isStrongPassword(form.password)),
        paddingRight: 40
      }}
      onFocus={e => e.target.style.borderColor = "rgba(38,242,208,0.5)"}
      onBlur={e => e.target.style.borderColor =
        errors.password
          ? "rgba(239,68,68,0.5)"
          : form.password && isStrongPassword(form.password)
          ? "rgba(38,242,208,0.3)"
          : "rgba(255,255,255,0.09)"
      }
    />
    <button
      type="button"
      tabIndex={-1}
      onClick={() => setShowPass(s => !s)}
      style={{
        position: "absolute",
        right: 12,
        top: "50%",
        transform: "translateY(-50%)",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 14,
        padding: 0,
        color: "#4b5563"
      }}
    >
      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
  </div>
</Field>

          {/* Confirm password */}
          <Field label="Confirm Password" required error={errors.confirm}>
            <div style={{ position: "relative" }}>
              <input type={showConf ? "text" : "password"}
                placeholder="Re-enter your password" value={form.confirm}
                onChange={e => set("confirm", e.target.value)}
                onBlur={() => { if (form.confirm && form.confirm !== form.password) setErrors(e => ({ ...e, confirm: "Passwords do not match" })); }}
                style={{ ...inputBase(errors.confirm, form.confirm && form.confirm === form.password), paddingRight: 40 }}
                onFocus={e => e.target.style.borderColor = "rgba(38,242,208,0.5)"} />
              <button type="button" tabIndex={-1} onClick={() => setShowConf(s => !s)}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", fontSize: 14, padding: 0, color: "#4b5563" }}>
                {showConf ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </Field>

          {/* LinkedIn */}
          <Field
            label={is4thYear ? "LinkedIn Profile URL" : "LinkedIn Profile URL (Optional)"}
            required={is4thYear} error={errors.linkedin}
            hint={!errors.linkedin ? (is4thYear ? "Required for 4th year — linkedin.com/in/yourname" : "Recommended — linkedin.com/in/yourname") : ""}>
            <input type="url" placeholder="https://linkedin.com/in/yourname"
              value={form.linkedin} onChange={e => set("linkedin", e.target.value)}
              onBlur={() => { if (form.linkedin.trim() && !isValidLinkedIn(form.linkedin)) setErrors(e => ({ ...e, linkedin: "Enter a valid LinkedIn URL" })); }}
              style={inputBase(errors.linkedin, form.linkedin && isValidLinkedIn(form.linkedin))}
              onFocus={e => e.target.style.borderColor = "rgba(38,242,208,0.5)"} />
          </Field>

          {/* Submit */}
          <button onClick={handleSubmit} disabled={submitting}
            style={{
              width: "100%", padding: "13px", borderRadius: 14, border: "none",
              background: submitting ? "rgba(38,242,208,0.1)" : "#26F2D0",
              color: submitting ? "#4b5563" : "black",
              fontWeight: 800, fontSize: 14,
              cursor: submitting ? "not-allowed" : "pointer",
              transition: "all 0.2s", marginTop: 4,
              boxShadow: submitting ? "none" : "0 0 24px rgba(38,242,208,0.2)",
            }}
            onMouseEnter={e => { if (!submitting) e.currentTarget.style.transform = "scale(1.01)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}>
            {submitting ? "Registering..." : "Create Profile →"}
          </button>

          <p style={{ textAlign: "center", fontSize: 12, color: "#444", margin: "4px 0 0" }}>
            Already registered?{" "}
            <Link to="/" style={{ color: "#26F2D0", fontWeight: 700, textDecoration: "none" }}>
              Log in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}