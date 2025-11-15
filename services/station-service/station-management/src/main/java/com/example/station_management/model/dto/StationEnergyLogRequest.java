package com.example.station_management.model.dto;

import java.time.LocalDateTime;
import java.util.Objects;

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
    public void setStation(String StationId) {this.stationId = StationId;}

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

    // equals() method
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StationEnergyLogRequest that = (StationEnergyLogRequest) o;
        return Objects.equals(stationId, that.stationId) &&
               Objects.equals(energyConsumed, that.energyConsumed) &&
               Objects.equals(powerDemand, that.powerDemand) &&
               Objects.equals(voltage, that.voltage) &&
               Objects.equals(current, that.current) &&
               Objects.equals(loggedAt, that.loggedAt) &&
               Objects.equals(timeSlot, that.timeSlot);
    }

    // hashCode() method
    @Override
    public int hashCode() {
        return Objects.hash(stationId, energyConsumed, powerDemand, voltage, 
                           current, loggedAt, timeSlot);
    }

    // toString() method
    @Override
    public String toString() {
        return "StationEnergyLogRequest{" +
                "stationId='" + stationId + '\'' +
                ", energyConsumed=" + energyConsumed +
                ", powerDemand=" + powerDemand +
                ", voltage=" + voltage +
                ", current=" + current +
                ", loggedAt=" + loggedAt +
                ", timeSlot='" + timeSlot + '\'' +
                '}';
    }
}
