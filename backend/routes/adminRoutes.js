const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

router.post("/register", async (req, res) => {
  const { adminID, instituteName, adminName, email, password } = req.body;
  
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT)
    });

    // Check institute name
    const [institutes] = await connection.execute(
      "SELECT * FROM admins WHERE instituteName = ?",
      [instituteName]
    );

    if (institutes.length > 0) {
      await connection.end();
      return res.status(400).json({ message: 'Institute name already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert admin
    await connection.execute(
      "INSERT INTO admins (adminID, instituteName, adminName, email, password) VALUES (?, ?, ?, ?, ?)",
      [adminID, instituteName, adminName, email, hashedPassword]
    );

    await connection.end();
    res.status(200).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post("/login", adminController.login);
router.get("/institutes", adminController.getInstitutes);

module.exports = router;