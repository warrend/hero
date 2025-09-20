'use client';

import React from 'react';
import { Stats, TeamHero, Team } from '@/lib/types';
import { categories, statWeights } from '@/constants';
import { useState } from 'react';
import { BattleActionTypes, useBattleReducer } from '@/state/battleReducer';
import BattleResults from '../battle-results/page';
import Modal from '@/components/modal';
import { fallbackModeToFallbackField } from 'next/dist/lib/fallback';

export default function BattleEngine({
  teamA,
  teamB,
}: {
  teamA: Team;
  teamB: Team;
}) {
  const [state, dispatch] = useBattleReducer();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function calculateTeamStats(team: Team) {
    const teamStats: Record<
      keyof Stats,
      { total: number; average: number; max: number }
    > = {} as any;

    categories.forEach((stat) => {
      const values = team.map((hero) => parseInt(hero.powerstats[stat]) || 0);
      teamStats[stat] = {
        total: values.reduce((sum, val) => sum + val, 0),
        average: values.reduce((sum, val) => sum + val, 0) / values.length,
        max: Math.max(...values),
      };
    });

    return teamStats;
  }

  function handleStartBattle() {
    setOpen(true);

    const teamAStats = calculateTeamStats(teamA);
    const teamBStats = calculateTeamStats(teamB);

    const allBattleResults = [];
    let teamAScore = 0;
    let teamBScore = 0;

    for (const heroA of teamA) {
      for (const heroB of teamB) {
        const result = matchStart(heroA, heroB);
        if (result.teamWinner === 'teamA') {
          teamAScore++;
        } else if (result.teamWinner === 'teamB') {
          teamBScore++;
        }

        allBattleResults.push(result);
      }
    }

    const battleResults = {
      allBattleResults,
      score: { teamAScore, teamBScore },
      teamStats: { teamA: teamAStats, teamB: teamBStats },
    };

    dispatch({
      type: BattleActionTypes.SET_BATTLE,
      payload: { battleResults },
    });
  }

  function matchStart(heroA: TeamHero, heroB: TeamHero) {
    let heroAScore = 0;
    let heroBScore = 0;

    const result = categories.map((stat) => {
      const powerstatA = parseInt(heroA.powerstats[stat]) || 0;
      const powerstatB = parseInt(heroB.powerstats[stat]) || 0;

      const weight = statWeights[stat] | 1;

      heroAScore += powerstatA * weight;
      heroBScore += powerstatB * weight;

      return {
        [stat]: {
          [heroA.name]: powerstatA,
          [heroB.name]: powerstatB,
        },
      };
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
          ? ('draw' as const)
          : heroAScore > heroBScore
          ? ('teamA' as const)
          : ('teamB' as const),
      result,
      totalPoints: { heroA: heroAScore, heroB: heroBScore },
    };
  }

  function handleShare() {
    const url = window.location.href;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
      })
      .catch((error) => {
        console.error('Unable to copy url. Please try again.');
        setCopied(false);
      });
  }

  return (
    <div>
      <>
        <button
          className="mr-2 mb-6 bg-green-100 border border-green-700 text-black font-medium py-1 px-3 rounded text-sm hover:bg-green-200 transition-colors"
          onClick={handleStartBattle}
        >
          {state.battleResults === null
            ? 'Start Battle'
            : 'View Battle Results'}
        </button>
        <button
          className="mb-6 bg-blue-100 border border-blue-700 text-black font-medium py-1 px-3 rounded text-sm hover:bg-blue-200 transition-colors"
          onClick={handleShare}
        >
          {copied ? 'Copied!' : 'Copy Battle Link'}
        </button>
        <Modal
          open={open}
          className="backdrop:bg-black/60 p-0 rounded-sm shadow-xl w-[95vw] max-w-5xl sm:w-full min-h-[75vh] max-h-[75vh] sm:min-h-[60vh] sm:max-h-[80vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          onClose={() => setOpen(false)}
        >
          <div className="bg-white h-full flex flex-col">
            <div className="p-4">
              <BattleResults results={state.battleResults} />
            </div>
          </div>
        </Modal>
      </>
    </div>
  );
}
