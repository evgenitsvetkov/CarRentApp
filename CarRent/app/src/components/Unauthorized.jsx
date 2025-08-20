import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import "./styles/Unauthorized.css";

const Unauthorized = () => {
    const location = useLocation();
    const isProtectedRoute = location.state?.fromProtected;

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        !isProtectedRoute
            ? <Navigate to="/" state={{ from: location }} replace />
            : <div className="unauthorized-container">
                <h1 className="unauthorized-title">Unauthorized</h1>
                <br />
                <p>You do not have access to the requested page.</p>
                <div>
                    <button onClick={goBack}>Go Back</button>
                </div>
            </div>
    );
};

export default Unauthorized;