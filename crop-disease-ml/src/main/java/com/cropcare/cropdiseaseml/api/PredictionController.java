package com.cropcare.cropdiseaseml.api;

import com.cropcare.cropdiseaseml.service.ModelService;
import com.cropcare.cropdiseaseml.repository.PredictionRepository;
import com.cropcare.cropdiseaseml.ml.model.PredictionHistory;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PredictionController {

    private final ModelService modelService;
    private final PredictionRepository repository;

    public PredictionController(ModelService modelService,
                                PredictionRepository repository) {
        this.modelService = modelService;
        this.repository = repository;
    }

    // ==============================
    // ✅ PREDICT API
    // ==============================
    @PostMapping(value = "/predict", consumes = "multipart/form-data")
    public ResponseEntity<PredictionResponse> predict(
            @RequestPart("file") MultipartFile file) throws Exception {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        File tempFile = File.createTempFile("upload", ".jpg");
        file.transferTo(tempFile);

        try {
            String userEmail = "demo@gmail.com"; // later replace with logged user

            PredictionResponse response =
                    modelService.predict(tempFile, userEmail);

            return ResponseEntity.ok(response);

        } finally {
            tempFile.delete(); // always delete file
        }
    }

    // ==============================
    // ✅ HISTORY API (Better Version)
    // ==============================
    @GetMapping("/history/{email}")
    public List<PredictionHistory> getUserHistory(
            @PathVariable String email) {

        return repository.findByUserEmail(email);
    }
}
