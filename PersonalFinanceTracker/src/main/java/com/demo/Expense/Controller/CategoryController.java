package com.demo.Expense.Controller;

import com.demo.Expense.Model.Category;
import com.demo.Expense.Model.User;
import com.demo.Expense.Repository.CategoryRepository;
import com.demo.Expense.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private UserRepository userRepository;

    // Get all categories for a user
    @GetMapping
    public ResponseEntity<List<Category>> getCategories(@RequestParam Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (!userOpt.isPresent()) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(categoryRepository.findByUser(userOpt.get()));
    }

    // Add a new category for a user
    @PostMapping
    public ResponseEntity<Category> addCategory(@RequestBody Category category, @RequestParam Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (!userOpt.isPresent()) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        category.setUser(userOpt.get());
        Category saved = categoryRepository.save(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
} 