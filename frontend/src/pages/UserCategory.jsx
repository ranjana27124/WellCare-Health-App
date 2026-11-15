import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserCategory = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserCategory = async () => {
      try {
        // Fetch the user's email from localStorage
        const savedUserDetails = localStorage.getItem("userDetails");
        if (!savedUserDetails) {
          navigate("/welcome"); // Redirect to welcome page if no user details
          return;
        }

        const { email } = JSON.parse(savedUserDetails);

        // Fetch the user's category from the backend
        const response = await fetch(`http://localhost:5000/api/user/category/${email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user category");
        }

        const data = await response.json();

        // Navigate to the appropriate certificate page
        if (data.category === "Fit") {
          navigate("/fit-certificate");
        } else {
          navigate("/unfit-certificate");
        }
      } catch (error) {
        console.error("Error fetching user category:", error);
      }
    };

    fetchUserCategory();
  }, [navigate]);

  return (
    <div>
      <h1>Determining your health status...</h1>
    </div>
  );
};

export default UserCategory;