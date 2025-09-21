package com.CityGuard.controller;

import com.CityGuard.model.Issue;
import com.CityGuard.repository.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/issues") // Allow frontend on localhost:3000
public class IssueController {

    @Autowired
    private IssueRepository issueRepository;

    // -----------------------------
    // GET all issues
    // -----------------------------
    @GetMapping
    public List<Issue> getAllIssues() {
    return issueRepository.findTop20ByOrderBySubmittedOnDesc();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Issue> getIssueById(@PathVariable Long id) {
        return issueRepository.findById(id)
                .map(issue -> ResponseEntity.ok(issue))
                .orElse(ResponseEntity.notFound().build());
    }

    // -----------------------------
    // POST a new issue
    // -----------------------------
    @PostMapping
    public Issue createIssue(@RequestBody Issue issue) {

        // Set submitted timestamp if not already set
        if (issue.getSubmittedOn() == null) {
            issue.setSubmittedOn(LocalDateTime.now());
        }

        // Simple AI severity classification (can replace with real AI later)
        String severity = classifySeverity(issue.getDescription(), issue.getCategory());
        issue.setSeverity(severity);

        // Set default status if not provided
        if (issue.getStatus() == null || issue.getStatus().isEmpty()) {
            issue.setStatus("Submitted");
        }

        return issueRepository.save(issue);
    }

    // -----------------------------
    // Simple AI severity classifier stub
    // -----------------------------
    private String classifySeverity(String description, String category) {
        // Example logic: you can replace this with a real ML/AI model
        if (category.equalsIgnoreCase("Pothole") && description.length() > 50) {
            return "High";
        } else if (category.equalsIgnoreCase("Water Leakage")) {
            return "Medium";
        } else if (category.equalsIgnoreCase("Broken Streetlight")) {
            return "Low";
        }
        return "Low"; // default
    }
}
