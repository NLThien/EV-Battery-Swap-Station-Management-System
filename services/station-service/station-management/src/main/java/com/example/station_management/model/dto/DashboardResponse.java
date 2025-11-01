package com.example.station_management.model.dto;

import java.util.Map;

import lombok.Data;

@Data
public class DashboardResponse {
    private Integer totalStations;
    private Integer activeStations;
    private Integer maintenanceStations;
    private Integer totalBatteries;
    private Integer availableBatteries;
    private Integer inUseBatteries;
    private Integer todaySwaps;
    private Map<String, Integer> stationStatusDistribution; // Phân bố trạm theo khu vực
    private Map<String, Integer> batteryStatusDistribution; // Phân bố trạng thái pin
    private Double revenueToday;
    private Integer chargingBatteries;

    public DashboardResponse() {

    }

    // Constructor với tham số
    public DashboardResponse(
        Integer totalStations,
        Integer activeStations,              
        Integer maintenanceStations, 
        Integer totalBatteries,
        Integer availableBatteries, 
        Integer inUseBatteries,         
        Integer chargingBatteries, 
        Integer todaySwaps,           
        Double revenueToday
        ) {
        this.totalStations = totalStations;
        this.activeStations = activeStations;
        this.maintenanceStations = maintenanceStations;
        this.totalBatteries = totalBatteries;
        this.availableBatteries = availableBatteries;
        this.inUseBatteries = inUseBatteries;
        this.chargingBatteries = chargingBatteries;
        this.todaySwaps = todaySwaps;
        this.revenueToday = revenueToday;
    }
}