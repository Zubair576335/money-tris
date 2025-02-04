package com.demo.Expense.Controller;

import com.demo.Expense.Model.User;
import com.demo.Expense.Service.UserService;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;  // Inject UserService to access user data

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest, HttpSession session) {
        User user = userService.findByUsername(loginRequest.getUsername());

        if (user == null || !user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        // Store userId in session
        session.setAttribute("userId", user.getId());

        // Return a response with message and userId
        return ResponseEntity.ok().body("Login successful");
    }

    // Register API
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User registerRequest) {
        // Check if the username already exists
        User existingUser = userService.findByUsername(registerRequest.getUsername());
        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
        }

        // Save the new user to the database
        User newUser = userService.save(registerRequest);

        // Return a success response with the user's ID
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully with ID: " + newUser.getId());
    }
}
