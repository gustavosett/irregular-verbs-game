import React from 'react';
import SentenceInput from './SentenceInput';

export default function ChallengeCard({ challenge, userInput, isWrong, isCorrect, onInputChange, onBackspace, onEnter }) {
  return (
    <>
      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-wider text-indigo-400">
        {challenge.verb}
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 sm:mb-10 md:mb-12">{challenge.translation}</p>
      <SentenceInput
        sentence={challenge.sentence}
        userInput={userInput}
        answer={challenge.answer}
        isWrong={isWrong}
        isCorrect={isCorrect}
        onInputChange={onInputChange}
        onBackspace={onBackspace}
        onEnter={onEnter}
      />
    </>
  );
}