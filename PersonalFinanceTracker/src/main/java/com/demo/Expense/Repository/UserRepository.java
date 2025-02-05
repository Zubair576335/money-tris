package com.demo.Expense.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.demo.Expense.Model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    boolean existsByUsername(String username);
}


