package com.example.station_management.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.station_management.model.entity.StationDetail;
import com.example.station_management.repository.StationDetailRepository;

@Service
@Transactional
public class StationDetailService {
    
    @Autowired
    private StationDetailRepository stationDetailRepository;
    
    public List<StationDetail> findAll() {
        return stationDetailRepository.findAll();
    }
    
    public Optional<StationDetail> findById(String id) {
        return stationDetailRepository.findById(id);
    }
    
    public Optional<StationDetail> findByStationId(String stationId) {
        return stationDetailRepository.findByStationId(stationId);
    }
    
    public List<StationDetail> findByManagerId(String managerId) {
        return stationDetailRepository.findByManagerId(managerId);
    }
    
    public List<StationDetail> findStationsWithAvailableSlots(Integer minSlots) {
        return stationDetailRepository.findByAvailableSlotsGreaterThan(minSlots);
    }
    
    public StationDetail save(StationDetail stationDetail) {
        return stationDetailRepository.save(stationDetail);
    }
    
    public void deleteById(String id) {
        stationDetailRepository.deleteById(id);
    }
    
    public boolean existsByStationId(String stationId) {
        return stationDetailRepository.existsByStationId(stationId);
    }
    
    @Transactional
    public StationDetail updateAvailableSlots(String id, Integer availableSlots) {
        Optional<StationDetail> optionalDetail = stationDetailRepository.findById(id);
        if (optionalDetail.isPresent()) {
            StationDetail detail = optionalDetail.get();
            detail.setAvailableSlots(availableSlots);
            return stationDetailRepository.save(detail);
        }
        throw new RuntimeException("StationDetail not found with id: " + id);
    }
    
    @Transactional
    public StationDetail updatePowerUsage(String id, Integer currentPowerUsage) {
        Optional<StationDetail> optionalDetail = stationDetailRepository.findById(id);
        if (optionalDetail.isPresent()) {
            StationDetail detail = optionalDetail.get();
            detail.setCurrentPowerUsage(currentPowerUsage);
            return stationDetailRepository.save(detail);
        }
        throw new RuntimeException("StationDetail not found with id: " + id);
    }
    
    public Integer getTotalSlotsByManager(String managerId) {
        return stationDetailRepository.getTotalSlotsByManager(managerId);
    }
}