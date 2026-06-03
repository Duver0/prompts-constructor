import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useVersionStore } from "@/presentation/stores/useVersionStore";
import { useUIStore } from "@/presentation/stores/useUIStore";
import { usePromptStore } from "@/presentation/stores/usePromptStore";
import { VersionStatus } from "@/domain/types";
import { Button } from "@/presentation/shared/atoms/Button";
import { Badge } from "@/presentation/shared/atoms/Badge";
import { Card } from "@/presentation/shared/molecules/Card";
import { EmptyState } from "@/presentation/shared/molecules/EmptyState";
import type { PromptId, VersionId } from "@/domain/types";

const STATUS_BADGE: Record<string, "default" | "success" | "warning" | "error" | "info"> = {
  Draft: "default",
  Published: "success",
  Archived: "warning",
};

export default function VersionHistoryPage() {
  const { promptId } = useParams<{ promptId: string }>();
  const navigate = useNavigate();
  const pid = promptId as PromptId | undefined;

  const { versions, loadVersions, publishVersionAction, archiveVersionAction } = useVersionStore();
  const { getPromptById } = usePromptStore();
  const addToast = useUIStore((s) => s.addToast);
  const prompt = pid ? getPromptById(pid) : undefined;

  useEffect(() => {
    if (pid) loadVersions(pid);
  }, [pid, loadVersions]);

  const handlePublish = (id: VersionId) => {
    publishVersionAction(id);
    addToast({ message: "Version published", type: "success" });
  };

  const handleArchive = (id: VersionId) => {
    archiveVersionAction(id);
    addToast({ message: "Version archived", type: "info" });
  };

  return (
    <div className="container-main py-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => { void navigate(pid ? `/library/${String(pid)}` : "/library"); }}>
          <svg className="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
            Version History
          </h1>
          {prompt && (
            <p className="text-sm text-surface-500">{prompt.title}</p>
          )}
        </div>
      </div>

      {versions.length === 0 ? (
        <EmptyState
          icon={
            <svg className="size-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          title="No versions yet"
          description="Save a version of your prompt to track changes over time"
        />
      ) : (
        <div className="space-y-4">
          {[...versions]
            .sort((a, b) => b.number.value - a.number.value)
            .map((version) => (
              <Card key={version.id} className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-surface-900 dark:text-surface-100">
                      v{version.number.value}
                    </span>
                    <Badge variant={STATUS_BADGE[version.status] ?? "default"}>
                      {version.status}
                    </Badge>
                  </div>
                  {version.message && (
                    <p className="mt-2 text-sm text-surface-600 dark:text-surface-400">
                      {version.message}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-surface-400">
                    {new Date(version.createdAt.value).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  {version.status === VersionStatus.Draft && (
                    <Button size="sm" onClick={() => { handlePublish(version.id); }}>
                      Publish
                    </Button>
                  )}
                  {version.status !== VersionStatus.Archived && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => { handleArchive(version.id); }}
                    >
                      Archive
                    </Button>
                  )}
                </div>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
