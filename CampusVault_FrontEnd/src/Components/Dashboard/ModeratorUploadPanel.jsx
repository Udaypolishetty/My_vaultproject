import { useState } from "react";
import { Upload, Send, X, Shield, Newspaper } from "lucide-react";

export default function ModeratorUploadPanel({ token }) {
  const [form, setForm] = useState({
    title: "", content: "", category: "General", imageUrl: ""
  });
  const [uploading, setUploading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);

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

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#26F2D0]/10 border border-[#26F2D0]/20
                        flex items-center justify-center">
          <Shield size={18} className="text-[#26F2D0]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Moderator Panel</h3>
          <p className="text-xs text-gray-400">Post campus news and announcements</p>
        </div>
      </div>

      {posted && (
        <div className="mb-4 flex items-center gap-2 bg-green-500/10 border border-green-500/20
                        rounded-xl px-4 py-3 text-sm text-green-400">
          ✅ News posted successfully!
        </div>
      )}

      <div className="bg-[#111] border border-white/10 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Newspaper size={14} className="text-[#26F2D0]" />
          <h4 className="text-sm font-semibold text-[#26F2D0]">Post Campus News</h4>
        </div>

        <select
          value={form.category}
          onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
                     text-sm text-white outline-none focus:border-[#26F2D0]/50 transition"
        >
          <option>General</option>
          <option>Event</option>
          <option>Academic</option>
          <option>Notice</option>
        </select>

        <input
          value={form.title}
          onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
          placeholder="News title..."
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
                     text-sm text-white placeholder-gray-500 outline-none
                     focus:border-[#26F2D0]/50 transition"
        />

        <textarea
          value={form.content}
          onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
          placeholder="Write the announcement content..."
          rows={4}
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5
                     text-sm text-white placeholder-gray-500 outline-none resize-none
                     focus:border-[#26F2D0]/50 transition"
        />

        <div className="border border-dashed border-white/20 rounded-xl p-4">
          <label className="cursor-pointer flex flex-col items-center gap-2
                            text-gray-400 hover:text-white transition">
            <Upload size={20} className="text-gray-500" />
            <span className="text-xs">
              {uploading ? "Uploading..." : "Click to attach image (optional)"}
            </span>
            <input type="file" accept="image/*" className="hidden"
              onChange={e => e.target.files[0] && uploadImage(e.target.files[0])} />
          </label>
          {form.imageUrl && (
            <div className="mt-3 relative">
              <img src={form.imageUrl} className="w-full h-36 object-cover rounded-xl" />
              <button
                onClick={() => setForm(p => ({ ...p, imageUrl: "" }))}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full
                           w-6 h-6 flex items-center justify-center hover:bg-red-700 transition"
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>

        <button
          onClick={postNews}
          disabled={!form.title || !form.content || posting || uploading}
          className="flex items-center justify-center gap-2 w-full py-3 bg-[#26F2D0]
                     text-black rounded-xl font-semibold text-sm hover:bg-[#1dd4b8]
                     transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send size={14} />
          {posting ? "Posting..." : "Post Announcement"}
        </button>
      </div>
    </div>
  );
}