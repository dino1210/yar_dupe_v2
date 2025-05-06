-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2025 at 03:30 PM
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
  `category` varchar(255) DEFAULT NULL,
  `added_by` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consumables`
--

INSERT INTO `consumables` (`id`, `picture`, `tag`, `name`, `quantity`, `minStock`, `unit`, `location`, `date`, `status`, `qr`, `category`, `added_by`, `created_at`) VALUES
(1, '1745822603388-364008207.jpg', ' DISC-002', 'Cutting Disc 4\" 2.5mm', 0, 20, 'pcs', ' Rack 3-Drawer 11', '2025-04-28', 'No Stock', '', ' Cutting Disk', NULL, '2025-05-03 22:41:15'),
(2, '1745822713321-485494957.jpg', ' DBIT-006', ' Drill Bit Steel 1/2', 2, 3, 'pcs', ' Rack 3-Drawer 17', '2025-04-28', 'Low Stock', '', ' Drill Bit', NULL, '2025-05-03 22:41:15'),
(4, '1745823073022-335597718.jpg', ' CLMP-006', ' Metal Clamp 2\" 2 Holes Fab', 6, 5, 'pcs', 'Rcabinet-Drawer 3', '2025-04-28', 'In Stock', '', ' Metal Clamp', NULL, '2025-05-03 22:41:15'),
(8, '1745987401853-34847443.png', ' test', ' stest', 0, 6, 'kg', ' manila', '2025-04-30', 'In Stock', '', ' test', NULL, '2025-05-03 22:41:15'),
(9, '1746088437828-377720996.png', 'SADFASDF', ' SDASD', 12, 12, 'bottles', ' ASDSA', '2025-05-01', 'In Stock', '', 'VDSFDSF', NULL, '2025-05-03 22:41:15'),
(10, '1746287453230-635894386.jfif', 'ronald', ' Ronald', 12, 12, 'ml', ' ASDSA', '2025-05-03', 'In Stock', '', 'ronald', 'Unknown', '2025-05-03 23:50:53'),
(11, '1746287764053-492603736.jfif', ' SDASD', ' SADSA', 21, 123, 'ml', ' ASDSA', '2025-05-03', 'In Stock', '', ' SDSA', 'Unknown', '2025-05-03 23:56:04'),
(12, '1746348303820-780261424.jfif', ' ASD', ' ASD', 121, 121, 'kg', ' ASDSA', '2025-05-04', 'In Stock', '', ' SAD', 'undefined', '2025-05-04 16:45:03');

-- --------------------------------------------------------

--
-- Table structure for table `consumables_logs`
--

CREATE TABLE `consumables_logs` (
  `id` int(11) NOT NULL,
  `consumable_name` varchar(255) NOT NULL,
  `performed_by` varchar(255) NOT NULL,
  `issued_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consumables_logs`
--

INSERT INTO `consumables_logs` (`id`, `consumable_name`, `performed_by`, `issued_date`, `status`) VALUES
(47, ' Drill Bit Steel 1/2', 'NOBODY', '2025-05-02 00:22:36', 'Issued Out'),
(48, ' Metal Clamp 2\" 2 Holes Fab', 'NOBODY', '2025-05-02 00:22:36', 'Issued Out'),
(49, 'Drill Bit Steel 1/2', 'NOBODY', '2025-05-02 00:23:08', 'Returned'),
(50, 'Metal Clamp 2\" 2 Holes Fab', 'NOBODY', '2025-05-02 00:23:08', 'Returned'),
(51, ' Drill Bit Steel 1/2', 'hello', '2025-05-02 00:26:35', 'Returned'),
(52, 'Drill Bit Steel 1/2', 'hello', '2025-05-02 00:26:42', 'Returned'),
(53, 'Cutting Disc 4\" 2.5mm', 'sample', '2025-05-02 00:32:08', 'Returned'),
(54, 'Cutting Disc 4\" 2.5mm', 'sample', '2025-05-03 16:09:14', 'Returned'),
(55, 'Cutting Disc 4\" 2.5mm', 'testing ', '2025-05-04 17:54:21', 'Returned'),
(56, 'Cutting Disc 4\" 2.5mm', 'testing ', '2025-05-04 17:54:57', 'Returned'),
(57, ' Drill Bit Steel 1/2', 'testing 2', '2025-05-04 17:55:38', 'Returned'),
(58, 'Drill Bit Steel 1/2', 'testing 2', '2025-05-04 17:57:51', 'Returned'),
(59, 'Cutting Disc 4\" 2.5mm', 'testing', '2025-05-04 20:56:23', 'Issued Out'),
(60, 'Cutting Disc 4\" 2.5mm', 'testing', '2025-05-04 20:56:23', 'Issued Out'),
(61, 'Cutting Disc 4\" 2.5mm', 'testing', '2025-05-04 20:56:23', 'Issued Out'),
(62, 'Cutting Disc 4\" 2.5mm', 'testing', '2025-05-04 20:56:23', 'Issued Out'),
(63, 'Cutting Disc 4\" 2.5mm', 'testing', '2025-05-04 20:56:23', 'Issued Out'),
(64, 'Cutting Disc 4\" 2.5mm', 'testing', '2025-05-04 20:56:23', 'Issued Out'),
(65, 'Cutting Disc 4\" 2.5mm', 'testing', '2025-05-04 20:56:23', 'Issued Out'),
(66, 'Cutting Disc 4\" 2.5mm', 'testing', '2025-05-04 20:56:23', 'Issued Out'),
(67, 'Cutting Disc 4\" 2.5mm', 'testing', '2025-05-04 20:56:41', 'Returned'),
(68, 'Cutting Disc 4\" 2.5mm', 'testing', '2025-05-04 20:56:41', 'Returned'),
(69, 'Cutting Disc 4\" 2.5mm', 'testing', '2025-05-04 20:56:41', 'Returned'),
(70, 'Cutting Disc 4\" 2.5mm', 'testing', '2025-05-04 20:56:41', 'Returned'),
(71, 'Cutting Disc 4\" 2.5mm', 'RONALD', '2025-05-04 21:03:29', 'Issued Out'),
(72, 'Cutting Disc 4\" 2.5mm', 'RONALD', '2025-05-04 21:03:29', 'Issued Out'),
(73, ' Drill Bit Steel 1/2', 'RONALD', '2025-05-04 21:03:29', 'Issued Out'),
(74, 'Cutting Disc 4\" 2.5mm', 'RONALD', '2025-05-04 21:03:45', 'Returned'),
(75, 'Drill Bit Steel 1/2', 'RONALD', '2025-05-04 21:03:45', 'Returned');

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
  `status` enum('Ongoing','Completed','Upcoming','Cancelled') DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `creator` varchar(100) DEFAULT 'Yard Admin',
  `location` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `manager`, `person_in_charge`, `tools_equipment_used`, `consumables_used`, `vehicles_used`, `start_date`, `end_date`, `status`, `remarks`, `creator`, `location`) VALUES
(118, 'testing ', 'Itchoy', 'testing ', 'Dartek Angle Grinder', 'Cutting Disc 4\" 2.5mm', 'Hino Dump Truck', '2025-05-03', '2025-05-04', 'Completed', NULL, 'Yard Admin', 'testing '),
(119, 'testing 2', 'Itchoy', 'testing 2', 'Contender Welding Machine', ' Drill Bit Steel 1/2', 'Hino Dump Truck', '2025-05-03', '2025-05-04', 'Cancelled', NULL, 'Yard Admin', 'testing 2'),
(121, 'testing', 'Itchoy', 'testing', 'Makita Nail Gun', 'Cutting Disc 4\" 2.5mm,Cutting Disc 4\" 2.5mm,Cutting Disc 4\" 2.5mm,Cutting Disc 4\" 2.5mm', 'Isuzu Giga Crane Truck', '2025-05-03', '2025-05-04', 'Completed', NULL, 'Yard Admin', 'wqe'),
(122, 'LAST TESTING  ', 'Itchoy', 'RONALD', 'Welding Mask', 'Cutting Disc 4\" 2.5mm, Drill Bit Steel 1/2', 'Hino Dump Truck', '2025-05-03', '2025-05-04', 'Completed', NULL, 'Yard Admin', 'MAKATI'),
(123, 'LAST AGAIN ', 'Itchoy', 'LAST AGAIN ', '', '', '', '2025-05-04', '2025-05-05', 'Ongoing', NULL, 'Yard Admin', 'LAST ');

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
  `added_by` varchar(255) DEFAULT NULL,
  `qr` mediumtext DEFAULT NULL,
  `qr_code_id` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tools`
--

INSERT INTO `tools` (`id`, `picture`, `name`, `brand`, `category`, `tag`, `description`, `purchase_date`, `warranty`, `status`, `remarks`, `added_by`, `qr`, `qr_code_id`, `created_at`) VALUES
(2, '1745821628548-538938628.jpg', 'Dartek Angle Grinder', 'Dartek', 'Angle Grinder', 'POWER-ANGLGRNDR_DARTEK-1', 'Rated Input Power, 760W. No-Load Speed, 11500r/min. Max Wheel Diameter, 100mm. Hole Diameter of Wheel, 16mm.', '2025-03-24', '2025-04-17', 'Available', 'repaired done', NULL, 'TOOL-cadb0389-23f2-4702-a5a8-1ece4decfc9c.png', 'TOOL-cadb0389-23f2-4702-a5a8-1ece4decfc9c', '2025-05-03 22:41:15'),
(4, '1745821991819-726796547.jpg', 'Makita Nail Gun', 'Makita', 'Nail Gun', 'POWER-NAILGUN_MKTA-1', 'Nail size capacity: 10-50mm (19/32\"-2\") Nail type: F15-F50 Gauge: 18 Operating pressure: 60-100psi', '2025-03-31', '2027-04-07', 'Available', 'Brand New', NULL, 'TOOL-344ede88-66df-4571-adca-79450032c487.png', 'TOOL-344ede88-66df-4571-adca-79450032c487', '2025-05-03 22:41:15'),
(5, '1745822173903-752629888.jpg', 'Welding Mask', 'Generic', 'Welding Mask', 'OTHERS-WLDGMASK-1', 'equipped with #12 Dark Glass for safety', '2025-03-29', '2025-04-06', 'Available', '\"repaired done\"', NULL, 'TOOL-4b262466-e3ba-40b2-ae32-1418627ce760.png', 'TOOL-4b262466-e3ba-40b2-ae32-1418627ce760', '2025-05-03 22:41:15'),
(14, '1745999669151-570661796.jpg', 'Makita Angle Grinder ', 'makita', 'Grinder', '123456', 'test', '2025-03-29', '2025-05-02', 'Available', 'Brand New', NULL, 'TOOL-5f96b978-7e02-4e8d-aa2e-a050e3d8d55b.png', 'TOOL-5f96b978-7e02-4e8d-aa2e-a050e3d8d55b', '2025-05-03 22:41:15');

-- --------------------------------------------------------

--
-- Table structure for table `tools_logs`
--

CREATE TABLE `tools_logs` (
  `id` int(11) NOT NULL,
  `tool_tag` varchar(100) DEFAULT NULL,
  `tool_name` varchar(255) DEFAULT NULL,
  `performed_by` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `issued_date` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tools_logs`
--

INSERT INTO `tools_logs` (`id`, `tool_tag`, `tool_name`, `performed_by`, `location`, `issued_date`, `status`) VALUES
(50, NULL, 'Contender Welding Machine', 'NOBODY', NULL, '2025-05-02 00:22:36', 'Issued Out'),
(51, NULL, 'Contender Welding Machine', 'NOBODY', 'MAKATI', '2025-05-02 00:23:08', 'Returned'),
(52, NULL, 'Dartek Angle Grinder', 'hello', NULL, '2025-05-02 00:26:35', 'Issued Out'),
(53, NULL, 'Dartek Angle Grinder', 'hello', 'hello', '2025-05-02 00:26:42', 'Returned'),
(54, NULL, 'Contender Welding Machine', 'sample', NULL, '2025-05-02 00:32:08', 'Issued Out'),
(55, NULL, 'Contender Welding Machine', 'sample', 'sample', '2025-05-03 16:09:14', 'Returned'),
(56, NULL, 'Dartek Angle Grinder', 'testing ', NULL, '2025-05-04 17:54:21', 'Issued Out'),
(57, NULL, 'Dartek Angle Grinder', 'testing ', 'testing ', '2025-05-04 17:54:57', 'Returned'),
(58, NULL, 'Contender Welding Machine', 'testing 2', NULL, '2025-05-04 17:55:38', 'Issued Out'),
(59, NULL, 'Contender Welding Machine', 'testing 2', 'testing 2', '2025-05-04 17:57:51', 'Returned'),
(60, NULL, 'Dartek Angle Grinder', '123', NULL, '2025-05-04 20:42:33', 'Issued Out'),
(61, NULL, 'Dartek Angle Grinder', '123', NULL, '2025-05-04 20:42:35', 'Issued Out'),
(62, NULL, 'Dartek Angle Grinder', '123', NULL, '2025-05-04 20:42:36', 'Issued Out'),
(63, NULL, 'Dartek Angle Grinder', '123', NULL, '2025-05-04 20:42:36', 'Issued Out'),
(64, NULL, 'Dartek Angle Grinder', '123', NULL, '2025-05-04 20:42:37', 'Issued Out'),
(65, NULL, 'Dartek Angle Grinder', '123', NULL, '2025-05-04 20:42:37', 'Issued Out'),
(66, NULL, 'Dartek Angle Grinder', '123', NULL, '2025-05-04 20:42:37', 'Issued Out'),
(67, NULL, 'Dartek Angle Grinder', '123', NULL, '2025-05-04 20:42:59', 'Issued Out'),
(68, NULL, 'Dartek Angle Grinder', '123', NULL, '2025-05-04 20:46:09', 'Issued Out'),
(69, NULL, 'Dartek Angle Grinder', '123', NULL, '2025-05-04 20:46:16', 'Issued Out'),
(70, NULL, 'Dartek Angle Grinder', '123', NULL, '2025-05-04 20:46:19', 'Issued Out'),
(71, NULL, 'Makita Nail Gun', 'testing', 'wqe', '2025-05-04 20:56:23', 'Issued Out'),
(72, NULL, 'Makita Nail Gun', 'testing', NULL, '2025-05-04 20:56:23', 'Issued Out'),
(73, NULL, 'Makita Nail Gun', 'testing', 'wqe', '2025-05-04 20:56:41', 'Returned'),
(74, NULL, 'Welding Mask', 'RONALD', 'MAKATI', '2025-05-04 21:03:29', 'Issued Out'),
(75, NULL, 'Welding Mask', 'RONALD', NULL, '2025-05-04 21:03:29', 'Issued Out'),
(76, NULL, 'Welding Mask', 'RONALD', 'MAKATI', '2025-05-04 21:03:45', 'Returned');

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
(3, 'Staff', 'staff', '$2a$10$HubgO1cxr6VuWG1/ckSXm.j/C1CAHT7IvcnCRaO5Xq5SD/4FWinmm', 'Staff', '', 'Active', '0000-00-00'),
(4, 'Manager', 'manager', '$2a$10$1zRRsugnSAyQP87QqIV9cuNIoVhbaV/CEP3bgnZ2zGkguu0.Y72EC', 'Manager', '', 'Active', '0000-00-00'),
(5, 'Angelo Padilla', 'angelo@gmail.com', '$2a$10$P6q/ONJd9m7bMzfwD4TMJugPFtP2apWKyeb478CMy/isNN3oYTgMK', 'Admin', '', 'Active', '0000-00-00'),
(6, 'ronald', 'ronald', '$2b$10$7klWLslBs8v6VKC66VCEke8iYJ09YzakllcEfPHnuTh.yQ.SuNTSu', 'Admin', '', 'Active', '2025-04-27'),
(7, 'edan', 'edan', '$2b$10$OKOLZJ8/A/O0.E8xehH3XuYJmFj4t0q8Gtdt3G2ACaz8kKdCHqNsW', 'Admin', '', 'Active', '2025-04-28'),
(8, 'ghelo', 'ghelo', '$2b$10$aQxt8l2f5b1ssbijGdAqheLW1.Hd05abzpMlyTXOuOMvESXNHH49.', 'Staff', '', 'Active', '2025-04-28'),
(9, 'jestro', 'jestro', '$2b$10$t0MxpvHUfh9DX6opn7zPDescw3O6h/ChtyOnISu3qPB5lSH6bNnDG', 'Admin', '', 'Active', '2025-04-28'),
(10, 'ronaldjr', 'ronaldjr', '$2b$10$chCU3FQeSgVSXaFjJNh/IefjvfIcloriWOH/WI29N97mjEKwQ7I8e', 'Admin', '', 'Active', '2025-04-28'),
(11, 'Test', 'test@gmail.com', '$2b$10$U8UmDZHrqrWMBbTva8QXj.CerWjePGPWXS/KiikC5KeIOkbL.sbBS', 'Admin', '', 'Active', '2025-04-30'),
(12, 'ronald', 'ronald', '$2b$10$mYEEsT85MOWVcKEG4ZaFR.BJNp3flF0RL49o1vqlshlPJEWx7mI8O', 'Admin', '', 'Active', '2025-04-30'),
(13, 'RonaldGwapo', 'ronaldjr', '$2b$10$WSB4f1pu0sWFJYKpI16eYOTgsMlvVwQ3KwGvjfW9n6xoU4qPiHKSi', 'Admin', '', 'Active', '2025-05-01'),
(14, 'Itchoy', 'itchoy', '$2b$10$UWTOXYc1x4I09I.rmJyBF.niDYq9tniQHtgo.9W7t0tGquS/AIcT.', 'Admin', '', 'Active', '2025-05-01');

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
  `warranty` varchar(255) DEFAULT NULL,
  `qr_code_id` varchar(255) NOT NULL,
  `added_by` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `tag` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `picture`, `name`, `brand`, `plate_no`, `category`, `fuel_type`, `location`, `acquisition_date`, `status`, `remarks`, `maintenance_due`, `assigned_driver`, `qr`, `warranty`, `qr_code_id`, `added_by`, `created_at`, `tag`) VALUES
(1, '1745827381363-558391668.jpg', 'Hino Dump Truck', 'Hino Motors', 'DMP-2345', 'Dump Truck', 'Diesel', 'Yar Main', '2021-04-13', 'Available', 'Brand New', '2025-04-25', 'Nolly Alvarado', 'VEHICLE-8e8b067a-1351-44e1-adf1-7b0e2741a2cb.png', '2025-04-22', 'VEHICLE-8e8b067a-1351-44e1-adf1-7b0e2741a2cb', NULL, '2025-05-03 22:41:15', NULL),
(2, '1745827714814-712914986.jpg', 'Isuzu Giga Crane Truck', 'Isuzu', 'CRN-6789', 'Crane Truck', 'Diesel', 'Yar Main', '2025-04-27', 'Available', 'Brand New', '2025-05-27', 'Angelo Padilla', 'VEHICLE-50ed45fc-4dc9-44d0-8682-a8f523bea291.png', '2026-04-27', 'VEHICLE-50ed45fc-4dc9-44d0-8682-a8f523bea291', NULL, '2025-05-03 22:41:15', NULL),
(3, '1745827872146-579794368.jpg', 'Mitsubishi Fuso Water Tanker', 'Mitsubishi', 'WTK-1122', 'Tanker Truck', 'Diesel', 'Main Warehouse', '2025-04-07', 'Available', 'Brand New', '2025-08-25', 'Jestro Maverick De Castro', 'VEHICLE-dc79ceea-11ad-49c6-9722-f55416ca149e.png', '2027-04-12', 'VEHICLE-dc79ceea-11ad-49c6-9722-f55416ca149e', NULL, '2025-05-03 22:41:15', NULL),
(4, '1745827984739-89621926.jpg', 'Hyundai HD320 Flatbed Truck', 'Hyundai', 'FLT-7788', 'Flatbed Truck', 'Diesel', 'Main Warehouse', '2023-04-11', 'Available', 'Brand New', '2025-09-04', 'Edan Raymunmo', 'VEHICLE-a3ff6853-4af3-4dc9-aceb-9a8470790dc2.png', '2028-04-27', 'VEHICLE-a3ff6853-4af3-4dc9-aceb-9a8470790dc2', NULL, '2025-05-03 22:41:15', NULL),
(5, '1745828075830-924813918.jpg', 'Foton Tornado Tipper Truck', 'Foton', 'TPR-3344', 'Tipper Truck', 'Diesel', 'Main Warehouse', '2025-04-14', 'Available', 'repaired done', '2025-09-26', 'Ronald Labrado', 'VEHICLE-f56a2adf-3b71-4820-b9ab-e0d5bef22288.png', '2026-04-13', 'VEHICLE-f56a2adf-3b71-4820-b9ab-e0d5bef22288', NULL, '2025-05-03 22:41:15', NULL),
(11, '1745987469099-997815354.jpg', 'testvec', 'testt', '123456789', 'qwertyui', 'Diesel', ' manila', '2025-04-10', 'Available', 'Brand New', '2025-04-21', 'wertyuiop', 'VEHICLE-784f508b-f14e-4922-b01c-7efd6fb44a0a.png', '2025-04-30', 'VEHICLE-784f508b-f14e-4922-b01c-7efd6fb44a0a', NULL, '2025-05-03 22:41:15', NULL),
(12, '1746088473513-123280844.png', 'ronadl', 'ronald', 'ronald', 'ronald', 'Gasoline', ' ASDSA', '2025-04-30', 'Available', 'Brand New', '2025-05-01', 'wertyuiop', 'VEHICLE-bcab0f21-0972-4c48-bcbc-626a6b070968.png', '2025-05-01', 'VEHICLE-bcab0f21-0972-4c48-bcbc-626a6b070968', NULL, '2025-05-03 22:41:15', NULL),
(13, '1746287830849-427568642.jfif', 'WEW', 'WQEWQE', 'WQEQW', 'WQEWQ', 'Gasoline', 'WEQW', '2025-05-02', 'Available', 'Brand New', '2025-05-02', 'wertyuiop', 'VEHICLE-0345eb39-6c86-4923-9c64-41e2f3c1f6e0.png', '2025-05-02', 'VEHICLE-0345eb39-6c86-4923-9c64-41e2f3c1f6e0', 'Unknown', '2025-05-03 23:57:10', NULL),
(14, '1746292329259-248788565.jfif', 'TITE', 'TITE', 'TITE', 'TITE', 'Gasoline', ' manila', '2025-05-03', 'Available', 'Brand New', '2025-05-04', 'wertyuiop', 'VEHICLE-fe72b287-7199-4afd-b539-9b6bcd7b7bf2.png', '2025-05-04', 'VEHICLE-fe72b287-7199-4afd-b539-9b6bcd7b7bf2', 'Unknown', '2025-05-04 01:12:09', NULL),
(15, '1746348261743-821276720.jfif', 'AD', 'SAD', 'ASDA', 'SADSA', 'Gasoline', 'SADSA', '2025-05-03', 'Available', 'Brand New', '2025-05-04', 'SAD', 'VEHICLE-ae4ee572-7273-4c94-8ec9-a196b4d439b2.png', '2025-05-04', 'VEHICLE-ae4ee572-7273-4c94-8ec9-a196b4d439b2', 'undefined', '2025-05-04 16:44:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vehicles_logs`
--

CREATE TABLE `vehicles_logs` (
  `id` int(11) NOT NULL,
  `vehicle_name` varchar(255) NOT NULL,
  `performed_by` varchar(100) DEFAULT NULL,
  `issued_date` datetime NOT NULL,
  `status` enum('Issued Out','Returned') DEFAULT 'Issued Out'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles_logs`
--

INSERT INTO `vehicles_logs` (`id`, `vehicle_name`, `performed_by`, `issued_date`, `status`) VALUES
(40, 'Hino Dump Truck', 'NOBODY', '2025-05-02 00:22:36', 'Issued Out'),
(41, 'Hino Dump Truck', 'NOBODY', '2025-05-02 00:23:08', 'Returned'),
(42, 'Hino Dump Truck', 'hello', '2025-05-02 00:26:35', 'Issued Out'),
(43, 'Hino Dump Truck', 'hello', '2025-05-02 00:26:42', 'Returned'),
(44, 'Hino Dump Truck', 'sample', '2025-05-02 00:32:08', 'Issued Out'),
(45, 'Hino Dump Truck', 'sample', '2025-05-03 16:09:14', 'Returned'),
(46, 'Hino Dump Truck', 'testing ', '2025-05-04 17:54:21', 'Issued Out'),
(47, 'Hino Dump Truck', 'testing ', '2025-05-04 17:54:57', 'Returned'),
(48, 'Hino Dump Truck', 'testing 2', '2025-05-04 17:55:38', 'Issued Out'),
(49, 'Hino Dump Truck', 'testing 2', '2025-05-04 17:57:51', 'Returned'),
(50, 'Hino Dump Truck', '123', '2025-05-04 20:42:33', 'Issued Out'),
(51, 'Hino Dump Truck', '123', '2025-05-04 20:42:35', 'Issued Out'),
(52, 'Hino Dump Truck', '123', '2025-05-04 20:42:36', 'Issued Out'),
(53, 'Hino Dump Truck', '123', '2025-05-04 20:42:36', 'Issued Out'),
(54, 'Hino Dump Truck', '123', '2025-05-04 20:42:37', 'Issued Out'),
(55, 'Hino Dump Truck', '123', '2025-05-04 20:42:37', 'Issued Out'),
(56, 'Hino Dump Truck', '123', '2025-05-04 20:42:37', 'Issued Out'),
(57, 'Hino Dump Truck', '123', '2025-05-04 20:42:59', 'Issued Out'),
(58, 'Hino Dump Truck', '123', '2025-05-04 20:46:09', 'Issued Out'),
(59, 'Hino Dump Truck', '123', '2025-05-04 20:46:16', 'Issued Out'),
(60, 'Hino Dump Truck', '123', '2025-05-04 20:46:19', 'Issued Out'),
(61, 'Isuzu Giga Crane Truck', 'testing', '2025-05-04 20:56:23', 'Issued Out'),
(62, 'Isuzu Giga Crane Truck', 'testing', '2025-05-04 20:56:23', 'Issued Out'),
(63, 'Isuzu Giga Crane Truck', 'testing', '2025-05-04 20:56:41', 'Returned'),
(64, 'Hino Dump Truck', 'RONALD', '2025-05-04 21:03:29', 'Issued Out'),
(65, 'Hino Dump Truck', 'RONALD', '2025-05-04 21:03:29', 'Issued Out'),
(66, 'Hino Dump Truck', 'RONALD', '2025-05-04 21:03:45', 'Returned');

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
-- Indexes for table `consumables_logs`
--
ALTER TABLE `consumables_logs`
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
-- Indexes for table `tools_logs`
--
ALTER TABLE `tools_logs`
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
-- Indexes for table `vehicles_logs`
--
ALTER TABLE `vehicles_logs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `consumables`
--
ALTER TABLE `consumables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `consumables_logs`
--
ALTER TABLE `consumables_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT for table `tools`
--
ALTER TABLE `tools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `tools_logs`
--
ALTER TABLE `tools_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `vehicles_logs`
--
ALTER TABLE `vehicles_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
