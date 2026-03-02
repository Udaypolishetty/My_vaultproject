import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0b0b0b] border-t border-white/10 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left Section */}
        <div className="text-gray-500 text-xs text-center md:text-left">
          © {new Date().getFullYear()} Campus Vault. All rights reserved.
        </div>

        {/* Right Section - Links */}
        <div className="flex items-center gap-6 text-xs text-gray-400">
          <Link
            to="/community-guidelines"
            className="hover:text-white transition"
          >
            Community Guidelines
          </Link>

          <Link
            to="/privacy"
            className="hover:text-white transition"
          >
            Privacy
          </Link>

          <Link
            to="/terms"
            className="hover:text-white transition"
          >
            Terms
          </Link>

          <Link
            to="/about"
            className="hover:text-white transition"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}