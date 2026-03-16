// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import axios from "axios";

// const PrivateRoute = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/check-auth", {
//       withCredentials: true, // ⬅️ IMPORTANT
//     })
//     .then((res) => {
//       if (res.data.loggedIn) {
//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//       }
//     })
//     .catch(() => setIsAuthenticated(false));
//   }, []);

//   if (isAuthenticated === null) return <div>Loading...</div>;

//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;
