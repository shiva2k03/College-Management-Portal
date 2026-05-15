-- Run once in phpMyAdmin or MySQL CLI so student/teacher profiles store institute name
ALTER TABLE students ADD COLUMN instituteName VARCHAR(100) NULL;
ALTER TABLE teachers ADD COLUMN instituteName VARCHAR(100) NULL;
