import { useState } from "react";
import {
  FileText, BookOpen, Upload, Search,
  Download, Eye, Loader2
} from "lucide-react";
import { ContributeForm } from "./Resources";

const MobileViewResource = ({ token }) => {
  const [domain, setDomain] = useState("");
  const [papers, setPapers] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("papers");
  const [loading, setLoading] = useState(false);
  const [showDomain, setShowDomain] = useState(false);

  const showPapers = async (selectedDomain) => {
    setDomain(selectedDomain);
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8081/api/files?domain=${selectedDomain}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setPapers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = papers.filter(p =>
    p.filename.toLowerCase().includes(search.toLowerCase())
  );

  const TABS = [
    { key: "papers", label: "Papers", icon: <FileText size={14}/> },
    { key: "notes", label: "Notes", icon: <BookOpen size={14}/> },
    { key: "contribute", label: "Contribute", icon: <Upload size={14}/> },
  ];

  return (
    <div style={{
      padding: 16,
      background: "#0b0b0b",
      minHeight: "100vh",
      color: "white"
    }}>

      {/* HEADER */}
      <h2 style={{
        fontSize: 20,
        fontWeight: 800,
        marginBottom: 16
      }}>
        Academic Resources
      </h2>

      {/* TABS */}
      <div style={{
        display: "flex",
        gap: 8,
        marginBottom: 16
      }}>
        {TABS.map(tab => {
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 10,
                border: "1px solid #222",
                background: active
                  ? "linear-gradient(135deg,#26F2D0,#7c3aed)"
                  : "#111",
                color: active ? "black" : "#aaa",
                fontWeight: 600,
                display: "flex",
                justifyContent: "center",
                gap: 6
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* PAPERS */}
      {activeTab === "papers" && (
        <>
          {/* DOMAIN SELECT */}
<div style={{ position: "relative", marginBottom: 14 }}>

  {/* BUTTON */}
  <div
    onClick={() => setShowDomain(!showDomain)}
    style={{
      width: "100%",
      padding: 12,
      borderRadius: 12,
      background: "#111",
      border: "1px solid #333",
      cursor: "pointer"
    }}
  >
    {domain || "Select Domain"}
  </div>

  {/* DROPDOWN */}
  {showDomain && (
    <div style={{
      position: "absolute",
      top: "110%",
      left: 0,
      width: "100%",
      background: "#111",
      border: "1px solid #333",
      borderRadius: 12,
      zIndex: 999,
      overflow: "hidden"
    }}>
      {["B.Tech", "Diploma", "MBA", "M.Tech"].map(d => (
        <div
          key={d}
          onClick={() => {
            showPapers(d);
            setShowDomain(false);
          }}
          style={{
            padding: 12,
            borderBottom: "1px solid #222",
            cursor: "pointer"
          }}
          onMouseEnter={e => e.target.style.background = "#1a1a1a"}
          onMouseLeave={e => e.target.style.background = "transparent"}
        >
          {d}
        </div>
      ))}
    </div>
  )}

</div>

          {/* SEARCH */}
          <div style={{ position: "relative", marginBottom: 14 }}>
            <Search size={14} style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#666"
            }}/>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search papers..."
              style={{
                width: "100%",
                padding: "10px 10px 10px 30px",
                borderRadius: 10,
                background: "#111",
                border: "1px solid #333",
                color: "white"
              }}
            />
          </div>

          {/* LOADING */}
          {loading && (
            <div style={{ textAlign: "center" }}>
              <Loader2 style={{ animation: "spin 1s linear infinite" }}/>
            </div>
          )}

          {/* FILE LIST */}
          {!loading && filtered.map(file => (
            <div key={file.id} style={{
              padding: 14,
              borderRadius: 14,
              marginBottom: 10,
              background: "#141414",
              border: "1px solid #222"
            }}>
              <p style={{ fontSize: 13 }}>{file.filename}</p>

              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button onClick={() =>
                  window.open(`http://localhost:8081/api/files/view/${file.id}`)
                }>
                  <Eye size={14}/>
                </button>

                <button onClick={() => {
                  const link = document.createElement("a");
                  link.href = `http://localhost:8081/api/files/download/${file.id}`;
                  link.click();
                }}>
                  <Download size={14}/>
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* NOTES */}
      {activeTab === "notes" && (
        <div style={{
          textAlign: "center",
          padding: 30,
          borderRadius: 14,
          background: "#111",
          border: "1px solid #222"
        }}>
          <BookOpen size={30} style={{ color: "#26F2D0" }}/>
          <h3>Notes Coming Soon 𓂃🖊</h3>
          <p style={{ color: "#888" }}>
            Access notes temporarily below
          </p>

          <button
            onClick={() => window.open(
              "https://www.forum.universityupdates.in/threads/jntuh-study-materials-notes-important-questions.33519/",
              "_blank"
            )}
            style={{
              marginTop: 10,
              padding: "10px 20px",
              borderRadius: 10,
              background: "#222",
              border: "1px solid #444",
              color: "white"
            }}
          >
            Open Notes ↗
          </button>
        </div>
      )}

      {/* CONTRIBUTE */}
      {activeTab === "contribute" && (
        <div style={{ marginTop: 10 }}>
          <ContributeForm token={token}/>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default MobileViewResource;