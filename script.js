// keep data about the game in a 2-D array
const board = [['', '', ''], ['', '', ''], ['', '', '']];

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

const buildBoard = () => {
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
        // eslint-disable-next-line no-use-before-define
        squareClick(i, j);
      });
    }
    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

const checkWin = (row, column) => {
  let columnWin = true;
  let rowWin = true;
  let diagonal1Win = true;
  let diagonal2Win = true;

  if (row !== column) diagonal1Win = false;
  if (row + column !== 2) diagonal2Win = false;

  for (let i = 0; i < 3; i += 1) {
    if (columnWin && board[i][column] !== currentPlayer) {
      columnWin = false;
    }
    if (rowWin && board[row][i] !== currentPlayer) {
      rowWin = false;
    }
    if (diagonal1Win && board[i][i] !== currentPlayer) {
      diagonal1Win = false;
    }
    if (diagonal2Win && board[2 - i][i] !== currentPlayer) {
      diagonal2Win = false;
    }
  }

  return columnWin || rowWin || diagonal1Win || diagonal2Win;
};

const squareClick = (row, column) => {
  // see if the clicked square has been clicked on before
  if (board[row][column] === '') {
    // alter the data array, set it to the current player
    board[row][column] = currentPlayer;

    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard();

    if (checkWin(row, column)) {
      console.log(`${currentPlayer} won`);
    } else {
    // change the player
      togglePlayer();
    }
  }
};

// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard();
};

initGame();
