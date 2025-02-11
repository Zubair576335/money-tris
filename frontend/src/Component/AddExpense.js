import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expenseData = {
      amount,
      category,
      date,
    };

    try {
      // Send POST request to add expense
      const response = await axios.post("http://localhost:8080/api/expenses/add", expenseData);

      console.log("API Response:", response.data); // Log the response

      if (response.status === 201) { // ✅ Check for 201 Created
        alert("Expense added successfully!"); // Show success alert

        // Redirect after 1 second
        setTimeout(() => {
          navigate("/expense-list");
        }, 1000);
      } else {
        alert("Failed to add expense. Please try again.");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Error adding expense. Please try again later.");
    }
  };

  return (
    <div className="expense-form">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" className="btn-submit">Add Expense</button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
