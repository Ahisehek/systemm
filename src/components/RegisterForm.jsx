// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const RegisterForm = () => {
//   const [role, setRole] = useState("User");
//   const [secretKey, setSecretKey] = useState("");
//   const [form, setForm] = useState({ name: "", email: "", password: "",mobile:"" });
//   const navigate = useNavigate();

//   const register = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/api/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({...form,
//         role,                      // Add role
//         secretKey: role === "Admin" ? secretKey : undefined}),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Registration failed");
//       }

//       alert("Registered! You can now login.");
//       navigate("/login");

//       setForm({ name: "", email: "", password: "" , mobile: ""});
//       setRole("User");
//       setSecretKey("");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//    <div className=" h-screen flex justify-center items-center">
//      <form
//       onSubmit={register}
//       className="space-y-4 p-4 bg-white rounded w-96 mx-auto border-8 border-slate-700 shadow-xl shadow-black "
//     >
//       <h2 className="text-xl font-bold flex justify-center">Register</h2>

//       <input
//         type="text"
//         placeholder="Name"
//         value={form.name}
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//         className="w-full p-2 border rounded"
//         required
//       />
//         <input
//         type="text"
//         placeholder="Mobile no"
//         value={form.mobile}
//         onChange={(e) => setForm({ ...form, mobile: e.target.value })}
//         className="w-full p-2 border rounded"
//         required
//       />

//       <input
//         type="email"
//         placeholder="Email"
//         value={form.email}
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//         className="w-full p-2 border rounded"
//         required
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={form.password}
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//         className="w-full p-2 border rounded"
//         required
//       />
//       <label
//         htmlFor="role"
//         className="block text-sm font-medium text-gray-700 mb-2"
//       >
//         Select Role
//       </label>
//       <select
//         id="role"
//         name="role"
//         value={role}
//         onChange={(e) => setRole(e.target.value)}
//         className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//       >
//         <option value="User">User</option>
//         <option value="Admin">Admin</option>
//       </select>
//       {role === "Admin" && (
//         <div className="mt-4">
//           <label
//             htmlFor="secretKey"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Secret Key
//           </label>
//           <input
//             type="password"
//             id="secretKey"
//             name="secretKey"
//             value={secretKey}
//             onChange={(e) => setSecretKey(e.target.value)}
//             className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//             placeholder="Enter Secret Key"
//           />
//         </div>
//       )}
//       <button
//         type="submit"
//         className="w-full bg-blue-950 text-white p-2 rounded"
//       >
//         Register
//       </button>
//     </form>
//    </div>
//   );
// };

// export default RegisterForm;


import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [role, setRole] = useState("User");
  const [secretKey, setSecretKey] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "", mobile: "" });
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://floy-hailstoned-nonelectrically.ngrok-free.dev/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          role,
          secretKey: role === "Admin" ? secretKey : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Registered! You can now login.");
      navigate("/login");

      setForm({ name: "", email: "", password: "", mobile: "" });
      setRole("User");
      setSecretKey("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <form
        onSubmit={register}
        className="w-full max-w-md bg-white border-4 border-slate-700 shadow-xl p-6 rounded-md"
      >
        <h2 className="text-center text-xl sm:text-2xl font-bold mb-6">Register</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Mobile no"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {role === "Admin" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secret Key
            </label>
            <input
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Secret Key"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-950 hover:bg-blue-900 text-white p-3 rounded transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
