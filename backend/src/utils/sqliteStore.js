/**
 * SQLite3-backed persistence layer for authentication (users).
 *
 * Uses better-sqlite3 (a synchronous SQLite3 driver) so the rest of the
 * codebase — which expects synchronous calls, same as the old jsonStore —
 * doesn't need to change. The database file lives at backend/src/data/auth.db.
 */
const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");

const DATA_DIR = path.join(__dirname, "..", "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = path.join(DATA_DIR, "auth.db");
const db = new Database(DB_PATH);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    passwordHash TEXT NOT NULL,
    createdAt TEXT NOT NULL
  )
`);

function getUserByEmail(email) {
  const row = db.prepare("SELECT * FROM users WHERE id = ?").get(email);
  return row || null;
}

function insertUser(record) {
  db.prepare(
    `INSERT INTO users (id, name, email, passwordHash, createdAt)
     VALUES (@id, @name, @email, @passwordHash, @createdAt)`
  ).run(record);
  return record;
}

function getAllUsers() {
  const rows = db.prepare("SELECT * FROM users").all();
  const result = {};
  for (const row of rows) result[row.id] = row;
  return result;
}

module.exports = { getUserByEmail, insertUser, getAllUsers };
