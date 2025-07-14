// src/components/Button.js
import React from 'react';

export default function Button({ onClick, children, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`w-full max-w-sm rounded-2xl border-b-4 border-duo-green-dark bg-duo-green p-3 text-xl font-bold uppercase text-white shadow-duo-button transition-all duration-200 hover:brightness-105 active:translate-y-0.5 active:border-b-2 active:shadow-none ${className}`}
    >
      {children}
    </button>
  );
}