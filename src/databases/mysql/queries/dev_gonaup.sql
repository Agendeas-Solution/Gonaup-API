-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 24, 2023 at 06:59 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dev_gonaup`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_master`
--

CREATE TABLE `admin_master` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_master`
--

INSERT INTO `admin_master` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Jenish', 'jenishshekhaliya@gmail.com', '$2a$11$h/IEZymWTTRdzDbFLHh8Oup.QgAaBB2eQYnN3n.63veB2/A8ND8VW', '2023-06-19 07:00:10', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `frameworks`
--

CREATE TABLE `frameworks` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `frameworks`
--

INSERT INTO `frameworks` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'ReactJS', '2023-06-17 14:43:09', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `freelance_experience`
--

CREATE TABLE `freelance_experience` (
  `id` int(11) NOT NULL,
  `framework_id` int(11) DEFAULT NULL,
  `experienced_years` int(11) DEFAULT NULL,
  `project_links` longtext DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `freelance_experience`
--

INSERT INTO `freelance_experience` (`id`, `framework_id`, `experienced_years`, `project_links`, `description`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(2, 1, 3, '', 'test', 1, '2023-06-17 14:43:13', '2023-06-17 16:53:46', '2023-06-17 16:53:46'),
(3, 1, 3, 'https://agendeas.com/', 'test', 1, '2023-06-17 14:43:42', '2023-06-18 11:34:29', NULL),
(4, 1, 3, '', 'test', 1, '2023-06-17 14:49:07', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `title` varchar(20) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `budget_type` int(11) DEFAULT NULL COMMENT '0=fixed,1=hourly',
  `fixed_budget` int(11) DEFAULT NULL,
  `hourly_budget` varchar(20) DEFAULT NULL,
  `skills` longtext DEFAULT NULL,
  `project_duration` int(11) DEFAULT NULL COMMENT '0=less then a month,1= 1 to 3, 2=3to6,3=more than 6',
  `english_level` int(11) DEFAULT NULL COMMENT '0=conversational, 1=fluent, 2=bilingual',
  `project_status` int(11) DEFAULT 0 COMMENT '0=pending,1=completed',
  `assigned_user` longtext DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `description`, `budget_type`, `fixed_budget`, `hourly_budget`, `skills`, `project_duration`, `english_level`, `project_status`, `assigned_user`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'test', 'test', 0, 300, NULL, '1,2', 0, 0, 0, '1', 1, '2023-06-17 14:10:41', '2023-06-18 08:39:41', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'ReactJS', '2023-06-18 08:30:21', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `timzones`
--

CREATE TABLE `timzones` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_master`
--

CREATE TABLE `user_master` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `contact_number` varchar(15) DEFAULT NULL,
  `type` int(11) DEFAULT NULL COMMENT '0=freelancer and 1=client',
  `skype_id` varchar(50) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `country_name` varchar(20) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `state_name` varchar(20) DEFAULT NULL,
  `country_code` varchar(10) NOT NULL,
  `state_code` varchar(10) NOT NULL,
  `city_id` int(11) DEFAULT NULL,
  `city_name` varchar(20) DEFAULT NULL,
  `english_level` int(11) DEFAULT NULL COMMENT '0=conversational, 1=fluent, 2=bilingual',
  `hourly_rate` int(11) DEFAULT NULL,
  `freelance_profile` longtext DEFAULT NULL,
  `linkdin_profile` varchar(150) DEFAULT NULL,
  `github_profile` varchar(150) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_master`
--

INSERT INTO `user_master` (`id`, `first_name`, `last_name`, `email`, `password`, `contact_number`, `type`, `skype_id`, `address`, `country_id`, `country_name`, `state_id`, `state_name`, `country_code`, `state_code`, `city_id`, `city_name`, `english_level`, `hourly_rate`, `freelance_profile`, `linkdin_profile`, `github_profile`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Jenish', '', 'jenish@gmail.com', '$2a$11$/8Dp7h4AAE2oElNmwmi1s.mzQzMqkrPl3xZyBSieEHmUhzKAgToA6', NULL, 0, NULL, 'Rajkot', NULL, NULL, NULL, NULL, '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-06-15 12:47:16', '2023-06-20 14:49:09', '2023-06-29 14:49:06'),
(4, 'Jenish', '', 'jenishshekhaliya@gmail.com', '$2a$11$TdVixOPab8vbUbM0lDGZHe/Lju0xBlMGuxFQzcEf.M7uZZuf88gg6', NULL, 1, 'live:123', 'Rajkot', NULL, NULL, NULL, NULL, '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-06-20 14:49:33', NULL, NULL),
(5, 'Jenish', '', 'jenish@gmail.com', '$2a$11$yw6lRGnrlapVVgrqo/R18OZTQDQQsMASLdYREdXlTBUpN3jXMNQkW', NULL, 0, 'live;', 'Rajkot', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 0, 14, 'https', 'https', 'https', '2023-06-20 14:51:52', NULL, NULL),
(9, 'Jenish', 'patel', 'jenishpatel@gmail.com', '$2a$11$dNdy94west4eYwBHUBcfV.WZmStMKXnIqEbr9fmoUr3rgdeR4IFIm', NULL, 1, 'live:123', 'Rajkot', 1, 'India', 2, 'Gujarat', 'IN', 'GJ', 3, 'Rajkot', NULL, NULL, NULL, 'http', NULL, '2023-06-24 04:57:42', NULL, NULL),
(10, 'Jenish', 'patel', 'jenish10@gmail.com', '$2a$11$r/souvDe1ect3BC7BxO/0eQul0WS8iLeCF1JA/pr2FbbcIXsJmMpu', NULL, 0, 'live;', 'Rajkot', 1, 'India', 2, 'Gujarat', 'IN', 'GJ', 3, 'Rajkot', 0, 14, 'https', NULL, 'https', '2023-06-24 04:58:13', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_master`
--
ALTER TABLE `admin_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `frameworks`
--
ALTER TABLE `frameworks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `freelance_experience`
--
ALTER TABLE `freelance_experience`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_framework_id` (`framework_id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_project_user_id` (`user_id`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timzones`
--
ALTER TABLE `timzones`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_master`
--
ALTER TABLE `user_master`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_master`
--
ALTER TABLE `admin_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `frameworks`
--
ALTER TABLE `frameworks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `freelance_experience`
--
ALTER TABLE `freelance_experience`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `timzones`
--
ALTER TABLE `timzones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_master`
--
ALTER TABLE `user_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `freelance_experience`
--
ALTER TABLE `freelance_experience`
  ADD CONSTRAINT `fk_framework_id` FOREIGN KEY (`framework_id`) REFERENCES `frameworks` (`id`),
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_master` (`id`);

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `fk_project_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_master` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
