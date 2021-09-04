// =========================== GLOBAL VARIABLES ===========================
// keep data about the game in a 2-D array
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
// eslint-disable-next-line prefer-const
let currentPlayer = 'X';

// Div to display game info
const gameInfo = document.createElement('div');
gameInfo.innerText = `Player ${currentPlayer}, click to begin.`;
gameInfo.classList.add('gameinfo-display');

// Variable to help disable clicks when game ends
let canClick = true;

// =========================== HELPER FUNCTIONS ===========================
// completely rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  // start with an empty container
  boardContainer.innerHTML = '';
  boardElement = document.createElement('div');
  boardElement.classList.add('board');

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

      // set the click all over again
      // eslint-disable-next-line
      square.addEventListener('click', () => {
        squareClick(i, j);
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

const resetButton = document.createElement('button');
resetButton.innerText = 'Reset the Game.';
resetButton.addEventListener('click', () => {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  currentPlayer = 'X';
  message(`Player ${currentPlayer}, click to begin.`);
  canClick = true;
  buildBoard(board);
});
// =========================== GAMEPLAY LOGIC ===========================
// Fuction to change the text in the gameInfo div
const message = (inputMessage) => {
  gameInfo.innerText = inputMessage;
};

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
    message(`It's Player's ${currentPlayer} turn.`);
  } else {
    currentPlayer = 'X';
    message(`It's Player's ${currentPlayer} turn.`);
  }
};

const checkWin = (board) => {
  // check every position
  // there is a conditional for all 8 win conditions
  // First row
  if (board[0][0] !== '' && board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
    return true;
  }

  // Second row
  if (board[1][0] !== '' && board[1][0] === board[1][1] && board[1][1] === board[1][2]) {
    return true;
  }

  // Third row
  if (board[2][0] !== '' && board[2][0] === board[2][1] && board[2][1] === board[2][2]) {
    return true;
  }

  // First column
  if (board[0][0] !== '' && board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
    return true;
  }

  // Second column
  if (board[0][1] !== '' && board[0][1] === board[1][1] && board[1][1] === board[2][1]) {
    return true;
  }

  // Third column
  if (board[0][2] !== '' && board[0][2] === board[1][2] && board[1][2] === board[2][2]) {
    return true;
  }

  // Left to right diagonal
  if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return true;
  }

  // Right to left diagonal
  if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return true;
  }

  return false;
};

const squareClick = (column, row) => {
  if (board[column][row] === '' && canClick === true) {
    board[column][row] = currentPlayer;
    buildBoard(board);
    if (checkWin(board) === true) {
      // Disable further clicks
      canClick = false;
      // game over
      message(`Player ${currentPlayer} won!`);
    } else {
      togglePlayer();
    }
  }
};

// =========================== GAME INITIALISATION LOGIC ===========================
// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);
  document.body.appendChild(gameInfo);
  document.body.appendChild(resetButton);

  // build the board - right now it's empty
  buildBoard(board);
};

initGame();
