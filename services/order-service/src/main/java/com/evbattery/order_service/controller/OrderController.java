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
@RequestMapping("/orders")
public class OrderController {

    private final OrderRepository orderRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public OrderController(OrderRepository orderRepository, RestTemplate restTemplate) {
        this.orderRepository = orderRepository;
        this.restTemplate = restTemplate;
    }

    @PostMapping("/orders")
    public ResponseEntity<Map<String, Object>> createOrder(
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader("X-User-Email") String userEmail,
            @RequestHeader("Authorization") String token,
            @RequestBody OrderRequest orderRequest
    ) {
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
        headers.set("Authorization", token);
        HttpEntity<PaymentRequest> requestEntity = new HttpEntity<>(paymentRequest, headers);

        // (SỬA) Đổi tên biến để fix lỗi "cannot find symbol response"
        ResponseEntity<PaymentResponse> paymentResponse = restTemplate.postForEntity(
                "http://payment-services/create-payment-request", 
                requestEntity,
                PaymentResponse.class
        );

        if (paymentResponse.getBody() == null || 
            paymentResponse.getBody().paymentUrl() == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "error", "Không thể tạo yêu cầu thanh toán"
            ));
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "orderId", order.getId(),
                "paymentUrl", paymentResponse.getBody().paymentUrl() // (SỬA)
        ));
    }

    @GetMapping("/{id}/status")
    public ResponseEntity<Map<String, Object>> getOrderStatus(@PathVariable String id) {
        Order order = orderRepository.findById(id).orElse(null); // Lỗi 'findById' sẽ hết
        if (order == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Không tìm thấy đơn hàng"));
        }
        return ResponseEntity.ok(Map.of("status", order.getStatus()));
    }

    @GetMapping("/transactions")
    public ResponseEntity<Object> getTransactionHistory(

            @RequestHeader("X-User-Id") String userId, 
            @RequestHeader("X-User-Role") String userRole) {
                if (userId == null || userRole == null) {
            return ResponseEntity.status(400).body("Thiếu thông tin xác thực");
            }
        
        List<Order> transactions; // (SỬA) Kiểu dữ liệu
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