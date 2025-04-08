-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2025 at 01:15 PM
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
  `date` date NOT NULL,
  `status` varchar(50) NOT NULL,
  `qr` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consumables`
--

INSERT INTO `consumables` (`id`, `picture`, `tag`, `name`, `quantity`, `minStock`, `unit`, `location`, `date`, `status`, `qr`, `category`) VALUES
(1, 'wd-40.jpg', 'WD40-100', 'WD-40 Lubricant', 50, 10, 'ml', 'Storage Room A', '2024-03-01', 'Available', 'AG123_qrcode.png', 'Lubricant'),
(2, 'electrical-tape.jpg', 'ET-3M', 'Electrical Tape', 100, 20, 'pcs', 'Storage Room B', '2024-03-02', 'Available', 'AG123_qrcode.png', 'Tape'),
(3, 'cable-ties.jpg', 'CT-50', 'Cable Ties', 500, 100, 'pcs', 'Tool Cabinet', '2024-03-03', 'Available', 'AG123_qrcode.png', 'Tie'),
(4, 'super-glue.jpg', 'SG-LOCTITE', 'Super Glue', 75, 15, 'tubes', 'Shelf C2', '2024-03-04', 'Available', 'AG123_qrcode.png', 'Glue'),
(5, 'scotch-tape.jpg', 'MT-Scotch', 'Masking Tape', 60, 10, 'rolls', 'Shelf C3', '2024-03-05', 'Available', 'AG123_qrcode.png', 'Tape'),
(6, 'public/images/consumables/6.jpg', 'DG-100', 'Disposable Gloves', 1000, 200, 'pairs', 'Safety Gear Locker', '2024-03-06', 'Available', 'AG123_qrcode.png', 'Gloves'),
(7, 'public/images/consumables/7.jpg', 'SG-Uvex', 'Safety Glasses', 30, 5, 'pcs', 'Safety Gear Locker', '2024-03-07', 'Issued Out', 'public/qr/consumables/7.png', 'Glasses'),
(8, 'public/images/consumables/8.jpg', 'FM-3M', 'Disposable Face Mask', 500, 50, 'pcs', 'First Aid Box', '2024-03-08', 'Available', 'public/qr/consumables/8.png', 'Mask'),
(9, 'public/images/consumables/9.jpg', 'MC-100', 'Microfiber Cloth', 200, 40, 'pcs', 'Cleaning Supplies Shelf', '2024-03-09', 'Available', 'public/qr/consumables/9.png', 'Cloth'),
(10, 'public/images/consumables/10.jpg', 'HS-Purell', 'Hand Sanitizer', 80, 20, 'bottles', 'First Aid Box', '2024-03-10', 'Available', 'public/qr/consumables/10.png', NULL),
(11, 'public/images/consumables/11.jpg', 'DT-Gorilla', 'Duct Tape', 50, 10, 'rolls', 'Shelf C4', '2024-03-11', 'Available', 'public/qr/consumables/11.png', NULL),
(12, 'public/images/consumables/12.jpg', 'AA-Duracell', 'Batteries AA', 100, 20, 'packs', 'Power Supply Box', '2024-03-12', 'Available', 'public/qr/consumables/12.png', 'Battery'),
(13, 'public/images/consumables/13.jpg', 'AAA-Energizer', 'Batteries AAA', 80, 15, 'packs', 'Power Supply Box', '2024-03-13', 'Available', 'public/qr/consumables/13.png', 'Battery'),
(14, 'public/images/consumables/14.jpg', 'SS-Dow', 'Silicone Sealant', 40, 10, 'tubes', 'Storage Room C', '2024-03-14', 'Available', 'public/qr/consumables/14.png', 'Sealant'),
(15, 'public/images/consumables/15.jpg', 'PBS-Purdy', 'Paint Brush Set', 30, 5, 'sets', 'Painting Supplies Shelf', '2024-03-15', 'Available', 'public/qr/consumables/15.png', 'Brush'),
(16, 'public/images/consumables/16.jpg', 'SW-Kester', 'Soldering Wire', 25, 5, 'spools', 'Electrical Tools Shelf', '2024-03-16', 'Available', 'public/qr/consumables/16.png', 'Wire'),
(17, 'public/images/consumables/17.jpg', 'SP-3M', 'Sandpaper Pack', 50, 10, 'packs', 'Abrasive Materials Shelf', '2024-03-17', 'Available', 'public/qr/consumables/17.png', NULL),
(18, 'public/images/consumables/18.jpg', 'NCC-100', 'Nylon Cable Clips', 300, 50, 'packs', 'Fasteners Drawer', '2024-03-18', 'Available', 'public/qr/consumables/18.png', NULL),
(19, 'public/images/consumables/19.jpg', 'TST-Teflon', 'Thread Seal Tape', 90, 15, 'rolls', 'Plumbing Supplies Shelf', '2024-03-19', 'Available', 'public/qr/consumables/19.png', NULL),
(20, 'public/images/consumables/20.jpg', 'WC-Wago', 'Wire Connectors', 120, 30, 'packs', 'Electrical Tools Shelf', '2024-03-20', 'Available', 'public/qr/consumables/20.png', NULL);

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
  `status` varchar(50) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `qr` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tools`
--

INSERT INTO `tools` (`id`, `picture`, `name`, `brand`, `category`, `tag`, `description`, `purchase_date`, `warranty`, `status`, `remarks`, `qr`) VALUES
(1, 'makita-angle-grinder.jpg', 'Makita Angle Grinder', 'Makita', 'Angle Grinder', 'AG123', 'Power: 750W, RPM: 12,000, Disc Diameter: 125mm, Weight: 2.5kg.', '2024-05-12', '2026-05-12', 'Available', 'Requires regular maintenance, occasional overheating.', 'AG123_qrcode.png'),
(2, 'bosch-drill-machine.jpg', 'Bosch Drill Machine', 'Bosch', 'Drill Machine', 'DM456', 'Power: 500W, Speed: 3000 RPM, Chuck Size: 13mm.', '2023-08-22', '2025-08-22', 'Available', 'Lightweight and easy to use.', 'AG123_qrcode.png'),
(3, 'dewalt-impact-driver.jpg', 'DeWalt Impact Driver', 'DeWalt', 'Impact Driver', 'ID789', 'Torque: 180 Nm, Speed: 2,800 RPM.', '2023-07-10', '2025-07-10', 'Issued-Out', 'Battery life depleting fast.', 'AG123_qrcode.png'),
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
(20, '/public/images/tools/3m_safety_glasses.jpg', '3M Safety Glasses', '3M', 'Safety Gear', 'SG215', 'Scratch-resistant, Anti-fog.', '2024-04-10', '2026-04-10', 'Available', 'Lightweight and comfortable.', '/public/qrcodes/tools/sg215.png');

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
(1, 'Admin', 'admin@gmail.com', '$2a$10$ysgopAQfZawXdZ1g/FR14.H6AHlM9WXN3b8xgFumPfCslOuggBGrC', 'admin', '', ''),
(2, 'Project Manager', 'projectmanager@gmail.com', '$2a$10$5igFGny7DJqMhytkBf4kVeqGbM4K6W/irDNE85PkcQlpgKXDJspY2', 'project manager', '', ''),
(3, 'Staff', 'staff@gmail.com', '$2a$10$HubgO1cxr6VuWG1/ckSXm.j/C1CAHT7IvcnCRaO5Xq5SD/4FWinmm', 'staff', '', ''),
(4, 'Nolly Alvarado', 'nolly@gmail.com', '$2a$10$1w0n9/8yC97EtQdzZIOarelAVOfrvIPrF.Pxk2CQRXDlQ26O9C.Q6', 'admin', '', 'Active'),
(5, 'Angelo Padilla', 'angelo@gmail.com', '$2a$10$P6q/ONJd9m7bMzfwD4TMJugPFtP2apWKyeb478CMy/isNN3oYTgMK', 'admin', '', 'Active');

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
  `qr` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `picture`, `name`, `brand`, `plate_no`, `category`, `fuel_type`, `location`, `acquisition_date`, `status`, `remarks`, `maintenance_due`, `assigned_driver`, `qr`) VALUES
(1, 'jetvac1.jpg', 'Jet Vac 1', 'Isuzu', 'ABC-1234', 'Jetting Truck', 'Diesel', 'Depot A', '2022-05-15', 'Active', 'Ready for deployment', '2025-06-10', 'John Doe', 'QR001'),
(2, 'jetvac2.jpg', 'Jet Vac 2', 'Fuso', 'XYZ-5678', 'Jetting Truck', 'Diesel', 'Depot B', '2023-01-20', 'Under Maintenance', 'Hydraulic leak detected', '2025-04-22', 'Jane Smith', 'QR002'),
(3, 'servicevan1.jpg', 'Service Van 1', 'Toyota', 'DEF-4567', 'Service Van', 'Gasoline', 'Depot C', '2021-11-05', 'Active', 'Driver assigned', '2025-05-12', 'Mike Ross', 'QR003'),
(4, 'servicevan2.jpg', 'Service Van 2', 'Nissan', 'GHI-8910', 'Service Van', 'Diesel', 'Depot A', '2020-09-18', 'Active', 'New tires installed', '2025-07-30', 'Rachel Zane', 'QR004'),
(5, 'pickup1.jpg', 'Pick-up Truck 1', 'Mitsubishi', 'JKL-1122', 'Pick-up Truck', 'Diesel', 'Depot B', '2019-03-12', 'Active', 'Good condition', '2025-08-15', 'Harvey Specter', 'QR005'),
(6, 'pickup2.jpg', 'Pick-up Truck 2', 'Ford', 'MNO-3344', 'Pick-up Truck', 'Diesel', 'Depot C', '2018-07-22', 'Inactive', 'To be scrapped', '2025-05-25', 'Louis Litt', 'QR006'),
(7, 'vacuum1.jpg', 'Vacuum Truck 1', 'Volvo', 'PQR-5566', 'Vacuum Truck', 'Diesel', 'Depot A', '2022-02-14', 'Active', 'Full tank', '2025-06-05', 'Donna Paulsen', 'QR007'),
(8, 'vacuum2.jpg', 'Vacuum Truck 2', 'MAN', 'STU-7788', 'Vacuum Truck', 'Diesel', 'Depot B', '2021-08-09', 'Under Maintenance', 'Brake check needed', '2025-07-10', 'Harold Gunderson', 'QR008'),
(9, 'truck1.jpg', 'Truck 1', 'Hyundai', 'VWX-9900', 'Cargo Truck', 'Diesel', 'Depot C', '2020-12-01', 'Active', 'Operational', '2025-09-01', 'Jessica Pearson', 'QR009'),
(10, 'truck2.jpg', 'Truck 2', 'Hino', 'YZA-1235', 'Cargo Truck', 'Diesel', 'Depot A', '2019-04-30', 'Inactive', 'Retired vehicle', '2025-06-20', 'Katrina Bennett', 'QR010'),
(11, 'servicecar1.jpg', 'Service Car 1', 'Honda', 'BCD-3456', 'Service Car', 'Gasoline', 'Depot B', '2021-03-17', 'Active', 'Windshield replaced', '2025-04-18', 'Jeff Malone', 'QR011'),
(12, 'servicecar2.jpg', 'Service Car 2', 'Suzuki', 'EFG-7890', 'Service Car', 'Gasoline', 'Depot C', '2023-07-03', 'Active', 'Low fuel', '2025-08-22', 'Sheila Sazs', 'QR012'),
(13, 'trailer1.jpg', 'Trailer 1', 'Scania', 'HIJ-2345', 'Trailer', 'Diesel', 'Depot A', '2022-10-12', 'Active', 'Operational', '2025-10-12', 'Stephen Huntley', 'QR013'),
(14, 'trailer2.jpg', 'Trailer 2', 'DAF', 'KLM-6789', 'Trailer', 'Diesel', 'Depot B', '2020-06-18', 'Inactive', 'Awaiting parts', '2025-07-15', 'Dana Scott', 'QR014'),
(15, 'jetvac3.jpg', 'Jet Vac 3', 'Isuzu', 'NOP-9012', 'Jetting Truck', 'Diesel', 'Depot C', '2023-02-28', 'Active', 'Fully serviced', '2025-09-25', 'Harvey Specter', 'QR015'),
(16, 'pickup3.jpg', 'Pick-up Truck 3', 'Chevrolet', 'QRS-3456', 'Pick-up Truck', 'Diesel', 'Depot A', '2022-09-09', 'Active', 'Ready for field work', '2025-05-08', 'Mike Ross', 'QR016'),
(17, 'vacuum3.jpg', 'Vacuum Truck 3', 'MAN', 'TUV-7891', 'Vacuum Truck', 'Diesel', 'Depot B', '2021-05-19', 'Under Maintenance', 'Engine noise', '2025-06-11', 'Donna Paulsen', 'QR017'),
(18, 'truck3.jpg', 'Truck 3', 'Hino', 'WXY-2347', 'Cargo Truck', 'Diesel', 'Depot C', '2019-08-24', 'Active', 'New oil change', '2025-07-07', 'Jessica Pearson', 'QR018'),
(19, 'servicecar3.jpg', 'Service Car 3', 'Hyundai', 'ZAB-5678', 'Service Car', 'Gasoline', 'Depot A', '2023-03-14', 'Active', 'Cleaned and ready', '2025-06-28', 'Jeff Malone', 'QR019'),
(20, 'jetvac4.jpg', 'Jet Vac 4', 'Isuzu', 'CDE-8912', 'Jetting Truck', 'Diesel', 'Depot B', '2024-01-05', 'Active', 'Newly acquired', '2025-11-02', 'Rachel Zane', 'QR020');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tools`
--
ALTER TABLE `tools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
