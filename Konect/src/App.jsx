import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import './App.css'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route 
                        path="/dashboard" 
                        element={
                            <>
                                <Navbar />
                                <div className="main-content">
                                    <Sidebar />
                                    <Dashboard />
                                </div>
                            </>
                        } 
                    />
                    <Route path="/" element={<Navigate to="/login" replace />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
