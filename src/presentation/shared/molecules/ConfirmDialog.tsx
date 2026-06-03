import { useUIStore } from "@/presentation/stores/useUIStore";
import { Button } from "@/presentation/shared/atoms/Button";
import { Modal } from "@/presentation/shared/atoms/Modal";

export function ConfirmDialog() {
  const { open, title, message, onConfirm } = useUIStore((s) => s.confirmDialog);
  const closeConfirm = useUIStore((s) => s.closeConfirm);

  const handleConfirm = () => {
    onConfirm?.();
    closeConfirm();
  };

  return (
    <Modal
      open={open}
      onClose={closeConfirm}
      title={title}
      footer={
        <>
          <Button variant="ghost" onClick={closeConfirm}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Confirm
          </Button>
        </>
      }
    >
      <p className="text-sm text-surface-600 dark:text-surface-400">{message}</p>
    </Modal>
  );
}
