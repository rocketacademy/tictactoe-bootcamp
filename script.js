// keep data about the game in a 2-D array
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];
let winMsg;
let resetCounter = 0;
// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = 'X';

// completely rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  // start with an empty container
  winMsg.innerText = '';
  document.body.appendChild(winMsg);

  boardContainer.innerHTML = '';

  boardElement = document.createElement('div');

  boardElement.classList.add('board');
  boardElement.setAttribute('id', 'toBeRemove');

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
// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};
const checkWin = (board) => {
  // check every position
  // there is a conditional for all 15 win conditions
  console.log(board);
  for (let i = 0; i < 3; i += 1) {
    if ((board[i][0] !== '') && (board[i][0] === board[i][1] && board[i][1] === board[i][2])
    || (board[0][i] !== '') && (board[0][i] === board[1][i] && board[1][i] === board[2][i])
    || (board[0][0] !== '') && (board[0][0] === board[1][1] && board[1][1] === board[2][2])
    || (board[2][0] !== '') && (board[2][0] === board[1][1] && board[1][1] === board[0][2]))
    {
      return true;
    }
  }
};

const squareClick = (column, row) => {
  console.log('coordinates', column, row);

  // see if the clicked square has been clicked on before
  if (board[column][row] === '') {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;
    resetCounter += 1;
    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);

    // change the player
    if (checkWin(board) === true) {
      // game over
      winMsg.innerText = 'YOU WIN!!!!';
      document.body.appendChild(winMsg);
      resetCounter = 0;
      console.log(board);
      setTimeout(() => {
        board = [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];

        buildBoard(board);
      }, 2000);
    } else if (resetCounter === 9) {
      resetCounter = 0;
      winMsg.innerText = 'No One Win';
      document.body.appendChild(winMsg);
      console.log(board);
      setTimeout(() => {
        board = [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];

        buildBoard(board);
      }, 2000);
    }
    else {
      togglePlayer();
    }
  }
};
// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);
  winMsg = document.createElement('div');
  // build the board - right now it's empty
  buildBoard(board);
};
initGame();
