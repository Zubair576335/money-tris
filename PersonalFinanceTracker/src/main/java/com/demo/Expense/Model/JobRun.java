package com.demo.Expense.Model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class JobRun {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String jobType; // e.g., BUDGET_CHECK, WEEKLY_REPORT

    @Column(nullable = false)
    private String status; // e.g., SUCCESS, FAILURE

    @Column(nullable = false)
    private LocalDateTime startedAt;

    @Column(nullable = false)
    private LocalDateTime finishedAt;

    @Column
    private String message; // error or result message (nullable)

    public JobRun() {}

    public JobRun(String jobType, String status, LocalDateTime startedAt, LocalDateTime finishedAt, String message) {
        this.jobType = jobType;
        this.status = status;
        this.startedAt = startedAt;
        this.finishedAt = finishedAt;
        this.message = message;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getJobType() { return jobType; }
    public void setJobType(String jobType) { this.jobType = jobType; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getStartedAt() { return startedAt; }
    public void setStartedAt(LocalDateTime startedAt) { this.startedAt = startedAt; }
    public LocalDateTime getFinishedAt() { return finishedAt; }
    public void setFinishedAt(LocalDateTime finishedAt) { this.finishedAt = finishedAt; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
} 