package org.example.authenticationservice.dto.request;

import lombok.Data;
import org.example.authenticationservice.enums.Role;

@Data
public class UpdateRoleRequest {
    private Role role;
}
