import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import carService from "../api/carService";
import CarCard from "./CarCard";
import Search from "./Search";
import Pagination from "./Pagination";
import "./styles/Cars.css";

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [totalPages, setTotalPages] = useState([1]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const page = parseInt(searchParams.get("page")) || 1;
    const searchTerm = searchParams.get("searchTerm") || "";
    const category = searchParams.get("category") || "";
    const sorting = parseInt(searchParams.get("sorting")) || 0;

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this car?");
        if (!confirmDelete) return;

        try {
            await carService.deleteCar(id);
            setCars(cars.filter((car) => car.id !== id));
        } catch (error) {
            console.error("Failed to delete the car: ", error);
        }
    }

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const carsData = await carService.getAllCars(page, searchTerm, category, sorting);
                const maxPage = Math.ceil(parseInt(carsData.totalCarsCount) / parseInt(carsData.carsPerPage));
                
                setCars(carsData.cars);
                setTotalPages(maxPage);
            } catch (error) {
                console.error("Failed to fetch cars: ", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const categories = await carService.getCarCategories();
                setCategoriesData(categories);
            } catch (error) {
                console.error("Failed to fetch car categories: ", error);
            }
        };

        fetchCars();
        fetchCategories();
    }, [page, searchTerm, category, sorting]);

    const changePage = (newPage, newSearchTerm, newCategory, newSorting) => {
        setSearchParams({ page: newPage, searchTerm: newSearchTerm, category: newCategory, sorting: newSorting });
    };

    const changeParams = (newSearchTerm, newCategory, newSorting) => {
        if (newSearchTerm != searchTerm || newCategory != category || newSorting != sorting) {
            setCars([]);
        }
        setSearchParams({ searchTerm: newSearchTerm, category: newCategory, sorting: newSorting });
    };

    return (
        <div className="container">
            <h1>Available Cars</h1>
            {loading ? (
                <p className="loading-message">Loading...</p>
            ) : (
                <div>
                    <Search searchTerm={searchTerm} category={category} sorting={sorting} categoriesData={categoriesData} changeParams={changeParams}></Search>
                    <div className="card-container">
                        {cars.map((car) => (
                            <CarCard key={car.id} car={car} onDelete={handleDelete}></CarCard>
                        ))}
                    </div>
                    <Pagination page={page} searchTerm={searchTerm} category={category} sorting={sorting} totalPages={totalPages} changePage={changePage}></Pagination>
                </div>
                

            )}
        </div>
    );
};

export default Cars;