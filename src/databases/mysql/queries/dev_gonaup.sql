-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 14, 2023 at 04:12 PM
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
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `company_name` varchar(50) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `linkdin_profile` varchar(100) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `tageline` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `company_name`, `position`, `linkdin_profile`, `size`, `website`, `tageline`, `description`, `created_at`, `updated_at`, `deleted_at`, `user_id`) VALUES
(2, 'SkyFort', 'Sr. Software Developer', 'https://linkdin.com', 1, 'https://skypfort.com', NULL, NULL, '2023-07-04 18:14:08', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `freelancer_education`
--

CREATE TABLE `freelancer_education` (
  `id` int(11) NOT NULL,
  `school` varchar(50) NOT NULL,
  `degree` varchar(50) NOT NULL,
  `study_in` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `date_from` int(4) NOT NULL,
  `date_to` int(4) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `freelancer_education`
--

INSERT INTO `freelancer_education` (`id`, `school`, `degree`, `study_in`, `description`, `date_from`, `date_to`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Darshan', 'Bachelor', 'Computer', 'Software Engineering', 2018, 2022, 1, '2023-07-01 18:43:30', '2023-07-02 10:53:54', '2023-07-02 10:53:54'),
(2, 'Darshan', 'Bachelor', 'Computer', 'Software Eng.', 2018, 2022, 2, '2023-07-01 18:43:46', '2023-07-13 06:07:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `freelancer_experience`
--

CREATE TABLE `freelancer_experience` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `company` varchar(50) NOT NULL,
  `country_id` int(11) DEFAULT NULL,
  `country_code` varchar(10) DEFAULT NULL,
  `country_name` varchar(20) DEFAULT NULL,
  `city_name` varchar(20) DEFAULT NULL,
  `is_working` tinyint(1) NOT NULL DEFAULT 0,
  `working_from` date DEFAULT NULL,
  `working_to` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `freelancer_experience`
--

INSERT INTO `freelancer_experience` (`id`, `title`, `company`, `country_id`, `country_code`, `country_name`, `city_name`, `is_working`, `working_from`, `working_to`, `description`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Sr. Software Developer', 'Agn', 99, 'IN', 'India', 'Rajkot', 0, '2022-02-02', '2022-06-02', 'I\'m Good Dev', 1, '2023-07-02 11:20:21', '2023-07-02 11:43:00', '2023-07-02 11:43:00'),
(2, 'Sr. Software Dev', 'Agn', 99, 'IN', 'India', 'Rajkot', 1, '2022-02-02', NULL, 'I\'m Good Dev', 2, '2023-07-02 11:43:21', '2023-07-13 06:07:17', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `freelancer_projects`
--

CREATE TABLE `freelancer_projects` (
  `id` int(11) NOT NULL,
  `project_image_url` varchar(255) DEFAULT NULL,
  `title` varchar(50) NOT NULL,
  `project_url` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `skills` varchar(100) DEFAULT NULL,
  `date_from` date DEFAULT NULL,
  `date_to` date DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `freelancer_projects`
--

INSERT INTO `freelancer_projects` (`id`, `project_image_url`, `title`, `project_url`, `description`, `skills`, `date_from`, `date_to`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, NULL, 'The-Dron-Projects', 'https', 'The Dron Project: For Dron Sells Management ', '1,2,3,4', '2022-02-03', '2023-02-02', 1, '2023-07-02 12:13:53', '2023-07-02 12:31:00', '2023-07-02 12:31:00'),
(2, NULL, 'The Hero Projects', 'https', 'The Hero Project: For Fashion Clothes Sells Management ', '1,2,3,4', '2022-02-03', '2023-02-02', 1, '2023-07-02 12:30:46', NULL, NULL),
(3, 'portfolio-3cecc0f5-619b-4284-aed9-d22a0ba20997.png', 'The-Dron-Projects', 'https', 'The Dron Project: For Dron Sells Management', '1,2,3,4', '2022-02-03', '2023-02-02', 2, '2023-07-04 06:32:42', '2023-07-13 06:07:10', NULL),
(4, '', 'The Hero Projects', 'https', 'The Hero Project: For Fashion Clothes Sells Management', '1,2,3,4', '2022-02-03', '2023-02-02', 1, '2023-07-04 06:44:21', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hiring_records`
--

CREATE TABLE `hiring_records` (
  `id` int(11) NOT NULL,
  `status` int(2) DEFAULT NULL COMMENT '0=invited,1=interested,2=suggested,3=hired',
  `suggested_rate` int(11) DEFAULT NULL,
  `final_rate` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `job_id` int(11) DEFAULT NULL,
  `hired_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_post`
--

CREATE TABLE `job_post` (
  `id` int(11) NOT NULL,
  `job_role` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `hourly_rate` int(3) NOT NULL,
  `skills` varchar(100) DEFAULT NULL,
  `step_status` int(2) NOT NULL DEFAULT 1,
  `experience_needed` int(2) DEFAULT NULL COMMENT '	0=entry,1=intermediate,2=expert',
  `project_duration` int(2) DEFAULT NULL COMMENT '0=less than month,1=1-3,3=3-6,6= more then 6 month',
  `hour_per_week` int(2) DEFAULT NULL COMMENT '0=not-sure,1=less then 30,2=more then 30',
  `job_status` int(1) NOT NULL DEFAULT 0 COMMENT '0=open,1=closed',
  `company_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_post`
--

INSERT INTO `job_post` (`id`, `job_role`, `description`, `hourly_rate`, `skills`, `step_status`, `experience_needed`, `project_duration`, `hour_per_week`, `job_status`, `company_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Jr. Software Dev', 'description', 20, '1,2', 3, 1, 1, 1, 0, 2, '2023-07-11 05:29:59', '2023-07-11 05:45:52', NULL);

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
  `min_hourly_budget` int(3) DEFAULT NULL,
  `max_hourly_budget` int(3) DEFAULT NULL,
  `skills` varchar(100) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `step_status` int(2) NOT NULL DEFAULT 1,
  `hour_per_week` int(2) DEFAULT NULL COMMENT '0=not-sure,1=less then 30,2=more then 30',
  `experience_needed` int(2) DEFAULT NULL COMMENT '0=entry,1=intermediate,2=expert',
  `project_duration` int(11) DEFAULT NULL COMMENT '0=less than month,1=1-3,3=3-6,6= more then 6 month',
  `english_level` int(11) DEFAULT NULL COMMENT '0=conversational, 1=fluent, 2=bilingual',
  `project_status` int(11) DEFAULT 0 COMMENT '0=open,1=closed',
  `commission` int(11) NOT NULL DEFAULT 0,
  `hiring_status` int(2) DEFAULT NULL COMMENT '0=invited,1=interested,2=suggested,3=hired',
  `contract_status` int(2) NOT NULL DEFAULT 0 COMMENT '0=pending,1=open,2=closed',
  `assigned_user` varchar(100) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `published_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `description`, `budget_type`, `fixed_budget`, `min_hourly_budget`, `max_hourly_budget`, `skills`, `service_id`, `step_status`, `hour_per_week`, `experience_needed`, `project_duration`, `english_level`, `project_status`, `commission`, `hiring_status`, `contract_status`, `assigned_user`, `company_id`, `published_at`, `created_at`, `updated_at`, `deleted_at`) VALUES
(2, 'test', 'test 2', 1, NULL, 10, 15, '1,2,3', 1, 5, 1, 1, 1, NULL, 0, 0, NULL, 0, NULL, 2, '2023-07-06 11:59:08', '2023-07-05 06:10:03', '2023-07-10 05:15:24', NULL),
(3, 'test', 'test 2', 1, NULL, 10, 15, '1,2,3', 1, 3, 1, 1, 1, NULL, 0, 0, NULL, 0, NULL, 2, NULL, '2023-07-05 06:10:03', '2023-07-10 05:19:44', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Web Development', '2023-07-03 06:12:06', NULL, NULL),
(2, 'Mobile Application Developement', '2023-07-14 06:19:35', '2023-07-14 06:24:42', '2023-07-14 06:24:42');

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
(1, 'ReactJS', '2023-06-18 08:30:21', NULL, NULL),
(2, 'NodeJS', '2023-06-24 17:44:55', '2023-06-24 17:47:14', '2023-06-24 17:47:14'),
(3, 'NodeJS', '2023-06-24 17:48:16', NULL, NULL);

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
  `image_url` varchar(255) DEFAULT NULL,
  `contact_number` varchar(15) DEFAULT NULL,
  `type` int(11) DEFAULT NULL COMMENT '0=freelancer,1=client,2=recruiter',
  `skype_id` varchar(50) DEFAULT NULL,
  `professional_role` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `country_name` varchar(20) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `state_name` varchar(20) DEFAULT NULL,
  `country_code` varchar(10) DEFAULT NULL,
  `state_code` varchar(10) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `city_name` varchar(20) DEFAULT NULL,
  `zip_code` int(11) DEFAULT NULL,
  `english_level` int(11) DEFAULT NULL COMMENT '0=conversational, 1=fluent, 2=bilingual',
  `hourly_rate` int(11) DEFAULT NULL,
  `freelance_profile` varchar(150) DEFAULT NULL,
  `linkdin_profile` varchar(150) DEFAULT NULL,
  `github_profile` varchar(150) DEFAULT NULL,
  `services_offer` varchar(150) DEFAULT NULL,
  `skills` varchar(150) DEFAULT NULL,
  `signup_completed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_master`
--

INSERT INTO `user_master` (`id`, `first_name`, `last_name`, `email`, `password`, `image_url`, `contact_number`, `type`, `skype_id`, `professional_role`, `description`, `address`, `country_id`, `country_name`, `state_id`, `state_name`, `country_code`, `state_code`, `city_id`, `city_name`, `zip_code`, `english_level`, `hourly_rate`, `freelance_profile`, `linkdin_profile`, `github_profile`, `services_offer`, `skills`, `signup_completed`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Jenish', 'S', 'jenishpatel1@gmail.com', '$2a$11$VordPk3KO15D0dnxIR0ah..TvTL8e3X/SR94NiNSvaLZNBjAF8ogu', 'user-490d93fe-a018-4352-8517-b23947f49bc5.jpeg', '1234567890', 0, 'live:skpe', 'Sr. Software Eng.', 'My Description', '240-street', 99, 'India', 34, 'Gujarat', 'IN', 'GJ', 39, 'Rajkot', 360009, NULL, 20, 'https', 'https', 'https', '1,2,3', '1,2,3', 1, '2023-07-01 17:08:17', '2023-07-12 14:45:21', NULL),
(2, 'Jenish', 'patel', 'jenish101@gmail.com', '$2a$11$IhLQ76zebuDPw52xkn9IUuSzPcozB.RJhVKTFIlXk/tfG1EELZt5i', NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2023-07-10 06:42:50', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_master`
--
ALTER TABLE `admin_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_client_id` (`user_id`);

--
-- Indexes for table `freelancer_education`
--
ALTER TABLE `freelancer_education`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_education_user_id` (`user_id`);

--
-- Indexes for table `freelancer_experience`
--
ALTER TABLE `freelancer_experience`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_experience_user_id` (`user_id`);

--
-- Indexes for table `freelancer_projects`
--
ALTER TABLE `freelancer_projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_freelancer_project_user_id` (`user_id`);

--
-- Indexes for table `hiring_records`
--
ALTER TABLE `hiring_records`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_hiring_user_id` (`user_id`),
  ADD KEY `fk_hiring_job_id` (`job_id`),
  ADD KEY `fk_hiring_project_id` (`project_id`);

--
-- Indexes for table `job_post`
--
ALTER TABLE `job_post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_job_post_company_id` (`company_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_company_id` (`company_id`),
  ADD KEY `fk_project_service_id` (`service_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `freelancer_education`
--
ALTER TABLE `freelancer_education`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `freelancer_experience`
--
ALTER TABLE `freelancer_experience`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `freelancer_projects`
--
ALTER TABLE `freelancer_projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hiring_records`
--
ALTER TABLE `hiring_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_post`
--
ALTER TABLE `job_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `timzones`
--
ALTER TABLE `timzones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_master`
--
ALTER TABLE `user_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `fk_client_id` FOREIGN KEY (`user_id`) REFERENCES `user_master` (`id`);

--
-- Constraints for table `freelancer_education`
--
ALTER TABLE `freelancer_education`
  ADD CONSTRAINT `fk_education_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_master` (`id`);

--
-- Constraints for table `freelancer_experience`
--
ALTER TABLE `freelancer_experience`
  ADD CONSTRAINT `fk_experience_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_master` (`id`);

--
-- Constraints for table `freelancer_projects`
--
ALTER TABLE `freelancer_projects`
  ADD CONSTRAINT `fk_freelancer_project_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_master` (`id`);

--
-- Constraints for table `hiring_records`
--
ALTER TABLE `hiring_records`
  ADD CONSTRAINT `fk_hiring_job_id` FOREIGN KEY (`job_id`) REFERENCES `job_post` (`id`),
  ADD CONSTRAINT `fk_hiring_project_id` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  ADD CONSTRAINT `fk_hiring_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_master` (`id`);

--
-- Constraints for table `job_post`
--
ALTER TABLE `job_post`
  ADD CONSTRAINT `fk_job_post_company_id` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`);

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `fk_company_id` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  ADD CONSTRAINT `fk_project_service_id` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
