package com.evbattery.paymentservice.repository;

import com.evbattery.paymentservice.entity.PaymentLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentLogRepository extends JpaRepository<PaymentLog, Long> {
    Optional<PaymentLog> findByGatewayTxnRef(String gatewayTxnRef);
    List<PaymentLog> findByUserIdOrderByCreatedAtDesc(String userId);
    Optional<PaymentLog> findFirstByOrderId(String orderId);
}
