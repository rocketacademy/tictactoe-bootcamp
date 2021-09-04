let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let boardContainer;
let boardElement;
let currentPlayer = 'X';
let isPlaying = false;
const textDiv = document.createElement('div');
const buttonDiv = document.createElement('div');

// ###################### HELPER FUNCTIONS ########################

// eslint-disable-next-line
const buildBoard = (board) => {
  boardContainer.innerHTML = '';
  boardElement = document.createElement('div');
  boardElement.classList.add('board');

  for (let i = 0; i < board.length; i += 1) {
    const row = board[i];
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    for (let j = 0; j < row.length; j += 1) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.innerText = board[i][j];

      rowElement.appendChild(square);

      square.addEventListener('click', () => {
        // eslint-disable-next-line
        squareClick(i, j);
      });
    }

    boardContainer.appendChild(rowElement);
  }
};

const resetBoard = () => {
  isPlaying = true;
  currentPlayer = 'X';
  textDiv.innerText = "New game started! Player X's turn!";
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  buildBoard(board);
  buttonDiv.innerHTML = '';
};

// ###################### GAMEPLAY LOGIC ########################
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
    textDiv.innerText = "Player O's turn!";
  } else {
    currentPlayer = 'X';
    textDiv.innerText = "Player X's turn!";
  }
};

const checkWin = () => {
  let rowSum = 0;
  let columnSum = 0;
  let diagLeftSum = 0;
  let diagRightSum = 0;

  // check rows
  for (let i = 0; i < board.length; i += 1) {
    rowSum = 0;
    columnSum = 0;
    for (let j = 0; j < board[i].length; j += 1) {
      // check rows
      if (board[i][j] === 'X') {
        rowSum += 1;
      } else if (board[i][j] === 'O') {
        rowSum -= 1;
      }

      // check columns
      if (board[j][i] === 'X') {
        columnSum += 1;
      } else if (board[j][i] === 'O') {
        columnSum -= 1;
      }
    }
    // check diagonal left
    if (board[i][i] === 'X') {
      diagLeftSum += 1;
    } else if (board[i][i] === 'O') {
      diagLeftSum -= 1;
    }

    // check diagonal right
    const k = board.length - 1 - i;
    if (board[i][k] === 'X') {
      diagRightSum += 1;
    } else if (board[i][k] === 'O') {
      diagRightSum -= 1;
    }

    // return true if sum = length or -length
    if (rowSum === board.length
      || rowSum === board.length * -1
      || columnSum === board.length
      || columnSum === board.length * -1
      || diagLeftSum === board.length
      || diagLeftSum === board.length * -1
      || diagRightSum === board.length
      || diagRightSum === board.length * -1) {
      return true;
    }
  }

  return false;
};

const squareClick = (column, row) => {
  if (isPlaying === true) {
    if (board[column][row] === '') {
      board[column][row] = currentPlayer;
      buildBoard(board);
    }

    if (checkWin() === true) {
      textDiv.innerText = `Player ${currentPlayer} wins!`;
      isPlaying = false;
      const resetButton = document.createElement('button');
      resetButton.innerText = 'Reset';
      resetButton.classList.add('reset-button');
      resetButton.addEventListener('click', resetBoard);
      buttonDiv.appendChild(resetButton);
    } else {
      togglePlayer();
    }
  }
};

// ###################### INITIALIZATION ########################
const initGame = () => {
  isPlaying = true;

  textDiv.classList.add('message');
  textDiv.innerText = "Welcome! Player X's turn!";
  document.body.appendChild(textDiv);
  document.body.appendChild(buttonDiv);

  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  buildBoard(board);
};

initGame();
