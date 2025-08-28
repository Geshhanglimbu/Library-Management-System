import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!email || !password) {
      alert("Email or password is missing");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email address");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("https://library-management-system-67n4.onrender.com/login", { email, password });
      console.log("Login response:", JSON.stringify(response.data, null, 2));

      if (response.status === 200) {
        const { user, token } = response.data; // Fixed: Use response.data, not response.data.data
        if (!user || !user.id || !user.role || !token) {
          throw new Error("Invalid login response: Missing user, user.id, user.role, or token");
        }
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        alert("Login successful");
        navigate("/home/books");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      alert(error.response?.data.message || "Something went wrong during login");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.get("https://library-management-system-67n4.onrender.com/verify-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Token verification response:", JSON.stringify(response.data, null, 2));
      if (response.status === 200) {
        const { user } = response.data;
        if (user && user.id && user.role) { // Fixed: Use user.id
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/home/books");
        } else {
          throw new Error("Invalid user data in token verification");
        }
      }
    } catch (error) {
      console.error("Token verification error:", error.response?.data || error);
      if (error.response?.status === 401 || error.response?.status === 400) {
        alert("Session expired or invalid token. Please log in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    verifyToken();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center mb-4 text-black-600 text-4xl">
          <span>👤</span>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-black-700">
          Login Here
        </h2>

        <label className="block text-gray-600 text-sm mb-1">Email</label>
        <input
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          required
        />

        <label className="block text-gray-600 text-sm mb-1">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-green-700 hover:text-black transition hover:cursor-pointer text-xl"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register Here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}