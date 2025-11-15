package com.example.station_management.model.enums;

public enum BatteryStationStatus {
    AVAILABLE,      // Có sẵn để swap
    CHARGING,       // Đang sạc
    MAINTENANCE,    // Đang bảo trì
    RESERVED,       // Đã được đặt trước
    IN_USE,         // Đang được sử dụng (đã swap out)
    DEPLETED        // Hết pin, cần sạc
}
