import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { getDb } from "./db";
import { SESSION_COOKIE, verifySession } from "./session";

export const MEMBER_TYPES = {
  executive: "Executive Members",
  governing: "Governing board",
  chapter: "Chapter Members",
};

export const hashPassword = (pw) => bcrypt.hash(pw, 10);
export const checkPassword = (pw, hash) => bcrypt.compare(pw, hash);

export function passwordProblem(pw) {
  if (typeof pw !== "string" || pw.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Za-z]/.test(pw) || !/[0-9]/.test(pw)) return "Password must include letters and numbers.";
  return null;
}

export const normEmail = (e) => String(e || "").trim().toLowerCase();
export const isEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

/** Public shape of a user document (never includes the password hash). */
export function publicUser(u) {
  return {
    id: String(u._id),
    name: u.name,
    email: u.email,
    role: u.role,
    memberType: u.memberType ?? null,
    memberTypeLabel: u.memberType ? MEMBER_TYPES[u.memberType] : null,
    phone: u.phone ?? "",
    company: u.company ?? "",
    designation: u.designation ?? "",
    applicationNo: u.applicationNo ?? "",
    mustChangePassword: !!u.mustChangePassword,
    category: u.category ?? "",
    chapter: u.chapter ?? "",
    status: u.status,
    createdAt: u.createdAt,
    lastLoginAt: u.lastLoginAt ?? null,
  };
}

/** Current session payload from the cookie, or null. */
export async function getSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifySession(token);
}

/** Loads the signed-in user fresh from the DB (so disabled accounts lose access). */
export async function currentUser() {
  const s = await getSession();
  if (!s?.sub || !ObjectId.isValid(s.sub)) return null;
  const db = await getDb();
  const u = await db.collection("users").findOne({ _id: new ObjectId(s.sub) });
  if (!u || u.status !== "active") return null;
  return u;
}

export const json = (data, status = 200) => NextResponse.json(data, { status });

/** For route handlers: returns [user, null] or [null, errorResponse]. */
export async function requireRole(role) {
  const u = await currentUser().catch(() => null);
  if (!u) return [null, json({ error: "Please sign in." }, 401)];
  if (role && u.role !== role) return [null, json({ error: "Not allowed." }, 403)];
  return [u, null];
}

// Simple in-memory login throttle: 8 failed attempts per 15 minutes per IP+email.
const attempts = globalThis._ieaglesLoginAttempts ?? (globalThis._ieaglesLoginAttempts = new Map());
const WINDOW = 15 * 60 * 1000;
export function throttled(key) {
  const a = attempts.get(key);
  if (!a || Date.now() - a.first > WINDOW) return false;
  return a.count >= 8;
}
export function recordFailure(key) {
  const a = attempts.get(key);
  if (!a || Date.now() - a.first > WINDOW) attempts.set(key, { first: Date.now(), count: 1 });
  else a.count++;
}
export const clearFailures = (key) => attempts.delete(key);
