package com.example.station_management.model.dto;

import java.time.LocalDateTime;
import java.util.Objects;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ChargingSessionRequest {
    
    @NotBlank(message = "Station ID is required")
    private String stationId;
    
    @NotBlank(message = "User ID is required")
    private String userId;
    
    private String vehicleType;
    
    private Double batteryCapacity;
    
    @NotNull(message = "Start battery level is required")
    private Double startBatteryLevel;
    
    private Double maxChargingRate;
    
    private LocalDateTime startTime;

    // Constructors
    public ChargingSessionRequest() {}

    public ChargingSessionRequest(String stationId, String userId, Double startBatteryLevel) {
        this.stationId = stationId;
        this.userId = userId;
        this.startBatteryLevel = startBatteryLevel;
        this.startTime = LocalDateTime.now();
    }

    // Getters and Setters
    public String getStationId() { return stationId; }
    public void setStationId(String stationId) { this.stationId = stationId; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getVehicleType() { return vehicleType; }
    public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }

    public Double getBatteryCapacity() { return batteryCapacity; }
    public void setBatteryCapacity(Double batteryCapacity) { this.batteryCapacity = batteryCapacity; }

    public Double getStartBatteryLevel() { return startBatteryLevel; }
    public void setStartBatteryLevel(Double startBatteryLevel) { this.startBatteryLevel = startBatteryLevel; }

    public Double getMaxChargingRate() { return maxChargingRate; }
    public void setMaxChargingRate(Double maxChargingRate) { this.maxChargingRate = maxChargingRate; }

    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }

    // equals() method
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChargingSessionRequest that = (ChargingSessionRequest) o;
        return Objects.equals(stationId, that.stationId) &&
               Objects.equals(userId, that.userId) &&
               Objects.equals(vehicleType, that.vehicleType) &&
               Objects.equals(batteryCapacity, that.batteryCapacity) &&
               Objects.equals(startBatteryLevel, that.startBatteryLevel) &&
               Objects.equals(maxChargingRate, that.maxChargingRate) &&
               Objects.equals(startTime, that.startTime);
    }

    // hashCode() method
    @Override
    public int hashCode() {
        return Objects.hash(stationId, userId, vehicleType, batteryCapacity, 
                           startBatteryLevel, maxChargingRate, startTime);
    }

    // toString() method
    @Override
    public String toString() {
        return "ChargingSessionRequest{" +
                "stationId='" + stationId + '\'' +
                ", userId='" + userId + '\'' +
                ", vehicleType='" + vehicleType + '\'' +
                ", batteryCapacity=" + batteryCapacity +
                ", startBatteryLevel=" + startBatteryLevel +
                ", maxChargingRate=" + maxChargingRate +
                ", startTime=" + startTime +
                '}';
    }
}
