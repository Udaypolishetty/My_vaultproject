
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

// import { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const [unread, setUnread] = useState(0);
//   const navigate = useNavigate();

// useEffect(() => {
//  const [token] = useState(() => sessionStorage.getItem("token"));
// const [myId] = useState(() => sessionStorage.getItem("id"));
//   if (!myId || !token) return;

//   // ✅ fetch initial unread count on load
//   checkUnread();

//   // ✅ SSE for real-time instant bell
//   const evtSource = new EventSource(
//     `http://localhost:8081/api/notifications/stream?token=${token}`
//   );

//   evtSource.addEventListener("notification", () => {
//     setUnread(prev => prev + 1); // ✅ bell appears instantly
//   });

//   evtSource.onerror = () => {
//     evtSource.close(); // ✅ close on error — browser auto-retries
//   };

//   // ✅ bell disappears instantly when activity tab clicked
//   const handleRead = () => setUnread(0);
//   window.addEventListener("notificationsRead", handleRead);

//   return () => {
//     evtSource.close();
//     window.removeEventListener("notificationsRead", handleRead);
//   };
// }, [token,myId]);


//   const checkUnread = async () => {
//     try {
//       const myId = sessionStorage.getItem("id");
// const token = sessionStorage.getItem("token"); // inside checkUnread
//       if (!token || !myId) return;

//       const res = await fetch("http://localhost:8081/api/notifications/unread-count", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (!res.ok) return;
//       const data = await res.json();
//       setUnread(data.count);
//     } catch (err) {
//       console.error("Navbar notif check failed:", err);
//     }
//   };

//   const closeMenu = () => setOpen(false);

//   const linkClasses = ({ isActive }) =>
//     isActive ? "text-white font-semibold" : "text-gray-400 hover:text-white";

// const handleLogout = () => {
//   sessionStorage.clear(); // ✅ clears only this tab's session
//   closeMenu();
//   navigate("/");
// };

//   return (
//     <nav className="fixed top-0 w-full bg-[#0f0f0f] border-b border-white/5 text-white shadow-lg z-50">
//       <div className="flex items-center justify-between px-6 py-4">

//         <h1 className="text-2xl font-bold text-white">Campus Vault</h1>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex flex-1 justify-center space-x-8 text-lg items-center">
//           <li><NavLink to="home" end className={linkClasses}>Home</NavLink></li>
//           <li><NavLink to="resources" className={linkClasses}>Resources</NavLink></li>
//           <li><NavLink to="connect" className={linkClasses}>Connect</NavLink></li>
//           <li><NavLink to="about" className={linkClasses}>About</NavLink></li>
//           <li><NavLink to="upload" className={linkClasses}>Upload</NavLink></li>
//           <li><NavLink to="dashboard" className={linkClasses}>Dashboard</NavLink></li>

//           {/* ✅ Bell appears right beside Dashboard only when unread > 0 */}
//           {unread > 0 && (
//             <li>
//               <button
//                 onClick={() => navigate("dashboard", { state: { tab: "activity" } })}
//                 className="relative w-8 h-8 flex items-center justify-center
//                            rounded-xl bg-white/5 hover:bg-white/10
//                            border border-white/10 transition-all"
//               >
//                 <span className="text-base">🔔</span>
//                 <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#26F2D0] text-black
//                                  text-xs font-bold rounded-full flex items-center justify-center">
//                   {unread > 9 ? "9+" : unread}
//                 </span>
//               </button>
//             </li>
//           )}
//         </ul>

//         {/* Desktop right side */}
//         <div className="hidden md:flex items-center gap-3">
//           <button
//             onClick={handleLogout}
//             className="text-gray-400 hover:text-red-400 transition text-sm"
//           >
//             Logout
//           </button>
//         </div>

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
//           <li><NavLink to="dashboard" className={linkClasses} onClick={closeMenu}>Dashboard</NavLink></li>
//           {unread > 0 && (
//             <li>
//               <button
//                 onClick={() => {
//                   navigate("dashboard", { state: { tab: "activity" } });
//                   closeMenu();
//                 }}
//                 className="text-[#26F2D0] text-sm font-medium"
//               >
//                 🔔 {unread} new notification{unread > 1 ? "s" : ""}
//               </button>
//             </li>
//           )}
//           <li>
//             <button onClick={handleLogout} className="text-red-400 hover:text-red-300 transition-colors">
//               Logout
//             </button>
//           </li>
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


// import { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const [unread, setUnread] = useState(0);
//   const navigate = useNavigate();

//   const [token, setToken] = useState(() => sessionStorage.getItem("token"));
//   const [myId, setMyId] = useState(() => sessionStorage.getItem("id"));

//   // ✅ listen for login event — updates token/myId after login
//   useEffect(() => {
//     const handleLogin = () => {
//       setToken(sessionStorage.getItem("token"));
//       setMyId(sessionStorage.getItem("id"));
//     };
//     window.addEventListener("userLoggedIn", handleLogin);
//     return () => window.removeEventListener("userLoggedIn", handleLogin);
//   }, []);

//   // ✅ SSE connects when token becomes available
//   useEffect(() => {
//     if (!myId || !token) return;

//     checkUnread();

//     const evtSource = new EventSource(
//       `http://localhost:8081/api/notifications/stream?token=${token}`
//     );

//     evtSource.addEventListener("notification", () => {
//       setUnread(prev => prev + 1);
//     });

//     evtSource.onerror = () => evtSource.close();

//     const handleRead = () => setUnread(0);
//     window.addEventListener("notificationsRead", handleRead);

//     return () => {
//       evtSource.close();
//       window.removeEventListener("notificationsRead", handleRead);
//     };
//   }, [token, myId]);

//   const checkUnread = async () => {
//     try {
//       const t = sessionStorage.getItem("token");
//       const id = sessionStorage.getItem("id");
//       if (!t || !id) return;
//       const res = await fetch("http://localhost:8081/api/notifications/unread-count", {
//         headers: { Authorization: `Bearer ${t}` }
//       });
//       if (!res.ok) return;
//       const data = await res.json();
//       setUnread(data.count);
//     } catch (err) {
//       console.error("Navbar notif check failed:", err);
//     }
//   };

//   const closeMenu = () => setOpen(false);

//   const linkClasses = ({ isActive }) =>
//     isActive ? "text-white font-semibold" : "text-gray-400 hover:text-white";

//   const handleLogout = () => {
//     sessionStorage.clear();
//     setToken(null);
//     setMyId(null);
//     setUnread(0);
//     closeMenu();
//     navigate("/");
//   };

//   return (
//     <nav className="fixed top-0 w-full bg-[#0f0f0f] border-b border-white/5 text-white shadow-lg z-50">
//       <div className="flex items-center justify-between px-6 py-4">

//         <h1 className="text-2xl font-bold text-white">Campus Vault</h1>

//         <ul className="hidden md:flex flex-1 justify-center space-x-8 text-lg items-center">
//           <li><NavLink to="home" end className={linkClasses}>Home</NavLink></li>
//           <li><NavLink to="resources" className={linkClasses}>Resources</NavLink></li>
//           <li><NavLink to="connect" className={linkClasses}>Connect</NavLink></li>
//           <li><NavLink to="about" className={linkClasses}>About</NavLink></li>
//           <li><NavLink to="upload" className={linkClasses}>Upload</NavLink></li>
//           <li><NavLink to="dashboard" className={linkClasses}>Dashboard</NavLink></li>

//           {unread > 0 && (
//             <li>
//               <button
//                 onClick={() => navigate("dashboard", { state: { tab: "activity" } })}
//                 className="relative w-8 h-8 flex items-center justify-center
//                            rounded-xl bg-white/5 hover:bg-white/10
//                            border border-white/10 transition-all"
//               >
//                 <span className="text-base">🔔</span>
//                 <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#26F2D0] text-black
//                                  text-xs font-bold rounded-full flex items-center justify-center">
//                   {unread > 9 ? "9+" : unread}
//                 </span>
//               </button>
//             </li>
//           )}
//         </ul>

//         <div className="hidden md:flex items-center gap-3">
//           <button
//             onClick={handleLogout}
//             className="text-gray-400 hover:text-red-400 transition text-sm"
//           >
//             Logout
//           </button>
//         </div>

//         <button
//           className="md:hidden text-3xl focus:outline-none"
//           onClick={() => setOpen(!open)}
//         >
//           ☰
//         </button>
//       </div>

//       {open && (
//         <ul className="md:hidden bg-[#0b0b0b] text-gray-400 text-center space-y-4 py-4 text-lg border-t border-white/10">
//           <li><NavLink to="home" end className={linkClasses} onClick={closeMenu}>Home</NavLink></li>
//           <li><NavLink to="resources" className={linkClasses} onClick={closeMenu}>Resources</NavLink></li>
//           <li><NavLink to="connect" className={linkClasses} onClick={closeMenu}>Connect</NavLink></li>
//           <li><NavLink to="about" className={linkClasses} onClick={closeMenu}>About</NavLink></li>
//           <li><NavLink to="upload" className={linkClasses} onClick={closeMenu}>Upload</NavLink></li>
//           <li><NavLink to="dashboard" className={linkClasses} onClick={closeMenu}>Dashboard</NavLink></li>
//           {unread > 0 && (
//             <li>
//               <button
//                 onClick={() => {
//                   navigate("dashboard", { state: { tab: "activity" } });
//                   closeMenu();
//                 }}
//                 className="text-[#26F2D0] text-sm font-medium"
//               >
//                 🔔 {unread} new notification{unread > 1 ? "s" : ""}
//               </button>
//             </li>
//           )}
//           <li>
//             <button onClick={handleLogout} className="text-red-400 hover:text-red-300 transition-colors">
//               Logout
//             </button>
//           </li>
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

// import { useState, useEffect } from "react";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const [unread, setUnread] = useState(0);
//   const navigate = useNavigate();
//   const location = useLocation(); // ✅ watch route changes

//  useEffect(() => {
//   const token = sessionStorage.getItem("token");
//   const myId = sessionStorage.getItem("id");
//   if (!token || !myId) return;

//   checkUnread();

//   const evtSource = new EventSource(
//     `http://localhost:8081/api/notifications/stream?token=${token}`
//   );

//   evtSource.addEventListener("notification", () => {
//     setUnread(prev => prev + 1);
//   });

//   evtSource.onerror = () => evtSource.close();

//   const handleRead = () => setUnread(0);
//   window.addEventListener("notificationsRead", handleRead);

//   return () => {
//     evtSource.close();
//     window.removeEventListener("notificationsRead", handleRead);
//   };
// }, [location.pathname.split("/")[1]]); // ✅ only reconnect when base path changes

//   const checkUnread = async () => {
//     try {
//       const token = sessionStorage.getItem("token");
//       const myId = sessionStorage.getItem("id");
//       if (!token || !myId) return;
//       const res = await fetch("http://localhost:8081/api/notifications/unread-count", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (!res.ok) return;
//       const data = await res.json();
//       setUnread(data.count);
//     } catch (err) {
//       console.error("Navbar notif check failed:", err);
//     }
//   };

//   const closeMenu = () => setOpen(false);

//   const linkClasses = ({ isActive }) =>
//     isActive ? "text-white font-semibold" : "text-gray-400 hover:text-white";

//   const handleLogout = () => {
//     sessionStorage.clear();
//     setUnread(0);
//     closeMenu();
//     navigate("/");
//   };

//   return (
//     <nav className="fixed top-0 w-full bg-[#0f0f0f] border-b border-white/5 text-white shadow-lg z-50">
//       <div className="flex items-center justify-between px-6 py-4">
//         <h1 className="text-2xl font-bold text-white">Campus Vault</h1>

//         <ul className="hidden md:flex flex-1 justify-center space-x-8 text-lg items-center">
//           <li><NavLink to="home" end className={linkClasses}>Home</NavLink></li>
//           <li><NavLink to="resources" className={linkClasses}>Resources</NavLink></li>
//           <li><NavLink to="connect" className={linkClasses}>Connect</NavLink></li>
//           <li><NavLink to="about" className={linkClasses}>About</NavLink></li>
//           {/* <li><NavLink to="upload" className={linkClasses}>Upload</NavLink></li> */}
//           <li><NavLink to="dashboard" className={linkClasses}>Dashboard</NavLink></li>

//           {unread > 0 && (
//             <li>
//               <button
//                 onClick={() => navigate("dashboard", { state: { tab: "activity" } })}
//                 className="relative w-8 h-8 flex items-center justify-center
//                            rounded-xl bg-white/5 hover:bg-white/10
//                            border border-white/10 transition-all"
//               >
//                 <span className="text-base">🔔</span>
//                 <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#26F2D0] text-black
//                                  text-xs font-bold rounded-full flex items-center justify-center">
//                   {unread > 9 ? "9+" : unread}
//                 </span>
//               </button>
//             </li>
//           )}
//         </ul>

//         <div className="hidden md:flex items-center gap-3">
//           <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition text-sm">
//             Logout
//           </button>
//         </div>

//         <button className="md:hidden text-3xl focus:outline-none" onClick={() => setOpen(!open)}>
//           ☰
//         </button>
//       </div>

//       {open && (
//         <ul className="md:hidden bg-[#0b0b0b] text-gray-400 text-center space-y-4 py-4 text-lg border-t border-white/10">
//           <li><NavLink to="home" end className={linkClasses} onClick={closeMenu}>Home</NavLink></li>
//           <li><NavLink to="resources" className={linkClasses} onClick={closeMenu}>Resources</NavLink></li>
//           <li><NavLink to="connect" className={linkClasses} onClick={closeMenu}>Connect</NavLink></li>
//           <li><NavLink to="about" className={linkClasses} onClick={closeMenu}>About</NavLink></li>
//           {/* <li><NavLink to="upload" className={linkClasses} onClick={closeMenu}>Upload</NavLink></li> */}
//           <li><NavLink to="dashboard" className={linkClasses} onClick={closeMenu}>Dashboard</NavLink></li>
//           {unread > 0 && (
//             <li>
//               <button
//                 onClick={() => { navigate("dashboard", { state: { tab: "activity" } }); closeMenu(); }}
//                 className="text-[#26F2D0] text-sm font-medium"
//               >
//                 🔔 {unread} new notification{unread > 1 ? "s" : ""}
//               </button>
//             </li>
//           )}
//           <li>
//             <button onClick={handleLogout} className="text-red-400 hover:text-red-300 transition-colors">
//               Logout
//             </button>
//           </li>
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



// import { useState, useEffect } from "react";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const [unread, setUnread] = useState(0);
//   const [buzzDot, setBuzzDot] = useState(false); // ✅ red dot for new buzz
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
//     const myId = sessionStorage.getItem("id");
//     if (!token || !myId) return;

//     checkUnread();
//     checkNewBuzz();

//     const evtSource = new EventSource(
//       `http://localhost:8081/api/notifications/stream?token=${token}`
//     );
//     evtSource.addEventListener("notification", () => {
//       setUnread(prev => prev + 1);
//     });
//     evtSource.onerror = () => evtSource.close();

//     const handleRead = () => setUnread(0);
//     window.addEventListener("notificationsRead", handleRead);

//     // ✅ listen for new buzz event from Connect.jsx
//     const handleNewBuzz = () => setBuzzDot(true);
//     window.addEventListener("newBuzz", handleNewBuzz);

//     // ✅ listen for buzz tab opened — clear dot
//     const handleBuzzRead = () => setBuzzDot(false);
//     window.addEventListener("buzzRead", handleBuzzRead);
//     console.log("unread count:", unread);

//     return () => {
//       evtSource.close();
//       window.removeEventListener("notificationsRead", handleRead);
//       window.removeEventListener("newBuzz", handleNewBuzz);
//       window.removeEventListener("buzzRead", handleBuzzRead);
//     };
//   }, [location.pathname.split("/")[1]]);

//   const checkUnread = async () => {
//     try {
//       const token = sessionStorage.getItem("token");
//       if (!token) return;
//       const res = await fetch("http://localhost:8081/api/notifications/unread-count", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (!res.ok) return;
//       const data = await res.json();
//       setUnread(data.count);
//     } catch (err) {
//       console.error("Navbar notif check failed:", err);
//     }
//   };

//   // ✅ check for new buzz posts since last visit
//   const checkNewBuzz = async () => {
//     try {
//       const token = sessionStorage.getItem("token");
//       if (!token) return;
//       const lastVisit = localStorage.getItem("lastBuzzVisit");
//       if (!lastVisit) { setBuzzDot(true); return; }
//       const res = await fetch("http://localhost:8081/api/buzz", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (!res.ok) return;
//       const posts = await res.json();
//       const hasNew = posts.some(p =>
//         new Date(p.createdAt).getTime() > parseInt(lastVisit)
//       );
//       setBuzzDot(hasNew);
//     } catch (err) {
//       console.error("Buzz dot check failed:", err);
//     }
//   };

//   const closeMenu = () => setOpen(false);

//   const linkClasses = ({ isActive }) =>
//     isActive ? "text-white font-semibold" : "text-gray-400 hover:text-white";

//   const handleLogout = () => {
//     sessionStorage.clear();
//     setUnread(0);
//     setBuzzDot(false);
//     closeMenu();
//     navigate("/");
//   };

//   return (
//     <nav className="fixed top-0 w-full bg-[#0f0f0f] border-b border-white/5
//                     text-white shadow-lg z-50">
//       <div className="flex items-center justify-between px-6 py-4">
//         <h1 className="text-2xl font-bold text-white">Campus Vault</h1>

//         <ul className="hidden md:flex flex-1 justify-center space-x-8 text-lg items-center">
//           <li><NavLink to="home" end className={linkClasses}>Home</NavLink></li>
//           <li><NavLink to="resources" className={linkClasses}>Resources</NavLink></li>

//           {/* ✅ Connect with red dot if new buzz */}
//           <li>
//             <NavLink to="connect" className={linkClasses}>
//               {({ isActive }) => (
//                 <span className="relative inline-flex items-center">
//                   Connect
//                   {buzzDot && (
//                     <span className="absolute -top-1 -right-2 w-2 h-2
//                                      rounded-full bg-red-500 animate-pulse" />
//                   )}
//                 </span>
//               )}
//             </NavLink>
//           </li>

//           <li><NavLink to="about" className={linkClasses}>About</NavLink></li>
//           <li><NavLink to="dashboard" className={linkClasses}>Dashboard</NavLink></li>

//           {unread > 0 && (
//             <li>
//               <button
//                 onClick={() => navigate("dashboard", { state: { tab: "activity" } })}
//                 className="relative w-8 h-8 flex items-center justify-center
//                            rounded-xl bg-white/5 hover:bg-white/10
//                            border border-white/10 transition-all"
//               >
//                 <span className="text-base">🔔</span>
//                 <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#26F2D0] text-black
//                                  text-xs font-bold rounded-full flex items-center justify-center">
//                   {unread > 9 ? "9+" : unread}
//                 </span>
//               </button>
//             </li>
//           )}
//         </ul>

//         <div className="hidden md:flex items-center gap-3">
//           <button onClick={handleLogout}
//             className="text-gray-400 hover:text-red-400 transition text-sm">
//             Logout
//           </button>
//         </div>

//         <button className="md:hidden text-3xl focus:outline-none"
//           onClick={() => setOpen(!open)}>☰</button>
//       </div>

//       {/* Mobile menu */}
//       {open && (
//         <ul className="md:hidden bg-[#0b0b0b] text-gray-400 text-center
//                        space-y-4 py-4 text-lg border-t border-white/10">
//           <li><NavLink to="home" end className={linkClasses} onClick={closeMenu}>Home</NavLink></li>
//           <li><NavLink to="resources" className={linkClasses} onClick={closeMenu}>Resources</NavLink></li>
//           <li>
//             <NavLink to="connect" className={linkClasses}
//               onClick={() => { closeMenu(); window.dispatchEvent(new Event("buzzRead")); }}>
//               <span className="relative inline-flex items-center">
//                 Connect
//                 {buzzDot && (
//                   <span className="absolute -top-1 -right-2 w-2 h-2
//                                    rounded-full bg-red-500 animate-pulse" />
//                 )}
//               </span>
//             </NavLink>
//           </li>
//           <li><NavLink to="about" className={linkClasses} onClick={closeMenu}>About</NavLink></li>
//           <li><NavLink to="dashboard" className={linkClasses} onClick={closeMenu}>Dashboard</NavLink></li>
//           {unread > 0 && (
//             <li>
//               <button
//                 onClick={() => { navigate("dashboard", { state: { tab: "activity" } }); closeMenu(); }}
//                 className="text-[#26F2D0] text-sm font-medium"
//               >
//                 🔔 {unread} new notification{unread > 1 ? "s" : ""}
//               </button>
//             </li>
//           )}
//           <li>
//             <button onClick={handleLogout}
//               className="text-red-400 hover:text-red-300 transition-colors">
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
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {Bell} from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [buzzDot, setBuzzDot] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const role = sessionStorage.getItem("role");
  // const rollNumber = sessionStorage.getItem("rollNumber");
  const isAdmin = role === "ADMIN";

  // ✅ base path for nav links — admin stays at /admin/dashboard, students use relative
  const id =sessionStorage.getItem("id");
  const studentBase = `/profile/${id}`;

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const myId = sessionStorage.getItem("id");
    if (!token || !myId) return;

    checkUnread();
    checkNewBuzz();

    const evtSource = new EventSource(
      `http://localhost:8081/api/notifications/stream?token=${token}`
    );
    evtSource.addEventListener("notification", () => {
      setUnread(prev => prev + 1);
    });
    evtSource.onerror = () => evtSource.close();

    const handleRead = () => setUnread(0);
    window.addEventListener("notificationsRead", handleRead);

    const handleNewBuzz = () => setBuzzDot(true);
    window.addEventListener("newBuzz", handleNewBuzz);

    const handleBuzzRead = () => setBuzzDot(false);
    window.addEventListener("buzzRead", handleBuzzRead);

    return () => {
      evtSource.close();
      window.removeEventListener("notificationsRead", handleRead);
      window.removeEventListener("newBuzz", handleNewBuzz);
      window.removeEventListener("buzzRead", handleBuzzRead);
    };
  }, [location.pathname.split("/")[1]]);

  const checkUnread = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return;
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

  const checkNewBuzz = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return;
      const lastVisit = localStorage.getItem("lastBuzzVisit");
      if (!lastVisit) { setBuzzDot(true); return; }
      const res = await fetch("http://localhost:8081/api/buzz", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) return;
      const posts = await res.json();
      const hasNew = posts.some(p =>
        new Date(p.createdAt).getTime() > parseInt(lastVisit)
      );
      setBuzzDot(hasNew);
    } catch (err) {
      console.error("Buzz dot check failed:", err);
    }
  };

  const closeMenu = () => setOpen(false);

  const handleLogout = () => {
    sessionStorage.clear();
    setUnread(0);
    setBuzzDot(false);
    closeMenu();
    navigate("/");
  };

  const handleBellClick = () => {
    if (isAdmin) {
      // ✅ admin — just mark read, already on dashboard
      fetch("http://localhost:8081/api/notifications/mark-read", {
        method: "POST",
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
      });
      setUnread(0);
    } else {
      navigate(`${studentBase}/dashboard`, { state: { tab: "activity" } });
    }
  };

  const linkClasses = ({ isActive }) =>
    isActive ? "text-white font-semibold" : "text-gray-400 hover:text-white";

  // ✅ admin only sees Dashboard link pointing to /admin/dashboard
  // students see all nav links with absolute paths
  const renderNavLinks = (onClick = null) => {
    if (isAdmin) {
      return (
        <li>
          <NavLink to="/admin/dashboard" className={linkClasses} onClick={onClick}>
            Dashboard
          </NavLink>
        </li>
      );
    }

    return (
      <>
        <li><NavLink to={`${studentBase}/home`} className={linkClasses} onClick={onClick}>Home</NavLink></li>
        <li><NavLink to={`${studentBase}/resources`} className={linkClasses} onClick={onClick}>Resources</NavLink></li>
        <li>
          <NavLink to={`${studentBase}/connect`}
            className={({ isActive }) => isActive ? "text-white font-semibold" : "text-gray-400 hover:text-white"}
            onClick={() => { onClick?.(); window.dispatchEvent(new Event("buzzRead")); }}>
            <span className="relative inline-flex items-center">
              Connect
              {buzzDot && (
                <span className="absolute -top-1 -right-2 w-2 h-2
                                 rounded-full bg-red-500 animate-pulse" />
              )}
            </span>
          </NavLink>
        </li>
        <li><NavLink to={`${studentBase}/about`} className={linkClasses} onClick={onClick}>About</NavLink></li>
        <li><NavLink to={`${studentBase}/dashboard`} className={linkClasses} onClick={onClick}>Dashboard</NavLink></li>
      </>
    );
  };

  return (
    <nav className="fixed top-0 w-full bg-[#0f0f0f] border-b border-white/5
                    text-white shadow-lg z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-white">Campus Vault</h1>

        <ul className="hidden md:flex flex-1 justify-center space-x-8 text-lg items-center">
          {renderNavLinks()}

          {unread > 0 && (
            <li>
              <button
                onClick={handleBellClick}
                className="relative w-8 h-8 flex items-center justify-center
                           rounded-xl bg-white/5 hover:bg-white/10
                           border border-white/10 transition-all"
              >
                <span className="text-base"><Bell
  size={18}
  className={unread > 0 ? "animate-pulse text-[#26F2D0]" : "text-white"}
/></span>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#26F2D0] text-black
                                 text-xs font-bold rounded-full flex items-center justify-center">
                  {unread > 9 ? "9+" : unread}
                </span>
              </button>
            </li>
          )}
        </ul>

        <div className="hidden md:flex items-center gap-3">


<button className="logoutBtn" onClick={handleLogout}>
  <div className="sign">
    <svg viewBox="0 0 512 512">
      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
    </svg>
  </div>

  <div className="text">Logout</div>
</button>


        </div>



        <button className="md:hidden text-3xl focus:outline-none"
          onClick={() => setOpen(!open)}>☰</button>
      </div>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden bg-[#0b0b0b] text-gray-400 text-center
                       space-y-4 py-4 text-lg border-t border-white/10">
          {renderNavLinks(closeMenu)}
          {unread > 0 && (
            <li>
              <button
                onClick={() => { handleBellClick(); closeMenu(); }}
                className="text-[#26F2D0] text-sm font-medium"
              >
                🔔 {unread} new notification{unread > 1 ? "s" : ""}
              </button>
            </li>
          )}
          <li>


<button className="logoutBtn" onClick={handleLogout}>
  <div className="sign">
    <svg viewBox="0 0 512 512">
      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
    </svg>
  </div>

  <div className="text">Logout</div>
</button>



          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;