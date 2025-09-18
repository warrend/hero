import { getHeroesByIds } from '@/lib/fetch';
import { HeroByIdResponse } from '@/lib/types';
import React from 'react';
import BattleEngine from './_ui/battle-engine/page';
import Image from 'next/image';

function TeamSheet({ team }: { team: HeroByIdResponse[] }) {
  return (
    <div className="space-y-2">
      {team.map(({ id, name, image }) => (
        <div key={id} className="p-3 bg-blue-100 rounded">
          <div className="flex">
            <Image
              className="mr-2"
              src={image.url}
              width={35}
              height={55}
              alt={`picture of ${name}`}
            />
            {name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function Battle({
  searchParams,
}: {
  searchParams?: Promise<{
    teamA?: string;
    teamB?: string;
  }>;
}) {
  const params = await searchParams;

  if (!params?.teamA || !params?.teamB) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Battle Arena</h1>
        <p>No teams found. Please go back and select teams.</p>
      </div>
    );
  }

  const teamAIds = params.teamA.split(',');
  const teamBIds = params.teamB.split(',');

  const [teamA, teamB]: [HeroByIdResponse[], HeroByIdResponse[]] =
    await Promise.all([
      getHeroesByIds(teamAIds.map(Number)),
      getHeroesByIds(teamBIds.map(Number)),
    ]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Battle Arena</h1>
      <BattleEngine teamA={teamA} teamB={teamB} />
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Team A</h2>
          <TeamSheet team={teamA} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Team B</h2>
          <TeamSheet team={teamB} />
        </div>
      </div>
    </div>
  );
}
