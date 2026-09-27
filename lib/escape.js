/** Case-insensitive "contains" regex for a user-typed search string. */
export function searchRegex(q) {
  return new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
}
