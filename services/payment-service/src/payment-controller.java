package com.example.paymentservices.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment") // <-- Khớp với đường dẫn của Gateway
public class PaymentController {

    @PostMapping("/initiate")
    public ResponseEntity<String> initiatePayment(
            @RequestBody PaymentRequestDto paymentRequest,
            @RequestHeader("X-User-Id") String userId) { // <-- Nhận userId từ header

        System.out.println("Nhận được yêu cầu thanh toán từ người dùng có ID: " + userId);
        System.out.println("Thông tin đơn hàng: " + paymentRequest.getOrderId());

        // ... Logic xử lý thanh toán của bạn ở đây ...
        
        
        String responseMessage = "Thanh toán cho người dùng " + userId + " đang được xử lý.";
        return ResponseEntity.ok(responseMessage);
    }
}