// import { useState } from "react";

// const IdeaForm = ({ onClose, onSubmit }) => {
//   const [form, setForm] = useState({
//     category: "Tech",
//     title: "",
//     description: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();

//   // ✅ replace entire handleSubmit
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       onSubmit({
//         category: form.category,
//         title: form.title,
//         description: form.description
//       });
//       onClose();
//     };



//     // ✅ Read individual localStorage items
//     const name = localStorage.getItem("name");
//     const rollNumber = localStorage.getItem("rollNumber");

//     if (!name) {
//       alert("Please set up your profile first");
//       return;
//     }

//     const newIdea = {
//       name: name,
//       rollNumber: rollNumber,
//       category: form.category,
//       title: form.title,
//       description: form.description
//     };

//     onSubmit(newIdea);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//       <div className="bg-[#111] w-full max-w-xl rounded-xl p-6 text-white">

//         <h2 className="text-xl font-bold mb-4">Post Your Idea</h2>

//         <form onSubmit={handleSubmit} className="space-y-3">

//           <select
//             name="category"
//             value={form.category}
//             onChange={handleChange}
//             className="w-full p-2 bg-[#222] rounded"
//           >
//             <option>Tech</option>
//             <option>Academic</option>
//             <option>Campus Pulse</option>
//             <option>Cultural</option>
//             <option>Others</option> {/* ✅ added */}
//           </select>

//           <input
//             name="title"
//             value={form.title}
//             placeholder="Idea Title"
//             onChange={handleChange}
//             required
//             className="w-full p-2 bg-[#222] rounded"
//           />

//           <textarea
//             name="description"
//             value={form.description}
//             placeholder="Describe your idea (max 300 chars)"
//             maxLength={300}
//             onChange={handleChange}
//             className="w-full p-2 bg-[#222] rounded h-24"
//           />

//           <div className="flex justify-end gap-3 pt-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-600 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-[#26F2D0] text-black rounded font-semibold"
//             >
//               Submit
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default IdeaForm;

// import { useState } from "react";

// const IdeaForm = ({ onClose, onSubmit }) => {
//   const [form, setForm] = useState({
//     category: "Tech",
//     title: "",
//     description: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({
//       category: form.category,
//       title: form.title,
//       description: form.description
//     });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//       <div className="bg-[#111] w-full max-w-xl rounded-xl p-6 text-white">

//         <h2 className="text-xl font-bold mb-4">Post Your Idea</h2>

//         <form onSubmit={handleSubmit} className="space-y-3">

//           <select
//             name="category"
//             value={form.category}
//             onChange={handleChange}
//             className="w-full p-2 bg-[#222] rounded"
//           >
//             <option>Tech</option>
//             <option>Academic</option>
//             <option>Campus Pulse</option>
//             <option>Cultural</option>
//             <option>Others</option>
//           </select>

//           <input
//             name="title"
//             value={form.title}
//             placeholder="Idea Title"
//             onChange={handleChange}
//             required
//             className="w-full p-2 bg-[#222] rounded"
//           />

//           <textarea
//             name="description"
//             value={form.description}
//             placeholder="Describe your idea (max 300 chars)"
//             maxLength={300}
//             onChange={handleChange}
//             className="w-full p-2 bg-[#222] rounded h-24"
//           />

//           <div className="flex justify-end gap-3 pt-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-600 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-[#26F2D0] text-black rounded font-semibold"
//             >
//               Submit
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default IdeaForm;


// import { useState } from "react";

// const IdeaForm = ({ onClose, onSubmit }) => {
//   const [form, setForm] = useState({
//     category: "Tech",
//     title: "",
//     description: ""
//   });
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     if (error) setError(null); // ✅ clear error on typing
//   };

//  const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError(null);
//   setSubmitting(true);
//   try {
//     await onSubmit({
//       category: form.category,
//       title: form.title,
//       description: form.description
//     });
//     // ✅ onClose only called on success — handled inside onSubmit
//   } catch (err) {
//     // ✅ show warning inside form — don't close
//     setError(err.message);
//   } finally {
//     setSubmitting(false);
//   }
// };

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//       <div className="bg-[#111] w-full max-w-xl rounded-2xl p-6 text-white
//                       border border-white/10 shadow-xl">

//         <h2 className="text-xl font-bold mb-4">Post Your Idea</h2>

//         {/* ✅ error warning banner */}
//        {error && (
//   <div className="mb-4 flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/20
//                   rounded-xl px-4 py-3">
//     <span className="text-yellow-400 text-lg shrink-0">💡</span>
//     <div>
//       <p className="text-yellow-400 font-semibold text-sm">Similar Idea Already Exists</p>
//       <p className="text-yellow-300 text-xs mt-0.5">
//         An idea with this title has already been posted. Try a different title or explore existing ideas below.
//       </p>
//     </div>
//   </div>
// )}
//         <form onSubmit={handleSubmit} className="space-y-3">
//           <select
//             name="category"
//             value={form.category}
//             onChange={handleChange}
//             className="w-full p-2 bg-[#222] rounded-xl text-white outline-none
//                        border border-white/10 focus:border-[#26F2D0]/50 transition"
//           >
//             <option>Tech</option>
//             <option>Academic</option>
//             <option>Campus Pulse</option>
//             <option>Cultural</option>
//             <option>Others</option>
//           </select>

//          <div className="relative">
//   <input
//     name="title"
//     value={form.title}
//     placeholder="Idea Title (max 40 chars)"
//     onChange={handleChange}
//     maxLength={40}
//     required
//     className={`w-full p-2 pr-16 bg-[#222] rounded-xl text-white outline-none
//                border transition
//                ${error?.includes("title") || error?.includes("already")
//                  ? "border-red-500/50 focus:border-red-500"
//                  : "border-white/10 focus:border-[#26F2D0]/50"
//                }`}
//   />
//   <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs
//     ${form.title.length >= 35 ? "text-red-400" : "text-gray-500"}`}>
//     {form.title.length}/40
//   </span>
// </div>


//          <div className="relative">
//   <textarea
//     name="description"
//     value={form.description}
//     placeholder="Describe your idea — min 80, max 150 characters"
//     maxLength={150}
//     onChange={handleChange}
//     className="w-full p-2 pb-6 bg-[#222] rounded-xl h-24 text-white outline-none
//                border border-white/10 focus:border-[#26F2D0]/50 transition resize-none"
//   />
//   <span className={`absolute right-3 bottom-2 text-xs
//     ${form.description.length < 80 ? "text-yellow-400" :
//       form.description.length >= 140 ? "text-red-400" : "text-green-400"}`}>
//     {form.description.length}/150
//     {form.description.length < 80 && ` — need ${80 - form.description.length} more`}
//   </span>
// </div>


//           <div className="flex justify-end gap-3 pt-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-white/10 rounded-xl text-gray-300
//                          hover:bg-white/20 transition text-sm"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={submitting}
//               className="px-4 py-2 bg-[#26F2D0] text-black rounded-xl font-semibold
//                          hover:bg-[#1dd4b8] transition text-sm disabled:opacity-50"
//             >
//               {submitting ? "Posting..." : "Submit"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default IdeaForm;


// import { useState } from "react";

// const IdeaForm = ({ onClose, onSubmit }) => {
//   const [form, setForm] = useState({
//     category: "Tech",
//     title: "",
//     description: ""
//   });
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     if (error) setError(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     // ✅ min description check
//     if (form.description.length < 80) {
//       setError(`Description too short — need ${80 - form.description.length} more characters for a clear idea.`);
//       return;
//     }

//     setSubmitting(true);
//     try {
//       await onSubmit({
//         category: form.category,
//         title: form.title,
//         description: form.description
//       });
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const isDescTooShort = form.description.length < 80;
//   const isDescNearLimit = form.description.length >= 140;
//   const isTitleNearLimit = form.title.length >= 35;
//   const isDuplicateError = error?.toLowerCase().includes("already") || error?.toLowerCase().includes("title");
//   const isDescError = error?.toLowerCase().includes("description") || error?.toLowerCase().includes("short");

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//       <div className="bg-[#111] w-full max-w-xl rounded-2xl p-6 text-white
//                       border border-white/10 shadow-xl">

//         <h2 className="text-xl font-bold mb-4">Post Your Idea</h2>

//         {/* ✅ error banner — changes based on error type */}
//         {error && (
//           <div className={`mb-4 flex items-start gap-3 rounded-xl px-4 py-3 border
//             ${isDescError
//               ? "bg-orange-500/10 border-orange-500/20"
//               : "bg-yellow-500/10 border-yellow-500/20"
//             }`}>
//             <span className="text-lg shrink-0">
//               {isDescError ? "📝" : "💡"}
//             </span>
//             <div>
//               <p className={`font-semibold text-sm
//                 ${isDescError ? "text-orange-400" : "text-yellow-400"}`}>
//                 {isDescError ? "Description too short" : "Similar Idea Already Exists"}
//               </p>
//               <p className={`text-xs mt-0.5
//                 ${isDescError ? "text-orange-300" : "text-yellow-300"}`}>
//                 {error}
//               </p>
//             </div>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-3">

//           {/* Category */}
//           <select
//             name="category"
//             value={form.category}
//             onChange={handleChange}
//             className="w-full p-2 bg-[#222] rounded-xl text-white outline-none
//                        border border-white/10 focus:border-[#26F2D0]/50 transition"
//           >
//             <option>Tech</option>
//             <option>Academic</option>
//             <option>Campus Pulse</option>
//             <option>Cultural</option>
//             <option>Others</option>
//           </select>

//           {/* Title */}
//           <div className="relative">
//             <input
//               name="title"
//               value={form.title}
//               placeholder="Idea Title (max 40 chars)"
//               onChange={handleChange}
//               maxLength={40}
//               required
//               className={`w-full p-2 pr-16 bg-[#222] rounded-xl text-white outline-none
//                          border transition
//                          ${isDuplicateError
//                            ? "border-red-500/50 focus:border-red-500"
//                            : "border-white/10 focus:border-[#26F2D0]/50"
//                          }`}
//             />
//             <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs
//               ${isTitleNearLimit ? "text-red-400" : "text-gray-500"}`}>
//               {form.title.length}/40
//             </span>
//           </div>

//           {/* Description */}
//           <div className="relative">
//             <textarea
//               name="description"
//               value={form.description}
//               placeholder="Describe your idea — min 80, max 150 characters"
//               maxLength={150}
//               onChange={handleChange}
//               className={`w-full p-2 pb-6 bg-[#222] rounded-xl h-24 text-white outline-none
//                          border transition resize-none
//                          ${isDescError
//                            ? "border-orange-500/50 focus:border-orange-500"
//                            : "border-white/10 focus:border-[#26F2D0]/50"
//                          }`}
//             />
//             <span className={`absolute right-3 bottom-2 text-xs
//               ${isDescTooShort ? "text-yellow-400" :
//                 isDescNearLimit ? "text-red-400" : "text-green-400"}`}>
//               {form.description.length}/150
//               {isDescTooShort && ` — need ${80 - form.description.length} more`}
//             </span>
//           </div>

//           <div className="flex justify-end gap-3 pt-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-white/10 rounded-xl text-gray-300
//                          hover:bg-white/20 transition text-sm"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={submitting}
//               className="px-4 py-2 bg-[#26F2D0] text-black rounded-xl font-semibold
//                          hover:bg-[#1dd4b8] transition text-sm disabled:opacity-50"
//             >
//               {submitting ? "Posting..." : "Submit"}
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default IdeaForm;

// import { useState } from "react";
// import { Lightbulb, Target, Wrench, Users, Send, X, Eye } from "lucide-react";

// const IdeaForm = ({ onClose, onSubmit }) => {
//   const [form, setForm] = useState({ category: "Tech", title: "" });
//   const [fields, setFields] = useState({
//     what: "",
//     why: "",
//     how: "",
//     who: ""
//   });
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);

//   const maxTitle = 40;

//   const fieldConfig = [
//     {
//       key: "what",
//       icon: <Lightbulb size={14} className="text-yellow-400" />,
//       label: "What is the idea?",
//       placeholder: "Describe your idea clearly in 1-2 sentences...",
//       required: true,
//       min: 20,
//       max: 150,
//     },
//     {
//       key: "why",
//       icon: <Target size={14} className="text-red-400" />,
//       label: "Why does it matter?",
//       placeholder: "What problem does it solve? Who is affected?",
//       required: true,
//       min: 20,
//       max: 150,
//     },
//     {
//       key: "how",
//       icon: <Wrench size={14} className="text-blue-400" />,
//       label: "How can it be implemented?",
//       placeholder: "Resources, steps, or support needed... (optional)",
//       required: false,
//       min: 0,
//       max: 100,
//     },
//     {
//       key: "who",
//       icon: <Users size={14} className="text-green-400" />,
//       label: "Who would benefit?",
//       placeholder: "e.g. All students, CSE branch, hostel students... (optional)",
//       required: false,
//       min: 0,
//       max: 80,
//     },
//   ];

//   const buildDescription = () => {
//     const parts = [];
//     if (fields.what) parts.push(`What: ${fields.what.trim()}`);
//     if (fields.why)  parts.push(`Why: ${fields.why.trim()}`);
//     if (fields.how)  parts.push(`How: ${fields.how.trim()}`);
//     if (fields.who)  parts.push(`Who: ${fields.who.trim()}`);
//     return parts.join("\n\n");
//   };

//   const handleFieldChange = (key, value) => {
//     setFields(prev => ({ ...prev, [key]: value }));
//     if (error) setError(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     if (form.title.trim().length < 5) {
//       setError("Title too short — write a clear meaningful title.");
//       return;
//     }

//     if (fields.what.trim().length < 20) {
//       setError("'What is the idea?' needs at least 20 characters.");
//       return;
//     }

//     if (fields.why.trim().length < 20) {
//       setError("'Why does it matter?' needs at least 20 characters.");
//       return;
//     }

//     const description = buildDescription();

//     setSubmitting(true);
//     try {
//       await onSubmit({
//         category: form.category,
//         title: form.title.trim(),
//         description,
//       });
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const isTitleNearLimit = form.title.length >= 35;
//   const isDuplicateError = error?.toLowerCase().includes("already") ||
//                            error?.toLowerCase().includes("exists") ||
//                            error?.toLowerCase().includes("title");

//   const canSubmit = !submitting &&
//     form.title.trim().length >= 5 &&
//     fields.what.trim().length >= 20 &&
//     fields.why.trim().length >= 20;

//   const getCounterColor = (len, min, max) => {
//     if (len > max) return "text-red-400";
//     if (len > max * 0.85) return "text-orange-400";
//     if (len >= min && len > 0) return "text-green-400";
//     if (len > 0) return "text-yellow-400";
//     return "text-gray-500";
//   };

//   const getBorderColor = (len, min, max, hasError) => {
//     if (hasError) return "border-red-500/50 focus:border-red-500";
//     if (len > max) return "border-red-500/50 focus:border-red-500";
//     if (len >= min && len > 0) return "border-green-500/30 focus:border-green-500/50";
//     return "border-white/10 focus:border-[#26F2D0]/50";
//   };

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//       <div className="bg-[#111] w-full max-w-xl rounded-2xl p-6 text-white
//                       border border-white/10 shadow-xl max-h-[90vh] overflow-y-auto">

//         {/* Header */}
//         <div className="flex items-center justify-between mb-1">
//           <div className="flex items-center gap-2">
//             <Lightbulb size={20} className="text-[#26F2D0]" />
//             <h2 className="text-xl font-bold">Post Your Idea</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-white transition"
//           >
//             <X size={18} />
//           </button>
//         </div>
//         <p className="text-gray-500 text-xs mb-5">
//           Fill in the guided fields below for a clear, structured idea.
//         </p>

//         {/* Error banner */}
//         {error && (
//           <div className={`mb-4 flex items-start gap-3 rounded-xl px-4 py-3 border
//             ${isDuplicateError
//               ? "bg-yellow-500/10 border-yellow-500/20"
//               : "bg-orange-500/10 border-orange-500/20"
//             }`}>
//             <span className="shrink-0 mt-0.5">
//               {isDuplicateError
//                 ? <Lightbulb size={16} className="text-yellow-400" />
//                 : <Target size={16} className="text-orange-400" />
//               }
//             </span>
//             <div>
//               <p className={`font-semibold text-sm
//                 ${isDuplicateError ? "text-yellow-400" : "text-orange-400"}`}>
//                 {isDuplicateError ? "Similar Idea Already Exists" : "Fix before submitting"}
//               </p>
//               <p className={`text-xs mt-0.5
//                 ${isDuplicateError ? "text-yellow-300" : "text-orange-300"}`}>
//                 {error}
//               </p>
//             </div>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* Category */}
//           <div>
//             <label className="text-xs text-gray-500 mb-1 block">Category</label>
//             <select
//               value={form.category}
//               onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
//               className="w-full p-2 bg-[#222] rounded-xl text-white outline-none
//                          border border-white/10 focus:border-[#26F2D0]/50 transition"
//             >
//               <option>Tech</option>
//               <option>Academic</option>
//               <option>Campus Pulse</option>
//               <option>Cultural</option>
//               <option>Others</option>
//             </select>
//           </div>

//           {/* Title */}
//           <div>
//             <label className="text-xs text-gray-500 mb-1 block">Idea Title</label>
//             <div className="relative">
//               <input
//                 value={form.title}
//                 placeholder="Write a clear concise title..."
//                 onChange={e => {
//                   setForm(p => ({ ...p, title: e.target.value }));
//                   if (error) setError(null);
//                 }}
//                 maxLength={maxTitle}
//                 required
//                 className={`w-full p-2 pr-16 bg-[#222] rounded-xl text-white outline-none
//                            border transition
//                            ${isDuplicateError
//                              ? "border-red-500/50 focus:border-red-500"
//                              : isTitleNearLimit
//                                ? "border-orange-400/50 focus:border-orange-400"
//                                : "border-white/10 focus:border-[#26F2D0]/50"
//                            }`}
//               />
//               <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs
//                 ${isTitleNearLimit ? "text-red-400" : "text-gray-500"}`}>
//                 {form.title.length}/{maxTitle}
//               </span>
//             </div>
//           </div>

//           {/* Guided fields */}
//           {fieldConfig.map(({ key, icon, label, placeholder, required, min, max }) => {
//             const val = fields[key];
//             const counterColor = getCounterColor(val.length, min, max);
//             const borderColor = getBorderColor(val.length, min, max, false);
//             const isGood = val.length >= min && val.length > 0;

//             return (
//               <div key={key}>
//                 <label className="text-xs text-gray-400 mb-1 flex items-center gap-1.5">
//                   {icon}
//                   <span className="font-medium">{label}</span>
//                   {required
//                     ? <span className="text-red-400 text-xs">*</span>
//                     : <span className="text-gray-600 text-xs ml-1">optional</span>
//                   }
//                   {isGood && (
//                     <span className="text-green-400 ml-auto text-xs">✓</span>
//                   )}
//                 </label>
//                 <div className="relative">
//                   <textarea
//                     value={val}
//                     placeholder={placeholder}
//                     maxLength={max}
//                     onChange={e => handleFieldChange(key, e.target.value)}
//                     rows={2}
//                     className={`w-full p-2 pb-6 bg-[#222] rounded-xl text-white
//                                outline-none border transition resize-none text-sm
//                                ${borderColor}`}
//                   />
//                   <span className={`absolute right-3 bottom-2 text-xs ${counterColor}`}>
//                     {val.length}/{max}
//                     {required && val.length > 0 && val.length < min &&
//                       ` — ${min - val.length} more`
//                     }
//                   </span>
//                 </div>
//               </div>
//             );
//           })}

//           {/* Live preview */}
//           {(fields.what || fields.why) && (
//             <div className="bg-white/5 border border-white/10 rounded-xl p-4">
//               <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
//                 <Eye size={12} />
//                 <span>Preview — how it looks on the card</span>
//               </div>
//               <p className="text-xs text-gray-300 whitespace-pre-wrap leading-relaxed">
//                 {buildDescription()}
//               </p>
//             </div>
//           )}

//           {/* Actions */}
//           <div className="flex justify-end gap-3 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl
//                          text-gray-300 hover:bg-white/20 transition text-sm"
//             >
//               <X size={14} /> Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={!canSubmit}
//               className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold
//                           transition text-sm
//                           ${canSubmit
//                             ? "bg-[#26F2D0] text-black hover:bg-[#1dd4b8]"
//                             : "bg-white/10 text-gray-500 cursor-not-allowed"
//                           }`}
//             >
//               <Send size={14} />
//               {submitting ? "Posting..." : "Submit Idea"}
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default IdeaForm;




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
    setFields(prev => ({ ...prev, [key]: value }));
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
                  setForm(p => ({ ...p, title: e.target.value }));
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
