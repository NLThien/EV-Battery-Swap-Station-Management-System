package com.example.station_management.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.station_management.model.dto.StationAlertRequest;
import com.example.station_management.model.dto.StationAlertResponse;
import com.example.station_management.model.entity.StationAlert;
import com.example.station_management.service.StationAlertService;
import com.example.station_management.service.StationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "*")
public class StationAlertController {

    @Autowired
    private StationAlertService alertService;

    @Autowired
    private StationService stationService;

    @GetMapping
    public ResponseEntity<List<StationAlertResponse>> getAllAlerts() {
        List<StationAlertResponse> alerts = alertService.findAll()
                .stream()
                .map(StationAlertResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(alerts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StationAlertResponse> getAlertById(@PathVariable String id) {
        return alertService.findById(id)
                .map(alert -> ResponseEntity.ok(new StationAlertResponse(alert)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/station/{stationId}")
    public ResponseEntity<List<StationAlertResponse>> getAlertsByStation(@PathVariable String stationId) {
        List<StationAlertResponse> alerts = alertService.findByStationId(stationId)
                .stream()
                .map(StationAlertResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(alerts);
    }

    @GetMapping("/station/{stationId}/active")
    public ResponseEntity<List<StationAlertResponse>> getActiveAlertsByStation(@PathVariable String stationId) {
        List<StationAlertResponse> alerts = alertService.findActiveAlertsByStation(stationId)
                .stream()
                .map(StationAlertResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(alerts);
    }

    @GetMapping("/critical/active")
    public ResponseEntity<List<StationAlertResponse>> getCriticalActiveAlerts() {
        List<StationAlertResponse> alerts = alertService.findCriticalActiveAlerts()
                .stream()
                .map(StationAlertResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(alerts);
    }

    @GetMapping("/type/{alertType}")
    public ResponseEntity<List<StationAlertResponse>> getAlertsByType(@PathVariable StationAlert.AlertType alertType) {
        List<StationAlertResponse> alerts = alertService.findByAlertType(alertType)
                .stream()
                .map(StationAlertResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(alerts);
    }

    @GetMapping("/severity/{severity}")
    public ResponseEntity<List<StationAlertResponse>> getAlertsBySeverity(@PathVariable StationAlert.AlertSeverity severity) {
        List<StationAlertResponse> alerts = alertService.findBySeverity(severity)
                .stream()
                .map(StationAlertResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(alerts);
    }

    @PostMapping
    public ResponseEntity<StationAlertResponse> createAlert(@Valid @RequestBody StationAlertRequest request) {
        StationAlert alert = convertToEntity(request);
        StationAlert savedAlert = alertService.createAlert(alert);
        return ResponseEntity.ok(new StationAlertResponse(savedAlert));
    }

    @PatchMapping("/{id}/acknowledge")
    public ResponseEntity<StationAlertResponse> acknowledgeAlert(
            @PathVariable String id,
            @RequestParam String acknowledgedBy) {
        
        try {
            StationAlert updatedAlert = alertService.acknowledgeAlert(id, acknowledgedBy);
            return ResponseEntity.ok(new StationAlertResponse(updatedAlert));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/resolve")
    public ResponseEntity<StationAlertResponse> resolveAlert(
            @PathVariable String id,
            @RequestParam String resolvedBy,
            @RequestParam(required = false) String resolutionNotes) {
        
        try {
            StationAlert updatedAlert = alertService.resolveAlert(id, resolvedBy, resolutionNotes);
            return ResponseEntity.ok(new StationAlertResponse(updatedAlert));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/station/{stationId}/count")
    public ResponseEntity<Long> getActiveAlertCount(@PathVariable String stationId) {
        Long count = alertService.getActiveAlertCount(stationId);
        return ResponseEntity.ok(count);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlert(@PathVariable String id) {
        alertService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private StationAlert convertToEntity(StationAlertRequest request) {
        StationAlert alert = new StationAlert();
        
        alert.setAlertType(request.getAlertType());
        alert.setSeverity(request.getSeverity());
        alert.setTitle(request.getTitle());
        alert.setDescription(request.getDescription());
        alert.setMetricName(request.getMetricName());
        alert.setCurrentValue(request.getCurrentValue());
        alert.setThresholdValue(request.getThresholdValue());
        alert.setUnit(request.getUnit());
        
        // Set station
        alert.setStation(stationService.findById(request.getStationId())
                .orElseThrow(() -> new RuntimeException("Station not found with id: " + request.getStationId())));
        
        // Đặt thời gian kích hoạt
        if (request.getTriggeredAt() != null) {
            alert.setTriggeredAt(request.getTriggeredAt());
        }
        
        return alert;
    }
}