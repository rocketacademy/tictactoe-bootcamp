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
let numberedBoard = [];
let boardContainer;
let boardElement;
let outputContainer;
let outputEL;

const winConditions = [];
let currentPlayer = 'X';

// function that builds the board element
const buildBoard = (board) => {
  boardContainer.innerHTML = '';
  boardElement = document.createElement('div');
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
  winCheck(winConditions, currentPlayer);
};

// change player everytime function is called
const changePlayer = () => {
  currentPlayer === 'X' ? (currentPlayer = 'O') : (currentPlayer = 'X');
};

const buildOutput = () => {
  outputEL = document.createElement('p');
  outputEL.innerText = '';
  outputEL.classList.add('output');
  outputContainer.appendChild(outputEL);
};

const output = (text) => {
  outputEL.innerText = text;
};

// checks if a player has won by fulfilling the win conditions // DOING
const winCheck = (arr, currentPlayer) => {};

const determineWinConditions = (board) => {
  horizontalWinCon(board);
  verticalWinCon(board);
  // diagonalLefttoRightWinCon(board);
  // diagonalRighttoLeft(board);
};

/*
Functions to generate win conditions
*/

// build a 2d array that mirrors the TTT board but with numbers
const buildNumberedBoard = (board) => {
  let counter = 0;
  let result = [];
  for (let i = 0; i < board.length; i += 1) {
    result[i] = [];
    for (let j = 0; j < board.length; j += 1) {
      result[i][j] = counter;
      counter += 1;
    }
  }
  numberedBoard = result;
};

// generate the horizontal win condition based on board size
// old model - generating your own counter
const horizontalWinCon = (board) => {
  let counter = 0;
  for (let i = 0; i < board.length; i += 1) {
    let row = [];
    for (let j = 0; j < board.length; j += 1) {
      row.push(counter);
      counter += 1;
    }
    winConditions.push(row);
  }
};

// generate the vertical win condition based on board size
// using the numberedBoard
const verticalWinCon = (board) => {
  for (let i = 0; i < board.length; i += 1) {
    let row = [];
    for (let j = 0; j < board.length; j += 1) {
      row.push(numberedBoard[j][i]);
    }
    winConditions.push(row);
  }
};

// generate the diagonal win condition (left-right) based on board size
const diagonalLefttoRightWinCon = (board) => {
  for (let i = 0; i < board.length; i += 1) {
    let row = [];
    for (let j = 0; j < board.length; j += 1) {
      row.push(numberedBoard[j][i]);
    }
    winConditions.push(row);
  }
};
