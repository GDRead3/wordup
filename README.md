# Wordup - Mobile Game App

A React Native mobile game application focused on vocabulary enhancement through various word games. Currently featuring Hangman with multiple game modes, addtional games modes will be added in time. 

# Motivation
I want to make a simple but addictive game that inspires curiousity while also offering value to the players. Learning while having fun is the best way to learn!

## Features

### Hangman Game
- Multiple Game Modes:
  - Quick Mode: 10 rounds with 6 lives
  - Marathon Mode: Unlimited rounds with 6 lives
  - Casual Mode: Unlimited rounds with unlimited lives
- Score tracking system
- Visual feedback for correct/incorrect guesses
- On-screen keyboard with guessed letters tracking

## Technologies Used

- React Native with Expo
- TypeScript
- React Native Paper for UI components
- Expo Router for navigation


## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd vocabulary-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

## Running the App

To run the app on your device:
1. Install the Expo Go app from the App Store (iOS) or Play Store (Android)
2. Scan the QR code shown in the terminal after running `npx expo start`

For development using emulators:
- iOS: Press 'i' in the terminal after starting the development server
- Android: Press 'a' in the terminal after starting the development server

## Game Modes

### Quick Mode
- Perfect for short gameplay sessions
- Limited to 10 rounds
- 6 lives per game
- Score tracking enabled

### Marathon Mode
- Extended gameplay experience
- Unlimited rounds
- 6 lives per game
- Score tracking enabled
- Game ends when all lives are lost

### Casual Mode
- Relaxed gameplay experience
- Unlimited rounds
- Unlimited lives
- No score tracking
- Can be ended at any time using the "End Game" button

## Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio & Android SDK (for Android development)

### Available Scripts

- `npx expo start` - Starts the development server
- `npm run ios` - Runs the app in iOS simulator
- `npm run android` - Runs the app in Android emulator
- `npm run web` - Runs the app in web browser

## Future Enhancements

- Additional vocabulary games
- Word categories and difficulty levels
- Multiplayer support
- High score leaderboard
- Sound effects and animations
- User profiles and progress tracking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.