package com.example.booking_service.service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.booking_service.model.dto.StationDTO;

@FeignClient(name = "station-service", url = "http://localhost:8082") // Adjust URL accordingly
public interface StationServiceClient {
    
    @GetMapping("/api/stations/{stationId}")
    StationDTO getStationById(@PathVariable String stationId);
    
    @GetMapping("/api/stations/{stationId}/availability")
    Boolean checkStationAvailability(@PathVariable String stationId);
}