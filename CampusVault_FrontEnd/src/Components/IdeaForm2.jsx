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
// const handleSubmit = (e) => {
//   e.preventDefault();

//   const student = JSON.parse(localStorage.getItem("studentProfile"));

//   if (!student) {
//     alert("Please set up your profile first");
//     return;
//   }

//   const newIdea = {
//     name: student.name,
//     year: student.year,
//     branch: student.branch,
//     roll: student.roll,
//     category: form.category,
//     title: form.title,
//     description: form.description
//   };

//   onSubmit(newIdea);
//   onClose();
// };

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


import { useState } from "react";
import Comment from "./Comment";

export default function IdeaCard({ idea, student, ideas, setIdeas, onClose }) {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState(false);
  
  const ideaId = idea._id || idea.id; 

  const categoryStyles = {
    Tech: "bg-blue-500/20 text-blue-400",
    Academic: "bg-green-500/20 text-green-400 hover:bg-green-500/30",
    "Campus Pulse": "bg-red-500/20 text-red-400",
    Cultural: "bg-yellow-300/20 text-yellow-400",
  };

  // Compact card (normal view)
  const renderCompactCard = () => (
    <div 
      className="relative bg-[#111] p-6 rounded-xl border border-white/10 
                  transition-all duration-300 hover:scale-105 hover:border-[#26F2D0] hover:shadow-lg cursor-pointer"
      onClick={() => setShowModal(true)}
    >
      {/* Category */}
      <div className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full
        ${categoryStyles[idea.category] || "bg-gray-500/20 text-gray-400"}`}
      >
        {idea.category}
      </div>

      {/* Branch & Year */}
      <div className="absolute top-4 right-4 text-xs bg-[#1f2937] text-[#26F2D0] px-3 py-1 rounded-full">
        {idea.branch} · {idea.year}
      </div>

      <h3 className="font-bold mt-8 text-left">{idea.title}</h3>
      {/* <p className="text-gray-400 text-left">{idea.description}</p> */}
<div className="text-gray-400 text-left w-full mt-2">
  {idea.description.length > 75 ? (
    <div className="space-y-1 w-full">
      <p className="line-clamp-2 h-[3rem] overflow-hidden leading-relaxed mb-2 w-full">
        {idea.description}
      </p>
      <span 
        className="text-[#26F2D0] text-sm font-medium cursor-pointer hover:text-white transition-colors block"
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(true);
        }}
      >
        read more →
      </span>
    </div>
  ) : (
    <p className="leading-relaxed w-full">{idea.description}</p>
  )}
</div>

      <div className="border-t border-white/10 my-4"></div>

      <div className="flex justify-between text-sm text-gray-400">
        <span>by {idea.name}.</span>
        <div className="flex gap-6">
          <span>💬 {idea.comments?.length || 0}</span>
          <span>👍 {idea.likes || 0}</span>
        </div>
      </div>
    </div>
  );

  // Large modal popup
  const renderModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      {/* Modal Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShowModal(false)}
      />
      
      {/* Modal Content */}
<div className="relative bg-[#111] w-full max-w-2xl max-h-[90vh] overflow-y-auto 
                [&::-webkit-scrollbar]:hidden [-webkit-scrollbar-width]:none [-ms-overflow-style]:none
                scrollbar-hide rounded-2xl border-2 border-[#26F2D0]/50 shadow-2xl p-8 z-10">

        
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-6 right-6 text-[#26F2D0] hover:text-red-400 text-xl font-bold transition-all z-20"
        >
          ×
        </button>

        {/* Category */}
        <div className={`absolute top-6 left-6 text-sm font-semibold px-4 py-2 rounded-full
          ${categoryStyles[idea.category] || "bg-gray-500/20 text-gray-400"}`}
        >
          {idea.category}
        </div>

        {/* Branch & Year */}
        <div className="absolute top-6 right-20 text-sm bg-[#1f2937] text-[#26F2D0] px-4 py-2 rounded-full">
          {idea.branch} · {idea.year}
        </div>

<h2 className="font-bold text-2xl mt-16 mb-6 text-center leading-tight">{idea.title}</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-8">{idea.description}</p>

        <div className="border-t border-white/20 my-8"></div>

        {/* Stats */}
        <div className="flex justify-between text-lg text-gray-400 mb-8">
          <span className="font-medium">by {idea.name}</span>
          <div className="flex gap-8">
            <span>💬 {idea.comments?.length || 0} comments</span>
            <span>👍 {idea.likes || 0} likes</span>
          </div>
        </div>

        {/* Interactive Comments */}
        <div className="border-t border-white/10 pt-6">
          <Comment 
            idea={{ ...idea, _id: ideaId }} 
            student={student} 
            ideas={ideas} 
            setIdeas={setIdeas} 
          />
        </div>

        {/* Like Button */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <button
            onClick={async () => {
              const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}/like`, { method: "POST" });
              const updated = await res.json();
              setIdeas(ideas.map(i => (i._id || i.id) === (updated._id || updated.id) ? updated : i));
            }}
            className="bg-[#26F2D0]/20 hover:bg-[#26F2D0]/30 text-[#26F2D0] px-6 py-2 rounded-full font-medium transition-all"
          >
            👍 Likes ({idea.likes || 0})
          </button>
        </div>
      </div>
    </div>
  );

  return showModal ? renderModal() : renderCompactCard();
}