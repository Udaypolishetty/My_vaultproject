<<<<<<< HEAD
import React, { useState } from "react";
=======
<<<<<<< HEAD
>>>>>>> 58c1648 (update all)
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const linkClasses = ({ isActive }) =>
    isActive
      ? "text-white font-semibold"
      : "text-gray-400 hover:text-white";

  return (
    <nav className="fixed top-0 w-full bg-[#181818] text-white shadow-lg z-50 pb-6">
      <div className="flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <h1 className="text-2xl font-bold">Campus Vault</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-1 justify-center space-x-8 text-lg text-gray-400">
          <li>
            <NavLink to="home" end className={linkClasses}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="resources" className={linkClasses}>
              Resources
            </NavLink>
          </li>
          <li>
            <NavLink to="connect" className={linkClasses}>
              Connect
            </NavLink>
          </li>
          <li>
            <NavLink to="about" className={linkClasses}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="upload" className={linkClasses}>
              Upload
            </NavLink>
          </li>
        </ul>

        {/* Hamburger */}
        <button
           className="md:hidden text-3xl focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>
<<<<<<< HEAD
=======
=======
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const linkClasses = ({ isActive }) =>
    isActive
      ? "text-white font-semibold"
      : "text-gray-400 hover:text-white";

  return (
    <nav className="fixed top-0 w-full bg-[#181818] text-white shadow-lg z-50 pb-6">
      <div className="flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <h1 className="text-2xl font-bold">Campus Vault</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-1 justify-center space-x-8 text-lg text-gray-400">
          <li>
            <NavLink to="home" end className={linkClasses}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="resources" className={linkClasses}>
              Resources
            </NavLink>
          </li>
          <li>
            <NavLink to="connect" className={linkClasses}>
              Connect
            </NavLink>
          </li>
          <li>
            <NavLink to="about" className={linkClasses}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="upload" className={linkClasses}>
              Upload
            </NavLink>
          </li>
        </ul>

        {/* Hamburger */}
        <button
           className="md:hidden text-3xl focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>
>>>>>>> 58c1648 (update all)

      {/* Mobile Menu */}
      {open && (
         <ul className="md:hidden bg-black text-gray-400 text-center space-y-4 py-4 text-lg">
          <li>
            <NavLink to="home" end className={linkClasses} onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="resources" className={linkClasses} onClick={closeMenu}>
              Resources
            </NavLink>
          </li>
          <li>
            <NavLink to="connect" className={linkClasses} onClick={closeMenu}>
              Connect
            </NavLink>
          </li>
          <li>
            <NavLink to="about" className={linkClasses} onClick={closeMenu}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="upload" className={linkClasses} onClick={closeMenu}>
              Upload
            </NavLink>
          </li>
        </ul>
      )}
<<<<<<< HEAD
=======
>>>>>>> ed0b59a (updated all changes like url and home etc)
>>>>>>> 58c1648 (update all)
    </nav>
  );
};

export default Navbar;
