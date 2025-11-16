package com.example.station_management.model.dto;

import java.time.LocalDateTime;
import java.util.Objects;

import com.example.station_management.model.entity.StationAlert;

public class StationAlertResponse {
private String id;
    private String stationId;
    private String stationName;
    private StationAlert.AlertType alertType;
    private StationAlert.AlertSeverity severity;
    private String title;
    private String description;
    private String metricName;
    private Double currentValue;
    private Double thresholdValue;
    private String unit;
    private StationAlert.AlertStatus status;
    private LocalDateTime triggeredAt;
    private LocalDateTime acknowledgedAt;
    private LocalDateTime resolvedAt;
    private String resolvedBy;
    private String resolutionNotes;
    private LocalDateTime createdAt;
    private boolean requiresImmediateAttention;

    public StationAlertResponse() {}

    public StationAlertResponse(StationAlert alert) {
        this.id = alert.getId();
        this.stationId = alert.getStation() != null ? alert.getStation().getId() : null;
        this.stationName = alert.getStation() != null ? alert.getStation().getName() : null;
        this.alertType = alert.getAlertType();
        this.severity = alert.getSeverity();
        this.title = alert.getTitle();
        this.description = alert.getDescription();
        this.metricName = alert.getMetricName();
        this.currentValue = alert.getCurrentValue();
        this.thresholdValue = alert.getThresholdValue();
        this.unit = alert.getUnit();
        this.status = alert.getStatus();
        this.triggeredAt = alert.getTriggeredAt();
        this.acknowledgedAt = alert.getAcknowledgedAt();
        this.resolvedAt = alert.getResolvedAt();
        this.resolvedBy = alert.getResolvedBy();
        this.resolutionNotes = alert.getResolutionNotes();
        this.createdAt = alert.getCreatedAt();
        this.requiresImmediateAttention = alert.requiresImmediateAttention();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getStationId() { return stationId; }
    public void setStationId(String stationId) { this.stationId = stationId; }

    public String getStationName() { return stationName; }
    public void setStationName(String stationName) { this.stationName = stationName; }

    public StationAlert.AlertType getAlertType() { return alertType; }
    public void setAlertType(StationAlert.AlertType alertType) { this.alertType = alertType; }

    public StationAlert.AlertSeverity getSeverity() { return severity; }
    public void setSeverity(StationAlert.AlertSeverity severity) { this.severity = severity; }

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

    public StationAlert.AlertStatus getStatus() { return status; }
    public void setStatus(StationAlert.AlertStatus status) { this.status = status; }

    public LocalDateTime getTriggeredAt() { return triggeredAt; }
    public void setTriggeredAt(LocalDateTime triggeredAt) { this.triggeredAt = triggeredAt; }

    public LocalDateTime getAcknowledgedAt() { return acknowledgedAt; }
    public void setAcknowledgedAt(LocalDateTime acknowledgedAt) { this.acknowledgedAt = acknowledgedAt; }

    public LocalDateTime getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; }

    public String getResolvedBy() { return resolvedBy; }
    public void setResolvedBy(String resolvedBy) { this.resolvedBy = resolvedBy; }

    public String getResolutionNotes() { return resolutionNotes; }
    public void setResolutionNotes(String resolutionNotes) { this.resolutionNotes = resolutionNotes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public boolean isRequiresImmediateAttention() { return requiresImmediateAttention; }
    public void setRequiresImmediateAttention(boolean requiresImmediateAttention) { this.requiresImmediateAttention = requiresImmediateAttention; }

    // equals() method
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StationAlertResponse that = (StationAlertResponse) o;
        return requiresImmediateAttention == that.requiresImmediateAttention &&
               Objects.equals(id, that.id) &&
               Objects.equals(stationId, that.stationId) &&
               Objects.equals(stationName, that.stationName) &&
               alertType == that.alertType &&
               severity == that.severity &&
               Objects.equals(title, that.title) &&
               Objects.equals(description, that.description) &&
               Objects.equals(metricName, that.metricName) &&
               Objects.equals(currentValue, that.currentValue) &&
               Objects.equals(thresholdValue, that.thresholdValue) &&
               Objects.equals(unit, that.unit) &&
               status == that.status &&
               Objects.equals(triggeredAt, that.triggeredAt) &&
               Objects.equals(acknowledgedAt, that.acknowledgedAt) &&
               Objects.equals(resolvedAt, that.resolvedAt) &&
               Objects.equals(resolvedBy, that.resolvedBy) &&
               Objects.equals(resolutionNotes, that.resolutionNotes) &&
               Objects.equals(createdAt, that.createdAt);
    }

    // hashCode() method
    @Override
    public int hashCode() {
        return Objects.hash(id, stationId, stationName, alertType, severity, title, 
                           description, metricName, currentValue, thresholdValue, unit,
                           status, triggeredAt, acknowledgedAt, resolvedAt, resolvedBy,
                           resolutionNotes, createdAt, requiresImmediateAttention);
    }

    // toString() method
    @Override
    public String toString() {
        return "StationAlertResponse{" +
                "id='" + id + '\'' +
                ", stationId='" + stationId + '\'' +
                ", stationName='" + stationName + '\'' +
                ", alertType=" + alertType +
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
                ", resolutionNotes='" + resolutionNotes + '\'' +
                ", createdAt=" + createdAt +
                ", requiresImmediateAttention=" + requiresImmediateAttention +
                '}';
    }
}
