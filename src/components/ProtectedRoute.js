// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useItemContext } from "../context/ItemContext";

const ProtectedRoute = ({ children }) => {
  const { user, loadingUser } = useItemContext();

  // 1️⃣ page loading state
  if (loadingUser) return <div>Loading...</div>; // spinner

  // 2️⃣ user not logged in → redirect login page
  if (!user || !user._id) return <Navigate to="/login" replace />;

  // 3️⃣ authorized → render children
  return children;
};

export default ProtectedRoute;
