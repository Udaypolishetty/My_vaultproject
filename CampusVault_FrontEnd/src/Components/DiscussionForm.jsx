import { useState } from "react";

export default function DiscussionForm({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    year: "",
    branch: "",
    title: "",
    description: "",
    tags: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.name) return;

    const newDiscussion = {
      id: Date.now(),
      ...form,
      tags: form.tags.split(","),
      pinned: false,
      replies: [],
      time: "Just now"
    };

    onSubmit(newDiscussion);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#111] w-full max-w-xl rounded-xl p-6 border border-white/10">

        <h2 className="text-xl font-bold mb-4">Start a Discussion</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Your Name"
            className="w-full p-2 bg-[#222] rounded"
            onChange={handleChange}
          />
          <div className="flex gap-2">
            <input
              name="year"
              placeholder="Year"
              className="w-full p-2 bg-[#222] rounded"
              onChange={handleChange}
            />
            <input
              name="branch"
              placeholder="Branch"
              className="w-full p-2 bg-[#222] rounded"
              onChange={handleChange}
            />
          </div>

          <input
            name="title"
            placeholder="Discussion Title"
            className="w-full p-2 bg-[#222] rounded"
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Describe your topic..."
            className="w-full p-2 bg-[#222] rounded h-28"
            onChange={handleChange}
          />

          <input
            name="tags"
            placeholder="Tags (comma separated, e.g. DSA,Placements)"
            className="w-full p-2 bg-[#222] rounded"
            onChange={handleChange}
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#222] rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-[#26F2D0] text-black rounded font-semibold"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
