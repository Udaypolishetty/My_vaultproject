// import { useNavigate } from "react-router-dom";
// import { Mail, Linkedin, Github, MapPin, ArrowLeft, Cpu, Users, BookOpen, Lightbulb } from "lucide-react";

// const FeatureCard = ({ icon: Icon, title, desc, accent }) => (
//   <div style={{
//     background: "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
//     border: "1px solid rgba(255,255,255,0.08)",
//     borderRadius: 14,
//     padding: "20px 22px",
//     display: "flex", gap: 14, alignItems: "flex-start",
//   }}>
//     <div style={{
//       width: 36, height: 36, borderRadius: 10, flexShrink: 0,
//       background: `${accent}18`, border: `1px solid ${accent}30`,
//       display: "flex", alignItems: "center", justifyContent: "center",
//     }}>
//       <Icon size={16} style={{ color: accent }} />
//     </div>
//     <div>
//       <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 700, color: "#e5e7eb" }}>{title}</p>
//       <p style={{ margin: 0, fontSize: 12, color: "#6b7280", lineHeight: 1.6 }}>{desc}</p>
//     </div>
//   </div>
// );

// const ContactCard = ({ icon: Icon, label, value, href, accent }) => (
//   <a
//     href={href}
//     target={href.startsWith("http") ? "_blank" : undefined}
//     rel="noopener noreferrer"
//     style={{
//       display: "flex", alignItems: "center", gap: 14,
//       padding: "18px 22px", borderRadius: 14, textDecoration: "none",
//       background: "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
//       border: "1px solid rgba(255,255,255,0.08)",
//       transition: "border-color 0.2s, background 0.2s",
//     }}
//     onMouseEnter={e => {
//       e.currentTarget.style.borderColor = `${accent}40`;
//       e.currentTarget.style.background = `${accent}08`;
//     }}
//     onMouseLeave={e => {
//       e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
//       e.currentTarget.style.background = "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)";
//     }}
//   >
//     <div style={{
//       width: 40, height: 40, borderRadius: 12, flexShrink: 0,
//       background: `${accent}15`, border: `1px solid ${accent}25`,
//       display: "flex", alignItems: "center", justifyContent: "center",
//     }}>
//       <Icon size={18} style={{ color: accent }} />
//     </div>
//     <div>
//       <p style={{ margin: "0 0 2px", fontSize: 11, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 600 }}>{label}</p>
//       <p style={{ margin: 0, fontSize: 13, color: "#e5e7eb", fontWeight: 500 }}>{value}</p>
//     </div>
//   </a>
// );

// export default function Contact() {
//   const navigate = useNavigate();
//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "#0d0d0f",
//       padding: "40px 20px 80px",
//       fontFamily: "inherit",
//     }}>
//       <div style={{ maxWidth: 780, margin: "0 auto" }}>

//         {/* Back */}
//         <button onClick={() => navigate(-1)} style={{
//           display: "inline-flex", alignItems: "center", gap: 6,
//           fontSize: 12, color: "rgba(156,163,175,0.6)",
//           background: "none", border: "none", cursor: "pointer", padding: 0,
//           marginBottom: 36, transition: "color 0.2s",
//         }}
//           onMouseEnter={e => e.currentTarget.style.color = "#26F2D0"}
//           onMouseLeave={e => e.currentTarget.style.color = "rgba(156,163,175,0.6)"}
//         >
//           <ArrowLeft size={14} /> Back
//         </button>

//         {/* Hero */}
//         <div style={{
//           borderRadius: 20, padding: "40px 36px", marginBottom: 28,
//           background: "linear-gradient(135deg, rgba(38,242,208,0.08) 0%, rgba(8,145,178,0.04) 100%)",
//           border: "1px solid rgba(38,242,208,0.15)",
//           position: "relative", overflow: "hidden",
//         }}>
//           {/* decorative glow */}
//           <div style={{
//             position: "absolute", top: -60, right: -60,
//             width: 200, height: 200, borderRadius: "50%",
//             background: "rgba(38,242,208,0.06)",
//             filter: "blur(40px)", pointerEvents: "none",
//           }} />

//           <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
//             <span style={{
//               fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
//               textTransform: "uppercase", color: "#26F2D0",
//               padding: "3px 10px", borderRadius: 999,
//               background: "rgba(38,242,208,0.1)", border: "1px solid rgba(38,242,208,0.2)",
//             }}>
//               Built by Students
//             </span>
//           </div>

//           <h1 style={{ margin: "0 0 12px", fontSize: 30, fontWeight: 900, color: "#f9fafb", letterSpacing: "-0.02em" }}>
//             About Campus Vault
//           </h1>
//           <p style={{ margin: "0 0 10px", fontSize: 14, color: "#9ca3af", lineHeight: 1.75, maxWidth: 580 }}>
//             Campus Vault is a centralized digital platform built to simplify access to academic resources
//             and strengthen collaboration within Ellenki College of Engineering. Every feature is designed
//             with one goal in mind — making academic life more organised and connected.
//           </p>
//           <p style={{
//             margin: 0, fontSize: 13, fontStyle: "italic",
//             color: "rgba(38,242,208,0.7)", fontWeight: 500,
//           }}>
//             "Built by students, for students — making academic life organized."
//           </p>
//         </div>

//         {/* What Vault offers */}
//         <div style={{ marginBottom: 28 }}>
//           <p style={{ margin: "0 0 16px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4b5563" }}>
//             What Campus Vault Offers
//           </p>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//             <FeatureCard
//               icon={BookOpen} accent="#a78bfa"
//               title="Previous Year Papers"
//               desc="Access PYQs and shared academic notes organised by branch, year, and subject."
//             />
//             <FeatureCard
//               icon={Lightbulb} accent="#f59e0b"
//               title="Idea Exchange Hub"
//               desc="Submit, upvote, and implement student ideas that improve campus life."
//             />
//             <FeatureCard
//               icon={Users} accent="#ec4899"
//               title="Building Community"
//               desc="Clubs, events, and beyond-classroom initiatives all in one place."
//             />
//             <FeatureCard
//               icon={Cpu} accent="#26F2D0"
//               title="Beyond Classroom Support"
//               desc="Resources, tools, and guidance that go beyond the standard curriculum."
//             />
//           </div>
//         </div>

//         {/* Contact */}
//         <div style={{ marginBottom: 28 }}>
//           <p style={{ margin: "0 0 16px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4b5563" }}>
//             Get In Touch
//           </p>
//           <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//             <ContactCard
//               icon={Mail}
//               accent="#26F2D0"
//               label="Email"
//               value="polishettyuday75@gmail.com"
//               href="mailto:polishettyuday75@gmail.com"
//             />
//             <ContactCard
//               icon={Linkedin}
//               accent="#0ea5e9"
//               label="LinkedIn"
//               value="Uday Polishetty"
//               href="https://www.linkedin.com/in/uday-polishetty-bb7026261"
//             />
//             <ContactCard
//               icon={MapPin}
//               accent="#f97316"
//               label="College"
//               value="Ellenki College of Engineering and Technology, Hyderabad"
//               href="https://maps.google.com/?q=Ellenki+College+of+Engineering+Hyderabad"
//             />
//           </div>
//         </div>

//         {/* Version tag */}
//         <div style={{
//           textAlign: "center", padding: "20px",
//           borderRadius: 14,
//           background: "rgba(255,255,255,0.02)",
//           border: "1px solid rgba(255,255,255,0.05)",
//         }}>
//           <p style={{ margin: "0 0 4px", fontSize: 12, color: "#374151", fontFamily: "monospace", letterSpacing: "0.1em" }}>
//             CAMPUS VAULT · v2.0
//           </p>
//           <p style={{ margin: 0, fontSize: 11, color: "#1f2937" }}>
//             Ellenki College of Engineering · © {new Date().getFullYear()}
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }




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