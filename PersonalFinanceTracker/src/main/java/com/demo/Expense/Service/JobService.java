package com.demo.Expense.Service;

import com.demo.Expense.Model.JobRun;
import com.demo.Expense.Repository.JobRunRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class JobService {
    @Autowired
    private JobRunRepository jobRunRepository;
    @Autowired
    private BudgetAlertService budgetAlertService;

    public JobRun triggerBudgetCheck() {
        LocalDateTime start = LocalDateTime.now();
        String status = "SUCCESS";
        String message = null;
        try {
            message = budgetAlertService.runBudgetCheck();
        } catch (Exception ex) {
            status = "FAILURE";
            message = ex.getMessage();
        }
        LocalDateTime end = LocalDateTime.now();
        JobRun run = new JobRun("BUDGET_CHECK", status, start, end, message);
        return jobRunRepository.save(run);
    }

    public List<JobRun> getJobHistory() {
        return jobRunRepository.findAll();
    }
} 