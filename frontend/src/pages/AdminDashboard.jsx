import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./AdminDashboard.css"; // Import the CSS file

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [personalDetails, setPersonalDetails] = useState([]);
  const [physicalAttributes, setPhysicalAttributes] = useState([]);
  const [lifestyle, setLifestyle] = useState([]);
  const [mentalEmotional, setMentalEmotional] = useState([]);
  const [climatePreferences, setClimatePreferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch all data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          usersResponse,
          personalDetailsResponse,
          physicalAttributesResponse,
          lifestyleResponse,
          mentalEmotionalResponse,
          climatePreferencesResponse,
        ] = await Promise.all([
          axios.get("http://localhost:5000/api/users"),
          axios.get("http://localhost:5000/api/users/personal-details"),
          axios.get("http://localhost:5000/api/users/physical-attributes"),
          axios.get("http://localhost:5000/api/users/lifestyle"),
          axios.get("http://localhost:5000/api/users/mental-emotional"),
          axios.get("http://localhost:5000/api/users/climate-preferences"),
        ]);

        setUsers(usersResponse.data);
        setPersonalDetails(personalDetailsResponse.data);
        setPhysicalAttributes(physicalAttributesResponse.data);
        setLifestyle(lifestyleResponse.data);
        setMentalEmotional(mentalEmotionalResponse.data);
        setClimatePreferences(climatePreferencesResponse.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data from localStorage
    navigate("/welcome"); // Navigate to the Welcome page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="admin-dashboard">
      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      <h1>Admin Dashboard</h1>

      {/* Display Users */}
      <section className="data-section">
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Display Personal Details */}
      <section className="data-section">
        <h2>Personal Details</h2>
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>Weight</th>
              <th>Height</th>
            </tr>
          </thead>
          <tbody>
            {personalDetails.map((detail) => (
              <tr key={detail._id}>
                <td>{detail.fullName}</td>
                <td>{detail.age}</td>
                <td>{detail.gender}</td>
                <td>{detail.contactNumber}</td>
                <td>{detail.email}</td>
                <td>{detail.weight}</td>
                <td>{detail.height}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Display Physical Attributes */}
      <section className="data-section">
        <h2>Physical Attributes</h2>
        <table>
          <thead>
            <tr>
              <th>Body Type</th>
              <th>Skin Type</th>
              <th>Hair Type</th>
              <th>Eye Shape</th>
            </tr>
          </thead>
          <tbody>
            {physicalAttributes.map((attribute) => (
              <tr key={attribute._id}>
                <td>{attribute.bodyType}</td>
                <td>{attribute.skinType}</td>
                <td>{attribute.hairType}</td>
                <td>{attribute.eyeShape}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Display Lifestyle */}
      <section className="data-section">
        <h2>Lifestyle</h2>
        <table>
          <thead>
            <tr>
              <th>Sleep Pattern</th>
              <th>Food Preference</th>
              <th>Appetite Level</th>
              <th>Thirst Level</th>
              <th>Exercise Routine</th>
            </tr>
          </thead>
          <tbody>
            {lifestyle.map((lifestyle) => (
              <tr key={lifestyle._id}>
                <td>{lifestyle.sleepPattern}</td>
                <td>{lifestyle.foodPreference}</td>
                <td>{lifestyle.appetiteLevel}</td>
                <td>{lifestyle.thirstLevel}</td>
                <td>{lifestyle.exerciseRoutine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Display Mental & Emotional */}
      <section className="data-section">
        <h2>Mental & Emotional</h2>
        <table>
          <thead>
            <tr>
              <th>Stress Levels</th>
              <th>Decision-Making Style</th>
              <th>Memory Strength</th>
              <th>Social Behavior</th>
            </tr>
          </thead>
          <tbody>
            {mentalEmotional.map((mental) => (
              <tr key={mental._id}>
                <td>{mental.stressLevels}</td>
                <td>{mental.decisionMakingStyle}</td>
                <td>{mental.memoryStrength}</td>
                <td>{mental.socialBehavior}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Display Climate Preferences */}
      <section className="data-section">
        <h2>Climate Preferences</h2>
        <table>
          <thead>
            <tr>
              <th>Comfortable Climate</th>
              <th>Seasonal Health Sensitivity</th>
              <th>Sensitivity to Temperature</th>
              <th>Comfort with Humidity</th>
            </tr>
          </thead>
          <tbody>
            {climatePreferences.map((climate) => (
              <tr key={climate._id}>
                <td>{climate.comfortableClimate}</td>
                <td>{climate.seasonalHealthSensitivity}</td>
                <td>{climate.sensitivityToTemperature}</td>
                <td>{climate.comfortWithHumidity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;