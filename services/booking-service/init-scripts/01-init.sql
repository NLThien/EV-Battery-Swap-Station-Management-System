CREATE DATABASE  IF NOT EXISTS `booking_station_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `booking_station_db`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: booking_station_db
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
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` varchar(255) NOT NULL,
  `station_id` varchar(255) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_phone` varchar(255) DEFAULT NULL,
  `vehicle_type` varchar(255) DEFAULT NULL,
  `license_plate` varchar(255) DEFAULT NULL,
  `booking_type` varchar(255) DEFAULT NULL,
  `booking_time` datetime DEFAULT NULL,
  `estimated_duration` int DEFAULT NULL,
  `battery_type` varchar(255) DEFAULT NULL,
  `special_requirements` text,
  `status` varchar(255) DEFAULT NULL,
  `battery_package_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FKr212d8iueivchfvp5jmk6y6xl` (`battery_package_id`),
  CONSTRAINT `FKr212d8iueivchfvp5jmk6y6xl` FOREIGN KEY (`battery_package_id`) REFERENCES `battery_packages` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES ('BOOK_001','station-001','Nguyễn Văn An','0909123456','VinFast VF e34','51A-123.45','SWAP','2025-01-15 10:00:00',15,'Battery 42 kWh',NULL,'CONFIRMED','PKG_BASIC_001','2025-11-09 18:46:51'),('BOOK_002','station-002','Trần Thị Bình','0918234567','VinFast VF 8','51B-678.90','SWAP','2025-01-15 11:30:00',20,'Battery 87 kWh',NULL,'PENDING','PKG_PREMIUM_001','2025-11-09 18:46:51'),('BOOK_003','station-001','Lê Văn Cường','0927345678','VinFast VF 9','51C-111.22','SWAP','2025-01-15 14:00:00',25,'Battery 92 kWh',NULL,'COMPLETED','PKG_UNLIMITED_001','2025-11-09 18:46:51'),('BOOK_004','station-003','Phạm Thị Dung','0936456789','VinFast VF e34','51D-333.44','SWAP','2024-01-16 09:00:00',15,'Battery 42 kWh',NULL,'CONFIRMED','PKG_BASIC_001','2025-11-09 18:46:51'),('BOOK_005','station-002','Hoàng Văn Em','0945567890','VinFast VF 5','51E-555.66','SWAP','2024-01-16 13:45:00',10,'Battery 37 kWh',NULL,'CANCELLED','PKG_WEEKLY_001','2025-11-09 18:46:51'),('BOOK_006','station-022','Đỗ Hữu Đạo','0932561811','VinFast VF 3','77E-555.55','SWAP','2025-11-10 13:45:00',10,'Battery 36 kWh',NULL,'CANCELLED','PKG_WEEKLY_001','2025-11-09 18:46:51'),('BOOK_007','station-002','Nguyễn Sơn Hoàng','0945567890','VinFast VF 9','78E-678.77','SWAP','2025-11-06 13:45:00',10,'Battery 18 kWh',NULL,'CANCELLED','PKG_WEEKLY_001','2025-11-09 18:46:51'),('BOOK_008','station-010','Hồ Ngọc Huy','0922561592','VinFast VF 3','77E-555.55','SWAP','2025-11-10 13:45:00',10,'Battery 36 kWh',NULL,'CANCELLED','PKG_WEEKLY_001','2025-11-09 18:46:51'),('BOOK_009','station-009','Nguyễn Hoàng Phúc','0972561180','VinFast VF 3','77E-555.55','SWAP','2025-11-10 13:45:00',10,'Battery 36 kWh',NULL,'CANCELLED','PKG_WEEKLY_001','2025-11-09 18:46:51'),('BOOK_010','station-007','Nguyễn Lâm Thiên','0385162797','VinFast VF 3','77E-555.55','SWAP','2025-11-10 13:45:00',10,'Battery 36 kWh',NULL,'CANCELLED','PKG_WEEKLY_001','2025-11-09 18:46:51'),('BOOK_011','station-004','Nguyễn Văn Chiến','0999999999','VinFast VF 3','77E-555.55','SWAP','2025-11-10 13:45:00',10,'Battery 36 kWh',NULL,'CANCELLED','PKG_WEEKLY_001','2025-11-09 18:46:51'),('BOOK_012','station-005','Jack 5 củ','0955555555','VinFast VF 3','77E-555.55','SWAP','2025-11-10 13:45:00',10,'Battery 36 kWh',NULL,'CANCELLED','PKG_WEEKLY_001','2025-11-09 18:46:51'),('BOOK_013','station-006','Mohamed Salah','0922561124','VinFast VF 3','77E-555.55','SWAP','2025-11-10 13:45:00',10,'Battery 36 kWh',NULL,'CANCELLED','PKG_WEEKLY_001','2025-11-09 18:46:51'),('BOOK_014','station-004','Lee Chong Wei','0932505290','VinFast VF 3','77E-555.55','SWAP','2025-11-10 13:45:00',10,'Battery 36 kWh',NULL,'CANCELLED','PKG_WEEKLY_001','2025-11-09 18:46:51'),('BOOK_015','station-008','Rhoshandiatellyneshiaunneveshenk Koyaanisquatsiuth Williams','0999870999','VinFast VF 9','50A-431.25','SWAP','2025-09-05 13:45:00',10,'Battery 36 kWh',NULL,'CANCELLED','PKG_WEEKLY_001','2025-11-09 18:46:51');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-25 13:07:26
