import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ExpenseList.css"; // Import the CSS file

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
};

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/expenses/all");
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/edit-expense/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await axios.delete(`http://localhost:8080/api/expenses/delete/${id}`);
        setExpenses(expenses.filter((expense) => expense.id !== id));
        alert("Expense deleted successfully!");
      } catch (error) {
        console.error("Error deleting expense:", error);
        alert("Failed to delete expense. Please try again.");
      }
    }
  };

  const handleAddExpense = () => {
    navigate("/add-expense"); // Navigate to the AddExpense page
  };

  return (
    <div className="expense-container">
      <h2>Expense List</h2>

      {/* Add Expense button */}
      <button className="add-expense-btn" onClick={handleAddExpense}>
        Add Expense
      </button>

      <div className="table-container">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-data">
                  No expenses found
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.category}</td>
                  <td>₹{expense.amount}</td>
                  <td className="date-column">{formatDate(expense.date)}</td>
                  <td className="operation-column">
                    <button
                      className="update-btn"
                      onClick={() => handleUpdate(expense.id)}
                    >
                      Update
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(expense.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
