import { jwtDecode } from 'jwt-decode';
import useAuthService from '../hooks/useAuthService';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const authApi = useAuthService();


    const refresh = async () => {
        try {
            const data = await authApi.refreshUserToken();

            if (data?.accessToken) {
                const decoded = jwtDecode(data.accessToken);
                const roleClaim = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

                setAuth(prev => {
                    console.log(JSON.stringify(prev));
                    console.log(data.accessToken);
                    return {
                        ...prev,
                        accessToken: data.accessToken,
                        role: roleClaim,
                    }
                });
                return data.accessToken;
            } else {
                throw new Error("Invalid refresh response from server.");
            }
        } catch (error) {
            console.error("Token refresh failed: ", error);
            setAuth(null);
            throw error;
        }
    };
    return refresh;
};

export default useRefreshToken;