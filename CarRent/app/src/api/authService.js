import axios from 'axios';

const API_BASE_URL = "https://localhost:7091";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const authService = {

    loginUser: async (userData) => {
        try {
            const response = await apiClient.post('api/Auth/login', userData);
            const accessToken = response.data.accessToken;

            return response.data;
        } catch (error) {
            console.error("Error while login the user: ", error);
            throw error;
        }
    },

    registerUser: async (userData) => {
        try {
            const response = await apiClient.post('api/Auth/register', userData);
            return response.data;
        } catch (error) {
            console.error("Error while register the user: ", error);
            throw error;
        }
    },

    refreshUserToken: async () => {
        try {
            const response = await apiClient.post('api/Auth/refresh-token');
            return response.data;
        } catch (error) {
            console.error("Error while refresh user's token: ", error);
            throw error;
        }
    } 
};

export default authService;