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
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  });
};

module.exports = { register, login };
