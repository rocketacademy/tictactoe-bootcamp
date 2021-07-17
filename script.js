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
let currentPlayer = 'X';

// create reset button
const resetButton = document.createElement('button');
resetButton.innerText = 'Reset';
resetButton.classList.add('button', 'reset');
document.body.appendChild(resetButton);

// create game info board
const gameInfo = document.createElement('div');
gameInfo.innerText = `Player ${currentPlayer} pls check a box`;
gameInfo.className = 'gameInfo';
document.body.appendChild(gameInfo);

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

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
    gameInfo.innerText = 'Player O\'s turn';
  } else {
    currentPlayer = 'X';
    gameInfo.innerText = 'Player X\'s turn';
  }
};

const checkWin = () => {
  // check every position
  // there is a conditional for all 8 win conditions
  if ((board[0][0] === board[0][1] && board[0][1] === board[0][2] && !(board[0][0] === ''))) {
    return true;
  }
  if (board[1][0] === board[1][1] && board[1][1] === board[1][2] && !(board[1][0] === '')) {
    return true;
  }
  if (board[2][0] === board[2][1] && board[2][1] === board[2][2] && !(board[2][0] === '')) {
    return true;
  }
  if (board[0][0] === board[1][0] && board[1][0] === board[2][0] && !(board[0][0] === '')) {
    return true;
  }
  if (board[0][1] === board[1][1] && board[1][1] === board[2][1] && !(board[0][1] === '')) {
    return true;
  }
  if (board[0][2] === board[1][2] && board[1][2] === board[2][2] && !(board[0][2] === '')) {
    return true;
  }
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && !(board[0][0] === '')) {
    return true;
  }
  if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && !(board[0][2] === '')) {
    return true;
  }
};

const squareClick = (row, column) => {
  console.log('coordinates', row, column);

  // see if the clicked square has been clicked on before
  if (board[row][column] === '') {
    // alter the data array, set it to the current player
    board[row][column] = currentPlayer;
    buildBoard(board);

    if (checkWin() === true) {
      gameInfo.innerHTML = `Congrats Player ${currentPlayer}, you won!`; } else {
    // refresh the screen with a new board
    // according to the array that was just changed

      // change the player
      togglePlayer();
    }
  }
};

// create the board container element and put it on the screen
const initGame = () => {
  boardContainer = document.createElement('div');
  boardContainer.id = 'boardContainer';
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard(board);
};

initGame();

const resetGame = () => {
  gameInfo.innerHTML = `Player ${currentPlayer}\'s turn`;
  const ele = document.getElementById('boardContainer');
  ele.remove();
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  initGame();
};

resetButton.addEventListener('click', resetGame);
