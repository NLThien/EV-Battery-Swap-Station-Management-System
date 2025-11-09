package com.example.Inventory_service.service;

import org.springframework.stereotype.Service;

@Service
public class InventoryService {

    private String location;

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void updateLocation(String newLocation) {
        this.location = newLocation;
    }
}
