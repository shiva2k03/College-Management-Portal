const bcrypt = require("bcryptjs");
const db = require("../models/adminModel");

module.exports = {
  register: (req, res) => {
    const { instituteName, adminName, email, password } = req.body;
    if (!instituteName || !adminName || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check for duplicate instituteName
    const checkSql = "SELECT * FROM admins WHERE instituteName = ?";
    db.query(checkSql, [instituteName], (err, results) => {
      if (err) {
        console.error("Error checking for duplicate institute:", err);
        return res.status(500).json({ success: false, message: "Database error" });
      }

      if (results.length > 0) {
        return res.status(400).json({ success: false, message: "The institute name is already in use. Please use a different institute name." });
      }

      // Hash the password and insert the new admin
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res.status(500).json({ success: false, message: "Error hashing password" });
        }

        const sql = "INSERT INTO admins (instituteName, adminName, email, password) VALUES (?, ?, ?, ?)";
        db.query(sql, [instituteName, adminName, email, hashedPassword], (err, result) => {
          if (err) {
            console.error("Error registering admin:", err);
            return res.status(500).json({ success: false, message: "Database error" });
          }
          res.status(201).json({ success: true, message: "Admin registered successfully!" });
        });
      });
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const sql = "SELECT * FROM admins WHERE email = ?";
    db.query(sql, [email], (err, results) => {
      if (err) {
        console.error("Error logging in:", err);
        return res.status(500).json({ success: false, message: "Database error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      bcrypt.compare(password, results[0].password, (err, isMatch) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).json({ success: false, message: "Error comparing passwords" });
        }

        if (!isMatch) {
          return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        res.status(200).json({ success: true, message: "Login successful!", admin: results[0] });
      });
    });
  },

  getInstitutes: (req, res) => {
    const sql = "SELECT DISTINCT instituteName FROM admins";
    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching institutes:", err);
        return res.status(500).json({ success: false, message: "Error fetching institutes" });
      }
      const institutes = results.map((row) => row.instituteName);
      res.status(200).json({ success: true, institutes });
    });
  },
};
