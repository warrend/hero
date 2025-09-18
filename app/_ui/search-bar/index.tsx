'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function handleSearchWithDebounce(term: string) {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      handleSearch(term);
    }, 500);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-sm border-2 border-gray-300 border-w-2 py-2 pl-4 text-sm placeholder:text-gray-500"
        placeholder="Search superheroes..."
        onChange={(e) => {
          handleSearchWithDebounce(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
}
