const db = require("../config/db");

const User = {
  findByEmail: (email, callback) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], callback);
  },
  create: (user, callback) => {
    db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
      [user.name, user.email, user.password], 
      callback
    );
  }
};

module.exports = User;
