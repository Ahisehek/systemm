// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useItemContext } from "../context/ItemContext";

// const LoginForm = ({ onLogin }) => {
//   const { setUser } = useItemContext();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const login = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include", // ⬅️ Important to send/receive cookies
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       //localStorage.setItem("token", data.token);
//       setEmail("");
//       setPassword("");

//       if (!res.ok) {
//         //navigate("/register");
//         throw new Error(data.message || "Login failed ");
//       }



//       navigate("/dash"); 
//     } catch (err) {
//       alert(err.message);
//     }
//   };
//   const handleclick = () => {
//     navigate("/register");
//   };

//   return (
//     <div className=" flex justify-center items-center h-screen">
//       <form
//         onSubmit={login}
//         className="space-y-4 p-4 bg-white shadow-xl shadow-black rounded w-96 border-8 border-slate-700    "
//       >
//         <h2 className="text-xl font-bold flex justify-center">Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-950 text-white p-2 rounded"
//         >
//           Login
//         </button>
//         <button
//           type=""
//           onClick={handleclick}
//           className="w-full bg-green-600 text-white p-2 rounded"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useItemContext } from "../context/ItemContext";

const LoginForm = () => {
  const { setUser } = useItemContext();
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

      navigate("/dashbord");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleClick = () => {
    navigate("/register");
  };

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
          <button
            type="button"
            onClick={handleClick}
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
