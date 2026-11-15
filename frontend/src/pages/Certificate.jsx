import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./Certificate.css";
import logo from "../assets/logo1.png";
import qrCode from "../assets/logo.png";
import { Bell } from "lucide-react"; // Import notification icon
import Tips from "./Tips"; // Import Tips component
import Unfit from "./Unfit"; // Import Unfit component

// Function to calculate BMI
const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100;
  return (weight / (heightInMeters * heightInMeters)).toFixed(2);
};

// Function to categorize user
const categorizeUser = (user) => {
  let score = 0;

  // Physical Health
  if (user.bodyType === "Slim" || user.bodyType === "Medium") score += 1;
  else if (user.bodyType === "Heavy") score -= 1;

  if (user.skinType === "Normal") score += 1;
  else if (user.skinType === "Dry" || user.skinType === "Oily" || user.skinType === "Sensitive") score -= 1;

  if (user.hairType === "Normal") score += 1;
  else if (user.hairType === "Dry" || user.hairType === "Oily") score -= 1;

  if (user.eyeShape === "Sharp") score += 1;
  else if (user.eyeShape === "Dull") score -= 1;

  const bmi = calculateBMI(user.weight, user.height);
  if (bmi >= 18.5 && bmi <= 24.9) score += 1;
  else score -= 1;

  // Lifestyle
  if (user.sleepPattern === "Deep") score += 1;
  else if (user.sleepPattern === "Disturbed" || user.sleepPattern === "Light Sleeper") score -= 1;

  if (user.foodPreference === "Veg" || user.foodPreference === "Vegan") score += 1;
  else if (user.foodPreference === "Non-Veg" || user.foodPreference === "Mixed") score -= 1;

  if (user.appetiteLevel === "Medium") score += 1;
  else if (user.appetiteLevel === "Low" || user.appetiteLevel === "High") score -= 1;

  if (user.thirstLevel === "Medium") score += 1;
  else if (user.thirstLevel === "Low" || user.thirstLevel === "High") score -= 1;

  if (user.exerciseRoutine === "Active") score += 1;
  else if (user.exerciseRoutine === "Sedentary") score -= 1;

  // Mental & Emotional Health
  if (user.stressLevels === "Low") score += 1;
  else if (user.stressLevels === "Medium" || user.stressLevels === "High") score -= 1;

  if (user.decisionMakingStyle === "Balanced" || user.decisionMakingStyle === "Analytical") score += 1;
  else if (user.decisionMakingStyle === "Impulsive") score -= 1;

  if (user.memoryStrength === "Sharp") score += 1;
  else if (user.memoryStrength === "Weak" || user.memoryStrength === "Moderate") score -= 1;

  if (user.socialBehavior === "Balanced" || user.socialBehavior === "Extrovert") score += 1;
  else if (user.socialBehavior === "Introvert") score -= 1;

  // Climate Preferences
  if (user.comfortableClimate === "Adapts Well to Any Weather") score += 1;
  else if (user.comfortableClimate === "Cold" || user.comfortableClimate === "Warm" || user.comfortableClimate === "Hot" || user.comfortableClimate === "Rainy") score -= 1;

  if (user.seasonalHealthSensitivity === "None") score += 1;
  else if (user.seasonalHealthSensitivity === "Summer" || user.seasonalHealthSensitivity === "Winter" || user.seasonalHealthSensitivity === "Monsoon") score -= 1;

  if (user.sensitivityToTemperature === "Adapts Well to Any Weather") score += 1;
  else if (user.sensitivityToTemperature === "Gets Cold Easily" || user.sensitivityToTemperature === "Can’t Tolerate Heat") score -= 1;

  if (user.comfortWithHumidity === "Comfortable in Any Climate") score += 1;
  else if (user.comfortWithHumidity === "Prefers Dry Climate" || user.comfortWithHumidity === "Prefers Humid Climate") score -= 1;

  // Final Categorization
  return score > 0 ? "Fit" : "Unfit";
};

const Certificate = () => {
  const [fullName, setFullName] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [category, setCategory] = useState(""); // State to store the category
  const [showTips, setShowTips] = useState(false); // State to toggle Tips/Unfit page
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details from localStorage
    const savedUserDetails = localStorage.getItem("userDetails");
    if (savedUserDetails) {
      const { firstName, lastName } = JSON.parse(savedUserDetails);
      setFullName(`${firstName} ${lastName}`);
    }

    // Generate a unique certificate ID
    const id = uuidv4();
    setCertificateId(id);

    // Set the current date
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    setCurrentDate(formattedDate);

    // Fetch all user data from localStorage
    const personalInfo = JSON.parse(localStorage.getItem("personalInfo"));
    const physicalAttributes = JSON.parse(localStorage.getItem("physicalAttributes"));
    const lifestyle = JSON.parse(localStorage.getItem("lifestyle"));
    const mentalEmotional = JSON.parse(localStorage.getItem("mentalEmotional"));
    const climatePreferences = JSON.parse(localStorage.getItem("climatePreferences"));

    // Combine all data into a single object
    const userData = {
      ...personalInfo,
      ...physicalAttributes,
      ...lifestyle,
      ...mentalEmotional,
      ...climatePreferences,
    };

    // Categorize the user
    const userCategory = categorizeUser(userData);
    setCategory(userCategory);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const certificateUrl = window.location.href;
    const message = `Check out my Digital WellCare Certificate: ${certificateUrl}`;
    const emailUrl = `mailto:?subject=Digital WellCare Certificate&body=${encodeURIComponent(message)}`;
    window.location.href = emailUrl;
  };

  const handleLogout = () => {
    // Clear all form data from localStorage
    localStorage.removeItem("personalInfo");
    localStorage.removeItem("physicalAttributes");
    localStorage.removeItem("lifestyle");
    localStorage.removeItem("mentalEmotional");
    localStorage.removeItem("climatePreferences");
    localStorage.removeItem("userDetails");

    // Show logout message
    alert("Thanks for Visiting! Wishing you a healthy and happy life!");
    navigate("/welcome");
  };

  const handleNotificationClick = () => {
    setShowTips(true); // Show Tips or Unfit page
  };

  const handleBack = () => {
    setShowTips(false); // Hide Tips or Unfit page
  };

  return (
    <div>
      {/* Notification Button */}
      <button className="notification-button" onClick={handleNotificationClick}>
        <Bell size={24} />
      </button>

      {showTips ? (
        // Render Tips or Unfit page based on category
        category === "Fit" ? (
          <Tips onBack={handleBack} />
        ) : (
          <Unfit onBack={handleBack} />
        )
      ) : (
        // Render Certificate page
        <div className="certificate-container">
          <div className="logo-section">
            <img src={logo} alt="Logo" />
          </div>
          <h1 className="title">Digital WellCare Certificate</h1>
          <div className="certificate-body">
            <p>
              <h3>
                <center>This is to certify that</center>
              </h3>
              <br />
              <h2>
                <strong>
                  <center>{fullName}</center>
                </strong>
              </h2>
            </p>
            <p>
              has successfully completed the <strong>'WellCare Health Assessment'</strong>, an initiative of the WellCare App aimed at promoting holistic well-being.
            </p>
            <p>
              <strong>{fullName}</strong> based on your responses during this assessment, your health status is determined as <strong>{category}</strong>.
            </p>
            <p>May your journey towards well-being bring health and happiness to you and your family.</p>
          </div>
          <hr className="divider" />
          <div className="signature-section">
            <p>Date: {currentDate}</p>
            <img src={qrCode} alt="QR Code" className="qr-code" />
          </div>
          <div className="footer">
            <p>Certificate ID: #{certificateId}</p>
            <p className="protocol">Health Profile Analysis developed and validated by WellCare Research Team, Vidyagiri Dharwad-580001.</p>
          </div>
        </div>
      )}

      {/* Buttons (Outside Certificate) */}
      {!showTips && (
        <div className="button-container">
          <button onClick={handlePrint} className="btn download-btn">
            Download
          </button>
          <button onClick={handleShare} className="btn share-btn">
            Share
          </button>
          <button onClick={handleLogout} className="btn logout-btn">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Certificate;