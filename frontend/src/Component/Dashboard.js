import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Import the CSS file for styling
import dashboardImage from "../Images/dashimage.png";  // Add the path to your image

const Dashboard = () => {
  const navigate = useNavigate();

  const handleAddExpense = () => {
    navigate("/add-expense"); // Navigate to AddExpense page
  };

  const handleExpenseList = () => {
    navigate("/expense-list"); // Navigate to ExpenseList page
  };

  return (
    <div className="dashboard">
      <div className="content">
        {/* Image Section */}
        <img src={dashboardImage} alt="Dashboard" className="dashboard-image" />
        
        <h2>Welcome to the Dashboard!</h2>
        <p>Manage your expenses effectively with this dashboard.</p>
        <div className="action-buttons">
          <button onClick={handleAddExpense}>Add Expense</button>
          <button onClick={handleExpenseList}>Expense List</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
