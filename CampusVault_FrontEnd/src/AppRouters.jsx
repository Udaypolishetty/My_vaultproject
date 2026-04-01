// import { Routes, Route } from "react-router-dom";

// import Access from './Access'

// import AppLayout from "./AppLayout";
// import StudentProfile from "./Components/StudentProfile";
// import Home from "./Components/Home";
// import Update from "./Components/Update";
// import Upload from "./Components/Upload";
// import Resources from "./Components/Resources";
// import About from "./Components/About";
// import Connect from "./Components/Connect";
// import NavbarLayout from "./NavbarLayout"




// function AppRouters() {
//   return (
//     <Routes>
//   <Route path="/" element={<Access />} />

//   <Route path="/profile" element={<AppLayout />}>
//     <Route index element={<StudentProfile />} />

    
//     <Route path=":roll" element={<NavbarLayout />}>
//   <Route path="home" element={<Home />} />
//   <Route path="resources" element={<Resources />} />
//   <Route path="connect" element={<Connect />} />
//   <Route path="about" element={<About />} />
//   <Route path="upload" element={<Upload />} />
//   <Route path="/admin/dashboard" element={<AdminDashboard />} />

// </Route>
//   </Route>
// </Routes>

//   );

// }

// export default AppRouters;



// import { Routes, Route } from "react-router-dom";
// import Access from './Access';
// import AppLayout from "./AppLayout";
// import StudentProfile from "./Components/StudentProfile";
// import Home from "./Components/Home";
// import Update from "./Components/Update";
// import Upload from "./Components/Upload";
// import Resources from "./Components/Resources";
// import About from "./Components/About";
// import Connect from "./Components/Connect";
// import NavbarLayout from "./NavbarLayout";
// import AdminDashboard from "./Components/AdminDashboard"; // ✅ import added
// import StudentDashboard from "./Components/StudentDashboard";
// import PublicIdeaPage from "./Components/Ideas/PublicIdeaPage";
// // Footer pages
// import CommunityGuidelines from "./Components/FooterFiles/CommunityGuidelines";
// import Privacy from "./Components/FooterFiles/Privacy";
// import Contact from "./Components/FooterFiles/Contact";


// function AppRouters() {
//   return (
//     <Routes>
//       <Route path="/" element={<Access />} />

//             {/* Footer pages — top-level, no auth needed */}
//       <Route path="/community-guidelines" element={<CommunityGuidelines />} />
//       <Route path="/privacy"              element={<Privacy />} />
//       <Route path="/terms"                element={<Privacy />} />
//       <Route path="/contact"              element={<Contact />} />   {/* renamed from /about */}

//       {/* ✅ Admin route — outside profile, at top level */}
//       <Route path="/admin/dashboard" element={<AdminDashboard />} />

//       {/* ✅ Public idea page — no auth needed */}
//     <Route path="/idea/:id" element={<PublicIdeaPage />} />

//       <Route path="/profile" element={<AppLayout />}>
//         <Route index element={<StudentProfile />} />
//         <Route path=":roll" element={<NavbarLayout />}>
//           <Route path="home" element={<Home />} />
//           <Route path="resources" element={<Resources />} />
//           <Route path="connect" element={<Connect />} />
//           <Route path="about" element={<About />} />
//           <Route path="upload" element={<Upload />} />
//           <Route path="dashboard" element={<StudentDashboard />} />
//         </Route>
//       </Route>
//     </Routes>
//   );
// }

// export default AppRouters;




// import { Routes, Route } from "react-router-dom";
// import Access from './Access';
// import AppLayout from "./AppLayout";
// import StudentProfile from "./Components/StudentProfile";
// import Home from "./Components/Home";
// import Update from "./Components/Update";
// import Upload from "./Components/Upload";
// import Resources from "./Components/Resources";
// import About from "./Components/About";           // ← your existing About (unchanged)
// import Connect from "./Components/Connect";
// import NavbarLayout from "./NavbarLayout";
// import AdminDashboard from "./Components/AdminDashboard";
// import StudentDashboard from "./Components/StudentDashboard";
// import PublicIdeaPage from "./Components/Ideas/PublicIdeaPage";

// // ── Footer pages — all live in Components/FooterFiles/ ──
// import CommunityGuidelines from "./Components/FooterFiles/CommunityGuidelines";
// import Privacy             from "./Components/FooterFiles/Privacy";
// import Terms               from "./Components/FooterFiles/Terms";
// import Contact             from "./Components/FooterFiles/Contact";

// function AppRouters() {
//   return (
//     <Routes>
//       <Route path="/" element={<Access />} />

//       {/* Footer pages — public, no auth needed */}
//       <Route path="/community-guidelines" element={<CommunityGuidelines />} />
//       <Route path="/privacy"              element={<Privacy />} />
//       <Route path="/terms"                element={<Terms />} />
//       <Route path="/contact"              element={<Contact />} />

//       {/* Admin */}
//       <Route path="/admin/dashboard" element={<AdminDashboard />} />

//       {/* Public idea page */}
//       <Route path="/idea/:id" element={<PublicIdeaPage />} />

//       <Route path="/profile" element={<AppLayout />}>
//         <Route index element={<StudentProfile />} />
//         <Route path=":roll" element={<NavbarLayout />}>
//           <Route path="home"      element={<Home />} />
//           <Route path="resources" element={<Resources />} />
//           <Route path="connect"   element={<Connect />} />
//           <Route path="about"     element={<About />} />   {/* existing — untouched */}
//           <Route path="upload"    element={<Upload />} />
//           <Route path="dashboard" element={<StudentDashboard />} />
//         </Route>
//       </Route>
//     </Routes>
//   );
// }

// export default AppRouters;



import { useState } from "react";
import { Routes, Route,Navigate } from "react-router-dom";
import Access from './Access';
import AppLayout from "./AppLayout";
import StudentProfile from "./Components/StudentProfile";
import Home from "./Components/Home";
import Upload from "./Components/Upload";
import Resources from "./Components/Resources";
import About from "./Components/About";
import Connect from "./Components/Connect";
import NavbarLayout from "./NavbarLayout";
import AdminDashboard from "./Components/AdminDashboard";
import StudentDashboard from "./Components/StudentDashboard";
import PublicIdeaPage from "./Components/Ideas/PublicIdeaPage";
import CommunityGuidelines from "./Components/FooterFiles/CommunityGuidelines";
import Privacy             from "./Components/FooterFiles/Privacy";
import Terms               from "./Components/FooterFiles/Terms";
import Contact             from "./Components/FooterFiles/Contact";
import SplashScreen        from "./Components/SplashScreen";

function AppRouters() {
  // ── Show splash once per browser session.
  // sessionStorage clears when the tab is closed,
  // so it re-shows on a fresh open — exactly like YouTube / Google apps.
  const [splashDone, setSplashDone] = useState(
    () => sessionStorage.getItem("cv_splash_shown") === "true"
  );

  const handleSplashDone = () => {
    sessionStorage.setItem("cv_splash_shown", "true");
    setSplashDone(true);
  };

  // Splash takes over the entire screen before ANY route renders
  if (!splashDone) {
    return <SplashScreen onDone={handleSplashDone} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Access />} />

      {/* Footer pages — public, no auth needed */}
      <Route path="/community-guidelines" element={<CommunityGuidelines />} />
      <Route path="/privacy"              element={<Privacy />} />
      <Route path="/terms"                element={<Terms />} />
      <Route path="/contact"              element={<Contact />} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/dashboard/:tab" element={<AdminDashboard />} />
<Route path="/admin/dashboard" element={<Navigate to="/admin/dashboard/students" />} />

      {/* Public idea page */}
      <Route path="/idea/:id" element={<PublicIdeaPage />} />
      <Route path="/profile" element={<StudentProfile />} />
      <Route path="/profile/:id" element={<AppLayout />}>
        <Route index element={<StudentProfile />} />
        <Route element={<NavbarLayout />}>
          <Route path="home"      element={<Home />} />
          <Route path="resources" element={<Resources />} />
          <Route path="connect"   element={<Connect />} />
          <Route path="about"     element={<About />} />
          <Route path="upload"    element={<Upload />} />
          <Route path="dashboard" element={<StudentDashboard />} />

          <Route path="connect/:tab" element={<Connect />} />
<Route path="connect" element={<Navigate to="connect/ideas" />} />

<Route path="dashboard/:tab" element={<StudentDashboard />} />
<Route path="dashboard" element={<Navigate to="dashboard/profile" />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouters;