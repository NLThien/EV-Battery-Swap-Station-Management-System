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

CREATE DATABASE IF NOT EXISTS payment_db;
USE payment_db;

CREATE TABLE IF NOT EXISTS payment_logs (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    order_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    station_id VARCHAR(255),
    user_info VARCHAR(255), 
    amount DECIMAL(18,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    gateway_txn_ref VARCHAR(255) NOT NULL
    created_at DATETIME,
    
    INDEX idx_order_id (order_id),
    INDEX idx_user_id (user_id),
    UNIQUE INDEX uq_gateway_txn_ref (gateway_txn_ref)
) ENGINE=InnoDB;