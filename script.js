// Please implement exercise logic here
// Please implement exercise logic here

// #### GLOBAL VARIABLES #####//
// keep data about the game in a 2-D array
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
// create message board
const messageDiv = document.createElement('div');
let canClick = true;
let win = false;
let empty = true;

// #### DOM ELEMENTS #####//
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

// #### TICTACTOE LOGIC #####//

// Checks for empty box
const checkEmpty = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === '') {
        empty = true;
        return;
      }
      empty = false;
    }
  }
};

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

// Helper function to check for 3 in a row
const sameElements = (array) => {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === currentPlayer) {
      count += 1;
      if (count === 3) {
        return true;
      }
    }
  }
};

// Check rows for winning condition
const checkWin = () => {
  let win = false;
  // Check all rows
  board.forEach((row, index) => {
    const rowWin = sameElements(row);
    if (rowWin) {
      console.log('row win');
      win = true;
    }
  });

  // Check columns for winning condition
  board.forEach((row, i) => {
    const columnElements = [];
    row.forEach((elements, j) => {
      columnElements.push(board[j][i]);
    });
    const columnWin = sameElements(columnElements);
    if (columnWin) {
      console.log('columnWin');
      win = true;
    }
  });

  // Check both diagonals for winning condition
  const diagonalOne = [];
  const diagonalTwo = [];
  board.forEach((row, i) => {
    const tempRow = [...row];
    diagonalOne.push(row[i]);
    diagonalTwo.push(tempRow.reverse()[i]);
  });

  const diagonalWin1 = sameElements(diagonalOne);
  const diagonalWin2 = sameElements(diagonalTwo);

  if (diagonalWin1 || diagonalWin2) {
    win = true;
    console.log('diagonal win');
  }

  return win;
};

// Function to run when squares are clicked
const squareClick = (column, row) => {
  console.log('coordinates', column, row);
  if (canClick === false) {
    return;
  }

  // see if the clicked square has been clicked on before
  if (board[column][row] === '') {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    if (canClick === true) {
    // refresh the screen with a new board
    // according to the array that was just changed
      buildBoard(board);
      win = checkWin();
      checkEmpty(board);
      // If there is a winner, output winner message
      if (win) {
        messageDiv.innerHTML = `${currentPlayer} is the winner!`;
        canClick = false;
      }
      // If there are no winners, output nothing
      else if (!win && empty != false) {
        togglePlayer();
      }
      else if (!win && empty === false) {
        console.log('empty');
        messageDiv.innerHTML = 'It\'s a tie, game over!';
      }
    }
  }
};

// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard(board);
  document.body.appendChild(messageDiv);
  messageDiv.innerText = 'Click on a square to start game!';
};

initGame();
