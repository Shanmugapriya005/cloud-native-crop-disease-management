package com.cropcare.cropdiseaseml.ml.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "prediction_history")
public class PredictionHistory {

    @Id
    private String id;

    private String userEmail;
    private String crop;
    private String disease;
    private String severity;
    private double confidence;
    private LocalDateTime timestamp;

    // ✅ Constructor matching ModelService
    public PredictionHistory(String userEmail,
                             String crop,
                             String disease,
                             String severity,
                             double confidence) {
        this.userEmail = userEmail;
        this.crop = crop;
        this.disease = disease;
        this.severity = severity;
        this.confidence = confidence;
        this.timestamp = LocalDateTime.now();
    }

    // Required empty constructor
    public PredictionHistory() {
    }

    // Getters
    public String getId() { return id; }
    public String getUserEmail() { return userEmail; }
    public String getCrop() { return crop; }
    public String getDisease() { return disease; }
    public String getSeverity() { return severity; }
    public double getConfidence() { return confidence; }
    public LocalDateTime getTimestamp() { return timestamp; }
}
