import { Routes, Route } from "react-router-dom";

import Access from './Access'

import AppLayout from "./AppLayout";
import StudentProfile from "./Components/StudentProfile";
import Home from "./Components/Home";
import Update from "./Components/Update";
import Upload from "./Components/Upload";
import Resources from "./Components/Resources";
import About from "./Components/About";
import Connect from "./Components/Connect";
import NavbarLayout from "./NavbarLayout"




function AppRouters() {
  return (
    <Routes>
  <Route path="/" element={<Access />} />

  <Route path="/profile" element={<AppLayout />}>
    <Route index element={<StudentProfile />} />

    
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

}

export default AppRouters;
