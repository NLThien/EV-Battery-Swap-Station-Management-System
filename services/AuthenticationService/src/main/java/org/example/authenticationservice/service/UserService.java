package org.example.authenticationservice.service;

import org.example.authenticationservice.dto.request.PasswordChangeRequest;
import org.example.authenticationservice.dto.request.UpdatePasswordByAdminRequest;
import org.example.authenticationservice.dto.request.UserCreationRequest;
import org.example.authenticationservice.dto.request.UserUpdateRequest;
import org.example.authenticationservice.dto.response.UpdatePasswordResponse;
import org.example.authenticationservice.dto.response.UserResponse;
import org.example.authenticationservice.entity.User;
import org.example.authenticationservice.enums.Role;
import org.example.authenticationservice.exception.AppException;
import org.example.authenticationservice.exception.ErrorCode;
import org.example.authenticationservice.mapper.UserMapper;
import org.example.authenticationservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;


    //đây là tạo tài khoản
    public User createUser(UserCreationRequest request) {

        if (userRepository.existsByPhoneNumber(request.getPhoneNumber()))
            throw new AppException(ErrorCode.PHONE_EXISTED);
        if (userRepository.existsByEmail(request.getEmail())) throw new AppException(ErrorCode.EMAIL_EXISTED);

        User user = userMapper.toUser(request);

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        HashSet<String> roles = new HashSet<>();
        roles.add(Role.USER.name());
        user.setRoles(roles);

        return userRepository.save(user);
    }

    //User lấy thông tin cá nhân của chính họ
    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        User user = userRepository.findById(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return userMapper.toUserResponse(user);
    }

    //đổi thông tin ở phias người dùng
    public UserResponse updateMyInfo(UserUpdateRequest request) {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        User user = userRepository.findById(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        //cái này phải fixx là đổi số điện thoại để đăng nhập để riêng
        if (userRepository.existsByPhoneNumberAndIdIsNot(request.getPhoneNumber(), name))
            throw new AppException(ErrorCode.PHONE_EXISTED);
//        if (userRepository.existsByEmail(request.getEmail())) throw  new AppException(ErrorCode.EMAIL_EXISTED);

        userMapper.updateUser(user, request);

        User updatedUser = userRepository.save(user);

        return userMapper.toUserResponse(updatedUser);

    }

    // đổi mật khẩu ở phía my info
    public UserResponse updatePassword(PasswordChangeRequest request) {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        User user = userRepository.findById(name)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        // 2. KIỂM TRA MẬT KHẨU MỚI KHỚP NHAU (Validation Logic)
        if (!Objects.equals(request.getNewPassword(), request.getConfirmNewPassword())) {
            throw new AppException(ErrorCode.PASSWORD_CONFIRM_NOT_MATCHED);
            // 💡 Cần định nghĩa ErrorCode.PASSWORD_CONFIRM_NOT_MATCHED
        }

        // 3. XÁC THỰC MẬT KHẨU CŨ (Bảo mật bắt buộc)
        // So sánh mật khẩu cũ (thô) với mật khẩu đã hash trong DB
        boolean isCurrentPasswordValid = passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPassword()
        );
        if (!isCurrentPasswordValid) {
            // Ném lỗi nếu mật khẩu cũ không đúng
            throw new AppException(ErrorCode.OLD_PASSWORD_INVALID);
            // 💡 Cần định nghĩa ErrorCode.OLD_PASSWORD_INVALID
        }
        String newHashedPassword = passwordEncoder.encode(request.getNewPassword());

        user.setPassword(newHashedPassword);

        userRepository.save(user);

        return getMyInfo();

    }


    @PreAuthorize("hasRole('ADMIN')")
    public void updateRole(String userId, Role role) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        String upperRole = role.name().toUpperCase();
        HashSet<String> roles = new HashSet<>();
        roles.add(role.name());
        user.setRoles(roles);
        userRepository.save(user);

    }

//    tìm kiếm user theo số điện thoại
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> findUserByPhoneNumber(String phoneNumber) {
        List<User> users = userRepository.findByPhoneNumberContaining(phoneNumber);

        if (users.isEmpty()) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }

        return users.stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    //cai này đáng phải là chỉ dùng đc cho admin
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse updateUser(UserUpdateRequest updateUser, String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

//        if (userRepository.existsByPhoneNumber(updateUser.getPhoneNumber())) throw  new AppException(ErrorCode.PHONE_EXISTED);
//        if (userRepository.existsByEmail(updateUser.getEmail())) throw  new AppException(ErrorCode.EMAIL_EXISTED);
        if (userRepository.existsByPhoneNumberAndIdIsNot(updateUser.getPhoneNumber(), userId))
            throw new AppException(ErrorCode.PHONE_EXISTED);

        userMapper.updateUser(user, updateUser);

        User updatedUser = userRepository.save(user);

        return userMapper.toUserResponse(updatedUser);


    }

    //đổi mật khẩu cho user
    @PreAuthorize("hasRole('ADMIN')")
    public UpdatePasswordResponse updatePasswordByAdmin(String userId, UpdatePasswordByAdminRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        try {
            String newPassword = passwordEncoder.encode(request.getPassword());
            user.setPassword(newPassword);
            userRepository.save(user);
            return UpdatePasswordResponse.builder().success(true).build();
        } catch (Exception e) {
            throw new AppException(ErrorCode.CHANGE_PASSWORD_NOT_SUSSED);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    //    @PostAuthorize("returnObject.phoneNumber == authentication.name") dòng nay là để lấy chỉ đc token trùng với params id mình đăng nhập mới đc vô
    @PreAuthorize("hasRole('ADMIN')")//chi admin mới đc vo xem thông tin ca nhân khách hành
    public UserResponse getUserById(String id) {
        return userMapper.toUserResponse(userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));

    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
