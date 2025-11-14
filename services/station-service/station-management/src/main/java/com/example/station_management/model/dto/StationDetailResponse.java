package com.example.station_management.model.dto;

import java.time.LocalDateTime;
import java.util.Objects;

import com.example.station_management.model.entity.StationDetail;

public class StationDetailResponse {
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

    public StationDetailResponse() {}

    public StationDetailResponse(StationDetail stationDetail) {
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

        // equals() method
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StationDetailResponse that = (StationDetailResponse) o;
        return Objects.equals(id, that.id) &&
               Objects.equals(stationId, that.stationId) &&
               Objects.equals(managerId, that.managerId) &&
               Objects.equals(totalSlots, that.totalSlots) &&
               Objects.equals(availableSlots, that.availableSlots) &&
               Objects.equals(totalBattery, that.totalBattery) &&
               Objects.equals(totalPowerCapacity, that.totalPowerCapacity) &&
               Objects.equals(currentPowerUsage, that.currentPowerUsage) &&
               Objects.equals(operationalHours, that.operationalHours) &&
               Objects.equals(contactPhone, that.contactPhone) &&
               Objects.equals(contactEmail, that.contactEmail) &&
               Objects.equals(supportHours, that.supportHours) &&
               Objects.equals(createdAt, that.createdAt) &&
               Objects.equals(updatedAt, that.updatedAt);
    }

    // hashCode() method
    @Override
    public int hashCode() {
        return Objects.hash(id, stationId, managerId, totalSlots, availableSlots, 
                           totalBattery, totalPowerCapacity, currentPowerUsage,
                           operationalHours, contactPhone, contactEmail, supportHours,
                           createdAt, updatedAt);
    }

    // toString() method
    @Override
    public String toString() {
        return "StationDetailResponse{" +
                "id='" + id + '\'' +
                ", stationId='" + stationId + '\'' +
                ", managerId='" + managerId + '\'' +
                ", totalSlots=" + totalSlots +
                ", availableSlots=" + availableSlots +
                ", totalBattery=" + totalBattery +
                ", totalPowerCapacity=" + totalPowerCapacity +
                ", currentPowerUsage=" + currentPowerUsage +
                ", operationalHours='" + operationalHours + '\'' +
                ", contactPhone='" + contactPhone + '\'' +
                ", contactEmail='" + contactEmail + '\'' +
                ", supportHours='" + supportHours + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
