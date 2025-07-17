package com.demo.Expense.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.demo.Expense.Model.Expense;
import com.demo.Expense.Model.User;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUser(User user);
    List<Expense> findByUserAndDateBetween(User user, java.time.LocalDate start, java.time.LocalDate end);
}
