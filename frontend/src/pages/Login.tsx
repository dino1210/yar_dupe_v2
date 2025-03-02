import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircleUserRound } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  // State for login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for registration form (Modal)
  const [modalOpen, setModalOpen] = useState(false);
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [error] = useState("");

  // Function to handle login
  const handleLogin = () => {
    navigate("/home");
  };

  return (
    <div
      className="relative flex min-h-screen bg-cover bg-center justify-center items-center px-4"
      style={{ backgroundImage: "url('/src/images/login-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Branding - Hidden on Mobile */}
      <div className="relative hidden sm:flex flex-col items-center text-center text-white p-6">
        <h1 className="text-5xl font-bold mb-1" style={{ color: "#17A2B8" }}>
          Yardrainage
        </h1>
        <h2 className="text-3xl font-light mb-2" style={{ color: "#17A2B8" }}>
          Maintenance and Services
        </h2>
        <h3 className="text-xl">Inventory Management System</h3>
      </div>

      {/* Login Form - Always Visible */}
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

          <div className="flex items-center justify-between mb-6">
            <a href="#" className="text-xs text-blue-600 hover:underline">
              Forgot password?
            </a>
            <button type="button" onClick={() => setModalOpen(true)} className="text-xs text-blue-600 hover:underline">
              Create an account
            </button>
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="button"
            onClick={handleLogin}
            className="w-full px-4 py-2 text-xs text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
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

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <div className="flex justify-between">
              <button onClick={() => setModalOpen(false)} className="text-xs text-blue-600 hover:underline">
                Cancel
              </button>
              <button className="px-4 py-2 text-xs text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
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
