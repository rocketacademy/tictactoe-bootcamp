// ###################### GLOBAL VARIABLES ########################

const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let boardContainer;
let boardElement;
let currentPlayer = 'X';
const textDiv = document.createElement('div');
let hasWinner = false;

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

const squareClick = (column, row) => {
  if (board[column][row] === '' && hasWinner === false) {
    board[column][row] = currentPlayer;
    buildBoard(board);
  }

  // check if there is a winner, else change to next player
  let rowSum = 0;
  let columnSum = 0;
  for (let i = 0; i < board.length; i += 1) {
    // check row
    if (board[column][i] === currentPlayer) {
      rowSum += 1;
    }
    // check column
    if (board[i][row] === currentPlayer) {
      columnSum += 1;
    }
  }
  if (rowSum === 3 || columnSum === 3) {
    hasWinner = true;
  }

  // check diagonal
  if (board[1][1] === currentPlayer) {
    // eslint-disable-next-line
      if ((board[0][0] === currentPlayer && board[2][2] === currentPlayer) || (board[0][2] === currentPlayer && board[2][0] === currentPlayer)) {
      hasWinner = true;
    }
  }

  if (hasWinner === true) {
    textDiv.innerText = `Player ${currentPlayer} wins!`;
  } else {
    togglePlayer();
  }
};

// ###################### INITIALIZATION ########################
const initGame = () => {
  textDiv.innerText = "Welcome! Player X's turn!";
  document.body.appendChild(textDiv);

  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  buildBoard(board);
};

initGame();
