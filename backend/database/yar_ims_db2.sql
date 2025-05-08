-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2025 at 06:03 PM
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
-- Database: `yar_ims_db2`
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
(16, '1746518354037-889868581.jpg', 'CONS-PVCSEAL-001  ', 'Pipe Sealant', 12, 34, 'tubes', ' Rack 3-Drawer 11', '2025-05-06', 'In Stock', '', 'Yard Drainage Tool', 'Itchoy', '2025-05-06 15:59:14'),
(17, '1746518697066-263236673.jpg', 'CONS-PVCPRIME-002', 'PVC PRIMER', 5, 20, 'ml', ' Rack 3-Drawer 12', '2025-05-06', 'In Stock', '', 'Yard Drainage Tool', 'Itchoy', '2025-05-06 16:04:57'),
(18, '1746518841862-715775024.jpg', 'CONS-TAPE-004', 'PTFE Thread Seal Tape', 12, 30, 'pcs', ' Rack 3-Drawer 13', '2025-05-06', 'In Stock', '', 'Yard Drainage Tool', 'Itchoy', '2025-05-06 16:07:21'),
(19, '1746518986360-601221493.jpg', 'CONS-ENDCAP-006', 'End Cap', 5, 20, 'pcs', ' Rack 3-Drawer 14', '2025-05-06', 'In Stock', '', 'Yard Drainage Tool', 'Itchoy', '2025-05-06 16:09:46'),
(20, '1746530809054-372544681.jpg', 'CONS-FABRIC-010', 'Filter Fabric (Geotextile)', 23, 30, 'rolls', ' Rack 3-Drawer 15', '2025-05-06', 'In Stock', '', 'Yard Drainage Tool', 'Admin', '2025-05-06 19:26:49'),
(21, '1746531319965-918937037.jpg', 'CONS-DRILLBIT-017', 'Drill Bit', 21, 40, 'pcs', ' Rack 3-Drawer 16', '2025-05-06', 'In Stock', '', 'Yard Drainage Tool', 'Admin', '2025-05-06 19:35:19'),
(22, '1746531464653-44983596.jpg', 'CONS-WELDROD-018', 'Welding Rod', 15, 40, 'pcs', ' Rack 3-Drawer 17', '2025-05-06', 'In Stock', '', 'Yard Drainage Tool', 'Admin', '2025-05-06 19:37:44'),
(23, '1746531580518-715048116.jpg', 'CONS-CUTDISC-019', 'Cutting Disc ', 10, 20, 'pcs', ' Rack 3-Drawer 18', '2025-05-06', 'In Stock', '', 'Yard Drainage Tool', 'Admin', '2025-05-06 19:39:40'),
(24, '1746531672776-131499006.jpg', 'CONS-NAIL-020', 'Common nails', 150, 1000, 'kg', ' Rack 3-Drawer 19', '2025-05-06', 'In Stock', '', 'Yard Drainage Tool', 'Admin', '2025-05-06 19:41:12'),
(25, '1746532171641-703506128.jpg', 'CONS-BINDWIRE-023', 'Binding wire ', 10, 20, 'kg', ' Rack 3-Drawer 20', '2025-05-06', 'In Stock', '', 'Yard Drainage Tool', 'Admin', '2025-05-06 19:49:31'),
(26, '1746532276281-633182671.jpg', 'CONS-EPOXY-024', 'Epoxy Adhesive', 10, 20, 'tubes', ' Rack 3-Drawer 21', '2025-05-06', 'In Stock', '', 'Yard Drainage Tool', 'Admin', '2025-05-06 19:51:16'),
(27, '1746532338501-347566403.jpg', 'CONS-ZIPTIE-025', 'Cable Ties (Zip Ties)', 10, 30, 'pcs', ' Rack 3-Drawer 22', '2025-05-06', 'In Stock', '', 'Yard Drainage Tool', 'Admin', '2025-05-06 19:52:18'),
(28, '1746532409946-459429927.jpg', 'CONS-THINNER-026', 'Paint Thinner', 6, 10, 'pcs', ' Rack 3-Drawer 22', '2025-05-06', 'In Stock', '', 'Yard Drainage Tool', 'Admin', '2025-05-06 19:53:29'),
(29, '1746532467677-743643472.jpg', 'CONS-CHALK-027', 'Marking Chalk / Chalk Line Refill', 8, 10, 'pcs', ' Rack 3-Drawer 23', '2025-05-06', 'In Stock', '', 'Yard Drainage Tool', 'Admin', '2025-05-06 19:54:27'),
(30, '1746532538806-8444761.jpg', 'CONS-GLOVES-028', 'Protective Gloves (Disposable)', 10, 20, 'box', ' Rack 3-Drawer 24', '2025-05-06', 'In Stock', '', 'Yard Drainage Tool', 'Admin', '2025-05-06 19:55:38');

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
(75, 'Drill Bit Steel 1/2', 'RONALD', '2025-05-04 21:03:45', 'Returned'),
(76, ' Drill Bit Steel 1/2', 'System Auto', '2025-05-06 11:39:34', 'Issued Out'),
(77, ' Drill Bit Steel 1/2', 'System Auto', '2025-05-06 11:44:31', 'Returned'),
(78, 'Drill Bit Steel 1/2', 'SAMPLE', '2025-05-06 11:44:31', 'Returned'),
(79, ' Drill Bit Steel 1/2', 'System Auto', '2025-05-06 11:44:36', 'Returned'),
(80, ' Drill Bit Steel 1/2', 'RONALD', '2025-05-06 11:44:36', 'Issued Out'),
(81, ' Drill Bit Steel 1/2', 'System Auto', '2025-05-06 11:44:41', 'Returned'),
(82, 'Drill Bit Steel 1/2', 'RONALD', '2025-05-06 11:44:41', 'Returned'),
(83, 'Cutting Disc 4\" 2.5mm', 'System Auto', '2025-05-06 11:45:00', 'Returned'),
(84, 'Cutting Disc 4\" 2.5mm', 'LAST AGAIN ', '2025-05-06 11:45:00', 'Returned'),
(85, 'Cutting Disc 4\" 2.5mm', 'tite', '2025-05-06 11:50:10', 'Issued Out'),
(86, 'Cutting Disc 4\" 2.5mm', 'System Auto', '2025-05-06 11:50:10', 'Issued Out'),
(87, 'Cutting Disc 4\" 2.5mm', 'sample', '2025-05-06 11:53:38', 'Issued Out'),
(88, 'Cutting Disc 4\" 2.5mm', 'System Auto', '2025-05-06 11:53:38', 'Issued Out'),
(89, 'Cutting Disc 4\" 2.5mm', 'System Auto', '2025-05-06 11:55:31', 'Returned'),
(90, 'Cutting Disc 4\" 2.5mm', 'tite', '2025-05-06 11:55:31', 'Returned'),
(91, 'Cutting Disc 4\" 2.5mm', 'System Auto', '2025-05-06 11:57:49', 'Returned'),
(92, 'Cutting Disc 4\" 2.5mm', 'sample', '2025-05-06 11:57:49', 'Returned'),
(93, 'Cutting Disc 4\" 2.5mm', 'System Auto', '2025-05-06 14:08:49', 'Returned'),
(94, 'Cutting Disc 4\" 2.5mm', 'Ronald', '2025-05-06 14:08:49', 'Returned'),
(95, 'Cutting Disc 4\" 2.5mm', 'Ronald', '2025-05-06 14:25:25', 'Issued Out'),
(96, 'Cutting Disc 4\" 2.5mm', 'System Auto', '2025-05-06 14:25:25', 'Issued Out');

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
(128, 'sample', 'Admin', 'sample', 'tite', 'Cutting Disc 4\" 2.5mm', 'Isuzu Giga Crane Truck', '2025-05-05', '2025-05-06', 'Completed', NULL, 'Yard Admin', 'sample'),
(129, 'Renovation', 'Itchoy', 'Ronald', 'Dartek Angle Grinder', 'Cutting Disc 4\" 2.5mm', 'Hino Dump Truck', '2025-05-06', '2025-05-06', 'Cancelled', NULL, 'Yard Admin', 'Makati'),
(130, 'Testing 2', 'Itchoy', 'Ronald', 'try nga ', 'TITE, ASD', 'Hyundai HD320 Flatbed Truck', '2025-05-08', '2025-05-15', 'Upcoming', NULL, 'Yard Admin', 'Makati'),
(131, 'Mcdo Renovation ', 'Itchoy', 'Ronald', 'try nga ', 'Cutting Disc 4\" 2.5mm', 'TITE', '2025-05-06', '2025-05-09', 'Ongoing', NULL, 'Yard Admin', 'Makati'),
(132, 'Drainage Cleaning ', 'Itchoy', 'Gwapo', 'Makita Angle Grinder ', ' Ronald', 'testvec', '2025-05-10', '2025-05-20', 'Upcoming', NULL, 'Yard Admin', 'Manila');

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
(67, '1746514333117-714900325.jpg', 'Trenching Shovel ', 'Razor-Back', 'Digging Tool', 'TRENCH-SHOVEL-01', ' Heavy-duty trenching shovel with a narrow, curved blade ideal for digging drainage trenches or narrow holes in compact soil. ', '2025-05-05', '2026-05-05', 'Available', 'Brand New', 'Itchoy', 'TOOL-e5ce7be3-0e2f-4a56-8cdf-adbb9c761960.png', 'TOOL-e5ce7be3-0e2f-4a56-8cdf-adbb9c761960', '2025-05-06 14:52:13'),
(68, '1746514503487-301970842.jpg', 'Trenching Shovel (2)', 'Razor-Back', 'Digging Tool', 'TRENCH-SHOVEL-02', 'Heavy-duty trenching shovel with a narrow, curved blade ideal for digging drainage trenches or narrow holes in compact soil. ', '2025-05-05', '2026-05-05', 'Available', 'Brand new', 'Itchoy', 'TOOL-e1029dc6-6c34-45a5-821a-a696093f34e7.png', 'TOOL-e1029dc6-6c34-45a5-821a-a696093f34e7', '2025-05-06 14:55:03'),
(69, '1746514619817-978649736.jpg', 'Trenching Shovel (3)', 'Razor-Back', 'Digging Tool', 'TRENCH-SHOVEL-03', ' Heavy-duty trenching shovel with a narrow, curved blade ideal for digging drainage trenches or narrow holes in compact soil.', '2025-05-05', '2026-05-05', 'Available', 'Brand New', 'Itchoy', 'TOOL-7b1c2b7e-ea72-45e9-88cf-affe84193e2b.png', 'TOOL-7b1c2b7e-ea72-45e9-88cf-affe84193e2b', '2025-05-06 14:56:59'),
(70, '1746515070961-882371227.jpg', 'Power Trencher', 'Ditch Witch', 'Digging Machine', 'PWR-TRENCHER-02', 'Used for fast, deep trenching in large-scale drainage installations', '2025-05-05', '2025-12-23', 'Available', 'Brand New', 'Itchoy', 'TOOL-4aa84fda-56d3-4773-b2b4-8ef847e915ef.png', 'TOOL-4aa84fda-56d3-4773-b2b4-8ef847e915ef', '2025-05-06 15:04:30'),
(71, '1746515234719-499168324.jpg', 'Power Trencher (2)', 'Ditch Witch', 'Digging Machine', 'PWR-TRENCHER-022', 'Used for fast, deep trenching in large-scale drainage installations', '2025-05-05', '2025-12-23', 'Available', 'Brand new', 'Itchoy', 'TOOL-87e81799-84a4-448e-bcbe-f79e420cd8c4.png', 'TOOL-87e81799-84a4-448e-bcbe-f79e420cd8c4', '2025-05-06 15:07:14'),
(72, '1746515361334-441857330.jpg', 'Power Trencher (3)', 'Ditch Witch', 'Digging Machine', 'PWR-TRENCHER-029', 'Used for fast, deep trenching in large-scale drainage installations', '2025-05-05', '2025-12-23', 'Available', 'Brand new', 'Itchoy', 'TOOL-732814a3-8ab4-422f-976c-ff036d0ea0f3.png', 'TOOL-732814a3-8ab4-422f-976c-ff036d0ea0f3', '2025-05-06 15:09:21'),
(73, '1746515792563-301682981.jpg', 'Perforated Drain Pipe', 'Atlanta Industries', 'Drainage Pipe', 'PERF-PIPE-100', 'Allows subsurface water to enter and flow to discharge point', '2025-05-04', '2025-08-30', 'Available', 'Brand new', 'Itchoy', 'TOOL-f25d27ee-cf8b-4bbb-8c2c-9ae373a78196.png', 'TOOL-f25d27ee-cf8b-4bbb-8c2c-9ae373a78196', '2025-05-06 15:16:32'),
(74, '1746515998788-17543342.jpg', 'Perforated Drain Pipe (2)', 'Atlanta Industries', 'Drainage Pipe', 'PERF-PIPE-110', 'Allows subsurface water to enter and flow to discharge point', '2025-05-04', '2025-08-31', 'Available', 'Brand new', 'Itchoy', 'TOOL-87b17e65-0c6e-4c45-a0f6-63be7dca3842.png', 'TOOL-87b17e65-0c6e-4c45-a0f6-63be7dca3842', '2025-05-06 15:19:58'),
(75, '1746516199357-647132507.jpg', 'Perforated Drain Pipe (3)', 'Atlanta Industries', 'Drainage Pipe', 'PERF-PIPE-130', 'Allows subsurface water to enter and flow to discharge point', '2025-05-04', '2025-08-31', 'Available', 'Brand new', 'Itchoy', 'TOOL-d78138ee-6aef-4e14-a5ad-7673d067c3de.png', 'TOOL-d78138ee-6aef-4e14-a5ad-7673d067c3de', '2025-05-06 15:23:19'),
(76, '1746516844870-235180525.jpeg', 'Pickaxe', 'Stanley', 'Yard Drainage Tool', 'TOOL-PICK-001', 'A hand tool with a pointed metal head used for breaking hard soil, rocks, or compacted ground prior to trenching.', '2025-05-04', '2025-12-30', 'Available', 'Brand new', 'Itchoy', 'TOOL-5f7742db-881d-4cb3-a683-f43df00e3cb8.png', 'TOOL-5f7742db-881d-4cb3-a683-f43df00e3cb8', '2025-05-06 15:33:23'),
(77, '1746516910454-34617494.jpeg', 'Pickaxe (2)', 'Stanley', 'Yard Drainage Tool', 'TOOL-PICK-029', 'A hand tool with a pointed metal head used for breaking hard soil, rocks, or compacted ground prior to trenching.', '2025-05-05', '2025-12-31', 'Available', 'Brand new', 'Itchoy', 'TOOL-01af4488-199d-4e29-a2c8-9a7c177570ff.png', 'TOOL-01af4488-199d-4e29-a2c8-9a7c177570ff', '2025-05-06 15:35:10'),
(78, '1746517142804-138698112.jpeg', 'Pickaxe (3)', 'Stanley', 'Yard Drainage Tool', 'TOOL-PICK-034', 'A hand tool with a pointed metal head used for breaking hard soil, rocks, or compacted ground prior to trenching.', '2025-05-05', '2025-12-31', 'Available', 'Brand new', 'Itchoy', 'TOOL-7a90efe5-0244-4dca-8155-b9efa4876c4c.png', 'TOOL-7a90efe5-0244-4dca-8155-b9efa4876c4c', '2025-05-06 15:39:02'),
(79, '1746517296233-951666337.jpeg', 'Pipe Cutter', 'Milwaukee ', 'Yard Drainage Tool', 'TOOL-PIPECUT-002', 'A handheld tool designed to cut through PVC or metal pipes cleanly and accurately during installation or repair.', '2025-05-05', '2025-09-29', 'Available', 'Brand  new', 'Itchoy', 'TOOL-c2d11ffa-02ab-4aec-afe7-87fb5c31634c.png', 'TOOL-c2d11ffa-02ab-4aec-afe7-87fb5c31634c', '2025-05-06 15:41:36'),
(80, '1746517374103-103007649.jpeg', 'Pipe Cutter (2)', 'Milwaukee ', 'Yard Drainage Tool', 'TOOL-PIPECUT-219', 'A handheld tool designed to cut through PVC or metal pipes cleanly and accurately during installation or repair.', '2025-05-05', '2025-09-28', 'Available', 'Brand new', 'Itchoy', 'TOOL-f4609d5d-f315-4d4d-a0ba-85f64083cd62.png', 'TOOL-f4609d5d-f315-4d4d-a0ba-85f64083cd62', '2025-05-06 15:42:54'),
(81, '1746517538350-873123075.jpeg', 'Pipe Laser Level', 'Topcon ', 'Yard Drainage Tool', 'TOOL-PLASER-003', 'A precision tool used to project a laser beam down the length of a pipe to ensure correct grade and alignment during drainage installation.', '2025-05-05', '2025-10-28', 'Available', 'Brand new', 'Itchoy', 'TOOL-5ce4ec9c-d63d-43b0-a08d-c2c0c4e104c2.png', 'TOOL-5ce4ec9c-d63d-43b0-a08d-c2c0c4e104c2', '2025-05-06 15:45:38'),
(82, '1746517602050-649927424.jpeg', 'Pipe Laser Level (2)', 'Topcon ', 'Yard Drainage Tool', 'TOOL-PLASER-034', 'A precision tool used to project a laser beam down the length of a pipe to ensure correct grade and alignment during drainage installation.', '2025-05-05', '2025-09-30', 'Available', 'Brand new', 'Itchoy', 'TOOL-c41a304f-bda6-41c6-bc61-d41cc9945ea3.png', 'TOOL-c41a304f-bda6-41c6-bc61-d41cc9945ea3', '2025-05-06 15:46:42'),
(83, '1746517856760-695424771.jpg', 'Measuring Tape ', '	Stanley ', 'Yard Drainage Tool', 'TOOL-MTAPE100-004', 'A long measuring tape used for accurately measuring distances over large outdoor areas, such as trench runs and pipe placements.', '2025-05-05', '2025-09-30', 'Available', 'Brand new', 'Itchoy', 'TOOL-172a5262-42af-48ff-aa6e-8f9b63d219d2.png', 'TOOL-172a5262-42af-48ff-aa6e-8f9b63d219d2', '2025-05-06 15:50:56'),
(84, '1746517910343-885970946.jpg', 'Measuring Tape (2)', 'Stanley', 'Yard Drainage Tool', 'TOOL-MTAPE100-219', 'A long measuring tape used for accurately measuring distances over large outdoor areas, such as trench runs and pipe placements.', '2025-05-05', '2025-10-27', 'Available', 'Brand new', 'Itchoy', 'TOOL-24b591a2-5eea-4c65-bf2d-23476780ffd6.png', 'TOOL-24b591a2-5eea-4c65-bf2d-23476780ffd6', '2025-05-06 15:51:50'),
(85, '1746629348084-198981558.jpg', 'Genset Victor (Sky Blue)', 'Genset', 'Generator Set', 'POWER-GENSET_VICTOR-1', '3.5kVA portable generator, gasoline powered', '2023-08-14', '2024-08-14', 'Available', '1 defective', 'Admin', 'TOOL-eda16cce-dec4-493a-aada-a5d4b5b6a72a.png', 'TOOL-eda16cce-dec4-493a-aada-a5d4b5b6a72a', '2025-05-07 22:49:08'),
(86, '1746629456648-712912185.jpg', 'Genset Victor (Sky Blue)', 'Genset', 'Generator Set', 'POWER-GENSET_VICTOR-2', '3.5kVA portable generator, gasoline powered', '2023-08-15', '2024-08-15', 'Available', 'Brand New', 'Admin', 'TOOL-284f51f8-3223-4cf4-b9e2-9db1dc974610.png', 'TOOL-284f51f8-3223-4cf4-b9e2-9db1dc974610', '2025-05-07 22:50:56'),
(87, '1746629557217-172390063.jpg', 'Genset Daiden (Green)', 'Genset', 'Generator Set', 'POWER-GENSET_DAIDEN-1', 'Heavy-duty 5kVA diesel generator', '2022-11-30', '2024-11-30', 'Available', '', 'Admin', 'TOOL-4484e16a-fe9b-468c-a253-de3fcd608b4d.png', 'TOOL-4484e16a-fe9b-468c-a253-de3fcd608b4d', '2025-05-07 22:52:37'),
(88, '1746629628188-94278516.jpg', 'Genset Silent (Red)', 'Genset', 'Generator Set', 'POWER-GENSET_SILENT-1', '6.5kVA silent diesel generator with AVR', '2023-03-09', '2024-03-09', 'Available', '', 'Admin', 'TOOL-cb3da547-3c35-40c4-a1bc-f7755f9f2e50.png', 'TOOL-cb3da547-3c35-40c4-a1bc-f7755f9f2e50', '2025-05-07 22:53:48'),
(89, '1746629704299-12781169.png', 'Genset Italy (Orange)', 'Genset', 'Generator Set', 'POWER-GENSET_ITALY-1', 'European-built 4kVA industrial generator', '2024-01-19', '2025-01-19', 'Available', 'Brand New', 'Admin', 'TOOL-533a3d24-406c-4d27-b119-227ccf2ad2c9.png', 'TOOL-533a3d24-406c-4d27-b119-227ccf2ad2c9', '2025-05-07 22:55:04'),
(90, '1746629777694-156453276.jpg', 'Genset Anmax (New)', 'Genset', 'Generator Set', 'POWER-GENSET_ANMAX-1	', '7kVA high-efficiency generator for site use', '2024-06-05', '2025-06-05', 'Available', 'Brand New', 'Admin', 'TOOL-b248a212-309b-4488-81e2-9b4c5973754c.png', 'TOOL-b248a212-309b-4488-81e2-9b4c5973754c', '2025-05-07 22:56:17'),
(91, '1746630000542-352708869.jpg', 'Cement Mixer	', 'BuildMaster', 'Mixer', 'POWER-CMNTMXR-1', 'Heavy-duty 400L electric drum-type cement mixer', '2023-09-30', '2024-09-30', 'Available', '', 'Admin', 'TOOL-b4fbc84e-492e-4fb4-a723-4af54c41f464.png', 'TOOL-b4fbc84e-492e-4fb4-a723-4af54c41f464', '2025-05-07 23:00:00'),
(92, '1746630231582-458039764.jpg', 'Drain Cam Unit', 'CamInspect', 'Drain Cam', 'POWER-DRAINCAM-1', 'High-resolution industrial drain inspection camera unit	', '2023-09-09', '2024-09-09', 'Available', 'Brand New', 'Admin', 'TOOL-ff81124e-d8e1-4303-ab44-93daade1416c.png', 'TOOL-ff81124e-d8e1-4303-ab44-93daade1416c', '2025-05-07 23:03:51'),
(93, '1746630288572-819067358.jpg', 'Drain Cam Monitor	', 'CamInspect', 'Drain Cam', 'POWER-DRAINCAMMNTR-1	', '7\" waterproof monitor for drain cam system	', '2023-09-09', '2024-09-09', 'Available', '', 'Admin', 'TOOL-03c1bf3f-e9f3-41fa-9777-7726f92fb9f6.png', 'TOOL-03c1bf3f-e9f3-41fa-9777-7726f92fb9f6', '2025-05-07 23:04:48'),
(94, '1746630361399-621560482.jpg', 'Drain Cam Cable	', 'CamInspect', 'Drain Cam', 'POWER-DRAINCAMCBLE-1	', '30-meter flexible fiber-optic drain cam cable (1st roll)	', '2023-09-09', '2024-09-09', 'Available', '', 'Admin', 'TOOL-194d9391-440f-4774-ae6a-29a59c6bc57c.png', 'TOOL-194d9391-440f-4774-ae6a-29a59c6bc57c', '2025-05-07 23:06:01'),
(95, '1746630420308-330662263.jpg', 'Drain Cam Cable	', 'CamInspect', 'Drain Cam', 'POWER-DRAINCAMCBLE-1	', '30-meter flexible fiber-optic drain cam cable (2nd roll)	', '2023-09-09', '2024-09-09', 'Available', '', 'Admin', 'TOOL-67e82145-a6a6-42c6-ad11-9c31329917e7.png', 'TOOL-67e82145-a6a6-42c6-ad11-9c31329917e7', '2025-05-07 23:07:00'),
(96, '1746630582079-351043054.jpg', 'Ingco Multifunction Tool	', 'Ingco', 'Ingco Multifunction Tool	', 'POWER-MULTITOOLS_I	', '300W oscillating multi-tool for sanding, cutting, and scraping	', '2024-02-01', '2025-02-01', 'Available', 'Brand New', 'Admin', 'TOOL-274a92bb-42b0-4382-a0fa-084a81a6a3ff.png', 'TOOL-274a92bb-42b0-4382-a0fa-084a81a6a3ff', '2025-05-07 23:09:42'),
(97, '1746630644112-861816027.jpg', 'Ingco Multifunction Tool	', 'Ingco', 'Ingco Multifunction Tool	', 'POWER-MULTITOOLS_I	', '300W oscillating multi-tool for sanding, cutting, and scraping	', '2024-02-01', '2025-02-01', 'Available', 'Brand New', 'Admin', 'TOOL-83c86504-23df-4ecc-b5f4-c32a7d5e53cb.png', 'TOOL-83c86504-23df-4ecc-b5f4-c32a7d5e53cb', '2025-05-07 23:10:44'),
(98, '1746630701298-425231566.jpg', 'Ingco Multifunction Tool	', 'Ingco', 'Ingco Multifunction Tool	', 'POWER-MULTITOOLS_I	', '300W oscillating multi-tool for sanding, cutting, and scraping	', '2024-02-01', '2025-02-01', 'Available', 'Brand New', 'Admin', 'TOOL-96e08fbf-b86d-4aa3-941d-4755a6f768c3.png', 'TOOL-96e08fbf-b86d-4aa3-941d-4755a6f768c3', '2025-05-07 23:11:41'),
(99, '1746630942301-847591449.jpg', 'Electric Power Sprayer	', 'Agrijet', 'Power Sprayer', 'POWER-ELCTRCSPRYR-1	', '12V high-pressure electric sprayer, 16L capacity	', '2023-06-05', '2024-06-05', 'Available', '', 'Admin', 'TOOL-afee63d1-e6cd-4bc7-840b-323e8f2e941d.png', 'TOOL-afee63d1-e6cd-4bc7-840b-323e8f2e941d', '2025-05-07 23:15:42'),
(100, '1746631021351-55274812.jpg', 'Electric Power Sprayer', 'Agrijet', 'Power Sprayer', 'POWER-ELCTRCSPRYR-2	', '12V high-pressure electric sprayer, 16L capacity	', '2023-06-05', '2024-06-05', 'Available', '', 'Admin', 'TOOL-f15c9bb6-a4bb-4420-958c-bdb1f8dc1eb7.png', 'TOOL-f15c9bb6-a4bb-4420-958c-bdb1f8dc1eb7', '2025-05-07 23:17:01'),
(101, '1746631068388-14704565.jpg', 'Electric Power Sprayer', 'Agrijet', 'Power Sprayer', 'POWER-ELCTRCSPRYR-3', '12V high-pressure electric sprayer, 16L capacity	', '2023-06-05', '2024-06-05', 'Available', 'Brand New', 'Admin', 'TOOL-ca1482e6-8923-40b7-ab9d-63e503eb0658.png', 'TOOL-ca1482e6-8923-40b7-ab9d-63e503eb0658', '2025-05-07 23:17:48'),
(102, '1746631112418-863346912.jpg', 'Electric Power Sprayer', 'Agrijet', 'Power Sprayer', 'POWER-ELCTRCSPRYR-4', '12V high-pressure electric sprayer, 16L capacity	', '2023-06-05', '2024-06-05', 'Available', 'Brand New', 'Admin', 'TOOL-8dae965a-f479-421d-8bfe-d780082d70f0.png', 'TOOL-8dae965a-f479-421d-8bfe-d780082d70f0', '2025-05-07 23:18:32'),
(103, '1746631236455-201815716.jpg', 'Power Sprayer Motor Type', 'Jetforce', 'Power Sprayer', 'POWER-MTRTYPESPRYR-1', 'Gasoline-powered motor pump for sprayer unit', '2023-05-31', '2024-05-31', 'Available', 'Brand New', 'Admin', 'TOOL-cea8de22-08d1-4a4d-8c4f-6423e25828ab.png', 'TOOL-cea8de22-08d1-4a4d-8c4f-6423e25828ab', '2025-05-07 23:20:36'),
(104, '1746631302615-975461971.jpg', 'Power Sprayer Motor Type', 'Jetforce', 'Power Sprayer', 'POWER-MTRTYPESPRYR-2	', 'Gasoline-powered motor pump for sprayer unit', '2023-05-31', '2024-05-31', 'Available', 'Brand New', 'Admin', 'TOOL-71c24bad-45ff-4844-aff1-5e0a58972201.png', 'TOOL-71c24bad-45ff-4844-aff1-5e0a58972201', '2025-05-07 23:21:42'),
(105, '1746631351546-892645619.jpg', 'Power Sprayer Motor Type', 'Jetforce', 'Power Sprayer', 'POWER-MTRTYPESPRYR-3', 'Gasoline-powered motor pump for sprayer unit', '2023-05-31', '2024-05-31', 'Available', 'Brand New', 'Admin', 'TOOL-4845571a-c0b6-4153-ade5-a412630247d0.png', 'TOOL-4845571a-c0b6-4153-ade5-a412630247d0', '2025-05-07 23:22:31'),
(106, '1746631556096-26459230.jpg', 'Riveter', 'Worksite', 'Riveter', 'HAND-RIVETER-1', 'Manual hand riveter with adjustable grip', '2023-01-01', '2024-01-01', 'Available', '', 'Admin', 'TOOL-e066ec4d-ab4b-4499-8005-4eafd1f599dd.png', 'TOOL-e066ec4d-ab4b-4499-8005-4eafd1f599dd', '2025-05-07 23:25:56'),
(107, '1746631602385-714093486.jpg', 'Riveter', 'Worksite', 'Riveter', 'HAND-RIVETER-2', 'Manual hand riveter with adjustable grip', '2023-01-01', '2024-01-01', 'Available', '', 'Admin', 'TOOL-8cdaa905-c387-4f72-a877-fd4bbd787d8d.png', 'TOOL-8cdaa905-c387-4f72-a877-fd4bbd787d8d', '2025-05-07 23:26:42'),
(108, '1746631644353-760974461.jpg', 'Riveter', 'Worksite', 'Riveter', 'HAND-RIVETER-3', 'Manual hand riveter with adjustable grip', '2023-01-01', '2024-01-01', 'Available', '', 'Admin', 'TOOL-f2c62f3a-e2df-4827-8a94-3902d65e9d79.png', 'TOOL-f2c62f3a-e2df-4827-8a94-3902d65e9d79', '2025-05-07 23:27:24');

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
(76, NULL, 'Welding Mask', 'RONALD', 'MAKATI', '2025-05-04 21:03:45', 'Returned'),
(77, NULL, 'Dartek Angle Grinder', 'System Auto', NULL, '2025-05-06 11:39:34', 'Issued Out'),
(78, NULL, 'Dartek Angle Grinder', 'System Auto', NULL, '2025-05-06 11:44:31', 'Returned'),
(79, NULL, 'Dartek Angle Grinder', 'SAMPLE', 'SAMPLE', '2025-05-06 11:44:31', 'Returned'),
(80, NULL, 'Makita Nail Gun', 'System Auto', NULL, '2025-05-06 11:44:36', 'Returned'),
(81, NULL, 'Makita Nail Gun', 'RONALD', 'RONALD', '2025-05-06 11:44:36', 'Issued Out'),
(82, NULL, 'Makita Nail Gun', 'RONALD', NULL, '2025-05-06 11:44:36', 'Issued Out'),
(83, NULL, 'Makita Nail Gun', 'System Auto', NULL, '2025-05-06 11:44:41', 'Returned'),
(84, NULL, 'Makita Nail Gun', 'RONALD', 'RONALD', '2025-05-06 11:44:41', 'Returned'),
(85, NULL, 'Dartek Angle Grinder', 'System Auto', NULL, '2025-05-06 11:45:00', 'Returned'),
(86, NULL, 'Dartek Angle Grinder', 'LAST AGAIN ', 'LAST ', '2025-05-06 11:45:00', 'Returned'),
(87, NULL, 'Dartek Angle Grinder', 'System Auto', NULL, '2025-05-06 11:50:10', 'Issued Out'),
(88, NULL, 'tite', 'System Auto', NULL, '2025-05-06 11:53:38', 'Issued Out'),
(89, NULL, 'Dartek Angle Grinder', 'System Auto', NULL, '2025-05-06 11:55:31', 'Returned'),
(90, NULL, 'Dartek Angle Grinder', 'tite', 'tite', '2025-05-06 11:55:31', 'Returned'),
(91, NULL, 'tite', 'System Auto', NULL, '2025-05-06 11:57:49', 'Returned'),
(92, NULL, 'tite', 'sample', 'sample', '2025-05-06 11:57:49', 'Returned'),
(93, NULL, 'Dartek Angle Grinder', 'System Auto', NULL, '2025-05-06 14:08:49', 'Returned'),
(94, NULL, 'Dartek Angle Grinder', 'Ronald', 'Makati', '2025-05-06 14:08:49', 'Returned'),
(95, NULL, 'try nga ', 'System Auto', NULL, '2025-05-06 14:25:25', 'Issued Out');

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
(5, '1745828075830-924813918.jpg', 'Foton Tornado Tipper Truck', 'Foton', 'TPR-3344', 'Tipper Truck', 'Diesel', 'Main Warehouse', '2025-04-13', 'Not Available', 'need maintenance', '2025-09-25', 'Ronald Labrado', 'VEHICLE-f56a2adf-3b71-4820-b9ab-e0d5bef22288.png', '2026-04-13', 'VEHICLE-f56a2adf-3b71-4820-b9ab-e0d5bef22288', NULL, '2025-05-03 22:41:15', NULL);

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
(66, 'Hino Dump Truck', 'RONALD', '2025-05-04 21:03:45', 'Returned'),
(67, 'Hino Dump Truck', 'System Auto', '2025-05-06 11:39:34', 'Issued Out'),
(68, 'Hino Dump Truck', 'System Auto', '2025-05-06 11:44:31', 'Returned'),
(69, 'Hino Dump Truck', 'SAMPLE', '2025-05-06 11:44:31', 'Returned'),
(70, 'Isuzu Giga Crane Truck', 'System Auto', '2025-05-06 11:44:36', 'Returned'),
(71, 'Isuzu Giga Crane Truck', 'RONALD', '2025-05-06 11:44:36', 'Issued Out'),
(72, 'Isuzu Giga Crane Truck', 'RONALD', '2025-05-06 11:44:36', 'Issued Out'),
(73, 'Isuzu Giga Crane Truck', 'System Auto', '2025-05-06 11:44:41', 'Returned'),
(74, 'Isuzu Giga Crane Truck', 'RONALD', '2025-05-06 11:44:41', 'Returned'),
(75, 'Isuzu Giga Crane Truck', 'System Auto', '2025-05-06 11:45:00', 'Returned'),
(76, 'Isuzu Giga Crane Truck', 'LAST AGAIN ', '2025-05-06 11:45:00', 'Returned'),
(77, 'Hino Dump Truck', 'System Auto', '2025-05-06 11:50:10', 'Issued Out'),
(78, 'Isuzu Giga Crane Truck', 'System Auto', '2025-05-06 11:53:38', 'Issued Out'),
(79, 'Hino Dump Truck', 'System Auto', '2025-05-06 11:55:31', 'Returned'),
(80, 'Hino Dump Truck', 'tite', '2025-05-06 11:55:31', 'Returned'),
(81, 'Isuzu Giga Crane Truck', 'System Auto', '2025-05-06 11:57:49', 'Returned'),
(82, 'Isuzu Giga Crane Truck', 'sample', '2025-05-06 11:57:49', 'Returned'),
(83, 'Hino Dump Truck', 'System Auto', '2025-05-06 14:08:49', 'Returned'),
(84, 'Hino Dump Truck', 'Ronald', '2025-05-06 14:08:49', 'Returned'),
(85, 'TITE', 'System Auto', '2025-05-06 14:25:25', 'Issued Out');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `consumables_logs`
--
ALTER TABLE `consumables_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT for table `tools`
--
ALTER TABLE `tools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `tools_logs`
--
ALTER TABLE `tools_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `vehicles_logs`
--
ALTER TABLE `vehicles_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
