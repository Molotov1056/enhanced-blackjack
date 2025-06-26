# 🃏 Enhanced BlackJack - Ultimate Casino Experience

A modern, feature-rich BlackJack game built with vanilla JavaScript, featuring immersive graphics, sound effects, achievements, and a comprehensive statistics system.

## 🎯 Features

### Core Game Features
- **Object-Oriented Design**: Built with proper classes (Card, Deck, Hand, Player, Dealer, Game)
- **Standard BlackJack Rules**: Hit, Stand, Double Down, Dealer AI
- **Smart Dealer AI**: Follows casino rules (hits on 16, stands on 17)
- **Betting System**: Chip-based betting with multiple denominations

### Enhanced Features
- **🎨 Immersive GUI**: Modern, responsive interface with card animations
- **💰 Advanced Betting**: Starting chips, different bet amounts, visual chip system
- **✨ Smooth Animations**: Card dealing, flipping, chip movements
- **🏆 Achievement System**: 8+ unlockable achievements with progress tracking
- **📊 Statistics Tracking**: Win/loss ratios, streaks, earnings, blackjacks
- **🎵 Audio Effects**: Card sounds, chip sounds, win/loss feedback
- **💾 Persistent Storage**: Saves progress, stats, and achievements
- **📱 Responsive Design**: Works on desktop and mobile devices

## 🎮 How to Play

1. **Place Your Bet**: Click chip buttons to place bets ($5, $25, $50, $100)
2. **Deal Cards**: Click "Deal Cards" to start the round
3. **Make Decisions**: Hit, Stand, or Double Down based on your hand
4. **Win Conditions**: Get closer to 21 than dealer without going over
5. **Collect Winnings**: Earn chips and unlock achievements

## 🏆 Achievements

- **🎉 First Victory**: Win your first hand
- **🃏 Blackjack Master**: Get 5 blackjacks
- **🔥 Hot Streak**: Win 5 games in a row
- **⚡ Lightning Strike**: Win 10 games in a row
- **💰 Big Winner**: Win $2000 or more in total
- **🎰 High Roller**: Accumulate 5000 chips
- **🎯 Experienced Player**: Play 100 games
- **👑 Comeback King**: Come back from having less than $100

## 🛠 Technical Implementation

### Architecture
- **Frontend**: HTML5, CSS3 with animations, Vanilla JavaScript
- **Storage**: LocalStorage for persistent data
- **Audio**: HTML5 Audio with fallback handling
- **Responsive**: CSS Grid and Flexbox for mobile compatibility

### Key Classes
- `Card`: Individual playing card with suit, rank, and value
- `Deck`: 52-card deck with shuffle and deal methods
- `Hand`: Player/dealer hands with scoring logic
- `Player`: Human player with betting, chips, and statistics
- `Dealer`: AI dealer with BlackJack rules
- `EnhancedBlackjackGame`: Main game controller
- `AchievementSystem`: Achievement tracking and unlocking

### Game States
- `betting`: Player placing bets
- `dealing`: Cards being dealt with animations
- `playing`: Player making decisions
- `dealer_turn`: Dealer playing according to rules
- `game_over`: Round complete, showing results

## 🎨 Visual Features

- **Casino-style Green Felt Table**: Authentic casino appearance
- **Animated Card Dealing**: Smooth card animations with sound
- **Glowing UI Elements**: Modern hover effects and visual feedback
- **Chip System**: Realistic casino chips with click animations
- **Achievement Notifications**: Pop-up notifications for unlocks
- **Responsive Stats Panel**: Live updating statistics

## 🎵 Audio System

- **Card Sounds**: Audio feedback for card dealing
- **Chip Sounds**: Audio for betting actions
- **Win/Loss Sounds**: Celebration and feedback sounds
- **Auto-play Policy Handling**: Graceful fallback for browser restrictions

## 📱 Responsive Design

- **Desktop**: Full-featured layout with sidebar achievements
- **Tablet**: Reorganized layout with collapsible achievements
- **Mobile**: Optimized for touch with larger buttons and cards

## 🔧 Debug Features

Open browser console and use:
- `resetGame()`: Reset all progress and statistics
- `addChips(amount)`: Add chips for testing
- `toggleSound()`: Enable/disable sound effects

## 🚀 Getting Started

1. Clone this repository
2. Open `index.html` in a web browser
3. No additional setup required - pure vanilla JavaScript!

## 📊 Statistics Tracked

- Games played, won, lost, tied
- Current win/loss streak
- Longest win/loss streaks
- Total winnings/losses
- Number of blackjacks
- Number of busts
- Win percentage

## 🎯 Future Enhancements

- Multiplayer mode
- Tournament system
- Custom card designs
- Sound theme options
- Advanced statistics graphs
- Social features and leaderboards

## 🧑‍💻 Developer Notes

This project demonstrates:
- Object-oriented JavaScript design
- Modern CSS animations and layouts
- Local storage data persistence
- Responsive web design principles
- Game state management
- Audio handling in web browsers
- Achievement system implementation

Built with zero external dependencies - pure vanilla web technologies!

---

**Enjoy the game and try to unlock all achievements! 🎰**