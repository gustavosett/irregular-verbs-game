const getInt = (key, fallback) => {
    const value = process.env[key];
    return (value !== undefined && value !== '') ? parseInt(value, 10) : fallback;
};

const getString = (key, fallback) => {
    const value = process.env[key];
    return (value !== undefined && value !== '') ? value : fallback;
};

export const config = {
    MAX_TIME: getInt('REACT_APP_MAX_TIME', 40000),
    TIME_GAIN_ON_CORRECT: getInt('REACT_APP_TIME_GAIN_ON_CORRECT', 15000),
    SCORE_CORRECT: getInt('REACT_APP_SCORE_CORRECT', 5),
    SCORE_INCORRECT: getInt('REACT_APP_SCORE_INCORRECT', 3),
    SCORE_HINT: getInt('REACT_APP_SCORE_HINT', 5),
    HIGH_SCORE_KEY: getString('REACT_APP_HIGH_SCORE_KEY', 'verbGameHighScore'),
    SUCCESS_DELAY: getInt('REACT_APP_SUCCESS_DELAY', 800),
    INITIAL_TIMER_INTERVAL: getInt('REACT_APP_INITIAL_TIMER_INTERVAL', 50),
    SPEED_INCREASE_PER_CORRECT_ANSWER: getInt('REACT_APP_SPEED_INCREASE_PER_CORRECT_ANSWER', 5),
    MIN_TIMER_INTERVAL: getInt('REACT_APP_MIN_TIMER_INTERVAL', 10),
};
