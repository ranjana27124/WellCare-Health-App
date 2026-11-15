import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./climatePreferences.css";
import Select from "react-select";

export default function ClimatePreferences() {
  const [formData, setFormData] = useState({
    comfortableClimate: "",
    seasonalHealthSensitivity: "",
    sensitivityToTemperature: "",
    comfortWithHumidity: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const comfortableClimateOptions = [
    { value: "Cold", label: "Cold & Dry" },
    { value: "Warm", label: "Warm & Moderate" },
    { value: "Hot", label: "Hot" },
    { value: "Rainy", label: "Rainy & Humid" },
  ];

  const seasonalHealthSensitivityOptions = [
    { value: "Summer", label: "Summer" },
    { value: "Winter", label: "Winter" },
    { value: "Monsoon", label: "Monsoon" },
  ];

  const sensitivityToTemperatureOptions = [
    { value: "Gets Cold Easily", label: "Gets Cold Easily" },
    { value: "Can’t Tolerate Heat", label: "Can’t Tolerate Heat" },
    { value: "Adapts Well to Any Weather", label: "Adapts Well to Any Weather" },
  ];

  const comfortWithHumidityOptions = [
    { value: "Prefers Dry Climate", label: "Prefers Dry Climate" },
    { value: "Prefers Humid Climate", label: "Prefers Humid Climate" },
    { value: "Comfortable in Any Climate", label: "Comfortable in Any Climate" },
  ];

  const handleSelectChange = (selectedOption, field) => {
    setFormData({ ...formData, [field]: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.comfortableClimate || !formData.seasonalHealthSensitivity) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Save form data to localStorage
      localStorage.setItem("climatePreferences", JSON.stringify(formData));

      // Save form data to the database
      const response = await fetch("http://localhost:5000/api/users/climate-preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (response.ok) {
        alert("Climate preferences saved successfully!");
        navigate("/certificate");
      } else {
        setError(data.message || "Failed to save climate preferences.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="climate-preferences-container">
      <h1 className="climate-preferences-title">Nature Sync</h1>
      <form onSubmit={handleSubmit} className="climate-preferences-form">
        <div className="form-group">
          <label className="form-label"><strong>Comfortable Climate</strong></label>
          <Select
            options={comfortableClimateOptions}
            onChange={(selectedOption) => handleSelectChange(selectedOption, "comfortableClimate")}
            placeholder="Select Comfortable Climate"
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
          <label className="form-label"><strong>Seasonal Health Sensitivity</strong></label>
          <Select
            options={seasonalHealthSensitivityOptions}
            onChange={(selectedOption) => handleSelectChange(selectedOption, "seasonalHealthSensitivity")}
            placeholder="Select Seasonal Health Sensitivity"
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
          <label className="form-label"><strong>Sensitivity to Temperature</strong></label>
          <Select
            options={sensitivityToTemperatureOptions}
            onChange={(selectedOption) => handleSelectChange(selectedOption, "sensitivityToTemperature")}
            placeholder="Select Sensitivity to Temperature"
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
          <label className="form-label"><strong>Comfort with Humidity or Dryness</strong></label>
          <Select
            options={comfortWithHumidityOptions}
            onChange={(selectedOption) => handleSelectChange(selectedOption, "comfortWithHumidity")}
            placeholder="Select Comfort with Humidity or Dryness"
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