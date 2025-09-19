import { Stats } from '@/lib/types';
import { useReducer } from 'react';

type TeamHero = {
  name: string;
  id: string;
  image: { url: string };
  powerstats: Stats;
};

type Team = TeamHero[];

export type State = {
  teamStats: {
    teamA: Stats | null;
    teamB: Stats | null;
  };
};

export const BattleActionTypes = {
  SET_TEAM_STATS: 'SET_TEAM_STATS',
} as const;

export type Action = {
  type: typeof BattleActionTypes.SET_TEAM_STATS;
  payload: { teamA: Stats; teamB: Stats };
};

export const initialState: State = {
  teamStats: {
    teamA: null,
    teamB: null,
  },
};

function battleReducer(state: State, action: Action): State {
  switch (action.type) {
    case BattleActionTypes.SET_TEAM_STATS:
      return {
        ...state,
        teamStats: action.payload,
      };
    default:
      return state;
  }
}

export function useBattleReducer() {
  return useReducer(battleReducer, initialState);
}
