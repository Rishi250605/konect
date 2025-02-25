import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        // If there's an error parsing user data, clear it
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  // Close profile menu when route changes
  useEffect(() => {
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    
    // Close profile menu
    setIsProfileMenuOpen(false);
    
    // Navigate to login page
    navigate('/login');
  };

  // If no user is logged in, show login/register buttons
  if (!user) {
    return (
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            Konect
          </Link>
        </div>
        <div className="nav-right">
          <Link to="/login" className="nav-btn">Sign In</Link>
          <Link to="/register" className="nav-btn primary">Sign Up</Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/dashboard" className="nav-logo">
          Konect
        </Link>
        <div className="nav-search">
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="nav-right">
        <div className="nav-actions">
          <button className="nav-icon-btn" title="Notifications">
            <i className="fas fa-bell"></i>
          </button>
          <button className="nav-icon-btn" title="Messages">
            <i className="fas fa-envelope"></i>
          </button>
        </div>
        <div className="profile-dropdown">
          <button
            className="profile-btn"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            title={user.username}
          >
            <img 
              src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${user.username}`} 
              alt="Profile" 
            />
          </button>

          {isProfileMenuOpen && (
            <>
              <div className="dropdown-overlay" onClick={() => setIsProfileMenuOpen(false)} />
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <img 
                    src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${user.username}`}
                    alt="Profile" 
                    className="dropdown-avatar" 
                  />
                  <div className="dropdown-user-info">
                    <h4>{user.username}</h4>
                    <p>{user.email}</p>
                  </div>
                </div>
                <div className="dropdown-content">
                  <Link to="/profile" className="dropdown-item">
                    <i className="fas fa-user"></i>
                    Profile
                  </Link>
                  <Link to="/settings" className="dropdown-item">
                    <i className="fas fa-cog"></i>
                    Settings
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item text-red">
                    <i className="fas fa-sign-out-alt"></i>
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
