


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useItemContext } from "../context/ItemContext";

const LoginForm = () => {
  const { setUser, fetchUser } = useItemContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://backendsystem-a26n.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setEmail("");
      setPassword("");

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }
      console.log("success");
      // await fetchUser();
      // navigate("/dashbord");

      setUser(data.user); // fallback to email if needed

      // ✅ Now navigate
      navigate("/dashbord");
    } catch (err) {
      alert(err.message);
    }
  };

  // const handleClick = () => {
  //   navigate("/register");
  // };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={login}
        className="w-full max-w-sm sm:max-w-md bg-white border-4 border-slate-700 shadow-xl p-6 rounded-md"
      >
        <h2 className="text-center text-xl sm:text-2xl font-bold mb-6">Login</h2>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="space-y-3 sm:space-y-0 sm:flex sm:space-x-4">
          <button
            type="submit"
            className="w-full bg-blue-950 text-white p-3 rounded hover:bg-blue-900 transition"
          >
            Login
          </button>
          {/* <button
            type="button"
            onClick={handleClick}
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
          >
            Register
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
