import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./styles/Navbar.css";

const Navbar = () => {
    const { auth, setAuth } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const navigate = useNavigate();

    function handleLogout() {
        setAuth('');
        navigate('/');
    }

    return (
        <nav className="navbar">
            <div className="nav-header">
                <h2 className="nav-title">Car Rent</h2>
                <button className="nav-toggle-button" onClick={toggleMenu}>Menu</button>
            </div>
            <div className={`nav-buttons ${isOpen ? "open" : ""}`}>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Cars">Cars</Link></li>
                <li><Link to="/Cars/Add">Add Car</Link></li>
            </ul>
            <ul className="nav-auth">
                {!auth?.user ? (
                    <>
                        <li><Link to="/Register">Sign Up</Link></li>
                        <li><Link to="/Login">Sign In</Link></li>
                    </>
                ) : (
                    <li>
                        <button className="logout-btn" type="button" onClick={handleLogout}>Logout</button>
                    </li>
                )}
            </ul>
            </div>
        </nav> 
    );
};

export default Navbar;
