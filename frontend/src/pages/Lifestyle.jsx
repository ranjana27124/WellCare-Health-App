import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./lifestyle.css";
import Select from "react-select";

export default function Lifestyle() {
  const [formData, setFormData] = useState({
    sleepPattern: "",
    foodPreference: "",
    appetiteLevel: "",
    thirstLevel: "",
    exerciseRoutine: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sleepPatternOptions = [
    { value: "Deep", label: "Deep & Heavy" },
    { value: "Disturbed", label: "Disturbed & Light" },
    { value: "Light Sleeper", label: "Moderate & Restful" },
  ];

  const foodPreferenceOptions = [
    { value: "Veg", label: "Veg" },
    { value: "Non-Veg", label: "Non-Veg" },
    { value: "Vegan", label: "Vegan" },
    { value: "Mixed", label: "Mixed" },
  ];

  const appetiteLevelOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  const thirstLevelOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  const exerciseRoutineOptions = [
    { value: "Sedentary", label: "Sedentary" },
    { value: "Moderate", label: "Moderate" },
    { value: "Active", label: "Active" },
  ];

  const handleSleepPatternChange = (selectedOption) => {
    setFormData({ ...formData, sleepPattern: selectedOption.value });
  };

  const handleFoodPreferenceChange = (selectedOption) => {
    setFormData({ ...formData, foodPreference: selectedOption.value });
  };

  const handleAppetiteLevelChange = (selectedOption) => {
    setFormData({ ...formData, appetiteLevel: selectedOption.value });
  };

  const handleThirstLevelChange = (selectedOption) => {
    setFormData({ ...formData, thirstLevel: selectedOption.value });
  };

  const handleExerciseRoutineChange = (selectedOption) => {
    setFormData({ ...formData, exerciseRoutine: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.sleepPattern || !formData.foodPreference || !formData.appetiteLevel || !formData.thirstLevel || !formData.exerciseRoutine) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Save to database
      const response = await fetch("http://localhost:5000/api/users/lifestyle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (response.ok) {
        // Save to localStorage
        localStorage.setItem("lifestyle", JSON.stringify(formData));
        alert("Lifestyle data saved successfully!");
        navigate("/mental-emotional");
      } else {
        setError(data.message || "Failed to save lifestyle data.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lifestyle-container">
      <h1 className="lifestyle-title">Daily Flow</h1>
      <form onSubmit={handleSubmit} className="lifestyle-form">
        <div className="form-group">
          <label className="form-label"><strong>Sleep Pattern</strong></label>
          <Select
            options={sleepPatternOptions}
            onChange={handleSleepPatternChange}
            placeholder="Select Sleep Pattern"
            className="form-input"
            styles={{
              control: (base) => ({
                ...base,
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "0.5rem",
              }),
            }}
          />
        </div>
        <div className="form-group">
          <label className="form-label"><strong>Food Preference</strong></label>
          <Select
            options={foodPreferenceOptions}
            onChange={handleFoodPreferenceChange}
            placeholder="Select Food Preference"
            className="form-input"
            styles={{
              control: (base) => ({
                ...base,
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "0.5rem",
              }),
            }}
          />
        </div>
        <div className="form-group">
          <label className="form-label"><strong>Appetite Level</strong></label>
          <Select
            options={appetiteLevelOptions}
            onChange={handleAppetiteLevelChange}
            placeholder="Select Appetite Level"
            className="form-input"
            styles={{
              control: (base) => ({
                ...base,
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "0.5rem",
              }),
            }}
          />
        </div>
        <div className="form-group">
          <label className="form-label"><strong>Thirst Level</strong></label>
          <Select
            options={thirstLevelOptions}
            onChange={handleThirstLevelChange}
            placeholder="Select Thirst Level"
            className="form-input"
            styles={{
              control: (base) => ({
                ...base,
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "0.5rem",
              }),
            }}
          />
        </div>
        <div className="form-group">
          <label className="form-label"><strong>Exercise Routine</strong></label>
          <Select
            options={exerciseRoutineOptions}
            onChange={handleExerciseRoutineChange}
            placeholder="Select Exercise Routine"
            className="form-input"
            styles={{
              control: (base) => ({
                ...base,
                border: "1px solid #ddd",
                borderRadius: "8px",
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