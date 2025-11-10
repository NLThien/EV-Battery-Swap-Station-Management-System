package com.example.booking_service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.booking_service.model.entity.BatteryPackage;

public interface BatteryPackageRepository extends JpaRepository<BatteryPackage, String> {
    List<BatteryPackage> findByStatus(String status);
    List<BatteryPackage> findByNameContaining(String name);
}