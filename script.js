// ========== GLOBAL VARIABLES ========== //
// keep data about the game in a 2-D array
let boardSize = 3;
let board = '';

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = 'X';

// ----- html elements ----- //
const outputBox = document.createElement('div');
outputBox.classList.add('output-box');
outputBox.setAttribute('id', 'output-box');
document.body.appendChild(outputBox);

// ========== HELPER FUNCTIONS ========== //
// ----- function to take in variable board size ----- //
const makeBoard = (boardSize) => {
  const board = [];
  for (let i = 0; i < boardSize; i += 1) {
    console.log('make board started');
    board.push([]);
    for (let j = 0; j < boardSize; j += 1) {
      board[i].push('');
    }
  }
  return board;
};

// ----- output messages ----- //
const output = (message) => {
  document.getElementById('output-box').innerText = message;
};

// ----- display win message ----- //
const displayWinMessage = (winningPlayer) => {
  const winText = document.createElement('div');
  winText.classList.add('winText');
  winText.innerText = `Great job player ${winningPlayer}, you won!`;
  document.body.appendChild(winText);
  setTimeout(() => {
    document.body.removeChild(winText);
    // reset the game
    document.body.innerHTML = '';
    initGame();
  }, 3000);
};

// ----- build the board ----- //
// Rebuild whole board with each click
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

// ----- check win conditions ----- //
const checkWinCon = (board) => {
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length - 2; j += 1) {
      if ((board[i][j] !== '') && board[i][j] === board[i][j + 1] && board[i][j + 1] === board[i][j + 2]) {
        return true;
      }
    }
  }
  for (let i = 0; i < board.length - 2; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      if ((board[i][j] !== '') && board[i][j] === board[i + 1][j] && board[i + 1][j] === board[i + 2][j]) {
        return true;
      }
    }
  }

  // check for diagonal left-to-right win
  for (let i = 0; i < board.length - 2; i += 1) {
    for (let j = 0; j < board[i].length - 2; j += 1) {
      if ((board[i][j] !== '') && board[i][j] === board[i + 1][j + 1] && board[i + 1][j + 1] === board[i + 2][j + 2]) {
        return true;
      }
    }
  }
  // check for diagonal right-to-left win
  for (let i = 0; i < board.length - 2; i += 1) {
    for (let j = 0; j < board[i].length - 2; j += 1) {
      if ((board[i][board[j].length - 1] !== '') && (board[i][board[j].length - 1] === board[i + 1][board[j].length - 2]) && (board[i + 1][board[j].length - 2] === board[i + 2][board[j].length - 3])) {
        return true;
      }
    }
  }

  return false;
};

// =========== GAMEPLAY LOGIC ========== //
// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
  output(`It's your turn now, player ${currentPlayer}.`);
};

// ----- SQUARE CLICK FUNCTION ----- //
const squareClick = (column, row) => {
  console.log('coordinates', column, row);

  // see if the clicked square has been clicked on before
  if (board[column][row] === '') {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;
    if (checkWinCon(board) === true) {
      console.log();
      // output(`Player ${currentPlayer} WINS!`);
      displayWinMessage(currentPlayer);
    } else {
      // change the player
      togglePlayer();
    }
    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);
  }
};

// ----- INPUT BOX FUNCTION ----- //
// const createInput = () => {};

// ----- Get user input ----- //
const getBoardSizeInput = () => {
  boardSize = document.getElementById('input-box').value;
  if (boardSize > 2) {
    document.body.removeChild(document.getElementById('inputContainer'));

    board = makeBoard(boardSize);

    boardContainer = document.createElement('div');
    boardContainer.innerHTML = '';
    buildBoard(board);
    document.body.appendChild(boardContainer);
  } if (boardSize !== '' && boardSize < 3) {
    document.getElementById('instructions').innerText = 'Please enter a valid number that is >= 3';
  }
};

// =========== GAME INITIALISATION =========== //
// create the board container element and put it on the screen
const initGame = () => {
  const inputContainer = document.createElement('div');
  inputContainer.setAttribute('id', 'inputContainer');

  const instructionsText = document.createElement('div');
  instructionsText.setAttribute('id', 'instructions');

  const inputBox = document.createElement('input');
  inputBox.setAttribute('id', 'input-box');

  const inputButton = document.createElement('button');
  inputButton.innerText = 'Submit';
  inputButton.setAttribute('id', 'input-button');
  inputButton.addEventListener('click', getBoardSizeInput);

  inputContainer.appendChild(instructionsText);
  inputContainer.appendChild(inputBox);
  inputContainer.appendChild(inputButton);
  document.body.appendChild(inputContainer);

  document.getElementById('instructions').innerText = 'Welcome!';

  setTimeout(() => {
    document.getElementById('instructions').innerText = 'Welcome to my tic-tac-toe game. To begin, enter a board size that is 3 or more.';
  }, 2000);
};

initGame();
