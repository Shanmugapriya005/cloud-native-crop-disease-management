package com.cropcare.mlservice.service;

import com.cropcare.mlservice.model.RemedyResponse;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class RemedyService {

    private static final Map<String, RemedyResponse> REMEDIES = new HashMap<>();

    static {
        REMEDIES.put("bacterial spot", new RemedyResponse(
            "Bacterial Spot",
            "Apply copper-based bactericides. Remove and destroy infected leaves immediately.",
            "Use disease-free seeds. Avoid overhead irrigation. Rotate crops every season.",
            "Copper hydroxide or Bordeaux mixture",
            "Mix 2g per litre of water and spray every 7–10 days during wet seasons."
        ));

        REMEDIES.put("early blight", new RemedyResponse(
            "Early Blight",
            "Apply fungicides containing chlorothalonil or mancozeb. Remove lower infected leaves.",
            "Maintain plant spacing for airflow. Avoid wetting foliage. Use mulch to reduce splash.",
            "Neem oil spray (2% solution)",
            "Spray neem oil solution every 7 days, especially after rain. Cover leaf undersides."
        ));

        REMEDIES.put("late blight", new RemedyResponse(
            "Late Blight",
            "Apply systemic fungicides like metalaxyl or cymoxanil immediately. Destroy infected plants.",
            "Plant resistant varieties. Avoid dense planting. Monitor humidity levels closely.",
            "Copper-based fungicide (copper oxychloride)",
            "Apply at first sign of infection. Spray every 5–7 days in high-humidity conditions."
        ));

        REMEDIES.put("healthy", new RemedyResponse(
            "Healthy",
            "No treatment needed. Plant appears healthy.",
            "Continue regular watering, fertilization, and monitoring for early signs of disease.",
            "None required",
            "Maintain current care routine."
        ));
    }

    public RemedyResponse getRemedy(String disease) {
        String key = disease.toLowerCase().trim();
        return REMEDIES.getOrDefault(key, new RemedyResponse(
            disease,
            "Consult a local agricultural expert for specific treatment.",
            "Practice crop rotation and use certified disease-free seeds.",
            "Neem oil or copper-based spray",
            "Follow manufacturer instructions on the product label."
        ));
    }
}
