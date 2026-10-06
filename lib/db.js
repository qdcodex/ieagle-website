import { MongoClient } from "mongodb";

// One shared client per server process (survives Next.js hot reloads in dev).
const g = globalThis;

export async function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set (see .env.example)");
  if (!g._ieaglesMongo) {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
    g._ieaglesMongo = client.connect().then(async (c) => {
      const db = c.db(process.env.MONGODB_DB || "ieagle");
      await ensureIndexes(db);
      return db;
    });
    // allow a retry if the first connection fails
    g._ieaglesMongo.catch(() => {
      g._ieaglesMongo = undefined;
    });
  }
  return g._ieaglesMongo;
}

async function ensureIndexes(db) {
  await Promise.all([
    db.collection("users").createIndex({ email: 1 }, { unique: true }),
    db.collection("users").createIndex({ role: 1, createdAt: -1 }),
    db.collection("applications").createIndex({ applicationNo: 1 }, { unique: true }),
    db.collection("applications").createIndex({ status: 1, createdAt: -1 }),
    db.collection("users").createIndex({ chapter: 1, role: 1 }),
    db.collection("meetings").createIndex({ chapter: 1, date: 1 }),
    db.collection("followups").createIndex({ meetingId: 1, memberId: 1 }, { unique: true }),
    db.collection("followups").createIndex({ memberId: 1 }),
    db.collection("categories").createIndex({ name: 1 }, { unique: true }),
    db.collection("pastEvents").createIndex({ date: -1 }),
    db.collection("eventPhotos").createIndex({ eventId: 1 }),
  ]);
}

/** Atomically returns the next number in a named sequence. */
export async function nextSequence(db, name) {
  const r = await db
    .collection("counters")
    .findOneAndUpdate({ _id: name }, { $inc: { seq: 1 } }, { upsert: true, returnDocument: "after" });
  return r.seq;
}

export async function peekSequence(db, name) {
  const r = await db.collection("counters").findOne({ _id: name });
  return (r?.seq ?? 0) + 1;
}

export function formatApplicationNo(seq, date = new Date()) {
  return `IEBN-${date.getFullYear()}-${String(seq).padStart(4, "0")}`;
}
