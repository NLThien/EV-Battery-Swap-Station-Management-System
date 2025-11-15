package com.example.station_management.model.entity;

import java.time.LocalDateTime;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "station_energy_logs")
public class StationEnergyLog {
    
    @Id
    private String id;
    
    @ManyToOne(fetch = FetchType.LAZY) // cho phép 1 staion cụ thể có nhiều log dùng lazy để tải đữ liệu staion khi thực sự cần
    @JoinColumn(name = "station_id", nullable = false) // station_id là khóa ngoại
    private Station station;
    // năng lượng tiêu thụ
    @Column(name = "energy_consumed", precision = 12)
    private Double energyConsumed = 0.0;
    // nhu cầu điện năng
    @Column(name = "power_demand", precision = 10)
    private Double powerDemand = 0.0;
    // điện áp tổng
    @Column(name = "voltage", precision = 8)
    private Double voltage = 0.0;
    // điện năng hiện tại
    @Column(name = "current", precision = 8)
    private Double current = 0.0;
    // tổng lượng khí C02 đã thải
    @Column(name = "co2_saved", precision = 10)
    private Double co2Saved = 0.0;
    // 
    @Column(name = "equivalent_trees", precision = 8)
    private Double equivalentTrees = 0.0;
    // gửi tại thời điểm
    @Column(name = "logged_at", nullable = false)
    private LocalDateTime loggedAt;
    
    @Column(name = "time_slot", length = 5, nullable = false)
    private String timeSlot;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Constructors
    public StationEnergyLog() {}

    public StationEnergyLog(Station station, Double energyConsumed, Double powerDemand, 
                           Double voltage, Double current, LocalDateTime loggedAt, String timeSlot) {
        this.station = station;
        this.energyConsumed = energyConsumed;
        this.powerDemand = powerDemand;
        this.voltage = voltage;
        this.current = current;
        this.loggedAt = loggedAt;
        this.timeSlot = timeSlot;
        this.createdAt = LocalDateTime.now();
        // chỉ số phác thải chỉ mang tính tượng trưng, không có ý nghĩa thực sự
        this.co2Saved = energyConsumed * 0.5; // 0.5kg CO2 / kWh
        this.equivalentTrees = energyConsumed / 100; // 1 tree / 100 kWh
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Station getStation() { return station; }
    public void setStation(Station station) { this.station = station; }

    public Double getEnergyConsumed() { return energyConsumed; }
    public void setEnergyConsumed(Double energyConsumed) { 
        this.energyConsumed = energyConsumed; 
        if (energyConsumed != null) {
            this.co2Saved = energyConsumed * 0.5;
            this.equivalentTrees = energyConsumed / 100;
        }
    }

    public Double getPowerDemand() { return powerDemand; }
    public void setPowerDemand(Double powerDemand) { this.powerDemand = powerDemand; }

    public Double getVoltage() { return voltage; }
    public void setVoltage(Double voltage) { this.voltage = voltage; }

    public Double getCurrent() { return current; }
    public void setCurrent(Double current) { this.current = current; }

    public Double getCo2Saved() { return co2Saved; }
    public void setCo2Saved(Double co2Saved) { this.co2Saved = co2Saved; }

    public Double getEquivalentTrees() { return equivalentTrees; }
    public void setEquivalentTrees(Double equivalentTrees) { this.equivalentTrees = equivalentTrees; }

    public LocalDateTime getLoggedAt() { return loggedAt; }
    public void setLoggedAt(LocalDateTime loggedAt) { this.loggedAt = loggedAt; }

    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    // equals() and hashCode()
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StationEnergyLog that = (StationEnergyLog) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(station, that.station) &&
                Objects.equals(energyConsumed, that.energyConsumed) &&
                Objects.equals(powerDemand, that.powerDemand) &&
                Objects.equals(voltage, that.voltage) &&
                Objects.equals(current, that.current) &&
                Objects.equals(loggedAt, that.loggedAt) &&
                Objects.equals(timeSlot, that.timeSlot);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, station, energyConsumed, powerDemand, voltage, current, loggedAt, timeSlot);
    }

    @Override
    public String toString() {
        return "StationEnergyLog{" +
                "id=" + id +
                ", station=" + (station != null ? station.getId() : "null") +
                ", energyConsumed=" + energyConsumed +
                ", powerDemand=" + powerDemand +
                ", voltage=" + voltage +
                ", current=" + current +
                ", co2Saved=" + co2Saved +
                ", equivalentTrees=" + equivalentTrees +
                ", loggedAt=" + loggedAt +
                ", timeSlot='" + timeSlot + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}