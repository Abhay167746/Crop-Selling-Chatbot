// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// function Login() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async () => {
//     setError("");

//     if (!form.email || !form.password) {
//       return setError("Please fill all fields");
//     }

//     try {
//       setLoading(true);

//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       // Save token
//       localStorage.setItem("token", data.token);

//       navigate("/chatbot");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white px-4">

//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md"
//       >
//         <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
//           🌾 Farmer Login
//         </h2>

//         {error && (
//           <p className="text-red-500 text-center mb-4">{error}</p>
//         )}

//         <input
//           name="email"
//           onChange={handleChange}
//           className="w-full p-3 border rounded mb-4 text-lg focus:outline-green-500"
//           placeholder="Email"
//         />

//         <input
//           type="password"
//           name="password"
//           onChange={handleChange}
//           className="w-full p-3 border rounded mb-4 text-lg focus:outline-green-500"
//           placeholder="Password"
//         />

//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           className="w-full bg-green-700 text-white p-3 rounded text-lg font-semibold hover:bg-green-800 transition cursor-pointer"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <p className="text-center mt-4">
//           New user?{" "}
//           <Link to="/signup" className="text-green-700 font-semibold">
//             Sign Up
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setError("");

    if (!form.email.trim() || !form.password.trim()) {
      return setError("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Server not responding properly");
      }

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Save token
      localStorage.setItem("token", data.token);

      navigate("/chatbot");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md"
      >

        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          🌾 Farmer Login
        </h2>

        {/* Error Message */}
        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded text-center mb-4">
            {error}
          </p>
        )}

        {/* Email */}
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          className="w-full p-3 border rounded mb-4 text-lg focus:outline-green-500"
          placeholder="Email"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          className="w-full p-3 border rounded mb-4 text-lg focus:outline-green-500"
          placeholder="Password"
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full p-3 rounded text-lg font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-700 text-white hover:bg-green-800"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup */}
        <p className="text-center mt-4">
          New user?{" "}
          <Link to="/signup" className="text-green-700 font-semibold">
            Sign Up
          </Link>
        </p>

      </motion.div>
    </div>
  );
}

export default Login;