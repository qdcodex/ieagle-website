import { getDb, peekSequence, formatApplicationNo } from "@/lib/db";
import { json } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Public: preview of the next application number (final number is assigned on submit).
export async function GET() {
  try {
    const db = await getDb();
    return json({ applicationNo: formatApplicationNo(await peekSequence(db, "application")) });
  } catch {
    return json({ applicationNo: null }, 503);
  }
}
