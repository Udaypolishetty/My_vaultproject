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


import { useState } from "react";

const IdeaForm = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    category: "Tech",
    title: "",
    description: ""
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // ✅ min description check
    if (form.description.length < 80) {
      setError(`Description too short — need ${80 - form.description.length} more characters for a clear idea.`);
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        category: form.category,
        title: form.title,
        description: form.description
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const isDescTooShort = form.description.length < 80;
  const isDescNearLimit = form.description.length >= 140;
  const isTitleNearLimit = form.title.length >= 35;
  const isDuplicateError = error?.toLowerCase().includes("already") || error?.toLowerCase().includes("title");
  const isDescError = error?.toLowerCase().includes("description") || error?.toLowerCase().includes("short");

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#111] w-full max-w-xl rounded-2xl p-6 text-white
                      border border-white/10 shadow-xl">

        <h2 className="text-xl font-bold mb-4">Post Your Idea</h2>

        {/* ✅ error banner — changes based on error type */}
        {error && (
          <div className={`mb-4 flex items-start gap-3 rounded-xl px-4 py-3 border
            ${isDescError
              ? "bg-orange-500/10 border-orange-500/20"
              : "bg-yellow-500/10 border-yellow-500/20"
            }`}>
            <span className="text-lg shrink-0">
              {isDescError ? "📝" : "💡"}
            </span>
            <div>
              <p className={`font-semibold text-sm
                ${isDescError ? "text-orange-400" : "text-yellow-400"}`}>
                {isDescError ? "Description too short" : "Similar Idea Already Exists"}
              </p>
              <p className={`text-xs mt-0.5
                ${isDescError ? "text-orange-300" : "text-yellow-300"}`}>
                {error}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Category */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 bg-[#222] rounded-xl text-white outline-none
                       border border-white/10 focus:border-[#26F2D0]/50 transition"
          >
            <option>Tech</option>
            <option>Academic</option>
            <option>Campus Pulse</option>
            <option>Cultural</option>
            <option>Others</option>
          </select>

          {/* Title */}
          <div className="relative">
            <input
              name="title"
              value={form.title}
              placeholder="Idea Title (max 40 chars)"
              onChange={handleChange}
              maxLength={40}
              required
              className={`w-full p-2 pr-16 bg-[#222] rounded-xl text-white outline-none
                         border transition
                         ${isDuplicateError
                           ? "border-red-500/50 focus:border-red-500"
                           : "border-white/10 focus:border-[#26F2D0]/50"
                         }`}
            />
            <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs
              ${isTitleNearLimit ? "text-red-400" : "text-gray-500"}`}>
              {form.title.length}/40
            </span>
          </div>

          {/* Description */}
          <div className="relative">
            <textarea
              name="description"
              value={form.description}
              placeholder="Describe your idea — min 80, max 150 characters"
              maxLength={150}
              onChange={handleChange}
              className={`w-full p-2 pb-6 bg-[#222] rounded-xl h-24 text-white outline-none
                         border transition resize-none
                         ${isDescError
                           ? "border-orange-500/50 focus:border-orange-500"
                           : "border-white/10 focus:border-[#26F2D0]/50"
                         }`}
            />
            <span className={`absolute right-3 bottom-2 text-xs
              ${isDescTooShort ? "text-yellow-400" :
                isDescNearLimit ? "text-red-400" : "text-green-400"}`}>
              {form.description.length}/150
              {isDescTooShort && ` — need ${80 - form.description.length} more`}
            </span>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/10 rounded-xl text-gray-300
                         hover:bg-white/20 transition text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-[#26F2D0] text-black rounded-xl font-semibold
                         hover:bg-[#1dd4b8] transition text-sm disabled:opacity-50"
            >
              {submitting ? "Posting..." : "Submit"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default IdeaForm;