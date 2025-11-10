package com.evbattery.paymentservice.controller;

import com.evbattery.paymentservice.dto.*;
import com.evbattery.paymentservice.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService service;

    @PostMapping("/create")
    public ResponseEntity<?> createPayment(@RequestBody PaymentRequest request) {
        Map<String, Object> resp = service.createPayment(request);
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/webhook")
    public ResponseEntity<?> webhook(@RequestBody SepayWebhookPayload payload) {
        service.handleWebhook(payload);
        return ResponseEntity.ok(Map.of("status", "ok"));
    }

    @GetMapping("/history/user/{userId}")
    public ResponseEntity<List<PaymentDetailDto>> historyFull(@PathVariable String userId) {
        return ResponseEntity.ok(service.getHistoryByUser(userId));
    }

    @GetMapping("/history/user/{userId}/summary")
    public ResponseEntity<List<PaymentSummaryDto>> historySummary(@PathVariable String userId) {
        return ResponseEntity.ok(service.getSummaryByUser(userId));
    }

    @GetMapping("/history/order/{orderId}")
    public ResponseEntity<PaymentDetailDto> historyByOrder(@PathVariable String orderId) {
        return ResponseEntity.ok(service.getByOrderId(orderId));
    }
}
