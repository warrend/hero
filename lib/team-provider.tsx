'use client';

import React, { createContext, useContext, ReactNode, use } from 'react';
import { useTeamReducer, State, Action } from '@/state/teamReducer';

type TeamContextValue = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const TeamContext = createContext<TeamContextValue | undefined>(undefined);

export function TeamProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useTeamReducer();

  return (
    <TeamContext.Provider value={{ state, dispatch }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeams() {
  const context = useContext(TeamContext);

  if (!context) {
    throw new Error('useTeams needs to be inside of TeamProvider');
  }

  return context;
}
