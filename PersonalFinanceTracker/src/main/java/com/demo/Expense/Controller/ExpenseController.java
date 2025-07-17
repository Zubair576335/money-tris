package com.demo.Expense.Controller;

import com.demo.Expense.Model.Expense;
import com.demo.Expense.Model.ExpenseSummary;
import com.demo.Expense.Model.Category;
import com.demo.Expense.Model.User;
import com.demo.Expense.Repository.CategoryRepository;
import com.demo.Expense.Repository.UserRepository;
import com.demo.Expense.Service.ExpenseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private UserRepository userRepository;

    // Add expense
    @PostMapping("/add")
    public ResponseEntity<?> addExpense(@RequestBody Map<String, Object> payload) {
        try {
            Double amount = Double.valueOf(payload.get("amount").toString());
            Long categoryId = Long.valueOf(payload.get("categoryId").toString());
            Long userId = Long.valueOf(payload.get("userId").toString());
            String dateStr = payload.get("date").toString();
            Category category = categoryRepository.findById(categoryId).orElse(null);
            User user = userRepository.findById(userId).orElse(null);
            if (category == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid category");
            if (user == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user");
            Expense expense = new Expense();
            expense.setAmount(amount);
            expense.setCategory(category);
            expense.setUser(user);
            expense.setDate(LocalDate.parse(dateStr));
            expenseService.saveExpense(expense);
            return ResponseEntity.status(HttpStatus.CREATED).body(expenseToDto(expense));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request: " + e.getMessage());
        }
    }

    // Get all expenses for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getExpensesByUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        List<Expense> expenses = expenseService.getExpensesByUser(user);
        List<Map<String, Object>> dtos = expenses.stream().map(this::expenseToDto).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    // Get an expense by ID
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getExpenseById(@PathVariable Long id) {
        Optional<Expense> expense = expenseService.getExpenseById(id);
        return expense.map(e -> ResponseEntity.ok(expenseToDto(e))).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update an existing expense
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateExpense(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        Optional<Expense> existingExpense = expenseService.getExpenseById(id);
        if (existingExpense.isPresent()) {
            Expense expense = existingExpense.get();
            try {
                Double amount = Double.valueOf(payload.get("amount").toString());
                Long categoryId = Long.valueOf(payload.get("categoryId").toString());
                String dateStr = payload.get("date").toString();
                Category category = categoryRepository.findById(categoryId).orElse(null);
                if (category == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid category");
                expense.setAmount(amount);
                expense.setCategory(category);
                expense.setDate(LocalDate.parse(dateStr));
                expenseService.saveExpense(expense);
                return ResponseEntity.ok(expenseToDto(expense));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request: " + e.getMessage());
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Expense not found.");
        }
    }

    // Delete an expense by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.ok("Expense deleted successfully.");
    }

    // Add summary endpoint
    @GetMapping("/summary")
    public ResponseEntity<ExpenseSummary> getExpenseSummary(@RequestParam Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        ExpenseSummary summary = expenseService.getExpenseSummaryByUser(user);
        return ResponseEntity.ok(summary);
    }

    private Map<String, Object> expenseToDto(Expense expense) {
        Map<String, Object> dto = new HashMap<>();
        dto.put("id", expense.getId());
        dto.put("amount", expense.getAmount());
        dto.put("date", expense.getDate());
        if (expense.getCategory() != null) {
            dto.put("categoryId", expense.getCategory().getId());
            dto.put("categoryName", expense.getCategory().getName());
        }
        return dto;
    }
}
