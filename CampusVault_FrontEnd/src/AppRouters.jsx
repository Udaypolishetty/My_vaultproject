import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Access from "./Access";
=======
<<<<<<< HEAD
import Access from './Access'
>>>>>>> 58c1648 (update all)
import AppLayout from "./AppLayout";
import StudentProfile from "./Components/StudentProfile";
import Home from "./Components/Home";
import Update from "./Components/Update";
import Upload from "./Components/Upload";
import Resources from "./Components/Resources";
import About from "./Components/About";
import Connect from "./Components/Connect";
import NavbarLayout from "./NavbarLayout"

<<<<<<< HEAD
=======
function AppRouters () {
    return (
        <>
        <Routes>
            <Route path="/" element={<Access/>} />
            <Route path="/home/*" element={<AppLayout/>} />
        </Routes>
        </>
    )
=======
import Access from "./Access";
import AppLayout from "./AppLayout";
import StudentProfile from "./Components/StudentProfile";
import Home from "./Components/Home";
import Update from "./Components/Update";
import Upload from "./Components/Upload";
import Resources from "./Components/Resources";
import About from "./Components/About";
import Connect from "./Components/Connect";
import NavbarLayout from "./NavbarLayout"

>>>>>>> 58c1648 (update all)
function AppRouters() {
  return (
    <Routes>
  <Route path="/" element={<Access />} />

  <Route path="/profile" element={<AppLayout />}>
    <Route index element={<StudentProfile />} />

    {/* 👇 ALL SIBLING ROUTES */}
    <Route path=":roll" element={<NavbarLayout />}>
  <Route path="home" element={<Home />} />
  <Route path="resources" element={<Resources />} />
  <Route path="connect" element={<Connect />} />
  <Route path="about" element={<About />} />
  <Route path="upload" element={<Upload />} />
</Route>
  </Route>
</Routes>

  );
<<<<<<< HEAD
=======
>>>>>>> ed0b59a (updated all changes like url and home etc)
>>>>>>> 58c1648 (update all)
}

export default AppRouters;
