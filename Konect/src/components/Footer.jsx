import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>
                    Created and developed by Team Salaar 
                    <span className="separator">|</span> 
                    <span className="copyright">© {new Date().getFullYear()}</span>
                    <span className="separator">|</span>
                    <span className="team-note">Men working except Manikandan</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer; 