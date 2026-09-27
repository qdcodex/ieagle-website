import { getDb } from "@/lib/db";
import { requireStaff, canUseChapter, chapterDenied, json } from "@/lib/auth";
import { chapterReport, chapterCategories } from "@/lib/chapterForms";
import { CHAPTERS } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET ?chapter=&type=report|categories
export async function GET(req) {
  const [me, err] = await requireStaff();
  if (err) return err;
  const p = new URL(req.url).searchParams;
  const chapter = p.get("chapter");
  if (!CHAPTERS.some((c) => c.name === chapter)) return json({ error: "Choose a chapter." }, 400);
  if (!canUseChapter(me, chapter)) return chapterDenied();
  const db = await getDb();
  if (p.get("type") === "categories") return json({ chapter, categories: await chapterCategories(db, chapter) });
  return json(await chapterReport(db, chapter));
}
