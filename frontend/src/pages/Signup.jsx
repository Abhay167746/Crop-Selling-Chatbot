import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setError("");

    if (
      !form.email.trim() ||
      !form.password.trim() ||
      !form.confirmPassword.trim()
    ) {
      return setError("Please fill all fields");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      navigate("/login");

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
          🌾 Create Your Account
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded text-center mb-4">
            {error}
          </p>
        )}

        {/* Name */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4 text-lg focus:outline-green-500"
          placeholder="Full Name"
        />

        {/* Email */}
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4 text-lg focus:outline-green-500"
          placeholder="Email Address"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4 text-lg focus:outline-green-500"
          placeholder="Password"
        />

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-6 text-lg focus:outline-green-500"
          placeholder="Confirm Password"
        />

        {/* Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className={`w-full p-3 rounded text-lg font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-700 text-white hover:bg-green-800"
          }`}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {/* Footer */}
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 font-semibold">
            Login
          </Link>
        </p>

      </motion.div>
    </div>
  );
}

export default Signup;