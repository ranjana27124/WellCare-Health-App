import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./mentalEmotional.css";
import Select from "react-select";

export default function MentalEmotional() {
  const [formData, setFormData] = useState({
    stressLevels: "",
    decisionMakingStyle: "",
    memoryStrength: "",
    socialBehavior: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const stressLevelsOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  const decisionMakingStyleOptions = [
    { value: "Impulsive", label: "Impulsive" },
    { value: "Balanced", label: "Balanced" },
    { value: "Analytical", label: "Analytical" },
  ];

  const memoryStrengthOptions = [
    { value: "Weak", label: "Weak" },
    { value: "Moderate", label: "Moderate" },
    { value: "Sharp", label: "Sharp" },
  ];

  const socialBehaviorOptions = [
    { value: "Introvert", label: "Introvert" },
    { value: "Extrovert", label: "Extrovert" },
    { value: "Balanced", label: "Balanced" },
  ];

  const handleSelectChange = (selectedOption, field) => {
    setFormData({ ...formData, [field]: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.stressLevels || !formData.decisionMakingStyle || !formData.memoryStrength || !formData.socialBehavior) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Save form data to localStorage
      localStorage.setItem("mentalEmotional", JSON.stringify(formData));

      // Save form data to the database
      const response = await fetch("http://localhost:5000/api/users/mental-emotional", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (response.ok) {
        alert("Mental & Emotional data saved successfully!");
        navigate("/climate-preferences");
      } else {
        setError(data.message || "Failed to save mental & emotional data.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mental-emotional-container">
      <h1 className="mental-emotional-title">Emotional Compass</h1>
      <form onSubmit={handleSubmit} className="mental-emotional-form">
        <div className="form-group">
          <label className="form-label"><strong>Stress Levels</strong></label>
          <Select
            options={stressLevelsOptions}
            onChange={(selectedOption) => handleSelectChange(selectedOption, "stressLevels")}
            placeholder="Select Stress Levels"
            className="form-input"
            styles={{
              control: (base) => ({
                ...base,
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "0.5rem",
              }),
            }}
          />
        </div>
        <div className="form-group">
          <label className="form-label"><strong>Decision-Making Style</strong></label>
          <Select
            options={decisionMakingStyleOptions}
            onChange={(selectedOption) => handleSelectChange(selectedOption, "decisionMakingStyle")}
            placeholder="Select Decision-Making Style"
            className="form-input"
            styles={{
              control: (base) => ({
                ...base,
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "0.5rem",
              }),
            }}
          />
        </div>
        <div className="form-group">
          <label className="form-label"><strong>Memory Strength</strong></label>
          <Select
            options={memoryStrengthOptions}
            onChange={(selectedOption) => handleSelectChange(selectedOption, "memoryStrength")}
            placeholder="Select Memory Strength"
            className="form-input"
            styles={{
              control: (base) => ({
                ...base,
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "0.5rem",
              }),
            }}
          />
        </div>
        <div className="form-group">
          <label className="form-label"><strong>Social Behavior</strong></label>
          <Select
            options={socialBehaviorOptions}
            onChange={(selectedOption) => handleSelectChange(selectedOption, "socialBehavior")}
            placeholder="Select Social Behavior"
            className="form-input"
            styles={{
              control: (base) => ({
                ...base,
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "0.5rem",
              }),
            }}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="next-button" disabled={loading}>
          {loading ? "Saving..." : "Next"}
        </button>
      </form>
    </div>
  );
}