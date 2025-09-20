import { TeamStats } from '@/lib/types';
import React from 'react';

export default function Stats({ teamStats }: { teamStats: TeamStats }) {
  return (
    <div className="space-y-2">
      {Object.entries(teamStats).map(([stat, values]) => (
        <div
          key={stat}
          className="flex justify-between items-center py-1 border-b border-gray-100"
        >
          <span className="capitalize font-medium text-gray-700">{stat}:</span>
          <div className="text-sm text-gray-600">
            Avg:{' '}
            <span className="font-semibold">{values.average.toFixed(1)}</span> |
            Max: <span className="font-semibold">{values.max}</span> | Total:{' '}
            <span className="font-semibold">{values.total}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
