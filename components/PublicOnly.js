"use client";
import { usePathname } from "next/navigation";

/** Renders its children everywhere except the admin area. */
export default function PublicOnly({ children }) {
  return usePathname().startsWith("/admin") ? null : children;
}
