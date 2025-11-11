package com.example.Inventory_service.service;

import java.util.List;

import com.example.Inventory_service.model.Inventory;

public interface InventoryService {

    Inventory createBattery(Inventory inventory);

    List<Inventory> handleGetBatteries();

    Inventory handleUpdateInventory(Long id, Inventory updataBattery);

    void handleDeleteInventory(Long id);
}
