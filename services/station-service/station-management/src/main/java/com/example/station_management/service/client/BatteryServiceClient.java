package com.example.station_management.service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.Map;

@FeignClient(name = "battery-service", url = "${service.battery.url}")
public interface BatteryServiceClient {
    
    @GetMapping("/api/batteries/stations/{stationId}/stats")
    Map<String, Integer> getBatteryStatsByStation(@PathVariable String stationId);
    
    @GetMapping("/api/batteries/dashboard/stats")
    Map<String, Integer> getGlobalBatteryStats();
}