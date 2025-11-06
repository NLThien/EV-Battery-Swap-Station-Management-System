CREATE DATABASE IF NOT EXISTS battery_station_db;

USE battery_station_db;

CREATE TABLE IF NOT EXISTS stations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    total_slots INT DEFAULT 0,
    available_slots INT DEFAULT 0,
    status ENUM('ACTIVE', 'MAINTENANCE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS battery_slots (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    station_id BIGINT,
    slot_number INT NOT NULL,
    battery_type VARCHAR(100),
    status ENUM('AVAILABLE', 'OCCUPIED', 'MAINTENANCE') DEFAULT 'AVAILABLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (station_id) REFERENCES stations(id) ON DELETE CASCADE
);

-- Insert sample data
INSERT INTO stations (name, address, latitude, longitude, total_slots, available_slots) VALUES
('Station Central', '123 Main Street, District 1', 10.762622, 106.660172, 20, 15),
('Station Riverside', '456 Riverside, District 2', 10.787452, 106.731628, 15, 10);

INSERT INTO battery_slots (station_id, slot_number, battery_type, status) VALUES
(1, 1, 'LITHIUM_ION', 'AVAILABLE'),
(1, 2, 'LITHIUM_ION', 'OCCUPIED'),
(2, 1, 'LITHIUM_POLYMER', 'AVAILABLE');