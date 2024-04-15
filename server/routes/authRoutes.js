const express = require("express");
const cors = require("cors");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

router.use(cors({ credentials: true, origin: "http://localhost:5173" }));

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
