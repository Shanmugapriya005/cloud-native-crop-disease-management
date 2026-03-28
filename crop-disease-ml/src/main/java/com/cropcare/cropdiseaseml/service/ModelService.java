package com.cropcare.cropdiseaseml.service;

import com.cropcare.cropdiseaseml.api.PredictionResponse;
import com.cropcare.cropdiseaseml.ml.model.PredictionHistory;
import com.cropcare.cropdiseaseml.ml.prediction.ImagePredictor;
import com.cropcare.cropdiseaseml.repository.PredictionRepository;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class ModelService {

    private final ImagePredictor predictor;
    private final PredictionRepository repository;

    public ModelService(PredictionRepository repository) throws Exception {
        this.predictor = new ImagePredictor();
        this.repository = repository;
    }

    public PredictionResponse predict(File file, String userEmail) throws Exception {

        String[] result = predictor.predict(file);

        String fullLabel = result[0];
        double confidence = Double.parseDouble(result[1]);

        String[] parts = fullLabel.split("_");

        String crop = parts[0];
        String disease = parts.length > 2
                ? parts[1] + " " + parts[2]
                : parts[1];

        String severity;
        if (confidence > 85) {
            severity = "HIGH";
        } else if (confidence > 60) {
            severity = "MEDIUM";
        } else {
            severity = "LOW";
        }

        // ✅ Save to MongoDB
        PredictionHistory history = new PredictionHistory(
                userEmail,
                crop,
                disease,
                severity,
                confidence
        );

        repository.save(history);

        return new PredictionResponse(
                crop,
                disease,
                severity,
                confidence
        );
    }
}
