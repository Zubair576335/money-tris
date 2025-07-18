package com.demo.Expense.Controller;

import com.demo.Expense.Model.JobRun;
import com.demo.Expense.Service.JobService;
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

import java.time.LocalDateTime;
import java.util.Collections;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(
    controllers = JobController.class,
    excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = com.demo.Expense.Config.SecurityConfig.class)
)
@AutoConfigureMockMvc(addFilters = false)
public class JobControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JobService jobService;

    @Test
    public void testTriggerBudgetCheck() throws Exception {
        JobRun run = new JobRun();
        run.setId(1L);
        run.setJobType("BUDGET_CHECK");
        run.setStatus("SUCCESS");
        run.setStartedAt(LocalDateTime.now());
        run.setFinishedAt(LocalDateTime.now());
        run.setMessage("Budget check complete.");

        Mockito.when(jobService.triggerBudgetCheck()).thenReturn(run);

        mockMvc.perform(post("/api/jobs/trigger-budget-check")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.jobType").value("BUDGET_CHECK"))
                .andExpect(jsonPath("$.status").value("SUCCESS"));
    }

    @Test
    public void testTriggerBudgetCheckFailure() throws Exception {
        Mockito.when(jobService.triggerBudgetCheck()).thenThrow(new RuntimeException("Job failed"));

        mockMvc.perform(post("/api/jobs/trigger-budget-check")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is5xxServerError());
    }

    @Test
    public void testGetJobHistory() throws Exception {
        JobRun run = new JobRun();
        run.setId(1L);
        run.setJobType("BUDGET_CHECK");
        run.setStatus("SUCCESS");
        run.setStartedAt(LocalDateTime.now());
        run.setFinishedAt(LocalDateTime.now());
        run.setMessage("Budget check complete.");

        Mockito.when(jobService.getJobHistory()).thenReturn(Collections.singletonList(run));

        mockMvc.perform(get("/api/jobs/history")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].jobType").value("BUDGET_CHECK"));
    }
}