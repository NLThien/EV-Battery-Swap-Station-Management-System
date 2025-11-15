package com.example.station_management.model.dto;

import java.time.LocalDateTime;
import java.util.Objects;

import com.example.station_management.model.entity.ChargingSession;

public class ChargingSessionResponse {
    
    private String id;
    private String stationId;
    private String stationName;
    private String userId;
    private String vehicleType;
    private Double batteryCapacity;
    private Double startBatteryLevel;
    private Double endBatteryLevel;
    private Double energyDelivered;
    private Integer chargingDuration;
    private Double maxChargingRate;
    private Double totalCost;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private ChargingSession.ChargingStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isCompleted;
    private boolean isActive;

    public ChargingSessionResponse() {}

    public ChargingSessionResponse(ChargingSession session) {
        this.id = session.getId();
        this.stationId = session.getStation() != null ? session.getStation().getId() : null;
        this.stationName = session.getStation() != null ? session.getStation().getName() : null;
        this.userId = session.getUserId();
        this.vehicleType = session.getVehicleType();
        this.batteryCapacity = session.getBatteryCapacity();
        this.startBatteryLevel = session.getStartBatteryLevel();
        this.endBatteryLevel = session.getEndBatteryLevel();
        this.energyDelivered = session.getEnergyDelivered();
        this.chargingDuration = session.getChargingDuration();
        this.maxChargingRate = session.getMaxChargingRate();
        this.totalCost = session.getTotalCost();
        this.startTime = session.getStartTime();
        this.endTime = session.getEndTime();
        this.status = session.getStatus();
        this.createdAt = session.getCreatedAt();
        this.updatedAt = session.getUpdatedAt();
        this.isCompleted = session.getStatus() == ChargingSession.ChargingStatus.COMPLETED;
        this.isActive = session.getStatus() == ChargingSession.ChargingStatus.ACTIVE;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getStationId() { return stationId; }
    public void setStationId(String stationId) { this.stationId = stationId; }

    public String getStationName() { return stationName; }
    public void setStationName(String stationName) { this.stationName = stationName; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getVehicleType() { return vehicleType; }
    public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }

    public Double getBatteryCapacity() { return batteryCapacity; }
    public void setBatteryCapacity(Double batteryCapacity) { this.batteryCapacity = batteryCapacity; }

    public Double getStartBatteryLevel() { return startBatteryLevel; }
    public void setStartBatteryLevel(Double startBatteryLevel) { this.startBatteryLevel = startBatteryLevel; }

    public Double getEndBatteryLevel() { return endBatteryLevel; }
    public void setEndBatteryLevel(Double endBatteryLevel) { this.endBatteryLevel = endBatteryLevel; }

    public Double getEnergyDelivered() { return energyDelivered; }
    public void setEnergyDelivered(Double energyDelivered) { this.energyDelivered = energyDelivered; }

    public Integer getChargingDuration() { return chargingDuration; }
    public void setChargingDuration(Integer chargingDuration) { this.chargingDuration = chargingDuration; }

    public Double getMaxChargingRate() { return maxChargingRate; }
    public void setMaxChargingRate(Double maxChargingRate) { this.maxChargingRate = maxChargingRate; }

    public Double getTotalCost() { return totalCost; }
    public void setTotalCost(Double totalCost) { this.totalCost = totalCost; }

    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }

    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }

    public ChargingSession.ChargingStatus getStatus() { return status; }
    public void setStatus(ChargingSession.ChargingStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public boolean isCompleted() { return isCompleted; }
    public void setCompleted(boolean completed) { isCompleted = completed; }

    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }

    // equals() method
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChargingSessionResponse that = (ChargingSessionResponse) o;
        return isCompleted == that.isCompleted &&
               isActive == that.isActive &&
               Objects.equals(id, that.id) &&
               Objects.equals(stationId, that.stationId) &&
               Objects.equals(stationName, that.stationName) &&
               Objects.equals(userId, that.userId) &&
               Objects.equals(vehicleType, that.vehicleType) &&
               Objects.equals(batteryCapacity, that.batteryCapacity) &&
               Objects.equals(startBatteryLevel, that.startBatteryLevel) &&
               Objects.equals(endBatteryLevel, that.endBatteryLevel) &&
               Objects.equals(energyDelivered, that.energyDelivered) &&
               Objects.equals(chargingDuration, that.chargingDuration) &&
               Objects.equals(maxChargingRate, that.maxChargingRate) &&
               Objects.equals(totalCost, that.totalCost) &&
               Objects.equals(startTime, that.startTime) &&
               Objects.equals(endTime, that.endTime) &&
               status == that.status &&
               Objects.equals(createdAt, that.createdAt) &&
               Objects.equals(updatedAt, that.updatedAt);
    }

    // hashCode() method
    @Override
    public int hashCode() {
        return Objects.hash(id, stationId, stationName, userId, vehicleType, batteryCapacity,
                           startBatteryLevel, endBatteryLevel, energyDelivered, chargingDuration,
                           maxChargingRate, totalCost, startTime, endTime, status, createdAt,
                           updatedAt, isCompleted, isActive);
    }

    // toString() method
    @Override
    public String toString() {
        return "ChargingSessionResponse{" +
                "id='" + id + '\'' +
                ", stationId='" + stationId + '\'' +
                ", stationName='" + stationName + '\'' +
                ", userId='" + userId + '\'' +
                ", vehicleType='" + vehicleType + '\'' +
                ", batteryCapacity=" + batteryCapacity +
                ", startBatteryLevel=" + startBatteryLevel +
                ", endBatteryLevel=" + endBatteryLevel +
                ", energyDelivered=" + energyDelivered +
                ", chargingDuration=" + chargingDuration +
                ", maxChargingRate=" + maxChargingRate +
                ", totalCost=" + totalCost +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", status=" + status +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", isCompleted=" + isCompleted +
                ", isActive=" + isActive +
                '}';
    }
}