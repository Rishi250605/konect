import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/dashboard";
  const isCommunities = location.pathname === "/communities";
  const isEvents = location.pathname === "/events";

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3>Menu</h3>
        <ul className="community-list">
          <li className={isHome ? "active" : ""}>
            <Link to="/dashboard">
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>
          </li>
          <li className={isCommunities ? "active" : ""}>
            <Link to="/communities">
              <i className="fas fa-users"></i>
              <span>Communities</span>
            </Link>
          </li>
          <li className={isEvents ? "active" : ""}>
            <Link to="/events">
              <i className="fas fa-calendar-alt"></i>
              <span>Events</span>
            </Link>
          </li>
          <li>
            <Link to="/groups">
              <i className="fas fa-globe"></i>
              <span>Groups</span>
            </Link>
          </li>
          <li>
            <i className="fas fa-video"></i>
            <span>Community Live</span>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>Popular Communities</h3>
        <ul className="community-list">
          <li>
            <img src="https://via.placeholder.com/24" alt="Community" />
            <span>r/programming</span>
          </li>
          <li>
            <img src="https://via.placeholder.com/24" alt="Community" />
            <span>r/webdev</span>
          </li>
          <li>
            <img src="https://via.placeholder.com/24" alt="Community" />
            <span>r/technology</span>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>Resources</h3>
        <ul className="community-list">
          <li>
            <Link to="/about">
              <i className="fas fa-book"></i>
              <span>About</span>
            </Link>
          </li>
          <li>
            <i className="fas fa-question-circle"></i>
            <span>Help Center</span>
          </li>
          <li>
            <i className="fas fa-shield"></i>
            <span>Terms & Privacy</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
