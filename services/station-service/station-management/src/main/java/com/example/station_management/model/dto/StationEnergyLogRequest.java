package com.example.station_management.model.dto;

import java.time.LocalDateTime;

public class StationEnergyLogRequest {
    private String stationId;
    private Double energyConsumed;
    private Double powerDemand;
    private Double voltage;
    private Double current;
    private LocalDateTime loggedAt;
    private String timeSlot;

    // constructor
    public StationEnergyLogRequest() {}

    public String getStationId() {return stationId;}
    public void getStation(String StationId) {this.stationId = StationId;}

    public Double getEnergyConsumed() {return energyConsumed;}
    public void setEnergyConsumed(Double energyConsumed) {this.energyConsumed = energyConsumed;}

    public Double getPowerDemand() {return powerDemand;}
    public void setPowerDemand(Double powerDemand) {this.powerDemand = powerDemand;}

    public Double getVoltage() {return voltage;}
    public void setVoltage(Double voltage) {this.voltage = voltage;}

    public Double getCurrent() {return current;}
    public void setCurrent(Double current) {this.current = current;}

    public LocalDateTime getLoggedAt() {return loggedAt;}
    public void setLoggedAt(LocalDateTime loggedAt) {this.loggedAt = loggedAt;}

    public String getTimeSlot() {return timeSlot;}
    public void setTimeSlot(String timeSlot) {this.timeSlot = timeSlot;}
}
