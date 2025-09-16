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

  const team1Check = state.team1.some((h) => h.id === heroId);
  const team2Check = state.team2.some((h) => h.id === heroId);

  return (
    <div>
      <button
        onClick={() =>
          dispatch({
            type: TeamActionTypes.ADD,
            payload: { teamId: 'team1', hero: { id: heroId, name: heroName } },
          })
        }
        value="team1"
        disabled={team1Check}
      >
        Team 1
      </button>
      <button
        onClick={() =>
          dispatch({
            type: TeamActionTypes.ADD,
            payload: { teamId: 'team2', hero: { id: heroId, name: heroName } },
          })
        }
        value="team2"
        disabled={team2Check}
      >
        Team 2
      </button>
    </div>
  );
}
