package com.example.station_management.model.dto;

import java.time.LocalDateTime;
import java.util.Objects;

public class BatteryStatusResponse {
    private String batteryId;
    private String stationId;
    private String stationName;
    private String status; // AVAILABLE, IN_USE, CHARGING, MAINTENANCE, DEPLETED
    private Integer currentCapacity; // % dung lượng hiện tại (0-100)
    private Integer healthLevel; // % sức khỏe pin (0-100)
    private String batteryType;
    private String model;
    private LocalDateTime lastMaintenance;
    private LocalDateTime lastSwapTime;
    private Integer cycleCount; // Số lần sạc/xả
    private Double voltage;
    private Double temperature;
    private String assignedUserId; // Người đang sử dụng (nếu có)
    private Integer estimatedRange; // Km còn lại ước tính
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructor mặc định
    public BatteryStatusResponse() {
    }

    // Constructor với các field chính
    public BatteryStatusResponse(String batteryId, String stationId, String status, 
                               Integer currentCapacity, Integer healthLevel) {
        this.batteryId = batteryId;
        this.stationId = stationId;
        this.status = status;
        this.currentCapacity = currentCapacity;
        this.healthLevel = healthLevel;
    }

    // Getter và Setter
    public String getBatteryId() {
        return batteryId;
    }

    public void setBatteryId(String batteryId) {
        this.batteryId = batteryId;
    }

    public String getStationId() {
        return stationId;
    }

    public void setStationId(String stationId) {
        this.stationId = stationId;
    }

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getCurrentCapacity() {
        return currentCapacity;
    }

    public void setCurrentCapacity(Integer currentCapacity) {
        this.currentCapacity = currentCapacity;
    }

    public Integer getHealthLevel() {
        return healthLevel;
    }

    public void setHealthLevel(Integer healthLevel) {
        this.healthLevel = healthLevel;
    }

    public String getBatteryType() {
        return batteryType;
    }

    public void setBatteryType(String batteryType) {
        this.batteryType = batteryType;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public LocalDateTime getLastMaintenance() {
        return lastMaintenance;
    }

    public void setLastMaintenance(LocalDateTime lastMaintenance) {
        this.lastMaintenance = lastMaintenance;
    }

    public LocalDateTime getLastSwapTime() {
        return lastSwapTime;
    }

    public void setLastSwapTime(LocalDateTime lastSwapTime) {
        this.lastSwapTime = lastSwapTime;
    }

    public Integer getCycleCount() {
        return cycleCount;
    }

    public void setCycleCount(Integer cycleCount) {
        this.cycleCount = cycleCount;
    }

    public Double getVoltage() {
        return voltage;
    }

    public void setVoltage(Double voltage) {
        this.voltage = voltage;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public String getAssignedUserId() {
        return assignedUserId;
    }

    public void setAssignedUserId(String assignedUserId) {
        this.assignedUserId = assignedUserId;
    }

    public Integer getEstimatedRange() {
        return estimatedRange;
    }

    public void setEstimatedRange(Integer estimatedRange) {
        this.estimatedRange = estimatedRange;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // equals() và hashCode()
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BatteryStatusResponse that = (BatteryStatusResponse) o;
        return Objects.equals(batteryId, that.batteryId) &&
               Objects.equals(stationId, that.stationId) &&
               Objects.equals(stationName, that.stationName) &&
               Objects.equals(status, that.status) &&
               Objects.equals(currentCapacity, that.currentCapacity) &&
               Objects.equals(healthLevel, that.healthLevel) &&
               Objects.equals(batteryType, that.batteryType) &&
               Objects.equals(model, that.model) &&
               Objects.equals(lastMaintenance, that.lastMaintenance) &&
               Objects.equals(lastSwapTime, that.lastSwapTime) &&
               Objects.equals(cycleCount, that.cycleCount) &&
               Objects.equals(voltage, that.voltage) &&
               Objects.equals(temperature, that.temperature) &&
               Objects.equals(assignedUserId, that.assignedUserId) &&
               Objects.equals(estimatedRange, that.estimatedRange) &&
               Objects.equals(createdAt, that.createdAt) &&
               Objects.equals(updatedAt, that.updatedAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(batteryId, stationId, stationName, status, currentCapacity, 
                           healthLevel, batteryType, model, lastMaintenance, lastSwapTime,
                           cycleCount, voltage, temperature, assignedUserId, estimatedRange,
                           createdAt, updatedAt);
    }

    // toString()
    @Override
    public String toString() {
        return "BatteryStatusResponse{" +
                "batteryId='" + batteryId + '\'' +
                ", stationId='" + stationId + '\'' +
                ", stationName='" + stationName + '\'' +
                ", status='" + status + '\'' +
                ", currentCapacity=" + currentCapacity +
                ", healthLevel=" + healthLevel +
                ", batteryType='" + batteryType + '\'' +
                ", model='" + model + '\'' +
                ", lastMaintenance=" + lastMaintenance +
                ", lastSwapTime=" + lastSwapTime +
                ", cycleCount=" + cycleCount +
                ", voltage=" + voltage +
                ", temperature=" + temperature +
                ", assignedUserId='" + assignedUserId + '\'' +
                ", estimatedRange=" + estimatedRange +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}