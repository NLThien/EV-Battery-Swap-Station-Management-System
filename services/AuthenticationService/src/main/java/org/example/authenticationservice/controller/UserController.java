package org.example.authenticationservice.controller;


import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.example.authenticationservice.dto.request.ApiResponse;
import org.example.authenticationservice.dto.request.UpdateRoleRequest;
import org.example.authenticationservice.dto.request.UserCreationRequest;
import org.example.authenticationservice.dto.request.UserUpdateRequest;
import org.example.authenticationservice.dto.response.UserResponse;
import org.example.authenticationservice.entity.User;
import org.example.authenticationservice.enums.Role;
import org.example.authenticationservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/users")
@Slf4j
public class UserController {
    @Autowired
    private UserService userService;


//    cái này để dùng khi đăng kí user
    @PostMapping
    ApiResponse<User> createUser(@RequestBody @Valid UserCreationRequest creationRequest) {

        ApiResponse<User> apiResponse = new ApiResponse<>();

        apiResponse.setResult(userService.createUser(creationRequest));

        return apiResponse;
    }

//    này là lấy tất cả thông tinh user chỉ admin mới có quyền lấuy
    @GetMapping
    List<User> getAllUsers() {
        var authentication=SecurityContextHolder.getContext().getAuthentication();
        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));

        return userService.getAllUsers();
    }

//này laf xem thông tin cá nhân của 1 user cũng chỉ admin mới xem đc

    @GetMapping("/{userId}")
    UserResponse getUserById(@PathVariable("userId") String userId) {
        return userService.getUserById(userId);
    }
//này là xem thông tin cá nhân của chính tài khản của mình ai cũng dùng đc
    @GetMapping("/myInfo")
    UserResponse getMyInfo() {
        return userService.getMyInfo();
    }
//sử thông tin user của User và Admin đều dùng đc
    @PutMapping("/{userId}")
    UserResponse updateUser(@PathVariable @Valid String userId, @RequestBody UserUpdateRequest request) {

        return userService.updateUser(request, userId);
    }
    @PutMapping("/{userId}/role")
    public ApiResponse updateRole(   @PathVariable String userId, @RequestBody UpdateRoleRequest role){
        try {
            // Convert String -> Enum Role
            Role enumRole = role.getRole();

            userService.updateRole(userId, enumRole);

            return ApiResponse.builder().result(ResponseEntity.status(200).body("Thành công")).build();


        } catch (IllegalArgumentException e) {
            return ApiResponse.builder().result(ResponseEntity.status(400).body("Lỗi")).build();
        }

    }
//    này là xóa tài khoản
    @DeleteMapping("/{userId}")
    String deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return "đã xóa";
    }
}

