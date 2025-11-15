package com.example.station_management.model.dto;

import java.time.LocalDateTime;
import java.util.Objects;

import com.example.station_management.model.entity.StationAlert;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class StationAlertRequest {
@NotBlank(message = "Station ID is required")
    private String stationId;
    
    @NotNull(message = "Alert type is required")
    private StationAlert.AlertType alertType;
    
    private StationAlert.AlertSeverity severity = StationAlert.AlertSeverity.MEDIUM;
    
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    
    private String metricName;
    
    private Double currentValue;
    
    private Double thresholdValue;
    
    private String unit;
    
    private LocalDateTime triggeredAt;

    // Constructors
    public StationAlertRequest() {}

    public StationAlertRequest(String stationId, StationAlert.AlertType alertType, String title, 
                              String description, StationAlert.AlertSeverity severity) {
        this.stationId = stationId;
        this.alertType = alertType;
        this.title = title;
        this.description = description;
        this.severity = severity;
        this.triggeredAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getStationId() { return stationId; }
    public void setStationId(String stationId) { this.stationId = stationId; }

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

    public LocalDateTime getTriggeredAt() { return triggeredAt; }
    public void setTriggeredAt(LocalDateTime triggeredAt) { this.triggeredAt = triggeredAt; }

    // equals() method
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StationAlertRequest that = (StationAlertRequest) o;
        return Objects.equals(stationId, that.stationId) &&
               alertType == that.alertType &&
               severity == that.severity &&
               Objects.equals(title, that.title) &&
               Objects.equals(description, that.description) &&
               Objects.equals(metricName, that.metricName) &&
               Objects.equals(currentValue, that.currentValue) &&
               Objects.equals(thresholdValue, that.thresholdValue) &&
               Objects.equals(unit, that.unit) &&
               Objects.equals(triggeredAt, that.triggeredAt);
    }

    // hashCode() method
    @Override
    public int hashCode() {
        return Objects.hash(stationId, alertType, severity, title, description, 
                           metricName, currentValue, thresholdValue, unit, triggeredAt);
    }

    // toString() method
    @Override
    public String toString() {
        return "StationAlertRequest{" +
                "stationId='" + stationId + '\'' +
                ", alertType=" + alertType +
                ", severity=" + severity +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", metricName='" + metricName + '\'' +
                ", currentValue=" + currentValue +
                ", thresholdValue=" + thresholdValue +
                ", unit='" + unit + '\'' +
                ", triggeredAt=" + triggeredAt +
                '}';
    }
}
