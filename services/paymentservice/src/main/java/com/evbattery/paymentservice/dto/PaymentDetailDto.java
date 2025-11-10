package com.evbattery.paymentservice.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PaymentDetailDto {
    private Long id;
    private String orderId;
    private String userId;
    private double amount;
    private String gatewayTxnRef;
    private String status;
    private String paymentUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
