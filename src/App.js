import React, { useState, useEffect } from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import GameScreen from './screens/GameScreen';
import StartScreen from './screens/StartScreen';

const initialData = { name: 'Loading...', verbs: [] };

export default function App() {
  const [language, setLanguage] = useState('pt-br');
  const [languageData, setLanguageData] = useState(initialData);

  useEffect(() => {
    fetch(`/languages/${language}.json`)
      .then(res => res.json())
      .then(data => setLanguageData(data))
      .catch(err => console.error("Failed to load language data:", err));
  }, [language]);

  const game = useGameLogic(languageData);

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {game.gameActive ? (
        <GameScreen game={game} />
      ) : (
        <StartScreen 
          game={game}
          languageName={languageData.name} 
          onSelectLanguage={setLanguage}
          selectedLanguage={language}
        />
      )}
    </div>
  );
}