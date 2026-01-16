
export const authService = (apiClient) => ({

    loginUser: async (userData) => {
        const response = await apiClient.post('api/Auth/login', userData);
        return response.data;
    },

    registerUser: async (userData) => {
        const response = await apiClient.post('api/Auth/register', userData);
        return response.data;
    },

    refreshUserToken: async (userData) => {
        const response = await apiClient.post('api/Auth/refresh-token', userData);
        return response.data;
    } 
});