import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "./admin/Loading.tsx";

function ProtectedRoute() {
    const { isAuthenticated, user, isLoading } = useAuth();

    if (isLoading) return <Loading />;

    if (!isAuthenticated || user?.role !== "SuperAdmin") {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
