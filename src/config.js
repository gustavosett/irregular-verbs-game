const getInt = (key, fallback) => {
    const value = process.env[key];
    return (value !== undefined && value !== '') ? parseInt(value, 10) : fallback;
};

const getString = (key, fallback) => {
    const value = process.env[key];
    return (value !== undefined && value !== '') ? value : fallback;
};

export const config = {
    MAX_TIME: getInt('REACT_APP_MAX_TIME', 100000),
    TIME_GAIN_ON_CORRECT: getInt('REACT_APP_TIME_GAIN_ON_CORRECT', 10000),
    SCORE_CORRECT: getInt('REACT_APP_SCORE_CORRECT', 5),
    SCORE_INCORRECT: getInt('REACT_APP_SCORE_INCORRECT', 3),
    SCORE_HINT: getInt('REACT_APP_SCORE_HINT', 5),
    HIGH_SCORE_KEY: getString('REACT_APP_HIGH_SCORE_KEY', 'verbGameHighScore'),
    SUCCESS_DELAY: getInt('REACT_APP_SUCCESS_DELAY', 800),
};
