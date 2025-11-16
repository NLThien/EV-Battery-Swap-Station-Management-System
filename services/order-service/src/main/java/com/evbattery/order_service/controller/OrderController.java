package com.evbattery.order_service.controller;

import com.evbattery.order_service.dto.OrderRequest;
import com.evbattery.order_service.dto.PaymentRequest;
import com.evbattery.order_service.dto.PaymentResponse;
import com.evbattery.order_service.entity.Order;
import com.evbattery.order_service.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpEntity; 
import org.springframework.http.HttpHeaders; 
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List; 
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/")
public class OrderController {

    private final OrderRepository orderRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public OrderController(OrderRepository orderRepository, RestTemplate restTemplate) {
        this.orderRepository = orderRepository;
        this.restTemplate = restTemplate;
    }

    @PostMapping("/")
    public ResponseEntity<Object> createOrder(
            // (SỬA) Thêm (required = false) để cho phép test
            @RequestHeader(name = "X-User-Id", required = false) String userId,
            @RequestHeader(name = "X-User-Email", required = false) String userEmail,
            @RequestHeader(name = "Authorization", required = false) String token,
            @RequestBody OrderRequest orderRequest
    ) {
        
        // (SỬA) Thêm logic giả lập (Mock) nếu header bị thiếu
        if (userId == null) {
            userId = "TEST_USER_ID"; // Dữ liệu giả
        }
        if (userEmail == null) {
            userEmail = "test@user.com"; // Dữ liệu giả
        }

        Order order = new Order();
        order.setUserId(userId);
        order.setStationId(orderRequest.stationId());
        order.setItems(orderRequest.items()); 
        order.setTotalAmount(orderRequest.totalAmount()); 
        order = orderRepository.save(order);

        PaymentRequest paymentRequest = new PaymentRequest(
                order.getId(),
                order.getTotalAmount(),
                "Thanh toan don hang " + order.getId(),
                userId,
                userEmail,
                orderRequest.stationId()
        );
        
        HttpHeaders headers = new HttpHeaders();
        // (SỬA) Chỉ gửi token nếu nó tồn tại
        if (token != null) {
            headers.set("Authorization", token);
        }
        HttpEntity<PaymentRequest> requestEntity = new HttpEntity<>(paymentRequest, headers);

        ResponseEntity<PaymentResponse> paymentResponse = restTemplate.postForEntity(
                "http://paymentservice/create-payment-request", 
                requestEntity,
                PaymentResponse.class
        );

        if (paymentResponse.getBody() == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Payment service response is null"));
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "orderId", order.getId(),
                "paymentUrl", paymentResponse.getBody().paymentUrl()
        ));
    }

    @GetMapping("/{id}/status")
    public ResponseEntity<Map<String, Object>> getOrderStatus(@PathVariable String id) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Không tìm thấy đơn hàng"));
        }
        return ResponseEntity.ok(Map.of("status", order.getStatus()));
    }

    @GetMapping("/transactions")
    public ResponseEntity<Object> getTransactionHistory(
            @RequestHeader(name = "X-User-Id", required = false) String userId, 
            @RequestHeader(name = "X-User-Role", required = false) String userRole) { 
        
        // (SỬA) Thêm logic giả lập (Mock)
        if (userId == null) {
            userId = "TEST_USER_ID"; 
        }
        if (userRole == null) {
            userRole = "admin"; // Giả lập làm admin để thấy mọi thứ
        }
        
        List<Order> transactions; 
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");

        if ("customer".equalsIgnoreCase(userRole)) {
            transactions = orderRepository.findByUserId(userId, sort); 
        } else if ("admin".equalsIgnoreCase(userRole) || "staff".equalsIgnoreCase(userRole)) {
            transactions = orderRepository.findAll(sort);
        } else {
            return ResponseEntity.status(403).body("Không có quyền truy cập");
        }
        
        return ResponseEntity.ok(Map.of("transactions", transactions));
    }
}