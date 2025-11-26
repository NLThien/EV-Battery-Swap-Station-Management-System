package com.evbattery.paymentservice.entity;

import java.util.Date;
import java.util.UUID;
import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "payment_logs")

public class PaymentLog {
    
    @Id
    @Column(updatable = false, nullable = false)
    private String id;
    
    @Column(nullable = false)
    private String orderId;
    
    @Column(nullable = false)
    private String userId;

    private String stationId;

    private String userInfo;
    
    private BigDecimal amount;
    private String status;

    
    
    @Column(unique = true, nullable = false)
    private String gatewayTxnRef;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;


    public PaymentLog() {
    }


    
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getStationIḍ() { return stationId; }
    public void setStationId(String stationId) { this.stationId = stationId; }

    public String getUserInfo() { return userInfo; }
    public void setUserInfo(String userInfo) { this.userInfo = userInfo; }

    
    public String getGatewayTxnRef() { return gatewayTxnRef; }
    public void setGatewayTxnRef(String gatewayTxnRef) { this.gatewayTxnRef = gatewayTxnRef; }
    
    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    @PrePersist
    protected void onCreate() {
        if (this.id == null) {
             this.id = UUID.randomUUID().toString();
        }
        this.createdAt = new Date();
        this.status = "PENDING";
    }
}