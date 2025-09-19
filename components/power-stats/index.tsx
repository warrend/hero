import { typedEntries } from '@/lib/typed-object';
import { Stats } from '@/lib/types';
import React from 'react';

const statMap: Record<keyof Stats, string> = {
  combat: 'Combat',
  durability: 'Durability',
  intelligence: 'Intelligence',
  power: 'Power',
  speed: 'Speed',
  strength: 'Strength',
};

const statObjEntries = typedEntries(statMap);

export default function PowerStats({
  stats,
  title,
}: {
  stats: Stats;
  title?: string;
}) {
  return (
    <div className="bg-slate-100 border border-slate-200 rounded-sm p-2 max-w">
      <h3 className="font-semibold text-slate-700 mb-3">
        {title ? title : 'Power Stats'}
      </h3>
      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
        {statObjEntries.map(([statKey, statLabel]) => {
          return (
            <React.Fragment key={statKey}>
              <div className="text-slate-600 text-sm">{statLabel}</div>
              <div className="text-slate-800 font-mono text-sm text-right">
                {stats[statKey]}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
