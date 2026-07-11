const bcrypt = require("bcryptjs");
const { findByEmail, createUser } = require("../models/userModel");
const { signToken } = require("../utils/token");

function toPublicUser(user) {
  return { name: user.name, email: user.email };
}

async function signup(req, res) {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !name.trim()) {
      return res.status(400).json({ ok: false, error: "Name is required." });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ ok: false, error: "Email is required." });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ ok: false, error: "Password must be at least 6 characters." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = createUser({ name, email, passwordHash });

    const token = signToken({ sub: user.id, email: user.email, name: user.name });
    return res.status(201).json({ ok: true, token, user: toPublicUser(user) });
  } catch (err) {
    return res.status(err.status || 500).json({ ok: false, error: err.message || "Signup failed." });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ ok: false, error: "Email and password are required." });
    }

    const user = findByEmail(email);
    if (!user) {
      return res.status(404).json({ ok: false, error: "No account found with this email." });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ ok: false, error: "Incorrect password." });
    }

    const token = signToken({ sub: user.id, email: user.email, name: user.name });
    return res.json({ ok: true, token, user: toPublicUser(user) });
  } catch (err) {
    return res.status(500).json({ ok: false, error: "Login failed." });
  }
}

async function me(req, res) {
  const user = findByEmail(req.user.email);
  if (!user) return res.status(404).json({ ok: false, error: "User not found." });
  return res.json({ ok: true, user: toPublicUser(user) });
}

module.exports = { signup, login, me };
