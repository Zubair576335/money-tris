package com.demo.Expense.Controller;

import com.demo.Expense.Model.Expense;
import com.demo.Expense.Model.User;
import com.demo.Expense.Model.Category;
import com.demo.Expense.Service.ExpenseService;
import com.demo.Expense.Repository.CategoryRepository;
import com.demo.Expense.Repository.UserRepository;
import com.demo.Expense.Repository.BudgetRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(
    controllers = ExpenseController.class,
    excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = com.demo.Expense.Config.SecurityConfig.class)
)
@AutoConfigureMockMvc(addFilters = false)
public class ExpenseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ExpenseService expenseService;
    @MockBean
    private CategoryRepository categoryRepository;
    @MockBean
    private UserRepository userRepository;
    @MockBean
    private BudgetRepository budgetRepository;

    @Test
    public void testGetExpensesByUser() throws Exception {
        User user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        user.setPassword("pass");
        user.setEmail("test@example.com");

        Category category = new Category();
        category.setId(2L);
        category.setName("Food");
        category.setUser(user);

        Expense expense = new Expense();
        expense.setId(1L);
        expense.setAmount(100.0);
        expense.setUser(user);
        expense.setCategory(category);
        expense.setDate(LocalDate.now());

        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        Mockito.when(expenseService.getExpensesByUser(user)).thenReturn(Collections.singletonList(expense));

        mockMvc.perform(get("/api/expenses/user/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].amount").value(100.0))
                .andExpect(jsonPath("$[0].categoryId").value(2))
                .andExpect(jsonPath("$[0].categoryName").value("Food"));
    }
}
