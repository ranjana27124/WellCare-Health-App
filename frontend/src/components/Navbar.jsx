import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Removed the logo */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          {/* Removed the "Welcome" and "Home" links */}
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                {/* Removed the "Welcome, {user.fullName}" text */}
                {/* Removed the Logout button */}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login"><strong>Login</strong></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup"><strong>Signup</strong></Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}