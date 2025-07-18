package com.demo.Expense.Controller;

import com.demo.Expense.Model.Budget;
import com.demo.Expense.Model.User;
import com.demo.Expense.Model.Category;
import com.demo.Expense.Repository.BudgetRepository;
import com.demo.Expense.Repository.UserRepository;
import com.demo.Expense.Repository.CategoryRepository;
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

import java.util.Collections;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(
    controllers = BudgetController.class,
    excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = com.demo.Expense.Config.SecurityConfig.class)
)
@AutoConfigureMockMvc(addFilters = false)
public class BudgetControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BudgetRepository budgetRepository;
    @MockBean
    private UserRepository userRepository;
    @MockBean
    private CategoryRepository categoryRepository;

    @Test
    public void testGetBudgets() throws Exception {
        User user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        user.setPassword("pass");
        user.setEmail("test@example.com");

        Category category = new Category();
        category.setId(2L);
        category.setName("Food");
        category.setUser(user);

        Budget budget = new Budget();
        budget.setId(1L);
        budget.setUser(user);
        budget.setCategory(category);
        budget.setAmount(500.0);
        budget.setMonth(7);
        budget.setYear(2025);

        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        Mockito.when(budgetRepository.findByUser(user)).thenReturn(Collections.singletonList(budget));

        mockMvc.perform(get("/api/budgets?userId=1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].amount").value(500.0))
                .andExpect(jsonPath("$[0].categoryId").value(2))
                .andExpect(jsonPath("$[0].categoryName").value("Food"));
    }
}

