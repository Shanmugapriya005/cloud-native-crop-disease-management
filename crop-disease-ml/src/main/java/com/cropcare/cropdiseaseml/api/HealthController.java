package com.cropcare.cropdiseaseml.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/")
    public String health() {
        return "Crop Disease Detection API Running 🚀";
    }
}
