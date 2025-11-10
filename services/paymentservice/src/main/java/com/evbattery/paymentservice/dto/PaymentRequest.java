package com.evbattery.paymentservice.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    private String orderId;
    private String userId;
    private double amount;
    private String description;
}
