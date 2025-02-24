import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Communities from "./pages/Communities";
import CommunityPage from "./pages/CommunityPage";
import About from "./pages/About";
import Groups from "./pages/Groups";
import Events from "./pages/Events";
import AIAssistant from "./components/AIAssistant";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/login"
            element={
              <>
                <Login />
                <AIAssistant />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Register />
                <AIAssistant />
              </>
            }
          />
          <Route
            path="/communities"
            element={
              <>
                <Navbar />
                <div className="main-content">
                  <Sidebar />
                  <Communities />
                </div>
                <AIAssistant />
              </>
            }
          />
          <Route
            path="/community/:id"
            element={
              <>
                <Navbar />
                <div className="main-content">
                  <Sidebar />
                  <CommunityPage />
                </div>
                <AIAssistant />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <Navbar />
                <div className="main-content">
                  <Sidebar />
                  <Dashboard />
                </div>
                <AIAssistant />
              </>
            }
          />
          <Route
            path="/events"
            element={
              <>
                <Navbar />
                <div className="main-content">
                  <Sidebar />
                  <Events />
                </div>
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <div className="main-content">
                  <Sidebar />
                  <About />
                </div>
                <AIAssistant />
              </>
            }
          />
          <Route
            path="/groups"
            element={
              <>
                <Navbar />
                <div className="main-content">
                  <Sidebar />
                  <Groups />
                </div>
                <AIAssistant />
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
