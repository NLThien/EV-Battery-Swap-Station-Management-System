package com.example.station_management.repository;

import com.example.station_management.model.entity.Station;
import com.example.station_management.model.enums.StationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StationRepository extends JpaRepository<Station, String> {
    
    List<Station> findByStatus(StationStatus status);
    
    List<Station> findByManagerId(String managerId);
    
    @Query("SELECT COUNT(s) FROM Station s WHERE s.status = :status")
    Long countByStatus(StationStatus status);
    
    @Query("SELECT s FROM Station s WHERE " +
           "(:name IS NULL OR LOWER(s.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:status IS NULL OR s.status = :status)")
    List<Station> searchStations(String name, StationStatus status);
}