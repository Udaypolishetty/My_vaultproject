// import React, { useEffect, useState } from "react";
// import { MdDelete } from "react-icons/md";
// import ClubForm from "../ClubForm";

// function AddClub() {
//   const [club, setClub] = useState(null);
//   const [agree, setAgree] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) return;
//     fetchMyClub();
//   }, []);

//   const fetchMyClub = async () => {
//     try {
//       console.log("Token:", token);
//     console.log("RollNumber in storage:", localStorage.getItem("rollNumber"));
//       const res = await fetch("http://localhost:8081/api/clubs/my", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) return;
//       const data = await res.json();
//        console.log("My clubs response:", data);
//       if (data.length > 0) setClub(data[0]);
//     } catch (err) {
//       console.error("Failed to fetch club:", err);
//     }
//   };

//   const handleCreateClub = async (formData) => {
//     setError("");
//     if (!token) { setError("You are not logged in. Please login again."); return; }

//     try {
//       setLoading(true);
//       const res = await fetch("http://localhost:8081/api/clubs/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         setError(err.message || "Failed to create club");
//         return;
//       }

//       const createdClub = await res.json();
//       setClub(createdClub);
//       setShowForm(false);
//       setAgree(false);
//     } catch (err) {
//       console.error(err);
//       setError("Backend not reachable. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteClub = async () => {
//     if (!token) { setError("You are not logged in. Please login again."); return; }
//     if (!window.confirm("Are you sure you want to delete this club?")) return;

//     try {
//       const res = await fetch(`http://localhost:8081/api/clubs/${club.id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) {
//         const text = await res.text();
//         setError(text || "Delete failed");
//         return;
//       }

//       setClub(null);
//       setAgree(false);
//       // ✅ Notify JoinClub to refresh
//       window.dispatchEvent(new Event("clubDeleted"));
//     } catch (err) {
//       console.error("Delete failed:", err);
//       setError("Failed to delete club");
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col relative">

//         {/* Delete button */}
//         {club && (
//           <button
//             onClick={handleDeleteClub}
//             className="absolute top-4 right-4 text-red-400 hover:text-red-600 text-xl"
//           >
//             <MdDelete />
//           </button>
//         )}

//         {/* Title */}
//         <h1 className="mt-4 font-bold text-center">
//           {club ? club.title : "Create New Club"}
//         </h1>

//         {/* Error */}
//         {error && (
//           <p className="text-red-500 text-sm text-center mt-2 font-semibold">
//             {error}
//           </p>
//         )}

//         {/* Content */}
//         <section className="mt-10 flex flex-col gap-4">
//           {club ? (
//             <div className="flex flex-col gap-3">

//               {/* Club details */}
//               <p className="text-gray-300">{club.description}</p>
//               <a
//                 href={club.linkedinUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-400 hover:underline text-sm"
//               >
//                 LinkedIn →
//               </a>
//               <p className="text-xs text-gray-500">
//                 Created by {club.createdByName} ({club.createdBy})
//               </p>

//               {/* Members section */}
//               <div className="mt-2">
//                 <div className="flex items-center justify-between mb-2">
//                   <h2 className="text-sm font-semibold text-white">Members</h2>
//                   <span className="text-xs text-gray-500">
//                     {club.memberCount ?? club.members?.length ?? 0} / 6 joined
//                   </span>
//                 </div>

//                 {club.memberDetails && club.memberDetails.length > 0 ? (
//                   // ✅ max-h shows ~3 members (each ~40px + gap), scroll for rest
//                   <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar"
//                     style={{ maxHeight: "132px" }} // 3 × 40px + 2 × 6px gap
//                   >
//                     {club.memberDetails.map((member, index) => (
//                       <div
//                         key={member.rollNumber}
//                         className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-3 py-2 shrink-0"
//                       >
//                         {/* Index circle */}
//                         <div className="w-7 h-7 rounded-full bg-[#26F2D0]/20 text-[#26F2D0]
//                                         flex items-center justify-center text-xs font-bold shrink-0">
//                           {index + 1}
//                         </div>

//                         {/* Single line: name · rollNumber · year · branch · LinkedIn (if has club) */}
//                         <div className="flex items-center gap-2 flex-wrap min-w-0 text-xs">
//                           <span className="text-white font-medium">{member.name}</span>
//                           <span className="text-gray-600">·</span>
//                           <span className="text-gray-400">{member.rollNumber}</span>
//                           <span className="text-gray-600">·</span>
//                           <span className="text-gray-400">{member.year}</span>
//                           <span className="text-gray-600">·</span>
//                           <span className="text-gray-400">{member.branch}</span>

//                           {/* Show LinkedIn only if member created their own club */}
//                           {member.linkedinUrl && (
//                             <>
//                               <span className="text-gray-600">·</span>
//                               <a
//                                 href={member.linkedinUrl}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-blue-400 hover:underline shrink-0"
//                               >
//                                 LinkedIn →
//                               </a>
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-xs text-gray-500 text-center py-3">
//                     No members yet. Share your club!
//                   </p>
//                 )}
//               </div>

//             </div>
//           ) : (
//             <div className="flex flex-col gap-4">
//               <p>
//                 Clubs help students improve technical skills, teamwork,
//                 leadership, and real-world problem solving.
//               </p>
//               <p>
//                 You can create only one club. Once created, you may delete it.
//               </p>
//               <p className="text-red-400">
//                 Note : Once you create a club title and description, they cannot
//                  be edited or updated, so please fill them out carefully
//               </p>
//             </div>
//           )}
//         </section>

//         {/* Create form */}
//         {!club && (
//           <form className="mt-6">
//             <label className="flex gap-2 items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={agree}
//                 onChange={(e) => setAgree(e.target.checked)}
//               />
//               <span>I agree to the club creation terms</span>
//             </label>

//             <div className="flex justify-end mt-4">
//               <button
//                 type="button"
//                 onClick={() => setShowForm(true)}
//                 disabled={!agree || loading}
//                 className={`rounded-xl px-5 py-2 text-black font-semibold transition
//                   ${agree && !loading
//                     ? "bg-[#26F2D0] hover:scale-105"
//                     : "bg-[#26F2D0]/20 cursor-not-allowed"
//                   }`}
//               >
//                 {loading ? "Creating..." : "Create Club"}
//               </button>
//             </div>
//           </form>
//         )}

//         {/* Club form modal */}
//         {showForm && (
//           <ClubForm
//             onClose={() => setShowForm(false)}
//             onSubmit={handleCreateClub}
//             loading={loading}
//           />
//         )}

//       </div>
//     </>
//   );
// }

// export default AddClub;


//new mallu.....\\

// import React, { useEffect, useState } from "react";
// import { MdDelete } from "react-icons/md";
// import ClubForm from "../ClubForm";

// function AddClub() {
//   const [club, setClub] = useState(null);
//   const [agree, setAgree] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) return;
//     fetchMyClub();
//   }, []);

//   const fetchMyClub = async () => {
//     try {
//       console.log("Token:", token);
//     console.log("RollNumber in storage:", localStorage.getItem("rollNumber"));
//       const res = await fetch("http://localhost:8081/api/clubs/my", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) return;
//       const data = await res.json();
//        console.log("My clubs response:", data);
//       if (data.length > 0) setClub(data[0]);
//     } catch (err) {
//       console.error("Failed to fetch club:", err);
//     }
//   };

//   const handleCreateClub = async (formData) => {
//     setError("");
//     if (!token) { setError("You are not logged in. Please login again."); return; }

//     try {
//       setLoading(true);
//       const res = await fetch("http://localhost:8081/api/clubs/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         setError(err.message || "Failed to create club");
//         return;
//       }

//       const createdClub = await res.json();
//       setClub(createdClub);
//       setShowForm(false);
//       setAgree(false);
//     } catch (err) {
//       console.error(err);
//       setError("Backend not reachable. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteClub = async () => {
//     if (!token) { setError("You are not logged in. Please login again."); return; }
//     if (!window.confirm("Are you sure you want to delete this club?")) return;

//     try {
//       const res = await fetch(`http://localhost:8081/api/clubs/${club.id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) {
//         const text = await res.text();
//         setError(text || "Delete failed");
//         return;
//       }

//       setClub(null);
//       setAgree(false);
//       // ✅ Notify JoinClub to refresh
//       window.dispatchEvent(new Event("clubDeleted"));
//     } catch (err) {
//       console.error("Delete failed:", err);
//       setError("Failed to delete club");
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col relative">

//         {/* Delete button */}
//         {club && (
//           <button
//             onClick={handleDeleteClub}
//             className="absolute top-4 right-4 text-red-400 hover:text-red-600 text-xl"
//           >
//             <MdDelete />
//           </button>
//         )}

//         {/* Title */}
//         <h1 className="mt-4 font-bold text-center">
//           {club ? club.title : "Create New Club"}
//         </h1>

//         {/* Error */}
//         {error && (
//           <p className="text-red-500 text-sm text-center mt-2 font-semibold">
//             {error}
//           </p>
//         )}

//         {/* Content */}
//         <section className="mt-10 flex flex-col gap-4">
//           {club ? (
//             <div className="flex flex-col gap-3">

//               {/* Club details */}
//               <p className="text-gray-300">{club.description}</p>
//               <a
//                 href={club.linkedinUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-400 hover:underline text-sm"
//               >
//                 LinkedIn →
//               </a>
//               <p className="text-xs text-gray-500">
//                 Created by {club.createdByName} ({club.createdBy})
//               </p>

//               {/* Members section */}
//               <div className="mt-2">
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-sm font-semibold text-white">Members</h2>
//                   <span className="text-xs text-gray-500">
//                     {club.memberCount ?? club.members?.length ?? 0} / 20 joined
//                   </span>
//                 </div>

//                 {club.memberDetails && club.memberDetails.length > 0 ? (
//                   // ✅ max-h shows ~3 members (each ~40px + gap), scroll for rest
//                   <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar"
//                     style={{ maxHeight: "132px" }} // 3 × 40px + 2 × 6px gap
//                   >
//                     {club.memberDetails.map((member, index) => (
//                       <div
//                         key={member.rollNumber}
//                         className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 shrink-0"
//                       >
//                         {/* Index circle */}
//                         <div className="w-7 h-7 rounded-full bg-[#26F2D0]/20 text-[#26F2D0]
//                                         flex items-center justify-center text-xs font-bold shrink-0">
//                           {index + 1}
//                         </div>

//                         {/* Single line: name · rollNumber · year · branch · LinkedIn (if has club) */}
//                         <div className="flex items-center gap-2 flex-wrap min-w-0 text-xs">
//                           <span className="text-white font-medium">{member.name}</span>
//                           <span className="text-gray-600">·</span>
//                           <span className="text-gray-400">{member.rollNumber}</span>
//                           <span className="text-gray-600">·</span>
//                           <span className="text-gray-400">{member.year}</span>
//                           <span className="text-gray-600">·</span>
//                           <span className="text-gray-400">{member.branch}</span>

//                           {/* Show LinkedIn only if member created their own club */}
//                           {member.linkedinUrl && (
//                             <>
//                               <span className="text-gray-600">·</span>
//                               <a
//                                 href={member.linkedinUrl}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-blue-400 hover:underline shrink-0"
//                               >
//                                 LinkedIn →
//                               </a>
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-xs text-gray-500 text-center py-3">
//                     No members yet. Share your club!
//                   </p>
//                 )}
//               </div>

//             </div>
//           ) : (
//             <div className="flex flex-col gap-4">
//               <p>
//                 Clubs help students improve technical skills, teamwork,
//                 leadership, and real-world problem solving.
//               </p>
//               <p>
//                 You can create only one club. Once created, you may delete it.
//               </p>
//               <p className="text-red-400">
//                 Note : Once you create a club title and description, they cannot
//                  be edited or updated, so please fill them out carefully
//               </p>
//             </div>
//           )}
//         </section>

//         {/* Create form */}
//         {!club && (
//           <form className="mt-6">
//             <label className="flex gap-2 items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={agree}
//                 onChange={(e) => setAgree(e.target.checked)}
//               />
//               <span>I agree to the club creation terms</span>
//             </label>

//             <div className="flex justify-end mt-4">
//               <button
//                 type="button"
//                 onClick={() => setShowForm(true)}
//                 disabled={!agree || loading}
//                 className={`rounded-xl px-5 py-2 text-black font-semibold transition
//                   ${agree && !loading
//                     ? "bg-[#26F2D0] hover:scale-105"
//                     : "bg-[#26F2D0]/20 cursor-not-allowed"
//                   }`}
//               >
//                 {loading ? "Creating..." : "Create Club"}
//               </button>
//             </div>
//           </form>
//         )}

//         {/* Club form modal */}
//         {showForm && (
//           <ClubForm
//             onClose={() => setShowForm(false)}
//             onSubmit={handleCreateClub}
//             loading={loading}
//           />
//         )}

//       </div>
//     </>
//   );
// }

// export default AddClub;



import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import ClubForm from "../ClubForm";

function AddClub() {
  const [club, setClub] = useState(null);
  const [agree, setAgree] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    fetchMyClub();
  }, [token]);

  const fetchMyClub = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/clubs/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.length > 0) setClub(data[0]);
    } catch (err) {
      console.error("Failed to fetch club:", err);
    }
  };

  const handleCreateClub = async (formData) => {
    setError("");
    if (!token) { setError("You are not logged in. Please login again."); return; }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8081/api/clubs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || "Failed to create club");
        return;
      }

      const createdClub = await res.json();
      setClub(createdClub);
      setShowForm(false);
      setAgree(false);
    } catch (err) {
      console.error(err);
      setError("Backend not reachable. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClub = async () => {
    if (!token) { setError("You are not logged in. Please login again."); return; }
    if (!window.confirm("Are you sure you want to delete this club?")) return;

    try {
      const res = await fetch(`http://localhost:8081/api/clubs/${club.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const text = await res.text();
        setError(text || "Delete failed");
        return;
      }

      setClub(null);
      setAgree(false);
      window.dispatchEvent(new Event("clubDeleted"));
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Failed to delete club");
    }
  };

  return (
    <>
      <div className="flex flex-col relative">

        {/* Delete button */}
        {club && (
          <button
            onClick={handleDeleteClub}
            className="absolute top-4 right-4 text-red-400 hover:text-red-600 text-xl"
          >
            <MdDelete />
          </button>
        )}

        {/* Title */}
        <h1 className="mt-4 font-bold text-center">
          {club ? club.title : "Create New Club"}
        </h1>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-2 font-semibold">
            {error}
          </p>
        )}

        {/* Content */}
        <section className="mt-10 flex flex-col gap-4">
          {club ? (
            <div className="flex flex-col gap-3">
              <p className="text-gray-300">{club.description}</p>
              <a
                href={club.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-sm"
              >
                LinkedIn →
              </a>
              <p className="text-xs text-gray-500">
                Created by {club.createdByName} ({club.createdBy})
              </p>

              {/* Members section */}
              <div className="mt-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-white">Members</h2>
                  <span className="text-xs text-gray-500">
                    {club.memberCount ?? club.members?.length ?? 0} / 20 joined
                  </span>
                </div>

                {club.memberDetails && club.memberDetails.length > 0 ? (
                  <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar"
                    style={{ maxHeight: "132px" }}>
                    {club.memberDetails.map((member, index) => (
                      <div
                        key={member.rollNumber}
                        className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 shrink-0"
                      >
                        <div className="w-7 h-7 rounded-full bg-[#26F2D0]/20 text-[#26F2D0]
                                        flex items-center justify-center text-xs font-bold shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap min-w-0 text-xs">
                          <span className="text-white font-medium">{member.name}</span>
                          <span className="text-gray-600">·</span>
                          <span className="text-gray-400">{member.rollNumber}</span>
                          <span className="text-gray-600">·</span>
                          <span className="text-gray-400">{member.year}</span>
                          <span className="text-gray-600">·</span>
                          <span className="text-gray-400">{member.branch}</span>
                          {member.linkedinUrl && (
                            <>
                              <span className="text-gray-600">·</span>
                              <a
                                href={member.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline shrink-0"
                              >
                                LinkedIn →
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 text-center py-3">
                    No members yet. Share your club!
                  </p>
                )}
              </div>
            </div>
          ) : (
            // ✅ Updated key points
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6 space-y-5 text-sm text-gray-300">

  {/* Purpose */}
  <div className="flex gap-3">
    <span className="text-[#26F2D0]">🎯</span>
    <p>Clubs help students build technical skills, teamwork, and real-world experience.</p>
  </div>

  {/* Members */}
  <div className="flex gap-3">
    <span className="text-[#26F2D0]">👥</span>
    <p>Maximum <span className="text-white font-semibold">20 members</span> can join a club.</p>
  </div>

  {/* LinkedIn networking */}
  <div className="flex gap-3">
    <span className="text-[#26F2D0]">🔗</span>
    <p>Members can connect through LinkedIn. Please provide a valid and professional LinkedIn profile URL.</p>
  </div>

  <div className="flex gap-3">
    <span className="text-[#26F2D0]">🔗</span>
    <p>🤝Collaborate respectfully with club members and maintain a positive learning environment.</p>
  </div>

  

  {/* Ownership rule */}
  <div className="flex gap-3">
    <span className="text-[#26F2D0]">📌</span>
    <p>You can create <span className="text-white font-semibold">only one club</span>. Once created, it may be deleted but its title and description cannot be edited.</p>
  </div>

  {/* Warning */}
  <div className="flex gap-3">
    <span className="text-red-400">⚠️</span>
    <p className="text-red-300">Club title, description, and links must be accurate and relevant.</p>
  </div>

  {/* Misuse rule */}
  <div className="flex gap-3">
    <span className="text-red-400">🚫</span>
    <p className="text-red-300">Misuse, fake information, or irrelevant clubs may result in removal or account restrictions.</p>
  </div>

  {/* Admin reporting */}
  <div className="flex gap-3">
    <span className="text-red-400">🏫</span>
    <p className="text-red-300">Serious violations may be reported directly to the college administration.</p>
  </div>

</div>
          )}
        </section>

        {/* ✅ Updated checkbox and button */}
        {!club && (
          <div className="mt-6">
            <label className="flex items-start gap-3 cursor-pointer group mb-6">
              <div
                onClick={() => setAgree(!agree)}
                className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center
                            shrink-0 transition-all duration-200
                            ${agree
                              ? "bg-[#26F2D0] border-[#26F2D0]"
                              : "border-white/30 group-hover:border-[#26F2D0]/60"
                            }`}
              >
                {agree && <span className="text-black text-xs font-bold">✓</span>}
              </div>
              <span className="text-gray-300 text-sm leading-relaxed">
                I understand that the club title and description <span className="text-white font-semibold">cannot be edited</span> after creation, and I agree to the club creation terms.
              </span>
            </label>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowForm(true)}
                disabled={!agree || loading}
                className={`rounded-xl px-5 py-2 text-black font-semibold transition-all
                  ${agree && !loading
                    ? "bg-[#26F2D0] hover:scale-105 hover:shadow-[0_0_20px_rgba(38,242,208,0.4)]"
                    : "bg-[#26F2D0]/20 text-gray-500 cursor-not-allowed"
                  }`}
              >
                {loading ? "Creating..." : "Create Club →"}
              </button>
            </div>
          </div>
        )}

        {/* Club form modal */}
        {showForm && (
          <ClubForm
            onClose={() => setShowForm(false)}
            onSubmit={handleCreateClub}
            loading={loading}
          />
        )}

      </div>
    </>
  );
}

export default AddClub;