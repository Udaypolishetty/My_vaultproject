// import { useState } from "react";
// import { Send } from "lucide-react";

// const TAG_CONFIG = {
//   STUDY_GROUP: { label: "Study Group", emoji: "📚", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
//   LOST_FOUND:  { label: "Lost & Found", emoji: "🔍", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
//   OPPORTUNITY: { label: "Opportunity",  emoji: "💼", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
//   EVENT:       { label: "Event",        emoji: "🎉", color: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
//   GENERAL:     { label: "General",      emoji: "💬", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
// };

// const VISIBILITY_CONFIG = [
//   { value: "EVERYONE",       label: "🌐 Everyone" },
//   { value: "MY_YEAR",        label: "🎓 My Year" },
//   { value: "MY_BRANCH",      label: "🏛️ My Branch" },
//   { value: "MY_YEAR_BRANCH", label: "🎯 My Year & Branch" },
// ];

// export default function BuzzComposer({ token, onPost }) {
//   const [content, setContent] = useState("");
//   const [tag, setTag] = useState("GENERAL");
//   const [visibility, setVisibility] = useState("EVERYONE");
//   const [posting, setPosting] = useState(false);

//   const handlePost = async () => {
//     if (!content.trim() || posting) return;
//     setPosting(true);
//     try {
//       const res = await fetch("http://localhost:8081/api/buzz/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ content, tag, visibility }),
//       });
//       if (!res.ok) return;
//       const newPost = await res.json();
//       onPost(newPost);
//       setContent("");
//       setVisibility("EVERYONE");
//       setTag("GENERAL");
//     } finally {
//       setPosting(false);
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-[#111] to-[#0d0d0d] border border-white/10
//                     rounded-2xl p-5 mb-4 shadow-lg">
//       <div className="flex items-start gap-3">
//         <div className="w-10 h-10 rounded-full bg-[#26F2D0]/20 border border-[#26F2D0]/30
//                         flex items-center justify-center text-[#26F2D0] font-bold text-sm shrink-0">
//           {sessionStorage.getItem("name")?.[0]?.toUpperCase() || "?"}
//         </div>
//         <div className="flex-1">
//           <textarea
//             value={content}
//             onChange={e => setContent(e.target.value)}
//             placeholder="What's on your mind? Share with campus..."
//             maxLength={280}
//             rows={3}
//             className="w-full bg-[#1a1a1a] text-white placeholder-gray-500 text-sm
//                        resize-none outline-none leading-relaxed rounded-xl p-3
//                        border border-white/10 focus:border-[#26F2D0]/50 transition"
//           />

//           {/* Tag selector */}
//           <div className="mt-3">
//             <p className="text-xs text-gray-500 mb-2">Category</p>
//             <div className="flex gap-2 flex-wrap">
//               {Object.entries(TAG_CONFIG).map(([key, val]) => (
//                 <button key={key} onClick={() => setTag(key)}
//                   className={`text-xs px-3 py-1 rounded-full border transition-all
//                     ${tag === key ? val.color + " font-semibold" : "border-white/10 text-gray-500 hover:border-white/30"}`}>
//                   {val.emoji} {val.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="border-t border-white/10 my-3" />

//           {/* Visibility selector */}
//           <div>
//             <p className="text-xs text-gray-500 mb-2">👁️ Who can see this?</p>
//             <div className="flex gap-2 flex-wrap">
//               {VISIBILITY_CONFIG.map(opt => (
//                 <button key={opt.value} onClick={() => setVisibility(opt.value)}
//                   className={`text-xs px-3 py-1 rounded-full border transition-all
//                     ${visibility === opt.value
//                       ? "bg-[#26F2D0]/20 text-[#26F2D0] border-[#26F2D0]/30"
//                       : "border-white/10 text-gray-500 hover:border-white/30"}`}>
//                   {opt.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="flex items-center justify-end gap-3 mt-3">
//             <span className={`text-xs ${content.length > 250 ? "text-red-400" : "text-gray-500"}`}>
//               {content.length}/280
//             </span>
//             <button onClick={handlePost} disabled={!content.trim() || posting}
//               className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold
//                          bg-[#26F2D0] text-black hover:bg-[#1dd4b8] transition
//                          disabled:opacity-40 disabled:cursor-not-allowed">
//               <Send size={13} />
//               {posting ? "Posting..." : "Post"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export { TAG_CONFIG };



import { useState } from "react";
import { Send } from "lucide-react";
import { validateBuzzContent } from "../../utils/validate"; // ✅ IMPORTED

const TAG_CONFIG = {
  STUDY_GROUP: { label: "Study Group", emoji: "📚", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  LOST_FOUND:  { label: "Lost & Found", emoji: "🔍", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  OPPORTUNITY: { label: "Opportunity",  emoji: "💼", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  EVENT:       { label: "Event",        emoji: "🎉", color: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
  GENERAL:     { label: "General",      emoji: "💬", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
};

const VISIBILITY_CONFIG = [
  { value: "EVERYONE",       label: "🌐 Everyone" },
  { value: "MY_YEAR",        label: "🎓 My Year" },
  { value: "MY_BRANCH",      label: "🏛️ My Branch" },
  { value: "MY_YEAR_BRANCH", label: "🎯 My Year & Branch" },
];

export default function BuzzComposer({ token, onPost }) {
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("GENERAL");
  const [visibility, setVisibility] = useState("EVERYONE");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(""); // ✅ ADDED

  const handlePost = async () => {
    if (posting) return;
    
    // ✅ INTEGRATED VALIDATION
    const result = validateBuzzContent(content);
    if (!result.valid) {
      setError(result.error);
      return;
    }
    
    setPosting(true);
    setError(""); // ✅ clear previous errors
    try {
      const res = await fetch("http://localhost:8081/api/buzz/create", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content, tag, visibility }),
      });
      if (!res.ok) return;
      const newPost = await res.json();
      onPost(newPost);
      setContent("");
      setVisibility("EVERYONE");
      setTag("GENERAL");
    } catch (err) {
      setError("Failed to post. Please try again.");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#111] to-[#0d0d0d] border border-white/10
                    rounded-2xl p-5 mb-4 shadow-lg">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-[#26F2D0]/20 border border-[#26F2D0]/30
                        flex items-center justify-center text-[#26F2D0] font-bold text-sm shrink-0">
          {sessionStorage.getItem("name")?.[0]?.toUpperCase() || "?"}
        </div>
        <div className="flex-1">
          <textarea
            value={content}
            onChange={e => {
              setContent(e.target.value);
              if (error) setError(""); // ✅ clear error on typing
            }}
            placeholder="What's on your mind? Share with campus..."
            maxLength={280}
            rows={3}
            className={`w-full bg-[#1a1a1a] text-white placeholder-gray-500 text-sm
                       resize-none outline-none leading-relaxed rounded-xl p-3
                       border transition
                       ${error ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#26F2D0]/50"}`}
          />

          {/* ✅ ADDED: Error message */}
          {error && (
            <p className="text-xs text-red-400 flex items-center gap-1 mt-2 pl-3">
              ⚠️ {error}
            </p>
          )}

          {/* Tag selector */}
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-2">Category</p>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(TAG_CONFIG).map(([key, val]) => (
                <button key={key} onClick={() => setTag(key)}
                  className={`text-xs px-3 py-1 rounded-full border transition-all
                  ${tag === key ? val.color + " font-semibold" : "border-white/10 text-gray-500 hover:border-white/30"}`}>
                  {val.emoji} {val.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 my-3" />

          {/* Visibility selector */}
          <div>
            <p className="text-xs text-gray-500 mb-2">👁️ Who can see this?</p>
            <div className="flex gap-2 flex-wrap">
              {VISIBILITY_CONFIG.map(opt => (
                <button key={opt.value} onClick={() => setVisibility(opt.value)}
                  className={`text-xs px-3 py-1 rounded-full border transition-all
                  ${visibility === opt.value
                    ? "bg-[#26F2D0]/20 text-[#26F2D0] border-[#26F2D0]/30"
                    : "border-white/10 text-gray-500 hover:border-white/30"}`}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-3">
            <span className={`text-xs ${content.length > 250 ? "text-red-400" : "text-gray-500"}`}>
              {content.length}/280
            </span>
            <button onClick={handlePost} disabled={posting}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold
                         bg-[#26F2D0] text-black hover:bg-[#1dd4b8] transition
                         disabled:opacity-40 disabled:cursor-not-allowed">
              <Send size={13} />
              {posting ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { TAG_CONFIG };
