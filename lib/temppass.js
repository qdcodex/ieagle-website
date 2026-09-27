import { randomBytes } from "crypto";

// Readable temporary password (letters + digits), shown to the admin once.
export function tempPassword() {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz";
  const digits = "23456789";
  const b = randomBytes(10);
  let s = "";
  for (let i = 0; i < 8; i++) s += letters[b[i] % letters.length];
  return s + digits[b[8] % digits.length] + digits[b[9] % digits.length];
}
