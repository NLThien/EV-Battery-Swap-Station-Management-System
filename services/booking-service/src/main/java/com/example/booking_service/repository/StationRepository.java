package com.example.booking_service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.booking_service.model.entity.Station;

public interface StationRepository extends JpaRepository<Station, Long> {

    List<Station> findById(Station id);

    List<Station> findByName(String name);

    List<Station> findByLocation(String location);

    List<Station> findByAvailableSlotsGreaterThan(Integer slots);

    List<Station> findByNameContaining(String name);

    List<Station> findByLocationAndAvailableSlotsGreaterThan(String location, Integer slots);
    
}
