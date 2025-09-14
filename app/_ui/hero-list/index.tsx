import { searchSuperhero } from '@/lib/fetch';
import Link from 'next/link';
import React from 'react';

export default async function HeroList({ query }: { query: string }) {
  const data = await searchSuperhero(query);

  return (
    <div>
      {data?.results?.map((hero) => (
        <Link href={`/superheroes/${hero.id}`} key={hero.id}>
          <div>{hero.name}</div>
        </Link>
      ))}
    </div>
  );
}
