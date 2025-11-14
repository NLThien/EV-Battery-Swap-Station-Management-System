package com.example.station_management.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.station_management.model.entity.StationAlert;
import com.example.station_management.repository.StationAlertRepository;

@Service
public class StationAlertService {

    @Autowired
    private StationAlertRepository alertRepository;

    public List<StationAlert> findAll() {
        return alertRepository.findAll();
    }

    public Optional<StationAlert> findById(String id) {
        return alertRepository.findById(id);
    }

    public List<StationAlert> findByStationId(String stationId) {
        return alertRepository.findByStationId(stationId);
    }

    public List<StationAlert> findActiveAlertsByStation(String stationId) {
        return alertRepository.findByStationIdAndStatus(stationId, StationAlert.AlertStatus.ACTIVE);
    }

    public List<StationAlert> findCriticalActiveAlerts() {
        return alertRepository.findCriticalActiveAlerts();
    }

    public List<StationAlert> findByAlertType(StationAlert.AlertType alertType) {
        return alertRepository.findByAlertType(alertType);
    }

    public List<StationAlert> findBySeverity(StationAlert.AlertSeverity severity) {
        return alertRepository.findBySeverity(severity);
    }

    public StationAlert save(StationAlert alert) {
        return alertRepository.save(alert);
    }

    public void deleteById(String id) {
        alertRepository.deleteById(id);
    }

    public StationAlert acknowledgeAlert(String alertId, String acknowledgedBy) {
        return alertRepository.findById(alertId)
                .map(alert -> {
                    alert.acknowledge(acknowledgedBy);
                    return alertRepository.save(alert);
                })
                .orElseThrow(() -> new RuntimeException("Alert not found with id: " + alertId));
    }

    public StationAlert resolveAlert(String alertId, String resolvedBy, String resolutionNotes) {
        return alertRepository.findById(alertId)
                .map(alert -> {
                    alert.resolve(resolvedBy, resolutionNotes);
                    return alertRepository.save(alert);
                })
                .orElseThrow(() -> new RuntimeException("Alert not found with id: " + alertId));
    }

    public Long getActiveAlertCount(String stationId) {
        return alertRepository.countByStationIdAndStatus(stationId, StationAlert.AlertStatus.ACTIVE);
    }

    public List<StationAlert> getRecentAlerts(String stationId) {
        return alertRepository.findRecentAlertsByStation(stationId);
    }

    // Create a new alert
    public StationAlert createAlert(StationAlert alert) {
        if (alert.getId() == null) {
            alert.setId(generateAlertId());
        }
        return alertRepository.save(alert);
    }

    private String generateAlertId() {
        return "ALERT_" + System.currentTimeMillis();
    }
}
