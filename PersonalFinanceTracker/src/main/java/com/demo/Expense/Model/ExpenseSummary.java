package com.demo.Expense.Model;

public class ExpenseSummary {
    private double totalExpenses;
    private int categories;
    private int recentActivity;

    public ExpenseSummary(double totalExpenses, int categories, int recentActivity) {
        this.totalExpenses = totalExpenses;
        this.categories = categories;
        this.recentActivity = recentActivity;
    }

    public double getTotalExpenses() { return totalExpenses; }
    public void setTotalExpenses(double totalExpenses) { this.totalExpenses = totalExpenses; }

    public int getCategories() { return categories; }
    public void setCategories(int categories) { this.categories = categories; }

    public int getRecentActivity() { return recentActivity; }
    public void setRecentActivity(int recentActivity) { this.recentActivity = recentActivity; }
} 