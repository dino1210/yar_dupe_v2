const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  User.findByEmail(email, (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Save user to database
    User.create({ name, email, password: hashedPassword }, (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  User.findByEmail(email, (err, results) => {
    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = results[0];

    // Compare password
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  });
};

const getUserRole = (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    User.findById(userId, (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (results.length === 0) return res.status(404).json({ error: "User not found" });

      res.json({ role: results[0].role });
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};


module.exports = { register, login, getUserRole };
