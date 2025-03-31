const mysql2 = require("mysql2");
const dotenv = require("dotenv");
require("dotenv").config();

dotenv.config({ path: "./.env" });

const db = mysql2.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed: " + err.stack);
        return;
    }
        console.log("Connected to MySQL Database")
})

module.exports = db;