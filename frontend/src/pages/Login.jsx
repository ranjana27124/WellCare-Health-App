import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "./login.css"; // Import the CSS file
import logo2 from '../assets/logo2.png'; // Import the logo image

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Default admin credentials
    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123";

    // Check if the entered credentials match the admin credentials
    if (email === adminEmail && password === adminPassword) {
      // Navigate to the admin dashboard
      navigate("/admin-dashboard");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home"); // Redirect to Home page after successful login
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Add the logo image here */}
        <img src={logo2} alt="Logo" className="login-logo" />
        <h3 className="login-title">Welcome back!</h3>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label"><strong>Email</strong></label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label"><strong>Password</strong></label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}