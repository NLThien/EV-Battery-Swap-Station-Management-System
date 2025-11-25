package com.example.station_management.controller;

import java.time.LocalDateTime;
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
import org.springframework.web.bind.annotation.RestController;

import com.example.station_management.model.dto.ChargingSessionRequest;
import com.example.station_management.model.dto.ChargingSessionResponse;
import com.example.station_management.model.dto.CompleteSessionRequest;
import com.example.station_management.model.entity.ChargingSession;
import com.example.station_management.service.ChargingSessionService;
import com.example.station_management.service.StationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/charging-sessions")
@CrossOrigin(origins = "*")
public class ChargingSessionController {
    @Autowired
    private ChargingSessionService sessionService;

    @Autowired
    private StationService stationService;

    @GetMapping
    public ResponseEntity<List<ChargingSessionResponse>> getAllSessions() {
        List<ChargingSessionResponse> sessions = sessionService.findAll()
                .stream()
                .map(ChargingSessionResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(sessions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChargingSessionResponse> getSessionById(@PathVariable String id) {
        return sessionService.findById(id)
                .map(session -> ResponseEntity.ok(new ChargingSessionResponse(session)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/station/{stationId}")
    public ResponseEntity<List<ChargingSessionResponse>> getSessionsByStation(@PathVariable String stationId) {
        List<ChargingSessionResponse> sessions = sessionService.findByStationId(stationId)
                .stream()
                .map(ChargingSessionResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(sessions);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ChargingSessionResponse>> getSessionsByUser(@PathVariable String userId) {
        List<ChargingSessionResponse> sessions = sessionService.findByUserId(userId)
                .stream()
                .map(ChargingSessionResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(sessions);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ChargingSessionResponse>> getSessionsByStatus(@PathVariable ChargingSession.ChargingStatus status) {
        List<ChargingSessionResponse> sessions = sessionService.findByStatus(status)
                .stream()
                .map(ChargingSessionResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(sessions);
    }

    @GetMapping("/station/{stationId}/active")
    public ResponseEntity<List<ChargingSessionResponse>> getActiveSessionsByStation(@PathVariable String stationId) {
        List<ChargingSessionResponse> sessions = sessionService.findActiveSessionsByStation(stationId)
                .stream()
                .map(ChargingSessionResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(sessions);
    }

    @GetMapping("/user/{userId}/active")
    public ResponseEntity<List<ChargingSessionResponse>> getActiveSessionsByUser(@PathVariable String userId) {
        List<ChargingSessionResponse> sessions = sessionService.findActiveSessionsByUser(userId)
                .stream()
                .map(ChargingSessionResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(sessions);
    }

    @PostMapping
    public ResponseEntity<ChargingSessionResponse> startSession(@Valid @RequestBody ChargingSessionRequest request) {
        ChargingSession session = convertToEntity(request);
        ChargingSession savedSession = sessionService.createSession(session);
        return ResponseEntity.ok(new ChargingSessionResponse(savedSession));
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<ChargingSessionResponse> completeSession(
            @PathVariable String id,
            @Valid @RequestBody CompleteSessionRequest request) {
        
        try {
            ChargingSession updatedSession = sessionService.completeSession(
                id, request.getEndBatteryLevel(), request.getEnergyDelivered());
            return ResponseEntity.ok(new ChargingSessionResponse(updatedSession));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<ChargingSessionResponse> cancelSession(@PathVariable String id) {
        try {
            ChargingSession updatedSession = sessionService.cancelSession(id);
            return ResponseEntity.ok(new ChargingSessionResponse(updatedSession));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/pause")
    public ResponseEntity<ChargingSessionResponse> pauseSession(@PathVariable String id) {
        try {
            ChargingSession updatedSession = sessionService.pauseSession(id);
            return ResponseEntity.ok(new ChargingSessionResponse(updatedSession));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/resume")
    public ResponseEntity<ChargingSessionResponse> resumeSession(@PathVariable String id) {
        try {
            ChargingSession updatedSession = sessionService.resumeSession(id);
            return ResponseEntity.ok(new ChargingSessionResponse(updatedSession));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/station/{stationId}/energy")
    public ResponseEntity<Double> getTotalEnergyDelivered(@PathVariable String stationId) {
        Double totalEnergy = sessionService.getTotalEnergyDelivered(stationId);
        return ResponseEntity.ok(totalEnergy);
    }

    @GetMapping("/station/{stationId}/revenue")
    public ResponseEntity<Double> getTotalRevenue(@PathVariable String stationId) {
        Double totalRevenue = sessionService.getTotalRevenue(stationId);
        return ResponseEntity.ok(totalRevenue);
    }

    @GetMapping("/station/{stationId}/active-count")
    public ResponseEntity<Long> getActiveSessionCount(@PathVariable String stationId) {
        Long count = sessionService.getActiveSessionCount(stationId);
        return ResponseEntity.ok(count);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSession(@PathVariable String id) {
        sessionService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private ChargingSession convertToEntity(ChargingSessionRequest request) {
        ChargingSession session = new ChargingSession();
        
        // Set basic properties
        session.setUserId(request.getUserId());
        session.setVehicleType(request.getVehicleType());
        session.setBatteryCapacity(request.getBatteryCapacity());
        session.setStartBatteryLevel(request.getStartBatteryLevel());
        session.setMaxChargingRate(request.getMaxChargingRate());
        
        // Set station
        session.setStation(stationService.findById(request.getStationId())
                .orElseThrow(() -> new RuntimeException("Station not found with id: " + request.getStationId())));
        
        // Set start time
        if (request.getStartTime() != null) {
            session.setStartTime(request.getStartTime());
        } else {
            session.setStartTime(LocalDateTime.now());
        }
        
        return session;
    }
}