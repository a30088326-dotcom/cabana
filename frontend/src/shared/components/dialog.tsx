"use client";
import { X } from "lucide-react";
import { useEffect,useRef,type ReactNode } from "react";
export function Dialog({
  open,
  onClose,
  children,
  label,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog?.open) {
      dialog?.showModal();
    }
    if (!open && dialog?.open) dialog.close();
    if (open) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [open]);
  return (
    <dialog
      ref={ref}
      className={"dialog " + (wide ? "dialog-wide" : "")}
      aria-label={label}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        className="dialog-close icon-button"
        aria-label="Close dialog"
        onClick={onClose}
      >
        <X size={22} />
      </button>
      {children}
    </dialog>
  );
}
