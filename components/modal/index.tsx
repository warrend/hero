'use client';

import React, { ReactNode, useEffect, useRef } from 'react';

export default function Modal({
  open,
  onClose,
  children,
  header,
  className,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  header?: ReactNode;
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
      <div className="sticky top-0 bg-white z-20 p-4 sm:p-6 pb-3 sm:pb-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <div></div>
          <button
            onClick={onClose}
            className="text-sm text-slate-400 font-medium"
          >
            Exit
          </button>
        </div>
        {header}
      </div>
      {children}
    </dialog>
  );
}
