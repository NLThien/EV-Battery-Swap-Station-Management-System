package com.example.station_management.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.station_management.model.entity.StationEnergyLog;
import com.example.station_management.repository.StationEnergyLogRepository;

@Service
public class StationEnergyLogService {
    @Autowired
    private StationEnergyLogRepository repository;
    
    public List<StationEnergyLog> findAll() {
        return repository.findAll();
    }
    
    public Optional<StationEnergyLog> findById(String id) {
        return repository.findById(id);
    }
    
    public StationEnergyLog save(StationEnergyLog log) {
        return repository.save(log);
    }
    
    public void deleteById(String id) {
        repository.deleteById(id);
    }
    
    public List<StationEnergyLog> findByStationId(String stationId) {
        return repository.findByStationId(stationId);
    }
    
    public List<StationEnergyLog> findByDateRange(LocalDateTime start, LocalDateTime end) {
        return repository.findByLoggedAtBetween(start, end);
    }
    
    public List<StationEnergyLog> findByStationAndDateRange(String stationId, LocalDateTime start, LocalDateTime end) {
        return repository.findByStationIdAndLoggedAtBetween(stationId, start, end);
    }
    
    public Double getTotalEnergyConsumption(String stationId) {
        return repository.getTotalEnergyConsumedByStation(stationId);
    }
}
