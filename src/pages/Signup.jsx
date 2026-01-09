// import { Link, useNavigate } from "react-router-dom";

// function Signup() {
//   const navigate = useNavigate();

//   const handleSignup = () => {
//     navigate("/login");
//   };

//   return (
//     <div style={{ padding: "40px", textAlign: "center" }}>
//       <h1>Sign Up</h1>

//       <input placeholder="Name" /><br /><br />
//       <input placeholder="Email" /><br /><br />
//       <input type="password" placeholder="Password" /><br /><br />

//       <button onClick={handleSignup}>Create Account</button>

//       <p style={{ marginTop: "10px" }}>
//         Already have an account? <Link to="/login">Login</Link>
//       </p>
//     </div>
//   );
// }

// export default Signup;


import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const handleSignup = () => {
    // Later: connect this to backend (MongoDB)
    alert("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Farmer Registration
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 border rounded mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 border rounded mb-6 text-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-green-700 text-white p-3 rounded text-lg font-semibold hover:bg-green-800 transition"
        >
          Create Account
        </button>

        <p className="text-center mt-4 text-lg">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
