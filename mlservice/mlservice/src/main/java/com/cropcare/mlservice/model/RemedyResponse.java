package com.cropcare.mlservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RemedyResponse {
    private String disease;
    private String remedy;
    private String prevention;
    private String organicPesticide;
    private String howToUse;
}
