package com.example.station_management.model.dto;

import java.time.LocalDateTime;
import java.util.Objects;

import com.example.station_management.model.enums.StationStatus;

public class StationResponse {
    private String id;
    private String name;
    private String address;
    private Double latitude;
    private Double longitude;
    private Integer totalSlots;
    private Integer availableSlots;
    private StationStatus status;
    private String managerId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer availableBatteries; // Số pin có sẵn
    private Integer inUseBatteries;     // Số pin đang sử dụng

    // Constructor mặc định
    public StationResponse() {
    }

    // Getters và Setters
    public String getId() { 
        return id; 
    }
    public void setId(String id) { 
        this.id = id; 
    }
    public String getName() { 
        return name; 
    }
    public void setName(String name) { 
        this.name = name; 
    }
    public String getAddress() { 
        return address; 
    }
    public void setAddress(String address) { 
        this.address = address; 
    }
    public Double getLatitude() { 
        return latitude; 
    }
    public void setLatitude(Double latitude) { 
        this.latitude = latitude; 
    }
    public Double getLongitude() { 
        return longitude; 
    }
    public void setLongitude(Double longitude) { 
        this.longitude = longitude; 
    }
    public Integer getTotalSlots() { 
        return totalSlots; 
    }
    public void setTotalSlots(Integer totalSlots) { 
        this.totalSlots = totalSlots; 
    }
    public Integer getAvailableSlots() { 
        return availableSlots; 
    }
    public void setAvailableSlots(Integer availableSlots) { 
        this.availableSlots = availableSlots; 
    }
    public StationStatus getStatus() { 
        return status; 
    }
    public void setStatus(StationStatus status) { 
        this.status = status; 
    }
    public String getManagerId() { 
        return managerId; 
    }
    public void setManagerId(String managerId) { 
        this.managerId = managerId; 
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
    public Integer getAvailableBatteries() {
        return availableBatteries;
    }
    public void setAvailableBatteries(Integer availableBatteries) {
        this.availableBatteries = availableBatteries;
    }
    public Integer getInUseBatteries() {
        return inUseBatteries;
    }
    public void setInUseBatteries(Integer inUseBatteries) {
        this.inUseBatteries = inUseBatteries;
    }

    // hashCode() method
    @Override
    public int hashCode() {
        return Objects.hash(id, name, address, latitude, longitude, totalSlots, 
                           availableSlots, status, managerId, createdAt, updatedAt,
                           availableBatteries, inUseBatteries);
    }

    // equals() method
    @Override
    public boolean equals(Object o) {   
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StationResponse that = (StationResponse) o;
        return Objects.equals(id, that.id) &&
               Objects.equals(name, that.name) &&
               Objects.equals(address, that.address) &&
               Objects.equals(latitude, that.latitude) &&
               Objects.equals(longitude, that.longitude) &&
               Objects.equals(totalSlots, that.totalSlots) &&
               Objects.equals(availableSlots, that.availableSlots) &&
               status == that.status &&
               Objects.equals(managerId, that.managerId) &&
               Objects.equals(createdAt, that.createdAt) &&
               Objects.equals(updatedAt, that.updatedAt) &&
               Objects.equals(availableBatteries, that.availableBatteries) &&
               Objects.equals(inUseBatteries, that.inUseBatteries);
    }

    // toString() method(cho đẹp hẹ hẹ hẹ)
    @Override
    public String toString() {
        return "StationResponse{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", totalSlots=" + totalSlots +
                ", availableSlots=" + availableSlots +
                ", status=" + status +
                ", managerId='" + managerId + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", availableBatteries=" + availableBatteries +
                ", inUseBatteries=" + inUseBatteries +
                '}';
    }
}