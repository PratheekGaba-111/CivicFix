package com.CityGuard.repository;

import com.CityGuard.model.Issue;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class IssueRepositoryTest {

    @Autowired
    private IssueRepository issueRepository;

    @Test
    void testSaveAndFind() {
        Issue issue = new Issue(
                "Pothole on Main St",
                "Road",
                null,
                12.34, 56.78,
                "Pending",
                "user1",
                LocalDateTime.now(),
                "Medium"
        );

        issueRepository.save(issue);

        List<Issue> issues = issueRepository.findAll();
        assertThat(issues).isNotEmpty();
        assertThat(issues.get(0).getDescription()).isEqualTo("Pothole on Main St");
    }
}
