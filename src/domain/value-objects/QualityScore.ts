export type QualityScore = Readonly<{
  clarity: number;
  specificity: number;
  completeness: number;
}>;

export function createQualityScore(scores: {
  clarity: number;
  specificity: number;
  completeness: number;
}): QualityScore {
  const { clarity, specificity, completeness } = scores;

  if (!isValidScore(clarity)) throw new Error(`Invalid clarity score: ${String(clarity)}`);
  if (!isValidScore(specificity)) throw new Error(`Invalid specificity score: ${String(specificity)}`);
  if (!isValidScore(completeness)) throw new Error(`Invalid completeness score: ${String(completeness)}`);

  return { clarity, specificity, completeness } as const;
}

function isValidScore(value: number): boolean {
  return Number.isFinite(value) && value >= 0 && value <= 100;
}

export function calculateOverallScore(score: QualityScore): number {
  return Math.round(
    (score.clarity + score.specificity + score.completeness) / 3,
  );
}

export function qualityScoreToGrade(score: number): string {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}
