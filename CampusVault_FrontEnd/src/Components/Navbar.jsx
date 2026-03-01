
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


import React, { useState } from "react";

const Navbar = ({ setActiveSection }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (section) => {
    setActiveSection(section);
    setOpen(false);
  };

  return (
    // <nav className="fixed top-0 w-full bg-[#0f0f0f]  text-white shadow-lg z-50">
    <nav className="fixed top-0 w-full bg-[#0f0f0f]  text-white shadow-lg z-50">

      <div className="flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <h1 className="text-2xl font-bold">Campus Vault</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-1 justify-center space-x-8 text-lg text-gray-400">
          <li className="hover:text-white cursor-pointer" onClick={() => handleClick("Home")}>Home</li>
          <li className="hover:text-white cursor-pointer" onClick={() => handleClick("Resources")}>Resources</li>
          <li className="hover:text-white cursor-pointer" onClick={() => handleClick("Connect")}>Connect</li>
          <li className="hover:text-white cursor-pointer" onClick={() => handleClick("About")}>About</li>
          <li className="hover:text-white cursor-pointer" onClick={() => handleClick("Upload")}>Upload</li>
        </ul>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <ul className="md:hidden bg-[#0f0f0f] border-t border-white/10 text-gray-400 text-center space-y-4 py-4 text-lg">
          <li className="hover:text-white cursor-pointer" onClick={() => handleClick("Home")}>Home</li>
          <li className="hover:text-white cursor-pointer" onClick={() => handleClick("Resources")}>Resources</li>
          <li className="hover:text-white cursor-pointer" onClick={() => handleClick("Connect")}>Connect</li>
          <li className="hover:text-white cursor-pointer" onClick={() => handleClick("About")}>About</li>
          <li className="hover:text-white cursor-pointer" onClick={() => handleClick("Upload")}>Upload</li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;