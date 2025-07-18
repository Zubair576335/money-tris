package com.demo.Expense.Controller;

import com.demo.Expense.Model.Category;
import com.demo.Expense.Model.User;
import com.demo.Expense.Repository.CategoryRepository;
import com.demo.Expense.Repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType; // <-- ADD THIS LINE
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(
    controllers = CategoryController.class,
    excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = com.demo.Expense.Config.SecurityConfig.class)
)
@AutoConfigureMockMvc(addFilters = false)
public class CategoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CategoryRepository categoryRepository;

    @MockBean
    private UserRepository userRepository;

    @Test
    public void testGetCategoriesReturnsOk() throws Exception {
        User user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        user.setPassword("pass");
        user.setEmail("test@example.com");

        Category category = new Category();
        category.setId(1L);
        category.setName("TestCategory");
        category.setUser(user);

        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        Mockito.when(categoryRepository.findByUser(user)).thenReturn(Collections.singletonList(category));

        mockMvc.perform(get("/api/categories?userId=1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("TestCategory"))
                .andExpect(jsonPath("$[0].id").value(1));
    }
}


