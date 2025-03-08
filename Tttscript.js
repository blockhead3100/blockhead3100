let currentPlayer = 'X';
let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let playerXScore = 0;
let playerYScore = 0;
let gameIsOver = false;

const messageElement = document.getElementById('message');

function handleCellClick(row, col) {
    if (gameBoard[row][col] === '' && !gameIsOver) {
        gameBoard[row][col] = currentPlayer;
        updateBoard(); // Update the HTML table

        const winner = checkForWin();

        if (winner) {
            if (winner === 'X') {
                playerXScore++;
                messageElement.textContent = "Player X wins!";
            } else {
                playerYScore++;
                messageElement.textContent = "Player O wins!";
            }
            gameIsOver = true;
            updateScore();
        } else {
            // Check for a tie
            let isBoardFull = true;
            for (let row of gameBoard) {
                for (let cell of row) {
                    if (cell === '') {
                        isBoardFull = false;
                        break;
                    }
                }
                if (!isBoardFull) {
                    break;
                }
            }

            if (isBoardFull) {
                messageElement.textContent = "It's a tie!";
                gameIsOver = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                messageElement.textContent = `${currentPlayer}'s turn`;
            }
        }
    }
}

function checkForWin() {
    // Check rows
    for (let row of gameBoard) {
        if (row[0] === row[1] && row[1] === row[2] && row[0] !== '') {
            return row[0]; // Return the winning player ('X' or 'O')
        }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
        if (gameBoard[0][col] === gameBoard[1][col] && gameBoard[1][col] === gameBoard[2][col] && gameBoard[0][col] !== '') {
            return gameBoard[0][col];
        }
    }

    // Check diagonals
    if ((gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] && gameBoard[0][0] !== '') ||
        (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0] && gameBoard[0][2] !== '')) {
        return gameBoard[1][1];
    }

    return null; // No winner yet
}

function updateBoard() {
    const cells = document.querySelectorAll('td');
    let cellIndex = 0;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = cells[cellIndex];
            cell.textContent = gameBoard[row][col];
            //add classes to the cells.
            if (gameBoard[row][col] === 'X') {
                cell.classList.add('x-cell');
                cell.classList.remove('o-cell');
            } else if (gameBoard[row][col] === 'O') {
                cell.classList.add('o-cell');
                cell.classList.remove('x-cell');
            } else {
                cell.classList.remove('x-cell');
                cell.classList.remove('o-cell');
            }
            cellIndex++;
        }
    }
}

function newGame() {
    currentPlayer = 'X';
    gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    gameIsOver = false;
    messageElement.textContent = `${currentPlayer}'s turn`;
    updateBoard();
}

// Add event listeners to table cells
const cells = document.querySelectorAll('td');
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        handleCellClick(row, col);
    });
});

function updateScore(){
    document.getElementById('playerXScore').textContent = playerXScore;
    document.getElementById('playerYScore').textContent = playerYScore;
}

//create score elements.
const scoreDiv = document.createElement('div');
scoreDiv.innerHTML = `<p>Player X Score: <span id="playerXScore">${playerXScore}</span></p><p>Player O Score: <span id="playerYScore">${playerYScore}</span></p>`;
document.body.appendChild(scoreDiv);

//start the game.
newGame();
