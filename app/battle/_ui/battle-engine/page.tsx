'use client';

import PowerStats from '@/components/power-stats';
import { Stats } from '@/lib/types';
import { BattleActionTypes, useBattleReducer } from '@/state/battleReducer';
import React from 'react';

type Hero = {
  id: string;
  name: string;
  image: { url: string };
  powerstats: Stats;
};

type Team = Hero[];

const categories: (keyof Stats)[] = [
  'combat',
  'durability',
  'intelligence',
  'speed',
  'power',
  'strength',
];

export default function BattleEngine({
  teamA,
  teamB,
}: {
  teamA: Team;
  teamB: Team;
}) {
  const [state, dispatch] = useBattleReducer();

  console.log({ state });

  function handleStartBattle() {
    const allBattleResults = [];
    let teamAScore = 0;
    let teamBScore = 0;

    for (const heroA of teamA) {
      for (const heroB of teamB) {
        const result = matchStart(heroA, heroB);
        if (result.teamWinner === 'teamA') {
          teamAScore++;
        } else if (result.winner === 'teamB') {
          teamBScore++;
        }

        allBattleResults.push(result);
      }
    }

    return {
      allBattleResults,
      score: { teamAScore, teamBScore },
    };
  }

  // function averagePowerstat(team: Team, stat: keyof Stats) {
  //   let powerstat: number[] = [];
  //   team.map((h) => {
  //     powerstat.push(parseInt(h.powerstats[stat], 10));
  //   });

  //   return (
  //     Math.round(
  //       (powerstat.reduce((sum, val) => sum + val, 0) / powerstat.length) * 100
  //     ) / 100
  //   );
  // }

  // function generateTeamStats() {
  //   const teamAStats: Record<keyof Stats, string> = {} as Record<
  //     keyof Stats,
  //     string
  //   >;
  //   const teamBStats: Record<keyof Stats, string> = {} as Record<
  //     keyof Stats,
  //     string
  //   >;
  //   categories.forEach((stat) => {
  //     teamAStats[stat] = String(averagePowerstat(teamA, stat));
  //     teamBStats[stat] = String(averagePowerstat(teamB, stat));
  //   });

  //   dispatch({
  //     type: BattleActionTypes.SET_TEAM_STATS,
  //     payload: { teamA: teamAStats, teamB: teamBStats },
  //   });
  // }

  function matchStart(heroA: Hero, heroB: Hero) {
    let heroAScore = 0;
    let heroBScore = 0;

    const result = categories.map((stat) => {
      const powerstatA = heroA.powerstats[stat];
      const powerstatB = heroB.powerstats[stat];

      if (parseInt(powerstatA) > parseInt(powerstatB)) {
        heroAScore++;
      } else if (parseInt(powerstatA) < parseInt(powerstatB)) {
        heroBScore++;
      }

      return { [stat]: { [heroA.name]: powerstatA, [heroB.name]: powerstatB } };
    });

    return {
      heroA: heroA.name,
      heroB: heroB.name,
      score: { [heroA.name]: heroAScore, [heroB.name]: heroBScore },
      winner:
        heroAScore === heroBScore
          ? 'draw'
          : heroAScore > heroBScore
          ? heroA.name
          : heroB.name,
      teamWinner:
        heroAScore === heroBScore
          ? 'draw'
          : heroAScore > heroBScore
          ? 'teamA'
          : 'teamB',
      result,
    };
  }
  return (
    <div>
      <button onClick={handleStartBattle}>Start the battle!</button>
    </div>
  );
}
