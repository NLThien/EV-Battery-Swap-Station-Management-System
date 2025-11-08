-- shared/init-scripts/init-databases.sql
-- Station Database
CREATE DATABASE IF NOT EXISTS station_db;
USE station_db;

CREATE TABLE IF NOT EXISTS stations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500),
    total_slots INT DEFAULT 0,
    available_slots INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Database sẽ được tạo tự động bởi MySQL container