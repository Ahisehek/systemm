import React from "react";
import { Navigate } from "react-router-dom";
import { useItemContext } from "../context/ItemContext";

const AdminRoute = ({ children }) => {
  const { user, loadingUser } = useItemContext();

  console.log("AdminRoute:", user);

  if (loadingUser) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role?.toLowerCase() !== "admin") {
    return <Navigate to="/dashbord/notauthorized" replace />;
  }

  return children;
};

export default AdminRoute;