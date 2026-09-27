import { currentUser, publicUser, json } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const u = await currentUser().catch(() => null);
  return json({ user: u ? publicUser(u) : null });
}
