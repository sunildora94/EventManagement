-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 02, 2023 at 06:35 PM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_events`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_events`
--

DROP TABLE IF EXISTS `tbl_events`;
CREATE TABLE IF NOT EXISTS `tbl_events` (
  `event_id` int(11) NOT NULL AUTO_INCREMENT,
  `event_name` varchar(100) NOT NULL,
  `event_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `event_desc` text NOT NULL,
  `event_price` int(11) NOT NULL,
  `event_type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 => normal and 1 => premium',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`event_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_events`
--

INSERT INTO `tbl_events` (`event_id`, `event_name`, `event_date`, `event_desc`, `event_price`, `event_type`, `created_date`, `updated_date`) VALUES
(1, 'Wedding', '2023-03-02 22:14:38', 'Wedding', 100, 1, '2023-03-02 22:14:38', '2023-03-02 22:14:38'),
(2, 'Test', '2023-03-03 00:00:00', 'test', 500, 0, '2023-03-02 23:24:15', '2023-03-02 23:24:15');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
CREATE TABLE IF NOT EXISTS `tbl_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(32) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`user_id`, `user_email`, `user_password`, `user_name`, `created_date`) VALUES
(4, 'sunildora94@gmail.com', 'f925916e2754e5e03f75dd58a5733251', 'Sunil Dora', '2023-03-02 21:19:26'),
(3, 'sunildora945@gmail.com', 'f925916e2754e5e03f75dd58a5733251', 'sunildora', '2023-03-02 21:11:34');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
