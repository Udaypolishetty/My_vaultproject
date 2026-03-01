// import React, { useState } from "react";

// const Upload = () => {
//   const [isAdmin, setIsAdmin] = useState(false);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const id = e.target.adminId.value;
//     const pass = e.target.adminPassword.value;
//     if (id === "admin" && pass === "1234") setIsAdmin(true);
//   };

//   const handleLogout = () => setIsAdmin(false);

//   const handleUpload = (e) => {
//     e.preventDefault();
//     console.log("Uploading file...");
//   };

//   return (
//     <div className="flex flex-col items-center mt-12 px-5 bg-black min-h-screen">

//       {/* Warning Banner */}
//       <div className="w-full max-w-xl mb-8 bg-[#FFF3CD] text-black text-center py-4 rounded-lg font-semibold shadow">
//         ONLY AUTHORIZED CAN ADD FILES!!
//       </div>

//       {/* Card */}
//       {/* <div className="w-full max-w-xl bg-[#232323] rounded-2xl shadow-2xl p-10"> */}
//       <div className="w-full max-w-lg bg-[#232323] rounded-xl shadow-xl p-6">


//         {!isAdmin ? (
//           <>
//             <h2 className="text-3xl font-bold text-center mb-8">
//               Admin Login
//             </h2>

//             <form onSubmit={handleLogin} className="space-y-6">
//               <input
//                 type="text"
//                 name="adminId"
//                 placeholder="Admin ID"
//                 required
//                 className="w-full px-5 py-2.5 rounded-lg bg-white text-black outline-none focus:ring-2 focus:ring-blue-500"
//               />

//               <input
//                 type="password"
//                 name="adminPassword"
//                 placeholder="Password"
//                 required
//                 className="w-full px-5 py-2.5 rounded-lg bg-white text-black outline-none focus:ring-2 focus:ring-blue-500"
//               />

//               <button
//                 type="submit"
//                 className="w-44 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-medium text-base"
//               >
//                 Login
//               </button>
//             </form>
//           </>
//         ) : (
//           <>
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-center mb-5">Upload Resources</h2>
//               <button
//                 onClick={handleLogout}
//                 className="text-sm bg-gray-700 px-4 py-1 rounded hover:bg-gray-600"
//               >
//                 Logout
//               </button>
//             </div>

//             <form onSubmit={handleUpload} className="space-y-4">
//               <select className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white">
//                 <option>Select Resource Type</option>
//                 <option>Question Papers</option>
//                 <option>Notes</option>
//               </select>

//               <select className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white">
//                 <option>Select Domain</option>
//                 <option>B.Tech</option>
//                 <option>M.Tech</option>
//               </select>

//               <select className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white">
//                 <option>Select Branch</option>
//                 <option>CSE</option>
//                 <option>ECE</option>
//               </select>

//               <input
//                 type="file"
//                 className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
//               />

//               <button
//                 type="submit"
//                 className="w-full py-2 bg-blue-800 hover:bg-blue-700 transition rounded-lg font-medium text-base"
//               >
//                 Upload
//               </button>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Upload;



import React, { useState } from "react";

const Upload = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const id = e.target.adminId.value;
    const pass = e.target.adminPassword.value;
    if (id === "admin" && pass === "1234") setIsAdmin(true);
  };

  const handleLogout = () => setIsAdmin(false);

  const handleUpload = (e) => {
    e.preventDefault();
    console.log("Uploading file...");
  };

  return (
    <div className="flex flex-col items-center mt-12 px-5">

      {/* Warning Banner */}
      <div className="w-full max-w-xl mb-8 bg-[#FFF3CD] text-black text-center py-4 rounded-lg font-semibold shadow">
        ONLY AUTHORIZED CAN ADD FILES!!
      </div>

      {/* Card */}
      {/* <div className="w-full max-w-xl bg-[#232323] rounded-2xl shadow-2xl p-10"> */}
      <div className="w-full max-w-lg bg-[#232323] rounded-xl shadow-xl p-6">


        {!isAdmin ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              Admin Login
            </h2>

            <form onSubmit={handleLogin} className="space-y-6">
              <input
                type="text"
                name="adminId"
                placeholder="Admin ID"
                required
                className="w-full px-5 py-2.5 rounded-lg bg-white text-black outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="password"
                name="adminPassword"
                placeholder="Password"
                required
                className="w-full px-5 py-2.5 rounded-lg bg-white text-black outline-none focus:ring-2 focus:ring-blue-500"
              />

             <div className="flex justify-center">
  <button
    type="submit"
    className="w-44 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-medium text-base"
  >
    Login
  </button>
</div>

            </form>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-center mb-5">Upload Resources</h2>
              <button
                onClick={handleLogout}
                className="text-sm bg-gray-700 px-4 py-1 rounded hover:bg-gray-600"
              >
                Logout
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              <select className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white">
                <option>Select Resource Type</option>
                <option>Question Papers</option>
                <option>Notes</option>
              </select>

              <select className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white">
                <option>Select Domain</option>
                <option>B.Tech</option>
                <option>M.Tech</option>
              </select>

              <select className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white">
                <option>Select Branch</option>
                <option>CSE</option>
                <option>ECE</option>
              </select>

              <input
                type="file"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
              />

              <button
                type="submit"
                className="w-full py-2 bg-blue-800 hover:bg-blue-700 transition rounded-lg font-medium text-base"
              >
                Upload
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Upload;
