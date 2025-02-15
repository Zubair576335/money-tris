import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // Make sure to import the CSS file
import profileImage from "../Images/images.jpg"; // Ensure the path is correct

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={profileImage} alt="Profile" className="profile-img" />
      </div>
      <div className="app-name">
        <h1>Expense Tracker</h1>
      </div>
      <div className="nav-links">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
