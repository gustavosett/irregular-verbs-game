// src/components/Feedback.js
import React from "react";
import Button from "./Button"; // Import the new button

export default function Feedback({ game }) {
  if (!game.isCorrect && !game.isWrong && !game.isGameOver) {
    return null;
  }

  const isCorrect = game.isCorrect;
  const bgColor = isCorrect ? "bg-duo-green" : "bg-duo-red";
  const textColor = "text-white";
  const message = isCorrect ? "You got it!" : "Incorrect!";

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 w-full px-4 py-1 ${bgColor} ${textColor} animate-fade-in`}
    >
      {game.isGameOver && (
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h3 className="text-3xl">Game Over!</h3>
            <h6>{game.currentChallenge.explanation}</h6>
          </div>
          <Button
            onClick={() => game.setGameActive(false)}
            className="max-w-xs !bg-white !text-duo-red !border-duo-red-dark"
          >
            End Session
          </Button>
        </div>
      )}
      {!game.isGameOver && (
        <div className="max-w-2xl mx-auto flex justify-center">
          <h3 className="text-2xl font-bold">{message}</h3>
        </div>
      )}
    </div>
  );
}