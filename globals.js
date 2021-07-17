// keep data about the game in a 2-D array
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];
let minBoardSize=3;

let boardSize=0;
let numSqToWin=boardSize;

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

let outputContainer;

let queryUserContainer;

// const queryBoardSize=document.createElement('input');
// const queryNumSqToWin=document.createElement('input');
// const submitButton= document.createElement('button');

// current player global starts at X
let currentPlayer = 'X';

let canClick=true;
