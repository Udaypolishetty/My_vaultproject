// import { Trophy, LayoutGrid,Gem } from "lucide-react";

// export default function IdeasHeader({
//   activeView, setActiveView,
//   canPost, postError, onPostClick
// }) {
//   return (
//     <div className="bg-gradient-to-r from-[#0b0b0b] to-[#141414]
//                     border border-white/5 rounded-2xl p-6
//                     flex flex-col md:flex-row md:items-center md:justify-between
//                     gap-6 shadow-lg">
//       <div className="flex items-start gap-4">
//         <div className="bg-[#26F2D0]/10 text-[#26F2D0] p-3 rounded-xl"><Gem size={20}/></div>
//         <div>
//           <h2 className="text-2xl font-bold">Ideas Board</h2>
//           <p className="text-gray-400 text-sm">Share and support student initiatives</p>
//           {postError && (
//             <p className={`text-xs mt-1 flex items-center gap-1 ${
//               postError.startsWith("Idea posted") ? "text-[#26F2D0]" : "text-red-400"
//             }`}>
//               {postError.startsWith("Idea posted") ? "✅" : "⚠️"} {postError}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="flex items-center gap-3">
//         <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 gap-1">
//           <button
//             onClick={() => setActiveView("board")}
//             className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
//               ${activeView === "board"
//                 ? "bg-[#26F2D0] text-black"
//                 : "text-gray-400 hover:text-white"}`}
//           >
//             <LayoutGrid size={13} /> Board
//           </button>
//           <button
//             onClick={() => setActiveView("leaderboard")}
//             className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
//               ${activeView === "leaderboard"
//                 ? "bg-[#26F2D0] text-black"
//                 : "text-gray-400 hover:text-white"}`}
//           >
//             <Trophy size={13} /> Leaderboard
//           </button>
//         </div>

//         <button
//           onClick={onPostClick}
//           className={`px-5 py-2 rounded-xl font-semibold transition-all ${
//             canPost
//               ? "bg-[#26F2D0] text-black hover:bg-[#1fd4b8]"
//               : "bg-[#26F2D0]/30 text-gray-500 cursor-not-allowed"
//           }`}
//         >
//           + Post an Idea
//         </button>
//       </div>
//     </div>
//   );
// }


import { Trophy, LayoutGrid, Gem, PlusCircle, Bell } from "lucide-react";

export default function IdeasHeader({
  activeView, setActiveView,
  canPost, postError, onPostClick, unread = 0 // added unread prop
}) {
  return (
    <div className="bg-gradient-to-r from-[#0b0b0b] to-[#141414] 
                    border border-white/5 rounded-2xl p-4 md:p-6 
                    flex flex-col md:flex-row md:items-center md:justify-between 
                    gap-4 md:gap-6 shadow-lg">
      
      {/* LEFT SECTION: Title & Error */}
      <div className="flex items-center gap-4">
        <div className="bg-[#26F2D0]/10 text-[#26F2D0] p-3 rounded-xl shrink-0">
          <Gem size={24} className="md:w-[20px]" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Ideas Board</h2>
          <p className="text-gray-400 text-xs md:text-sm">Student initiatives</p>
          
          {postError && (
            <p className={`text-[10px] md:text-xs mt-1 flex items-center gap-1 ${
              postError.startsWith("Idea posted") ? "text-[#26F2D0]" : "text-red-400"
            }`}>
              {postError.startsWith("Idea posted") ? "✅" : "⚠️"} {postError}
            </p>
          )}
        </div>
      </div>

      {/* RIGHT SECTION: Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        
        {/* View Switcher - Full width on mobile */}
        <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 gap-1">
          <button
            onClick={() => setActiveView("board")}
            className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 md:py-1.5 rounded-lg text-xs font-medium transition-all
              ${activeView === "board" 
                ? "bg-[#26F2D0] text-black" 
                : "text-gray-400 hover:text-white"}`}
          >
            <LayoutGrid size={14} /> Board
          </button>
          <button
            onClick={() => setActiveView("leaderboard")}
            className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 md:py-1.5 rounded-lg text-xs font-medium transition-all
              ${activeView === "leaderboard" 
                ? "bg-[#26F2D0] text-black" 
                : "text-gray-400 hover:text-white"}`}
          >
            <Trophy size={14} /> LeaderBoard
          </button>
        </div>

        {/* Action Buttons Group */}
        <div className="flex items-center gap-2">
          {/* Notification Bell - Visible mainly on mobile for quick access */}
          {unread > 0 && (
            <button className="flex md:hidden items-center justify-center p-3 rounded-xl bg-white/5 text-[#26F2D0]">
               <Bell size={20} />
            </button>
          )}

          <button
            onClick={onPostClick}
            disabled={!canPost}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 md:py-2 rounded-xl font-bold text-sm transition-all ${
              canPost 
                ? "bg-[#26F2D0] text-black active:scale-95" 
                : "bg-white/5 text-gray-500 cursor-not-allowed border border-white/5"
            }`}
          >
            <PlusCircle size={18} />
            <span>Post Idea</span>
          </button>
        </div>
      </div>
    </div>
  );
}