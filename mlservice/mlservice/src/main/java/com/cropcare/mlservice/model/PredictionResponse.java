package com.cropcare.mlservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PredictionResponse {
    private String crop;
    private String disease;
    private String severity;
    private double confidence;
}
