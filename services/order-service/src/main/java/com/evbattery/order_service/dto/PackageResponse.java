package com.evbattery.order_service.dto;

public record PackageResponse(
    Long id,
    String type,        
    int quantity,       
    Double price,       
    String description
) {}