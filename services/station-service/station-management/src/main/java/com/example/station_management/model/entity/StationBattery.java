package com.example.station_management.model.entity;

import java.time.LocalDateTime;
import java.util.Objects;

import com.example.station_management.model.enums.BatteryStationStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "station_batteries")
public class StationBattery {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @Column(name = "station_id", nullable = false)
    private String stationId;
    
    @Column(name = "battery_id", nullable = false)
    private String batteryId;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BatteryStationStatus status; // Trạng thái pin tại trạm
    
    @Column(name = "arrival_time")
    private LocalDateTime arrivalTime; // Thời gian pin đến trạm
    
    @Column(name = "departure_time")
    private LocalDateTime departureTime; // Thời gian pin rời trạm
    
    @Column(name = "slot_number")
    private Integer slotNumber; // Vị trí slot trong trạm
    
    @Column(name = "current_capacity")
    private Integer currentCapacity; // Dung lượng hiện tại khi đến trạm
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructor mặc định
    public StationBattery() {
    }
    
    // Constructor với các field chính
    public StationBattery(String stationId, String batteryId, BatteryStationStatus status) {
        this.stationId = stationId;
        this.batteryId = batteryId;
        this.status = status;
        this.arrivalTime = LocalDateTime.now();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // PrePersist và PreUpdate
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (arrivalTime == null) {
            arrivalTime = LocalDateTime.now();
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Getter và Setter
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getStationId() { return stationId; }
    public void setStationId(String stationId) { this.stationId = stationId; }
    
    public String getBatteryId() { return batteryId; }
    public void setBatteryId(String batteryId) { this.batteryId = batteryId; }
    
    public BatteryStationStatus getStatus() { return status; }
    public void setStatus(BatteryStationStatus status) { this.status = status; }
    
    public LocalDateTime getArrivalTime() { return arrivalTime; }
    public void setArrivalTime(LocalDateTime arrivalTime) { this.arrivalTime = arrivalTime; }
    
    public LocalDateTime getDepartureTime() { return departureTime; }
    public void setDepartureTime(LocalDateTime departureTime) { this.departureTime = departureTime; }
    
    public Integer getSlotNumber() { return slotNumber; }
    public void setSlotNumber(Integer slotNumber) { this.slotNumber = slotNumber; }
    
    public Integer getCurrentCapacity() { return currentCapacity; }
    public void setCurrentCapacity(Integer currentCapacity) { this.currentCapacity = currentCapacity; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    // equals() và hashCode()
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StationBattery that = (StationBattery) o;
        return Objects.equals(id, that.id) &&
               Objects.equals(stationId, that.stationId) &&
               Objects.equals(batteryId, that.batteryId) &&
               status == that.status &&
               Objects.equals(arrivalTime, that.arrivalTime) &&
               Objects.equals(departureTime, that.departureTime) &&
               Objects.equals(slotNumber, that.slotNumber) &&
               Objects.equals(currentCapacity, that.currentCapacity);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id, stationId, batteryId, status, arrivalTime, 
                           departureTime, slotNumber, currentCapacity);
    }
    
    // toString()
    @Override
    public String toString() {
        return "StationBattery{" +
                "id='" + id + '\'' +
                ", stationId='" + stationId + '\'' +
                ", batteryId='" + batteryId + '\'' +
                ", status=" + status +
                ", arrivalTime=" + arrivalTime +
                ", departureTime=" + departureTime +
                ", slotNumber=" + slotNumber +
                ", currentCapacity=" + currentCapacity +
                '}';
    }
}