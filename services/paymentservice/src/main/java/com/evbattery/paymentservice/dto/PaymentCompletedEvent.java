package com.evbattery.paymentservice.dto;

import java.io.Serializable;

public record PaymentCompletedEvent(
    String orderId
) implements Serializable {}