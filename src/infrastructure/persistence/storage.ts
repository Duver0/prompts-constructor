/**
 * Generic localStorage wrapper with JSON serialization, error handling,
 * and type-safe access.
 *
 * All keys are prefixed to avoid collisions with other apps.
 */

const STORAGE_PREFIX = "prompt-architect:";

function prefixedKey(key: string): string {
  return `${STORAGE_PREFIX}${key}`;
}

/**
 * Reads and deserializes a value from localStorage.
 * Returns `null` when the key is missing or JSON parsing fails.
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function readFromStorage<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(prefixedKey(key));
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    // Corrupted data — remove and return null
    removeFromStorage(key);
    return null;
  }
}

/**
 * Serializes and writes a value to localStorage.
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function writeToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(prefixedKey(key), JSON.stringify(value));
  } catch (err) {
    console.error(`[storage] Failed to write key "${key}":`, err);
  }
}

/**
 * Removes a key from localStorage.
 */
export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(prefixedKey(key));
  } catch {
    // Silently ignore
  }
}

/**
 * Lists all keys managed by this application.
 */
export function listStorageKeys(): string[] {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const raw = localStorage.key(i);
    if (raw?.startsWith(STORAGE_PREFIX)) {
      keys.push(raw.slice(STORAGE_PREFIX.length));
    }
  }
  return keys;
}

/**
 * Removes every key stored by this application.
 */
export function clearStorage(): void {
  for (const key of listStorageKeys()) {
    removeFromStorage(key);
  }
}
