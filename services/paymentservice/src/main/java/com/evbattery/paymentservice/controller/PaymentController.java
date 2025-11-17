package com.evbattery.paymentservice.controller;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.evbattery.paymentservice.dto.PaymentCompletedEvent; // (MỚI) Import
import com.evbattery.paymentservice.dto.PaymentRequest;
import com.evbattery.paymentservice.dto.SepayWebhookPayload;
import com.evbattery.paymentservice.dto.UserResponse;
import com.evbattery.paymentservice.entity.PaymentLog;
import com.evbattery.paymentservice.repository.PaymentLogRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/")
public class PaymentController {

    private final PaymentLogRepository paymentLogRepository;
    private final RabbitTemplate rabbitTemplate;
    private final Queue queue;
    // private final HmacService hmacService; // (XÓA)
    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;
    
    private final String sepayWebhookApiKey; // (MỚI)
    private final String sepayBankAccount;
    private final String sepayBankName;
    private final String sepayDefaultDescription;

    @Autowired
    public PaymentController(
            PaymentLogRepository paymentLogRepository,
            RabbitTemplate rabbitTemplate,
            Queue queue,
            // HmacService hmacService, // (XÓA)
            ObjectMapper objectMapper,
            RestTemplate restTemplate,
            @Value("${sepay.webhook-api-key}") String sepayWebhookApiKey, // (MỚI)
            @Value("${sepay.bank-account}") String sepayBankAccount,
            @Value("${sepay.bank-name}") String sepayBankName,
            @Value("${sepay.default-description}") String sepayDefaultDescription) {
        
        this.paymentLogRepository = paymentLogRepository;
        this.rabbitTemplate = rabbitTemplate;
        this.queue = queue;
        // this.hmacService = hmacService; // (XÓA)
        this.objectMapper = objectMapper;
        this.restTemplate = restTemplate;
        this.sepayWebhookApiKey = sepayWebhookApiKey; // (MỚI)
        this.sepayBankAccount = sepayBankAccount;
        this.sepayBankName = sepayBankName;
        this.sepayDefaultDescription = sepayDefaultDescription;
    }

    /**
     * Endpoint nội bộ, được OrderService gọi.
     */
    @PostMapping("/create-payment-request")
    public ResponseEntity<Object> createPaymentRequest(
            @RequestBody PaymentRequest request,
            @RequestHeader(value = "Authorization", required = false) String token) {
        
        String gatewayTxnRef = request.orderId() + "_" + System.currentTimeMillis();

        PaymentLog log = new PaymentLog();
        log.setOrderId(request.orderId());
        log.setUserId(request.userId());
        log.setAmount(request.amount());
        log.setStationId(request.stationId());
        log.setGatewayTxnRef(gatewayTxnRef);

        // 1. Gọi Auth Service để lấy thông tin User
        if (token != null) {
            try {
                HttpHeaders headers = new HttpHeaders();
                headers.set("Authorization", token);
                HttpEntity<String> entity = new HttpEntity<>(headers);

                // Gọi endpoint "/users/my-info" của "auth-service" qua Eureka
                ResponseEntity<UserResponse> userResp = restTemplate.exchange(
                        "http://auth-service/users/my-info", // Tên service của Auth
                        HttpMethod.GET, 
                        entity, 
                        UserResponse.class
                );

                if (userResp.getBody() != null) {
                    UserResponse u = userResp.getBody();
                    String info = String.format("%s - %s", u.lastName(), u.phoneNumber());
                    log.setUserInfo(info);
                }
            } catch (Exception e) {
                System.err.println("Không lấy được thông tin user: " + e.getMessage());
                log.setUserInfo("Unknown User");
            }
        } else {
             log.setUserInfo("Test User (No Token)");
        }

        // 2. Lưu log PENDING
        paymentLogRepository.save(log);

        // 3. Tạo QR Code (dùng link Sepay)
        try {
            String description = sepayDefaultDescription + " " + gatewayTxnRef;
            String encodedDescription = URLEncoder.encode(description, StandardCharsets.UTF_8);

            String qrImageUrl = String.format(
                "https://qr.sepay.vn/img?acc=%s&bank=%s&amount=%.0f&des=%s",
                sepayBankAccount,
                sepayBankName,
                request.amount(),
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
            @RequestHeader("Authorization") String authorizationHeader) { // Nhận header "Authorization"
        try {
            String expectedAuthHeader = "Apikey " + sepayWebhookApiKey;

            if (authorizationHeader == null || !Objects.equals(authorizationHeader, expectedAuthHeader)) {
            
                 return ResponseEntity.status(401).body("Invalid or missing API Key");
            }
            
            // 3. Tìm log
            PaymentLog log = paymentLogRepository.findByGatewayTxnRef(payload.orderId()).orElse(null);
            
            if (log == null || !"PENDING".equals(log.getStatus())) {
                return ResponseEntity.badRequest().body("Giao dịch không hợp lệ");
            }

            // 4. Cập nhật trạng thái
            if ("SUCCESS".equals(payload.status())) {
                log.setStatus("PAID");
                paymentLogRepository.save(log);
                rabbitTemplate.convertAndSend(queue.getName(), new PaymentCompletedEvent(log.getOrderId()));
            } else {
                log.setStatus("FAILED");
                paymentLogRepository.save(log);
            }
            
            return ResponseEntity.ok("Webhook received");
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("Failed to process webhook: " + ex.getMessage());
        }
    }

    
    @GetMapping("/transactions")
    public ResponseEntity<Object> getTransactionHistory(
            @RequestHeader(name = "X-User-Id", required = false) String userId,
            @RequestHeader(name = "X-User-Role", required = false) String userRole) {
        
        // mock dữ liệu khi chạy local
        if (userId == null) userId = "TEST_USER_ID_MOCK";
        if (userRole == null) userRole = "admin"; 
        
        List<PaymentLog> transactions;
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");

        if ("customer".equalsIgnoreCase(userRole)) {
            transactions = paymentLogRepository.findByUserId(userId, sort);
        } else if ("admin".equalsIgnoreCase(userRole) || "staff".equalsIgnoreCase(userRole)) {
            transactions = paymentLogRepository.findAll(sort);
        } else {
            return ResponseEntity.status(403).body("Không có quyền truy cập");
        }
        
        return ResponseEntity.ok(Map.of("transactions", transactions));
    }

    //giả lập thanh toán
    @GetMapping("/simulate-success")
    public ResponseEntity<String> simulateSepaySuccess(@RequestParam String orderId) {
        
        PaymentLog log = paymentLogRepository.findByOrderId(orderId).orElse(null);
        
        if (log == null || !"PENDING".equals(log.getStatus())) {
            return ResponseEntity.badRequest().body("Giao dịch không hợp lệ hoặc đã xử lý.");
        }

        log.setStatus("PAID");
        paymentLogRepository.save(log);
        
        rabbitTemplate.convertAndSend(queue.getName(), new PaymentCompletedEvent(log.getOrderId()));
        
        return ResponseEntity.ok("Đã giả lập thanh toán THÀNH CÔNG cho đơn hàng: " + orderId);
    }
}