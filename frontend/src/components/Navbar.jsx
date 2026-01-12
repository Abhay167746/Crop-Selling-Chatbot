import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    `relative px-4 py-2 text-lg transition-all
     ${
       isActive
         ? "text-green-800 font-semibold"
         : "text-green-900 hover:text-green-700"
     }
     after:absolute after:left-0 after:-bottom-1
     after:h-[2px] after:bg-green-700
     after:transition-all after:duration-300
     ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
    `;

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        fixed top-0 left-0 w-full z-50
        bg-white/40 backdrop-blur-lg
        border-b border-white/30
        shadow-sm
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src={collegeLogo}
            alt="College Logo"
            className="h-11 w-11 rounded-full bg-white p-1 shadow"
          />
        </motion.div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkStyle}>Home</NavLink>
          <NavLink to="/about" className={navLinkStyle}>About</NavLink>

          {!isLoggedIn && (
            <>
              <NavLink to="/login" className={navLinkStyle}>Login</NavLink>
              <NavLink to="/signup" className={navLinkStyle}>Signup</NavLink>
            </>
          )}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="
                px-4 py-2 rounded-full
                bg-red-500/90 text-white
                hover:bg-red-600 transition
              "
            >
              Logout
            </button>
          )}
        </div>

        {/* HAMBURGER */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl text-green-800"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/80 backdrop-blur-lg px-6 py-4 space-y-3"
          >
            <NavLink onClick={() => setMenuOpen(false)} to="/" className={navLinkStyle}>
              Home
            </NavLink>

            <NavLink onClick={() => setMenuOpen(false)} to="/about" className={navLinkStyle}>
              About
            </NavLink>

            {!isLoggedIn && (
              <>
                <NavLink onClick={() => setMenuOpen(false)} to="/login" className={navLinkStyle}>
                  Login
                </NavLink>

                <NavLink onClick={() => setMenuOpen(false)} to="/signup" className={navLinkStyle}>
                  Signup
                </NavLink>
              </>
            )}

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="block w-full text-left text-red-600 px-4 py-2"
              >
                Logout
              </button>
            )}

            <button
              onClick={toggleLanguage}
              className="text-lg flex items-center gap-2"
            >
              🌐 Change Language
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
