// Please implement exercise logic here
// keep data about the game in a 2-D array
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

// the element that contains the rows and squares
let boardElement;

let messageContainer;
// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = 'X';

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

// create the board container element and put it on the screen
const initGame = () => {
  messageContainer = document.createElement('div');
  messageContainer.classList.add('message');
  document.body.appendChild(messageContainer);
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard(board);
};

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

const squareClick = (column, row) => {
  console.log('coordinates', column, row);

  // see if the clicked square has been clicked on before
  if (board[column][row] === '') {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);
    console.log(checkWin2(board));
    if (checkWin(board) === true) {
      messageContainer.innerText = `${currentPlayer} wins!`;
      setTimeout(() => {
        board = [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];
        buildBoard(board);
        messageContainer.innerText = 'click on a square to start';
      }, 3000);
    } else {
      togglePlayer();
    }

    // change the player
  }
};

const checkWin = (board) => {
  if ((board[0][0] !== '') && (board[0][0] === board[0][1] && board[0][1] === board[0][2])) {
    return true;
  }
  if ((board[1][0] !== '') && (board[1][0] === board[1][1] && board[1][1] === board[1][2])) {
    return true;
  }
  if ((board[2][0] !== '') && (board[2][0] === board[2][1] && board[2][1] === board[2][2])) {
    return true;
  }
  if ((board[0][0] !== '') && (board[0][0] === board[1][0] && board[1][0] === board[2][0])) {
    return true;
  }
  if ((board[0][1] !== '') && (board[0][1] === board[1][1] && board[1][1] === board[2][1])) {
    return true;
  }
  if ((board[0][2] !== '') && (board[0][2] === board[1][2] && board[1][2] === board[2][2])) {
    return true;
  }
  if ((board[0][0] !== '') && (board[0][0] === board[1][1] && board[1][1] === board[2][2])) {
    return true;
  }
  if ((board[2][0] !== '') && (board[2][0] === board[1][1] && board[1][1] === board[0][2])) {
    return true;
  }
  return false;
};

const winConditions = [];
const checkWin2 = (board) => {
  let count = 0;
  // rpw check
  for (let i = 0; i < board.length; i++) {
    count = 0;
    for (let j = 0; j < board[i].length; j++) {
      // check row index
      count += (board[i][j] === 'X') ? 1 : (board[i][j] === 'O') ? -1 : 0;
    }
    if (count === 3 || count === -3)
    {
      return true;
      // return count / Math.abs(count); // Return either 1 or -1
    }
  }
  // col check
  for (let i = 0; i < board.length; i++) { // each row
    count = 0;
    for (let j = 0; j < board[i].length; j++) { // check col
      count += (board[j][i] === 'X') ? 1 : (board[j][i] === 'O') ? -1 : 0;
    }
    if (count === 3 || count === -3)
    {
      return true;
    }
  }

  // left right down diagonal check
  count = 0;
  for (let i = 0; i < board.length; i++) {
    count += (board[i][i] === 'X') ? 1 : (board[i][i] === 'O') ? -1 : 0;
  }
  if (count === 3 || count === -3)
  {
    return true;
  }
  // Check Left-to-Right upward Diagonal
  count = 0;
  for (let i = 0; i < board.length; i++) {
    count += (board[i][2 - i] === 'X') ? 1 : (board[i][2 - i] === 'O') ? -1 : 0;
  }
  if (count === 3 || count === -3)
  {
    return true;
  }
};

initGame();
