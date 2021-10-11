// Global variables
let board = [];
let boardSize = 0;
let gameInProgress = false;
let round = 0;
let currentPlayer = 'X';

// Initialise UI, DOM elements
const boardSizeInput = document.createElement('input');
const startButton = document.createElement('button');
startButton.innerText = 'Start Game';

boardSizeInput.type = 'number';
boardSizeInput.min = '3';
boardSizeInput.max = '5';
boardSizeInput.value = '3';
boardSizeInput.addEventListener('input', () => {
  if (boardSizeInput.value >= 3 && boardSizeInput.value <= 5) startButton.disabled = false;
  else startButton.disabled = true;
});
document.body.appendChild(boardSizeInput);
document.body.appendChild(startButton);

const boardContainer = document.createElement('div');
document.body.appendChild(boardContainer);

const output = document.createElement('p');
output.innerText = 'Please input the board size.';
document.body.appendChild(output);

// Reset globals and UI
const resetGame = () => {
  board = [];
  gameInProgress = false;
  boardSize = 0;
  currentPlayer = 'X';
  round = 0;
  boardSizeInput.disabled = false;
  startButton.disabled = false;
};

// Switch from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

// Create row and square elements in the board container
const buildBoard = () => {
  // start with an empty container
  boardContainer.innerHTML = '';

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < board.length; i += 1) {
    // separate var for one row / row element
    const row = board[i];
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    // set each square
    // j is the column number
    for (let j = 0; j < row.length; j += 1) {
      // one square element
      const square = document.createElement('div');
      square.classList.add('square');

      // set the text of the square according to the array
      square.innerText = board[i][j];

      rowElement.appendChild(square);

      square.addEventListener('click', () => {
        // eslint-disable-next-line no-use-before-define
        squareClick(i, j);
      });
    }
    boardContainer.appendChild(rowElement);
  }
};

// Check for win conditions given the row and column last filled in
const checkWin = (row, column, tempBoard, player) => {
  // Assume its a win first
  let columnWin = true;
  let rowWin = true;
  let diagonal1Win = true; // diagonal 1 is from top left to bottom right
  let diagonal2Win = true; // diagonal 2 is from bottom left to top right

  if (row !== column) diagonal1Win = false;
  if (row + column !== boardSize - 1) diagonal2Win = false;

  for (let i = 0; i < boardSize; i += 1) {
    if (columnWin && tempBoard[i][column] !== player) {
      columnWin = false;
    }
    if (rowWin && tempBoard[row][i] !== player) {
      rowWin = false;
    }
    if (diagonal1Win && tempBoard[i][i] !== player) {
      diagonal1Win = false;
    }
    if (diagonal2Win && tempBoard[boardSize - 1 - i][i] !== player) {
      diagonal2Win = false;
    }
  }

  // special return values used in minimax function
  if (columnWin || rowWin || diagonal1Win || diagonal2Win) {
    if (player === 'X') return 10;
    return -10;
  }
  return 0;
};

/* **************************************************************
minimax and findBestMove functions adapted from:
https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/
 **************************************************************** */

// Considers all possibilities in the game tree given a board and a move
const minimax = (tempBoard, row, col, player, roundNum, depth, isMax) => {
  const score = checkWin(row, col, tempBoard, player);

  // Computer is minimiser, player is maximiser
  if (score === 10) return score - depth; // player won
  if (score === -10) return score + depth; // computer won
  if (roundNum === boardSize * boardSize) return 0; // tie

  let best;

  if (isMax) {
    // Maximiser's turn i.e. player
    best = -1000;
    for (let i = 0; i < boardSize; i += 1) {
      for (let j = 0; j < boardSize; j += 1) {
        if (tempBoard[i][j] === '') {
          tempBoard[i][j] = 'X';
          best = Math.max(best, minimax(tempBoard, i, j, 'X', roundNum + 1, depth + 1, !isMax));
          tempBoard[i][j] = '';
        }
      }
    }
  } else {
    // Minimiser's turn i.e. computer
    best = 1000;
    for (let i = 0; i < boardSize; i += 1) {
      for (let j = 0; j < boardSize; j += 1) {
        if (tempBoard[i][j] === '') {
          tempBoard[i][j] = 'O';
          best = Math.min(best, minimax(tempBoard, i, j, 'O', roundNum + 1, depth + 1, !isMax));
          tempBoard[i][j] = '';
        }
      }
    }
  }
  return best;
};

// Considers all empty squares left on the board and calls the minimax function
// to calculate a score for the move
const findBestMove = () => {
  let bestVal = 1000;
  let bestMove = [-1, -1];

  for (let i = 0; i < boardSize; i += 1) {
    for (let j = 0; j < boardSize; j += 1) {
      if (board[i][j] === '') {
        board[i][j] = currentPlayer;
        const moveVal = minimax(board, i, j, currentPlayer, round + 1, 0, true);
        board[i][j] = '';
        if (moveVal < bestVal) {
          bestMove = [i, j];
          bestVal = moveVal;
        }
      }
    }
  }
  return bestMove;
};

// Computer to auto decide move
const computerMove = () => {
  const [row, column] = findBestMove();
  round += 1;
  board[row][column] = currentPlayer;

  buildBoard();

  if (checkWin(row, column, board, currentPlayer) === -10) {
    output.innerText = 'Computer won! Input board size to play again.';
    resetGame();
  } else if (round === boardSize * boardSize) {
    output.innerText = "It's a tie! Input board size to play again.";
    resetGame();
  } else {
    togglePlayer();
  }
};

// Called on a square click
const squareClick = (row, column) => {
  // see if the clicked square has been clicked on before
  if (gameInProgress && board[row][column] === '') {
    round += 1;
    board[row][column] = currentPlayer;

    buildBoard();

    const score = checkWin(row, column, board, currentPlayer);
    if (score === 10 || score === -10) {
      output.innerText = `${currentPlayer} won! Input board size to play again.`;
      resetGame();
    } else if (round === boardSize * boardSize) {
      output.innerText = "It's a tie! Input board size to play again.";
      resetGame();
    } else {
      togglePlayer();
      if (boardSize === 3) {
        // only do computer move for board size of 3, algorithm is too slow otherwise
        computerMove();
      } else {
        output.innerText = `Player ${currentPlayer}'s turn`;
      }
    }
  }
};

// create the board container element and put it on the screen
const initGame = () => {
  boardSize = Number(boardSizeInput.value);
  gameInProgress = true;

  for (let i = 0; i < boardSize; i += 1) {
    board.push([]);
    for (let j = 0; j < boardSize; j += 1) {
      board[i].push('');
    }
  }
  // build the board - right now it's empty
  buildBoard();

  boardSizeInput.disabled = true;
  startButton.disabled = true;
  if (boardSize === 3) output.innerText = '';
  else output.innerText = `Player ${currentPlayer}'s turn`;
};

startButton.addEventListener('click', initGame);
