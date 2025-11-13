package com.example.station_management.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.station_management.model.dto.StationEnergyLogRequest;
import com.example.station_management.model.dto.StationEnergyLogResponse;
import com.example.station_management.model.entity.StationEnergyLog;
import com.example.station_management.service.StationEnergyLogService;

@RestController
@RequestMapping("/api/energy-logs")
@CrossOrigin(origins = "*")
public class StationEnergyLogController {
    
    @Autowired
    private StationEnergyLogService energyLogService;
    
    @GetMapping
    public ResponseEntity<List<StationEnergyLogResponse>> getAllLogs() {
        List<StationEnergyLogResponse> logs = energyLogService.findAll()
                .stream()
                .map(StationEnergyLogResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(logs);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<StationEnergyLogResponse> getLogById(@PathVariable String id) {
        return energyLogService.findById(id)
                .map(log -> ResponseEntity.ok(new StationEnergyLogResponse(log)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<StationEnergyLogResponse> createLog(@RequestBody StationEnergyLogRequest request) {
        // Cần thêm logic để chuyển từ Request -> Entity
        // Giả sử có service để xử lý conversion
        StationEnergyLog log = convertToEntity(request);
        StationEnergyLog savedLog = energyLogService.save(log);
        return ResponseEntity.ok(new StationEnergyLogResponse(savedLog));
    }
    
    @GetMapping("/station/{stationId}")
    public ResponseEntity<List<StationEnergyLogResponse>> getLogsByStation(@PathVariable String stationId) {
        List<StationEnergyLogResponse> logs = energyLogService.findByStationId(stationId)
                .stream()
                .map(StationEnergyLogResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(logs);
    }
    
    @GetMapping("/date-range")
    public ResponseEntity<List<StationEnergyLogResponse>> getLogsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        
        List<StationEnergyLogResponse> logs = energyLogService.findByDateRange(start, end)
                .stream()
                .map(StationEnergyLogResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(logs);
    }
    
    @GetMapping("/station/{stationId}/total-energy")
    public ResponseEntity<Double> getTotalEnergyConsumption(@PathVariable String stationId) {
        Double totalEnergy = energyLogService.getTotalEnergyConsumption(stationId);
        return ResponseEntity.ok(totalEnergy != null ? totalEnergy : 0.0);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLog(@PathVariable String id) {
        energyLogService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    private StationEnergyLog convertToEntity(StationEnergyLogRequest request) {
        // Cần inject StationService để lấy Station entity
        // Đây là logic mẫu
        StationEnergyLog log = new StationEnergyLog();
        // log.setStation(stationService.findById(request.getStationId()));
        log.setEnergyConsumed(request.getEnergyConsumed());
        log.setPowerDemand(request.getPowerDemand());
        log.setVoltage(request.getVoltage());
        log.setCurrent(request.getCurrent());
        log.setLoggedAt(request.getLoggedAt());
        log.setTimeSlot(request.getTimeSlot());
        return log;
    }
}
