package com.example.paymentservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.io.Serializable;

@Data
@AllArgsConstructor
public class PaymentCompletedEvent implements Serializable {
    private String orderId;
}