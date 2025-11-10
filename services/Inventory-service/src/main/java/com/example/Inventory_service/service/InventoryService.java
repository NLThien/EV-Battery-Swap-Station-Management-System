package com.example.Inventory_service.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Inventory_service.model.Inventory;
import com.example.Inventory_service.repository.InventoryRepository;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public Inventory saveBattery(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    public List<Inventory> getAllBatteries() {
        return inventoryRepository.findAll();
    }
}
