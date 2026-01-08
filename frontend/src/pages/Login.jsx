import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    navigate("/chatbot");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Farmer Login
        </h2>

        <input
          className="w-full p-3 border rounded mb-4 text-lg"
          placeholder="Email"
        />
        <input
          type="password"
          className="w-full p-3 border rounded mb-4 text-lg"
          placeholder="Password"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-700 text-white p-3 rounded text-lg font-semibold hover:bg-green-800"
        >
          Login
        </button>

        <p className="text-center mt-4">
          New user?{" "}
          <Link to="/signup" className="text-green-700 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
