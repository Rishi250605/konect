import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-left">
                    <h1 className="logo">Community Hub</h1>
                </div>
                <div className="navbar-search">
                    <input type="text" placeholder="Search Community Hub" />
                </div>
                <div className="navbar-right">
                    <div className="nav-icons">
                        <button className="icon-button">
                            <i className="fas fa-bell"></i>
                        </button>
                        <button className="icon-button">
                            <i className="fas fa-envelope"></i>
                        </button>
                        <button className="icon-button">
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                    <div className="user-profile">
                        <img src="https://via.placeholder.com/32" alt="User" />
                        <span>Username</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
