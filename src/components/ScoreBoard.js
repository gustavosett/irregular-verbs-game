// src/components/ScoreBoard.js
import React from 'react';

export default function ScoreBoard({ score, highScore }) {
  return (
    <div className="flex justify-between items-center mb-8 px-4">
      <div className="text-2xl font-bold">
        Score: <span className="text-green-400">{score}</span>
      </div>
      <div className="text-2xl font-bold">
        High Score: <span className="text-indigo-400">{highScore}</span>
      </div>
    </div>
  );
}