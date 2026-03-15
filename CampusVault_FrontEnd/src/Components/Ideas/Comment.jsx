// import { useState } from "react";
// import CommentItem from "./CommentItem";

// export default function Comment({ idea, student, ideas, setIdeas }) {
//   const [text, setText] = useState("");
//   const ideaId = idea._id || idea.id;
  

//   const submit = async () => {
//     if (!text.trim()) return;

//     const res = await fetch(
//       `http://localhost:8081/api/ideas/${ideaId}/comment`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           text,
//           name: student.name,
//           year: student.year,
//           branch: student.branch
//         })
//       }
//     );

//     const updated = await res.json();
//     // setIdeas(ideas.map(i => (i._id === updated._id ? updated : i)));
//       setIdeas(
//       ideas.map(i =>
//         (i._id || i.id) === (updated._id || updated.id)
//           ? updated
//           : i
//       )
//     );

//     setText("");
//   };

//   return (
//     <div className="mt-4">
//       <textarea
//         value={text}
//         onChange={e => setText(e.target.value)}
//         className="w-full p-2 bg-[#222] rounded"
//         placeholder="Write your response..."
//       />

//       <button
//         onClick={submit}
//         className="bg-[#26F2D0] text-black px-3 py-1 rounded mt-2"
//       >
//         Post
//       </button>

//       {/* <div className="mt-4 space-y-3">
//         {(idea.comments || []).map(c => (
//           <CommentItem
//             key={c._id || c.createdAt}
//             comment={c}
//             student={student}
//             ideaId={idea._id}
//             ideas={ideas}
//             setIdeas={setIdeas}
//           />
//         ))}
//       </div> */}

//       <div className="mt-4 space-y-3">
//   {(idea.comments || []).map(c => (
//     <CommentItem
//       key={c.id || c.createdAt}
//       comment={c}
//       student={student}
//       onDelete={async () => {
//         const res = await fetch(
//           `http://localhost:8081/api/ideas/${ideaId}/comment/${c.createdAt}`,
//           { method: "DELETE" }
//         );

//         const updated = await res.json();

//         setIdeas(
//           ideas.map(i =>
//             (i._id || i.id) === (updated._id || updated.id)
//               ? updated
//               : i
//           )
//         );
//       }}
      
//     />
    
//   ))}
// </div>

//     </div>
//   );
// }

// import { useState } from "react";
// import CommentItem from "./CommentItem";

// export default function Comment({ idea, student, ideas, setIdeas }) {
//   const [text, setText] = useState("");
//   const ideaId = idea._id || idea.id;

//   const submit = async () => {
//     if (!text.trim()) return;

//     const token = localStorage.getItem("token");

//     const res = await fetch(
//       `http://localhost:8081/api/ideas/${ideaId}/comment`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           ideaId: ideaId,
//           comment: text,
//         })
//       }
//     );

//     const raw = await res.text();
//     console.log("Response status:", res.status);
//     console.log("Response body:", raw);

//     if (!res.ok) return;

//     const updated = JSON.parse(raw);
//     // ✅ merge instead of replace
//     setIdeas(
//       ideas.map(i => {
//         if ((i._id || i.id) === updated.id) {
//           return {
//             ...i,
//             comments: updated.comments,
//             likes: updated.likes,
//             likedBy: updated.likedBy
//           };
//         }
//         return i;
//       })
//     );
//     setText("");
//   };

//   return (
//     <div className="mt-4">
//       <textarea
//         value={text}
//         onChange={e => setText(e.target.value)}
//         className="w-full p-2 bg-[#222] rounded"
//         placeholder="Write your response..."
//       />

//       <button
//         onClick={submit}
//         className="bg-[#26F2D0] text-black px-3 py-1 rounded mt-2"
//       >
//         Post
//       </button>

//       <div className="mt-4 space-y-3">
//         {(idea.comments || []).map(c => (
//           <CommentItem
//             key={c.id || c.commentAt}
//             comment={c}
//             student={student}
//             onDelete={async () => {
//               const token = localStorage.getItem("token");
//               const res = await fetch(
//                 `http://localhost:8081/api/ideas/${ideaId}/comment/${c.id}`,
//                 {
//                   method: "DELETE",
//                   headers: { "Authorization": `Bearer ${token}` }
//                 }
//               );

//               if (!res.ok) return;

//               const updated = await res.json();
//               setIdeas(
//                 ideas.map(i => {
//                   if ((i._id || i.id) === updated.id) {
//                     return {
//                       ...i,
//                       comments: updated.comments,
//                       likes: updated.likes,
//                       likedBy: updated.likedBy
//                     };
//                   }
//                   return i;
//                 })
//               );
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

//new ,allu


// import { useState } from "react";
// import CommentItem from "./CommentItem";

// export default function Comment({ idea, student, ideas, setIdeas }) {
//   const [text, setText] = useState("");
//   const [error, setError] = useState("");

//   const ideaId = idea.id;
// const token = sessionStorage.getItem("token");

//   const alreadyCommented = (idea.comments || []).some(
//     c => c.ownerRoll === student?.rollNumber
//   );

//   const submit = async () => {
//     if (!text.trim() || alreadyCommented) return;

//     setError(""); // clear any previous error

//     const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}/comment`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ comment: text.trim() })
//     });

//     if (res.status === 403) {
//       setError("You have already commented on this idea.");
//       return;
//     }

//     if (!res.ok) {
//       setError("Something went wrong. Please try again.");
//       return;
//     }

//     const updated = await res.json();
//     setIdeas(prev => prev.map(i =>
//       i.id === updated.id
//         ? { ...i, comments: updated.comments, likes: updated.likes, likedBy: updated.likedBy }
//         : i
//     ));
//     setText("");
//   };

//   return (
//     <div className="mt-4">
//       {alreadyCommented ? (
//         <div className="w-full p-3 bg-[#1b1b1b] rounded text-gray-500 text-sm text-center">
//           ✅ You have already posted a response to this idea
//         </div>
//       ) : (
//         <>
//           <textarea
//             value={text}
//             onChange={e => {
//               setText(e.target.value);
//               if (error) setError(""); // clear error when user starts typing
//             }}
//             className={`w-full p-2 bg-[#222] rounded resize-none border ${
//               error ? "border-red-500/60" : "border-transparent"
//             } focus:outline-none transition-colors`}
//             placeholder="Write your response..."
//             rows={3}
//           />

//           {/* ✅ Inline error message below textarea */}
//           {error && (
//             <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
//               ⚠️ {error}
//             </p>
//           )}

//           <button
//             onClick={submit}
//             disabled={!text.trim()}
//             className={`px-4 py-2 rounded mt-2 font-semibold transition-all ${
//               text.trim()
//                 ? "bg-[#26F2D0] text-black hover:bg-[#1fd4b8]"
//                 : "bg-[#26F2D0]/30 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             Post Response
//           </button>
//         </>
//       )}

//       <div className="mt-4 space-y-3">
//         {(idea.comments || []).length === 0 ? (
//           <div className="text-center py-6 text-gray-500 text-sm">
//             <p className="text-2xl mb-2">💬</p>
//             <p>No responses yet. Be the first to share your thoughts!</p>
//           </div>
//         ) : (
//           (idea.comments || []).map((c, index) => (
//             <CommentItem
//               key={c.id || index}
//               comment={c}
//               student={student}
//               onDelete={async () => {
//                 const res = await fetch(
//                   `http://localhost:8081/api/ideas/${ideaId}/comment/${c.id}`,
//                   {
//                     method: "DELETE",
//                     headers: { Authorization: `Bearer ${token}` },
//                   }
//                 );
//                 if (!res.ok) return;
//                 const updated = await res.json();
//                 setIdeas(prev => prev.map(i =>
//                   i.id === updated.id
//                     ? { ...i, comments: updated.comments }
//                     : i
//                 ));
//               }}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import CommentItem from "./CommentItem";
import { validateShortText } from "../../utils/validate";

export default function Comment({ idea, student, ideas, setIdeas }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const ideaId = idea.id;
  const token = sessionStorage.getItem("token");

  const alreadyCommented = (idea.comments || []).some(
    c => c.ownerRoll === student?.rollNumber
  );

  const submit = async () => {
    if (!text.trim() || alreadyCommented) return;

    // ✅ validate comment text
    const result = validateShortText(text, 300, "Comment");
    if (!result.valid) {
      setError(result.error);
      return;
    }

    setError("");

    const res = await fetch(`http://localhost:8081/api/ideas/${ideaId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment: text.trim() })
    });

    if (res.status === 403) {
      setError("You have already commented on this idea.");
      return;
    }

    if (!res.ok) {
      setError("Something went wrong. Please try again.");
      return;
    }

    const updated = await res.json();
    setIdeas(prev => prev.map(i =>
      i.id === updated.id
        ? { ...i, comments: updated.comments, likes: updated.likes, likedBy: updated.likedBy }
        : i
    ));
    setText("");
  };

  return (
    <div className="mt-4">
      {alreadyCommented ? (
        <div className="w-full p-3 bg-[#1b1b1b] rounded text-gray-500 text-sm text-center">
          ✅ You have already posted a response to this idea
        </div>
      ) : (
        <>
          <textarea
            value={text}
            onChange={e => {
              setText(e.target.value);
              if (error) setError("");
            }}
            className={`w-full p-2 bg-[#222] rounded resize-none border
              ${error ? "border-red-500/60" : "border-transparent"}
              focus:outline-none transition-colors`}
            placeholder="Write your response..."
            rows={3}
            maxLength={300}
          />

          {/* char count + error */}
          <div className="flex items-center justify-between mt-1">
            {error
              ? <p className="text-red-400 text-xs flex items-center gap-1">⚠️ {error}</p>
              : <span />
            }
            <p className={`text-xs ml-auto ${text.length > 270 ? "text-red-400" : "text-gray-600"}`}>
              {text.length}/300
            </p>
          </div>

          <button
            onClick={submit}
            disabled={!text.trim()}
            className={`px-4 py-2 rounded mt-2 font-semibold transition-all ${
              text.trim()
                ? "bg-[#26F2D0] text-black hover:bg-[#1fd4b8]"
                : "bg-[#26F2D0]/30 text-gray-500 cursor-not-allowed"
            }`}
          >
            Post Response
          </button>
        </>
      )}

      <div className="mt-4 space-y-3">
        {(idea.comments || []).length === 0 ? (
          <div className="text-center py-6 text-gray-500 text-sm">
            <p className="text-2xl mb-2">💬</p>
            <p>No responses yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          (idea.comments || []).map((c, index) => (
            <CommentItem
              key={c.id || index}
              comment={c}
              student={student}
              onDelete={async () => {
                const res = await fetch(
                  `http://localhost:8081/api/ideas/${ideaId}/comment/${c.id}`,
                  {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
                if (!res.ok) return;
                const updated = await res.json();
                setIdeas(prev => prev.map(i =>
                  i.id === updated.id
                    ? { ...i, comments: updated.comments }
                    : i
                ));
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}