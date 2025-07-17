package com.demo.Expense.Controller;

import com.demo.Expense.Model.Report;
import com.demo.Expense.Model.User;
import com.demo.Expense.Repository.UserRepository;
import com.demo.Expense.Service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET})
@RestController
@RequestMapping("/api/reports")
public class ReportController {
    @Autowired
    private ReportService reportService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Report>> getReports(@RequestParam Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(reportService.getReportsByUser(user));
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadReport(@PathVariable Long id) {
        Report report = reportService.getReportById(id);
        if (report == null) return ResponseEntity.notFound().build();
        File file = new File(report.getPath());
        if (!file.exists()) return ResponseEntity.notFound().build();
        Resource resource = new FileSystemResource(file);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + report.getFilename() + "\"")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(resource);
    }

    @PostMapping("/trigger")
    public ResponseEntity<String> triggerWeeklyReport() {
        String result = reportService.triggerWeeklyReportGeneration();
        return ResponseEntity.ok(result);
    }
} 