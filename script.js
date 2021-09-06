// Please implement exercise logic here
// keep data about the game in a 2-D array
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

// const boardCopy = [];

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
const playerState = document.createElement('div');
playerState.setAttribute('class', 'player-info');
document.body.appendChild(playerState);

let currentPlayer = 'X';

// completely rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  // start with an empty container
  boardContainer.innerHTML = '';
  boardElement = document.createElement('div');
  boardElement.setAttribute('class', 'board-space');
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
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);
  // build the board - right now it's empty
  buildBoard(board);
};

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
    playerState.innerHTML = "it's player 0's turn!";
  } else {
    currentPlayer = 'X';
    playerState.innerHTML = "it's player X's turn!";
  }
  // const headerFind = document.getElementById('header');
};

function checkWin() {
  // horizontal winning condition check
  let rowCheck = '';
  // nested loop to check horizontal winning condition
  for (const row in board) {
    for (let i = 0; i < 3; i++) {
      console.log(`printing square - ${board[row][i]}`);
      rowCheck += board[row][i];
      console.log(`row check is  ${rowCheck}`); }
    if (rowCheck.includes('XXX')) { // the include keyword helps is literally check strings for what's inside them.
      playerState.innerHTML = 'Player X WINS!';
    } else if (rowCheck.includes('OOO')) {
      playerState.innerHTML = 'Player O WINS!';
    }
  }

  // if (rowCheck.includes('XXX')) { // the include keyword helps is literally check strings for what's inside them.
  //   playerState.innerHTML = 'Player X WINS!';
  // } else if (rowCheck.includes('OOO')) {
  //   playerState.innerHTML = 'Player O WINS!';
  console.log('checking all rows');

  let firstColumn = '';
  let secondColumn = '';
  let thirdColumn = '';
  // vertical winning condition check has single for loop
  for (const row in board) {
    firstColumn += board[row][0];
    secondColumn += board[row][1];
    thirdColumn += board[row][2];

    if (firstColumn.includes('XXX') || secondColumn.includes('XXX') || thirdColumn.includes('XXX')) {
      playerState.innerHTML = 'Player X WINS!';
    } else if (firstColumn.includes('OOO') || secondColumn.includes('OOO') || thirdColumn.includes('OOO')) {
      playerState.innerHTML = 'Player 0 WINS!';
    }
  }

  // simpler string logic for diagonals
  const firstDiagonal = board[0][0] + board[1][1] + board[2][2]; // top left down to bottom right
  const secondDiagonal = board[0][2] + board[1][1] + board[2][0]; // top right down to bottom left

  console.log(`first diagonal is ${firstDiagonal}`);
  console.log(`second diagonal is ${secondDiagonal}`);

  if (firstDiagonal === 'XXX' || secondDiagonal === 'XXX') {
    playerState.innerHTML = 'Player X WINS!';
  } else if (firstDiagonal === 'OOO' || secondDiagonal === 'OOO') {
    playerState.innerHTML = 'Player 0 WINS!';
  }
}

const squareClick = (column, row) => {
  console.log('coordinates', column, row);

  // see if the clicked square has been clicked on before
  if (board[column][row] === '') {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;

    // refresh the screen with a new board
    // according to the array that was just changed
    buildBoard(board);

    // change the player
    togglePlayer();

    // check the win conditions
    checkWin();
  }
};

initGame();
