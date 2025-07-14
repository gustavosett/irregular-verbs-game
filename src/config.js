/**
 * src/config.js
 * * This file reads environment variables from the .env file for a Create React App project
 * and exports them as a configuration object for the rest of the app.
 * It provides sensible fallback values if the .env variables are not set.
 */

// Helper function to parse an integer from an environment variable.
const getInt = (key, fallback) => {
    const value = process.env[key];
    // Check if the value is defined and not an empty string before parsing
    return (value !== undefined && value !== '') ? parseInt(value, 10) : fallback;
};

// Helper function to get a string from an environment variable.
const getString = (key, fallback) => {
    const value = process.env[key];
    return (value !== undefined && value !== '') ? value : fallback;
};

// Export a single config object
export const config = {
    // Timer settings (in milliseconds)
    MAX_TIME: getInt('REACT_APP_MAX_TIME', 10000),
    TIME_GAIN_ON_CORRECT: getInt('REACT_APP_TIME_GAIN_ON_CORRECT', 10000),

    // Scoring
    SCORE_CORRECT: getInt('REACT_APP_SCORE_CORRECT', 5),
    SCORE_INCORRECT: getInt('REACT_APP_SCORE_INCORRECT', 3), // Note: This value is subtracted
    SCORE_HINT: getInt('REACT_APP_SCORE_HINT', 5),          // Note: This value is subtracted

    // LocalStorage Key
    HIGH_SCORE_KEY: getString('REACT_APP_HIGH_SCORE_KEY', 'verbGameHighScore'),

    // UI Delays (in milliseconds)
    SUCCESS_DELAY: getInt('REACT_APP_SUCCESS_DELAY', 100),
};
