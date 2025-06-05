import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ children, requireAdmin = false }) => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;

    if (requireAdmin && !user.isAdmin) return <Navigate to="/home" />;

    return children;
};

export default PrivateRoute;
