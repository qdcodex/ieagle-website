import { SignJWT, jwtVerify } from "jose";

// Edge-safe session helpers (used by middleware and route handlers).
export const SESSION_COOKIE = "ieagles_session";
export const SESSION_DAYS = 7;

function key() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) throw new Error("AUTH_SECRET must be set to a long random string (see .env.example)");
  return new TextEncoder().encode(s);
}

/** payload: { sub, role: "admin" | "member", name, email, memberType? } */
export async function signSession(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(key());
}

export async function verifySession(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key(), { algorithms: ["HS256"] });
    return payload;
  } catch {
    return null;
  }
}

export function sessionCookie(token) {
  return {
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  };
}
