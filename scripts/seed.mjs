// Seeds the iEagles database: indexes, business categories, application counter and the first admin.
// Safe to run repeatedly — it only adds what is missing and never overwrites existing data.
//
//   npm run seed                 seed the database in .env.local (MONGODB_URI / MONGODB_DB)
//   npm run seed -- --reset-admin   also reset the admin password to ADMIN_PASSWORD from .env.local
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import { loadEnv, safeUri } from "./_env.mjs";
import { DEFAULT_CATEGORIES } from "../lib/chapterFormFields.js";

loadEnv();
const { MONGODB_URI, MONGODB_DB = "ieagle", ADMIN_EMAIL, ADMIN_NAME = "iEagles Admin", ADMIN_PASSWORD } = process.env;
const resetAdmin = process.argv.includes("--reset-admin");

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set in .env.local");
  process.exit(1);
}

const client = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
try {
  await client.connect();
  const db = client.db(MONGODB_DB);
  console.log(`Seeding ${safeUri(MONGODB_URI)}  (database: ${db.databaseName})\n`);

  // 1. Indexes (same as lib/db.js)
  await Promise.all([
    db.collection("users").createIndex({ email: 1 }, { unique: true }),
    db.collection("users").createIndex({ role: 1, createdAt: -1 }),
    db.collection("users").createIndex({ chapter: 1, role: 1 }),
    db.collection("applications").createIndex({ applicationNo: 1 }, { unique: true }),
    db.collection("applications").createIndex({ status: 1, createdAt: -1 }),
    db.collection("meetings").createIndex({ chapter: 1, date: 1 }),
    db.collection("followups").createIndex({ meetingId: 1, memberId: 1 }, { unique: true }),
    db.collection("followups").createIndex({ memberId: 1 }),
    db.collection("categories").createIndex({ name: 1 }, { unique: true }),
  ]);
  console.log("✓ indexes");

  // 2. Business categories (List of Category) — add any that are missing
  const cats = db.collection("categories");
  const have = new Set((await cats.find({}, { projection: { name: 1 } }).toArray()).map((c) => c.name.toLowerCase()));
  let order = (await cats.find().sort({ order: -1 }).limit(1).next())?.order ?? 0;
  const missing = DEFAULT_CATEGORIES.filter((n) => !have.has(n.toLowerCase()));
  if (missing.length) await cats.insertMany(missing.map((name) => ({ name, order: ++order, createdAt: new Date() })));
  console.log(`✓ categories: ${missing.length} added, ${await cats.countDocuments()} total`);

  // 3. Application number counter
  await db.collection("counters").updateOne({ _id: "application" }, { $setOnInsert: { seq: 0 } }, { upsert: true });
  console.log(`✓ application counter at ${(await db.collection("counters").findOne({ _id: "application" })).seq}`);

  // 4. First admin
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.log("• admin skipped (set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local)");
  } else if (ADMIN_PASSWORD.length < 8) {
    console.log("• admin skipped: ADMIN_PASSWORD must be at least 8 characters");
  } else {
    const email = ADMIN_EMAIL.trim().toLowerCase();
    const users = db.collection("users");
    const existing = await users.findOne({ email });
    const now = new Date();
    if (!existing) {
      await users.insertOne({ email, name: ADMIN_NAME, role: "admin", memberType: null, status: "active", passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 10), createdAt: now, updatedAt: now });
      console.log(`✓ admin created: ${email} (password = ADMIN_PASSWORD in .env.local)`);
    } else if (resetAdmin) {
      await users.updateOne({ email }, { $set: { role: "admin", status: "active", passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 10), updatedAt: now } });
      console.log(`✓ admin password reset: ${email}`);
    } else {
      console.log(`✓ admin already exists: ${email} (left unchanged; use --reset-admin to reset the password)`);
    }
  }

  const summary = {};
  for (const c of ["users", "applications", "meetings", "followups", "categories"]) summary[c] = await db.collection(c).countDocuments();
  console.log("\nDatabase now holds:", JSON.stringify(summary));
} catch (e) {
  console.error("Seed failed:", e.message);
  process.exitCode = 1;
} finally {
  await client.close();
}
