import { getDb, nextSequence, formatApplicationNo } from "@/lib/db";
import { validateApplication } from "@/lib/applications";
import { json } from "@/lib/auth";

export const runtime = "nodejs";

// Public: save a membership application and return its application number.
export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  if (body.website) return json({ error: "Rejected." }, 400); // honeypot field
  const { app, errors } = validateApplication(body);
  if (errors.length) return json({ error: errors.join(" ") }, 400);

  let db;
  try {
    db = await getDb();
  } catch {
    return json({ error: "Database not reachable." }, 503);
  }
  const now = new Date();
  const applicationNo = formatApplicationNo(await nextSequence(db, "application"), now);
  await db.collection("applications").insertOne({ ...app, applicationNo, status: "new", createdAt: now, updatedAt: now });
  return json({ applicationNo, date: now.toISOString() }, 201);
}
