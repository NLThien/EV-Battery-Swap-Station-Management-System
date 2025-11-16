package org.example.authenticationservice.controller;


import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.example.authenticationservice.dto.request.*;
import org.example.authenticationservice.dto.response.UpdatePasswordResponse;
import org.example.authenticationservice.dto.response.UserResponse;
import org.example.authenticationservice.entity.User;
import org.example.authenticationservice.enums.Role;
import org.example.authenticationservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


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
    ApiResponse<List<User>> getAllUsers() {
        var authentication=SecurityContextHolder.getContext().getAuthentication();
        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));

        return ApiResponse.<List<User>>builder().result(userService.getAllUsers()).build();
    }


    @GetMapping("/search")
    public ApiResponse<List<UserResponse>> searchUser(@RequestParam String phoneNumber) {

        List<UserResponse> users = userService.findUserByPhoneNumber(phoneNumber);

        return ApiResponse.<List<UserResponse>>builder()
                .code(200)
                .message("Success")
                .result(users)
                .build();
    }


    //này laf xem thông tin cá nhân của 1 user cũng chỉ admin mới xem đc
    @GetMapping("/{userId}")
    ApiResponse<UserResponse> getUserById(@PathVariable("userId") String userId) {
        return ApiResponse.<UserResponse>builder().result(userService.getUserById(userId)).build();

    }
    //cái này là sửa đổi thông tin của chính mình
    @PutMapping("/myInfo")
    ApiResponse<UserResponse> updateUser(@RequestBody @Valid UserUpdateRequest userUpdateRequest) {
        return ApiResponse.<UserResponse>builder().result(userService.updateMyInfo(userUpdateRequest)).build();
    }

//này là xem thông tin cá nhân của chính tài khản của mình ai cũng dùng đc
    @GetMapping("/myInfo")
    ApiResponse<UserResponse> getMyInfo() {
        return ApiResponse.<UserResponse>builder().result(userService.getMyInfo()).build();
    }
//sử thông tin user của User và Admin đều dùng đc
    @PutMapping("/{userId}")
    ApiResponse<UserResponse> updateUser(@PathVariable @Valid String userId, @Valid @RequestBody UserUpdateRequest request) {

        return ApiResponse.<UserResponse>builder().result(userService.updateUser(request, userId)).build();
    }
    @PutMapping("/{userId}/role")
    public ApiResponse updateRole(  @PathVariable String userId,  @Valid @RequestBody UpdateRoleRequest role){
        try {
            // Convert String -> Enum Role
            Role enumRole = role.getRole();

            userService.updateRole(userId, enumRole);

            return ApiResponse.builder().result(ResponseEntity.status(200).body("Thành công")).build();


        } catch (IllegalArgumentException e) {
            return ApiResponse.builder().result(ResponseEntity.status(400).body("Lỗi")).build();
        }

    }
    @PutMapping("/{userId}/changePassword")
    public ApiResponse<UpdatePasswordResponse> updatePasswordByAdmin(@PathVariable String userId, @Valid @RequestBody UpdatePasswordByAdminRequest request) {
        return ApiResponse.<UpdatePasswordResponse>builder().result(userService.updatePasswordByAdmin(userId,request)).build();
    }

    @PutMapping("/myInfo/changePassword")
    public ApiResponse updatePassword(@RequestBody @Valid PasswordChangeRequest request){
        userService.updatePassword(request);
        return ApiResponse.<String>builder()
                .result("Password changed successfully!")
                .build();

    }
//    này là xóa tài khoản

    @DeleteMapping("/{userId}")
    String deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return "đã xóa";
    }
}

