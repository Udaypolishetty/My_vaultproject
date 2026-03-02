import { useState } from "react";

const IdeaForm = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    category: "Tech",
    title: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Read individual localStorage items
    const name = localStorage.getItem("name");
    const rollNumber = localStorage.getItem("rollNumber");

    if (!name) {
      alert("Please set up your profile first");
      return;
    }

    const newIdea = {
      name: name,
      rollNumber: rollNumber,
      category: form.category,
      title: form.title,
      description: form.description
    };

    onSubmit(newIdea);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#111] w-full max-w-xl rounded-xl p-6 text-white">

        <h2 className="text-xl font-bold mb-4">Post Your Idea</h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 bg-[#222] rounded"
          >
            <option>Tech</option>
            <option>Academic</option>
            <option>Campus Pulse</option>
            <option>Cultural</option>
            <option>Others</option> {/* ✅ added */}
          </select>

          <input
            name="title"
            value={form.title}
            placeholder="Idea Title"
            onChange={handleChange}
            required
            className="w-full p-2 bg-[#222] rounded"
          />

          <textarea
            name="description"
            value={form.description}
            placeholder="Describe your idea (max 300 chars)"
            maxLength={300}
            onChange={handleChange}
            className="w-full p-2 bg-[#222] rounded h-24"
          />

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#26F2D0] text-black rounded font-semibold"
            >
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default IdeaForm;