package com.evbattery.paymentservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record SepayWebhookPayload(
    @JsonProperty("order_id") String orderId,
    @JsonProperty("status") String status
) {}