CREATE DATABASE IF NOT EXISTS natyaswara CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE natyaswara;


-- Admins
CREATE TABLE admins (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(150) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Classes
CREATE TABLE classes (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL,
description TEXT,
teacher VARCHAR(255),
start_date DATE,
end_date DATE,
seats INT DEFAULT 0,
price DECIMAL(10,2) DEFAULT 0,
image VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Users (basic for enrollments/reviews)
CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(150) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
phone VARCHAR(40),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Enrollments
CREATE TABLE enrollments (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
class_id INT NOT NULL,
status ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
);


-- Events
CREATE TABLE events (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL,
description TEXT,
date DATETIME,
venue VARCHAR(255),
total_tickets INT DEFAULT 0,
price DECIMAL(10,2) DEFAULT 0,
image VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Bookings / Ticket purchases
CREATE TABLE bookings (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
event_id INT NOT NULL,
qty INT DEFAULT 1,
amount DECIMAL(10,2) DEFAULT 0,
status ENUM('pending','paid','cancelled') DEFAULT 'pending',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);