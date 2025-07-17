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

    // Update a category name
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestBody Category updatedCategory, @RequestParam Long userId) {
        Optional<Category> catOpt = categoryRepository.findById(id);
        if (!catOpt.isPresent()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found");
        Category cat = catOpt.get();
        if (!cat.getUser().getId().equals(userId)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not allowed");
        cat.setName(updatedCategory.getName());
        categoryRepository.save(cat);
        return ResponseEntity.ok(cat);
    }

    // Delete a category
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id, @RequestParam Long userId) {
        Optional<Category> catOpt = categoryRepository.findById(id);
        if (!catOpt.isPresent()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found");
        Category cat = catOpt.get();
        if (!cat.getUser().getId().equals(userId)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not allowed");
        categoryRepository.delete(cat);
        return ResponseEntity.ok("Category deleted");
    }
} 