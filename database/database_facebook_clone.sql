-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: facebook_clone
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `birth_date` datetime NOT NULL,
  `sex` tinyint(1) NOT NULL,
  `create_time` datetime NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `come_from` varchar(255) DEFAULT NULL,
  `live_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_comment`
--

DROP TABLE IF EXISTS `account_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `comment_id` int NOT NULL,
  `type` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk1_account_comment_idx` (`account_id`),
  KEY `fk2_account_comment_idx` (`comment_id`),
  CONSTRAINT `fk1_account_comment` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk2_account_comment` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_comment`
--

LOCK TABLES `account_comment` WRITE;
/*!40000 ALTER TABLE `account_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_post`
--

DROP TABLE IF EXISTS `account_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `post_id` int NOT NULL,
  `type` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk2_idx` (`post_id`),
  KEY `fk1_idx` (`account_id`),
  CONSTRAINT `fk1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_post`
--

LOCK TABLES `account_post` WRITE;
/*!40000 ALTER TABLE `account_post` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `content` text NOT NULL,
  `create_time` datetime NOT NULL,
  `edit_time` datetime DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  `post_id` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `to_comment_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk1_comment_idx` (`to_comment_id`),
  KEY `fk2_comment_idx` (`post_id`),
  KEY `fk3_comment_idx` (`account_id`),
  CONSTRAINT `fk1_comment` FOREIGN KEY (`to_comment_id`) REFERENCES `comment` (`id`),
  CONSTRAINT `fk2_comment` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  CONSTRAINT `fk3_comment` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend` (
  `from_account_id` int NOT NULL,
  `to_account_id` int NOT NULL,
  `friend_request_time` datetime DEFAULT NULL,
  `friend_time` datetime DEFAULT NULL,
  PRIMARY KEY (`from_account_id`,`to_account_id`),
  KEY `fk2_friend_idx` (`from_account_id`,`to_account_id`),
  KEY `fk2_friend_idx1` (`to_account_id`),
  CONSTRAINT `fk1_friend` FOREIGN KEY (`from_account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk2_friend` FOREIGN KEY (`to_account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `from_account_id` int NOT NULL,
  `to_account_id` int NOT NULL,
  `message_text` text NOT NULL,
  `send_time` datetime NOT NULL,
  `delete_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk2_message_idx` (`to_account_id`),
  KEY `fk1_message` (`from_account_id`),
  CONSTRAINT `fk1_message` FOREIGN KEY (`from_account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk2_message` FOREIGN KEY (`to_account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message_image`
--

DROP TABLE IF EXISTS `message_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `message_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`message_id`),
  CONSTRAINT `id` FOREIGN KEY (`message_id`) REFERENCES `message` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message_image`
--

LOCK TABLES `message_image` WRITE;
/*!40000 ALTER TABLE `message_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `message_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notify`
--

DROP TABLE IF EXISTS `notify`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notify` (
  `id` int NOT NULL AUTO_INCREMENT,
  `from_account_id` int NOT NULL,
  `to_account_id` int DEFAULT NULL,
  `to_post_id` int DEFAULT NULL,
  `to_comment_id` int DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `content` text NOT NULL,
  `notify_type_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk3_notify_idx` (`to_post_id`),
  KEY `fk4_notify_idx` (`notify_type_id`),
  KEY `fk5_notify_idx` (`to_comment_id`),
  KEY `fk1_notify_idx` (`from_account_id`),
  KEY `fk2_notify_idx` (`to_account_id`),
  CONSTRAINT `fk1_notify` FOREIGN KEY (`from_account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk2_notify` FOREIGN KEY (`to_account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk3_notify` FOREIGN KEY (`to_post_id`) REFERENCES `post` (`id`),
  CONSTRAINT `fk4_notify` FOREIGN KEY (`notify_type_id`) REFERENCES `notify_type` (`id`),
  CONSTRAINT `fk5_notify` FOREIGN KEY (`to_comment_id`) REFERENCES `comment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notify`
--

LOCK TABLES `notify` WRITE;
/*!40000 ALTER TABLE `notify` DISABLE KEYS */;
/*!40000 ALTER TABLE `notify` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notify_type`
--

DROP TABLE IF EXISTS `notify_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notify_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notify_type`
--

LOCK TABLES `notify_type` WRITE;
/*!40000 ALTER TABLE `notify_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `notify_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `content` text NOT NULL,
  `create_time` datetime NOT NULL,
  `edit_time` datetime DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk1_post_idx` (`account_id`),
  CONSTRAINT `fk1_post` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_image`
--

DROP TABLE IF EXISTS `post_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk1_post_image_idx` (`post_id`),
  CONSTRAINT `fk1_post_image` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_image`
--

LOCK TABLES `post_image` WRITE;
/*!40000 ALTER TABLE `post_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_image` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-30 20:50:42
