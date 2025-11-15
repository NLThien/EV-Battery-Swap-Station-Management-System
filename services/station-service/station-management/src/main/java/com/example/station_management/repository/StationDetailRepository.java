package com.example.station_management.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.station_management.model.entity.StationDetail;

public interface StationDetailRepository extends JpaRepository<StationDetail, String> {
    
    // Tìm StationDetail theo station ID
    Optional<StationDetail> findByStationId(String stationId);
    
    // Tìm StationDetail theo manager ID
    List<StationDetail> findByManagerId(String managerId);
    
    // Tìm StationDetail theo số slot khả dụng
    List<StationDetail> findByAvailableSlotsGreaterThan(Integer minSlots);
    
    // Thống kê tổng số slot theo manager
    @Query("SELECT SUM(sd.totalSlots) FROM StationDetail sd WHERE sd.managerId = :managerId")
    Integer getTotalSlotsByManager(@Param("managerId") String managerId);
    
    // Cập nhật số slot khả dụng
    @Query("UPDATE StationDetail sd SET sd.availableSlots = :availableSlots WHERE sd.id = :id")
    void updateAvailableSlots(@Param("id") String id, @Param("availableSlots") Integer availableSlots);
    
    // Kiểm tra tồn tại theo station ID
    boolean existsByStationId(String stationId);
}