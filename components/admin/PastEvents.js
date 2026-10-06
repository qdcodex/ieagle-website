"use client";
import { useEffect, useRef, useState } from "react";
import { Plus, Pencil, Trash2, ImagePlus, Star, Images, CalendarDays, MapPin, X } from "lucide-react";
import { api, Modal, Field, Btn, ErrorNote, inputCls, fmtDate } from "./ui";

const MAX_SIDE = 1600; // photos are resized in the browser before upload

/** Resizes an image file to a JPEG data URL no larger than MAX_SIDE on its longest side. */
async function toDataUrl(file) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  return canvas.toDataURL("image/jpeg", 0.82);
}

function EventEditor({ initial, onClose, onChanged, onDeleted }) {
  const [ev, setEv] = useState(initial); // null until the event has been created
  const [f, setF] = useState({
    title: initial?.title ?? "",
    date: initial?.date ? new Date(initial.date).toISOString().slice(0, 10) : "",
    place: initial?.place ?? "",
    description: initial?.description ?? "",
  });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [progress, setProgress] = useState("");
  const fileInput = useRef(null);
  const set = (k) => (e) => {
    setF({ ...f, [k]: e.target.value });
    setSaved(false);
  };
  const update = (event) => {
    setEv(event);
    onChanged(event);
  };

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const d = ev ? await api(`/api/admin/events/${ev.id}`, { method: "PATCH", body: f }) : await api("/api/admin/events", { method: "POST", body: f });
      update(d.event);
      setSaved(true);
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setBusy(false);
    }
  }

  async function addPhotos(files) {
    setErr("");
    const list = [...files].filter((x) => x.type.startsWith("image/"));
    for (let i = 0; i < list.length; i++) {
      setProgress(`Uploading photo ${i + 1} of ${list.length}…`);
      try {
        const d = await api(`/api/admin/events/${ev.id}/photos`, { method: "POST", body: { dataUrl: await toDataUrl(list[i]) } });
        update(d.event);
      } catch (e) {
        setErr(`${list[i].name}: ${e.message}`);
        break;
      }
    }
    setProgress("");
    if (fileInput.current) fileInput.current.value = "";
  }

  async function removePhoto(id) {
    try {
      update((await api(`/api/admin/events/${ev.id}/photos/${id}`, { method: "DELETE" })).event);
    } catch (e) {
      setErr(e.message);
    }
  }
  async function makeCover(id) {
    try {
      update((await api(`/api/admin/events/${ev.id}`, { method: "PATCH", body: { coverId: id } })).event);
    } catch (e) {
      setErr(e.message);
    }
  }
  async function removeEvent() {
    if (!confirm(`Delete "${ev.title}" and all its photos?`)) return;
    try {
      await api(`/api/admin/events/${ev.id}`, { method: "DELETE" });
      onDeleted(ev.id);
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <Modal title={ev ? "Edit past event" : "Add past event"} onClose={onClose} wide>
      <form onSubmit={save} className="grid gap-4">
        <Field label="Heading">
          <input className={inputCls} required maxLength={140} value={f.title} onChange={set("title")} placeholder="e.g. Karungal Chapter Launch" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Event date">
            <input className={inputCls} type="date" required value={f.date} onChange={set("date")} />
          </Field>
          <Field label="Place">
            <input className={inputCls} maxLength={120} value={f.place} onChange={set("place")} placeholder="e.g. Karungal" />
          </Field>
        </div>
        <Field label="Description">
          <textarea className={inputCls} rows={4} maxLength={3000} value={f.description} onChange={set("description")} placeholder="What happened at the event" />
        </Field>
        <div className="flex flex-wrap items-center gap-3">
          <Btn type="submit" disabled={busy}>{busy ? "Saving…" : ev ? "Save details" : "Save and add photos"}</Btn>
          {saved && <span className="text-sm text-[#14532d]">Saved.</span>}
          {ev && <Btn type="button" variant="danger" onClick={removeEvent} className="ml-auto"><Trash2 size={15} /> Delete event</Btn>}
        </div>
      </form>

      <ErrorNote>{err}</ErrorNote>

      {ev && (
        <div className="mt-6 border-t border-[#e2e7ef] pt-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <p className="font-semibold text-[#1a2a80]">Photos ({ev.photos.length})</p>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#f7b800] px-4 py-2.5 text-sm font-semibold text-[#1a2a80] hover:brightness-105">
              <ImagePlus size={16} /> Add photos
              <input ref={fileInput} type="file" accept="image/*" multiple hidden onChange={(e) => addPhotos(e.target.files)} />
            </label>
          </div>
          {progress && <p className="mb-3 rounded-xl bg-[#fff7df] px-4 py-2.5 text-sm text-[#8a5a00]">{progress}</p>}
          {ev.photos.length ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {ev.photos.map((p, i) => (
                <div key={p.id} className="group relative overflow-hidden rounded-xl bg-[#f0f2f7]">
                  <img src={p.url} alt="" className="block aspect-square w-full object-cover" />
                  {i === 0 && <span className="absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded-full bg-[#f7b800] px-2 py-0.5 text-[10px] font-bold uppercase text-[#1a2a80]"><Star size={10} fill="currentColor" /> Cover</span>}
                  <div className="absolute inset-x-0 bottom-0 flex justify-between gap-1 bg-gradient-to-t from-black/70 to-transparent p-1.5 pt-6">
                    {i !== 0 ? (
                      <button type="button" onClick={() => makeCover(p.id)} className="rounded-lg border-0 bg-white/90 px-2 py-1 text-[11px] font-semibold text-[#1a2a80]">Make cover</button>
                    ) : (
                      <span />
                    )}
                    <button type="button" onClick={() => removePhoto(p.id)} aria-label="Remove photo" className="flex h-7 w-7 items-center justify-center rounded-lg border-0 bg-white/90 text-[#b91c1c]"><X size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-[#d6dbe8] px-4 py-8 text-center text-sm text-[#5b6675]">No photos yet. The first photo you add becomes the cover.</p>
          )}
          <p className="mt-3 text-xs text-[#5b6675]">Up to 20 photos per event. Photos are resized automatically before upload.</p>
        </div>
      )}
    </Modal>
  );
}

export default function PastEvents() {
  const [list, setList] = useState(null);
  const [editing, setEditing] = useState(undefined); // undefined = closed, null = new, object = edit
  const [err, setErr] = useState("");

  useEffect(() => {
    api("/api/admin/events")
      .then((d) => setList(d.events))
      .catch((e) => setErr(e.message));
  }, []);

  const byDate = (a, b) => new Date(b.date) - new Date(a.date);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#5b6675]">Past events appear in the gallery on the public Events page, newest first.</p>
        <Btn variant="gold" onClick={() => setEditing(null)}><Plus size={16} /> Add past event</Btn>
      </div>
      <ErrorNote>{err}</ErrorNote>
      {!list ? (
        <p className="py-10 text-center text-[#5b6675]">Loading…</p>
      ) : !list.length ? (
        <div className="rounded-2xl border border-dashed border-[#d6dbe8] bg-white py-14 text-center text-[#5b6675]">
          <Images className="mx-auto mb-2 text-[#f7b800]" size={32} /> No past events yet. Add the first one to start the gallery.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((e) => (
            <button key={e.id} onClick={() => setEditing(e)} className="group overflow-hidden rounded-2xl border border-[#e2e7ef] bg-white p-0 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              {e.cover ? (
                <img src={e.cover} alt="" className="block h-40 w-full object-cover" />
              ) : (
                <span className="flex h-40 items-center justify-center bg-[#1a2a80] text-white/60"><Images size={32} /></span>
              )}
              <span className="block p-4">
                <span className="block font-semibold text-[#1a2a80]">{e.title}</span>
                <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#5b6675]">
                  <span className="inline-flex items-center gap-1"><CalendarDays size={13} /> {fmtDate(e.date)}</span>
                  {e.place && <span className="inline-flex items-center gap-1"><MapPin size={13} /> {e.place}</span>}
                  <span className="inline-flex items-center gap-1"><Images size={13} /> {e.photos.length}</span>
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#1a2a80]"><Pencil size={12} /> Edit</span>
              </span>
            </button>
          ))}
        </div>
      )}

      {editing !== undefined && (
        <EventEditor
          initial={editing}
          onClose={() => setEditing(undefined)}
          onChanged={(ev) => setList((l) => [ev, ...(l ?? []).filter((x) => x.id !== ev.id)].sort(byDate))}
          onDeleted={(id) => {
            setList((l) => l.filter((x) => x.id !== id));
            setEditing(undefined);
          }}
        />
      )}
    </div>
  );
}
