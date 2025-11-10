package com.evbattery.paymentservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "payment_logs", indexes = {
        @Index(name = "idx_order_id", columnList = "orderId"),
        @Index(name = "idx_user_id", columnList = "userId"),
        @Index(name = "idx_gateway_txn", columnList = "gatewayTxnRef")
})
public class PaymentLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String orderId;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private double amount;

    @Column(nullable = false, unique = true)
    private String gatewayTxnRef;

    @Column(nullable = false)
    private String status = "PENDING"; // PENDING, PAID, FAILED

    private String paymentUrl;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt;
}
