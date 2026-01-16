import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import useCarService from '../hooks/useCarService';
import "./styles/EditCar.css";

const EditCar = () => {

    const { id } = useParams();
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

    const carApi = useCarService();

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const carData = await carApi.getCar(id);
                setCar(carData);
            } catch (error) {
                console.error("Failed to fetch a car: ", error);
                setCar([]);
            }
        };

        fetchCarDetails();
    }, [id]);


    useEffect(() => {
        const fetchCarCategories = async () => {
            try {
                const categoriesData = await carApi.getCarCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error("Failed to fetch car categories: ", error);
                setCategories([]);
            }
        };

        fetchCarCategories();
    }, []);

    const fuelData = [
        { label: "Gasoline", value: 1 },
        { label: "Diesel", value: 2 },
        { label: "Electric", value: 3 },
        { label: "Gasoline/LPG", value: 4 },
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
        setCar({ ...car, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await carApi.editCar(id, car);
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
            setError("Failed to edit a car. Please check your input.");
            console.error("Error while editing a car: ", error);
        }
    };


    return (
        <div className="edit-car-container">
            <h2>Edit Car</h2>
            {error && <p className="error-message">{error}</p>}
            <form className="edit-car-form" onSubmit={handleSubmit}>
                <label htmlFor="make">Make:</label>
                <input type="text" id="make" value={car.make} onChange={handleChange} placeholder="Make" required />
                <label htmlFor="model">Model:</label>
                <input type="text" id="model" value={car.model} onChange={handleChange} placeholder="Model" required />
                <label htmlFor="year">Year:</label>
                <input type="text" id="year" value={car.year} onChange={handleChange} placeholder="Year" required />
                <label htmlFor="fuelType">Fuel Type:</label>
                <select id="fuelType" value={car.fuelType} onChange={handleChange} required>
                    <option value="">Select a Fuel</option>
                    {fuelData.map((fuel) => (
                        <option key={fuel.value} value={fuel.label}>
                            {fuel.label}
                        </option>
                    ))}
                </select>
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" value={car.price} onChange={handleChange} placeholder="Price" required />
                <label htmlFor="seatsNumber">Seats Number:</label>
                <input type="number" id="seatsNumber" value={car.seatsNumber} onChange={handleChange} placeholder="Seats Number" required />
                <label htmlFor="categoryId">Category:</label>
                <select id="categoryId" value={car.categoryId} onChange={handleChange} required>
                    <option value="">Select a Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="bodyType">Body Type:</label>
                <select id="bodyType" value={car.bodyType} onChange={handleChange} required>
                    <option value="">Select a Body Type</option>
                    {bodyTypes.map((body) => (
                        <option key={body.value} value={body.label}>
                            {body.label}
                        </option>
                    ))}
                </select>
                <label htmlFor="imageURL">Image URL:</label>
                <input type="text" id="imageURL" value={car.imageURL} onChange={handleChange} placeholder="Image Url" required />

                <button type="submit" className="submit-btn">Edit Car</button>
                <button type="button" className="back-btn" onClick={() => navigate("/Cars")}>Cancel</button>
            </form>
        </div>
    );
};

export default EditCar;