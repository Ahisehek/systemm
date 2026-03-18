import { Outlet, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Dash() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", role: "" });
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  //const [bank, setBank] = useState("");

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await fetch("https://backendsystem-a26n.onrender.com/api/user-profile", {
  //         credentials: "include", // ⬅️ sends cookies
  //       });

  //       const data = await res.json();
  //       // console.log("Fetched user data:", data); // ✅ Check this in dev tools

  //       if (res.ok) {
  //         setUser(data);
  //         //console.log("User role:", data.role);
  //       } else {
  //         //console.error(data.message);
  //         navigate("/");
  //         setUser({ name: "", email: "" });
  //       }
  //     } catch (err) {
  //       console.error("Error fetching user:", err);
  //       setUser({ name: "", email: "" });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  // const handleLogout = async () => {
  //   try {
  //     const res = await fetch("https://backendsystem-a26n.onrender.com/api/logout", {
  //       method: "GET",
  //       credentials: "include",
  //     });

  //     if (res.ok) {
  //       setUser({ name: "", email: "" });
  //       navigate("/login");
  //     } else {
  //       const data = await res.json();
  //       alert(data.message || "Logout failed");
  //     }
  //   } catch (err) {
  //     console.error("Logout error:", err);
  //   }
  // };

  return (
    <div className="  ">
      <div className="bg-slate-200 text-white roboto-normal overflow-auto hide-scrollbar min-h-screen ">
        <div
          id="nav"
          className="bg-slate-700 text-white font-bold fixed top-0 w-full z-50 shadow-md shadow-gray-600 border-b border-blue-950"
        >
          <div className="  flex items-center justify-between px-4 sm:px-6 lg:px-10 h-14">
            {/* Logo or Brand */}
            <div className="text-lg sm:text-xl">LOGO



            </div>
            {/* <div className="w-50 h-full mix-blend-screen ">
              <img src="../public/dvpl.png" alt="" />
              
            </div> */}

            {/* Hamburger for mobile */}
            <div className="sm:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex gap-5 items-center">
              <Link to="" className="hover:bg-slate-800 px-3 py-1 rounded">
                Home
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="hover:bg-slate-800 px-3 py-1 rounded cursor-pointer">
                  Master
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white text-black border-none shadow shadow-slate-300">
                  {[
                    "bank",
                    "unit",
                    "site",
                    "gst",
                    "fleet",
                    "itemgroup",
                    "profile",
                  ].map((route) => (
                    <DropdownMenuItem
                      key={route}
                      className="hover:bg-slate-200"
                    >
                      <Link
                        to={`/dashbord/master/${route}`}
                        className="w-full block capitalize"
                      >
                        {route}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="hover:bg-slate-800 px-3 py-1 rounded cursor-pointer">
                  Entry
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white text-black border-none shadow shadow-slate-300">
                  {["item", "vender", "vehicle", "ticket"].map((route) => (
                    <DropdownMenuItem
                      key={route}
                      className="hover:bg-slate-200"
                    >
                      <Link
                        to={`/dashbord/entry/${route}`}
                        className="w-full block capitalize"
                      >
                        {route}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="hover:bg-slate-800 px-3 py-1 rounded cursor-pointer">
                Report
              </div>
              <Link
                to="/dashbord/action"
                className="hover:bg-slate-800 px-3 py-1 rounded"
              >
                Action
              </Link>
            </div>

            {/* User Info + Logout */}
            <div className="hidden sm:flex gap-5 items-center">
              <div className="text-sm sm:text-base">
                {loading ? (
                  <p>Loading user data...</p>
                ) : user.name ? (
                  <p>
                    <span className="font-semibold">{user.name}</span>{" "}

                  </p>
                ) : (
                  <p className="text-red-500">User not logged in</p>
                )}
              </div>
              <Button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 rounded-full text-sm sm:text-base"
              >
                Log out
              </Button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {menuOpen && (
            <div className="sm:hidden bg-slate-800 text-white px-4 pb-4 pt-2 space-y-2">
              <Link
                to=""
                className="block px-2 py-1 rounded hover:bg-slate-600"
                onClick={() => setMenuOpen(false)} // ✅ CLOSE MENU
              >
                Home
              </Link>

              <div>
                <p className="font-semibold">Master</p>
                {[
                  "bank",
                  "unit",
                  "site",
                  "gst",
                  "fleet",
                  "itemgroup",
                  "profile",
                ].map((route) => (
                  <Link
                    key={route}
                    to={`/dashbord/master/${route}`}
                    className="block px-2 py-1 rounded hover:bg-slate-600"
                    onClick={() => setMenuOpen(false)} // ✅ CLOSE MENU
                  >
                    {route}
                  </Link>
                ))}
              </div>

              <div>
                <p className="font-semibold">Entry</p>
                {["item", "vender", "vehicle", "ticket"].map((route) => (
                  <Link
                    key={route}
                    to={`/dashbord/entry/${route}`}
                    className="block px-2 py-1 rounded hover:bg-slate-600"
                    onClick={() => setMenuOpen(false)} // ✅ CLOSE MENU
                  >
                    {route}
                  </Link>
                ))}
              </div>

              <div
                className="block px-2 py-1 rounded hover:bg-slate-600 cursor-pointer"
                onClick={() => setMenuOpen(false)} // ✅ CLOSE MENU
              >
                Report
              </div>

              <Link
                to="/dashbord"
                className="block px-2 py-1 rounded hover:bg-slate-600"
                onClick={() => setMenuOpen(false)} // ✅ CLOSE MENU
              >
                Action
              </Link>

              <div className="mt-4 border-t pt-2">
                <p className="text-sm">
                  {loading
                    ? "Loading user..."
                    : user.name
                      ? `${user.name} `
                      : "User not logged in"}
                </p>
                <Button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false); // ✅ CLOSE MENU ON LOGOUT
                  }}
                  className="mt-2 w-full bg-red-500 hover:bg-red-700 rounded-full"
                >
                  Log out
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* <ToastContainer position="top-right" autoClose={3000} /> */}
        <div className=" ">
          <div className="  h-full w-screen  bg-slate-200 flex justify-center py-20     ">
            <Outlet className=" " />
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default Dash;
