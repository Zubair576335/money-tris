package com.demo.Expense.Service;

import com.demo.Expense.Model.Expense;
import com.demo.Expense.Model.Report;
import com.demo.Expense.Model.User;
import com.demo.Expense.Repository.ExpenseRepository;
import com.demo.Expense.Repository.ReportRepository;
import com.demo.Expense.Repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class ReportServiceTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private ExpenseRepository expenseRepository;
    @Mock
    private ReportRepository reportRepository;

    @InjectMocks
    private ReportService reportService;

    public ReportServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGenerateWeeklyReportsCreatesReport() {
        User user = new User("testuser", "pass", "test@example.com");
        user.setId(1L);
        Expense expense = new Expense();
        expense.setId(1L);
        expense.setAmount(50.0);
        expense.setCategory(null);
        expense.setDate(LocalDate.now());

        when(userRepository.findAll()).thenReturn(Collections.singletonList(user));
        when(expenseRepository.findByUserAndDateBetween(any(), any(), any()))
                .thenReturn(Collections.singletonList(expense));

        reportService.generateWeeklyReports();

        verify(reportRepository, atLeastOnce()).save(any(Report.class));
    }
} 