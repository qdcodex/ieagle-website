// Past events gallery (managed from the admin panel): heading, date, place, description and photos.
// Photos are stored in MongoDB (collection eventPhotos) and served from /api/events/photo/[id].

export const MAX_PHOTOS = 20;
export const MAX_PHOTO_BYTES = 2 * 1024 * 1024; // after the browser has resized it
export const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

const clean = (v, n) => String(v ?? "").trim().slice(0, n);

/** Validates the text fields of an event. Returns { event, error }. */
export function cleanEvent(b) {
  const event = {
    title: clean(b.title, 140),
    description: clean(b.description, 3000),
    place: clean(b.place, 120),
  };
  if (!event.title) return { error: "Enter the event heading." };
  const date = new Date(b.date);
  if (!b.date || Number.isNaN(date.getTime())) return { error: "Choose the event date." };
  event.date = date;
  return { event };
}

export const photoUrl = (id) => `/api/events/photo/${id}`;

/** Public / admin shape of an event document. */
export function shapeEvent(e) {
  const ids = (e.photoIds ?? []).map(String);
  const cover = e.coverId && ids.includes(String(e.coverId)) ? String(e.coverId) : ids[0] ?? null;
  // cover first, then the rest in upload order
  const ordered = cover ? [cover, ...ids.filter((i) => i !== cover)] : ids;
  return {
    id: String(e._id),
    title: e.title,
    description: e.description ?? "",
    place: e.place ?? "",
    date: e.date,
    cover: cover ? photoUrl(cover) : null,
    photos: ordered.map((id) => ({ id, url: photoUrl(id) })),
  };
}

/** Parses a data URL from the browser into { type, buffer } or { error }. */
export function parseDataUrl(dataUrl) {
  const m = /^data:([a-z]+\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/=]+)$/.exec(String(dataUrl || ""));
  if (!m) return { error: "Could not read the photo." };
  if (!PHOTO_TYPES.includes(m[1])) return { error: "Photos must be JPG, PNG or WebP." };
  const buffer = Buffer.from(m[2], "base64");
  if (!buffer.length) return { error: "The photo is empty." };
  if (buffer.length > MAX_PHOTO_BYTES) return { error: "The photo is too large (2 MB max after resizing)." };
  return { type: m[1], buffer };
}
