import { useEffect, useState } from "react";
import DiscussionForm from "./DiscussionForm";

export default function Discussions() {
    const student = JSON.parse(localStorage.getItem("studentProfile"));
  const [showForm, setShowForm] = useState(false);
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/discussions")
      .then(res => res.json())
      .then(data => setDiscussions(data));
  }, []);

  const pinned = discussions.filter(d => d.pinned);
  const normal = discussions.filter(d => !d.pinned);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#0b0b0b] to-[#141414]
                      border border-white/10 p-6 rounded-2xl shadow-lg">
        <div>
          <h2 className="text-xl font-bold">Discussions</h2>
          <p className="text-gray-400 text-sm">
            Join conversations and share knowledge
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-[#26F2D0] text-black px-5 py-2 rounded-xl font-semibold hover:bg-[#20d6b8]"
        >
          + Start Discussion
        </button>
      </div>

      {/* Pinned Discussions */}
      {pinned.map(d => (
        <DiscussionRow key={d.id} discussion={d} pinned />
      ))}

      {/* Normal Discussions */}
      {normal.map(d => (
        <DiscussionRow key={d.id} discussion={d} />
      ))}

      {/* Popup */}
      {showForm && (
        <DiscussionForm
          onClose={() => setShowForm(false)}
          onSubmit={(newDiscussion) => {
            setDiscussions([newDiscussion, ...discussions]);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}

function DiscussionRow({ discussion, pinned }) {
  return (
    <div className="flex items-center gap-4 bg-gradient-to-br from-[#0b0b0b] to-[#121212]
                    border border-white/10 p-5 rounded-xl hover:border-[#26F2D0]/40 transition cursor-pointer">

      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center text-gray-400">
        👤
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {pinned && (
            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">
              Pinned
            </span>
          )}
          <h3 className="font-semibold">{discussion.title}</h3>
        </div>

        <p className="text-gray-400 text-sm">{discussion.description}</p>

        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-2">
          <span>
            {discussion.name} · {discussion.branch} · {discussion.year}
          </span>

          <span>💬 {discussion.replies?.length || 0} replies</span>
          <span>⏱ {discussion.time || "just now"}</span>

          {discussion.tags?.map(tag => (
            <span
              key={tag}
              className="bg-[#222] px-2 py-1 rounded-full text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div className="text-gray-500 text-xl">›</div>
    </div>
  );
}
