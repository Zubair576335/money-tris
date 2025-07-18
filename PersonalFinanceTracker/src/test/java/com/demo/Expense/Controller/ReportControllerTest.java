package com.demo.Expense.Controller;

import com.demo.Expense.Model.Report;
import com.demo.Expense.Model.User;
import com.demo.Expense.Service.ReportService;
import com.demo.Expense.Repository.UserRepository;
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
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(
    controllers = ReportController.class,
    excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = com.demo.Expense.Config.SecurityConfig.class)
)
@AutoConfigureMockMvc(addFilters = false)
public class ReportControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReportService reportService;
    @MockBean
    private UserRepository userRepository;

    @Test
    public void testGetReports() throws Exception {
        User user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        user.setPassword("pass");
        user.setEmail("test@example.com");

        Report report = new Report();
        report.setId(1L);
        report.setFilename("weekly_report.csv");
        report.setGeneratedAt(LocalDateTime.now());
        report.setPath("/tmp/weekly_report.csv");
        report.setUser(user);

        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        Mockito.when(reportService.getReportsByUser(user)).thenReturn(Collections.singletonList(report));

        mockMvc.perform(get("/api/reports?userId=1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].filename").value("weekly_report.csv"));
    }

    @Test
    public void testDownloadReportNotFound() throws Exception {
        Mockito.when(reportService.getReportById(99L)).thenReturn(null);
        mockMvc.perform(get("/api/reports/download/99")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testTriggerWeeklyReport() throws Exception {
        Mockito.when(reportService.triggerWeeklyReportGeneration()).thenReturn("Weekly report generation triggered.");
        mockMvc.perform(post("/api/reports/trigger")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("Weekly report generation triggered."));
    }
}
