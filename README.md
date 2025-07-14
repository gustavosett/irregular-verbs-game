# Irregular Verbs Game 🎮

An interactive web-based game designed to help users learn English irregular verbs through engaging gameplay. Challenge yourself with timed exercises and track your progress!

## 🌟 Features

- **Interactive Gameplay**: Fill in the blanks with correct irregular verb forms
- **Timed Challenges**: Race against the clock with a dynamic timer
- **Progressive Difficulty**: Randomized verb challenges that adapt to your progress
- **Scoring System**: Earn points for correct answers, lose points for mistakes
- **Hint System**: Get help when you're stuck (with point deduction)
- **High Score Tracking**: Local storage saves your best performance
- **Multilingual Support**: Currently supports Portuguese (Brazil) with expandable language system
- **Mobile Responsive**: Optimized for both desktop and mobile devices
- **Educational Explanations**: Learn why each answer is correct

## 🎯 How to Play

1. **Start the Game**: Click "Start Game" on the welcome screen
2. **Read the Challenge**: You'll see an English irregular verb and its translation
3. **Complete the Sentence**: Type the correct form (simple past or past participle) in the blank
4. **Time Pressure**: You have limited time - correct answers give you bonus time!
5. **Use Hints**: Click for hints if you're stuck (costs points)
6. **Track Progress**: Monitor your score and try to beat your high score

### Scoring System
- ✅ **Correct Answer**: +5 points + bonus time
- ❌ **Wrong Answer**: -3 points
- 💡 **Using Hint**: -5 points
- ⏰ **Time Bonus**: Extra time added for correct answers

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/gustavosett/irregular-verbs-game.git
   cd irregular-verbs-game
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## 🛠️ Technology Stack

- **Frontend**: React 19.1.0
- **Styling**: Tailwind CSS with custom Duolingo-inspired colors
- **Build Tool**: Create React App
- **Fonts**: Nunito (Google Fonts)
- **Icons**: Custom SVG assets

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.js       # Styled button component
│   ├── ChallengeCard.js # Main game challenge display
│   ├── Feedback.js     # Success/error feedback
│   ├── Hint.js         # Hint system component
│   ├── LanguageSelector.js # Language switching
│   ├── ScoreBoard.js   # Score and high score display
│   ├── SentenceInput.js # Interactive input field
│   └── TimeBar.js      # Progress timer bar
├── screens/            # Main screen components
│   ├── GameScreen.js   # Active game interface
│   └── StartScreen.js  # Welcome/menu screen
├── hooks/              # Custom React hooks
│   └── useGameLogic.js # Main game state management
├── assets/             # Images and SVG files
├── styles/             # Global CSS styles
├── config.js           # Game configuration
└── App.js              # Main application component
```

## ⚙️ Configuration

The game behavior can be customized through environment variables:

```bash
# .env file
REACT_APP_MAX_TIME=40000              # Maximum time per game (ms)
REACT_APP_TIME_GAIN_ON_CORRECT=8000   # Bonus time for correct answers (ms)
REACT_APP_SCORE_CORRECT=5             # Points for correct answers
REACT_APP_SCORE_INCORRECT=3           # Points deducted for wrong answers
REACT_APP_SCORE_HINT=5                # Points deducted for using hints
REACT_APP_SUCCESS_DELAY=800           # Delay before next challenge (ms)
```

## 🌍 Adding New Languages

To add support for a new language:

1. **Create a language file** in `public/languages/` (e.g., `es.json`)
2. **Follow the existing structure**:
   ```json
   {
     "name": "Español",
     "verbs": [
       {
         "verb": "SPEAK",
         "translation": "HABLAR",
         "sentences": [
           {
             "type": "simple_past",
             "sentence": "Yesterday, she __ to her friend.",
             "answer": "spoke",
             "explanation": "Explanation in target language"
           }
         ]
       }
     ]
   }
   ```
3. **Update LanguageSelector.js** to include the new language option

## 🎮 Game Mechanics

### Challenge Types
- **Simple Past**: Fill in the past tense form
- **Past Participle**: Complete present perfect constructions

### Verb Coverage
The game includes common irregular verbs such as:
- speak/spoke/spoken
- go/went/gone
- be/was/been
- give/gave/given
- And many more...

### Difficulty Progression
- Challenges are randomly selected from available verbs
- No verb is repeated until all have been used
- Timer creates natural difficulty progression

## 🎨 Design System

The game uses a Duolingo-inspired design with:
- **Colors**: Green for success, red for errors, blue for interactive elements
- **Typography**: Nunito font for friendly, readable text
- **Layout**: Mobile-first responsive design
- **Animations**: Smooth transitions and feedback animations

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📱 Mobile Support

The game is fully optimized for mobile devices with:
- Touch-friendly interfaces
- Responsive typography and spacing
- Mobile keyboard optimization
- Viewport-aware layouts

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices
- Use Tailwind CSS for styling
- Ensure mobile responsiveness
- Add proper error handling
- Include educational explanations for new verbs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Duolingo's educational approach
- Verb data compiled from various English learning resources
- Icons and graphics created for educational purposes

## 🐛 Known Issues

- Currently only supports Portuguese translations
- Limited to keyboard input (no speech recognition)
- Requires internet connection for initial load

## 🔮 Future Enhancements

- [ ] Add more languages (Spanish, French, German)
- [ ] Implement difficulty levels
- [ ] Add sound effects and audio pronunciation
- [ ] Create user accounts and progress tracking
- [ ] Add multiplayer competition mode
- [ ] Include regular verb practice mode
- [ ] Implement spaced repetition algorithm

---

Made with ❤️ for English language learners everywhere!
