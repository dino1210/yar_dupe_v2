-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 05, 2025 at 03:58 AM
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
  `qr` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consumables`
--

INSERT INTO `consumables` (`id`, `picture`, `tag`, `name`, `quantity`, `minStock`, `unit`, `location`, `date`, `status`, `qr`) VALUES
(1, 'wd-40.jpg', 'WD40-100', 'WD-40 Lubricant', 50, 10, 'ml', 'Storage Room A', '2024-03-01', 'Available', 'AG123_qrcode.png'),
(2, 'electrical-tape.jpg', 'ET-3M', 'Electrical Tape', 100, 20, 'pcs', 'Storage Room B', '2024-03-02', 'Available', 'AG123_qrcode.png'),
(3, 'cable-ties.jpg', 'CT-50', 'Cable Ties', 500, 100, 'pcs', 'Tool Cabinet', '2024-03-03', 'Available', 'AG123_qrcode.png'),
(4, 'super-glue.jpg', 'SG-LOCTITE', 'Super Glue', 75, 15, 'tubes', 'Shelf C2', '2024-03-04', 'Available', 'AG123_qrcode.png'),
(5, 'scotch-tape.jpg', 'MT-Scotch', 'Masking Tape', 60, 10, 'rolls', 'Shelf C3', '2024-03-05', 'Available', 'AG123_qrcode.png'),
(6, 'public/images/consumables/6.jpg', 'DG-100', 'Disposable Gloves', 1000, 200, 'pairs', 'Safety Gear Locker', '2024-03-06', 'Available', 'AG123_qrcode.png'),
(7, 'public/images/consumables/7.jpg', 'SG-Uvex', 'Safety Glasses', 30, 5, 'pcs', 'Safety Gear Locker', '2024-03-07', 'Issued Out', 'public/qr/consumables/7.png'),
(8, 'public/images/consumables/8.jpg', 'FM-3M', 'Disposable Face Mask', 500, 50, 'pcs', 'First Aid Box', '2024-03-08', 'Available', 'public/qr/consumables/8.png'),
(9, 'public/images/consumables/9.jpg', 'MC-100', 'Microfiber Cloth', 200, 40, 'pcs', 'Cleaning Supplies Shelf', '2024-03-09', 'Available', 'public/qr/consumables/9.png'),
(10, 'public/images/consumables/10.jpg', 'HS-Purell', 'Hand Sanitizer', 80, 20, 'bottles', 'First Aid Box', '2024-03-10', 'Available', 'public/qr/consumables/10.png'),
(11, 'public/images/consumables/11.jpg', 'DT-Gorilla', 'Duct Tape', 50, 10, 'rolls', 'Shelf C4', '2024-03-11', 'Available', 'public/qr/consumables/11.png'),
(12, 'public/images/consumables/12.jpg', 'AA-Duracell', 'Batteries AA', 100, 20, 'packs', 'Power Supply Box', '2024-03-12', 'Available', 'public/qr/consumables/12.png'),
(13, 'public/images/consumables/13.jpg', 'AAA-Energizer', 'Batteries AAA', 80, 15, 'packs', 'Power Supply Box', '2024-03-13', 'Available', 'public/qr/consumables/13.png'),
(14, 'public/images/consumables/14.jpg', 'SS-Dow', 'Silicone Sealant', 40, 10, 'tubes', 'Storage Room C', '2024-03-14', 'Available', 'public/qr/consumables/14.png'),
(15, 'public/images/consumables/15.jpg', 'PBS-Purdy', 'Paint Brush Set', 30, 5, 'sets', 'Painting Supplies Shelf', '2024-03-15', 'Available', 'public/qr/consumables/15.png'),
(16, 'public/images/consumables/16.jpg', 'SW-Kester', 'Soldering Wire', 25, 5, 'spools', 'Electrical Tools Shelf', '2024-03-16', 'Available', 'public/qr/consumables/16.png'),
(17, 'public/images/consumables/17.jpg', 'SP-3M', 'Sandpaper Pack', 50, 10, 'packs', 'Abrasive Materials Shelf', '2024-03-17', 'Available', 'public/qr/consumables/17.png'),
(18, 'public/images/consumables/18.jpg', 'NCC-100', 'Nylon Cable Clips', 300, 50, 'packs', 'Fasteners Drawer', '2024-03-18', 'Available', 'public/qr/consumables/18.png'),
(19, 'public/images/consumables/19.jpg', 'TST-Teflon', 'Thread Seal Tape', 90, 15, 'rolls', 'Plumbing Supplies Shelf', '2024-03-19', 'Available', 'public/qr/consumables/19.png'),
(20, 'public/images/consumables/20.jpg', 'WC-Wago', 'Wire Connectors', 120, 30, 'packs', 'Electrical Tools Shelf', '2024-03-20', 'Available', 'public/qr/consumables/20.png');

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
(1, 'makita-angle-grinder.jpg', 'Makita Angle Grinder', 'Makita', 'Angle Grinder', 'AG123', 'Power: 750W, RPM: 12,000, Disc Diameter: 125mm, Weight: 2.5kg.', '2024-05-12', '2026-05-12', 'Issued Out', 'Requires regular maintenance, occasional overheating.', 'AG123_qrcode.png'),
(2, 'bosch-drill-machine.jpg', 'Bosch Drill Machine', 'Bosch', 'Drill Machine', 'DM456', 'Power: 500W, Speed: 3000 RPM, Chuck Size: 13mm.', '2023-08-22', '2025-08-22', 'Available', 'Lightweight and easy to use.', 'AG123_qrcode.png'),
(3, 'dewalt-impact-driver.jpg', 'DeWalt Impact Driver', 'DeWalt', 'Impact Driver', 'ID789', 'Torque: 180 Nm, Speed: 2,800 RPM.', '2023-07-10', '2025-07-10', 'Under Repair', 'Battery life depleting fast.', 'AG123_qrcode.png'),
(4, 'hilti-rotary-hammer.jpg', 'Hilti Rotary Hammer', 'Hilti', 'Rotary Hammer', 'RH654', 'Impact Energy: 2.5J, Speed: 1200 RPM.', '2023-10-05', '2026-10-05', 'Available', 'Ideal for heavy-duty tasks.', 'AG123_qrcode.png'),
(5, 'hitachi-circular-saw.jpg', 'Hitachi Circular Saw', 'Hitachi', 'Circular Saw', 'CS321', 'Blade Size: 185mm, Power: 1400W.', '2024-02-20', '2026-02-20', 'Issued Out', 'Sharp and efficient.', 'AG123_qrcode.png'),
(6, '/public/images/tools/ryobi_jigsaw.jpg', 'Ryobi Jigsaw', 'Ryobi', 'Jigsaw', 'JS987', 'Stroke Length: 26mm, Speed: 3,000 SPM.', '2023-06-15', '2025-06-15', 'Available', 'Works great for curved cuts.', 'AG123_qrcode.png'),
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
(4, 'nolly', 'nolly@gmail.com', '$2a$10$1w0n9/8yC97EtQdzZIOarelAVOfrvIPrF.Pxk2CQRXDlQ26O9C.Q6', 'admin', '', 'Active'),
(5, 'angelo', 'angelo@gmail.com', '$2a$10$P6q/ONJd9m7bMzfwD4TMJugPFtP2apWKyeb478CMy/isNN3oYTgMK', 'admin', '', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `plate_no` varchar(20) NOT NULL,
  `status` enum('Available','In Use','Under Maintenance') DEFAULT 'Available',
  `location` varchar(100) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `qr` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `picture`, `name`, `brand`, `category`, `plate_no`, `status`, `location`, `remarks`, `qr`) VALUES
(1, 'https://example.com/images/vehicle1.jpg', 'Hilux', 'Toyota', 'Truck', 'XYZ 1234', 'Available', 'Warehouse A', 'Ready for transport', 'QR123456789'),
(2, 'https://example.com/images/vehicle2.jpg', 'Fortuner', 'Toyota', 'SUV', 'XYZ 2345', 'In Use', 'Site B', 'Assigned to project', 'QR987654321'),
(3, 'https://example.com/images/vehicle3.jpg', 'Ranger', 'Ford', 'Truck', 'XYZ 3456', 'Under Maintenance', 'Workshop', 'Engine repair', 'QR112233445'),
(4, 'https://example.com/images/vehicle4.jpg', 'Transit', 'Ford', 'Van', 'XYZ 4567', 'Available', 'Warehouse C', 'Available for logistics', 'QR556677889'),
(5, 'https://example.com/images/vehicle5.jpg', 'F-150', 'Ford', 'Truck', 'XYZ 5678', 'Available', 'Site A', 'Ready for heavy lifting', 'QR998877665'),
(6, 'https://example.com/images/vehicle6.jpg', 'Hilux', 'Toyota', 'Truck', 'XYZ 6789', 'In Use', 'Site B', 'On delivery', 'QR443322110'),
(7, 'https://example.com/images/vehicle7.jpg', 'X5', 'BMW', 'SUV', 'XYZ 7890', 'Available', 'Office', 'Luxury vehicle for executive use', 'QR223344556'),
(8, 'https://example.com/images/vehicle8.jpg', 'Pajero', 'Mitsubishi', 'SUV', 'XYZ 8901', 'Under Maintenance', 'Workshop', 'Suspension repairs', 'QR998811223'),
(9, 'https://example.com/images/vehicle9.jpg', 'Transit', 'Ford', 'Van', 'XYZ 9012', 'In Use', 'Warehouse B', 'Used for deliveries', 'QR665544332'),
(10, 'https://example.com/images/vehicle10.jpg', 'Tacoma', 'Toyota', 'Truck', 'XYZ 0123', 'Available', 'Site C', 'Ready for operation', 'QR123498765'),
(11, 'https://example.com/images/vehicle11.jpg', 'Sprinter', 'Mercedes', 'Van', 'XYZ 1235', 'In Use', 'Warehouse A', 'Used for goods transport', 'QR887766554'),
(12, 'https://example.com/images/vehicle12.jpg', 'L200', 'Mitsubishi', 'Truck', 'XYZ 2346', 'Available', 'Office', 'For urgent tasks', 'QR101112131'),
(13, 'https://example.com/images/vehicle13.jpg', 'Pathfinder', 'Nissan', 'SUV', 'XYZ 3457', 'Under Maintenance', 'Workshop', 'Transmission check', 'QR345678901'),
(14, 'https://example.com/images/vehicle14.jpg', 'F-250', 'Ford', 'Truck', 'XYZ 4568', 'Available', 'Warehouse A', 'Ready for heavy load', 'QR654321987'),
(15, 'https://example.com/images/vehicle15.jpg', 'Civic', 'Honda', 'SUV', 'XYZ 5679', 'Available', 'Office', 'Executive vehicle', 'QR876543210'),
(16, 'https://example.com/images/vehicle16.jpg', 'X3', 'BMW', 'SUV', 'XYZ 6780', 'In Use', 'Site A', 'Transporting workers', 'QR567890123'),
(17, 'https://example.com/images/vehicle17.jpg', 'B-Class', 'Mercedes', 'Van', 'XYZ 7891', 'Available', 'Office', 'For admin tasks', 'QR234567890'),
(18, 'https://example.com/images/vehicle18.jpg', 'Rav4', 'Toyota', 'SUV', 'XYZ 8902', 'Under Maintenance', 'Workshop', 'Battery replacement', 'QR654123987'),
(19, 'https://example.com/images/vehicle19.jpg', 'Lexus RX', 'Lexus', 'SUV', 'XYZ 9013', 'Available', 'Site B', 'Client transport', 'QR112233997'),
(20, 'https://example.com/images/vehicle20.jpg', 'Explorer', 'Ford', 'SUV', 'XYZ 0124', 'In Use', 'Site C', 'In transit', 'QR998877001');

--
-- Indexes for dumped tables
--

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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `plate_no` (`plate_no`),
  ADD UNIQUE KEY `qr` (`qr`);

--
-- AUTO_INCREMENT for dumped tables
--

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
