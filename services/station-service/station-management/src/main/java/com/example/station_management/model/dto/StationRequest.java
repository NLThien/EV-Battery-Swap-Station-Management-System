package com.example.station_management.model.dto;

import lombok.Data;

@Data
public class StationRequest {
    private String name;
    private String address;
    private Double latitude;
    private Double longitude;
    private Integer totalSlots;
    private String managerId;
}