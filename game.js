// Enhanced BlackJack Game - Ultimate Casino Experience
// Complete object-oriented implementation with immersive features

// Card Class - Represents individual playing cards
class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.value = this.calculateValue();
        this.isAce = rank === 'A';
    }

    calculateValue() {
        if (this.rank === 'A') return 11;
        if (['J', 'Q', 'K'].includes(this.rank)) return 10;
        return parseInt(this.rank);
    }

    getSuitSymbol() {
        const suits = {
            'hearts': '♥',
            'diamonds': '♦',
            'clubs': '♣',
            'spades': '♠'
        };
        return suits[this.suit];
    }

    getColor() {
        return ['hearts', 'diamonds'].includes(this.suit) ? 'red' : 'black';
    }

    toString() {
        return `${this.rank}${this.getSuitSymbol()}`;
    }
}

// Deck Class - Manages the 52-card deck
class Deck {
    constructor() {
        this.cards = [];
        this.initializeDeck();
        this.shuffleDeck();
    }

    initializeDeck() {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        
        for (let suit of suits) {
            for (let rank of ranks) {
                this.cards.push(new Card(suit, rank));
            }
        }
    }

    shuffleDeck() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    dealCard() {
        if (this.cards.length === 0) {
            this.initializeDeck();
            this.shuffleDeck();
        }
        return this.cards.pop();
    }

    getCardsRemaining() {
        return this.cards.length;
    }
}

// Hand Class - Manages player and dealer hands
class Hand {
    constructor() {
        this.cards = [];
        this.score = 0;
        this.aces = 0;
    }

    addCard(card) {
        this.cards.push(card);
        this.calculateScore();
    }

    calculateScore() {
        this.score = 0;
        this.aces = 0;

        // Calculate base score and count aces
        for (let card of this.cards) {
            if (card.isAce) {
                this.aces++;
                this.score += 11;
            } else {
                this.score += card.value;
            }
        }

        // Adjust for aces if over 21
        while (this.score > 21 && this.aces > 0) {
            this.score -= 10;
            this.aces--;
        }
    }

    isBust() {
        return this.score > 21;
    }

    isBlackjack() {
        return this.cards.length === 2 && this.score === 21;
    }

    canSplit() {
        return this.cards.length === 2 && this.cards[0].rank === this.cards[1].rank;
    }

    clear() {
        this.cards = [];
        this.score = 0;
        this.aces = 0;
    }

    getCards() {
        return this.cards;
    }

    getScore() {
        return this.score;
    }
}

// Player Class - Manages player state and actions
class Player {
    constructor(name = 'Player', initialChips = 1000) {
        this.name = name;
        this.chips = initialChips;
        this.hand = new Hand();
        this.bet = 0;
        this.stats = {
            gamesPlayed: 0,
            gamesWon: 0,
            gamesLost: 0,
            gamesTied: 0,
            totalWinnings: 0,
            currentStreak: 0,
            longestWinStreak: 0,
            longestLoseStreak: 0,
            blackjacks: 0,
            busts: 0
        };
        this.loadStats();
    }

    placeBet(amount) {
        if (amount <= this.chips && amount > 0) {
            this.bet = amount;
            return true;
        }
        return false;
    }

    addChips(amount) {
        this.chips += amount;
    }

    removeChips(amount) {
        this.chips = Math.max(0, this.chips - amount);
    }

    canDoubleDown() {
        return this.chips >= this.bet && this.hand.cards.length === 2;
    }

    doubleDown() {
        if (this.canDoubleDown()) {
            this.chips -= this.bet;
            this.bet *= 2;
            return true;
        }
        return false;
    }

    updateStats(result, winAmount = 0) {
        this.stats.gamesPlayed++;
        
        if (result === 'win') {
            this.stats.gamesWon++;
            this.stats.totalWinnings += winAmount;
            this.stats.currentStreak = Math.max(0, this.stats.currentStreak) + 1;
            this.stats.longestWinStreak = Math.max(this.stats.longestWinStreak, this.stats.currentStreak);
        } else if (result === 'lose') {
            this.stats.gamesLost++;
            this.stats.totalWinnings -= this.bet;
            this.stats.currentStreak = Math.min(0, this.stats.currentStreak) - 1;
            this.stats.longestLoseStreak = Math.max(this.stats.longestLoseStreak, Math.abs(this.stats.currentStreak));
        } else {
            this.stats.gamesTied++;
            this.stats.currentStreak = 0;
        }

        if (this.hand.isBlackjack()) {
            this.stats.blackjacks++;
        }
        if (this.hand.isBust()) {
            this.stats.busts++;
        }

        this.saveStats();
    }

    saveStats() {
        localStorage.setItem('blackjack_player_stats', JSON.stringify(this.stats));
        localStorage.setItem('blackjack_player_chips', this.chips.toString());
    }

    loadStats() {
        const savedStats = localStorage.getItem('blackjack_player_stats');
        const savedChips = localStorage.getItem('blackjack_player_chips');
        
        if (savedStats) {
            this.stats = { ...this.stats, ...JSON.parse(savedStats) };
        }
        
        if (savedChips) {
            this.chips = parseInt(savedChips);
        }
    }

    getWinRate() {
        const totalGames = this.stats.gamesWon + this.stats.gamesLost;
        return totalGames > 0 ? (this.stats.gamesWon / totalGames * 100).toFixed(1) : 0;
    }

    resetStats() {
        this.stats = {
            gamesPlayed: 0,
            gamesWon: 0,
            gamesLost: 0,
            gamesTied: 0,
            totalWinnings: 0,
            currentStreak: 0,
            longestWinStreak: 0,
            longestLoseStreak: 0,
            blackjacks: 0,
            busts: 0
        };
        this.chips = 1000;
        this.saveStats();
    }
}

// Dealer Class - AI dealer with blackjack rules
class Dealer {
    constructor() {
        this.hand = new Hand();
        this.hiddenCard = null;
        this.showingCard = null;
    }

    shouldHit() {
        // Dealer hits on 16 or less, stands on 17 or more
        return this.hand.getScore() < 17;
    }

    peekForBlackjack() {
        return this.hand.isBlackjack();
    }

    revealHiddenCard() {
        // This is for visual purposes - the logic already accounts for both cards
        return this.hiddenCard;
    }

    clear() {
        this.hand.clear();
        this.hiddenCard = null;
        this.showingCard = null;
    }

    getUpCard() {
        return this.hand.cards.length > 0 ? this.hand.cards[0] : null;
    }

    getScore() {
        return this.hand.getScore();
    }

    getHand() {
        return this.hand;
    }
}
// Achievement System
class AchievementSystem {
    constructor() {
        this.achievements = [
            {
                id: 'first_win',
                title: '🎉 First Victory',
                description: 'Win your first hand',
                condition: (stats) => stats.gamesWon >= 1,
                unlocked: false
            },
            {
                id: 'blackjack_master',
                title: '🃏 Blackjack Master',
                description: 'Get 5 blackjacks',
                condition: (stats) => stats.blackjacks >= 5,
                unlocked: false
            },
            {
                id: 'win_streak_5',
                title: '🔥 Hot Streak',
                description: 'Win 5 games in a row',
                condition: (stats) => stats.longestWinStreak >= 5,
                unlocked: false
            },
            {
                id: 'win_streak_10',
                title: '⚡ Lightning Strike',
                description: 'Win 10 games in a row',
                condition: (stats) => stats.longestWinStreak >= 10,
                unlocked: false
            },
            {
                id: 'big_winner',
                title: '💰 Big Winner',
                description: 'Win $2000 or more in total',
                condition: (stats) => stats.totalWinnings >= 2000,
                unlocked: false
            },
            {
                id: 'high_roller',
                title: '🎰 High Roller',
                description: 'Accumulate 5000 chips',
                condition: (stats, chips) => chips >= 5000,
                unlocked: false
            },
            {
                id: 'experienced',
                title: '🎯 Experienced Player',
                description: 'Play 100 games',
                condition: (stats) => stats.gamesPlayed >= 100,
                unlocked: false
            },
            {
                id: 'comeback_king',
                title: '👑 Comeback King',
                description: 'Come back from having less than $100',
                condition: (stats, chips) => chips >= 1000 && this.hasHadLowChips,
                unlocked: false
            }
        ];
        this.hasHadLowChips = false;
        this.loadAchievements();
    }

    checkAchievements(stats, chips) {
        if (chips < 100) {
            this.hasHadLowChips = true;
        }

        const newUnlocks = [];
        for (let achievement of this.achievements) {
            if (!achievement.unlocked && achievement.condition(stats, chips)) {
                achievement.unlocked = true;
                newUnlocks.push(achievement);
            }
        }
        
        if (newUnlocks.length > 0) {
            this.saveAchievements();
            return newUnlocks;
        }
        return [];
    }

    saveAchievements() {
        const achievementData = {
            achievements: this.achievements.map(a => ({ id: a.id, unlocked: a.unlocked })),
            hasHadLowChips: this.hasHadLowChips
        };
        localStorage.setItem('blackjack_achievements', JSON.stringify(achievementData));
    }

    loadAchievements() {
        const saved = localStorage.getItem('blackjack_achievements');
        if (saved) {
            const data = JSON.parse(saved);
            this.hasHadLowChips = data.hasHadLowChips || false;
            
            for (let savedAch of data.achievements) {
                const achievement = this.achievements.find(a => a.id === savedAch.id);
                if (achievement) {
                    achievement.unlocked = savedAch.unlocked;
                }
            }
        }
    }

    getAchievements() {
        return this.achievements;
    }

    resetAchievements() {
        this.achievements.forEach(a => a.unlocked = false);
        this.hasHadLowChips = false;
        this.saveAchievements();
    }
}

// Enhanced BlackJack Game - Main Game Controller
class EnhancedBlackjackGame {
    constructor() {
        this.deck = new Deck();
        this.player = new Player();
        this.dealer = new Dealer();
        this.achievements = new AchievementSystem();
        this.gameState = 'betting'; // betting, dealing, playing, dealer_turn, game_over
        this.dealerHidden = true;
        this.soundEnabled = true;
        
        this.initializeUI();
        this.bindEvents();
        this.updateDisplay();
        this.renderAchievements();
    }

    initializeUI() {
        // Get DOM elements
        this.elements = {
            chipsDisplay: document.getElementById('chips-display'),
            winsDisplay: document.getElementById('wins-display'),
            streakDisplay: document.getElementById('streak-display'),
            dealerScore: document.getElementById('dealer-score'),
            playerScore: document.getElementById('player-score'),
            dealerCards: document.getElementById('dealer-cards'),
            playerCards: document.getElementById('player-cards'),
            gameMessage: document.getElementById('game-message'),
            roundResult: document.getElementById('round-result'),
            currentBet: document.getElementById('current-bet'),
            dealBtn: document.getElementById('deal-btn'),
            hitBtn: document.getElementById('hit-btn'),
            standBtn: document.getElementById('stand-btn'),
            doubleBtn: document.getElementById('double-btn'),
            newGameBtn: document.getElementById('new-game-btn'),
            achievementsList: document.getElementById('achievements-list'),
            cardSound: document.getElementById('card-sound'),
            chipSound: document.getElementById('chip-sound'),
            winSound: document.getElementById('win-sound')
        };
    }

    bindEvents() {
        // Chip betting buttons
        document.querySelectorAll('.chip-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const value = parseInt(e.target.dataset.value);
                this.addToBet(value);
                this.animateChipClick(e.target);
            });
        });

        // Clear bet button
        document.querySelector('.clear-bet-btn').addEventListener('click', () => {
            this.clearBet();
        });

        // Game action buttons
        this.elements.dealBtn.addEventListener('click', () => this.dealCards());
        this.elements.hitBtn.addEventListener('click', () => this.playerHit());
        this.elements.standBtn.addEventListener('click', () => this.playerStand());
        this.elements.doubleBtn.addEventListener('click', () => this.playerDoubleDown());
        this.elements.newGameBtn.addEventListener('click', () => this.newRound());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (this.gameState === 'playing') {
                switch(e.key.toLowerCase()) {
                    case 'h': this.playerHit(); break;
                    case 's': this.playerStand(); break;
                    case 'd': this.playerDoubleDown(); break;
                }
            }
        });
    }

    // Betting Methods
    addToBet(amount) {
        if (this.gameState !== 'betting') return;
        
        const newBet = this.player.bet + amount;
        if (newBet <= this.player.chips) {
            this.player.bet = newBet;
            this.updateDisplay();
            this.playSound('chip');
        }
    }

    clearBet() {
        if (this.gameState !== 'betting') return;
        this.player.bet = 0;
        this.updateDisplay();
    }

    // Game Flow Methods
    dealCards() {
        if (this.player.bet === 0) {
            this.showMessage('Please place a bet first!');
            return;
        }

        if (this.player.bet > this.player.chips) {
            this.showMessage('Insufficient chips!');
            return;
        }

        this.gameState = 'dealing';
        this.player.removeChips(this.player.bet);
        this.clearHands();
        this.showMessage('Dealing cards...');

        // Deal initial cards with animation
        setTimeout(() => {
            this.dealInitialCards();
        }, 500);
    }

    dealInitialCards() {
        // Deal two cards to player
        this.player.hand.addCard(this.deck.dealCard());
        this.renderPlayerCards();
        this.playSound('card');

        setTimeout(() => {
            // Deal first card to dealer (face up)
            this.dealer.hand.addCard(this.deck.dealCard());
            this.renderDealerCards();
            this.playSound('card');

            setTimeout(() => {
                // Deal second card to player
                this.player.hand.addCard(this.deck.dealCard());
                this.renderPlayerCards();
                this.playSound('card');

                setTimeout(() => {
                    // Deal second card to dealer (face down)
                    this.dealer.hand.addCard(this.deck.dealCard());
                    this.renderDealerCards();
                    this.playSound('card');

                    setTimeout(() => {
                        this.checkInitialConditions();
                    }, 500);
                }, 600);
            }, 600);
        }, 600);
    }

    checkInitialConditions() {
        this.updateDisplay();

        // Check for blackjacks
        const playerBlackjack = this.player.hand.isBlackjack();
        const dealerBlackjack = this.dealer.hand.isBlackjack();

        if (playerBlackjack || dealerBlackjack) {
            this.dealerHidden = false;
            this.renderDealerCards();
            
            if (playerBlackjack && dealerBlackjack) {
                this.endRound('tie', 'Both have Blackjack - Push!');
            } else if (playerBlackjack) {
                this.endRound('win', 'Blackjack! You win!', this.player.bet * 2.5);
            } else {
                this.endRound('lose', 'Dealer has Blackjack!');
            }
        } else {
            this.gameState = 'playing';
            this.showMessage('Your turn - Hit or Stand?');
            this.showPlayerActions();
        }
    }

    playerHit() {
        if (this.gameState !== 'playing') return;

        this.player.hand.addCard(this.deck.dealCard());
        this.renderPlayerCards();
        this.playSound('card');
        this.updateDisplay();

        if (this.player.hand.isBust()) {
            this.endRound('lose', 'Bust! You went over 21!');
        } else if (this.player.hand.getScore() === 21) {
            this.playerStand();
        } else {
            // Update available actions
            this.showPlayerActions();
        }
    }

    playerStand() {
        if (this.gameState !== 'playing') return;

        this.gameState = 'dealer_turn';
        this.dealerHidden = false;
        this.hidePlayerActions();
        this.showMessage('Dealer\'s turn...');
        
        setTimeout(() => {
            this.dealerPlay();
        }, 1000);
    }

    playerDoubleDown() {
        if (this.gameState !== 'playing') return;
        if (!this.player.canDoubleDown()) return;

        this.player.doubleDown();
        this.updateDisplay();
        this.showMessage('Doubled down!');

        // Hit once then stand
        setTimeout(() => {
            this.player.hand.addCard(this.deck.dealCard());
            this.renderPlayerCards();
            this.playSound('card');
            this.updateDisplay();

            if (this.player.hand.isBust()) {
                this.endRound('lose', 'Bust after double down!');
            } else {
                setTimeout(() => {
                    this.playerStand();
                }, 1000);
            }
        }, 1000);
    }
    dealerPlay() {
        this.renderDealerCards();
        this.updateDisplay();

        const dealerTurn = () => {
            if (this.dealer.shouldHit()) {
                setTimeout(() => {
                    this.dealer.hand.addCard(this.deck.dealCard());
                    this.renderDealerCards();
                    this.playSound('card');
                    this.updateDisplay();
                    dealerTurn(); // Recursive call for next card
                }, 800);
            } else {
                // Dealer stands, determine winner
                setTimeout(() => {
                    this.determineWinner();
                }, 1000);
            }
        };

        dealerTurn();
    }

    determineWinner() {
        const playerScore = this.player.hand.getScore();
        const dealerScore = this.dealer.hand.getScore();
        const dealerBust = this.dealer.hand.isBust();

        if (dealerBust) {
            this.endRound('win', 'Dealer busts! You win!', this.player.bet * 2);
        } else if (playerScore > dealerScore) {
            this.endRound('win', 'You win with a higher score!', this.player.bet * 2);
        } else if (dealerScore > playerScore) {
            this.endRound('lose', 'Dealer wins with a higher score!');
        } else {
            this.endRound('tie', 'Push! Same score.');
        }
    }

    endRound(result, message, winAmount = 0) {
        this.gameState = 'game_over';
        
        if (result === 'win') {
            this.player.addChips(winAmount);
            this.playSound('win');
        } else if (result === 'tie') {
            this.player.addChips(this.player.bet); // Return bet
        }

        // Update player stats
        this.player.updateStats(result, winAmount);
        
        // Check for achievements
        const newAchievements = this.achievements.checkAchievements(this.player.stats, this.player.chips);
        
        this.showResult(result, message);
        this.updateDisplay();
        this.renderAchievements();
        
        // Show new achievements
        if (newAchievements.length > 0) {
            setTimeout(() => {
                this.showNewAchievements(newAchievements);
            }, 2000);
        }

        // Show new game button
        setTimeout(() => {
            this.elements.newGameBtn.classList.remove('hidden');
        }, 1500);
    }

    newRound() {
        if (this.player.chips <= 0) {
            this.showMessage('You\'re out of chips! Game over.');
            // Could add option to reset here
            return;
        }

        this.gameState = 'betting';
        this.dealerHidden = true;
        this.player.bet = 0;
        this.clearHands();
        this.hideResult();
        this.hidePlayerActions();
        this.elements.newGameBtn.classList.add('hidden');
        this.showMessage('Place your bet to start!');
        this.updateDisplay();
    }

    // UI Rendering Methods
    renderPlayerCards() {
        this.renderCards(this.player.hand.getCards(), this.elements.playerCards, false);
    }

    renderDealerCards() {
        const cards = this.dealer.hand.getCards();
        this.renderCards(cards, this.elements.dealerCards, this.dealerHidden);
    }

    renderCards(cards, container, hideFirstCard = false) {
        container.innerHTML = '';
        
        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = `card ${card.getColor()} dealing`;
            
            if (hideFirstCard && index === 1) {
                cardElement.classList.add('face-down');
                cardElement.innerHTML = '';
            } else {
                cardElement.innerHTML = `
                    <div class="card-top">
                        <span class="rank">${card.rank}</span>
                        <span class="suit">${card.getSuitSymbol()}</span>
                    </div>
                    <div class="card-center">
                        <span class="suit">${card.getSuitSymbol()}</span>
                    </div>
                    <div class="card-bottom">
                        <span class="rank">${card.rank}</span>
                        <span class="suit">${card.getSuitSymbol()}</span>
                    </div>
                `;
            }
            
            container.appendChild(cardElement);
            
            // Remove animation class after animation completes
            setTimeout(() => {
                cardElement.classList.remove('dealing');
            }, 600);
        });
    }

    renderAchievements() {
        const achievements = this.achievements.getAchievements();
        this.elements.achievementsList.innerHTML = '';
        
        achievements.forEach(achievement => {
            const achievementElement = document.createElement('div');
            achievementElement.className = `achievement ${achievement.unlocked ? 'unlocked' : 'locked'}`;
            
            achievementElement.innerHTML = `
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-desc">${achievement.description}</div>
            `;
            
            this.elements.achievementsList.appendChild(achievementElement);
        });
    }

    // UI Update Methods
    updateDisplay() {
        // Update chips and stats
        this.elements.chipsDisplay.textContent = `$${this.player.chips}`;
        this.elements.winsDisplay.textContent = this.player.stats.gamesWon;
        this.elements.streakDisplay.textContent = this.player.stats.currentStreak;
        this.elements.currentBet.textContent = this.player.bet;

        // Update scores
        if (this.player.hand.cards.length > 0) {
            const playerScore = this.player.hand.getScore();
            this.elements.playerScore.textContent = `Score: ${playerScore}`;
            
            // Add visual feedback for special scores
            this.elements.playerScore.className = 'score';
            if (this.player.hand.isBlackjack()) {
                this.elements.playerScore.classList.add('blackjack');
            } else if (this.player.hand.isBust()) {
                this.elements.playerScore.classList.add('bust');
            }
        } else {
            this.elements.playerScore.textContent = 'Score: --';
        }

        if (this.dealer.hand.cards.length > 0) {
            if (this.dealerHidden) {
                // Show only the value of the showing card
                const showingCard = this.dealer.hand.cards[0];
                this.elements.dealerScore.textContent = `Score: ${showingCard.value}+`;
            } else {
                const dealerScore = this.dealer.hand.getScore();
                this.elements.dealerScore.textContent = `Score: ${dealerScore}`;
                
                // Add visual feedback for special scores
                this.elements.dealerScore.className = 'score';
                if (this.dealer.hand.isBlackjack()) {
                    this.elements.dealerScore.classList.add('blackjack');
                } else if (this.dealer.hand.isBust()) {
                    this.elements.dealerScore.classList.add('bust');
                }
            }
        } else {
            this.elements.dealerScore.textContent = 'Score: --';
        }
    }

    showPlayerActions() {
        this.elements.hitBtn.classList.remove('hidden');
        this.elements.standBtn.classList.remove('hidden');
        
        // Show double down if available
        if (this.player.canDoubleDown()) {
            this.elements.doubleBtn.classList.remove('hidden');
        } else {
            this.elements.doubleBtn.classList.add('hidden');
        }
        
        this.elements.dealBtn.classList.add('hidden');
    }

    hidePlayerActions() {
        this.elements.hitBtn.classList.add('hidden');
        this.elements.standBtn.classList.add('hidden');
        this.elements.doubleBtn.classList.add('hidden');
        this.elements.dealBtn.classList.remove('hidden');
    }

    showMessage(message) {
        this.elements.gameMessage.textContent = message;
    }

    showResult(result, message) {
        this.elements.roundResult.textContent = message;
        this.elements.roundResult.className = `result ${result}`;
        this.elements.roundResult.classList.remove('hidden');
    }

    hideResult() {
        this.elements.roundResult.classList.add('hidden');
    }

    showNewAchievements(achievements) {
        achievements.forEach((achievement, index) => {
            setTimeout(() => {
                alert(`🏆 Achievement Unlocked!\n\n${achievement.title}\n${achievement.description}`);
            }, index * 1000);
        });
    }

    // Animation Methods
    animateChipClick(chipElement) {
        chipElement.classList.add('clicked');
        setTimeout(() => {
            chipElement.classList.remove('clicked');
        }, 600);
    }

    // Audio Methods
    playSound(type) {
        if (!this.soundEnabled) return;
        
        const audio = this.elements[`${type}Sound`];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => {
                // Silently handle audio play failures (autoplay policy)
                console.log('Audio play failed:', e);
            });
        }
    }

    // Utility Methods
    clearHands() {
        this.player.hand.clear();
        this.dealer.clear();
        this.elements.playerCards.innerHTML = '';
        this.elements.dealerCards.innerHTML = '';
    }

    // Admin Methods (for testing/debugging)
    resetGame() {
        this.player.resetStats();
        this.achievements.resetAchievements();
        this.player.chips = 1000;
        this.newRound();
        this.updateDisplay();
        this.renderAchievements();
    }

    addChips(amount) {
        this.player.addChips(amount);
        this.updateDisplay();
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        return this.soundEnabled;
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.blackjackGame = new EnhancedBlackjackGame();
    
    // Add debug functions to window for testing
    window.resetGame = () => window.blackjackGame.resetGame();
    window.addChips = (amount) => window.blackjackGame.addChips(amount);
    window.toggleSound = () => window.blackjackGame.toggleSound();
    
    console.log('🃏 Enhanced BlackJack Game Loaded!');
    console.log('Debug commands available: resetGame(), addChips(amount), toggleSound()');
});

// Service Worker Registration (for offline play)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}