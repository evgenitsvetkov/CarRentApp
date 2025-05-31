import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import carService from '../api/carService';
import "./styles/AddCar.css";

const AddCar = () => {
    const [car, setCar] = useState({
        make: "",
        model: "",
        year: "",
        fuelType: "",
        price: "",
        seatsNumber: "",
        categoryId: "",
        bodyType: "",
        imageURL: "",
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCarCategories = async () => {
            try {
                const categoriesData = await carService.getCarCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error("Failed to fetch car categories: ", error);
                setCategories([]);
            }
        };

        fetchCarCategories();
    }, []);

    const fuelData = [
        {label: "Gasoline", value: 1},
        {label: "Diesel", value: 2 },
        {label: "Electric", value: 3},
        {label: "Gasoline/LPG", value: 4},
    ]

    const bodyTypes = [
        { label: "Sedan", value: 1 },
        { label: "Wagon", value: 2 },
        { label: "Convertible", value: 3 },
        { label: "Coupe", value: 4 },
        { label: "SUV", value: 5 },
        { label: "Hatchback", value: 6 },
        { label: "Van", value: 7 },
    ]

    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await carService.addCar(car);
            setCar({
                make: "",
                model: "",
                year: "",
                fuelType: "",
                price: "",
                seatsNumber: "",
                categoryId: "",
                bodyType: "",
                imageURL: "",
            });
            navigate("/Cars");
        } catch (error) {
            setError("Failed to add car. Please check your input.");
            console.error("Error while adding a car: ", error);
        }
    };

    return (
        <div className="add-car-container">
            <h2>Add a New Car</h2>
            {error && <p className="error-message">{error}</p>}
            <form className="car-form" onSubmit={handleSubmit}>
                <label>Make:</label>
                <input type="text" name="make" value={car.make} onChange={handleChange} placeholder="Make" required />
                <label>Model:</label>
                <input type="text" name="model" value={car.model} onChange={handleChange} placeholder="Model" required />
                <label>Year:</label>
                <input type="text" name="year" value={car.year} onChange={handleChange} placeholder="Year" required />
                <label>Fuel Type:</label>
                <select name="fuelType" value={car.fuelType} onChange={handleChange} required>
                    <option value="">Select a Fuel</option>
                    {fuelData.map((fuel) => (
                        <option key={fuel.value} value={fuel.label}>
                            {fuel.label}
                        </option>
                    ))}
                </select>
                <label>Price:</label>
                <input type="number" name="price" value={car.price} onChange={handleChange} placeholder="Price" required />
                <label>Seats Number:</label>
                <input type="number" name="seatsNumber" value={car.seatsNumber} onChange={handleChange} placeholder="Seats Number" required />
                <label>Category:</label>
                <select name="categoryId" value={car.categoryId} onChange={handleChange} required>
                    <option value="">Select a Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <label>Body Type:</label>
                <select name="bodyType" value={car.bodyType} onChange={handleChange} required>
                    <option value="">Select a Body Type</option>
                    {bodyTypes.map((body) => (
                        <option key={body.value} value={body.label}>
                            {body.label}
                        </option>
                    ))}
                </select>
                <label>Image URL:</label>
                <input type="text" name="imageURL" value={car.imageURL} onChange={handleChange} placeholder="Image Url" required />

                <button type="submit" className="submit-btn">Add Car</button>
                <button type="button" className="back-btn" onClick={() => navigate("/Cars")}>Cancel</button>
            </form>
        </div>
    );
}

export default AddCar;