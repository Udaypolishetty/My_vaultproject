// import { User, GraduationCap, Mail, Lightbulb, ThumbsUp, MessageCircle, Building } from "lucide-react";

// export default function StudentProfiles({ name, rollNumber, email, ideas, myClub, joinedClubs, loading }) {
//   const totalLikes = ideas.reduce((sum, i) => sum + (i.likes || 0), 0);
//   const totalComments = ideas.reduce((sum, i) => sum + (i.comments?.length || 0), 0);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//       {/* Personal Info */}
//       <div className="bg-[#111] border border-white/10 rounded-2xl p-6 space-y-3">
//         <h3 className="font-semibold text-[#26F2D0] mb-4">Personal Info</h3>
//         {[
//           { label: "Full Name",    value: name,       icon: <User size={16} className="text-[#26F2D0]" /> },
//           { label: "Roll Number",  value: rollNumber, icon: <GraduationCap size={16} className="text-[#26F2D0]" /> },
//           { label: "Email",        value: email,      icon: <Mail size={16} className="text-[#26F2D0]" /> },
//         ].map(({ label, value, icon }) => (
//           <div key={label} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
//             <div className="w-8 h-8 rounded-lg bg-[#26F2D0]/10 flex items-center justify-center shrink-0">
//               {icon}
//             </div>
//             <div>
//               <p className="text-xs text-gray-500">{label}</p>
//               <p className="text-white text-sm font-medium">{value || "—"}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Stats */}
//       <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
//         <h3 className="font-semibold text-[#26F2D0] mb-4">Your Stats</h3>
//         <div className="grid grid-cols-2 gap-4">
//           {[
//             { label: "Ideas Posted",     value: ideas.length,                           icon: <Lightbulb size={20} className="text-yellow-400" /> },
//             { label: "Total Likes",      value: totalLikes,                             icon: <ThumbsUp size={20} className="text-[#26F2D0]" /> },
//             { label: "Total Responses",  value: totalComments,                          icon: <MessageCircle size={20} className="text-purple-400" /> },
//             { label: "Clubs",            value: (myClub ? 1 : 0) + joinedClubs.length, icon: <Building size={20} className="text-orange-400" /> },
//           ].map(({ label, value, icon }) => (
//             <div key={label} className="bg-white/5 rounded-xl p-4 text-center">
//               <div className="flex justify-center mb-1">{icon}</div>
//               <p className="text-2xl font-bold text-white">{loading ? "—" : value}</p>
//               <p className="text-xs text-gray-400 mt-1">{label}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* My Ideas */}
//       {ideas.length > 0 && (
//         <div className="md:col-span-2 bg-[#111] border border-white/10 rounded-2xl p-6">
//           <h3 className="font-semibold text-[#26F2D0] mb-4">My Ideas</h3>
//           <div className="space-y-3">
//             {ideas.map(idea => (
//               <div key={idea.id}
//                 className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
//                 <div>
//                   <p className="text-white font-medium text-sm">{idea.title}</p>
//                   <p className="text-gray-500 text-xs">{idea.category}</p>
//                 </div>
//                 <div className="flex gap-4 text-xs text-gray-400">
//                   <span className="flex items-center gap-1">
//                     <ThumbsUp size={11} /> {idea.likes || 0}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <MessageCircle size={11} /> {idea.comments?.length || 0}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { User, GraduationCap, Mail, Lightbulb, ThumbsUp, MessageCircle, Building } from "lucide-react";

export default function StudentProfiles({ name, rollNumber, email, ideas, myClub, joinedClubs, loading }) {
  const totalLikes = ideas.reduce((sum, i) => sum + (i.likes || 0), 0);
  const totalComments = ideas.reduce((sum, i) => sum + (i.comments?.length || 0), 0);

  // ✅ check if any idea is implemented
  const implementedIdeas = ideas.filter(i => i.status === "IMPLEMENTED");
  const hasImplemented = implementedIdeas.length > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Personal Info */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-6 space-y-3">
        <h3 className="font-semibold text-[#26F2D0] mb-4">Personal Info</h3>
        {[
          { label: "Full Name",    value: name,       icon: <User size={16} className="text-[#26F2D0]" /> },
          { label: "Roll Number",  value: rollNumber, icon: <GraduationCap size={16} className="text-[#26F2D0]" /> },
          { label: "Email",        value: email,      icon: <Mail size={16} className="text-[#26F2D0]" /> },
        ].map(({ label, value, icon }) => (
          <div key={label} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
            <div className="w-8 h-8 rounded-lg bg-[#26F2D0]/10 flex items-center justify-center shrink-0">
              {icon}
            </div>
            <div>
              <p className="text-xs text-gray-500">{label}</p>
              <p className="text-white text-sm font-medium">{value || "—"}</p>
            </div>
          </div>
        ))}

        {/* ✅ Contributor badge */}
        {hasImplemented && (
          <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-500/10
                          to-orange-500/5 border border-yellow-500/20 rounded-xl p-3 mt-2">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center
                            justify-center shrink-0 text-base">
              💡
            </div>
            <div>
              <p className="text-yellow-400 text-sm font-semibold">
                Idea Implemented
              </p>
              <p className="text-gray-500 text-xs">
                {implementedIdeas.length === 1
                  ? `"${implementedIdeas[0].title}" was implemented`
                  : `${implementedIdeas.length} ideas implemented`
                }
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
        <h3 className="font-semibold text-[#26F2D0] mb-4">Your Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Ideas Posted",     value: ideas.length,                           icon: <Lightbulb size={20} className="text-yellow-400" /> },
            { label: "Total Likes",      value: totalLikes,                             icon: <ThumbsUp size={20} className="text-[#26F2D0]" /> },
            { label: "Total Responses",  value: totalComments,                          icon: <MessageCircle size={20} className="text-purple-400" /> },
            { label: "Clubs",            value: (myClub ? 1 : 0) + joinedClubs.length, icon: <Building size={20} className="text-orange-400" /> },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-white/5 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-1">{icon}</div>
              <p className="text-2xl font-bold text-white">{loading ? "—" : value}</p>
              <p className="text-xs text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* My Ideas */}
      {ideas.length > 0 && (
        <div className="md:col-span-2 bg-[#111] border border-white/10 rounded-2xl p-6">
          <h3 className="font-semibold text-[#26F2D0] mb-4">My Ideas</h3>
          <div className="space-y-3">
            {ideas.map(idea => (
              <div key={idea.id}
                className={`flex items-center justify-between rounded-xl px-4 py-3
                  ${idea.status === "IMPLEMENTED"
                    ? "bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20"
                    : "bg-white/5"
                  }`}>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-medium text-sm">{idea.title}</p>
                    {idea.status === "IMPLEMENTED" && (
                      <span className="text-xs text-green-400 bg-green-500/20
                                       border border-green-500/30 px-2 py-0.5 rounded-full">
                        ✅ Implemented
                      </span>
                    )}
                    {idea.status === "UNDER_REVIEW" && (
                      <span className="text-xs text-blue-400 bg-blue-500/20
                                       border border-blue-500/30 px-2 py-0.5 rounded-full">
                        🔍 Under Review
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs">{idea.category}</p>
                </div>
                <div className="flex gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <ThumbsUp size={11} /> {idea.likes || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={11} /> {idea.comments?.length || 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}