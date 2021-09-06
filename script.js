/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
// =========================== GLOBAL VARIABLES ===========================
// Variable to determine game type: 2 player or 1 player vs computer
let numPlayer = 1;

// Variable to determine board size
let boardSize = 0;

// keep data about the game in a 2-D array
const board = [[]];
const buildInitialBoard = () => {
  for (let i = 0; i < boardSize; i += 1) {
    board.push([]);
    for (let j = 0; j < boardSize; j += 1) {
      board[i][j] = '';
    }
  }
};

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

// Number of match to win the game
let numMatchRequired = 0;

// =========================== HELPER FUNCTIONS ===========================
// Get user input for board size and choice win.
const getParameters = () => {
  // DOM user input element for board size
  const initialParameterInput = document.createElement('div');
  initialParameterInput.setAttribute('id', 'initial-input');

  const boardSizeInput = document.createElement('input');
  boardSizeInput.setAttribute('placeholder', 'Input Board Size');
  boardSizeInput.classList.add('input-field');

  const choiceWinInput = document.createElement('input');
  choiceWinInput.setAttribute('placeholder', 'Consecutive Placements Required?');
  choiceWinInput.classList.add('input-field');

  const playerNumberInput = document.createElement('input');
  playerNumberInput.setAttribute('placeholder', 'How many players? 1 or 2 only.');
  playerNumberInput.classList.add('input-field');

  const submitButton = document.createElement('button');
  submitButton.innerText = 'Submit';
  submitButton.addEventListener('click', () => {
    boardSize = boardSizeInput.value;
    numMatchRequired = choiceWinInput.value;
    numPlayer = playerNumberInput.value;
    buildInitialBoard();
    initialParameterInput.remove();
    initGame();
  });
  initialParameterInput.appendChild(boardSizeInput);
  initialParameterInput.appendChild(choiceWinInput);
  initialParameterInput.appendChild(playerNumberInput);
  initialParameterInput.appendChild(submitButton);

  document.body.appendChild(initialParameterInput);
};

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
        if (numPlayer === 1) {
          squareClick(i, j);
        } else {
          computerSquareClick(i, j);
        }
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

const resetButton = document.createElement('button');
resetButton.innerText = 'Reset the Game.';
resetButton.addEventListener('click', () => {
  buildInitialBoard();
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

const checkWin = (board, row, column) => {
  let numMatch = 0;
  // Check all horizontal combinations
  // Check if left and right 2 index in board array are the same icon
  for (let j = 1; j < numMatchRequired; j += 1) {
    if (board[row][column - j] === currentPlayer) {
      numMatch += 1;
      if (numMatch === numMatchRequired - 1) {
        return true;
      }
    }

    if (board[row][column + j] === currentPlayer) {
      numMatch += 1;
      if (numMatch === numMatchRequired - 1) {
        return true;
      }
    }
  }
  numMatch = 0;

  // Check all vertical combinations
  // j represents row here
  // Check if top and bottom 2 index in board array are the same icon
  for (let j = 1; j < numMatchRequired; j += 1) {
    if ((row - j) >= 0 && board[row - j][column] === currentPlayer) {
      numMatch += 1;
      if (numMatch === numMatchRequired - 1) {
        return true;
      }
    }

    if ((row + j) <= (boardSize - 1) && board[row + j][column] === currentPlayer) {
      numMatch += 1;
      if (numMatch === numMatchRequired - 1) {
        return true;
      }
    }
  }
  numMatch = 0;

  // Check left to right diagonal combination
  for (let j = 1; j < numMatchRequired; j += 1) {
    if ((row - j) >= 0 && (column - j) >= 0 && board[row - j][column - j] === currentPlayer) {
      numMatch += 1;
      if (numMatch === numMatchRequired - 1) {
        return true;
      }
    }

    // eslint-disable-next-line max-len
    if ((row + j) <= (boardSize - 1) && (column + j) <= (boardSize - 1) && board[row + j][column + j] === currentPlayer) {
      numMatch += 1;
      if (numMatch === numMatchRequired - 1) {
        return true;
      }
    }
  }
  numMatch = 0;

  // Check right to left diagonal combination
  for (let j = 1; j < numMatchRequired; j += 1) {
    // eslint-disable-next-line max-len
    if ((row - j) >= 0 && (column + j) <= (boardSize - 1) && board[row - j][column + j] === currentPlayer) {
      numMatch += 1;
      if (numMatch === numMatchRequired - 1) {
        return true;
      }
    }

    // eslint-disable-next-line max-len
    if ((row + j) <= (boardSize - 1) && (column - j) >= 0 && board[row + j][column - j] === currentPlayer) {
      numMatch += 1;
      if (numMatch === numMatchRequired - 1) {
        return true;
      }
    }
  }
  numMatch = 0;
  return false;
};

const squareClick = (row, column) => {
  if (board[row][column] === '' && canClick === true) {
    board[row][column] = currentPlayer;
    buildBoard(board);
    if (checkWin(board, row, column) === true) {
      // Disable further clicks
      canClick = false;
      // game over
      message(`Player ${currentPlayer} won!`);
    } else {
      togglePlayer();
    }
  }
};

const computerSelect = () => {
  // eslint-disable-next-line prefer-const
  let randomRow = Math.floor(Math.random() * boardSize);
  // eslint-disable-next-line prefer-const
  let randomColumn = Math.floor(Math.random() * boardSize);

  while (board[randomRow][randomColumn] !== '') {
    randomRow = Math.floor(Math.random() * boardSize);
    randomColumn = Math.floor(Math.random() * boardSize);
  }

  if (board[randomRow][randomColumn] === '') {
    board[randomRow][randomColumn] = currentPlayer;
    buildBoard(board);
    if (checkWin(board, randomRow, randomColumn) === true) {
      // Disable further clicks
      canClick = false;
      // game over
      message(`Player ${currentPlayer} won!`);
    } else {
      togglePlayer();
    }
  } };

const computerSquareClick = (row, column) => {
  if (board[row][column] === '' && canClick === true) {
    board[row][column] = currentPlayer;
    buildBoard(board);
    if (checkWin(board, row, column) === true) {
      // Disable further clicks
      canClick = false;
      // game over
      message(`Player ${currentPlayer} won!`);
    } else {
      togglePlayer();
      // Computer random select
      computerSelect();
    }
  }
};

// =========================== GAME INITIALISATION LOGIC ===========================
// create the board container element and put it on the screen
const initGame = () => {
  if (boardSize === 0) {
    getParameters();
  }
  else {
    boardContainer = document.createElement('div');
    document.body.appendChild(boardContainer);
    document.body.appendChild(gameInfo);
    document.body.appendChild(resetButton);

    // build the board - right now it's empty
    buildBoard(board);
  }
};

initGame();
