import { Navigate } from "react-router-dom";
import { useItemContext } from "./ItemContext";

const ProtectedRoute = ({ children }) => {
    const { user, loadingUser } = useItemContext();

    if (loadingUser) return <div>Loading...</div>;

    // backend ke hisaab se _id ya koi unique property check karo
    if (!user || !user._id) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;