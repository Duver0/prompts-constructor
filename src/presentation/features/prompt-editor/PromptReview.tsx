import { Modal } from "@/presentation/shared/atoms/Modal";
import { Button } from "@/presentation/shared/atoms/Button";
import { type BlockType } from "@/domain/types";
import { analyzePrompt, type PromptReviewResult } from "./blockGuidance";

interface PromptReviewProps {
  open: boolean;
  onClose: () => void;
  blocks: Array<{ type: BlockType; text: string }>;
}

function ScoreIndicator({ score }: { score: number }) {
  let color: string;
  let label: string;

  if (score >= 80) {
    color = "bg-green-500";
    label = "Excellent";
  } else if (score >= 60) {
    color = "bg-amber-500";
    label = "Needs Improvement";
  } else {
    color = "bg-red-500";
    label = "Needs Work";
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-16 w-16">
        <svg className="h-16 w-16 -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
          <circle
            cx="18" cy="18" r="15.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-surface-200 dark:text-surface-700"
          />
          <circle
            cx="18" cy="18" r="15.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${String(score * 0.95)} 100`}
            className={color}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
          {score}
        </span>
      </div>
      <div>
        <p className="text-sm font-semibold text-surface-900 dark:text-surface-100">
          Prompt Quality Score
        </p>
        <p className="text-xs text-surface-500">{label}</p>
      </div>
    </div>
  );
}

export default function PromptReview({
  open,
  onClose,
  blocks,
}: PromptReviewProps) {
  const review: PromptReviewResult = analyzePrompt(blocks);

  return (
    <Modal open={open} onClose={onClose} title="Prompt Review & Improvements" size="lg">
      <div className="space-y-5">
        {/* Score */}
        <ScoreIndicator score={review.overallScore} />

        {/* Strengths */}
        {review.strengths.length > 0 && (
          <div>
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-green-700 dark:text-green-400">
              <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Strengths
            </h3>
            <ul className="space-y-1">
              {review.strengths.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-surface-700 dark:text-surface-300">
                  <span className="mt-0.5 text-green-500">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Suggestions */}
        {review.suggestions.length > 0 && (
          <div>
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M10 1a9 9 0 100 18 9 9 0 000-18zM9.75 5.5a.75.75 0 00-1.5 0v5.25a.75.75 0 001.5 0V5.5zm0 7.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
              </svg>
              Suggestions
            </h3>
            <ul className="space-y-1">
              {review.suggestions.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-surface-700 dark:text-surface-300">
                  <span className="mt-0.5 text-blue-500">→</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Block-level Issues */}
        {review.blocksWithIssues.length > 0 && (
          <div>
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.168 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Block-Level Improvements
            </h3>
            <div className="space-y-2">
              {review.blocksWithIssues.map((bwi) => (
                <div
                  key={`${bwi.blockType}-${String(bwi.blockIndex)}`}
                  className="rounded-md border border-amber-200 bg-amber-50/50 p-3 dark:border-amber-800 dark:bg-amber-900/10"
                >
                  <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                    {bwi.blockType} (Block #{String(bwi.blockIndex + 1)})
                  </p>
                  <ul className="mt-1 space-y-0.5">
                    {bwi.issues.map((issue, j) => (
                      <li key={j} className="flex gap-1.5 text-xs text-amber-700 dark:text-amber-400">
                        <span className="mt-0.5">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Missing Blocks */}
        {review.missingBlocks.length > 0 && (
          <div>
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-surface-500">
              <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
              </svg>
              Missing Block Types
            </h3>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {review.missingBlocks.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-dashed border-surface-300 px-2 py-0.5 text-xs text-surface-500 dark:border-surface-600 dark:text-surface-400"
                >
                  + {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-2 border-t border-surface-200 pt-4 dark:border-surface-700">
        <Button variant="ghost" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
}
