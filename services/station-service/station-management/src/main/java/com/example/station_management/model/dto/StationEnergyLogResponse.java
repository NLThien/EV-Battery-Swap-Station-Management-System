package com.example.station_management.model.dto;

import java.time.LocalDateTime;
import java.util.Objects;

import com.example.station_management.model.entity.StationEnergyLog;

public class StationEnergyLogResponse {
    private String id;
    private String stationId;
    private Double energyConsumed;
    private Double powerDemand;
    private Double voltage;
    private Double current;
    private Double co2Saved;
    private Double equivalentTrees;
    private LocalDateTime loggedAt;
    private String timeSlot;
    private LocalDateTime createdAt;
    
    // Constructors, Getters, Setters
    public StationEnergyLogResponse() {}
    
    // Constructor từ Entity
    public StationEnergyLogResponse(StationEnergyLog log) {
        this.id = log.getId();
        this.stationId = log.getStation().getId();
        this.energyConsumed = log.getEnergyConsumed();
        this.powerDemand = log.getPowerDemand();
        this.voltage = log.getVoltage();
        this.current = log.getCurrent();
        this.co2Saved = log.getCo2Saved();
        this.equivalentTrees = log.getEquivalentTrees();
        this.loggedAt = log.getLoggedAt();
        this.timeSlot = log.getTimeSlot();
        this.createdAt = log.getCreatedAt();
    }
    // getter and setter
    public String getId() {return id;}
    public void setId(String id) {this.id = id;}

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

    public Double getCo2Saved() {return co2Saved;}
    public void setCo2Saved(Double co2Saved) {this.co2Saved = co2Saved;}

    public Double getEquivalentTrees() {return equivalentTrees;}
    public void setEquivalentTrees(Double equivalentTrees) {this.equivalentTrees = equivalentTrees;}

    public LocalDateTime getLoggedAt() {return loggedAt;}
    public void setLoggedAt(LocalDateTime loggedAt) {this.loggedAt = loggedAt;}

    public String getTimeSlot() {return timeSlot;}
    public void setTimeSlot(String timeSlot) {this.timeSlot = timeSlot;}

    public LocalDateTime getCreatedAt() {return createdAt;}
    public void setCreatedAt(LocalDateTime createdAt) {this.createdAt = createdAt;}

    //hashcode
    @Override
    public int hashCode() {
        return Objects.hash(id, stationId, energyConsumed, powerDemand, voltage,
         current, co2Saved, equivalentTrees, loggedAt, timeSlot);
    }

    //equals method
    @Override
    public boolean equals(Object o) {
        if(this == o ) return true;
        if(o == null || getClass() != o.getClass()) return false;
        StationEnergyLogResponse that = (StationEnergyLogResponse) o;
        return Objects.equals(id, that.id) &&
            Objects.equals(stationId, that.stationId) &&
            Objects.equals(energyConsumed , that.energyConsumed) &&
            Objects.equals(powerDemand , that.powerDemand) &&
            Objects.equals(voltage , that.voltage) &&
            Objects.equals(current , that.current) &&
            Objects.equals(co2Saved , that.co2Saved) &&
            Objects.equals(equivalentTrees , that.equivalentTrees) &&
            Objects.equals(loggedAt , that.loggedAt) &&
            Objects.equals(timeSlot , that.timeSlot) &&
            Objects.equals(createdAt , that.createdAt);
    }

    // toString()
    @Override
    public String toString() {
        return  "StationEnergyLogResponse{" +
                "id='" + id + '\'' +
                ", name='" + stationId + '\'' +
                ", address='" + energyConsumed + '\'' +
                ", latitude=" + powerDemand +
                ", longitude=" + voltage +
                ", totalSlots=" + current +
                ", availableSlots=" + co2Saved +
                ", status=" + equivalentTrees +
                ", managerId='" + loggedAt + '\'' +
                ", updatedAt=" + timeSlot +
                ", createdAt=" + createdAt +
                '}';
    }
}
