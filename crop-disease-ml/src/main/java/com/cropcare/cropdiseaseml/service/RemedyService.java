package com.cropcare.cropdiseaseml.service;

import com.cropcare.cropdiseaseml.model.Remedy;
import com.cropcare.cropdiseaseml.repository.RemedyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RemedyService {

    private final RemedyRepository repository;

    public RemedyService(RemedyRepository repository) {
        this.repository = repository;
    }

    // Save remedy
    public Remedy saveRemedy(Remedy remedy) {
        return repository.save(remedy);
    }

    // Get remedy by disease
    public Remedy getRemedyByDisease(String disease) {

        // convert CamelCase to spaces
        disease = disease.replaceAll("([a-z])([A-Z])", "$1 $2");

        // replace underscores with spaces
        disease = disease.replace("_", " ");

        // remove crop name if present
        disease = disease.replace("Tomato", "").trim();

        Optional<Remedy> remedy =
                repository.findByDiseaseContainingIgnoreCase(disease);

        return remedy.orElse(null);
    }

    // Get all remedies
    public List<Remedy> getAllRemedies() {
        return repository.findAll();
    }

    // Delete remedy
    public void deleteRemedy(String id) {
        repository.deleteById(id);
    }
}