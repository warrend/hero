import { Stats } from '@/lib/types';

export type TeamId = 'teamA' | 'teamB';

export const Teams: Record<TeamId, string> = {
  teamA: 'Team A',
  teamB: 'Team B',
};

export const categories: (keyof Stats)[] = [
  'combat',
  'durability',
  'intelligence',
  'speed',
  'power',
  'strength',
];

export const statWeights: Record<keyof Stats, number> = {
  intelligence: 2.5,
  speed: 2.5,
  combat: 2.0,
  power: 1.0,
  strength: 1.0,
  durability: 1.5,
};
