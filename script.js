const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const restartBtn = document.querySelector('.restartBtn');

// Variables to track game state
let currentPlayer = 'x';
let nextPlayer = 'o';
let playerTurn = currentPlayer;
let isGameActive = true;

// Function to start the game
const startGame = () => {
    gameCells.forEach(cell => {
        cell.addEventListener('click', (e) => {
            if (e.target.textContent === '' && isGameActive) {
                e.target.textContent = playerTurn;
                if (checkWin()) {
                    console.log(`${playerTurn} is the Winner!`);
                    isGameActive = false; // Stop further moves
                } else if (isDraw()) {
                    console.log("It's a draw!");
                    isGameActive = false; // Stop further moves
                } else {
                    changePlayerTurn();
                }
            }
        });
    });
};

// Function to change the player's turn
const changePlayerTurn = () => {
    playerTurn = playerTurn === currentPlayer ? nextPlayer : currentPlayer;
    updatePlayerTurnDisplay();
};

// Function to update the display for the current player
const updatePlayerTurnDisplay = () => {
    if (playerTurn === 'x') {
        player1.classList.add('active');
        player2.classList.remove('active');
    } else {
        player2.classList.add('active');
        player1.classList.remove('active');
    }
};

// Function to check if there's a winner
const checkWin = () => {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < winningConditions.length; i++) {
        const [pos1, pos2, pos3] = winningConditions[i];
        if (
            gameCells[pos1].textContent !== '' &&
            gameCells[pos1].textContent === gameCells[pos2].textContent &&
            gameCells[pos2].textContent === gameCells[pos3].textContent
        ) {
            return true;
        }
    }
    return false;
};

// Function to check if the game is a draw
const isDraw = () => {
    return Array.from(gameCells).every(cell => cell.textContent !== '');
};

// Function to restart the game
const restartGame = () => {
    gameCells.forEach(cell => {
        cell.textContent = '';
    });
    isGameActive = true;
    playerTurn = currentPlayer;
    updatePlayerTurnDisplay();
};

// Add event listener to the restart button
restartBtn.addEventListener('click', restartGame);

// Start the game
startGame();
updatePlayerTurnDisplay();



