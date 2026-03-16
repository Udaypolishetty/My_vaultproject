// import React, { useState } from "react";

// const Resources = () => {
//   const [domain, setDomain] = useState("");
//   const [papers, setPapers] = useState([]);
//   const [search, setSearch] = useState("");

//   const showPapers = async (selectedDomain) => {
//     setDomain(selectedDomain);
//     setPapers([]); // reset when domain changes
//     if (!selectedDomain) return;

//     try {
//       const res = await fetch(
//         `http://localhost:8081/api/files?domain=${selectedDomain}`
//       );
//       const data = await res.json();
//       setPapers(data);
//     } catch (err) {
//       console.error("Error fetching papers:", err);
//     }
//   };

//   const handleDownload = (id, filename) => {
//     const link = document.createElement("a");
//     link.href = `http://localhost:8081/api/files/download/${id}`;
//     link.download = filename;
//     link.click();
//   };

//   const highlightText = (text, query) => {
//     if (!query) return text;
//     const parts = text.split(new RegExp(`(${query})`, "gi"));
//     return parts.map((part, i) =>
//       part.toLowerCase() === query.toLowerCase() ? (
//         <span key={i} className="bg-yellow-300 text-black px-1 rounded">
//           {part}
//         </span>
//       ) : (
//         part
//       )
//     );
//   };

//   const filteredPapers = papers
//     .map((file) => {
//       const matchIndex = file.filename
//         .toLowerCase()
//         .indexOf(search.toLowerCase());
//       return { ...file, matchIndex };
//     })
//     .filter((file) => search === "" || file.matchIndex !== -1)
//     .sort((a, b) => {
//       if (a.matchIndex === -1) return 1;
//       if (b.matchIndex === -1) return -1;
//       return a.matchIndex - b.matchIndex;
//     });

    

//   return (

   

//     <div id="resources" className=" flex flex-col md:flex-row h-screen">
//       {/* Sidebar */}
//       {/* <aside className="w-full md:w-[320px] bg-[#181818] text-white p-8 border-r-2 border-gray-800"> */}
//       <aside className="w-full md:w-[320px] bg-[#181818] text-white p-8 border-r-2 border-gray-800
//                   sticky top-[80px] h-[calc(100vh-80px)]">

//         <h3 className="text-3xl font-bold mb-3">Select Domain</h3>
//         <p className="text-gray-400 mb-3">
//           Choose a domain to view available papers.
//         </p>
//         <select
//           onChange={(e) => showPapers(e.target.value)}
//           className="w-full p-2 rounded bg-gray-700"
//         >
//           <option value="">Select Domain</option>
//           <option value="B.Tech">B.Tech</option>
//           <option value="Diploma">Diploma</option>
//           <option value="MBA">M.B.A</option>
//           <option value="M.Tech">M.Tech</option>
//         </select>
//       </aside>


   
//       {/* Main Content */}
//      <section className="flex flex-col w-full sticky top-[80px] h-[calc(100vh-80px)] no-scrollbar bg-[#f8fbff] text-black p-8 text-left">

//   <h2 className="text-3xl font-bold text-[#1d3557] mb-4">
//     All Available Papers
//   </h2>

//   <input
//     type="text"
//     placeholder="⌕ Search by Subject, Year, or Regulation..."
//     value={search}
//     onChange={(e) => setSearch(e.target.value)}
//     className="border border-[#457B9D] bg-[#eaf4ff] p-2 rounded w-full mb-4"
//   />

//   {domain === "" ? (
//     <div className="flex flex-col  flex-1">
//       <p className="text-gray-600 mb-6">
//         ← Select a domain to view papers
//       </p>

//       <div className="mt-60 bg-[#f8fbff] border border-[#d6e4f0] rounded-xl p-5 shadow-sm max-w-2xl">
//         <h4 className="text-lg font-semibold text-[#1d3557] mb-3">
//           Note
//         </h4>

//         <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm text-left">
//           <li>
//             All papers are shared strictly for academic purposes and are collected with guidance from students and faculty.
//           </li>
//           <li>
//             If you find any wrong, missing, or mismatched files, please report them.
//           </li>
//         </ul>
//       </div>
//     </div>
//   ) : filteredPapers.length === 0 ? (
//     <p className="text-gray-600">No papers found</p>
//   ) : (
//     <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">
//       <ul>
//         {filteredPapers.map((file) => (
//           <li
//             key={file.id}
//             className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 p-3 mb-2 rounded shadow"
//           >
//             <span
//               className="cursor-pointer font-medium text-[#1d3557] hover:underline"
//               onClick={() =>
//                 window.open(
//                   `http://localhost:8081/api/files/view/${file.id}`,
//                   "_blank"
//                 )
//               }
//             >
//               {highlightText(file.filename, search)}
//             </span>

//             <button
//               onClick={() => handleDownload(file.id, file.filename)}
//               className="bg-[#1d3557] text-white px-3 py-1 rounded hover:bg-[#457B9D] transition-all"
//             >
//               ⬇️ Download
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )}
// </section>



//     </div>
//   );
// };

// export default Resources;

//real......


// import React, { useState } from "react";

// const Resources = () => {
//   const [domain, setDomain] = useState("");
//   const [papers, setPapers] = useState([]);
//   const [search, setSearch] = useState("");
//   const token = localStorage.getItem("token"); // ✅ added

//   const showPapers = async (selectedDomain) => {
//     setDomain(selectedDomain);
//     setPapers([]);
//     if (!selectedDomain) return;

//     try {
//       const res = await fetch(
//         `http://localhost:8081/api/files?domain=${selectedDomain}`,
//         {
//           headers: {
//             "Authorization": `Bearer ${token}` // ✅ added
//           }
//         }
//       );
//       const data = await res.json();
//       setPapers(data);
//     } catch (err) {
//       console.error("Error fetching papers:", err);
//     }
//   };

//   const handleDownload = (id, filename) => {
//     const link = document.createElement("a");
//     link.href = `http://localhost:8081/api/files/download/${id}`;
//     link.download = filename;
//     link.click();
//   };

//   const highlightText = (text, query) => {
//     if (!query) return text;
//     const parts = text.split(new RegExp(`(${query})`, "gi"));
//     return parts.map((part, i) =>
//       part.toLowerCase() === query.toLowerCase() ? (
//         <span key={i} className="bg-yellow-300 text-black px-1 rounded">
//           {part}
//         </span>
//       ) : (
//         part
//       )
//     );
//   };

//   const filteredPapers = papers
//     .map((file) => {
//       const matchIndex = file.filename
//         .toLowerCase()
//         .indexOf(search.toLowerCase());
//       return { ...file, matchIndex };
//     })
//     .filter((file) => search === "" || file.matchIndex !== -1)
//     .sort((a, b) => {
//       if (a.matchIndex === -1) return 1;
//       if (b.matchIndex === -1) return -1;
//       return a.matchIndex - b.matchIndex;
//     });

//   return (
//     <div id="resources" className="flex flex-col md:flex-row h-screen">

//       {/* Sidebar */}
//       <aside className="w-full md:w-[320px] bg-[#181818] text-white p-8 border-r-2 border-gray-800
//                         sticky top-[80px] h-[calc(100vh-80px)]">
//         <h3 className="text-3xl font-bold mb-3">Select Domain</h3>
//         <p className="text-gray-400 mb-3">
//           Choose a domain to view available papers.
//         </p>
//         <select
//           onChange={(e) => showPapers(e.target.value)}
//           className="w-full p-2 rounded bg-gray-700"
//         >
//           <option value="">Select Domain</option>
//           <option value="B.Tech">B.Tech</option>
//           <option value="Diploma">Diploma</option>
//           <option value="MBA">M.B.A</option>
//           <option value="M.Tech">M.Tech</option>
//         </select>

        
//       </aside>


//       {/* Main Content */}
//       <section className="flex flex-col w-full sticky top-[80px] h-[calc(100vh-80px)] no-scrollbar bg-[#f8fbff] text-black p-8 text-left"> {/* ✅ changed bg-white to bg-[#f8fbff] */}

//         <h2 className="text-3xl font-bold text-[#1d3557] mb-4">
//           All Available Papers
//         </h2>

//         <input
//           type="text"
//           placeholder="⌕ Search by Subject, Year, or Regulation..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border border-[#457B9D] bg-[#eaf4ff] p-2 rounded w-full mb-4"
//         />

//         {domain === "" ? (
//           <div className="flex flex-col flex-1">
//             <p className="text-gray-600 mb-6">
//               ← Select a domain to view papers
//             </p>

//             <div className="mt-60 bg-[#f8fbff] border border-[#d6e4f0] rounded-xl p-5 shadow-sm max-w-2xl">
//               <h4 className="text-lg font-semibold text-[#1d3557] mb-3">
//                 Note
//               </h4>
//               <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm text-left">
//                 <li>
//                   All papers are shared strictly for academic purposes and are collected with guidance from students and faculty.
//                 </li>
//                 <li>
//                   If you find any wrong, missing, or mismatched files, please report them.
//                 </li>
//               </ul>
//             </div>
//           </div>
//         ) : filteredPapers.length === 0 ? (
//           <p className="text-gray-600">No papers found</p>
//         ) : (
//           <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">
//             <ul>
//               {filteredPapers.map((file) => (
//                 <li
//                   key={file.id}
//                   className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 p-3 mb-2 rounded shadow"
//                 >
//                   <span
//                     className="cursor-pointer font-medium text-[#1d3557] hover:underline"
//                     onClick={() =>
//                       window.open(
//                         `http://localhost:8081/api/files/view/${file.id}`,
//                         "_blank"
//                       )
//                     }
//                   >
//                     {highlightText(file.filename, search)}
//                   </span>

//                   <button
//                     onClick={() => handleDownload(file.id, file.filename)}
//                     className="bg-[#1d3557] text-white px-3 py-1 rounded hover:bg-[#457B9D] transition-all"
//                   >
//                     ⬇️ Download
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Resources;

//chatgpt....


import React, { useState } from "react";

const Resources = () => {
  const [domain, setDomain] = useState("");
  const [papers, setPapers] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("papers"); // ✅ Added
  const token = sessionStorage.getItem("token");

  const showPapers = async (selectedDomain) => {
    setDomain(selectedDomain);
    setPapers([]);
    if (!selectedDomain) return;

    try {
      const res = await fetch(
        `http://localhost:8081/api/files?domain=${selectedDomain}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setPapers(data);
    } catch (err) {
      console.error("Error fetching papers:", err);
    }
  };

  const handleDownload = (id, filename) => {
    const link = document.createElement("a");
    link.href = `http://localhost:8081/api/files/download/${id}`;
    link.download = filename;
    link.click();
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-yellow-300 text-black px-1 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredPapers = papers
    .map((file) => {
      const matchIndex = file.filename
        .toLowerCase()
        .indexOf(search.toLowerCase());
      return { ...file, matchIndex };
    })
    .filter((file) => search === "" || file.matchIndex !== -1)
    .sort((a, b) => {
      if (a.matchIndex === -1) return 1;
      if (b.matchIndex === -1) return -1;
      return a.matchIndex - b.matchIndex;
    });

  return (
    <div id="resources" className="flex flex-col md:flex-row h-screen">

      {/* Sidebar */}
      <aside className="w-full md:w-[320px] bg-[#181818] text-white p-8 border-r-2 border-gray-800
                        sticky top-[80px] h-[calc(100vh-80px)]">
        <h3 className="text-3xl font-bold mb-3">Select Domain</h3>
        <p className="text-gray-400 mb-3">
          Choose a domain to view resources.
        </p>

        <select
          onChange={(e) => showPapers(e.target.value)}
          className="w-full p-2 rounded bg-gray-700"
        >
          <option value="">Select Domain</option>
          <option value="B.Tech">B.Tech</option>
          <option value="Diploma">Diploma</option>
          <option value="MBA">M.B.A</option>
          <option value="M.Tech">M.Tech</option>
        </select>
      </aside>

      {/* Main Content */}
      <section className="flex flex-col w-full sticky top-[80px] h-[calc(100vh-80px)] no-scrollbar bg-[#f8fbff] text-black p-8 text-left">

        {/* Page Title */}
        <h2 className="text-3xl font-bold text-[#1d3557] mb-6">
          Academic Resources
        </h2>

        {/* Tabs */}
        <div className="flex gap-6 mb-6 border-b border-gray-300">
          <button
            onClick={() => setActiveTab("papers")}
            className={`pb-2 px-4 font-medium transition-all ${
              activeTab === "papers"
                ? "border-b-4 border-[#1d3557] text-[#1d3557]"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Papers
          </button>

          <button
            onClick={() => setActiveTab("notes")}
            className={`pb-2 px-4 font-medium transition-all ${
              activeTab === "notes"
                ? "border-b-4 border-[#1d3557] text-[#1d3557]"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Notes
          </button>
        </div>

        {/* ================= PAPERS TAB ================= */}
        {activeTab === "papers" && (
          <>
            <input
              type="text"
              placeholder="⌕ Search by Subject, Year, or Regulation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-[#457B9D] bg-[#eaf4ff] p-2 rounded w-full mb-4"
            />

            {domain === "" ? (
              <div className="flex flex-col flex-1">
                <p className="text-gray-600 mb-6">
                  ← Select a domain to view papers 🗐
                </p>

                <div className="mt-44 bg-[#f8fbff] border border-[#d6e4f0] rounded-xl p-5 shadow-sm max-w-2xl">
                  <h4 className="text-lg font-semibold text-[#1d3557] mb-3">
                    Note
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm text-left">
                    <li>
                      All papers are shared strictly for academic purposes and are collected with guidance from students and faculty.
                    </li>
                    <li>
                      If you find any wrong, missing, or mismatched files, please report them.
                    </li>
                  </ul>
                </div>
              </div>
            ) : filteredPapers.length === 0 ? (
              <p className="text-gray-600">No papers found</p>
            ) : (
              <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">
                <ul>
                  {filteredPapers.map((file) => (
                    <li
                      key={file.id}
                      className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 p-3 mb-2 rounded shadow"
                    >
                      <span
                        className="cursor-pointer font-medium text-[#1d3557] hover:underline"
                        onClick={() =>
                          window.open(
                            `http://localhost:8081/api/files/view/${file.id}`,
                            "_blank"
                          )
                        }
                      >
                        {highlightText(file.filename, search)}
                      </span>

                      <button
                        onClick={() =>
                          handleDownload(file.id, file.filename)
                        }
                        className="bg-[#1d3557] text-white px-3 py-1 rounded hover:bg-[#457B9D] transition-all"
                      >
                        ⬇️ Download
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {/* ================= NOTES TAB ================= */}
        {/* {activeTab === "notes" && (
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <div className="bg-white border border-[#d6e4f0] shadow-sm rounded-xl p-8 max-w-lg">
              <h3 className="text-2xl font-semibold text-[#1d3557] mb-4">
                Notes Section 𓂃🖊 
              </h3>
              <p className="text-gray-600 mb-3">
                We're currently working on adding curated notes
                for each subject and regulation.
              </p>
             
              <div className="mt-6 text-[#1d3557] font-medium">
                🚀 Coming Soon ...
              </div>
              <div>
      
<div className="mt-6 text-sm text-gray-600">
  You can access notes from here for now.
</div>

<a
  href="https://www.forum.universityupdates.in/threads/jntuh-study-materials-notes-important-questions.33519/#google_vignette"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-2 inline-block text-[#1d3557] font-medium underline hover:text-[#457B9D]"
>
  📄 Open Notes Page
</a>
              </div>
            </div>
          </div>
        )} */}

        {activeTab === "notes" && (
  <div className="flex flex-col items-center justify-center flex-1 text-center gap-6">

    {/* BOX 1 — Notes Coming Soon */}
    <div className="bg-white border border-[#d6e4f0] shadow-sm rounded-xl p-8 max-w-lg">
      <h3 className="text-2xl font-semibold text-[#1d3557] mb-4">
        Notes Section 𓂃🖊
      </h3>

      <p className="text-gray-600 mb-4">
        We're currently working on adding curated notes for each subject and regulation.
      </p>

      <div className="text-[#1d3557] font-medium">
        🚀 Coming Soon ...
      </div>
    </div>


    {/* BOX 2 — Temporary Access */}
    <div className="bg-[#f8fbff] border border-[#d6e4f0] shadow-sm rounded-xl p-4 max-w-md">
      
      <p className="text-gray-600 mb-1 text-sm">
        Temporarily!
        You can access them from the link below for now.
      </p>
   <button
  onClick={() =>
    window.open(
      "https://www.forum.universityupdates.in/threads/jntuh-study-materials-notes-important-questions.33519/",
      "_blank"
    )
  }
  className="mt-3 bg-[#ffffff] text-black px-4 py-2 rounded hover:bg-[#1d3557]"
>
  Notes ↗
</button>

    </div>

  </div>
)}

      </section>
    </div>
  );
};

export default Resources;