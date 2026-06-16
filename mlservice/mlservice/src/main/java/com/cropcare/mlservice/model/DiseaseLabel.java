package com.cropcare.mlservice.model;

import java.util.List;

/**
 * Maps class index to disease metadata.
 * Order matches synset.txt / class_mapping.json from training.
 */
public class DiseaseLabel {

    public record Label(String crop, String disease, String severity) {}

    // Must match exact order in synset.txt
    public static final List<Label> LABELS = List.of(
        new Label("Pepper Bell", "Bacterial Spot", "HIGH"),   // 0 Pepper__bell___Bacterial_spot
        new Label("Pepper Bell", "Healthy",         "LOW"),   // 1 Pepper__bell___healthy
        new Label("Potato",      "Early Blight",    "MEDIUM"),// 2 Potato___Early_blight
        new Label("Potato",      "Late Blight",     "HIGH"),  // 3 Potato___Late_blight
        new Label("Potato",      "Healthy",          "LOW"),  // 4 Potato___healthy
        new Label("Tomato",      "Early Blight",    "MEDIUM"),// 5 Tomato_Early_blight
        new Label("Tomato",      "Late Blight",     "HIGH"),  // 6 Tomato_Late_blight
        new Label("Tomato",      "Healthy",          "LOW")   // 7 Tomato_healthy
    );

    public static Label get(int index) {
        if (index < 0 || index >= LABELS.size()) {
            return new Label("Unknown", "Unknown", "LOW");
        }
        return LABELS.get(index);
    }
}
