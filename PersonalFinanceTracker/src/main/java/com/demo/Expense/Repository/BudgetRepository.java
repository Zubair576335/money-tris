package com.demo.Expense.Repository;

import com.demo.Expense.Model.Budget;
import com.demo.Expense.Model.Category;
import com.demo.Expense.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByUserAndMonthAndYear(User user, int month, int year);
    List<Budget> findByUser(User user);
    List<Budget> findByUserAndCategoryAndMonthAndYear(User user, Category category, int month, int year);
    List<Budget> findByUserAndCategory(User user, Category category);
} 