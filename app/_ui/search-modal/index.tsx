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
        className="backdrop:bg-black-300 backdrop:bg-opacity-50 p-0 rounded-sm shadow-xl max-w-2xl w-full min-h-[60vh] max-h-[60vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        onClose={() => setOpen(false)}
      >
        <div className="bg-white h-full flex flex-col">
          <div className="sticky top-0 bg-white z-20 p-6 pb-4 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Search Superheroes</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <SearchBar />
          </div>

          <div className="flex-1 overflow-y-auto p-6 pt-4">{children}</div>
        </div>
      </dialog>
    </>
  );
}
