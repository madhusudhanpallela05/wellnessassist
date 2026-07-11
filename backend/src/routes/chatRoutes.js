const express = require("express");
const { chat, greeting } = require("../controllers/chatController");
const { optionalAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", optionalAuth, chat);
router.get("/greeting", optionalAuth, greeting);

module.exports = router;
