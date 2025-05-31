import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import carService from '../api/carService';
import "./styles/CarDetails.css";

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const carData = await carService.getCar(id);
                setCar(carData);
            } catch (error) {
                console.error("Error while fetching car details: ", error);
            }
        };

        fetchCarDetails();
    }, [id]);

    if (!car) {
        return <div>Loading...</div>;
    }

    return (
        <div className="car-details">
            <div className="car-details-card">
                <h1>Car Details</h1>
                <img className="car-details-image" src={car.imageURL} alt="car"/>
                <p><strong>Make:</strong> {car.make}</p>
                <p><strong>Model:</strong> {car.model}</p>
                <p><strong>Year:</strong> {car.year}</p>
                <p><strong>Fuel Type:</strong> {car.fuelType}</p>
                <p><strong>Seats Number:</strong> {car.seatsNumber}</p>
                <p><strong>Category:</strong> {car.category}</p>
                <p><strong>Body Type:</strong> {car.bodyType}</p>
                <p><strong>Price:</strong> ${car.price}</p>
                <button type="button" className="back-btn" onClick={() => navigate("/Cars")}>Back To Cars</button>
            </div>
        </div>
    );

};

export default CarDetails;