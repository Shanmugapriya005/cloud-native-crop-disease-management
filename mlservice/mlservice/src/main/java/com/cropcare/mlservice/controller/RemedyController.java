package com.cropcare.mlservice.controller;

import com.cropcare.mlservice.model.RemedyResponse;
import com.cropcare.mlservice.service.RemedyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/remedies")
@CrossOrigin(origins = "*")
public class RemedyController {

    private final RemedyService remedyService;

    public RemedyController(RemedyService remedyService) {
        this.remedyService = remedyService;
    }

    @GetMapping("/{disease}")
    public ResponseEntity<RemedyResponse> getRemedy(@PathVariable String disease) {
        RemedyResponse remedy = remedyService.getRemedy(disease);
        return ResponseEntity.ok(remedy);
    }
}
