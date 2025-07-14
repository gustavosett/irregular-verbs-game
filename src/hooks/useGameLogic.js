import { useState, useEffect, useCallback, useRef } from 'react';
import { config } from '../config.js';

const MAX_TIME = config.MAX_TIME; 
const TIME_GAIN_ON_CORRECT = config.TIME_GAIN_ON_CORRECT;

export const useGameLogic = (languageData) => {
  const [gameActive, setGameActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      const savedScore = localStorage.getItem(config.HIGH_SCORE_KEY);
      return savedScore ? parseInt(savedScore, 10) : 0;
    } catch (error) {
      console.error("Could not read high score from localStorage", error);
      return 0;
    }
  });

  const [timeRemaining, setTimeRemaining] = useState(MAX_TIME);
  const gameTimerRef = useRef(null);
  const lastFrameTimeRef = useRef(null);

  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [usedChallenges, setUsedChallenges] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const totalChallenges = languageData.verbs.reduce((acc, verb) => acc + verb.sentences.length, 0);

  const stopGameTimer = () => {
    if (gameTimerRef.current) {
      cancelAnimationFrame(gameTimerRef.current);
    }
  };
  
  const nextChallenge = useCallback(() => {
    if (!languageData || languageData.verbs.length === 0) {
        console.error("Language data is not loaded or is empty.");
        return;
    }
      
    let localUsedChallenges = [...usedChallenges];
    if (localUsedChallenges.length >= totalChallenges) {
      localUsedChallenges = [];
    }

    let randomVerbIndex, randomSentenceIndex, challengeId;
    do {
      randomVerbIndex = Math.floor(Math.random() * languageData.verbs.length);
      const verbData = languageData.verbs[randomVerbIndex];
      randomSentenceIndex = Math.floor(Math.random() * verbData.sentences.length);
      challengeId = `${randomVerbIndex}-${randomSentenceIndex}`;
    } while (localUsedChallenges.includes(challengeId));

    setUsedChallenges([...localUsedChallenges, challengeId]);
    
    const verbData = languageData.verbs[randomVerbIndex];
    const sentenceData = verbData.sentences[randomSentenceIndex];

    setCurrentChallenge({
      verb: verbData.verb,
      translation: verbData.translation,
      ...sentenceData
    });

    setUserInput('');
    setIsWrong(false);
    setIsCorrect(false);
    setShowHint(false);
    setShowExplanation(false);
  }, [languageData, usedChallenges, totalChallenges]);

  const startGame = () => {
    setGameActive(true);
    setIsGameOver(false);
    setScore(0);
    setTimeRemaining(MAX_TIME);
    setUsedChallenges([]);
    nextChallenge();
  };

  const handleCorrectAnswer = () => {
    setIsCorrect(true);
    setScore(prev => prev + config.SCORE_CORRECT);
    setTimeRemaining(prev => Math.min(MAX_TIME, prev + TIME_GAIN_ON_CORRECT));
    
    setTimeout(() => {
      if (gameActive && !isGameOver) { 
        nextChallenge();
      }
    }, config.SUCCESS_DELAY);
  };

  const handleIncorrectAnswer = () => {
    setIsWrong(true);
    setScore(prev => Math.max(0, prev - config.SCORE_INCORRECT));
    setShowExplanation(false); 
  };
  
  const handleShowHint = () => {
      if (!showHint) {
          setScore(prev => Math.max(0, prev - config.SCORE_HINT));
          setShowHint(true);
      }
  };

  const checkAnswer = useCallback(() => {
    if (!currentChallenge || isCorrect || isGameOver) return;

    if (userInput.trim().toLowerCase() === currentChallenge.answer.toLowerCase()) {
      handleCorrectAnswer();
    } else {
      handleIncorrectAnswer();
    }
  }, [userInput, currentChallenge, isCorrect, isGameOver, handleCorrectAnswer, handleIncorrectAnswer]);
  
  useEffect(() => {
    if (!gameActive || isGameOver) {
      stopGameTimer();
      return;
    }

    const gameLoop = (now) => {
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = now;
      }
      const deltaTime = now - lastFrameTimeRef.current;
      lastFrameTimeRef.current = now;

      setTimeRemaining(prevTime => {
        const newTime = prevTime - deltaTime;
        if (newTime <= 0) {
          stopGameTimer();
          setIsGameOver(true);
          setIsWrong(true);
          setShowExplanation(true);
          
          if (score > highScore) {
            setHighScore(score);
            try {
                localStorage.setItem(config.HIGH_SCORE_KEY, score.toString());
            } catch (error) {
                console.error("Could not save high score to localStorage", error);
            }
          }
          return 0;
        }
        return newTime;
      });

      gameTimerRef.current = requestAnimationFrame(gameLoop);
    };

    lastFrameTimeRef.current = performance.now();
    gameTimerRef.current = requestAnimationFrame(gameLoop);

    return () => stopGameTimer();
  }, [gameActive, isGameOver, score, highScore]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameActive || !currentChallenge || isCorrect || isGameOver) return;

      if (e.key.match(/^[a-zA-Z]$/) || e.key === 'Backspace') {
        e.preventDefault();
      }
      
      if (e.key === 'Enter') {
        checkAnswer();
      } else if (e.key === 'Backspace') {
        setUserInput(prev => prev.slice(0, -1));
        setIsWrong(false);
      } else if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
        setUserInput(prev => prev + e.key);
        setIsWrong(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameActive, checkAnswer, currentChallenge, isCorrect, isGameOver]);
  
  return {
    gameActive,
    isGameOver,
    score,
    highScore,
    timeRemaining,
    currentChallenge,
    userInput,
    isWrong,
    isCorrect,
    showHint,
    showExplanation,
    MAX_TIME,
    startGame,
    checkAnswer,
    handleShowHint,
    setGameActive,
    setShowExplanation,
  };
};
