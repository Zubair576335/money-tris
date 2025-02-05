package com.demo.Expense.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.demo.Expense.Model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
