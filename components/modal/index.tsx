'use client';

import React, { ReactNode, useEffect, useRef } from 'react';

export default function Modal({
  open,
  onClose,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog) {
      dialog.showModal();
    } else if (dialog) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-black/60 p-0 rounded-sm shadow-xl w-[95vw] max-w-5xl sm:w-full min-h-[75vh] max-h-[75vh] sm:min-h-[60vh] sm:max-h-[80vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      onClose={onClose}
    >
      {children}
    </dialog>
  );
}
