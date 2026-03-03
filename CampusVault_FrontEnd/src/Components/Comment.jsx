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

import { useState } from "react";
import CommentItem from "./CommentItem";

export default function Comment({ idea, student, ideas, setIdeas }) {
  const [text, setText] = useState("");
  const ideaId = idea._id || idea.id;

  const submit = async () => {
    if (!text.trim()) return;

    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:8081/api/ideas/${ideaId}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ideaId: ideaId,
          comment: text,
        })
      }
    );

    const raw = await res.text();
    console.log("Response status:", res.status);
    console.log("Response body:", raw);

    if (!res.ok) return;

    const updated = JSON.parse(raw);
    // ✅ merge instead of replace
    setIdeas(
      ideas.map(i => {
        if ((i._id || i.id) === updated.id) {
          return {
            ...i,
            comments: updated.comments,
            likes: updated.likes,
            likedBy: updated.likedBy
          };
        }
        return i;
      })
    );
    setText("");
  };

  return (
    <div className="mt-4">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        className="w-full p-2 bg-[#222] rounded"
        placeholder="Write your response..."
      />

      <button
        onClick={submit}
        className="bg-[#26F2D0] text-black px-3 py-1 rounded mt-2"
      >
        Post
      </button>

      <div className="mt-4 space-y-3">
        {(idea.comments || []).map(c => (
          <CommentItem
            key={c.id || c.commentAt}
            comment={c}
            student={student}
            onDelete={async () => {
              const token = localStorage.getItem("token");
              const res = await fetch(
                `http://localhost:8081/api/ideas/${ideaId}/comment/${c.id}`,
                {
                  method: "DELETE",
                  headers: { "Authorization": `Bearer ${token}` }
                }
              );

              if (!res.ok) return;

              const updated = await res.json();
              setIdeas(
                ideas.map(i => {
                  if ((i._id || i.id) === updated.id) {
                    return {
                      ...i,
                      comments: updated.comments,
                      likes: updated.likes,
                      likedBy: updated.likedBy
                    };
                  }
                  return i;
                })
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}