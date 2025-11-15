package com.example.station_management.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.station_management.model.entity.ChargingSession;

@Repository
public interface ChargingSessionRepository extends JpaRepository<ChargingSession, String> {
    
    // Tìm phiên theo trạm(trả lại thông tin danh sách các phiên sạc của 1 trạm)
    List<ChargingSession> findByStationId(String stationId);
    
    // Tìm phiên theo người dùng(trả lại danh sách các phiên sạc của 1 người dùng cụ thể)
    List<ChargingSession> findByUserId(String userId);
    
    // Tìm phiên theo trạng thái( các trạm có trạng thái là gì gì đó)
    List<ChargingSession> findByStatus(ChargingSession.ChargingStatus status);
    
    // Tìm phiên hoạt động cho một trạm(danh sách các trạm đang hoạt động)
    List<ChargingSession> findByStationIdAndStatus(String stationId, ChargingSession.ChargingStatus status);
    
    // Tìm phiên trong phạm vi thời gian(phiên sạc có khoảng thời gian cần tìm)
    List<ChargingSession> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);
    
    // Tìm các phiên đã hoàn thành cho một trạm(các phiên sạc đã hoàn thành tại 1 trạm)
    @Query("SELECT cs FROM ChargingSession cs WHERE cs.station.id = :stationId AND cs.status = 'COMPLETED'")
    List<ChargingSession> findCompletedSessionsByStation(@Param("stationId") String stationId);
    
    // Tìm phiên hoạt động cho người dùng(các phiên sạc của 1 người dùng mà trạm đó đang hoạt động)
    @Query("SELECT cs FROM ChargingSession cs WHERE cs.userId = :userId AND cs.status = 'ACTIVE'")
    List<ChargingSession> findActiveSessionsByUser(@Param("userId") String userId);
    
    // Tính tổng năng lượng được cung cấp bởi trạm
    @Query("SELECT COALESCE(SUM(cs.energyDelivered), 0) FROM ChargingSession cs WHERE cs.station.id = :stationId AND cs.status = 'COMPLETED'")
    Double getTotalEnergyDeliveredByStation(@Param("stationId") String stationId);
    
    // Tính tổng doanh thu theo từng trạm
    @Query("SELECT COALESCE(SUM(cs.totalCost), 0) FROM ChargingSession cs WHERE cs.station.id = :stationId AND cs.status = 'COMPLETED'")    
    Double getTotalRevenueByStation(@Param("stationId") String stationId);
    
    // Đếm các phiên hoạt động theo trạm
    Long countByStationIdAndStatus(String stationId, ChargingSession.ChargingStatus status);
}
