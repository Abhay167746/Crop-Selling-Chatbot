import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";
import collegeLogo from "../assets/cot.jpg";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleLanguage } = useContext(LanguageContext);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setMenuOpen(false);
    navigate("/");
  };

  const navLinkStyle = ({ isActive }) =>
    `block px-4 py-2 rounded-md text-lg transition cursor-pointer
     ${
       isActive
         ? "bg-white text-green-700 font-semibold"
         : "text-white hover:bg-green-600"
     }`;

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-green-700 px-6 py-4 shadow-md sticky top-0 z-50"
    >
      {/* TOP BAR */}
      <div className="flex justify-between items-center">
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src={collegeLogo}
            alt="College Logo"
            className="h-12 w-12 rounded-full bg-white p-1"
          />
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/about" className={navLinkStyle}>
            About
          </NavLink>

          {!isLoggedIn && (
            <>
              <NavLink to="/login" className={navLinkStyle}>
                Login
              </NavLink>

              <NavLink to="/signup" className={navLinkStyle}>
                Signup
              </NavLink>
            </>
          )}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white hover:bg-red-600 rounded-md transition cursor-pointer"
            >
              Logout
            </button>
          )}

          <motion.button
            whileTap={{ rotate: 180, scale: 1.1 }}
            onClick={toggleLanguage}
            title="Change Language"
            className="
    text-2xl text-white cursor-pointer
    p-2 rounded-full
    hover:bg-green-600
    transition
  "
          >
            🌐
          </motion.button>
        </div>

        {/* HAMBURGER */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-3xl cursor-pointer"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="md:hidden mt-4 bg-green-600 rounded-lg py-3 space-y-1"
        >
          <NavLink
            onClick={() => setMenuOpen(false)}
            to="/"
            className={navLinkStyle}
          >
            Home
          </NavLink>

          <NavLink
            onClick={() => setMenuOpen(false)}
            to="/about"
            className={navLinkStyle}
          >
            About
          </NavLink>

          {!isLoggedIn && (
            <>
              <NavLink
                onClick={() => setMenuOpen(false)}
                to="/login"
                className={navLinkStyle}
              >
                Login
              </NavLink>

              <NavLink
                onClick={() => setMenuOpen(false)}
                to="/signup"
                className={navLinkStyle}
              >
                Signup
              </NavLink>
            </>
          )}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-white hover:bg-red-600 rounded-md transition"
            >
              Logout
            </button>
          )}

          {/* 🌐 LANGUAGE TOGGLE (MOBILE) */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            className="flex items-center gap-3 px-4 py-2 text-white text-lg
                       hover:bg-green-700 rounded-md transition"
          >
            🌐 <span className="text-sm opacity-80">(Change Language)</span>
          </motion.button>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;
