// src/components/Layout.jsx
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Your navbar import

const Layout = () => {
  const location = useLocation();
  
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-[#181818] min-h-[calc(100vh-64px)]" // Matches your navbar height
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
    </>
  );
};

export default Layout;
