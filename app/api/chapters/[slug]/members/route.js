import { getDb } from "@/lib/db";
import { json, MEMBER_TYPES } from "@/lib/auth";
import { CHAPTERS } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Public: the chapter director and active members of a chapter, as managed in the admin Members list.
// Only public-facing details are returned — never email, phone or address.
export async function GET(_req, { params }) {
  const { slug } = await params;
  const chapter = CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) return json({ error: "Chapter not found." }, 404);

  let db;
  try {
    db = await getDb();
  } catch {
    return json({ available: false, director: null, members: [] }, 503);
  }

  const users = await db
    .collection("users")
    .find(
      { chapter: chapter.name, status: "active", role: { $in: ["member", "director"] } },
      { projection: { name: 1, role: 1, company: 1, designation: 1, businessCategory: 1, memberType: 1, joinedAt: 1, createdAt: 1 } }
    )
    .sort({ name: 1 })
    .toArray();

  const director = users.find((u) => u.role === "director");
  return json({
    available: true,
    chapter: chapter.name,
    director: director ? { name: director.name } : null,
    members: users
      .filter((u) => u.role === "member")
      .map((u) => ({
        id: String(u._id),
        name: u.name,
        company: u.company || "",
        designation: u.designation || "",
        businessCategory: u.businessCategory || "",
        memberType: MEMBER_TYPES[u.memberType] ?? "",
        since: new Date(u.joinedAt ?? u.createdAt).getFullYear(),
      })),
  });
}
