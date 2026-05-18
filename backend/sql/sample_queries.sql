-- Edventures — sample MySQL queries (run in phpMyAdmin or mysql CLI)
USE edventures;

-- ---------------------------------------------------------------------------
-- Authentication & users
-- ---------------------------------------------------------------------------

-- List all registered institutes
SELECT DISTINCT instituteName FROM admins ORDER BY instituteName;

-- Find admin by email (login check)
SELECT adminID, instituteName, adminName, email
FROM admins
WHERE email = 'admin@demo.edu';

-- List all teachers in an institute
SELECT teacherId, name, email, instituteName
FROM teachers
WHERE instituteName = 'Demo Institute'
ORDER BY name;

-- List all students in a class
SELECT studentId, name, email, grade, className
FROM students
WHERE instituteName = 'Demo Institute' AND className = '10A';

-- Register a new student (password should be hashed in the app)
-- INSERT INTO students (studentId, name, email, password, instituteName)
-- VALUES ('STU002', 'Alice Smith', 'alice@demo.edu', '<bcrypt_hash>', 'Demo Institute');

-- Update student profile
-- UPDATE students SET phone = '9876543210', address = '123 Campus Road' WHERE studentId = 'STU001';

-- ---------------------------------------------------------------------------
-- Subjects & classes
-- ---------------------------------------------------------------------------

-- Add a subject for an institute
INSERT INTO subjects (name, instituteName, teacherId)
VALUES ('Mathematics', 'Demo Institute', 'TCH001');

-- List subjects with assigned teacher
SELECT s.subjectId, s.name AS subject, t.name AS teacher
FROM subjects s
LEFT JOIN teachers t ON s.teacherId = t.teacherId
WHERE s.instituteName = 'Demo Institute';

-- Add a class
INSERT INTO classes (name, grade, instituteName, supervisorId)
VALUES ('10A', '10', 'Demo Institute', 'TCH001');

-- ---------------------------------------------------------------------------
-- Attendance
-- ---------------------------------------------------------------------------

-- Mark attendance for one student
INSERT INTO attendance (studentId, classId, date, status)
VALUES ('STU001', 1, CURDATE(), 'PRESENT')
ON DUPLICATE KEY UPDATE status = 'PRESENT';

-- Daily attendance report for a class
SELECT s.studentId, s.name, a.status, a.date
FROM students s
LEFT JOIN attendance a ON s.studentId = a.studentId AND a.classId = 1 AND a.date = CURDATE()
WHERE s.className = '10A';

-- Count present vs absent today
SELECT status, COUNT(*) AS total
FROM attendance
WHERE date = CURDATE() AND classId = 1
GROUP BY status;

-- ---------------------------------------------------------------------------
-- Exams & results
-- ---------------------------------------------------------------------------

-- Schedule an exam
INSERT INTO exams (title, subjectId, classId, examDate, startTime, endTime, maxMarks)
VALUES ('Mid-Term Math', 1, 1, '2026-06-15', '09:00:00', '11:00:00', 100);

-- Record a result
INSERT INTO results (studentId, examId, marksObtained, grade)
VALUES ('STU001', 1, 85.50, 'A')
ON DUPLICATE KEY UPDATE marksObtained = 85.50, grade = 'A';

-- Class result summary for an exam
SELECT s.studentId, s.name, r.marksObtained, r.grade
FROM students s
JOIN results r ON s.studentId = r.studentId
WHERE r.examId = 1
ORDER BY r.marksObtained DESC;

-- ---------------------------------------------------------------------------
-- Announcements & events
-- ---------------------------------------------------------------------------

INSERT INTO announcements (title, body, instituteName, targetRole)
VALUES (
  'Welcome Back',
  'Classes resume Monday. Please check your timetable.',
  'Demo Institute',
  'ALL'
);

SELECT announcementId, title, targetRole, createdAt
FROM announcements
WHERE instituteName = 'Demo Institute'
ORDER BY createdAt DESC
LIMIT 10;

INSERT INTO events (title, description, instituteName, startDate, endDate)
VALUES (
  'Annual Sports Day',
  'Inter-house sports competitions on the main ground.',
  'Demo Institute',
  '2026-07-20 08:00:00',
  '2026-07-20 17:00:00'
);

-- ---------------------------------------------------------------------------
-- Messages
-- ---------------------------------------------------------------------------

INSERT INTO messages (senderId, senderRole, receiverId, receiverRole, subject, body)
VALUES ('TCH001', 'TEACHER', 'STU001', 'STUDENT', 'Assignment reminder', 'Please submit Lab 3 by Friday.');

SELECT messageId, subject, body, isRead, sentAt
FROM messages
WHERE receiverId = 'STU001' AND receiverRole = 'STUDENT'
ORDER BY sentAt DESC;

-- ---------------------------------------------------------------------------
-- Reports & analytics
-- ---------------------------------------------------------------------------

-- User counts per institute
SELECT
  (SELECT COUNT(*) FROM teachers WHERE instituteName = 'Demo Institute') AS teachers,
  (SELECT COUNT(*) FROM students WHERE instituteName = 'Demo Institute') AS students,
  (SELECT COUNT(*) FROM parents  WHERE instituteName = 'Demo Institute') AS parents;

-- Average marks per subject (join exams → subjects)
SELECT sub.name AS subject, AVG(r.marksObtained) AS avg_marks
FROM results r
JOIN exams e ON r.examId = e.examId
JOIN subjects sub ON e.subjectId = sub.subjectId
GROUP BY sub.subjectId, sub.name;
