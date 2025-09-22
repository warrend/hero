'use client';

import React, { useState, useCallback, startTransition, memo } from 'react';
import { Stats, TeamHero, Team } from '@/lib/types';
import { categories, statWeights } from '@/constants';
import { BattleActionTypes, useBattleReducer } from '@/state/battleReducer';
import BattleResults from '../battle-results/page';
import Modal from '@/components/modal';
import Button from '@/components/button';

const BattleEngine = memo(function BattleEngine({
  teamA,
  teamB,
}: {
  teamA: Team;
  teamB: Team;
}) {
  const [state, dispatch] = useBattleReducer();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const calculateTeamStats = useCallback((team: Team) => {
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
  }, []);

  const matchStart = useCallback((heroA: TeamHero, heroB: TeamHero) => {
    let heroAScore = 0;
    let heroBScore = 0;

    const result = categories.map((stat) => {
      const powerstatA = parseInt(heroA.powerstats[stat]) || 0;
      const powerstatB = parseInt(heroB.powerstats[stat]) || 0;

      const weight = statWeights[stat] || 1;

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
  }, []);

  const handleStartBattle = useCallback(() => {
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

    startTransition(() => {
      dispatch({
        type: BattleActionTypes.SET_BATTLE,
        payload: { battleResults },
      });
      setOpen(true);
    });
  }, [teamA, teamB, calculateTeamStats, matchStart, dispatch]);

  const handleShare = () => {
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
  };

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div>
      <>
        <Button onClick={handleStartBattle} color="green" className="mr-2">
          {state.battleResults === null
            ? 'Start Battle'
            : 'View Battle Results'}
        </Button>
        <Button onClick={handleShare} color="blue">
          {copied ? 'Copied!' : 'Copy Battle Link'}
        </Button>
        <Modal
          open={open}
          className="backdrop:bg-black/60 p-0 rounded-sm shadow-xl w-[95vw] max-w-5xl sm:w-full min-h-[75vh] max-h-[75vh] sm:min-h-[60vh] sm:max-h-[80vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          onClose={handleCloseModal}
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
});

export default BattleEngine;
