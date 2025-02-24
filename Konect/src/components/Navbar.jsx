import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const user = {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Felix',
        role: 'Member'
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/dashboard" className="nav-logo">
                    <i className="fas fa-code"></i>
                    DevSpace
                </Link>
                <div className="nav-search">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="Search..." />
                </div>
            </div>

            <div className="nav-right">
                <button className="nav-icon-btn">
                    <i className="fas fa-bell"></i>
                </button>
                <button className="nav-icon-btn">
                    <i className="fas fa-envelope"></i>
                </button>
                <button 
                    className="profile-btn"
                    onClick={() => setIsProfileMenuOpen(true)}
                >
                    <img src={user.avatar} alt="Profile" />
                </button>
            </div>

            {/* Profile Side Navigation */}
            <div className={`profile-sidenav ${isProfileMenuOpen ? 'open' : ''}`}>
                <div className="sidenav-overlay" onClick={() => setIsProfileMenuOpen(false)} />
                <div className="sidenav-content">
                    <div className="sidenav-header">
                        <button 
                            className="close-btn"
                            onClick={() => setIsProfileMenuOpen(false)}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <div className="profile-info">
                        <img src={user.avatar} alt="Profile" className="profile-avatar" />
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                        <span className="role-badge">{user.role}</span>
                    </div>

                    <div className="profile-menu">
                        <Link to="/profile" className="menu-item">
                            <i className="fas fa-user"></i>
                            My Profile
                        </Link>
                        <Link to="/settings" className="menu-item">
                            <i className="fas fa-cog"></i>
                            Settings
                        </Link>
                        <Link to="/my-posts" className="menu-item">
                            <i className="fas fa-file-alt"></i>
                            My Posts
                        </Link>
                        <Link to="/saved" className="menu-item">
                            <i className="fas fa-bookmark"></i>
                            Saved Items
                        </Link>
                        <div className="menu-separator"></div>
                        <button className="menu-item text-red">
                            <i className="fas fa-sign-out-alt"></i>
                            Logout
                        </button>
                    </div>

                    <div className="sidenav-footer">
                        <button className="theme-toggle">
                            <i className="fas fa-moon"></i>
                            Dark Mode
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
