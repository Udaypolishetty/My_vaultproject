import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (

    <>
      
      <div className="">
        <Outlet />
      </div>
    </>

  );
};

export default AppLayout;
