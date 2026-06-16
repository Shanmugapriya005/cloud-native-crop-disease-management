package com.cropcare.mlservice.controller;

import com.cropcare.mlservice.model.PredictionResponse;
import com.cropcare.mlservice.service.PredictionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/predict")
@CrossOrigin(origins = "*")
public class PredictionController {

    private final PredictionService predictionService;

    public PredictionController(PredictionService predictionService) {
        this.predictionService = predictionService;
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> predict(@RequestParam("file") MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest()
                .body(Map.of("error", "No image file provided. Send a 'file' field."));
        }

        try {
            PredictionResponse response = predictionService.predict(file);
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(503)
                .body(Map.of("error", "ML model not ready: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                .body(Map.of("error", "Prediction failed: " + e.getMessage()));
        }
    }
}
