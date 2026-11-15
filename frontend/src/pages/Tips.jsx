import React from "react";
import { Check, Leaf, Activity, Smile, Cloud } from "lucide-react";  
import "./Tips.css";  

const Tips = ({ onBack }) => {
  return (
    <div className="tips-container">
      <button className="back-button" onClick={onBack}>←</button>
      <h1 className="tips-title">Quick Wellness Tips</h1>

      <div className="tips-card">
        <div className="tips-header"><Leaf size={24} /><h2>Diet</h2></div>
        <ul className="tips-list">
          <li><Check size={16} /> Eat fresh, home-cooked meals.</li>
          <li><Check size={16} /> Stay hydrated (8+ glasses daily).</li>
        </ul>
      </div>

      <div className="tips-card">
        <div className="tips-header"><Activity size={24} /><h2>Lifestyle</h2></div>
        <ul className="tips-list">
          <li><Check size={16} /> Sleep 7-8 hrs daily.</li>
          <li><Check size={16} /> Stay active (walk, stretch).</li>
        </ul>
      </div>

      <div className="tips-card">
        <div className="tips-header"><Smile size={24} /><h2>Mental Health</h2></div>
        <ul className="tips-list">
          <li><Check size={16} /> Practice gratitude daily.</li>
          <li><Check size={16} /> Socialize, stay positive.</li>
        </ul>
      </div>

      <div className="tips-card">
        <div className="tips-header"><Cloud size={24} /><h2>Seasonal</h2></div>
        <ul className="tips-list">
          <li><Check size={16} /> Dress for the weather.</li>
          <li><Check size={16} /> Get sunlight for Vitamin D.</li>
        </ul>
      </div>
    </div>
  );
};

export default Tips;