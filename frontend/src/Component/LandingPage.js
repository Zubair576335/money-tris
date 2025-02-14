import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Import the CSS file for styling

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate('/about-us'); // Navigate to About Us page
  };

  const handleRegister = () => {
    navigate('/register'); // Navigate to Register page
  };

  return (
    <div className="landing-page">
      <div className="content">
        <h1>Welcome to Our Expense Tracker</h1>
        <p>We provide innovative solutions to simplify your life.</p>
        <div className="action-buttons">
          <button onClick={handleLearnMore}>Learn More</button>
          <button onClick={handleRegister}>Register</button> {/* Register button */}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
