package org.example.authenticationservice.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data //cái này để tạo gettter setter ...
@NoArgsConstructor // tạo contructor kh tham so
@AllArgsConstructor // tạo contrucstor có tham số
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE) //tạp cáo tát cả privaite
public class AuthenticationResponse {
    boolean authenticated;
    String token;
}
