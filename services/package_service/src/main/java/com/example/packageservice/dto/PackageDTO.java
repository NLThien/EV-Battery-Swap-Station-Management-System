package com.example.packageservice.dto;

import com.example.packageservice.model.PackageEntity;

public class PackageDTO {
    private Long id;
    private String type;
    private int quantity;
    private String description;
    private double price;

    public PackageDTO(PackageEntity pkg) {
        this.id = pkg.getId();
        this.type = pkg.getType();
        this.quantity = pkg.getQuantity();
        this.description = pkg.getDescription();
        this.price = pkg.getPrice();
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
}
