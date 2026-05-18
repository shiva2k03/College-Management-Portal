-- Edventures — sample MySQL queries (phpMyAdmin or mysql CLI)
USE edventures;

-- List all institutes
SELECT adminID, instituteName, adminName, email FROM admins;

-- Find admin by email
SELECT * FROM admins WHERE email = 'admin@example.com';

-- Register a new admin (password should be hashed in the app)
-- INSERT INTO admins (instituteName, adminName, email, password)
-- VALUES ('My Institute', 'Admin User', 'admin@example.com', '<bcrypt_hash>');

-- List all students
SELECT id, studentId, name, email FROM students ORDER BY name;

-- Find student by roll number / student ID
SELECT * FROM students WHERE studentId = 'STU001';

-- Add a student
-- INSERT INTO students (studentId, name, email, password)
-- VALUES ('STU002', 'Alice Smith', 'alice@example.com', '<bcrypt_hash>');

-- Update student profile
-- UPDATE students SET name = 'Alice Smith', email = 'alice@example.com' WHERE studentId = 'STU002';

-- List all teachers
SELECT id, teacherId, name, email FROM teachers ORDER BY name;

-- Find teacher by ID
SELECT * FROM teachers WHERE teacherId = 'TCH001';

-- Add a teacher
-- INSERT INTO teachers (teacherId, name, email, password)
-- VALUES ('TCH002', 'Jane Teacher', 'jane@example.com', '<bcrypt_hash>');

-- Count users
SELECT
  (SELECT COUNT(*) FROM admins) AS admins,
  (SELECT COUNT(*) FROM students) AS students,
  (SELECT COUNT(*) FROM teachers) AS teachers;
