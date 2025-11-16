package com.example.station_management.model.dto;

import java.util.Objects;

public class StationDetailRequest {
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
    
    // Constructors, Getters, Setters...
    public StationDetailRequest() {}
    
    // Getters and Setters
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

    // equals() method
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StationDetailRequest that = (StationDetailRequest) o;
        return Objects.equals(stationId, that.stationId) &&
               Objects.equals(managerId, that.managerId) &&
               Objects.equals(totalSlots, that.totalSlots) &&
               Objects.equals(availableSlots, that.availableSlots) &&
               Objects.equals(totalBattery, that.totalBattery) &&
               Objects.equals(totalPowerCapacity, that.totalPowerCapacity) &&
               Objects.equals(currentPowerUsage, that.currentPowerUsage) &&
               Objects.equals(operationalHours, that.operationalHours) &&
               Objects.equals(contactPhone, that.contactPhone) &&
               Objects.equals(contactEmail, that.contactEmail) &&
               Objects.equals(supportHours, that.supportHours);
    }

    // hashCode() method
    @Override
    public int hashCode() {
        return Objects.hash(stationId, managerId, totalSlots, availableSlots, totalBattery,
                           totalPowerCapacity, currentPowerUsage, operationalHours,
                           contactPhone, contactEmail, supportHours);
    }

    // toString() method
    @Override
    public String toString() {
        return "StationDetailRequest{" +
                "stationId='" + stationId + '\'' +
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
                '}';
    }
}
