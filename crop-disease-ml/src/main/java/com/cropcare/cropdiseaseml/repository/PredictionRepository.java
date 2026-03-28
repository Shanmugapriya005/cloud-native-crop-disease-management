package com.cropcare.cropdiseaseml.repository;

import com.cropcare.cropdiseaseml.ml.model.PredictionHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PredictionRepository
        extends MongoRepository<PredictionHistory, String> {

    List<PredictionHistory> findByUserEmail(String userEmail);
}
