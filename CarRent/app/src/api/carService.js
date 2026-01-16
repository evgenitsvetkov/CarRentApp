
export const carService = (apiClient, axiosPrivate) => ({

    getCarCategories: async () => {
        const response = await apiClient.get(`/api/Car/Categories`);
        return response.data;
    },

    getAllCars: async (page, searchTerm, category, sorting) => {
            const response = await apiClient.get(`/api/Car?currentPage=${page}&searchTerm=${searchTerm}&category=${category}&sorting=${sorting}`);
            return response.data;
    },
    
    addCar: async (carData) => {
            const response = await axiosPrivate.post('/api/Car', carData);
            return response.data;
    },
    
    getCar: async (id) => {
            const response = await apiClient.get(`/api/Car/${id}`);
            return response.data;
    },
    
    editCar: async (id, carData) => {
            const response = await axiosPrivate.put(`/api/Car/${id}`, carData);
            return response.data;
    },
    
    deleteCar: async (id) => {
        const response = await axiosPrivate.delete(`/api/Car/${id}`);
        return response.data;
    }
});
