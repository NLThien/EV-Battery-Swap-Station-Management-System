package com.example.transaction_service.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String driverId;
    private String stationId;
    private String oldBatteryId;
    private String newBatteryId;
    private String timestamp;
    private Double fee;
    @Enumerated(EnumType.STRING)
    private TransactionStatus status;

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getDriverId() {
        return driverId;
    }
    public void setDriverId(String driverId) {
        this.driverId = driverId;
    }
    public String getStationId() {
        return stationId;
    }
    public void setStationId(String stationId) {
        this.stationId = stationId;
    }
    public String getOldBatteryId() {
        return oldBatteryId;
    }
    public void setOldBatteryId(String oldBatteryId) {
        this.oldBatteryId = oldBatteryId;
    }
    public String getNewBatteryId() {
        return newBatteryId;
    }
    public void setNewBatteryId(String newBatteryId) {
        this.newBatteryId = newBatteryId;
    }
    public String getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
    public Double getFee() {
        return fee;
    }
    public void setFee(Double fee) {
        this.fee = fee;
    }
    public TransactionStatus getStatus() {
        return status;
    }
    public void setStatus(TransactionStatus status) {
        this.status = status;
    }
    
    
}
