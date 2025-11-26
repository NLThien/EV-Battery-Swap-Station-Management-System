CREATE DATABASE  IF NOT EXISTS `station_management` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `station_management`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: station_management
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `charging_sessions`
--

DROP TABLE IF EXISTS `charging_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `charging_sessions` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `station_id` varchar(36) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `vehicle_type` varchar(100) DEFAULT NULL,
  `battery_capacity` double DEFAULT NULL,
  `start_battery_level` float DEFAULT NULL,
  `end_battery_level` float DEFAULT NULL,
  `energy_delivered` double DEFAULT NULL,
  `charging_duration` int NOT NULL DEFAULT '0',
  `max_charging_rate` float DEFAULT NULL,
  `total_cost` double DEFAULT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `status` enum('ACTIVE','COMPLETED','CANCELLED','FAILED','PAUSED','PENDING') NOT NULL DEFAULT 'ACTIVE',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_station_status` (`station_id`,`status`),
  KEY `idx_user_sessions` (`user_id`),
  KEY `idx_session_time` (`start_time`,`end_time`),
  KEY `idx_energy_delivered` (`energy_delivered`),
  CONSTRAINT `charging_sessions_ibfk_1` FOREIGN KEY (`station_id`) REFERENCES `stations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `charging_sessions`
--

LOCK TABLES `charging_sessions` WRITE;
/*!40000 ALTER TABLE `charging_sessions` DISABLE KEYS */;
INSERT INTO `charging_sessions` VALUES ('21d291b6-bf27-11f0-b4fb-04d4c4e7738c','station-001','USER_001','VinFast VF e34',42,15,85,29.4,45,50,13.23,'2025-11-21 19:20:00','2025-11-21 20:55:33','CANCELLED','2025-11-11 17:52:04','2025-11-23 16:27:44'),('21d299d5-bf27-11f0-b4fb-04d4c4e7738c','station-002','USER_002','Tesla Model 3',60,20,90,42,25,120,21.84,'2024-01-20 10:15:00','2024-01-20 10:40:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d29c16-bf27-11f0-b4fb-04d4c4e7738c','station-003','USER_003','Hyundai Kona Electric',64,25,80,35.2,120,22,13.376,'2024-01-20 11:00:00','2025-11-21 20:55:21','CANCELLED','2025-11-11 17:52:04','2025-11-21 13:55:21'),('21d29e44-bf27-11f0-b4fb-04d4c4e7738c','station-004','USER_004','Audi e-tron',95,30,65,33.25,35,80,11.6375,'2024-01-20 14:20:00','2025-11-21 20:59:14','CANCELLED','2025-11-11 17:52:04','2025-11-21 13:59:14'),('21d2a02f-bf27-11f0-b4fb-04d4c4e7738c','station-005','USER_005','Porsche Taycan',93.4,40,75,32.69,18,270,17.9795,'2024-01-20 15:45:00',NULL,'ACTIVE','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2a20a-bf27-11f0-b4fb-04d4c4e7738c','station-006','USER_006','VinFast VF 8',87.7,35,45,8.77,8,60,3.9465,'2024-01-20 16:30:00','2024-01-20 16:38:00','CANCELLED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2a3da-bf27-11f0-b4fb-04d4c4e7738c','station-003','USER_007','Kia EV6',77.4,20,20,0,5,0,0,'2024-01-20 17:10:00','2024-01-20 17:15:00','FAILED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2a5a6-bf27-11f0-b4fb-04d4c4e7738c','station-002','USER_008','VinFast VF 9',92,15,80,59.8,35,150,31.096,'2024-01-21 09:30:00','2024-01-21 10:05:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2a76c-bf27-11f0-b4fb-04d4c4e7738c','station-002','USER_009','BMW i4',83.9,20,85,54.535,28,180,28.3582,'2024-01-21 14:20:00','2024-01-21 14:48:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2a932-bf27-11f0-b4fb-04d4c4e7738c','station-004','USER_010','Mercedes EQS',107.8,25,90,70.07,42,200,36.4364,'2024-01-21 10:15:00','2024-01-21 10:57:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2ab12-bf27-11f0-b4fb-04d4c4e7738c','station-004','USER_011','Ford Mustang Mach-E',88,30,75,39.6,25,150,20.592,'2024-01-21 16:45:00','2024-01-21 17:10:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2acde-bf27-11f0-b4fb-04d4c4e7738c','station-005','USER_012','Chevrolet Bolt EV',65,15,80,42.25,40,55,16.8775,'2024-01-21 11:30:00','2024-01-21 12:10:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2aeaa-bf27-11f0-b4fb-04d4c4e7738c','station-005','USER_013','Nissan Leaf',62,20,85,40.3,38,50,16.1205,'2024-01-21 18:20:00','2024-01-21 18:58:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2b076-bf27-11f0-b4fb-04d4c4e7738c','station-006','USER_014','VinFast VF e34',42,10,70,25.2,32,50,9.828,'2024-01-21 08:15:00','2024-01-21 08:47:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2b242-bf27-11f0-b4fb-04d4c4e7738c','station-006','USER_015','Hyundai Ioniq 5',72.6,20,85,47.19,30,220,24.5388,'2024-01-21 13:45:00','2024-01-21 14:15:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2b40e-bf27-11f0-b4fb-04d4c4e7738c','station-006','USER_016','Kia EV9',99.8,25,80,54.89,35,210,28.5434,'2024-01-21 19:30:00','2024-01-21 20:05:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2b5da-bf27-11f0-b4fb-04d4c4e7738c','station-007','USER_017','Tesla Model Y',75,15,90,56.25,45,250,29.25,'2024-01-21 09:00:00','2024-01-21 09:45:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2b7a6-bf27-11f0-b4fb-04d4c4e7738c','station-007','USER_018','Audi Q8 e-tron',106,20,85,68.9,50,270,35.828,'2024-01-21 14:30:00','2024-01-21 15:20:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2b972-bf27-11f0-b4fb-04d4c4e7738c','station-007','USER_019','Volvo XC40 Recharge',78,25,80,42.9,35,150,22.308,'2024-01-21 20:15:00','2024-01-21 20:50:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2bb3e-bf27-11f0-b4fb-04d4c4e7738c','station-008','USER_020','VinFast VF 6',59,10,75,38.35,45,60,15.9635,'2024-01-21 07:45:00','2024-01-21 08:30:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2bd0a-bf27-11f0-b4fb-04d4c4e7738c','station-008','USER_021','MG ZS EV',50.8,20,85,33.02,40,75,13.7655,'2024-01-21 12:20:00','2024-01-21 13:00:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2bed6-bf27-11f0-b4fb-04d4c4e7738c','station-008','USER_022','BYD Atto 3',60.5,15,80,39.325,38,88,16.3695,'2024-01-21 17:55:00','2024-01-21 18:33:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2c0a2-bf27-11f0-b4fb-04d4c4e7738c','station-009','USER_023','Tesla Model S',100,20,90,70,55,250,36.4,'2024-01-21 08:30:00','2024-01-21 09:25:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2c26e-bf27-11f0-b4fb-04d4c4e7738c','station-009','USER_024','Porsche Taycan Cross Turismo',93.4,25,85,56.04,40,270,29.1408,'2024-01-21 15:10:00','2024-01-21 15:50:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2c43a-bf27-11f0-b4fb-04d4c4e7738c','station-009','USER_025','Lucid Air',112,15,80,72.8,60,300,37.856,'2024-01-21 19:40:00','2024-01-21 20:40:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2c606-bf27-11f0-b4fb-04d4c4e7738c','station-010','USER_026','VinFast VF 5',37.2,10,75,24.18,35,40,10.0745,'2024-01-21 06:50:00','2024-01-21 07:25:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2c7d2-bf27-11f0-b4fb-04d4c4e7738c','station-010','USER_027','Hyundai Ioniq 6',77.4,20,85,50.31,42,240,26.1612,'2024-01-21 13:15:00','2024-01-21 13:57:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2c99e-bf27-11f0-b4fb-04d4c4e7738c','station-010','USER_028','Kia Niro EV',64.8,25,80,35.64,38,100,18.5328,'2024-01-21 18:25:00','2024-01-21 19:03:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2cb6a-bf27-11f0-b4fb-04d4c4e7738c','4146dc6a-6148-42d3-971f-e83e32de234e','USER_029','Tesla Cybertruck',150,20,85,97.5,75,350,50.7,'2024-01-21 10:00:00','2024-01-21 11:15:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2cd36-bf27-11f0-b4fb-04d4c4e7738c','4146dc6a-6148-42d3-971f-e83e32de234e','USER_030','Rivian R1T',135,15,80,87.75,65,300,45.63,'2024-01-21 16:20:00','2024-01-21 17:25:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2cf02-bf27-11f0-b4fb-04d4c4e7738c','4146dc6a-6148-42d3-971f-e83e32de234e','USER_031','Ford F-150 Lightning',131,25,85,78.6,55,160,40.872,'2024-01-21 21:30:00','2024-01-21 22:25:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2d0ce-bf27-11f0-b4fb-04d4c4e7738c','9b03ea87-d7c8-4219-89ef-3b74d4c57bc1','USER_032','Xe máy điện',2.5,20,90,1.75,15,3.5,0.6825,'2024-01-21 07:00:00','2024-01-21 07:15:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2d29a-bf27-11f0-b4fb-04d4c4e7738c','9b03ea87-d7c8-4219-89ef-3b74d4c57bc1','USER_033','Xe đạp điện',0.8,15,85,0.56,10,2,0.2184,'2024-01-21 12:45:00','2024-01-21 12:55:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('21d2d466-bf27-11f0-b4fb-04d4c4e7738c','9b03ea87-d7c8-4219-89ef-3b74d4c57bc1','USER_034','VinFast Klara S',5.6,10,80,3.92,25,7,1.5288,'2024-01-21 18:10:00','2024-01-21 18:35:00','COMPLETED','2025-11-11 17:52:04','2025-11-11 17:52:04'),('SESSION_1763819920225','station-001','USER_002','Xe đạp điện ',50,20,NULL,0,0,7.4,0,'2025-11-22 13:58:40','2025-11-22 15:34:06','CANCELLED','2025-11-22 06:58:40','2025-11-22 08:34:06'),('SESSION_1763823204028','station-001','USER-003','vf3',109,7,80,79.57,0,7.4,306.3445,'2025-11-22 14:53:24','2025-11-22 14:53:36','COMPLETED','2025-11-22 07:53:24','2025-11-22 07:53:36'),('SESSION_1763909888439','station-001','USER-004','vf-9',78,18,NULL,0,0,7.4,0,'2025-11-23 14:58:08',NULL,'ACTIVE','2025-11-23 07:58:08','2025-11-23 08:15:45');
/*!40000 ALTER TABLE `charging_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `station_alerts`
--

DROP TABLE IF EXISTS `station_alerts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `station_alerts` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `station_id` varchar(36) NOT NULL,
  `alert_type` enum('MAINTENANCE','PERFORMANCE','SAFETY','POWER','NETWORK','BATTERY') NOT NULL,
  `severity` enum('LOW','MEDIUM','HIGH','CRITICAL') NOT NULL DEFAULT 'MEDIUM',
  `title` varchar(255) NOT NULL,
  `description` text,
  `metric_name` varchar(100) DEFAULT NULL,
  `current_value` double DEFAULT NULL,
  `threshold_value` double DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `status` enum('ACTIVE','ACKNOWLEDGED','RESOLVED') NOT NULL DEFAULT 'ACTIVE',
  `resolved_at` datetime DEFAULT NULL,
  `resolved_by` varchar(100) DEFAULT NULL,
  `resolution_notes` text,
  `triggered_at` datetime NOT NULL,
  `acknowledged_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_station_alerts` (`station_id`,`status`),
  KEY `idx_alert_type` (`alert_type`),
  KEY `idx_severity` (`severity`),
  KEY `idx_triggered_time` (`triggered_at`),
  CONSTRAINT `station_alerts_ibfk_1` FOREIGN KEY (`station_id`) REFERENCES `stations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `station_alerts`
--

LOCK TABLES `station_alerts` WRITE;
/*!40000 ALTER TABLE `station_alerts` DISABLE KEYS */;
INSERT INTO `station_alerts` VALUES ('a404c830-bf26-11f0-b4fb-04d4c4e7738c','station-001','MAINTENANCE','MEDIUM','Bảo trì định kỳ sắp đến','Trạm cần bảo trì định kỳ trong 10 ngày tới','days_to_maintenance',10,14,'days','ACTIVE','2025-11-16 17:36:24','user',NULL,'2024-01-20 09:00:00',NULL,'2025-11-11 17:48:32'),('a404e517-bf26-11f0-b4fb-04d4c4e7738c','station-002','PERFORMANCE','HIGH','Hiệu suất sạc giảm','Hiệu suất sạc giảm 15% so với bình thường','charging_efficiency',73.5,80,'percent','ACTIVE',NULL,'tech_support','Đang theo dõi và phân tích nguyên nhân','2024-01-20 10:30:00','2024-01-20 11:00:00','2025-11-11 17:48:32'),('a404e8f6-bf26-11f0-b4fb-04d4c4e7738c','station-003','SAFETY','LOW','Đèn chiếu sáng hỏng','Một đèn chiếu sáng trong bãi đỗ không hoạt động','lighting_status',0,1,'boolean','RESOLVED','2024-01-20 14:00:00','maintenance_team','Đã thay thế bóng đèn hỏng','2024-01-20 08:15:00','2024-01-20 08:30:00','2025-11-11 17:48:32'),('a404eb83-bf26-11f0-b4fb-04d4c4e7738c','station-004','POWER','CRITICAL','Quá tải công suất','Trạm đang vượt 95% công suất tối đa','power_utilization',95.8,90,'percent','RESOLVED','2025-11-16 17:36:23','user',NULL,'2024-01-20 13:45:00',NULL,'2025-11-11 17:48:32'),('a404ed70-bf26-11f0-b4fb-04d4c4e7738c','station-002','NETWORK','MEDIUM','Mất kết nối dữ liệu','Mất kết nối với hệ thống trung tâm trong 5 phút','network_uptime',0,1,'boolean','ACTIVE','2024-01-20 16:30:00','network_team','Khởi động lại router - kết nối ổn định','2024-01-20 16:20:00','2024-01-20 16:25:00','2025-11-11 17:48:32'),('a404efb0-bf26-11f0-b4fb-04d4c4e7738c','station-001','BATTERY','HIGH','Pin dự phòng yếu','Pin dự phòng chỉ còn 20% dung lượng','backup_battery',20,30,'percent','ACKNOWLEDGED',NULL,'user','Đã lên lịch thay thế pin vào 22/01/2024','2024-01-20 17:10:00','2025-11-16 17:45:32','2025-11-11 17:48:32'),('a404f0e8-bf26-11f0-b4fb-04d4c4e7738c','station-005','PERFORMANCE','MEDIUM','Hiệu suất sạc dao động','Hiệu suất sạc dao động trong ngưỡng 5%','charging_efficiency',78.2,80,'percent','ACTIVE',NULL,NULL,NULL,'2024-01-20 11:45:00','2024-01-20 12:00:00','2025-11-11 17:48:32'),('a404f2c8-bf26-11f0-b4fb-04d4c4e7738c','station-006','MAINTENANCE','HIGH','Bảo trì khẩn cấp','Trạm cần bảo trì khẩn cấp do lỗi phần cứng','maintenance_status',1,0,'boolean','ACKNOWLEDGED',NULL,'maintenance_team','Đã lên lịch bảo trì vào 25/01/2024','2024-01-20 14:20:00','2024-01-20 14:35:00','2025-11-11 17:48:32'),('a404f4a8-bf26-11f0-b4fb-04d4c4e7738c','station-007','POWER','LOW','Điện áp không ổn định','Điện áp dao động nhẹ trong phạm vi cho phép','voltage_stability',5.2,10,'percent','RESOLVED','2024-01-20 16:45:00','technical_team','Đã ổn định điện áp','2024-01-20 15:30:00','2024-01-20 15:45:00','2025-11-11 17:48:32'),('a404f688-bf26-11f0-b4fb-04d4c4e7738c','station-008','NETWORK','MEDIUM','Độ trễ mạng cao','Độ trễ mạng vượt ngưỡng cho phép','network_latency',150,100,'ms','ACTIVE',NULL,NULL,NULL,'2024-01-20 17:15:00','2024-01-20 17:30:00','2025-11-11 17:48:32'),('a404f868-bf26-11f0-b4fb-04d4c4e7738c','station-009','BATTERY','LOW','Pin dự phòng cần sạc','Pin dự phòng còn 45% cần sạc bổ sung','backup_battery',45,50,'percent','RESOLVED','2024-01-20 19:00:00','operator','Đã sạc đầy pin dự phòng','2024-01-20 18:20:00','2024-01-20 18:35:00','2025-11-11 17:48:32'),('a404fa48-bf26-11f0-b4fb-04d4c4e7738c','station-010','SAFETY','MEDIUM','Camera giám sát lỗi','Một camera giám sát không hoạt động','camera_status',0,1,'boolean','ACKNOWLEDGED',NULL,'security_team','Đã lên lịch sửa chữa','2024-01-20 20:10:00','2024-01-20 20:25:00','2025-11-11 17:48:32'),('a404fc28-bf26-11f0-b4fb-04d4c4e7738c','4146dc6a-6148-42d3-971f-e83e32de234e','PERFORMANCE','LOW','Hiệu suất thấp so với công suất','Trạm đang hoạt động dưới 60% công suất thiết kế','utilization_rate',58.5,60,'percent','ACTIVE',NULL,NULL,NULL,'2024-01-20 21:05:00','2024-01-20 21:20:00','2025-11-11 17:48:32'),('a404fe08-bf26-11f0-b4fb-04d4c4e7738c','9b03ea87-d7c8-4219-89ef-3b74d4c57bc1','MAINTENANCE','HIGH','Bảo trì định kỳ quá hạn','Trạm đã quá hạn bảo trì định kỳ 15 ngày','maintenance_overdue',15,0,'days','ACTIVE',NULL,NULL,NULL,'2024-01-20 22:30:00',NULL,'2025-11-11 17:48:32');
/*!40000 ALTER TABLE `station_alerts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `station_batteries`
--

DROP TABLE IF EXISTS `station_batteries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `station_batteries` (
  `id` varchar(255) NOT NULL,
  `arrival_time` datetime(6) DEFAULT NULL,
  `battery_id` varchar(255) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `current_capacity` int DEFAULT NULL,
  `departure_time` datetime(6) DEFAULT NULL,
  `slot_number` int DEFAULT NULL,
  `station_id` varchar(255) NOT NULL,
  `status` enum('AVAILABLE','CHARGING','DEPLETED','IN_USE','MAINTENANCE','RESERVED') NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `station_batteries`
--

LOCK TABLES `station_batteries` WRITE;
/*!40000 ALTER TABLE `station_batteries` DISABLE KEYS */;
/*!40000 ALTER TABLE `station_batteries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `station_details`
--

DROP TABLE IF EXISTS `station_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `station_details` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `station_id` varchar(36) NOT NULL,
  `manager_id` varchar(50) NOT NULL,
  `total_slots` int DEFAULT NULL,
  `available_slots` int DEFAULT NULL,
  `total_battery` int DEFAULT NULL,
  `contact_phone` varchar(20) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `total_power_capacity` int DEFAULT NULL,
  `current_power_usage` int DEFAULT NULL,
  `operational_hours` varchar(100) DEFAULT '00:00-23:59',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `support_hours` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_station` (`station_id`),
  CONSTRAINT `station_details_ibfk_1` FOREIGN KEY (`station_id`) REFERENCES `stations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `station_details`
--

LOCK TABLES `station_details` WRITE;
/*!40000 ALTER TABLE `station_details` DISABLE KEYS */;
INSERT INTO `station_details` VALUES ('f0e0d354-bf93-11f0-b4fb-04d4c4e7738c','station-001','manager-001',100,97,1000,'+84-28-38234567','station1@evcharge.vn',1100,997,'24/7','2025-11-12 06:50:57','2025-11-12 06:50:57',NULL),('f0e14c30-bf93-11f0-b4fb-04d4c4e7738c','station-002','manager-002',25,22,782,'+84-28-37485612','station2@evcharge.vn',89,78,'5.00-22.00','2025-11-12 06:50:57','2025-11-12 06:50:57',NULL),('f0e15f96-bf93-11f0-b4fb-04d4c4e7738c','station-003','manager-001',10,3,482,'+84-1123415225','station3@evcharge.vn',69,48,'24/7','2025-11-12 06:50:57','2025-11-12 06:50:57',NULL),('f0e16394-bf93-11f0-b4fb-04d4c4e7738c','station-004','manager-003',25,22,782,'+84-2351145346','station4@evcharge.vn',89,78,'5.00-22.00','2025-11-12 06:50:57','2025-11-12 06:50:57',NULL),('f0e164ce-bf93-11f0-b4fb-04d4c4e7738c','station-005','manager-002',20,12,742,'+84-28-37485612','station5@evcharge.vn',73,68,'5.00-23.00','2025-11-12 06:50:57','2025-11-12 06:50:57',NULL),('f0e165f8-bf93-11f0-b4fb-04d4c4e7738c','station-006','manager-004',6,0,300,'+84-28-39874561','station6@evcharge.vn',500,150,'6:00-22:00','2025-11-12 06:50:57','2025-11-12 06:50:57','24/7'),('f0e16710-bf93-11f0-b4fb-04d4c4e7738c','station-007','manager-005',18,14,850,'+84-28-38967412','station7@evcharge.vn',950,680,'24/7','2025-11-12 06:50:57','2025-11-12 06:50:57','24/7'),('f0e16828-bf93-11f0-b4fb-04d4c4e7738c','station-008','manager-003',14,10,650,'+84-28-38741236','station8@evcharge.vn',750,520,'5:00-23:00','2025-11-12 06:50:57','2025-11-12 06:50:57','6:00-22:00'),('f0e16940-bf93-11f0-b4fb-04d4c4e7738c','station-009','manager-001',16,11,720,'+84-28-38659874','station9@evcharge.vn',820,580,'24/7','2025-11-12 06:50:57','2025-11-12 06:50:57','24/7'),('f0e16a58-bf93-11f0-b4fb-04d4c4e7738c','station-010','manager-002',12,8,580,'+84-28-38521479','station10@evcharge.vn',680,465,'5:00-24:00','2025-11-12 06:50:57','2025-11-12 06:50:57','6:00-22:00'),('f0e16b70-bf93-11f0-b4fb-04d4c4e7738c','4146dc6a-6148-42d3-971f-e83e32de234e','manager-004',80,80,2000,'+84-28-38456789','hocmon@evcharge.vn',2200,1200,'24/7','2025-11-12 06:50:57','2025-11-12 06:50:57','24/7'),('f0e16c88-bf93-11f0-b4fb-04d4c4e7738c','9b03ea87-d7c8-4219-89ef-3b74d4c57bc1','jack_5_cu',5,5,250,'+84-275-3812345','bentre@evcharge.vn',300,180,'6:00-21:00','2025-11-12 06:50:57','2025-11-12 06:50:57','7:00-20:00');
/*!40000 ALTER TABLE `station_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `station_energy_logs`
--

DROP TABLE IF EXISTS `station_energy_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `station_energy_logs` (
  `id` varchar(255) NOT NULL,
  `station_id` varchar(36) NOT NULL,
  `energy_consumed` double DEFAULT NULL,
  `power_demand` double DEFAULT NULL,
  `voltage` double DEFAULT NULL,
  `current` double DEFAULT NULL,
  `co2_saved` double DEFAULT NULL,
  `equivalent_trees` double DEFAULT NULL,
  `logged_at` datetime NOT NULL,
  `time_slot` varchar(5) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_station_time` (`station_id`,`logged_at`),
  KEY `idx_time_slot` (`time_slot`),
  KEY `idx_energy_date` (`logged_at`),
  CONSTRAINT `station_energy_logs_ibfk_1` FOREIGN KEY (`station_id`) REFERENCES `stations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `station_energy_logs`
--

LOCK TABLES `station_energy_logs` WRITE;
/*!40000 ALTER TABLE `station_energy_logs` DISABLE KEYS */;
INSERT INTO `station_energy_logs` VALUES ('1','station-001',125.5,45.2,380,118.95,85.34,12.5,'2024-01-20 08:00:00','08:00','2025-11-11 17:54:31'),('10','station-004',198.75,68.9,380.5,181.1,135.15,19.81,'2024-01-20 10:00:00','10:00','2025-11-11 17:54:31'),('11','station-004',267.35,92.4,379.2,243.7,181.798,26.65,'2024-01-20 14:00:00','14:00','2025-11-11 17:54:31'),('12','station-005',456.8,158.75,383.2,414.5,310.624,45.53,'2024-01-20 09:00:00','09:00','2025-11-11 17:54:31'),('13','station-005',623.45,215.6,382.5,564.2,423.946,62.14,'2024-01-20 13:00:00','13:00','2025-11-11 17:54:31'),('14','station-005',534.2,185.3,381.8,480.15,363.256,53.24,'2024-01-20 19:00:00','19:00','2025-11-11 17:54:31'),('15','station-006',45.2,15.8,220,68.8,30.736,4.51,'2024-01-20 09:00:00','09:00','2025-11-11 17:54:31'),('16','station-007',289.4,98.7,381.5,253.4,196.792,28.84,'2024-01-20 10:00:00','10:00','2025-11-11 17:54:31'),('17','station-008',178.9,62.1,380.8,156.9,121.652,17.83,'2024-01-20 11:00:00','11:00','2025-11-11 17:54:31'),('18','station-009',234.6,81.5,382.3,204.8,159.528,23.38,'2024-01-20 12:00:00','12:00','2025-11-11 17:54:31'),('19','station-010',156.7,54.3,381.1,137.2,106.556,15.62,'2024-01-20 13:00:00','13:00','2025-11-11 17:54:31'),('2','station-001',234.75,78.6,379.5,207.1,159.63,23.4,'2024-01-20 12:00:00','12:00','2025-11-11 17:54:31'),('20','4146dc6a-6148-42d3-971f-e83e32de234e',678.9,235.4,383.8,590.1,461.652,67.67,'2024-01-20 14:00:00','14:00','2025-11-11 17:54:31'),('21','9b03ea87-d7c8-4219-89ef-3b74d4c57bc1',89.3,31.2,220,129.6,60.724,8.9,'2024-01-20 15:00:00','15:00','2025-11-11 17:54:31'),('3','station-001',189.2,62.3,381.2,163.45,128.656,18.85,'2024-01-20 18:00:00','18:00','2025-11-11 17:54:31'),('4','station-002',345.25,120.45,382.1,315.3,234.77,34.4,'2024-01-20 08:00:00','08:00','2025-11-11 17:54:31'),('5','station-002',567.8,198.75,381.8,520.15,386.104,56.6,'2024-01-20 12:00:00','12:00','2025-11-11 17:54:31'),('6','station-002',478.35,165.2,380.9,435.8,325.278,47.7,'2024-01-20 18:00:00','18:00','2025-11-11 17:54:31'),('7','station-003',78.9,25.6,220,116.36,53.652,7.86,'2024-01-20 08:00:00','08:00','2025-11-11 17:54:31'),('8','station-003',145.6,48.2,219.8,219.2,99.008,14.51,'2024-01-20 12:00:00','12:00','2025-11-11 17:54:31'),('9','station-003',112.3,36.8,221.1,166.45,76.364,11.19,'2024-01-20 18:00:00','18:00','2025-11-11 17:54:31');
/*!40000 ALTER TABLE `station_energy_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stations`
--

DROP TABLE IF EXISTS `stations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stations` (
  `id` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `available_slots` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `manager_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('ACTIVE','INACTIVE','MAINTENANCE','UNDER_CONSTRUCTION') DEFAULT NULL,
  `total_slots` int DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stations`
--

LOCK TABLES `stations` WRITE;
/*!40000 ALTER TABLE `stations` DISABLE KEYS */;
INSERT INTO `stations` VALUES ('4146dc6a-6148-42d3-971f-e83e32de234e','104 Trần Văn Mười, Tân Thới 2, Hóc Môn, Thành Phố Hồ Chí MInh',80,'2025-11-10 13:16:37.650641',10.878345,106.576353148238,'manager-004','Trạm Sạc Siêu Cấp Vip PRo Đẳng Cấp Nhất Hóc Môn','ACTIVE',80,'2025-11-10 16:37:41.240636'),('9b03ea87-d7c8-4219-89ef-3b74d4c57bc1','Bến Tre',5,'2025-11-10 16:55:15.381662',10.843,106.213,'jack_5_cu','Trạm Jack 5 Củ','INACTIVE',5,'2025-11-10 16:57:43.798440'),('station-001','123 Nguyễn Huệ, Quận 1, TP.HCM',97,'2022-03-15 08:30:00.000000',10.7757,106.7009,'manager-001','Trạm Sạc Quận 1','ACTIVE',100,'2025-11-10 13:11:02.594048'),('station-002','456 Nguyễn Văn Linh, Quận 7, TP.HCM',22,'2022-07-22 14:45:00.000000',10.7322,106.6999,'manager-002','Trạm Sạc Quận 7','ACTIVE',25,'2025-11-10 13:10:27.723472'),('station-003','789 Xô Viết Nghệ Tĩnh, Bình Thạnh, TP.HCM',3,'2022-11-08 09:15:00.000000',10.8014,106.7134,'manager-001','Trạm Sạc Quận Bình Thạnh','MAINTENANCE',10,'2024-11-05 16:45:00.000000'),('station-004','321 Quang Trung, Gò Vấp, TP.HCM',6,'2023-01-20 11:20:00.000000',10.8398,106.672,'manager-003','Trạm Sạc Quận Gò Vấp','ACTIVE',8,'2024-08-30 13:25:00.000000'),('station-005','654 Trường Chinh, Tân Bình, TP.HCM',15,'2023-04-05 16:10:00.000000',10.8011,106.6525,'manager-002','Trạm Sạc Quận Tân Bình','ACTIVE',20,'2024-10-15 09:40:00.000000'),('station-006','987 Hoàng Văn Thụ, Phú Nhuận, TP.HCM',0,'2023-08-30 13:55:00.000000',10.7979,106.6753,'manager-004','Trạm Sạc Quận Phú Nhuận','INACTIVE',6,'2024-07-22 17:20:00.000000'),('station-007','159 Võ Văn Ngân, Thủ Đức, TP.HCM',14,'2023-12-12 10:05:00.000000',10.8494,106.7717,'manager-005','Trạm Sạc Quận Thủ Đức','ACTIVE',18,'2024-11-02 11:50:00.000000'),('station-008','753 Nguyễn Ảnh Thủ, Quận 12, TP.HCM',10,'2024-02-28 15:35:00.000000',10.8807,106.6592,'manager-003','Trạm Sạc Quận 12','ACTIVE',14,'2024-10-28 08:15:00.000000'),('station-009','246 Lê Trọng Tấn, Bình Tân, TP.HCM',11,'2024-06-18 07:40:00.000000',10.7654,106.6167,'manager-001','Trạm Sạc Quận Bình Tân','ACTIVE',16,'2024-11-06 14:30:00.000000'),('station-010','864 3 Tháng 2, Quận 10, TP.HCM',8,'2024-09-05 12:25:00.000000',10.7769,106.6671,'manager-002','Trạm Sạc Quận 10','ACTIVE',12,'2024-11-07 16:45:00.000000');
/*!40000 ALTER TABLE `stations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-25  2:18:36
