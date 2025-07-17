package com.demo.Expense.Service;

import com.demo.Expense.Model.Expense;
import com.demo.Expense.Model.ExpenseSummary;
import com.demo.Expense.Repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import com.demo.Expense.Model.User;

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

    // Method to get summary statistics for all expenses
    public ExpenseSummary getExpenseSummary() {
        List<Expense> expenses = expenseRepository.findAll();
        double totalExpenses = 0;
        HashSet<String> categorySet = new HashSet<>();
        int recentActivity = 0;
        LocalDate sevenDaysAgo = LocalDate.now().minusDays(7);
        for (Expense expense : expenses) {
            if (expense.getAmount() != null) {
                totalExpenses += expense.getAmount();
            }
            if (expense.getCategory() != null && expense.getCategory().getName() != null) {
                categorySet.add(expense.getCategory().getName());
            }
            if (expense.getDate() != null && !expense.getDate().isBefore(sevenDaysAgo)) {
                recentActivity++;
            }
        }
        return new ExpenseSummary(totalExpenses, categorySet.size(), recentActivity);
    }

    public List<Expense> getExpensesByUser(User user) {
        return expenseRepository.findByUser(user);
    }

    public ExpenseSummary getExpenseSummaryByUser(User user) {
        List<Expense> expenses = expenseRepository.findByUser(user);
        double totalExpenses = 0;
        HashSet<String> categorySet = new HashSet<>();
        int recentActivity = 0;
        LocalDate sevenDaysAgo = LocalDate.now().minusDays(7);
        for (Expense expense : expenses) {
            if (expense.getAmount() != null) {
                totalExpenses += expense.getAmount();
            }
            if (expense.getCategory() != null && expense.getCategory().getName() != null) {
                categorySet.add(expense.getCategory().getName());
            }
            if (expense.getDate() != null && !expense.getDate().isBefore(sevenDaysAgo)) {
                recentActivity++;
            }
        }
        return new ExpenseSummary(totalExpenses, categorySet.size(), recentActivity);
    }

    public List<Expense> getExpensesByUserAndDateRange(User user, LocalDate start, LocalDate end) {
        return expenseRepository.findByUserAndDateBetween(user, start, end);
    }
}
