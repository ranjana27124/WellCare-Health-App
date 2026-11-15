import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./physicalAttributes.css";
import Select from "react-select";

export default function PhysicalAttributes() {
  const [formData, setFormData] = useState({
    bodyType: "",
    skinType: "",
    hairType: "",
    eyeShape: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const bodyTypeOptions = [
    { value: "Slim", label: "Slim & light" },
    { value: "Medium", label: "Medium & balanced" },
    { value: "Heavy", label: "Heavy & broad" },
  ];

  const skinTypeOptions = [
    { value: "Dry", label: "Dry & rough" },
    { value: "Normal", label: "Normal & smooth" },
    { value: "Oily", label: "Oily & soft" },
    { value: "Sensitive", label: "More Sensitive" },
  ];

  const hairTypeOptions = [
    { value: "Dry", label: "Dry, thin & brittle" },
    { value: "Normal", label: "Normal, soft & way" },
    { value: "Oily", label: "Oily, thick & shiny" },
  ];

  const eyeShapeOptions = [
    { value: "Dull", label: "Dull, small & active" },
    { value: "Normal", label: "Normal & bright" },
    { value: "Sharp", label: "Sharp, large & calm" },
  ];

  const handleBodyTypeChange = (selectedOption) => {
    setFormData({ ...formData, bodyType: selectedOption.value });
  };

  const handleSkinTypeChange = (selectedOption) => {
    setFormData({ ...formData, skinType: selectedOption.value });
  };

  const handleHairTypeChange = (selectedOption) => {
    setFormData({ ...formData, hairType: selectedOption.value });
  };

  const handleEyeShapeChange = (selectedOption) => {
    setFormData({ ...formData, eyeShape: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.bodyType || !formData.skinType || !formData.hairType || !formData.eyeShape) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Save to database
      const response = await fetch("http://localhost:5000/api/users/physical-attributes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (response.ok) {
        // Save to localStorage
        localStorage.setItem("physicalAttributes", JSON.stringify(formData));
        alert("Physical attributes saved successfully!");
        navigate("/lifestyle");
      } else {
        setError(data.message || "Failed to save physical attributes.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="physical-attributes-container">
      <h1 className="physical-attributes-title">Body Insights</h1>
      <form onSubmit={handleSubmit} className="physical-attributes-form">
        <div className="form-group">
          <label className="form-label"><strong>Body Type</strong></label>
          <Select
            options={bodyTypeOptions}
            onChange={handleBodyTypeChange}
            placeholder="Select Body Type"
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
          <label className="form-label"><strong>Skin Type</strong></label>
          <Select
            options={skinTypeOptions}
            onChange={handleSkinTypeChange}
            placeholder="Select Skin Type"
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
          <label className="form-label"><strong>Hair Type</strong></label>
          <Select
            options={hairTypeOptions}
            onChange={handleHairTypeChange}
            placeholder="Select Hair Type"
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
          <label className="form-label"><strong>Eye Shape & Brightness</strong></label>
          <Select
            options={eyeShapeOptions}
            onChange={handleEyeShapeChange}
            placeholder="Select Eye Shape & Brightness"
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