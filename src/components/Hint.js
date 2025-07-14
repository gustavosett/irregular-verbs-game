// src/components/Hint.js
import React from 'react';

export default function Hint({ showHint, isCorrect, isWrong, isGameOver, onShowHint, answer }) {
  if (isCorrect || isWrong || isGameOver) {
    return null; // Hide hint if the question is answered or the game is over
  }

  return (
    <div>
      {!showHint ? (
        <button
          onClick={onShowHint}
          className="text-gray-500 hover:text-yellow-400 transition-colors disabled:opacity-50"
          disabled={showHint}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span className="ml-1">Hint (-5)</span>
        </button>
      ) : (
        <p className="text-yellow-400 text-lg animate-fade-in">
          Answer: <span className="font-bold">{answer}</span>
        </p>
      )}
    </div>
  );
}