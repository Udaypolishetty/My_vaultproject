

import { useState } from "react";
import { Lightbulb, Target, Wrench, Users, Send, X, Eye } from "lucide-react";
import { validateIdeaTitle, validateDescription, validateAll } from "../../utils/validate"; // ✅ IMPORTED

const IdeaForm = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({ category: "Tech", title: "" });
  const [fields, setFields] = useState({
    what: "",
    why: "",
    how: "",
    who: ""
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const maxTitle = 40;

  const fieldConfig = [
    {
      key: "what",
      icon: <Lightbulb size={14} className="text-yellow-400" />,
      label: "What is the idea?",
      placeholder: "Describe your idea clearly in 1-2 sentences...",
      required: true,
      min: 20,
      max: 150,
    },
    {
      key: "why",
      icon: <Target size={14} className="text-red-400" />,
      label: "Why does it matter?",
      placeholder: "What problem does it solve? Who is affected?",
      required: true,
      min: 20,
      max: 150,
    },
    {
      key: "how",
      icon: <Wrench size={14} className="text-blue-400" />,
      label: "How can it be implemented?",
      placeholder: "Resources, steps, or support needed... (optional)",
      required: false,
      min: 0,
      max: 100,
    },
    {
      key: "who",
      icon: <Users size={14} className="text-green-400" />,
      label: "Who would benefit?",
      placeholder: "e.g. All students, CSE branch, hostel students... (optional)",
      required: false,
      min: 0,
      max: 80,
    },
  ];

  const buildDescription = () => {
    const parts = [];
    if (fields.what) parts.push(`What: ${fields.what.trim()}`);
    if (fields.why)  parts.push(`Why: ${fields.why.trim()}`);
    if (fields.how)  parts.push(`How: ${fields.how.trim()}`);
    if (fields.who)  parts.push(`Who: ${fields.who.trim()}`);
    return parts.join("\n\n");
  };

const handleFieldChange = (key, value) => {
  const cleaned = cleanInput(value); // 🔥 clean here
  setFields(prev => ({ ...prev, [key]: cleaned }));
  if (error) setError(null);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // ✅ INTEGRATED VALIDATION
    const description = buildDescription();
    const { valid, errors } = validateAll({
      title: validateIdeaTitle(form.title),
      description: validateDescription(description),
    });
    
    if (!valid) {
      setError(errors.title || errors.description); // show first error
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        category: form.category,
        title: form.title.trim(),
        description,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const isTitleNearLimit = form.title.length >= 35;
  const isDuplicateError = error?.toLowerCase().includes("already") ||
                           error?.toLowerCase().includes("exists") ||
                           error?.toLowerCase().includes("title");

  const canSubmit = !submitting;

  const getCounterColor = (len, min, max) => {
    if (len > max) return "text-red-400";
    if (len > max * 0.85) return "text-orange-400";
    if (len >= min && len > 0) return "text-green-400";
    if (len > 0) return "text-yellow-400";
    return "text-gray-500";
  };

  const getBorderColor = (len, min, max, hasError) => {
    if (hasError) return "border-red-500/50 focus:border-red-500";
    if (len > max) return "border-red-500/50 focus:border-red-500";
    if (len >= min && len > 0) return "border-green-500/30 focus:border-green-500/50";
    return "border-white/10 focus:border-[#26F2D0]/50";
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#111] w-full max-w-xl rounded-2xl p-6 text-white
                      border border-white/10 shadow-xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Lightbulb size={20} className="text-[#26F2D0]" />
            <h2 className="text-xl font-bold">Post Your Idea</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>
        <p className="text-gray-500 text-xs mb-5">
          Fill in the guided fields below for a clear, structured idea.
        </p>

        {/* Error banner */}
        {error && (
          <div className={`mb-4 flex items-start gap-3 rounded-xl px-4 py-3 border
            ${isDuplicateError
              ? "bg-yellow-500/10 border-yellow-500/20"
              : "bg-orange-500/10 border-orange-500/20"
            }`}>
            <span className="shrink-0 mt-0.5">
              {isDuplicateError
                ? <Lightbulb size={16} className="text-yellow-400" />
                : <Target size={16} className="text-orange-400" />
              }
            </span>
            <div>
              <p className={`font-semibold text-sm
                ${isDuplicateError ? "text-yellow-400" : "text-orange-400"}`}>
                {isDuplicateError ? "Similar Idea Already Exists" : "Fix before submitting"}
              </p>
              <p className={`text-xs mt-0.5
                ${isDuplicateError ? "text-yellow-300" : "text-orange-300"}`}>
                {error}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Category */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Category</label>
            <select
              value={form.category}
              onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
              className="w-full p-2 bg-[#222] rounded-xl text-white outline-none
                         border border-white/10 focus:border-[#26F2D0]/50 transition"
            >
              <option>Tech</option>
              <option>Academic</option>
              <option>Campus Pulse</option>
              <option>Cultural</option>
              <option>Others</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Idea Title</label>
            <div className="relative">
              <input
                value={form.title}
                placeholder="Write a clear concise title..."
onChange={e => {
  const cleaned = cleanInput(e.target.value); // 🔥 clean title
  setForm(p => ({ ...p, title: cleaned }));
  if (error) setError(null);
}}
                maxLength={maxTitle}
                required
                className={`w-full p-2 pr-16 bg-[#222] rounded-xl text-white outline-none
                           border transition
                           ${isDuplicateError
                             ? "border-red-500/50 focus:border-red-500"
                             : isTitleNearLimit
                               ? "border-orange-400/50 focus:border-orange-400"
                               : "border-white/10 focus:border-[#26F2D0]/50"
                           }`}
              />
              <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs
                ${isTitleNearLimit ? "text-red-400" : "text-gray-500"}`}>
                {form.title.length}/{maxTitle}
              </span>
            </div>
          </div>

          {/* Guided fields */}
          {fieldConfig.map(({ key, icon, label, placeholder, required, min, max }) => {
            const val = fields[key];
            const counterColor = getCounterColor(val.length, min, max);
            const borderColor = getBorderColor(val.length, min, max, false);
            const isGood = val.length >= min && val.length > 0;

            return (
              <div key={key}>
                <label className="text-xs text-gray-400 mb-1 flex items-center gap-1.5">
                  {icon}
                  <span className="font-medium">{label}</span>
                  {required
                    ? <span className="text-red-400 text-xs">*</span>
                    : <span className="text-gray-600 text-xs ml-1">optional</span>
                  }
                  {isGood && (
                    <span className="text-green-400 ml-auto text-xs">✓</span>
                  )}
                </label>
                <div className="relative">
                  <textarea
                    value={val}
                    placeholder={placeholder}
                    maxLength={max}
                    onChange={e => handleFieldChange(key, e.target.value)}
                    rows={2}
                    className={`w-full p-2 pb-6 bg-[#222] rounded-xl text-white
                               outline-none border transition resize-none text-sm
                               ${borderColor}`}
                  />
                  <span className={`absolute right-3 bottom-2 text-xs ${counterColor}`}>
                    {val.length}/{max}
                    {required && val.length > 0 && val.length < min &&
                      ` — ${min - val.length} more`
                    }
                  </span>
                </div>
              </div>
            );
          })}

          {/* Live preview */}
          {(fields.what || fields.why) && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                <Eye size={12} />
                <span>Preview — how it looks on the card</span>
              </div>
              <p className="text-xs text-gray-300 whitespace-pre-wrap leading-relaxed">
                {buildDescription()}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl
                         text-gray-300 hover:bg-white/20 transition text-sm"
            >
              <X size={14} /> Cancel
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold
                         transition text-sm
                         ${canSubmit
                           ? "bg-[#26F2D0] text-black hover:bg-[#1dd4b8]"
                           : "bg-white/10 text-gray-500 cursor-not-allowed"
                         }`}
            >
              <Send size={14} />
              {submitting ? "Posting..." : "Submit Idea"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default IdeaForm;
