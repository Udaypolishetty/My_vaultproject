// import { useState } from "react";

// export default function AdminAnnouncements({
//   announcements, loading,
//   onDelete, onPin, onSaveEdit, onPost
// }) {
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({ title: "", content: "", category: "" });
//   const [saving, setSaving] = useState(false);
//   const [newAnn, setNewAnn] = useState({
//     title: "", content: "", category: "General", imageUrl: ""
//   });
//   const [imageUploading, setImageUploading] = useState(false);

//   const uploadImage = async (file) => {
//     setImageUploading(true);
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "xk6yja12");
//     const res = await fetch("https://api.cloudinary.com/v1_1/dn6ot9flx/image/upload", {
//       method: "POST", body: formData
//     });
//     const data = await res.json();
//     setNewAnn(prev => ({ ...prev, imageUrl: data.secure_url }));
//     setImageUploading(false);
//   };

//   const handleSaveEdit = async (id) => {
//     setSaving(true);
//     await onSaveEdit(id, editForm);
//     setEditingId(null);
//     setSaving(false);
//   };

//   if (loading) return null;

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-6">Campus Announcements</h2>

//       {/* Post form */}
//       <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 mb-8">
//         <h3 className="font-semibold mb-4 text-[#26F2D0]">Post New Announcement</h3>
//         <div className="space-y-3">
//           <select
//             value={newAnn.category}
//             onChange={e => setNewAnn(p => ({ ...p, category: e.target.value }))}
//             className="w-full p-3 bg-[#111] border border-white/10 rounded-lg text-white outline-none"
//           >
//             <option>General</option>
//             <option>Event</option>
//             <option>Academic</option>
//             <option>Notice</option>
//           </select>
//           <input
//             placeholder="Announcement title"
//             value={newAnn.title}
//             onChange={e => setNewAnn(p => ({ ...p, title: e.target.value }))}
//             className="w-full p-3 bg-[#111] border border-white/10 rounded-lg text-white
//                        outline-none focus:border-[#26F2D0]"
//           />
//           <textarea
//             placeholder="Announcement content"
//             rows="3"
//             value={newAnn.content}
//             onChange={e => setNewAnn(p => ({ ...p, content: e.target.value }))}
//             className="w-full p-3 bg-[#111] border border-white/10 rounded-lg text-white
//                        outline-none focus:border-[#26F2D0] resize-none"
//           />
//           <div className="border border-dashed border-white/20 rounded-lg p-4">
//             <label className="cursor-pointer flex flex-col items-center gap-2
//                               text-gray-400 hover:text-white transition">
//               <span className="text-2xl">📷</span>
//               <span className="text-sm">
//                 {imageUploading ? "Uploading..." : "Click to upload image"}
//               </span>
//               <input type="file" accept="image/*" className="hidden"
//                 onChange={e => e.target.files[0] && uploadImage(e.target.files[0])} />
//             </label>
//             {newAnn.imageUrl && (
//               <div className="mt-3 relative">
//                 <img src={newAnn.imageUrl} className="w-full h-40 object-cover rounded-lg" />
//                 <button
//                   onClick={() => setNewAnn(p => ({ ...p, imageUrl: "" }))}
//                   className="absolute top-2 right-2 bg-red-600 text-white rounded-full
//                              w-6 h-6 text-xs flex items-center justify-center"
//                 >×</button>
//               </div>
//             )}
//           </div>
//           <button
//             onClick={() => {
//               onPost(newAnn);
//               setNewAnn({ title: "", content: "", category: "General", imageUrl: "" });
//             }}
//             disabled={!newAnn.title || !newAnn.content || imageUploading}
//             className="bg-[#26F2D0] text-black px-6 py-2 rounded-lg font-semibold
//                        hover:opacity-90 transition disabled:opacity-50"
//           >
//             Post Announcement
//           </button>
//         </div>
//       </div>

//       {/* List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//         {announcements.map(a => (
//           <div key={a.id}
//             className={`border rounded-xl overflow-hidden relative
//               ${a.pinned
//                 ? "bg-[#1a1a1a] border-yellow-400/30"
//                 : "bg-[#1a1a1a] border-white/10"
//               }`}>

//             {a.pinned && (
//               <div className="absolute top-2 left-2 z-10 flex items-center gap-1
//                               bg-yellow-400/20 border border-yellow-400/30 rounded-full px-2 py-0.5">
//                 <span className="text-xs text-yellow-400">📌 Pinned</span>
//               </div>
//             )}

//             {a.imageUrl && <img src={a.imageUrl} className="w-full h-40 object-cover" />}

//             <div className="p-4">
//               <div className="flex justify-between items-start mb-2 gap-2 flex-wrap">
//                 <span className="text-xs bg-[#26F2D0]/10 text-[#26F2D0] px-2 py-1 rounded-full shrink-0">
//                   {a.category}
//                 </span>
//                 <div className="flex gap-1">
//                   <button
//                     onClick={() => onPin(a.id)}
//                     className={`px-2 py-1 rounded text-xs transition
//                       ${a.pinned
//                         ? "bg-yellow-400/20 text-yellow-400"
//                         : "bg-white/5 text-gray-400 hover:text-yellow-400"}`}
//                   >📌</button>
//                   <button
//                     onClick={() => {
//                       setEditingId(a.id);
//                       setEditForm({ title: a.title, content: a.content, category: a.category });
//                     }}
//                     className="bg-white/5 hover:bg-[#26F2D0]/20 text-gray-400
//                                hover:text-[#26F2D0] px-2 py-1 rounded text-xs transition"
//                   >✏️</button>
//                   <button
//                     onClick={() => onDelete(a.id)}
//                     className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
//                   >🗑️</button>
//                 </div>
//               </div>

//               {editingId === a.id ? (
//                 <div className="space-y-2 mt-2">
//                   <select
//                     value={editForm.category}
//                     onChange={e => setEditForm(p => ({ ...p, category: e.target.value }))}
//                     className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-1.5
//                                text-xs text-white outline-none"
//                   >
//                     <option>General</option>
//                     <option>Event</option>
//                     <option>Academic</option>
//                     <option>Notice</option>
//                   </select>
//                   <input
//                     value={editForm.title}
//                     onChange={e => setEditForm(p => ({ ...p, title: e.target.value }))}
//                     className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-1.5
//                                text-xs text-white outline-none"
//                     placeholder="Title"
//                   />
//                   <textarea
//                     value={editForm.content}
//                     onChange={e => setEditForm(p => ({ ...p, content: e.target.value }))}
//                     rows={3}
//                     className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-1.5
//                                text-xs text-white outline-none resize-none"
//                     placeholder="Content"
//                   />
//                   <div className="flex gap-2 justify-end">
//                     <button
//                       onClick={() => setEditingId(null)}
//                       className="px-3 py-1 rounded-lg text-xs bg-white/5 text-gray-400
//                                  hover:text-white transition"
//                     >Cancel</button>
//                     <button
//                       onClick={() => handleSaveEdit(a.id)}
//                       disabled={saving}
//                       className="px-3 py-1 rounded-lg text-xs bg-[#26F2D0]/20 text-[#26F2D0]
//                                  hover:bg-[#26F2D0]/30 disabled:opacity-40 transition"
//                     >{saving ? "Saving..." : "Save"}</button>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <h3 className="font-semibold text-white mt-2">{a.title}</h3>
//                   <p className="text-gray-400 text-sm mt-1 line-clamp-2">{a.content}</p>
//                   <p className="text-gray-600 text-xs mt-2">by {a.postedBy}</p>
//                 </>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// import { useState } from "react";
// import { Pin, Pencil, Trash2, Upload, X, Save, Plus, Megaphone } from "lucide-react";

// export default function AdminAnnouncements({
//   announcements, loading,
//   onDelete, onPin, onSaveEdit, onPost
// }) {
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({ title: "", content: "", category: "" });
//   const [saving, setSaving] = useState(false);
//   const [confirmDelete, setConfirmDelete] = useState(null);
//   const [newAnn, setNewAnn] = useState({
//     title: "", content: "", category: "General", imageUrl: ""
//   });
//   const [imageUploading, setImageUploading] = useState(false);

//   const uploadImage = async (file) => {
//     setImageUploading(true);
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "xk6yja12");
//     const res = await fetch("https://api.cloudinary.com/v1_1/dn6ot9flx/image/upload", {
//       method: "POST", body: formData
//     });
//     const data = await res.json();
//     setNewAnn(prev => ({ ...prev, imageUrl: data.secure_url }));
//     setImageUploading(false);
//   };

//   const handleSaveEdit = async (id) => {
//     setSaving(true);
//     await onSaveEdit(id, editForm);
//     setEditingId(null);
//     setSaving(false);
//   };

//   if (loading) return null;

//   return (
//     <div>
//       <div className="flex items-center gap-2 mb-6">
//         <Megaphone size={20} className="text-[#26F2D0]" />
//         <h2 className="text-xl font-bold">Campus Announcements</h2>
//       </div>

//       {/* Post form */}
//       <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 mb-8">
//         <div className="flex items-center gap-2 mb-4">
//           <Plus size={16} className="text-[#26F2D0]" />
//           <h3 className="font-semibold text-[#26F2D0]">Post New Announcement</h3>
//         </div>
//         <div className="space-y-3">
//           <select
//             value={newAnn.category}
//             onChange={e => setNewAnn(p => ({ ...p, category: e.target.value }))}
//             className="w-full p-3 bg-[#111] border border-white/10 rounded-lg
//                        text-white outline-none"
//           >
//             <option>General</option>
//             <option>Event</option>
//             <option>Academic</option>
//             <option>Notice</option>
//           </select>
//           <input
//             placeholder="Announcement title"
//             value={newAnn.title}
//             onChange={e => setNewAnn(p => ({ ...p, title: e.target.value }))}
//             className="w-full p-3 bg-[#111] border border-white/10 rounded-lg text-white
//                        outline-none focus:border-[#26F2D0]"
//           />
//           <textarea
//             placeholder="Announcement content"
//             rows="3"
//             value={newAnn.content}
//             onChange={e => setNewAnn(p => ({ ...p, content: e.target.value }))}
//             className="w-full p-3 bg-[#111] border border-white/10 rounded-lg text-white
//                        outline-none focus:border-[#26F2D0] resize-none"
//           />

//           {/* Image upload */}
//           <div className="border border-dashed border-white/20 rounded-lg p-4">
//             <label className="cursor-pointer flex flex-col items-center gap-2
//                               text-gray-400 hover:text-white transition">
//               <Upload size={22} className="text-gray-500" />
//               <span className="text-sm">
//                 {imageUploading ? "Uploading..." : "Click to upload image"}
//               </span>
//               <input type="file" accept="image/*" className="hidden"
//                 onChange={e => e.target.files[0] && uploadImage(e.target.files[0])} />
//             </label>
//             {newAnn.imageUrl && (
//               <div className="mt-3 relative">
//                 <img src={newAnn.imageUrl} className="w-full h-40 object-cover rounded-lg" />
//                 <button
//                   onClick={() => setNewAnn(p => ({ ...p, imageUrl: "" }))}
//                   className="absolute top-2 right-2 bg-red-600 text-white rounded-full
//                              w-6 h-6 flex items-center justify-center hover:bg-red-700 transition"
//                 >
//                   <X size={12} />
//                 </button>
//               </div>
//             )}
//           </div>

//           <button
//             onClick={() => {
//               onPost(newAnn);
//               setNewAnn({ title: "", content: "", category: "General", imageUrl: "" });
//             }}
//             disabled={!newAnn.title || !newAnn.content || imageUploading}
//             className="flex items-center gap-2 bg-[#26F2D0] text-black px-6 py-2
//                        rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
//           >
//             <Plus size={16} />
//             Post Announcement
//           </button>
//         </div>
//       </div>

//       {/* Announcements grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//         {announcements.map(a => (
//           <div key={a.id}
//             className={`border rounded-xl overflow-hidden relative
//               ${a.pinned
//                 ? "bg-[#1a1a1a] border-yellow-400/30"
//                 : "bg-[#1a1a1a] border-white/10"
//               }`}>

//             {a.pinned && (
//               <div className="absolute top-2 left-2 z-10 flex items-center gap-1
//                               bg-yellow-400/20 border border-yellow-400/30
//                               rounded-full px-2 py-0.5">
//                 <Pin size={10} className="text-yellow-400" />
//                 <span className="text-xs text-yellow-400">Pinned</span>
//               </div>
//             )}

//             {a.imageUrl && (
//               <img src={a.imageUrl} className="w-full h-40 object-cover" />
//             )}

//             <div className="p-4">
//               <div className="flex justify-between items-start mb-2 gap-2 flex-wrap">
//                 <span className="text-xs bg-[#26F2D0]/10 text-[#26F2D0]
//                                  px-2 py-1 rounded-full shrink-0">
//                   {a.category}
//                 </span>

//                 <div className="flex gap-1 items-center">
//                   {/* Pin button */}
//                   <button
//                     onClick={() => onPin(a.id)}
//                     className={`p-1.5 rounded-lg transition
//                       ${a.pinned
//                         ? "bg-yellow-400/20 text-yellow-400"
//                         : "bg-white/5 text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10"
//                       }`}
//                     title={a.pinned ? "Unpin" : "Pin"}
//                   >
//                     <Pin size={13} />
//                   </button>

//                   {/* Edit button */}
//                   <button
//                     onClick={() => {
//                       setEditingId(a.id);
//                       setEditForm({ title: a.title, content: a.content, category: a.category });
//                     }}
//                     className="p-1.5 rounded-lg bg-white/5 text-gray-400
//                                hover:bg-[#26F2D0]/20 hover:text-[#26F2D0] transition"
//                     title="Edit"
//                   >
//                     <Pencil size={13} />
//                   </button>

//                   {/* Inline delete confirmation */}
//                   {confirmDelete === a.id ? (
//                     <div className="flex items-center gap-1">
//                       <span className="text-xs text-gray-400">Sure?</span>
//                       <button
//                         onClick={() => { onDelete(a.id); setConfirmDelete(null); }}
//                         className="text-xs text-red-400 hover:text-red-300 font-semibold
//                                    px-2 py-0.5 rounded-full bg-red-400/10 transition"
//                       >
//                         Yes
//                       </button>
//                       <button
//                         onClick={() => setConfirmDelete(null)}
//                         className="text-xs text-gray-500 hover:text-white px-2 py-0.5
//                                    rounded-full bg-white/5 transition"
//                       >
//                         No
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => setConfirmDelete(a.id)}
//                       className="p-1.5 rounded-lg bg-red-500/10 text-red-400
//                                  hover:bg-red-500/20 transition"
//                       title="Delete"
//                     >
//                       <Trash2 size={13} />
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Edit form */}
//               {editingId === a.id ? (
//                 <div className="space-y-2 mt-2">
//                   <select
//                     value={editForm.category}
//                     onChange={e => setEditForm(p => ({ ...p, category: e.target.value }))}
//                     className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-1.5
//                                text-xs text-white outline-none"
//                   >
//                     <option>General</option>
//                     <option>Event</option>
//                     <option>Academic</option>
//                     <option>Notice</option>
//                   </select>
//                   <input
//                     value={editForm.title}
//                     onChange={e => setEditForm(p => ({ ...p, title: e.target.value }))}
//                     className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-1.5
//                                text-xs text-white outline-none"
//                     placeholder="Title"
//                   />
//                   <textarea
//                     value={editForm.content}
//                     onChange={e => setEditForm(p => ({ ...p, content: e.target.value }))}
//                     rows={3}
//                     className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-1.5
//                                text-xs text-white outline-none resize-none"
//                     placeholder="Content"
//                   />
//                   <div className="flex gap-2 justify-end">
//                     <button
//                       onClick={() => setEditingId(null)}
//                       className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs
//                                  bg-white/5 text-gray-400 hover:text-white transition"
//                     >
//                       <X size={12} /> Cancel
//                     </button>
//                     <button
//                       onClick={() => handleSaveEdit(a.id)}
//                       disabled={saving}
//                       className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs
//                                  bg-[#26F2D0]/20 text-[#26F2D0] hover:bg-[#26F2D0]/30
//                                  disabled:opacity-40 transition"
//                     >
//                       <Save size={12} />
//                       {saving ? "Saving..." : "Save"}
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <h3 className="font-semibold text-white mt-2">{a.title}</h3>
//                   <p className="text-gray-400 text-sm mt-1 line-clamp-2">{a.content}</p>
//                   <p className="text-gray-600 text-xs mt-2">by {a.postedBy}</p>
//                 </>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { Pin, Pencil, Trash2, Upload, X, Save, Plus, Megaphone } from "lucide-react";

export default function AdminAnnouncements({
  announcements, loading,
  onDelete, onPin, onSaveEdit, onPost
}) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", content: "", category: "" });
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [newAnn, setNewAnn] = useState({
    title: "", content: "", category: "General", imageUrl: ""
  });
  const [imageUploading, setImageUploading] = useState(false);

  const uploadImage = async (file) => {
    setImageUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "xk6yja12");
    const res = await fetch("https://api.cloudinary.com/v1_1/dn6ot9flx/image/upload", {
      method: "POST", body: formData
    });
    const data = await res.json();
    setNewAnn(prev => ({ ...prev, imageUrl: data.secure_url }));
    setImageUploading(false);
  };

  const handleSaveEdit = async (id) => {
    setSaving(true);
    await onSaveEdit(id, editForm);
    setEditingId(null);
    setSaving(false);
  };

  if (loading) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2 bg-gradient-to-r from-[#26F2D0] to-[#00d4ff] bg-clip-text text-transparent">
        📢 Campus Announcements
      </h2>

      {/* Post form */}
      <div className="bg-[#0f0f0f]/70 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
          <Plus size={16} className="text-[#26F2D0]" />
          <h3 className="font-semibold bg-gradient-to-r from-[#26F2D0] to-[#00d4ff] bg-clip-text text-transparent">
            Post New Announcement
          </h3>
        </div>
        <div className="space-y-3">
          <select
            value={newAnn.category}
            onChange={e => setNewAnn(p => ({ ...p, category: e.target.value }))}
            className="w-full p-3 bg-[#111]/80 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-[#26F2D0] focus:ring-1 focus:ring-[#26F2D0]/30 transition-all"
          >
            <option>General</option>
            <option>Event</option>
            <option>Academic</option>
            <option>Notice</option>
          </select>
          <input
            placeholder="Announcement title"
            value={newAnn.title}
            onChange={e => setNewAnn(p => ({ ...p, title: e.target.value }))}
            className="w-full p-3 bg-[#111]/80 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-[#26F2D0] focus:ring-1 focus:ring-[#26F2D0]/30 transition-all"
          />
          <textarea
            placeholder="Announcement content"
            rows="2"
            value={newAnn.content}
            onChange={e => setNewAnn(p => ({ ...p, content: e.target.value }))}
            className="w-full p-3 bg-[#111]/80 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-[#26F2D0] focus:ring-1 focus:ring-[#26F2D0]/30 transition-all resize-none"
          />

          {/* Image upload */}
          <div className="border-2 border-dashed border-white/20 rounded-xl p-4 hover:border-[#26F2D0]/50 transition-colors">
            <label className="cursor-pointer flex flex-col items-center gap-2 text-gray-400 hover:text-[#26F2D0] transition-colors group">
              <Upload size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">
                {imageUploading ? "Uploading..." : "Upload image"}
              </span>
              <input type="file" accept="image/*" className="hidden"
                onChange={e => e.target.files[0] && uploadImage(e.target.files[0])} />
            </label>
            {newAnn.imageUrl && (
              <div className="mt-3 relative">
                <img src={newAnn.imageUrl} className="w-full h-32 object-cover rounded-xl shadow-lg" />
                <button
                  onClick={() => setNewAnn(p => ({ ...p, imageUrl: "" }))}
                  className="absolute top-2 right-2 bg-red-600/90 hover:bg-red-700 text-white rounded-xl w-7 h-7 flex items-center justify-center shadow-lg transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              onPost(newAnn);
              setNewAnn({ title: "", content: "", category: "General", imageUrl: "" });
            }}
            disabled={!newAnn.title || !newAnn.content || imageUploading}
            className="group flex items-center gap-2 bg-gradient-to-r from-[#26F2D0] to-[#00d4ff] text-black px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-[#26F2D0]/40 hover:scale-[1.02] active:scale-95 focus:ring-2 focus:ring-[#26F2D0]/40 transition-all duration-200 disabled:opacity-50 w-full justify-center"
          >
            <Plus size={16} className="group-hover:-translate-x-px transition-transform" />
            Post Announcement
          </button>
        </div>
      </div>

      {/* Announcements grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {announcements.map(a => (
          <div key={a.id}
            className={`group relative rounded-2xl overflow-hidden shadow-xl border border-white/10 backdrop-blur-sm transition-all duration-300 hover:shadow-[#26F2D0]/20 hover:-translate-y-1
              ${a.pinned
                ? "bg-gradient-to-br from-yellow-500/5 to-yellow-600/5 border-yellow-400/30 shadow-yellow-400/20"
                : "bg-[#0f0f0f]/50"
              }`}>
            
            {a.pinned && (
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-gradient-to-r from-yellow-400/90 to-yellow-500/90 border border-yellow-400/50 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-lg">
                <Pin size={12} className="text-yellow-900" />
                <span className="text-xs font-bold text-yellow-900">PINNED</span>
              </div>
            )}

            {a.imageUrl && (
              <div className="overflow-hidden rounded-t-2xl">
                <img src={a.imageUrl} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            )}

            <div className="p-5">
              <div className="flex justify-between items-start mb-3 gap-2 flex-wrap">
                <span className="text-xs bg-gradient-to-r from-[#26F2D0]/20 to-[#00d4ff]/20 text-[#26F2D0] px-3 py-1.5 rounded-xl font-semibold border border-[#26F2D0]/30">
                  {a.category}
                </span>

                <div className="flex gap-1.5 items-center flex-nowrap">
                  <button
                    onClick={() => onPin(a.id)}
                    className={`p-2 rounded-xl transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-yellow-400/50 shadow-md
                      ${a.pinned
                        ? "bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 text-yellow-800 border border-yellow-400/40 shadow-yellow-400/25"
                        : "bg-white/10 text-gray-400 hover:bg-yellow-400/20 hover:text-yellow-400 border border-white/20"
                      }`}
                    title={a.pinned ? "Unpin" : "Pin"}
                  >
                    <Pin size={14} />
                  </button>

                  <button
                    onClick={() => {
                      setEditingId(a.id);
                      setEditForm({ title: a.title, content: a.content, category: a.category });
                    }}
                    className="group p-2 rounded-xl bg-white/10 hover:bg-[#26F2D0]/20 hover:text-[#26F2D0] text-gray-400 border border-white/20 shadow-md hover:shadow-[#26F2D0]/25 hover:scale-105 focus:ring-2 focus:ring-[#26F2D0]/40 transition-all duration-200"
                    title="Edit"
                  >
                    <Pencil size={14} className="group-hover:rotate-12 transition-transform" />
                  </button>

                  {confirmDelete === a.id ? (
                    <div className="flex items-center gap-1.5 p-2 bg-red-500/10 backdrop-blur-sm rounded-xl border border-red-500/30 shadow-md">
                      <span className="text-xs font-semibold text-red-300">Delete?</span>
                      <button
                        onClick={() => { onDelete(a.id); setConfirmDelete(null); }}
                        className="p-2 text-red-400 bg-red-500/20 hover:bg-red-500/40 rounded-lg border border-red-400/40 shadow-md hover:scale-105 transition-all flex items-center gap-1"
                      >
                        <Trash2 size={12} /> Yes
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="p-2 text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg shadow-md hover:scale-105 transition-all"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(a.id)}
                      className="group p-2 rounded-xl bg-red-500/15 hover:bg-red-500/30 text-red-400 border border-red-400/30 shadow-md hover:shadow-red-500/25 hover:scale-105 focus:ring-2 focus:ring-red-500/40 transition-all duration-200"
                      title="Delete"
                    >
                      <Trash2 size={14} className="group-hover:-translate-x-px transition-transform" />
                    </button>
                  )}
                </div>
              </div>

              {editingId === a.id ? (
                <div className="space-y-2 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 shadow-inner">
                  <select
                    value={editForm.category}
                    onChange={e => setEditForm(p => ({ ...p, category: e.target.value }))}
                    className="w-full bg-[#111]/80 border border-white/20 rounded-lg px-3 py-2 text-sm text-white backdrop-blur-sm focus:border-[#26F2D0]"
                  >
                    <option>General</option>
                    <option>Event</option>
                    <option>Academic</option>
                    <option>Notice</option>
                  </select>
                  <input
                    value={editForm.title}
                    onChange={e => setEditForm(p => ({ ...p, title: e.target.value }))}
                    className="w-full bg-[#111]/80 border border-white/20 rounded-lg px-3 py-2 text-sm text-white backdrop-blur-sm focus:border-[#26F2D0]"
                    placeholder="Title"
                  />
                  <textarea
                    value={editForm.content}
                    onChange={e => setEditForm(p => ({ ...p, content: e.target.value }))}
                    rows="2"
                    className="w-full bg-[#111]/80 border border-white/20 rounded-lg px-3 py-2 text-sm text-white backdrop-blur-sm focus:border-[#26F2D0] resize-none"
                    placeholder="Content"
                  />
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-semibold bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white shadow-md hover:scale-[1.02] transition-all"
                    >
                      <X size={14} /> Cancel
                    </button>
                    <button
                      onClick={() => handleSaveEdit(a.id)}
                      disabled={saving}
                      className="flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#26F2D0]/20 to-[#00d4ff]/20 text-[#26F2D0] hover:from-[#26F2D0]/40 hover:shadow-[#26F2D0]/25 hover:scale-[1.02] shadow-md transition-all disabled:opacity-40"
                    >
                      <Save size={14} /> {saving ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="font-bold text-white group-hover:text-[#26F2D0] text-lg leading-tight line-clamp-2 transition-colors">{a.title}</h3>
                  <p className="text-gray-300 text-sm mt-2 line-clamp-2 leading-relaxed">{a.content}</p>
                  <p className="text-gray-500 text-xs mt-3 font-medium flex items-center gap-1">
                    by {a.postedBy}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
