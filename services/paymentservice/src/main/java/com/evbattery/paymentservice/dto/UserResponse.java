package com.evbattery.paymentservice.dto;

import java.util.Set;

public record UserResponse(
    String id,
    String email,
    String firstName,
    String lastName, 
    String phoneNumber,
    Set<String> roles
) {}