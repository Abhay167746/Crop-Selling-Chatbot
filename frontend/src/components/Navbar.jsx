// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();
//   const isLoggedIn = localStorage.getItem("isLoggedIn");

//   const handleChatbot = () => {
//     if (!isLoggedIn) navigate("/login");
//     else navigate("/chatbot");
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     navigate("/");
//   };

//   return (
//     <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center">
//       {/* Logo / College Name */}
//       <h1 className="text-xl font-bold flex items-center gap-2">
//         🌾 GBPUAT
//       </h1>

//       {/* Links */}
//       <div className="flex items-center gap-4 text-lg">
//         <Link to="/" className="hover:underline">Home</Link>
//         <Link to="/about" className="hover:underline">About</Link>

//         {!isLoggedIn && (
//           <Link to="/login" className="hover:underline">
//             Login
//           </Link>
//         )}

//         {isLoggedIn && (
//           <button onClick={handleLogout} className="hover:underline">
//             Logout
//           </button>
//         )}

//         <button
//           onClick={handleChatbot}
//           className="bg-white text-green-700 px-4 py-1 rounded font-semibold hover:bg-green-100"
//         >
//           Chatbot
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage } = useContext(LanguageContext);

  const handleChatbot = () => {
    setMenuOpen(false);
    if (!isLoggedIn) navigate("/login");
    else navigate("/chatbot");
  };

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
      className="bg-green-700 px-6 py-4 shadow-md"
    >
      {/* TOP BAR */}
      <div className="flex justify-between items-center">
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="text-white text-xl font-bold flex items-center gap-2 cursor-pointer"
        >
          🌾 AgriAI
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink to="/" className={navLinkStyle}>Home</NavLink>
          <NavLink to="/about" className={navLinkStyle}>About</NavLink>

          {!isLoggedIn && (
            <NavLink to="/login" className={navLinkStyle}>Login</NavLink>
          )}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white hover:bg-red-600 rounded-md transition cursor-pointer"
            >
              Logout
            </button>
          )}

          {/* LANGUAGE TOGGLE */}
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 rounded-full text-sm bg-green-600 text-white hover:bg-green-500 transition"
          >
            {language === "en" ? "हिंदी" : "English"}
          </button>

          {/* CHATBOT CTA */}
          <button
            onClick={handleChatbot}
            className="bg-white text-green-700 px-5 py-2 rounded-full font-semibold hover:bg-green-100 transition cursor-pointer"
          >
            Chatbot
          </button>
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
          <NavLink onClick={() => setMenuOpen(false)} to="/" className={navLinkStyle}>
            Home
          </NavLink>

          <NavLink onClick={() => setMenuOpen(false)} to="/about" className={navLinkStyle}>
            About
          </NavLink>

          {!isLoggedIn && (
            <NavLink onClick={() => setMenuOpen(false)} to="/login" className={navLinkStyle}>
              Login
            </NavLink>
          )}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-white hover:bg-red-600 rounded-md transition"
            >
              Logout
            </button>
          )}

          <button
            onClick={toggleLanguage}
            className="block w-full text-left px-4 py-2 bg-green-700 text-white rounded-md"
          >
            {language === "en" ? "हिंदी" : "English"}
          </button>

          <button
            onClick={handleChatbot}
            className="block w-full text-left px-4 py-2 bg-white text-green-700 font-semibold rounded-md"
          >
            Chatbot
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;
