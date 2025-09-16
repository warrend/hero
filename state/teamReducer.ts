import { useReducer } from 'react';

type TeamHero = { name: string; id: string };

export type State = {
  team1: TeamHero[];
  team2: TeamHero[];
};

export const TeamActionTypes = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
} as const;

export type Action =
  | {
      type: typeof TeamActionTypes.ADD;
      payload: { teamId: 'team1' | 'team2'; hero: TeamHero };
    }
  | {
      type: typeof TeamActionTypes.REMOVE;
      payload: { teamId: 'team1' | 'team2'; hero: TeamHero };
    };

export const initialState: State = {
  team1: [],
  team2: [],
};

function teamReducer(state: State, action: Action): State {
  const teamId = action.payload.teamId;
  const currentTeam = state[teamId];
  const heroAlreadyOnTeam =
    state.team1.some((h) => h.id === action.payload.hero.id) ||
    state.team2.some((h) => h.id === action.payload.hero.id);

  switch (action.type) {
    case TeamActionTypes.ADD:
      if (heroAlreadyOnTeam || currentTeam.length >= 3) {
        return state;
      }

      return {
        ...state,
        [action.payload.teamId]: [
          ...state[action.payload.teamId],
          action.payload.hero,
        ],
      };
    case TeamActionTypes.REMOVE:
      if (!heroAlreadyOnTeam) {
        return state;
      }

      return {
        ...state,
        [action.payload.teamId]: state[action.payload.teamId].filter(
          (hero) => hero.id !== action.payload.hero.id
        ),
      };
    default:
      return state;
  }
}

export function useTeamReducer() {
  return useReducer(teamReducer, initialState);
}
