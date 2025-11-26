package com.evbattery.paymentservice.controller;

import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import com.evbattery.paymentservice.dto.PaymentCompletedEvent;
import com.evbattery.paymentservice.dto.PaymentRequest;
import com.evbattery.paymentservice.dto.SepayWebhookPayload;
import com.evbattery.paymentservice.dto.UserResponse;
import com.evbattery.paymentservice.entity.PaymentLog;
import com.evbattery.paymentservice.repository.PaymentLogRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/")
public class PaymentController {

    private final PaymentLogRepository paymentLogRepository;
    private final RabbitTemplate rabbitTemplate;
    private final Queue queue;
    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;
    
    private final String sepayWebhookApiKey;
    private final String sepayBankAccount;
    private final String sepayBankName;
    private final String sepayDefaultDescription;

    @Autowired
    public PaymentController(
            PaymentLogRepository paymentLogRepository,
            RabbitTemplate rabbitTemplate,
            Queue queue,
            ObjectMapper objectMapper,
            RestTemplate restTemplate,
            @Value("${sepay.webhook-api-key}") String sepayWebhookApiKey,
            @Value("${sepay.bank-account}") String sepayBankAccount,
            @Value("${sepay.bank-name}") String sepayBankName,
            @Value("${sepay.default-description}") String sepayDefaultDescription) {
        
        this.paymentLogRepository = paymentLogRepository;
        this.rabbitTemplate = rabbitTemplate;
        this.queue = queue;
        this.objectMapper = objectMapper;
        this.restTemplate = restTemplate;
        this.sepayWebhookApiKey = sepayWebhookApiKey;
        this.sepayBankAccount = sepayBankAccount;
        this.sepayBankName = sepayBankName;
        this.sepayDefaultDescription = sepayDefaultDescription;
    }

    
    @PostMapping("/create-payment-request")
    public ResponseEntity<Object> createPaymentRequest(
            @RequestBody PaymentRequest request,
            @RequestHeader(value = "Authorization", required = false) String token) {
        
        // Tạo mã tham chiếu duy nhất: OrderID + Timestamp
        String gatewayTxnRef = request.orderId() + "_" + System.currentTimeMillis();

        PaymentLog log = new PaymentLog();
        log.setOrderId(request.orderId());
        log.setUserId(request.userId());
        log.setAmount(request.amount());
        log.setStationId(request.stationId());
        log.setGatewayTxnRef(gatewayTxnRef);
        log.setStatus("PENDING");

        if (token != null) {
            try {
                HttpHeaders headers = new HttpHeaders();
                headers.set("Authorization", token);
                HttpEntity<String> entity = new HttpEntity<>(headers);

                ResponseEntity<UserResponse> userResp = restTemplate.exchange(
                        "http://auth-service/users/my-info", 
                        HttpMethod.GET, 
                        entity, 
                        UserResponse.class
                );

                if (userResp.getBody() != null) {
                    UserResponse u = userResp.getBody();
                    String info = String.format("%s %s - %s", u.firstName(), u.lastName(), u.phoneNumber());
                    log.setUserInfo(info);
                }
            } catch (Exception e) {
                System.err.println("Lỗi lấy thông tin user: " + e.getMessage());
                log.setUserInfo("Unknown User");
            }
        } else {
             log.setUserInfo("Test User (No Token)");
        }

        paymentLogRepository.save(log);

        // Tạo link QR Code
        try {
            String description = sepayDefaultDescription + " " + gatewayTxnRef;
            String encodedDescription = URLEncoder.encode(description, StandardCharsets.UTF_8);

            String qrImageUrl = String.format(
                "https://qr.sepay.vn/img?acc=%s&bank=%s&amount=%.0f&des=%s",
                sepayBankAccount,
                sepayBankName,
                request.amount().doubleValue(),
                encodedDescription
            );

            return ResponseEntity.ok(Map.of("paymentUrl", qrImageUrl));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Không thể tạo mã QR"));
        }
    }

    @PostMapping("/sepay_webhook")
    public ResponseEntity<String> handleSepayWebhook(
            @RequestBody SepayWebhookPayload payload,
            @RequestHeader("Authorization") String authorizationHeader) {
        
        try {
            String expectedAuthHeader = "Apikey " + sepayWebhookApiKey;
            
            if (authorizationHeader == null || !Objects.equals(authorizationHeader, expectedAuthHeader)) {
                 return ResponseEntity.status(401).body("Invalid or missing API Key");
            }

            if (!"in".equalsIgnoreCase(payload.transferType())) {
                return ResponseEntity.ok("Ignored outgoing transaction");
            }

            String content = payload.content();
            String gatewayTxnRef = null;
            
            if (content != null && content.contains(sepayDefaultDescription)) {
                String[] parts = content.split(sepayDefaultDescription);
                if (parts.length > 1) {
                    gatewayTxnRef = parts[1].trim().split(" ")[0]; 
                }
            }

            if (gatewayTxnRef == null) {
                return ResponseEntity.ok("Transaction ref not found in content");
            }

            PaymentLog log = paymentLogRepository.findByGatewayTxnRef(gatewayTxnRef).orElse(null);
            
            if (log == null) {
                return ResponseEntity.ok("Transaction not found in system");
            }
            
            if (!"PENDING".equals(log.getStatus())) {
                return ResponseEntity.ok("Transaction already processed");
            }

            if (payload.transferAmount() == null) {
                return ResponseEntity.ok("Amount is null");
            }


            BigDecimal receivedAmount = BigDecimal.valueOf(payload.transferAmount());
            BigDecimal expectedAmount = log.getAmount();


            if (receivedAmount.compareTo(expectedAmount) < 0) {
                log.setStatus("FAILED");
                paymentLogRepository.save(log);
                return ResponseEntity.ok("Amount mismatch");
            }
            // -------------------------------

            log.setStatus("PAID");
            paymentLogRepository.save(log);
            
            rabbitTemplate.convertAndSend(queue.getName(), new PaymentCompletedEvent(log.getOrderId()));
            
            return ResponseEntity.ok("Webhook processed successfully");

        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(500).body("Failed: " + ex.getMessage());
        }
    }

    @GetMapping("/transactions")
    public ResponseEntity<Object> getTransactionHistory(
            @RequestHeader(name = "X-User-Id", required = false) String userId,
            @RequestHeader(name = "X-User-Role", required = false) String userRole) {
        
        if (userId == null) userId = "TEST_USER_ID_MOCK";
        if (userRole == null) userRole = "ADMIN"; 
        
        List<PaymentLog> transactions;
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        String role = userRole.toUpperCase();

        if (role.equals("USER")) {
            transactions = paymentLogRepository.findByUserId(userId, sort);
        } else if (role.equals("ADMIN") || role.equals("STAFF")) {
            transactions = paymentLogRepository.findAll(sort);
        } else {
            return ResponseEntity.status(403).body("Không có quyền truy cập");
        }
        
        return ResponseEntity.ok(Map.of("transactions", transactions));
    }

    @GetMapping("/simulate-success")
    public ResponseEntity<String> simulateSepaySuccess(@RequestParam String orderId) {
        
        List<PaymentLog> logs = paymentLogRepository.findByOrderId(orderId);

        PaymentLog log = (logs.isEmpty()) ? null : logs.get(logs.size() - 1);

        if (log == null || !"PENDING".equals(log.getStatus())) {
            return ResponseEntity.badRequest().body("Giao dịch không hợp lệ hoặc đã xử lý.");
        }

        log.setStatus("PAID");
        paymentLogRepository.save(log);
        
        rabbitTemplate.convertAndSend(queue.getName(), new PaymentCompletedEvent(log.getOrderId()));
        
        return ResponseEntity.ok("Đã giả lập thanh toán THÀNH CÔNG cho đơn hàng: " + orderId);
    }
}