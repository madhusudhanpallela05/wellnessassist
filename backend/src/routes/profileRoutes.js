const express = require("express");
const { getMyProfile, saveMyProfile } = require("../controllers/profileController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", requireAuth, getMyProfile);
router.post("/", requireAuth, saveMyProfile);

module.exports = router;
