import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";
<<<<<<< HEAD

const AppLayout = () => {
  return (
=======
<<<<<<< HEAD
import HomeRoutes from "./HomeRoutes";

const AppLayout = () => {
  return (
    <div className="bg-[#181818] min-h-screen text-white pt-20">
      <Navbar />
      <HomeRoutes />
      <Outlet />
    </div>
=======

const AppLayout = () => {
  return (
>>>>>>> 58c1648 (update all)
    <>
      
      <div className="">
        <Outlet />
      </div>
    </>
<<<<<<< HEAD
=======
>>>>>>> ed0b59a (updated all changes like url and home etc)
>>>>>>> 58c1648 (update all)
  );
};

export default AppLayout;
