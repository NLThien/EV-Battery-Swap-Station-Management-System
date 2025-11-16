package com.example.Inventory_service.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Inventory_service.model.Inventory;
import com.example.Inventory_service.repository.InventoryRepository;
import com.example.Inventory_service.service.InventoryService;

@Service
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryServiceImpl(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public Inventory createBattery(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    public List<Inventory> handleGetBatteries() {
        return this.inventoryRepository.findAll();
    }

    public Inventory handleUpdateInventory(Long id, Inventory updateBattery) {
        return inventoryRepository.findById(id).map(battery -> {
            battery.setModel(updateBattery.getModel());
            battery.setCapacity(updateBattery.getCapacity());
            battery.setChargeLevel(updateBattery.getChargeLevel());
            battery.setStatus(updateBattery.getStatus());
            battery.setHealth(updateBattery.getHealth());
            battery.setStationId(updateBattery.getStationId());
            return inventoryRepository.save(battery);
        }).orElseThrow(() -> new RuntimeException("Battery not found with id " + id));
    }

    public void handleDeleteInventory(Long id) {
        this.inventoryRepository.deleteById(id);
    }
}
