/*
Need board container
Need board element for the actual TTT

function that builds the board element (for loop)
function that adds a runs a script when a square is clicked
init function to init the container
*/
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];
let boardContainer;
let boardElement;
let outputContainer;
let currentPlayer = 'X';

// function that builds the board element
const buildBoard = (board) => {
  boardContainer.innerHTML = '';
  const boardElement = document.createElement('div');
  boardElement.classList.add('board');
  boardContainer.appendChild(boardElement);

  // add rows into the board EL
  for (let i = 0; i < board.length; i += 1) {
    const row = board[i];
    const rowEL = document.createElement('div');
    rowEL.classList.add('row');

    // add square elements into each row
    for (let j = 0; j < row.length; j += 1) {
      // creates square div for each square EL
      const square = document.createElement('div');
      square.classList.add('square');

      // add X or O found in board
      square.innerHTML = board[i][j];

      // add click function into each square
      square.addEventListener('click', () => {
        /* i and j are used to identify the actual square pressed
        when used in the squareClick function - because squareClick is a general function that is made to be used with any square */
        squareClick(i, j);
      });
      rowEL.appendChild(square);
    }
    boardElement.appendChild(rowEL);
  }
};

// function to execute upon square click
const squareClick = (i, j) => {
  // based on the current player, add X or O to the square
  if (board[i][j] === '') {
    // alter the board array to current player
    board[i][j] = currentPlayer;
    // rebuild board with the altered array
    buildBoard(board);
    // change player
    changePlayer();
  }
};

// init game elements and containers
const initGame = () => {
  // build board container
  boardContainer = document.createElement('div');
  boardContainer.classList.add('board-container');
  document.body.appendChild(boardContainer);
  buildBoard(board);
  // build output container
  outputContainer = document.createElement('div');
  outputContainer.classList.add('output-container');
  document.body.appendChild(outputContainer);
  buildOutput();
};

// change player everytime function is called
const changePlayer = () => {
  currentPlayer === 'X' ? (currentPlayer = 'O') : (currentPlayer = 'X');
};

const buildOutput = () => {
  const outputEL = document.createElement('output');
  outputEL.innerText = '';
  outputEL.classList.add('output');
  outputContainer.appendChild(outputEL);
};

const determineWinner = () => {};

initGame();
