import { searchSuperhero } from '@/lib/fetch';
import Link from 'next/link';
import React, { Suspense } from 'react';
import TeamSelect from '../team-select';

export default async function HeroList({ query }: { query: string }) {
  const data = await searchSuperhero(query);

  return (
    <Suspense
      key={query}
      fallback={<div className="text-center">Loading...</div>}
    >
      <div>
        {data?.results?.map((hero) => (
          <div key={hero.id} className="p-2 border-b">
            <Link href={`/superheroes/${hero.id}`}>
              <div>{hero.name}</div>
            </Link>
            <TeamSelect heroId={hero.id} heroName={hero.name} />
          </div>
        ))}
      </div>
    </Suspense>
  );
}
