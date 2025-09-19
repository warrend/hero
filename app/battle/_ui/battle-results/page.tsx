import { type BattleResults } from '@/lib/types';
import React from 'react';

export default function BattleResults({
  results,
}: {
  results: BattleResults | null;
}) {
  if (!results) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          No battle results yet. Start a battle to see results!
        </p>
      </div>
    );
  }

  const { allBattleResults, score } = results;

  return (
    <div className="space-y-6">
      <div className="bg-gray-100 rounded-lg p-4">
        <h2 className="text-xl font-bold text-center mb-4">
          {score.teamAScore > score.teamBScore ? (
            <div className="text-2xl font-bold text-green-800">Team A Wins</div>
          ) : score.teamBScore > score.teamAScore ? (
            <div className="text-2xl font-bold text-green-800">Team B Wins</div>
          ) : (
            <div className="text-2xl font-bold text-gray-600">Draw</div>
          )}
        </h2>
        <div className="flex justify-center items-center gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-600">
              {score.teamAScore}
            </div>
            <div className="text-sm text-gray-600">Team A</div>
          </div>
          <div className="text-2xl font-bold text-gray-400">-</div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-600">
              {score.teamBScore}
            </div>
            <div className="text-sm text-gray-600">Team B</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Match Results</h3>
        <div className="space-y-1">
          {allBattleResults.map((match, index) => (
            <div key={index} className="bg-white border-b border-gray-200 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 justify-end">
                  <span
                    className={`font-semibold ${
                      match.teamWinner === 'teamA'
                        ? 'text-green-800'
                        : 'text-gray-400'
                    }`}
                  >
                    {match.heroA}
                  </span>
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {match.heroA.charAt(0)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 mx-6">
                  <div className="bg-gray-200 rounded px-4 py-2 text-xl font-bold min-w-[50px] text-center">
                    {Object.values(match.score)[0]}
                  </div>
                  <div className="bg-gray-200 rounded px-4 py-2 text-xl font-bold min-w-[50px] text-center">
                    {Object.values(match.score)[1]}
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {match.heroB.charAt(0)}
                    </span>
                  </div>
                  <span
                    className={`font-semibold ${
                      match.teamWinner === 'teamB'
                        ? 'text-green-800'
                        : 'text-gray-400'
                    }`}
                  >
                    {match.heroB}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
