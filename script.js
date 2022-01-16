// Please implement exercise logic here

// GLOBAL VARIABLES

// keep data about the game in a 2-D array
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

// check for win conditions
// if value of board elements in a row/column/diagonal are equal to each other, win.
// code for same row: board[i][j] == board[i][j+1] && board[i][j] == board[i][j+2], loop i < 3
// code for same column: board[j][i] == board[j+1][i] board[j][i] == board[j+2][i]
// code for diagonal win: board[0][0] == board[1][1] && board [0][0] == board[2][2]
const winConditions = () => {
  // 3 in a row.
  for (let i = 0; i < 3; i += 1) {
    if (board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] !== '') {
      return true;
    }
  }
  // 3 in a column
  for (let i = 0; i < 3; i += 1) {
    if (board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] !== '') {
      return true;
    }
  }
  // 3 in a diagonal
  if (board[1][1] === board[0][0] && board[1][1] === board[2][2] && board[1][1] !== '') {
    return true;
  }
  if (board[1][1] === board[0][2] && board[1][1] === board[2][0] && board[1][1] !== '') {
    return true;
  }
  return false;
};

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = 'X';

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

// HELPERS

const squareClick = (column, row) => {
  console.log('coordinates', column, row);

  // see if the clicked square has been clicked on before
  if (board[column][row] === '') {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);

    console.log(`win:${winConditions()}`);

    // change the player
    togglePlayer();
  }
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
      if (square.innerText === 'X') {
        square.setAttribute('class', 'x-cell');
      }
      else if (square.innerText === 'O') {
        square.setAttribute('class', 'o-cell');
      }

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

// INITIALISE GAME

// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard(board);
};

initGame();
