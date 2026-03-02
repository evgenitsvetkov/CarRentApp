export const authService = (apiClient) => ({

    loginUser: async (userData) => {
        const response = await apiClient.post('Auth/login', userData);
        return response.data;
    },

    registerUser: async (userData) => {
        const response = await apiClient.post('Auth/register', userData);
        return response.data;
    },

    refreshUserToken: async () => {
        const response = await apiClient.post('Auth/refresh-token');
        return response.data;
    }
});