
import React, { useState, useEffect } from "react";
import IdeaForm from "./IdeaForm";

export default function IdeasBoard() {
const student = JSON.parse(localStorage.getItem("studentProfile") || "{}");


  const [showForm, setShowForm] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const [commentForm, setCommentForm] = useState({   
    text: ""
  });

  useEffect(() => {
    fetch("http://localhost:8081/api/ideas")
      .then(res => res.json())
      .then(data => setIdeas(data));
  }, []);

  const handleCommentChange = (e) => {
    setCommentForm({ text: e.target.value });
  };
  const submitComment = async (ideaId) => {
    if (!commentForm.text || !student) return;

    const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: commentForm.text,
        name: student.name,
        year: student.year,
        branch: student.branch,
        rollNo: student.rollNo
      })
    });

    const updated = await res.json();
    setIdeas(ideas.map(i => i.id === updated.id ? updated : i));

    setCommentForm({ text: "" });
    setActiveCommentId(null);
  };

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0b0b0b] to-[#141414]
                      border border-white/5 rounded-2xl p-6
                      flex flex-col md:flex-row md:items-center md:justify-between
                      gap-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="bg-[#26F2D0]/20 text-[#26F2D0] p-3 rounded-xl">💡</div>
          <div>
            <h2 className="text-2xl font-bold">Ideas Board</h2>
            <p className="text-gray-400 text-sm">
              Share and support student initiatives
            </p>
          </div>
        </div>

        <button
          className="bg-[#26F2D0] text-black px-5 py-2 rounded-xl font-semibold hover:bg-[#e6953c]"
          onClick={() => setShowForm(true)}
        >
          + Post an Idea
        </button>
      </div>

      {/* Filters */}
      <div className="mt-6 flex items-center gap-3">
        <span className="text-gray-500 text-sm">Filter:</span>

        {["All", "Tech", "Academic", "Campus Pulse", "Cultural"].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm ${
              activeFilter === cat
                ? "bg-[#26F2D0] text-black"
                : "bg-[#232323] text-gray-300 hover:bg-[#2a2a2a]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        {ideas
          .filter(i => activeFilter === "All" || i.category === activeFilter)
          .map((idea) => (
            <div key={idea.id} className="bg-[#111] p-6 rounded-xl">

              <h3 className="font-bold">{idea.title}</h3>
              <p className="text-gray-400">{idea.description}</p>

              <div className="flex justify-between mt-3 text-sm">
                <span> {idea.name} · {idea.branch} · {idea.year}</span>

                <button
                  onClick={() => setActiveCommentId(idea.id)}
                >
                  💬 {idea.comments.length}
                </button>
              </div>

              {activeCommentId === idea.id && (
                <div className="mt-3">
                  <textarea
                    value={commentForm.text}
                    onChange={handleCommentChange}
                    placeholder="Your comment..."
                    className="w-full p-2 bg-[#222] rounded"
                  />

                  <button
                    onClick={() => submitComment(idea.id)}
                    className="bg-[#26F2D0] text-black px-4 py-1 rounded mt-2"
                  >
                    Post
                  </button>
                </div>
              )}

            {idea.comments.map(c => (
  <div key={c._id || c.text} className="text-sm text-gray-300">
    <b>{c.name}</b> ({c.branch} · {c.year})  
    <div>{c.text}</div>
  </div>
))}

            </div>
          ))}
      </div>
      {showForm && (
        <IdeaForm
  onClose={() => setShowForm(false)}
  onSubmit={async (newIdea) => {
    const student = JSON.parse(localStorage.getItem("studentProfile"));

    const finalIdea = {
      ...newIdea,
      name: student.name,
      year: student.year,
      branch: student.branch,
      roll: student.roll
    };

    const res = await fetch("http://localhost:8081/api/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalIdea)
    });

    const saved = await res.json();
    setIdeas([saved, ...ideas]);
    setShowForm(false);
  }}
/>

      )}
    </>
  );
}
