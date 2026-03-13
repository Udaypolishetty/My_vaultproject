// import { useState } from "react";
// import { Upload, Send, X, Shield, Newspaper } from "lucide-react";

// export default function ModeratorUploadPanel({ token }) {
//   const [form, setForm] = useState({
//     title: "", content: "", category: "General", imageUrl: ""
//   });
//   const [uploading, setUploading] = useState(false);
//   const [posting, setPosting] = useState(false);
//   const [posted, setPosted] = useState(false);

//   const uploadImage = async (file) => {
//     setUploading(true);
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "xk6yja12");
//     const res = await fetch("https://api.cloudinary.com/v1_1/dn6ot9flx/image/upload", {
//       method: "POST", body: formData
//     });
//     const data = await res.json();
//     setForm(prev => ({ ...prev, imageUrl: data.secure_url }));
//     setUploading(false);
//   };

//   const postNews = async () => {
//     if (!form.title || !form.content) return;
//     setPosting(true);
//     try {
//       const res = await fetch("http://localhost:8081/api/announcements", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify(form)
//       });
//       if (res.ok) {
//         setForm({ title: "", content: "", category: "General", imageUrl: "" });
//         setPosted(true);
//         setTimeout(() => setPosted(false), 3000);
//       }
//     } finally {
//       setPosting(false);
//     }
//   };

//   return (
//     <div className="max-w-xl">
//       <div className="flex items-center gap-3 mb-6">
//         <div className="w-10 h-10 rounded-xl bg-[#26F2D0]/10 border border-[#26F2D0]/20
//                         flex items-center justify-center">
//           <Shield size={18} className="text-[#26F2D0]" />
//         </div>
//         <div>
//           <h3 className="text-lg font-bold text-white">Moderator Panel</h3>
//           <p className="text-xs text-gray-400">Post campus news and announcements</p>
//         </div>
//       </div>

//       {posted && (
//         <div className="mb-4 flex items-center gap-2 bg-green-500/10 border border-green-500/20
//                         rounded-xl px-4 py-3 text-sm text-green-400">
//           ✅ News posted successfully!
//         </div>
//       )}

//       <div className="bg-[#111] border border-white/10 rounded-2xl p-5 space-y-4">
//         <div className="flex items-center gap-2">
//           <Newspaper size={14} className="text-[#26F2D0]" />
//           <h4 className="text-sm font-semibold text-[#26F2D0]">Post Campus News</h4>
//         </div>

//         <select
//           value={form.category}
//           onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
//           className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
//                      text-sm text-white outline-none focus:border-[#26F2D0]/50 transition"
//         >
//           <option>General</option>
//           <option>Event</option>
//           <option>Academic</option>
//           <option>Notice</option>
//         </select>

//         <input
//           value={form.title}
//           onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
//           placeholder="News title..."
//           className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
//                      text-sm text-white placeholder-gray-500 outline-none
//                      focus:border-[#26F2D0]/50 transition"
//         />

//         <textarea
//           value={form.content}
//           onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
//           placeholder="Write the announcement content..."
//           rows={4}
//           className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
//                      text-sm text-white placeholder-gray-500 outline-none resize-none
//                      focus:border-[#26F2D0]/50 transition"
//         />

//         <div className="border border-dashed border-white/20 rounded-xl p-4">
//           <label className="cursor-pointer flex flex-col items-center gap-2
//                             text-gray-400 hover:text-white transition">
//             <Upload size={20} className="text-gray-500" />
//             <span className="text-xs">
//               {uploading ? "Uploading..." : "Click to attach image (optional)"}
//             </span>
//             <input type="file" accept="image/*" className="hidden"
//               onChange={e => e.target.files[0] && uploadImage(e.target.files[0])} />
//           </label>
//           {form.imageUrl && (
//             <div className="mt-3 relative">
//               <img src={form.imageUrl} className="w-full h-36 object-cover rounded-xl" />
//               <button
//                 onClick={() => setForm(p => ({ ...p, imageUrl: "" }))}
//                 className="absolute top-2 right-2 bg-red-600 text-white rounded-full
//                            w-6 h-6 flex items-center justify-center hover:bg-red-700 transition"
//               >
//                 <X size={12} />
//               </button>
//             </div>
//           )}
//         </div>

//         <button
//           onClick={postNews}
//           disabled={!form.title || !form.content || posting || uploading}
//           className="flex items-center justify-center gap-2 w-full py-3 bg-[#26F2D0]
//                      text-black rounded-xl font-semibold text-sm hover:bg-[#1dd4b8]
//                      transition disabled:opacity-40 disabled:cursor-not-allowed"
//         >
//           <Send size={14} />
//           {posting ? "Posting..." : "Post Announcement"}
//         </button>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { Upload, Send, X, Shield, Newspaper, Search, AlertTriangle } from "lucide-react";

const SEVERITY_OPTIONS = [
  { value: "LOW",    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  { value: "MEDIUM", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  { value: "HIGH",   color: "bg-red-500/20 text-red-400 border-red-500/30" },
];

export default function ModeratorUploadPanel({ token }) {
  const [form, setForm] = useState({ title: "", content: "", category: "General", imageUrl: "" });
  const [uploading, setUploading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);

  const [warnSearch, setWarnSearch] = useState("");
  const [warnStudent, setWarnStudent] = useState(null);
  const [warnSearching, setWarnSearching] = useState(false);
  const [warnSeverity, setWarnSeverity] = useState("LOW");
  const [warnMessage, setWarnMessage] = useState("");
  const [warnSending, setWarnSending] = useState(false);
  const [warnSent, setWarnSent] = useState(false);

  const uploadImage = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "xk6yja12");
    const res = await fetch("https://api.cloudinary.com/v1_1/dn6ot9flx/image/upload", {
      method: "POST", body: formData
    });
    const data = await res.json();
    setForm(prev => ({ ...prev, imageUrl: data.secure_url }));
    setUploading(false);
  };

  const postNews = async () => {
    if (!form.title || !form.content) return;
    setPosting(true);
    try {
      const res = await fetch("http://localhost:8081/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setForm({ title: "", content: "", category: "General", imageUrl: "" });
        setPosted(true);
        setTimeout(() => setPosted(false), 3000);
      }
    } finally {
      setPosting(false);
    }
  };

 const searchStudent = async () => {
  if (!warnSearch.trim()) return;
  setWarnSearching(true);
  try {
    // ✅ use /api/students/search instead of /api/admin/students
    const res = await fetch(
      `http://localhost:8081/api/students/search?q=${encodeURIComponent(warnSearch)}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) { setWarnStudent("notfound"); return; }
    const data = await res.json();
    setWarnStudent(data || "notfound");
  } finally {
    setWarnSearching(false);
  }
};

  const suggestWarning = async () => {
    if (!warnStudent || warnStudent === "notfound" || !warnMessage.trim()) return;
    setWarnSending(true);
    try {
      const res = await fetch("http://localhost:8081/api/warnings/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          recipientRollNumber: warnStudent.rollNumber,
          message: warnMessage.trim(),
          severity: warnSeverity,
          isSuggestion: true
        })
      });
      if (res.ok) {
        setWarnMessage("");
        setWarnStudent(null);
        setWarnSearch("");
        setWarnSeverity("LOW");
        setWarnSent(true);
        setTimeout(() => setWarnSent(false), 3000);
      }
    } finally {
      setWarnSending(false);
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#26F2D0]/10 border border-[#26F2D0]/20
                        flex items-center justify-center">
          <Shield size={18} className="text-[#26F2D0]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Moderator Panel</h3>
          <p className="text-xs text-gray-400">Post news and suggest warnings</p>
        </div>
      </div>

      {/* ===== NEWS FORM ===== */}
      {posted && (
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20
                        rounded-xl px-4 py-3 text-sm text-green-400">
          ✅ News posted successfully!
        </div>
      )}

      <div className="bg-[#111] border border-white/10 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Newspaper size={14} className="text-[#26F2D0]" />
          <h4 className="text-sm font-semibold text-[#26F2D0]">Post Campus News</h4>
        </div>

        <select value={form.category}
          onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
                     text-sm text-white outline-none focus:border-[#26F2D0]/50 transition">
          <option>General</option>
          <option>Event</option>
          <option>Academic</option>
          <option>Notice</option>
        </select>

        <input value={form.title}
          onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
          placeholder="News title..."
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
                     text-sm text-white placeholder-gray-500 outline-none
                     focus:border-[#26F2D0]/50 transition" />

        <textarea value={form.content}
          onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
          placeholder="Write the announcement content..."
          rows={4}
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
                     text-sm text-white placeholder-gray-500 outline-none resize-none
                     focus:border-[#26F2D0]/50 transition" />

        <div className="border border-dashed border-white/20 rounded-xl p-4">
          <label className="cursor-pointer flex flex-col items-center gap-2
                            text-gray-400 hover:text-white transition">
            <Upload size={20} className="text-gray-500" />
            <span className="text-xs">{uploading ? "Uploading..." : "Click to attach image (optional)"}</span>
            <input type="file" accept="image/*" className="hidden"
              onChange={e => e.target.files[0] && uploadImage(e.target.files[0])} />
          </label>
          {form.imageUrl && (
            <div className="mt-3 relative">
              <img src={form.imageUrl} className="w-full h-36 object-cover rounded-xl" />
              <button onClick={() => setForm(p => ({ ...p, imageUrl: "" }))}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full
                           w-6 h-6 flex items-center justify-center hover:bg-red-700 transition">
                <X size={12} />
              </button>
            </div>
          )}
        </div>

        <button onClick={postNews}
          disabled={!form.title || !form.content || posting || uploading}
          className="flex items-center justify-center gap-2 w-full py-3 bg-[#26F2D0]
                     text-black rounded-xl font-semibold text-sm hover:bg-[#1dd4b8]
                     transition disabled:opacity-40 disabled:cursor-not-allowed">
          <Send size={14} />
          {posting ? "Posting..." : "Post Announcement"}
        </button>
      </div>

      {/* ===== SUGGEST WARNING ===== */}
      {warnSent && (
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20
                        rounded-xl px-4 py-3 text-sm text-green-400">
          ✅ Warning suggestion sent to admin for approval!
        </div>
      )}

      <div className="bg-[#111] border border-orange-500/20 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle size={14} className="text-orange-400" />
          <h4 className="text-sm font-semibold text-orange-400">Suggest Warning to Admin</h4>
          <span className="ml-auto text-xs text-gray-500 italic">Admin must approve</span>
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Search Student</label>
          <div className="flex gap-2">
            <input value={warnSearch}
              onChange={e => { setWarnSearch(e.target.value); setWarnStudent(null); }}
              onKeyDown={e => e.key === "Enter" && searchStudent()}
              placeholder="Roll number or name..."
              className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
                         text-sm text-white placeholder-gray-500 outline-none
                         focus:border-orange-500/50 transition" />
            <button onClick={searchStudent} disabled={warnSearching}
              className="flex items-center gap-1 px-4 py-2.5 bg-orange-500/20 text-orange-400
                         border border-orange-500/30 rounded-xl text-sm font-medium
                         hover:bg-orange-500/30 transition disabled:opacity-50">
              <Search size={14} />
              {warnSearching ? "..." : "Find"}
            </button>
          </div>

          {warnStudent && warnStudent !== "notfound" && (
            <div className="mt-3 flex items-center gap-3 bg-white/5 border border-white/10
                            rounded-xl px-4 py-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20
                              flex items-center justify-center text-orange-400 font-bold text-sm">
                {warnStudent.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-white font-medium text-sm">{warnStudent.name}</p>
                <p className="text-gray-500 text-xs">
                  {warnStudent.rollNumber} · {warnStudent.branch} · {warnStudent.year}
                </p>
              </div>
              <button onClick={() => { setWarnStudent(null); setWarnSearch(""); }}
                className="ml-auto text-gray-500 hover:text-white transition">
                <X size={14} />
              </button>
            </div>
          )}
          {warnStudent === "notfound" && (
            <p className="text-xs text-gray-500 mt-2">No student found for "{warnSearch}"</p>
          )}
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Severity</label>
          <div className="flex gap-2">
            {SEVERITY_OPTIONS.map(opt => (
              <button key={opt.value} onClick={() => setWarnSeverity(opt.value)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition
                  ${warnSeverity === opt.value
                    ? opt.color + " scale-[1.02]"
                    : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"}`}>
                {opt.value}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Reason</label>
          <textarea value={warnMessage}
            onChange={e => setWarnMessage(e.target.value)}
            placeholder="Describe the reason for this warning..."
            rows={3}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
                       text-sm text-white placeholder-gray-500 outline-none resize-none
                       focus:border-orange-500/50 transition" />
        </div>

        <button onClick={suggestWarning}
          disabled={!warnStudent || warnStudent === "notfound" || !warnMessage.trim() || warnSending}
          className="flex items-center justify-center gap-2 w-full py-3 bg-orange-500/20
                     text-orange-400 border border-orange-500/30 rounded-xl font-semibold
                     text-sm hover:bg-orange-500/30 transition
                     disabled:opacity-40 disabled:cursor-not-allowed">
          <AlertTriangle size={14} />
          {warnSending ? "Sending..." : "Suggest Warning to Admin"}
        </button>
      </div>
    </div>
  );
}