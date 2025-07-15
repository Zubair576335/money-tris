package com.demo.Expense.Controller;

import com.demo.Expense.Model.Budget;
import com.demo.Expense.Model.User;
import com.demo.Expense.Model.Category;
import com.demo.Expense.Repository.BudgetRepository;
import com.demo.Expense.Repository.UserRepository;
import com.demo.Expense.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/api/budgets")
public class BudgetController {
    @Autowired
    private BudgetRepository budgetRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    // Get all budgets for a user (optionally filter by month/year)
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getBudgets(@RequestParam Long userId,
                                                   @RequestParam(required = false) Integer month,
                                                   @RequestParam(required = false) Integer year) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (!userOpt.isPresent()) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        User user = userOpt.get();
        List<Budget> budgets;
        if (month != null && year != null) {
            budgets = budgetRepository.findByUserAndMonthAndYear(user, month, year);
        } else {
            budgets = budgetRepository.findByUser(user);
        }
        List<Map<String, Object>> dtos = budgets.stream().map(this::budgetToDto).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    // Add a new budget
    @PostMapping
    public ResponseEntity<?> addBudget(@RequestBody Map<String, Object> payload, @RequestParam Long userId) {
        try {
            Double amount = Double.valueOf(payload.get("amount").toString());
            Long categoryId = Long.valueOf(payload.get("categoryId").toString());
            int month = Integer.parseInt(payload.get("month").toString());
            int year = Integer.parseInt(payload.get("year").toString());
            Category category = categoryRepository.findById(categoryId).orElse(null);
            if (category == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid category");
            Optional<User> userOpt = userRepository.findById(userId);
            if (!userOpt.isPresent()) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            Budget budget = new Budget();
            budget.setUser(userOpt.get());
            budget.setCategory(category);
            budget.setAmount(amount);
            budget.setMonth(month);
            budget.setYear(year);
            Budget saved = budgetRepository.save(budget);
            return ResponseEntity.status(HttpStatus.CREATED).body(budgetToDto(saved));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request: " + e.getMessage());
        }
    }

    // Update a budget
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBudget(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        Optional<Budget> budgetOpt = budgetRepository.findById(id);
        if (!budgetOpt.isPresent()) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        Budget budget = budgetOpt.get();
        try {
            Double amount = Double.valueOf(payload.get("amount").toString());
            Long categoryId = Long.valueOf(payload.get("categoryId").toString());
            int month = Integer.parseInt(payload.get("month").toString());
            int year = Integer.parseInt(payload.get("year").toString());
            Category category = categoryRepository.findById(categoryId).orElse(null);
            if (category == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid category");
            budget.setCategory(category);
            budget.setAmount(amount);
            budget.setMonth(month);
            budget.setYear(year);
            Budget saved = budgetRepository.save(budget);
            return ResponseEntity.ok(budgetToDto(saved));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request: " + e.getMessage());
        }
    }

    // Delete a budget
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBudget(@PathVariable Long id) {
        if (!budgetRepository.existsById(id)) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        budgetRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    private Map<String, Object> budgetToDto(Budget budget) {
        Map<String, Object> dto = new HashMap<>();
        dto.put("id", budget.getId());
        dto.put("amount", budget.getAmount());
        dto.put("month", budget.getMonth());
        dto.put("year", budget.getYear());
        if (budget.getCategory() != null) {
            dto.put("categoryId", budget.getCategory().getId());
            dto.put("categoryName", budget.getCategory().getName());
        }
        return dto;
    }
} 