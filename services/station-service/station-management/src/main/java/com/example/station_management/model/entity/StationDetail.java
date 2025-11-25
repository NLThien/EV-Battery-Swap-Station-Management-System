package com.example.station_management.model.entity;

import java.time.LocalDateTime;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "station_details")
public class StationDetail {
    
    @Id
    private String id;
    
    @OneToOne
    @JoinColumn(name = "station_id")
    private Station station;
    
    @Column(name = "manager_id", nullable = false)
    @NotBlank(message = "manager_id is required")
    private String managerId;

    @Column(name = "total_slots")   // thì ra là m
    @NotNull(message = "Total slots is required")
    private Integer totalSlots = 0;

    @Column(name = "available_slots")
    @NotNull(message = "Available slot is required")
    private Integer availableSlots = 0;

    @Column(name = "total_battery")
    private Integer totalBattery;

    @Column(name = "total_power_capacity") // nhầm name là message ạ tui lạy tui của 2 tuần trước quá
    private Integer totalPowerCapacity;

    @Column(name = "current_power_usage")
    private Integer currentPowerUsage;

    @Column(name = "operational_hours")
    private String operationalHours;
    
    @Column(name = "contact_phone")
    private String contactPhone;
    
    @Column(name = "contact_email")
    private String contactEmail;
    
    @Column(name = "support_hours")
    private String supportHours;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Enums
    public enum StationType {
        STANDARD, FAST_CHARGING, SUPER_CHARGING
    }
    
    public enum VoltageLevel {
        LOW, MEDIUM, HIGH
    }
    
    public enum PricingModel {
        PER_KWH, PER_MINUTE, FLAT_RATE
    }
    
    // Constructors
    public StationDetail() {}
    
    public StationDetail(String id, Station station, Integer availableSlots, Integer totalBattery,
                        Integer totalPowerCapacity, Integer currentPowerUsage, String operationalHours,
                        String contactPhone, String contactEmail, String supportHours) {
        this.id = id;
        this.station = station;

        this.contactPhone = contactPhone;
        this.contactEmail = contactEmail;
        this.supportHours = supportHours;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public Station getStation() { return station; }
    public void setStation(Station station) { this.station = station; }

    public String getManagerId() { return managerId;}
    public void setManagerId(String managerId) {this.managerId = managerId;}

    public Integer getTotalSlots() {return totalSlots;}
    public void setTotalSlots(Integer totalSlots) {this.totalSlots = totalSlots;}

    public Integer getAvailableSlots() {return availableSlots;}
    public void setAvailableSlots(Integer availableSlots) {this.availableSlots = availableSlots;}

    public Integer getTotalBattery() {return totalBattery;}
    public void setTotalBattery(Integer totalBattery) {this.totalBattery = totalBattery;}

    public Integer getTotalPowerCapacity() {return totalPowerCapacity;}
    public void setTotalPowerCapacity(Integer totalPowerCapacity) {this.totalPowerCapacity = totalPowerCapacity;}
    
    public Integer getCurrentPowerUsage() {return currentPowerUsage;}
    public void setCurrentPowerUsage(Integer currentPowerUsage) {this.currentPowerUsage = currentPowerUsage;} // gõ còn thiếu "r" chịu

    public String getOperationalHours() {return operationalHours;}
    public void setOperationalHours(String operationalHours) {this.operationalHours = operationalHours;}

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

    // equals() and hashCode()
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StationDetail that = (StationDetail) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(station, that.station) &&
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

    @Override
    public int hashCode() {
        return Objects.hash(id, station, managerId, totalSlots, availableSlots, totalBattery,
        totalPowerCapacity, currentPowerUsage, currentPowerUsage, operationalHours, 
        contactPhone, contactEmail, supportHours);
    }

    @Override
    public String toString() {
        return "StationDetail{" +
                "id='" + id + '\'' +
                ", station=" + (station != null ? station.getId() : "null") +
                ", manager_id='" + managerId + '\'' + 
                ", total_slots='" + totalSlots + 
                ", available_slots='" + availableSlots +
                ", total_battery= '" + totalBattery +
                ", totalPowerCapacity= '" + totalPowerCapacity +
                ", currentPowerUsage= '"  + currentPowerUsage +
                ", operationalHours= '" + operationalHours +
                ", contactPhone='" + contactPhone + '\'' +
                ", contactEmail='" + contactEmail + '\'' +
                ", supportHours='" + supportHours + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}