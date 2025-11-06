package com.example.paymentservice.controller;

import com.example.paymentservice.dto.PaymentCompletedEvent;
import com.example.paymentservice.dto.PaymentRequest;
import com.example.paymentservice.dto.SepayWebhookPayload;
import com.example.paymentservice.model.PaymentLog;
import com.example.paymentservice.repository.PaymentLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.paymentservice.service.HmacService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.paymentservice.service.HmacService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentLogRepository paymentLogRepository;
    private final RabbitTemplate rabbitTemplate;
    private final Queue queue;

    @PostMapping("/create-payment-request")
    public ResponseEntity<?> createPaymentRequest(@RequestBody PaymentRequest request) {
        String gatewayTxnRef = request.getOrderId() + "_" + System.currentTimeMillis();

        // 1. Lưu log PENDING
        PaymentLog log = new PaymentLog();
        log.setOrderId(request.getOrderId());
        log.setUserId(request.getUserId());
        log.setAmount(request.getAmount());
        log.setGatewayTxnRef(gatewayTxnRef);
        paymentLogRepository.save(log);

        // 2. Gọi API Sepay thật
        try {
            String sepayApiUrl = System.getenv().getOrDefault("SEPAY_API_URL", "https://api.sepay.example/v1/payments");
            String sepayApiKey = System.getenv().getOrDefault("SEPAY_API_KEY", "your-sepay-key");
            String sepaySecret = System.getenv().getOrDefault("SEPAY_SECRET", "your-sepay-secret");

            Map<String, Object> sepayPayload = Map.of(
            "order_id", gatewayTxnRef,
            "amount", request.getAmount(),
            "currency", "VND",
            "description", "Thanh toan cho don " + request.getOrderId(),
            "return_url", request.getReturnUrl() == null ? "https://your.app/return" : request.getReturnUrl()
            );

            ObjectMapper mapper = new ObjectMapper();
            String body = mapper.writeValueAsString(sepayPayload);

            // Tạo chữ ký HMAC-SHA256 theo secret (Sepay thường yêu cầu)
            javax.crypto.Mac mac = javax.crypto.Mac.getInstance("HmacSHA256");
            javax.crypto.spec.SecretKeySpec keySpec = new javax.crypto.spec.SecretKeySpec(
            sepaySecret.getBytes(java.nio.charset.StandardCharsets.UTF_8),
            "HmacSHA256"
            );
            mac.init(keySpec);
            String signature = java.util.Base64.getEncoder().encodeToString(mac.doFinal(body.getBytes(java.nio.charset.StandardCharsets.UTF_8)));

            org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
            headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);
            headers.set("X-Sepay-Key", sepayApiKey);
            headers.set("X-Sepay-Signature", signature);

            org.springframework.http.HttpEntity<String> entity = new org.springframework.http.HttpEntity<>(body, headers);
            org.springframework.web.client.RestTemplate rest = new org.springframework.web.client.RestTemplate();
            org.springframework.http.ResponseEntity<String> resp = rest.postForEntity(sepayApiUrl, entity, String.class);

            if (resp.getStatusCode().is2xxSuccessful()) {
            // nếu muốn có thể parse response để lấy payment url / txn id
            // Map<?,?> respMap = mapper.readValue(resp.getBody(), Map.class);
            // String sepayPaymentUrl = respMap.get("payment_url") != null ? respMap.get("payment_url").toString() : null;

            // Giữ trạng thái PENDING (đã lưu trước đó). Có thể lưu response nếu model hỗ trợ.
            log.setStatus("PENDING");
            paymentLogRepository.save(log);
            } else {
            log.setStatus("FAILED");
            paymentLogRepository.save(log);
            }
        } catch (Exception ex) {
            // Nếu gọi Sepay thất bại, mark FAILED và tiếp tục trả về lỗi
            log.setStatus("FAILED");
            paymentLogRepository.save(log);
            return ResponseEntity.status(500).body(Map.of("error", "Failed to call Sepay", "detail", ex.getMessage()));
        }

        // 3. GIẢ LẬP TẠO QR (Dùng API VietQR)
        String qrImageUrl = String.format(
            "https://api.vietqr.io/image/970436-123456789-VND-%.0f-Thanh toan %s.png",
            request.getAmount(),
            gatewayTxnRef
        );

        return ResponseEntity.ok(Map.of("paymentUrl", qrImageUrl));
    }

//    @PostMapping("/sepay_webhook")
//     public ResponseEntity<?> handleSepayWebhook(
//     ) {        @RequestBody String rawPayload, 
//             @RequestHeader("X-Sepay-Signature") String signatureFromHeader 
//     ) {
//           if (!hmacService.isValidSignature(rawPayload, signatureFromHeader, sepayWebhookSecret)) {
//                 return ResponseEntity.status(400).body("Invalid signature");
//             }sitory.findByGatewayTxnRef(payload.getOrderId()).orElse(null);
//             if (log == null || !"PENDING".equals(log.getStatus())) {
//                 return ResponseEntity.badRequest().body("Giao dịch không hợp lệ");
//             }

//             // 4. Cập nhật trạng thái
//             if ("SUCCESS".equals(payload.getStatus())) {
//                 log.setStatus("PAID");
//                 paymentLogRepository.save(log);
//                 rabbitTemplate.convertAndSend(queue.getName(), new PaymentCompletedEvent(log.getOrderId()));
//             } else {
//                 log.setStatus("FAILED");
//                 paymentLogRepository.save(log);
//             }
            
//             return ResponseEntity.ok("Webhook received");

//         } catch (Exception ex) {
//             return ResponseEntity.status(500).body("Failed to process webhook: " + ex.getMessage());
//         }
//     }
// }