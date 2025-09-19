'use client';

import React from 'react';
import { Stats, TeamHero, Team } from '@/lib/types';
import { categories } from '@/constants';
import { useState, useRef, useEffect, ReactNode } from 'react';
import { BattleActionTypes, useBattleReducer } from '@/state/battleReducer';
import BattleResults from '../battle-results/page';

export default function BattleEngine({
  teamA,
  teamB,
}: {
  teamA: Team;
  teamB: Team;
}) {
  const [state, dispatch] = useBattleReducer();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    console.log({ dialog });
    if (open && dialog) {
      dialog.showModal();
    } else if (dialog) {
      dialog.close();
    }
  }, [open]);

  console.log({ state });

  function handleStartBattle() {
    setOpen(true);
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
          ? ('draw' as const)
          : heroAScore > heroBScore
          ? ('teamA' as const)
          : ('teamB' as const),
      result,
    };
  }
  return (
    <div>
      <>
        <button
          className="mb-6 bg-green-100 border border-green-700 text-black font-medium py-1 px-3 rounded text-sm hover:bg-green-200 transition-colors"
          onClick={handleStartBattle}
        >
          {state.battleResults === null
            ? 'Start Battle'
            : 'View Battle Results'}
        </button>

        <dialog
          ref={dialogRef}
          className="backdrop:bg-black/60 p-0 rounded-sm shadow-xl w-[95vw] max-w-5xl sm:w-full min-h-[75vh] max-h-[75vh] sm:min-h-[60vh] sm:max-h-[80vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          onClose={() => setOpen(false)}
        >
          <div className="bg-white h-full flex flex-col">
            <div className="sticky top-0 bg-white z-20 p-4 sm:p-6 pb-3 sm:pb-4 border-b border-gray-200">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <div></div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-sm text-slate-400 font-medium"
                >
                  Exit
                </button>
              </div>
            </div>
            <div className="p-4">
              <BattleResults results={state.battleResults} />
            </div>
          </div>
        </dialog>
      </>
    </div>
  );
}
