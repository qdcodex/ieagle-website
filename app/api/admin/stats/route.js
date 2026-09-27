import { getDb } from "@/lib/db";
import { requireRole, json } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const [, err] = await requireRole("admin");
  if (err) return err;
  const db = await getDb();
  const [members, activeMembers, admins, apps, newApps] = await Promise.all([
    db.collection("users").countDocuments({ role: "member" }),
    db.collection("users").countDocuments({ role: "member", status: "active" }),
    db.collection("users").countDocuments({ role: "admin" }),
    db.collection("applications").countDocuments(),
    db.collection("applications").countDocuments({ status: "new" }),
  ]);
  return json({ members, activeMembers, admins, applications: apps, newApplications: newApps });
}
