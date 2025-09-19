import { BattleResults, Stats } from '@/lib/types';
import { useReducer } from 'react';

export type State = {
  teamStats: {
    teamA: Stats | null;
    teamB: Stats | null;
  };
  battleResults: BattleResults | null;
};

export const BattleActionTypes = {
  SET_TEAM_STATS: 'SET_TEAM_STATS',
  SET_BATTLE: 'SET_BATTLE',
} as const;

export type Action =
  | {
      type: typeof BattleActionTypes.SET_TEAM_STATS;
      payload: { teamA: Stats; teamB: Stats };
    }
  | {
      type: typeof BattleActionTypes.SET_BATTLE;
      payload: { battleResults: BattleResults };
    };

export const initialState: State = {
  teamStats: {
    teamA: null,
    teamB: null,
  },
  battleResults: null,
};

function battleReducer(state: State, action: Action): State {
  switch (action.type) {
    case BattleActionTypes.SET_TEAM_STATS:
      return {
        ...state,
        teamStats: action.payload,
      };
    case BattleActionTypes.SET_BATTLE:
      return {
        ...state,
        battleResults: action.payload.battleResults,
      };
    default:
      return state;
  }
}

export function useBattleReducer() {
  return useReducer(battleReducer, initialState);
}
