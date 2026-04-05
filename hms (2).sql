-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2024 at 05:32 AM
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
-- Database: `hms`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` int(10) NOT NULL,
  `doctor` varchar(50) NOT NULL,
  `hospital` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `message` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`id`, `user_id`, `name`, `email`, `phone`, `doctor`, `hospital`, `date`, `time`, `message`) VALUES
(50, 5, 'pravinda kassapa', 'pravindakassapa@gmail.com', 779794237, 'Dr. Rajitha Fernando - Orthopedic Surgeon', 'Hospital C', '2024-03-22', '20:40:00', 'i need to put  a appointment next week\n');

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `Name` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Message` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `emergency_requests`
--

CREATE TABLE `emergency_requests` (
  `condition_patient` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL,
  `urgency` varchar(50) NOT NULL,
  `selected_doctor` varchar(10) NOT NULL,
  `room_id` int(11) NOT NULL,
  `patient_name` varchar(50) NOT NULL,
  `doc_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `user_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `payment_email` varchar(50) NOT NULL,
  `payment_date` date NOT NULL,
  `payment_amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`user_id`, `id`, `payment_email`, `payment_date`, `payment_amount`) VALUES
(5, 24, 'pravindakassapa@gmail.com', '2024-03-16', 2000.00);

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `doc_name` varchar(50) NOT NULL,
  `rating` int(100) NOT NULL,
  `feedback` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`id`, `name`, `email`, `doc_name`, `rating`, `feedback`) VALUES
(11, 'pravinda', 'pravindakassapa@gmail.com', 'Dr. Malik perera - consulting doctor', 4, 'Good doctor for taking advices '),
(12, 'Dilmi', 'dilimiperera@gmail.com', 'Dr. Nimal Silva - consulting doctor', 5, 'Treated well'),
(13, 'jagath', 'jagathchari123@gmail', 'Dr. Shanthi Fernando - consulting doctor', 5, 'Good caring and treatment');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) NOT NULL,
  `username` varchar(50) NOT NULL,
  `user_type` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `tel_num` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `user_type`, `email`, `tel_num`, `password`) VALUES
(1, 'Dr. Malik Perera', 'doctor', 'MalikPerera@gmail.com', '0775717025', 'Malik@1'),
(2, 'Dr. Shanthi Fernando', 'doctor', 'ShanthiFernando@gmail.com', '0776736271', 'shanthi@1223'),
(3, 'Dr.Nimal Silva', 'doctor', 'NimalSilva@gmail.com', '0772486124', 'NimalSilva@1'),
(4, 'Dr.AnushaBandara', 'doctor', 'AnushaBandara@gmail.com', '0771785286', 'Anusha@1'),
(5, 'pravinda', 'patient', 'pravindakassapa@gmail.com', '0775717025', 'pravinda@1'),
(9, 'Dilmiperera', 'patient', 'dilimiperera@gmail.com', '071560251', 'Dilmi@123'),
(10, 'jagathchari', 'patient', 'jagathchari123@gmail', '0775138052', 'Jagath@123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
