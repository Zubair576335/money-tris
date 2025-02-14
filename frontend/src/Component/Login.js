import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate(); // useNavigate hook for redirection

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting login data", credentials);

      // Make POST request to backend
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        credentials,
        { withCredentials: true } // Include session/cookies in the request
      );

      console.log("Server response:", response.data);

      // Assuming backend returns { message: "Login successful" }
      if (response.status === 200 && response.data === "Login successful") {
        alert("Login successful!");

        // Delay for alert visibility (optional)
        setTimeout(() => {
          navigate("/dashboard"); // Redirect to dashboard
        }, 1000);
      } else {
        alert(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        alert("Error: " + (error.response.data.message || "Invalid credentials"));
      } else if (error.request) {
        console.error("Error request:", error.request);
        alert("Error: No response from server. Please try again later.");
      } else {
        console.error("Error:", error.message);
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
