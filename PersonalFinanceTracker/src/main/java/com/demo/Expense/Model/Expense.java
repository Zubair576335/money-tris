package com.demo.Expense.Model;

import java.time.LocalDate;


import javax.persistence.*;

@Entity
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;
    private String category;
    private LocalDate date;  

    public Expense() {}

    public Expense(Long id, Double amount, String category, LocalDate date) {
        this.id = id;
        this.amount = amount;
        this.category = category;
        this.date = date;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    @Override
    public String toString() {
        return "Expense [id=" + id + ", amount=" + amount + ", category=" + category + ", date=" + date + "]";
    }
}
