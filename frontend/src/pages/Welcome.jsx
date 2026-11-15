import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import well from '../assets/well.mp4'; // Import the video file
import "./welcome.css"; // Import the CSS file for styles

export default function Welcome() {
  return (
    <div className="welcome-container">
      {/* Animated Text */}
      <motion.h1
        className="welcome-title"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Welcome
      </motion.h1>

      {/* Video Section */}
      <motion.div
        className="welcome-logo"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="welcome-video"
        >
          <source src={well} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      <motion.p
        className="welcome-description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        "WellCare App guides you to better health with personalized analysis and a wellness certificate."
      </motion.p>

      {/* Animated Buttons */}
      <motion.div
        className="button-container"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <Link to="/signup" className="btn signup-btn">Get Started</Link>
        <Link to="/login" className="btn login-btn">Login</Link>
      </motion.div>
    </div>
  );
}