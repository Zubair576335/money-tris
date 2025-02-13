import React from "react";
import "./Footer.css";
import profileImage from "../Images/images.jpg";  // Adjust the path as needed

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Profile Section */}
        <div className="footer-section profile">
          <img src={profileImage} alt="Finance Tracker" className="profile-img" />
          <h3>Saud Ahmed Khawjabhai Kadapa</h3>
          <p>Java & .NET Developer | Full-Stack Engineer</p>
        </div>

        {/* Contact Section */}
        <div className="footer-section contact">
          <h3>Contact Info</h3>
          <p>Email: saud@example.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: India</p>
        </div>

        {/* Social Links */}
        <div className="footer-section social">
          <h3>Connect With Me</h3>
          <ul>
            <li><a href="https://linkedin.com/in/saudahmedkadapa" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://github.com/saudahmedKadapa" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Saud Ahmed Kadapa | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
