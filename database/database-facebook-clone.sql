-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: facebook_clone
-- ------------------------------------------------------
-- Server version	8.0.37

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
  `birth_date` date DEFAULT NULL,
  `sex` tinyint(1) NOT NULL,
  `create_time` datetime NOT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `come_from` varchar(255) DEFAULT NULL,
  `live_at` varchar(255) DEFAULT NULL,
  `coverImage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'hung2207','Nhật Hưng','$2a$12$RDZt4S33JDygRgDWUuje3u4DlmSXe24WwJSD/Q.isNnAsf8QB3RD.','hung2207@gmail.com','2003-07-22',1,'2024-05-01 00:00:00','https://res.cloudinary.com/dwqwjohey/image/upload/v1714705145/imikz2zhxojzvdznisgu.png',NULL,NULL,NULL,NULL),(2,'user','User','$2a$12$j1AQ1RNY5HrUwv3Bt2gkduRBh2skbIoSaBgqigX3sdXs9P8SW0CT6','user@gmail.com','2012-06-01',1,'2023-04-06 00:00:00','https://res.cloudinary.com/dwqwjohey/image/upload/v1715013355/cd0yvmtukfzvda0pnaah.png','dsadasda','Tôn Đức Thắng','Đà Nẵng',NULL),(3,'tuan2003','Nguyễn Tuấn','$2a$12$RDZt4S33JDygRgDWUuje3u4DlmSXe24WwJSD/Q.isNnAsf8QB3RD.','tuan2003@gmail.com','2003-05-01',2,'2024-05-07 00:00:00','https://res.cloudinary.com/dwqwjohey/image/upload/v1716215526/jjpfrqr4qnrtqkes5rs3.jpg',NULL,NULL,NULL,NULL),(4,'nghia','Đức Nghĩa','$2a$12$DCJZGLt6rCUx32k4RnQdTe6NO13nK98Au3BZ5n98Dfh86LknRiiCi','nghia@gmail.com','2003-12-20',1,'2023-06-01 00:00:00','https://res.cloudinary.com/dwqwjohey/image/upload/v1716307202/fi5e5przg9orbkvcniau.png',NULL,NULL,NULL,NULL),(5,'test','Test User','$2a$10$0VCxgSPtRYwOKVqmN8K9AOF3Vv.0Uocts6VMWFGIzUIimE74eJsIu','test@gmail.com','2024-06-02',1,'2024-05-11 08:44:00','https://res.cloudinary.com/dwqwjohey/image/upload/v1717222947/zbi8xk8g8piazey9rh7l.jpg','Hiooooo',NULL,NULL,NULL),(6,'dong','Nguyễn Đông','$2a$10$/eoHBXgAy2VEzxxGibpXa.Z9lQtqQU2A.eHmh9n5t1gZCtNKJjv0S','dong@gmail.com','2006-06-06',1,'2024-06-07 20:29:19',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_post`
--

DROP TABLE IF EXISTS `comment_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `content` text NOT NULL,
  `create_time` datetime NOT NULL,
  `edit_time` datetime DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `to_comment_id` int DEFAULT NULL,
  `tag_id` int DEFAULT NULL,
  `reaction_quantity` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk1_comment_idx` (`to_comment_id`),
  KEY `fk2_comment_idx` (`post_id`),
  KEY `fk3_comment_idx` (`account_id`),
  KEY `fk4_comment_idx` (`tag_id`),
  CONSTRAINT `fk1_comment` FOREIGN KEY (`to_comment_id`) REFERENCES `comment_post` (`id`),
  CONSTRAINT `fk2_comment` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  CONSTRAINT `fk3_comment` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk4_comment` FOREIGN KEY (`tag_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_post`
--

LOCK TABLES `comment_post` WRITE;
/*!40000 ALTER TABLE `comment_post` DISABLE KEYS */;
INSERT INTO `comment_post` VALUES (5,2,'Buổi tối vui vẻ','2024-05-03 21:30:00',NULL,4,NULL,NULL,NULL,0),(9,1,'Cảm ơn bạn','2024-05-03 21:35:00',NULL,4,NULL,NULL,NULL,0),(10,2,'Không có chi !!! :)','2024-05-03 21:36:00','2024-05-07 15:33:02',NULL,NULL,9,1,0),(11,1,'kkk','2024-05-07 15:42:33',NULL,NULL,NULL,9,2,0),(16,5,'Good night','2024-05-14 21:51:11',NULL,5,NULL,NULL,NULL,0),(17,4,'Hi bro','2024-05-14 21:52:23',NULL,5,NULL,NULL,NULL,0),(21,5,'Xin chào','2024-05-28 17:36:07',NULL,4,'https://res.cloudinary.com/dwqwjohey/image/upload/v1716892574/vvbuq3v6u56iv5ai1gkb.png',NULL,NULL,0),(22,5,'123456','2024-05-28 23:22:50','2024-06-07 00:42:33',17,NULL,NULL,NULL,2),(23,5,'ấdas','2024-05-28 23:33:47',NULL,17,NULL,NULL,NULL,1),(25,5,'dsadasda','2024-05-29 00:03:11',NULL,NULL,NULL,23,NULL,0),(26,5,'Test User dsdas','2024-05-29 00:03:21',NULL,NULL,NULL,25,NULL,0),(27,5,'đddasd123','2024-05-29 16:11:18','2024-06-07 02:07:51',16,NULL,NULL,NULL,2),(28,1,'Test User dsada','2024-05-29 16:13:55',NULL,NULL,NULL,27,NULL,2),(29,2,'Hi!!!!!','2024-05-30 10:24:50',NULL,17,'https://res.cloudinary.com/dwqwjohey/image/upload/v1717039504/ibsryafm78hegksglb5c.png',NULL,NULL,0),(30,3,'Uowwwww','2024-05-30 10:28:33',NULL,17,NULL,NULL,NULL,0),(31,5,'hii','2024-05-30 11:07:03',NULL,5,NULL,NULL,NULL,0),(32,5,'aaaa','2024-05-30 11:07:13',NULL,5,NULL,NULL,NULL,0),(33,3,'abc1234','2024-05-30 15:46:09',NULL,19,NULL,NULL,NULL,0),(34,4,'Hello world!','2024-05-30 15:49:47',NULL,4,NULL,NULL,NULL,0),(35,3,'hello','2024-05-30 16:26:37',NULL,20,NULL,NULL,NULL,0),(37,3,'User helloooooo','2024-05-30 16:39:12',NULL,NULL,NULL,29,NULL,0),(38,5,'hello >>>>>','2024-05-30 21:20:23',NULL,22,NULL,NULL,NULL,0),(39,1,'hello','2024-05-31 11:05:22',NULL,25,NULL,NULL,NULL,0),(40,1,'Test User chao ban','2024-05-31 11:05:50',NULL,NULL,NULL,38,NULL,0),(41,5,'hello','2024-06-01 13:08:28',NULL,16,NULL,NULL,NULL,0),(42,5,'Nhật Hưng 12','2024-06-01 13:12:53',NULL,NULL,NULL,28,NULL,0),(43,5,'Nhật Hưng gbdd','2024-06-01 13:14:24',NULL,NULL,NULL,28,NULL,0),(44,5,'tuan ','2024-06-01 13:15:21',NULL,13,NULL,NULL,NULL,0),(45,1,'abc','2024-06-01 13:35:24',NULL,11,NULL,NULL,NULL,0),(46,4,'Nguyễn Tuấn ahhaaa','2024-06-01 15:37:47',NULL,NULL,NULL,30,NULL,0),(47,1,'Test User aac','2024-06-02 15:24:17',NULL,NULL,NULL,44,NULL,0),(48,1,'Test User 123455','2024-06-02 15:26:26',NULL,NULL,NULL,28,NULL,0),(49,1,'Nguyễn Tuấn hihi','2024-06-02 15:30:56',NULL,NULL,NULL,35,NULL,0),(50,1,'Đức Nghĩa hehe','2024-06-02 15:31:29',NULL,NULL,NULL,34,NULL,0),(51,1,'like di mn oi','2024-06-02 15:32:32',NULL,20,NULL,NULL,NULL,0),(52,1,'Test User hihi','2024-06-02 15:40:23',NULL,NULL,NULL,41,NULL,0),(53,5,'Nhật Hưng ahaha','2024-06-02 15:41:20',NULL,NULL,NULL,28,NULL,-2),(55,1,'Nguyễn Tuấn hiiiii','2024-06-04 14:22:03',NULL,NULL,NULL,37,NULL,0),(56,3,'Nhật Hưng chao cau','2024-06-04 14:24:15',NULL,NULL,NULL,37,NULL,0),(57,1,'hiiii','2024-06-04 21:56:52',NULL,21,NULL,NULL,NULL,0),(58,4,'hi bro','2024-06-05 00:22:18',NULL,20,NULL,NULL,NULL,0),(59,4,'Nhật Hưng oke','2024-06-05 00:22:36',NULL,NULL,NULL,51,NULL,0),(60,4,'Nhật Hưng ;))))','2024-06-05 00:23:49',NULL,NULL,NULL,49,NULL,0),(61,4,'Nhật Hưng sdasda','2024-06-05 00:24:29',NULL,NULL,NULL,51,NULL,0),(62,4,'Nhật Hưng helo','2024-06-05 00:26:01',NULL,NULL,NULL,40,NULL,0),(63,4,'122','2024-06-05 00:30:49',NULL,22,NULL,NULL,NULL,0),(68,2,'hello boi','2024-06-05 08:20:18',NULL,26,NULL,NULL,NULL,0),(69,2,'Nhật Hưng dasddd','2024-06-05 08:23:44',NULL,NULL,NULL,47,NULL,0),(70,2,'hay heeee','2024-06-05 08:24:05',NULL,14,NULL,NULL,NULL,1),(71,3,'heeehee','2024-06-05 08:53:18',NULL,8,NULL,NULL,NULL,0),(72,3,'fkkk','2024-06-05 08:53:37',NULL,7,NULL,NULL,NULL,0),(73,4,'hellloee ','2024-06-05 09:13:03',NULL,16,NULL,NULL,NULL,0),(74,1,'User okeeee','2024-06-05 09:46:41',NULL,NULL,NULL,70,NULL,0),(75,1,'Đức Nghĩa hiii bro','2024-06-05 09:47:04',NULL,NULL,NULL,73,NULL,0),(76,5,'hi','2024-06-05 15:06:31',NULL,25,'https://res.cloudinary.com/dwqwjohey/image/upload/v1717574799/rqibouq7nlyrclkwnx0i.jpg',NULL,NULL,0),(77,5,'Nhật Hưng hay','2024-06-05 15:10:44',NULL,NULL,NULL,39,NULL,0),(78,5,'đddasd','2024-06-05 22:14:41',NULL,16,'https://res.cloudinary.com/dwqwjohey/image/upload/v1717600495/c5xiyomrrtw2vzsuxtma.jpg',NULL,NULL,0),(79,5,'Hi','2024-06-05 23:39:42',NULL,16,'https://res.cloudinary.com/dwqwjohey/image/upload/v1717605590/t2rnm8d9zpahp4zi1qpi.jpg',NULL,NULL,0),(80,5,'Hhhh','2024-06-06 16:51:09',NULL,16,'https://res.cloudinary.com/dwqwjohey/image/upload/v1717667476/n0gnfm7rqibfdacp5izn.jpg',NULL,NULL,0),(81,4,'Test User chao','2024-06-06 23:28:23',NULL,NULL,NULL,22,NULL,0),(82,4,'Test User ','2024-06-06 23:34:22',NULL,NULL,'https://res.cloudinary.com/dwqwjohey/image/upload/v1717691669/wpfcic5ajw7rymukfm2u.jpg',22,NULL,0),(83,5,'Hello','2024-06-07 00:27:41',NULL,16,'https://res.cloudinary.com/dwqwjohey/image/upload/v1717694867/rkx2xk1yo2r0nwafy5wg.jpg',NULL,NULL,0),(84,5,'Chao cau','2024-06-07 04:48:30',NULL,17,NULL,NULL,NULL,1),(85,5,'Hello','2024-06-07 04:48:35',NULL,17,NULL,NULL,NULL,1),(86,4,'Test User chao','2024-06-07 04:49:22',NULL,NULL,NULL,84,NULL,0),(87,4,'Test User xin chao nha','2024-06-07 04:50:12',NULL,NULL,NULL,84,NULL,0),(88,4,'Test User helki','2024-06-07 04:50:27',NULL,NULL,NULL,85,NULL,0),(89,5,'hello','2024-06-07 14:01:53',NULL,32,NULL,NULL,NULL,1),(90,5,'xin chao ban','2024-06-07 14:02:00',NULL,32,'https://res.cloudinary.com/dwqwjohey/image/upload/v1717743725/ynj0ebnrbl88zvowj8cq.jpg',NULL,NULL,1),(91,4,'Test User hay','2024-06-07 14:03:07',NULL,NULL,NULL,89,NULL,0),(92,4,'Test User tot','2024-06-07 14:03:16',NULL,NULL,'https://res.cloudinary.com/dwqwjohey/image/upload/v1717743803/pi7x3k8dimajkjnaqgwd.jpg',89,NULL,0),(93,4,'Test User hay đó ban','2024-06-07 14:03:47',NULL,NULL,NULL,90,NULL,0),(94,4,'Test User hello','2024-06-07 14:04:00',NULL,NULL,'https://res.cloudinary.com/dwqwjohey/image/upload/v1717743847/asdpsfbv1q7vrz0wgz6w.jpg',90,NULL,0),(95,4,'Đức Nghĩa tot','2024-06-07 14:04:28',NULL,NULL,NULL,92,NULL,0),(96,5,'xin chao','2024-06-07 14:11:20',NULL,33,'https://res.cloudinary.com/dwqwjohey/image/upload/v1717744288/igkzsazxeu8wamn6cuv6.jpg',NULL,NULL,0),(97,5,'hello','2024-06-07 14:11:37',NULL,33,'https://res.cloudinary.com/dwqwjohey/image/upload/v1717744302/qw2vwlrb4idsh0emot2d.jpg',NULL,NULL,0),(98,4,'Test User 1','2024-06-07 14:12:23',NULL,NULL,NULL,96,NULL,0),(99,4,'Test User 2','2024-06-07 14:12:32',NULL,NULL,'https://res.cloudinary.com/dwqwjohey/image/upload/v1717744358/epbpesxfttyoyseq9zdp.jpg',96,NULL,0),(100,4,'Test User 3','2024-06-07 14:12:49',NULL,NULL,NULL,96,NULL,0),(101,4,'Test User 4','2024-06-07 14:12:58',NULL,NULL,NULL,97,NULL,0),(102,4,'Test User 5','2024-06-07 14:13:12',NULL,NULL,'https://res.cloudinary.com/dwqwjohey/image/upload/v1717744404/wcusf41h4dvir6z4jnjp.jpg',97,NULL,0),(103,5,'hellp','2024-06-07 14:25:32',NULL,32,NULL,NULL,NULL,0),(104,5,'hi','2024-06-07 14:25:38',NULL,32,NULL,NULL,NULL,0),(105,5,'xin chao','2024-06-07 14:26:08','2024-06-08 09:16:55',26,NULL,NULL,NULL,0),(106,5,'hi','2024-06-07 14:26:26',NULL,20,'https://res.cloudinary.com/dwqwjohey/image/upload/v1717745193/ux6thklfaxhelitjxld8.jpg',NULL,NULL,0);
/*!40000 ALTER TABLE `comment_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_share`
--

DROP TABLE IF EXISTS `comment_share`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_share` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `edit_time` datetime DEFAULT NULL,
  `share_id` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `to_comment_id` int DEFAULT NULL,
  `tag_id` int DEFAULT NULL,
  `reaction_quantity` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_comment_account_idx` (`account_id`),
  KEY `fk_comment_share_idx` (`share_id`),
  KEY `fk_comment_comment_idx` (`to_comment_id`),
  KEY `fk1_comment_account_idx` (`tag_id`),
  CONSTRAINT `fk1_comment_account` FOREIGN KEY (`tag_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk_comment_account` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk_comment_comment` FOREIGN KEY (`to_comment_id`) REFERENCES `comment_share` (`id`),
  CONSTRAINT `fk_comment_share` FOREIGN KEY (`share_id`) REFERENCES `share` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_share`
--

LOCK TABLES `comment_share` WRITE;
/*!40000 ALTER TABLE `comment_share` DISABLE KEYS */;
INSERT INTO `comment_share` VALUES (9,5,'Kkkkk','2024-05-20 21:31:59',NULL,4,'https://res.cloudinary.com/dwqwjohey/image/upload/v1716215526/jjpfrqr4qnrtqkes5rs3.jpg',NULL,NULL,0),(11,4,'Kkas','2024-05-26 20:39:35',NULL,4,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `comment_share` ENABLE KEYS */;
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
INSERT INTO `friend` VALUES (1,2,'2024-05-18 00:01:00','2024-05-18 00:02:00'),(1,3,'2024-06-05 09:40:27','2024-06-05 09:40:57'),(1,4,'2024-06-04 14:50:00','2024-06-04 15:49:54'),(1,5,'2024-05-17 12:01:00','2024-05-29 15:52:39'),(2,5,'2024-06-04 22:42:20','2024-06-04 22:42:55'),(3,4,'2024-06-04 23:10:01','2024-06-04 23:10:25');
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
  `to_comment_post_id` int DEFAULT NULL,
  `comment_id` int DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `create_time` datetime NOT NULL,
  `content` text NOT NULL,
  `notify_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk3_notify_idx` (`to_post_id`),
  KEY `fk5_notify_idx` (`to_comment_post_id`),
  KEY `fk1_notify_idx` (`from_account_id`),
  KEY `fk2_notify_idx` (`to_account_id`),
  KEY `fk4_notify_idx` (`comment_id`),
  CONSTRAINT `fk1_notify` FOREIGN KEY (`from_account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk2_notify` FOREIGN KEY (`to_account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk3_notify` FOREIGN KEY (`to_post_id`) REFERENCES `post` (`id`),
  CONSTRAINT `fk4_notify` FOREIGN KEY (`comment_id`) REFERENCES `comment_post` (`id`),
  CONSTRAINT `fk5_notify` FOREIGN KEY (`to_comment_post_id`) REFERENCES `comment_post` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notify`
--

LOCK TABLES `notify` WRITE;
/*!40000 ALTER TABLE `notify` DISABLE KEYS */;
INSERT INTO `notify` VALUES (136,2,1,14,NULL,70,1,'2024-06-05 08:24:05','<B>User</B> commented on your post','comment'),(142,3,4,8,NULL,71,1,'2024-06-05 08:53:18','<B>Nguyễn Tuấn</B> commented on your post','comment'),(143,3,4,8,NULL,NULL,1,'2024-06-05 08:53:29','<B>Nguyễn Tuấn</B> reacted to your post','HAHA'),(145,3,4,7,NULL,NULL,1,'2024-06-05 08:53:47','<B>Nguyễn Tuấn</B> reacted to your post','ANGRY'),(146,4,2,26,68,NULL,1,'2024-06-05 08:58:38','<B>Đức Nghĩa</B> reacted to your comment','CARE'),(148,4,1,16,NULL,73,1,'2024-06-05 09:13:03','<B>Đức Nghĩa</B> commented on your post','comment'),(150,1,2,14,70,74,1,'2024-06-05 09:46:41','<B>Nhật Hưng</B> mentioned you in a comment','comment'),(151,1,4,16,73,75,1,'2024-06-05 09:47:04','<B>Nhật Hưng</B> mentioned you in a comment','comment'),(153,1,5,25,NULL,NULL,1,'2024-06-05 14:55:02','<B>Nhật Hưng</B> reacted to your post','LOVE'),(154,5,1,NULL,39,NULL,0,'2024-06-05 15:10:44','<B>Test User</B> mentioned you in a comment','comment'),(155,5,4,NULL,60,NULL,1,'2024-06-05 15:20:52','<B>Test User</B> reacted to your comment','HAHA'),(156,5,1,19,NULL,NULL,0,'2024-06-05 15:26:10','<B>Test User</B> likes a post you shared','LIKE'),(157,5,1,16,NULL,NULL,0,'2024-06-05 22:14:41','<B>Test User</B> commented on your post','comment'),(158,5,2,NULL,68,NULL,0,'2024-06-05 23:37:50','<B>Test User</B> mentioned you in a comment','comment'),(159,5,1,16,NULL,NULL,0,'2024-06-05 23:39:18','<B>Test User</B> commented on your post','comment'),(160,5,1,16,NULL,NULL,0,'2024-06-05 23:39:42','<B>Test User</B> commented on your post','comment'),(161,5,1,26,NULL,NULL,0,'2024-06-06 16:20:53','<B>Test User</B> reacted to a post you shared','WOW'),(162,5,1,16,NULL,NULL,0,'2024-06-06 16:49:45','<B>Test User</B> reacted to your post','ANGRY'),(163,5,1,16,NULL,NULL,0,'2024-06-06 16:51:17','<B>Test User</B> commented on your post','comment'),(164,5,1,14,NULL,NULL,0,'2024-06-06 16:57:46','<B>Test User</B> reacted to your post','SAD'),(165,4,5,17,22,NULL,1,'2024-06-06 23:28:09','<B>Đức Nghĩa</B> reacted to your comment','HAHA'),(166,4,5,17,22,81,1,'2024-06-06 23:28:23','<B>Đức Nghĩa</B> mentioned you in a comment','comment'),(167,4,5,17,22,82,1,'2024-06-06 23:34:31','<B>Đức Nghĩa</B> mentioned you in a comment','comment'),(168,4,5,17,23,NULL,1,'2024-06-06 23:34:51','<B>Đức Nghĩa</B> reacted to your comment','ANGRY'),(169,5,1,16,NULL,83,0,'2024-06-07 00:27:48','<B>Test User</B> commented on your post','comment'),(170,4,5,17,84,86,1,'2024-06-07 04:49:23','<B>Đức Nghĩa</B> mentioned you in a comment','comment'),(171,4,5,17,84,87,1,'2024-06-07 04:50:13','<B>Đức Nghĩa</B> mentioned you in a comment','comment'),(172,4,5,17,85,88,1,'2024-06-07 04:50:28','<B>Đức Nghĩa</B> mentioned you in a comment','comment'),(173,4,5,17,84,NULL,0,'2024-06-07 04:50:32','<B>Đức Nghĩa</B> reacted to your comment','HAHA'),(174,4,5,17,85,NULL,0,'2024-06-07 04:50:35','<B>Đức Nghĩa</B> reacted to your comment','ANGRY'),(175,4,5,32,89,91,1,'2024-06-07 14:03:07','<B>Đức Nghĩa</B> mentioned you in a comment','comment'),(176,4,5,32,89,92,1,'2024-06-07 14:03:25','<B>Đức Nghĩa</B> mentioned you in a comment','comment'),(177,4,5,32,90,93,1,'2024-06-07 14:03:47','<B>Đức Nghĩa</B> mentioned you in a comment','comment'),(178,4,5,32,90,94,1,'2024-06-07 14:04:08','<B>Đức Nghĩa</B> mentioned you in a comment','comment'),(179,4,5,32,90,NULL,1,'2024-06-07 14:04:41','<B>Đức Nghĩa</B> reacted to your comment','ANGRY'),(180,4,5,32,89,NULL,1,'2024-06-07 14:04:46','<B>Đức Nghĩa</B> reacted to your comment','SAD'),(181,4,5,33,96,98,1,'2024-06-07 14:12:23','<B>Đức Nghĩa</B> mentioned you in a comment','comment'),(182,4,5,33,96,99,1,'2024-06-07 14:12:39','<B>Đức Nghĩa</B> mentioned you in a comment','comment'),(183,4,5,33,96,100,1,'2024-06-07 14:12:50','<B>Đức Nghĩa</B> mentioned you in a comment','comment'),(184,4,5,33,97,101,1,'2024-06-07 14:12:59','<B>Đức Nghĩa</B> mentioned you in a comment','comment'),(185,4,5,33,97,102,1,'2024-06-07 14:13:26','<B>Đức Nghĩa</B> mentioned you in a comment','comment'),(186,5,1,26,NULL,105,0,'2024-06-07 14:26:08','<B>Test User</B> commented on a post you shared','comment'),(187,5,1,20,NULL,106,0,'2024-06-07 14:26:34','<B>Test User</B> commented on a post you shared','comment'),(188,5,2,14,70,NULL,0,'2024-06-08 09:11:51','<B>Test User</B> likes your comment','LIKE'),(189,5,1,16,28,NULL,0,'2024-06-08 09:13:03','<B>Test User</B> reacted to your comment','ANGRY');
/*!40000 ALTER TABLE `notify` ENABLE KEYS */;
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
  `view_mode` varchar(45) DEFAULT NULL,
  `reaction_quantity` int DEFAULT '0',
  `comment_quantity` int DEFAULT '0',
  `share_quantity` int DEFAULT '0',
  `share_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk1_post_idx` (`account_id`),
  KEY `fk2_post_idx` (`share_id`),
  CONSTRAINT `fk1_post` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk2_post` FOREIGN KEY (`share_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (4,1,'Content 4','2024-05-03 10:20:00','2024-05-03 10:30:00','private',4,4,0,NULL),(5,3,'Content 5656511','2024-05-08 20:59:03','2024-05-28 19:46:12','public',2,2,0,NULL),(6,4,'Dmm thằng Tuấn','2024-05-09 10:44:07',NULL,'public',1,0,0,4),(7,4,'Dmm thằng Tuấn','2024-05-09 11:13:20',NULL,'friend',1,0,0,NULL),(8,4,'Dmm thằng Tuấn','2024-05-09 11:13:28',NULL,'public',1,0,0,NULL),(9,4,'Chào buổi sáng ','2024-05-09 15:36:08',NULL,'private',0,0,0,NULL),(11,2,'Content abc','2024-05-10 21:20:19',NULL,'friend',1,0,0,NULL),(13,1,'Content 5656511','2024-05-26 10:27:21','2024-05-28 18:55:15','public',1,0,0,NULL),(14,1,'Content 14 v2','2024-05-26 20:43:49','2024-05-28 15:59:01','friend',3,0,0,NULL),(16,1,'Content 12345','2024-05-28 18:53:59',NULL,'friend',3,0,0,NULL),(17,5,'sdasda','2024-05-28 23:22:16','2024-06-07 01:09:38','public',1,12,0,NULL),(19,1,'123456','2024-05-29 16:16:12',NULL,'public',1,0,0,5),(20,1,'sdadf','2024-05-29 16:20:25',NULL,'public',3,0,0,11),(21,2,'123','2024-05-30 16:49:50',NULL,'public',1,0,0,NULL),(22,3,'Content 12345','2024-05-30 16:52:38',NULL,'friend',2,0,0,NULL),(23,5,'abc','2024-05-30 21:21:09',NULL,'public',3,0,0,NULL),(25,5,'hello','2024-05-30 21:29:25',NULL,'public',2,0,0,NULL),(26,1,'Abc','2024-06-01 13:09:04',NULL,'public',2,0,0,25),(27,1,'Tuấn nguu','2024-06-01 13:09:57',NULL,'private',0,0,0,NULL),(28,5,'Hi','2024-06-05 16:02:24',NULL,'public',0,0,0,23),(29,5,'Hay đó','2024-06-06 00:23:08',NULL,'public',0,0,0,11),(30,5,'Tốt','2024-06-06 00:23:39',NULL,'friend',0,0,0,11),(31,4,'hello','2024-06-06 23:27:45',NULL,'public',0,0,0,NULL),(32,5,'leo messi','2024-06-07 14:01:26',NULL,'public',0,0,0,NULL),(33,5,'hel123','2024-06-07 14:10:39',NULL,'public',1,0,0,NULL),(34,5,'hi','2024-06-07 14:33:47',NULL,'public',0,0,0,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_image`
--

LOCK TABLES `post_image` WRITE;
/*!40000 ALTER TABLE `post_image` DISABLE KEYS */;
INSERT INTO `post_image` VALUES (4,'https://res.cloudinary.com/dwqwjohey/image/upload/v1715243772/ch4ntt8uqxjw2rf2c5ng.png',9),(75,'https://res.cloudinary.com/dwqwjohey/image/upload/v1716897245/fjnnbwtqwk9z6jdzwvoa.jpg',16),(76,'https://res.cloudinary.com/dwqwjohey/image/upload/v1716897245/swwx5dvi9rntj9hrgkgx.jpg',16),(78,'https://res.cloudinary.com/dwqwjohey/image/upload/v1716897274/tbxrxwg7ik4oph8oilvx.jpg',5),(79,'https://res.cloudinary.com/dwqwjohey/image/upload/v1716900385/elvbx2typeoymq87r1pe.jpg',5),(80,'https://res.cloudinary.com/dwqwjohey/image/upload/v1717062768/eqz6oxx1pxs76hnkkgvw.jpg',22),(81,'https://res.cloudinary.com/dwqwjohey/image/upload/v1717062768/df3pdacxtshkznedamg5.jpg',22),(82,'https://res.cloudinary.com/dwqwjohey/image/upload/v1717078879/xcsxgsthlrdembs4fnv2.jpg',23),(83,'https://res.cloudinary.com/dwqwjohey/image/upload/v1717078887/flezainnl4od0nz5qdtz.jpg',23),(84,'https://res.cloudinary.com/dwqwjohey/image/upload/v1717078889/wzlqzigg7hgpnaqla2mh.jpg',23),(89,'https://res.cloudinary.com/dwqwjohey/image/upload/v1717743696/kgvcxhtnqileluqg0uqk.jpg',32),(90,'https://res.cloudinary.com/dwqwjohey/image/upload/v1717744246/tbzkbk8f0cboiswnwhpx.jpg',33);
/*!40000 ALTER TABLE `post_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reaction_comment_post`
--

DROP TABLE IF EXISTS `reaction_comment_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reaction_comment_post` (
  `account_id` int NOT NULL,
  `comment_id` int NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`account_id`,`comment_id`),
  KEY `fk_reaction_comment_idx` (`comment_id`),
  CONSTRAINT `fk_reaction_account` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk_reaction_comment` FOREIGN KEY (`comment_id`) REFERENCES `comment_post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reaction_comment_post`
--

LOCK TABLES `reaction_comment_post` WRITE;
/*!40000 ALTER TABLE `reaction_comment_post` DISABLE KEYS */;
INSERT INTO `reaction_comment_post` VALUES (1,5,'Care'),(4,22,'HAHA'),(4,23,'ANGRY'),(4,84,'HAHA'),(4,85,'ANGRY'),(4,89,'SAD'),(4,90,'ANGRY'),(5,22,'WOW'),(5,27,'HAHA'),(5,28,'ANGRY'),(5,42,'NONE'),(5,53,'NONE'),(5,60,'NONE'),(5,70,'LIKE');
/*!40000 ALTER TABLE `reaction_comment_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reaction_comment_share`
--

DROP TABLE IF EXISTS `reaction_comment_share`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reaction_comment_share` (
  `account_id` int NOT NULL,
  `comment_id` int NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`account_id`,`comment_id`),
  KEY `fk_reaction_comment_idx` (`comment_id`),
  CONSTRAINT `fk_reaction_account_share` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk_reaction_comment_share` FOREIGN KEY (`comment_id`) REFERENCES `comment_share` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reaction_comment_share`
--

LOCK TABLES `reaction_comment_share` WRITE;
/*!40000 ALTER TABLE `reaction_comment_share` DISABLE KEYS */;
/*!40000 ALTER TABLE `reaction_comment_share` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reaction_post`
--

DROP TABLE IF EXISTS `reaction_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reaction_post` (
  `account_id` int NOT NULL,
  `post_id` int NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`account_id`,`post_id`),
  KEY `fk1_reaction_post_idx` (`account_id`),
  KEY `fk2_reaction_post_idx` (`post_id`),
  CONSTRAINT `fk1_reaction_post` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk2_reaction_post` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reaction_post`
--

LOCK TABLES `reaction_post` WRITE;
/*!40000 ALTER TABLE `reaction_post` DISABLE KEYS */;
INSERT INTO `reaction_post` VALUES (1,4,'LIKE'),(1,5,'HAHA'),(1,11,'HAHA'),(1,14,'LIKE'),(1,16,'LIKE'),(1,17,'LIKE'),(1,21,'LIKE'),(1,22,'LIKE'),(1,23,'LIKE'),(1,25,'LOVE'),(2,4,'LIKE'),(2,5,'LOVE'),(2,14,'LIKE'),(3,4,'LIKE'),(3,7,'ANGRY'),(3,8,'HAHA'),(3,20,'LIKE'),(3,23,'LIKE'),(4,4,'NONE'),(4,16,'LIKE'),(4,20,'LOVE'),(4,22,'LIKE'),(4,26,'LIKE'),(5,4,'LIKE'),(5,6,'HAHA'),(5,13,'LOVE'),(5,14,'SAD'),(5,16,'LIKE'),(5,17,'NONE'),(5,19,'LIKE'),(5,20,'LOVE'),(5,23,'CARE'),(5,25,'SAD'),(5,26,'WOW'),(5,33,'LIKE');
/*!40000 ALTER TABLE `reaction_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reaction_share`
--

DROP TABLE IF EXISTS `reaction_share`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reaction_share` (
  `account_id` int NOT NULL,
  `share_id` int NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`account_id`,`share_id`),
  KEY `fk1_reaction_share_idx` (`account_id`),
  KEY `fk2_reaction_share_idx` (`share_id`),
  CONSTRAINT `fk1_reaction_share` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk2_reaction_share` FOREIGN KEY (`share_id`) REFERENCES `share` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reaction_share`
--

LOCK TABLES `reaction_share` WRITE;
/*!40000 ALTER TABLE `reaction_share` DISABLE KEYS */;
INSERT INTO `reaction_share` VALUES (1,4,'Love'),(2,4,'Like'),(3,4,'Care');
/*!40000 ALTER TABLE `reaction_share` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `share`
--

DROP TABLE IF EXISTS `share`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `share` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `account_id` int NOT NULL,
  `post_id` int NOT NULL,
  `create_time` datetime NOT NULL,
  `edit_time` datetime DEFAULT NULL,
  `view_mode` varchar(45) DEFAULT NULL,
  `reaction_quantity` int DEFAULT '0',
  `comment_quantity` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_share_account_idx` (`account_id`),
  KEY `fk_share_post_idx` (`post_id`),
  CONSTRAINT `fk_share_account` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `fk_share_post` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `share`
--

LOCK TABLES `share` WRITE;
/*!40000 ALTER TABLE `share` DISABLE KEYS */;
INSERT INTO `share` VALUES (4,'abc',3,11,'2024-05-18 00:01:58',NULL,'public',0,0);
/*!40000 ALTER TABLE `share` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-11  1:32:13
