// import React, { useEffect, useState } from "react";
// import Navbar from "./Components/Navbar";
// import Home from "./Components/Home";
// import Update from "./Components/Update";
// import Upload from "./Components/Upload";
// import Resources from "./Components/Resources";
// import About from "./Components/About";
// import Connect from "./Components/Connect";
// import "./index.css";

// function App() {
//   const [activeSection, setActiveSection] = useState(() => {
//     return localStorage.getItem("activeSection") || "Home";
//   });

//   useEffect (()=>{
//     localStorage.setItem("activeSection",activeSection);

//   },[activeSection]); //refresh code.............

//   return (
//     <div className="bg-[#181818] min-h-screen text-white text-center pt-20">
//       <Navbar setActiveSection={setActiveSection} />
//      <div key={activeSection} className="section-animate">
//       {activeSection === "Home" && <Home />}
//       {activeSection === "Updates" && <Update />}
//       {activeSection === "Upload" && <Upload />}
//       {activeSection === "Resources" && <Resources />}
//       {activeSection === "Connect" && <Connect />}
//       {activeSection === "About" && <About />}
//       </div>
//     </div>
//   );
// }

// export default App;


//claude


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Update from "./Components/Update";
import Upload from "./Components/Upload";
import Resources from "./Components/Resources";
import About from "./Components/About";
import Connect from "./Components/Connect";
import "./index.css";
import { AnimatePresence, motion } from 'framer-motion';


function App() {
  const { id } = useParams();
  const navigate = useNavigate();

  const pathSection = window.location.pathname.split("/").pop();
  const sectionMap = {
    home: "Home",
    updates: "Updates",
    upload: "Upload",
    resources: "Resources",
    connect: "Connect",
    about: "About"
  };

  const [activeSection, setActiveSection] = useState(
    sectionMap[pathSection] || "Home"
  );

  const handleSectionChange = (section) => {
    setActiveSection(section);
    navigate(`/profile/${id}/${section.toLowerCase()}`);
  };

  useEffect(() => {
    localStorage.setItem("activeSection", activeSection);
  }, [activeSection]);

  return (
    <div className="bg-[#181818] flex flex-col min-h-screen text-white">
      <Navbar setActiveSection={handleSectionChange} />
      <div className="flex-1 pt-16 pb-24 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === "Home" && <Home />}
            {activeSection === "Updates" && <Update />}
            {activeSection === "Upload" && <Upload />}
            {activeSection === "Resources" && <Resources />}
            {activeSection === "Connect" && <Connect />}
            {activeSection === "About" && <About />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;

