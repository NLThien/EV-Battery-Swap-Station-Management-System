package com.example.booking_service.model.dto;

public class StationDTO {
    private String id;
    private String name;
    private String address;
    private Integer totalSlots;
    private Integer availableSlots;
    private String status;
    
    // Constructors, Getters, Setters
    public StationDTO() {}
    
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    
    public Integer getTotalSlots() { return totalSlots; }
    public void setTotalSlots(Integer totalSlots) { this.totalSlots = totalSlots; }
    
    public Integer getAvailableSlots() { return availableSlots; }
    public void setAvailableSlots(Integer availableSlots) { this.availableSlots = availableSlots; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}