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
    <div
      key={id}
      className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2"
    >
      <div className="flex items-center">
        <span className="mr-3 text-sm text-slate-600 font-medium">#{id}</span>
        <div className="font-semibold">{name}</div>
      </div>
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
        className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded text-sm font-medium transition-colors"
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
        className="bg-slate-500 text-white font-medium rounded-sm text-sm px-3 py-1.5 disabled:bg-gray-400 disabled:cursor-not-allowed mb-6 cursor-pointer"
      >
        Preview Battle
      </button>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {typedEntries(state).map(([teamId, heroes]) => (
            <div key={teamId} className="space-y-2 bg-slate-50 p-5 rounded-sm">
              <div className="text-xl font-semibold mb-4">{Teams[teamId]}</div>
              <div className="text-sm mb-4 text-slate-500 font-medium">
                Players
              </div>
              {heroes.length ? (
                <div className="space-y-2">
                  {heroes.map((hero) => (
                    <Team
                      key={hero.id}
                      id={hero.id}
                      name={hero.name}
                      teamId={teamId}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-slate-400 italic">
                  No team members yet.
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
