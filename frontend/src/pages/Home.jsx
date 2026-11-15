import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Activity, Heart, Smile, Cloud, Award, Menu, X, Book, Mail, LogOut } from "lucide-react";
import "./home.css";
import logo from "../assets/logo.png";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for popup message
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    navigate("/welcome");
  };

  const handlePersonalInfoClick = (e) => {
    const savedUserDetails = localStorage.getItem("userDetails");
    const acceptedTerms = localStorage.getItem("acceptedTerms");

    if (!savedUserDetails || !acceptedTerms) {
      e.preventDefault(); // Prevent navigation
      setShowPopup(true); // Show popup message
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false); // Close popup
  };

  return (
    <div className="home-container">
      {/* Hamburger Menu (Top-left) */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <Menu size={28} className="menu-icon" />
      </div>

      {/* Side Menu */}
      <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="side-menu-header">
          <div className="return-symbol" onClick={toggleMenu}>
            <X size={24} className="return-icon" />
          </div>
        </div>
        <div className="side-menu-content">
          <Link to="/profile" className="side-menu-item">
            <User size={20} className="side-menu-icon" />
            <span>Profile</span>
          </Link>
          <Link to="/terms-and-conditions" className="side-menu-item">
            <Book size={20} className="side-menu-icon" />
            <span>Terms and Conditions</span>
          </Link>
          <Link to="/contact" className="side-menu-item">
            <Mail size={20} className="side-menu-icon" />
            <span>Contact Us</span>
          </Link>
          <div onClick={handleLogout} className="side-menu-item">
            <LogOut size={20} className="side-menu-icon" />
            <span>Logout</span>
          </div>
        </div>
        <div className="side-menu-footer">
          <img src={logo} alt="WellCare Logo" className="footer-logo" />
          <p className="footer-address">Vidyagiri, Dharwad-580001</p>
        </div>
      </div>

      {/* Logo (Top-right) */}
      <div className="corner-logo">
        <div className="logo-shape">
          <img src={logo} alt="WellCare Logo" className="logo-image" />
        </div>
      </div>

      <h1 className="home-title">Discover Wellness, Embrace Life!</h1>

      <div className="home-grid">
        {/* Personal Info Card */}
        <Link
          to="/personal-info"
          className="home-card"
          aria-label="Personal Info"
          onClick={handlePersonalInfoClick} // Add click handler
        >
          <div className="card-content">
            <User size={32} className="card-icon text-blue-500" />
            <h2 className="card-title">Personal Information</h2>
          </div>
        </Link>

        {/* Other cards remain unchanged */}
        <Link to="/physical-attributes" className="home-card" aria-label="Physical Attributes">
          <div className="card-content">
            <Activity size={32} className="card-icon text-green-500" />
            <h2 className="card-title">Body Insights</h2>
          </div>
        </Link>

        <Link to="/lifestyle" className="home-card" aria-label="Lifestyle">
          <div className="card-content">
            <Heart size={32} className="card-icon text-red-500" />
            <h2 className="card-title">Daily Flow</h2>
          </div>
        </Link>

        <Link to="/mental-emotional" className="home-card" aria-label="Mental & Emotional">
          <div className="card-content">
            <Smile size={32} className="card-icon text-yellow-500" />
            <h2 className="card-title">Emotional Compass</h2>
          </div>
        </Link>

        <Link to="/climate-preferences" className="home-card" aria-label="Climate Preferences">
          <div className="card-content">
            <Cloud size={32} className="card-icon text-purple-500" />
            <h2 className="card-title">Nature Sync</h2>
          </div>
        </Link>

        <Link to="/certificate" className="home-card" aria-label="Certificate">
          <div className="card-content">
            <Award size={32} className="card-icon text-indigo-500" />
            <h2 className="card-title">Certificate</h2>
          </div>
        </Link>
      </div>

      {/* Popup Message */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>Please set your profile and accept the terms and conditions to proceed.</p>
            <button onClick={handlePopupClose} className="popup-close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}