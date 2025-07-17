package com.demo.Expense.Repository;

import com.demo.Expense.Model.Report;
import com.demo.Expense.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByUser(User user);
} 