package com.evbattery.paymentservice.dto;
import java.math.BigDecimal;

public record PaymentRequest(
    String orderId,
    BigDecimal amount,
    String orderInfo,
    String userId,
    String userEmail,
    String stationId
) {}