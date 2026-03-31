import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Lightbulb, Users, BookOpen, Megaphone,
  Newspaper, LayoutDashboard, ShieldCheck, CheckCircle, XCircle,
} from "lucide-react";

/* ── Palette per section ── */
const TABS = [
  { key: "ideas",      label: "Ideas Hub",         icon: Lightbulb,       accent: "#f59e0b" },
  { key: "clubs",      label: "Clubs",              icon: Users,           accent: "#ec4899" },
  { key: "resources",  label: "Resources",          icon: BookOpen,        accent: "#a78bfa" },
  { key: "buzz",       label: "Campus Buzz",        icon: Megaphone,       accent: "#3b82f6" },
  { key: "news",       label: "Campus News",        icon: Newspaper,       accent: "#3b82f6" },
  { key: "dashboard",  label: "Dashboard",          icon: LayoutDashboard, accent: "#22c55e" },
  { key: "moderator",  label: "Moderator",          icon: ShieldCheck,     accent: "#f97316" },
];

/* ── Reusable sub-components ── */
const Rule = ({ index, title, desc, accent }) => (
  <div style={{
    display: "flex", gap: 14, marginBottom: 14,
    paddingBottom: 14,
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  }}>
    <span style={{
      flexShrink: 0, width: 26, height: 26, borderRadius: "50%",
      background: `${accent}18`, border: `1px solid ${accent}35`,
      color: accent, fontSize: 11, fontWeight: 800,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>{index}</span>
    <div>
      {title && <p style={{ margin: "0 0 3px", fontSize: 13, fontWeight: 700, color: "#e5e7eb" }}>{title}</p>}
      <p style={{ margin: 0, fontSize: 12, color: "#9ca3af", lineHeight: 1.65 }}>{desc}</p>
    </div>
  </div>
);

const SubSection = ({ title, accent, children }) => (
  <div style={{
    background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
    border: `1px solid ${accent}20`,
    borderLeft: `3px solid ${accent}`,
    borderRadius: "0 12px 12px 0",
    padding: "18px 20px",
    marginBottom: 16,
  }}>
    {title && (
      <p style={{ margin: "0 0 14px", fontSize: 12, fontWeight: 800,
        textTransform: "uppercase", letterSpacing: "0.08em", color: accent }}>
        {title}
      </p>
    )}
    {children}
  </div>
);

const Chip = ({ label, ok }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 8,
    padding: "6px 10px", borderRadius: 8, marginBottom: 7,
    background: ok ? "rgba(34,197,94,0.07)" : "rgba(239,68,68,0.07)",
    border: `1px solid ${ok ? "rgba(34,197,94,0.18)" : "rgba(239,68,68,0.18)"}`,
  }}>
    {ok
      ? <CheckCircle size={12} style={{ color: "#22c55e", flexShrink: 0 }} />
      : <XCircle    size={12} style={{ color: "#ef4444", flexShrink: 0 }} />
    }
    <span style={{ fontSize: 12, color: ok ? "#86efac" : "#fca5a5" }}>{label}</span>
  </div>
);

/* ══════════════════════════════════════════════════
   SECTION CONTENT COMPONENTS
══════════════════════════════════════════════════ */

const IdeasContent = () => {
  const a = "#f59e0b";
  return (
    <>
      <SubSection title="Posting Ideas" accent={a}>
        <Rule index="1" accent={a} title="Share Innovative Ideas"
          desc="Post ideas that genuinely benefit the campus community — whether academic, technical, cultural, or social. Describe your idea clearly with enough context for others to understand and engage." />
        <Rule index="2" accent={a} title="Daily Limit — 2 Ideas Per Day"
          desc="You can submit a maximum of 2 ideas per day. This keeps the feed meaningful and prevents spam. Think before you post — quality over quantity." />
        <Rule index="3" accent={a} title="No Spam or Irrelevant Posts"
          desc="Posting off-topic, repetitive, or low-effort ideas wastes everyone's time. Ideas should be genuinely useful or impactful for Ellenki College students." />
        <Rule index="4" accent={a} title="Edit Window — 1 Hour Only"
          desc="You can edit your idea within 1 hour of posting. After that it's locked. You can delete your own idea at any time before a moderator takes action." />
        <Rule index="5" accent={a} title="Idea Categories"
          desc="Tag your idea correctly: Socially Responsive, College Purpose, Tech, Cultural, or Other. Proper categorisation helps moderators and voters find the right ideas." />
        <Rule index="6" accent={a} title="Share Your Ideas"
          desc="Spread the word — each idea has a shareable link you can post on social platforms or send to classmates, HODs, or the placement team. The more visibility, the more likely it gets implemented." />
      </SubSection>

      <SubSection title="Idea Lifecycle" accent={a}>
        <Rule index="1" accent={a} title="Implemented ✅"
          desc="If your idea is approved and implemented, it moves to the Home Showcase page with a link or video proof added by the moderator so everyone can see the real-world impact." />
        <Rule index="2" accent={a} title="Rejected ❌"
          desc="Rejected ideas receive a rejection message explaining why. The post stays visible for 2–3 days before being permanently removed from the system." />
        <Rule index="3" accent={a} title="On Hold ⏸"
          desc="Ideas placed on hold are under consideration for a later review cycle. No action needed from your side — you'll be notified of any status change." />
        <Rule index="4" accent={a} title="Other Statuses"
          desc="Any other updates — requests for more info, clarifications, or changes — will appear in your Student Dashboard as notifications." />
      </SubSection>

      <SubSection title="Leaderboard & Recognition" accent={a}>
        <Rule index="1" accent={a} title="Climb the Leaderboard"
          desc="The more likes and constructive comments your idea receives, the higher it ranks on the leaderboard. Top ideas get priority review by moderators. Aim to be in the top positions — it matters." />
        <Rule index="2" accent={a} title="Implementation Proof"
          desc="When a moderator implements your idea, they attach a relevant link — a video, image, or document — so the whole campus community can see the real outcome of your contribution." />
      </SubSection>

      <SubSection title="Moderation & Admin" accent={a}>
        <Rule index="1" accent={a} title="Admin Has Full Access"
          desc="Admins can view, edit, or delete any idea. If your idea is found irrelevant, harmful, or misused, it will be removed without prior notice." />
        <Rule index="2" accent={a} title="Warning System"
          desc="Misuse of the ideas section — spamming, fake ideas, inappropriate content — will result in warnings assigned through the admin/moderator panel. Repeated violations lead to permanent removal from the platform." />
        <Rule index="3" accent={a} title="Moderator Role (CR/GR)"
          desc="Your class or general representative is the moderator. They are responsible for taking good ideas to professors, the principal, or the college president for actual implementation. Respect the process." />
        <Rule index="4" accent={a} title="Don't Overload the System"
          desc="Avoid making multiple rapid requests or bulk submissions. This slows the platform down for everyone. Use the platform responsibly." />
      </SubSection>

      <SubSection title="Read Before Posting" accent={a}>
        <Rule index="1" accent={a} title="Guidelines First"
          desc="Read all guidelines fully before posting your first idea. Ignorance of the rules is not an excuse for violations." />
        <Rule index="2" accent={a} title="Be Responsible"
          desc="Make the most of this platform. Your ideas have the potential to change something real on campus. Treat it with the seriousness it deserves." />
        <Rule index="3" accent={a} title="Contact for Queries"
          desc="Have a question or issue? Reach out via email, LinkedIn, or the contact section. We're here to help." />
      </SubSection>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 4 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>✓ Do</p>
          <Chip ok label="Post original, impactful ideas" />
          <Chip ok label="Max 2 ideas per day" />
          <Chip ok label="Edit within 1 hour" />
          <Chip ok label="Share ideas across campus" />
          <Chip ok label="Read guidelines before posting" />
        </div>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>✗ Don't</p>
          <Chip ok={false} label="Spam or post irrelevant content" />
          <Chip ok={false} label="Post more than 2 ideas/day" />
          <Chip ok={false} label="Misuse the platform" />
          <Chip ok={false} label="Make bulk rapid requests" />
          <Chip ok={false} label="Ignore warnings from admin" />
        </div>
      </div>
    </>
  );
};

const ClubsContent = () => {
  const a = "#ec4899";
  return (
    <>
      <SubSection title="Joining & Membership" accent={a}>
        <Rule index="1" accent={a} title="7+ Clubs Available"
          desc="Campus Vault currently hosts 7+ official clubs — all manually verified and added by us. These are beyond-classroom communities designed for real skill development." />
        <Rule index="2" accent={a} title="Join Maximum 2 Clubs"
          desc="You can be a member of at most 2 clubs simultaneously. Choose wisely based on your genuine interests — not just for a badge." />
        <Rule index="3" accent={a} title="2-Day Grace Period"
          desc="After requesting to join a club, you enter a 2-day grace period during which the admin or club president reviews and accepts or rejects your membership request." />
        <Rule index="4" accent={a} title="Rejection Policy"
          desc="If you seem disinterested, unresponsive, or unsuitable based on your profile or behaviour, the admin, president, or moderator can reject your membership." />
        <Rule index="5" accent={a} title="Leaving & Rejoin Cooldown"
          desc="You can leave a club at any time, but you cannot rejoin the same club for 24 hours after leaving. Think before you exit." />
        <Rule index="6" accent={a} title="Grace Period Timeout"
          desc="If your membership request times out (no one accepts or rejects within the grace period), contact us — we'll look into it and resolve it manually." />
      </SubSection>

      <SubSection title="Roles & Permissions" accent={a}>
        <Rule index="1" accent={a} title="Three Roles: Member, Vice President, President"
          desc="Every club member holds one of three roles. Members participate in activities. Vice Presidents assist in management. Presidents have elevated access and responsibilities." />
        <Rule index="2" accent={a} title="President Access"
          desc="The club president can access activities, club chats, notice boards, and can remove members. This power must be exercised fairly and transparently." />
        <Rule index="3" accent={a} title="Request for President / VP"
          desc="If no president or VP has been assigned, or if the current one is removed, you can submit a request to take on the role. The admin will review and assign it." />
        <Rule index="4" accent={a} title="No Dual Presidency"
          desc="You cannot be the president of two clubs at the same time. Focus and commitment to one club is required for the role." />
        <Rule index="5" accent={a} title="President's Responsibility"
          desc="Presidents must ensure inclusive participation — covering all branches and years, not just their own class. Favouritism is not tolerated. Membership can be expanded by requesting admin." />
      </SubSection>

      <SubSection title="Activities & Progress" accent={a}>
        <Rule index="1" accent={a} title="Activities Are Semester-Long Plans"
          desc="Each club runs structured activities that span a full semester (6 months). These are real initiatives — not showcase projects. Take them seriously." />
        <Rule index="2" accent={a} title="No Skipping or Overriding Tasks"
          desc="You cannot mark an activity as complete until it is genuinely finished. Activities are managed by the admin and president — no shortcuts." />
        <Rule index="3" accent={a} title="Additional Activities"
          desc="You or the president can request up to 3 additional activities beyond the original plan if needed. Submit the request through the club panel." />
        <Rule index="4" accent={a} title="Badges on Completion"
          desc="When activities are completed on time, you earn badges that appear on your profile and home page. These reflect real work — treat them as such." />
        <Rule index="5" accent={a} title="Irrelevant Activities"
          desc="If any activity seems off-topic or inappropriate for your club, notify us with the risk level. We'll review and update it accordingly." />
        <Rule index="6" accent={a} title="Sports Club Warning"
          desc="Be aware that the sports club may involve physical challenges and activities. Participate only if you're prepared for that level of commitment." />
      </SubSection>

      <SubSection title="Conduct & Chat" accent={a}>
        <Rule index="1" accent={a} title="No Chat Spam"
          desc="The club chat section is for meaningful communication — not spam, memes, or irrelevant content. You are an engineering student; behave like one." />
        <Rule index="2" accent={a} title="Permanent Ban for Misuse"
          desc="If you misuse club chat, the president or admin can remove you as a member. Repeated misuse results in a permanent ban from joining any club on the platform." />
        <Rule index="3" accent={a} title="Involve Subject Teachers"
          desc="Make your clubs visible to relevant subject teachers. Their guidance and support can significantly help in completing activities and making real-world impact." />
        <Rule index="4" accent={a} title="Admin Oversight"
          desc="Admin has full access to all club activities, chats, boards, and member management. Every action within a club is monitored. Use all features responsibly." />
      </SubSection>
    </>
  );
};

const ResourcesContent = () => {
  const a = "#a78bfa";
  return (
    <>
      <SubSection title="About Resources" accent={a}>
        <Rule index="1" accent={a} title="Ellenki College Specific Only"
          desc="All academic resources on Campus Vault are strictly specific to Ellenki College of Engineering. Resources from other colleges or generic JNTUH material are not the focus here." />
        <Rule index="2" accent={a} title="Campus-Friendly Content"
          desc="Every resource — previous year papers, notes, references — is curated to be directly relevant to our campus syllabus and exam patterns." />
        <Rule index="3" accent={a} title="Community-Sourced"
          desc="Papers and notes are collected from students and teachers. If you find anything inaccurate, outdated, or irrelevant, report it to us immediately." />
      </SubSection>

      <SubSection title="Accessing Resources" accent={a}>
        <Rule index="1" accent={a} title="View or Download Papers"
          desc="You can view previous year question papers directly in the browser or download them for offline use. Use them for genuine exam preparation." />
        <Rule index="2" accent={a} title="Notes — Interim Solution"
          desc="We are actively working on sourcing campus-specific notes. In the meantime, you can access notes through the JNTUH link we've already provided within the resources section." />
        <Rule index="3" accent={a} title="Find Something Useful? Share It"
          desc="If you find any relevant resources outside the platform that would benefit your peers, use the contact section to notify us. We'll review and add it." />
      </SubSection>

      <SubSection title="Contributing Resources" accent={a}>
        <Rule index="1" accent={a} title="Use the Contribute Section"
          desc="The Contribute section allows you to directly notify an admin or moderator about resources that are missing from the platform. This is the most direct way to improve the resource library." />
        <Rule index="2" accent={a} title="2-Contribution Limit"
          desc="You can use the Contribute section a maximum of 2 times. Make your submissions count — provide clear details about what you're contributing." />
        <Rule index="3" accent={a} title="Earn Badges for Contributing"
          desc="Students who successfully contribute verified resources earn platform badges. Your contribution is recognised and appreciated by the community." />
        <Rule index="4" accent={a} title="Moderator Handles Your Contribution"
          desc="Your contribution request goes directly to the moderator. They'll review it and contact you via the details you've provided to coordinate the upload." />
      </SubSection>

      <SubSection title="Feedback" accent={a}>
        <Rule index="1" accent={a} title="Suggest New Features"
          desc="If you think of a feature that would improve the Resources section, share it via the Feedback option in the About section of the navbar. We actively read and consider all suggestions." />
      </SubSection>
    </>
  );
};

const BuzzContent = () => {
  const a = "#386b11";
  return (
    <>
      <SubSection title="What is Campus Buzz?" accent={a}>
        <Rule index="1" accent={a} title="College-Wide Alert System"
          desc="Campus Buzz is a broadcast tool for the entire college. Post anything the campus community needs to know — lost items, found objects, announcements, records, keys, notices, and more." />
        <Rule index="2" accent={a} title="Community Response"
          desc="Every buzz post is visible to the relevant audience. Others can respond, react, or directly contact you through chat within the buzz thread." />
      </SubSection>

      <SubSection title="Using Buzz" accent={a}>
        <Rule index="1" accent={a} title="Post Limits & Auto-Deletion"
          desc="Buzz posts are automatically deleted after 2 days to keep the feed fresh and relevant. Be aware of this before relying on a post long-term." />
        <Rule index="2" accent={a} title="Control Your Audience"
          desc="When posting a buzz, you can choose who sees it — the whole campus, specific year groups, or specific branches. Use this wisely to target the right audience." />
        <Rule index="3" accent={a} title="Hot Section"
          desc="Posts with the most likes rise to the Hot section and stay pinned at the top. Genuinely useful or important buzz naturally gets visibility." />
        <Rule index="4" accent={a} title="Direct Contact via Buzz"
          desc="If you want to respond to someone's buzz privately, you can initiate a direct chat or contact from within the buzz post. No need to go elsewhere." />
      </SubSection>

      <SubSection title="Future Improvements" accent={a}>
        <Rule index="1" accent={a} title="Real-Time Notifications — Coming Soon"
          desc="We are working on real-time push notifications so you get alerted the moment someone responds to your buzz. Your usage and support helps us prioritise this feature." />
        <Rule index="2" accent={a} title="Email & SMS Alerts"
          desc="Real-time email and mobile message alerts are in development. The more active and responsible the community, the faster we can roll these out." />
        <Rule index="3" accent={a} title="Admin Oversight"
          desc="Admin has full access to all buzz posts. Misuse — including spamming, fake lost/found posts, or inappropriate content — will result in immediate removal and warnings." />
      </SubSection>
    </>
  );
};

const NewsContent = () => {
  const a = "#3b82f6";
  return (
    <>
      <SubSection title="About Campus News" accent={a}>
        <Rule index="1" accent={a} title="College-Specific Content Only"
          desc="Campus News is strictly for Ellenki College-related updates — events, announcements, achievements, college-level news. No outside or irrelevant content." />
        <Rule index="2" accent={a} title="Posted by Admin & Moderators Only"
          desc="Only admins and verified moderators (CR/GR) have the ability to create and publish news posts. This ensures the accuracy and authenticity of all news on the platform." />
        <Rule index="3" accent={a} title="Moderators Manage News Directly"
          desc="Moderators can post and manage news directly from their special dashboard. Once published, news is visible to all students immediately." />
      </SubSection>

      <SubSection title="Want to Submit News?" accent={a}>
        <Rule index="1" accent={a} title="Contact Us or the Moderator"
          desc="If you have a news item you'd like published — an upcoming event, achievement, or campus update — reach out to us or your class moderator. They can upload it to the system directly once verified." />
      </SubSection>
    </>
  );
};

const DashboardContent = () => {
  const a = "#22c55e";
  return (
    <>
      <SubSection title="Your Student Dashboard" accent={a}>
        <Rule index="1" accent={a} title="All Your Details in One Place"
          desc="Your dashboard is your personal hub — it shows your profile information, your submitted ideas, club memberships, activity progress, badges, and all notifications in one unified view." />
        <Rule index="2" accent={a} title="Manage Activity & Notifications"
          desc="Use your dashboard to track the status of your ideas (implemented, rejected, on hold), monitor club activities, check badge progress, and review any warnings or messages from moderators." />
        <Rule index="3" accent={a} title="Report Mismatches"
          desc="If you notice any incorrect information, missing data, or discrepancies in your dashboard — contact us immediately with the details. We'll investigate and correct it." />
      </SubSection>
    </>
  );
};

const ModeratorContent = () => {
  const a = "#f97316";
  return (
    <>
      <SubSection title="Moderator Powers" accent={a}>
        <Rule index="1" accent={a} title="Full Ideas Management"
          desc="Moderators can view, edit, delete, reject, put on hold, or mark ideas as implemented directly from the Ideas Board. With this power comes full responsibility." />
        <Rule index="2" accent={a} title="Implement Ideas Responsibly"
          desc="Do not implement an idea unless it has genuinely received enough community support and has been approved through the proper process. Quality over speed." />
        <Rule index="3" accent={a} title="Do NOT Delete Good Ideas"
          desc="Never delete ideas that are under review, positively received, or already implemented without first addressing it with the admin. Unauthorised deletion is a serious violation." />
        <Rule index="4" accent={a} title="Resource Contribution Handler"
          desc="You receive resource contribution messages from students. It is your responsibility to follow up, review the contribution, and coordinate the upload using your contact details." />
      </SubSection>

      <SubSection title="Moderator Dashboard" accent={a}>
        <Rule index="1" accent={a} title="Your Special Dashboard Features"
          desc="Your moderator dashboard gives you exclusive access to: (1) Upload Campus News, (2) Assign Warnings to students, (3) Manage all Ideas, (4) Submit Class Proposal Ideas — which are directly notified to admin as high-priority proposals." />
        <Rule index="2" accent={a} title="Class Proposal Ideas"
          desc="When you submit a class proposal idea, it bypasses the standard queue and is immediately flagged to the admin. Use this only for genuinely significant, class-supported ideas." />
        <Rule index="3" accent={a} title="Warning Assignment"
          desc="You can assign warnings to students who misuse the platform. Warnings are tracked by admin. Do not issue warnings arbitrarily — they must be justified and documented." />
      </SubSection>

      <SubSection title="Conduct & Accountability" accent={a}>
        <Rule index="1" accent={a} title="You Are Also Managed by Admin"
          desc="Moderator access is a privilege, not a right. Admin has full visibility over your actions and can revoke your moderator status at any time if misuse is detected." />
        <Rule index="2" accent={a} title="Revoke Option"
          desc="Admin holds the revoke option and can remove your moderator role instantly. Act with integrity at all times — even when no one seems to be watching." />
        <Rule index="3" accent={a} title="Use the System Even on Off-Days"
          desc="Be cautious and responsible even on days when admin or team is not actively monitoring. The system logs all actions." />
        <Rule index="4" accent={a} title="Request Improvements"
          desc="If you need additional access, find a bug, or have suggestions for improving the moderator experience, contact us directly. We prioritise moderator feedback." />
      </SubSection>
    </>
  );
};

const CONTENT_MAP = {
  ideas:     <IdeasContent />,
  clubs:     <ClubsContent />,
  resources: <ResourcesContent />,
  buzz:      <BuzzContent />,
  news:      <NewsContent />,
  dashboard: <DashboardContent />,
  moderator: <ModeratorContent />,
};

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */
export default function CommunityGuidelines() {
  const navigate   = useNavigate();
  const [active, setActive] = useState("ideas");

  const tab = TABS.find(t => t.key === active);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d0f",
      fontFamily: "inherit",
      paddingBottom: 60,
    }}>
      {/* ── Top bar ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(13,13,15,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "14px 20px",
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <button onClick={() => navigate(-1)} style={{
              display: "flex", alignItems: "center", gap: 5,
              fontSize: 12, color: "rgba(156,163,175,0.6)",
              background: "none", border: "none", cursor: "pointer", padding: 0,
              transition: "color 0.2s", flexShrink: 0,
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#26F2D0"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(156,163,175,0.6)"}
            >
              <ArrowLeft size={14} /> Back
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ShieldCheck size={18} style={{ color: "#26F2D0" }} />
              <span style={{ fontSize: 15, fontWeight: 800, color: "#f9fafb" }}>
                Community Guidelines
              </span>
            </div>
            <div style={{
              marginLeft: "auto",
              padding: "3px 10px", borderRadius: 999,
              background: "rgba(38,242,208,0.08)", border: "1px solid rgba(38,242,208,0.18)",
              fontSize: 10, color: "#26F2D0", whiteSpace: "nowrap",
            }}>
              June 2025
            </div>
          </div>

          {/* ── Tab strip — horizontally scrollable on mobile ── */}
          <div style={{
            display: "flex", gap: 6,
            overflowX: "auto", paddingBottom: 2,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}>
            {TABS.map(t => {
              const Icon    = t.icon;
              const isCurrent = active === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "7px 14px", borderRadius: 999,
                    border: isCurrent ? `1px solid ${t.accent}50` : "1px solid rgba(255,255,255,0.08)",
                    background: isCurrent ? `${t.accent}15` : "rgba(255,255,255,0.03)",
                    color: isCurrent ? t.accent : "rgba(156,163,175,0.55)",
                    fontSize: 12, fontWeight: isCurrent ? 700 : 500,
                    cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
                    transition: "all 0.2s",
                    boxShadow: isCurrent ? `0 0 12px ${t.accent}20` : "none",
                  }}
                >
                  <Icon size={13} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "28px 16px 0" }}>

        {/* Section header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          marginBottom: 24, paddingBottom: 18,
          borderBottom: `1px solid ${tab.accent}20`,
        }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12, flexShrink: 0,
            background: `${tab.accent}15`, border: `1px solid ${tab.accent}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <tab.icon size={20} style={{ color: tab.accent }} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#f9fafb" }}>
              {tab.label}
            </h1>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "#4b5563" }}>
              Read all rules before using this section of Campus Vault.
            </p>
          </div>
        </div>

        {/* Animated content swap */}
        <div key={active}>
          {CONTENT_MAP[active]}
        </div>

        {/* Bottom contact nudge */}
        <div style={{
          marginTop: 28, borderRadius: 14, padding: "16px 20px",
          background: "rgba(38,242,208,0.04)",
          border: "1px solid rgba(38,242,208,0.12)",
          display: "flex", flexWrap: "wrap", alignItems: "center",
          justifyContent: "space-between", gap: 10,
        }}>
          <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>
            Questions, violations, or feedback?
          </p>
          <a href="mailto:polishettyuday75@gmail.com" style={{
            fontSize: 12, color: "#26F2D0", textDecoration: "none", fontWeight: 600,
          }}>
            polishettyuday75@gmail.com →
          </a>
        </div>
      </div>

      {/* hide scrollbar on tab strip */}
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}