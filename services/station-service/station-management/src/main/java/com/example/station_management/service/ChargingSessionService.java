package com.example.station_management.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.station_management.model.entity.ChargingSession;
import com.example.station_management.model.entity.Station;
import com.example.station_management.repository.ChargingSessionRepository;

@Service
public class ChargingSessionService {

    @Autowired
    private ChargingSessionRepository sessionRepository;

    @Autowired
    private StationService stationService;

    public List<ChargingSession> findAll() {
        return sessionRepository.findAll();
    }

    public Optional<ChargingSession> findById(String id) {
        return sessionRepository.findById(id);
    }

    public List<ChargingSession> findByStationId(String stationId) {
        return sessionRepository.findByStationId(stationId);
    }

    public List<ChargingSession> findByUserId(String userId) {
        return sessionRepository.findByUserId(userId);
    }

    public List<ChargingSession> findByStatus(ChargingSession.ChargingStatus status) {
        return sessionRepository.findByStatus(status);
    }

    public List<ChargingSession> findActiveSessionsByStation(String stationId) {
        return sessionRepository.findByStationIdAndStatus(stationId, ChargingSession.ChargingStatus.ACTIVE);
    }

    public List<ChargingSession> findActiveSessionsByUser(String userId) {
        return sessionRepository.findActiveSessionsByUser(userId);
    }

    public List<ChargingSession> findCompletedSessionsByStation(String stationId) {
        return sessionRepository.findCompletedSessionsByStation(stationId);
    }

    public ChargingSession save(ChargingSession session) {
        return sessionRepository.save(session);
    }

    public void deleteById(String id) {
        sessionRepository.deleteById(id);
    }

    public ChargingSession startSession(ChargingSession session) {
        if (session.getId() == null) {
            session.setId(generateSessionId());
        }
        session.setStatus(ChargingSession.ChargingStatus.ACTIVE);
        session.setStartTime(LocalDateTime.now());
        return sessionRepository.save(session);
    }

    public ChargingSession completeSession(String sessionId, Double endBatteryLevel, Double energyDelivered) {
        return sessionRepository.findById(sessionId)
                .map(session -> {
                    session.completeSession(endBatteryLevel, energyDelivered);
                    return sessionRepository.save(session);
                })
                .orElseThrow(() -> new RuntimeException("Charging session not found with id: " + sessionId));
    }

    public ChargingSession cancelSession(String sessionId) {
        return sessionRepository.findById(sessionId)
                .map(session -> {
                    session.setStatus(ChargingSession.ChargingStatus.CANCELLED);
                    session.setEndTime(LocalDateTime.now());
                    return sessionRepository.save(session);
                })
                .orElseThrow(() -> new RuntimeException("Charging session not found with id: " + sessionId));
    }
    // thêm endpoint dừng cho phiên sạc
    public ChargingSession pauseSession(String id) {
        ChargingSession session = findById(id)
                .orElseThrow(() -> new RuntimeException("Session not found with id: " + id));
        
        // Chỉ cho phép pause session đang ACTIVE
        if (session.getStatus() != ChargingSession.ChargingStatus.ACTIVE) { // ✅ Sửa thành ChargingSession.ChargingStatus
            throw new RuntimeException("Cannot pause session with status: " + session.getStatus());
        }
        
        session.setStatus(ChargingSession.ChargingStatus.PAUSED); // ✅ Sửa thành ChargingSession.ChargingStatus
        session.setUpdatedAt(LocalDateTime.now());
        
        return sessionRepository.save(session); // ✅ Sửa thành sessionRepository
    }
    // tiếp
    public ChargingSession resumeSession(String id) {
        ChargingSession session = findById(id)
                .orElseThrow(() -> new RuntimeException("Session not found with id: " + id));
        
        // Chỉ cho phép resume session đang PAUSED
        if (session.getStatus() != ChargingSession.ChargingStatus.PAUSED) { // ✅ Sửa thành ChargingSession.ChargingStatus
            throw new RuntimeException("Cannot resume session with status: " + session.getStatus());
        }
        
        session.setStatus(ChargingSession.ChargingStatus.ACTIVE); // ✅ Sửa thành ChargingSession.ChargingStatus
        session.setUpdatedAt(LocalDateTime.now());
        
        return sessionRepository.save(session); // ✅ Sửa thành sessionRepository
    }
    // lấy tổng năng lượng dùng để sạc
    public Double getTotalEnergyDelivered(String stationId) {
        return sessionRepository.getTotalEnergyDeliveredByStation(stationId);
    }

    public Double getTotalRevenue(String stationId) {
        return sessionRepository.getTotalRevenueByStation(stationId);
    }

    public Long getActiveSessionCount(String stationId) {
        return sessionRepository.countByStationIdAndStatus(stationId, ChargingSession.ChargingStatus.ACTIVE);
    }

    public List<ChargingSession> getSessionsInTimeRange(LocalDateTime start, LocalDateTime end) {
        return sessionRepository.findByStartTimeBetween(start, end);
    }

    // tạo charging session mới
    public ChargingSession createSession(ChargingSession session) {
        Station station = stationService.findById(session.getStation().getId())
                .orElseThrow(() -> new RuntimeException("Station not found with id: " + session.getStation().getId()));

        return startSession(session);
    }

    private String generateSessionId() {
        return "SESSION_" + System.currentTimeMillis();
    }
}
