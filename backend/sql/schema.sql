-- Edventures — MySQL schema for XAMPP (phpMyAdmin or mysql CLI)
-- Run: mysql -u root -p < backend/sql/schema.sql

CREATE DATABASE IF NOT EXISTS edventures
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE edventures;

-- ---------------------------------------------------------------------------
-- Users & authentication
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS admins (
  adminID        VARCHAR(50)  NOT NULL PRIMARY KEY,
  instituteName  VARCHAR(100) NOT NULL UNIQUE,
  adminName      VARCHAR(100) NOT NULL,
  email          VARCHAR(150) NOT NULL UNIQUE,
  password       VARCHAR(255) NOT NULL,
  createdAt      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS teachers (
  teacherId      VARCHAR(50)  NOT NULL PRIMARY KEY,
  name           VARCHAR(100) NOT NULL,
  email          VARCHAR(150) NOT NULL UNIQUE,
  password       VARCHAR(255) NULL,
  instituteName  VARCHAR(100) NULL,
  phone          VARCHAR(20)  NULL,
  address        VARCHAR(255) NULL,
  photo          VARCHAR(500) NULL,
  createdAt      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_teachers_institute (instituteName)
);

CREATE TABLE IF NOT EXISTS students (
  studentId      VARCHAR(50)  NOT NULL PRIMARY KEY,
  name           VARCHAR(100) NOT NULL,
  email          VARCHAR(150) NOT NULL UNIQUE,
  password       VARCHAR(255) NULL,
  instituteName  VARCHAR(100) NULL,
  grade          VARCHAR(20)  NULL,
  className      VARCHAR(20)  NULL,
  phone          VARCHAR(20)  NULL,
  address        VARCHAR(255) NULL,
  photo          VARCHAR(500) NULL,
  createdAt      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_students_institute (instituteName)
);

CREATE TABLE IF NOT EXISTS parents (
  parentId       VARCHAR(50)  NOT NULL PRIMARY KEY,
  name           VARCHAR(100) NOT NULL,
  email          VARCHAR(150) NOT NULL UNIQUE,
  password       VARCHAR(255) NULL,
  instituteName  VARCHAR(100) NULL,
  studentId      VARCHAR(50)  NULL,
  phone          VARCHAR(20)  NULL,
  createdAt      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_parents_student
    FOREIGN KEY (studentId) REFERENCES students(studentId)
    ON DELETE SET NULL,
  INDEX idx_parents_institute (instituteName)
);

-- ---------------------------------------------------------------------------
-- Academic structure (extend as you wire the API)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS subjects (
  subjectId      INT AUTO_INCREMENT PRIMARY KEY,
  name           VARCHAR(100) NOT NULL,
  instituteName  VARCHAR(100) NOT NULL,
  teacherId      VARCHAR(50)  NULL,
  UNIQUE KEY uk_subject_institute (name, instituteName),
  CONSTRAINT fk_subjects_teacher
    FOREIGN KEY (teacherId) REFERENCES teachers(teacherId)
    ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS classes (
  classId        INT AUTO_INCREMENT PRIMARY KEY,
  name           VARCHAR(50)  NOT NULL,
  grade          VARCHAR(20)  NOT NULL,
  instituteName  VARCHAR(100) NOT NULL,
  capacity       INT          DEFAULT 30,
  supervisorId   VARCHAR(50)  NULL,
  UNIQUE KEY uk_class_institute (name, instituteName),
  CONSTRAINT fk_classes_supervisor
    FOREIGN KEY (supervisorId) REFERENCES teachers(teacherId)
    ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS lessons (
  lessonId       INT AUTO_INCREMENT PRIMARY KEY,
  title          VARCHAR(150) NOT NULL,
  subjectId      INT          NOT NULL,
  classId        INT          NOT NULL,
  teacherId      VARCHAR(50)  NOT NULL,
  day            ENUM('MON','TUE','WED','THU','FRI','SAT') NOT NULL,
  startTime      TIME         NOT NULL,
  endTime        TIME         NOT NULL,
  CONSTRAINT fk_lessons_subject FOREIGN KEY (subjectId) REFERENCES subjects(subjectId) ON DELETE CASCADE,
  CONSTRAINT fk_lessons_class   FOREIGN KEY (classId)   REFERENCES classes(classId)   ON DELETE CASCADE,
  CONSTRAINT fk_lessons_teacher FOREIGN KEY (teacherId) REFERENCES teachers(teacherId) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------------
-- Operations
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS attendance (
  attendanceId   INT AUTO_INCREMENT PRIMARY KEY,
  studentId      VARCHAR(50) NOT NULL,
  classId        INT         NOT NULL,
  date           DATE        NOT NULL,
  status         ENUM('PRESENT','ABSENT','LATE','EXCUSED') NOT NULL DEFAULT 'PRESENT',
  UNIQUE KEY uk_attendance (studentId, classId, date),
  CONSTRAINT fk_attendance_student FOREIGN KEY (studentId) REFERENCES students(studentId) ON DELETE CASCADE,
  CONSTRAINT fk_attendance_class   FOREIGN KEY (classId)   REFERENCES classes(classId)   ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS exams (
  examId         INT AUTO_INCREMENT PRIMARY KEY,
  title          VARCHAR(150) NOT NULL,
  subjectId      INT          NOT NULL,
  classId        INT          NOT NULL,
  examDate       DATE         NOT NULL,
  startTime      TIME         NOT NULL,
  endTime        TIME         NOT NULL,
  maxMarks       INT          DEFAULT 100,
  CONSTRAINT fk_exams_subject FOREIGN KEY (subjectId) REFERENCES subjects(subjectId) ON DELETE CASCADE,
  CONSTRAINT fk_exams_class   FOREIGN KEY (classId)   REFERENCES classes(classId)   ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS results (
  resultId       INT AUTO_INCREMENT PRIMARY KEY,
  studentId      VARCHAR(50) NOT NULL,
  examId         INT         NOT NULL,
  marksObtained  DECIMAL(5,2) NOT NULL,
  grade          VARCHAR(5)  NULL,
  UNIQUE KEY uk_result (studentId, examId),
  CONSTRAINT fk_results_student FOREIGN KEY (studentId) REFERENCES students(studentId) ON DELETE CASCADE,
  CONSTRAINT fk_results_exam    FOREIGN KEY (examId)    REFERENCES exams(examId)    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS assignments (
  assignmentId   INT AUTO_INCREMENT PRIMARY KEY,
  title          VARCHAR(150) NOT NULL,
  subjectId      INT          NOT NULL,
  classId        INT          NOT NULL,
  dueDate        DATE         NOT NULL,
  description    TEXT         NULL,
  CONSTRAINT fk_assignments_subject FOREIGN KEY (subjectId) REFERENCES subjects(subjectId) ON DELETE CASCADE,
  CONSTRAINT fk_assignments_class   FOREIGN KEY (classId)   REFERENCES classes(classId)   ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS announcements (
  announcementId INT AUTO_INCREMENT PRIMARY KEY,
  title          VARCHAR(150) NOT NULL,
  body           TEXT         NOT NULL,
  instituteName  VARCHAR(100) NOT NULL,
  targetRole     ENUM('ALL','ADMIN','TEACHER','STUDENT','PARENT') DEFAULT 'ALL',
  createdAt      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events (
  eventId        INT AUTO_INCREMENT PRIMARY KEY,
  title          VARCHAR(150) NOT NULL,
  description    TEXT         NULL,
  instituteName  VARCHAR(100) NOT NULL,
  startDate      DATETIME     NOT NULL,
  endDate        DATETIME     NOT NULL,
  classId        INT          NULL,
  CONSTRAINT fk_events_class FOREIGN KEY (classId) REFERENCES classes(classId) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS messages (
  messageId      INT AUTO_INCREMENT PRIMARY KEY,
  senderId       VARCHAR(50)  NOT NULL,
  senderRole     ENUM('ADMIN','TEACHER','STUDENT','PARENT') NOT NULL,
  receiverId     VARCHAR(50)  NOT NULL,
  receiverRole   ENUM('ADMIN','TEACHER','STUDENT','PARENT') NOT NULL,
  subject        VARCHAR(150) NULL,
  body           TEXT         NOT NULL,
  isRead         TINYINT(1)   DEFAULT 0,
  sentAt         TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------------
-- Optional seed data (demo institute)
-- Password for demo users: password123 (bcrypt hash below)
-- Generate new hashes with: node -e "console.log(require('bcryptjs').hashSync('password123',10))"
-- ---------------------------------------------------------------------------

INSERT INTO admins (adminID, instituteName, adminName, email, password)
VALUES (
  'ADM001',
  'Demo Institute',
  'Demo Admin',
  'admin@demo.edu',
  '$2a$10$1owqPe0maRvcg0MLc7Ly/u2p3zot08gihFo7TBYFhkOfY.qJUaG2G'
)
ON DUPLICATE KEY UPDATE adminName = adminName;

INSERT INTO teachers (teacherId, name, email, password, instituteName)
VALUES (
  'TCH001',
  'Jane Teacher',
  'teacher@demo.edu',
  '$2a$10$1owqPe0maRvcg0MLc7Ly/u2p3zot08gihFo7TBYFhkOfY.qJUaG2G',
  'Demo Institute'
)
ON DUPLICATE KEY UPDATE name = name;

INSERT INTO students (studentId, name, email, password, instituteName, grade, className)
VALUES (
  'STU001',
  'John Student',
  'student@demo.edu',
  '$2a$10$1owqPe0maRvcg0MLc7Ly/u2p3zot08gihFo7TBYFhkOfY.qJUaG2G',
  'Demo Institute',
  '10',
  '10A'
)
ON DUPLICATE KEY UPDATE name = name;
