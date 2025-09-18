'use client';

import { Stats } from '@/lib/types';
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
  function handleStartBattle() {
    generateTeamStats();
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

  function generateTeamStats() {
    const teamAStats = categories.map((stat) => {
      let powerstat: number[] = [];
      teamA.map((h) => {
        powerstat.push(
          Math.round(parseInt(h.powerstats[stat], 10) * 100) / 100
        );
      });

      return {
        stat: powerstat.reduce((sum, val) => sum + val, 0) / powerstat.length,
      };
    });

    console.log({ teamAStats });
  }

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
