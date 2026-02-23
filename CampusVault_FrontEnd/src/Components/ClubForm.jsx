import { useState } from "react";

export default function TaskForm({ onClose, onSubmit }) {
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    linkedinUrl:"",
  });
  const [error, setError] = useState({});

  const countWords = (text) => {
   return  text.trim().split(/\s+/).filter(Boolean).length;
  }
  const validate = () => {
    const newError = {};

    if(countWords(form.title) >= 10) {
      newError .title = "Title must be below 10 words";
    }

    const descWords = countWords(form.description);
    if(descWords < 50 || descWords > 100) {
      newError.description = "Description must be 50-100 words";
    }
    setError(newError);
     return Object.keys(newError).length === 0;
  }
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;
    if(!validate()) return;
    onSubmit({
      title: form.title,
      description: form.description,
     
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 rounded-2xl">
      <div className="bg-[#111] w-full max-w-md p-6 rounded-2xl">

        <h2 className="text-xl font-bold mb-4">Add Club</h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            name="title"
            placeholder="Club title (below 10 words)"
            value={form.title}
            onChange={handleChange}
            required
            className={`w-full p-2 bg-[#222] rounded
              ${error.title ? "border border-red-500" : ""}`}
            
          />
          {error.title && (<p className = "text-red-400 text-sm">{error.title}</p>)}

          <textarea
            name="description"
            placeholder="Club description (words should be above 50)"
            value={form.description}
            onChange={handleChange}
            className={`w-full p-2 bg-[#222] rounded no-scrollbar
    ${error.description ? "border border-red-500" : ""}
  `}
          />
          
{error.description && (
  <p className="text-red-400 text-sm">{error.description}</p>
)}
           <input
            name="linkedinUrl"
            placeholder="LinkedIn url"
            value={form.linkedinUrl}
            onChange={handleChange}
            className="w-full p-2 bg-[#222] rounded"
            required
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
              Add
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
