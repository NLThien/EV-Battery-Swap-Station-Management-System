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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.station_management.model.dto.StationDetaiResponse;
import com.example.station_management.model.dto.StationDetailRequest;
import com.example.station_management.model.entity.Station;
import com.example.station_management.model.entity.StationDetail;
import com.example.station_management.service.StationDetailService;
import com.example.station_management.service.StationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/station-details")
@CrossOrigin(origins = "*")
public class StationDetailController {

    @Autowired
    private StationDetailService stationDetailService;

    @Autowired
    private StationService stationService;
        
    @GetMapping
    public ResponseEntity<List<StationDetaiResponse>> getAllStationDetails() {
        List<StationDetaiResponse> details = stationDetailService.findAll()
                .stream()
                .map(StationDetaiResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(details);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<StationDetaiResponse> getStationDetailById(@PathVariable String id) {
        return stationDetailService.findById(id)
                .map(detail -> ResponseEntity.ok(new StationDetaiResponse(detail)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/station/{stationId}")
    public ResponseEntity<StationDetaiResponse> getStationDetailByStationId(@PathVariable String stationId) {
        return stationDetailService.findByStationId(stationId)
                .map(detail -> ResponseEntity.ok(new StationDetaiResponse(detail)))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/manager/{managerId}")
    public ResponseEntity<List<StationDetaiResponse>> getStationDetailsByManager(@PathVariable String managerId) {
        List<StationDetaiResponse> details = stationDetailService.findByManagerId(managerId)
                .stream()
                .map(StationDetaiResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(details);
    }
    
    @GetMapping("/available-slots")
    public ResponseEntity<List<StationDetaiResponse>> getStationsWithAvailableSlots(
            @RequestParam(defaultValue = "1") Integer minSlots) {
        List<StationDetaiResponse> details = stationDetailService.findStationsWithAvailableSlots(minSlots)
                .stream()
                .map(StationDetaiResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(details);
    }
    
    @PostMapping
    public ResponseEntity<StationDetaiResponse> createStationDetail(@Valid @RequestBody StationDetailRequest request) {
        // Kiểm tra xem station đã có detail chưa
        if (stationDetailService.existsByStationId(request.getStationId())) {
            return ResponseEntity.badRequest().build();
        }
        
        StationDetail stationDetail = convertToEntity(request);
        StationDetail savedDetail = stationDetailService.save(stationDetail);
        return ResponseEntity.ok(new StationDetaiResponse(savedDetail));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<StationDetaiResponse> updateStationDetail(
            @PathVariable String id, 
            @Valid @RequestBody StationDetailRequest request) {
        
        return stationDetailService.findById(id)
                .map(existingDetail -> {
                    StationDetail updatedDetail = updateEntity(existingDetail, request);
                    StationDetail savedDetail = stationDetailService.save(updatedDetail);
                    return ResponseEntity.ok(new StationDetaiResponse(savedDetail));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PatchMapping("/{id}/available-slots")
    public ResponseEntity<StationDetaiResponse> updateAvailableSlots(
            @PathVariable String id, 
            @RequestParam Integer availableSlots) {
        
        try {
            StationDetail updatedDetail = stationDetailService.updateAvailableSlots(id, availableSlots);
            return ResponseEntity.ok(new StationDetaiResponse(updatedDetail));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PatchMapping("/{id}/power-usage")
    public ResponseEntity<StationDetaiResponse> updatePowerUsage(
            @PathVariable String id, 
            @RequestParam Integer currentPowerUsage) {
        
        try {
            StationDetail updatedDetail = stationDetailService.updatePowerUsage(id, currentPowerUsage);
            return ResponseEntity.ok(new StationDetaiResponse(updatedDetail));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/manager/{managerId}/total-slots")
    public ResponseEntity<Integer> getTotalSlotsByManager(@PathVariable String managerId) {
        Integer totalSlots = stationDetailService.getTotalSlotsByManager(managerId);
        return ResponseEntity.ok(totalSlots != null ? totalSlots : 0);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStationDetail(@PathVariable String id) {
        stationDetailService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    private StationDetail convertToEntity(StationDetailRequest request) {
        StationDetail detail = new StationDetail();
        detail.setId(generateId()); // Tự generate ID

        Station station = new Station();
        station.setId(request.getStationId());
        detail.setStation(station);
        
        detail.setManagerId(request.getManagerId());
        detail.setTotalSlots(request.getTotalSlots());
        detail.setAvailableSlots(request.getAvailableSlots());
        detail.setTotalBattery(request.getTotalBattery());
        detail.setTotalPowerCapacity(request.getTotalPowerCapacity());
        detail.setCurrentPoweUsage(request.getCurrentPowerUsage());
        detail.setOperationalHours(request.getOperationalHours());
        detail.setContactPhone(request.getContactPhone());
        detail.setContactEmail(request.getContactEmail());
        detail.setSupportHours(request.getSupportHours());
        
        return detail;
    }
    
    private StationDetail updateEntity(StationDetail existing, StationDetailRequest request) {
        if (request.getManagerId() != null) {
            existing.setManagerId(request.getManagerId());
        }
        if (request.getTotalSlots() != null) {
            existing.setTotalSlots(request.getTotalSlots());
        }
        if (request.getAvailableSlots() != null) {
            existing.setAvailableSlots(request.getAvailableSlots());
        }
        if (request.getTotalBattery() != null) {
            existing.setTotalBattery(request.getTotalBattery());
        }
        if (request.getTotalPowerCapacity() != null) {
            existing.setTotalPowerCapacity(request.getTotalPowerCapacity());
        }
        if (request.getCurrentPowerUsage() != null) {
            existing.setCurrentPoweUsage(request.getCurrentPowerUsage());
        }
        if (request.getOperationalHours() != null) {
            existing.setOperationalHours(request.getOperationalHours());
        }
        if (request.getContactPhone() != null) {
            existing.setContactPhone(request.getContactPhone());
        }
        if (request.getContactEmail() != null) {
            existing.setContactEmail(request.getContactEmail());
        }
        if (request.getSupportHours() != null) {
            existing.setSupportHours(request.getSupportHours());
        }
        
        return existing;
    }
    
    private String generateId() {
        return "SD_" + System.currentTimeMillis();
    }
}
