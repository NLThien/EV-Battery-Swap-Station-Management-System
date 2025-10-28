package org.example.authenticationservice.controller;


import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.example.authenticationservice.dto.request.ApiResponse;
import org.example.authenticationservice.dto.request.UserCreationRequest;
import org.example.authenticationservice.dto.request.UserUpdateRequest;
import org.example.authenticationservice.dto.response.UserResponse;
import org.example.authenticationservice.entity.User;
import org.example.authenticationservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/users")
@Slf4j
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    ApiResponse<User> createUser(@RequestBody @Valid UserCreationRequest creationRequest) {

        ApiResponse<User> apiResponse = new ApiResponse<>();

        apiResponse.setResult(userService.createUser(creationRequest));

        return apiResponse;
    }

    @GetMapping
    List<User> getAllUsers() {
        var authentication=SecurityContextHolder.getContext().getAuthentication();
        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));

        return userService.getAllUsers();
    }


    @GetMapping("/{userId}")
    UserResponse getUserById(@PathVariable("userId") String userId) {
        return userService.getUserById(userId);
    }

    @GetMapping("/myInfo")
    UserResponse getMyInfo() {
        return userService.getMyInfo();
    }

    @PutMapping("/{userId}")
    UserResponse updateUser(@PathVariable @Valid String userId, @RequestBody UserUpdateRequest request) {

        return userService.updateUser(request, userId);
    }
    @DeleteMapping("/{userId}")
    String deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return "đã xóa";
    }
}

