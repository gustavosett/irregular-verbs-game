// src/components/SentenceInput.js
import React from 'react';

export default function SentenceInput({ sentence, userInput, answer, isWrong, isCorrect }) {
  const parts = sentence.split('__');
  let borderColor = 'border-duo-gray-dark';
  if (isWrong) borderColor = 'border-duo-red';
  if (isCorrect) borderColor = 'border-duo-green';

  const inputStyle = {
    minWidth: `${Math.max(answer.length, userInput.length) + 2}ch`,
  };

  return (
    <h2 className={`text-2xl md:text-3xl ${isWrong ? 'animate-shake' : ''}`}>
      {parts[0]}
      <span
        style={inputStyle}
        className={`inline-block text-center mx-2 pb-1 !text-gray-700 bg-duo-gray-light rounded-md border-b-4 outline-none transition-all duration-300 ${borderColor}`}
      >
        {userInput || ''}
        {!userInput && !isCorrect && <span className="animate-pulse !text-gray-700">|</span>}
      </span>
      {parts[1]}
    </h2>
  );
}