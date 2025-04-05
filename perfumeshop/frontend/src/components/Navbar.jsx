
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Style/Navbar.css";
import logo from "./images/logo.jpg";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
          
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Logo" />
                </Link>
            </div>

           
            <button className="hamburger" onClick={toggleMenu}>
                ☰
            </button>

            <ul className={`nav-links ${isMenuOpen ? "show" : ""}`}>
                <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                <li><Link to="/shop" onClick={toggleMenu}>ImageGallery</Link></li>
                <li><Link to="/" onClick={toggleMenu}>Bestsellers</Link></li>
                <li><Link to="/shop" onClick={toggleMenu}>New Arrivals</Link></li>
        
                <div className="auth-links">
                    <Link to="/cart" onClick={toggleMenu}>Cart</Link>
                    <Link to="/login" onClick={toggleMenu}>Log in</Link>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;
