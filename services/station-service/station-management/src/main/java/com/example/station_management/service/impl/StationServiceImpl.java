package com.example.station_management.service.impl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.station_management.model.dto.StationRequest;
import com.example.station_management.model.dto.StationResponse;
import com.example.station_management.model.entity.Station;
import com.example.station_management.model.enums.StationStatus;
import com.example.station_management.repository.StationRepository;
import com.example.station_management.service.StationService;
import com.example.station_management.service.client.BatteryServiceClient;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class StationServiceImpl implements StationService {
    
    private final StationRepository stationRepository;
    private final BatteryServiceClient batteryServiceClient;
    
    @Override
    public List<StationResponse> getAllStations() {
        log.info("Fetching all stations");
        return stationRepository.findAll().stream()
                .map(this::mapToResponseWithBatteryInfo)
                .collect(Collectors.toList());
    }
    
    @Override
    public StationResponse getStationById(String id) {
        log.info("Fetching station by id: {}", id);
        Station station = stationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Station not found with id: " + id));
        return mapToResponseWithBatteryInfo(station);
    }
    
    @Override
    public StationResponse createStation(StationRequest request) {
        log.info("Creating new station: {}", request.getName());
        
        Station station = new Station();
        station.setName(request.getName());
        station.setAddress(request.getAddress());
        station.setLatitude(request.getLatitude());
        station.setLongitude(request.getLongitude());
        station.setTotalSlots(request.getTotalSlots());
        station.setAvailableSlots(request.getTotalSlots());
        station.setManagerId(request.getManagerId());
        station.setStatus(StationStatus.ACTIVE);
        
        Station savedStation = stationRepository.save(station);
        return mapToResponse(savedStation);
    }
    
    @Override
    public StationResponse updateStation(String id, StationRequest request) {
        log.info("Updating station: {}", id);
        
        Station station = stationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Station not found with id: " + id));
        
        station.setName(request.getName());
        station.setAddress(request.getAddress());
        station.setLatitude(request.getLatitude());
        station.setLongitude(request.getLongitude());
        
        // Update available slots if total slots changed
        if (!station.getTotalSlots().equals(request.getTotalSlots())) {
            int slotDifference = request.getTotalSlots() - station.getTotalSlots();
            station.setTotalSlots(request.getTotalSlots());
            station.setAvailableSlots(station.getAvailableSlots() + slotDifference);
        }
        
        station.setManagerId(request.getManagerId());
        
        Station updatedStation = stationRepository.save(station);
        return mapToResponseWithBatteryInfo(updatedStation);
    }
    
    @Override
    public void deleteStation(String id) {
        log.info("Deleting station: {}", id);
        Station station = stationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Station not found with id: " + id));
        stationRepository.delete(station);
    }
    
    @Override
    public StationResponse updateStationStatus(String id, String status) {
        log.info("Updating station {} status to: {}", id, status);
        
        Station station = stationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Station not found with id: " + id));
        
        try {
            StationStatus newStatus = StationStatus.valueOf(status.toUpperCase());
            station.setStatus(newStatus);
            Station updatedStation = stationRepository.save(station);
            return mapToResponse(updatedStation);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status: " + status);
        }
    }
    
    @Override
    public List<StationResponse> searchStations(String name, String status) {
        log.info("Searching stations - name: {}, status: {}", name, status);
        
        StationStatus stationStatus = null;
        if (status != null && !status.isEmpty()) {
            try {
                stationStatus = StationStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid status: " + status);
            }
        }
        
        return stationRepository.searchStations(name, stationStatus).stream()
                .map(this::mapToResponseWithBatteryInfo)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<StationResponse> getStationsByManager(String managerId) {
        log.info("Fetching stations for manager: {}", managerId);
        return stationRepository.findByManagerId(managerId).stream()
                .map(this::mapToResponseWithBatteryInfo)
                .collect(Collectors.toList());
    }
    
    private StationResponse mapToResponse(Station station) {
        StationResponse response = new StationResponse();
        response.setId(station.getId());
        response.setName(station.getName());
        response.setAddress(station.getAddress());
        response.setLatitude(station.getLatitude());
        response.setLongitude(station.getLongitude());
        response.setTotalSlots(station.getTotalSlots());
        response.setAvailableSlots(station.getAvailableSlots());
        response.setStatus(station.getStatus());
        response.setManagerId(station.getManagerId());
        response.setCreatedAt(station.getCreatedAt());
        response.setUpdatedAt(station.getUpdatedAt());
        return response;
    }
    
    private StationResponse mapToResponseWithBatteryInfo(Station station) {
        StationResponse response = mapToResponse(station);
        
        try {
            // Gọi battery service để lấy thông tin pin
            Map<String, Integer> batteryStats = batteryServiceClient.getBatteryStatsByStation(station.getId());
            response.setAvailableBatteries(batteryStats.get("available"));
            response.setInUseBatteries(batteryStats.get("inUse"));
        } catch (Exception e) {
            log.warn("Failed to fetch battery info for station {}: {}", station.getId(), e.getMessage());
            response.setAvailableBatteries(0);
            response.setInUseBatteries(0);
        }
        return response;
    }
}