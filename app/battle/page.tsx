import { getHeroesByIds } from '@/lib/fetch';
import { HeroByIdResponse, Stats } from '@/lib/types';
import React from 'react';
import BattleEngine from './_ui/battle-engine/page';
import { Team } from '@/lib/types';
import { categories } from '@/constants';
import Link from 'next/link';
import { TeamSheet } from './_ui/team-sheet/page';

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
      <Link className="text-sm text-slate-400 font-medium" href="/">
        Back
      </Link>

      <h1 className="text-2xl font-bold mb-6 border-b-2 border-slate-200 pb-5">
        Battle Arena
      </h1>
      <div className="flex gap-2">
        <BattleEngine teamA={teamA} teamB={teamB} />
      </div>
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
