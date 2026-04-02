// import { Outlet, Link } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Footer from "./Footer";
// import { Button } from "@/components/ui/button";
// import { useItemContext } from "@/context/ItemContext";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// function Dash() {
//   const navigate = useNavigate();



//   const [menuOpen, setMenuOpen] = useState(false);
//   const { user, loadingUser } = useItemContext();


//   const handleLogout = async () => {
//     try {
//       const res = await fetch("https://backendsystem-a26n.onrender.com/api/logout", {
//         method: "GET",
//         credentials: "include",
//       });

//       if (res.ok) {
//         navigate("/login");
//         window.location.reload(); // ✅ force reset context

//       } else {
//         const data = await res.json();
//         alert(data.message || "Logout failed");
//       }
//     } catch (err) {
//       console.error("Logout error:", err);
//     }
//   };

//   console.log("Context User:", user);

//   return (
//     <div className="  ">
//       <div className="bg-slate-200 text-white roboto-normal overflow-auto hide-scrollbar min-h-screen ">
//         <div
//           id="nav"
//           className="bg-gradient-to-r from-slate-900 via-white to-slate-900  text-white font-bold fixed top-0 w-full z-50 shadow-md shadow-gray-600 border-b border-blue-950"
//         >
//           <div className="  flex items-center justify-between px-4 sm:px-6 lg:px-10 h-14">
//             {/* Logo or Brand */}
//             <div className="text-lg sm:text-xl">LOGO



//             </div>
//             {/* <div className="w-50 h-full mix-blend-screen ">
//               <img src="../public/dvpl.png" alt="" />

//             </div> */}

//             {/* Hamburger for mobile */}
//             <div className="sm:hidden">
//               <button onClick={() => setMenuOpen(!menuOpen)}>
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   {menuOpen ? (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   ) : (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M4 6h16M4 12h16M4 18h16"
//                     />
//                   )}
//                 </svg>
//               </button>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden sm:flex gap-5 items-center text-slate-900">
//               <Link to="" className="hover:bg-slate-800 px-3 py-1 rounded">
//                 Home
//               </Link>

//               <DropdownMenu>
//                 <DropdownMenuTrigger className="hover:bg-slate-800 px-3 py-1 rounded cursor-pointer">
//                   Master
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="bg-white text-black border-none shadow shadow-slate-300">
//                   {[
//                     "bank",
//                     "unit",
//                     "site",
//                     "gst",
//                     "fleet",
//                     "itemgroup",
//                     "profile",
//                   ].map((route) => (
//                     <DropdownMenuItem
//                       key={route}
//                       className="hover:bg-slate-200"
//                     >
//                       <Link
//                         to={`/dashbord/master/${route}`}
//                         className="w-full block capitalize"
//                       >
//                         {route}
//                       </Link>
//                     </DropdownMenuItem>
//                   ))}
//                 </DropdownMenuContent>
//               </DropdownMenu>

//               <DropdownMenu>
//                 <DropdownMenuTrigger className="hover:bg-slate-800 px-3 py-1 rounded cursor-pointer">
//                   Entry
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="bg-white text-black border-none shadow shadow-slate-300">
//                   {["item", "vender", "vehicle", "ticket"].map((route) => (
//                     <DropdownMenuItem
//                       key={route}
//                       className="hover:bg-slate-200"
//                     >
//                       <Link
//                         to={`/dashbord/entry/${route}`}
//                         className="w-full block capitalize"
//                       >
//                         {route}
//                       </Link>
//                     </DropdownMenuItem>
//                   ))}
//                 </DropdownMenuContent>
//               </DropdownMenu>

//               <div className="hover:bg-slate-800 px-3 py-1 rounded cursor-pointer">
//                 Report
//               </div>
//               <Link
//                 to="/dashbord/action"
//                 className="hover:bg-slate-800 px-3 py-1 rounded"
//               >
//                 Action
//               </Link>
//             </div>

//             {/* User Info + Logout */}
//             <div className="hidden sm:flex gap-5 items-center">
//               <div className="text-sm sm:text-base">
//                 {loadingUser ? (
//                   <p>Loading...</p>
//                 ) : user ? (
//                   <p className="flex gap-2">
//                     {/* <span>{user.role}</span> */}
//                     <span>{user.name.toUpperCase()}</span> {/* ✅ name yaha show hoga */}
//                   </p>
//                 ) : (
//                   <p>Not logged in</p>
//                 )}
//               </div>

//               <Button
//                 onClick={handleLogout}
//                 className="bg-red-500 hover:bg-red-700 rounded-full text-sm sm:text-base"
//               >
//                 {user ? (

//                   <p>Log out</p>
//                 ) : (
//                   <p>Log in</p>
//                 )}

//               </Button>
//             </div>
//           </div>

//           {/* Mobile Dropdown Menu */}
//           {menuOpen && (
//             <div className="sm:hidden bg-slate-800 text-white px-4 pb-4 pt-2 space-y-2">
//               <Link
//                 to=""
//                 className="block px-2 py-1 rounded hover:bg-slate-600"
//                 onClick={() => setMenuOpen(false)} // ✅ CLOSE MENU
//               >
//                 Home
//               </Link>

//               <div>
//                 <p className="font-semibold">Master</p>
//                 {[
//                   "bank",
//                   "unit",
//                   "site",
//                   "gst",
//                   "fleet",
//                   "itemgroup",
//                   "profile",
//                 ].map((route) => (
//                   <Link
//                     key={route}
//                     to={`/dashbord/master/${route}`}
//                     className="block px-2 py-1 rounded hover:bg-slate-600"
//                     onClick={() => setMenuOpen(false)} // ✅ CLOSE MENU
//                   >
//                     {route}
//                   </Link>
//                 ))}
//               </div>

//               <div>
//                 <p className="font-semibold">Entry</p>
//                 {["item", "vender", "vehicle", "ticket"].map((route) => (
//                   <Link
//                     key={route}
//                     to={`/dashbord/entry/${route}`}
//                     className="block px-2 py-1 rounded hover:bg-slate-600"
//                     onClick={() => setMenuOpen(false)} // ✅ CLOSE MENU
//                   >
//                     {route}
//                   </Link>
//                 ))}
//               </div>

//               <div
//                 className="block px-2 py-1 rounded hover:bg-slate-600 cursor-pointer"
//                 onClick={() => setMenuOpen(false)} // ✅ CLOSE MENU
//               >
//                 Report
//               </div>

//               <Link
//                 to="/dashbord"
//                 className="block px-2 py-1 rounded hover:bg-slate-600"
//                 onClick={() => setMenuOpen(false)} // ✅ CLOSE MENU
//               >
//                 Action
//               </Link>

//               <div className="mt-4 border-t pt-2">
//                 <p className="text-sm">
//                   {loadingUser
//                     ? "Loading user..."
//                     : user?.name
//                       ? `${user.name}`
//                       : "User not logged in"}
//                 </p>
//                 <Button
//                   onClick={() => {
//                     handleLogout();
//                     setMenuOpen(false); // ✅ CLOSE MENU ON LOGOUT
//                   }}
//                   className="mt-2 w-full bg-red-500 hover:bg-red-700 rounded-full"
//                 >
//                   Log out
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* <ToastContainer position="top-right" autoClose={3000} /> */}
//         <div className=" ">
//           <div className="  h-full w-screen  bg-slate-200 flex justify-center py-20     ">
//             <Outlet className=" " />
//           </div>
//         </div>

//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Dash;


import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer";
import { Button } from "@/components/ui/button";
import { useItemContext } from "@/context/ItemContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Dash() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const { user, loadingUser } = useItemContext();

  const handleLogout = async () => {
    try {
      const res = await fetch(
        "https://backendsystem-a26n.onrender.com/api/logout",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (res.ok) {
        navigate("/login");
        window.location.reload(); // reset context
      } else {
        const data = await res.json();
        alert(data.message || "Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="bg-slate-200">
      <div className="bg-slate-200 h-screen ">

        {/*  NAVBAR */}


        <div className="bg-gradient-to-r from-slate-900 via-white to-slate-900 text-white font-bold fixed top-0 w-full z-50 shadow-md border-b border-blue-950">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 h-14">

            {/* LOGO */}
            <div className="text-lg sm:text-xl">LOGO</div>

            {/* MOBILE MENU BUTTON */}
            <div className="sm:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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

            {/* DESKTOP MENU */}
            <div className="hidden sm:flex gap-5 items-center text-slate-900">

              <Link to="/dashbord" className="hover:bg-slate-800 hover:text-white px-3 py-1 rounded text-slate-800">
                Home
              </Link>

              {/* MASTER */}
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:bg-slate-800 hover:text-white px-3 py-1 rounded cursor-pointer text-slate-800">
                  Master
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white text-slate-800 shadow">
                  {["bank", "unit", "site", "gst", "fleet", "itemgroup", "profile"].map((route) => (
                    <DropdownMenuItem key={route}>
                      <Link to={`/dashbord/master/${route}`} className="w-full capitalize">
                        {route}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* ENTRY */}
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:bg-slate-800 hover:text-white px-3 py-1 rounded cursor-pointer text-slate-800">
                  Entry
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white text-slate-800 shadow">
                  {["item", "vender", "vehicle", "ticket"].map((route) => (
                    <DropdownMenuItem key={route}>
                      <Link to={`/dashbord/entry/${route}`} className="w-full capitalize">
                        {route}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                to="/dashbord/action"
                className="hover:bg-slate-800 hover:text-white px-3 py-1 rounded text-slate-800"
              >
                Action
              </Link>
            </div>

            {/* USER + LOGOUT */}
            <div className="hidden sm:flex gap-5 items-center">
              <div className="text-sm text-white">
                {loadingUser ? (
                  "Loading..."
                ) : user ? (
                  user?.name?.toUpperCase() || "USER"
                ) : (
                  "Not logged in"
                )}
              </div>

              <Button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 rounded-full"
              >
                Logout
              </Button>
            </div>
          </div>

          {/*  MOBILE MENU */}


          {menuOpen && (
            <div className="sm:hidden bg-slate-800 text-white px-4 pb-4 pt-2 space-y-2 rounded-b-xl">

              {/* Home */}
              <Link
                to="/dashbord"
                onClick={() => setMenuOpen(false)}
                className="block py-2 border-b border-slate-700"
              >
                Home
              </Link>

              {/* MASTER DROPDOWN */}
              <div>
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === "master" ? null : "master")
                  }
                  className="w-full flex justify-between items-center py-2 border-b border-slate-700"
                >
                  <span className="font-semibold">Master</span>
                  <span>{openMenu === "master" ? "▲" : "▼"}</span>
                </button>

                {openMenu === "master" && (
                  <div className="pl-4 mt-2 space-y-1">
                    {["bank", "unit", "site", "gst", "fleet", "itemgroup", "profile"].map((route) => (
                      <Link
                        key={route}
                        to={`/dashbord/master/${route}`}
                        onClick={() => setMenuOpen(false)}
                        className="block py-1 text-sm hover:text-yellow-300"
                      >
                        {route}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* ENTRY DROPDOWN */}
              <div>
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === "entry" ? null : "entry")
                  }
                  className="w-full flex justify-between items-center py-2 border-b border-slate-700"
                >
                  <span className="font-semibold">Entry</span>
                  <span>{openMenu === "entry" ? "▲" : "▼"}</span>
                </button>

                {openMenu === "entry" && (
                  <div className="pl-4 mt-2 space-y-1">
                    {["item", "vender", "vehicle", "ticket"].map((route) => (
                      <Link
                        key={route}
                        to={`/dashbord/entry/${route}`}
                        onClick={() => setMenuOpen(false)}
                        className="block py-1 text-sm hover:text-yellow-300"
                      >
                        {route}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Action */}
              <Link
                to="/dashbord/action"
                onClick={() => setMenuOpen(false)}
                className="block py-2 border-b border-slate-700"
              >
                Action
              </Link>

              {/* User Section */}
              <div className="mt-4 border-t border-slate-700 pt-3">
                <p className="text-sm">{user?.name || "User"}</p>

                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="mt-2 w-full bg-red-500 hover:bg-red-600 px-3 py-2 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
          {/* {menuOpen && (
            <div className="sm:hidden bg-slate-800 text-white px-4 pb-4 pt-2 space-y-2">

              <Link to="/dashbord" onClick={() => setMenuOpen(false)}>
                Home
              </Link>

              <div>
                <p className="font-semibold">Master</p>
                {["bank", "unit", "site", "gst", "fleet", "itemgroup", "profile"].map((route) => (
                  <Link
                    key={route}
                    to={`/dashbord/master/${route}`}
                    onClick={() => setMenuOpen(false)}
                    className="block py-1"
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
                    onClick={() => setMenuOpen(false)}
                    className="block py-1"
                  >
                    {route}
                  </Link>
                ))}
              </div>

              <Link
                to="/dashbord/action"
                onClick={() => setMenuOpen(false)}
              >
                Action
              </Link>

              <div className="mt-4 border-t pt-2">
                <p>{user?.name || "User"}</p>
                <Button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="mt-2 w-full bg-red-500"
                >
                  Logout
                </Button>
              </div>
            </div>
          )} */}
        </div>

        {/*  CONTENT */}
        <div className="">
          <div className=" bg-slate-200">
            <div className="flex justify-center pt-15">
              <Outlet />
            </div>

          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default Dash;