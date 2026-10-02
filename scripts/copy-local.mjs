// Copies the data from the old local database into the database in MONGODB_URI.
// Reads LOCAL_MONGODB_URI / LOCAL_MONGODB_DB from .env.local. Existing documents in the
// target are never overwritten (matched by _id, and by email for users).
//
//   npm run db:copy-local
import { MongoClient } from "mongodb";
import { loadEnv, safeUri } from "./_env.mjs";

loadEnv();
const { MONGODB_URI, MONGODB_DB = "ieagle", LOCAL_MONGODB_URI, LOCAL_MONGODB_DB = "ieagles" } = process.env;
if (!MONGODB_URI || !LOCAL_MONGODB_URI) {
  console.error("Set MONGODB_URI and LOCAL_MONGODB_URI in .env.local");
  process.exit(1);
}
if (MONGODB_URI === LOCAL_MONGODB_URI && MONGODB_DB === LOCAL_MONGODB_DB) {
  console.error("Source and target are the same database.");
  process.exit(1);
}

const src = new MongoClient(LOCAL_MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
const dst = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
try {
  await Promise.all([src.connect(), dst.connect()]);
  const from = src.db(LOCAL_MONGODB_DB);
  const to = dst.db(MONGODB_DB);
  console.log(`Copying ${safeUri(LOCAL_MONGODB_URI)} [${LOCAL_MONGODB_DB}]  →  ${safeUri(MONGODB_URI)} [${to.databaseName}]\n`);

  for (const name of ["users", "applications", "meetings", "followups", "categories"]) {
    const docs = await from.collection(name).find().toArray();
    let added = 0;
    for (const d of docs) {
      const clash =
        (await to.collection(name).findOne({ _id: d._id })) ||
        (name === "users" && (await to.collection(name).findOne({ email: d.email }))) ||
        (name === "categories" && (await to.collection(name).findOne({ name: d.name }))) ||
        (name === "applications" && (await to.collection(name).findOne({ applicationNo: d.applicationNo })));
      if (clash) continue;
      await to.collection(name).insertOne(d);
      added++;
    }
    console.log(`✓ ${name}: ${added} copied, ${docs.length - added} already present`);
  }

  // keep the application counter at the higher of the two
  const a = (await from.collection("counters").findOne({ _id: "application" }))?.seq ?? 0;
  const b = (await to.collection("counters").findOne({ _id: "application" }))?.seq ?? 0;
  await to.collection("counters").updateOne({ _id: "application" }, { $set: { seq: Math.max(a, b) } }, { upsert: true });
  console.log(`✓ application counter: ${Math.max(a, b)}`);
} catch (e) {
  console.error("Copy failed:", e.message);
  process.exitCode = 1;
} finally {
  await Promise.all([src.close(), dst.close()]);
}
