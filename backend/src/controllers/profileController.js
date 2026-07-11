const { getProfile, saveProfile } = require("../models/profileModel");
const { bmiCategory } = require("../../../ai/wellnessAI");

function getMyProfile(req, res) {
  const profile = getProfile(req.user.id);
  if (!profile) return res.status(404).json({ ok: false, error: "No profile found yet." });
  return res.json({ ok: true, profile, status: bmiCategory(profile.bmi) });
}

function saveMyProfile(req, res) {
  const { name, age, height, weight, gender, history } = req.body || {};

  if (!name || !name.trim()) return res.status(400).json({ ok: false, error: "Name is required." });
  if (!age || Number(age) <= 0 || Number(age) > 120)
    return res.status(400).json({ ok: false, error: "Enter a valid age (1-120)." });
  if (!height || Number(height) <= 0)
    return res.status(400).json({ ok: false, error: "Enter a positive height." });
  if (!weight || Number(weight) <= 0)
    return res.status(400).json({ ok: false, error: "Enter a positive weight." });
  if (!["male", "female", "other"].includes(gender))
    return res.status(400).json({ ok: false, error: "Gender must be male, female or other." });

  const profile = saveProfile(req.user.id, { name, age, height, weight, gender, history });
  return res.status(201).json({ ok: true, profile, status: bmiCategory(profile.bmi) });
}

module.exports = { getMyProfile, saveMyProfile };
