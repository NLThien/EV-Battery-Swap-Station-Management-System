package com.evbattery.paymentservice.service;

import com.evbattery.paymentservice.config.RabbitConfig;
import com.evbattery.paymentservice.dto.*;
import com.evbattery.paymentservice.entity.PaymentLog;
import com.evbattery.paymentservice.repository.PaymentLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final PaymentLogRepository repo;
    private final RabbitTemplate rabbitTemplate;

    // 1. Create payment: save PENDING and return payment URL (mock Sepay or QR)
    public Map<String, Object> createPayment(PaymentRequest req) {
        String gatewayTxnRef = req.getOrderId() + "_" + System.currentTimeMillis();

        PaymentLog log = new PaymentLog();
        log.setOrderId(req.getOrderId());
        log.setUserId(req.getUserId());
        log.setAmount(req.getAmount());
        log.setGatewayTxnRef(gatewayTxnRef);
        log.setStatus("PENDING");
        log.setCreatedAt(LocalDateTime.now());

        // mock payment url — in real integrate SEPay API here and update paymentUrl
        String paymentUrl = String.format("https://sandbox.sepay.vn/pay/%s", gatewayTxnRef);
        log.setPaymentUrl(paymentUrl);

        repo.save(log);
        log.info("Saved payment log: {}" + gatewayTxnRef);

        return Map.of("gatewayTxnRef", gatewayTxnRef, "paymentUrl", paymentUrl);
    }

    // 2. Handle webhook from SEPay
    public void handleWebhook(SepayWebhookPayload payload) {
        boolean valid = verifySignature(payload);
        if (!valid) {
            log.warn("Invalid signature in webhook for {}", payload.getOrderId());
            throw new RuntimeException("Invalid signature");
        }

        // find log by gatewayTxnRef (payload.orderId expected to be gatewayTxnRef)
        PaymentLog logEntity = repo.findByGatewayTxnRef(payload.getOrderId())
                .orElseThrow(() -> new RuntimeException("Payment log not found"));

        // idempotency: only process if PENDING
        if (!"PENDING".equalsIgnoreCase(logEntity.getStatus())) {
            log.info("Ignoring webhook for non-pending txn {} status={}", logEntity.getGatewayTxnRef(), logEntity.getStatus());
            return;
        }

        if ("SUCCESS".equalsIgnoreCase(payload.getStatus())) {
            logEntity.setStatus("PAID");
            logEntity.setUpdatedAt(LocalDateTime.now());
            repo.save(logEntity);

            // publish event
            rabbitTemplate.convertAndSend(RabbitConfig.PAYMENT_COMPLETED_QUEUE, new PaymentCompletedEvent(logEntity.getOrderId()));
            log.info("Payment success for {} -> event published", logEntity.getOrderId());
        } else {
            logEntity.setStatus("FAILED");
            logEntity.setUpdatedAt(LocalDateTime.now());
            repo.save(logEntity);
            log.info("Payment failed for {}", logEntity.getOrderId());
        }
    }

    // 3. History full
    public List<PaymentDetailDto> getHistoryByUser(String userId) {
        List<PaymentLog> logs = repo.findByUserIdOrderByCreatedAtDesc(userId);
        return logs.stream().map(this::toDetailDto).collect(Collectors.toList());
    }

    // summary
    public List<PaymentSummaryDto> getSummaryByUser(String userId) {
        List<PaymentLog> logs = repo.findByUserIdOrderByCreatedAtDesc(userId);
        return logs.stream().map(l -> new PaymentSummaryDto(l.getOrderId(), l.getAmount(), l.getStatus(), l.getCreatedAt()))
                .collect(Collectors.toList());
    }

    public PaymentDetailDto getByOrderId(String orderId) {
        PaymentLog l = repo.findFirstByOrderId(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        return toDetailDto(l);
    }

    private PaymentDetailDto toDetailDto(PaymentLog l) {
        PaymentDetailDto d = new PaymentDetailDto();
        d.setId(l.getId());
        d.setOrderId(l.getOrderId());
        d.setUserId(l.getUserId());
        d.setAmount(l.getAmount());
        d.setGatewayTxnRef(l.getGatewayTxnRef());
        d.setStatus(l.getStatus());
        d.setPaymentUrl(l.getPaymentUrl());
        d.setCreatedAt(l.getCreatedAt());
        d.setUpdatedAt(l.getUpdatedAt());
        return d;
    }

    // Placeholder: verify signature (implement using SEPay spec)
    private boolean verifySignature(SepayWebhookPayload payload) {
        return true;
    }
}
