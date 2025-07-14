import React from 'react';
import TimeBar from '../components/TimeBar';
import ScoreBoard from '../components/ScoreBoard';
import ChallengeCard from '../components/ChallengeCard';
import Hint from '../components/Hint';
import Feedback from '../components/Feedback';

export default function GameScreen({ game }) {
  const borderColor = game.isCorrect ? 'border-duo-green' : game.isWrong ? 'border-duo-red' : 'border-duo-gray-medium';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 pt-10">
      <div className="w-full max-w-2xl mx-auto">
        <TimeBar timeRemaining={game.timeRemaining} maxTime={game.MAX_TIME} />
        <ScoreBoard score={game.score} highScore={game.highScore} />
        
        <div className={`p-8 rounded-2xl bg-gray-800 border-2 ${borderColor} transition-all duration-300`}>
          {!game.currentChallenge ? (
            <div className="text-2xl text-duo-gray-dark">Loading...</div>
          ) : (
            <ChallengeCard
              challenge={game.currentChallenge}
              userInput={game.userInput}
              isWrong={game.isWrong}
              isCorrect={game.isCorrect}
            />
          )}
        </div>
        
        <div className="text-center mt-6 h-10">
          <Hint
            showHint={game.showHint}
            isCorrect={game.isCorrect}
            onShowHint={game.handleShowHint}
            answer={game.currentChallenge?.answer}
          />
        </div>
      </div>
      
      {(game.isCorrect || game.isWrong) && <Feedback game={game} />}
    </div>
  );
}