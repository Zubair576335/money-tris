package com.demo.Expense.Service;

import com.demo.Expense.Model.Budget;
import com.demo.Expense.Model.Expense;
import com.demo.Expense.Model.User;
import com.demo.Expense.Repository.BudgetRepository;
import com.demo.Expense.Repository.ExpenseRepository;
import com.demo.Expense.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BudgetAlertService {
    @Autowired
    private BudgetRepository budgetRepository;
    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JavaMailSender mailSender;

    public String runBudgetCheck() {
        int currentMonth = java.time.LocalDate.now().getMonthValue();
        int currentYear = java.time.LocalDate.now().getYear();
        java.util.List<User> users = userRepository.findAll();
        int alertsSent = 0;
        for (User user : users) {
            java.util.List<Budget> budgets = budgetRepository.findByUserAndMonthAndYear(user, currentMonth, currentYear);
            if (budgets.isEmpty()) continue;
            java.util.Map<String, Double> budgetMap = new java.util.HashMap<>();
            for (Budget b : budgets) {
                if (b.getCategory() != null && b.getCategory().getName() != null) {
                    budgetMap.put(b.getCategory().getName(), b.getAmount());
                }
            }
            java.util.List<Expense> expenses = expenseRepository.findAll();
            java.util.Map<String, Double> spentMap = new java.util.HashMap<>();
            for (Expense e : expenses) {
                if (e.getCategory() == null || e.getCategory().getName() == null || e.getAmount() == null || e.getDate() == null) continue;
                if (e.getDate().getMonthValue() == currentMonth && e.getDate().getYear() == currentYear) {
                    String catName = e.getCategory().getName();
                    spentMap.put(catName, spentMap.getOrDefault(catName, 0.0) + e.getAmount());
                }
            }
            StringBuilder alertMsg = new StringBuilder();
            for (String category : budgetMap.keySet()) {
                double budget = budgetMap.get(category);
                double spent = spentMap.getOrDefault(category, 0.0);
                if (budget > 0 && spent / budget >= 0.9) {
                    alertMsg.append(String.format("Category: %s\nBudget: %.2f\nSpent: %.2f (%.0f%%)\n\n", category, budget, spent, (spent / budget) * 100));
                }
            }
            if (alertMsg.length() > 0) {
                sendAlertEmail(user.getEmail(), alertMsg.toString());
                alertsSent++;
            }
        }
        return "Budget check complete. Alerts sent: " + alertsSent;
    }

    // Run every day at 7 AM
    @org.springframework.scheduling.annotation.Scheduled(cron = "0 0 7 * * *")
    public void checkBudgetsAndSendAlerts() {
        runBudgetCheck();
    }

    private void sendAlertEmail(String to, String alertMsg) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("alerts@test-ywj2lpnjmnjg7oqz.mlsender.net");
        message.setTo(to);
        message.setSubject("[Finance Tracker] Budget Alert: Spending Near Limit");
        message.setText("You are close to reaching your budget in the following categories this month:\n\n" + alertMsg);
        mailSender.send(message);
    }
} 