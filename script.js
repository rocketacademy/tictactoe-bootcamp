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
let outputEL;

let currentPlayer = 'X';
let winner = false;
let winningChar;

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
  determineWinner(i, j);
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

/*
[
  [00, 01, 02]
  [10, 11, 12]
  [20, 21, 22]
]
*/
let move = 1;
const determineWinner = () => {
  if (winner === false) {
    /* there are limited possible winning conditions 
  a) 3 horizonally, b) 3 vertically, c) 3 diagonally
  */
    // loop to check vertical winner DOING
    console.log(`move: ${move}`);
    for (let i = 0; i < board.length; i++) {
      let row = board[i];
      let array = [];
      for (let j = 0; j < row.length; j++) {
        if (row[j] !== '') {
          array.push(board[i][j]);
        }
      }
      checkHorizontal(array);
      // checkVertical(array);
    }
    move++;
  }

  // if winner is true, then output winner and end game
  if (winner) {
    output(`${winningChar} is the winner!`);
    winner = false;
  }
};

// function to check if vertical lines are all the same X or O
const checkVertical = (arr) => {
  let newArr = [];
  for (let i = 0; i < arr.length; i += 1) {
    newArr.push([]);
    for (let j = 0; j < arr.length; j += 1) {
      newArr[j].push(arr[i][j]);
    }
  }
  console.log(newArr);
  // check if the row contains unique X or O
  let squareUnique = new Set(newArr);
  // if arr = size of row & map = 1, return true;
  if (arr.length === board.length && squareUnique.size === 1) {
    winner = true;
    winningChar = arr[0];
  }
};

// function to check if horizontal lines are all the same X or O
const checkHorizontal = (arr) => {
  // check if the row contains unique X or O
  let squareUnique = new Set(arr);
  // if arr = size of row & map = 1, return true;
  if (arr.length === board.length && squareUnique.size === 1) {
    winner = true;
    winningChar = arr[0];
  }
};
