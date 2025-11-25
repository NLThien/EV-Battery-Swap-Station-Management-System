package com.example.station_management.model.entity;

import java.time.LocalDateTime;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "charging_sessions")
public class ChargingSession {
    
    @Id
    private String id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "station_id", nullable = false)
    private Station station;

    @Column(name = "station_id", insertable = false, updatable = false)
    private String stationId;
    
    @Column(name = "user_id", nullable = false)
    private String userId;
    
    @Column(name = "vehicle_type")
    private String vehicleType;
    
    @Column(name = "battery_capacity", precision = 8)
    private Double batteryCapacity;
    
    @Column(name = "start_battery_level", precision = 5)
    private Double startBatteryLevel;
    
    @Column(name = "end_battery_level", precision = 5)
    private Double endBatteryLevel;
    
    @Column(name = "energy_delivered", precision = 8)
    private Double energyDelivered = 0.0;
    
    @Column(name = "charging_duration")
    private Integer chargingDuration = 0;
    
    @Column(name = "max_charging_rate", precision = 6)
    private Double maxChargingRate;
    
    @Column(name = "total_cost", precision = 10)
    private Double totalCost = 0.0;
    
    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;
    
    @Column(name = "end_time")
    private LocalDateTime endTime;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ChargingStatus status = ChargingStatus.ACTIVE;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Enum for charging status
    public enum ChargingStatus {
        ACTIVE, COMPLETED, CANCELLED, FAILED, PENDING, PAUSED,
    }

    // Constructors
    public ChargingSession() {}

    public ChargingSession(String id, Station station, String userId, String vehicleType, 
                          Double batteryCapacity, Double startBatteryLevel, LocalDateTime startTime) {
        this.id = id;
        this.station = station;
        this.userId = userId;
        this.vehicleType = vehicleType;
        this.batteryCapacity = batteryCapacity;
        this.startBatteryLevel = startBatteryLevel;
        this.startTime = startTime;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (updatedAt == null) {
            updatedAt = LocalDateTime.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // hoàn thành phiên sạc
    public void completeSession(Double endBatteryLevel, Double energyDelivered) {
        this.endBatteryLevel = endBatteryLevel;
        this.energyDelivered = energyDelivered;
        this.endTime = LocalDateTime.now();
        this.status = ChargingStatus.COMPLETED;
        
        // Calculate charging duration in minutes
        if (startTime != null && endTime != null) {
            this.chargingDuration = (int) java.time.Duration.between(startTime, endTime).toMinutes();
        }
    
        calculateCost();
    }

    private void calculateCost() {
        // Giá điện theo kWh (có thể lấy từ cấu hình hoặc database)
        double electricityRate = 3.5; // 3.5 VND per kWh
        
        if (energyDelivered != null && energyDelivered > 0) {
            // Tính chi phí cơ bản
            double baseCost = energyDelivered * electricityRate;
            
            // Phí dịch vụ (10% của chi phí cơ bản)
            double serviceFee = baseCost * 0.1;
            
            // Tổng chi phí
            this.totalCost = baseCost + serviceFee;
        } else {
            this.totalCost = 0.0;
        }    
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Station getStation() { return station; }
    public void setStation(Station station) { this.station = station; }

    public String getStationId() { return stationId;}
    public void setStationId(String stationId) {this.stationId = stationId; }

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

    public ChargingStatus getStatus() { return status; }
    public void setStatus(ChargingStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // equals() and hashCode()
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChargingSession that = (ChargingSession) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(station, that.station) &&
                Objects.equals(userId, that.userId) &&
                Objects.equals(startTime, that.startTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, station, stationId, userId, vehicleType,
        batteryCapacity, startBatteryLevel, endBatteryLevel, endBatteryLevel, energyDelivered,
        chargingDuration, maxChargingRate, totalCost, startTime, endTime, status, createdAt, updatedAt);
    }

    @Override
    public String toString() {
        return "ChargingSession{" +
                "id='" + id + '\'' +
                ", station=" + (station != null ? station.getId() : "null") +
                ", stationId='" + stationId + '\'' +
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
                '}';
    }
}