package com.cropcare.cropdiseaseml.controller;

import com.cropcare.cropdiseaseml.model.Remedy;
import com.cropcare.cropdiseaseml.service.RemedyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/remedies")
@CrossOrigin
public class RemedyController {

    private final RemedyService service;

    public RemedyController(RemedyService service) {
        this.service = service;
    }

    // Add remedy
    @PostMapping
    public Remedy addRemedy(@RequestBody Remedy remedy) {
        return service.saveRemedy(remedy);
    }

    // Get remedy by disease
    @GetMapping("/{disease}")
public Remedy getRemedy(@PathVariable String disease) {
    return service.getRemedyByDisease(disease);
}
    // Get all remedies
    @GetMapping
    public List<Remedy> getAllRemedies() {
        return service.getAllRemedies();
    }

    // Delete remedy
    @DeleteMapping("/{id}")
    public void deleteRemedy(@PathVariable String id) {
        service.deleteRemedy(id);
    }
}