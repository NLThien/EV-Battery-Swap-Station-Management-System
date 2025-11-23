package com.evbattery.paymentservice.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record SepayWebhookPayload(
    @JsonProperty("id") Long id, // ID giao dịch của Sepay
    @JsonProperty("gateway") String gateway, // Ngân hàng (VD: TPBank)
    @JsonProperty("transactionDate") String transactionDate,
    @JsonProperty("accountNumber") String accountNumber,
    @JsonProperty("content") String content, // Nội dung chuyển khoản (Chứa mã đơn hàng)
    @JsonProperty("transferType") String transferType, // "in" (tiền vào) hoặc "out"
    @JsonProperty("transferAmount") Double transferAmount, // Số tiền
    @JsonProperty("referenceCode") String referenceCode
) {}