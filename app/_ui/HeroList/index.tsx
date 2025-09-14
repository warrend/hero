import { searchSuperhero } from '@/lib/fetch';
import React from 'react';

export default async function HeroList({ query }: { query: string }) {
  const data = await searchSuperhero(query);

  if (!data?.results) {
    return <div>No heroes found</div>;
  }

  return (
    <div>
      {data?.results?.map((hero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </div>
  );
}
