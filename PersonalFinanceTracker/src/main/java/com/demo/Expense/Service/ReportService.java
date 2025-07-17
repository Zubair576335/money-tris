package com.demo.Expense.Service;

import com.demo.Expense.Model.Expense;
import com.demo.Expense.Model.Report;
import com.demo.Expense.Model.User;
import com.demo.Expense.Repository.ExpenseRepository;
import com.demo.Expense.Repository.ReportRepository;
import com.demo.Expense.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

@Service
public class ReportService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private ReportRepository reportRepository;

    // Run every Sunday at 6 PM
    @Scheduled(cron = "0 0 18 ? * SUN")
    public void generateWeeklyReports() {
        LocalDate today = LocalDate.now();
        LocalDate weekStart = today.with(TemporalAdjusters.previousOrSame(java.time.DayOfWeek.MONDAY));
        LocalDate weekEnd = today.with(TemporalAdjusters.nextOrSame(java.time.DayOfWeek.SUNDAY));
        List<User> users = userRepository.findAll();
        for (User user : users) {
            List<Expense> expenses = expenseRepository.findByUserAndDateBetween(user, weekStart, weekEnd);
            if (expenses.isEmpty()) continue;
            String filename = String.format("weekly_report_%s_%s.csv", user.getUsername(), today);
            String dirPath = "reports/" + user.getId();
            File dir = new File(dirPath);
            if (!dir.exists()) dir.mkdirs();
            String filePath = dirPath + "/" + filename;
            try (FileWriter writer = new FileWriter(filePath)) {
                writer.write("ID,Amount,Category,Date\n");
                for (Expense e : expenses) {
                    writer.write(String.format("%d,%.2f,%s,%s\n", e.getId(), e.getAmount(), e.getCategory() != null ? e.getCategory().getName() : "", e.getDate()));
                }
            } catch (IOException ex) {
                ex.printStackTrace();
                continue;
            }
            Report report = new Report(filename, LocalDateTime.now(), filePath, user);
            reportRepository.save(report);
        }
    }

    public List<Report> getReportsByUser(User user) {
        return reportRepository.findByUser(user);
    }

    public Report getReportById(Long id) {
        return reportRepository.findById(id).orElse(null);
    }

    public String triggerWeeklyReportGeneration() {
        generateWeeklyReports();
        return "Weekly report generation triggered.";
    }
} 