import React from "react";
import { FaPhone, FaEnvelope, FaInstagram, FaGlobe, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./contact.css";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="contact-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft className="back-icon" />
      </button>

      <h1 className="contact-title">Contact Us</h1>
      <div className="contact-info">
        <div className="contact-item">
          <FaPhone className="contact-icon" />
          <span className="contact-label">Phone Number:</span>
          <span className="contact-value">+1 (123) 456-7890</span>
        </div>

        <div className="contact-item">
          <FaEnvelope className="contact-icon" />
          <span className="contact-label">Email:</span>
          <a href="mailto:wellcare@gmail.com" className="contact-value">
            wellcare@gmail.com
          </a>
        </div>

        <div className="contact-item">
          <FaInstagram className="contact-icon" />
          <span className="contact-label">Instagram ID:</span>
          <a
            href="https://www.instagram.com/wellcare"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-value"
          >
            @wellcare
          </a>
        </div>

        <div className="contact-item">
          <FaGlobe className="contact-icon" />
          <span className="contact-label">Website Name:</span>
          <a
            href="https://www.wellcare.com"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-value"
          >
            www.wellcare.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;