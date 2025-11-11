package com.example.packageservice.model;

import jakarta.persistence.*;

@Entity
@Table(name = "packages")
public class PackageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;          // Ngày / Tuần / Tháng
    private int quantity;         // Số lượng pin
    private String description;   // Mô tả chi tiết
    private double price;         // Đơn giá

    public PackageEntity() {}

    public PackageEntity(String type, int quantity, String description, double price) {
        this.type = type;
        this.quantity = quantity;
        this.description = description;
        this.price = price;
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
