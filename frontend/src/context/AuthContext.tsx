import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Define the AuthContext
const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Call this function to login and fetch the user role
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      // Save token in localStorage (optional)
      localStorage.setItem("token", response.data.token);

      // Fetch user role
      const roleResponse = await axios.get(
        "http://localhost:5000/api/user-role",
        {
          headers: { Authorization: `Bearer ${response.data.token}` },
        }
      );

      setUser({ ...response.data, role: roleResponse.data.role });
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Optionally, you can check if there's a saved token and fetch the role
    const fetchUserFromToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const roleResponse = await axios.get(
            "http://localhost:5000/api/user-role",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser({ role: roleResponse.data.role });
        } catch (err) {
          console.error("Error fetching user from token:", err);
        }
      }
    };

    fetchUserFromToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
