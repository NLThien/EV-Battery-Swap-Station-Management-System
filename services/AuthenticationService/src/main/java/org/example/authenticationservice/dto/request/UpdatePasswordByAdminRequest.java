package org.example.authenticationservice.dto.request;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data //cái này để tạo gettter setter ...
public class UpdatePasswordByAdminRequest {
    @ToString.Exclude
    @Size(min=8,message = "PASSWORD_INVALID")
    private String password;
}
