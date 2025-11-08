package org.example.authenticationservice.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;


@Data //cái này để tạo gettter setter ...
@NoArgsConstructor // tạo contructor kh tham so
@AllArgsConstructor // tạo contrucstor có tham số
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE) //tạp cáo tát cả privaite
public class UserUpdateRequest {
    String firstName;
    String lastName;
    @Email(message = "Email format is invalid")
    String email;
    @Pattern(
            regexp = "^(\\+84|0)\\d{9,10}$", // ✅ Regex cho SĐT Việt Nam (+84 hoặc 0, theo sau là 9-10 chữ số)
            message = "Phone number format is invalid (e.g., 0xxxxxxxxx or +84xxxxxxxxx)"
    )
    String phoneNumber;
    @Size(min=8,message = "password must be at least 8 character and max 20 character ")
    String password;
    LocalDate birthday;
    String role;

}
