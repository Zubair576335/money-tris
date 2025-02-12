import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditExpense.css"; // Import CSS for styling

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
  });

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  const fetchExpenseDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/expenses/${id}`);
      setExpense(response.data);
    } catch (error) {
      console.error("Error fetching expense details:", error);
    }
  };

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/expenses/update/${id}`, expense);
      alert("Expense updated successfully!");
      navigate("/expense-list"); // Redirect to Expense List after update
    } catch (error) {
      console.error("Error updating expense:", error);
      alert("Failed to update expense.");
    }
  };

  return (
    <div className="edit-expense-container">
      <h2>Edit Expense</h2>
      <form onSubmit={handleSubmit}>
        <label>Category:</label>
        <input type="text" name="category" value={expense.category} onChange={handleChange} required />

        <label>Amount:</label>
        <input type="number" name="amount" value={expense.amount} onChange={handleChange} required />

        <label>Date:</label>
        <input type="date" name="date" value={expense.date} onChange={handleChange} required />

        <button type="submit" className="save-btn">Save</button>
        <button type="button" className="cancel-btn" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
};

export default EditExpense;
