-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: workbridgenode
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `details` text,
  `post_code` varchar(255) DEFAULT NULL,
  `police_station_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK18n7182vkx15g65wwkheypa8j` (`police_station_id`),
  CONSTRAINT `FK18n7182vkx15g65wwkheypa8j` FOREIGN KEY (`police_station_id`) REFERENCES `policestations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,'Sheikhpura','3720',469),(2,'basilla','1207',2),(3,'Uttara','1209',28);
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aiinterviewquestions`
--

DROP TABLE IF EXISTS `aiinterviewquestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aiinterviewquestions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `answer` text,
  `question` text,
  `score` int DEFAULT NULL,
  `session_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKk4wpwjdw77yj5ydokmeumqefy` (`session_id`),
  CONSTRAINT `FKk4wpwjdw77yj5ydokmeumqefy` FOREIGN KEY (`session_id`) REFERENCES `aiinterviewsessions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aiinterviewquestions`
--

LOCK TABLES `aiinterviewquestions` WRITE;
/*!40000 ALTER TABLE `aiinterviewquestions` DISABLE KEYS */;
INSERT INTO `aiinterviewquestions` VALUES (6,'I will remain calm,follow proper guidelines and company policy.','The job requires handling all types of greetings at the front desk. Can you describe a challenging situation where you had to interact with a difficult or frustrated individual, and how you managed to resolve the situation professionally?',2,3),(7,'To make pdf, presentations and keep records','You mentioned \'MS Office\' as a skill with 4 years of experience. How do you envision using your MS Office proficiency to maintain organized visitor logs, manage appointments, or handle other administrative tasks essential for an efficient front desk?',4,3),(8,'Teaching made me public speaker and patient','Your experience includes teaching. How do you believe the communication, organizational, and interpersonal skills you developed as a teacher would directly transfer to effectively greeting and assisting visitors as a front desk receptionist?',5,3),(9,'I was teacher .I had to interact with students, their guardians and also pricipal','The role of a receptionist often involves being the first point of contact and managing multiple inquiries simultaneously, including in-person visitors and phone calls. Describe a time when you had to prioritize and manage multiple tasks or communications efficiently.',3,3),(10,'I always think of job as a part of life and i am always ready to handle mys responsibilities.','First impressions are crucial for a front desk role. Can you share your approach to maintaining a professional and welcoming demeanor throughout the day, even during peak hours or unexpected busy periods?',2,3),(11,'guj','The job description emphasizes \'greeting from frontdesk\'. Can you describe your approach to creating a welcoming and professional first impression for all visitors and callers to Pran?',0,4),(12,'uhyio','As a receptionist, you are often the first point of contact. Can you share an example of a challenging situation you might encounter at the front desk and how you would effectively resolve it?',0,4),(13,'yg','Imagine a busy period with multiple incoming calls, walk-in visitors, and administrative tasks. How would you prioritize your responsibilities to ensure smooth operations and efficient service?',0,4),(14,'uiiuh','The additional requirements for this role state \'Must be smart\'. What does being a \'smart\' receptionist mean to you, and how would you demonstrate this quality in your daily interactions at Pran?',0,4),(15,'uyiyh','Given that your resume does not detail previous work experience, how do you envision transferring your skills and abilities to successfully fulfill the responsibilities of a receptionist, particularly in managing greetings and front desk operations?',0,4),(16,'i am a clean freak','The job description emphasizes the need for prior experience as a sweeper. While your resume does not detail specific work experience in this area, could you describe any previous roles or situations where you were responsible for tasks such as sweeping floors, cleaning toilets, and maintaining hygiene?',1,5),(17,'i am a clean freak','Can you elaborate on your approach to maintaining high hygiene standards, particularly when cleaning a public toilet, and what methods or products you would prioritize to ensure cleanliness and safety?',0,5),(18,'i am a clean freak','Punctuality is an essential requirement for this position. How do you ensure you are consistently on time for your work commitments, and what steps do you take if you anticipate any unexpected delays?',0,5);
/*!40000 ALTER TABLE `aiinterviewquestions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aiinterviewsessions`
--

DROP TABLE IF EXISTS `aiinterviewsessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aiinterviewsessions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `completed_at` datetime(6) DEFAULT NULL,
  `interview_completed` bit(1) DEFAULT NULL,
  `started_at` datetime(6) DEFAULT NULL,
  `total_score` int DEFAULT NULL,
  `application_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKl3d7n3xvqwqqqy2elvocgjuuv` (`application_id`),
  CONSTRAINT `FKcu5lwdlko01bd5ti2hbrsay6y` FOREIGN KEY (`application_id`) REFERENCES `jobapplications` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aiinterviewsessions`
--

LOCK TABLES `aiinterviewsessions` WRITE;
/*!40000 ALTER TABLE `aiinterviewsessions` DISABLE KEYS */;
INSERT INTO `aiinterviewsessions` VALUES (3,'2026-07-13 20:40:24.088729',_binary '','2026-07-13 20:37:15.302276',16,1),(4,'2026-07-29 15:39:25.470639',_binary '','2026-07-29 15:38:35.710562',0,2),(5,'2026-07-30 01:57:56.142144',_binary '','2026-07-30 01:57:15.582072',1,4);
/*!40000 ALTER TABLE `aiinterviewsessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aiinterviewsessions_ai_interview_questions`
--

DROP TABLE IF EXISTS `aiinterviewsessions_ai_interview_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aiinterviewsessions_ai_interview_questions` (
  `aiinterview_session_id` bigint NOT NULL,
  `ai_interview_questions_id` bigint NOT NULL,
  UNIQUE KEY `UK23p8ha4436m77wqvxsngm20c5` (`ai_interview_questions_id`),
  KEY `FKr3ys9umomfyv1w5iqtub8bg6f` (`aiinterview_session_id`),
  CONSTRAINT `FK2wlaxvlbjqo11gabudq8v7qco` FOREIGN KEY (`ai_interview_questions_id`) REFERENCES `aiinterviewquestions` (`id`),
  CONSTRAINT `FKr3ys9umomfyv1w5iqtub8bg6f` FOREIGN KEY (`aiinterview_session_id`) REFERENCES `aiinterviewsessions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aiinterviewsessions_ai_interview_questions`
--

LOCK TABLES `aiinterviewsessions_ai_interview_questions` WRITE;
/*!40000 ALTER TABLE `aiinterviewsessions_ai_interview_questions` DISABLE KEYS */;
INSERT INTO `aiinterviewsessions_ai_interview_questions` VALUES (3,6),(3,7),(3,8),(3,9),(3,10),(4,11),(4,12),(4,13),(4,14),(4,15),(5,16),(5,17),(5,18);
/*!40000 ALTER TABLE `aiinterviewsessions_ai_interview_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` text,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKt8o6pivur7nn124jehx7cygw5` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'A field related to Commucation technology and Information Management','Information Technology (IT)'),(2,'A field related to the soul of Computer that is software','Software Development'),(3,'A field related to statistics and data.Data is analyzed to find meaningful information','Data Science & Analytics'),(4,'A field where specialists deal with Cyber attack like maintaining firewalls,stopping hacking/cracking attempts','Cyber Security'),(6,'A field involving the creation and maintenance of websites and web applications.','Web Development'),(7,'A field dedicated to developing applications for Android, iOS, and other mobile platforms.','Mobile App Development'),(8,'A field focused on creating intelligent systems capable of learning and decision-making.','Artificial Intelligence'),(9,'A branch of AI that enables systems to learn from data and improve performance automatically.','Machine Learning'),(10,'A field involving the design, configuration, and maintenance of computer networks.','Networking'),(11,'A field focused on delivering computing services over the internet through cloud platforms.','Cloud Computing'),(12,'A field that combines software development and IT operations to improve deployment efficiency.','DevOps'),(13,'A field responsible for managing, securing, and optimizing databases.','Database Administration'),(14,'A field dedicated to ensuring software quality through testing and validation processes.','Quality Assurance'),(15,'A field focused on creating user-friendly and visually appealing digital experiences.','UI/UX Design'),(16,'A creative field involving visual communication through images, layouts, and branding.','Graphic Design'),(17,'A field that promotes products and services using digital channels and online platforms.','Digital Marketing'),(18,'A field responsible for planning, executing, and managing projects efficiently.','Project Management'),(19,'A field that identifies business needs and recommends technology-driven solutions.','Business Analysis'),(20,'A field focused on financial management, auditing, budgeting, and accounting operations.','Accounting & Finance'),(21,'A field responsible for recruitment, employee management, training, and workplace policies.','Human Resources');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories_jobs`
--

DROP TABLE IF EXISTS `categories_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories_jobs` (
  `category_id` bigint NOT NULL,
  `jobs_id` bigint NOT NULL,
  UNIQUE KEY `UK4ydc3y3oh19gohu2h2do6noap` (`jobs_id`),
  KEY `FK193p84r8fljteim0f8n78phkn` (`category_id`),
  CONSTRAINT `FK193p84r8fljteim0f8n78phkn` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `FKluvn9e1fy4b3h04taawp9y3da` FOREIGN KEY (`jobs_id`) REFERENCES `jobs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories_jobs`
--

LOCK TABLES `categories_jobs` WRITE;
/*!40000 ALTER TABLE `categories_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories_skills`
--

DROP TABLE IF EXISTS `categories_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories_skills` (
  `category_id` bigint NOT NULL,
  `skills_id` bigint NOT NULL,
  UNIQUE KEY `UKsrfe1uq9b9uqgqhvr8f7kf4x6` (`skills_id`),
  KEY `FK80ulwis5j0c8qrfbiw39m862n` (`category_id`),
  CONSTRAINT `FK80ulwis5j0c8qrfbiw39m862n` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `FKk9dih9l9mca1nql8x57611wmg` FOREIGN KEY (`skills_id`) REFERENCES `skills` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories_skills`
--

LOCK TABLES `categories_skills` WRITE;
/*!40000 ALTER TABLE `categories_skills` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companyprofiles`
--

DROP TABLE IF EXISTS `companyprofiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companyprofiles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `company_description` text,
  `company_email` varchar(255) DEFAULT NULL,
  `company_website` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `founded_year` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `industry` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `trade_license_number` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `location_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKhd30uyduqxqvylbc4fadswm4l` (`phone`),
  UNIQUE KEY `UKc2pca7dpqq8tbcw4ewkoheu9t` (`location_id`),
  UNIQUE KEY `UKcvm9sphq1bhqiw7lbkiq46gu9` (`user_id`),
  CONSTRAINT `FKej0d2fqn5iic46b7s6c7v7fij` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKfrjjd7o9svbrtp1c91pbcnq4f` FOREIGN KEY (`location_id`) REFERENCES `addresses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companyprofiles`
--

LOCK TABLES `companyprofiles` WRITE;
/*!40000 ALTER TABLE `companyprofiles` DISABLE KEYS */;
INSERT INTO `companyprofiles` VALUES (1,'sdcjhvjkch','pran@gmail.com','pran.com','2026-07-10 03:00:54.576888','1990','pran@gmail.com_fbf40241-7080-46ba-bdf7-a2cc561bd995.jpg','Food','Pran','01576909747','545654','2026-07-10 03:26:04.026169',3,3);
/*!40000 ALTER TABLE `companyprofiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companyprofiles_jobs`
--

DROP TABLE IF EXISTS `companyprofiles_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companyprofiles_jobs` (
  `company_profile_id` bigint NOT NULL,
  `jobs_id` bigint NOT NULL,
  UNIQUE KEY `UK30g3clan1qcavpue24y3unhd7` (`jobs_id`),
  KEY `FK7fbdbx34vd94681md7dbkn6g8` (`company_profile_id`),
  CONSTRAINT `FK7fbdbx34vd94681md7dbkn6g8` FOREIGN KEY (`company_profile_id`) REFERENCES `companyprofiles` (`id`),
  CONSTRAINT `FKgaw1ucy3i5j64kq6nrnkrl5xu` FOREIGN KEY (`jobs_id`) REFERENCES `jobs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companyprofiles_jobs`
--

LOCK TABLES `companyprofiles_jobs` WRITE;
/*!40000 ALTER TABLE `companyprofiles_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `companyprofiles_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `last_message_at` datetime(6) DEFAULT NULL,
  `status` enum('ACTIVE','CLOSED') DEFAULT NULL,
  `gig_order_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKac9gevbs6qtrrj09ppmva81l9` (`gig_order_id`),
  CONSTRAINT `FKa5vsa0rxluf2njk1ey90ekmr7` FOREIGN KEY (`gig_order_id`) REFERENCES `gigorders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
INSERT INTO `conversations` VALUES (1,'2026-07-17 23:15:53.645072','2026-07-18 23:48:18.015964','CLOSED',1),(2,'2026-07-20 17:06:00.433325','2026-07-20 17:06:00.433325','CLOSED',2),(5,'2026-07-29 16:54:36.585908','2026-08-01 16:21:32.304554','ACTIVE',5);
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK1pyiwrqimi3hnl3vtgsypj5r` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES (1,'bd','Bangladesh'),(2,'pk','Pakistan');
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries_addresses`
--

DROP TABLE IF EXISTS `countries_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries_addresses` (
  `country_id` bigint NOT NULL,
  `addresses_id` bigint NOT NULL,
  UNIQUE KEY `UKdx1p1wrf29wg5yxy72n4ehihh` (`addresses_id`),
  KEY `FKjqntyhjcjogl8ws6pxavh28us` (`country_id`),
  CONSTRAINT `FK3a5qg2q198uasu8vljlbfuwrj` FOREIGN KEY (`addresses_id`) REFERENCES `addresses` (`id`),
  CONSTRAINT `FKjqntyhjcjogl8ws6pxavh28us` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries_addresses`
--

LOCK TABLES `countries_addresses` WRITE;
/*!40000 ALTER TABLE `countries_addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `countries_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries_divisions`
--

DROP TABLE IF EXISTS `countries_divisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries_divisions` (
  `country_id` bigint NOT NULL,
  `divisions_id` bigint NOT NULL,
  UNIQUE KEY `UK5nukswjkbydjx1kl7jfhq08hq` (`divisions_id`),
  KEY `FK9aasn00rnkkb8017v049s0due` (`country_id`),
  CONSTRAINT `FK9aasn00rnkkb8017v049s0due` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`),
  CONSTRAINT `FKs9e06uol3ivsv0au83sejk72j` FOREIGN KEY (`divisions_id`) REFERENCES `divisions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries_divisions`
--

LOCK TABLES `countries_divisions` WRITE;
/*!40000 ALTER TABLE `countries_divisions` DISABLE KEYS */;
/*!40000 ALTER TABLE `countries_divisions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `districts`
--

DROP TABLE IF EXISTS `districts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `districts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `division_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKl374uao5cplc8w347pn93svoc` (`division_id`),
  CONSTRAINT `FKl374uao5cplc8w347pn93svoc` FOREIGN KEY (`division_id`) REFERENCES `divisions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `districts`
--

LOCK TABLES `districts` WRITE;
/*!40000 ALTER TABLE `districts` DISABLE KEYS */;
INSERT INTO `districts` VALUES (1,'Dhaka',1),(2,'Narayanganj',1),(3,'Kishoreganj',1),(4,'Tangail',1),(5,'Gazipur',1),(6,'Narsingdi',1),(7,'Munsiganj',1),(8,'Manikganj',1),(9,'Faridpur',1),(10,'Gopalganj',1),(11,'Madaripur',1),(12,'Shariyatpur',1),(13,'Rajbari',1),(14,'Barisal',2),(15,'Barguna',2),(16,'Bhola',2),(17,'Jhalokati',2),(18,'Patuakhali',2),(19,'Pirojpur',2),(20,'Khulna',3),(21,'Bagerhat',3),(22,'Chuadanga',3),(23,'Jashore',3),(24,'Jhenaidah',3),(25,'Kushtia',3),(26,'Magura',3),(27,'Meherpur',3),(28,'Narail',3),(29,'Satkhira',3),(30,'Bogura',4),(31,'Chapai Nawabganj',4),(32,'Joypurhat',4),(33,'Naogaon',4),(34,'Natore',4),(35,'Pabna',4),(36,'Rajshahi',4),(37,'Sirajganj',4),(38,'Dinajpur',5),(39,'Gaibandha',5),(40,'Kurigram',5),(41,'Lalmonirhat',5),(42,'Nilphamari',5),(43,'Panchagarh',5),(44,'Rangpur',5),(45,'Thakurgaon',5),(46,'Bandarban',6),(47,'Brahmanbaria',6),(48,'Chandpur',6),(49,'Chattogram',6),(50,'Cox\'s Bazar',6),(51,'Cumilla',6),(52,'Feni',6),(53,'Khagrachari',6),(54,'Lakshmipur',6),(55,'Noakhali',6),(56,'Rangamati',6),(57,'Jamalpur',7),(58,'Mymensingh',7),(59,'Netrokona',7),(60,'Sherpur',7),(61,'Habiganj',8),(62,'Moulvibazar',8),(63,'Sunamganj',8),(64,'Sylhet',8);
/*!40000 ALTER TABLE `districts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `districts_addresses`
--

DROP TABLE IF EXISTS `districts_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `districts_addresses` (
  `district_id` bigint NOT NULL,
  `addresses_id` bigint NOT NULL,
  UNIQUE KEY `UKcx7ldhbsrga7ajn1fq7si0w0a` (`addresses_id`),
  KEY `FK4g0keps2ma37uq8hx7t0pdnyw` (`district_id`),
  CONSTRAINT `FK4g0keps2ma37uq8hx7t0pdnyw` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`),
  CONSTRAINT `FKq77tcgcawjvc4sbtty9vqa0mr` FOREIGN KEY (`addresses_id`) REFERENCES `addresses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `districts_addresses`
--

LOCK TABLES `districts_addresses` WRITE;
/*!40000 ALTER TABLE `districts_addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `districts_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `districts_police_stations`
--

DROP TABLE IF EXISTS `districts_police_stations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `districts_police_stations` (
  `district_id` bigint NOT NULL,
  `police_stations_id` bigint NOT NULL,
  UNIQUE KEY `UKhl4cnljhj1hbwa8w9b3aid6bg` (`police_stations_id`),
  KEY `FK7uab56yen3nbetrssf4ksdehf` (`district_id`),
  CONSTRAINT `FK7uab56yen3nbetrssf4ksdehf` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`),
  CONSTRAINT `FKsu5rmkff40x3dlw716rwwrj35` FOREIGN KEY (`police_stations_id`) REFERENCES `policestations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `districts_police_stations`
--

LOCK TABLES `districts_police_stations` WRITE;
/*!40000 ALTER TABLE `districts_police_stations` DISABLE KEYS */;
/*!40000 ALTER TABLE `districts_police_stations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `divisions`
--

DROP TABLE IF EXISTS `divisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `divisions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `country_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2o4cg3xxx0ea0mapwhjr7racp` (`country_id`),
  CONSTRAINT `FK2o4cg3xxx0ea0mapwhjr7racp` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `divisions`
--

LOCK TABLES `divisions` WRITE;
/*!40000 ALTER TABLE `divisions` DISABLE KEYS */;
INSERT INTO `divisions` VALUES (1,'Dhaka',1),(2,'Barisal',1),(3,'Khulna',1),(4,'Rajshahi',1),(5,'Rangpur',1),(6,'Chattogram',1),(7,'Mymensingh',1),(8,'Sylhet',1);
/*!40000 ALTER TABLE `divisions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `divisions_addresses`
--

DROP TABLE IF EXISTS `divisions_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `divisions_addresses` (
  `division_id` bigint NOT NULL,
  `addresses_id` bigint NOT NULL,
  UNIQUE KEY `UKmq1n8gfnmv8l02yyrpsjvw1pg` (`addresses_id`),
  KEY `FKq75dmx98nwdxkpn6urokcs7wm` (`division_id`),
  CONSTRAINT `FKodnt62js6egogxglayo76e1ag` FOREIGN KEY (`addresses_id`) REFERENCES `addresses` (`id`),
  CONSTRAINT `FKq75dmx98nwdxkpn6urokcs7wm` FOREIGN KEY (`division_id`) REFERENCES `divisions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `divisions_addresses`
--

LOCK TABLES `divisions_addresses` WRITE;
/*!40000 ALTER TABLE `divisions_addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `divisions_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `divisions_districts`
--

DROP TABLE IF EXISTS `divisions_districts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `divisions_districts` (
  `division_id` bigint NOT NULL,
  `districts_id` bigint NOT NULL,
  UNIQUE KEY `UK72w30pdfncy8i34empydhr1e5` (`districts_id`),
  KEY `FK7puet4q9l4kb8p1y7w4fx2f1x` (`division_id`),
  CONSTRAINT `FK7puet4q9l4kb8p1y7w4fx2f1x` FOREIGN KEY (`division_id`) REFERENCES `divisions` (`id`),
  CONSTRAINT `FKewkverogrj76047h0au5pdld5` FOREIGN KEY (`districts_id`) REFERENCES `districts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `divisions_districts`
--

LOCK TABLES `divisions_districts` WRITE;
/*!40000 ALTER TABLE `divisions_districts` DISABLE KEYS */;
/*!40000 ALTER TABLE `divisions_districts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `educations`
--

DROP TABLE IF EXISTS `educations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `board` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `currently_studying` bit(1) DEFAULT NULL,
  `education_level` enum('BACHELOR','DIPLOMA','HSC','MASTERS','MPHIL','PGD','PHD','SSC') DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `field_of_study` varchar(255) DEFAULT NULL,
  `grade_or_division` varchar(255) DEFAULT NULL,
  `institution` varchar(255) DEFAULT NULL,
  `out_of` double DEFAULT NULL,
  `result` double DEFAULT NULL,
  `result_type` enum('CGPA','DIVISION','GPA','GRADE','PERCENTAGE') DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `user_profile_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKaluf32aq3cl73a0mr5jnp2j8y` (`user_profile_id`),
  CONSTRAINT `FKaluf32aq3cl73a0mr5jnp2j8y` FOREIGN KEY (`user_profile_id`) REFERENCES `userprofiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `educations`
--

LOCK TABLES `educations` WRITE;
/*!40000 ALTER TABLE `educations` DISABLE KEYS */;
INSERT INTO `educations` VALUES (1,'Dhaka Board','2026-07-09 15:45:07.968842',_binary '\0','SSC','2017-03-09','Science',NULL,'Dhanmondi Govt. Boys\' High School',5,5,'GPA','2015-01-01',1),(2,NULL,'2026-08-01 00:50:43.115345',_binary '','MASTERS',NULL,'Statistics',NULL,'Dhaka College',NULL,NULL,'CGPA',NULL,2),(3,NULL,'2026-08-01 00:50:43.124862',_binary '\0','BACHELOR','2024-12-31','Statistics',NULL,'Dhaka College',4,3.05,'CGPA',NULL,2),(4,'Dhaka Board','2026-08-01 00:50:43.135851',_binary '\0','HSC','2019-12-31','Science',NULL,'Mohammadpur Govt. College',5,4.08,'GPA',NULL,2),(5,'Dhaka Board','2026-08-01 00:50:43.141851',_binary '\0','SSC','2017-12-31','Science',NULL,'Dhanmondi Govt. Boys’ High School',5,5,'GPA',NULL,2),(6,'Dhaka','2026-08-02 03:39:57.116514',_binary '\0','HSC','2019-08-24','Science',NULL,'MGC',5,4.08,'GPA','2017-07-14',1),(13,NULL,'2026-08-03 23:35:28.450732',_binary '\0','BACHELOR','2020-12-31','Statistics',NULL,'Dhaka College',NULL,2.99,'CGPA','2017-01-01',12),(14,NULL,'2026-08-03 23:35:28.456755',_binary '\0','HSC','2016-12-31','Science',NULL,'Major General Mahmudul Hasan Adarsha College',NULL,5,'GPA','2016-01-01',12),(15,NULL,'2026-08-03 23:35:28.463064',_binary '\0','SSC','2014-12-31','Science',NULL,'Bindu Basini Govt. Boys’ High School',NULL,5,'GPA','2014-01-01',12),(16,'Dhaka Board','2026-08-05 04:15:39.390919',_binary '\0','HSC','2025-01-01','Business Studies',NULL,'Dhaka Udyan Govt. College',5,3.5,'GPA',NULL,13),(17,'Dhaka Board','2026-08-05 04:15:39.429463',_binary '\0','SSC','2022-01-01','Business Studies',NULL,'Mohammadpur Commercial Institute Govt. High School',5,3.94,'GPA',NULL,13);
/*!40000 ALTER TABLE `educations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiences`
--

DROP TABLE IF EXISTS `experiences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experiences` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `achievements` text,
  `company_name` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `currently_working` bit(1) DEFAULT NULL,
  `employment_type` enum('Contract','Freelance','Full_Time','Internship','Part_Time') DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `responsibilities` text,
  `start_date` date DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_profile_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjxl6gima9sg3h4dr3em4o56a2` (`user_profile_id`),
  CONSTRAINT `FKjxl6gima9sg3h4dr3em4o56a2` FOREIGN KEY (`user_profile_id`) REFERENCES `userprofiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiences`
--

LOCK TABLES `experiences` WRITE;
/*!40000 ALTER TABLE `experiences` DISABLE KEYS */;
INSERT INTO `experiences` VALUES (1,'No one failed.Many got 1st division','MAAK Coaching','2026-07-09 16:12:03.165648',_binary '\0','Part_Time','2025-01-09','Teacher','Teach Math subject there.Also taught other science subject.','2022-02-09','2026-08-02 15:48:12.964741',1);
/*!40000 ALTER TABLE `experiences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `extracurriculars`
--

DROP TABLE IF EXISTS `extracurriculars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `extracurriculars` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` text,
  `organization` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_profile_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKa4nw8aw0umjgp41m5exk8rhpq` (`user_profile_id`),
  CONSTRAINT `FKa4nw8aw0umjgp41m5exk8rhpq` FOREIGN KEY (`user_profile_id`) REFERENCES `userprofiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extracurriculars`
--

LOCK TABLES `extracurriculars` WRITE;
/*!40000 ALTER TABLE `extracurriculars` DISABLE KEYS */;
INSERT INTO `extracurriculars` VALUES (1,'Studied and did club activities and test','Dhaka College Data analytics Club','Club Member','Data Science',1),(2,'Testing app','Test','Tester','Test',1),(9,NULL,'Dhaka College Data Analy�cs Club (DCDAC)','Founding Member','Founding Member',12);
/*!40000 ALTER TABLE `extracurriculars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gigorders`
--

DROP TABLE IF EXISTS `gigorders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gigorders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `agreed_price` decimal(38,2) DEFAULT NULL,
  `buyer_accepted_at` datetime(6) DEFAULT NULL,
  `buyer_cancelled_at` datetime(6) DEFAULT NULL,
  `buyer_rejected_at` datetime(6) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `delivered_at` datetime(6) DEFAULT NULL,
  `delivery_file_url` varchar(255) DEFAULT NULL,
  `delivery_message` text,
  `expected_delivery_at` datetime(6) DEFAULT NULL,
  `final_price` decimal(38,2) DEFAULT NULL,
  `payment_locked` bit(1) DEFAULT NULL,
  `payment_released_at` datetime(6) DEFAULT NULL,
  `quote_accepted_at` datetime(6) DEFAULT NULL,
  `quoted_at` datetime(6) DEFAULT NULL,
  `quoted_price` decimal(38,2) DEFAULT NULL,
  `refunded_at` datetime(6) DEFAULT NULL,
  `seller_cancelled_at` datetime(6) DEFAULT NULL,
  `seller_dispute_deadline` datetime(6) DEFAULT NULL,
  `seller_dispute_opened_at` datetime(6) DEFAULT NULL,
  `status` enum('BUYER_ACCEPTED','BUYER_CANCELLED','BUYER_REJECTED','DELIVERED','ORDER_PLACED','PAYMENT_RELEASED','QUOTED','QUOTE_ACCEPTED','QUOTE_REJECTED','REFUNDED','SELLER_CANCELLED','SELLER_DISPUTED') DEFAULT NULL,
  `buyer_id` bigint DEFAULT NULL,
  `gig_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsrrc5b0lxeh5y4hgxy6rbusrb` (`buyer_id`),
  KEY `FK4j9y0lhjpm50py5dfbf59xvpb` (`gig_id`),
  CONSTRAINT `FK4j9y0lhjpm50py5dfbf59xvpb` FOREIGN KEY (`gig_id`) REFERENCES `gigs` (`id`),
  CONSTRAINT `FKsrrc5b0lxeh5y4hgxy6rbusrb` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gigorders`
--

LOCK TABLES `gigorders` WRITE;
/*!40000 ALTER TABLE `gigorders` DISABLE KEYS */;
INSERT INTO `gigorders` VALUES (1,400.00,NULL,NULL,'2026-07-19 05:20:07.063196','2026-07-17 23:15:53.588059','2026-07-19 05:13:12.658447','mahabub.sheikh2001@gmail.compran@gmail.com_c30cb882-0d2f-4a16-8566-d042da510ad3.png','This is order','2026-07-26 05:12:44.616657',380.00,_binary '\0','2026-07-19 05:44:06.683812','2026-07-19 05:12:44.616657','2026-07-19 01:26:03.790983',400.00,NULL,NULL,'2026-07-26 05:20:07.063196','2026-07-19 05:20:26.078559','PAYMENT_RELEASED',3,1),(2,500.00,'2026-07-20 17:07:57.979933',NULL,NULL,'2026-07-20 17:06:00.401246','2026-07-20 17:07:46.724847','mahabub.sheikh2001@gmail.compran@gmail.com_17236997-3b7b-4eee-b94c-41f9104c2dd2.png','test transactiom','2026-07-27 17:07:19.823419',475.00,_binary '\0','2026-07-20 17:07:57.993934','2026-07-20 17:07:19.823419','2026-07-20 17:07:07.657082',500.00,NULL,NULL,NULL,NULL,'BUYER_ACCEPTED',3,1),(5,0.00,NULL,NULL,NULL,'2026-07-29 16:54:36.564980',NULL,NULL,NULL,NULL,0.00,_binary '\0',NULL,NULL,NULL,0.00,NULL,NULL,NULL,NULL,'ORDER_PLACED',3,1);
/*!40000 ALTER TABLE `gigorders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gigs`
--

DROP TABLE IF EXISTS `gigs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gigs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `delivery_days` int DEFAULT NULL,
  `description` text,
  `gig_image` varchar(255) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `revisions` int DEFAULT NULL,
  `short_description` varchar(500) DEFAULT NULL,
  `starting_price` decimal(38,2) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `user_profile_id` bigint DEFAULT NULL,
  `average_rating` double DEFAULT NULL,
  `completed_orders` int DEFAULT NULL,
  `total_reviews` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKen9jjje6w3buu7vvdah32ajfo` (`category_id`),
  KEY `FK10jwqqkfijy7eaa4ydo07tswr` (`user_profile_id`),
  CONSTRAINT `FK10jwqqkfijy7eaa4ydo07tswr` FOREIGN KEY (`user_profile_id`) REFERENCES `userprofiles` (`id`),
  CONSTRAINT `FKen9jjje6w3buu7vvdah32ajfo` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gigs`
--

LOCK TABLES `gigs` WRITE;
/*!40000 ALTER TABLE `gigs` DISABLE KEYS */;
INSERT INTO `gigs` VALUES (1,'2026-07-16 01:01:10.597167',7,'I can make software.Very Good Very nice.','mahabub.sheikh2001@gmail.com_26f69f2c-8923-4393-947b-02fcc15e84d8.png',_binary '',3,'I can make software.',5000.00,'Software Design','2026-07-16 01:01:10.597167',2,1,5,2,1);
/*!40000 ALTER TABLE `gigs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobapplications`
--

DROP TABLE IF EXISTS `jobapplications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobapplications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ai_completed_at` datetime(6) DEFAULT NULL,
  `ai_deadline_date` datetime(6) DEFAULT NULL,
  `ai_final_score` int DEFAULT NULL,
  `ai_interview_completed` bit(1) DEFAULT NULL,
  `ai_interview_score` int DEFAULT NULL,
  `ai_match_feedback` varchar(3000) DEFAULT NULL,
  `ai_match_score` int DEFAULT NULL,
  `ai_shortlisted` bit(1) DEFAULT NULL,
  `applied_at` datetime(6) DEFAULT NULL,
  `company_notes` text,
  `status` enum('AI_COMPLETED','AI_PENDING','APPLIED','AUTOMATIC_QUALIFIED','COMPANY_SHORTLISTED','HIRED','REJECTED','WITHDRAWN') DEFAULT NULL,
  `job_id` bigint DEFAULT NULL,
  `user_profile_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdqrmgnilwy5sbydqo5q5fe4cc` (`job_id`),
  KEY `FKi87xkwk1o89wu178c5aji98lu` (`user_profile_id`),
  CONSTRAINT `FKdqrmgnilwy5sbydqo5q5fe4cc` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`),
  CONSTRAINT `FKi87xkwk1o89wu178c5aji98lu` FOREIGN KEY (`user_profile_id`) REFERENCES `userprofiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobapplications`
--

LOCK TABLES `jobapplications` WRITE;
/*!40000 ALTER TABLE `jobapplications` DISABLE KEYS */;
INSERT INTO `jobapplications` VALUES (1,'2026-07-13 20:40:24.155670','2026-07-17 02:22:57.227989',15,_binary '',16,'The candidate\'s gender (Male) does not align with the \'Receptionist (Female)\' job title. Educationally, the candidate holds an SSC, which is below the required HSC Graduate level. While the candidate has 3 years of experience, it is in teaching and not directly relevant to front desk or receptionist duties. The candidate\'s expected salary of 30,000 significantly exceeds the job\'s offered range of 15,000-20,000. Furthermore, the candidate\'s overall profile and career aspirations (e.g., Software Engineer) appear misaligned with a receptionist position. However, the candidate does possess relevant language skills and MS Office proficiency.',15,_binary '','2026-07-11 18:26:39.780338','Nothing changed.I am testing.','HIRED',1,1),(2,'2026-07-29 15:39:25.512997','2026-08-03 01:18:15.718457',0,_binary '',0,'The resume is incomplete, lacking crucial information such as educational background and work experience which are requirements for the role. The job specifically states \'Receptionist (Female)\', which conflicts with the name provided on the resume, strongly indicating a gender mismatch. No skills or professional summary are provided to assess suitability for front desk duties or general \'smartness\' as required.',0,_binary '\0','2026-07-29 01:18:10.440584','','COMPANY_SHORTLISTED',1,2),(3,NULL,NULL,NULL,_binary '\0',NULL,'The candidate\'s experience as a teacher and aspirations in software engineering/data science do not align with the \'Sweeper\' role, which explicitly requires prior sweeping experience. Additionally, the candidate\'s expected salary is significantly higher than the job\'s offering, indicating a fundamental mismatch in career trajectory and compensation expectations.',2,_binary '\0','2026-07-30 00:23:37.149552','','WITHDRAWN',2,1),(4,'2026-07-30 01:57:56.158067',NULL,0,_binary '',1,'The resume lacks any relevant experience or skills information to match the job requirements of a Sweeper. The job description explicitly mentions duties like \'Sweep floor, clean toilet, maintain hygiene\' and specifies \'Has to be a sweeper before\' in experience requirements. Without any details on the candidate\'s past roles or capabilities, a match cannot be determined.',0,_binary '\0','2026-07-30 01:38:06.403385','','AUTOMATIC_QUALIFIED',2,2),(5,NULL,'2026-08-15 16:20:46.074509',NULL,_binary '\0',NULL,'The candidate meets the educational requirements (HSC) and aligns with the preferred employment type (Full-Time) and work location (Onsite in Dhaka/Mohammadpur). A significant positive is the inclusion of a Springboot project in the portfolio, demonstrating practical experience in backend development, which is relevant to creating REST APIs and maintaining website backends as outlined in the job description. However, there are notable mismatches. The candidate\'s expected salary of 30,000 BDT is substantially higher than the job\'s maximum offer of 20,000 BDT. Additionally, while the job requires \'extensive knowledge in Java\', the candidate lists \'BEGINNER\' proficiency in Java with only 1 year of skill experience and lacks formal professional experience as a Java developer, with their primary work experience being unrelated to software development. These factors present significant concerns for the required skill level and compensation.',60,_binary '\0','2026-08-08 16:20:25.615141','','AI_PENDING',3,1);
/*!40000 ALTER TABLE `jobapplications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `additional_requirements` text,
  `ai_cv_screening_enabled` bit(1) DEFAULT NULL,
  `ai_deadline_days` int DEFAULT NULL,
  `ai_interview_enabled` bit(1) DEFAULT NULL,
  `ai_match_threshold` int DEFAULT NULL,
  `ai_question_count` int DEFAULT NULL,
  `ai_screening_enabled` bit(1) DEFAULT NULL,
  `ai_shortlist_count` int DEFAULT NULL,
  `application_deadline` date DEFAULT NULL,
  `benefits` text,
  `created_at` datetime(6) DEFAULT NULL,
  `educational_requirements` text,
  `employment_type` enum('Contract','Freelance','Full_Time','Internship','Part_Time') DEFAULT NULL,
  `experience_requirements` text,
  `is_active` bit(1) DEFAULT NULL,
  `is_negotiable` bit(1) DEFAULT NULL,
  `job_description` text,
  `job_responsibilities` text,
  `max_experience` int DEFAULT NULL,
  `min_experience` int DEFAULT NULL,
  `salary_max` decimal(38,2) DEFAULT NULL,
  `salary_min` decimal(38,2) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `vacancy` int DEFAULT NULL,
  `work_place_type` enum('HYBRID','ONSITE','REMOTE') DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `company_profile_id` bigint DEFAULT NULL,
  `police_station_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlunrv9ems34544ff26wyfa89v` (`category_id`),
  KEY `FKru53xnk75b0itvdtts85swca3` (`company_profile_id`),
  KEY `FK121s3inhfiexk9y1gt3g6hl5f` (`police_station_id`),
  CONSTRAINT `FK121s3inhfiexk9y1gt3g6hl5f` FOREIGN KEY (`police_station_id`) REFERENCES `policestations` (`id`),
  CONSTRAINT `FKlunrv9ems34544ff26wyfa89v` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `FKru53xnk75b0itvdtts85swca3` FOREIGN KEY (`company_profile_id`) REFERENCES `companyprofiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (1,'Must be smart',_binary '',5,_binary '',0,5,_binary '',50,'2026-07-23','Festival bonus','2026-07-10 23:28:58.506168','HSC Graduate','Full_Time','nothing',_binary '\0',_binary '','Do all types greeting from frontdesk','Do greetings',3,1,20000.00,15000.00,'Receptionist (Female)','2026-07-29 01:18:15.729454',10,'ONSITE',21,1,2),(2,'Must be punctual',_binary '',7,_binary '',0,3,_binary '',10,'2026-07-31','Good salary','2026-07-15 16:04:52.931864','None','Full_Time','Has to be a sweeper before',_binary '',_binary '','Sweep floor,clean toilet, maintain hiegeine','Sweep floor,clean toilet, maintain hiegeine',1,0,16000.00,15999.00,'Sweeper','2026-07-15 16:04:52.931864',1,'ONSITE',21,1,6),(3,'Be Punctual',_binary '',7,_binary '',5,5,_binary '',30,'2026-09-30','Holiday bonus,','2026-08-08 16:05:39.186347','HSC','Full_Time','Has to have extensive knowledge in Java Programming language',_binary '',_binary '\0','Create Rest API','Maintain Website backend',3,0,20000.00,15000.00,'Junior Java Developer','2026-08-08 16:05:39.186347',10,'ONSITE',2,1,2);
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `languages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKf6axmaokhmrbmm746866v0uyu` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES (4,'Arabic'),(15,'Aramic'),(1,'Bangla'),(2,'English'),(13,'French'),(8,'German'),(5,'Hindi'),(7,'Japanese'),(10,'Korean'),(6,'Mandarin'),(9,'Russian'),(12,'Spanish'),(14,'Tamil'),(3,'Urdu');
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages_user_languages`
--

DROP TABLE IF EXISTS `languages_user_languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `languages_user_languages` (
  `language_id` bigint NOT NULL,
  `user_languages_id` bigint NOT NULL,
  UNIQUE KEY `UK562ufxgaayikqeqx5m8flon95` (`user_languages_id`),
  KEY `FKe0hiooebgeee46yyw1as4dpca` (`language_id`),
  CONSTRAINT `FK5yer6ao3pk8rbukvkvm4vev0q` FOREIGN KEY (`user_languages_id`) REFERENCES `userlanguages` (`id`),
  CONSTRAINT `FKe0hiooebgeee46yyw1as4dpca` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages_user_languages`
--

LOCK TABLES `languages_user_languages` WRITE;
/*!40000 ALTER TABLE `languages_user_languages` DISABLE KEYS */;
/*!40000 ALTER TABLE `languages_user_languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `attachment` varchar(255) DEFAULT NULL,
  `is_read` bit(1) DEFAULT NULL,
  `message_text` text,
  `sent_at` datetime(6) DEFAULT NULL,
  `conversation_id` bigint DEFAULT NULL,
  `sender_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKt492th6wsovh1nush5yl5jj8e` (`conversation_id`),
  KEY `FK4ui4nnwntodh6wjvck53dbk9m` (`sender_id`),
  CONSTRAINT `FK4ui4nnwntodh6wjvck53dbk9m` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKt492th6wsovh1nush5yl5jj8e` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,NULL,_binary '','hello','2026-07-18 22:30:15.282336',1,2),(2,'mahabub.sheikh2001@gmail.com_4e5826ea-4175-4cf8-843a-57c063ca34bb.png',_binary '','','2026-07-18 22:54:39.919872',1,2),(3,'mahabub.sheikh2001@gmail.com_0ae7fc27-4407-48ff-87d0-2875e19b880a.pdf',_binary '','','2026-07-18 22:59:51.087790',1,2),(4,NULL,_binary '','hello too','2026-07-18 23:01:02.272668',1,3),(5,NULL,_binary '','i am happy','2026-07-18 23:05:25.807361',1,2),(6,NULL,_binary '','i am looking for you','2026-07-18 23:48:18.016942',1,2),(7,NULL,_binary '','hello','2026-07-29 16:54:47.454616',5,3),(8,NULL,_binary '\0','hgj','2026-08-01 16:21:32.307549',5,2);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `is_read` bit(1) DEFAULT NULL,
  `message` text,
  `reference_id` bigint DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` enum('ADMIN_MESSAGE','DEPOSIT_SUCCESS','GIG_APPLICATION','GIG_COMPLETED','GIG_ORDER','JOB_APPLIED','JOB_HIRED','JOB_REJECTED','JOB_SHORTLISTED','SYSTEM','WITHDRAW_APPROVED','WITHDRAW_REJECTED') DEFAULT NULL,
  `receiver_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9kxl0whvhifo6gw4tjq36v53k` (`receiver_id`),
  CONSTRAINT `FK9kxl0whvhifo6gw4tjq36v53k` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,'2026-07-11 18:26:39.864025',_binary '','Mahbub R Rahman applied for your job.',1,'New Job Application','JOB_APPLIED',3),(2,'2026-07-13 04:09:19.560036',_binary '','Your application has been shortlisted.',1,'Application Shortlisted','JOB_SHORTLISTED',2),(3,'2026-07-13 04:09:47.828673',_binary '','Your application has been Rejected.',1,'Application Rejeced','JOB_REJECTED',2),(4,'2026-07-13 04:09:52.343475',_binary '','Your application has been Accepted.',1,'Application Hired','JOB_HIRED',2),(5,'2026-07-13 20:42:49.450363',_binary '','Your application has been shortlisted.',1,'Application Shortlisted','JOB_SHORTLISTED',2),(6,'2026-07-13 21:08:48.711985',_binary '','Your application has been Accepted.',1,'Application Hired','JOB_HIRED',2),(7,'2026-07-17 23:15:53.650087',_binary '','Pran ordered your gig.',1,'New Gig Order','GIG_ORDER',2),(8,'2026-07-19 05:44:06.802650',_binary '','Admin solved the dispute and marked completed',1,'Gig marked completed','GIG_COMPLETED',2),(9,'2026-07-20 01:47:02.802938',_binary '','৳500.00 has been added to your wallet.',6,'Deposit Successful','DEPOSIT_SUCCESS',2),(10,'2026-07-20 02:19:05.983105',_binary '','৳1000.00 has been added to your wallet.',7,'Deposit Successful','DEPOSIT_SUCCESS',2),(11,'2026-07-20 03:19:24.303545',_binary '','Your withdrawal request has been approved.',1,'Withdrawal Approved','WITHDRAW_APPROVED',2),(12,'2026-07-20 17:06:00.436320',_binary '','Pran ordered your gig.',2,'New Gig Order','GIG_ORDER',2),(13,'2026-07-20 17:07:58.001934',_binary '','Pran is satisfied and marked completed',2,'Gig marked completed','GIG_COMPLETED',2),(14,'2026-07-28 18:09:37.624096',_binary '','Your withdrawal request has been approved.',2,'Withdrawal Approved','WITHDRAW_APPROVED',2),(15,'2026-07-29 01:18:15.721472',_binary '','MD MAHBUBUR RAHMAN SHEIKH applied for your job.',2,'New Job Application','JOB_APPLIED',3),(16,'2026-07-29 15:40:13.198946',_binary '','Your application has been shortlisted.',2,'Application Shortlisted','JOB_SHORTLISTED',4),(18,'2026-07-29 15:42:43.816264',_binary '','৳500.00 has been added to your wallet.',8,'Deposit Successful','DEPOSIT_SUCCESS',3),(20,'2026-07-29 16:54:36.587908',_binary '','Pran ordered your gig.',5,'New Gig Order','GIG_ORDER',2),(21,'2026-07-30 00:23:44.070202',_binary '','Mahbub R Rahman applied for your job.',3,'New Job Application','JOB_APPLIED',3),(22,'2026-07-30 01:38:11.888504',_binary '','MD MAHBUBUR RAHMAN SHEIKH applied for your job.',4,'New Job Application','JOB_APPLIED',3),(23,'2026-08-08 16:20:46.077510',_binary '\0','Mahbub R Rahman applied for your job.',5,'New Job Application','JOB_APPLIED',3);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` decimal(38,2) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `failure_reason` text,
  `gateway` varchar(255) DEFAULT NULL,
  `gateway_transaction_id` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `payment_status` enum('CANCELLED','FAILED','PENDING','SUCCESS') DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `validation_id` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKj94hgy9v5fw1munb90tar2eje` (`user_id`),
  CONSTRAINT `FKj94hgy9v5fw1munb90tar2eje` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,500.00,'2026-07-20 00:47:40.754883',NULL,'SSLCommerz','DEP-1784486860726mahab',NULL,'PENDING','2026-07-20 00:47:40.754883',NULL,2),(2,400.00,'2026-07-20 01:01:03.964183',NULL,'SSLCommerz','DEP-1784487663964mahab',NULL,'PENDING','2026-07-20 01:01:03.964183',NULL,2),(3,700.00,'2026-07-20 01:07:57.204037',NULL,'SSLCommerz','DEP-1784488077200mahab',NULL,'PENDING','2026-07-20 01:07:57.204037',NULL,2),(4,7003.00,'2026-07-20 01:15:00.611667',NULL,'SSLCommerz','DEP-1784488500593mahab',NULL,'PENDING','2026-07-20 01:15:00.611667',NULL,2),(5,500.00,'2026-07-20 01:24:54.627787',NULL,'SSLCommerz','DEP-1784489094608mahab',NULL,'PENDING','2026-07-20 01:24:54.627787',NULL,2),(6,500.00,'2026-07-20 01:46:45.370909',NULL,'SSLCommerz','DEP-1784490405352mahab','BKASH-BKash','SUCCESS','2026-07-20 01:47:02.814264','26072014654gVtFYLnpxz0oWZj',2),(7,1000.00,'2026-07-20 02:18:50.715485',NULL,'SSLCommerz','DEP-1784492330713mahab','BKASH-BKash','SUCCESS','2026-07-20 02:19:05.989102','26072021857UxhQ10sJlhxslzw',2),(8,500.00,'2026-07-29 15:42:28.289492',NULL,'SSLCommerz','DEP-1785318148288pran@','BKASH-BKash','SUCCESS','2026-07-29 15:42:43.818290','260729154247QQm7vW92m4VMGHg',3);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policestations`
--

DROP TABLE IF EXISTS `policestations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `policestations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `district_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKa8qg39gnjde9t8dc8m9a4qbsb` (`district_id`),
  CONSTRAINT `FKa8qg39gnjde9t8dc8m9a4qbsb` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=587 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policestations`
--

LOCK TABLES `policestations` WRITE;
/*!40000 ALTER TABLE `policestations` DISABLE KEYS */;
INSERT INTO `policestations` VALUES (1,'Dhanmondi',1),(2,'Mohammadpur',1),(3,'Hazaribagh',1),(4,'Lalbagh',1),(5,'Kotwali',1),(6,'Chawkbazar',1),(7,'Sutrapur',1),(8,'Wari',1),(9,'Gendaria',1),(10,'Kadamtali',1),(11,'Demra',1),(12,'Jatrabari',1),(13,'Shyampur',1),(14,'Motijheel',1),(15,'Paltan',1),(16,'Ramna',1),(17,'Shahbag',1),(18,'New Market',1),(19,'Tejgaon',1),(20,'Tejgaon Industrial Area',1),(21,'Hatirjheel',1),(22,'Rampura',1),(23,'Badda',1),(24,'Khilgaon',1),(25,'Sabujbagh',1),(26,'Mugda',1),(27,'Bangshal',1),(28,'Uttara',1),(29,'Uttara West',1),(30,'Uttara East',1),(31,'Turag',1),(32,'Dakshinkhan',1),(33,'Uttarkhan',1),(34,'Khilkhet',1),(35,'Airport',1),(36,'Cantonment',1),(37,'Pallabi',1),(38,'Mirpur',1),(39,'Shah Ali',1),(40,'Rupnagar',1),(41,'Adabor',1),(42,'Sher-e-Bangla Nagar',1),(43,'Kalabagan',1),(44,'Gulshan',1),(45,'Banani',1),(46,'Bhatara',1),(47,'Vatara',1),(48,'Keraniganj',1),(49,'Nawabganj',1),(50,'Dohar',1),(51,'Savar',1),(52,'Ashulia',1),(53,'Birulia',1),(54,'Narayanganj Sadar',2),(55,'Fatullah',2),(56,'Siddhirganj',2),(57,'Bandar',2),(58,'Rupganj',2),(59,'Araihazar',2),(60,'Sonargaon',2),(61,'Kishoreganj Sadar',3),(62,'Hossainpur',3),(63,'Pakundia',3),(64,'Karimganj',3),(65,'Tarail',3),(66,'Katiadi',3),(67,'Kuliarchar',3),(68,'Bajitpur',3),(69,'Mithamain',3),(70,'Austagram',3),(71,'Itna',3),(72,'Nikli',3),(73,'Bhairab',3),(74,'Tangail Sadar',4),(75,'Basail',4),(76,'Bhuapur',4),(77,'Delduar',4),(78,'Ghatail',4),(79,'Gopalpur',4),(80,'Kalihati',4),(81,'Madhupur',4),(82,'Mirzapur',4),(83,'Nagarpur',4),(84,'Sakhipur',4),(85,'Dhanbari',4),(86,'Gazipur Sadar',5),(87,'Tongi',5),(88,'Joydebpur',5),(89,'Kaliakair',5),(90,'Kapasia',5),(91,'Sreepur',5),(92,'Kaliganj',5),(93,'Narsingdi Sadar',6),(94,'Belabo',6),(95,'Monohardi',6),(96,'Palash',6),(97,'Raipura',6),(98,'Shibpur',6),(99,'Munshiganj Sadar',7),(100,'Gazaria',7),(101,'Louhajang',7),(102,'Sirajdikhan',7),(103,'Sreenagar',7),(104,'Tongibari',7),(105,'Manikganj Sadar',8),(106,'Daulatpur',8),(107,'Ghior',8),(108,'Harirampur',8),(109,'Saturia',8),(110,'Shivalaya',8),(111,'Singair',8),(112,'Faridpur Sadar',9),(113,'Alfadanga',9),(114,'Bhanga',9),(115,'Boalmari',9),(116,'Charbhadrasan',9),(117,'Madhukhali',9),(118,'Nagarkanda',9),(119,'Sadarpur',9),(120,'Saltha',9),(121,'Gopalganj Sadar',10),(122,'Kashiani',10),(123,'Kotalipara',10),(124,'Muksudpur',10),(125,'Tungipara',10),(126,'Madaripur Sadar',11),(127,'Kalkini',11),(128,'Rajoir',11),(129,'Shibchar',11),(130,'Shariyatpur Sadar',12),(131,'Bhedarganj',12),(132,'Damudya',12),(133,'Gosairhat',12),(134,'Naria',12),(135,'Zanjira',12),(136,'Rajbari Sadar',13),(137,'Baliakandi',13),(138,'Goalandaghat',13),(139,'Pangsha',13),(140,'Kalukhali',13),(141,'Barisal Sadar',14),(142,'Agailjhara',14),(143,'Babuganj',14),(144,'Bakerganj',14),(145,'Banaripara',14),(146,'Gaurnadi',14),(147,'Hizla',14),(148,'Mehendiganj',14),(149,'Muladi',14),(150,'Wazirpur',14),(151,'Airport',14),(152,'Barguna Sadar',15),(153,'Amtali',15),(154,'Bamna',15),(155,'Betagi',15),(156,'Patharghata',15),(157,'Taltali',15),(158,'Bhola Sadar',16),(159,'Borhanuddin',16),(160,'Charfasson',16),(161,'Daulatkhan',16),(162,'Lalmohan',16),(163,'Manpura',16),(164,'Tazumuddin',16),(165,'Jhalokati Sadar',17),(166,'Kathalia',17),(167,'Nalchity',17),(168,'Rajapur',17),(169,'Patuakhali Sadar',18),(170,'Bauphal',18),(171,'Dashmina',18),(172,'Dumki',18),(173,'Galachipa',18),(174,'Kalapara',18),(175,'Mirzaganj',18),(176,'Rangabali',18),(177,'Pirojpur Sadar',19),(178,'Bhandaria',19),(179,'Kawkhali',19),(180,'Mathbaria',19),(181,'Nazirpur',19),(182,'Nesarabad',19),(183,'Zianagar',19),(184,'Khulna Sadar',20),(185,'Sonadanga',20),(186,'Khalishpur',20),(187,'Khan Jahan Ali',20),(188,'Daulatpur',20),(189,'Batiaghata',20),(190,'Dakop',20),(191,'Dighalia',20),(192,'Dumuria',20),(193,'Koyra',20),(194,'Paikgachha',20),(195,'Phultala',20),(196,'Rupsa',20),(197,'Terokhada',20),(198,'Bagerhat Sadar',21),(199,'Chitalmari',21),(200,'Fakirhat',21),(201,'Kachua',21),(202,'Mollahat',21),(203,'Mongla',21),(204,'Morrelganj',21),(205,'Rampal',21),(206,'Sarankhola',21),(207,'Chuadanga Sadar',22),(208,'Alamdanga',22),(209,'Damurhuda',22),(210,'Jibannagar',22),(211,'Jashore Sadar',23),(212,'Abhaynagar',23),(213,'Bagherpara',23),(214,'Chaugachha',23),(215,'Jhikargachha',23),(216,'Keshabpur',23),(217,'Manirampur',23),(218,'Sharsha',23),(219,'Jhenaidah Sadar',24),(220,'Harinakunda',24),(221,'Kaliganj',24),(222,'Kotchandpur',24),(223,'Maheshpur',24),(224,'Shailkupa',24),(225,'Kushtia Sadar',25),(226,'Bheramara',25),(227,'Daulatpur',25),(228,'Khoksa',25),(229,'Kumarkhali',25),(230,'Mirpur',25),(231,'Magura Sadar',26),(232,'Mohammadpur',26),(233,'Shalikha',26),(234,'Sreepur',26),(235,'Meherpur Sadar',27),(236,'Gangni',27),(237,'Mujibnagar',27),(238,'Narail Sadar',28),(239,'Kalia',28),(240,'Lohagara',28),(241,'Satkhira Sadar',29),(242,'Assasuni',29),(243,'Debhata',29),(244,'Kalaroa',29),(245,'Kaliganj',29),(246,'Shyamnagar',29),(247,'Tala',29),(248,'Bogura Sadar',30),(249,'Adamdighi',30),(250,'Dhunat',30),(251,'Dhupchanchia',30),(252,'Gabtali',30),(253,'Kahaloo',30),(254,'Nandigram',30),(255,'Sariakandi',30),(256,'Shajahanpur',30),(257,'Sherpur',30),(258,'Shibganj',30),(259,'Sonatala',30),(260,'Chapai Nawabganj Sadar',31),(261,'Bholahat',31),(262,'Gomastapur',31),(263,'Nachole',31),(264,'Shibganj',31),(265,'Joypurhat Sadar',32),(266,'Akkelpur',32),(267,'Kalai',32),(268,'Khetlal',32),(269,'Panchbibi',32),(270,'Naogaon Sadar',33),(271,'Atrai',33),(272,'Badalgachhi',33),(273,'Dhamoirhat',33),(274,'Mahadebpur',33),(275,'Manda',33),(276,'Niamatpur',33),(277,'Patnitala',33),(278,'Porsha',33),(279,'Raninagar',33),(280,'Sapahar',33),(281,'Natore Sadar',34),(282,'Bagatipara',34),(283,'Baraigram',34),(284,'Gurudaspur',34),(285,'Lalpur',34),(286,'Singra',34),(287,'Pabna Sadar',35),(288,'Atgharia',35),(289,'Bera',35),(290,'Bhangura',35),(291,'Chatmohar',35),(292,'Faridpur',35),(293,'Ishwardi',35),(294,'Santhia',35),(295,'Sujanagar',35),(296,'Rajshahi Sadar',36),(297,'Boalia',36),(298,'Motihar',36),(299,'Rajpara',36),(300,'Shah Makhdum',36),(301,'Bagha',36),(302,'Bagmara',36),(303,'Charghat',36),(304,'Durgapur',36),(305,'Godagari',36),(306,'Mohanpur',36),(307,'Paba',36),(308,'Puthia',36),(309,'Tanore',36),(310,'Sirajganj Sadar',37),(311,'Belkuchi',37),(312,'Chauhali',37),(313,'Kamarkhanda',37),(314,'Kazipur',37),(315,'Raiganj',37),(316,'Shahjadpur',37),(317,'Tarash',37),(318,'Ullahpara',37),(319,'Dinajpur Sadar',38),(320,'Birampur',38),(321,'Birganj',38),(322,'Biral',38),(323,'Bochaganj',38),(324,'Chirirbandar',38),(325,'Fulbari',38),(326,'Ghoraghat',38),(327,'Hakimpur',38),(328,'Kaharole',38),(329,'Khansama',38),(330,'Nawabganj',38),(331,'Parbatipur',38),(332,'Gaibandha Sadar',39),(333,'Fulchhari',39),(334,'Gobindaganj',39),(335,'Palashbari',39),(336,'Sadullapur',39),(337,'Saghata',39),(338,'Sundarganj',39),(339,'Kurigram Sadar',40),(340,'Bhurungamari',40),(341,'Char Rajibpur',40),(342,'Chilmari',40),(343,'Nageshwari',40),(344,'Phulbari',40),(345,'Rajarhat',40),(346,'Raumari',40),(347,'Ulipur',40),(348,'Lalmonirhat Sadar',41),(349,'Aditmari',41),(350,'Hatibandha',41),(351,'Kaliganj',41),(352,'Patgram',41),(353,'Nilphamari Sadar',42),(354,'Dimla',42),(355,'Domar',42),(356,'Jaldhaka',42),(357,'Kishoreganj',42),(358,'Saidpur',42),(359,'Panchagarh Sadar',43),(360,'Atwari',43),(361,'Boda',43),(362,'Debiganj',43),(363,'Tetulia',43),(364,'Rangpur Sadar',44),(365,'Badarganj',44),(366,'Gangachhara',44),(367,'Kaunia',44),(368,'Mithapukur',44),(369,'Pirgachha',44),(370,'Pirganj',44),(371,'Taraganj',44),(372,'Thakurgaon Sadar',45),(373,'Baliadangi',45),(374,'Haripur',45),(375,'Pirganj',45),(376,'Ranisankail',45),(377,'Bandarban Sadar',46),(378,'Alikadam',46),(379,'Lama',46),(380,'Naikhongchhari',46),(381,'Rowangchhari',46),(382,'Ruma',46),(383,'Thanchi',46),(384,'Brahmanbaria Sadar',47),(385,'Akhaura',47),(386,'Ashuganj',47),(387,'Banchharampur',47),(388,'Bijoynagar',47),(389,'Kasba',47),(390,'Nabinagar',47),(391,'Nasirnagar',47),(392,'Sarail',47),(393,'Chandpur Sadar',48),(394,'Faridganj',48),(395,'Haimchar',48),(396,'Haziganj',48),(397,'Kachua',48),(398,'Matlab North',48),(399,'Matlab South',48),(400,'Shahrasti',48),(401,'Chattogram Sadar',49),(402,'Kotwali',49),(403,'Double Mooring',49),(404,'Panchlaish',49),(405,'Pahartali',49),(406,'Chandgaon',49),(407,'Bakalia',49),(408,'Bayazid Bostami',49),(409,'Patenga',49),(410,'Halishahar',49),(411,'Bandar',49),(412,'Akbar Shah',49),(413,'Anwara',49),(414,'Boalkhali',49),(415,'Chandanaish',49),(416,'Fatikchhari',49),(417,'Hathazari',49),(418,'Lohagara',49),(419,'Mirsharai',49),(420,'Patiya',49),(421,'Rangunia',49),(422,'Raozan',49),(423,'Sandwip',49),(424,'Satkania',49),(425,'Sitakunda',49),(426,'Cox\'s Bazar Sadar',50),(427,'Chakaria',50),(428,'Kutubdia',50),(429,'Maheshkhali',50),(430,'Pekua',50),(431,'Ramu',50),(432,'Teknaf',50),(433,'Ukhia',50),(434,'Cumilla Sadar',51),(435,'Cumilla Sadar South',51),(436,'Adarsha Sadar',51),(437,'Barura',51),(438,'Brahmanpara',51),(439,'Burichang',51),(440,'Chandina',51),(441,'Chauddagram',51),(442,'Daudkandi',51),(443,'Debidwar',51),(444,'Homna',51),(445,'Laksam',51),(446,'Lalmai',51),(447,'Meghna',51),(448,'Monohorgonj',51),(449,'Muradnagar',51),(450,'Nangalkot',51),(451,'Titas',51),(452,'Feni Sadar',52),(453,'Chhagalnaiya',52),(454,'Daganbhuiyan',52),(455,'Fulgazi',52),(456,'Parshuram',52),(457,'Sonagazi',52),(458,'Khagrachhari Sadar',53),(459,'Dighinala',53),(460,'Guimara',53),(461,'Lakshmichhari',53),(462,'Mahalchhari',53),(463,'Manikchhari',53),(464,'Matiranga',53),(465,'Panchhari',53),(466,'Ramgarh',53),(467,'Lakshmipur Sadar',54),(468,'Kamalnagar',54),(469,'Ramganj',54),(470,'Ramgati',54),(471,'Roypur',54),(472,'Noakhali Sadar',55),(473,'Begumganj',55),(474,'Chatkhil',55),(475,'Companiganj',55),(476,'Hatiya',55),(477,'Kabirhat',55),(478,'Senbagh',55),(479,'Sonaimuri',55),(480,'Subarnachar',55),(481,'Rangamati Sadar',56),(482,'Bagaichhari',56),(483,'Barkal',56),(484,'Belaichhari',56),(485,'Juraichhari',56),(486,'Kaptai',56),(487,'Kaukhali',56),(488,'Langadu',56),(489,'Naniarchar',56),(490,'Rajasthali',56),(491,'Jamalpur Sadar',57),(492,'Bakshiganj',57),(493,'Dewanganj',57),(494,'Islampur',57),(495,'Madarganj',57),(496,'Melandaha',57),(497,'Sarishabari',57),(498,'Mymensingh Sadar',58),(499,'Bhaluka',58),(500,'Dhobaura',58),(501,'Fulbaria',58),(502,'Gaffargaon',58),(503,'Gauripur',58),(504,'Haluaghat',58),(505,'Ishwarganj',58),(506,'Muktagachha',58),(507,'Nandail',58),(508,'Phulpur',58),(509,'Trishal',58),(510,'Netrokona Sadar',59),(511,'Atpara',59),(512,'Barhatta',59),(513,'Durgapur',59),(514,'Kalmakanda',59),(515,'Kendua',59),(516,'Khaliajuri',59),(517,'Madan',59),(518,'Mohanganj',59),(519,'Purbadhala',59),(520,'Sherpur Sadar',60),(521,'Jhenaigati',60),(522,'Nakla',60),(523,'Nalitabari',60),(524,'Sreebardi',60),(525,'Habiganj Sadar',61),(526,'Ajmiriganj',61),(527,'Bahubal',61),(528,'Baniachong',61),(529,'Chunarughat',61),(530,'Lakhai',61),(531,'Madhabpur',61),(532,'Nabiganj',61),(533,'Shaistagonj',61),(534,'Moulvibazar Sadar',62),(535,'Barlekha',62),(536,'Juri',62),(537,'Kamalganj',62),(538,'Kulaura',62),(539,'Rajnagar',62),(540,'Sreemangal',62),(541,'Sunamganj Sadar',63),(542,'Bishwamvarpur',63),(543,'Chhatak',63),(544,'Derai',63),(545,'Dharampasha',63),(546,'Dowarabazar',63),(547,'Jagannathpur',63),(548,'Jamalganj',63),(549,'Sullah',63),(550,'Tahirpur',63),(551,'Sylhet Sadar',64),(552,'Airport',64),(553,'Kotwali',64),(554,'Jalalabad',64),(555,'South Surma',64),(556,'Moglabazar',64),(557,'Shahporan',64),(558,'Beanibazar',64),(559,'Bishwanath',64),(560,'Companiganj',64),(561,'Fenchuganj',64),(562,'Golapganj',64),(563,'Gowainghat',64),(564,'Jointiapur',64),(565,'Kanaighat',64),(566,'Osmani Nagar',64),(567,'Zakiganj',64),(568,'Balaganj',64),(569,'Sylhet Sadar',64),(570,'Airport',64),(571,'Kotwali',64),(572,'Jalalabad',64),(573,'South Surma',64),(574,'Moglabazar',64),(575,'Shahporan',64),(576,'Beanibazar',64),(577,'Bishwanath',64),(578,'Companiganj',64),(579,'Fenchuganj',64),(580,'Golapganj',64),(581,'Gowainghat',64),(582,'Jointiapur',64),(583,'Kanaighat',64),(584,'Osmani Nagar',64),(585,'Zakiganj',64),(586,'Balaganj',64);
/*!40000 ALTER TABLE `policestations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policestations_addresses`
--

DROP TABLE IF EXISTS `policestations_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `policestations_addresses` (
  `police_station_id` bigint NOT NULL,
  `addresses_id` bigint NOT NULL,
  UNIQUE KEY `UKql47vwo4ynaoqbw19cfgju6eq` (`addresses_id`),
  KEY `FK6dwscbsteeanx53vyx5kxrqp2` (`police_station_id`),
  CONSTRAINT `FK6dwscbsteeanx53vyx5kxrqp2` FOREIGN KEY (`police_station_id`) REFERENCES `policestations` (`id`),
  CONSTRAINT `FKengaxxidd78e1yitxdh3vacxx` FOREIGN KEY (`addresses_id`) REFERENCES `addresses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policestations_addresses`
--

LOCK TABLES `policestations_addresses` WRITE;
/*!40000 ALTER TABLE `policestations_addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `policestations_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolios`
--

DROP TABLE IF EXISTS `portfolios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portfolios` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `description` text,
  `file_url` varchar(255) DEFAULT NULL,
  `project_url` varchar(255) DEFAULT NULL,
  `technologies` text,
  `title` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_profile_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKb0cvjh1rpafunxmlj2j6tri2d` (`user_profile_id`),
  CONSTRAINT `FKb0cvjh1rpafunxmlj2j6tri2d` FOREIGN KEY (`user_profile_id`) REFERENCES `userprofiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolios`
--

LOCK TABLES `portfolios` WRITE;
/*!40000 ALTER TABLE `portfolios` DISABLE KEYS */;
INSERT INTO `portfolios` VALUES (1,'2026-07-09 18:23:39.811719','Angular project test','mahabub.sheikh2001@gmail.com_32b17794-7e31-4672-b118-f69fffa7c43f.pdf','github.com/MMRSheikh2001','Angular','WorkBridge','2026-08-02 18:31:05.366631',1),(2,'2026-08-02 18:30:48.604363','A frelancer+jobportal site','mahabub.sheikh2001@gmail.com_0c885adb-ed7f-4dde-96fe-9e385f087496.pdf','github.com','Springboot','WorkBridge','2026-08-02 23:03:27.271478',1),(6,'2026-08-03 23:35:28.476189','The Hospital Management System (HMS), built with Angular and Spring Boot, streamlines opera�ons through role-based access for Admin, Doctor, Pharmacist, Laboratorist, Recep�onist, and Pa�ent roles. Leveraging CSS, Bootstrap, JavaScript, Angular, Java, Spring Boot, Hibernate, and MySQL, it offers a modular, respon-sive pla�orm for efficient hospital management.',NULL,'https://github.com/mostofa-rezvi/HospitalManagementSystem-Angular-SpringBoot-MySQL','Spring Boot · Angular · TypeScript · Java · JWT · MySQL · Bootstrap · JavaScript · HTML · CSS','Hospital Management System with Angular, Spring Boot & MySQL','2026-08-03 23:35:28.476189',12),(7,'2026-08-03 23:35:28.481185','The Food Ordering Android Project uses Firebase Database for real-�me data management, offering a seamless user experience. It features an intui�ve interface for browsing menus, placing orders, user profile, and tracking order status efficiently.',NULL,'https://github.com/mostofa-rezvi/FoodOrdering-Firebase-Android_Project','Android Studio · Kotlin','Food Ordering with Kotlin','2026-08-03 23:35:28.481185',12),(8,'2026-08-03 23:35:28.486463','The Hospital Management System (HMS) is an Angular-based applica�on using JSON for data storage, designed to streamline hospital opera�ons with role-based access for Admin, Doctor, Nurse, Recep�onist, and Pa�ent roles. Key features include a user-friendly interface, secure permissions, and efficient data management for tasks like record management and appointment scheduling.',NULL,'https://github.com/mostofa-rezvi/HospitalManagementSystem-Angular-JSON','Angular · JSON · Bootstrap · CSS · JavaScript · HTML','Hospital Management System (HMS) with Angular & Json','2026-08-03 23:35:28.486463',12),(9,'2026-08-03 23:35:28.491530','The Hospital Management System is developed using Flu�er for the frontend, Spring Boot for the backend, and MySQL for the database. This project aims to streamline hospital opera�ons by providing a modern, responsive interface and robust backend support for efficient data management and role-based access.',NULL,'https://github.com/mostofa-rezvi/HospitalManagementSystem-Flutter-SpringBoot-MySQL','Spring Boot · Flu�er · Java · MySQL · Dart','Hospital Management System using Flutter & Spring Boot','2026-08-03 23:35:28.491530',12);
/*!40000 ALTER TABLE `portfolios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `admin_reply` text,
  `attachment_url` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` text,
  `resolved_at` datetime(6) DEFAULT NULL,
  `status` enum('OPEN','REJECTED','RESOLVED') DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `type` enum('ACCOUNT','BUG','OTHER','PAYMENT','SUGGESTION') DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2o32rer9hfweeylg7x8ut8rj2` (`user_id`),
  CONSTRAINT `FK2o32rer9hfweeylg7x8ut8rj2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,'No decision.Because testing.No decision.Because testing.No decision.Because testing.No decision.Because testing.No decision.Because testing.No decision.Because testing.No decision.Because testing.No decision.Because testing.No decision.Because testing.No decision.Because testing.No decision.Because testing.No decision.Because testing.No decision.Because testing.No decision.Because testing.No decision.Because testing.No decision.Because testing.No decision.Because testing.','mahabub.sheikh2001@gmail.com_9cb9ef55-7e8c-4ee2-812d-7bed16988909.png','2026-07-23 23:05:39.662225','Just Testing Just Testing Just Testing Just Testing Just Testing Just Testing Just Testing Just Testing Just Testing Just Testing Just Testing Just Testing Just Testing Just Testing Just Testing Just Testing Just Testing Just Testing Just Testing Just Testing Just Testing Just Testing Just Testing Just Testing ','2026-07-23 23:44:42.813081','RESOLVED','Testing','OTHER',2),(2,'Rejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.ACRejected.And testing.AC','mahabub.sheikh2001@gmail.com_6ece5aaf-f499-4931-9e9d-d833d001c10b.png','2026-07-23 23:13:27.512649','Again testing 2 Again testing 2 Again testing 2 Again testing 2 Again testing 2 Again testing 2 Again testing 2 Again testing 2 Again testing 2 Again testing 2 Again testing 2 Again testing 2 Again testing 2 Again testing 2 Again testing 2 ',NULL,'REJECTED','Test 2','SUGGESTION',2),(3,'ds',NULL,'2026-07-23 23:49:15.312720','another',NULL,'REJECTED','dhfsdkfhv','SUGGESTION',2);
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resumes`
--

DROP TABLE IF EXISTS `resumes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resumes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) DEFAULT NULL,
  `uploaded_at` datetime(6) DEFAULT NULL,
  `user_profile_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKp3qcn862j7qjr4me3ulsfvpon` (`user_profile_id`),
  CONSTRAINT `FK9b9igfoytinv87hxeec96rn34` FOREIGN KEY (`user_profile_id`) REFERENCES `userprofiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resumes`
--

LOCK TABLES `resumes` WRITE;
/*!40000 ALTER TABLE `resumes` DISABLE KEYS */;
INSERT INTO `resumes` VALUES (1,'mahabub.sheikh2001@gmail.com_b8da5616-0615-4fdb-b4ed-24027f1eb7bc.pdf','2026-07-10 00:45:52.914086',1),(2,'mmrs0123456789@gmail.com_5d6ebf92-73c5-4fe7-940e-4a30ac69bf41.pdf','2026-08-01 00:49:43.840389',2),(3,'rashid@gmail.com_df0c18af-bc0b-4931-8fa1-bd6de0d616c0.pdf','2026-08-03 23:16:37.372141',12),(4,'mili.jahan2004@gmail.com_2ef5de58-c713-444a-a520-6fc2a64865d9.pdf','2026-08-04 00:04:17.351721',13);
/*!40000 ALTER TABLE `resumes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `comment` text,
  `created_at` datetime(6) DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `gig_order_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKan080n7v36wv8cbrdn51sj0r2` (`gig_order_id`),
  CONSTRAINT `FKedj24vvv4ilraobrjuvhthdlt` FOREIGN KEY (`gig_order_id`) REFERENCES `gigorders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'Good work','2026-07-20 17:23:30.206835',5,2);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `savedgigs`
--

DROP TABLE IF EXISTS `savedgigs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `savedgigs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `gig_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6ueivjbe5ijvgbv42ng26eig8` (`gig_id`),
  KEY `FK2sve6ccj2o6pfuw5mpprw87d1` (`user_id`),
  CONSTRAINT `FK2sve6ccj2o6pfuw5mpprw87d1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK6ueivjbe5ijvgbv42ng26eig8` FOREIGN KEY (`gig_id`) REFERENCES `gigs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `savedgigs`
--

LOCK TABLES `savedgigs` WRITE;
/*!40000 ALTER TABLE `savedgigs` DISABLE KEYS */;
INSERT INTO `savedgigs` VALUES (2,'2026-07-21 00:02:05.515071',1,3);
/*!40000 ALTER TABLE `savedgigs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `savedjobs`
--

DROP TABLE IF EXISTS `savedjobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `savedjobs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `job_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK85lw1jemhp0ejl8ph625dikcm` (`job_id`),
  KEY `FK72jie3k6eh8eedn8rtg9by6ov` (`user_id`),
  CONSTRAINT `FK72jie3k6eh8eedn8rtg9by6ov` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK85lw1jemhp0ejl8ph625dikcm` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `savedjobs`
--

LOCK TABLES `savedjobs` WRITE;
/*!40000 ALTER TABLE `savedjobs` DISABLE KEYS */;
INSERT INTO `savedjobs` VALUES (3,'2026-07-21 00:58:47.223347',1,2);
/*!40000 ALTER TABLE `savedjobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlyobx4bwdv7k6im48ru4pod1u` (`category_id`),
  CONSTRAINT `FKlyobx4bwdv7k6im48ru4pod1u` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,'Computer Fundamentals',1),(2,'MS Office',1),(3,'Internet & Email',1),(4,'Technical Support',1),(5,'IT Help Desk',1),(6,'Java',2),(7,'Spring Boot',2),(8,'C#',2),(9,'PHP',2),(10,'REST API Development',2),(11,'R Programming',3),(12,'Python',3),(13,'SQL',3),(14,'Power BI',3),(15,'Data Visualization',3),(16,'Network Security',4),(17,'Ethical Hacking',4),(18,'Penetration Testing',4),(19,'Firewall Management',4),(20,'Security Auditing',4),(21,'HTML5',6),(22,'CSS3',6),(23,'JavaScript',6),(24,'Angular',6),(25,'React',6),(26,'Android Development',7),(27,'Flutter',7),(28,'React Native',7),(29,'Kotlin',7),(30,'Dart',7),(31,'Natural Language Processing',8),(32,'Computer Vision',8),(33,'Deep Learning',8),(34,'Prompt Engineering',8),(35,'AI Model Training',8),(36,'Scikit-Learn',9),(37,'TensorFlow',9),(38,'PyTorch',9),(39,'Feature Engineering',9),(40,'Predictive Modeling',9),(41,'Cisco Networking',10),(42,'TCP/IP',10),(43,'Routing & Switching',10),(44,'DNS',10),(45,'VPN Configuration',10),(46,'AWS',11),(47,'Microsoft Azure',11),(48,'Google Cloud Platform',11),(49,'Cloud Deployment',11),(50,'Cloud Security',11),(51,'Docker',12),(52,'Kubernetes',12),(53,'Jenkins',12),(54,'CI/CD',12),(55,'Linux Administration',12),(56,'MySQL',13),(57,'PostgreSQL',13),(58,'MongoDB',13),(59,'Database Optimization',13),(60,'Database Backup & Recovery',13),(61,'Manual Testing',14),(62,'Selenium',14),(63,'Selenium',14),(64,'JUnit',14),(65,'Postman Testing',14),(66,'Test Case Design',14),(67,'Figma',15),(68,'Adobe XD',15),(69,'Wireframing',15),(70,'User Research',15),(71,'Prototyping',15),(72,'Adobe Photoshop',16),(73,'Adobe Illustrator',16),(74,'Canva',16),(75,'Brand Design',16),(76,'Logo Design',16),(77,'SEO',17),(78,'Facebook Marketing',17),(79,'Google Ads',17),(80,'Content Marketing',17),(81,'Email Marketing',17),(82,'Agile',18),(83,'Scrum',18),(84,'Jira',18),(85,'Risk Management',18),(86,'Team Leadership',18),(87,'Requirement Gathering',19),(88,'Business Process Modeling',19),(89,'Stakeholder Management',19),(90,'UML',19),(91,'Documentation',19),(92,'Financial Reporting',20),(93,'Budgeting',20),(94,'Tax Management',20),(95,'QuickBooks',20),(96,'Auditing',20),(97,'Recruitment',21),(98,'Employee Relations',21),(99,'Payroll Management',21),(100,'Performance Management',21),(101,'Training & Development',21);
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills_user_skills`
--

DROP TABLE IF EXISTS `skills_user_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills_user_skills` (
  `skill_id` bigint NOT NULL,
  `user_skills_id` bigint NOT NULL,
  UNIQUE KEY `UK8ygp4sqtwhcqfudf7oclwjda0` (`user_skills_id`),
  KEY `FKas17u605g944yexlh1icwgjqx` (`skill_id`),
  CONSTRAINT `FK77wihb0dtrihebg11qmpsch4u` FOREIGN KEY (`user_skills_id`) REFERENCES `userskills` (`id`),
  CONSTRAINT `FKas17u605g944yexlh1icwgjqx` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills_user_skills`
--

LOCK TABLES `skills_user_skills` WRITE;
/*!40000 ALTER TABLE `skills_user_skills` DISABLE KEYS */;
/*!40000 ALTER TABLE `skills_user_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainings`
--

DROP TABLE IF EXISTS `trainings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `certificate_file` varchar(255) DEFAULT NULL,
  `certificate_id` varchar(255) DEFAULT NULL,
  `certificate_verification_url` varchar(255) DEFAULT NULL,
  `completed` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` text,
  `duration` varchar(255) DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `institution` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `training_type` enum('Bootcamp','Certification','Offline','Online','Workshop') DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_profile_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKj99rfa7ma3suai38t258e7jer` (`user_profile_id`),
  CONSTRAINT `FKj99rfa7ma3suai38t258e7jer` FOREIGN KEY (`user_profile_id`) REFERENCES `userprofiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainings`
--

LOCK TABLES `trainings` WRITE;
/*!40000 ALTER TABLE `trainings` DISABLE KEYS */;
INSERT INTO `trainings` VALUES (1,NULL,NULL,NULL,_binary '','2026-08-01 00:50:43.152862',NULL,'3 months','2023-12-31','UY Lab','Microsoft Office Training',NULL,'Workshop','2026-08-01 00:50:43.152862',2),(2,NULL,NULL,NULL,_binary '','2026-08-01 00:50:43.159859',NULL,'2 months','2025-12-31','Aspire Institute','Aspire Leadership Program',NULL,'Workshop','2026-08-01 00:50:43.159859',2),(3,NULL,NULL,NULL,_binary '\0','2026-08-01 00:50:43.165833',NULL,'10 months',NULL,'IsDB BISEW IT Scholarship Programme','Post Graduate Diploma in Java Full Stack Development',NULL,'Certification','2026-08-01 00:50:43.165833',2),(4,NULL,'gvjgvjgvbjhgv','hkhgkbggkh',_binary '','2026-08-02 16:39:34.764076','Learnt MS office','1 year','2024-08-02','ULab','MS office','2023-08-02','Online','2026-08-02 16:39:34.764076',1),(8,NULL,NULL,NULL,_binary '','2026-08-03 23:35:28.469186',NULL,'788 Hours','2024-12-31','Center for Computer Studies Ltd (CCSL)','Enterprise System Analysis & Design – JEE','2024-01-01',NULL,'2026-08-03 23:35:28.469186',12);
/*!40000 ALTER TABLE `trainings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` decimal(38,2) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` text,
  `type` enum('DEPOSIT','FREEZE','JOB_POST_PAYMENT','PLATFORM_COMMISSION','REFUND','SELLER_PAYOUT','WITHDRAW') DEFAULT NULL,
  `from_user_id` bigint DEFAULT NULL,
  `to_user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpkf4bjq8dbuyxt0qfvbcmm7d` (`from_user_id`),
  KEY `FKyud5vx71vhc179ney0pdat27` (`to_user_id`),
  CONSTRAINT `FKpkf4bjq8dbuyxt0qfvbcmm7d` FOREIGN KEY (`from_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKyud5vx71vhc179ney0pdat27` FOREIGN KEY (`to_user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,300.00,'2026-07-15 16:04:52.934856','Payment for Job #2','JOB_POST_PAYMENT',3,1),(2,400.00,'2026-07-19 05:12:44.590405','Amount Frozen','FREEZE',3,3),(3,380.00,'2026-07-19 05:44:06.751138','Seller Obtained money from Gig Order #1  after Admin  solved dispute','SELLER_PAYOUT',3,2),(4,0.00,'2026-07-19 05:44:06.766241','System Obtained Commission from Gig Order #1  after  Admin  solved dispute','PLATFORM_COMMISSION',3,1),(5,500.00,'2026-07-20 01:47:02.795944','Wallet deposit via SSLCommerz ','DEPOSIT',NULL,2),(6,1000.00,'2026-07-20 02:19:05.978108','Wallet deposit via SSLCommerz ','DEPOSIT',NULL,2),(7,500.00,'2026-07-20 03:19:24.297549','Wallet Withdraw','WITHDRAW',2,NULL),(8,500.00,'2026-07-20 17:07:19.817419','Amount Frozen','FREEZE',3,3),(9,475.00,'2026-07-20 17:07:57.993934','Seller Obtained money from Gig Order #2  after buyer accepted delivery','SELLER_PAYOUT',3,2),(10,25.00,'2026-07-20 17:07:57.999934','System Obtained Commission from Gig Order #2  after buyer accepted delivery','PLATFORM_COMMISSION',3,1),(11,400.00,'2026-07-28 18:09:37.601093','Wallet Withdraw','WITHDRAW',2,NULL),(12,400.00,'2026-07-28 18:09:37.627130','Money withdrawn','WITHDRAW',NULL,2),(13,500.00,'2026-07-29 15:42:43.814267','Wallet deposit via SSLCommerz ','DEPOSIT',NULL,3),(14,500.00,'2026-08-08 16:05:39.201315','Payment for Job #3','JOB_POST_PAYMENT',3,1);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_references`
--

DROP TABLE IF EXISTS `user_references`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_references` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` text,
  `designation` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `organization` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `relation` varchar(255) DEFAULT NULL,
  `user_profile_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKi7nmgjjxisghoa5bjj8x5jait` (`user_profile_id`),
  CONSTRAINT `FKi7nmgjjxisghoa5bjj8x5jait` FOREIGN KEY (`user_profile_id`) REFERENCES `userprofiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_references`
--

LOCK TABLES `user_references` WRITE;
/*!40000 ALTER TABLE `user_references` DISABLE KEYS */;
INSERT INTO `user_references` VALUES (1,NULL,'Associate professor, Department of Statistics',NULL,'Altaf Hossain','Dhaka College','01712948612','Academic',2),(2,NULL,'Instructor (JEE)','emranhss@gmail.com','Muhammad Emran Hossain','Center For Computer Studies Ltd.','01619192323','Professional',2),(3,'fhfjbbvg','Teacher','altaf@gmail.com','Altaf','DC','4444254','Academic',1),(7,NULL,'Consultant','moshaidul@gmail.com','Md. Moshaidul Islam','Show & Tell Consul�ng Ltd','01711071219',NULL,12),(8,NULL,'Instructor (JEE)','emranhss@gmail.com','Muhammad Emran Hossain','Center For Computer Studies Ltd.','01619192323',NULL,12);
/*!40000 ALTER TABLE `user_references` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userlanguages`
--

DROP TABLE IF EXISTS `userlanguages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userlanguages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proficiency` enum('ADVANCED','BEGINNER','INTERMEDIATE','NATIVE') DEFAULT NULL,
  `language_id` bigint DEFAULT NULL,
  `user_profile_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhp098jtv6mi44hfwb684xjqak` (`language_id`),
  KEY `FKo11xg6slnxkg8bmpw80anwnli` (`user_profile_id`),
  CONSTRAINT `FKhp098jtv6mi44hfwb684xjqak` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`),
  CONSTRAINT `FKo11xg6slnxkg8bmpw80anwnli` FOREIGN KEY (`user_profile_id`) REFERENCES `userprofiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userlanguages`
--

LOCK TABLES `userlanguages` WRITE;
/*!40000 ALTER TABLE `userlanguages` DISABLE KEYS */;
INSERT INTO `userlanguages` VALUES (1,'NATIVE',1,1),(2,'ADVANCED',2,1),(3,'BEGINNER',4,1),(4,'BEGINNER',5,1);
/*!40000 ALTER TABLE `userlanguages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userprofiles`
--

DROP TABLE IF EXISTS `userprofiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userprofiles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `bio` text,
  `career_objective` text,
  `created_at` datetime(6) DEFAULT NULL,
  `current_salary` decimal(38,2) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `expected_salary` decimal(38,2) DEFAULT NULL,
  `father_name` varchar(255) DEFAULT NULL,
  `freelancer_title` varchar(255) DEFAULT NULL,
  `gender` tinyint DEFAULT NULL,
  `github_link` varchar(255) DEFAULT NULL,
  `headline` text,
  `image` varchar(255) DEFAULT NULL,
  `linkedin_link` varchar(255) DEFAULT NULL,
  `marital_status` varchar(255) DEFAULT NULL,
  `mother_name` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `nid_number` varchar(255) DEFAULT NULL,
  `passport_number` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `portfolio_website` varchar(255) DEFAULT NULL,
  `preferred_job_type` enum('CONTRACT','FREELANCE','FULL_TIME','INTERNSHIP','PART_TIME','REMOTE','TEMPORARY','VOLUNTEER') DEFAULT NULL,
  `preferred_workplace` enum('HYBRID','ONSITE','REMOTE') DEFAULT NULL,
  `professional_summary` text,
  `profile_completed` bit(1) DEFAULT NULL,
  `religion` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `permanent_address_id` bigint DEFAULT NULL,
  `present_address_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK44obvdtpuw9vlwctq0ja64jvm` (`phone`),
  UNIQUE KEY `UK98lbw35k3dkwnufjc6drfht4q` (`permanent_address_id`),
  UNIQUE KEY `UKip60yy6xcpw80knhj1yn8slaq` (`present_address_id`),
  UNIQUE KEY `UK7gi6g93e9tvq5r62npvi47p3y` (`user_id`),
  CONSTRAINT `FK1t9dke5wk8objxmi23n0a1sb3` FOREIGN KEY (`present_address_id`) REFERENCES `addresses` (`id`),
  CONSTRAINT `FKbi0rwcj8vjyujhxqgbadg5i6j` FOREIGN KEY (`permanent_address_id`) REFERENCES `addresses` (`id`),
  CONSTRAINT `FKtqbfj7b11m8k2cpi7yv4t3rav` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `userprofiles_chk_1` CHECK ((`gender` between 0 and 2))
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userprofiles`
--

LOCK TABLES `userprofiles` WRITE;
/*!40000 ALTER TABLE `userprofiles` DISABLE KEYS */;
INSERT INTO `userprofiles` VALUES (1,'Statistics Master’s, java developer','Become senior software engineer','2026-07-08 02:17:08.867375',25000.00,'2001-02-22',30000.00,'Kamal Hossain','Software Engineer',0,'github.com','Programmer','mahabub.sheikh2001@gmail.com_72c7ed1d-6f8b-46b6-b8c9-e0498057ce8d.jpg','linkedin.com','Single','Mahbuba Sultana','Mahbub R Rahman','Bangladeshi','455465','6564565','01763634878','mahbub.com','FULL_TIME','HYBRID','I am a java developer',_binary '\0','Islam','2026-08-01 23:05:29.629732',1,2,2),(2,NULL,'A motivated and detail-oriented Statistics graduate with foundational skills in HTML, JavaScript, Bootstrap, SQL, and Java, seeking an opportunity to apply analytical, problem-solving, and technical abilities in a dynamic environment. Eager to contribute to data-driven decision-making, develop efficient web-based solutions, and grow professionally while continuously enhancing both analytical and programming expertise','2026-07-15 15:43:50.710089',NULL,'2001-02-21',NULL,'Md Kamal Hossain Sheikh',NULL,NULL,'https://github.com/MMRSheikh2001',NULL,NULL,'https://linkedin.com/in/md-mahbubur-rahman-sheikh-417086319/','Unmarried','Mahbuba Sultana','MD MAHBUBUR RAHMAN SHEIKH','Bangladeshi','9582769338',NULL,'+8801576909747',NULL,NULL,NULL,NULL,_binary '\0','Islam','2026-08-01 00:50:43.184845',NULL,NULL,4),(7,NULL,NULL,'2026-07-30 15:55:40.952170',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Sabbir Hasan',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,_binary '\0',NULL,'2026-07-30 15:55:40.952170',NULL,NULL,10),(12,NULL,'Full Stack Java Developer with knowedge in Java, Spring Boot, Angular, and Flu�er, seeking a hard role in a ahead-ques�oning organisa�on to leveage my technical and mission control talents. Dedicated to con�nuous development and dedicated to contribu�ng innova�ve answers that drive organiza�onal boom. Passionate approximately accomplishing excellence in collabora�ve and dynamic environments, in which I can u�lize and amplify my talent set to aid impac�ul outcomes.','2026-08-03 17:54:51.078034',NULL,NULL,NULL,NULL,NULL,NULL,'https://github.com/mostofa-rezvi','Programmer',NULL,'linkedin.com/in/mostofa-aminur',NULL,NULL,'Mostofa Aminur Rashid',NULL,NULL,NULL,'+880 152 1417 316',NULL,NULL,NULL,'Full Stack Java Developer with knowedge in Java, Spring Boot, Angular, and Flu�er, seeking a hard role in a ahead-ques�oning organisa�on to leveage my technical and mission control talents. Dedicated to con�nuous development and dedicated to contribu�ng innova�ve answers that drive organiza�onal boom. Passionate approximately accomplishing excellence in collabora�ve and dynamic environments, in which I can u�lize and amplify my talent set to aid impac�ul outcomes.',_binary '\0',NULL,'2026-08-03 23:35:28.519740',NULL,NULL,15),(13,NULL,'Looking forward to make result-oriented contributions towards completion of projects with extensive knowledge and rich experience aiding in consistently monitoring the progress of projects & grow rapidly with increasing responsibilities. Intend to work with a leading NGO that focuses on environmental conservation and aims to protect.','2026-08-03 23:49:13.276961',NULL,'2005-11-22',NULL,'Md Kamal Hossain Sheikh',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Mahbuba Sultana','Israt Jahan Mili','Bangladeshi',NULL,NULL,'+8801946034557',NULL,NULL,NULL,NULL,_binary '\0','Islam','2026-08-05 04:15:39.433461',NULL,NULL,16);
/*!40000 ALTER TABLE `userprofiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `is_suspended` bit(1) DEFAULT NULL,
  `is_verified` bit(1) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','COMPANY','USER') DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `company_profile_id` bigint DEFAULT NULL,
  `user_profile_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UKb9aok6heffv1f0e3aj1xmb44p` (`company_profile_id`),
  UNIQUE KEY `UKm6rqhr1nq3b6j8aglc4tlhaj6` (`user_profile_id`),
  CONSTRAINT `FK5dvby953fba7fygy0ota4er3b` FOREIGN KEY (`user_profile_id`) REFERENCES `userprofiles` (`id`),
  CONSTRAINT `FK6qlo86b2e1vwdp96ob3nnumf4` FOREIGN KEY (`company_profile_id`) REFERENCES `companyprofiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2026-07-08 02:04:03.222244','mahabub2001@gmail.com',_binary '',_binary '\0',_binary '','$2a$10$vPKKFR3EcuAfCklaYOVzLOUy6e2RT.GZDNBvnsvKQFhiKUKzskwi6','ADMIN','2026-07-08 02:04:03.222244',NULL,NULL),(2,'2026-07-08 02:17:08.862399','mahabub.sheikh2001@gmail.com',_binary '',_binary '\0',_binary '','$2a$10$vYegLPLCqpE9QmqZu1Isuemq5esgDV0YvGoSrsTlWXAEf88p.Oexy','USER','2026-07-30 16:45:27.873709',NULL,1),(3,'2026-07-10 03:00:54.538913','pran@gmail.com',_binary '',_binary '\0',_binary '','$2a$10$bv6Rtrzg0kbu0/H3FldZWe73REhn9iV.0tUYhsaFLKwQikrSXTYXW','COMPANY','2026-07-10 03:01:01.170426',1,NULL),(4,'2026-07-15 15:43:50.708115','mmrs0123456789@gmail.com',_binary '',_binary '\0',_binary '','$2a$10$6tt.IIgZ1A1NZ42s8T6Kdu3dR9cNhzg8ojsYpVjV9C4yyLlk.3fW.','USER','2026-07-15 15:45:36.528133',NULL,2),(10,'2026-07-30 15:55:40.950169','sabbir@gmail.com',_binary '',_binary '\0',_binary '','$2a$10$kxLY.EZKK2R/co/1R.sXTuWMj/hkTP3PNXclI0IXxJdOUOJttWd5e','USER','2026-07-30 15:55:40.955171',NULL,7),(15,'2026-08-03 17:54:51.056499','rashid@gmail.com',_binary '',_binary '\0',_binary '','$2a$10$9pduoEFHyfT08/Oyka4.8.Hsk7CrrkBWzXKxOX2cbOyXr9tjIEb2i','USER','2026-08-03 17:54:51.094622',NULL,12),(16,'2026-08-03 23:49:13.269833','mili.jahan2004@gmail.com',_binary '',_binary '\0',_binary '','$2a$10$OpRM3S2CjjVxzMnZ7pui4eJlsTRR.XpmblmdXa25Rie20ufBotWPe','USER','2026-08-03 23:49:13.280866',NULL,13);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userskills`
--

DROP TABLE IF EXISTS `userskills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userskills` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `proficiency_level` enum('ADVANCED','BEGINNER','EXPERT','INTERMEDIATE') DEFAULT NULL,
  `years_of_experience` int DEFAULT NULL,
  `skill_id` bigint DEFAULT NULL,
  `user_profile_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKaaikkvn564tf7so0qvhs8d3un` (`skill_id`),
  KEY `FK964abrbkq7vl4npqeqt2x2meq` (`user_profile_id`),
  CONSTRAINT `FK964abrbkq7vl4npqeqt2x2meq` FOREIGN KEY (`user_profile_id`) REFERENCES `userprofiles` (`id`),
  CONSTRAINT `FKaaikkvn564tf7so0qvhs8d3un` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userskills`
--

LOCK TABLES `userskills` WRITE;
/*!40000 ALTER TABLE `userskills` DISABLE KEYS */;
INSERT INTO `userskills` VALUES (1,'2026-07-09 17:39:43.811263','INTERMEDIATE',4,2,1),(2,'2026-08-03 01:27:24.079529','BEGINNER',1,6,1);
/*!40000 ALTER TABLE `userskills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallets`
--

DROP TABLE IF EXISTS `wallets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallets` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `balance` decimal(38,2) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `frozen_balance` decimal(38,2) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKsswfdl9fq40xlkove1y5kc7kv` (`user_id`),
  CONSTRAINT `FKc1foyisidw7wqqrkamafuwn4e` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallets`
--

LOCK TABLES `wallets` WRITE;
/*!40000 ALTER TABLE `wallets` DISABLE KEYS */;
INSERT INTO `wallets` VALUES (1,1345.00,'2026-07-08 02:04:13.175211',0.00,1),(2,1455.00,'2026-07-08 02:17:18.851502',0.00,2),(3,48300.00,'2026-07-10 03:01:06.553363',0.00,3),(4,0.00,'2026-07-15 15:44:00.180837',0.00,4),(5,0.00,'2026-07-30 15:55:46.559807',0.00,10),(6,0.00,'2026-08-03 17:54:56.604947',0.00,15),(7,0.00,'2026-08-03 23:49:18.664292',0.00,16);
/*!40000 ALTER TABLE `wallets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `withdraws`
--

DROP TABLE IF EXISTS `withdraws`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `withdraws` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_name` varchar(255) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `admin_remarks` text,
  `amount` decimal(38,2) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `transaction_reference` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `withdraw_method` enum('BANK','BKASH','NAGAD') DEFAULT NULL,
  `withdraw_status` enum('APPROVED','PENDING','REJECTED') DEFAULT NULL,
  `wallet_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3e2f5g86jj7qf8umtrv6bgs84` (`wallet_id`),
  CONSTRAINT `FK3e2f5g86jj7qf8umtrv6bgs84` FOREIGN KEY (`wallet_id`) REFERENCES `wallets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `withdraws`
--

LOCK TABLES `withdraws` WRITE;
/*!40000 ALTER TABLE `withdraws` DISABLE KEYS */;
INSERT INTO `withdraws` VALUES (1,'Mahbub','01715230943','Ok',500.00,'2026-07-20 03:06:33.277250','123456789','2026-07-20 03:19:24.313574','BKASH','APPROVED',2),(2,'gjhgk','6445','ok',400.00,'2026-07-28 18:08:28.748677','455454','2026-07-28 18:09:37.636251','BKASH','APPROVED',2);
/*!40000 ALTER TABLE `withdraws` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-30  1:54:18
