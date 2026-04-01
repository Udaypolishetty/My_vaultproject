import { useState } from "react";
import {
  ExternalLink, Lightbulb, Code2, Trophy, Cpu,
  FlaskConical, BookOpen, Zap, Brain, Calculator,
  BarChart2, FileText, Palette, Search, ChevronDown
} from "lucide-react";
import wolfram from "../assets/logos/wolfram.png";
import julius from "../assets/logos/julius.png";
import napkin from "../assets/logos/napkin.png";
import perplexity from "../assets/logos/perplexity.png";
import notebook from "../assets/logos/notebook.png";
import gamma from "../assets/logos/gamma.png";
import overleaf from "../assets/logos/overleaf.png";
import symbolab from "../assets/logos/symbolab.png";
import claude from "../assets/logos/Claude.png";
import canva from "../assets/logos/canva.png";
/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const LINK_SECTIONS = [
  {
    key: "projects",
    label: "Projects & Ideas",
    icon: <Lightbulb size={15} />,
    color: "#f59e0b",
    links: [
      {
        name: "NevonProjects",
        url: "https://nevonprojects.com",
        desc: "Huge catalog of project ideas for ECE, CSE, Mechanical, Civil and more. Best for final-year and mini projects.",
        tags: ["ECE", "CSE", "Mech", "Civil"],
        free: true,
      },
      {
        name: "EnggRoom",
        url: "https://enggroom.com",
        desc: "Free downloadable complete projects with reports, code and docs for all branches.",
        tags: ["All Branches", "Download"],
        free: true,
      },
      {
        name: "The Engineering Projects",
        url: "https://theengineeringprojects.com",
        desc: "Open-source platform for sharing and modifying projects across all engineering domains.",
        tags: ["Open Source", "All Branches"],
        free: true,
      },
      {
        name: "Instructables",
        url: "https://www.instructables.com",
        desc: "Thousands of DIY engineering projects of all skill levels — great for robotics, electronics and creative builds.",
        tags: ["DIY", "Robotics", "Electronics"],
        free: true,
      },
      {
        name: "GitHub",
        url: "https://github.com",
        desc: "The world's largest code repository. Find open-source projects, contribute, and build your portfolio.",
        tags: ["Code", "Portfolio", "Open Source"],
        free: true,
      },
    ],
  },
  {
    key: "events",
    label: "Hackathons & Events",
    icon: <Trophy size={15} />,
    color: "#26F2D0",
    links: [
            {
        name: "Unstop",
        url: "https://unstop.com",
        desc: "Competitions, hackathons, internships and jobs all in one place — especially good for Indian students.",
        tags: ["India", "Internships", "Competitions"],
        free: true,
      },
      {
        name: "Devfolio",
        url: "https://devfolio.co/hackathons",
        desc: "India's largest hackathon platform. Lists hundreds of online and offline hackathons across all domains.",
        tags: ["India", "Online", "Offline"],
        free: true,
      },
      {
        name: "Reskilll — AllHacks",
        url: "https://reskilll.com/allhacks",
        desc: "Aggregates hackathons, coding events and tech competitions across India and globally.",
        tags: ["CSE", "ECE", "Interdisciplinary"],
        free: true,
      },
      {
        name: "HackerEarth",
        url: "https://www.hackerearth.com/challenges",
        desc: "Coding challenges, hackathons and hiring contests. Good for both practice and competition.",
        tags: ["Coding", "Hiring", "Challenges"],
        free: true,
      },
      {
        name: "MLH (Major League Hacking)",
        url: "https://mlh.io/seasons/2025/events",
        desc: "Official student hackathon league. Organises hundreds of in-person and online hackathons worldwide.",
        tags: ["Global", "Student", "Official"],
        free: true,
      },

    ],
  },
  {
    key: "interview",
    label: "Interview Prep",
    icon: <Code2 size={15} />,
    color: "#a78bfa",
    links: [
      {
        name: "LeetCode",
        url: "https://leetcode.com",
        desc: "The most popular platform for DSA practice. Essential for placement and tech interviews.",
        tags: ["DSA", "Placements", "Must-use"],
        free: true,
      },
      {
        name: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org",
        desc: "Interview questions, CS fundamentals, company-specific prep and coding practice.",
        tags: ["CSE", "CS Fundamentals", "Company Prep"],
        free: true,
      },
      {
        name: "InterviewBit",
        url: "https://www.interviewbit.com",
        desc: "Structured interview preparation with timed coding challenges and a realistic interview environment.",
        tags: ["Structured", "Timed", "Real-world"],
        free: true,
      },
      {
        name: "HackerRank",
        url: "https://www.hackerrank.com",
        desc: "Skill certifications, coding contests and practice problems across multiple domains.",
        tags: ["Certificates", "Contests", "Multi-domain"],
        free: true,
      },
      {
        name: "Pramp",
        url: "https://www.pramp.com",
        desc: "Free mock interviews with peers. Practice coding and behavioural interviews in real-time.",
        tags: ["Mock Interview", "Peer", "Free"],
        free: true,
      },
    ],
  },
  {
    key: "learning",
    label: "Learning & Courses",
    icon: <BookOpen size={15} />,
    color: "#22c55e",
    links: [
      {
        name: "NPTEL",
        url: "https://nptel.ac.in",
        desc: "Free IIT/IISc courses for all engineering branches with SWAYAM certification. Highly credible for resumes.",
        tags: ["Free", "IIT", "Certification"],
        free: true,
      },
      {
        name: "Coursera",
        url: "https://www.coursera.org",
        desc: "Online courses from top global universities. Many free to audit; financial aid available.",
        tags: ["University Courses", "Certificates"],
        free: false,
      },
      {
        name: "MIT OpenCourseWare",
        url: "https://ocw.mit.edu",
        desc: "Free MIT lecture notes, exams and videos for virtually every engineering and science subject.",
        tags: ["MIT", "Free", "All Subjects"],
        free: true,
      },
      {
        name: "Khan Academy",
        url: "https://www.khanacademy.org",
        desc: "Free foundational courses in maths, physics, chemistry and computing. Great for brushing up basics.",
        tags: ["Basics", "Maths", "Physics", "Free"],
        free: true,
      },
      {
        name: "freeCodeCamp",
        url: "https://www.freecodecamp.org",
        desc: "Free full-stack web development curriculum with project-based learning and certifications.",
        tags: ["Web Dev", "Free", "Certifications"],
        free: true,
      },
    ],
  },
  {
    key: "research",
    label: "Research & Papers",
    icon: <FlaskConical size={15} />,
    color: "#3b82f6",
    links: [

            {
        name: "JNTUH",
        url: "https://studentservices.jntuh.ac.in/oss/syllabus.html?type=previousQPapers",
        desc: "All Braches Papers can be found irrespective of Branch.",
        tags: ["Prev Papers", "Friendly UI"],
        free: true,
      },

      {
        name: "Google Scholar",
        url: "https://scholar.google.com",
        desc: "Search research papers, theses and patents. Essential for literature reviews and academic work.",
        tags: ["Research", "Papers", "Citations"],
        free: true,
      },
      {
        name: "ResearchGate",
        url: "https://www.researchgate.net",
        desc: "Connect with researchers, read full-text papers and follow developments in your field.",
        tags: ["Networking", "Full-text", "Collaboration"],
        free: true,
      },
      {
        name: "arXiv",
        url: "https://arxiv.org",
        desc: "Free preprint server for CS, AI, physics, maths and more. Latest research before publication.",
        tags: ["AI", "Physics", "CS", "Latest"],
        free: true,
      },
      {
        name: "Semantic Scholar",
        url: "https://www.semanticscholar.org",
        desc: "AI-powered research tool that finds relevant papers, summarises abstracts and shows citation maps.",
        tags: ["AI-powered", "Summaries", "Citation Map"],
        free: true,
      },
    ],
  },
];

// const AI_TOOLS = [
//   {
//     name: "WolframAlpha",
//     url: "https://www.wolframalpha.com",
//     icon: <Calculator size={18} />,
//     color: "#ef4444",
//     desc: "Solve maths, physics, chemistry equations with step-by-step answers. STEM students' best friend.",
//     tags: ["Maths", "Physics", "Chemistry", "STEM"],
//     free: true,
//     badge: "Essential",
//   },
//   {
//     name: "Julius AI",
//     url: "https://julius.ai",
//     icon: <BarChart2 size={18} />,
//     color: "#f59e0b",
//     desc: "Upload CSV/Excel data and get instant graphs, analysis and predictions through plain-language chat.",
//     tags: ["Data Analysis", "Graphs", "Python"],
//     free: true,
//     badge: "Free Tier",
//   },
//   {
//     name: "Napkin AI",
//     url: "https://www.napkin.ai",
//     icon: <Palette size={18} />,
//     color: "#a78bfa",
//     desc: "Turn text into professional diagrams, flowcharts and visuals instantly. Perfect for presentations and reports.",
//     tags: ["Diagrams", "Presentations", "Visual"],
//     free: true,
//     badge: "Free",
//   },
//   {
//     name: "Perplexity AI",
//     url: "https://www.perplexity.ai",
//     icon: <Search size={18} />,
//     color: "#26F2D0",
//     desc: "AI search engine that gives cited, up-to-date answers. Great for research and quick fact-checking.",
//     tags: ["Research", "Search", "Cited Answers"],
//     free: true,
//     badge: "Free",
//   },
//   {
//     name: "NotebookLM",
//     url: "https://notebooklm.google.com",
//     icon: <FileText size={18} />,
//     color: "#4ade80",
//     desc: "Upload your own notes and PDFs — Google's AI becomes an expert on your exact study material.",
//     tags: ["Study Notes", "PDFs", "Google"],
//     free: true,
//     badge: "Free",
//   },
//   {
//     name: "Gamma",
//     url: "https://gamma.app",
//     icon: <Zap size={18} />,
//     color: "#f97316",
//     desc: "Generate beautiful presentations, documents and web pages from a prompt in seconds.",
//     tags: ["Presentations", "PPT", "Reports"],
//     free: true,
//     badge: "Free Tier",
//   },
//   {
//     name: "Overleaf",
//     url: "https://www.overleaf.com",
//     icon: <FileText size={18} />,
//     color: "#22c55e",
//     desc: "Online LaTeX editor for research papers and project reports. Collaborative and used by every researcher.",
//     tags: ["LaTeX", "Research", "Reports"],
//     free: true,
//     badge: "Free",
//   },
//   {
//     name: "Symbolab",
//     url: "https://www.symbolab.com",
//     icon: <Calculator size={18} />,
//     color: "#818cf8",
//     desc: "Step-by-step solver for calculus, algebra, trigonometry and matrices. Shows every step clearly.",
//     tags: ["Calculus", "Algebra", "Step-by-step"],
//     free: true,
//     badge: "Free Tier",
//   },
//   {
//     name: "Claude AI",
//     url: "https://claude.ai",
//     icon: <Brain size={18} />,
//     color: "#c084fc",
//     desc: "Write code, debug, explain concepts, review reports and answer complex questions. Excellent for engineering.",
//     tags: ["Coding", "Writing", "Debugging"],
//     free: true,
//     badge: "Free",
//   },
//   {
//     name: "Canva AI",
//     url: "https://www.canva.com",
//     icon: <Palette size={18} />,
//     color: "#ec4899",
//     desc: "Design posters, banners, lab reports and presentations with AI-assisted templates.",
//     tags: ["Design", "Posters", "Presentations"],
//     free: true,
//     badge: "Free Tier",
//   },
// ];

const AI_TOOLS = [
  {
    name: "WolframAlpha",
    url: "https://www.wolframalpha.com",
    icon: wolfram,
    tags: ["Maths", "Physics"],
  },
  {
    name: "Julius AI",
    url: "https://julius.ai",
    icon: julius,
    tags: ["Data", "Graphs","Data Analysis"],
  },
  {
    name: "Napkin AI",
    url: "https://napkin.ai",
    icon: napkin,
    tags: ["Diagrams","Flowcharts"],
  },
  {
    name: "Perplexity",
    url: "https://www.perplexity.ai",
    icon: perplexity,
    tags: ["Search","Knowledge","Business"],
  },
  {
    name: "NotebookLM",
    url: "https://notebooklm.google.com",
    icon: notebook,
    tags: ["Notes","Academic"],
  },
  {
    name: "Gamma",
    url: "https://gamma.app",
    icon: gamma,
    tags: ["PPT","Portfolio"],
  },
  {
    name: "Overleaf",
    url: "https://www.overleaf.com",
    icon: overleaf,
    tags: ["LaTeX"],
  },
  {
    name: "Symbolab",
    url: "https://www.symbolab.com",
    icon: symbolab,
    tags: ["Calculus","Maths"],
  },
  {
    name: "Claude",
    url: "https://claude.ai",
    icon: claude,
    tags: ["AI","Code","Project Dev"],
  },
  {
    name: "Canva",
    url: "https://www.canva.com",
    icon: canva,
    tags: ["Design","Create"],
  },
];











/* ─────────────────────────────────────────────
   LINK CARD
───────────────────────────────────────────── */
function LinkCard({ link, accent }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex", flexDirection: "column", gap: 8,
        padding: "14px 16px", borderRadius: 14,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        textDecoration: "none", transition: "all 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = `${accent}08`;
        e.currentTarget.style.borderColor = `${accent}35`;
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = `0 4px 16px ${accent}15`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <span style={{ color: "white", fontWeight: 700, fontSize: 13 }}>{link.name}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          {link.free && (
            <span style={{
              fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 999,
              background: "rgba(34,197,94,0.12)", color: "#4ade80",
              border: "1px solid rgba(34,197,94,0.2)", textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}>Free</span>
          )}
          <ExternalLink size={11} style={{ color: "#4b5563" }} />
        </div>
      </div>
      <p style={{ color: "#6b7280", fontSize: 12, margin: 0, lineHeight: 1.55 }}>
        {link.desc}
      </p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {link.tags.map(tag => (
          <span key={tag} style={{
            fontSize: 10, padding: "2px 7px", borderRadius: 999,
            background: `${accent}12`, color: accent,
            border: `1px solid ${accent}25`,
          }}>{tag}</span>
        ))}
      </div>
    </a>
  );
}

/* ─────────────────────────────────────────────
   AI TOOL CARD
───────────────────────────────────────────── */
function AiToolCard({ tool }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: "16px",
        borderRadius: 16,
        background: "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
        border: "1px solid rgba(255,255,255,0.08)",
        textDecoration: "none",
        transition: "all 0.25s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "#26F2D0";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(38,242,208,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top Row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: "rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 6,
          }}
        >
          <img
            src={tool.icon}
            alt={tool.name}
            onError={(e) => {
              e.target.src =
                "https://cdn-icons-png.flaticon.com/512/4712/4712027.png";
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        <span
          style={{
            color: "white",
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "-0.01em",
          }}
        >
          {tool.name}
        </span>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          width: "100%",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        }}
      />

      {/* Tags */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {tool.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 10,
              padding: "3px 8px",
              borderRadius: 999,
              background: "rgba(38,242,208,0.08)",
              border: "1px solid rgba(38,242,208,0.25)",
              color: "#26F2D0",
              fontWeight: 600,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}
/* ─────────────────────────────────────────────
   SECTION with collapsible support
───────────────────────────────────────────── */
function LinkSection({ section, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={{
      borderRadius: 16, overflow: "hidden",
      border: `1px solid ${section.color}20`,
      marginBottom: 12,
    }}>
      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 12,
          padding: "14px 18px",
          background: open ? `${section.color}0a` : "rgba(255,255,255,0.02)",
          border: "none", cursor: "pointer",
          transition: "background 0.2s",
          borderBottom: open ? `1px solid ${section.color}18` : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: `${section.color}18`,
            border: `1px solid ${section.color}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: section.color,
          }}>
            {section.icon}
          </div>
          <span style={{ color: "white", fontWeight: 700, fontSize: 14 }}>
            {section.label}
          </span>
          <span style={{
            fontSize: 10, padding: "2px 7px", borderRadius: 999,
            background: `${section.color}15`, color: section.color,
            border: `1px solid ${section.color}25`,
          }}>
            {section.links.length}
          </span>
        </div>
        <ChevronDown
          size={16}
          style={{
            color: "#4b5563", flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        />
      </button>

      {/* Links */}
      {open && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 10, padding: "14px 16px",
          background: "rgba(255,255,255,0.01)",
        }}>
          {section.links.map(link => (
            <LinkCard key={link.name} link={link} accent={section.color} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function UsefulResources() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');
        .ur-wrap * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        @media (max-width: 600px) {
          .ur-grid { grid-template-columns: 1fr !important; }
          .ur-pad  { padding: 20px 14px !important; }
        }
      `}</style>

      <div className="ur-wrap ur-pad" style={{
        padding: "24px 24px 48px",
        color: "white", minHeight: "100%",
      }}>

        {/* ── Section header ── */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{
              width: 3, height: 20, borderRadius: 2,
              background: "linear-gradient(180deg,#26F2D0,#7c3aed)",
            }} />
            <h2 style={{
              fontFamily: "'Sora',sans-serif", fontWeight: 800,
              fontSize: 18, color: "white", margin: 0, letterSpacing: "-0.03em",
            }}>
              Useful Links & Tools
            </h2>
          </div>
          <p style={{ color: "#4b5563", fontSize: 12, margin: "0 0 0 13px" }}>
            Curated for Ellenki students — projects, events, interviews, learning and AI tools
          </p>
        </div>

        {/* ── Website sections (collapsible) ── */}
        <div style={{ marginBottom: 28 }}>
          {LINK_SECTIONS.map((section, i) => (
            <LinkSection key={section.key} section={section} defaultOpen={i === 0} />
          ))}
        </div>

        {/* ── AI Tools header ── */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12, marginBottom: 16,
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8, flex: 1,
            height: 1,
          }}>
            <div style={{
              height: 1, flex: 1,
              background: "linear-gradient(90deg, rgba(124,58,237,0.4), transparent)",
            }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <Cpu size={15} style={{ color: "#a78bfa" }} />
            <span style={{
              fontFamily: "'Sora',sans-serif", fontWeight: 800,
              fontSize: 14, color: "white", letterSpacing: "-0.02em",
            }}>
              AI Tools for Students
            </span>
            <span style={{
              fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 999,
              background: "rgba(167,139,250,0.15)", color: "#a78bfa",
              border: "1px solid rgba(167,139,250,0.25)",
              textTransform: "uppercase", letterSpacing: "0.06em",
            }}>
              2025
            </span>
          </div>
          <div style={{
            height: 1, flex: 1,
            background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4))",
          }} />
        </div>

        <p style={{ color: "#4b5563", fontSize: 12, marginBottom: 16, textAlign: "center" }}>
          Free or free-tier AI tools that actually help with engineering studies, projects and presentations
        </p>

        {/* ── AI Tools grid ── */}
        <div
          className="ur-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 10,
          }}
        >
          {AI_TOOLS.map(tool => (
            <AiToolCard key={tool.name} tool={tool} />
          ))}
        </div>

        {/* Footer note */}
        <div style={{
          marginTop: 28, padding: "12px 18px", borderRadius: 12,
          background: "rgba(38,242,208,0.04)",
          border: "1px solid rgba(38,242,208,0.12)",
          textAlign: "center",
        }}>
          <p style={{ color: "#4b5563", fontSize: 11, margin: 0 }}>
            All links open in a new tab · Resources are community-verified · Last updated 2025
          </p>
        </div>

      </div>
    </>
  );
}