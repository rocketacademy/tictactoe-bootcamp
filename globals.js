// Please implement exercise logic here
// keep data about the game in a 2-D array
// let board = [
//   ['', '', ''],
//   ['', '', ''],
//   ['', '', ''],
// ];

let board = [];



// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = 'X';

// variable for winner
let winner = '';
let inLineWin = 3;

// flag to set clickability
let canClick = true ;
let messageOut = false;
let boardSize = 0 ;

//create first page elements
let watchBox 