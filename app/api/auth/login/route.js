import { getDb } from "@/lib/db";
import { signSession, sessionCookie } from "@/lib/session";
import { checkPassword, normEmail, json, publicUser, MEMBER_TYPES, throttled, recordFailure, clearFailures } from "@/lib/auth";

export const runtime = "nodejs";

// POST { email, password, portal: "member" | "admin", memberType? }
export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const email = normEmail(body.email);
  const password = String(body.password || "");
  const portal = body.portal === "admin" ? "admin" : "member";
  if (!email || !password) return json({ error: "Enter your email and password." }, 400);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const key = `${ip}|${email}`;
  if (throttled(key)) return json({ error: "Too many failed attempts. Please try again in 15 minutes." }, 429);

  let db;
  try {
    db = await getDb();
  } catch {
    return json({ error: "Login is temporarily unavailable (database not reachable)." }, 503);
  }

  const user = await db.collection("users").findOne({ email });
  const ok = user && user.passwordHash && (await checkPassword(password, user.passwordHash));
  if (!ok || user.role !== portal) {
    recordFailure(key);
    return json({ error: "Incorrect email or password." }, 401);
  }
  if (user.status !== "active") return json({ error: "This account is disabled. Please contact the iEagles team." }, 403);
  if (portal === "member" && body.memberType && user.memberType !== body.memberType) {
    return json(
      { error: `This account is registered under ${MEMBER_TYPES[user.memberType] ?? "another category"}. Please use that tab.` },
      403
    );
  }

  clearFailures(key);
  await db.collection("users").updateOne({ _id: user._id }, { $set: { lastLoginAt: new Date() } });
  const token = await signSession({ sub: String(user._id), role: user.role, name: user.name, email: user.email, memberType: user.memberType ?? null });
  const res = json({ user: publicUser(user), redirect: user.role === "admin" ? "/admin" : "/members" });
  res.cookies.set(sessionCookie(token));
  return res;
}
