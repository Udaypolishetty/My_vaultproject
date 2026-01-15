import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Update from "./Components/Update";
import Upload from "./Components/Upload";
import Resources from "./Components/Resources";
import About from "./Components/About";
import Connect from "./Components/Connect";
import "./index.css";

function App() {
  const [activeSection, setActiveSection] = useState(() => {
    return localStorage.getItem("activeSection") || "Home";
  });

  useEffect (()=>{
    localStorage.setItem("activeSection",activeSection);

  },[activeSection]); //refresh code.............

  return (
    <div className="bg-[#181818] min-h-screen text-white text-center pt-20">
      <Navbar setActiveSection={setActiveSection} />
     <div key={activeSection} className="section-animate">
      {activeSection === "Home" && <Home />}
      {activeSection === "Updates" && <Update />}
      {activeSection === "Upload" && <Upload />}
      {activeSection === "Resources" && <Resources />}
      {activeSection === "Connect" && <Connect />}
      {activeSection === "About" && <About />}
      </div>
    </div>
  );
}

export default App;
