import React, { useState, useEffect } from "react";
import Button from "./Button";

export default function Feedback({ game }) {
  const [bottomPosition, setBottomPosition] = useState(0);

  useEffect(() => {
    const handleViewportChange = () => {
      if (window.visualViewport) {
        const keyboardHeight = window.innerHeight - window.visualViewport.height;
        setBottomPosition(keyboardHeight);
      } else {
        const isKeyboardOpen = window.innerHeight < 500;
        setBottomPosition(isKeyboardOpen ? window.innerHeight * 0.3 : 0);
      }
    };

    handleViewportChange();

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
      return () => window.visualViewport.removeEventListener('resize', handleViewportChange);
    } else {
      window.addEventListener('resize', handleViewportChange);
      return () => window.removeEventListener('resize', handleViewportChange);
    }
  }, []);

  if (!game.isCorrect && !game.isWrong && !game.isGameOver) {
    return null;
  }

  const isCorrect = game.isCorrect;
  const bgColor = isCorrect ? "bg-duo-green" : "bg-duo-red";
  const textColor = "text-white";
  const message = isCorrect ? "You got it!" : "Incorrect!";

  return (
    <div
      className={`fixed left-0 right-0 w-full px-4 py-3 ${bgColor} ${textColor} animate-fade-in z-50 rounded-t-lg`}
      style={{ bottom: `${bottomPosition}px` }}
    >
      {game.isGameOver && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto">
          <div className="text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl">Game Over!</h3>
            <h6 className="text-sm sm:text-base">{game.currentChallenge.explanation}</h6>
          </div>
          <Button
            onClick={() => game.setGameActive(false)}
            className="w-full sm:w-auto sm:max-w-xs !bg-white !text-duo-red !border-duo-red-dark"
          >
            End Session
          </Button>
        </div>
      )}
      {!game.isGameOver && (
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold">{message}</h3>
        </div>
      )}
    </div>
  );
}