package com.CityGuard.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "issues")
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private String category;
    private String photoUrl;

    // Location fields
    private double latitude;
    private double longitude;

    private String status;
    private String submittedBy;

    private LocalDateTime submittedOn;

    private String severity; // Low / Medium / High

    // Constructors
    public Issue() {}

    public Issue(String description, String category, String photoUrl,
                 double latitude, double longitude, String status,
                 String submittedBy, LocalDateTime submittedOn, String severity) {
        this.description = description;
        this.category = category;
        this.photoUrl = photoUrl;
        this.latitude = latitude;
        this.longitude = longitude;
        this.status = status;
        this.submittedBy = submittedBy;
        this.submittedOn = submittedOn;
        this.severity = severity;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getSubmittedBy() { return submittedBy; }
    public void setSubmittedBy(String submittedBy) { this.submittedBy = submittedBy; }

    public LocalDateTime getSubmittedOn() { return submittedOn; }
    public void setSubmittedOn(LocalDateTime submittedOn) { this.submittedOn = submittedOn; }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }
}
