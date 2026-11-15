import React from "react";
import { Leaf, Activity, Smile, Cloud } from "lucide-react";
import "./Unfit.css";

const Unfit = ({ onBack }) => {
  return (
    <div className="unfit-container">
      <button className="back-button" onClick={onBack}> ←</button>
      <h1 className="unfit-title">Quick Wellness Tips</h1>

      {/* Diet Tips */}
      <div className="unfit-card">
        <div className="unfit-header">
          <Leaf size={24} className="unfit-icon" />
          <h2>Diet</h2>
        </div>
        <ul className="unfit-list">
          <li>Avoid junk, fried, and sugary foods.</li>
          <li>Eat small, frequent meals.</li>
          <li>Increase fiber (fruits, veggies, grains).</li>
          <li>Drink more water; skip soda.</li>
          <li>Limit heavy, oily, spicy food.</li>
        </ul>
      </div>

      {/* Lifestyle Tips */}
      <div className="unfit-card">
        <div className="unfit-header">
          <Activity size={24} className="unfit-icon" />
          <h2>Lifestyle</h2>
        </div>
        <ul className="unfit-list">
          <li>Fix sleep schedule; avoid screens before bed.</li>
          <li>Start light exercise; increase gradually.</li>
          <li>Take breaks; avoid overworking.</li>
          <li>Do regular health check-ups.</li>
        </ul>
      </div>

      {/* Mental & Emotional Well-being */}
      <div className="unfit-card">
        <div className="unfit-header">
          <Smile size={24} className="unfit-icon" />
          <h2>Mental Health</h2>
        </div>
        <ul className="unfit-list">
          <li>Practice meditation to reduce stress.</li>
          <li>Engage in social activities.</li>
          <li>Journal or talk to release tension.</li>
          <li>Limit caffeine, alcohol, and smoking.</li>
        </ul>
      </div>

      {/* Environmental Tips */}
      <div className="unfit-card">
        <div className="unfit-header">
          <Cloud size={24} className="unfit-icon" />
          <h2>Seasonal Care</h2>
        </div>
        <ul className="unfit-list">
          <li>Dress for the weather.</li>
          <li>Use herbal teas & cooling foods as needed.</li>
          <li>Keep air fresh with essential oils/humidifiers.</li>
          <li>Take precautions for seasonal allergies.</li>
        </ul>
      </div>
    </div>
  );
};

export default Unfit;