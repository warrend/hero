'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import SearchBar from '../search-bar';
import HeroList from '../hero-list';

export default function SearchModal({
  query,
  children,
}: {
  query: string;
  children: ReactNode;
}) {
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
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setOpen(true)}
      >
        Search Heroes
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
            <SearchBar />
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 pt-3 sm:pt-4">
            {children}
          </div>
        </div>
      </dialog>
    </>
  );
}
