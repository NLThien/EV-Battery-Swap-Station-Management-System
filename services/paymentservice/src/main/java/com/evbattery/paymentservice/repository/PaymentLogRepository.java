package com.evbattery.paymentservice.repository;

import com.evbattery.paymentservice.entity.PaymentLog;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PaymentLogRepository extends JpaRepository<PaymentLog, String> {
    
    Optional<PaymentLog> findByGatewayTxnRef(String gatewayTxnRef);
    List<PaymentLog> findByUserId(String userId, Sort sort);
    Optional<PaymentLog> findByOrderId(String orderId);
}