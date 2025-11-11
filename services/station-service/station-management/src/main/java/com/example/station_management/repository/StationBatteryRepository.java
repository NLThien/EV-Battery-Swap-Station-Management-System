package com.example.station_management.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.station_management.model.entity.StationBattery;
import com.example.station_management.model.enums.BatteryStationStatus;

@Repository
public interface StationBatteryRepository extends JpaRepository<StationBattery, String> {
    
    // Tìm tất cả pin trong trạm
    List<StationBattery> findByStationId(String stationId);
    
    // Tìm pin trong trạm theo status
    List<StationBattery> findByStationIdAndStatus(String stationId, BatteryStationStatus status);
    
    // Tìm vị trí hiện tại của pin
    Optional<StationBattery> findFirstByBatteryIdAndDepartureTimeIsNullOrderByArrivalTimeDesc(String batteryId);
    
    // Đếm số pin theo trạng thái trong trạm
    Long countByStationIdAndStatus(String stationId, BatteryStationStatus status);
    
    // Tìm tất cả pin available
    List<StationBattery> findByStatus(BatteryStationStatus status);

    //Đếm tổng số pin theo trạng thái (cho Dashboard)
    Long countByStatus(BatteryStationStatus status);
}