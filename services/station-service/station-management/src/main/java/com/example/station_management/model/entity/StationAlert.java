package com.example.station_management.model.entity;

import java.time.LocalDateTime;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "station_alerts")
public class StationAlert {
    
    @Id
    private String id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "station_id", nullable = false)
    private Station station;

    @Column(name = "station_id", insertable = false, updatable = false)
    private String stationId;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "alert_type", nullable = false)
    private AlertType alertType;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AlertSeverity severity = AlertSeverity.MEDIUM;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "metric_name")
    private String metricName;
    
    @Column(name = "current_value", precision = 12)
    private Double currentValue;
    
    @Column(name = "threshold_value", precision = 12)
    private Double thresholdValue;
    
    @Column(name = "unit")
    private String unit;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AlertStatus status = AlertStatus.ACTIVE;
    
    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;
    
    @Column(name = "resolved_by")
    private String resolvedBy;
    
    @Column(name = "resolution_notes", columnDefinition = "TEXT")
    private String resolutionNotes;
    
    @Column(name = "triggered_at", nullable = false)
    private LocalDateTime triggeredAt;
    
    @Column(name = "acknowledged_at")
    private LocalDateTime acknowledgedAt;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Enums
    public enum AlertType {
        MAINTENANCE, PERFORMANCE, SAFETY, POWER, NETWORK, BATTERY
    }

    public enum AlertSeverity {
        LOW, MEDIUM, HIGH, CRITICAL
    }

    public enum AlertStatus {
        ACTIVE, ACKNOWLEDGED, RESOLVED
    }

    // Constructors
    public StationAlert() {}

    public StationAlert(String id, Station station, AlertType alertType, AlertSeverity severity, 
                       String title, String description, LocalDateTime triggeredAt) {
        this.id = id;
        this.station = station;
        this.alertType = alertType;
        this.severity = severity;
        this.title = title;
        this.description = description;
        this.triggeredAt = triggeredAt;
        this.createdAt = LocalDateTime.now();
    }

    public StationAlert(String id, Station station, AlertType alertType, AlertSeverity severity,
                       String title, String description, String metricName, Double currentValue,
                       Double thresholdValue, String unit, LocalDateTime triggeredAt) {
        this(id, station, alertType, severity, title, description, triggeredAt);
        this.metricName = metricName;
        this.currentValue = currentValue;
        this.thresholdValue = thresholdValue;
        this.unit = unit;
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (triggeredAt == null) {
            triggeredAt = LocalDateTime.now();
        }
    }

    // Business methods
    public void acknowledge(String acknowledgedBy) {
        this.status = AlertStatus.ACKNOWLEDGED;
        this.acknowledgedAt = LocalDateTime.now();
        this.resolvedBy = acknowledgedBy;
    }

    public void resolve(String resolvedBy, String resolutionNotes) {
        this.status = AlertStatus.RESOLVED;
        this.resolvedAt = LocalDateTime.now();
        this.resolvedBy = resolvedBy;
        this.resolutionNotes = resolutionNotes;
    }

    public boolean isActive() {
        return status == AlertStatus.ACTIVE;
    }

    public boolean requiresImmediateAttention() {
        return severity == AlertSeverity.HIGH || severity == AlertSeverity.CRITICAL;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Station getStation() { return station; }
    public void setStation(Station station) { this.station = station; }

    public String getStationId() { return stationId; }
    public void setStationId(String stationId) {this.stationId = stationId; }

    public AlertType getAlertType() { return alertType; }
    public void setAlertType(AlertType alertType) { this.alertType = alertType; }

    public AlertSeverity getSeverity() { return severity; }
    public void setSeverity(AlertSeverity severity) { this.severity = severity; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getMetricName() { return metricName; }
    public void setMetricName(String metricName) { this.metricName = metricName; }

    public Double getCurrentValue() { return currentValue; }
    public void setCurrentValue(Double currentValue) { this.currentValue = currentValue; }

    public Double getThresholdValue() { return thresholdValue; }
    public void setThresholdValue(Double thresholdValue) { this.thresholdValue = thresholdValue; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public AlertStatus getStatus() { return status; }
    public void setStatus(AlertStatus status) { this.status = status; }

    public LocalDateTime getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; }

    public String getResolvedBy() { return resolvedBy; }
    public void setResolvedBy(String resolvedBy) { this.resolvedBy = resolvedBy; }

    public String getResolutionNotes() { return resolutionNotes; }
    public void setResolutionNotes(String resolutionNotes) { this.resolutionNotes = resolutionNotes; }

    public LocalDateTime getTriggeredAt() { return triggeredAt; }
    public void setTriggeredAt(LocalDateTime triggeredAt) { this.triggeredAt = triggeredAt; }

    public LocalDateTime getAcknowledgedAt() { return acknowledgedAt; }
    public void setAcknowledgedAt(LocalDateTime acknowledgedAt) { this.acknowledgedAt = acknowledgedAt; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    // equals() and hashCode()
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StationAlert that = (StationAlert) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(station, that.station) &&
                alertType == that.alertType &&
                Objects.equals(triggeredAt, that.triggeredAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, station, alertType, stationId, severity, triggeredAt,
        title, description, metricName, currentValue, thresholdValue, unit, status,
        acknowledgedAt, resolvedAt, resolvedBy, createdAt);
    }

    @Override
    public String toString() {
        return "StationAlert{" +
                "id='" + id + '\'' +
                ", station=" + (station != null ? station.getId() : "null") +
                ", alertType=" + alertType +
                ", stationId='" + stationId + '\'' +
                ", severity=" + severity +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", metricName='" + metricName + '\'' +
                ", currentValue=" + currentValue +
                ", thresholdValue=" + thresholdValue +
                ", unit='" + unit + '\'' +
                ", status=" + status +
                ", triggeredAt=" + triggeredAt +
                ", acknowledgedAt=" + acknowledgedAt +
                ", resolvedAt=" + resolvedAt +
                ", resolvedBy='" + resolvedBy + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}