'use client';

import { useTeams } from '@/lib/team-provider';
import React from 'react';

export default function TeamList() {
  const { state, dispatch } = useTeams();

  return (
    <div>
      <div className="mb-4">
        <div className="font-bold">Team 1</div>
        {state.team1.map((h) => (
          <div key={h.id} className="flex">
            <span className="mr-2">{h.id}</span>
            <div>{h.name}</div>
          </div>
        ))}
      </div>
      <div>
        <div className="font-bold">Team 2</div>
        {state.team2.map((h) => (
          <div key={h.id} className="flex">
            <span className="mr-2">{h.id}</span>
            <div>{h.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
