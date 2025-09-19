import { getHeroesByIds } from '@/lib/fetch';
import { HeroByIdResponse, Stats } from '@/lib/types';
import React from 'react';
import BattleEngine from './_ui/battle-engine/page';
import PowerStats from '@/components/power-stats';
import { Team } from '@/lib/types';
import { ImageFallback } from '@/components/image-fallback';
import { categories } from '@/constants';

function TeamSheet({
  team,
  stats,
}: {
  team: HeroByIdResponse[];
  stats: Stats;
}) {
  return (
    <div className="space-y-2 bg-slate-50 p-5 rounded-sm">
      <div className="mb-6">
        <PowerStats stats={stats} title="Team Stats" />
      </div>
      <div className="text-sm mb-4 text-slate-500 font-medium">Players</div>
      {team.map(({ id, name, image }) => (
        <div key={id}>
          <div className="flex items-center font-semibold border-b border-gray-300 pb-2 mb-2">
            <ImageFallback
              className="mr-2 rounded-full object-cover w-8 h-8 flex-shrink-0"
              src={image.url}
              width={35}
              height={35}
              alt={`picture of ${name}`}
              name={name}
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

  function averagePowerstat(team: Team, stat: keyof Stats) {
    let powerstat: number[] = [];
    team.map((h) => {
      powerstat.push(parseInt(h.powerstats[stat], 10));
    });

    return (
      Math.round(
        (powerstat.reduce((sum, val) => sum + val, 0) / powerstat.length) * 100
      ) / 100
    );
  }

  function generateTeamStats(team: Team): Record<keyof Stats, string> {
    const teamStats: Record<keyof Stats, string> = {} as Record<
      keyof Stats,
      string
    >;

    categories.forEach((stat) => {
      const ave = averagePowerstat(team, stat);
      teamStats[stat] = String(ave);
    });

    return teamStats;
  }

  const teamAStats = generateTeamStats(teamA);
  const teamBStats = generateTeamStats(teamB);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Battle Arena</h1>
      <BattleEngine teamA={teamA} teamB={teamB} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Team A</h2>
          <TeamSheet team={teamA} stats={teamAStats} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Team B</h2>
          <TeamSheet team={teamB} stats={teamBStats} />
        </div>
      </div>
    </div>
  );
}
