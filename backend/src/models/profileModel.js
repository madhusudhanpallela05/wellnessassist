const { getById, upsert } = require("../utils/jsonStore");
const { computeBMI } = require("../../../ai/wellnessAI");

const COLLECTION = "profiles";

/** Get the wellness profile/assessment for a given user id (email). */
function getProfile(userId) {
  return getById(COLLECTION, userId);
}

/** Save (create or update) a user's wellness profile/assessment. */
function saveProfile(userId, { name, age, height, weight, gender, history }) {
  const bmi = computeBMI(height, weight);
  const record = {
    userId,
    name,
    age: Number(age),
    height: Number(height),
    weight: Number(weight),
    bmi,
    gender,
    history: history || "",
    updatedAt: new Date().toISOString(),
  };
  upsert(COLLECTION, userId, record);
  return record;
}

module.exports = { getProfile, saveProfile };
