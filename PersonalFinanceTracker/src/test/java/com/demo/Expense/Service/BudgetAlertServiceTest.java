package com.demo.Expense.Service;

import com.demo.Expense.Model.Budget;
import com.demo.Expense.Model.Expense;
import com.demo.Expense.Model.User;
import com.demo.Expense.Repository.BudgetRepository;
import com.demo.Expense.Repository.ExpenseRepository;
import com.demo.Expense.Repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class BudgetAlertServiceTest {
    @Mock
    private BudgetRepository budgetRepository;
    @Mock
    private ExpenseRepository expenseRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private JavaMailSender mailSender;

    @InjectMocks
    private BudgetAlertService budgetAlertService;

    public BudgetAlertServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testRunBudgetCheckSendsEmail() {
        User user = new User("testuser", "pass", "test@example.com");
        user.setId(1L);
        Budget budget = new Budget(user, null, 100.0, 7, 2025);
        budget.setCategory(new com.demo.Expense.Model.Category(user, "Food"));
        budget.setId(1L);

        when(userRepository.findAll()).thenReturn(Collections.singletonList(user));
        when(budgetRepository.findByUserAndMonthAndYear(any(), anyInt(), anyInt()))
                .thenReturn(Collections.singletonList(budget));
        Expense expense = new Expense();
        expense.setCategory(budget.getCategory());
        expense.setAmount(95.0);
        expense.setDate(java.time.LocalDate.now());
        when(expenseRepository.findAll()).thenReturn(Collections.singletonList(expense));

        budgetAlertService.runBudgetCheck();

        verify(mailSender, atLeastOnce()).send(any(SimpleMailMessage.class));
    }
} 