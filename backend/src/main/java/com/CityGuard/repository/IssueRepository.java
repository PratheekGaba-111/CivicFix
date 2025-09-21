package com.CityGuard.repository;

import com.CityGuard.model.Issue;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {

    List<Issue> findTop20ByOrderBySubmittedOnDesc();
    // Optional: custom query methods
}
