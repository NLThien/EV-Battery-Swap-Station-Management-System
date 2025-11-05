package com.example.station_management.controller;

import com.example.station_management.model.dto.StationRequest;
import com.example.station_management.model.dto.StationResponse;
import com.example.station_management.service.StationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/stations")
@RequiredArgsConstructor
public class StationController {
    
    private final StationService stationService;
    
    @GetMapping
    public ResponseEntity<List<StationResponse>> getAllStations() {
        return ResponseEntity.ok(stationService.getAllStations());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<StationResponse> getStationById(@PathVariable String id) {
        return ResponseEntity.ok(stationService.getStationById(id));
    }
    
    @PostMapping
    public ResponseEntity<StationResponse> createStation(@Valid @RequestBody StationRequest request) {
        return ResponseEntity.ok(stationService.createStation(request));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<StationResponse> updateStation(
            @PathVariable String id, 
            @Valid @RequestBody StationRequest request) {
        return ResponseEntity.ok(stationService.updateStation(id, request));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStation(@PathVariable String id) {
        stationService.deleteStation(id);
        return ResponseEntity.noContent().build();
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<StationResponse> updateStationStatus(
            @PathVariable String id, 
            @RequestParam String status) {
        return ResponseEntity.ok(stationService.updateStationStatus(id, status));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<StationResponse>> searchStations(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(stationService.searchStations(name, status));
    }
    
    @GetMapping("/manager/{managerId}")
    public ResponseEntity<List<StationResponse>> getStationsByManager(@PathVariable String managerId) {
        return ResponseEntity.ok(stationService.getStationsByManager(managerId));
    }
}