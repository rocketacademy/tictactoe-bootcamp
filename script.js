// Please implement exercise logic here
// keep data about the game in a 2-D array
/**
 * GLOBAL VARIABLES
 */
const board = [
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
let currentPlayer = 'X';

// game state canClick
let canClick = true;

/**
 * HELPER FUNCTIONS
 */
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

/**
 * GAME INITIALISATION LOGIC
 */
// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard(board);
};

/**
 * GAMEPLAY LOGIC
 */
// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

const squareClick = function (column, row) {
  console.log('coordinates', column, row);

  // see if the clicked square has been clicked on before
  if (board[column][row] === '' && canClick) {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);

    if (checkWin(board) === true) {
      // game over
      canClick = false;
      const winnerParagraph = document.createElement("p");
      winnerParagraph.classList.add("winnerParagraph");
      winnerParagraph.innerText = `${currentPlayer} is the winner!`;
      document.body.appendChild(winnerParagraph);
    } else {
      // change the player
      togglePlayer();
    }
  }
};

const checkLine = (item, index, line) => {
  return item === line[0];
}

const checkWin = (board) => {
  // check every position
  // there is a conditional for all 15 win conditions

  // check for horizontal and vertical matches
  for (let i = 0; i < board.length; i += 1) {
    // retrieve all values in a row
    const ROW = [];
    const COLUMN = [];
    for (let j = 0; j < board.length; j++) {
      ROW.push(board[i][j]);
      COLUMN.push(board[j][i])
    }

    // initialize boolean conditions,
    // disregard rows or columns with empty squares
    const ROW_MATCHED = (ROW[0] !== "" && ROW.every(checkLine));
    const COLUMN_MATCHED = (COLUMN[0] !== "" && COLUMN.every(checkLine))
    
    if (ROW_MATCHED || COLUMN_MATCHED) {
      return true;
    }
  }

  // bottom-left to top-right match
  const BOTTOM_LEFT_TO_TOP_RIGHT = [];
  // i refers to row, j refers to col
  for (let i = board.length - 1, j = 0; i >= 0; i -= 1, j += 1) {
    BOTTOM_LEFT_TO_TOP_RIGHT.push(board[i][j]);
  }

  const BOTTOM_LEFT_TO_TOP_RIGHT_MATCHED = (BOTTOM_LEFT_TO_TOP_RIGHT[0] !== "" && BOTTOM_LEFT_TO_TOP_RIGHT.every(checkLine));

  if (BOTTOM_LEFT_TO_TOP_RIGHT_MATCHED) {
    return true;
  }

  // top-left to bottom-right match
  const TOP_LEFT_TO_BOTTOM_RIGHT = [];
  // i refers to row, j refers to col
  for (let i = 0; i < board.length; i += 1) {
    TOP_LEFT_TO_BOTTOM_RIGHT.push(board[i][i]);
  }

  const TOP_LEFT_TO_BOTTOM_RIGHT_MATCHED = (TOP_LEFT_TO_BOTTOM_RIGHT[0] !== "" && TOP_LEFT_TO_BOTTOM_RIGHT.every(checkLine));
  if (TOP_LEFT_TO_BOTTOM_RIGHT_MATCHED) {
    return true;
  }

  return false;
};

initGame();