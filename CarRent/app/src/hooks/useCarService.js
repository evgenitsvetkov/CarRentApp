import useAxiosPrivate from "./useAxiosPrivate";
import { apiClient } from "../api/axios";
import { carService } from "../api/carService";

const useCarService = () => {
    const axiosPrivate = useAxiosPrivate();
    return carService(apiClient, axiosPrivate);
};

export default useCarService;