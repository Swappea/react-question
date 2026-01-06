
export function makeId() {
  try {
    // Use stable UUID when available (modern browsers)
    return globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
  } catch {
    return Math.random().toString(36).slice(2);
  }
}
