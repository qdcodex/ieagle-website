"use client";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const input =
  "w-full rounded-lg border border-[#e2e7ef] bg-[#f6f8fb] py-3 pl-10 pr-3 outline-none transition focus:border-[#1a2a80] focus:bg-white focus:ring-2 focus:ring-[#1a2a80]/15";

// Demo only: no authentication backend is wired up yet.
export default function LoginForm({ group }) {
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setMsg(`${group} login is not connected to a backend yet.`);
      }}
    >
      <label className="relative block">
        <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5b6675]" />
        <input className={input} type="email" placeholder="Email" required />
      </label>
      <label className="relative block">
        <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5b6675]" />
        <input className={input} type={show ? "text" : "password"} placeholder="Password" required />
        <button type="button" onClick={() => setShow(!show)} aria-label="Toggle password" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5b6675]">
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </label>
      <button className="rounded-lg bg-[#1a2a80] py-3 font-semibold text-white transition hover:bg-[#2c3fa8]" type="submit">
        Log in
      </button>
      {msg && <p className="rounded-lg bg-[#f7b800]/20 px-3 py-2 text-sm text-[#1a2a80]">{msg}</p>}
    </form>
  );
}
