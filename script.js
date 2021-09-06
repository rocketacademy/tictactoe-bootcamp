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

// found a function on stack overflow that checks out whether everything in an array is identical.
// const everythingsEqual = (array) => array.every((thing) => thing === array[0]);

function checkWin() {
  // horizontal winning condition check
  let rowCheck = '';

  for (const row in board) {
    for (const index in board[row]) {
      console.log(`printing index ${index} in row ${row} - ${board[row][index]}`);
      rowCheck += board[row][index];

      if (rowCheck.includes('XXX')) {
        playerState.innerHTML = 'Player X WINS!';
      } else if (rowCheck.includes('OOO')) {
        playerState.innerHTML = 'Player O WINS!';
      }
    }
  }
  let firstColumn = '';
  let secondColumn = '';
  let thirdColumn = '';
  // horizontal winning condition check
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

    checkWin();
  }
};

initGame();
