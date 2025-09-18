'use client';

import { useTeams } from '@/lib/team-provider';
import { TeamActionTypes } from '@/state/teamReducer';
import React from 'react';

export default function TeamSelect({
  heroId,
  heroName,
}: {
  heroId: string;
  heroName: string;
}) {
  const { state, dispatch } = useTeams();

  const alreadyOnATeam =
    state.teamA.some((h) => h.id === heroId) ||
    state.teamB.some((h) => h.id === heroId);

  const teamConfig = [
    {
      teamId: 'teamA' as const,
      teamCheck: state.teamA.some((h) => h.id === heroId),
      label: 'Team A',
    },
    {
      teamId: 'teamB' as const,
      teamCheck: state.teamB.some((h) => h.id === heroId),
      label: 'Team B',
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-600">Add to: </span>
      {teamConfig.map(({ teamId, teamCheck, label }) => (
        <button
          className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ease-in-out disabled:cursor-not-allowed ${
            teamCheck
              ? 'bg-green-100 text-green-700'
              : alreadyOnATeam
              ? 'bg-gray-300 text-gray-500'
              : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
          }`}
          key={teamId}
          onClick={() =>
            dispatch({
              type: TeamActionTypes.ADD,
              payload: { teamId, hero: { id: heroId, name: heroName } },
            })
          }
          disabled={alreadyOnATeam}
        >
          {teamCheck ? `On ${label}` : label}
        </button>
      ))}
    </div>
  );
}
