package com.example.station_management.repository;

import com.example.station_management.model.entity.StationAlert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface StationAlertRepository extends JpaRepository<StationAlert, String> {
    
    // tìm cảnh báo bằng id station
    List<StationAlert> findByStationId(String stationId);
    
    // Tìm cảnh báo bằng id station và status
    List<StationAlert> findByStationIdAndStatus(String stationId, StationAlert.AlertStatus status);
    
    // trả về cảnh báo theo loại
    List<StationAlert> findByAlertType(StationAlert.AlertType alertType);
    
    // Tìm cảnh báo ở mức độ nghiệm trọng
    List<StationAlert> findBySeverity(StationAlert.AlertSeverity severity);
    
    // Tìm cảnh báo được kích hoạt sau một thời gian nhất định
    List<StationAlert> findByTriggeredAtAfter(LocalDateTime dateTime);
    
    // Tìm cảnh báo quan trọng cần được chú ý ngay lập tức
    @Query("SELECT sa FROM StationAlert sa WHERE sa.severity IN ('HIGH', 'CRITICAL') AND sa.status = 'ACTIVE'")
    List<StationAlert> findCriticalActiveAlerts();
    
    // đếm số cảnh báo trong 1 trạm
    Long countByStationIdAndStatus(String stationId, StationAlert.AlertStatus status);
    
    // Tim sảnh báo của trạm hoạt động
    @Query("SELECT sa FROM StationAlert sa WHERE sa.station.id = :stationId ORDER BY sa.triggeredAt DESC")
    List<StationAlert> findRecentAlertsByStation(@Param("stationId") String stationId);
}
