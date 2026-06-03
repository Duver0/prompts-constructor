export type Timestamp = Readonly<{
  value: Date;
}>;

export function createTimestamp(date?: Date): Timestamp {
  return { value: date ?? new Date() } as const;
}

export function timestampToString(ts: Timestamp): string {
  return ts.value.toISOString();
}

export function timestampEquals(a: Timestamp, b: Timestamp): boolean {
  return a.value.getTime() === b.value.getTime();
}
