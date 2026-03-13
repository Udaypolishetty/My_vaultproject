// import { useEffect, useState } from "react";
// import IdeaForm from "./IdeaForm";
// import IdeaCard from "./IdeaCard";
// import IdeaRulesModal from "./IdeaRulesModal";
// import IdeasHeader from "./IdeasHeader";
// import IdeasFilters from "./IdeasFilters";
// import IdeasLeaderboard from "./IdeasLeaderboard";

// export default function IdeasBoard() {
//   const token = sessionStorage.getItem("token");
//   const myId = sessionStorage.getItem("id");
//   const student = {
//     name: sessionStorage.getItem("name"),
//     rollNumber: sessionStorage.getItem("rollNumber"),
//     id: myId,
//     email: sessionStorage.getItem("Email"),
//   };
//   const cooldownKey = `lastIdeaPostedAt_${myId}`;

//   const [showForm, setShowForm] = useState(false);
//   const [ideas, setIdeas] = useState([]);
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [activeView, setActiveView] = useState("board");
//   const [postError, setPostError] = useState("");
//   const [showRules, setShowRules] = useState(false);

//   useEffect(() => {
//     if (!token || !myId) { window.location.href = "/"; return; }
//     fetch("http://localhost:8081/api/ideas")
//       .then(res => res.json())
//       .then(data => setIdeas(data))
//       .catch(err => console.error("Failed to fetch ideas:", err));
//   }, []);

//   useEffect(() => {
//     if (!myId || !token) return;
//     fetch("http://localhost:8081/api/ideas")
//       .then(res => res.json())
//       .then(data => {
//         const myRecent = data.find(idea => {
//           const isMe = String(idea.createdById) === String(myId);
//           if (!isMe) return false;
//           return new Date() - new Date(idea.createdAt) < 48 * 60 * 60 * 1000;
//         });
//         if (myRecent) {
//           localStorage.setItem(cooldownKey, myRecent.createdAt);
//           setPostError(`You can post another idea after 48 hours. Try again in ${getTimeRemaining(myRecent.createdAt)}.`);
//         } else {
//           localStorage.removeItem(cooldownKey);
//           setPostError("");
//         }
//       });
//   }, [myId]);

//   const getTimeRemaining = (fromDate) => {
//     if (!fromDate) return "";
//     const unlock = new Date(new Date(fromDate).getTime() + 48 * 60 * 60 * 1000);
//     const diff = unlock - new Date();
//     if (diff <= 0) return "";
//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     return `${hours}h ${minutes}m`;
//   };

//   const lastPostedAt = localStorage.getItem(cooldownKey);
//   const canPost = !lastPostedAt || new Date() - new Date(lastPostedAt) >= 48 * 60 * 60 * 1000;

//   const handlePostClick = () => {
//     if (!canPost) {
//       setPostError(`You can post another idea after 48 hours. Try again in ${getTimeRemaining(lastPostedAt)}.`);
//       return;
//     }
//     setPostError("");
//     setShowRules(true);
//   };

//   const filteredIdeas = ideas
//     .filter(i => activeFilter === "All" || i.category === activeFilter)
//     .sort((a, b) => {
//       const isMyA = String(a.createdById) === String(myId);
//       const isMyB = String(b.createdById) === String(myId);
//       if (isMyA && !isMyB) return -1;
//       if (!isMyA && isMyB) return 1;
//       const likesDiff = (b.likes || 0) - (a.likes || 0);
//       if (likesDiff !== 0) return likesDiff;
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     });

//   const leaderboard = [...ideas]
//     .sort((a, b) => {
//       const likesDiff = (b.likes || 0) - (a.likes || 0);
//       if (likesDiff !== 0) return likesDiff;
//       const commentsDiff = (b.comments?.length || 0) - (a.comments?.length || 0);
//       if (commentsDiff !== 0) return commentsDiff;
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     })
//     .slice(0, 10);

//   return (
//     <>
//       <IdeasHeader
//         activeView={activeView}
//         setActiveView={setActiveView}
//         canPost={canPost}
//         postError={postError}
//         onPostClick={handlePostClick}
//       />

//       {activeView === "leaderboard" && (
//         <IdeasLeaderboard leaderboard={leaderboard} myId={myId} />
//       )}

//       {activeView === "board" && (
//         <>
//           <IdeasFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 items-start">
//             {filteredIdeas.length === 0 ? (
//               <div className="col-span-3 flex flex-col items-center justify-center h-64 text-center">
//                 <p className="text-4xl mb-4">💡</p>
//                 <p className="text-white text-lg font-semibold">No ideas yet.</p>
//                 <p className="text-gray-400 text-sm mt-2 max-w-sm">
//                   Be the first to share an idea for campus wellbeing and student growth.
//                 </p>
//               </div>
//             ) : (
//               filteredIdeas.map(idea => (
//                 <IdeaCard
//                   key={idea.id}
//                   idea={idea}
//                   student={student}
//                   ideas={ideas}
//                   setIdeas={setIdeas}
//                   myId={myId}
//                 />
//               ))
//             )}
//           </div>
//         </>
//       )}

//       {showRules && (
//         <IdeaRulesModal
//           onClose={() => setShowRules(false)}
//           onContinue={() => { setShowRules(false); setShowForm(true); }}
//         />
//       )}

//       {showForm && (
//         <IdeaForm
//           student={student}
//           onClose={() => setShowForm(false)}
//           onSubmit={async (newIdea) => {
//             const res = await fetch("http://localhost:8081/api/ideas/create", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//               body: JSON.stringify(newIdea),
//             });
//             if (!res.ok) {
//               const errText = await res.text();
//               throw new Error(errText || "Failed to post idea");
//             }
//             const saved = await res.json();
//             const postedAt = saved.createdAt || new Date().toISOString();
//             localStorage.setItem(cooldownKey, postedAt);
//             setIdeas(prev => [{
//               ...saved,
//               createdByName: student?.name || saved.createdByName,
//               createdById: myId || saved.createdById,
//             }, ...prev]);
//             setShowForm(false);
//             setPostError(`Idea posted! You can post another after 48 hours. Next in ${getTimeRemaining(postedAt)}.`);
//           }}
//         />
//       )}
//     </>
//   );
// }



import { useEffect, useState } from "react";
import IdeaForm from "./IdeaForm";
import IdeaCard from "./IdeaCard";
import IdeaRulesModal from "./IdeaRulesModal";
import IdeasHeader from "./IdeasHeader";
import IdeasFilters from "./IdeasFilters";
import IdeasLeaderboard from "./IdeasLeaderboard";

export default function IdeasBoard() {
  const token = sessionStorage.getItem("token");
  const myId = sessionStorage.getItem("id");
  const student = {
    name: sessionStorage.getItem("name"),
    rollNumber: sessionStorage.getItem("rollNumber"),
    id: myId,
    email: sessionStorage.getItem("Email"),
  };
  const cooldownKey = `lastIdeaPostedAt_${myId}`;

  const [showForm, setShowForm] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeView, setActiveView] = useState("board");
  const [postError, setPostError] = useState("");
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    if (!token || !myId) { window.location.href = "/"; return; }
    fetch("http://localhost:8081/api/ideas")
      .then(res => res.json())
      .then(data => setIdeas(data))
      .catch(err => console.error("Failed to fetch ideas:", err));
  }, []);

  useEffect(() => {
    if (!myId || !token) return;
    fetch("http://localhost:8081/api/ideas")
      .then(res => res.json())
      .then(data => {
        const myRecent = data.find(idea => {
          const isMe = String(idea.createdById) === String(myId);
          if (!isMe) return false;
          return new Date() - new Date(idea.createdAt) < 48 * 60 * 60 * 1000;
        });
        if (myRecent) {
          localStorage.setItem(cooldownKey, myRecent.createdAt);
          setPostError(`You can post another idea after 48 hours. Try again in ${getTimeRemaining(myRecent.createdAt)}.`);
        } else {
          localStorage.removeItem(cooldownKey);
          setPostError("");
        }
      });
  }, [myId]);

  const getTimeRemaining = (fromDate) => {
    if (!fromDate) return "";
    const unlock = new Date(new Date(fromDate).getTime() + 48 * 60 * 60 * 1000);
    const diff = unlock - new Date();
    if (diff <= 0) return "";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const lastPostedAt = localStorage.getItem(cooldownKey);
  const canPost = !lastPostedAt || new Date() - new Date(lastPostedAt) >= 48 * 60 * 60 * 1000;

  const handlePostClick = () => {
    if (!canPost) {
      setPostError(`You can post another idea after 48 hours. Try again in ${getTimeRemaining(lastPostedAt)}.`);
      return;
    }
    setPostError("");
    setShowRules(true);
  };

  const filteredIdeas = ideas
    .filter(i => activeFilter === "All" || i.category === activeFilter)
    .sort((a, b) => {
      const isMyA = String(a.createdById) === String(myId);
      const isMyB = String(b.createdById) === String(myId);
      if (isMyA && !isMyB) return -1;
      if (!isMyA && isMyB) return 1;
      const likesDiff = (b.likes || 0) - (a.likes || 0);
      if (likesDiff !== 0) return likesDiff;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <>
      <IdeasHeader
        activeView={activeView}
        setActiveView={setActiveView}
        canPost={canPost}
        postError={postError}
        onPostClick={handlePostClick}
      />

      {/* ✅ Leaderboard fetches its own data independently */}
      {activeView === "leaderboard" && (
        <IdeasLeaderboard myId={myId} />
      )}

      {activeView === "board" && (
        <>
          <IdeasFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 items-start">
            {filteredIdeas.length === 0 ? (
              <div className="col-span-3 flex flex-col items-center justify-center h-64 text-center">
                <p className="text-4xl mb-4">💡</p>
                <p className="text-white text-lg font-semibold">No ideas yet.</p>
                <p className="text-gray-400 text-sm mt-2 max-w-sm">
                  Be the first to share an idea for campus wellbeing and student growth.
                </p>
              </div>
            ) : (
              filteredIdeas.map(idea => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  student={student}
                  ideas={ideas}
                  setIdeas={setIdeas}
                  myId={myId}
                />
              ))
            )}
          </div>
        </>
      )}

      {showRules && (
        <IdeaRulesModal
          onClose={() => setShowRules(false)}
          onContinue={() => { setShowRules(false); setShowForm(true); }}
        />
      )}

      {showForm && (
        <IdeaForm
          student={student}
          onClose={() => setShowForm(false)}
          onSubmit={async (newIdea) => {
            const res = await fetch("http://localhost:8081/api/ideas/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(newIdea),
            });
            if (!res.ok) {
              const errText = await res.text();
              throw new Error(errText || "Failed to post idea");
            }
            const saved = await res.json();
            const postedAt = saved.createdAt || new Date().toISOString();
            localStorage.setItem(cooldownKey, postedAt);
            setIdeas(prev => [{
              ...saved,
              createdByName: student?.name || saved.createdByName,
              createdById: myId || saved.createdById,
            }, ...prev]);
            setShowForm(false);
            setPostError(`Idea posted! You can post another after 48 hours. Next in ${getTimeRemaining(postedAt)}.`);
          }}
        />
      )}
    </>
  );
}