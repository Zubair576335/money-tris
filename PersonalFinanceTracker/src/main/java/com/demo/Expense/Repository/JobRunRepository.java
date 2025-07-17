package com.demo.Expense.Repository;

import com.demo.Expense.Model.JobRun;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRunRepository extends JpaRepository<JobRun, Long> {
} 