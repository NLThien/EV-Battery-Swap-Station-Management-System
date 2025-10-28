package org.example.authenticationservice.dto.request;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data //cái này để tạo gettter setter ...
@NoArgsConstructor // tạo contructor kh tham so
@AllArgsConstructor // tạo contrucstor có tham số
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE) //tạp cáo tát cả privaite
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    private int code=1000;
    private String message;
    private T result;
}
