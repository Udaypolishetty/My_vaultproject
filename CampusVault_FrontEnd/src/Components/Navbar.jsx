
// import React, { useState } from "react";

// import { NavLink } from "react-router-dom";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);

//   const closeMenu = () => setOpen(false);

//   const linkClasses = ({ isActive }) =>
//     isActive
//       ? "text-white font-semibold"
//       : "text-gray-400 hover:text-white";

//   return (
//     <nav className="fixed top-0 w-full bg-[#181818] text-white shadow-lg z-50 pb-6">
//       <div className="flex items-center justify-between px-6 py-3">

//         {/* Logo */}
//         <h1 className="text-2xl font-bold">Campus Vault</h1>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex flex-1 justify-center space-x-8 text-lg text-gray-400">
//           <li>
//             <NavLink to="home" end className={linkClasses}>
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="resources" className={linkClasses}>
//               Resources
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="connect" className={linkClasses}>
//               Connect
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="about" className={linkClasses}>
//               About
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="upload" className={linkClasses}>
//               Upload
//             </NavLink>
//           </li>
//         </ul>

//         {/* Hamburger */}
//         <button
//            className="md:hidden text-3xl focus:outline-none"
//           onClick={() => setOpen(!open)}
//         >
//           ☰
//         </button>
//       </div>


//       {/* Mobile Menu */}
//       {open && (
//          <ul className="md:hidden bg-black text-gray-400 text-center space-y-4 py-4 text-lg">
//           <li>
//             <NavLink to="home" end className={linkClasses} onClick={closeMenu}>
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="resources" className={linkClasses} onClick={closeMenu}>
//               Resources
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="connect" className={linkClasses} onClick={closeMenu}>
//               Connect
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="about" className={linkClasses} onClick={closeMenu}>
//               About
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="upload" className={linkClasses} onClick={closeMenu}>
//               Upload
//             </NavLink>
//           </li>
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


// import React, { useState } from "react";

// const Navbar = ({ setActiveSection }) => {
//   const [open, setOpen] = useState(false);

//   const handleClick = (section) => {
//     setActiveSection(section);
//     setOpen(false);
//   };

//   return (
//     // <nav className="fixed top-0 w-full bg-[#0f0f0f]  text-white shadow-lg z-50">
//     <nav className="fixed top-0 w-full bg-[#0f0f0f]  text-white shadow-lg z-50">

//       <div className="flex items-center justify-between px-6 py-3">

//         {/* Logo */}
//         <h1 className="text-2xl font-bold">Campus Vault</h1>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex flex-1 justify-center space-x-8 text-lg text-gray-400">
//           <li className="hover:text-white cursor-pointer" onClick={() => handleClick("Home")}>Home</li>
//           <li className="hover:text-white cursor-pointer" onClick={() => handleClick("Resources")}>Resources</li>
//           <li className="hover:text-white cursor-pointer" onClick={() => handleClick("Connect")}>Connect</li>
//           <li className="hover:text-white cursor-pointer" onClick={() => handleClick("About")}>About</li>
//           <li className="hover:text-white cursor-pointer" onClick={() => handleClick("Upload")}>Upload</li>
//         </ul>

//         {/* Hamburger Button (Mobile) */}
//         <button
//           className="md:hidden text-3xl focus:outline-none"
//           onClick={() => setOpen(!open)}
//         >
//           ☰
//         </button>
//       </div>

//       {/* Mobile Dropdown */}
//       {open && (
//         <ul className="md:hidden bg-[#0f0f0f] border-t border-white/10 text-gray-400 text-center space-y-4 py-4 text-lg">
//           <li className="hover:text-white cursor-pointer" onClick={() => handleClick("Home")}>Home</li>
//           <li className="hover:text-white cursor-pointer" onClick={() => handleClick("Resources")}>Resources</li>
//           <li className="hover:text-white cursor-pointer" onClick={() => handleClick("Connect")}>Connect</li>
//           <li className="hover:text-white cursor-pointer" onClick={() => handleClick("About")}>About</li>
//           <li className="hover:text-white cursor-pointer" onClick={() => handleClick("Upload")}>Upload</li>
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


//new mallu...


// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";

// const Navbar = ({ activeSection, setActiveSection }) => {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   const closeMenu = () => setOpen(false);

//   const linkClasses = ({ isActive }) =>
//     isActive ? "text-white font-semibold" : "text-gray-400 hover:text-white";

//   const handleLogout = () => {
//     // ✅ preserve cooldown keys
//     const cooldownEntries = {};
//     for (let i = 0; i < localStorage.length; i++) {
//       const key = localStorage.key(i);
//       if (key.startsWith("lastIdeaPostedAt_")) {
//         cooldownEntries[key] = localStorage.getItem(key);
//       }
//     }
//     localStorage.clear();
//     Object.entries(cooldownEntries).forEach(([key, value]) => {
//       localStorage.setItem(key, value);
//     });
//     closeMenu();
//     navigate("/");
//   };

//   return (
//     <nav className="fixed top-0 w-full bg-[#0f0f0f] border-b border-white/5 text-white shadow-lg z-50">
//       <div className="flex items-center justify-between px-6 py-4">

//         {/* Logo */}
//         <h1 className="text-2xl font-bold text-white">Campus Vault</h1>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex flex-1 justify-center space-x-8 text-lg">
//           <li><NavLink to="home" end className={linkClasses}>Home</NavLink></li>
//           <li><NavLink to="resources" className={linkClasses}>Resources</NavLink></li>
//           <li><NavLink to="connect" className={linkClasses}>Connect</NavLink></li>
//           <li><NavLink to="about" className={linkClasses}>About</NavLink></li>
//           <li><NavLink to="upload" className={linkClasses}>Upload</NavLink></li>
//           <li><NavLink to="dashboard" className={linkClasses}>Dashboard</NavLink></li>
//         </ul>

//         {/* Desktop Logout */}
//         <button
//           onClick={handleLogout}
//           className="hidden md:block text-gray-400 hover:text-red-400 transition text-sm"
//         >
//           Logout
//         </button>

//         {/* Hamburger */}
//         <button
//           className="md:hidden text-3xl focus:outline-none"
//           onClick={() => setOpen(!open)}
//         >
//           ☰
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <ul className="md:hidden bg-[#0b0b0b] text-gray-400 text-center space-y-4 py-4 text-lg border-t border-white/10">
//           <li><NavLink to="home" end className={linkClasses} onClick={closeMenu}>Home</NavLink></li>
//           <li><NavLink to="resources" className={linkClasses} onClick={closeMenu}>Resources</NavLink></li>
//           <li><NavLink to="connect" className={linkClasses} onClick={closeMenu}>Connect</NavLink></li>
//           <li><NavLink to="about" className={linkClasses} onClick={closeMenu}>About</NavLink></li>
//           <li><NavLink to="upload" className={linkClasses} onClick={closeMenu}>Upload</NavLink></li>
//           <li><NavLink to="dashboard" className={linkClasses}>Dashboard</NavLink></li>
//           <li>
//             <button
//               onClick={handleLogout}
//               className="text-red-400 hover:text-red-300 transition-colors"
//             >
//               Logout
//             </button>
//           </li>
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const navigate = useNavigate();
  
useEffect(() => {
  const myId = localStorage.getItem("id");
  if (!myId) return;

  checkUnread();
  const interval = setInterval(checkUnread, 30000);

  // ✅ instantly set to 0 when dashboard marks read — no API call needed
  const handleRead = () => setUnread(0);
  window.addEventListener("notificationsRead", handleRead);

  return () => {
    clearInterval(interval);
    window.removeEventListener("notificationsRead", handleRead);
  };
}, []);
  const checkUnread = async () => {
    try {
      const token = localStorage.getItem("token");
      const myId = localStorage.getItem("id");
      if (!token || !myId) return;

      const res = await fetch("http://localhost:8081/api/notifications/unread-count", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) return;
      const data = await res.json();
      setUnread(data.count);
    } catch (err) {
      console.error("Navbar notif check failed:", err);
    }
  };

  const closeMenu = () => setOpen(false);

  const linkClasses = ({ isActive }) =>
    isActive ? "text-white font-semibold" : "text-gray-400 hover:text-white";

  const handleLogout = () => {
    const cooldownEntries = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("lastIdeaPostedAt_")) {
        cooldownEntries[key] = localStorage.getItem(key);
      }
    }
    localStorage.clear();
    Object.entries(cooldownEntries).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
    closeMenu();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full bg-[#0f0f0f] border-b border-white/5 text-white shadow-lg z-50">
      <div className="flex items-center justify-between px-6 py-4">

        <h1 className="text-2xl font-bold text-white">Campus Vault</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-1 justify-center space-x-8 text-lg items-center">
          <li><NavLink to="home" end className={linkClasses}>Home</NavLink></li>
          <li><NavLink to="resources" className={linkClasses}>Resources</NavLink></li>
          <li><NavLink to="connect" className={linkClasses}>Connect</NavLink></li>
          <li><NavLink to="about" className={linkClasses}>About</NavLink></li>
          <li><NavLink to="upload" className={linkClasses}>Upload</NavLink></li>
          <li><NavLink to="dashboard" className={linkClasses}>Dashboard</NavLink></li>

          {/* ✅ Bell appears right beside Dashboard only when unread > 0 */}
          {unread > 0 && (
            <li>
              <button
                onClick={() => navigate("dashboard", { state: { tab: "activity" } })}
                className="relative w-8 h-8 flex items-center justify-center
                           rounded-xl bg-white/5 hover:bg-white/10
                           border border-white/10 transition-all"
              >
                <span className="text-base">🔔</span>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#26F2D0] text-black
                                 text-xs font-bold rounded-full flex items-center justify-center">
                  {unread > 9 ? "9+" : unread}
                </span>
              </button>
            </li>
          )}
        </ul>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-400 transition text-sm"
          >
            Logout
          </button>
        </div>

        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden bg-[#0b0b0b] text-gray-400 text-center space-y-4 py-4 text-lg border-t border-white/10">
          <li><NavLink to="home" end className={linkClasses} onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="resources" className={linkClasses} onClick={closeMenu}>Resources</NavLink></li>
          <li><NavLink to="connect" className={linkClasses} onClick={closeMenu}>Connect</NavLink></li>
          <li><NavLink to="about" className={linkClasses} onClick={closeMenu}>About</NavLink></li>
          <li><NavLink to="upload" className={linkClasses} onClick={closeMenu}>Upload</NavLink></li>
          <li><NavLink to="dashboard" className={linkClasses} onClick={closeMenu}>Dashboard</NavLink></li>
          {unread > 0 && (
            <li>
              <button
                onClick={() => {
                  navigate("dashboard", { state: { tab: "activity" } });
                  closeMenu();
                }}
                className="text-[#26F2D0] text-sm font-medium"
              >
                🔔 {unread} new notification{unread > 1 ? "s" : ""}
              </button>
            </li>
          )}
          <li>
            <button onClick={handleLogout} className="text-red-400 hover:text-red-300 transition-colors">
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;