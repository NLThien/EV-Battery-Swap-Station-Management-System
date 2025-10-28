package org.example.authenticationservice.service;

import org.example.authenticationservice.dto.request.UserCreationRequest;
import org.example.authenticationservice.dto.request.UserUpdateRequest;
import org.example.authenticationservice.dto.response.UserResponse;
import org.example.authenticationservice.entity.User;
import org.example.authenticationservice.enums.Role;
import org.example.authenticationservice.exception.AppException;
import org.example.authenticationservice.exception.ErrorCode;
import org.example.authenticationservice.mapper.UserMapper;
import org.example.authenticationservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;



    public User createUser(UserCreationRequest request) {

        if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) throw  new AppException(ErrorCode.PHONE_EXISTED);
        if (userRepository.existsByEmail(request.getEmail())) throw  new AppException(ErrorCode.EMAIL_EXISTED);

        User user=userMapper.toUser(request);

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        HashSet<String> roles = new HashSet<>();
        roles.add(Role.USER.name());
        user.setRoles(roles);

        return userRepository.save(user);
    }
    //User lấy thông tin cá nhân của chính họ
    public UserResponse getMyInfo(){
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        User user = userRepository.findByPhoneNumber(name).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));

        return userMapper.toUserResponse(user);
    }

    public UserResponse updateUser(UserUpdateRequest updateUser,String userId) {
        User user = userRepository.findById(userId).orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));

                userMapper.updateUser(user,updateUser);
                return userMapper.toUserResponse(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
//    @PostAuthorize("returnObject.phoneNumber == authentication.name") dòng nay là để lấy chỉ đc token trùn với params id mình đăng nhập mới đc vô
    @PreAuthorize("hasRole('ADMIN')")//chi admin mới đc vo xem thông tin ca nhân khách hành
    public UserResponse getUserById(String id) {
        return userMapper.toUserResponse(userRepository.findById(id).orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED)));

    }
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
