-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2025 at 04:28 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yar_ims_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(255) NOT NULL,
  `category_type` varchar(255) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_type`, `category_name`) VALUES
(1, 'Tools And Equipment', 'Angle Grinder'),
(2, 'Tools and Equipments', 'Welding Machine'),
(3, 'Vehicle', 'Truck');

-- --------------------------------------------------------

--
-- Table structure for table `consumables`
--

CREATE TABLE `consumables` (
  `id` int(11) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `tag` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `minStock` int(11) NOT NULL,
  `unit` varchar(50) NOT NULL,
  `location` varchar(255) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `status` varchar(50) NOT NULL DEFAULT 'In Stock',
  `qr` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consumables`
--

INSERT INTO `consumables` (`id`, `picture`, `tag`, `name`, `quantity`, `minStock`, `unit`, `location`, `date`, `status`, `qr`, `category`) VALUES
(33, '1745748191151-692231350.jfif', ' asd', ' asd', 1, 2, 'pcs', ' ad', '2025-04-27', 'In Stock', '', ' asd');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `manager` varchar(255) DEFAULT NULL,
  `person_in_charge` varchar(255) DEFAULT NULL,
  `tools_equipment_used` text DEFAULT NULL,
  `consumables_used` text DEFAULT NULL,
  `vehicles_used` text DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` enum('Ongoing','Completed','Upcoming') DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `creator` varchar(100) DEFAULT 'Yard Admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `manager`, `person_in_charge`, `tools_equipment_used`, `consumables_used`, `vehicles_used`, `start_date`, `end_date`, `status`, `remarks`, `creator`) VALUES
(19, 'Sample ', 'Edan', 'Edan ', 'Makita Angle Grinder ', ' asd', 'Fortuner', '2025-04-26', '2025-04-28', 'Upcoming', NULL, 'Yard Admin');

-- --------------------------------------------------------

--
-- Table structure for table `tools`
--

CREATE TABLE `tools` (
  `id` int(11) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `tag` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `warranty` date DEFAULT NULL,
  `status` varchar(100) DEFAULT 'Available',
  `remarks` text DEFAULT NULL,
  `qr` mediumtext DEFAULT NULL,
  `qr_code_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tools`
--

INSERT INTO `tools` (`id`, `picture`, `name`, `brand`, `category`, `tag`, `description`, `purchase_date`, `warranty`, `status`, `remarks`, `qr`, `qr_code_id`) VALUES
(81, 'Makita.jpg ', 'Makita Angle Grinder ', 'Makita ', 'Angle Grinder ', 'EXC-101', 'MATIBAY', '2025-04-26', '2025-04-27', 'Available', 'goods ', 'TOOL-8ce16b26-773f-4b92-a3d9-15ccb6ca6bbf.png', 'TOOL-8ce16b26-773f-4b92-a3d9-15ccb6ca6bbf'),
(82, '1745806872334-842461458.jpg', 'Excavator', 'JASMINE ', 'Tools', 'TAM-728', 'MATIBAY', '2025-04-27', '2025-04-27', 'Available', 'goods ', 'TOOL-5f4d6933-8f6c-4b40-9868-3cae062fb13d.png', 'TOOL-5f4d6933-8f6c-4b40-9868-3cae062fb13d');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(100) NOT NULL,
  `profile` varchar(300) NOT NULL,
  `status` varchar(255) NOT NULL,
  `date_created` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `profile`, `status`, `date_created`) VALUES
(1, 'Admin', 'admin', '$2a$10$ysgopAQfZawXdZ1g/FR14.H6AHlM9WXN3b8xgFumPfCslOuggBGrC', 'Admin', '', 'Active', '0000-00-00'),
(3, 'Staff', 'staff@gmail.com', '$2a$10$HubgO1cxr6VuWG1/ckSXm.j/C1CAHT7IvcnCRaO5Xq5SD/4FWinmm', 'Staff', '', 'Active', '0000-00-00'),
(4, 'Nolly Alvarado', 'nolly@gmail.com', '$2a$10$1w0n9/8yC97EtQdzZIOarelAVOfrvIPrF.Pxk2CQRXDlQ26O9C.Q6', 'Staff', '', 'Active', '0000-00-00'),
(5, 'Angelo Padilla', 'angelo@gmail.com', '$2a$10$P6q/ONJd9m7bMzfwD4TMJugPFtP2apWKyeb478CMy/isNN3oYTgMK', 'Admin', '', 'Active', '0000-00-00'),
(6, 'ronald', 'ronald', '$2b$10$7klWLslBs8v6VKC66VCEke8iYJ09YzakllcEfPHnuTh.yQ.SuNTSu', 'Admin', '', 'Active', '2025-04-27'),
(7, 'edan', 'edan', '$2b$10$OKOLZJ8/A/O0.E8xehH3XuYJmFj4t0q8Gtdt3G2ACaz8kKdCHqNsW', 'Admin', '', 'Active', '2025-04-28'),
(8, 'ghelo', 'ghelo', '$2b$10$aQxt8l2f5b1ssbijGdAqheLW1.Hd05abzpMlyTXOuOMvESXNHH49.', 'Staff', '', 'Active', '2025-04-28'),
(9, 'jestro', 'jestro', '$2b$10$t0MxpvHUfh9DX6opn7zPDescw3O6h/ChtyOnISu3qPB5lSH6bNnDG', 'Admin', '', 'Active', '2025-04-28'),
(10, 'ronaldjr', 'ronaldjr', '$2b$10$chCU3FQeSgVSXaFjJNh/IefjvfIcloriWOH/WI29N97mjEKwQ7I8e', 'Admin', '', 'Active', '2025-04-28');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `plate_no` varchar(20) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `fuel_type` varchar(50) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `acquisition_date` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `maintenance_due` date DEFAULT NULL,
  `assigned_driver` varchar(100) DEFAULT NULL,
  `qr` varchar(255) DEFAULT NULL,
  `warranty` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `picture`, `name`, `brand`, `plate_no`, `category`, `fuel_type`, `location`, `acquisition_date`, `status`, `remarks`, `maintenance_due`, `assigned_driver`, `qr`, `warranty`) VALUES
(22, '1745748467998-903997280.jfif', 'Fortuner', 'Toyota', '671UIE', 'kotse', 'Diesel', 'qc', '2025-04-26', 'Available', 'goods ', '2025-04-26', 'Ronald', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKWSURBVO3BQW7sWAwEwSxC979yzl9y9QBB6rbNYUT8hzVGsUYp1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxRLh5KwjepdEnoVLok3KHSJeGbVJ4o1ijFGqVYo1y8TOVNSXhC5SQJd6i8KQlvKtYoxRqlW', '2025-04-26'),
(23, '1745799526463-490888521.jpg', 'L300', 'Toyota', '671UIE', 'Vehicles', 'Diesel', 'qc', '2025-04-27', 'Available', 'Heavy equipment for digging', '2025-04-27', 'Ronald', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKdSURBVO3BQW7kQAwEwUxC//9yrY88NSBIM14TjDA/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4iGVb0pCp9Il4Q6VLgmdyjcl4YlijVKsUYo1ysXLkvAmlTtUuiR0Kk8k4U0qbyrWKMUap', '2025-04-27'),
(24, '1745804447208-11234666.jpg', 'Innova', 'Toyota', '671UIE', 'Vehicles', 'Diesel', 'qc', '2025-04-27', 'Available', 'goods ', '2025-04-27', 'Ronald', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKtSURBVO3BQY7cQAwEwSxC//9yeo88NSBIM/bSjIg/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4qEkfJNKl4QTlS4JJypdEr5J5YlijVKsUYo1ysXLVN6UhDtUPknlTUl4U7FGKdYoxRrl4', '2025-04-27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `consumables`
--
ALTER TABLE `consumables`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tools`
--
ALTER TABLE `tools`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `consumables`
--
ALTER TABLE `consumables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tools`
--
ALTER TABLE `tools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
