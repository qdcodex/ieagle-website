// Loads .env.local into process.env for the standalone scripts.
import { readFileSync, existsSync } from "node:fs";

export function loadEnv(file = ".env.local") {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
  }
}

/** Connection string with the password hidden, for log output. */
export const safeUri = (uri) => String(uri).replace(/\/\/([^:@/]+):[^@]+@/, "//$1:****@");
