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

  const team1Check = state.teamA.some((h) => h.id === heroId);
  const team2Check = state.teamB.some((h) => h.id === heroId);

  return (
    <div>
      <button
        onClick={() =>
          dispatch({
            type: TeamActionTypes.ADD,
            payload: { teamId: 'teamA', hero: { id: heroId, name: heroName } },
          })
        }
        disabled={team1Check}
      >
        Team A
      </button>
      <button
        onClick={() =>
          dispatch({
            type: TeamActionTypes.ADD,
            payload: { teamId: 'teamB', hero: { id: heroId, name: heroName } },
          })
        }
        disabled={team2Check}
      >
        Team B
      </button>
    </div>
  );
}
