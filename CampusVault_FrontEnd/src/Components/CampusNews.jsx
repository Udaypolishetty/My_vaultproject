// import { useEffect, useState } from "react";

// const NEWS_API_KEY = "YOUR_NEWS_API_KEY"; // ✅ get free key from newsapi.org

// export default function CampusNews() {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetch(
//       `https://newsapi.org/v2/everything?q=college+campus+india+students&language=en&sortBy=publishedAt&pageSize=12&apiKey=${NEWS_API_KEY}`
//     )
//       .then(res => res.json())
//       .then(data => {
//         if (data.articles) {
//           setNews(data.articles.filter(a => a.title !== "[Removed]"));
//         } else {
//           setError("Could not load news.");
//         }
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to fetch news.");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return (
//     <div className="flex items-center justify-center h-64">
//       <p className="text-gray-400 text-lg">Loading campus news...</p>
//     </div>
//   );

//   if (error) return (
//     <div className="flex items-center justify-center h-64">
//       <p className="text-red-400">{error}</p>
//     </div>
//   );

//   return (
//     <div className="w-full bg-[#0f0f0f] text-white pb-10">
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {news.map((article, i) => (
          
//             key={i}
//             href={article.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="bg-[#111] border border-white/10 rounded-xl overflow-hidden
//                        hover:border-[#26F2D0]/40 hover:shadow-[0_0_20px_rgba(38,242,208,0.1)]
//                        transition-all duration-300 group"
//           >
//             {article.urlToImage && (
//               <img
//                 src={article.urlToImage}
//                 alt={article.title}
//                 className="w-full h-40 object-cover group-hover:opacity-90 transition"
//                 onError={(e) => e.target.style.display = "none"}
//               />
//             )}
//             <div className="p-4">
//               <p className="text-[#26F2D0] text-xs mb-2">
//                 {article.source?.name} • {new Date(article.publishedAt).toLocaleDateString()}
//               </p>
//               <h3 className="font-semibold text-white text-sm leading-snug mb-2 line-clamp-2">
//                 {article.title}
//               </h3>
//               <p className="text-gray-400 text-xs line-clamp-2">
//                 {article.description}
//               </p>
//               <p className="text-[#26F2D0] text-xs mt-3 font-medium">Read more →</p>
//             </div>
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";

// export default function CampusNews() {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const categoryStyles = {
//     General: "bg-blue-500/20 text-blue-400",
//     Event: "bg-purple-500/20 text-purple-400",
//     Academic: "bg-green-500/20 text-green-400",
//     Notice: "bg-yellow-500/20 text-yellow-400",
//   };

//   const timeAgo = (timestamp) => {
//     const seconds = Math.floor((Date.now() - timestamp) / 1000);
//     if (seconds < 60) return "Just now";
//     if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
//     if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
//     return `${Math.floor(seconds / 86400)}d ago`;
//   };

//   useEffect(() => {
//     fetch("http://localhost:8081/api/announcements")
//       .then(res => res.json())
//       .then(data => { setNews(data); setLoading(false); })
//       .catch(() => setLoading(false));
//   }, []);

//   if (loading) return (
//     <div className="flex items-center justify-center h-64">
//       <p className="text-gray-400 text-lg">Loading campus news...</p>
//     </div>
//   );

//   if (news.length === 0) return (
//     <div className="flex flex-col items-center justify-center h-64 text-center">
//       <p className="text-4xl mb-4">📢</p>
//       <p className="text-gray-400 text-lg">No announcements yet.</p>
//       <p className="text-gray-500 text-sm mt-1">Check back later!</p>
//     </div>
//   );

//   return (
//     <div className="w-full bg-[#0f0f0f] text-white pb-10">

//       {/* ✅ Featured first item — big card */}
//       {news[0] && (
//         <div className="mb-8 rounded-2xl overflow-hidden border border-white/10
//                         hover:border-[#26F2D0]/40 hover:shadow-[0_0_30px_rgba(38,242,208,0.1)]
//                         transition-all duration-300">
//           {news[0].imageUrl ? (
//             <div className="relative h-64 md:h-80">
//               <img src={news[0].imageUrl} className="w-full h-full object-cover" />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
//               <div className="absolute bottom-0 left-0 p-6">
//                 <span className={`text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block
//                   ${categoryStyles[news[0].category] || "bg-gray-500/20 text-gray-400"}`}>
//                   {news[0].category}
//                 </span>
//                 <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">{news[0].title}</h2>
//                 <p className="text-gray-300 text-sm mt-2 line-clamp-2">{news[0].content}</p>
//                 <div className="flex items-center gap-4 mt-3 text-gray-400 text-xs">
//                   <span>Posted by {news[0].postedBy}</span>
//                   <span>{timeAgo(news[0].timestamp)}</span>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="bg-[#111] p-8">
//               <span className={`text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block
//                 ${categoryStyles[news[0].category] || "bg-gray-500/20 text-gray-400"}`}>
//                 {news[0].category}
//               </span>
//               <h2 className="text-2xl font-bold text-white mt-2">{news[0].title}</h2>
//               <p className="text-gray-300 mt-2">{news[0].content}</p>
//               <div className="flex items-center gap-4 mt-4 text-gray-400 text-xs">
//                 <span>Posted by {news[0].postedBy}</span>
//                 <span>{timeAgo(news[0].timestamp)}</span>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* ✅ Rest of items — 3 column grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {news.slice(1).map((item) => (
//           <div
//             key={item.id}
//             className="bg-[#111] border border-white/10 rounded-xl overflow-hidden
//                        hover:border-[#26F2D0]/40 hover:shadow-[0_0_20px_rgba(38,242,208,0.1)]
//                        transition-all duration-300"
//           >
//             {item.imageUrl && (
//               <img src={item.imageUrl} className="w-full h-48 object-cover" />
//             )}
//             <div className="p-5">
//               <div className="flex items-center justify-between mb-3">
//                 <span className={`text-xs font-semibold px-3 py-1 rounded-full
//                   ${categoryStyles[item.category] || "bg-gray-500/20 text-gray-400"}`}>
//                   {item.category}
//                 </span>
//                 <span className="text-gray-500 text-xs">{timeAgo(item.timestamp)}</span>
//               </div>
//               <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
//               <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{item.content}</p>
//               <p className="text-gray-600 text-xs mt-4">Posted by {item.postedBy}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { Trash2 } from "lucide-react";

// export default function CampusNews() {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = sessionStorage.getItem("token");
//   const role = sessionStorage.getItem("role");
//   const name = sessionStorage.getItem("name");

//   const isAdmin = role === "ADMIN";
//   const isModerator = role === "MODERATOR";
//   const myPostedBy = name + " (Moderator)";

//   const canDelete = (item) => {
//     if (isAdmin) return true;
//     if (isModerator && item.postedBy === myPostedBy) return true;
//     return false;
//   };

//   const categoryStyles = {
//     General: "bg-blue-500/20 text-blue-400",
//     Event: "bg-purple-500/20 text-purple-400",
//     Academic: "bg-green-500/20 text-green-400",
//     Notice: "bg-yellow-500/20 text-yellow-400",
//   };

//   const timeAgo = (timestamp) => {
//     const seconds = Math.floor((Date.now() - timestamp) / 1000);
//     if (seconds < 60) return "Just now";
//     if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
//     if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
//     return `${Math.floor(seconds / 86400)}d ago`;
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this announcement?")) return;
//     const res = await fetch(`http://localhost:8081/api/announcements/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     if (res.ok) setNews(prev => prev.filter(n => n.id !== id));
//   };

//   useEffect(() => {
//     fetch("http://localhost:8081/api/announcements")
//       .then(res => res.json())
//       .then(data => { setNews(data); setLoading(false); })
//       .catch(() => setLoading(false));
//   }, []);

//   if (loading) return (
//     <div className="flex items-center justify-center h-64">
//       <p className="text-gray-400 text-lg">Loading campus news...</p>
//     </div>
//   );

//   if (news.length === 0) return (
//     <div className="flex flex-col items-center justify-center h-64 text-center">
//       <p className="text-4xl mb-4">📢</p>
//       <p className="text-gray-400 text-lg">No announcements yet.</p>
//       <p className="text-gray-500 text-sm mt-1">Check back later!</p>
//     </div>
//   );

//   return (
//     <div className="w-full bg-[#0f0f0f] text-white pb-10">

//       {/* ✅ Featured first item */}
//       {news[0] && (
//         <div className="mb-8 rounded-2xl overflow-hidden border border-white/10
//                         hover:border-[#26F2D0]/40 hover:shadow-[0_0_30px_rgba(38,242,208,0.1)]
//                         transition-all duration-300 relative">

//           {/* ✅ delete button for featured */}
//           {canDelete(news[0]) && (
//             <button
//               onClick={() => handleDelete(news[0].id)}
//               className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full
//                          bg-black/60 border border-white/20 flex items-center justify-center
//                          text-gray-400 hover:text-red-400 hover:bg-red-400/20 transition-all"
//             >
//               <Trash2 size={14} />
//             </button>
//           )}

//           {news[0].imageUrl ? (
//             <div className="relative h-64 md:h-80">
//               <img src={news[0].imageUrl} className="w-full h-full object-cover" />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
//               <div className="absolute bottom-0 left-0 p-6">
//                 <span className={`text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block
//                   ${categoryStyles[news[0].category] || "bg-gray-500/20 text-gray-400"}`}>
//                   {news[0].category}
//                 </span>
//                 <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">{news[0].title}</h2>
//                 <p className="text-gray-300 text-sm mt-2 line-clamp-2">{news[0].content}</p>
//                 <div className="flex items-center gap-4 mt-3 text-gray-400 text-xs">
//                   <span>Posted by {news[0].postedBy}</span>
//                   <span>{timeAgo(news[0].timestamp)}</span>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="bg-[#111] p-8">
//               <span className={`text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block
//                 ${categoryStyles[news[0].category] || "bg-gray-500/20 text-gray-400"}`}>
//                 {news[0].category}
//               </span>
//               <h2 className="text-2xl font-bold text-white mt-2">{news[0].title}</h2>
//               <p className="text-gray-300 mt-2">{news[0].content}</p>
//               <div className="flex items-center gap-4 mt-4 text-gray-400 text-xs">
//                 <span>Posted by {news[0].postedBy}</span>
//                 <span>{timeAgo(news[0].timestamp)}</span>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* ✅ Rest of items */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {news.slice(1).map((item) => (
//           <div key={item.id}
//             className="bg-[#111] border border-white/10 rounded-xl overflow-hidden
//                        hover:border-[#26F2D0]/40 hover:shadow-[0_0_20px_rgba(38,242,208,0.1)]
//                        transition-all duration-300 relative">

//             {/* ✅ delete button */}
//             {canDelete(item) && (
//               <button
//                 onClick={() => handleDelete(item.id)}
//                 className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full
//                            bg-black/60 border border-white/20 flex items-center justify-center
//                            text-gray-400 hover:text-red-400 hover:bg-red-400/20 transition-all"
//               >
//                 <Trash2 size={13} />
//               </button>
//             )}

//             {item.imageUrl && (
//               <img src={item.imageUrl} className="w-full h-48 object-cover" />
//             )}
//             <div className="p-5">
//               <div className="flex items-center justify-between mb-3">
//                 <span className={`text-xs font-semibold px-3 py-1 rounded-full
//                   ${categoryStyles[item.category] || "bg-gray-500/20 text-gray-400"}`}>
//                   {item.category}
//                 </span>
//                 <span className="text-gray-500 text-xs">{timeAgo(item.timestamp)}</span>
//               </div>
//               <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
//               <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{item.content}</p>
//               <p className="text-gray-600 text-xs mt-4">Posted by {item.postedBy}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { Trash2, Pencil, Pin, Check, X } from "lucide-react";

export default function CampusNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", content: "", category: "" });
  const [saving, setSaving] = useState(false);

  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  const name = sessionStorage.getItem("name");

  const isAdmin = role === "ADMIN";
  const isModerator = role === "MODERATOR";
  const myPostedBy = name + " (Moderator)";

  const canDelete = (item) => {
    if (isAdmin) return true;
    if (isModerator && item.postedBy === myPostedBy) return true;
    return false;
  };

  const canEdit = (item) => {
    if (isAdmin) return true;
    if (isModerator && item.postedBy === myPostedBy) return true;
    return false;
  };

  const categoryStyles = {
    General: "bg-blue-500/20 text-blue-400",
    Event: "bg-purple-500/20 text-purple-400",
    Academic: "bg-green-500/20 text-green-400",
    Notice: "bg-yellow-500/20 text-yellow-400",
  };

  const timeAgo = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    const res = await fetch(`http://localhost:8081/api/announcements/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) setNews(prev => prev.filter(n => n.id !== id));
  };

  const handlePin = async (id) => {
    const res = await fetch(`http://localhost:8081/api/announcements/${id}/pin`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const updated = await res.json();
      setNews(prev => {
        const newList = prev.map(n => n.id === updated.id ? updated : n);
        return newList.sort((a, b) => {
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return b.timestamp - a.timestamp;
        });
      });
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditForm({ title: item.title, content: item.content, category: item.category });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: "", content: "", category: "" });
  };

  const saveEdit = async (id) => {
    setSaving(true);
    try {
      const res = await fetch(`http://localhost:8081/api/announcements/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        const updated = await res.json();
        setNews(prev => prev.map(n => n.id === updated.id ? updated : n));
        cancelEdit();
      }
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetch("http://localhost:8081/api/announcements")
      .then(res => res.json())
      .then(data => { setNews(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // ✅ action buttons reusable
  const ActionButtons = ({ item, dark = false }) => (
    <div className="flex items-center gap-1">
      {isAdmin && (
        <button
          onClick={() => handlePin(item.id)}
          title={item.pinned ? "Unpin" : "Pin"}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all
            ${dark ? "bg-black/60 border border-white/20" : "bg-white/10 border border-white/20"}
            ${item.pinned ? "text-yellow-400 hover:text-yellow-300" : "text-gray-400 hover:text-yellow-400"}`}
        >
          <Pin size={13} />
        </button>
      )}
      {canEdit(item) && editingId !== item.id && (
        <button
          onClick={() => startEdit(item)}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all
            ${dark ? "bg-black/60 border border-white/20" : "bg-white/10 border border-white/20"}
            text-gray-400 hover:text-[#26F2D0] hover:bg-[#26F2D0]/20`}
        >
          <Pencil size={12} />
        </button>
      )}
      {canDelete(item) && (
        <button
          onClick={() => handleDelete(item.id)}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all
            ${dark ? "bg-black/60 border border-white/20" : "bg-white/10 border border-white/20"}
            text-gray-400 hover:text-red-400 hover:bg-red-400/20`}
        >
          <Trash2 size={13} />
        </button>
      )}
    </div>
  );

  // ✅ inline edit form
  const EditForm = ({ item }) => (
    <div className="space-y-3 mt-3">
      <select
        value={editForm.category}
        onChange={e => setEditForm(p => ({ ...p, category: e.target.value }))}
        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-3 py-2
                   text-sm text-white outline-none focus:border-[#26F2D0]/50"
      >
        <option>General</option>
        <option>Event</option>
        <option>Academic</option>
        <option>Notice</option>
      </select>
      <input
        value={editForm.title}
        onChange={e => setEditForm(p => ({ ...p, title: e.target.value }))}
        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-3 py-2
                   text-sm text-white outline-none focus:border-[#26F2D0]/50"
      />
      <textarea
        value={editForm.content}
        onChange={e => setEditForm(p => ({ ...p, content: e.target.value }))}
        rows={3}
        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-3 py-2
                   text-sm text-white outline-none resize-none focus:border-[#26F2D0]/50"
      />
      <div className="flex gap-2 justify-end">
        <button
          onClick={cancelEdit}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs
                     bg-white/5 text-gray-400 hover:text-white transition"
        >
          <X size={12} /> Cancel
        </button>
        <button
          onClick={() => saveEdit(item.id)}
          disabled={saving}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs
                     bg-[#26F2D0]/20 text-[#26F2D0] hover:bg-[#26F2D0]/30 transition
                     disabled:opacity-40"
        >
          <Check size={12} /> {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400 text-lg">Loading campus news...</p>
    </div>
  );

  if (news.length === 0) return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <p className="text-4xl mb-4">📢</p>
      <p className="text-gray-400 text-lg">No announcements yet.</p>
      <p className="text-gray-500 text-sm mt-1">Check back later!</p>
    </div>
  );

  return (
    <div className="w-full bg-[#0f0f0f] text-white pb-10">

      {/* ✅ Featured first item */}
      {news[0] && (
        <div className={`mb-8 rounded-2xl overflow-hidden border transition-all duration-300 relative
          ${news[0].pinned
            ? "border-yellow-400/30 shadow-[0_0_20px_rgba(250,204,21,0.1)]"
            : "border-white/10 hover:border-[#26F2D0]/40 hover:shadow-[0_0_30px_rgba(38,242,208,0.1)]"
          }`}>

          {/* ✅ Pin badge */}
          {news[0].pinned && (
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1
                            bg-yellow-400/20 border border-yellow-400/30 rounded-full px-2 py-1">
              <Pin size={11} className="text-yellow-400" />
              <span className="text-xs text-yellow-400 font-medium">Pinned</span>
            </div>
          )}

          {/* ✅ action buttons */}
          <div className="absolute top-4 right-4 z-10 flex gap-1">
            <ActionButtons item={news[0]} dark={true} />
          </div>

          {news[0].imageUrl ? (
            <div className="relative h-64 md:h-80">
              <img src={news[0].imageUrl} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block
                  ${categoryStyles[news[0].category] || "bg-gray-500/20 text-gray-400"}`}>
                  {news[0].category}
                </span>
                {editingId === news[0].id ? (
                  <EditForm item={news[0]} />
                ) : (
                  <>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">{news[0].title}</h2>
                    <p className="text-gray-300 text-sm mt-2 line-clamp-2">{news[0].content}</p>
                  </>
                )}
                <div className="flex items-center gap-4 mt-3 text-gray-400 text-xs">
                  <span>Posted by {news[0].postedBy}</span>
                  <span>{timeAgo(news[0].timestamp)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#111] p-8">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block
                ${categoryStyles[news[0].category] || "bg-gray-500/20 text-gray-400"}`}>
                {news[0].category}
              </span>
              {editingId === news[0].id ? (
                <EditForm item={news[0]} />
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white mt-2">{news[0].title}</h2>
                  <p className="text-gray-300 mt-2">{news[0].content}</p>
                </>
              )}
              <div className="flex items-center gap-4 mt-4 text-gray-400 text-xs">
                <span>Posted by {news[0].postedBy}</span>
                <span>{timeAgo(news[0].timestamp)}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ✅ Rest of items */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {news.slice(1).map((item) => (
          <div key={item.id}
            className={`border rounded-xl overflow-hidden transition-all duration-300 relative
              ${item.pinned
                ? "bg-[#111] border-yellow-400/30 shadow-[0_0_15px_rgba(250,204,21,0.08)]"
                : "bg-[#111] border-white/10 hover:border-[#26F2D0]/40 hover:shadow-[0_0_20px_rgba(38,242,208,0.1)]"
              }`}>

            {/* ✅ pin badge */}
            {item.pinned && (
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1
                              bg-yellow-400/20 border border-yellow-400/30 rounded-full px-2 py-0.5">
                <Pin size={10} className="text-yellow-400" />
                <span className="text-xs text-yellow-400">Pinned</span>
              </div>
            )}

            {/* ✅ action buttons */}
            <div className="absolute top-3 right-3 z-10 flex gap-1">
              <ActionButtons item={item} dark={true} />
            </div>

            {item.imageUrl && (
              <img src={item.imageUrl} className="w-full h-48 object-cover" />
            )}
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full
                  ${categoryStyles[item.category] || "bg-gray-500/20 text-gray-400"}`}>
                  {item.category}
                </span>
                <span className="text-gray-500 text-xs">{timeAgo(item.timestamp)}</span>
              </div>

              {editingId === item.id ? (
                <EditForm item={item} />
              ) : (
                <>
                  <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{item.content}</p>
                </>
              )}
              <p className="text-gray-600 text-xs mt-4">Posted by {item.postedBy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}