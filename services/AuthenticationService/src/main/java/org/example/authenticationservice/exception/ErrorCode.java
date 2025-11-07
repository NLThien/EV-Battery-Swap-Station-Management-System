package org.example.authenticationservice.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;


@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION("Uncategorized",9999, HttpStatus.INTERNAL_SERVER_ERROR),
    USER_INVALID("User must be at least 3 charaters", 1003,HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID("User must be at least 8 charaters", 1004,HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED("User not existed",1005,HttpStatus.NOT_FOUND),
    PASSWORD_INCORRECT("Password incorrect",1001,HttpStatus.NOT_FOUND),
    INVALID_KEY("Invalid key",1001,HttpStatus.BAD_REQUEST),
    PHONE_EXISTED("phone existed",1002,HttpStatus.BAD_REQUEST),
    EMAIL_EXISTED("email existed",1002,HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED("Unauthenticated",1006,HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED("You do not permission",1007,HttpStatus.FORBIDDEN),
    INVALID_JWS("Invalid JWS ",1008,HttpStatus.BAD_REQUEST),
    PASSWORD_CONFIRM_NOT_MATCHED("Password confirm not matched",1009,HttpStatus.BAD_REQUEST),
    OLD_PASSWORD_INVALID("Old password invalid",1010,HttpStatus.BAD_REQUEST),
    ;


    private int code;
    private String message;
    private HttpStatusCode httpStatusCode;

    ErrorCode(String message, int code, HttpStatusCode httpStatusCode) {
        this.message = message;
        this.code = code;
        this.httpStatusCode = httpStatusCode;

    }

}
