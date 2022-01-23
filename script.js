let outputBox;
let gameOver = false;
let boardSize;
let sizeBox;

// keep data about the game in a 2-D array
let board;
const boardCreate = () => {
  board = [];
  for (let i = 0; i < boardSize; i += 1) {
    board.push([]);
    for (let j = 0; j < boardSize; j += 1) {
      board[i].push('');
    }
  }
};
// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = 'X';

// completely rebuilds the entire board every time there's a click
const buildBoard = (brd) => {
  // start with an empty container
  boardContainer.innerHTML = '';
  boardElement = document.createElement('div');
  boardElement.classList.add('board');

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < brd.length; i += 1) {
    // separate var for one row / row element
    const row = brd[i];
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    // set each square
    // j is the column number
    for (let j = 0; j < row.length; j += 1) {
      // one square element
      const square = document.createElement('div');
      square.classList.add('square');

      // set the text of the square according to the array
      square.innerText = brd[i][j];

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

const reset = () => {
  boardCreate();
  buildBoard(board);
  gameOver = false;
  outputBox.innerText = '';
  currentPlayer = 'X';
};

// create the board container element and put it on the screen
const initGame = () => {
  const resetButton = document.createElement('button');
  document.body.appendChild(resetButton);
  resetButton.innerText = 'Reset Game';
  resetButton.addEventListener('click', reset);
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);
  outputBox = document.createElement('div');
  outputBox.className = 'output';
  document.body.appendChild(outputBox);
  boardCreate();

  // build the board - right now it's empty
  buildBoard(board);
};

const sizeCheck = (num) => {
  if (Number(num) >= 3) {
    boardSize = Number(num);
    sizeBox.remove();
    initGame();
  }
};

const preGame = () => {
  sizeBox = document.createElement('div');
  const sizeInput = document.createElement('input');
  sizeInput.placeholder = 'Enter size of board (at least 3)';
  sizeInput.style = 'width: 35%;';
  const sizeButton = document.createElement('button');
  sizeButton.addEventListener('click', () => sizeCheck(sizeInput.value));
  sizeButton.innerText = 'Submit';
  sizeBox.appendChild(sizeInput);
  sizeBox.appendChild(sizeButton);

  document.body.appendChild(sizeBox);
};
preGame();
// initGame();

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

const checkEqual = (array) => new Set(array).size === 1;

const inverseBoard = (brd) => {
  const inverse = [];
  for (let i = 0; i < boardSize; i += 1) {
    inverse.push([]);
    for (let j = 0; j < boardSize; j += 1) {
      inverse[i].push(brd[j][i]);
    }
  }
  return inverse;
};

const diagonalBoard = (brd) => {
  const diagonal = [];
  for (let i = 0; i < 2; i += 1) {
    diagonal.push([]);
    for (let j = 0; j < boardSize; j += 1) {
      const k = j;
      const l = (boardSize - 1) - k;
      if (i === 0) {
        diagonal[i].push(brd[j][k]);
      }
      else {
        diagonal[i].push(brd[j][l]);
      }
    }
  }
  return diagonal;
};

const checkWin = (brd) => {
  let win = false;
  const inverse = inverseBoard(brd);
  const diagonal = diagonalBoard(brd);

  for (let i = 0; i < brd.length; i += 1) {
    // checking horizontal
    if (checkEqual(brd[i]) && !brd[i].includes('')) {
      win = true;
      console.log('horizontal match!');
    }
    // checking vertical
    if (checkEqual(inverse[i]) && !inverse[i].includes('')) {
      win = true;
      console.log('vertical match!');
    }
    // checking diagonal
    if (checkEqual(diagonal[i]) && !diagonal[i].includes('')) {
      win = true;
      console.log('diagonal match!');
    }
  }
  return win;
};

const squareClick = (column, row) => {
  if (gameOver === false) {
    if (board[column][row] === '') {
      board[column][row] = currentPlayer;
      buildBoard(board);
      if (checkWin(board) === true) {
        outputBox.innerText = `${currentPlayer} wins!`;
        gameOver = true;
      } else {
        togglePlayer();
      }
    }
  }
};
