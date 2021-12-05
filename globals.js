// keep data about the game in a 2-D array
let board = [];

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// the element that contains the game information
let gameInfoElement;

// the elements that collects user input
let boardSizeInput;
let squaresInARowInput;

// current player global starts at X
let currentPlayer = 'X';

// AI / computer use O by default
let AIPlayer = 'O';

// constants for direction
// 7 0 1
// 6   2
// 5 4 3
const UP = 0;
const UP_RIGHT = 1;
const RIGHT = 2;
const DOWN_RIGHT = 3;
const DOWN = 4;
const DOWN_LEFT = 5;
const LEFT = 6;
const UP_LEFT = 7;

// board size
const MAX_BOARD_SIZE = 10;
const MIN_BOARD_SIZE = 3;
let boardSize = MIN_BOARD_SIZE;

// how many in a row determines a win
let howManyInARow = boardSize;

// array of movements in x and y terms
/* eslint-disable no-multi-spaces */
const MOVEMENT = [
  { x: 0, y: -1 },  // UP
  { x: 1, y: -1 },  // UP RIGHT
  { x: 1, y: 0 },   // RIGHT
  { x: 1, y: 1 },   // DOWN RIGHT
  { x: 0, y: 1 },   // DOWN
  { x: -1, y: 1 },  // DOWN LEFT
  { x: -1, y: 0 },  // LEFT
  { x: -1, y: -1 }, // UP LEFT
];

// game mode
let gameMode = 'VS_PLAYER';
