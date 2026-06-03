import { type BlockType } from "@/domain/types";
import { getGuidance, analyzeBlockText } from "./blockGuidance";

interface BlockGuidancePanelProps {
  blockType: BlockType | null;
  blockText: string;
  /** Whether the panel is collapsed */
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function BlockGuidancePanel({
  blockType,
  blockText,
  collapsed,
  onToggleCollapse,
}: BlockGuidancePanelProps) {
  if (!blockType || collapsed) {
    return (
      <div className="w-64 shrink-0">
        <div className="sticky top-6 rounded-lg border border-surface-200 bg-white p-4 dark:border-surface-700 dark:bg-surface-900">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-surface-500">
              Guidance
            </h3>
            {blockType && (
              <button
                onClick={onToggleCollapse}
                className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400"
                aria-label="Show guidance"
              >
                Show
              </button>
            )}
          </div>
          {!blockType ? (
            <p className="mt-3 text-xs text-surface-400">
              Select a block to see writing guidance and improvement tips.
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  const guidance = getGuidance(blockType);
  const improvements = analyzeBlockText(blockType, blockText);

  return (
    <div className="w-64 shrink-0">
      <div className="sticky top-6 space-y-3">
        {/* Guidance Card */}
        <div className="rounded-lg border border-surface-200 bg-white p-4 dark:border-surface-700 dark:bg-surface-900">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-surface-500">
              {blockType} — Guidance
            </h3>
            <button
              onClick={onToggleCollapse}
              className="text-xs text-surface-400 hover:text-surface-600"
              aria-label="Hide guidance"
            >
              Hide
            </button>
          </div>

          <p className="mt-2 text-xs text-surface-600 dark:text-surface-400">
            {guidance.purpose}
          </p>

          {/* Key Questions */}
          <div className="mt-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-surface-500">
              Key Questions
            </h4>
            <ul className="mt-1 space-y-1">
              {guidance.questions.map((q, i) => (
                <li key={i} className="flex gap-1.5 text-xs text-surface-600 dark:text-surface-400">
                  <span className="mt-0.5 shrink-0 text-primary-500">•</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Example */}
          {guidance.examples.length > 0 && (
            <div className="mt-3">
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-surface-500">
                Example
              </h4>
              <pre className="mt-1 whitespace-pre-wrap rounded-md bg-surface-50 p-2 text-[11px] text-surface-700 dark:bg-surface-800 dark:text-surface-300">
                {guidance.examples[0]}
              </pre>
            </div>
          )}

          {/* Pitfalls */}
          <div className="mt-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-error">
              Common Pitfalls
            </h4>
            <ul className="mt-1 space-y-1">
              {guidance.pitfalls.map((p, i) => (
                <li key={i} className="flex gap-1.5 text-xs text-surface-600 dark:text-surface-400">
                  <span className="mt-0.5 shrink-0 text-error">⚠</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tips */}
          <div className="mt-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-surface-500">
              Tips
            </h4>
            <ul className="mt-1 space-y-1">
              {guidance.tips.map((t, i) => (
                <li key={i} className="flex gap-1.5 text-xs text-surface-600 dark:text-surface-400">
                  <span className="mt-0.5 shrink-0 text-primary-500">💡</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Improvement Suggestions */}
        {improvements.length > 0 && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
            <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M10 1a9 9 0 100 18 9 9 0 000-18zM9.75 5.5a.75.75 0 00-1.5 0v5.25a.75.75 0 001.5 0V5.5zm0 7.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
              </svg>
              Improvements Needed
            </h3>
            <ul className="mt-2 space-y-1.5">
              {improvements.map((s, i) => (
                <li key={i} className="flex gap-1.5 text-xs text-amber-800 dark:text-amber-300">
                  <span className="mt-0.5 shrink-0">→</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
