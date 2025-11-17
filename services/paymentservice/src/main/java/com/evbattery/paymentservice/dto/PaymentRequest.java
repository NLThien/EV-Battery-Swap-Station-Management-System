package com.evbattery.paymentservice.dto;

public record PaymentRequest(
    String orderId,
    Double amount,
    String orderInfo,
    String userId,
    String userEmail,
    String stationId
) {}