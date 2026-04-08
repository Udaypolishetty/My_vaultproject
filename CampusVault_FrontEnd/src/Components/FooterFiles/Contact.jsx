

import { useNavigate } from "react-router-dom";
import { Mail, Linkedin, MapPin, ArrowLeft } from "lucide-react";

const ContactCard = ({ icon: Icon, label, value, href, accent }) => (
  <a
    href={href}
    target={href?.startsWith("http") ? "_blank" : undefined}
    rel="noopener noreferrer"
    style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "18px 22px",
      borderRadius: 14,
      textDecoration: "none",
      background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
      border: "1px solid rgba(255,255,255,0.08)",
      transition: "0.2s",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = `${accent}40`;
      e.currentTarget.style.background = `${accent}08`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      e.currentTarget.style.background = "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))";
    }}
  >
    <div style={{
      width: 40,
      height: 40,
      borderRadius: 12,
      background: `${accent}15`,
      border: `1px solid ${accent}25`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <Icon size={18} style={{ color: accent }} />
    </div>

    <div>
      <p style={{
        margin: "0 0 2px",
        fontSize: 11,
        color: "#4b5563",
        textTransform: "uppercase",
        letterSpacing: "0.07em",
        fontWeight: 600
      }}>
        {label}
      </p>
      <p style={{ margin: 0, fontSize: 13, color: "#e5e7eb", fontWeight: 500 }}>
        {value}
      </p>
    </div>
  </a>
);

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d0f",
      padding: "40px 20px",
    }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            color: "rgba(156,163,175,0.6)",
            background: "none",
            border: "none",
            cursor: "pointer",
            marginBottom: 30
          }}
        >
          <ArrowLeft size={14} /> Back
        </button>

        {/* Heading */}
        <h1 style={{
          fontSize: 28,
          fontWeight: 900,
          color: "#f9fafb",
          marginBottom: 6
        }}>
          Get In Touch
        </h1>

        <p style={{
          fontSize: 13,
          color: "#6b7280",
          marginBottom: 24
        }}>
          Reach out for queries, collaborations, or feedback.
        </p>

        {/* Contact Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

          <ContactCard
            icon={Mail}
            accent="#26F2D0"
            label="Email"
            value="polishettyuday75@gmail.com"
            href="mailto:polishettyuday75@gmail.com"
          />

          <ContactCard
            icon={Mail}
            accent="#22c55e"
            label=" Email"
            value="vmaruthi2004@gmail.com"
            href="mailto:vmaruthi2004@gmail.com"
          />

          <ContactCard
            icon={Linkedin}
            accent="#0ea5e9"
            label="LinkedIn"
            value="Uday Polishetty"
            href="https://www.linkedin.com/in/uday-polishetty-bb7026261"
          />

          <ContactCard
            icon={Linkedin}
            accent="#0ea5e9"
            label="LinkedIn"
            value="Maruthi Vemula"
            href="https://www.linkedin.com/in/vemulamaruthi/"
          />

          <ContactCard
            icon={MapPin}
            accent="#f97316"
            label="College"
            value="Ellenki College of Engineering and Technology, Hyderabad"
            href="https://maps.google.com/?q=Ellenki+College+of+Engineering+Hyderabad"
          />

        </div>

      </div>
    </div>
  );
}