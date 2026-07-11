const { getUserByEmail, insertUser, getAllUsers } = require("../utils/sqliteStore");

/** Find a user by email (case-insensitive). Returns the stored record incl. password hash. */
function findByEmail(email) {
  const key = email.trim().toLowerCase();
  return getUserByEmail(key);
}

/** Create a new user record. Throws if the email already exists. */
function createUser({ name, email, passwordHash }) {
  const key = email.trim().toLowerCase();
  const existing = getUserByEmail(key);
  if (existing) {
    const err = new Error("An account with this email already exists.");
    err.status = 409;
    throw err;
  }
  const record = {
    id: key,
    name: name.trim(),
    email: key,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  insertUser(record);
  return record;
}

function listUsers() {
  return getAllUsers();
}

module.exports = { findByEmail, createUser, listUsers };
