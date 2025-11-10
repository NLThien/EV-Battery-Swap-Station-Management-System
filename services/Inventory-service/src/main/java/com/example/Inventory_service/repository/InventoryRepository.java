package com.example.Inventory_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Inventory_service.model.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

}
