import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "./Button";
import './styles/CarCard.css'

const CarCard = ({ car, onDelete }) => {
    const navigate = useNavigate();

    return (
        <div className="carCard" key={car.id}>
            <img className="carImage"
                src={car.imageURL} 
                alt="car's image"
            />
            <h3>{car.make} {car.model}</h3>
            <p>Year: {car.year}</p>
            <p>Price: {car.price}</p>
            <p>Seats: {car.seatsNumber}</p>
            <p>Category: {car.category}</p>

            <div className="button-container">
                <button className="details-btn" type="button" onClick={() => navigate(`/Cars/Details/${car.id}`)}>Details</button>
                <button className="edit-btn" type="button" onClick={() => navigate(`/Cars/Edit/${car.id}`)}>Edit</button>
                <Button className="delete-btn" value="Delete" onClick={() => onDelete(car.id)} />
            </div>

        </div>  
    );
}

export default CarCard;