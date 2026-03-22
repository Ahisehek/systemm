import { Navigate } from "react-router-dom";
import { useItemContext } from "./ItemContext";

const ProtectedRoute = ({ children }) => {
    const { user, loadingUser } = useItemContext();

    if (loadingUser) {
        return <div>Loading...</div>; // spinner ya skeleton
    }

    if (!user) {
        return <Navigate to="/login" replace />; // redirect if not logged in
    }

    return children; // authorized → show page
};

export default ProtectedRoute;