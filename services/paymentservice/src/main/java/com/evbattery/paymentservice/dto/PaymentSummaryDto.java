package com.evbattery.paymentservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class PaymentSummaryDto {
    private String orderId;
    private double amount;
    private String status;
    private LocalDateTime createdAt;
}
