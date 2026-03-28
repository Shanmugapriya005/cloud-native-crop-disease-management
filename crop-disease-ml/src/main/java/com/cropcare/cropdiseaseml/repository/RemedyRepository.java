package com.cropcare.cropdiseaseml.repository;

import com.cropcare.cropdiseaseml.model.Remedy;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RemedyRepository extends MongoRepository<Remedy, String> {

    Optional<Remedy> findByDiseaseContainingIgnoreCase(String disease);

}