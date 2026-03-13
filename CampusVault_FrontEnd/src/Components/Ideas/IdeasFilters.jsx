const CATEGORIES = ["All", "Tech", "Academic", "Campus Pulse", "Cultural", "Others"];

export default function IdeasFilters({ activeFilter, setActiveFilter }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => setActiveFilter(cat)}
          className={`px-4 py-2 rounded-full text-sm transition-all ${
            activeFilter === cat
              ? "bg-[#26F2D0] text-black"
              : "bg-[#232323] text-gray-300 hover:bg-white/10"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}