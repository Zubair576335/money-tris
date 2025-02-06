package com.demo.Expense.Service;

import com.demo.Expense.Model.Expense;
import com.demo.Expense.Repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    // Method to save an expense
    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    // Method to retrieve all expenses
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    // Method to retrieve an expense by its ID
    public Optional<Expense> getExpenseById(Long id) {
        return expenseRepository.findById(id);
    }

    // Method to delete an expense by its ID
    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }
}
