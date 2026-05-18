const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");

async function getConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
  });
}

function roleConfig(role) {
  if (role === "Student") {
    return { table: "students", idColumn: "studentId" };
  }
  if (role === "Teacher") {
    return { table: "teachers", idColumn: "teacherId" };
  }
  if (role === "Admin") {
    return { table: "admins", idColumn: "adminID" };
  }
  return null;
}

async function checkPassword(plainPassword, storedHash) {
  if (!storedHash) return false;
  if (String(storedHash).startsWith("$2")) {
    return bcrypt.compare(plainPassword, storedHash);
  }
  return plainPassword === storedHash;
}

function userPayload(user, role) {
  const displayName =
    user.name || user.adminName || user.adminID || user.studentId || user.teacherId || "";
  return {
    success: true,
    role,
    instituteName: user.instituteName || "",
    name: displayName,
    email: user.email || "",
  };
}

router.post("/verify", async (req, res) => {
  const { rollNumber, password, role } = req.body;

  if (!rollNumber || !password || !role) {
    return res.status(400).json({ message: "ID, password, and role are required." });
  }

  const config = roleConfig(role);
  if (!config) {
    return res.status(400).json({ message: "Invalid role." });
  }

  const { table, idColumn } = config;
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT * FROM ${table} WHERE ${idColumn} = ?`,
      [rollNumber]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid ID or password." });
    }

    const user = rows[0];
    const isValidPassword = await checkPassword(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid ID or password." });
    }

    res.json(userPayload(user, role));
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  } finally {
    if (connection) await connection.end();
  }
});

router.post("/detail/register", async (req, res) => {
  const { rollNumber, password, role, name, email, instituteName } = req.body;

  if (!rollNumber || !password || !role) {
    return res.status(400).json({ message: "ID, password, and role are required." });
  }

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters." });
  }

  const config = roleConfig(role);
  if (!config || role === "Admin") {
    return res.status(400).json({ message: "Invalid role. Use admin signup for admins." });
  }

  const { table, idColumn } = config;
  let connection;

  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      `SELECT * FROM ${table} WHERE ${idColumn} = ?`,
      [rollNumber]
    );

    const hashedPassword = await bcrypt.hash(password, 10);

    if (rows.length === 0) {
      try {
        await connection.execute(
          `INSERT INTO ${table} (${idColumn}, name, email, password, instituteName) VALUES (?, ?, ?, ?, ?)`,
          [rollNumber, name, email, hashedPassword, instituteName]
        );
      } catch (insertErr) {
        if (insertErr.code === "ER_BAD_FIELD_ERROR") {
          await connection.execute(
            `INSERT INTO ${table} (${idColumn}, name, email, password) VALUES (?, ?, ?, ?)`,
            [rollNumber, name, email, hashedPassword]
          );
        } else {
          throw insertErr;
        }
      }
      return res.status(201).json({ message: "Account created successfully." });
    }

    const existing = rows[0];
    if (existing.password) {
      return res.status(400).json({
        message: "This ID is already registered. Please log in instead.",
      });
    }

    try {
      await connection.execute(
        `UPDATE ${table} SET name = ?, email = ?, password = ?, instituteName = ? WHERE ${idColumn} = ?`,
        [name, email, hashedPassword, instituteName, rollNumber]
      );
    } catch (updateErr) {
      if (updateErr.code === "ER_BAD_FIELD_ERROR") {
        await connection.execute(
          `UPDATE ${table} SET name = ?, email = ?, password = ? WHERE ${idColumn} = ?`,
          [name, email, hashedPassword, rollNumber]
        );
      } else {
        throw updateErr;
      }
    }

    return res.status(200).json({ message: "Account created successfully." });
  } catch (error) {
    console.error("Registration error:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "This ID or email is already in use." });
    }
    return res.status(500).json({ message: "Internal server error." });
  } finally {
    if (connection) await connection.end();
  }
});

module.exports = router;
