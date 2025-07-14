import React from 'react';

const availableLanguages = {
  'pt-br': 'Português (Brasil)',
};

export default function LanguageSelector({ onSelectLanguage, selectedLanguage }) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4">
      {Object.entries(availableLanguages).map(([code, name]) => (
        <button
          key={code}
          onClick={() => onSelectLanguage(code)}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            selectedLanguage === code
              ? 'bg-indigo-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  );
}