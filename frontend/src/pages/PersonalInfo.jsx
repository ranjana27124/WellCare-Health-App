

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "./personalInfo.css";

export default function PersonalInfo() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    contactNumber: "",
    email: "",
    weight: "",
    height: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check profile and terms acceptance
  useEffect(() => {
    const savedUserDetails = localStorage.getItem("userDetails");
    const acceptedTerms = localStorage.getItem("acceptedTerms");

    if (!savedUserDetails || !acceptedTerms) {
      navigate("/");
    }
  }, [navigate]);

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      gender: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.age ||
      !formData.gender ||
      !formData.email ||
      !formData.weight ||
      !formData.height
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/personal-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log("Response from server:", data);

      if (response.ok) {
        localStorage.setItem(
          "personalInfo",
          JSON.stringify(formData)
        );

        alert("Personal info saved successfully!");

        navigate("/physical-attributes");
      } else {
        setError(data.message || "Failed to save personal info.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="personal-info-container">

      <h1 className="personal-info-title">
        Personal Information
      </h1>

      <form
        onSubmit={handleSubmit}
        className="personal-info-form"
      >

        <div className="form-group">
          <label className="form-label">
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            placeholder="Enter Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Age
          </label>

          <input
            type="number"
            name="age"
            placeholder="Enter Age"
            value={formData.age}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Gender
          </label>

          <Select
            options={genderOptions}
            value={
              genderOptions.find(
                (option) => option.value === formData.gender
              ) || null
            }
            onChange={handleGenderChange}
            placeholder="Select Gender"
            className="gender-select"
            classNamePrefix="gender"
            isClearable
            styles={{
              control: (base, state) => ({
                ...base,
                minHeight: "45px",
                borderRadius: "7px",
                borderColor: state.isFocused ? "#4facfe" : "#ccc",
                boxShadow: state.isFocused
                  ? "0 0 0 2px rgba(79,172,254,0.15)"
                  : "none",
                "&:hover": {
                  borderColor: "#4facfe",
                },
              }),
              menu: (base) => ({
                ...base,
                zIndex: 100,
              }),
              option: (base, state) => ({
                ...base,
                color: "#222",
                backgroundColor: state.isSelected
                  ? "#4facfe"
                  : state.isFocused
                  ? "#eaf5ff"
                  : "white",
              }),
              singleValue: (base) => ({
                ...base,
                color: "#222",
              }),
              placeholder: (base) => ({
                ...base,
                color: "#777",
              }),
            }}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Contact Number
          </label>

          <input
            type="tel"
            name="contactNumber"
            placeholder="Enter Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Weight (kg)
          </label>

          <input
            type="number"
            name="weight"
            placeholder="Enter Weight"
            value={formData.weight}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Height (cm)
          </label>

          <input
            type="number"
            name="height"
            placeholder="Enter Height"
            value={formData.height}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="next-button"
          disabled={loading}
        >
          {loading ? "Saving..." : "Next"}
        </button>

      </form>
    </div>
  );
}
