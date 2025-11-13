package com.example.station_management.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.station_management.model.entity.StationEnergyLog;

@Repository
public interface StationEnergyLogRepository extends JpaRepository<StationEnergyLog, String> {
    // Tìm logs theo station ID
    List<StationEnergyLog> findByStationId(String stationId);
    
    // Tìm logs trong khoảng thời gian
    List<StationEnergyLog> findByLoggedAtBetween(LocalDateTime start, LocalDateTime end);
    
    // Tìm logs theo station và khoảng thời gian
    List<StationEnergyLog> findByStationIdAndLoggedAtBetween(String stationId, LocalDateTime start, LocalDateTime end);
    
    // Thống kê năng lượng tiêu thụ theo station
    @Query("SELECT SUM(s.energyConsumed) FROM StationEnergyLog s WHERE s.station.id = :stationId")
    Double getTotalEnergyConsumedByStation(@Param("stationId") String stationId);
    
    // Tìm logs theo timeSlot
    List<StationEnergyLog> findByTimeSlot(String timeSlot);
}