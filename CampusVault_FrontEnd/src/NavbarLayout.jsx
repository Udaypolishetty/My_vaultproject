// import Navbar from "./Components/Navbar";
// import { Outlet, useNavigate, useParams } from "react-router-dom";

// const DashboardLayout = () => {
//   const navigate = useNavigate();
//   const { roll } = useParams();

//   const handleSectionChange = (section) => {
//     navigate(`/profile/${roll}/${section.toLowerCase()}`);
//   };

//   return (
//     <>
//       <Navbar setActiveSection={handleSectionChange} />
//       <div className="pt-16">
//         <Outlet />
//       </div>
//     </>
//   );
// };

// export default DashboardLayout;

import Navbar from "./Components/Navbar";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { roll } = useParams();
  const location = useLocation();

  const handleSectionChange = (section) => {
    navigate(`/profile/${id}/${section.toLowerCase()}`);
  };

  return (
    <>
      <Navbar setActiveSection={handleSectionChange} />
      <div className="pt-16">
        <div key={location.pathname} className="animate-fadeIn">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;