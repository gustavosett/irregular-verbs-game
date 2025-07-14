import React from 'react';
import LanguageSelector from '../components/LanguageSelector';
import Button from '../components/Button';
import { ReactComponent as GustavoSVG } from '../assets/gustavo.svg';

const WavingCharacter = () => (
 <GustavoSVG width="200" height="260" className="mb-4" />
);

export default function StartScreen({ game, languageName, onSelectLanguage, selectedLanguage }) {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 pt-20 text-center">
      <WavingCharacter />
      <h1 className="text-4xl font-extrabold">Irregular Verb Game</h1>
      {/* <p className="mt-2 text-xl text-duo-gray-dark">{languageName}</p> */}
      
      {game.score > 0 && <p className="mt-6 text-3xl">Final Score: {game.score}</p>}
      <p className="mt-2 text-2xl">High Score: {game.highScore}</p>
      
      <div className="mt-6 w-full flex justify-center">
        <Button onClick={game.startGame}>
          {game.score > 0 ? 'Play Again' : 'Start Game'}
        </Button>
      </div>
      
      <LanguageSelector 
        onSelectLanguage={onSelectLanguage}
        selectedLanguage={selectedLanguage} 
      />
      
      <div className="flex-grow"></div>
      
      <div className="absolute bottom-5 text-gray-600">
        made with ❤️ by <a 
          href="https://github.com/gustavosett" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          gustavosett
        </a>
      </div>
    </div>
  );
}