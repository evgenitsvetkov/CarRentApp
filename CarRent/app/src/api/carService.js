import axios from 'axios';

const API_BASE_URL = "https://localhost:7091";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const carService = {

    getCarCategories: async () => {
        try {
            const response = await apiClient.get(`/api/Car/Categories`);
            return response.data;
        } catch (error) {
            console.error("Error fetching car categories: ", error);
            throw error;
        }
    },

    getAllCars: async (page, searchTerm, category, sorting) => {
        try {
            const response = await apiClient.get(`/api/Car?currentPage=${page}&searchTerm=${searchTerm}&category=${category}&sorting=${sorting}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching cars: ", error);
            throw error;
        }
    },

    addCar: async (carData) => {
        try {
            const response = await apiClient.post('/api/Car', carData);
            return response.data;
        } catch (error) {
            console.error("Error while creating the car: ", error);
            throw error;
        }
    },

    getCar: async (id) => {
        try {
            const response = await apiClient.get(`/api/Car/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching the car: ", error);
            throw error;
        }
    },

    updateCar: async (id, carData) => {
        try {
            const response = await apiClient.put(`/api/Car/${id}`, carData);
            return response.data;
        } catch (error) {
            console.error("Error while updating the car: ", error);
            throw error;
        }
    },

    deleteCar: async (id) => {
        try {
            await apiClient.delete(`/api/Car/${id}`);
            console.log(`Car with ID ${id} deleted successfully.`);
        } catch (error) {
            console.error("Error while deleting the car: ", error);
            throw error;
        }
    }
}

export default carService;