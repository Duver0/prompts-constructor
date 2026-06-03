import type { Prompt } from "@/domain/entities/Prompt";
import type { QualityScore } from "@/domain/value-objects/QualityScore";
import { createQualityScore } from "@/domain/value-objects/QualityScore";
import { detectAmbiguity, detectRedundancy } from "@/domain/rules/qualityRules";
import { getBlockContentText } from "@/domain/value-objects/BlockContent";
import type { AmbiguityMatch, RedundancyMatch } from "@/domain/types";
import { BlockType } from "@/domain/types";

export type QualityAnalysis = {
  score: QualityScore;
  ambiguityMatches: AmbiguityMatch[];
  redundancyMatches: RedundancyMatch[];
  recommendations: string[];
};

/**
 * Analyzes a prompt and produces a quality score with recommendations.
 */
export function analyzePromptQuality(prompt: Prompt): QualityAnalysis {
  const allAmbiguityMatches: AmbiguityMatch[] = [];
  const recommendations: string[] = [];

  // Analyze each block for ambiguity
  for (const block of prompt.blocks) {
    if (!block.enabled) continue;
    const text = getBlockContentText(block.content);
    if (text) {
      const matches = detectAmbiguity(text);
      allAmbiguityMatches.push(...matches);
    }
  }

  // Detect redundancy between blocks
  const redundancyMatches = detectRedundancy(prompt.blocks);

  // Calculate clarity score (inverse of ambiguity density)
  const totalText = prompt.blocks
    .filter((b) => b.enabled)
    .map((b) => getBlockContentText(b.content))
    .join(" ");
  const ambiguityDensity = totalText.length > 0
    ? allAmbiguityMatches.length / (totalText.length / 100)
    : 0;
  const clarity = Math.max(0, Math.min(100, Math.round(100 - ambiguityDensity * 10)));

  // Calculate specificity score (presence of concrete details)
  const hasConstraints = prompt.blocks.some(
    (b) => b.enabled && b.type === BlockType.Constraints,
  );
  const hasExamples = prompt.blocks.some(
    (b) => b.enabled && b.type === BlockType.Examples,
  );
  const hasOutputFormat = prompt.blocks.some(
    (b) => b.enabled && b.type === BlockType.OutputFormat,
  );
  const specificity = ((hasConstraints ? 33 : 0) + (hasExamples ? 33 : 0) + (hasOutputFormat ? 34 : 0));

  // Calculate completeness score (presence of required blocks)
  const rolePresent = prompt.blocks.some(
    (b) => b.enabled && b.type === BlockType.Role,
  );
  const contextPresent = prompt.blocks.some(
    (b) => b.enabled && b.type === BlockType.Context,
  );
  const objectivePresent = prompt.blocks.some(
    (b) => b.enabled && b.type === BlockType.Objective,
  );
  const completeness = ((rolePresent ? 40 : 0) + (contextPresent ? 30 : 0) + (objectivePresent ? 30 : 0));

  // Generate recommendations
  if (allAmbiguityMatches.length > 0) {
    recommendations.push(`Replace ${String(allAmbiguityMatches.length)} ambiguous word(s) with more specific terms.`);
  }

  if (redundancyMatches.length > 0) {
    for (const match of redundancyMatches) {
      recommendations.push(match.suggestion);
    }
  }

  if (!hasConstraints) {
    recommendations.push("Add a Constraints block to improve output specificity.");
  }

  if (!hasExamples) {
    recommendations.push("Add examples to guide the AI's response format.");
  }

  if (!hasOutputFormat) {
    recommendations.push("Specify the desired output format for clearer results.");
  }

  if (!contextPresent) {
    recommendations.push("Add context to help the AI understand the background.");
  }

  return {
    score: createQualityScore({ clarity, specificity, completeness }),
    ambiguityMatches: allAmbiguityMatches,
    redundancyMatches,
    recommendations,
  } as const;
}
