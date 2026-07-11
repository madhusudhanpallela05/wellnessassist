const { getChatReply, getGreeting } = require("../../../ai/wellnessAI");
const { getProfile } = require("../models/profileModel");

/** POST /api/chat  { message } — requires auth optional; works for guests too. */
async function chat(req, res) {
  const { message } = req.body || {};
  if (!message || !message.trim()) {
    return res.status(400).json({ ok: false, error: "message is required." });
  }

  const name = req.user?.name || null;
  const profile = req.user ? getProfile(req.user.id) : null;

  try {
    const reply = await getChatReply(message, { name, profile });
    return res.json({ ok: true, reply });
  } catch (err) {
    console.error("Chat reply failed:", err);
    return res.status(500).json({ ok: false, error: "Could not generate a reply right now." });
  }
}

/** GET /api/chat/greeting — initial greeting message shown when the chat opens. */
function greeting(req, res) {
  const name = req.user?.name || null;
  return res.json({ ok: true, reply: getGreeting(name) });
}

module.exports = { chat, greeting };
