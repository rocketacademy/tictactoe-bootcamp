const boardSize = 3;

// keep data about the game in a 2-D array
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const gameInfo = document.createElement('div');
gameInfo.innerHTML = '<br>Welcome to Tic Tac Toe! <br>Try to get three of a kind in a row to win! ';

// the element that contains the rows and squares
let boardElement;
// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;
// current player global starts at X
let currentPlayer = 'X';

// let isDraw = false;
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
    boardContainer.appendChild(gameInfo);
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
const resetGame = () => {
  // Clear out all squares
  const clearSquares = document.querySelectorAll('.square');
  for (let k = 0; k < clearSquares.length; k += 1) {
    clearSquares[k].innerText = '';
  }
  // Clear out array
  board.length = 0;
  for (let p = 0; p < boardSize; p += 1) {
    board.push(['', '', '']);
  }
};
const checkForWinner = () => {
  if (
  // Row win
    (board[0][0] === board[0][1] && board[0][1] === board[0][2] && ((board[0][2] === ('X')) || (board[0][2] === ('O'))))
      || (board[1][0] === board[1][1] && board[1][1] === board[1][2] && ((board[1][2] === ('X')) || (board[1][2] === ('O'))))
      || (board[2][0] === board[2][1] && board[2][1] === ((board[2][2] === ('X')) || (board[2][2] === ('O'))))
      // Column win
      || (board[0][0] === board[1][0] && board[1][0] === board[2][0] && ((board[2][0] === ('X')) || (board[2][0] === ('O'))))
      || (board[0][1] === board[1][1] && board[1][1] === board[2][1] && ((board[2][1] === ('X')) || (board[2][1] === ('O'))))
      || (board[0][2] === board[1][2] && board[1][2] === board[2][2] && ((board[2][2] === ('X')) || (board[2][2] === ('O'))))
      // Diagonal win
      || (board[0][0] === board[1][1] && board[1][1] === board[2][2] && ((board[2][2] === ('X')) || (board[2][2] === ('O'))))
       || (board[0][2] === board[1][1] && board[1][1] === board[2][0] && ((board[2][0] === ('X')) || (board[2][0] === ('O')))))
  {
    // Declare winner
    gameInfo.innerHTML = `Winner! Player ${currentPlayer}`;
    resetGame();
  }
};

const checkForDraw = () => {
  const allSquares = document.querySelectorAll('.square');
  for (let k = 0; k < allSquares.length; k += 1) {
    if (allSquares[k].innerHTML === '') {
      break;
    } else if (k === allSquares.length - 1 && allSquares[allSquares - 1] !== '') {
      gameInfo.innerText = 'It\'s a draw!';
      resetGame();
    }
  }
};

const squareClick = (column, row) => {
  console.log('coordinates', column, row);
  gameInfo.innerHTML = '<br>Please select another square! <br> Aim for 3 in a row!';
  // If player clicks filled square, tell them to pick another square
  if ((board[column][row] !== '')) {
    gameInfo.innerHTML = 'You\'ve already selected that square!<br> Please select another square';
  }
  // see if the clicked square has been clicked on before
  if (board[column][row] === '') {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);

    // Check if player has won
    checkForWinner();
    // change the player
    togglePlayer();
    checkForDraw();
  }
};

// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard(board);
};

initGame();
