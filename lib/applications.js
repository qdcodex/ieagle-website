import { MEMBERSHIP } from "./content";

// Server-side validation for the membership application form.
const MAX = 2000;
const clean = (v, n = 200) => String(v ?? "").trim().slice(0, n);

export function validateApplication(b) {
  const a = {
    name: clean(b.name),
    category: clean(b.category, 40),
    company: clean(b.company),
    designation: clean(b.designation),
    gst: clean(b.gst, 15).toUpperCase(),
    address: clean(b.address, 500),
    district: clean(b.district),
    contact: clean(b.contact, 20),
    email: clean(b.email).toLowerCase(),
    products: clean(b.products, MAX),
    audience: clean(b.audience, MAX),
  };
  const errors = [];
  const open = MEMBERSHIP.categories.filter((c) => c.available).map((c) => c.t);
  if (!a.name) errors.push("Name is required.");
  if (!open.includes(a.category)) errors.push("Choose an available membership category.");
  if (!a.company) errors.push("Company name is required.");
  if (a.gst && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/.test(a.gst)) errors.push("GST number is not valid.");
  if (!a.address) errors.push("Address is required.");
  if (!/\b[0-9]{6}\b/.test(a.district)) errors.push("District must include a 6-digit PIN code.");
  if (!/^(\+?91 ?)?[6-9][0-9]{4} ?[0-9]{5}$/.test(a.contact)) errors.push("Contact must be a 10-digit mobile number.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email)) errors.push("E-mail is not valid.");
  if (!a.products) errors.push("Products/Services is required.");
  return { app: a, errors };
}

export const APPLICATION_STATUSES = ["new", "contacted", "approved", "rejected"];
