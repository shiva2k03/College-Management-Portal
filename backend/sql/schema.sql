CREATE DATABASE edventures;
USE edventures;

CREATE TABLE admins (
    adminID INT AUTO_INCREMENT PRIMARY KEY,
    instituteName VARCHAR(255) NOT NULL,
    adminName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    studentId VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255)
);

CREATE TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    teacherId VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255)
);
