package com.evbattery.order_service.dto;

import java.util.List;
import java.util.Map;

public record OrderRequest(
    Long packageId,
    String stationId
) {}