package com.example.station_management.model.dto;

import jakarta.validation.constraints.NotNull;

public class CompleteSessionRequest {
    
    @NotNull(message = "End battery level is required")
    private Double endBatteryLevel;
    
    @NotNull(message = "Energy delivered is required")
    private Double energyDelivered;

    // Constructors
    public CompleteSessionRequest() {}

    public CompleteSessionRequest(Double endBatteryLevel, Double energyDelivered) {
        this.endBatteryLevel = endBatteryLevel;
        this.energyDelivered = energyDelivered;
    }

    // Getters and Setters
    public Double getEndBatteryLevel() { return endBatteryLevel; }
    public void setEndBatteryLevel(Double endBatteryLevel) { this.endBatteryLevel = endBatteryLevel; }

    public Double getEnergyDelivered() { return energyDelivered; }
    public void setEnergyDelivered(Double energyDelivered) { this.energyDelivered = energyDelivered; }
}