import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import './App.css'

function App() {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Navigate to="/login" replace />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
