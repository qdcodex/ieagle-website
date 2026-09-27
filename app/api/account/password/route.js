import { getDb } from "@/lib/db";
import { requireRole, checkPassword, hashPassword, passwordProblem, json } from "@/lib/auth";

export const runtime = "nodejs";

// POST { current, next } — any signed-in user changes their own password
export async function POST(req) {
  const [user, err] = await requireRole(null);
  if (err) return err;
  const { current, next } = await req.json().catch(() => ({}));
  if (!(await checkPassword(String(current || ""), user.passwordHash))) return json({ error: "Current password is incorrect." }, 400);
  const problem = passwordProblem(next);
  if (problem) return json({ error: problem }, 400);
  const db = await getDb();
  await db.collection("users").updateOne({ _id: user._id }, { $set: { passwordHash: await hashPassword(next), mustChangePassword: false, updatedAt: new Date() } });
  return json({ ok: true });
}
