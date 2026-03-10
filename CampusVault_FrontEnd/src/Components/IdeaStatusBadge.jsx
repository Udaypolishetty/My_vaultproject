const getStatusConfig = (status) => {
  switch (status) {
    case "UNDER_REVIEW":
      return {
        label: "Under Review",
        icon: "🔍",
        cardBorder: "border-blue-400/40 shadow-[0_0_15px_rgba(96,165,250,0.08)]",
        badge: "bg-blue-400/15 text-blue-400 animate-pulse",
        banner: "bg-blue-500/10 border-blue-400/20 text-blue-300"
      };
    case "IMPLEMENTED":
      return {
        label: "Implemented",
        icon: "✅",
        cardBorder: "border-green-400/40 shadow-[0_0_15px_rgba(74,222,128,0.1)]",
        badge: "bg-green-400/15 text-green-400",
        banner: "bg-green-500/10 border-green-400/20 text-green-300"
      };
    case "ON_HOLD":
      return {
        label: "On Hold",
        icon: "⏸",
        cardBorder: "border-yellow-400/40 shadow-[0_0_15px_rgba(250,204,21,0.08)]",
        badge: "bg-yellow-400/15 text-yellow-400",
        banner: "bg-yellow-500/10 border-yellow-400/20 text-yellow-300"
      };
    case "REJECTED":
      return {
        label: "Not Accepted",
        icon: "❌",
        cardBorder: "border-gray-400/20",
        badge: "bg-gray-400/10 text-gray-500",
        banner: "bg-gray-500/10 border-gray-400/20 text-gray-400"
      };
    default:
      return null;
  }
};

// ✅ inline badge beside title
export const IdeaStatusBadge = ({ status }) => {
  const config = getStatusConfig(status);
  if (!config) return null;
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0
                      ${config.badge}`}>
      {config.icon} {config.label}
    </span>
  );
};

// ✅ banner shown below title on card
export const IdeaStatusBanner = ({ status, moderatorNote, reviewedBy, size = "sm" }) => {
  const config = getStatusConfig(status);
  if (!config) return null;
  return (
    <div className={`flex items-start gap-2 px-3 py-2 rounded-xl border
                     ${size === "lg" ? "text-sm px-4 py-3" : "text-xs"}
                     ${config.banner}`}>
      <span className="shrink-0">{config.icon}</span>
      <div>
        <span className="font-semibold">{config.label}</span>
        {moderatorNote && (
          <p className="opacity-75 mt-0.5">{moderatorNote}</p>
        )}
        {reviewedBy && (
          <p className="opacity-50 mt-0.5 text-xs">by {reviewedBy}</p>
        )}
      </div>
    </div>
  );
};

// ✅ card border class — use in className
export { getStatusConfig };

export default getStatusConfig;