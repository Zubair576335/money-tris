import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Register from './Component/Register';
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
import AddExpense from './Component/AddExpense';
import ExpenseList from './Component/ExpenseList';
import EditExpense from './Component/EditExpense';
import Footer from './Component/Footer';
import Navbar from './Component/Navbar';
import LandingPage from './Component/LandingPage';
import AboutUs from './Component/AboutUs'; // Import the AboutUs component
import BudgetManager from './Component/BudgetManager';
import Reports from './Component/Reports';
import JobControl from './Component/JobControl';

function App() {
  const location = useLocation(); // Get the current route location

  return (
    <div className="app-container">
      {/* Render Navbar on all pages */}
      <Navbar />

      <div className="main-content">
        <Routes>
          {/* Set the landing page as the default route */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/expense-list" element={<ExpenseList />} />
          <Route path="/edit-expense/:id" element={<EditExpense />} />
          <Route path="/about-us" element={<AboutUs />} /> {/* Route for About Us */}
          <Route path="/budgets" element={<BudgetManager />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/job-control" element={<JobControl />} />
        </Routes>
      </div>

      {/* Render Footer only on LandingPage */}
      {location.pathname === '/' && <Footer />}
    </div>
  );
}

export default App;
