'use client';

import { Teams, TeamId } from '@/constants';
import { useTeams } from '@/lib/team-provider';
import { typedEntries } from '@/lib/typed-object';
import { State, TeamActionTypes } from '@/state/teamReducer';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React from 'react';

export default function TeamList() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { state, dispatch } = useTeams();
  const gameReady = state.teamA.length === 3 && state.teamB.length === 3;

  const Team = ({
    id,
    name,
    teamId,
  }: {
    id: string;
    name: string;
    teamId: TeamId;
  }) => (
    <div key={id} className="flex">
      <span className="mr-2">{id}</span>
      <div className="mr-4">{name}</div>
      <button
        onClick={() =>
          dispatch({
            type: TeamActionTypes.REMOVE,
            payload: {
              teamId: teamId,
              hero: { id: id, name: name },
            },
          })
        }
      >
        Remove
      </button>
    </div>
  );

  function handleStartBattle() {
    if (gameReady) {
      const params = new URLSearchParams();
      params.set('teamA', state.teamA.map((h) => h.id).join(','));
      params.set('teamB', state.teamB.map((h) => h.id).join(','));
      router.push(`/battle?${params.toString()}`);
    }
  }

  return (
    <div className="team-list">
      <button
        onClick={handleStartBattle}
        disabled={!gameReady}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:bg-slate-400"
      >
        Start Battle!
      </button>
      <section>
        <div className="teams">
          {typedEntries(state).map(([teamId, heroes]) => (
            <div key={teamId}>
              <div className="font-bold mb-2">{Teams[teamId]}</div>
              {heroes.length ? (
                heroes.map((hero) => (
                  <Team
                    key={hero.id}
                    id={hero.id}
                    name={hero.name}
                    teamId={teamId}
                  />
                ))
              ) : (
                <div>No team members yet.</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
