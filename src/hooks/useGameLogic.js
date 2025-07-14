import { useState, useEffect, useCallback, useRef } from 'react';

// --- Constants ---
// The timer bar's maximum value in ms (8 seconds)
const MAX_TIME = 10000; 
// Time added for a correct answer (2.5 seconds)
const TIME_GAIN_ON_CORRECT = 7000; 

/**
 * Custom hook to manage the entire state and logic of the Irregular Verb Game.
 * @param {object} languageData - The loaded language data object containing verbs and sentences.
 * @returns {object} An object containing all the state and functions needed by the UI components.
 */
export const useGameLogic = (languageData) => {
  // --- Game State ---
  const [gameActive, setGameActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    // Safely get high score from localStorage
    try {
      const savedScore = localStorage.getItem('verbGameHighScore');
      return savedScore ? parseInt(savedScore, 10) : 0;
    } catch (error) {
      console.error("Could not read high score from localStorage", error);
      return 0;
    }
  });

  // --- Timer "Health Bar" State ---
  const [timeRemaining, setTimeRemaining] = useState(MAX_TIME);
  const gameTimerRef = useRef(null);
  const lastFrameTimeRef = useRef(null);

  // --- Current Challenge State ---
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [usedChallenges, setUsedChallenges] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // --- Derived State ---
  const totalChallenges = languageData.verbs.reduce((acc, verb) => acc + verb.sentences.length, 0);

  // --- Game Logic Functions ---

  // Stops the requestAnimationFrame loop for the timer.
  const stopGameTimer = () => {
    if (gameTimerRef.current) {
      cancelAnimationFrame(gameTimerRef.current);
    }
  };
  
  // Selects the next random challenge, avoiding immediate repeats.
  const nextChallenge = useCallback(() => {
    if (!languageData || languageData.verbs.length === 0) {
        console.error("Language data is not loaded or is empty.");
        return;
    }
      
    let localUsedChallenges = [...usedChallenges];
    // Reset the used challenges list if all have been shown
    if (localUsedChallenges.length >= totalChallenges) {
      localUsedChallenges = [];
    }

    let randomVerbIndex, randomSentenceIndex, challengeId;
    // Loop to find a challenge that hasn't been used in the current cycle
    do {
      randomVerbIndex = Math.floor(Math.random() * languageData.verbs.length);
      const verbData = languageData.verbs[randomVerbIndex];
      randomSentenceIndex = Math.floor(Math.random() * verbData.sentences.length);
      challengeId = `${randomVerbIndex}-${randomSentenceIndex}`;
    } while (localUsedChallenges.includes(challengeId));

    setUsedChallenges([...localUsedChallenges, challengeId]);
    
    const verbData = languageData.verbs[randomVerbIndex];
    const sentenceData = verbData.sentences[randomSentenceIndex];

    // Set the state for the new challenge
    setCurrentChallenge({
      verb: verbData.verb,
      translation: verbData.translation,
      ...sentenceData
    });

    // Reset UI state for the new round
    setUserInput('');
    setIsWrong(false);
    setIsCorrect(false);
    setShowHint(false);
    setShowExplanation(false);
  }, [languageData, usedChallenges, totalChallenges]);

  // Initializes the game state to start a new session.
  const startGame = () => {
    setGameActive(true);
    setIsGameOver(false);
    setScore(0);
    setTimeRemaining(MAX_TIME);
    setUsedChallenges([]);
    nextChallenge();
  };

  // Handles the logic for a correct answer.
  const handleCorrectAnswer = () => {
    setIsCorrect(true);
    setScore(prev => prev + 5);
    setTimeRemaining(prev => Math.min(MAX_TIME, prev + TIME_GAIN_ON_CORRECT));
    
    // Pause briefly to show success feedback before moving on
    setTimeout(() => {
      // Check if game hasn't ended in the meantime (e.g., by user action)
      if (gameActive && !isGameOver) { 
        nextChallenge();
      }
    }, 800);
  };

  // Handles the logic for an incorrect answer.
  const handleIncorrectAnswer = () => {
    setIsWrong(true);
    setScore(prev => Math.max(0, prev - 3));
    // Hide any previous explanation when a new mistake is made
    setShowExplanation(false); 
  };
  
  // Handles the logic for showing a hint.
  const handleShowHint = () => {
      if (!showHint) {
          setScore(prev => Math.max(0, prev - 5));
          setShowHint(true);
      }
  };

  // Checks if the user's input matches the correct answer.
  const checkAnswer = useCallback(() => {
    if (!currentChallenge || isCorrect || isGameOver) return;

    if (userInput.trim().toLowerCase() === currentChallenge.answer.toLowerCase()) {
      handleCorrectAnswer();
    } else {
      handleIncorrectAnswer();
    }
  }, [userInput, currentChallenge, isCorrect, isGameOver, handleCorrectAnswer, handleIncorrectAnswer]);
  
  // --- Effects ---

  // The main game timer loop using requestAnimationFrame for smooth updates.
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
          setIsWrong(true); // Trigger feedback display
          setShowExplanation(true); // Automatically show explanation on timeout
          
          // Check and set new high score
          if (score > highScore) {
            setHighScore(score);
            try {
                localStorage.setItem('verbGameHighScore', score.toString());
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

  // Keyboard input handler for user input.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameActive || !currentChallenge || isCorrect || isGameOver) return;

      // Prevent default browser actions for letters and backspace if needed
      if (e.key.match(/^[a-zA-Z]$/) || e.key === 'Backspace') {
        e.preventDefault(); // This can sometimes interfere with input fields, use with caution.
      }
      
      if (e.key === 'Enter') {
        checkAnswer();
      } else if (e.key === 'Backspace') {
        setUserInput(prev => prev.slice(0, -1));
        setIsWrong(false); // Allow re-typing after a mistake
      } else if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
        setUserInput(prev => prev + e.key);
        setIsWrong(false); // Allow re-typing after a mistake
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameActive, checkAnswer, currentChallenge, isCorrect, isGameOver]);
  
  // --- Exported Values ---
  // Return all state and functions that the UI components will need to function.
  return {
    // State
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
    
    // Constants
    MAX_TIME,

    // Actions
    startGame,
    checkAnswer,
    handleShowHint,
    setGameActive, // To allow returning to the start screen
    setShowExplanation,
  };
};
