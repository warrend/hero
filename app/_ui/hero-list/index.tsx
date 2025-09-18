import { searchSuperhero } from '@/lib/fetch';
import Link from 'next/link';
import React, { Suspense } from 'react';
import TeamSelect from '../team-select';
import Image from 'next/image';
import PowerStats from '@/components/power-stats';

export default async function HeroList({ query }: { query: string }) {
  const data = await searchSuperhero(query);

  console.log({ data });

  return (
    <Suspense
      key={query}
      fallback={<div className="text-center">Loading...</div>}
    >
      <div>
        {data?.results?.map((hero) => (
          <div key={hero.id} className="mb-6 bg-slate-50 p-4 rounded-sm">
            <div className="grid grid-cols-[75_1fr_1fr] gap-4 mb-6">
              <Image
                src={hero.image.url}
                width={75}
                height={75}
                alt={`picture of ${hero.name}`}
              />
              <div>
                <Link href={`/superheroes/${hero.id}`}>
                  <div className="font-bold text-lg mb-4">{hero.name}</div>
                </Link>
                <div className="mb-4">
                  Hero's full name is {hero.biography['full-name']} and was born
                  in{' '}
                  {hero.biography['place-of-birth'] !== '-'
                    ? hero.biography['place-of-birth']
                    : 'an unknown region'}
                  . First appeared in {hero.biography['first-appearance']}.
                </div>
                <div className="mb-4">
                  Affiliation(s):{' '}
                  {hero.connections['group-affiliation'] !== '-'
                    ? hero.connections['group-affiliation']
                    : 'None'}
                </div>
                <div>Publisher: {hero.biography.publisher}</div>
              </div>
              <PowerStats stats={hero.powerstats} />
            </div>
            <TeamSelect heroId={hero.id} heroName={hero.name} />
          </div>
        ))}
      </div>
    </Suspense>
  );
}
