package com.example.station_management.model.dto;

import java.time.LocalDateTime;

import com.example.station_management.model.entity.StationDetail;

public class StationDetaiResponse {
    private String id;
    private String stationId;
    private String managerId;
    private Integer totalSlots;
    private Integer availableSlots;
    private Integer totalBattery;
    private Integer totalPowerCapacity;
    private Integer currentPowerUsage;
    private String operationalHours;
    private String contactPhone;
    private String contactEmail;
    private String supportHours;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public StationDetaiResponse() {}

    public StationDetaiResponse(StationDetail stationDetail) {
        this.id = stationDetail.getId();
        this.stationId = stationDetail.getStation() != null ? stationDetail.getStation().getId() : null;
        this.managerId = stationDetail.getManagerId();
        this.totalSlots = stationDetail.getTotalSlots();
        this.availableSlots = stationDetail.getAvailableSlots();
        this.totalBattery = stationDetail.getTotalBattery();
        this.totalPowerCapacity = stationDetail.getTotalPowerCapacity();
        this.currentPowerUsage = stationDetail.getCurrentPowerUsage();
        this.operationalHours = stationDetail.getOperationalHours();
        this.contactPhone = stationDetail.getContactPhone();
        this.contactEmail = stationDetail.getContactEmail();
        this.supportHours = stationDetail.getSupportHours();
        this.createdAt = stationDetail.getCreatedAt();
        this.updatedAt = stationDetail.getUpdatedAt();
    }
    
    // Getters and Setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
        public String getStationId() { return stationId; }
        public void setStationId(String stationId) { this.stationId = stationId; }
        
        public String getManagerId() { return managerId; }
        public void setManagerId(String managerId) { this.managerId = managerId; }
        
        public Integer getTotalSlots() { return totalSlots; }
        public void setTotalSlots(Integer totalSlots) { this.totalSlots = totalSlots; }
        
        public Integer getAvailableSlots() { return availableSlots; }
        public void setAvailableSlots(Integer availableSlots) { this.availableSlots = availableSlots; }
        
        public Integer getTotalBattery() { return totalBattery; }
        public void setTotalBattery(Integer totalBattery) { this.totalBattery = totalBattery; }
        
        public Integer getTotalPowerCapacity() { return totalPowerCapacity; }
        public void setTotalPowerCapacity(Integer totalPowerCapacity) { this.totalPowerCapacity = totalPowerCapacity; }
        
        public Integer getCurrentPowerUsage() { return currentPowerUsage; }
        public void setCurrentPowerUsage(Integer currentPowerUsage) { this.currentPowerUsage = currentPowerUsage; }
        
        public String getOperationalHours() { return operationalHours; }
        public void setOperationalHours(String operationalHours) { this.operationalHours = operationalHours; }
        
        public String getContactPhone() { return contactPhone; }
        public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }
        
        public String getContactEmail() { return contactEmail; }
        public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }
        
        public String getSupportHours() { return supportHours; }
        public void setSupportHours(String supportHours) { this.supportHours = supportHours; }
        
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
        
        public LocalDateTime getUpdatedAt() { return updatedAt; }
        public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
