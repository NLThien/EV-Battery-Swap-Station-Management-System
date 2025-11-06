package com.example.station_management.model.dto;

import com.example.station_management.model.enums.StationStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
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
}