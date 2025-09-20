import Stats from '@/components/stats';
import { type BattleResults } from '@/lib/types';
import React, { useState, useEffect } from 'react';

export default function BattleResults({
  results,
}: {
  results: BattleResults | null;
}) {
  const [showIntro, setShowIntro] = useState(false);
  const [flashColor, setFlashColor] = useState('black');

  useEffect(() => {
    if (results) {
      setShowIntro(true);

      const flashInterval = setInterval(() => {
        setFlashColor((prevColor) => (prevColor === 'black' ? 'red' : 'black'));
      }, 200);

      const introTimeout = setTimeout(() => {
        clearInterval(flashInterval);
        setShowIntro(false);
      }, 3000);

      return () => {
        clearInterval(flashInterval);
        clearTimeout(introTimeout);
      };
    }
  }, [results]);

  if (!results) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          No battle results yet. Start a battle to see results!
        </p>
      </div>
    );
  }

  if (showIntro) {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-100 ${
          flashColor === 'black' ? 'bg-blue-500' : 'bg-red-600'
        }`}
      >
        <div className="text-center">
          <h1
            className={`text-6xl md:text-8xl font-black ${
              flashColor === 'black' ? 'text-white' : 'text-yellow-300'
            }`}
            style={{
              textShadow: '4px 4px 8px rgba(0,0,0,0.9)',
              animation: 'slowPulse 2s ease-in-out infinite',
            }}
          >
            LET THE BATTLE BEGIN!
          </h1>
        </div>

        <style jsx>{`
          @keyframes slowPulse {
            0%,
            100% {
              transform: scale(1);
              opacity: 0.9;
            }
            50% {
              transform: scale(1.05);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }

  const { allBattleResults, score, teamStats } = results;

  return (
    <div className="space-y-6">
      <div className="bg-slate-100 rounded-sm p-4">
        <h2 className="text-xl font-bold text-center mb-4">
          {score.teamAScore > score.teamBScore ? (
            <div className="text-2xl font-bold text-green-800">Team A Wins</div>
          ) : score.teamBScore > score.teamAScore ? (
            <div className="text-2xl font-bold text-blue-800">Team B Wins</div>
          ) : (
            <div className="text-3xl font-bold text-gray-600">🤝 Draw</div>
          )}
        </h2>
        <div className="flex justify-center items-center gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600">
              {score.teamAScore}
            </div>
            <div className="text-sm text-gray-600 font-medium">Wins</div>
          </div>
          <div className="text-md font-bold text-gray-400">VS</div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">
              {score.teamBScore}
            </div>
            <div className="text-sm text-gray-600 font-medium">Wins</div>
          </div>
        </div>
      </div>

      {teamStats && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-3 text-slate-400">
                Team A Stats
              </h4>
              <Stats teamStats={teamStats.teamA} />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3 text-slate-400">
                Team B Stats
              </h4>
              <Stats teamStats={teamStats.teamA} />
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-sm text-slate-400 font-semibold mb-4">Battles</h3>
        <div className="space-y-3">
          {allBattleResults.map((match, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-sm p-2"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3 flex-1 justify-end">
                  <span
                    className={`font-semibold text-lg ${
                      match.teamWinner === 'teamA'
                        ? 'text-green-800'
                        : 'text-gray-500'
                    }`}
                  >
                    {match.heroA}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      match.teamWinner === 'teamA'
                        ? 'bg-green-600'
                        : 'bg-gray-400'
                    }`}
                  >
                    {match.heroA.charAt(0)}
                  </div>
                </div>

                <div className="flex items-center gap-2 mx-6">
                  <div
                    className={`rounded px-2 py-1 text-lg font-bold min-w-[60px] text-center ${
                      match.teamWinner === 'teamA'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {Object.values(match.score)[0]}
                  </div>
                  <span className="text-gray-400 font-bold">VS</span>
                  <div
                    className={`rounded px-2 py-1 text-lg font-bold min-w-[60px] text-center ${
                      match.teamWinner === 'teamB'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {Object.values(match.score)[1]}
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      match.teamWinner === 'teamB'
                        ? 'bg-blue-600'
                        : 'bg-gray-400'
                    }`}
                  >
                    {match.heroB.charAt(0)}
                  </div>
                  <span
                    className={`font-semibold text-lg ${
                      match.teamWinner === 'teamB'
                        ? 'text-blue-800'
                        : 'text-gray-500'
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
