package com.evbattery.order_service.listener;

import com.evbattery.order_service.entity.Order;
import com.evbattery.order_service.repository.OrderRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.io.Serializable;


record PaymentCompletedEvent(String orderId) implements Serializable {}

@Component
public class PaymentListener {

    private final OrderRepository orderRepository;

    @Autowired 
    public PaymentListener(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // Lắng nghe hàng đợi
    @RabbitListener(queues = "${queue.name}")
    public void handlePaymentCompleted(PaymentCompletedEvent event) {
        System.out.println("Nhận được sự kiện: " + event.orderId());
        
        Order order = orderRepository.findById(event.orderId()).orElse(null);
        
        // Chỉ cập nhật nếu đơn hàng tồn tại và đang PENDING
        if (order != null && "PENDING".equals(order.getStatus())) {
            order.setStatus("PAID");
            orderRepository.save(order);
            System.out.println("Cập nhật trạng thái đơn hàng thành PAID cho orderId: " + event.orderId());
        }
    }
}