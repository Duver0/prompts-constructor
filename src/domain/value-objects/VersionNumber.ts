export type VersionNumber = Readonly<{
  value: number;
}>;

export function createVersionNumber(value: number): VersionNumber {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`Invalid version number: ${String(value)}. Must be a non-negative integer.`);
  }
  return { value } as const;
}

export function incrementVersionNumber(v: VersionNumber): VersionNumber {
  return createVersionNumber(v.value + 1);
}

export function compareVersionNumbers(a: VersionNumber, b: VersionNumber): number {
  return a.value - b.value;
}
