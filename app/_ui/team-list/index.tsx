'use client';

import { useTeams } from '@/lib/team-provider';
import { TeamActionTypes } from '@/state/teamReducer';
import React from 'react';

export default function TeamList() {
  const { state, dispatch } = useTeams();
  const gameReady = state.team1.length === 3 && state.team2.length === 3;

  console.log({ gameReady });
  return (
    <div>
      <button
        disabled={!gameReady}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Start Game!
      </button>

      <div className="mb-4">
        <div className="font-bold">Team 1</div>
        {state.team1.map((h) => (
          <div key={h.id} className="flex">
            <span className="mr-2">{h.id}</span>
            <div className="mr-4">{h.name}</div>
            <button
              onClick={() =>
                dispatch({
                  type: TeamActionTypes.REMOVE,
                  payload: {
                    teamId: 'team1',
                    hero: { id: h.id, name: h.name },
                  },
                })
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div>
        <div className="font-bold">Team 2</div>
        {state.team2.map((h) => (
          <div key={h.id} className="flex">
            <span className="mr-2">{h.id}</span>
            <div className="mr-4">{h.name}</div>
            <button
              onClick={() =>
                dispatch({
                  type: TeamActionTypes.REMOVE,
                  payload: {
                    teamId: 'team2',
                    hero: { id: h.id, name: h.name },
                  },
                })
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
