import React from "react";
import { Navigate } from "react-router-dom";
import { useItemContext } from "../context/ItemContext";

const AdminRoute = ({ children }) => {
  const { user, loadingUser } = useItemContext();

  console.log("AdminRoute: user =", user, "loadingUser =", loadingUser);

  if (loadingUser) {
    return <div>Loading user info...</div>; // ⏳ You can use a spinner here
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/dashbord/notauthorized" replace />;
  }

  return children;
};

export default AdminRoute;
