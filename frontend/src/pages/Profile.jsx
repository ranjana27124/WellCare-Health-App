import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { User, Edit, Save, X, Lock, Mail, Phone, Calendar } from "lucide-react";
import "./profile.css";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    phoneNumber: "",
  });

  const [isEditing, setIsEditing] = useState(true);
  const navigate = useNavigate();

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedUserDetails = localStorage.getItem("userDetails");
    if (savedUserDetails) {
      setUserDetails(JSON.parse(savedUserDetails));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Save data to localStorage
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      {!isEditing ? (
        <div className="profile-view">
          <div className="profile-field">
            <User size={20} className="profile-icon" />
            <p><strong>First Name:</strong> {userDetails.firstName}</p>
          </div>
          <div className="profile-field">
            <User size={20} className="profile-icon" />
            <p><strong>Last Name:</strong> {userDetails.lastName}</p>
          </div>
          <div className="profile-field">
            <Mail size={20} className="profile-icon" />
            <p><strong>Email:</strong> {userDetails.email}</p>
          </div>
          <div className="profile-field">
            <Lock size={20} className="profile-icon" />
            <p><strong>Password:</strong> {userDetails.password.replace(/./g, "*")}</p>
          </div>
          <div className="profile-field">
            <Calendar size={20} className="profile-icon" />
            <p><strong>Date of Birth:</strong> {userDetails.dateOfBirth}</p>
          </div>
          <div className="profile-field">
            <Phone size={20} className="profile-icon" />
            <p><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
          </div>
          <button onClick={() => setIsEditing(true)} className="edit-button">
            <Edit size={16} className="button-icon" /> Edit
          </button>
          <button className="back-button" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} /> Back
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="input-group">
            <label className="label">
              <User size={20} className="profile-icon" /> First Name:
            </label>
            <input
              type="text"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div className="input-group">
            <label className="label">
              <User size={20} className="profile-icon" /> Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div className="input-group">
            <label className="label">
              <Mail size={20} className="profile-icon" /> Email:
            </label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div className="input-group">
            <label className="label">
              <Lock size={20} className="profile-icon" /> Password:
            </label>
            <input
              type="password"
              name="password"
              value={userDetails.password}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div className="input-group">
            <label className="label">
              <Calendar size={20} className="profile-icon" /> Date of Birth:
            </label>
            <input
              type="string"
              name="dateOfBirth"
              value={userDetails.dateOfBirth}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div className="input-group">
            <label className="label">
              <Phone size={20} className="profile-icon" /> Phone Number:
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={userDetails.phoneNumber}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="save-button">
              <Save size={16} className="button-icon" /> Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="cancel-button"
            >
              <X size={16} className="button-icon" /> Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;