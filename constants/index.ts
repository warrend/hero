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
