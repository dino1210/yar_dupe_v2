-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2025 at 08:51 AM
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
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` enum('Ongoing','Completed','Upcoming') DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `creator` varchar(100) DEFAULT 'Yard Admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `manager`, `person_in_charge`, `tools_equipment_used`, `start_date`, `end_date`, `status`, `remarks`, `creator`) VALUES
(1, 'Construction of Building A', 'Alice Amanda', 'Johnny Hernandez', 'Excavator, Mixer, Cement', '2024-02-01', '2024-12-01', 'Ongoing', 'Team B', 'Yard Admin'),
(2, 'Renovation of Office HQ', 'Brian Santos', 'Micaela Leonardo', 'Ladder, Paint Sprayer', '2023-01-10', '2023-05-30', 'Completed', 'Final inspection passed', 'Yard Admin'),
(3, 'Bridge Maintenance Project', 'Clarence Enriquez', 'Eric Marcelo', 'Hydraulic Jack, Welder', '2024-09-15', '2024-11-20', 'Upcoming', 'Scaffolding', 'Yard Admin'),
(4, 'Road Paving Project', 'Angelo Gregorio', 'Daniel Allen', 'Mixer, Roller, Cement', '2024-05-10', '2024-10-30', 'Ongoing', 'Concrete Mixer', 'Yard Admin'),
(5, 'Airport Expansion', 'Jennifer Cruz', 'Tomas Javier', 'Bulldozer, Concrete Pump', '2024-06-01', '2025-01-15', 'Upcoming', 'Runway ready', 'Yard Admin'),
(6, 'Highway Widening Project', 'Julia Andrews', 'Jake Dela Rosa', 'Truck, Jackhammer, Mixer', '2024-03-20', '2024-10-10', 'Ongoing', 'Heavy usage area', 'Yard Admin'),
(7, 'bake shop', 'nolly', 'NOLLY', 'HAMMER NI THOR ', '2025-04-25', '2025-04-25', 'Upcoming', NULL, 'Yard Admin');

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
  `qr` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tools`
--

INSERT INTO `tools` (`id`, `picture`, `name`, `brand`, `category`, `tag`, `description`, `purchase_date`, `warranty`, `status`, `remarks`, `qr`) VALUES
(1, 'makita-angle-grinder.jpg', 'Makita Angle Grinder', 'Makita', 'Angle Grinder', 'AG123', 'Power: 750W, RPM: 12,000, Disc Diameter: 125mm, Weight: 2.5kg.', '2024-05-12', '2026-05-12', 'Available', 'Requires regular maintenance, occasional overheating.', 'AG123_qrcode.png'),
(2, 'bosch-drill-machine.jpg', 'Bosch Drill Machine', 'Bosch', 'Drill Machine', 'DM456', 'Power: 500W, Speed: 3000 RPM, Chuck Size: 13mm.', '2023-08-22', '2025-08-22', 'Available', 'Lightweight and easy to use.', 'AG123_qrcode.png'),
(3, 'dewalt-impact-driver.jpg', 'DeWalt Impact Driver', 'DeWalt', 'Impact Driver', 'ID789', 'Torque: 180 Nm, Speed: 2,800 RPM.', '2023-07-10', '2025-07-10', 'Issued Out', 'Battery life depleting fast.', 'AG123_qrcode.png'),
(4, 'hilti-rotary-hammer.jpg', 'Hilti Rotary Hammer', 'Hilti', 'Rotary Hammer', 'RH654', 'Impact Energy: 2.5J, Speed: 1200 RPM.', '2023-10-05', '2026-10-05', 'Available', 'Ideal for heavy-duty tasks.', 'AG123_qrcode.png'),
(5, 'hitachi-circular-saw.jpg', 'Hitachi Circular Saw', 'Hitachi', 'Circular Saw', 'CS321', 'Blade Size: 185mm, Power: 1400W.', '2024-02-20', '2026-02-20', 'Issued Out', 'Sharp and efficient.', 'AG123_qrcode.png'),
(6, 'ryobi-jigsaw.jpg', 'Ryobi Jigsaw', 'Ryobi', 'Jigsaw', 'JS987', 'Stroke Length: 26mm, Speed: 3,000 SPM.', '2023-06-15', '2025-06-15', 'Available', 'Works great for curved cuts.', 'AG123_qrcode.png'),
(7, '/public/images/tools/metabo_bench_grinder.jpg', 'Metabo Bench Grinder', 'Metabo', 'Bench Grinder', 'BG741', 'Wheel Size: 150mm, Power: 350W.', '2023-09-18', '2025-09-18', 'Available', 'Runs smoothly, minimal vibration.', '/public/qrcodes/tools/bg741.png'),
(8, '/public/images/tools/makita_router.jpg', 'Makita Router', 'Makita', 'Router', 'RT562', 'Power: 710W, Speed: 30,000 RPM.', '2024-01-30', '2026-01-30', 'Issued Out', 'Used for fine woodworking.', '/public/qrcodes/tools/rt562.png'),
(9, '/public/images/tools/dremel_rotary_tool.jpg', 'Dremel Rotary Tool', 'Dremel', 'Rotary Tool', 'RT321', 'Speed: 35,000 RPM, Multi-purpose.', '2023-05-12', '2025-05-12', 'Available', 'Perfect for engraving.', '/public/qrcodes/tools/rt321.png'),
(10, '/public/images/tools/milwaukee_cordless_screwdriver.jpg', 'Milwaukee Cordless Screwdriver', 'Milwaukee', 'Cordless Screwdriver', 'CSX963', 'Torque: 20 Nm, Battery: 12V.', '2023-11-03', '2025-11-03', 'Issued Out', 'Battery drains quickly.', '/public/qrcodes/tools/csx963.png'),
(11, '/public/images/tools/stanley_hand_saw.jpg', 'Stanley Hand Saw', 'Stanley', 'Hand Saw', 'HS845', 'Blade Length: 22 inches.', '2024-02-01', '2026-02-01', 'Available', 'Sharp and sturdy.', '/public/qrcodes/tools/hs845.png'),
(12, '/public/images/tools/kobalt_pipe_wrench.jpg', 'Kobalt Pipe Wrench', 'Kobalt', 'Pipe Wrench', 'PW122', 'Size: 14 inches, Material: Steel.', '2023-12-15', '2025-12-15', 'Issued Out', 'Handle grip is wearing out.', '/public/qrcodes/tools/pw122.png'),
(13, '/public/images/tools/ridgid_bolt_cutter.jpg', 'Ridgid Bolt Cutter', 'Ridgid', 'Bolt Cutter', 'BC852', 'Jaw Capacity: 3/8 inch.', '2023-09-25', '2025-09-25', 'Available', 'Cuts through metal easily.', '/public/qrcodes/tools/bc852.png'),
(14, '/public/images/tools/craftsman_claw_hammer.jpg', 'Craftsman Claw Hammer', 'Craftsman', 'Hammer', 'CH627', 'Weight: 16oz, Handle: Fiberglass.', '2023-11-30', '2025-11-30', 'Available', 'Comfortable grip.', '/public/qrcodes/tools/ch627.png'),
(15, '/public/images/tools/proto_torque_wrench.jpg', 'Proto Torque Wrench', 'Proto', 'Torque Wrench', 'TW318', 'Torque Range: 20-100 Nm.', '2023-07-07', '2025-07-07', 'Issued Out', 'Calibration required.', '/public/qrcodes/tools/tw318.png'),
(16, '/public/images/tools/snapon_ratchet.jpg', 'Snap-on Ratchet', 'Snap-on', 'Ratchet', 'RT293', 'Drive Size: 3/8 inch.', '2024-01-12', '2026-01-12', 'Available', 'Durable and smooth operation.', '/public/qrcodes/tools/rt293.png'),
(17, '/public/images/tools/fluke_digital_multimeter.jpg', 'Fluke Digital Multimeter', 'Fluke', 'Multimeter', 'DM443', 'Voltage Range: 600V, Auto-ranging.', '2023-08-29', '2025-08-29', 'Issued Out', 'Battery low indicator showing.', '/public/qrcodes/tools/dm443.png'),
(18, '/public/images/tools/greenlee_cable_cutter.jpg', 'Greenlee Cable Cutter', 'Greenlee', 'Cable Cutter', 'CC738', 'Cuts up to 1-inch cables.', '2023-06-21', '2025-06-21', 'Available', 'Blades are still sharp.', '/public/qrcodes/tools/cc738.png'),
(19, '/public/images/tools/lincoln_welding_helmet.jpg', 'Lincoln Electric Welding Helmet', 'Lincoln Electric', 'Safety Gear', 'WH954', 'Auto-darkening lens, UV protection.', '2024-03-15', '2026-03-15', 'Available', 'Lens needs cleaning.', '/public/qrcodes/tools/wh954.png'),
(20, '/public/images/tools/3m_safety_glasses.jpg', '3M Safety Glasses', '3M', 'Safety Gear', 'SG215', 'Scratch-resistant, Anti-fog.', '2024-04-10', '2026-04-10', 'Available', 'Lightweight and comfortable.', '/public/qrcodes/tools/sg215.png'),
(78, '', 'Test', 'Test', 'Test', 'TEST', 'TET', '2025-03-31', '2025-03-31', 'Available', 'DSZ', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKtSURBVO3BQY6kAAwEwSyL/385d44+ISGgt8fjiPiDNUaxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFEObkrCJ6mcSUKn0iXhjEqXhE9SuaNYoxRrlGKNcvAwlScl4Y4kPEnlSUl4UrFGKdYoxRrl4GVJuELliiT8T0m4QuVNxRqlWKMUa5SDYVT+smKNUqxRijXKwTBJ6FTOJKFT+c2KNUqxRinWKAcvU/kklS4JZ1TuUPkmxRqlWKMUa5SDhyXhm6l0SehUziThmxVrlGKNUqxR4g9+sSR0Kn9ZsUYp1ijFGuXgpiR0Kl0SnqTSqXRJuELlTBKepPKmYo1SrFGKNcrBw5LQqTwpCVeodEnoknCHSpeETuVMEjqVO4o1SrFGKdYoBzepdEm4IgmdSpeETuUOlS4JnUqXhCcloVN5UrFGKdYoxRol/uAXSUKn0iXhk1S6JJxReVOxRinWKMUa5eCmJHwzlTNJ6FTOJKFLQqdyJgmdypOKNUqxRinWKAc3qfxPSehUuiR0KneodEnoktCpnElCp3JHsUYp1ijFGuXgpiR8kkqnckalS0Kn0iWhU+mS0Kl0SbhC5UnFGqVYoxRrlPiDG5LQqTwpCZ1Kl4ROpUtCp/KkJDxJ5Y5ijVKsUYo1ysHLknCFyh1J6FS6JHQqXRI6lTMqVyShU3lSsUYp1ijFGuVgGJUrknAmCZ1Kl4QzKp3Km4o1SrFGKdYoB3+MSpeETqVLQpeETuVMEjqVNxVrlGKNUqxRDl6m8iaVLgmdSpeEM0k4o/LNijVKsUYp1igHD0vCJyXhCpUuCZ3KFUnoVDqVLgmdypOKNUqxRinWKPEHa4xijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRqlWKP8AxUXCvF0TKnfAAAAAElFTkSuQmCC');

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
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `profile`, `status`) VALUES
(1, 'Admin', 'admin', '$2a$10$ysgopAQfZawXdZ1g/FR14.H6AHlM9WXN3b8xgFumPfCslOuggBGrC', 'Admin', '', ''),
(2, 'Project Manager', 'projectmanager', '$2a$10$5igFGny7DJqMhytkBf4kVeqGbM4K6W/irDNE85PkcQlpgKXDJspY2', 'Manager', '', ''),
(3, 'Staff', 'staff@gmail.com', '$2a$10$HubgO1cxr6VuWG1/ckSXm.j/C1CAHT7IvcnCRaO5Xq5SD/4FWinmm', 'Staff', '', ''),
(4, 'Nolly Alvarado', 'nolly@gmail.com', '$2a$10$1w0n9/8yC97EtQdzZIOarelAVOfrvIPrF.Pxk2CQRXDlQ26O9C.Q6', 'Staff', '', 'Active'),
(5, 'Angelo Padilla', 'angelo@gmail.com', '$2a$10$P6q/ONJd9m7bMzfwD4TMJugPFtP2apWKyeb478CMy/isNN3oYTgMK', 'Admin', '', 'Active');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `tools`
--
ALTER TABLE `tools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
