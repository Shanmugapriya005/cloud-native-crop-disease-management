package com.cropcare.cropdiseaseml.api;

public class PredictionResponse {

    private String crop;
    private String disease;
    private String severity;
    private double confidence;

    public PredictionResponse(String crop, String disease, String severity, double confidence) {
        this.crop = crop;
        this.disease = disease;
        this.severity = severity;
        this.confidence = confidence;
    }

    public String getCrop() {
        return crop;
    }

    public String getDisease() {
        return disease;
    }

    public String getSeverity() {
        return severity;
    }

    public double getConfidence() {
        return confidence;
    }
}
