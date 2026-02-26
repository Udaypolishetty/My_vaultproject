import { useState } from "react";

export default function ClubForm({ onClose, onSubmit, loading }) {

  const [form, setForm] = useState({
    title: "",
    description: "",
    linkedinUrl: "",
  });
  const [error, setError] = useState({});

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const validate = () => {
    const newError = {};

    if (countWords(form.title) >= 10) {
      newError.title = "Title must be below 10 words";
    }

    const descWords = countWords(form.description);
    if (descWords < 10 || descWords > 40) {
      newError.description = "Description must be 10-40 words";
    }

    // ✅ Validate linkedin URL
    if (!form.linkedinUrl.trim()) {
      newError.linkedinUrl = "LinkedIn URL is required";
    } else if (!form.linkedinUrl.startsWith("https://")) {
      newError.linkedinUrl = "LinkedIn URL must start with https://";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;
    if (!validate()) return;

    // ✅ Pass all 3 fields including linkedinUrl
    onSubmit({
      title: form.title,
      description: form.description,
      linkedinUrl: form.linkedinUrl,  // ✅ fixed
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#111] w-full max-w-md p-6 rounded-2xl">

        <h2 className="text-xl font-bold mb-4">Add Club</h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Title */}
          <input
            name="title"
            placeholder="Club title (below 10 words)"
            value={form.title}
            onChange={handleChange}
            required
            className={`w-full p-2 bg-[#222] rounded
              ${error.title ? "border border-red-500" : ""}`}
          />
          {error.title && (
            <p className="text-red-400 text-sm">{error.title}</p>
          )}

          {/* Description */}
          <textarea
            name="description"
            placeholder="Club description (10-40 words)"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className={`w-full p-2 bg-[#222] rounded no-scrollbar
              ${error.description ? "border border-red-500" : ""}`}
          />
          {error.description && (
            <p className="text-red-400 text-sm">{error.description}</p>
          )}

          {/* LinkedIn URL */}
          <input
            name="linkedinUrl"
            placeholder="LinkedIn URL (https://linkedin.com/...)"
            value={form.linkedinUrl}
            onChange={handleChange}
            required
            className={`w-full p-2 bg-[#222] rounded
              ${error.linkedinUrl ? "border border-red-500" : ""}`}
          />
          {error.linkedinUrl && (
            <p className="text-red-400 text-sm">{error.linkedinUrl}</p>
          )}

          {/* Buttons */}
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
              disabled={loading}
              className={`px-4 py-2 rounded font-semibold text-black
                ${loading
                  ? "bg-[#26F2D0]/40 cursor-not-allowed"
                  : "bg-[#26F2D0]"
                }`}
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}