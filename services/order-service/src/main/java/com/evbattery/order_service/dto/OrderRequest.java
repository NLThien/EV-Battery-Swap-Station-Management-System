package com.evbattery.order_service.dto;

import java.util.List;
import java.util.Map;

public record OrderRequest(
    List<Map<String, Object>> items,
    Double totalAmount,
    String stationId
) {}