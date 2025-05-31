import React from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h2 className="nav-title">Car Rent</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Cars">Cars</Link></li>
                <li><Link to="/Cars/Add">Add Car</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
