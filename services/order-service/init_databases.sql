CREATE DATABASE IF NOT EXISTS order_db;
USE order_db;

CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL, 
    station_id VARCHAR(255) NOT NULL,
    
    items JSON, 
    
    total_amount DOUBLE NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at DATETIME,
    
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB;