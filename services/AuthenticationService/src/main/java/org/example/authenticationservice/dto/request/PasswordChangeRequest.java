package org.example.authenticationservice.dto.request;


import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.ToString;

@Data
public class PasswordChangeRequest {
    // ✨ BẢO MẬT: Loại trừ khỏi log/toString()
    @ToString.Exclude
    private String currentPassword;

    // ✨ BẢO MẬT: Loại trừ khỏi log/toString()
    @ToString.Exclude
    @Size(min=8,message = "PASSWORD_INVALID")
    private String newPassword;

    // ✨ BẢO MẬT: Loại trừ khỏi log/toString()
    @ToString.Exclude
    @Size(min=8,message = "PASSWORD_INVALID")
    private String confirmNewPassword;

//    private String userId; // ID người dùng
}