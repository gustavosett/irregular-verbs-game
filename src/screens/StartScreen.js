import React from 'react';
import LanguageSelector from '../components/LanguageSelector';
import Button from '../components/Button';

const WavingCharacter = () => (
  <svg width="150" height="150" viewBox="0 0 100 100" className="mb-8">
    <circle cx="50" cy="50" r="40" fill="#1cb0f6" />
    <circle cx="40" cy="45" r="5" fill="white" />
    <circle cx="60" cy="45" r="5" fill="white" />
    <path d="M 40 60 Q 50 70 60 60" stroke="white" strokeWidth="3" fill="none" />
    <path d="M 70 50 A 20 20 0 0 1 80 30" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" />
  </svg>
);

export default function StartScreen({ game, languageName, onSelectLanguage, selectedLanguage }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-extrabold">Irregular Verb Game</h1>
      <p className="mt-2 text-xl text-duo-gray-dark">{languageName}</p>
      
      {game.score > 0 && <p className="mt-8 text-3xl">Final Score: {game.score}</p>}
      <p className="mt-4 text-2xl">High Score: {game.highScore}</p>
      
      <div className="mt-8 w-full flex justify-center">
        <Button onClick={game.startGame}>
          {game.score > 0 ? 'Play Again' : 'Start Game'}
        </Button>
      </div>
      
      <LanguageSelector 
        onSelectLanguage={onSelectLanguage}
        selectedLanguage={selectedLanguage} 
      />
    </div>
  );
}