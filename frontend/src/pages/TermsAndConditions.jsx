import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./terms.css";

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleAccept = () => {
    // Save acceptance of terms to localStorage
    localStorage.setItem("acceptedTerms", "true");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="terms-container">
      <button className="back-button" onClick={() => navigate(-1)}><FaArrowLeft /></button>
      <h2>Terms & Conditions</h2>
      <p><strong>Last Updated:</strong> 22/03/2025</p>

      <h4>1. Acceptance</h4>
      <p>Using WellCare means agreeing to these Terms and <a href="/privacy-policy">Privacy Policy</a>.</p>

      <h4>2. Purpose</h4>
      <p>WellCare provides wellness insights, not medical advice.</p>

      <h4>3. User Rules</h4>
      <ul>
        <li>Provide accurate info.</li>
        <li>Use legally, keep login secure.</li>
      </ul>

      <h4>4. Privacy</h4>
      <p>We process data per our Privacy Policy.</p>

      <h4>5. Ownership</h4>
      <p>All content belongs to WellCare. No copying.</p>

      <h4>6. Liability</h4>
      <p>We aren’t responsible for issues. Use "as is."</p>

      <h4>7. Updates</h4>
      <p>Terms may change. Using means accepting.</p>

      <h4>8. Law</h4>
      <p>Governed by Karnataka, India laws.</p>

      <h4>9. Contact Us</h4>
      <p>
        For any questions or concerns about the app, please contact us at <strong>[wellcare@gmail.com] or [www.wellcare.com]</strong>.
      </p>

      <div className="terms-buttons">
        <button className="accept-button" onClick={handleAccept}>Accept</button>
        <button className="decline-button" onClick={() => navigate(-1)}>Decline</button>
      </div>

      {showPopup && <div className="popup">Accepted Terms and Conditions</div>}
    </div>
  );
};

export default TermsAndConditions;