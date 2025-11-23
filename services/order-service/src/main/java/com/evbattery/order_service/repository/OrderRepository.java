package com.evbattery.order_service.repository;

import com.evbattery.order_service.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Sort;
import java.util.List;


public interface OrderRepository extends  JpaRepository<Order, String>{
    List<Order> findByUserId(String userId, Sort sort);
}
