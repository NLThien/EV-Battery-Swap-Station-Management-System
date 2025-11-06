package com.example.paymentservice.config;

import org.springframework.amqp.core.Queue;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Value("${queue.name}") // Lấy tên queue từ application.yml
    private String queueName;

    @Bean
    public Queue queue() {
        return new Queue(queueName, true); // true = durable (bền bỉ)
    }
}