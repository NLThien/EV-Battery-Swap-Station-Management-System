package com.evbattery.order_service.entity;

import java.util.Date;
import java.util.UUID;
import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {
    
    @Id
    @Column(updatable = false, nullable = false)
    private String id;
    
    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private String stationId;

    @Column(nullable = false)
    private Long packageId;


    @Column(name = "package_type") 
    private String packageType; 

    @Column(nullable = false) 
    private Double totalAmount;

    private String status;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    public Order() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getStationId() { return stationId; }
    public void setStationId(String stationId) { this.stationId = stationId; }
    
    public Long getPackageId() { return packageId; }
    public void setPackageId(Long packageId) { this.packageId = packageId; }

    public String getPackageType() { return packageType; }
    public void setPackageType(String packageType) { this.packageType = packageType; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    @PrePersist
    protected void onCreate() {
        if (this.id == null) this.id = UUID.randomUUID().toString();
        this.createdAt = new Date();
        this.status = "PENDING";
    }
}