'use client';

import { useTeams } from '@/lib/team-provider';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function Search() {
  const searchParams = useSearchParams();
  const { state } = useTeams();
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
    }, 300);
  }

  const teamAFilled = state.teamA.length === 3;
  const teamBFilled = state.teamB.length === 3;

  return (
    <div>
      <div className="text-sm mb-2 font-medium text-slate-500">
        Team A:{' '}
        <span className={teamAFilled ? 'text-green-500' : 'text-red-500'}>
          {state.teamA.length}
        </span>
        {' - '}
        Team B:{' '}
        <span className={teamBFilled ? 'text-green-500' : 'text-red-500'}>
          {state.teamB.length}
        </span>
      </div>
      <div className="relative flex flex-1 flex-shrink-0">
        <div className="sr-only">Search Superheroes</div>
        <input
          className="peer block w-full rounded-sm border-2 border-gray-300 border-w-2 py-2 pl-4 text-sm placeholder:text-gray-500"
          placeholder="Search superheroes..."
          onChange={(e) => {
            handleSearchWithDebounce(e.target.value);
          }}
          defaultValue={searchParams.get('query')?.toString()}
        />
      </div>
    </div>
  );
}
