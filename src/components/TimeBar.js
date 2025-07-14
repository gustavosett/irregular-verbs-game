// src/components/TimeBar.js
import React from 'react';

export default function TimeBar({ timeRemaining, maxTime }) {
  const percentage = (timeRemaining / maxTime) * 100;

  return (
    <div className="fixed top-0 left-0 w-full h-4 bg-duo-gray-medium rounded-full z-50">
      <div 
        className="h-full bg-duo-green rounded-full transition-all duration-200 ease-linear" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}