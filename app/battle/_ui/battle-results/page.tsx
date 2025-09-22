'use client';

import React, { useState, useEffect } from 'react';
import { type BattleResults } from '@/lib/types';
import BattleDetails from '../battle-details/page';

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

  return <BattleDetails results={results} />;
}
