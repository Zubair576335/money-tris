package com.demo.Expense.Controller;

import com.demo.Expense.Model.JobRun;
import com.demo.Expense.Service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST})
@RestController
@RequestMapping("/api/jobs")
public class JobController {
    @Autowired
    private JobService jobService;

    @PostMapping("/trigger-budget-check")
    public ResponseEntity<JobRun> triggerBudgetCheck() {
        JobRun run = jobService.triggerBudgetCheck();
        return ResponseEntity.ok(run);
    }

    @GetMapping("/history")
    public ResponseEntity<List<JobRun>> getJobHistory() {
        return ResponseEntity.ok(jobService.getJobHistory());
    }
} 