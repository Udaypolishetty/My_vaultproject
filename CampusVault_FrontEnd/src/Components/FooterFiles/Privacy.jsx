import { useNavigate } from "react-router-dom";
import { Lock, Database, Eye, Share2, UserCheck, Mail, ArrowLeft } from "lucide-react";

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

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @media (max-width: 600px) {
          .priv-pad { padding: 24px 14px 60px !important; }
          .priv-header h1 { font-size: 22px !important; }
          .priv-header p  { font-size: 13px !important; }
        }
      `}</style>

      <div className="priv-pad" style={{
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
          <div className="priv-header" style={{ marginBottom: 36 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <Lock size={26} style={{ color: "#26F2D0", flexShrink: 0 }} />
              <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#f9fafb" }}>
                Privacy Policy
              </h1>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.7, maxWidth: 600 }}>
              We value your privacy. This policy explains what data Campus Vault collects,
              how it is used, and the choices you have over your information.
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
          <Section icon={UserCheck} title="1 · Who We Are" accent="#26F2D0">
            <P>
              As students of Ellenki College of Engineering and Technology, Hyderabad, we built
              Campus Vault out of deep gratitude for our college life. This is a non-commercial,
              internal academic platform covering resources, ideas, clubs, and campus news —
              built to strengthen collaboration within our community.
            </P>
            <P>
              For any privacy-related concerns, contact us at{" "}
              <a href="mailto:polishettyuday75@gmail.com"
                style={{ color: "#26F2D0", textDecoration: "none" }}>
                polishettyuday75@gmail.com
              </a>.
            </P>
          </Section>

          {/* 2 */}
          <Section icon={Database} title="2 · Information We Collect" accent="#a78bfa">
            <P>We collect only what is necessary to operate the platform:</P>
            <BulletList items={[
              "Account information — your name, roll number, branch, year, and email address.",
              "Content you create — ideas, resources, comments, and likes.",
              "Usage data — pages visited and features used (anonymous, aggregated).",
              "Device & browser info — browser type, OS, and IP address for security purposes.",
            ]} />
            <P>
              We do not collect payment information, government IDs, or any sensitive personal data.
            </P>
          </Section>

          {/* 3 */}
          <Section icon={Eye} title="3 · How We Use Your Information" accent="#f59e0b">
            <P>Your information is used exclusively to:</P>
            <BulletList items={[
              "Operate and personalise your Campus Vault experience.",
              "Display your submitted ideas and resources to other students.",
              "Send important platform notifications — moderation actions, idea status updates.",
              "Detect and prevent abuse, spam, or fraudulent activity.",
              "Improve the platform based on aggregated, anonymous usage patterns.",
            ]} />
            <P>
              We do <strong style={{ color: "#f3f4f6" }}>not</strong> use your data for advertising,
              sell it to third parties, or share it with any commercial entity.
            </P>
          </Section>

          {/* 4 */}
          <Section icon={Share2} title="4 · Information Sharing" accent="#ec4899">
            <P>
              Campus Vault does not sell, rent, or trade your personal information.
              Your data may be shared only in these limited circumstances:
            </P>
            <BulletList items={[
              "With college moderators or administrators — when investigating a reported violation.",
              "With infrastructure providers — hosting and database services under strict confidentiality.",
              "When required by law — if we receive a valid legal request.",
            ]} />
            <P>
              Content you make public (ideas, posts, showcase entries) is visible to all
              registered Campus Vault users.
            </P>
          </Section>

          {/* 5 */}
          <Section icon={Database} title="5 · Data Retention & Deletion" accent="#22c55e">
            <P>
              Your account and associated content are retained for as long as your account is active.
              To delete your account and all associated data, contact us at{" "}
              <a href="mailto:polishettyuday75@gmail.com"
                style={{ color: "#26F2D0", textDecoration: "none" }}>
                polishettyuday75@gmail.com
              </a>{" "}
              — we will process your request within 7 working days.
            </P>
            <BulletList items={[
              "Deleted accounts — all personally identifiable information is permanently removed.",
              "Submitted ideas & resources — may be retained in anonymised form if implemented or upvoted.",
              "Server logs — automatically purged after 30 days.",
            ]} />
          </Section>

          {/* 6 */}
          <Section icon={UserCheck} title="6 · Your Rights" accent="#06b6d4">
            <P>You have the right to:</P>
            <BulletList items={[
              "Access the personal data we hold about you.",
              "Correct inaccurate information in your profile.",
              "Request deletion of your account and personal data.",
              "Opt out of non-essential platform notifications.",
              "Know how your data is being used at any time.",
            ]} />
            <P>
              To exercise any of these rights, email{" "}
              <a href="mailto:polishettyuday75@gmail.com"
                style={{ color: "#26F2D0", textDecoration: "none" }}>
                polishettyuday75@gmail.com
              </a>.
            </P>
          </Section>

          {/* 7 */}
          <Section icon={Lock} title="7 · Security" accent="#f97316">
            <P>
              We take reasonable technical measures to protect your data — including encrypted
              data transmission (HTTPS), hashed passwords, and access-controlled databases.
              No system is completely secure. Please use a strong, unique password and never
              share your credentials.
            </P>
          </Section>

          {/* 8 */}
          <Section icon={Mail} title="8 · Changes to This Policy" accent="#8b5cf6">
            <P>
              We may update this Privacy Policy occasionally. When we do, we will update the
              effective date above and — for significant changes — notify users via a platform
              announcement. Continued use of Campus Vault after changes constitutes acceptance
              of the updated policy.
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