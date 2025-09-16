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
        className="backdrop:bg-black backdrop:bg-opacity-50 p-0 rounded-lg shadow-xl max-w-2xl w-full"
        onClose={() => setOpen(false)}
      >
        <div className="bg-white p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Search Superheroes</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="max-w-[600px] max-h-[70vh] overflow-y-auto">
            <SearchBar />
            {children}
          </div>
        </div>
      </dialog>
    </>
  );
}
