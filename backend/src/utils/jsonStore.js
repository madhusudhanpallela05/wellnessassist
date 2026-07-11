/**
 * Minimal JSON-file-backed persistence layer.
 *
 * This keeps the backend dependency-free (no MongoDB/Postgres setup required
 * to try it out). Each "collection" is a JSON file under backend/src/data/.
 * Swap this module out for a real database client later without touching
 * controllers — just keep the same function signatures.
 */
const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");

function filePath(collection) {
  return path.join(DATA_DIR, `${collection}.json`);
}

function ensureFile(collection) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  const fp = filePath(collection);
  if (!fs.existsSync(fp)) fs.writeFileSync(fp, "{}", "utf-8");
  return fp;
}

function readAll(collection) {
  const fp = ensureFile(collection);
  try {
    const raw = fs.readFileSync(fp, "utf-8");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAll(collection, data) {
  const fp = ensureFile(collection);
  fs.writeFileSync(fp, JSON.stringify(data, null, 2), "utf-8");
}

function getById(collection, id) {
  const all = readAll(collection);
  return all[id] || null;
}

function upsert(collection, id, record) {
  const all = readAll(collection);
  all[id] = { ...all[id], ...record };
  writeAll(collection, all);
  return all[id];
}

module.exports = { readAll, writeAll, getById, upsert };
