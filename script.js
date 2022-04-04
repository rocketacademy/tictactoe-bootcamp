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
let board1 = [];
let numberedBoard = [];
let boardContainer;
let boardElement;
let outputContainer;
let inputContainer;
let inputEl;
let boardSize = 0;

const winConditions = [];
let currentPlayer = 'X';

const buildBoard1 = (boardSize) => {
  boardContainer.innerHTML = '';
  boardElement = document.createElement('div');
  boardElement.classList.add('board');
  boardContainer.appendChild(boardElement);

  for (let i = 0; i < boardSize; i += 1) {
    let row = [];
    const rowEl = document.createElement('div');
    rowEl.classList.add('row');
    for (let j = 0; j < boardSize; j += 1) {
      row.push('');
      const square = document.createElement('div');
      square.classList.add('square');
      square.innerHTML = board1[i][j]; // BUG create the board before running this function
      square.addEventListener('click', () => {
        squareClick(i, j);
      });
      rowEl.appendChild(square);
    }
    board1.push(row);
    boardElement.appendChild(rowEl);
  }
};

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
    // DOING
    // alter the board array to current player
    board[i][j] = currentPlayer;
    // rebuild board with the altered array
    buildBoard(board); // DOING
    // buildBoard1(boardSize);
    // change player
    determineWinConditions(board); // DOING
    changePlayer();
  }
  // winCheck(winConditions, currentPlayer);
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

// function to build input box
const buildInput = () => {
  const inputBox = document.createElement('input');
  const inputBtn = document.createElement('button');
  inputEl = document.createElement('span');
  inputEl.classList.add('label');
  inputEl.innerText = 'Please input the size of board:';
  inputContainer.appendChild(inputEl);
  inputBox.classList.add('input');
  inputContainer.appendChild(inputBox);
  inputBtn.classList.add('input-button');
  inputBtn.innerText = 'Submit';
  inputContainer.appendChild(inputBtn);

  // function to take size of board input and set the size to build board
  // DOING
  inputBtn.addEventListener('click', function () {
    boardSize = Number(inputBox.value);
    buildBoard1(boardSize);
  });
};

/**
 * Checks if a player has won by fulfilling the win conditions.
 * @param {takes arr of hor/vert/diag and determines if 3 in a row} arr
 */
const winCheck = (arr) => {
  arr.forEach(function (subArr) {
    // console.log(subArr);
    let counter = 0;
    subArr.forEach(function (element) {
      // console.log(element, currentPlayer);
      if (element === currentPlayer) {
        counter += 1;
        // console.log(counter);
        if (counter === 3) {
          winner = currentPlayer;
          output(`${currentPlayer} Wins!`);
        }
      }
    });
  });
};

const determineWinConditions = (board) => {
  horizontalWinCon(board);
  verticalWinCon(board);
  diagonalTopLeftToRightWinCon(board);
  diagonalBtmLeftToRightWinCon(board);
};

/**
 * Functions to generate win conditions //
 */

const horizontalWinCon = (board) => {
  const arr = [];
  for (let i = 0; i < board.length; i += 1) {
    let row = [];
    for (let j = 0; j < board.length; j += 1) {
      row.push(board[i][j]);
    }
    arr.push(row);
  }
  winCheck(arr);
};

const verticalWinCon = (board) => {
  const arr = [];
  for (let i = 0; i < board.length; i += 1) {
    let row = [];
    for (let j = 0; j < board.length; j += 1) {
      row.push(board[j][i]);
    }
    arr.push(row);
  }
  winCheck(arr);
};

const diagonalTopLeftToRightWinCon = (board) => {
  let arr = [];
  for (let x = 0; x < board.length; x += 1) {
    let row = [];
    for (let i = 0, j = 0; i < board.length; i += 1, j += 1) {
      row.push(board[i][j]);
    }
    arr.push(row);
  }
  winCheck(arr);
};

const diagonalBtmLeftToRightWinCon = (board) => {
  let arr = [];
  for (let x = 0; x < board.length; x += 1) {
    let row = [];
    for (let i = board.length - 1, j = 0; i >= 0; i -= 1, j += 1) {
      // console.log(i, j);
      row.push(board[i][j]);
    }
    arr.push(row);
  }
  winCheck(arr);
};

/**
 * Depreciated
 */
// generate the vertical win condition based on board size
// using the numberedBoard
// const verticalWinCon = (board) => {
//   for (let i = 0; i < board.length; i += 1) {
//     let row = [];
//     for (let j = 0; j < board.length; j += 1) {
//       row.push(numberedBoard[j][i]);
//     }
//     winConditions.push(row);
//   }
// };

// const horizontalWinCon = (board) => {
//   const arr = [];
//   let counter = 0;
//   for (let i = 0; i < board.length; i += 1) {
//     let row = [];
//     for (let j = 0; j < board.length; j += 1) {
//       row.push(counter);
//       counter += 1;
//     }
//     arr.push(row);
//   }
// };

// const buildNumberedBoard = (board) => {
//   let counter = 0;
//   let result = [];
//   for (let i = 0; i < board.length; i += 1) {
//     result[i] = [];
//     for (let j = 0; j < board.length; j += 1) {
//       result[i][j] = counter;
//       counter += 1;
//     }
//   }
//   numberedBoard = result;
// };
