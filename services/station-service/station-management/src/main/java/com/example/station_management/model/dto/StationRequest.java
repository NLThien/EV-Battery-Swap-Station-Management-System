package com.example.station_management.model.dto;

import java.util.Objects;

import com.example.station_management.model.enums.StationStatus;

public class StationRequest {
    private String name;
    private String address;
    private Double latitude;
    private Double longitude;
    private Integer totalSlots;
    private Integer availableSlots;
    private StationStatus status;
    private String managerId;

    // Constructor mặc định
    public StationRequest() {
    }

    // Getter và Setter
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

    // equals() method
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StationRequest that = (StationRequest) o;
        return Objects.equals(name, that.name) &&
               Objects.equals(address, that.address) &&
               Objects.equals(latitude, that.latitude) &&
               Objects.equals(longitude, that.longitude) &&
               Objects.equals(totalSlots, that.totalSlots) &&
                Objects.equals(availableSlots, that.availableSlots) &&
               status == that.status &&
               Objects.equals(managerId, that.managerId);
    }

    // hashCode() method
    @Override
    public int hashCode() {
        return Objects.hash(name, address, latitude, longitude, totalSlots,availableSlots, status, managerId);
    }

    // toString() method
    @Override
    public String toString() {
        return "StationRequest{" +
                "name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", totalSlots=" + totalSlots +
                ", availableSlots=" + availableSlots +
                ", status=" + status +
                ", managerId='" + managerId + '\'' +
                '}';
    }
}