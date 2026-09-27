// Creates (or updates the password of) an admin account in MongoDB.
// Reads MONGODB_URI, MONGODB_DB, ADMIN_EMAIL, ADMIN_NAME, ADMIN_PASSWORD from .env.local.
// Usage: npm run create-admin
import { readFileSync, existsSync } from "node:fs";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

if (existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
  }
}

const { MONGODB_URI, MONGODB_DB = "ieagles", ADMIN_EMAIL, ADMIN_NAME = "iEagles Admin", ADMIN_PASSWORD } = process.env;
if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("Set MONGODB_URI, ADMIN_EMAIL and ADMIN_PASSWORD in .env.local first.");
  process.exit(1);
}
if (ADMIN_PASSWORD.length < 8) {
  console.error("ADMIN_PASSWORD must be at least 8 characters.");
  process.exit(1);
}

const client = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
try {
  await client.connect();
  const db = client.db(MONGODB_DB);
  const users = db.collection("users");
  await users.createIndex({ email: 1 }, { unique: true });
  const email = ADMIN_EMAIL.trim().toLowerCase();
  const now = new Date();
  const r = await users.updateOne(
    { email },
    {
      $set: { name: ADMIN_NAME, role: "admin", memberType: null, status: "active", passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 10), updatedAt: now },
      $setOnInsert: { email, createdAt: now },
    },
    { upsert: true }
  );
  console.log(r.upsertedCount ? `Admin created: ${email}` : `Admin updated: ${email}`);
  console.log(`Database: ${MONGODB_DB} — sign in at /admin/login with the password from .env.local`);
} finally {
  await client.close();
}
