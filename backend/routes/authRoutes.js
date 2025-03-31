const express = require("express");
const { register, login, getUserRole } = require("../controllers/authControllers");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", getUserRole);


module.exports = router;


