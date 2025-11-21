package com.example.feedbackservice.client;

import com.example.feedbackservice.dto.UserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service", url = "http://localhost:8084/api/users")
public interface UserClient {
    @GetMapping("/{id}")
    UserResponse getUserById(@PathVariable("id") String id);
}
