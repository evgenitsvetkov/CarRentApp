import { useLocation, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ children, requiredRole }) => {
    const { auth } = useAuth();
    const location = useLocation();

    const token = auth?.accessToken;
    let hasAccess = false;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

            hasAccess = role === requiredRole
                ? true
                : false;
        } catch (err) {
            console.error('Invalid token:', err);
        }
    }

    return (
        hasAccess
            ? children
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ fromProtected: true, from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;