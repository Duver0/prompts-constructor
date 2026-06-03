import { BlockType } from "@/domain/types";

type BlockContentMap = {
  [BlockType.Role]: { text: string };
  [BlockType.Context]: { text: string };
  [BlockType.Objective]: { text: string };
  [BlockType.Constraints]: { text: string };
  [BlockType.Examples]: { pairs: Array<{ input: string; output: string }>; text?: string };
  [BlockType.OutputFormat]: { text: string; formatType?: "json" | "markdown" | "text" | "code" };
  [BlockType.Variables]: { text: string };
  [BlockType.Notes]: { text: string };
};

export type BlockContent = {
  [K in BlockType]: Readonly<{
    type: K;
    data: BlockContentMap[K];
  }>;
}[BlockType];

export function createBlockContent<T extends BlockType>(
  type: T,
  data: BlockContentMap[T],
): BlockContent {
  return { type, data } as BlockContent;
}

export function isBlockContent(value: unknown): value is BlockContent {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as { type: unknown; data: unknown };
  return (
    typeof candidate.type === "string" &&
    typeof candidate.data === "object" &&
    candidate.data !== null
  );
}

export function getBlockContentText(content: BlockContent): string {
  const { type, data } = content;
  switch (type) {
    case BlockType.Examples: {
      const pairs = data.pairs;
      if (data.text) return data.text;
      return pairs
        .map((p) => `Input: ${p.input}\nOutput: ${p.output}`)
        .join("\n---\n");
    }
    case BlockType.OutputFormat:
      return (data.formatType ?? "") + " " + data.text;
    default: {
      // All text-based blocks: Role, Context, Objective, Constraints, Variables, Notes
      return data.text;
    }
  }
}
