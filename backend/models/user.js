const db = require("../config/db");

const User = {
  findByEmail: (email, callback) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], callback);
  },

  create: (user, callback) => {
    db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", 
      [user.name, user.email, user.password, user.role], 
      callback
    );
  },

  findById: (userId, callback) => {
    db.query("SELECT id, name, email, role FROM users WHERE id = ?", [userId], callback);
  }
};

module.exports = User;
