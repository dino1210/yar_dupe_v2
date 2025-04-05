import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircleUserRound } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  // Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Registration State
  const [modalOpen, setModalOpen] = useState(false);
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");

  // Function to handle login
  const handleLogin = async () => {
    console.log("Attempting login with:", { email, password }); // Debugging line
  
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err); // Debugging line
      setLoginError(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  };
  
  

  // Function to handle registration
  const handleRegister = async () => {
    try {
      setRegError("");
      setRegSuccess("");

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: regUsername, email: regEmail, password: regPassword }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setRegSuccess("Registration successful! You can now log in.");
      setTimeout(() => setModalOpen(false), 2000); // Close modal after success
    } catch (err) {
      setRegError(err.message);
    }
  };

  return (
    <div className="relative flex min-h-screen bg-cover bg-center justify-center items-center px-4"
      style={{ backgroundImage: "url('/src/images/login-bg.jpg')" }}>
      
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Branding - Hidden on Mobile */}
      <div className="relative hidden sm:flex flex-col items-center text-center text-white p-6">
        <h1 className="text-5xl font-bold mb-1" style={{ color: "#17A2B8" }}>
          Yardrainage
        </h1>
        <h2 className="text-3xl font-light mb-2" style={{ color: "#17A2B8" }}>
          Maintenance and Services
        </h2>
        <h3 className="text-xl">Resource Management System</h3>
      </div>

      {/* Login Form */}
      <div className="relative flex flex-col items-center p-6 sm:p-8 bg-white w-full max-w-sm shadow-lg rounded-3xl">
        <form className="w-full">
          <div className="mb-4">
            <div className="flex justify-center items-center text-blue-500">
              <CircleUserRound className="w-12 h-12" />
            </div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              className="w-full px-4 py-2 border text-xs border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-xs font-medium text-gray-600 mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
              className="w-full px-4 py-2 border text-xs border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {loginError && <p className="text-red-500 text-xs">{loginError}</p>}

          <button
            type="button"
            onClick={handleLogin}
            className="w-full px-4 py-2 text-xs text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>

          <div className="flex items-center justify-between mt-4">
            <a href="#" className="text-xs text-blue-600 hover:underline">
              Forgot password?
            </a>
            <button type="button" onClick={() => setModalOpen(true)} className="text-xs text-blue-600 hover:underline">
              Create an account
            </button>
          </div>
        </form>
      </div>

      {/* Registration Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">
            <h2 className="text-2xl mb-4">Create an Account</h2>

            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1">Username:</label>
              <input
                type="text"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                placeholder="Enter your username..."
                className="w-full px-4 py-2 border text-xs border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1">Email:</label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="Enter your email..."
                className="w-full px-4 py-2 border text-xs border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-600 mb-1">Password:</label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Enter your password..."
                className="w-full px-4 py-2 border text-xs border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {regError && <p className="text-red-500 text-xs">{regError}</p>}
            {regSuccess && <p className="text-green-500 text-xs">{regSuccess}</p>}

            <div className="flex justify-between">
              <button onClick={() => setModalOpen(false)} className="text-xs text-blue-600 hover:underline">
                Cancel
              </button>
              <button onClick={handleRegister} className="px-4 py-2 text-xs text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
