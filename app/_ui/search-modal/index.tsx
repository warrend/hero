'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import SearchBar from '../search-bar';
import SearchIcon from '@/components/search-icon';
import Modal from '@/components/modal';
import Button from '@/components/button';

export default function SearchModal({
  query,
  children,
}: {
  query: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal
        open={open}
        className="backdrop:bg-black/60 p-0 rounded-sm shadow-xl w-[95vw] max-w-5xl sm:w-full min-h-[75vh] max-h-[75vh] sm:min-h-[60vh] sm:max-h-[80vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        onClose={() => setOpen(false)}
        header={<SearchBar />}
      >
        <div className="bg-white h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 pt-3 sm:pt-4">
            {children}
          </div>
        </div>
      </Modal>
      <Button
        className="hover:bg-slate-300 w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200"
        onClick={() => setOpen(true)}
        color="slate"
      >
        <SearchIcon />
      </Button>
    </>
  );
}
