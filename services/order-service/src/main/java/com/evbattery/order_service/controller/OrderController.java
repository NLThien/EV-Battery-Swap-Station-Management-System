package com.evbattery.order_service.controller;

import java.math.BigDecimal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus; // Đảm bảo đã tạo DTO này
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.evbattery.order_service.dto.OrderRequest;
import com.evbattery.order_service.dto.PackageResponse;
import com.evbattery.order_service.dto.PaymentRequest;
import com.evbattery.order_service.dto.PaymentResponse;
import com.evbattery.order_service.dto.UserResponse;
import com.evbattery.order_service.entity.Order;
import com.evbattery.order_service.repository.OrderRepository;

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
            @RequestHeader(name = "Authorization", required = false) String token,
            @RequestBody OrderRequest orderRequest
    ) {
        
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Vui lòng đăng nhập"));
        }

        String realUserId;
        String realUserEmail;

        try {
            HttpHeaders authHeaders = new HttpHeaders();
            authHeaders.set("Authorization", token);
            HttpEntity<String> authEntity = new HttpEntity<>(authHeaders);

            // Gọi Auth Service để xác thực và lấy thông tin
            ResponseEntity<UserResponse> authResponse = restTemplate.exchange(
                    "http://auth-service/users/my-info",
                    HttpMethod.GET,
                    authEntity,
                    UserResponse.class
            );

            UserResponse userInfo = authResponse.getBody();
            if (userInfo == null) throw new RuntimeException("Token không hợp lệ");

            realUserId = userInfo.id(); 
            if(userInfo.email() != null && !userInfo.email().isEmpty()){
                realUserEmail = userInfo.email();
            } else {
                realUserEmail = "no-email" + realUserId + "@system@local";
            }

            String fullName = userInfo.firstName() + " " + userInfo.lastName();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Xác thực thất bại: " + e.getMessage()));
        }

        PackageResponse packageInfo = null;
        try {
            HttpHeaders pkgHeaders = new HttpHeaders();
            pkgHeaders.set("Authorization", token);
            HttpEntity<String> pkgEntity = new HttpEntity<>(pkgHeaders);
            
            ResponseEntity<PackageResponse> response = restTemplate.exchange(
                    "http://package-service/api/packages/" + orderRequest.packageId(),
                    HttpMethod.GET,
                    pkgEntity,
                    PackageResponse.class
            );
            packageInfo = response.getBody();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Lỗi kết nối Package Service"));
        }

        if (packageInfo == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Không tìm thấy gói"));
        }

        Order order = new Order();
        order.setUserId(realUserId);
        order.setStationId(orderRequest.stationId());
        order.setPackageId(orderRequest.packageId());
        order.setPackageType(packageInfo.type());
        order.setTotalAmount(packageInfo.price());
        
        order = orderRepository.save(order);

        BigDecimal amountToSend = BigDecimal.valueOf(order.getTotalAmount());

        PaymentRequest paymentRequest = new PaymentRequest(
                order.getId(),
                amountToSend,
                "Thanh toan don hang " + packageInfo.type(),
                realUserId,   
                realUserEmail, 
                orderRequest.stationId()
        );
        
        HttpHeaders payHeaders = new HttpHeaders();
        payHeaders.set("Authorization", token);
        HttpEntity<PaymentRequest> requestEntity = new HttpEntity<>(paymentRequest, payHeaders);

        try {
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
                    "packageType", packageInfo.type(),
                    "amount", order.getTotalAmount(),
                    "paymentUrl", paymentResponse.getBody().paymentUrl()
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Lỗi tạo thanh toán: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}/status")
    public ResponseEntity<Map<String, Object>> getOrderStatus(@PathVariable String id) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Không tìm thấy đơn hàng"));
        }
        return ResponseEntity.ok(Map.of("status", order.getStatus()));
    }
}