import React, { useEffect, useRef } from 'react';

export default function SentenceInput({ sentence, userInput, answer, isWrong, isCorrect, onInputChange, onBackspace, onEnter }) {
  const inputRef = useRef(null);
  const parts = sentence.split('__');
  let borderColor = 'border-duo-gray-dark';
  if (isWrong) borderColor = 'border-duo-red';
  if (isCorrect) borderColor = 'border-duo-green';

  const inputStyle = {
    minWidth: `${Math.max(answer.length, userInput.length) + 2}ch`,
  };

  useEffect(() => {
    if (inputRef.current && !isCorrect) {
      inputRef.current.focus();
    }
  }, [sentence, isCorrect]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onEnter();
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      onBackspace();
    } else if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
      e.preventDefault();
      onInputChange(userInput + e.key);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    const filteredValue = newValue.replace(/[^a-zA-Z]/g, '');
    if (filteredValue !== userInput) {
      onInputChange(filteredValue);
    }
  };

  return (
    <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl ${isWrong ? 'animate-shake' : ''}`}>
      {parts[0]}
      <span className="relative inline-block">
        <span
          style={inputStyle}
          className={`inline-block text-center mx-1 sm:mx-2 pb-1 !text-gray-700 bg-duo-gray-light rounded-md border-b-4 outline-none transition-all duration-300 ${borderColor}`}
        >
          {userInput || ''}
          {!userInput && !isCorrect && <span className="animate-pulse !text-gray-700">|</span>}
        </span>
        {/* Input for mobile keyboard trigger */}
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-default"
          style={{ fontSize: '16px' }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </span>
      {parts[1]}
    </h2>
  );
}