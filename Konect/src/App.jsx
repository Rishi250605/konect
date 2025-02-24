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
            </Routes>
            <Navbar/>
            <Sidebar/>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
                <Footer />
            </div>

        </Router>
    );
}

export default App;
