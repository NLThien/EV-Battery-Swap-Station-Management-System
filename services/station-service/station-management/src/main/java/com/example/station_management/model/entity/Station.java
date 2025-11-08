package com.example.station_management.model.entity;

import java.time.LocalDateTime;
import java.util.Objects;

import com.example.station_management.model.enums.StationStatus;

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
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "stations")
public class Station {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @Column(nullable = false)
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "Address is required")
    private String address;
    
    @Column(nullable = false)
    @NotNull(message = "Latitude is required")
    private Double latitude;
    
    @Column(nullable = false)
    @NotNull(message = "Longitude is required")
    private Double longitude;
    
    @Column(name = "total_slots")
    @NotNull(message = "Total slots is required")
    private Integer totalSlots = 0;
    
    @Column(name = "available_slots")
    @NotNull(message = "Available slots is required")
    private Integer availableSlots = 0;
    
    @Enumerated(EnumType.STRING)
    @NotNull(message = "Status is required")
    private StationStatus status = StationStatus.ACTIVE;
    
    @Column(name = "manager_id")
    @NotBlank(message = "Manager ID is required")
    private String managerId;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    // GETTERS và SETTERS
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
    
    // equals() và hashCode()
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Station station = (Station) o;
        return Objects.equals(id, station.id) &&
               Objects.equals(name, station.name) &&
               Objects.equals(address, station.address) &&
               Objects.equals(latitude, station.latitude) &&
               Objects.equals(longitude, station.longitude) &&
               Objects.equals(totalSlots, station.totalSlots) &&
               Objects.equals(availableSlots, station.availableSlots) &&
               status == station.status &&
               Objects.equals(managerId, station.managerId);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id, name, address, latitude, longitude, totalSlots, availableSlots, status, managerId);
    }
    
    // toString()
    @Override
    public String toString() {
        return "Station{" +
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
                '}';
    }
}