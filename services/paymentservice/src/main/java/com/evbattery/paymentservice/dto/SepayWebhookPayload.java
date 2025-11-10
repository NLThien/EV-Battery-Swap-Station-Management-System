package com.evbattery.paymentservice.dto;

import lombok.Data;

@Data
public class SepayWebhookPayload {
    private String orderId; // here we expect gatewayTxnRef
    private String status; // SUCCESS | FAILED
    private String signature; // sepay signature
    private double amount;
}
