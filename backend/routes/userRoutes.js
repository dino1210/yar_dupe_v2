const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const authenticateUser = require("../middleware/authMiddleware");

router.get("/getUserRole", authenticateUser, (req, res) => {
  const userId = req.user.id; // Extracted from JWT middleware

  User.findById(userId, (err, results) => {
    if (err) return res.status(500).json({ error: "Internal server error" });

    if (results.length === 0) return res.status(404).json({ error: "User not found" });

    res.json({ role: results[0].role });
  });
});

module.exports = router;
