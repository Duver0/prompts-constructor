export type Tag = Readonly<{
  value: string;
}>;

export function createTag(value: string): Tag {
  const trimmed = value.trim().toLowerCase();
  if (trimmed.length === 0) {
    throw new Error("Tag cannot be empty");
  }
  return { value: trimmed } as const;
}

export function tagsEqual(a: Tag, b: Tag): boolean {
  return a.value === b.value;
}
