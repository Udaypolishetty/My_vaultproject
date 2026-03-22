import { Bot, Printer, Code2, Cog, Rocket, Star, Trophy, Music2, Mic2, Camera } from "lucide-react";

export const PREDEFINED_CLUBS = [
  { title: "Artificial Intelligence Club", category: "AI", emoji: "🤖" },
  { title: "3D Printing Club", category: "3D_PRINTING", emoji: "🖨️" },
  { title: "Web Development Club", category: "WEB_DEV", emoji: "💻" },
  { title: "Robotics Club", category: "ROBOTICS", emoji: "🦾" },
  { title: "Entrepreneurship Club", category: "ENTREPRENEURSHIP", emoji: "🚀" },
  { title: "Technical Fest", category: "TECH_FEST", emoji: "🎉" },
  { title: "Sports Club", category: "SPORTS", emoji: "⚽" },
  { title: "Cultural Club", category: "CULTURAL", emoji: "🎭" },
  { title: "Toastmasters Club", category: "TOASTMASTERS", emoji: "🎤" },
  { title: "Photography Club", category: "PHOTOGRAPHY", emoji: "📷" },
  { title: "Social Welfare Club", category: "CULTURAL", emoji: "🤝" },
];

export const STATUS_COLORS = {
  ACTIVE:    "bg-green-500/20 text-green-400",
  DISSOLVED: "bg-red-500/20 text-red-400",
  COMPLETED: "bg-yellow-500/20 text-yellow-400",
};

export const RISK_CONFIG = {
  LOW:    { label: "Easy",   color: "#22c55e", bg: "rgba(34,197,94,0.1)",   border: "rgba(34,197,94,0.2)"  },
  MEDIUM: { label: "Medium", color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.2)" },
  HIGH:   { label: "Hard",   color: "#ef4444", bg: "rgba(239,68,68,0.1)",   border: "rgba(239,68,68,0.2)"  },
};

const ICON_MAP = {
  AI:               <Bot  size={18} className="text-purple-400" />,
  "3D_PRINTING":    <Printer size={18} className="text-orange-400" />,
  WEB_DEV:          <Code2 size={18} className="text-blue-400" />,
  ROBOTICS:         <Cog  size={18} className="text-cyan-400" />,
  ENTREPRENEURSHIP: <Rocket size={18} className="text-green-400" />,
  TECH_FEST:        <Star size={18} className="text-yellow-400" />,
  SPORTS:           <Trophy size={18} className="text-red-400" />,
  CULTURAL:         <Music2 size={18} className="text-pink-400" />,
  TOASTMASTERS:     <Mic2 size={18} className="text-indigo-400" />,
  PHOTOGRAPHY:      <Camera size={18} className="text-amber-400" />,
};

export const ClubIcon = ({ category }) =>
  ICON_MAP[category]
    ? <span className="flex items-center justify-center">{ICON_MAP[category]}</span>
    : <span className="text-lg">🏛️</span>;

export const call = (token) => ({
  patch: (url) => fetch(`http://localhost:8081${url}`, { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }),
  del:   (url) => fetch(`http://localhost:8081${url}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }),
  post:  (url, body) => fetch(`http://localhost:8081${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  }),
});