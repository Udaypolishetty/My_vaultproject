import { API_BASE } from "../config/api";
import { useState, useEffect, useRef } from "react";
import BuzzComposer from "./Buzz/BuzzComposer";
import BuzzFeed from "./Buzz/BuzzFeed";
import { ArrowUp, RefreshCw, Zap,Megaphone } from "lucide-react";

export default function CampusBuzz({ onNewPost }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCount, setNewCount] = useState(0);
  const [pendingPosts, setPendingPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const latestPostTime = useRef(null);

  const token = sessionStorage.getItem("token");
  const myRoll = sessionStorage.getItem("rollNumber");
  const role = sessionStorage.getItem("role");

  useEffect(() => {
    fetchPosts();
    localStorage.setItem("lastBuzzVisit", Date.now().toString());
  }, []);

  // ✅ poll every 30 seconds for new posts from others
  useEffect(() => {
    if (loading) return;
    const interval = setInterval(pollNewPosts, 30000);
    return () => clearInterval(interval);
  }, [loading, posts]);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/buzz`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) return;
      const data = await res.json();
      setPosts(data);
      if (data.length > 0) {
        latestPostTime.current = Math.max(...data.map(p => new Date(p.createdAt).getTime()));
      } else {
        latestPostTime.current = Date.now();
      }
    } catch (err) {
      console.error("Failed to fetch buzz posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const pollNewPosts = async () => {
    if (!latestPostTime.current) return;
    try {
      const res = await fetch(`${API_BASE}/api/buzz`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) return;
      const data = await res.json();

      // ✅ only posts newer than current feed AND not by me
      const newer = data.filter(p =>
        new Date(p.createdAt).getTime() > latestPostTime.current &&
        p.createdByRollNumber !== myRoll
      );

      if (newer.length > 0) {
        setPendingPosts(newer);
        setNewCount(newer.length);
      }
    } catch (err) {
      console.error("Poll failed:", err);
    }
  };

  // ✅ load buffered posts into feed when banner clicked
  const loadNewPosts = () => {
    setPosts(prev => {
      const merged = [...pendingPosts, ...prev];
      latestPostTime.current = Math.max(...merged.map(p => new Date(p.createdAt).getTime()));
      return merged;
    });
    setPendingPosts([]);
    setNewCount(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePost = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
    latestPostTime.current = new Date(newPost.createdAt).getTime();
    if (onNewPost) onNewPost(newPost);
  };

  const handleUpdate = (updated) => {
    setPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleDelete = (id) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  if (loading) return (
    <div className="text-center py-20 text-gray-500">Loading buzz...</div>
  );


  const handleRefresh = async () => {
  setRefreshing(true);
  try {
    const res = await fetch(`${API_BASE}/api/buzz`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return;
    const data = await res.json();
    setPosts(data);
    setPendingPosts([]);
    setNewCount(0);

    if (data.length > 0) {
      latestPostTime.current = Math.max(
        ...data.map(p => new Date(p.createdAt).getTime())
      );
    } else {
      latestPostTime.current = Date.now();
    }
  } catch (err) {
    console.error("Refresh failed:", err);
  } finally {
    setRefreshing(false);
  }
};






  return (
    // <div className="max-w-2xl mx-auto pb-20">
    <div className="max-w-2xl mx-auto px-3 sm:px-4 pb-16 sm:pb-20">


<div className="flex items-center justify-between mb-3 px-1">
  <div className="flex items-center gap-2">
    <Zap size={18} className="text-[#26F2D0]" />
    <h2 className="text-lg font-bold text-white">Campus Buzz</h2>
  </div>

  <button
    onClick={handleRefresh}
    disabled={refreshing}
    className="flex items-center gap-1.5 px-3 py-2 text-xs
               bg-white/5 text-gray-300 border border-white/10
               rounded-xl hover:text-white hover:border-white/20
               transition disabled:opacity-50"
  >
    <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
    Refresh
  </button>
</div>

      {/* ✅ Sticky new posts banner — slides in when new posts arrive */}
      <div className={`sticky top-16 z-40 flex justify-center transition-all duration-500
                       ${newCount > 0
                         ? "opacity-100 translate-y-0 mb-3"
                         : "opacity-0 -translate-y-4 pointer-events-none h-0 mb-0"}`}>
        <button
          onClick={loadNewPosts}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full
                     bg-[#26F2D0] text-black text-sm font-semibold shadow-lg
                     hover:bg-[#1dd4b8] transition-all active:scale-95
                     shadow-[0_0_20px_rgba(38,242,208,0.4)]">
          <ArrowUp size={15} />
          {newCount} new post{newCount > 1 ? "s" : ""} — tap to load
        </button>
      </div>

      <BuzzComposer token={token} onPost={handlePost} />

      {posts.length === 0 ? (
<div className="flex flex-col items-center justify-center py-20 text-center">
  <Megaphone 
    size={48} 
    className="text-gray-600 mb-4 opacity-20" 
    strokeWidth={1.5} 
  />
  <p className="text-gray-400">No posts yet. Be the first to buzz!</p>
</div>
      ) : (
        <BuzzFeed
          posts={posts}
          token={token}
          myRoll={myRoll}
          role={role}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}