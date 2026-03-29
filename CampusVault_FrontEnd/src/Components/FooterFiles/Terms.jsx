import { useNavigate } from "react-router-dom";
import { FileText, UserCheck, AlertTriangle, Ban, Scale, ArrowLeft } from "lucide-react";

/* ─── shared sub-components ─── */
const Section = ({ icon: Icon, title, accent, children }) => (
  <div style={{
    background: "linear-gradient(160deg,rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.02) 100%)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16, padding: "24px 24px", marginBottom: 16,
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
        background: `${accent}18`, border: `1px solid ${accent}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={17} style={{ color: accent }} />
      </div>
      <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#f3f4f6", lineHeight: 1.3 }}>
        {title}
      </h2>
    </div>
    {children}
  </div>
);

const P = ({ children }) => (
  <p style={{ margin: "0 0 10px", fontSize: 13, color: "#6b7280", lineHeight: 1.75 }}>{children}</p>
);

const BulletList = ({ items }) => (
  <ul style={{ margin: "0 0 10px", paddingLeft: 18 }}>
    {items.map((item, i) => (
      <li key={i} style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.75, marginBottom: 4 }}>
        {item}
      </li>
    ))}
  </ul>
);

export default function Terms() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @media (max-width: 600px) {
          .terms-pad { padding: 24px 14px 60px !important; }
          .terms-header h1 { font-size: 22px !important; }
          .terms-header p  { font-size: 13px !important; }
        }
      `}</style>

      <div className="terms-pad" style={{
        minHeight: "100vh", background: "#0d0d0f",
        padding: "40px 20px 80px", fontFamily: "inherit",
      }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 12, color: "rgba(156,163,175,0.6)",
              background: "none", border: "none", cursor: "pointer",
              padding: 0, marginBottom: 32, transition: "color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#26F2D0"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(156,163,175,0.6)"}
          >
            <ArrowLeft size={14} /> Back
          </button>

          {/* Header */}
          <div className="terms-header" style={{ marginBottom: 36 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <FileText size={26} style={{ color: "#26F2D0", flexShrink: 0 }} />
              <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#f9fafb" }}>
                Terms of Service
              </h1>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.7, maxWidth: 600 }}>
              By using Campus Vault, you agree to these terms. They exist to keep the platform
              fair, safe, and functional for every student at Ellenki College.
            </p>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              marginTop: 12, padding: "4px 12px", borderRadius: 999,
              background: "rgba(38,242,208,0.08)", border: "1px solid rgba(38,242,208,0.2)",
              fontSize: 11, color: "#26F2D0",
            }}>
              Effective date · June 2025
            </div>
          </div>

          {/* 1 */}
          <Section icon={UserCheck} title="1 · Acceptance of Terms" accent="#26F2D0">
            <P>
              By accessing or using Campus Vault, you confirm that you are a currently enrolled
              student or faculty member at Ellenki College of Engineering and Technology, and that
              you agree to be bound by these Terms of Service and our Community Guidelines.
            </P>
            <P>If you do not agree to these terms, please do not use the platform.</P>
          </Section>

          {/* 2 */}
          <Section icon={FileText} title="2 · Your Account" accent="#a78bfa">
            <P>You are responsible for:</P>
            <BulletList items={[
              "Keeping your login credentials confidential and not sharing them with anyone.",
              "All activity that occurs under your account.",
              "Providing accurate information — your real name, roll number, and college email.",
              "Notifying us at polishettyuday75@gmail.com if you suspect unauthorised access.",
            ]} />
            <P>
              We reserve the right to suspend or terminate accounts that violate these terms
              or our Community Guidelines.
            </P>
          </Section>

          {/* 3 */}
          <Section icon={FileText} title="3 · Content You Post" accent="#f59e0b">
            <P>
              You retain ownership of content you submit to Campus Vault. By posting, you grant
              Campus Vault a non-exclusive, royalty-free licence to display and distribute your
              content within the platform for the purposes of operating the service.
            </P>
            <BulletList items={[
              "Do not post content that is plagiarised, defamatory, hateful, or illegal.",
              "Do not upload confidential exam materials or copyrighted content you do not own.",
              "You are solely responsible for the accuracy and legality of what you post.",
            ]} />
          </Section>

          {/* 4 */}
          <Section icon={Ban} title="4 · Prohibited Conduct" accent="#ef4444">
            <P>The following are strictly prohibited on Campus Vault:</P>
            <BulletList items={[
              "Creating fake accounts or impersonating any person.",
              "Attempting to hack, scrape, or reverse-engineer any part of the platform.",
              "Using the platform to distribute spam, malware, or phishing content.",
              "Manipulating votes, likes, or any engagement metric artificially.",
              "Harassing, threatening, or intimidating any other user.",
              "Sharing live exam papers or answers during an ongoing examination.",
            ]} />
          </Section>

          {/* 5 */}
          <Section icon={AlertTriangle} title="5 · Disclaimer of Warranties" accent="#f97316">
            <P>
              Campus Vault is provided on an "as is" basis. We are a student-built, non-commercial
              platform and do not guarantee uninterrupted availability, error-free operation, or the
              accuracy of user-submitted content.
            </P>
            <P>
              We are not responsible for academic decisions made based on resources shared on the
              platform. Always verify important academic information with your faculty or official
              college sources.
            </P>
          </Section>

          {/* 6 */}
          <Section icon={Scale} title="6 · Changes & Termination" accent="#22c55e">
            <P>
              We may update these Terms at any time. Continued use of the platform after changes
              are posted constitutes acceptance of the new terms. We will notify users of significant
              changes via a platform announcement.
            </P>
            <P>
              We reserve the right to suspend or permanently shut down the platform at any time
              without prior notice.
            </P>
          </Section>

          {/* Contact */}
          <div style={{
            borderRadius: 14, padding: "18px 22px",
            background: "rgba(38,242,208,0.04)",
            border: "1px solid rgba(38,242,208,0.12)",
          }}>
            <p style={{ margin: "0 0 5px", fontSize: 13, fontWeight: 700, color: "#26F2D0" }}>
              Questions?
            </p>
            <p style={{ margin: 0, fontSize: 12, color: "#6b7280", lineHeight: 1.7 }}>
              Contact us at{" "}
              <a href="mailto:polishettyuday75@gmail.com"
                style={{ color: "#26F2D0", textDecoration: "none" }}>
                polishettyuday75@gmail.com
              </a>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}