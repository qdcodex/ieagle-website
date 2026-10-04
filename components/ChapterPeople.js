"use client";
import { useEffect, useState } from "react";
import { Building2, Tag, Users } from "lucide-react";

// One request per chapter page, shared by the pieces below.
const cache = new Map();
function load(slug) {
  if (!cache.has(slug)) {
    cache.set(
      slug,
      fetch(`/api/chapters/${slug}/members`)
        .then((r) => r.json())
        .catch(() => ({ available: false, director: null, members: [] }))
    );
  }
  return cache.get(slug);
}

function useChapterPeople(slug) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let live = true;
    load(slug).then((d) => live && setData(d));
    return () => {
      live = false;
    };
  }, [slug]);
  return data;
}

const Note = ({ children }) => <p className="rounded-lg bg-[#f6f8fb] px-3 py-2 text-sm">{children}</p>;
const initials = (name) => name.split(/\s+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

/** Chapter Director box content. `fallback` is the name from lib/data.js, if one is set there. */
export function ChapterDirector({ slug, fallback }) {
  const d = useChapterPeople(slug);
  const name = d?.director?.name ?? fallback;
  if (!d && !fallback) return <Note>Loading…</Note>;
  return name ? <p className="text-lg font-semibold text-[#1a2a80]">{name}</p> : <Note>To be announced</Note>;
}

/** Members box content: the count, linking down to the member cards. */
export function ChapterMemberCount({ slug }) {
  const d = useChapterPeople(slug);
  if (!d) return <Note>Loading…</Note>;
  if (!d.members.length) return <Note>Member list coming soon</Note>;
  return (
    <a href="#members" className="flex items-baseline gap-2 text-[#1a2a80]">
      <span className="text-3xl font-semibold">{d.members.length}</span>
      <span className="font-medium">{d.members.length === 1 ? "member" : "members"} — view all ↓</span>
    </a>
  );
}

/** A card for each member of the chapter. */
export function ChapterMemberCards({ slug, chapterName }) {
  const d = useChapterPeople(slug);
  if (!d) return <p className="py-8 text-center text-[#5b6675]">Loading members…</p>;
  if (!d.members.length) {
    return (
      <div className="rounded-3xl border border-dashed border-[#d6dbe8] bg-white px-6 py-12 text-center text-[#5b6675]">
        <Users className="mx-auto mb-3 text-[#f7b800]" size={32} />
        The {chapterName} Chapter member list is coming soon.
      </div>
    );
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {d.members.map((m) => (
        <article key={m.id} className="group overflow-hidden rounded-3xl border border-[#e2e7ef] bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
          <div className="h-16" style={{ background: "linear-gradient(135deg,#1a2a80,#2c3fa8)" }} />
          <div className="relative -mt-9 px-5 pb-5">
            <span className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl border-4 border-white bg-[#f7b800] text-xl font-semibold text-[#1a2a80] shadow-lg">
              {initials(m.name)}
            </span>
            <h3 className="mt-3 text-lg leading-tight">{m.name}</h3>
            {m.designation && <p className="text-sm text-[#5b6675]">{m.designation}</p>}
            {m.company && (
              <p className="mt-3 flex items-start gap-2 text-sm font-medium text-[#1c2430]">
                <Building2 size={15} className="mt-0.5 shrink-0 text-[#f7b800]" /> {m.company}
              </p>
            )}
            {m.businessCategory && (
              <p className="mt-1.5 flex items-start gap-2 text-sm text-[#5b6675]">
                <Tag size={15} className="mt-0.5 shrink-0 text-[#f7b800]" /> {m.businessCategory}
              </p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#eef1f6] pt-3 text-xs">
              {m.memberType && <span className="rounded-full bg-[#1a2a80]/10 px-2.5 py-1 font-semibold text-[#1a2a80]">{m.memberType}</span>}
              <span className="text-[#5b6675]">Member since {m.since}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
