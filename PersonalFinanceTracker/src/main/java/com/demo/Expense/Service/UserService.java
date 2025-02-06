package com.demo.Expense.Service;

import com.demo.Expense.Model.User;
import com.demo.Expense.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Method to find a user by username
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Method to find a user by userId
    public User findById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    // Method to save a new user (e.g., during registration)
    public User save(User user) {
        return userRepository.save(user);
    }

    // Other user-related methods...
}
