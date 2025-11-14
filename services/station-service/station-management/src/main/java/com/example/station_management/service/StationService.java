package com.example.station_management.service;

import java.util.List;
import java.util.Optional;

import com.example.station_management.model.dto.StationRequest;
import com.example.station_management.model.dto.StationResponse;
import com.example.station_management.model.entity.Station;

public interface StationService {
    List<StationResponse> getAllStations();
    StationResponse getStationById(String id);
    Optional<Station> findById(String id);
    StationResponse createStation(StationRequest request);
    StationResponse updateStation(String id, StationRequest request);
    void deleteStation(String id);
    StationResponse updateStationStatus(String id, String status);
    List<StationResponse> searchStations(String name, String status);
    List<StationResponse> getStationsByManager(String managerId);
}