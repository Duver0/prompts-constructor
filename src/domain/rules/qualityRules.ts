import type { Block } from "@/domain/entities/Block";
import type { AmbiguityMatch, RedundancyMatch } from "@/domain/types";
import { getBlockContentText } from "@/domain/value-objects/BlockContent";

const AMBIGUOUS_WORDS = [
  "maybe", "perhaps", "might", "could", "somewhat",
  "kind of", "sort of", "a bit", "various",
  "things", "stuff", "something", "somewhere",
];

/**
 * Finds ambiguous language in text.
 */
export function detectAmbiguity(text: string): AmbiguityMatch[] {
  const matches: AmbiguityMatch[] = [];
  const lowerText = text.toLowerCase();

  for (const word of AMBIGUOUS_WORDS) {
    let index = lowerText.indexOf(word);
    while (index !== -1) {
      matches.push({
        text: word,
        position: index,
        suggestion: `Replace "${word}" with a more specific term`,
      });
      index = lowerText.indexOf(word, index + 1);
    }
  }

  return matches;
}

function cosineSimilarity(a: string, b: string): number {
  const wordsA = a.toLowerCase().split(/\W+/).filter(Boolean);
  const wordsB = b.toLowerCase().split(/\W+/).filter(Boolean);

  const freqA = new Map<string, number>();
  const freqB = new Map<string, number>();

  for (const w of wordsA) freqA.set(w, (freqA.get(w) ?? 0) + 1);
  for (const w of wordsB) freqB.set(w, (freqB.get(w) ?? 0) + 1);

  const allWords = new Set([...freqA.keys(), ...freqB.keys()]);

  let dotProduct = 0;
  let magA = 0;
  let magB = 0;

  for (const word of allWords) {
    const aCount = freqA.get(word) ?? 0;
    const bCount = freqB.get(word) ?? 0;
    dotProduct += aCount * bCount;
    magA += aCount * aCount;
    magB += bCount * bCount;
  }

  if (magA === 0 || magB === 0) return 0;
  return dotProduct / (Math.sqrt(magA) * Math.sqrt(magB));
}

/**
 * Finds redundant content between blocks.
 */
export function detectRedundancy(blocks: readonly Block[]): RedundancyMatch[] {
  const matches: RedundancyMatch[] = [];
  const enabledBlocks = blocks.filter((b) => b.enabled);

  for (let i = 0; i < enabledBlocks.length; i++) {
    const blockA = enabledBlocks[i];
    if (!blockA) continue;

    for (let j = i + 1; j < enabledBlocks.length; j++) {
      const blockB = enabledBlocks[j];
      if (!blockB) continue;

      const textA = getBlockContentText(blockA.content);
      const textB = getBlockContentText(blockB.content);

      if (textA && textB) {
        const similarity = cosineSimilarity(textA, textB);
        if (similarity > 0.7) {
          matches.push({
            blockIds: [blockA.id, blockB.id],
            similarity: Math.round(similarity * 100),
            suggestion: `Blocks have ${String(Math.round(similarity * 100))}% content similarity. Consider merging or removing duplicate content.`,
          });
        }
      }
    }
  }

  return matches;
}
