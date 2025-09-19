'use client';

import { useBattleReducer } from '@/state/battleReducer';
import React, { useEffect, useRef, useState } from 'react';

export default function Weights() {
  const [state, dispatch] = useBattleReducer();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    console.log({ dialog });
    if (open && dialog) {
      dialog.showModal();
    } else if (dialog) {
      dialog.close();
    }
  }, [open]);
  return (
    <div>
      <button
        className="mb-6 bg-blue-100 border border-blue-700 text-black font-medium py-1 px-3 rounded text-sm hover:bg-blue-200 transition-colors"
        onClick={() => setOpen(true)}
      >
        Add Weights
      </button>
      <dialog
        ref={dialogRef}
        className="backdrop:bg-black/60 p-0 rounded-sm shadow-xl w-[95vw] max-w-5xl sm:w-full min-h-[75vh] max-h-[75vh] sm:min-h-[60vh] sm:max-h-[80vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        onClose={() => setOpen(false)}
      >
        <div className="bg-white h-full flex flex-col">
          <div className="sticky top-0 bg-white z-20 p-4 sm:p-6 pb-3 sm:pb-4 border-b border-gray-200">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <div></div>
              <button
                onClick={() => setOpen(false)}
                className="text-sm text-slate-400 font-medium"
              >
                Exit
              </button>
            </div>
          </div>
          <div className="p-4">
            <form></form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
