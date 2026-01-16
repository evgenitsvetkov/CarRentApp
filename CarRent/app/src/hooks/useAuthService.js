import { apiClient } from "../api/axios";
import { authService } from "../api/authService";

const useAuthService = () => {
    return authService(apiClient);
};

export default useAuthService;