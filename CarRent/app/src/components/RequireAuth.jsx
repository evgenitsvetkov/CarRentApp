import { Outlet, useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ requiredRole }) => {
    const { auth } = useAuth();
    const location = useLocation();

    if (!auth?.accessToken) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (auth.role !== requiredRole) {
        return <Navigate to="/unauthorized" state={{ fromProtected: true, from: location }} replace />;
    }

    return <Outlet />;
};

export default RequireAuth;