import { jwtDecode } from 'jwt-decode';
import useAuthService from '../hooks/useAuthService';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();
    const authApi = useAuthService();

    const refresh = async () => {
        try {
            const token = auth?.accessToken;
            const decoded = jwtDecode(token);

            const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
            const refreshToken = auth?.refreshToken;

            if (!userId || !refreshToken) {
                throw new Error("Missing user credentials for token refresh.");
            }

            const response = await authApi.refreshUserToken(userId, refreshToken);
            
            if (response?.data.accessToken && response?.data.refreshToken) {
                setAuth(prev => {
                    return {
                        ...prev,
                        accessToken: response.data.accessToken,
                        refreshToken: response.data.refreshToken,
                    }
                });
                return response.data.accessToken;
            } else {
                throw new Error("Invalid refresh response from server.");
            }
        } catch (error) {
            console.error("Token refresh failed: ", error);
            return null;
        }
    };
    return refresh;
};

export default useRefreshToken;