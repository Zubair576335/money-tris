import React from "react";
import "./AboutUs.css"; // Import the CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="content">
        <h1>About Us</h1>
        <p>
          Welcome to our platform! We are a team of passionate individuals
          dedicated to providing innovative solutions to simplify your life. Our
          goal is to help you manage your expenses and achieve financial success.
        </p>
        <h2>Our Mission</h2>
        <p>
          Our mission is to create a user-friendly platform that makes expense
          tracking effortless and accessible to everyone. We believe in empowering
          users with the right tools and insights to make informed financial
          decisions.
        </p>
        <h2>Our Vision</h2>
        <p>
          Our vision is to be the leading platform for financial management, providing
          intuitive tools for managing expenses, saving money, and achieving long-term
          financial goals.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
