package com.CityGuard.controller;

import com.CityGuard.model.Issue;
import com.CityGuard.repository.IssueRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Collections;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class IssueControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private IssueRepository issueRepository;

    @Test
    void testGetAllIssues() throws Exception {
        Issue issue = new Issue(
                "Pothole",
                "Road",
                null,
                12.34, 56.78,
                "Pending",
                "user1",
                LocalDateTime.now(),
                "Medium"
        );

        issueRepository.save(issue);

        mockMvc.perform(get("/api/issues"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$[0].description").value("Pothole"));
    }
}
