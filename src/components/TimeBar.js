import React from 'react';

const TimeBar = React.memo(({ timeRemaining, maxTime }) => {
  const percentage = Math.max(0, Math.min(100, (timeRemaining / maxTime) * 100));

  return (
    <div className="fixed top-0 left-0 w-full h-4 bg-duo-gray-medium rounded-full z-50">
      <div 
        className="h-full bg-duo-green rounded-full transition-all duration-100 ease-linear" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
});

TimeBar.displayName = 'TimeBar';

export default TimeBar;